/**
 * @file components/interactable/IntentChat.tsx
 * @description Main chat interface for natural language input
 */

"use client";

import { useState } from "react";
import { z } from "zod";
import { Send, Sparkles } from "lucide-react";
import { useIntentProcessor } from "@/hooks/useIntentProcessor";

// Zod schema for IntentChat props
export const intentChatSchema = z.object({
    placeholder: z
        .string()
        .optional()
        .describe("Placeholder text for input"),
    onIntent: z
        .function()
        .args(z.string())
        .returns(z.void())
        .optional()
        .describe("Callback when intent is processed"),
});

type IntentChatProps = z.infer<typeof intentChatSchema>;

export function IntentChat({
    placeholder = "What would you like to do?",
    onIntent,
}: IntentChatProps) {
    const [input, setInput] = useState("");
    const { processIntent, isProcessing } = useIntentProcessor();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isProcessing) return;

        const userInput = input;
        setInput(""); // Clear input immediately

        try {
            await processIntent(userInput);
            onIntent?.(userInput);
        } catch (error) {
            console.error("Failed to process intent:", error);
        }
    };

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit} className="relative">
                <div className="relative flex items-center">
                    <div className="absolute left-4 flex items-center gap-2 text-purple-600">
                        <Sparkles className="h-5 w-5 animate-pulse" />
                    </div>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isProcessing}
                        placeholder={placeholder}
                        className="w-full rounded-full border-2 border-purple-300 bg-white py-4 pl-14 pr-14 text-lg outline-none transition-all placeholder:text-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 disabled:bg-gray-50"
                    />

                    <button
                        type="submit"
                        disabled={!input.trim() || isProcessing}
                        className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white transition-all hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        ) : (
                            <Send className="h-5 w-5" />
                        )}
                    </button>
                </div>
            </form>

            {/* Example prompts */}
            <div className="mt-4 flex flex-wrap gap-2">
                {[
                    "Plan a new project",
                    "Show me my tasks",
                    "Analyze the data",
                    "Switch to developer mode",
                ].map((example) => (
                    <button
                        key={example}
                        onClick={() => setInput(example)}
                        className="rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition-colors hover:border-purple-400 hover:bg-purple-50"
                    >
                        {example}
                    </button>
                ))}
            </div>
        </div>
    );
}
