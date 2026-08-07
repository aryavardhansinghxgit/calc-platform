import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateWeightCalculator } from "./calculator";
import { weight_calculatorFaqs } from "./faq";

export const weight_calculatorConfig: CalculatorModuleDefinition = {
  id: "weight-calculator",
  title: "Weight Calculator",
  slug: "weight-calculator",
  category: "other",
  subcategory: "Measurements & Units",
  description: "Calculate weight force W = m × g on Earth, Moon, Mars, and convert weight units.",
  iconName: "Scale",
  featured: true,
  keywords: ["weight calculator","gravitational force","weight on moon"],
  priority: 1,
  relatedCalculators: ["mass-calculator","conversion-calculator"],
  formulaDescription: "Weight Force W = Mass (m) × Gravity (g)",
  faqs: weight_calculatorFaqs,
  inputs: [
  {
    "name": "massKg",
    "label": "Mass (kg)",
    "type": "number",
    "defaultValue": 70,
    "min": 0.1,
    "max": 10000,
    "step": 1
  },
  {
    "name": "celestialBody",
    "label": "Gravity Location",
    "type": "select",
    "defaultValue": "9.81",
    "options": [
      {
        "label": "Earth (9.81 m/s²)",
        "value": "9.81"
      },
      {
        "label": "Moon (1.62 m/s²)",
        "value": "1.62"
      },
      {
        "label": "Mars (3.71 m/s²)",
        "value": "3.71"
      },
      {
        "label": "Jupiter (24.79 m/s²)",
        "value": "24.79"
      }
    ]
  }
],
  outputs: [
  {
    "name": "weightNewtons",
    "label": "Weight Force (Newtons)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "weightLbs",
    "label": "Apparent Weight (lbs)",
    "format": "number"
  }
],
  calculate: calculateWeightCalculator,
};

export default weight_calculatorConfig;
