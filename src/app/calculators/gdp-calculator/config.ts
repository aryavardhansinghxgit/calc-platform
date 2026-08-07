import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGDPCalculator } from "./calculator";
import { gdp_calculatorFaqs } from "./faq";

export const gdp_calculatorConfig: CalculatorModuleDefinition = {
  id: "gdp-calculator",
  title: "GDP Calculator",
  slug: "gdp-calculator",
  category: "other",
  subcategory: "Measurements & Units",
  description: "Calculate Gross Domestic Product (GDP) using the expenditure approach (C + I + G + NX).",
  iconName: "DollarSign",
  featured: true,
  keywords: ["gdp calculator","gross domestic product","net exports","macroeconomics"],
  priority: 1,
  relatedCalculators: ["conversion-calculator"],
  formulaDescription: "GDP = C + I + G + (X - M)",
  faqs: gdp_calculatorFaqs,
  inputs: [
  {
    "name": "consumption",
    "label": "Personal Consumption (C)",
    "type": "number",
    "defaultValue": 14000,
    "min": 0,
    "max": 1000000000,
    "step": 100
  },
  {
    "name": "investment",
    "label": "Gross Private Investment (I)",
    "type": "number",
    "defaultValue": 4000,
    "min": 0,
    "max": 1000000000,
    "step": 100
  },
  {
    "name": "government",
    "label": "Government Spending (G)",
    "type": "number",
    "defaultValue": 3500,
    "min": 0,
    "max": 1000000000,
    "step": 100
  },
  {
    "name": "exports",
    "label": "Exports (X)",
    "type": "number",
    "defaultValue": 2500,
    "min": 0,
    "max": 1000000000,
    "step": 100
  },
  {
    "name": "imports",
    "label": "Imports (M)",
    "type": "number",
    "defaultValue": 3000,
    "min": 0,
    "max": 1000000000,
    "step": 100
  }
],
  outputs: [
  {
    "name": "totalGdp",
    "label": "Total GDP",
    "format": "currency",
    "highlight": true
  },
  {
    "name": "netExports",
    "label": "Net Exports (X - M)",
    "format": "currency"
  }
],
  calculate: calculateGDPCalculator,
};

export default gdp_calculatorConfig;
