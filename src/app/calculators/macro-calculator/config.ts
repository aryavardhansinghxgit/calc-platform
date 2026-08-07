import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMacroCalculator } from "./calculator";
import { macro_calculatorFaqs } from "./faq";

export const macro_calculatorConfig: CalculatorModuleDefinition = {
  id: "macro-calculator",
  title: "Macro Calculator",
  slug: "macro-calculator",
  category: "Health",
  subcategory: "Nutrition & Body",
  description: "Calculate optimal daily macronutrient split (Protein, Carbs, Fats) based on fitness goals and diet style.",
  iconName: "PieChart",
  featured: true,
  keywords: ["macros","macronutrients","protein","carbs","fats","flexible dieting"],
  priority: 1,
  relatedCalculators: ["protein-calculator","carbohydrate-calculator","fat-intake-calculator","tdee-calculator"],
  formulaDescription: "Protein (4 kcal/g), Carbs (4 kcal/g), Fats (9 kcal/g)",
  faqs: macro_calculatorFaqs,
  inputs: [
  {
    "name": "dailyCalories",
    "label": "Daily Calorie Target (kcal)",
    "type": "number",
    "defaultValue": 2000,
    "min": 800,
    "max": 10000,
    "step": 50
  },
  {
    "name": "dietRatio",
    "label": "Diet Ratio Style",
    "type": "select",
    "defaultValue": "balanced",
    "options": [
      {
        "label": "Balanced (50% C / 25% P / 25% F)",
        "value": "balanced"
      },
      {
        "label": "High Protein (35% C / 40% P / 25% F)",
        "value": "high_protein"
      },
      {
        "label": "Low Carb (20% C / 40% P / 40% F)",
        "value": "low_carb"
      },
      {
        "label": "Keto (5% C / 25% P / 70% F)",
        "value": "keto"
      }
    ]
  }
],
  outputs: [
  {
    "name": "proteinGrams",
    "label": "Protein Target",
    "format": "number",
    "highlight": true,
    "unit": "g"
  },
  {
    "name": "carbsGrams",
    "label": "Carbohydrates Target",
    "format": "number",
    "unit": "g"
  },
  {
    "name": "fatGrams",
    "label": "Fat Target",
    "format": "number",
    "unit": "g"
  }
],
  calculate: calculateMacroCalculator,
};

export default macro_calculatorConfig;
