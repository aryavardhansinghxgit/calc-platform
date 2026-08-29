import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBodyFatCalculator } from "./calculator";
import { body_fat_calculatorFaqs } from "./faq";

export const body_fat_calculatorConfig: CalculatorModuleDefinition = {
  id: "body-fat-calculator",
  title: "Body Fat Calculator",
  slug: "body-fat-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Calculate body fat percentage, lean body mass, fat mass, FFMI, and ideal body composition targets using the U.S. Navy and BMI methods.",
  iconName: "Activity",
  featured: true,
  keywords: ["body fat", "fat mass", "lean mass", "navy body fat", "composition", "ffmi", "ideal body fat"],
  priority: 1,
  relatedCalculators: [
    "bmi-calculator",
    "army-body-fat-calculator",
    "lean-body-mass-calculator",
    "ideal-weight-calculator",
    "calorie-calculator",
    "tdee-calculator",
  ],
  formulaDescription: "US Navy Tape Measurement Formula using log10 waist/neck/hip ratios.",
  faqs: body_fat_calculatorFaqs,
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
  },
  {
    "name": "neckCm",
    "label": "Neck Circumference (cm)",
    "type": "number",
    "defaultValue": 38,
    "min": 20,
    "max": 70,
    "step": 0.5
  },
  {
    "name": "waistCm",
    "label": "Waist Circumference (cm)",
    "type": "number",
    "defaultValue": 85,
    "min": 40,
    "max": 200,
    "step": 0.5
  },
  {
    "name": "hipCm",
    "label": "Hip Circumference (cm - Female)",
    "type": "number",
    "defaultValue": 95,
    "min": 40,
    "max": 200,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "bodyFatPercent",
    "label": "Body Fat Percentage",
    "format": "percentage",
    "highlight": true
  },
  {
    "name": "fatMassKg",
    "label": "Total Fat Mass",
    "format": "number",
    "unit": "kg"
  },
  {
    "name": "leanMassKg",
    "label": "Lean Body Mass",
    "format": "number",
    "unit": "kg"
  },
  {
    "name": "category",
    "label": "Fitness Category",
    "format": "text"
  }
],
  calculate: calculateBodyFatCalculator,
};

export default body_fat_calculatorConfig;
