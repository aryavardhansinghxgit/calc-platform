import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const molarity_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Molarity Calculator — Free Online Calculator",
  description: "Calculate chemical solution molarity (M = moles / L) and required solute mass.",
  slug: "molarity-calculator",
});
