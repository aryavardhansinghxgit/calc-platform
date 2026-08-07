import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const carbohydrate_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Carbohydrate Calculator — Free Online Health Calculator",
  description: "Determine recommended daily carbohydrate intake in grams and calories based on activity level.",
  slug: "carbohydrate-calculator",
});
