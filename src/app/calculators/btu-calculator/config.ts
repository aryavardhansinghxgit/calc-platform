import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBTUCalculator } from "./calculator";
import { btu_calculatorFaqs } from "./faq";

export const btu_calculatorConfig: CalculatorModuleDefinition = {
  id: "btu-calculator",
  title: "BTU Calculator",
  slug: "btu-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate required heating and air conditioning cooling BTU output for a room.",
  iconName: "Flame",
  featured: true,
  keywords: ["btu calculator","ac btu","heating btu","room cooling"],
  priority: 1,
  relatedCalculators: ["square-footage-calculator","electricity-calculator"],
  formulaDescription: "BTU = Area (sq ft) × Insulation Factor (20-30)",
  faqs: btu_calculatorFaqs,
  inputs: [
  {
    "name": "lengthFt",
    "label": "Room Length (ft)",
    "type": "number",
    "defaultValue": 15,
    "min": 1,
    "max": 200,
    "step": 1
  },
  {
    "name": "widthFt",
    "label": "Room Width (ft)",
    "type": "number",
    "defaultValue": 20,
    "min": 1,
    "max": 200,
    "step": 1
  },
  {
    "name": "insulation",
    "label": "Insulation Level",
    "type": "select",
    "defaultValue": "average",
    "options": [
      {
        "label": "Good (Modern Energy Efficient)",
        "value": "20"
      },
      {
        "label": "Average (Standard Home)",
        "value": "25"
      },
      {
        "label": "Poor (Older / Poor Insulation)",
        "value": "30"
      }
    ]
  }
],
  outputs: [
  {
    "name": "requiredBtu",
    "label": "Required Cooling/Heating BTU",
    "format": "number",
    "highlight": true,
    "unit": "BTU/hr"
  },
  {
    "name": "acTons",
    "label": "Recommended AC Tonnage",
    "format": "number",
    "unit": "Tons"
  }
],
  calculate: calculateBTUCalculator,
};

export default btu_calculatorConfig;
