import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGreatestCommonFactorGCFCalculator } from "./calculator";
import { GcfCalculator } from "@/components/calculator/gcf/GcfCalculator";
import { GcfContent } from "@/components/calculator/gcf/GcfContent";

export const gcf_calculatorConfig: CalculatorModuleDefinition = {
  id: "gcf-calculator",
  title: "Greatest Common Factor (GCF) Calculator",
  slug: "gcf-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate the Greatest Common Factor (GCF / GCD / HCF) and LCM for 2 to 15+ numbers with 6 multi-method step-by-step derivations.",
  iconName: "Layers",
  featured: true,
  keywords: [
    "Greatest Common Factor Calculator",
    "GCF Calculator",
    "GCD Calculator",
    "HCF Calculator",
    "Highest Common Factor",
    "Euclidean Algorithm Calculator"
  ],
  priority: 1,
  relatedCalculators: ["lcm-calculator", "factor-calculator", "fraction-calculator"],
  formulaDescription: "Euclidean Algorithm for GCF",
  faqs: [],
  CustomComponent: GcfCalculator,
  ContentComponent: GcfContent,
  inputs: [
    {
      name: "num1",
      label: "Number 1",
      type: "number",
      defaultValue: 36,
      min: 1,
      max: 100000,
      step: 1
    },
    {
      name: "num2",
      label: "Number 2",
      type: "number",
      defaultValue: 54,
      min: 1,
      max: 100000,
      step: 1
    },
    {
      name: "num3",
      label: "Number 3 (Optional)",
      type: "number",
      defaultValue: 90,
      min: 1,
      max: 100000,
      step: 1
    }
  ],
  outputs: [
    {
      name: "gcf",
      label: "Greatest Common Factor (GCF)",
      format: "number",
      highlight: true
    },
    {
      name: "lcm",
      label: "Least Common Multiple (LCM)",
      format: "number"
    }
  ],
  calculate: calculateGreatestCommonFactorGCFCalculator
} as any;

export default gcf_calculatorConfig;
