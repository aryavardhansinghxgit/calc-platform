/**
 * Validation Utilities for Calculator Engine inputs.
 */

import { CalculatorInput } from "./types";

export function validateInputNumber(value: unknown): boolean {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
}

export function validateNonNegativeNumber(value: number): boolean {
  return validateInputNumber(value) && value >= 0;
}

export function validateInput(
  inputDef: CalculatorInput,
  value: any
): { isValid: boolean; error?: string } {
  if (inputDef.type === "number" || inputDef.type === "currency" || inputDef.type === "percentage" || inputDef.type === "slider") {
    const num = Number(value);
    if (!validateInputNumber(num)) {
      return { isValid: false, error: `${inputDef.label} must be a valid number` };
    }

    if (inputDef.validation?.min !== undefined && num < inputDef.validation.min) {
      return {
        isValid: false,
        error: `${inputDef.label} cannot be less than ${inputDef.validation.min}`,
      };
    }

    if (inputDef.validation?.max !== undefined && num > inputDef.validation.max) {
      return {
        isValid: false,
        error: `${inputDef.label} cannot exceed ${inputDef.validation.max}`,
      };
    }
  }

  return { isValid: true };
}
