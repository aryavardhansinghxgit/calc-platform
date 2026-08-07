import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHeightCalculator } from "./calculator";
import { height_calculatorFaqs } from "./faq";

export const height_calculatorConfig: CalculatorModuleDefinition = {
  id: "height-calculator",
  title: "Height Calculator",
  slug: "height-calculator",
  category: "converters",
  subcategory: "Measurements & Units",
  description: "Convert height between feet/inches and cm, and predict child adult height.",
  iconName: "Ruler",
  featured: true,
  keywords: ["height calculator","child height predictor","feet to cm","height conversion"],
  priority: 1,
  relatedCalculators: ["conversion-calculator","weight-calculator"],
  formulaDescription: "Mid-Parental Method: Boy = (Father + Mother + 13cm) / 2",
  faqs: height_calculatorFaqs,
  inputs: [
  {
    "name": "fatherHeightCm",
    "label": "Father's Height (cm)",
    "type": "number",
    "defaultValue": 178,
    "min": 100,
    "max": 250,
    "step": 1
  },
  {
    "name": "motherHeightCm",
    "label": "Mother's Height (cm)",
    "type": "number",
    "defaultValue": 165,
    "min": 100,
    "max": 250,
    "step": 1
  },
  {
    "name": "childGender",
    "label": "Child Gender",
    "type": "select",
    "defaultValue": "male",
    "options": [
      {
        "label": "Boy",
        "value": "male"
      },
      {
        "label": "Girl",
        "value": "female"
      }
    ]
  }
],
  outputs: [
  {
    "name": "predictedHeightCm",
    "label": "Predicted Adult Height",
    "format": "number",
    "highlight": true,
    "unit": "cm"
  },
  {
    "name": "predictedHeightFeet",
    "label": "Height in Feet & Inches",
    "format": "text"
  }
],
  calculate: calculateHeightCalculator,
};

export default height_calculatorConfig;
