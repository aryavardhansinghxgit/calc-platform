import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const sample_size_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Sample Size Calculator — Free Online Math Calculator",
  description: "Determine the required statistical sample size for surveys, experiments, and research studies.",
  slug: "sample-size-calculator",
});
