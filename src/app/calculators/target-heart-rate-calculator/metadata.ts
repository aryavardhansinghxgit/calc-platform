import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const target_heart_rate_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Target Heart Rate Calculator: Karvonen, Heart Rate Zones & MHR",
  description: "Calculate your target heart rate, heart rate reserve and training zones using the Karvonen formula, % of maximum heart rate, and multiple maximum-heart-rate equations.",
  slug: "target-heart-rate-calculator",
});
