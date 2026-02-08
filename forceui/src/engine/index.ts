/**
 * @file engine/index.ts
 * @description Main export for ForceUI intelligence engine
 */

export { classifyIntent, classifyIntentBatch } from "./intentClassifier";
export { componentRegistry, ComponentRegistry } from "./componentRegistry";
export {
    orchestrateComponents,
    generateComponentProps,
} from "./orchestrator";
export { resolveContext, hasSignificantContextChange } from "./contextResolver";
export { createDecisionLog, formatExplainabilityData } from "./explainability";

// Re-export types for convenience
export type {
    IntentResult,
    ComponentDecision,
    ComponentSelection,
    ResolvedContext,
    DecisionLog,
} from "@/types";
