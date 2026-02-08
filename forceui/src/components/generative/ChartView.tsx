/**
 * @file components/generative/ChartView.tsx
 * @description Chart component for data visualization using Recharts
 */

"use client";

import { z } from "zod";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

// Zod schema for ChartView props
export const chartViewSchema = z.object({
    type: z.enum(["bar", "line", "pie"]).describe("Chart type"),
    data: z
        .array(
            z.object({
                name: z.string(),
                value: z.number(),
            })
        )
        .describe("Chart data points"),
    title: z.string().optional().describe("Chart title"),
    xAxisLabel: z.string().optional().describe("X-axis label"),
    yAxisLabel: z.string().optional().describe("Y-axis label"),
    colors: z.array(z.string()).optional().describe("Custom color palette"),
});

type ChartViewProps = z.infer<typeof chartViewSchema>;

const DEFAULT_COLORS = [
    "#3b82f6", // blue
    "#10b981", // green
    "#f59e0b", // amber
    "#ef4444", // red
    "#8b5cf6", // purple
    "#ec4899", // pink
];

export function ChartView({
    type,
    data,
    title,
    xAxisLabel,
    yAxisLabel,
    colors = DEFAULT_COLORS,
}: ChartViewProps) {
    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {title && (
                <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
            )}

            <ResponsiveContainer width="100%" height={300}>
                {type === "bar" && (
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" label={xAxisLabel ? { value: xAxisLabel, position: "insideBottom", offset: -5 } : undefined} />
                        <YAxis label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft" } : undefined} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" fill={colors[0]} />
                    </BarChart>
                )}

                {type === "line" && (
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" label={xAxisLabel ? { value: xAxisLabel, position: "insideBottom", offset: -5 } : undefined} />
                        <YAxis label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: "insideLeft" } : undefined} />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={colors[0]}
                            strokeWidth={2}
                        />
                    </LineChart>
                )}

                {type === "pie" && (
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={(entry: any) =>
                                `${entry.name}: ${(entry.percent * 100).toFixed(0)}%`
                            }
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}
