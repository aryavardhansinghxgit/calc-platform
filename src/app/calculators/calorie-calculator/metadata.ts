import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const calorie_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Calorie Calculator — Free Online Health Calculator",
  description: "Calculate daily calorie intake for weight loss, maintenance, or muscle gain using Mifflin-St Jeor equation.",
  slug: "calorie-calculator",
});
