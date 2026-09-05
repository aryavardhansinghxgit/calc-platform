import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFactorCalculator } from "./calculator";
import { FactorCalculator } from "@/components/calculator/factor/FactorCalculator";
import { FactorContent } from "@/components/calculator/factor/FactorContent";

export const factor_calculatorConfig: CalculatorModuleDefinition = {
  id: "factor-calculator",
  title: "Factor Calculator & Prime Factorization",
  slug: "factor-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Find all factors of a number, factor pairs, prime factorization, divisor statistics, common factors, and quadratic factorizations with clear mathematical steps.",
  iconName: "ListFilter",
  featured: true,
  keywords: [
    "factor calculator",
    "factors of a number",
    "find factors",
    "all factors calculator",
    "factor pairs",
    "prime factorization",
    "prime factors",
    "number of factors",
    "divisor calculator",
    "divisors of a number",
    "sum of divisors",
    "proper divisors",
    "aliquot sum",
    "prime or composite",
    "perfect number",
    "abundant number",
    "deficient number",
    "square-free number",
    "common factors",
    "greatest common factor",
    "factor tree",
    "divisibility rules",
    "quadratic factoring",
    "factor trinomial"
  ],
  priority: 1,
  relatedCalculators: ["gcf-calculator", "lcm-calculator", "fraction-calculator"],
  formulaDescription: "Integer Factorization & Prime Factor Decomposition",
  faqs: [],
  CustomComponent: FactorCalculator,
  ContentComponent: FactorContent,
  inputs: [
    {
      name: "number",
      label: "Target Integer",
      type: "number",
      defaultValue: 120,
      min: 1,
      max: 1000000,
      step: 1
    }
  ],
  outputs: [
    {
      name: "factorsList",
      label: "All Factors",
      format: "text",
      highlight: true
    },
    {
      name: "primeFactors",
      label: "Prime Factorization",
      format: "text"
    },
    {
      name: "factorCount",
      label: "Total Number of Factors",
      format: "number"
    }
  ],
  calculate: calculateFactorCalculator
} as any;

export default factor_calculatorConfig;
