/**
 * @file components/layout/AdaptiveGrid.tsx
 * @description Adaptive grid layout that responds to persona and content
 */

"use client";

import { z } from "zod";
import { usePersonaStore } from "@/stores/personaStore";
import { getPersona } from "@/config/personas";
import { ReactNode } from "react";

// Zod schema for AdaptiveGrid props
export const adaptiveGridSchema = z.object({
    children: z.any().describe("Child components to layout"),
    density: z
        .enum(["compact", "comfortable", "spacious"])
        .optional()
        .describe("Grid density"),
});

type AdaptiveGridProps = {
    children: ReactNode;
    density?: "compact" | "comfortable" | "spacious";
};

export function AdaptiveGrid({
    children,
    density = "comfortable",
}: AdaptiveGridProps) {
    const currentPersona = usePersonaStore((state) => state.currentPersona);
    const personaConfig = getPersona(currentPersona);

    // Get layout based on persona preference
    const layout = personaConfig?.defaultLayout || "grid";

    // Grid density classes
    const densityClasses = {
        compact: "gap-3 p-4",
        comfortable: "gap-6 p-6",
        spacious: "gap-8 p-8",
    };

    // Layout classes
    const layoutClasses = {
        grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        sidebar: "grid grid-cols-1 lg:grid-cols-[300px_1fr]",
        fullscreen: "flex flex-col",
    };

    return (
        <div
            className={`w-full ${layoutClasses[layout]} ${densityClasses[density]}`}
        >
            {children}
        </div>
    );
}

// Component wrapper for adding to grid
export function GridItem({
    children,
    span = 1,
}: {
    children: ReactNode;
    span?: 1 | 2 | 3;
}) {
    const spanClasses = {
        1: "",
        2: "md:col-span-2",
        3: "md:col-span-3 lg:col-span-3",
    };

    return <div className={spanClasses[span]}>{children}</div>;
}
