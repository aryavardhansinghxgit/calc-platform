import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const square_footage_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Square Footage Calculator – Area, Cost & Material Estimates",
  description:
    "Calculate square footage for rectangles, circles, triangles, trapezoids, sectors and more. Convert units, estimate cost, combine rooms and plan materials.",
  slug: "square-footage-calculator",
});
