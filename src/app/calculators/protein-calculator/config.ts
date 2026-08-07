import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateProteinCalculator } from "./calculator";
import { protein_calculatorFaqs } from "./faq";

export const protein_calculatorConfig: CalculatorModuleDefinition = {
  id: "protein-calculator",
  title: "Protein Calculator",
  slug: "protein-calculator",
  category: "Health",
  subcategory: "Nutrition & Body",
  description: "Calculate daily protein requirements for muscle building, fat loss, or endurance training.",
  iconName: "Beef",
  featured: true,
  keywords: ["protein calculator","daily protein","muscle building","protein intake"],
  priority: 1,
  relatedCalculators: ["macro-calculator","calorie-calculator"],
  formulaDescription: "Daily Protein = Weight (kg) × Recommended Ratio (g/kg)",
  faqs: protein_calculatorFaqs,
  inputs: [
  {
    "name": "weightKg",
    "label": "Body Weight (kg)",
    "type": "number",
    "defaultValue": 70,
    "min": 30,
    "max": 250,
    "step": 1
  },
  {
    "name": "goal",
    "label": "Training Goal",
    "type": "select",
    "defaultValue": "strength",
    "options": [
      {
        "label": "Sedentary / General Health (0.8 g/kg)",
        "value": "0.8"
      },
      {
        "label": "Endurance Athlete (1.4 g/kg)",
        "value": "1.4"
      },
      {
        "label": "Muscle Gain / Strength (1.8 g/kg)",
        "value": "1.8"
      },
      {
        "label": "Fat Loss & Preservation (2.2 g/kg)",
        "value": "2.2"
      }
    ]
  }
],
  outputs: [
  {
    "name": "proteinGrams",
    "label": "Recommended Protein",
    "format": "number",
    "highlight": true,
    "unit": "g"
  },
  {
    "name": "proteinCalories",
    "label": "Protein Calories",
    "format": "number",
    "unit": "kcal"
  }
],
  calculate: calculateProteinCalculator,
};

export default protein_calculatorConfig;
