import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const pregnancy_weight_gain_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Pregnancy Weight Gain Calculator – IOM & ACOG Guidelines",
  description:
    "Calculate recommended pregnancy weight gain by pre-pregnancy BMI, pregnancy week, and singleton or twin pregnancy. See weekly targets and a 40-week trajectory.",
  slug: "pregnancy-weight-gain-calculator",
});

export default pregnancy_weight_gain_calculatorMetadata;
