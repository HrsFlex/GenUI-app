/**
 * @file tambo.ts
 * @description Central configuration file for Tambo components and tools
 *
 * This file serves as the central place to register your Tambo components and tools.
 * It exports arrays that will be used by the TamboProvider.
 *
 * Read more about Tambo at https://tambo.co/docs
 */

// Original template components
import { Graph, graphSchema } from "@/components/tambo/graph";
import { DataCard, dataCardSchema } from "@/components/ui/card-data";

// ForceUI Generative Components
import { Timeline, timelineSchema } from "@/components/generative/Timeline";
import { StatsCard, statsCardSchema } from "@/components/generative/StatsCard";
import { ChartView, chartViewSchema } from "@/components/generative/ChartView";
import { SummaryPanel, summaryPanelSchema } from "@/components/generative/SummaryPanel";
import { ExplainabilityPanel, explainabilityPanelSchema } from "@/components/generative/ExplainabilityPanel";

// ForceUI Interactable Components
import { IntentChat, intentChatSchema } from "@/components/interactable/IntentChat";
import { KanbanBoard, kanbanBoardSchema } from "@/components/interactable/KanbanBoard";
import { NotesPanel, notesPanelSchema } from "@/components/interactable/NotesPanel";
import { PersonaSwitcher, personaSwitcherSchema } from "@/components/interactable/PersonaSwitcher";

// ForceUI Layout Components
import { AdaptiveGrid, adaptiveGridSchema } from "@/components/layout/AdaptiveGrid";

import {
  getCountryPopulations,
  getGlobalPopulationTrend,
} from "@/services/population-stats";
import type { TamboComponent } from "@tambo-ai/react";
import { TamboTool } from "@tambo-ai/react";
import { z } from "zod";

/**
 * tools
 *
 * This array contains all the Tambo tools that are registered for use within the application.
 * Each tool is defined with its name, description, and expected props. The tools
 * can be controlled by AI to dynamically fetch data based on user interactions.
 */

export const tools: TamboTool[] = [
  {
    name: "countryPopulation",
    description:
      "A tool to get population statistics by country with advanced filtering options",
    tool: getCountryPopulations,
    inputSchema: z.object({
      continent: z.string().optional(),
      sortBy: z.enum(["population", "growthRate"]).optional(),
      limit: z.number().optional(),
      order: z.enum(["asc", "desc"]).optional(),
    }),
    outputSchema: z.array(
      z.object({
        countryCode: z.string(),
        countryName: z.string(),
        continent: z.enum([
          "Asia",
          "Africa",
          "Europe",
          "North America",
          "South America",
          "Oceania",
        ]),
        population: z.number(),
        year: z.number(),
        growthRate: z.number(),
      })
    ),
  },
  {
    name: "globalPopulation",
    description:
      "A tool to get global population trends with optional year range filtering",
    tool: getGlobalPopulationTrend,
    inputSchema: z.object({
      startYear: z.number().optional(),
      endYear: z.number().optional(),
    }),
    outputSchema: z.array(
      z.object({
        year: z.number(),
        population: z.number(),
        growthRate: z.number(),
      })
    ),
  },
  // Add more tools here
];

/**
 * components
 *
 * This array contains all the Tambo components that are registered for use within the application.
 * Each component is defined with its name, description, and expected props. The components
 * can be controlled by AI to dynamically render UI elements based on user interactions.
 */
export const components: TamboComponent[] = [
  // Original template components
  {
    name: "Graph",
    description:
      "A component that renders various types of charts (bar, line, pie) using Recharts. Supports customizable data visualization with labels, datasets, and styling options.",
    component: Graph,
    propsSchema: graphSchema,
  },
  {
    name: "DataCard",
    description:
      "A component that displays options as clickable cards with links and summaries with the ability to select multiple items.",
    component: DataCard,
    propsSchema: dataCardSchema,
  },

  // ForceUI Generative Components
  {
    name: "Timeline",
    description:
      "Displays project timeline with phases, milestones, and events. Shows completed, in-progress, and upcoming events with dates. Ideal for project planning and roadmap visualization.",
    component: Timeline,
    propsSchema: timelineSchema,
  },
  {
    name: "StatsCard",
    description:
      "Shows key performance indicators and metrics in a grid layout. Displays values with trends (up/down) and percentage changes. Perfect for dashboards and data analysis.",
    component: StatsCard,
    propsSchema: statsCardSchema,
  },
  {
    name: "ChartView",
    description:
      "Renders data visualizations as bar charts, line charts, or pie charts using Recharts. Supports custom colors and axis labels. Great for analyzing trends and distributions.",
    component: ChartView,
    propsSchema: chartViewSchema,
  },
  {
    name: "SummaryPanel",
    description:
      "Displays aggregated information organized into sections with highlights and different styling (info, success, warning). Useful for reports and summaries.",
    component: SummaryPanel,
    propsSchema: summaryPanelSchema,
  },
  {
    name: "ExplainabilityPanel",
    description:
      "Shows why the AI selected specific UI components. Displays intent analysis, component decisions with scores and reasoning, and layout rationale. Key differentiator for transparency.",
    component: ExplainabilityPanel,
    propsSchema: explainabilityPanelSchema,
  },

  // ForceUI Interactable Components
  {
    name: "IntentChat",
    description:
      "Natural language input interface for conversing with the AI. Processes user intents and triggers UI assembly. Includes example prompts and loading states.",
    component: IntentChat,
    propsSchema: intentChatSchema,
  },
  {
    name: "KanbanBoard",
    description:
      "Interactive task management board with columns (To Do, In Progress, Done). Allows adding, moving, and deleting tasks. Perfect for project and workflow management.",
    component: KanbanBoard,
    propsSchema: kanbanBoardSchema,
  },
  {
    name: "NotesPanel",
    description:
      "Rich text note-taking with color-coded sticky notes. Supports creating, editing, and deleting notes with custom colors. Great for brainstorming and documentation.",
    component: NotesPanel,
    propsSchema: notesPanelSchema,
  },
  {
    name: "PersonaSwitcher",
    description:
      "Allows switching between different personas/roles (Founder, Developer, Recruiter, Analyst). Each persona optimizes the UI for their specific workflow.",
    component: PersonaSwitcher,
    propsSchema: personaSwitcherSchema,
  },

  // ForceUI Layout Component
  {
    name: "AdaptiveGrid",
    description:
      "Responsive grid layout that adapts based on persona preferences and screen size. Supports different densities (compact, comfortable, spacious) and layout modes (grid, sidebar, fullscreen).",
    component: AdaptiveGrid,
    propsSchema: adaptiveGridSchema,
  },
];

