/**
 * @file engine/componentRegistry.ts
 * @description Component registry system for managing and querying components
 */

import {
    ComponentMetadata,
    Intent,
    Persona,
} from "@/types";
import { componentMetadata } from "@/config/componentMetadata";

/**
 * Component Registry - Central system for component metadata and queries
 */
export class ComponentRegistry {
    private components: Map<string, ComponentMetadata>;

    constructor() {
        this.components = new Map(
            componentMetadata.map((c) => [c.id, c])
        );
    }

    /**
     * Get component by ID
     */
    getComponent(id: string): ComponentMetadata | undefined {
        return this.components.get(id);
    }

    /**
     * Get all components
     */
    getAllComponents(): ComponentMetadata[] {
        return Array.from(this.components.values());
    }

    /**
     * Find components by intent
     */
    findByIntent(intent: Intent): ComponentMetadata[] {
        return this.getAllComponents().filter((c) =>
            c.intents.includes(intent)
        );
    }

    /**
     * Find components by persona
     */
    findByPersona(persona: Persona): ComponentMetadata[] {
        return this.getAllComponents().filter((c) =>
            c.personas.includes(persona)
        );
    }

    /**
     * Find components by multiple criteria
     */
    findByMultipleCriteria(
        intents: Intent[],
        persona?: Persona
    ): ComponentMetadata[] {
        let results = this.getAllComponents();

        // Filter by intents
        if (intents.length > 0) {
            results = results.filter((c) =>
                intents.some((intent) => c.intents.includes(intent))
            );
        }

        // Filter by persona
        if (persona) {
            results = results.filter((c) => c.personas.includes(persona));
        }

        return results;
    }

    /**
     * Get generative components only
     */
    getGenerativeComponents(): ComponentMetadata[] {
        return this.getAllComponents().filter((c) => c.type === "generative");
    }

    /**
     * Get interactable components only
     */
    getInteractableComponents(): ComponentMetadata[] {
        return this.getAllComponents().filter((c) => c.type === "interactable");
    }

    /**
     * Register a new component dynamically
     * (Used for Component Marketplace feature)
     */
    registerComponent(metadata: ComponentMetadata): void {
        this.components.set(metadata.id, metadata);
    }

    /**
     * Unregister a component
     */
    unregisterComponent(id: string): boolean {
        return this.components.delete(id);
    }

    /**
     * Check if component exists
     */
    hasComponent(id: string): boolean {
        return this.components.has(id);
    }
}

// Singleton instance
export const componentRegistry = new ComponentRegistry();
