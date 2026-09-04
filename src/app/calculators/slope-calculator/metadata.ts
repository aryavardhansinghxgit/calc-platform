import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const slope_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Slope Calculator — Slope Between Two Points & Line Equation",
  description: "Calculate slope between two points, rise over run, line equations, distance, incline angle, and parallel or perpendicular lines with step-by-step results.",
  slug: "slope-calculator",
});
