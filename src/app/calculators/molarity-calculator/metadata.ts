import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const molarity_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Molarity Calculator: Solute Mass, C1V1=C2V2 Dilution & PPM",
  description: "Free Molarity Calculator & Dilution Solver. Calculate solute mass, volume, concentration, C1V1=C2V2 stock dilution, mass percent to molarity, and PPM converter.",
  slug: "molarity-calculator",
});
