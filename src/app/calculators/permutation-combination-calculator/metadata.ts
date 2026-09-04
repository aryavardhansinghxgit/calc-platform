import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const permutation_combination_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Permutation and Combination Calculator | nPr & nCr Solver with Steps",
  description:
    "Calculate permutations (nPr) and combinations (nCr) with or without repetition, circular seating, multiset anagrams, derangements, and Pascal's triangle with step-by-step mathematical proofs.",
  slug: "permutation-combination-calculator",
});
