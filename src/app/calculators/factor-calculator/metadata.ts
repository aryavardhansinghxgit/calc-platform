import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const factor_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Factor Calculator: All Factors & Prime Factorization",
    description: "Find all factors, factor pairs, prime factorization, divisor count, divisor sum, common factors, and quadratic factors with step-by-step results.",
    slug: "factor-calculator"
  }),
  keywords: [
    "factor calculator",
    "factors of a number",
    "find factors",
    "all factors calculator",
    "factor pairs",
    "prime factorization",
    "prime factors",
    "number of factors",
    "divisor calculator",
    "divisors of a number",
    "sum of divisors",
    "proper divisors",
    "aliquot sum",
    "prime or composite",
    "perfect number",
    "abundant number",
    "deficient number",
    "square-free number",
    "common factors",
    "greatest common factor",
    "factor tree",
    "divisibility rules",
    "quadratic factoring",
    "factor trinomial"
  ]
};
