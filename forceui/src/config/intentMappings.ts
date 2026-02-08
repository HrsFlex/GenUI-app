/**
 * @file config/intentMappings.ts
 * @description Intent to component mapping configuration
 */

import { Intent } from "@/types";

export const intentComponentMap: Record<Intent, string[]> = {
    project_planning: ["Timeline", "KanbanBoard", "StatsCard", "NotesPanel"],
    task_management: ["KanbanBoard", "NotesPanel", "Timeline"],
    data_analysis: ["ChartView", "StatsCard", "SummaryPanel"],
    timeline_viz: ["Timeline", "StatsCard"],
    note_taking: ["NotesPanel"],
    persona_switch: ["PersonaSwitcher"],
    ui_explain: ["ExplainabilityPanel"],
    export_data: ["ExportPanel"],
    workflow_record: ["WorkflowRecorder"],
    mcp_status: ["MCPStatusPanel"],
};

export const intentKeywords: Record<Intent, string[]> = {
    project_planning: ["plan", "project", "launch", "roadmap", "strategy"],
    task_management: [
        "tasks",
        "todo",
        "action items",
        "checklist",
        "manage",
    ],
    data_analysis: ["analyze", "data", "metrics", "insights", "report"],
    timeline_viz: ["timeline", "schedule", "phases", "milestones", "gantt"],
    note_taking: ["notes", "write", "remember", "jot down"],
    persona_switch: ["switch", "mode", "persona", "role", "become"],
    ui_explain: ["why", "explain", "reasoning", "how", "show me"],
    export_data: ["export", "download", "save", "share"],
    workflow_record: ["record", "workflow", "capture", "replay", "automation"],
    mcp_status: ["integrations", "connections", "github", "calendar", "api", "mcp", "connected"],
};
