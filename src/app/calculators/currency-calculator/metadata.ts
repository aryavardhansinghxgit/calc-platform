import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const currency_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Currency Calculator: Live Exchange Rates & Money Converter",
    description:
      "Convert currencies with live exchange rates, simulate bank transfer fees and markups, calculate travel budgets, and view cross-currency matrices.",
    slug: "currency-calculator",
  }),
  keywords: [
    "currency calculator",
    "currency converter",
    "live exchange rates",
    "money exchange calculator",
    "forex converter",
    "usd to eur converter",
    "real time currency rates",
    "bank transfer exchange fee calculator",
    "travel exchange rate calculator",
    "historical foreign exchange rates",
    "mid market rate calculator",
  ],
  openGraph: {
    title: "Currency Calculator: Live Exchange Rates & Money Converter",
    description:
      "Convert currencies with live exchange rates, simulate bank transfer fees and markups, calculate travel budgets, and view cross-currency matrices.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Currency Calculator: Live Exchange Rates & Money Converter",
    description:
      "Convert currencies with live exchange rates, simulate bank transfer fees and markups, calculate travel budgets, and view cross-currency matrices.",
  },
};
