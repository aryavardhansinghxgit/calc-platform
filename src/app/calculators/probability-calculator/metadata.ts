import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const probability_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Probability Calculator — Free Online Math Calculator",
  description: "Calculate probabilities of single, multiple, independent, and mutually exclusive events.",
  slug: "probability-calculator",
});
