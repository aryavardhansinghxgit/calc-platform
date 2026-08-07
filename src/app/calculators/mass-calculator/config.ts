import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMassCalculator } from "./calculator";
import { mass_calculatorFaqs } from "./faq";

export const mass_calculatorConfig: CalculatorModuleDefinition = {
  id: "mass-calculator",
  title: "Mass Calculator",
  slug: "mass-calculator",
  category: "other",
  subcategory: "Measurements & Units",
  description: "Calculate object mass from density and volume, and convert mass units.",
  iconName: "Scale",
  featured: true,
  keywords: ["mass calculator","convert mass","weight to mass"],
  priority: 1,
  relatedCalculators: ["density-calculator","weight-calculator"],
  formulaDescription: "Mass m = Density ρ × Volume v",
  faqs: mass_calculatorFaqs,
  inputs: [
  {
    "name": "densityKgM3",
    "label": "Density (kg/m³)",
    "type": "number",
    "defaultValue": 7850,
    "min": 1,
    "max": 100000,
    "step": 50
  },
  {
    "name": "volumeM3",
    "label": "Volume (m³)",
    "type": "number",
    "defaultValue": 0.5,
    "min": 0.001,
    "max": 1000,
    "step": 0.01
  }
],
  outputs: [
  {
    "name": "massKg",
    "label": "Mass (kg)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "massLbs",
    "label": "Mass in Pounds (lbs)",
    "format": "number"
  }
],
  calculate: calculateMassCalculator,
};

export default mass_calculatorConfig;
