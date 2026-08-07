import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const density_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Density Calculator — Free Online Calculator",
  description: "Calculate density (ρ = m / v), mass, or volume for any physical substance.",
  slug: "density-calculator",
});
