import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bmr_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "BMR Calculator – Mifflin-St Jeor, Harris-Benedict & Smart Goals System",
  description: "Calculate your Basal Metabolic Rate (BMR), Total Daily Energy Expenditure (TDEE), Smart Goal macro splits (P/C/F), hydration target, and resting energy burn using Mifflin-St Jeor, Revised Harris-Benedict, and Katch-McArdle equations.",
  slug: "bmr-calculator",
});
