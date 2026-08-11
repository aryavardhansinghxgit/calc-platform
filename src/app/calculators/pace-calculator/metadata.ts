import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const pace_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Pace Calculator – Running Splits, Riegel Predictor & HR Training Zones",
  description: "Calculate running or cycling pace per mile and km, multipoint lap segment splits, Riegel race finish time predictions (5K, 10K, Half & Full Marathon), pace unit conversions, and heart rate training zones.",
  slug: "pace-calculator",
});
