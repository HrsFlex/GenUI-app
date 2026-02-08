/**
 * @file stores/memoryStore.ts
 * @description Zustand store for user memory and personalization
 */

import { Intent, IntentSequence, LayoutConfig, UserMemory } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MemoryState extends UserMemory {
    // Actions
    incrementComponentUsage: (componentId: string) => void;
    addIntentPattern: (intents: Intent[], satisfaction: boolean) => void;
    updateVocabulary: (userTerm: string, canonical: string) => void;
    updateLayoutPreference: (config: Partial<LayoutConfig>) => void;
}

export const useMemoryStore = create<MemoryState>()(
    persist(
        (set, get) => ({
            componentHistory: new Map(),
            intentPatterns: [],
            vocabularyMap: new Map(),
            layoutPreferences: {
                defaultGrid: "comfortable",
                componentSizes: {},
            },
            lastPersona: "founder",

            incrementComponentUsage: (componentId) => {
                const history = new Map(get().componentHistory);
                const currentCount = history.get(componentId) || 0;
                history.set(componentId, currentCount + 1);
                set({ componentHistory: history });
            },

            addIntentPattern: (intents, satisfaction) => {
                const newPattern: IntentSequence = {
                    intents,
                    timestamp: Date.now(),
                    satisfaction,
                };
                set({
                    intentPatterns: [...get().intentPatterns, newPattern].slice(-50), // Keep last 50
                });
            },

            updateVocabulary: (userTerm, canonical) => {
                const vocab = new Map(get().vocabularyMap);
                vocab.set(userTerm.toLowerCase(), canonical);
                set({ vocabularyMap: vocab });
            },

            updateLayoutPreference: (config) => {
                set({
                    layoutPreferences: {
                        ...get().layoutPreferences,
                        ...config,
                    },
                });
            },
        }),
        {
            name: "forceui-memory",
            // Serialize Map objects for storage
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    const data = JSON.parse(str);
                    return {
                        state: {
                            ...data.state,
                            componentHistory: new Map(data.state.componentHistory),
                            vocabularyMap: new Map(data.state.vocabularyMap),
                        },
                    };
                },
                setItem: (name, value) => {
                    const data = {
                        state: {
                            ...value.state,
                            componentHistory: Array.from(
                                value.state.componentHistory.entries()
                            ),
                            vocabularyMap: Array.from(value.state.vocabularyMap.entries()),
                        },
                    };
                    localStorage.setItem(name, JSON.stringify(data));
                },
                removeItem: (name) => localStorage.removeItem(name),
            },
        }
    )
);
