import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const macro_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Macro Calculator — Free Online Health Calculator",
  description: "Calculate optimal daily macronutrient split (Protein, Carbs, Fats) based on fitness goals and diet style.",
  slug: "macro-calculator",
});
