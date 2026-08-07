import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const molecular_weight_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Molecular Weight Calculator — Free Online Calculator",
  description: "Calculate molar mass and molecular weight of common chemical formulas.",
  slug: "molecular-weight-calculator",
});
