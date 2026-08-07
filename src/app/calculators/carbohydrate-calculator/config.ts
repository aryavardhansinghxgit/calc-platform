import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateCarbohydrateCalculator } from "./calculator";
import { carbohydrate_calculatorFaqs } from "./faq";

export const carbohydrate_calculatorConfig: CalculatorModuleDefinition = {
  id: "carbohydrate-calculator",
  title: "Carbohydrate Calculator",
  slug: "carbohydrate-calculator",
  category: "Health",
  subcategory: "Nutrition & Body",
  description: "Determine recommended daily carbohydrate intake in grams and calories based on activity level.",
  iconName: "Apple",
  featured: true,
  keywords: ["carbs","carbohydrate calculator","carbohydrates","diet"],
  priority: 1,
  relatedCalculators: ["macro-calculator","protein-calculator"],
  formulaDescription: "Carb Grams = (Daily Calories × Carb %) / 4 kcal/g",
  faqs: carbohydrate_calculatorFaqs,
  inputs: [
  {
    "name": "dailyCalories",
    "label": "Daily Calories (kcal)",
    "type": "number",
    "defaultValue": 2000,
    "min": 800,
    "max": 8000,
    "step": 50
  },
  {
    "name": "activityLevel",
    "label": "Activity Level",
    "type": "select",
    "defaultValue": "moderate",
    "options": [
      {
        "label": "Low Activity (45% carbs)",
        "value": "0.45"
      },
      {
        "label": "Moderate Activity (55% carbs)",
        "value": "0.55"
      },
      {
        "label": "High Athletic Activity (65% carbs)",
        "value": "0.65"
      }
    ]
  }
],
  outputs: [
  {
    "name": "carbGrams",
    "label": "Daily Carbohydrates Target",
    "format": "number",
    "highlight": true,
    "unit": "g"
  },
  {
    "name": "carbCalories",
    "label": "Carbohydrate Calories",
    "format": "number",
    "unit": "kcal"
  }
],
  calculate: calculateCarbohydrateCalculator,
};

export default carbohydrate_calculatorConfig;
