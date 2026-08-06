/**
 * Plugin Architecture - Plugin Registry Manager.
 */

import { CalculatorPlugin } from "./plugin";
import { CalculatorDefinition } from "./types";

export class PluginRegistryManager {
  private static instance: PluginRegistryManager;
  private plugins: Map<string, CalculatorPlugin> = new Map();

  private constructor() {}

  public static getInstance(): PluginRegistryManager {
    if (!PluginRegistryManager.instance) {
      PluginRegistryManager.instance = new PluginRegistryManager();
    }
    return PluginRegistryManager.instance;
  }

  public register(plugin: CalculatorPlugin): void {
    if (!plugin || !plugin.metadata || !plugin.metadata.id) {
      throw new Error("Invalid plugin: metadata.id is required");
    }
    this.plugins.set(plugin.metadata.id.toLowerCase(), plugin);
    this.plugins.set(plugin.metadata.slug.toLowerCase(), plugin);
  }

  public getPlugin(idOrSlug: string): CalculatorPlugin | undefined {
    if (!idOrSlug) return undefined;
    return this.plugins.get(idOrSlug.toLowerCase());
  }

  public getAllPlugins(): CalculatorPlugin[] {
    const unique = new Map<string, CalculatorPlugin>();
    this.plugins.forEach((plugin) => {
      unique.set(plugin.metadata.id, plugin);
    });
    return Array.from(unique.values());
  }

  public getPluginsByCategory(categorySlugOrName: string): CalculatorPlugin[] {
    if (!categorySlugOrName) return [];
    const target = categorySlugOrName.toLowerCase().trim();
    return this.getAllPlugins().filter(
      (p) =>
        p.metadata.category.toLowerCase() === target ||
        p.metadata.category.toLowerCase().replace(/\s+/g, "-") === target
    );
  }

  public searchPlugins(query: string): CalculatorPlugin[] {
    if (!query || query.trim() === "") return this.getAllPlugins();
    const q = query.toLowerCase().trim();
    return this.getAllPlugins().filter(
      (p) =>
        p.metadata.title.toLowerCase().includes(q) ||
        p.metadata.description.toLowerCase().includes(q) ||
        p.metadata.category.toLowerCase().includes(q) ||
        p.metadata.keywords?.some((k) => k.toLowerCase().includes(q))
    );
  }

  public toCalculatorDefinition(plugin: CalculatorPlugin): CalculatorDefinition {
    return {
      id: plugin.metadata.id,
      title: plugin.metadata.title,
      slug: plugin.metadata.slug,
      category: plugin.metadata.category,
      description: plugin.metadata.description,
      iconName: plugin.metadata.iconName,
      inputs: plugin.inputs,
      outputs: plugin.outputs,
      formulaDescription: plugin.formulaDescription,
      faqs: plugin.faqs,
      calculate: (inputs) => plugin.formula(inputs),
    };
  }
}

export const PluginRegistry = PluginRegistryManager.getInstance();
export default PluginRegistry;
