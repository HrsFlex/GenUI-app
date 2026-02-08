/**
 * @file hooks/useComponentOrchestration.ts
 * @description Hook for managing orchestrated component state
 */

"use client";

import { useEffect, useState } from "react";
import { ComponentSelection } from "@/types";
import { useMemoryStore } from "@/stores/memoryStore";

export function useComponentOrchestration(selection: ComponentSelection | null) {
    const [activeComponents, setActiveComponents] = useState<string[]>([]);
    const incrementUsage = useMemoryStore((state) => state.incrementComponentUsage);

    useEffect(() => {
        if (selection) {
            const componentIds = selection.components.map((c) => c.componentId);
            setActiveComponents(componentIds);

            // Track usage in memory
            componentIds.forEach((id) => {
                incrementUsage(id);
            });
        }
    }, [selection, incrementUsage]);

    return {
        activeComponents,
        selection,
    };
}
