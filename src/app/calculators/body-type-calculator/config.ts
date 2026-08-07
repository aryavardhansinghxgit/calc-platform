import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBodyTypeCalculator } from "./calculator";
import { body_type_calculatorFaqs } from "./faq";

export const body_type_calculatorConfig: CalculatorModuleDefinition = {
  id: "body-type-calculator",
  title: "Body Type Calculator",
  slug: "body-type-calculator",
  category: "Health",
  subcategory: "Nutrition & Body",
  description: "Determine body shape classification (Hourglass, Pear, Rectangle, Inverted Triangle, Apple) & WHR health risk.",
  iconName: "User",
  featured: true,
  keywords: ["body type","body shape","waist to hip ratio","whr","body measurements"],
  priority: 1,
  relatedCalculators: ["body-fat-calculator","bmi-calculator"],
  formulaDescription: "Waist-to-Hip Ratio (WHR) = Waist (cm) / Hip (cm)",
  faqs: body_type_calculatorFaqs,
  inputs: [
  {
    "name": "gender",
    "label": "Gender",
    "type": "select",
    "defaultValue": "female",
    "options": [
      {
        "label": "Female",
        "value": "female"
      },
      {
        "label": "Male",
        "value": "male"
      }
    ]
  },
  {
    "name": "bustChest",
    "label": "Bust / Chest (cm)",
    "type": "number",
    "defaultValue": 90,
    "min": 40,
    "max": 200,
    "step": 1
  },
  {
    "name": "waist",
    "label": "Waist (cm)",
    "type": "number",
    "defaultValue": 70,
    "min": 40,
    "max": 200,
    "step": 1
  },
  {
    "name": "hip",
    "label": "Hip (cm)",
    "type": "number",
    "defaultValue": 95,
    "min": 40,
    "max": 200,
    "step": 1
  }
],
  outputs: [
  {
    "name": "bodyShape",
    "label": "Body Shape Classification",
    "format": "text",
    "highlight": true
  },
  {
    "name": "whr",
    "label": "Waist-to-Hip Ratio (WHR)",
    "format": "number"
  },
  {
    "name": "whrRisk",
    "label": "WHR Health Risk Level",
    "format": "text"
  }
],
  calculate: calculateBodyTypeCalculator,
};

export default body_type_calculatorConfig;
