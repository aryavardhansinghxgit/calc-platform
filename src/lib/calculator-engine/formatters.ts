/**
 * Formatters Module - Centralized Display Formatting Utilities with Locale & Intl Support.
 */

export function formatCurrency(
  amount: number,
  currencySymbol: string = "$",
  decimals: number = 2,
  locale: string = "en-US"
): string {
  if (isNaN(amount) || !isFinite(amount)) return `${currencySymbol}0.00`;
  const formatted = amount.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${currencySymbol}${formatted}`;
}

export function formatPercent(
  value: number,
  decimals: number = 2,
  locale: string = "en-US"
): string {
  if (isNaN(value) || !isFinite(value)) return "0.00%";
  const formatted = value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${formatted}%`;
}

export function formatDecimal(
  value: number,
  decimals: number = 2,
  locale: string = "en-US"
): string {
  if (isNaN(value) || !isFinite(value)) return "0";
  return value.toLocaleString(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export const formatNumber = formatDecimal;

export function formatCompactNumber(
  value: number,
  locale: string = "en-US"
): string {
  if (isNaN(value) || !isFinite(value)) return "0";
  if (Math.abs(value) >= 1_000_000_000) {
    return (value / 1_000_000_000).toLocaleString(locale, { maximumFractionDigits: 1 }) + "B";
  }
  if (Math.abs(value) >= 1_000_000) {
    return (value / 1_000_000).toLocaleString(locale, { maximumFractionDigits: 1 }) + "M";
  }
  if (Math.abs(value) >= 1_000) {
    return (value / 1_000).toLocaleString(locale, { maximumFractionDigits: 1 }) + "K";
  }
  return value.toLocaleString(locale);
}

export function formatDate(
  date: Date | string | number,
  locale: string = "en-US"
): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatMonthYear(
  month: number, // 1-12
  year: number,
  locale: string = "en-US",
  monthFormat: "short" | "long" = "long"
): string {
  if (!year || !month || month < 1 || month > 12) return "";
  const d = new Date(year, month - 1, 1);
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: monthFormat,
  });
}

