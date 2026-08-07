import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateLeanBodyMassCalculator } from "./calculator";
import { lean_body_mass_calculatorFaqs } from "./faq";

export const lean_body_mass_calculatorConfig: CalculatorModuleDefinition = {
  id: "lean-body-mass-calculator",
  title: "Lean Body Mass Calculator",
  slug: "lean-body-mass-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Calculate Lean Body Mass (LBM) without fat mass using Boer, James, and Hume formulas.",
  iconName: "Dumbbell",
  featured: true,
  keywords: ["lean body mass","lbm","fat free mass","body mass"],
  priority: 1,
  relatedCalculators: ["body-fat-calculator","bmi-calculator"],
  formulaDescription: "Boer: Male = 0.407W + 0.267H - 19.2",
  faqs: lean_body_mass_calculatorFaqs,
  inputs: [
  {
    "name": "gender",
    "label": "Gender",
    "type": "select",
    "defaultValue": "male",
    "options": [
      {
        "label": "Male",
        "value": "male"
      },
      {
        "label": "Female",
        "value": "female"
      }
    ]
  },
  {
    "name": "weightKg",
    "label": "Weight (kg)",
    "type": "number",
    "defaultValue": 75,
    "min": 30,
    "max": 250,
    "step": 0.5
  },
  {
    "name": "heightCm",
    "label": "Height (cm)",
    "type": "number",
    "defaultValue": 175,
    "min": 100,
    "max": 230,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "boerLbm",
    "label": "Boer Formula LBM",
    "format": "number",
    "highlight": true,
    "unit": "kg"
  },
  {
    "name": "jamesLbm",
    "label": "James Formula LBM",
    "format": "number",
    "unit": "kg"
  },
  {
    "name": "humeLbm",
    "label": "Hume Formula LBM",
    "format": "number",
    "unit": "kg"
  }
],
  calculate: calculateLeanBodyMassCalculator,
};

export default lean_body_mass_calculatorConfig;
