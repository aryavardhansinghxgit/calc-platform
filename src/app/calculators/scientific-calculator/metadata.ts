import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const scientific_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Scientific Calculator — Free Online Math Calculator",
  description: "Perform advanced scientific calculations including trigonometry, logarithms, factorials, and exponents.",
  slug: "scientific-calculator",
});
