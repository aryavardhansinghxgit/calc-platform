import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFactorCalculator } from "./calculator";
import { factor_calculatorFaqs } from "./faq";

export const factor_calculatorConfig: CalculatorModuleDefinition = {
  id: "factor-calculator",
  title: "Factor Calculator",
  slug: "factor-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Find all factors, factor pairs, and prime factorization of any positive integer.",
  iconName: "ListFilter",
  featured: true,
  keywords: ["factor calculator","factors","prime factorization","prime numbers"],
  priority: 1,
  relatedCalculators: ["gcf-calculator","lcm-calculator"],
  formulaDescription: "Integer Factorization & Prime Factor Decomposition",
  faqs: factor_calculatorFaqs,
  inputs: [
  {
    "name": "number",
    "label": "Target Integer",
    "type": "number",
    "defaultValue": 120,
    "min": 1,
    "max": 1000000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "factorsList",
    "label": "All Factors",
    "format": "text",
    "highlight": true
  },
  {
    "name": "primeFactors",
    "label": "Prime Factorization",
    "format": "text"
  },
  {
    "name": "factorCount",
    "label": "Total Number of Factors",
    "format": "number"
  }
],
  calculate: calculateFactorCalculator,
};

export default factor_calculatorConfig;
