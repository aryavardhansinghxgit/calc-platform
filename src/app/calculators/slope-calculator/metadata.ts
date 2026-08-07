import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const slope_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Slope Calculator — Free Online Math Calculator",
  description: "Calculate line slope m, incline angle, distance between points, and equation of a line y = mx + b.",
  slug: "slope-calculator",
});
