/**
 * @file engine/explainability.ts
 * @description Decision logging and explainability system
 */

import { DecisionLog, IntentResult, ComponentDecision } from "@/types";

/**
 * Create a decision log entry
 */
export function createDecisionLog(
    intentAnalysis: IntentResult,
    selectedComponents: ComponentDecision[],
    layoutReasoning: string
): DecisionLog {
    return {
        id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        intentAnalysis,
        selectedComponents,
        layoutReasoning,
    };
}

/**
 * Format decision log for explainability panel
 */
export function formatExplainabilityData(log: DecisionLog) {
    return {
        intentAnalysis: {
            input: log.intentAnalysis.raw_input,
            primary: log.intentAnalysis.primary_intent,
            confidence: Math.round(log.intentAnalysis.confidence * 100),
            subIntents: log.intentAnalysis.sub_intents,
        },
        componentDecisions: log.selectedComponents.map((c) => ({
            name: c.componentId,
            score: Math.round(c.score * 10) / 10,
            reasoning: c.reasoning,
        })),
        layoutReasoning: log.layoutReasoning,
    };
}
