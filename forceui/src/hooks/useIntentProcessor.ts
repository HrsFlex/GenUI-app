/**
 * @file hooks/useIntentProcessor.ts
 * @description React hook for intent processing and component orchestration
 */

"use client";

import { useState, useCallback } from "react";
import { usePersonaStore } from "@/stores/personaStore";
import { useMemoryStore } from "@/stores/memoryStore";
import { useDecisionLogStore } from "@/stores/decisionLogStore";
import { classifyIntent } from "@/engine/intentClassifier";
import { orchestrateComponents } from "@/engine/orchestrator";
import { createDecisionLog } from "@/engine/explainability";
import { resolveContext } from "@/engine/contextResolver";
import { getPersona } from "@/config/personas";
import type { ComponentSelection } from "@/types";

export function useIntentProcessor() {
    const [isProcessing, setIsProcessing] = useState(false);
    const [lastSelection, setLastSelection] = useState<ComponentSelection | null>(
        null
    );

    const currentPersona = usePersonaStore((state) => state.currentPersona);

    // Use separate selectors to avoid creating new objects on every render
    const componentHistory = useMemoryStore((state) => state.componentHistory);
    const intentPatterns = useMemoryStore((state) => state.intentPatterns);
    const vocabularyMap = useMemoryStore((state) => state.vocabularyMap);
    const layoutPreferences = useMemoryStore((state) => state.layoutPreferences);
    const lastPersona = useMemoryStore((state) => state.lastPersona);

    const addDecisionLog = useDecisionLogStore((state) => state.addLog);
    const addIntentPattern = useMemoryStore((state) => state.addIntentPattern);

    const processIntent = useCallback(
        async (userInput: string) => {
            setIsProcessing(true);

            try {
                // Step 1: Classify intent
                const intentResult = await classifyIntent(userInput, false); // Set to true to use LLM

                // Override persona if detected from input
                // (In full version, this would update persona store)

                // Step 2: Orchestrate components
                const memory = {
                    componentHistory,
                    intentPatterns,
                    vocabularyMap,
                    layoutPreferences,
                };
                const selection = orchestrateComponents(intentResult, memory, 5);

                // Step 3: Log decision for explainability
                const decisionLog = createDecisionLog(
                    intentResult,
                    selection.components,
                    selection.layoutReasoning
                );
                addDecisionLog(decisionLog); // Changed addLog to addDecisionLog

                // Step 4: Add to memory
                addIntentPattern(
                    [intentResult.primary_intent, ...intentResult.sub_intents],
                    true // Assume satisfaction for now
                );

                // Step 5: Store selection
                setLastSelection(selection);

                return selection;
            } catch (error) {
                console.error("Intent processing error:", error);
                throw error;
            } finally {
                setIsProcessing(false);
            }
        },
        [currentPersona, componentHistory, intentPatterns, vocabularyMap, layoutPreferences, addDecisionLog, addIntentPattern]
    );

    return {
        processIntent,
        isProcessing,
        lastSelection,
    };
}
