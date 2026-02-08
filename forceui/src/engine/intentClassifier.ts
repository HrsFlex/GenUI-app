/**
 * @file engine/intentClassifier.ts
 * @description Intent classification engine using LLM for natural language understanding
 */

import { Intent, IntentResult, Persona } from "@/types";
import { intentKeywords } from "@/config/intentMappings";

/**
 * Classifies user input into structured intent using LLM
 * For MVP, we'll use a hybrid approach:
 * 1. Keyword matching for fast common cases
 * 2. LLM analysis for complex/ambiguous inputs
 */

// Simple keyword-based classification (fast fallback)
function keywordBasedClassification(input: string): Partial<IntentResult> {
    const lowerInput = input.toLowerCase();
    const scores: Record<Intent, number> = {} as any;

    // Score each intent based on keyword matches
    Object.entries(intentKeywords).forEach(([intent, keywords]) => {
        const matchCount = keywords.filter((kw) =>
            lowerInput.includes(kw.toLowerCase())
        ).length;
        scores[intent as Intent] = matchCount;
    });

    // Get top scored intents
    const sortedIntents = (Object.entries(scores) as [Intent, number][])
        .sort(([, a], [, b]) => b - a)
        .filter(([, score]) => score > 0);

    if (sortedIntents.length === 0) {
        return {
            primary_intent: "project_planning" as Intent, // Default fallback
            sub_intents: [],
            confidence: 0.3,
        };
    }

    return {
        primary_intent: sortedIntents[0][0],
        sub_intents: sortedIntents.slice(1, 3).map(([intent]) => intent),
        confidence: Math.min(0.7, sortedIntents[0][1] / 3), // Cap at 0.7 for keyword matching
    };
}

// Detect persona from input
function detectPersona(input: string): Persona {
    const lowerInput = input.toLowerCase();

    if (
        lowerInput.includes("developer") ||
        lowerInput.includes("engineer") ||
        lowerInput.includes("code")
    ) {
        return "developer";
    }

    if (
        lowerInput.includes("recruit") ||
        lowerInput.includes("hiring") ||
        lowerInput.includes("candidate")
    ) {
        return "recruiter";
    }

    if (
        lowerInput.includes("analy") ||
        lowerInput.includes("data") ||
        lowerInput.includes("metric")
    ) {
        return "analyst";
    }

    return "founder"; // Default
}

// Extract entities (simple approach for MVP)
function extractEntities(input: string): string[] {
    const entities: string[] = [];

    // Look for quoted strings
    const quotedMatches = input.match(/"([^"]+)"/g);
    if (quotedMatches) {
        entities.push(...quotedMatches.map((m) => m.replace(/"/g, "")));
    }

    // Look for capitalized words (potential names/titles)
    const capitalizedMatches = input.match(/\b[A-Z][a-z]+(?:\s+[A-Z][a-z]+)*\b/g);
    if (capitalizedMatches) {
        entities.push(
            ...capitalizedMatches.filter((m) => m.length > 2 && m !== input)
        );
    }

    return [...new Set(entities)]; // Remove duplicates
}

/**
 * LLM-based classification (using Tambo's backend or OpenAI)
 * This provides more accurate intent detection for complex queries
 */
async function llmBasedClassification(
    input: string
): Promise<Partial<IntentResult>> {
    try {
        // For now, we'll use a mock implementation
        // In production, this would call OpenAI/Anthropic via Tambo or directly

        const prompt = `Analyze this user request and extract:
- primary_intent: one of [project_planning, task_management, data_analysis, timeline_viz, note_taking, persona_switch, ui_explain, export_data, workflow_record]
- sub_intents: array of secondary intents
- entities: important nouns/names mentioned
- persona: detected role [founder, developer, recruiter, analyst]
- confidence: 0-1 score

User input: "${input}"

Return JSON only.`;

        // TODO: Implement actual LLM call
        // const response = await openai.chat.completions.create({
        //   model: 'gpt-4o',
        //   messages: [{ role: 'user', content: prompt }],
        //   response_format: { type: 'json_object' }
        // });

        // For MVP, fall back to keyword matching
        return keywordBasedClassification(input);
    } catch (error) {
        console.error("LLM classification failed:", error);
        return keywordBasedClassification(input);
    }
}

/**
 * Main classification function
 * Uses hybrid approach: keyword matching + optional LLM enhancement
 */
export async function classifyIntent(
    input: string,
    useLLM: boolean = false
): Promise<IntentResult> {
    // Start with keyword-based classification
    const keywordResult = keywordBasedClassification(input);

    // If confidence is low or LLM is requested, enhance with LLM
    let finalResult: Partial<IntentResult>;
    if (useLLM && keywordResult.confidence! < 0.6) {
        finalResult = await llmBasedClassification(input);
    } else {
        finalResult = keywordResult;
    }

    // Fill in remaining fields
    const persona = detectPersona(input);
    const entities = extractEntities(input);

    return {
        primary_intent: finalResult.primary_intent || "project_planning",
        sub_intents: finalResult.sub_intents || [],
        entities,
        persona,
        confidence: finalResult.confidence || 0.5,
        raw_input: input,
    };
}

/**
 * Batch classification for multiple inputs
 * Useful for analyzing conversation history
 */
export async function classifyIntentBatch(
    inputs: string[]
): Promise<IntentResult[]> {
    return Promise.all(inputs.map((input) => classifyIntent(input)));
}
