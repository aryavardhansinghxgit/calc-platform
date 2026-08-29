import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBMRCalculator } from "./calculator";
import { bmr_calculatorFaqs } from "./faq";

export const bmr_calculatorConfig: CalculatorModuleDefinition = {
  id: "bmr-calculator",
  title: "BMR Calculator",
  slug: "bmr-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Calculate Basal Metabolic Rate (BMR) and daily energy expenditure using Mifflin-St Jeor, Harris-Benedict, or Katch-Mcardle.",
  iconName: "Zap",
  featured: true,
  keywords: ["bmr","basal metabolic rate","metabolism","calories","tdee"],
  priority: 1,
  relatedCalculators: [
    "calorie-calculator",
    "tdee-calculator",
    "bmi-calculator",
    "body-fat-calculator",
    "macro-calculator",
    "protein-calculator",
    "ideal-weight-calculator",
  ],
  formulaDescription: "Mifflin-St Jeor: 10W + 6.25H - 5A + S",
  faqs: bmr_calculatorFaqs,
  inputs: [
  {
    "name": "age",
    "label": "Age",
    "type": "number",
    "defaultValue": 30,
    "min": 15,
    "max": 100,
    "step": 1
  },
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
    "defaultValue": 70,
    "min": 30,
    "max": 250,
    "step": 1
  },
  {
    "name": "heightCm",
    "label": "Height (cm)",
    "type": "number",
    "defaultValue": 175,
    "min": 100,
    "max": 230,
    "step": 1
  }
],
  outputs: [
  {
    "name": "bmrMifflin",
    "label": "BMR (Mifflin-St Jeor)",
    "format": "number",
    "highlight": true,
    "unit": "kcal/day"
  },
  {
    "name": "bmrHarris",
    "label": "BMR (Harris-Benedict)",
    "format": "number",
    "unit": "kcal/day"
  },
  {
    "name": "sedentaryCal",
    "label": "Sedentary Maintenance",
    "format": "number",
    "unit": "kcal/day"
  }
],
  calculate: calculateBMRCalculator,
};

export default bmr_calculatorConfig;
