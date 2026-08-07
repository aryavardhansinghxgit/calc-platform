import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const z_score_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Z-Score Calculator — Free Online Math Calculator",
  description: "Calculate Z-score, standard score, and percentile rank in a normal distribution.",
  slug: "z-score-calculator",
});
