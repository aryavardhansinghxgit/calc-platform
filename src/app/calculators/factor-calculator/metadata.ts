import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const factor_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Factor Calculator — Free Online Math Calculator",
  description: "Find all factors, factor pairs, and prime factorization of any positive integer.",
  slug: "factor-calculator",
});
