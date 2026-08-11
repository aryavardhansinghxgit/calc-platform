import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ideal_weight_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Ideal Weight Calculator – Hamwi, Devine, Robinson & WHO BMI Standards",
  description: "Calculate your Ideal Body Weight (IBW) using 5 clinical formulas (Hamwi, Devine, Robinson, Miller, Lemmens) adjusted for body frame size and WHO healthy BMI range (18.5–25.0).",
  slug: "ideal-weight-calculator",
});
