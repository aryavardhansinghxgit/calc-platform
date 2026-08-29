import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateIdealWeightCalculator } from "./calculator";
import { ideal_weight_calculatorFaqs } from "./faq";

export const ideal_weight_calculatorConfig: CalculatorModuleDefinition = {
  id: "ideal-weight-calculator",
  title: "Ideal Weight Calculator",
  slug: "ideal-weight-calculator",
  category: "Health",
  description:
    "Calculate an estimated ideal body weight using five established formulas, compare the results, and see how your current weight relates to a BMI-based healthy weight range.",
  iconName: "Target",
  featured: true,
  keywords: ["ideal weight","healthy weight","bmi","target weight"],
  priority: 1,
  relatedCalculators: ["healthy-weight-calculator","bmi-calculator","body-fat-calculator"],
  formulaDescription: "Devine Formula: Male = 50kg + 2.3kg per inch over 5ft.",
  faqs: ideal_weight_calculatorFaqs,
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
    "name": "heightCm",
    "label": "Height (cm)",
    "type": "number",
    "defaultValue": 175,
    "min": 120,
    "max": 230,
    "step": 1
  }
],
  outputs: [
  {
    "name": "devine",
    "label": "Devine Formula",
    "format": "number",
    "highlight": true,
    "unit": "kg"
  },
  {
    "name": "robinson",
    "label": "Robinson Formula",
    "format": "number",
    "unit": "kg"
  },
  {
    "name": "miller",
    "label": "Miller Formula",
    "format": "number",
    "unit": "kg"
  },
  {
    "name": "hamwi",
    "label": "Hamwi Formula",
    "format": "number",
    "unit": "kg"
  }
],
  calculate: calculateIdealWeightCalculator,
};

export default ideal_weight_calculatorConfig;
