import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const body_fat_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Body Fat Calculator — Free Online Health Calculator",
  description: "Estimate body fat percentage, lean body mass, and fat mass using US Navy tape measure method.",
  slug: "body-fat-calculator",
});
