import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bmr_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "BMR Calculator – Mifflin-St Jeor, Harris-Benedict & Calorie Goals | CalcPlatform",
  description: "Calculate your BMR, maintenance calories and calorie goals using Mifflin-St Jeor, Revised Harris-Benedict and Katch-McArdle equations. Compare activity levels and body composition.",
  slug: "bmr-calculator",
});
