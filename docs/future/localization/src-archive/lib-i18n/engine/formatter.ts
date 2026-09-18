import { Locale } from "@/i18n/types";

export interface CurrencyFormatOptions {
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export interface NumberFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
  notation?: "standard" | "scientific" | "engineering" | "compact";
}

/**
 * Universal Locale-Aware Formatting Layer.
 * Strictly separates language formatting from currency.
 */
export class UniversalFormatter {
  private static localeMap: Record<Locale, string> = {
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR",
    de: "de-DE",
    hi: "hi-IN",
    pt: "pt-BR",
  };

  /**
   * Resolve standard BCP-47 locale tag from application locale.
   */
  public static resolveLocale(locale: Locale | string): string {
    return this.localeMap[locale as Locale] || locale || "en-US";
  }

  /**
   * Format currency values with independent currency specification.
   */
  public static formatCurrency(
    value: number,
    locale: Locale | string = "en",
    options: CurrencyFormatOptions = {}
  ): string {
    const bcp47 = this.resolveLocale(locale);
    const currency = options.currency || (locale === "es" || locale === "fr" || locale === "de" || locale === "pt" ? "USD" : "USD");
    
    return new Intl.NumberFormat(bcp47, {
      style: "currency",
      currency,
      minimumFractionDigits: options.minimumFractionDigits ?? 2,
      maximumFractionDigits: options.maximumFractionDigits ?? 2,
    }).format(value);
  }

  /**
   * Format numbers with locale decimal and grouping separators.
   */
  public static formatNumber(
    value: number,
    locale: Locale | string = "en",
    options: NumberFormatOptions = {}
  ): string {
    const bcp47 = this.resolveLocale(locale);
    return new Intl.NumberFormat(bcp47, {
      minimumFractionDigits: options.minimumFractionDigits ?? 0,
      maximumFractionDigits: options.maximumFractionDigits ?? 2,
      notation: options.notation || "standard",
    }).format(value);
  }

  /**
   * Format percentages (e.g. 6.5 -> 6.50%).
   */
  public static formatPercent(
    value: number,
    locale: Locale | string = "en",
    options: { decimals?: number } = {}
  ): string {
    const bcp47 = this.resolveLocale(locale);
    const decimals = options.decimals ?? 2;
    // Input is assumed to be percentage point (e.g. 6.5 for 6.5%)
    return new Intl.NumberFormat(bcp47, {
      style: "percent",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value / 100);
  }

  /**
   * Format Date objects or timestamps.
   */
  public static formatDate(
    date: Date | number | string,
    locale: Locale | string = "en",
    options: Intl.DateTimeFormatOptions = { dateStyle: "medium" }
  ): string {
    const bcp47 = this.resolveLocale(locale);
    const d = typeof date === "object" ? date : new Date(date);
    return new Intl.DateTimeFormat(bcp47, options).format(d);
  }

  /**
   * Format month and year from structured numeric date.
   */
  public static formatMonthYear(
    month: number, // 1 to 12
    year: number,
    locale: Locale | string = "en",
    format: "short" | "long" = "short"
  ): string {
    const bcp47 = this.resolveLocale(locale);
    const d = new Date(year, month - 1, 1);
    return new Intl.DateTimeFormat(bcp47, {
      month: format,
      year: "numeric",
    }).format(d);
  }

  /**
   * Format a numerical range (e.g. 100 to 200).
   */
  public static formatRange(
    min: number,
    max: number,
    locale: Locale | string = "en"
  ): string {
    const bcp47 = this.resolveLocale(locale);
    const formattedMin = this.formatNumber(min, locale);
    const formattedMax = this.formatNumber(max, locale);
    return `${formattedMin} – ${formattedMax}`;
  }
}
