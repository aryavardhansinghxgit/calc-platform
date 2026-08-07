import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const healthy_weight_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Healthy Weight Calculator — Free Online Health Calculator",
  description: "Determine the healthy target weight range for your height based on medical BMI standards.",
  slug: "healthy-weight-calculator",
});
