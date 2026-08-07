import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const scientific_notation_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Scientific Notation Calculator — Free Online Math Calculator",
  description: "Convert numbers to and from scientific notation (a × 10^b) and engineering notation.",
  slug: "scientific-notation-calculator",
});
