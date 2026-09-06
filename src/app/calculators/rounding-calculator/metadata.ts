import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const rounding_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Rounding Calculator – Decimal Places, Sig Figs & More",
    description: "Round numbers to decimal places, significant figures, fractions, multiples and place values. Compare rounding methods, see the deciding digit, and review step-by-step results.",
    slug: "rounding-calculator"
  }),
  keywords: [
    "Rounding Calculator",
    "round to decimal places",
    "round to nearest whole number",
    "round to nearest 10 / 100 / 1000",
    "round to significant figures",
    "round half up",
    "round half down",
    "banker's rounding",
    "round up / round down",
    "round to nearest fraction",
    "round to nearest multiple",
    "round negative numbers",
    "rounding calculator with steps",
    "decimal rounding calculator",
    "significant figures calculator"
  ]
};
