import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const big_number_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Big Number Calculator — Arbitrary Precision Arithmetic & Large Powers",
    description: "Free online Big Number Calculator & Arbitrary-Precision Math Suite. Perform exact integer arithmetic (+, -, ×, /), modular exponentiation (A^B mod M), large factorials (N!), trailing zero counts, and Googology presets.",
    slug: "big-number-calculator"
  }),
  keywords: [
    "Big Number Calculator",
    "Large Number Calculator",
    "Arbitrary Precision Calculator",
    "Large Factorial Calculator",
    "Googol Calculator",
    "Modular Exponentiation Calculator",
    "BigInt Calculator"
  ]
};
