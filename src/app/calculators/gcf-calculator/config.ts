import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGreatestCommonFactorGCFCalculator } from "./calculator";
import { gcf_calculatorFaqs } from "./faq";

export const gcf_calculatorConfig: CalculatorModuleDefinition = {
  id: "gcf-calculator",
  title: "Greatest Common Factor (GCF) Calculator",
  slug: "gcf-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate the Greatest Common Factor (GCF / HCF) of multiple integers.",
  iconName: "Layers",
  featured: true,
  keywords: ["gcf calculator","hcf","greatest common factor","highest common factor"],
  priority: 1,
  relatedCalculators: ["lcm-calculator","factor-calculator"],
  formulaDescription: "Euclidean Algorithm for GCF",
  faqs: gcf_calculatorFaqs,
  inputs: [
  {
    "name": "num1",
    "label": "Number 1",
    "type": "number",
    "defaultValue": 36,
    "min": 1,
    "max": 100000,
    "step": 1
  },
  {
    "name": "num2",
    "label": "Number 2",
    "type": "number",
    "defaultValue": 60,
    "min": 1,
    "max": 100000,
    "step": 1
  },
  {
    "name": "num3",
    "label": "Number 3 (Optional)",
    "type": "number",
    "defaultValue": 96,
    "min": 1,
    "max": 100000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "gcf",
    "label": "Greatest Common Factor (GCF)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "lcm",
    "label": "Least Common Multiple (LCM)",
    "format": "number"
  }
],
  calculate: calculateGreatestCommonFactorGCFCalculator,
};

export default gcf_calculatorConfig;
