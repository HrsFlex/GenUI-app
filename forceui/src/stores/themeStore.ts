/**
 * @file stores/themeStore.ts
 * @description Zustand store for theme management
 */

import { ThemePreset, ThemeConfig } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const themeConfigs: Record<ThemePreset, ThemeConfig> = {
    default: {
        name: "default",
        density: "comfortable",
        colors: "default",
    },
    minimal: {
        name: "minimal",
        density: "spacious",
        colors: "grayscale",
    },
    cyberpunk: {
        name: "cyberpunk",
        density: "compact",
        colors: "neon",
    },
    investor: {
        name: "investor",
        density: "comfortable",
        colors: "professional",
    },
};

interface ThemeState {
    currentTheme: ThemePreset;
    config: ThemeConfig;
    setTheme: (theme: ThemePreset) => void;
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            currentTheme: "default",
            config: themeConfigs.default,

            setTheme: (theme) => {
                set({
                    currentTheme: theme,
                    config: themeConfigs[theme],
                });
            },
        }),
        {
            name: "forceui-theme",
        }
    )
);
