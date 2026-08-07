import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFatIntakeCalculator } from "./calculator";
import { fat_intake_calculatorFaqs } from "./faq";

export const fat_intake_calculatorConfig: CalculatorModuleDefinition = {
  id: "fat-intake-calculator",
  title: "Fat Intake Calculator",
  slug: "fat-intake-calculator",
  category: "Health",
  subcategory: "Nutrition & Body",
  description: "Calculate total daily dietary fat requirements, saturated fat limits, and healthy fat distribution.",
  iconName: "Droplet",
  featured: true,
  keywords: ["fat intake","dietary fat","healthy fats","macro fats"],
  priority: 1,
  relatedCalculators: ["macro-calculator","tdee-calculator"],
  formulaDescription: "Fat Grams = (Daily Calories × Fat %) / 9 kcal/g",
  faqs: fat_intake_calculatorFaqs,
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
    "name": "fatPercent",
    "label": "Fat Percentage of Diet",
    "type": "number",
    "defaultValue": 30,
    "min": 10,
    "max": 75,
    "step": 5
  }
],
  outputs: [
  {
    "name": "fatGrams",
    "label": "Daily Fat Target",
    "format": "number",
    "highlight": true,
    "unit": "g"
  },
  {
    "name": "satFatMaxGrams",
    "label": "Max Saturated Fat Limit",
    "format": "number",
    "unit": "g"
  }
],
  calculate: calculateFatIntakeCalculator,
};

export default fat_intake_calculatorConfig;
