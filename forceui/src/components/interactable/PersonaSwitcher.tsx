/**
 * @file components/interactable/PersonaSwitcher.tsx
 * @description Component for switching between different personas/roles
 */

"use client";

import { z } from "zod";
import { usePersonaStore } from "@/stores/personaStore";
import { personas } from "@/config/personas";
import { Persona } from "@/types";

// Zod schema for PersonaSwitcher props
export const personaSwitcherSchema = z.object({
    variant: z
        .enum(["pills", "cards"])
        .optional()
        .describe("Display variant"),
    onSwitch: z
        .function()
        .args(z.string())
        .returns(z.void())
        .optional()
        .describe("Callback when persona is switched"),
});

type PersonaSwitcherProps = z.infer<typeof personaSwitcherSchema>;

export function PersonaSwitcher({
    variant = "cards",
    onSwitch,
}: PersonaSwitcherProps) {
    const { currentPersona, setPersona } = usePersonaStore();

    const handleSwitch = (persona: Persona) => {
        setPersona(persona);
        onSwitch?.(persona);
    };

    if (variant === "pills") {
        return (
            <div className="flex flex-wrap gap-2">
                {personas.map((persona) => {
                    const isActive = currentPersona === persona.id;
                    return (
                        <button
                            key={persona.id}
                            onClick={() => handleSwitch(persona.id)}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${isActive
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <span className="text-lg">{persona.emoji}</span>
                            {persona.name}
                        </button>
                    );
                })}
            </div>
        );
    }

    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">
                Switch Persona
            </h3>
            <p className="mb-6 text-sm text-gray-600">
                Choose your role to optimize the UI for your workflow
            </p>

            <div className="grid gap-4 md:grid-cols-2">
                {personas.map((persona) => {
                    const isActive = currentPersona === persona.id;
                    return (
                        <button
                            key={persona.id}
                            onClick={() => handleSwitch(persona.id)}
                            className={`group relative rounded-lg border-2 p-6 text-left transition-all ${isActive
                                    ? "border-purple-500 bg-purple-50 shadow-lg"
                                    : "border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50/50"
                                }`}
                        >
                            {/* Active Indicator */}
                            {isActive && (
                                <div className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600 text-white">
                                    <span className="text-sm">✓</span>
                                </div>
                            )}

                            {/* Emoji */}
                            <div className="mb-3 text-4xl">{persona.emoji}</div>

                            {/* Name */}
                            <h4
                                className={`mb-2 text-lg font-semibold ${isActive ? "text-purple-900" : "text-gray-900"
                                    }`}
                            >
                                {persona.name}
                            </h4>

                            {/* Description */}
                            <p
                                className={`text-sm ${isActive ? "text-purple-700" : "text-gray-600"
                                    }`}
                            >
                                {persona.description}
                            </p>

                            {/* Preferred Components */}
                            <div className="mt-4">
                                <p className="mb-2 text-xs font-medium text-gray-500">
                                    Optimized for:
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {persona.preferredComponents.slice(0, 3).map((comp) => (
                                        <span
                                            key={comp}
                                            className={`rounded-full px-2 py-0.5 text-xs ${isActive
                                                    ? "bg-purple-200 text-purple-800"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {comp}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
