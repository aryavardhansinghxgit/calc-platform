import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGFRCalculator } from "./calculator";
import { gfr_calculatorFaqs } from "./faq";

export const gfr_calculatorConfig: CalculatorModuleDefinition = {
  id: "gfr-calculator",
  title: "GFR Calculator",
  slug: "gfr-calculator",
  category: "Health",
  subcategory: "Nutrition & Body",
  description: "Estimate Glomerular Filtration Rate (eGFR) and kidney health stage using CKD-EPI 2021 formula.",
  iconName: "Activity",
  featured: true,
  keywords: ["gfr","egfr","kidney function","creatinine","ckd-epi"],
  priority: 1,
  relatedCalculators: ["body-surface-area-calculator","bmi-calculator"],
  formulaDescription: "CKD-EPI 2021 Race-Free Creatinine Equation",
  faqs: gfr_calculatorFaqs,
  inputs: [
  {
    "name": "serumCreatinine",
    "label": "Serum Creatinine (mg/dL)",
    "type": "number",
    "defaultValue": 1,
    "min": 0.2,
    "max": 15,
    "step": 0.1
  },
  {
    "name": "age",
    "label": "Age",
    "type": "number",
    "defaultValue": 50,
    "min": 18,
    "max": 110,
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
  }
],
  outputs: [
  {
    "name": "eGfr",
    "label": "Estimated GFR (eGFR)",
    "format": "number",
    "highlight": true,
    "unit": "mL/min/1.73m²"
  },
  {
    "name": "stage",
    "label": "CKD Kidney Stage",
    "format": "text"
  }
],
  calculate: calculateGFRCalculator,
};

export default gfr_calculatorConfig;
