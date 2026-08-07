import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const triangle_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Triangle Calculator — Free Online Math Calculator",
  description: "Calculate area, perimeter, side lengths, and internal angles of any triangle using Heron's formula.",
  slug: "triangle-calculator",
});
