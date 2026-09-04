import { CalculatorModuleDefinition } from "@/calculators/types";
import { PermutationCombinationCalculator } from "@/components/calculator/permutation-combination/PermutationCombinationCalculator";
import { PermutationCombinationContent } from "@/components/calculator/permutation-combination/PermutationCombinationContent";
import { calculatePermutationCombinationCalculator } from "./calculator";
import { permutation_combination_calculatorFaqs } from "./faq";

export const permutation_combination_calculatorConfig: CalculatorModuleDefinition = {
  id: "permutation-combination-calculator",
  title: "Permutation & Combination Calculator",
  slug: "permutation-combination-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate permutations (nPr) and combinations (nCr) with or without repetition, circular seating, multiset anagrams, derangements, and Pascal's triangle.",
  iconName: "Maximize2",
  featured: true,
  keywords: ["permutation", "combination", "npr", "ncr", "factorial", "combinatorics", "pascal triangle", "derangement", "multiset"],
  priority: 1,
  relatedCalculators: ["probability-calculator", "statistics-calculator", "big-number-calculator"],
  formulaDescription: "nPr = n! / (n-r)!; nCr = n! / [ r!(n-r)! ]",
  faqs: permutation_combination_calculatorFaqs,
  CustomComponent: PermutationCombinationCalculator,
  ContentComponent: PermutationCombinationContent,
  inputs: [
    {
      "name": "nVal",
      "label": "Total Items (n)",
      "type": "number",
      "defaultValue": 6,
      "min": 0,
      "max": 100,
      "step": 1
    },
    {
      "name": "rVal",
      "label": "Chosen Items (r)",
      "type": "number",
      "defaultValue": 2,
      "min": 0,
      "max": 100,
      "step": 1
    }
  ],
  outputs: [
    {
      "name": "combinations",
      "label": "Combinations nCr (Order Ignored)",
      "format": "number",
      "highlight": true
    },
    {
      "name": "permutations",
      "label": "Permutations nPr (Order Matters)",
      "format": "number"
    }
  ],
  calculate: calculatePermutationCombinationCalculator
};

export default permutation_combination_calculatorConfig;
