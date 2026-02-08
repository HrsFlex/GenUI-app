/**
 * @file engine/orchestrator.ts
 * @description Component orchestration logic - the "brain" of ForceUI
 */

import {
    IntentResult,
    ComponentDecision,
    ComponentSelection,
    UserMemory,
    Persona,
} from "@/types";
import { componentRegistry } from "./componentRegistry";
import { intentComponentMap } from "@/config/intentMappings";

/**
 * Calculate component score based on intent, memory, and persona
 */
function calculateComponentScore(
    componentId: string,
    intentResult: IntentResult,
    memory: Partial<UserMemory>
): number {
    const metadata = componentRegistry.getComponent(componentId);
    if (!metadata) return 0;

    let score = 0;

    // Base score from intent confidence
    if (metadata.intents.includes(intentResult.primary_intent)) {
        score += intentResult.confidence * 10;
    }

    // Bonus for sub-intents
    const subIntentMatches = intentResult.sub_intents.filter((si) =>
        metadata.intents.includes(si)
    ).length;
    score += subIntentMatches * 2;

    // Persona compatibility boost
    if (metadata.personas.includes(intentResult.persona)) {
        score += 3;
    }

    // Memory boost - frequently used components get priority
    if (memory.componentHistory) {
        const usageCount = memory.componentHistory.get(componentId) || 0;
        score += Math.min(usageCount * 0.5, 5); // Cap at +5 from usage
    }

    // Priority from metadata
    score += metadata.priority * 0.5;

    return score;
}

/**
 * Generate reasoning text for component selection
 */
function generateReasoning(
    componentId: string,
    intentResult: IntentResult,
    score: number
): string {
    const metadata = componentRegistry.getComponent(componentId);
    if (!metadata) return "Selected based on system defaults";

    const reasons: string[] = [];

    if (metadata.intents.includes(intentResult.primary_intent)) {
        reasons.push(`Matches primary intent: ${intentResult.primary_intent}`);
    }

    const subIntentMatches = intentResult.sub_intents.filter((si) =>
        metadata.intents.includes(si)
    );
    if (subIntentMatches.length > 0) {
        reasons.push(`Also relevant for: ${subIntentMatches.join(", ")}`);
    }

    if (metadata.personas.includes(intentResult.persona)) {
        reasons.push(`Optimized for ${intentResult.persona} persona`);
    }

    if (metadata.priority >= 8) {
        reasons.push("High priority component");
    }

    return reasons.join(" • ") || "Standard selection";
}

/**
 * Main orchestration function
 * Selects and ranks components based on intent + context
 */
export function orchestrateComponents(
    intentResult: IntentResult,
    memory: Partial<UserMemory>,
    maxComponents: number = 5
): ComponentSelection {
    // Get candidate components from primary intent
    const candidateIds = intentComponentMap[intentResult.primary_intent] || [];

    // Also include components from sub-intents
    intentResult.sub_intents.forEach((subIntent) => {
        const subComponents = intentComponentMap[subIntent] || [];
        candidateIds.push(...subComponents);
    });

    // Remove duplicates
    const uniqueCandidateIds = [...new Set(candidateIds)];

    // Calculate scores for each candidate
    const scoredComponents = uniqueCandidateIds
        .map((id) => ({
            componentId: id,
            score: calculateComponentScore(id, intentResult, memory),
            reasoning: "",
            props: {}, // Will be populated later
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, maxComponents);

    // Add reasoning to each
    scoredComponents.forEach((comp) => {
        comp.reasoning = generateReasoning(
            comp.componentId,
            intentResult,
            comp.score
        );
    });

    // Generate layout reasoning
    const layoutReasoning = generateLayoutReasoning(
        scoredComponents,
        intentResult
    );

    return {
        components: scoredComponents,
        layoutReasoning,
    };
}

/**
 * Generate explanation for layout decisions
 */
function generateLayoutReasoning(
    components: ComponentDecision[],
    intentResult: IntentResult
): string {
    if (components.length === 0) {
        return "No components selected for this intent";
    }

    const topComponent = components[0];
    const reasons: string[] = [];

    reasons.push(
        `${topComponent.componentId} placed prominently (highest match: ${topComponent.score.toFixed(1)}pts)`
    );

    if (components.length > 1) {
        const secondary = components.slice(1, 3).map((c) => c.componentId);
        reasons.push(`Supporting components: ${secondary.join(", ")}`);
    }

    reasons.push(`Layout optimized for ${intentResult.persona} workflow`);

    return reasons.join(" • ");
}

/**
 * Generate props for a specific component based on intent and entities
 */
export function generateComponentProps(
    componentId: string,
    intentResult: IntentResult
): Record<string, any> {
    // Default props generation based on component type
    // This will be customized per component implementation

    const baseProps: Record<string, any> = {
        intent: intentResult.primary_intent,
        entities: intentResult.entities,
    };

    // Component-specific prop generation
    switch (componentId) {
        case "Timeline":
            return {
                ...baseProps,
                title: intentResult.entities[0] || "Project Timeline",
                events: [], // Will be populated by component or tools
            };

        case "KanbanBoard":
            return {
                ...baseProps,
                title: "Tasks",
                columns: ["To Do", "In Progress", "Done"],
            };

        case "StatsCard":
            return {
                ...baseProps,
                metrics: [], // Will be populated by tools
            };

        case "ChartView":
            return {
                ...baseProps,
                type: "bar" as const,
                data: [],
            };

        case "NotesPanel":
            return {
                ...baseProps,
                title: "Notes",
                content: "",
            };

        default:
            return baseProps;
    }
}
