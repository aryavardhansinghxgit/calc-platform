import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRootCalculator } from "./calculator";
import { RootCalculator } from "@/components/calculator/root/RootCalculator";
import { RootContent } from "@/components/calculator/root/RootContent";

export const root_calculatorConfig: CalculatorModuleDefinition = {
  id: "root-calculator",
  title: "Root Calculator & Radical Simplifier",
  slug: "root-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate square roots, cube roots, and general nth roots with exact radical simplification and precise decimal approximations. This calculator also simplifies radicals, evaluates fractional exponents, shows step-by-step mathematical work, and explains how roots and radicals are calculated.",
  iconName: "Radical",
  featured: true,
  keywords: [
    "root calculator",
    "square root calculator",
    "cube root calculator",
    "nth root calculator",
    "radical simplifier",
    "simplify radicals calculator",
    "fractional exponent calculator"
  ],
  priority: 1,
  relatedCalculators: ["exponent-calculator", "scientific-calculator", "pythagorean-theorem-calculator", "factor-calculator"],
  formulaDescription: "ⁿ√X = X^(1/n)",
  faqs: [],
  CustomComponent: RootCalculator,
  ContentComponent: RootContent,
  inputs: [
    {
      name: "value",
      label: "Radicand (X)",
      type: "number",
      defaultValue: 72,
      min: 0,
      max: 1000000000,
      step: 1
    },
    {
      name: "degree",
      label: "Root Degree (n)",
      type: "number",
      defaultValue: 2,
      min: 1,
      max: 100,
      step: 1
    }
  ],
  outputs: [
    {
      name: "rootResult",
      label: "Principal Root Result (ⁿ√X)",
      format: "number",
      highlight: true
    },
    {
      name: "simplifiedRadical",
      label: "Exact Simplified Form",
      format: "text"
    }
  ],
  calculate: calculateRootCalculator
} as any;

export default root_calculatorConfig;
