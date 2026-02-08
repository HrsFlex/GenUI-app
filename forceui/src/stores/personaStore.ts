/**
 * @file stores/personaStore.ts
 * @description Zustand store for persona management
 */

import { Persona } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PersonaState {
    currentPersona: Persona;
    setPersona: (persona: Persona) => void;
}

export const usePersonaStore = create<PersonaState>()(
    persist(
        (set) => ({
            currentPersona: "founder",
            setPersona: (persona) => set({ currentPersona: persona }),
        }),
        {
            name: "forceui-persona",
        }
    )
);
