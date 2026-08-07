import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateLeastCommonMultipleLCMCalculator } from "./calculator";
import { lcm_calculatorFaqs } from "./faq";

export const lcm_calculatorConfig: CalculatorModuleDefinition = {
  id: "lcm-calculator",
  title: "Least Common Multiple (LCM) Calculator",
  slug: "lcm-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Find the Least Common Multiple (LCM) of two or three numbers instantly.",
  iconName: "Grid",
  featured: true,
  keywords: ["lcm calculator","least common multiple","lcm","common multiple"],
  priority: 1,
  relatedCalculators: ["gcf-calculator","factor-calculator"],
  formulaDescription: "LCM(a, b) = (a × b) / GCF(a, b)",
  faqs: lcm_calculatorFaqs,
  inputs: [
  {
    "name": "num1",
    "label": "Number 1",
    "type": "number",
    "defaultValue": 12,
    "min": 1,
    "max": 100000,
    "step": 1
  },
  {
    "name": "num2",
    "label": "Number 2",
    "type": "number",
    "defaultValue": 18,
    "min": 1,
    "max": 100000,
    "step": 1
  },
  {
    "name": "num3",
    "label": "Number 3 (Optional)",
    "type": "number",
    "defaultValue": 24,
    "min": 1,
    "max": 100000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "lcm",
    "label": "Least Common Multiple (LCM)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "gcf",
    "label": "Greatest Common Factor (GCF)",
    "format": "number"
  }
],
  calculate: calculateLeastCommonMultipleLCMCalculator,
};

export default lcm_calculatorConfig;
