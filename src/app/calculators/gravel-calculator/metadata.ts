import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gravel_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Gravel Calculator — Free Online Calculator",
  description: "Calculate weight in tons and volume in cubic yards of crushed stone or gravel.",
  slug: "gravel-calculator",
});
