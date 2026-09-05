import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateLeastCommonMultipleLCMCalculator } from "./calculator";
import { LcmCalculator } from "@/components/calculator/lcm/LcmCalculator";
import { LcmContent } from "@/components/calculator/lcm/LcmContent";

export const lcm_calculatorConfig: CalculatorModuleDefinition = {
  id: "lcm-calculator",
  title: "Least Common Multiple (LCM) Calculator – With GCF & Steps",
  slug: "lcm-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate the LCM and GCF of 2 or more numbers with prime factorization, division ladder, Euclidean steps, multiples, Venn diagram, and LCD help.",
  iconName: "Grid",
  featured: true,
  keywords: [
    "lcm calculator",
    "least common multiple calculator",
    "lcm calculator with steps",
    "lcm and gcf calculator",
    "least common multiple of 2 numbers",
    "least common multiple of 3 numbers",
    "how to find lcm",
    "lcm using prime factorization",
    "lcm using gcf",
    "lcm for fractions",
    "least common denominator calculator",
    "gcf vs lcm",
    "lcm formula",
    "lcm division ladder"
  ],
  priority: 1,
  relatedCalculators: ["gcf-calculator", "factor-calculator", "fraction-calculator"],
  formulaDescription: "LCM(a, b) = (a × b) / GCF(a, b)",
  faqs: [],
  CustomComponent: LcmCalculator,
  ContentComponent: LcmContent,
  inputs: [
    {
      name: "num1",
      label: "Number 1",
      type: "number",
      defaultValue: 12,
      min: 1,
      max: 100000,
      step: 1
    },
    {
      name: "num2",
      label: "Number 2",
      type: "number",
      defaultValue: 18,
      min: 1,
      max: 100000,
      step: 1
    },
    {
      name: "num3",
      label: "Number 3 (Optional)",
      type: "number",
      defaultValue: 30,
      min: 1,
      max: 100000,
      step: 1
    }
  ],
  outputs: [
    {
      name: "lcm",
      label: "Least Common Multiple (LCM)",
      format: "number",
      highlight: true
    },
    {
      name: "gcf",
      label: "Greatest Common Factor (GCF)",
      format: "number"
    }
  ],
  calculate: calculateLeastCommonMultipleLCMCalculator
} as any;

export default lcm_calculatorConfig;
