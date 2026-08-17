import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const height_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Height Calculator — Child Adult Height Prediction & Stature Converter",
  description:
    "Free online height calculator using Khamis-Roche linear regression, Tanner Mid-Parental method, toddler doubling, WHO/CDC growth percentiles, and multi-unit conversions.",
  slug: "height-calculator",
});
