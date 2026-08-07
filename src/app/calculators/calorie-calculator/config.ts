import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateCalorieCalculator } from "./calculator";
import { calorie_calculatorFaqs } from "./faq";

export const calorie_calculatorConfig: CalculatorModuleDefinition = {
  id: "calorie-calculator",
  title: "Calorie Calculator",
  slug: "calorie-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Calculate daily calorie intake for weight loss, maintenance, or muscle gain using Mifflin-St Jeor equation.",
  iconName: "Flame",
  featured: true,
  keywords: ["calories","tdee","bmr","weight loss","nutrition","diet"],
  priority: 1,
  relatedCalculators: ["tdee-calculator","bmr-calculator","macro-calculator"],
  formulaDescription: "BMR = 10W + 6.25H - 5A + S; TDEE = BMR × Activity",
  faqs: calorie_calculatorFaqs,
  inputs: [
  {
    "name": "age",
    "label": "Age (years)",
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
    "defaultValue": "1.375",
    "options": [
      {
        "label": "Sedentary (little or no exercise)",
        "value": "1.2"
      },
      {
        "label": "Lightly Active (1-3 days/wk)",
        "value": "1.375"
      },
      {
        "label": "Moderately Active (3-5 days/wk)",
        "value": "1.55"
      },
      {
        "label": "Very Active (6-7 days/wk)",
        "value": "1.725"
      },
      {
        "label": "Extra Active (intense job/exercise)",
        "value": "1.9"
      }
    ]
  },
  {
    "name": "goal",
    "label": "Fitness Goal",
    "type": "select",
    "defaultValue": "maintain",
    "options": [
      {
        "label": "Maintain Weight",
        "value": "maintain"
      },
      {
        "label": "Mild Weight Loss (-0.25 kg/wk)",
        "value": "mild_loss"
      },
      {
        "label": "Weight Loss (-0.5 kg/wk)",
        "value": "loss"
      },
      {
        "label": "Extreme Weight Loss (-1 kg/wk)",
        "value": "extreme_loss"
      },
      {
        "label": "Weight Gain (+0.5 kg/wk)",
        "value": "gain"
      }
    ]
  }
],
  outputs: [
  {
    "name": "targetCalories",
    "label": "Daily Target Calories",
    "format": "number",
    "highlight": true,
    "unit": "kcal"
  },
  {
    "name": "bmr",
    "label": "Basal Metabolic Rate (BMR)",
    "format": "number",
    "unit": "kcal"
  },
  {
    "name": "tdee",
    "label": "Maintenance Calories (TDEE)",
    "format": "number",
    "unit": "kcal"
  }
],
  calculate: calculateCalorieCalculator,
};

export default calorie_calculatorConfig;
