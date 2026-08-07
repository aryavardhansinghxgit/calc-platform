import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePermutationCombinationCalculator } from "./calculator";
import { permutation_combination_calculatorFaqs } from "./faq";

export const permutation_combination_calculatorConfig: CalculatorModuleDefinition = {
  id: "permutation-combination-calculator",
  title: "Permutation & Combination Calculator",
  slug: "permutation-combination-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate permutations nPr and combinations nCr for choosing r items from n total items.",
  iconName: "Maximize2",
  featured: true,
  keywords: ["permutation","combination","npr","ncr","factorial"],
  priority: 1,
  relatedCalculators: ["probability-calculator","statistics-calculator"],
  formulaDescription: "nPr = n! / (n-r)!; nCr = n! / [ r!(n-r)! ]",
  faqs: permutation_combination_calculatorFaqs,
  inputs: [
  {
    "name": "nVal",
    "label": "Total Items (n)",
    "type": "number",
    "defaultValue": 8,
    "min": 0,
    "max": 100,
    "step": 1
  },
  {
    "name": "rVal",
    "label": "Chosen Items (r)",
    "type": "number",
    "defaultValue": 3,
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
  calculate: calculatePermutationCombinationCalculator,
};

export default permutation_combination_calculatorConfig;
