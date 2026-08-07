import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const tdee_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "TDEE Calculator — Free Online Health Calculator",
  description: "Calculate Total Daily Energy Expenditure (TDEE) and target calories for cutting or bulking.",
  slug: "tdee-calculator",
});
