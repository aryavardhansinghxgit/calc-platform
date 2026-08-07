import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBACCalculator } from "./calculator";
import { bac_calculatorFaqs } from "./faq";

export const bac_calculatorConfig: CalculatorModuleDefinition = {
  id: "bac-calculator",
  title: "BAC Calculator",
  slug: "bac-calculator",
  category: "Health",
  subcategory: "Nutrition & Body",
  description: "Estimate Blood Alcohol Concentration (BAC %) and time required to reach sobriety using Widmark formula.",
  iconName: "Wine",
  featured: true,
  keywords: ["bac","blood alcohol concentration","widmark formula","sobriety","alcohol level"],
  priority: 1,
  relatedCalculators: ["calorie-calculator"],
  formulaDescription: "Widmark Formula: BAC = [Alcohol(g) / (Weight(g) × r)] × 100 - (0.015 × Hours)",
  faqs: bac_calculatorFaqs,
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
    "label": "Body Weight (kg)",
    "type": "number",
    "defaultValue": 75,
    "min": 30,
    "max": 250,
    "step": 1
  },
  {
    "name": "drinksCount",
    "label": "Standard Drinks Consumed",
    "type": "number",
    "defaultValue": 3,
    "min": 1,
    "max": 30,
    "step": 1
  },
  {
    "name": "hoursSinceFirst",
    "label": "Hours Since First Drink",
    "type": "number",
    "defaultValue": 2,
    "min": 0.5,
    "max": 24,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "bac",
    "label": "Estimated BAC",
    "format": "percentage",
    "highlight": true
  },
  {
    "name": "sobrietyHours",
    "label": "Hours to 0.00% Sobriety",
    "format": "number",
    "unit": "hours"
  },
  {
    "name": "status",
    "label": "Impairment Level",
    "format": "text"
  }
],
  calculate: calculateBACCalculator,
};

export default bac_calculatorConfig;
