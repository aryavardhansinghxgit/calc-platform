import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const rounding_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Rounding Calculator — Round Decimals, Fractions, and Sig Figs",
    description: "Free online Rounding Calculator & Numerical Precision Suite. Round numbers to decimal places, sig figs, nearest fractions, custom multiples, and Swedish cash rounding with 8 IEEE/financial algorithms including Banker's Rounding.",
    slug: "rounding-calculator"
  }),
  keywords: [
    "Rounding Calculator",
    "Round to the Nearest Tenth",
    "Round to the Nearest Hundredth",
    "Round to Nearest Cent",
    "Significant Figures Rounding Calculator",
    "Bankers Rounding Calculator"
  ]
};
