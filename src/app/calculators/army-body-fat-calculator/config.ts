import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateArmyBodyFatCalculator } from "./calculator";
import { army_body_fat_calculatorFaqs } from "./faq";

export const army_body_fat_calculatorConfig: CalculatorModuleDefinition = {
  id: "army-body-fat-calculator",
  title: "Army Body Fat Calculator",
  slug: "army-body-fat-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Determine body fat compliance according to U.S. Army Standards (AR 600-9 tape test).",
  iconName: "ShieldCheck",
  featured: true,
  keywords: ["army body fat","ar 600-9","tape test","military fitness"],
  priority: 1,
  relatedCalculators: ["body-fat-calculator","lean-body-mass-calculator"],
  formulaDescription: "AR 600-9 Army Body Composition Tape Measurement Standard.",
  faqs: army_body_fat_calculatorFaqs,
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
    "name": "age",
    "label": "Age Group",
    "type": "select",
    "defaultValue": "21",
    "options": [
      {
        "label": "17 - 20",
        "value": "18"
      },
      {
        "label": "21 - 27",
        "value": "24"
      },
      {
        "label": "28 - 39",
        "value": "33"
      },
      {
        "label": "40+",
        "value": "45"
      }
    ]
  },
  {
    "name": "heightCm",
    "label": "Height (cm)",
    "type": "number",
    "defaultValue": 175,
    "min": 120,
    "max": 230,
    "step": 0.5
  },
  {
    "name": "neckCm",
    "label": "Neck (cm)",
    "type": "number",
    "defaultValue": 38,
    "min": 20,
    "max": 60,
    "step": 0.5
  },
  {
    "name": "waistCm",
    "label": "Waist (cm)",
    "type": "number",
    "defaultValue": 82,
    "min": 40,
    "max": 180,
    "step": 0.5
  },
  {
    "name": "hipCm",
    "label": "Hip (cm - Female)",
    "type": "number",
    "defaultValue": 95,
    "min": 40,
    "max": 180,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "bodyFatPercent",
    "label": "Army Body Fat %",
    "format": "percentage",
    "highlight": true
  },
  {
    "name": "maxAllowed",
    "label": "Max Allowed Body Fat",
    "format": "percentage"
  },
  {
    "name": "status",
    "label": "Compliance Status",
    "format": "text"
  }
],
  calculate: calculateArmyBodyFatCalculator,
};

export default army_body_fat_calculatorConfig;
