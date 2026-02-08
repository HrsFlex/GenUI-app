/**
 * @file hooks/useExport.ts
 * @description Export functionality for saving UI state
 */

"use client";

import { useState } from "react";
import html2canvas from "html2canvas";

export interface ExportOptions {
    format: "json" | "html" | "screenshot";
    includeMemory?: boolean;
    includeComponentState?: boolean;
}

export function useExport() {
    const [isExporting, setIsExporting] = useState(false);

    const exportAsJSON = async (data: any, filename: string = "forceui-export") => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        downloadBlob(blob, `${filename}.json`);
    };

    const exportAsHTML = async (elementId: string, filename: string = "forceui-snapshot") => {
        const element = document.getElementById(elementId);
        if (!element) {
            throw new Error(`Element with id "${elementId}" not found`);
        }

        const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ForceUI Export</title>
  <style>
    ${document.head.querySelector("style")?.textContent || ""}
  </style>
</head>
<body>
  ${element.outerHTML}
</body>
</html>
    `;

        const blob = new Blob([htmlContent], { type: "text/html" });
        downloadBlob(blob, `${filename}.html`);
    };

    const exportAsScreenshot = async (
        elementId: string,
        filename: string = "forceui-screenshot"
    ) => {
        setIsExporting(true);
        try {
            const element = document.getElementById(elementId);
            if (!element) {
                throw new Error(`Element with id "${elementId}" not found`);
            }

            const canvas = await html2canvas(element, {
                backgroundColor: "#ffffff",
                scale: 2,
            });

            canvas.toBlob((blob) => {
                if (blob) {
                    downloadBlob(blob, `${filename}.png`);
                }
            });
        } finally {
            setIsExporting(false);
        }
    };

    const exportUIState = async (options: ExportOptions = { format: "json" }) => {
        setIsExporting(true);
        try {
            const state: any = {
                timestamp: new Date().toISOString(),
                version: "1.0.0",
            };

            if (options.includeMemory) {
                const memoryStore = localStorage.getItem("memory-store");
                if (memoryStore) {
                    state.memory = JSON.parse(memoryStore);
                }
            }

            if (options.includeComponentState) {
                const personaStore = localStorage.getItem("persona-store");
                const themeStore = localStorage.getItem("theme-store");

                state.componentState = {
                    persona: personaStore ? JSON.parse(personaStore) : null,
                    theme: themeStore ? JSON.parse(themeStore) : null,
                };
            }

            switch (options.format) {
                case "json":
                    await exportAsJSON(state);
                    break;
                case "html":
                    await exportAsHTML("main-content");
                    break;
                case "screenshot":
                    await exportAsScreenshot("main-content");
                    break;
            }
        } finally {
            setIsExporting(false);
        }
    };

    return {
        isExporting,
        exportAsJSON,
        exportAsHTML,
        exportAsScreenshot,
        exportUIState,
    };
}

// Helper function to download blob
function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
