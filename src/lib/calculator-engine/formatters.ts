/**
 * Formatting Utilities for Calculator Engine outputs.
 */

export function formatCurrency(
  amount: number,
  currencySymbol: string = "$",
  decimals: number = 2
): string {
  if (isNaN(amount) || !isFinite(amount)) return `${currencySymbol}0.00`;
  const formatted = amount.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${currencySymbol}${formatted}`;
}

export function formatPercent(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return "0.00%";
  return `${value.toFixed(decimals)}%`;
}

export function formatNumber(value: number, decimals: number = 0): string {
  if (isNaN(value) || !isFinite(value)) return "0";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatDurationYears(years: number): string {
  if (years < 1) {
    const months = Math.round(years * 12);
    return `${months} ${months === 1 ? "month" : "months"}`;
  }
  return `${years} ${years === 1 ? "year" : "years"}`;
}
