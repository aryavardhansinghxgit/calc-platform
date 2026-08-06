/**
 * Plugin Architecture - Core Calculator Plugin Interfaces & Contracts.
 */

import { CalculatorInput, CalculatorOutput, CalculatorFAQ } from "./types";

export interface CalculatorPluginMetadata {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  iconName?: string;
  keywords?: string[];
  version?: string;
  author?: string;
}

export interface CalculatorPluginExample<TInput = Record<string, any>, TOutput = Record<string, any>> {
  title: string;
  description: string;
  inputs: TInput;
  outputs: TOutput;
}

export interface CalculatorPluginSeo {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
}

export interface CalculatorPlugin<TInput = Record<string, any>, TOutput = Record<string, any>> {
  metadata: CalculatorPluginMetadata;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  formula: (inputs: TInput) => TOutput;
  validator?: (inputs: TInput) => { isValid: boolean; errors?: Record<string, string> };
  formatter?: (outputs: TOutput) => Record<string, string>;
  seo?: CalculatorPluginSeo;
  formulaDescription?: string;
  faqs?: CalculatorFAQ[];
  examples?: CalculatorPluginExample<TInput, TOutput>[];
  relatedPluginIds?: string[];
}
