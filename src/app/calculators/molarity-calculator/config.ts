import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMolarityCalculator } from "./calculator";
import { molarity_calculatorFaqs } from "./faq";

export const molarity_calculatorConfig: CalculatorModuleDefinition = {
  id: "molarity-calculator",
  title: "Molarity Calculator",
  slug: "molarity-calculator",
  category: "other",
  subcategory: "Measurements & Units",
  description: "Calculate chemical solution molarity (M = moles / L) and required solute mass.",
  iconName: "Droplet",
  featured: true,
  keywords: ["molarity calculator","chemistry molarity","moles per liter","solute mass"],
  priority: 1,
  relatedCalculators: ["molecular-weight-calculator","density-calculator"],
  formulaDescription: "Molarity M = (Mass / Molar Mass) / Volume (L)",
  faqs: molarity_calculatorFaqs,
  inputs: [
  {
    "name": "massGrams",
    "label": "Solute Mass (g)",
    "type": "number",
    "defaultValue": 58.44,
    "min": 0.001,
    "max": 10000,
    "step": 0.1
  },
  {
    "name": "molarMass",
    "label": "Molar Mass (g/mol)",
    "type": "number",
    "defaultValue": 58.44,
    "min": 0.001,
    "max": 1000,
    "step": 0.1
  },
  {
    "name": "volumeLiters",
    "label": "Solution Volume (Liters)",
    "type": "number",
    "defaultValue": 1,
    "min": 0.001,
    "max": 100,
    "step": 0.1
  }
],
  outputs: [
  {
    "name": "molarityM",
    "label": "Molarity (M = mol/L)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "moles",
    "label": "Total Moles Solute",
    "format": "number"
  }
],
  calculate: calculateMolarityCalculator,
};

export default molarity_calculatorConfig;
