import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const half_life_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Half-Life Calculator — Free Online Math Calculator",
  description: "Calculate radioactive decay, half-life duration, initial amount, or remaining substance quantity.",
  slug: "half-life-calculator",
});
