/**
 * Validators Module - Centralized Input Validation Rules.
 */

import { CalculatorInput } from "./types";

export function validatePositiveNumber(value: number, fieldName: string = "Value"): { isValid: boolean; error?: string } {
  if (isNaN(value) || !isFinite(value) || value <= 0) {
    return { isValid: false, error: `${fieldName} must be greater than 0` };
  }
  return { isValid: true };
}

export function validateNonNegativeNumber(value: number, fieldName: string = "Value"): { isValid: boolean; error?: string } {
  if (isNaN(value) || !isFinite(value) || value < 0) {
    return { isValid: false, error: `${fieldName} cannot be negative` };
  }
  return { isValid: true };
}

export function validateInterestRate(rate: number): { isValid: boolean; error?: string } {
  if (isNaN(rate) || !isFinite(rate) || rate < 0 || rate > 100) {
    return { isValid: false, error: "Interest rate must be between 0% and 100%" };
  }
  return { isValid: true };
}

export function validateTerm(termYears: number): { isValid: boolean; error?: string } {
  if (isNaN(termYears) || !isFinite(termYears) || termYears <= 0 || termYears > 50) {
    return { isValid: false, error: "Term must be between 1 and 50 years" };
  }
  return { isValid: true };
}

export function validateDownPayment(downPayment: number, propertyPrice: number): { isValid: boolean; error?: string } {
  if (downPayment < 0) {
    return { isValid: false, error: "Down payment cannot be negative" };
  }
  if (downPayment > propertyPrice) {
    return { isValid: false, error: "Down payment cannot exceed property price" };
  }
  return { isValid: true };
}

export function validateInput(
  inputDef: CalculatorInput,
  value: any
): { isValid: boolean; error?: string } {
  const num = Number(value);

  if (isNaN(num)) {
    return { isValid: false, error: `${inputDef.label} must be a valid number` };
  }

  if (inputDef.min !== undefined && num < inputDef.min) {
    return { isValid: false, error: `${inputDef.label} cannot be less than ${inputDef.min}` };
  }

  if (inputDef.max !== undefined && num > inputDef.max) {
    return { isValid: false, error: `${inputDef.label} cannot exceed ${inputDef.max}` };
  }

  return { isValid: true };
}
