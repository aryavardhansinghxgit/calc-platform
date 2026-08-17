import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const square_footage_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Square Footage Calculator — Area, Flooring & Multi-Room Suite",
  description:
    "Free online square footage calculator for rectangles, circles, triangles, borders, and multi-room floor plans with waste factor and material packaging estimates.",
  slug: "square-footage-calculator",
});
