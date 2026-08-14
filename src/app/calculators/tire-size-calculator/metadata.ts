import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const tire_size_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Tire Size Calculator: Compare Sizes, Speedometer & Offset",
  description: "Free Tire Size Calculator. Compare stock vs new tire diameters, sidewall height, speedometer error, wheel offset (ET) clearance, and gear ratios.",
  slug: "tire-size-calculator",
});
