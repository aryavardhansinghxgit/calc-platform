/**
 * Shared Type Definitions for the Calculator Engine.
 */

export type InputType = "number" | "currency" | "percentage" | "select" | "slider" | "text" | "date";


export interface CalculatorInputValidation {
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  pattern?: string;
  custom?: (value: number | string) => boolean | string;
}

export interface CalculatorInputOption {
  label: string;
  value: string | number;
}

export interface CalculatorInput {
  name: string;
  label: string;
  type: InputType;
  defaultValue: number | string;
  unit?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: CalculatorInputOption[];
  tooltip?: string;
  validation?: CalculatorInputValidation;
}

export type OutputFormat = "currency" | "percentage" | "number" | "text" | "duration";

export interface CalculatorOutput {
  name: string;
  label: string;
  format: OutputFormat;
  unit?: string;
  description?: string;
  highlight?: boolean;
}

export interface CalculatorFAQ {
  question: string;
  answer: string;
}

export interface CalculatorDefinition {
  id: string;
  title: string;
  slug: string;
  category: string;
  subcategory?: string;
  priority?: number;
  keywords?: string[];
  relatedCalculators?: string[];
  description: string;
  iconName?: string;
  inputs: CalculatorInput[];
  outputs: CalculatorOutput[];
  formulaDescription?: string;
  faqs?: CalculatorFAQ[];
  calculate: (inputs: Record<string, any>) => Record<string, number | string | any>;
}

export interface CalculationResult {
  success: boolean;
  data: Record<string, any>;
  formatted: Record<string, string>;
  error?: string;
}
