/**
 * @file components/generative/SummaryPanel.tsx
 * @description Summary panel for displaying aggregated information
 */

"use client";

import { z } from "zod";
import { FileText, CheckCircle2, AlertCircle, Info } from "lucide-react";

// Zod schema for SummaryPanel props
export const summaryPanelSchema = z.object({
    title: z.string().describe("Summary title"),
    sections: z
        .array(
            z.object({
                id: z.string().optional(),
                heading: z.string().describe("Section heading"),
                content: z.string().describe("Section content"),
                type: z
                    .enum(["info", "success", "warning", "default"])
                    .optional()
                    .describe("Section type for styling"),
            })
        )
        .describe("Array of summary sections"),
    highlights: z
        .array(z.string())
        .optional()
        .describe("Key highlights or takeaways"),
});

type SummaryPanelProps = z.infer<typeof summaryPanelSchema>;

export function SummaryPanel({
    title,
    sections,
    highlights,
}: SummaryPanelProps) {
    return (
        <div className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <FileText className="h-6 w-6 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
            </div>

            {/* Highlights */}
            {highlights && highlights.length > 0 && (
                <div className="mb-6 rounded-lg bg-blue-50 p-4">
                    <h4 className="mb-2 flex items-center gap-2 text-sm font-medium text-blue-900">
                        <Info className="h-4 w-4" />
                        Key Highlights
                    </h4>
                    <ul className="list-disc space-y-1 pl-5">
                        {highlights.map((highlight, index) => (
                            <li key={index} className="text-sm text-blue-800">
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Sections */}
            <div className="space-y-4">
                {sections.map((section, index) => {
                    const type = section.type || "default";

                    const iconConfig = {
                        success: { icon: CheckCircle2, bgColor: "bg-green-50", textColor: "text-green-900", iconColor: "text-green-600" },
                        warning: { icon: AlertCircle, bgColor: "bg-amber-50", textColor: "text-amber-900", iconColor: "text-amber-600" },
                        info: { icon: Info, bgColor: "bg-blue-50", textColor: "text-blue-900", iconColor: "text-blue-600" },
                        default: { icon: FileText, bgColor: "bg-gray-50", textColor: "text-gray-900", iconColor: "text-gray-600" },
                    };

                    const config = iconConfig[type];
                    const Icon = config.icon;

                    return (
                        <div
                            key={section.id || index}
                            className={`rounded-lg ${config.bgColor} p-4`}
                        >
                            <h4 className={`mb-2 flex items-center gap-2 font-medium ${config.textColor}`}>
                                <Icon className={`h-4 w-4 ${config.iconColor}`} />
                                {section.heading}
                            </h4>
                            <p className={`text-sm ${config.textColor} opacity-90`}>
                                {section.content}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
