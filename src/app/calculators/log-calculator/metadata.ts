import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const log_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Log Calculator — Logarithm & Antilog Solver with Steps",
  description: "Free online Log Calculator & Antilog Suite. Solve log_b(x), natural logs ln(x), common logs log10(x), binary logs log2(x), change of base, and 2D curves.",
  slug: "log-calculator",
});

export default log_calculatorMetadata;
