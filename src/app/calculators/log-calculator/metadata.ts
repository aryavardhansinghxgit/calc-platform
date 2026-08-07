import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const log_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Log Calculator — Free Online Math Calculator",
  description: "Calculate logarithms for any custom base, natural log (ln), and common log (log₁₀).",
  slug: "log-calculator",
});
