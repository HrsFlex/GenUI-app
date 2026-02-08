/**
 * @file components/generative/ExplainabilityPanel.tsx
 * @description Explainability panel showing AI decision-making reasoning with premium UI
 */

"use client";

import { z } from "zod";
import { motion } from "framer-motion";
import { HelpCircle, Brain, Layout, Zap, CheckCircle2, Activity, Percent } from "lucide-react";

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
        <div className="w-full overflow-hidden">
            <div className="grid gap-6 md:grid-cols-2">
                {/* Left Column: Intent & Mechanics */}
                <div className="space-y-6">
                    {/* Intent Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm ring-1 ring-indigo-50"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
                                <Brain className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-gray-900">Intent Analysis</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-medium text-gray-500">Confidence Score:</span>
                                    <div className="h-2 w-24 rounded-full bg-gray-100">
                                        <div
                                            className="h-full rounded-full bg-green-500"
                                            style={{ width: `${intentAnalysis.confidence}%` }}
                                        />
                                    </div>
                                    <span className="text-xs font-bold text-green-600">{intentAnalysis.confidence}%</span>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gray-50 p-4">
                            <p className="text-sm font-medium text-gray-500 mb-1">Understanding User Input</p>
                            <p className="text-gray-900 italic">"{intentAnalysis.input}"</p>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <div className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-200">
                                <Activity className="h-3.5 w-3.5" />
                                {intentAnalysis.primary}
                            </div>
                            {intentAnalysis.subIntents.map((intent, idx) => (
                                <div key={idx} className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 text-sm font-medium text-purple-700 ring-1 ring-inset ring-purple-200">
                                    <Percent className="h-3 w-3" />
                                    {intent}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Layout Strategy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm ring-1 ring-blue-50"
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                                <Layout className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Adaptive Layout Strategy</h3>
                        </div>
                        <p className="text-gray-600 leading-relaxed text-sm">
                            {layoutReasoning}
                        </p>
                    </motion.div>
                </div>

                {/* Right Column: Component Flow */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="relative rounded-2xl border border-purple-100 bg-gradient-to-br from-white to-purple-50/30 p-6 shadow-sm ring-1 ring-purple-50"
                >
                    <div className="mb-6 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                            <Zap className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Component Orchestration</h3>
                            <p className="text-xs text-gray-500">AI-Selected Interface Elements</p>
                        </div>
                    </div>

                    <div className="relative space-y-0">
                        {/* Connecting Line */}
                        <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-gradient-to-b from-purple-200 via-indigo-200 to-transparent" />

                        {componentDecisions.map((decision, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + (idx * 0.1) }}
                                className="relative flex gap-4 pb-8 last:pb-0"
                            >
                                <div className="absolute left-0 mt-1.5 h-3 w-3 rounded-full border-2 border-white bg-purple-500 shadow-md ring-2 ring-purple-100" />
                                <div className="relative ml-10 flex-1 rounded-xl border border-gray-100 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-purple-200">
                                    <div className="mb-2 flex items-center justify-between">
                                        <h4 className="font-semibold text-gray-900">{decision.name}</h4>
                                        <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-200">
                                            {Math.round(decision.score * 100)}% Match
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600">{decision.reasoning}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Footer Metrics */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 text-xs text-gray-500"
            >
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Orchestration Complete</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>Latency: 42ms</span>
                    <span>Tokens: 1,240</span>
                    <span>Model: Gemini 1.5 Pro</span>
                </div>
            </motion.div>
        </div>
    );
}
