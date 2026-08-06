/**
 * Formatters Module - Centralized Display Formatting Utilities.
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

export function formatDecimal(value: number, decimals: number = 2): string {
  if (isNaN(value) || !isFinite(value)) return "0";
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export const formatNumber = formatDecimal;


export function formatCompactNumber(value: number): string {
  if (isNaN(value) || !isFinite(value)) return "0";
  if (Math.abs(value) >= 1_000_000_000) {
    return (value / 1_000_000_000).toFixed(1) + "B";
  }
  if (Math.abs(value) >= 1_000_000) {
    return (value / 1_000_000).toFixed(1) + "M";
  }
  if (Math.abs(value) >= 1_000) {
    return (value / 1_000).toFixed(1) + "K";
  }
  return value.toString();
}

export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
