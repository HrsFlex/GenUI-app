/**
 * @file engine/contextResolver.ts
 * @description Context resolution system combining persona, memory, and current state
 */

import { Persona, UserMemory } from "@/types";

export interface ResolvedContext {
    persona: Persona;
    memory: Partial<UserMemory>;
    timestamp: number;
    sessionId: string;
}

/**
 * Resolve full context for decision making
 * Combines current persona, user memory, and session state
 */
export function resolveContext(
    persona: Persona,
    memory: Partial<UserMemory>
): ResolvedContext {
    return {
        persona,
        memory,
        timestamp: Date.now(),
        sessionId: getSessionId(),
    };
}

/**
 * Get or create session ID
 */
function getSessionId(): string {
    if (typeof window === "undefined") return "server";

    let sessionId = sessionStorage.getItem("forceui-session-id");
    if (!sessionId) {
        sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem("forceui-session-id", sessionId);
    }
    return sessionId;
}

/**
 * Check if context has changed significantly
 * Used to determine if UI should re-orchestrate
 */
export function hasSignificantContextChange(
    oldContext: ResolvedContext,
    newContext: ResolvedContext
): boolean {
    // Persona changed
    if (oldContext.persona !== newContext.persona) {
        return true;
    }

    // Session changed
    if (oldContext.sessionId !== newContext.sessionId) {
        return true;
    }

    // Memory pattern changed significantly (more than 30 minutes)
    const timeDiff = newContext.timestamp - oldContext.timestamp;
    if (timeDiff > 30 * 60 * 1000) {
        return true;
    }

    return false;
}
