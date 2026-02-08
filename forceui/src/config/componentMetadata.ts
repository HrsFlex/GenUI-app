/**
 * @file config/componentMetadata.ts
 * @description Component metadata registry for orchestration
 */

import { ComponentMetadata } from "@/types";

export const componentMetadata: ComponentMetadata[] = [
    {
        id: "Timeline",
        name: "Timeline",
        type: "generative",
        intents: ["project_planning", "timeline_viz"],
        personas: ["founder", "analyst"],
        priority: 10,
    },
    {
        id: "KanbanBoard",
        name: "KanbanBoard",
        type: "interactable",
        intents: ["task_management", "project_planning"],
        personas: ["founder", "developer", "recruiter"],
        priority: 9,
    },
    {
        id: "StatsCard",
        name: "StatsCard",
        type: "generative",
        intents: ["data_analysis", "project_planning"],
        personas: ["founder", "analyst", "recruiter"],
        priority: 7,
    },
    {
        id: "ChartView",
        name: "ChartView",
        type: "generative",
        intents: ["data_analysis", "timeline_viz"],
        personas: ["analyst", "founder"],
        priority: 8,
    },
    {
        id: "NotesPanel",
        name: "NotesPanel",
        type: "interactable",
        intents: ["note_taking", "task_management"],
        personas: ["founder", "developer", "recruiter", "analyst"],
        priority: 6,
    },
    {
        id: "SummaryPanel",
        name: "SummaryPanel",
        type: "generative",
        intents: ["data_analysis", "ui_explain"],
        personas: ["analyst", "founder"],
        priority: 5,
    },
    {
        id: "PersonaSwitcher",
        name: "PersonaSwitcher",
        type: "interactable",
        intents: ["persona_switch"],
        personas: ["founder", "developer", "recruiter", "analyst"],
        priority: 10,
    },
    {
        id: "ExplainabilityPanel",
        name: "ExplainabilityPanel",
        type: "generative",
        intents: ["ui_explain"],
        personas: ["founder", "developer", "recruiter", "analyst"],
        priority: 10,
    },
    {
        id: "ExportPanel",
        name: "ExportPanel",
        type: "generative",
        intents: ["export_data"],
        personas: ["founder", "developer", "recruiter", "analyst"],
        priority: 4,
    },
    {
        id: "IntentChat",
        name: "IntentChat",
        type: "interactable",
        intents: [], // Always visible
        personas: ["founder", "developer", "recruiter", "analyst"],
        priority: 10,
    },
];

export function getComponentMetadata(id: string): ComponentMetadata | undefined {
    return componentMetadata.find((c) => c.id === id);
}

export function getComponentsByIntent(intent: string): ComponentMetadata[] {
    return componentMetadata.filter((c) => c.intents.includes(intent as any));
}

export function getComponentsByPersona(persona: string): ComponentMetadata[] {
    return componentMetadata.filter((c) => c.personas.includes(persona as any));
}
