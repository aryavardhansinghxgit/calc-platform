import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const target_heart_rate_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Target Heart Rate Calculator — Free Online Health Calculator",
  description: "Determine heart rate zones (moderate, vigorous, peak) for cardio training using Karvonen formula.",
  slug: "target-heart-rate-calculator",
});
