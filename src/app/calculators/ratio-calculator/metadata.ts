import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ratio_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Ratio Calculator: Solve Ratios, Proportions, Unit Rates & Scale",
  description: "Solve proportions, simplify ratios, divide amounts by a ratio, calculate unit rates, resize images by aspect ratio, and find golden-ratio segments with step-by-step solutions.",
  slug: "ratio-calculator",
});

export default ratio_calculatorMetadata;
