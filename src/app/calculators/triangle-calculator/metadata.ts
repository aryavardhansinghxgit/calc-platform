import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const triangle_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Triangle Calculator: Solve Sides, Angles, Area & More",
  description: "Solve a triangle from known sides or angles. Calculate missing sides, angles, area, perimeter, altitudes, medians, inradius and circumradius step by step.",
  slug: "triangle-calculator",
});
