/**
 * @file stores/decisionLogStore.ts
 * @description Zustand store for decision logging and explainability
 */

import { DecisionLog } from "@/types";
import { create } from "zustand";

interface DecisionLogState {
    logs: DecisionLog[];
    currentLog: DecisionLog | null;
    addLog: (log: DecisionLog) => void;
    setCurrentLog: (log: DecisionLog | null) => void;
    getRecentLogs: (count: number) => DecisionLog[];
}

export const useDecisionLogStore = create<DecisionLogState>((set, get) => ({
    logs: [],
    currentLog: null,

    addLog: (log) => {
        set({
            logs: [...get().logs, log].slice(-20), // Keep last 20 logs
            currentLog: log,
        });
    },

    setCurrentLog: (log) => {
        set({ currentLog: log });
    },

    getRecentLogs: (count) => {
        return get().logs.slice(-count);
    },
}));
