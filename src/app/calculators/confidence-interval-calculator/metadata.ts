import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const confidence_interval_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Confidence Interval Calculator: Calculate Mean, Proportion & Difference CIs",
  description: "Calculate confidence intervals for means, proportions, two-group differences, variance and standard deviation. Compare t, Z, Wilson, Wald and Agresti-Coull intervals.",
  slug: "confidence-interval-calculator",
});
