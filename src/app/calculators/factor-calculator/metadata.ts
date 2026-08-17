import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const factor_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Factor Calculator — Factors, Factor Pairs & Prime Factorization",
    description: "Free online Factor Calculator & Prime Factorization Suite. Find all factors, positive & negative factor pairs, exponential prime decomposition, interactive factor tree diagrams, divisor analytics d(n) and σ(n), and quadratic trinomial factoring.",
    slug: "factor-calculator"
  }),
  keywords: [
    "Factor Calculator",
    "Prime Factorization Calculator",
    "Find Factors of a Number",
    "Factor Tree Calculator",
    "Factor Pairs Calculator",
    "Divisors Calculator"
  ]
};
