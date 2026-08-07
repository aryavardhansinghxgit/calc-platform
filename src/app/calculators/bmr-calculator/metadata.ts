import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bmr_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "BMR Calculator — Free Online Health Calculator",
  description: "Calculate Basal Metabolic Rate (BMR) and daily energy expenditure using Mifflin-St Jeor, Harris-Benedict, or Katch-Mcardle.",
  slug: "bmr-calculator",
});
