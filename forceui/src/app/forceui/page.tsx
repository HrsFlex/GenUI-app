/**
 * @file app/forceui/page.tsx
 * @description Main ForceUI application page with enhanced UI and animations
 */

"use client";

import { useState, useEffect } from "react";
import { IntentChat } from "@/components/interactable/IntentChat";
import { PersonaSwitcher } from "@/components/interactable/PersonaSwitcher";
import { Timeline } from "@/components/generative/Timeline";
import { StatsCard } from "@/components/generative/StatsCard";
import { ChartView } from "@/components/generative/ChartView";
import { KanbanBoard } from "@/components/interactable/KanbanBoard";
import { NotesPanel } from "@/components/interactable/NotesPanel";
import { SummaryPanel } from "@/components/generative/SummaryPanel";
import { ExplainabilityPanel } from "@/components/generative/ExplainabilityPanel";
import { AdaptiveGrid, GridItem } from "@/components/layout/AdaptiveGrid";
import { ExportButton } from "@/components/export/ExportButton";
import { ComponentSkeleton } from "@/components/ui/LoadingSkeleton";
import { useIntentProcessor } from "@/hooks/useIntentProcessor";
import { useComponentOrchestration } from "@/hooks/useComponentOrchestration";
import { usePersonaStore } from "@/stores/personaStore";
import { useDecisionLogStore } from "@/stores/decisionLogStore";
import { formatExplainabilityData } from "@/engine/explainability";
import { Sparkles, Brain, Zap, ChevronDown, Rocket, Eye, Users, Cpu } from "lucide-react";

export default function ForceUIPage() {
    const [showExplainability, setShowExplainability] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(true);
    const { processIntent, isProcessing, lastSelection } = useIntentProcessor();
    const { activeComponents } = useComponentOrchestration(lastSelection);
    const currentPersona = usePersonaStore((state) => state.currentPersona);
    const currentLog = useDecisionLogStore((state) => state.currentLog);

    // Initial loading animation
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleIntentSubmit = async (input: string) => {
        setShowWelcome(false);
        await processIntent(input);
        setShowExplainability(true);
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
                <div className="text-center">
                    <div className="relative mx-auto mb-8 h-24 w-24">
                        <div className="absolute inset-0 animate-spin rounded-full border-4 border-purple-500/30 border-t-purple-400" />
                        <div className="absolute inset-2 animate-spin rounded-full border-4 border-blue-500/30 border-t-blue-400" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles className="h-10 w-10 animate-pulse text-white" />
                        </div>
                    </div>
                    <h2 className="animate-pulse text-2xl font-bold text-white">Initializing ForceUI...</h2>
                    <p className="mt-2 text-purple-200">Preparing your self-evolving interface</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="group relative">
                                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 opacity-75 blur transition-all group-hover:opacity-100" />
                                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg">
                                    <Sparkles className="h-7 w-7 text-white" />
                                </div>
                            </div>
                            <div>
                                <h1 className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-2xl font-bold text-transparent">
                                    ForceUI
                                </h1>
                                <p className="text-sm text-gray-600">
                                    The Self-Evolving Application Framework
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Export Button */}
                            <ExportButton />

                            {/* Explainability Toggle */}
                            <button
                                onClick={() => setShowExplainability(!showExplainability)}
                                className={`group relative flex items-center gap-2 overflow-hidden rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ${showExplainability
                                        ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
                                        : "bg-white text-gray-700 shadow-md hover:shadow-lg"
                                    }`}
                            >
                                <Brain className={`h-4 w-4 transition-transform duration-300 ${showExplainability ? 'scale-110' : ''}`} />
                                <span className="relative z-10">
                                    {showExplainability ? "Hide" : "Show"} AI Reasoning
                                </span>
                                {!showExplainability && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 transition-opacity group-hover:opacity-10" />
                                )}
                            </button>

                            {/* Current Persona Badge */}
                            <div className="flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-100 to-blue-100 px-4 py-2 shadow-sm">
                                <Users className="h-4 w-4 text-purple-600" />
                                <span className="text-sm font-medium text-purple-800">
                                    {currentPersona.charAt(0).toUpperCase() + currentPersona.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                {/* Hero Section with Intent Chat */}
                <div className={`mb-10 ${showWelcome ? 'animate-fade-in-up' : ''}`}>
                    <div className="mb-8 text-center">
                        <h2 className="mb-3 text-4xl font-bold text-gray-900">
                            What would you like to <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">build</span> today?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Describe your needs in natural language, and watch the UI assemble itself
                        </p>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl" />
                        <div className="relative">
                            <IntentChat
                                placeholder="Try: 'Plan a product launch' or 'Show me analytics dashboard'"
                                onIntent={handleIntentSubmit}
                            />
                        </div>
                    </div>
                </div>

                {/* Processing Indicator */}
                {isProcessing && (
                    <div className="mb-8 animate-fade-in">
                        <div className="flex items-center justify-center gap-4 rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-blue-50 p-6">
                            <div className="relative h-8 w-8">
                                <div className="absolute inset-0 animate-spin rounded-full border-2 border-purple-200 border-t-purple-600" />
                            </div>
                            <div>
                                <p className="font-medium text-purple-900">Analyzing your intent...</p>
                                <p className="text-sm text-purple-600">Assembling the perfect UI components</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Explainability Panel */}
                {showExplainability && currentLog && !isProcessing && (
                    <div className="animate-fade-in-up mb-8">
                        <ExplainabilityPanel {...formatExplainabilityData(currentLog)} />
                    </div>
                )}

                {/* Dynamic Component Area */}
                {lastSelection && activeComponents.length > 0 && !isProcessing ? (
                    <div className="mb-10 animate-fade-in">
                        {/* Component Status Bar */}
                        <div className="mb-6 flex items-center justify-between rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-white">
                                    <Zap className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-medium text-emerald-900">
                                        {activeComponents.length} component{activeComponents.length > 1 ? 's' : ''} assembled
                                    </p>
                                    <p className="text-sm text-emerald-600">
                                        Optimized for {currentPersona} workflow
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {activeComponents.map((id, i) => (
                                    <span
                                        key={id}
                                        className="animate-scale-in rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700"
                                        style={{ animationDelay: `${i * 100}ms` }}
                                    >
                                        {id}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Rendered Components */}
                        <AdaptiveGrid density="comfortable">
                            {activeComponents.map((componentId, index) => {
                                const componentDecision = lastSelection.components.find(
                                    (c) => c.componentId === componentId
                                );

                                return (
                                    <GridItem
                                        key={`${componentId}-${index}`}
                                        span={index === 0 ? 2 : 1}
                                    >
                                        <div
                                            className="animate-fade-in-up hover-lift"
                                            style={{ animationDelay: `${index * 150}ms` }}
                                        >
                                            {renderComponent(componentId, componentDecision?.props)}
                                        </div>
                                    </GridItem>
                                );
                            })}
                        </AdaptiveGrid>
                    </div>
                ) : showWelcome && !isProcessing ? (
                    /* Welcome State */
                    <div className="animate-fade-in-up rounded-2xl border-2 border-dashed border-purple-200 bg-gradient-to-br from-white to-purple-50/50 p-12">
                        <div className="text-center">
                            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-purple-100 to-blue-100 p-6">
                                <Rocket className="h-12 w-12 text-purple-600 animate-float" />
                            </div>
                            <h2 className="mb-3 text-3xl font-bold text-gray-900">
                                Welcome to the Future of UI
                            </h2>
                            <p className="mb-8 text-lg text-gray-600 max-w-xl mx-auto">
                                ForceUI understands your intent and automatically assembles the perfect interface.
                                No more hunting through menus — just describe what you need.
                            </p>

                            {/* Feature Pills */}
                            <div className="mb-8 flex flex-wrap justify-center gap-3">
                                {[
                                    { icon: Brain, label: "AI Reasoning" },
                                    { icon: Eye, label: "Full Transparency" },
                                    { icon: Users, label: "Persona Aware" },
                                    { icon: Cpu, label: "Self-Evolving" },
                                ].map(({ icon: Icon, label }, i) => (
                                    <div
                                        key={label}
                                        className="animate-fade-in-up flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-md"
                                        style={{ animationDelay: `${i * 100}ms` }}
                                    >
                                        <Icon className="h-4 w-4 text-purple-600" />
                                        <span className="text-sm font-medium text-gray-700">{label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Example Prompts */}
                            <p className="mb-4 text-sm font-medium text-gray-500">Try these examples:</p>
                            <div className="flex flex-wrap justify-center gap-3">
                                {[
                                    "Plan a product launch",
                                    "Show my task board",
                                    "Analyze user metrics",
                                    "Switch to developer mode",
                                ].map((example, i) => (
                                    <button
                                        key={example}
                                        onClick={() => handleIntentSubmit(example)}
                                        className="animate-fade-in-up group relative overflow-hidden rounded-xl border border-purple-200 bg-white px-5 py-3 text-sm font-medium text-purple-700 shadow-sm transition-all hover:border-purple-400 hover:shadow-md"
                                        style={{ animationDelay: `${200 + i * 100}ms` }}
                                    >
                                        <span className="relative z-10">{example}</span>
                                        <span className="absolute inset-0 bg-gradient-to-r from-purple-100 to-blue-100 opacity-0 transition-opacity group-hover:opacity-100" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : isProcessing ? (
                    <div className="grid gap-6 md:grid-cols-2">
                        <ComponentSkeleton />
                        <ComponentSkeleton />
                    </div>
                ) : null}

                {/* Persona Switcher Section */}
                <div className="mt-12 animate-fade-in">
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
                        <h3 className="text-lg font-semibold text-gray-700">Switch Persona</h3>
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
                    </div>
                    <PersonaSwitcher variant="cards" />
                </div>

                {/* Scroll Indicator */}
                {showWelcome && (
                    <div className="mt-12 flex animate-bounce justify-center text-gray-400">
                        <ChevronDown className="h-6 w-6" />
                    </div>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-16 border-t border-purple-100 bg-gradient-to-r from-purple-50/50 to-blue-50/50 py-8">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <div className="flex items-center gap-3">
                            <Sparkles className="h-5 w-5 text-purple-600" />
                            <span className="font-medium text-gray-700">ForceUI</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-600">Built for the Tambo Hackathon 2026</span>
                        </div>
                        <a
                            href="https://tambo.co"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-purple-600 transition-colors hover:text-purple-700"
                        >
                            Powered by Tambo Generative UI SDK
                            <span className="text-lg">→</span>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

// Component renderer helper
function renderComponent(componentId: string, props?: Record<string, any>) {
    const defaultProps = props || {};

    switch (componentId) {
        case "Timeline":
            return (
                <Timeline
                    title="Project Timeline"
                    events={defaultProps.events || [
                        {
                            id: "1",
                            date: "2026-02-01",
                            name: "Project Kickoff",
                            description: "Initial planning and team alignment",
                            status: "completed",
                        },
                        {
                            id: "2",
                            date: "2026-02-08",
                            name: "Development Sprint 1",
                            description: "Core features implementation",
                            status: "in-progress",
                        },
                        {
                            id: "3",
                            date: "2026-02-15",
                            name: "Beta Release",
                            description: "Launch to early adopters",
                            status: "upcoming",
                        },
                    ]}
                />
            );

        case "StatsCard":
            return (
                <StatsCard
                    metrics={defaultProps.metrics || [
                        { label: "Active Users", value: "12.5K", change: 15.3, trend: "up" },
                        { label: "Revenue", value: "$48.2K", change: 8.7, trend: "up", unit: "" },
                        { label: "Conversion Rate", value: "3.2", change: -2.1, trend: "down", unit: "%" },
                    ]}
                />
            );

        case "ChartView":
            return (
                <ChartView
                    type={defaultProps.type || "bar"}
                    title="Monthly Performance"
                    data={defaultProps.data || [
                        { name: "Jan", value: 4000 },
                        { name: "Feb", value: 3000 },
                        { name: "Mar", value: 5000 },
                        { name: "Apr", value: 4500 },
                        { name: "May", value: 6000 },
                    ]}
                />
            );

        case "KanbanBoard":
            return (
                <KanbanBoard
                    title="Task Board"
                    columns={["To Do", "In Progress", "Done"]}
                    initialTasks={[
                        { id: "1", title: "Design homepage", column: "Done", description: "Complete the landing page design" },
                        { id: "2", title: "Implement authentication", column: "In Progress", description: "Add login and signup flows" },
                        { id: "3", title: "Write documentation", column: "To Do", description: "Create user guide and API docs" },
                    ]}
                />
            );

        case "NotesPanel":
            return <NotesPanel title="Notes" initialNotes={[]} />;

        case "SummaryPanel":
            return (
                <SummaryPanel
                    title="Project Summary"
                    sections={[
                        {
                            heading: "Progress Update",
                            content: "Currently in development phase with 60% completion. All core features are functional.",
                            type: "success",
                        },
                        {
                            heading: "Next Steps",
                            content: "Focus on integration testing and demo preparation for the upcoming hackathon.",
                            type: "info",
                        },
                    ]}
                    highlights={[
                        "10 components built and integrated",
                        "Core intelligence layer operational",
                        "Persona-based UI adaptation working",
                    ]}
                />
            );

        case "PersonaSwitcher":
            return <PersonaSwitcher variant="pills" />;

        default:
            return (
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <p className="text-gray-600">Component: {componentId}</p>
                </div>
            );
    }
}
