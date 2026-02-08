/**
 * @file components/ui/PersonaDropdown.tsx
 * @description Persona switcher dropdown for navbar with toast notifications
 */

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, ChevronDown, Check, Code, Briefcase, Palette, GraduationCap, Sparkles } from "lucide-react";
import { usePersonaStore } from "@/stores/personaStore";
import { useToast } from "./Toast";

const PERSONAS = [
    {
        id: "developer",
        name: "Developer",
        icon: Code,
        description: "Technical focus, code-centric UI",
        color: "bg-emerald-500",
    },
    {
        id: "manager",
        name: "Manager",
        icon: Briefcase,
        description: "High-level overview, dashboards",
        color: "bg-blue-500",
    },
    {
        id: "designer",
        name: "Designer",
        icon: Palette,
        description: "Visual-first, creative layouts",
        color: "bg-purple-500",
    },
    {
        id: "student",
        name: "Student",
        icon: GraduationCap,
        description: "Learning-focused, guided UI",
        color: "bg-amber-500",
    },
];

export function PersonaDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { currentPersona, setPersona } = usePersonaStore();
    const toast = useToast();

    const activePersona = PERSONAS.find(p => p.id === currentPersona) || PERSONAS[0];
    const ActiveIcon = activePersona.icon;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelectPersona = async (persona: typeof PERSONAS[0]) => {
        if (persona.id === currentPersona) {
            setIsOpen(false);
            return;
        }

        toast.info("Switching Persona", `Adapting UI for ${persona.name} workflow...`);

        // Simulate backend processing
        await new Promise(r => setTimeout(r, 400));

        setPersona(persona.id as any);
        setIsOpen(false);

        toast.success("Persona Changed", `Now using ${persona.name} mode - UI will adapt to your needs`);
    };

    return (
        <div ref={dropdownRef} className="relative">
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="group flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-2 transition-all hover:shadow-md hover:from-purple-200 hover:to-blue-200"
            >
                <div className={`flex h-6 w-6 items-center justify-center rounded-md ${activePersona.color} text-white`}>
                    <ActiveIcon className="h-3.5 w-3.5" />
                </div>
                <span className="text-sm font-medium text-gray-700">{activePersona.name}</span>
                <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Panel */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-2 shadow-xl z-50"
                    >
                        <div className="mb-2 px-2 py-1">
                            <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Select Persona</p>
                        </div>

                        <div className="space-y-1">
                            {PERSONAS.map((persona, index) => {
                                const Icon = persona.icon;
                                const isActive = persona.id === currentPersona;

                                return (
                                    <motion.button
                                        key={persona.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleSelectPersona(persona)}
                                        className={`flex w-full items-center gap-3 rounded-lg p-3 transition-all ${isActive
                                            ? 'bg-purple-50 dark:bg-purple-900/30 ring-2 ring-purple-200 dark:ring-purple-700'
                                            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                            }`}
                                    >
                                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${persona.color} text-white`}>
                                            <Icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{persona.name}</p>
                                                {isActive && (
                                                    <Check className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                                                )}
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{persona.description}</p>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>

                        <div className="mt-2 border-t border-gray-100 pt-2 px-2">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Sparkles className="h-3 w-3" />
                                <span>UI adapts based on persona</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
