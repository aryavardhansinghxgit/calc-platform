import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateLeastCommonMultipleLCMCalculator } from "./calculator";
import { LcmCalculator } from "@/components/calculator/lcm/LcmCalculator";
import { LcmContent } from "@/components/calculator/lcm/LcmContent";

export const lcm_calculatorConfig: CalculatorModuleDefinition = {
  id: "lcm-calculator",
  title: "Least Common Multiple (LCM) Calculator",
  slug: "lcm-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Find the Least Common Multiple (LCM) and Greatest Common Factor (GCF) for 2 to 15+ numbers with 5 multi-method step-by-step derivations.",
  iconName: "Grid",
  featured: true,
  keywords: [
    "Least Common Multiple Calculator",
    "LCM Calculator",
    "Find LCM with Steps",
    "Lowest Common Multiple",
    "LCM and GCF Calculator",
    "Least Common Denominator Calculator"
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
