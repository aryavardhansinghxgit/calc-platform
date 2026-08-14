import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const molecular_weight_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Molecular Weight Calculator: Molar Mass & Empirical Formula",
  description: "Free Molecular Weight Calculator & Molar Mass Parser. Calculate molecular weight, monoisotopic mass, hydrates, empirical formulas, and grams to moles conversions.",
  slug: "molecular-weight-calculator",
});
