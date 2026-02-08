/**
 * @file components/generative/Timeline.tsx
 * @description Timeline component for visualizing project phases and milestones
 */

"use client";

import { z } from "zod";
import { format } from "date-fns";

// Zod schema for Timeline props
export const timelineSchema = z.object({
    title: z.string().describe("Title of the timeline"),
    events: z
        .array(
            z.object({
                id: z.string().optional(),
                date: z.string().describe("ISO date string or readable date"),
                name: z.string().describe("Event name"),
                description: z.string().describe("Event description"),
                status: z
                    .enum(["completed", "in-progress", "upcoming"])
                    .optional()
                    .describe("Event status"),
            })
        )
        .describe("Array of timeline events"),
});

type TimelineProps = z.infer<typeof timelineSchema>;

export function Timeline({ title, events }: TimelineProps) {
    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-xl font-semibold text-gray-900">{title}</h3>

            <div className="relative space-y-8">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 h-full w-0.5 bg-gray-200" />

                {events.map((event, index) => {
                    const status = event.status || "upcoming";
                    const isCompleted = status === "completed";
                    const isInProgress = status === "in-progress";

                    return (
                        <div key={event.id || index} className="relative flex gap-6">
                            {/* Timeline dot */}
                            <div className="relative z-10 flex-shrink-0">
                                <div
                                    className={`h-8 w-8 rounded-full border-4 ${isCompleted
                                        ? "border-green-500 bg-green-100"
                                        : isInProgress
                                            ? "border-blue-500 bg-blue-100 animate-pulse"
                                            : "border-gray-300 bg-gray-50"
                                        }`}
                                />
                            </div>

                            {/* Event content */}
                            <div className="flex-1 pb-8 min-w-0">
                                <div className="flex items-baseline justify-between gap-4 flex-wrap">
                                    <h4 className="text-lg font-medium text-gray-900">
                                        {event.name}
                                    </h4>
                                    <time className="text-sm text-gray-500 flex-shrink-0">
                                        {formatEventDate(event.date)}
                                    </time>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                    {event.description}
                                </p>
                                {status && (
                                    <span
                                        className={`mt-2 inline-block rounded-full px-2 py-1 text-xs font-medium ${isCompleted
                                            ? "bg-green-100 text-green-700"
                                            : isInProgress
                                                ? "bg-blue-100 text-blue-700"
                                                : "bg-gray-100 text-gray-700"
                                            }`}
                                    >
                                        {status}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function formatEventDate(dateString: string): string {
    try {
        const date = new Date(dateString);
        return format(date, "MMM d, yyyy");
    } catch {
        return dateString; // Return as-is if parsing fails
    }
}
