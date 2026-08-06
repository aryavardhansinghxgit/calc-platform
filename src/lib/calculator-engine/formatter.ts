/**
 * Formatting utilities for numbers, currencies, and percentages.
 */

export function formatCurrency(amount: number, currencySymbol: string = "$"): string {
  return `${currencySymbol}${amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatPercent(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}
