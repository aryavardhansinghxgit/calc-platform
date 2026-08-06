/**
 * Input validators for mathematical expressions and calculator fields.
 */

export function validateInputNumber(value: unknown): boolean {
  return typeof value === "number" && !isNaN(value) && isFinite(value);
}

export function validateNonNegativeNumber(value: number): boolean {
  return validateInputNumber(value) && value >= 0;
}
