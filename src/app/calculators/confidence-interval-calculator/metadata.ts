import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const confidence_interval_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Confidence Interval Calculator — Free Online Math Calculator",
  description: "Calculate margin of error and confidence interval bounds for a sample mean.",
  slug: "confidence-interval-calculator",
});
