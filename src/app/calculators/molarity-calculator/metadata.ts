import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const molarity_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Molarity Calculator – Mass, Volume, Molar Mass & Dilution",
  description:
    "Calculate molarity, solute mass, solution volume and molar mass. Solve C₁V₁=C₂V₂ dilutions and convert mass %, PPM and PPB to molarity.",
  slug: "molarity-calculator",
});
