import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const engine_horsepower_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Engine Horsepower Calculator — Free Online Calculator",
  description: "Calculate drag strip horsepower from vehicle curb weight and quarter-mile trap speed.",
  slug: "engine-horsepower-calculator",
});
