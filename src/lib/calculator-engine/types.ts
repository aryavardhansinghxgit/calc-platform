/**
 * Types and interfaces for the Calculator Engine.
 */

export interface CalculationInput {
  expression?: string;
  variables?: Record<string, number>;
  options?: Record<string, unknown>;
}

export interface CalculationResult<T = number> {
  success: boolean;
  value?: T;
  formatted?: string;
  error?: string;
  metadata?: Record<string, unknown>;
}
