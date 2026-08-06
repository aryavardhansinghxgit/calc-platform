/**
 * Utility functions for math and financial conversion operations.
 */

export function annualToMonthlyRate(annualPercentageRate: number): number {
  return annualPercentageRate / 100 / 12;
}

export function yearsToMonths(years: number): number {
  return years * 12;
}

export function parseNumericInput(val: any, fallback: number = 0): number {
  const parsed = parseFloat(val);
  return isNaN(parsed) ? fallback : parsed;
}
