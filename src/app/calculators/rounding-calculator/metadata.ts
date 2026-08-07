import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const rounding_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Rounding Calculator — Free Online Math Calculator",
  description: "Round numbers to specified decimal places, nearest 10, 100, floor, or ceiling.",
  slug: "rounding-calculator",
});
