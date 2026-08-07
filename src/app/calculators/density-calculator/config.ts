import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDensityCalculator } from "./calculator";
import { density_calculatorFaqs } from "./faq";

export const density_calculatorConfig: CalculatorModuleDefinition = {
  id: "density-calculator",
  title: "Density Calculator",
  slug: "density-calculator",
  category: "other",
  subcategory: "Measurements & Units",
  description: "Calculate density (ρ = m / v), mass, or volume for any physical substance.",
  iconName: "Box",
  featured: true,
  keywords: ["density calculator","mass volume density","specific gravity"],
  priority: 1,
  relatedCalculators: ["mass-calculator","weight-calculator"],
  formulaDescription: "Density ρ = Mass (m) / Volume (v)",
  faqs: density_calculatorFaqs,
  inputs: [
  {
    "name": "massKg",
    "label": "Mass (kg)",
    "type": "number",
    "defaultValue": 50,
    "min": 0.001,
    "max": 1000000,
    "step": 1
  },
  {
    "name": "volumeM3",
    "label": "Volume (m³)",
    "type": "number",
    "defaultValue": 0.02,
    "min": 0.0001,
    "max": 1000000,
    "step": 0.005
  }
],
  outputs: [
  {
    "name": "densityKgM3",
    "label": "Density (kg/m³)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "densityGCm3",
    "label": "Density (g/cm³)",
    "format": "number"
  }
],
  calculate: calculateDensityCalculator,
};

export default density_calculatorConfig;
