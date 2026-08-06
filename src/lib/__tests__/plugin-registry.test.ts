/**
 * Unit Test Suite for Plugin Registry.
 */

import { PluginRegistryManager } from "../calculator-engine/plugin-registry";
import { MortgagePlugin } from "../calculator-engine/plugins/mortgage-plugin";

function assertDefined(value: any, testName: string) {
  if (value === undefined || value === null) {
    throw new Error(`[FAIL] ${testName}: Expected value to be defined.`);
  }
}

function assertEqual(actual: any, expected: any, testName: string) {
  if (actual !== expected) {
    throw new Error(`[FAIL] ${testName}: Expected ${expected}, but got ${actual}`);
  }
}

export function runPluginRegistryTests(): { passed: boolean; count: number } {
  let count = 0;
  const registry = PluginRegistryManager.getInstance();
  registry.register(MortgagePlugin);

  // 1. Register by ID
  const pluginById = registry.getPlugin("mortgage");
  assertDefined(pluginById, "Get Plugin By ID");
  assertEqual(pluginById?.metadata.title, "Mortgage Calculator", "Plugin Title Match");
  count++;

  // 2. Register by Slug
  const pluginBySlug = registry.getPlugin("mortgage-calculator");
  assertDefined(pluginBySlug, "Get Plugin By Slug");
  assertEqual(pluginBySlug?.metadata.id, "mortgage", "Plugin ID Match");
  count++;

  // 3. Convert to CalculatorDefinition
  if (pluginById) {
    const def = registry.toCalculatorDefinition(pluginById);
    assertEqual(def.id, "mortgage", "Definition ID Match");
    assertEqual(typeof def.calculate, "function", "Calculate Function Exists");
    count++;
  }

  return { passed: true, count };
}
