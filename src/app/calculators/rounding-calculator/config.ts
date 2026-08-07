import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRoundingCalculator } from "./calculator";
import { rounding_calculatorFaqs } from "./faq";

export const rounding_calculatorConfig: CalculatorModuleDefinition = {
  id: "rounding-calculator",
  title: "Rounding Calculator",
  slug: "rounding-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Round numbers to specified decimal places, nearest 10, 100, floor, or ceiling.",
  iconName: "Binary",
  featured: true,
  keywords: ["rounding calculator","round number","floor","ceil","decimal places"],
  priority: 1,
  relatedCalculators: ["percentage-calculator","scientific-notation-calculator"],
  formulaDescription: "Standard Half-Up Rounding",
  faqs: rounding_calculatorFaqs,
  inputs: [
  {
    "name": "number",
    "label": "Number to Round",
    "type": "number",
    "defaultValue": 3.14159,
    "min": -1000000000,
    "max": 1000000000,
    "step": 0.001
  },
  {
    "name": "precision",
    "label": "Round To",
    "type": "select",
    "defaultValue": "2",
    "options": [
      {
        "label": "Nearest Integer",
        "value": "0"
      },
      {
        "label": "1 Decimal Place",
        "value": "1"
      },
      {
        "label": "2 Decimal Places",
        "value": "2"
      },
      {
        "label": "3 Decimal Places",
        "value": "3"
      },
      {
        "label": "Nearest 10",
        "value": "-1"
      },
      {
        "label": "Nearest 100",
        "value": "-2"
      }
    ]
  }
],
  outputs: [
  {
    "name": "roundedValue",
    "label": "Rounded Result",
    "format": "number",
    "highlight": true
  },
  {
    "name": "floorValue",
    "label": "Floor (Round Down)",
    "format": "number"
  },
  {
    "name": "ceilValue",
    "label": "Ceiling (Round Up)",
    "format": "number"
  }
],
  calculate: calculateRoundingCalculator,
};

export default rounding_calculatorConfig;
