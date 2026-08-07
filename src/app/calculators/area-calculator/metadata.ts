import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const area_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Area Calculator — Free Online Math Calculator",
  description: "Calculate surface area for 2D geometric shapes (rectangle, circle, triangle, trapezoid).",
  slug: "area-calculator",
});
