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
  description: "Find all factors, factor pairs, prime factorization, divisor functions d(n) and σ(n), interactive factor trees, quadratic trinomial factoring, and divisibility rules.",
  iconName: "ListFilter",
  featured: true,
  keywords: [
    "Factor Calculator",
    "Prime Factorization Calculator",
    "Find Factors of a Number",
    "Factor Tree Calculator",
    "Factor Pairs Calculator",
    "Divisors Calculator"
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
