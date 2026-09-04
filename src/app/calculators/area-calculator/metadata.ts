import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const area_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Area Calculator: Find the Area of Any 2D Shape | CalcPlatform",
  description: "Calculate area for rectangles, triangles, circles, trapezoids, polygons and more. See formulas, units, perimeter and step-by-step results.",
  slug: "area-calculator",
});
