import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const protein_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Protein Calculator — Free Online Health Calculator",
  description: "Calculate daily protein requirements for muscle building, fat loss, or endurance training.",
  slug: "protein-calculator",
});
