import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const permutation_combination_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Permutation & Combination Calculator — Free Online Math Calculator",
  description: "Calculate permutations nPr and combinations nCr for choosing r items from n total items.",
  slug: "permutation-combination-calculator",
});
