"use client";

import { Sparkles, Github, Linkedin, Lightbulb, Code, Rocket, Users } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-slate-900 transition-colors duration-300">
            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/20 dark:border-gray-800/50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link href="/forceui" className="flex items-center gap-4">
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
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    About the Project
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                {/* Hero Section */}
                <div className="mb-16 text-center">
                    <h1 className="mb-4 text-5xl font-bold text-gray-900 dark:text-gray-100">
                        The Journey Behind <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">ForceUI</span>
                    </h1>
                    <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300">
                        What started as a crazy idea during late-night coding sessions turned into something beautiful — and here's the real story.
                    </p>
                </div>

                {/* The Story */}
                <div className="mb-16 grid gap-8 md:grid-cols-2">
                    <div className="rounded-2xl border border-purple-200 dark:border-purple-900 bg-white dark:bg-gray-900 p-8 shadow-lg">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white">
                            <Lightbulb className="h-6 w-6" />
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">The Spark</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            I was tired of building the same dashboard layouts over and over. The problem wasn't the UI libraries — those are great.
                            The problem was that every user has different needs, different roles, different ways of thinking.
                            Why should they all see the same interface?
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            That's when it hit me: <strong className="text-purple-600 dark:text-purple-400">What if the UI could assemble itself based on what the user actually needs?</strong>
                            Not just responsive design, but <em>adaptive intelligence</em>.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-blue-200 dark:border-blue-900 bg-white dark:bg-gray-900 p-8 shadow-lg">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
                            <Rocket className="h-6 w-6" />
                        </div>
                        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-gray-100">The Build</h2>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            Building ForceUI was intense. I spent weeks prototyping the intent classification engine,
                            figuring out how to map natural language to component selections without making it feel robotic.
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                            The breakthrough came when I integrated MCP (Model Context Protocol) — suddenly the UI wasn't just reactive,
                            it was <strong className="text-blue-600 dark:text-blue-400">context-aware</strong>. It could pull real data from GitHub,
                            understand your calendar, and adapt the interface accordingly.
                        </p>
                    </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-16">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Technology & Innovation
                    </h2>
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-lg">
                        <div className="grid gap-6 md:grid-cols-3">
                            <div>
                                <h3 className="mb-3 text-lg font-semibold text-purple-600 dark:text-purple-400">Core Stack</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <li>• Next.js 15 (App Router)</li>
                                    <li>• TypeScript for type safety</li>
                                    <li>• Tailwind CSS + Framer Motion</li>
                                    <li>• Zustand for state management</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 text-lg font-semibold text-blue-600 dark:text-blue-400">AI & Intelligence</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <li>• Intent classification engine</li>
                                    <li>• Component orchestration logic</li>
                                    <li>• Persona-based adaptation</li>
                                    <li>• Explainability system</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-3 text-lg font-semibold text-green-600 dark:text-green-400">Integration</h3>
                                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                                    <li>• MCP (Model Context Protocol)</li>
                                    <li>• GitHub context integration</li>
                                    <li>• Calendar synchronization</li>
                                    <li>• Analytics data streaming</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Architecture Diagram */}
                <div className="mb-16">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
                        How It All Works
                    </h2>
                    <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-lg">
                        <div className="overflow-x-auto">
                            <div className="min-w-[800px]">
                                {/* Mermaid-style flow diagram using pure CSS */}
                                <div className="flex flex-col gap-6">
                                    {/* Layer 1: User Input */}
                                    <div className="flex justify-center">
                                        <div className="rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 px-6 py-4 text-center text-white shadow-lg">
                                            <div className="font-semibold">User Intent</div>
                                            <div className="text-sm opacity-90">"Plan a product launch"</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="h-8 w-0.5 bg-gradient-to-b from-purple-500 to-gray-400 dark:to-gray-600"></div>
                                    </div>

                                    {/* Layer 2: Processing */}
                                    <div className="flex justify-center gap-4">
                                        <div className="flex-1 rounded-xl border-2 border-purple-300 dark:border-purple-700 bg-purple-50 dark:bg-purple-950/30 px-4 py-3 text-center">
                                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Intent Classifier</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">NLP Analysis</div>
                                        </div>
                                        <div className="flex-1 rounded-xl border-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-950/30 px-4 py-3 text-center">
                                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Context Fetcher</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">MCP Integration</div>
                                        </div>
                                        <div className="flex-1 rounded-xl border-2 border-green-300 dark:border-green-700 bg-green-50 dark:bg-green-950/30 px-4 py-3 text-center">
                                            <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">Persona Check</div>
                                            <div className="text-xs text-gray-600 dark:text-gray-400">Role Detection</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="h-8 w-0.5 bg-gradient-to-b from-gray-400 to-indigo-500 dark:from-gray-600 dark:to-indigo-400"></div>
                                    </div>

                                    {/* Layer 3: Orchestration */}
                                    <div className="flex justify-center">
                                        <div className="w-3/4 rounded-xl border-2 border-indigo-300 dark:border-indigo-700 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 px-6 py-4 text-center">
                                            <div className="font-semibold text-gray-900 dark:text-gray-100">Component Orchestrator</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">Selects: Timeline + Kanban + StatsCard</div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center">
                                        <div className="h-8 w-0.5 bg-gradient-to-b from-indigo-500 to-emerald-500 dark:from-indigo-400 dark:to-emerald-400"></div>
                                    </div>

                                    {/* Layer 4: Output */}
                                    <div className="flex justify-center">
                                        <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-center text-white shadow-lg">
                                            <div className="font-semibold">Adaptive UI Rendered</div>
                                            <div className="text-sm opacity-90">Personalized for Founder persona</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            The entire process happens in milliseconds, creating a seamless experience
                        </p>
                    </div>
                </div>

                {/* Connect Section */}
                <div className="mb-16">
                    <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Let's Connect
                    </h2>
                    <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-lg">
                        <div className="mb-6 flex items-center gap-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-3xl text-white">
                                H
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Harsh Kumar</h3>
                                <p className="text-gray-600 dark:text-gray-400">Builder, Creator, Problem Solver</p>
                            </div>
                        </div>
                        <p className="mb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
                            I'm always interested in connecting with fellow developers, designers, and anyone passionate about pushing the boundaries of user experience.
                            Whether you want to collaborate, discuss ideas, or just chat about tech — hit me up!
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <a
                                href="https://www.linkedin.com/in/harsh-kumar-b0b879245/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 px-6 py-3 font-medium text-blue-700 dark:text-blue-300 transition-all hover:bg-blue-100 dark:hover:bg-blue-900/50 hover:shadow-md"
                            >
                                <Linkedin className="h-5 w-5" />
                                Connect on LinkedIn
                            </a>
                            <a
                                href="https://github.com/HrsFlex"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-6 py-3 font-medium text-gray-700 dark:text-gray-300 transition-all hover:bg-gray-100 dark:hover:bg-gray-700 hover:shadow-md"
                            >
                                <Github className="h-5 w-5" />
                                Check out my GitHub
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="text-center">
                    <Link
                        href="/forceui"
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105"
                    >
                        <Code className="h-5 w-5" />
                        Try ForceUI Now
                    </Link>
                </div>
            </main>
        </div>
    );
}
