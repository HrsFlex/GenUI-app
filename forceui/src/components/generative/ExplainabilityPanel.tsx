/**
 * @file components/generative/ExplainabilityPanel.tsx
 * @description Explainability panel showing AI decision-making reasoning
 */

"use client";

import { z } from "zod";
import { HelpCircle, Brain, Layout, Zap } from "lucide-react";

// Zod schema for ExplainabilityPanel props
export const explainabilityPanelSchema = z.object({
    intentAnalysis: z.object({
        input: z.string().describe("User's original input"),
        primary: z.string().describe("Primary detected intent"),
        confidence: z.number().describe("Confidence percentage (0-100)"),
        subIntents: z.array(z.string()).describe("Secondary intents"),
    }),
    componentDecisions: z.array(
        z.object({
            name: z.string().describe("Component name"),
            score: z.number().describe("Selection score"),
            reasoning: z.string().describe("Why this component was selected"),
        })
    ),
    layoutReasoning: z.string().describe("Explanation for layout decisions"),
});

type ExplainabilityPanelProps = z.infer<typeof explainabilityPanelSchema>;

export function ExplainabilityPanel({
    intentAnalysis,
    componentDecisions,
    layoutReasoning,
}: ExplainabilityPanelProps) {
    return (
        <div className="w-full max-w-3xl rounded-lg border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 p-6 shadow-lg">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <HelpCircle className="h-7 w-7 text-purple-600" />
                <h2 className="text-2xl font-bold text-purple-900">
                    Why am I seeing this UI?
                </h2>
            </div>

            {/* Intent Analysis Section */}
            <div className="mb-6 rounded-lg bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                        📝 Your Intent Analysis
                    </h3>
                </div>

                <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                        <span className="font-medium">Input:</span> "{intentAnalysis.input}"
                    </p>

                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Primary Intent:</span>
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                            {intentAnalysis.primary}
                        </span>
                        <span className="text-sm text-gray-500">
                            ({intentAnalysis.confidence}% confidence)
                        </span>
                    </div>

                    {intentAnalysis.subIntents.length > 0 && (
                        <div>
                            <span className="text-sm font-medium text-gray-700">
                                Sub-intents:
                            </span>
                            <div className="mt-1 flex flex-wrap gap-2">
                                {intentAnalysis.subIntents.map((intent, idx) => (
                                    <span
                                        key={idx}
                                        className="rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700"
                                    >
                                        {intent}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Component Decisions Section */}
            <div className="mb-6 rounded-lg bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-amber-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                        🧩 Components Selected
                    </h3>
                </div>

                <div className="space-y-3">
                    {componentDecisions.map((decision, idx) => (
                        <div
                            key={idx}
                            className="flex items-start gap-3 rounded-md border border-gray-200 bg-gray-50 p-3"
                        >
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                                ✓
                            </div>
                            <div className="flex-1">
                                <div className="flex items-baseline justify-between">
                                    <h4 className="font-medium text-gray-900">{decision.name}</h4>
                                    <span className="text-sm text-gray-500">
                                        {decision.score.toFixed(1)} pts
                                    </span>
                                </div>
                                <p className="mt-1 text-sm text-gray-600">
                                    <span className="font-medium">Why:</span> {decision.reasoning}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Layout Reasoning Section */}
            <div className="rounded-lg bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                    <Layout className="h-5 w-5 text-indigo-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                        📐 Layout Rationale
                    </h3>
                </div>

                <p className="text-sm text-gray-700">{layoutReasoning}</p>
            </div>
        </div>
    );
}
