import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const mass_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Mass & Weight Converter — Universal Units, Density & Celestial Physics",
  description:
    "Free online mass and weight converter. Convert between kg, lbs, grams, ounces, stones, carats, tons, and daltons. Calculate mass from density (m = ρV) and weight across planets (W = mg).",
  slug: "mass-calculator",
});
