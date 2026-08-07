import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const distance_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Distance Calculator — Free Online Math Calculator",
  description: "Calculate Euclidean distance between 2D or 3D coordinate points.",
  slug: "distance-calculator",
});
