import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const percentage_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Percentage Calculator — Free Online Math Calculator",
  description: "Calculate percentage values, percentage changes, increases, decreases, and proportions.",
  slug: "percentage-calculator",
});
