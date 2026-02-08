/**
 * @file config/personas.ts
 * @description Persona definitions for ForceUI
 */

import { PersonaDefinition } from "@/types";

export const personas: PersonaDefinition[] = [
    {
        id: "founder",
        name: "Founder",
        description: "Strategic overview and business metrics",
        emoji: "🚀",
        preferredComponents: [
            "Timeline",
            "StatsCard",
            "ChartView",
            "SummaryPanel",
        ],
        defaultLayout: "grid",
    },
    {
        id: "developer",
        name: "Developer",
        description: "Code-focused workflow and technical tasks",
        emoji: "💻",
        preferredComponents: [
            "KanbanBoard",
            "NotesPanel",
            "ChartView",
        ],
        defaultLayout: "sidebar",
    },
    {
        id: "recruiter",
        name: "Recruiter",
        description: "Candidate pipeline and hiring metrics",
        emoji: "👥",
        preferredComponents: [
            "KanbanBoard",
            "StatsCard",
            "Timeline",
        ],
        defaultLayout: "grid",
    },
    {
        id: "analyst",
        name: "Analyst",
        description: "Data visualization and reporting",
        emoji: "📊",
        preferredComponents: [
            "ChartView",
            "StatsCard",
            "SummaryPanel",
            "Timeline",
        ],
        defaultLayout: "fullscreen",
    },
];

export function getPersona(id: string): PersonaDefinition | undefined {
    return personas.find((p) => p.id === id);
}
