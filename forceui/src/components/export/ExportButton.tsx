/**
 * @file components/export/ExportButton.tsx
 * @description Export button component for saving UI state
 */

"use client";

import { useState } from "react";
import { useExport, ExportOptions } from "@/hooks/useExport";
import { Download, FileJson, FileCode, Camera } from "lucide-react";

export function ExportButton() {
    const { isExporting, exportUIState } = useExport();
    const [showMenu, setShowMenu] = useState(false);

    const handleExport = async (format: ExportOptions["format"]) => {
        await exportUIState({
            format,
            includeMemory: true,
            includeComponentState: true,
        });
        setShowMenu(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setShowMenu(!showMenu)}
                disabled={isExporting}
                className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
            >
                <Download className="h-4 w-4" />
                {isExporting ? "Exporting..." : "Export"}
            </button>

            {showMenu && (
                <div className="absolute right-0 top-full z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
                    <div className="p-2">
                        <button
                            onClick={() => handleExport("json")}
                            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            <FileJson className="h-4 w-4 text-blue-600" />
                            <span>JSON State</span>
                        </button>
                        <button
                            onClick={() => handleExport("html")}
                            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            <FileCode className="h-4 w-4 text-green-600" />
                            <span>HTML Snapshot</span>
                        </button>
                        <button
                            onClick={() => handleExport("screenshot")}
                            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-gray-100"
                        >
                            <Camera className="h-4 w-4 text-purple-600" />
                            <span>Screenshot</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
