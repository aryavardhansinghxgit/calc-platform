import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const mass_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Mass Calculator — Free Online Calculator",
  description: "Calculate object mass from density and volume, and convert mass units.",
  slug: "mass-calculator",
});
