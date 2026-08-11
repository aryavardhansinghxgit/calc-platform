import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const healthy_weight_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Healthy Weight Calculator – WHO BMI Range, Devine, Hamwi & Miller IBW Formulas",
  description: "Calculate your healthy weight range (BMI 18.5–24.9) and ideal body weight using 6 clinical formulas (Hamwi, Devine, Robinson, Miller, Peterson) adjusted for body frame size and age.",
  slug: "healthy-weight-calculator",
});
