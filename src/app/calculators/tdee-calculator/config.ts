import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTDEECalculator } from "./calculator";
import { tdee_calculatorFaqs } from "./faq";

export const tdee_calculatorConfig: CalculatorModuleDefinition = {
  id: "tdee-calculator",
  title: "TDEE Calculator",
  slug: "tdee-calculator",
  category: "Health",
  subcategory: "Nutrition & Body",
  description: "Calculate Total Daily Energy Expenditure (TDEE) and target calories for cutting or bulking.",
  iconName: "Flame",
  featured: true,
  keywords: ["tdee","total daily energy expenditure","calories","bmr","cutting","bulking"],
  priority: 1,
  relatedCalculators: ["calorie-calculator","bmr-calculator","macro-calculator"],
  formulaDescription: "TDEE = BMR × Activity Multiplier",
  faqs: tdee_calculatorFaqs,
  inputs: [
  {
    "name": "age",
    "label": "Age",
    "type": "number",
    "defaultValue": 25,
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
  },
  {
    "name": "activityLevel",
    "label": "Activity Level",
    "type": "select",
    "defaultValue": "1.55",
    "options": [
      {
        "label": "Sedentary (1.2)",
        "value": "1.2"
      },
      {
        "label": "Lightly Active (1.375)",
        "value": "1.375"
      },
      {
        "label": "Moderately Active (1.55)",
        "value": "1.55"
      },
      {
        "label": "Very Active (1.725)",
        "value": "1.725"
      }
    ]
  }
],
  outputs: [
  {
    "name": "tdee",
    "label": "TDEE (Maintenance)",
    "format": "number",
    "highlight": true,
    "unit": "kcal/day"
  },
  {
    "name": "cuttingCalories",
    "label": "Cutting Target (-500 kcal)",
    "format": "number",
    "unit": "kcal/day"
  },
  {
    "name": "bulkingCalories",
    "label": "Bulking Target (+500 kcal)",
    "format": "number",
    "unit": "kcal/day"
  }
],
  calculate: calculateTDEECalculator,
};

export default tdee_calculatorConfig;
