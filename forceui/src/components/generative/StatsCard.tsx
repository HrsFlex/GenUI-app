/**
 * @file components/generative/StatsCard.tsx
 * @description Stats card component for displaying KPI metrics
 */

"use client";

import { z } from "zod";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

// Zod schema for StatsCard props
export const statsCardSchema = z.object({
    metrics: z
        .array(
            z.object({
                id: z.string().optional(),
                label: z.string().describe("Metric label"),
                value: z.union([z.string(), z.number()]).describe("Metric value"),
                change: z
                    .number()
                    .optional()
                    .describe("Percentage change (positive or negative)"),
                trend: z
                    .enum(["up", "down", "neutral"])
                    .optional()
                    .describe("Trend direction"),
                unit: z.string().optional().describe("Unit (%, $, etc)"),
            })
        )
        .describe("Array of metrics to display"),
    variant: z
        .enum(["default", "compact", "detailed"])
        .optional()
        .describe("Display variant"),
});

type StatsCardProps = z.infer<typeof statsCardSchema>;

export function StatsCard({ metrics, variant = "default" }: StatsCardProps) {
    const isCompact = variant === "compact";

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {metrics.map((metric, index) => {
                const trend = metric.trend || (metric.change && metric.change > 0 ? "up" : metric.change && metric.change < 0 ? "down" : "neutral");

                return (
                    <div
                        key={metric.id || index}
                        className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-600">
                                    {metric.label}
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900">
                                    {metric.value}
                                    {metric.unit && (
                                        <span className="ml-1 text-xl text-gray-500">
                                            {metric.unit}
                                        </span>
                                    )}
                                </p>
                            </div>
                            {metric.change !== undefined && (
                                <div
                                    className={`flex items-center gap-1 rounded-full px-2 py-1 ${trend === "up"
                                            ? "bg-green-100 text-green-700"
                                            : trend === "down"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {trend === "up" && <TrendingUp className="h-4 w-4" />}
                                    {trend === "down" && <TrendingDown className="h-4 w-4" />}
                                    {trend === "neutral" && <Minus className="h-4 w-4" />}
                                    <span className="text-sm font-medium">
                                        {Math.abs(metric.change)}%
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
