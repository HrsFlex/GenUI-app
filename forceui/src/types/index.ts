/**
 * @file types/index.ts
 * @description Central type definitions for ForceUI
 */

import { z } from "zod";

// ============================================
// INTENT TYPES
// ============================================

export type Intent =
  | "project_planning"
  | "task_management"
  | "data_analysis"
  | "timeline_viz"
  | "note_taking"
  | "persona_switch"
  | "ui_explain"
  | "export_data"
  | "workflow_record";

export interface IntentResult {
  primary_intent: Intent;
  sub_intents: Intent[];
  entities: string[];
  persona: Persona;
  confidence: number;
  raw_input: string;
}

// ============================================
// PERSONA TYPES
// ============================================

export type Persona = "founder" | "developer" | "recruiter" | "analyst";

export interface PersonaDefinition {
  id: Persona;
  name: string;
  description: string;
  emoji: string;
  preferredComponents: string[];
  defaultLayout: "grid" | "sidebar" | "fullscreen";
}

// ============================================
// COMPONENT TYPES
// ============================================

export interface ComponentMetadata {
  id: string;
  name: string;
  type: "generative" | "interactable";
  intents: Intent[];
  personas: Persona[];
  priority: number;
}

export interface ComponentDecision {
  componentId: string;
  score: number;
  reasoning: string;
  props: Record<string, any>;
}

export interface ComponentSelection {
  components: ComponentDecision[];
  layoutReasoning: string;
}

// ============================================
// MEMORY TYPES
// ============================================

export interface UserMemory {
  componentHistory: Map<string, number>;
  intentPatterns: IntentSequence[];
  vocabularyMap: Map<string, string>;
  layoutPreferences: LayoutConfig;
  lastPersona: Persona;
}

export interface IntentSequence {
  intents: Intent[];
  timestamp: number;
  satisfaction: boolean;
}

export interface LayoutConfig {
  defaultGrid: "compact" | "comfortable" | "spacious";
  componentSizes: Record<string, "sm" | "md" | "lg" | "xl">;
}

// ============================================
// CONTEXT TYPES
// ============================================

export interface ResolvedContext {
  persona: Persona;
  memory: Partial<UserMemory>;
  timestamp: number;
  sessionId: string;
}

// ============================================
// DECISION LOG TYPES
// ============================================

export interface DecisionLog {
  id: string;
  timestamp: number;
  intentAnalysis: IntentResult;
  selectedComponents: ComponentDecision[];
  layoutReasoning: string;
}

// ============================================
// THEME TYPES
// ============================================

export type ThemePreset = "minimal" | "cyberpunk" | "investor" | "default";

export interface ThemeConfig {
  name: ThemePreset;
  density: "compact" | "comfortable" | "spacious";
  colors: "default" | "grayscale" | "neon" | "professional";
}
