import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const healthy_weight_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Healthy Weight Calculator – BMI Range, Ideal Weight & IBW Formulas",
  description: "Calculate a healthy weight range from adult BMI and compare Devine, Hamwi, Robinson, Miller and Peterson ideal body weight estimates. Includes frame-size analysis, BMI, target weight and weight-planning guidance.",
  slug: "healthy-weight-calculator",
});
