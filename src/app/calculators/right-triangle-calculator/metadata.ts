import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const right_triangle_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Right Triangle Calculator — Free Online Math Calculator",
  description: "Calculate sides, angles, area, and perimeter of right-angled triangles.",
  slug: "right-triangle-calculator",
});
