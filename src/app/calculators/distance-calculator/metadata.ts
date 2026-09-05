import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const distance_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Distance Calculator – 2D, 3D, GPS & Point-to-Line",
  description: "Calculate distance between two points in 2D or 3D, GPS coordinates, speed and time, or from a point to a line. Includes formulas, units, and step-by-step results.",
  slug: "distance-calculator",
});

export default distance_calculatorMetadata;
