import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBTUCalculator } from "./calculator";
import { btu_calculatorFaqs } from "./faq";

export const btu_calculatorConfig: CalculatorModuleDefinition = {
  id: "btu-calculator",
  title: "BTU Calculator",
  slug: "btu-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate AC cooling BTUs, heating load, AC tonnage, kW, fuel use, SEER energy costs and carbon estimates. Free BTU calculator with step-by-step results.",
  iconName: "Flame",
  featured: true,
  keywords: [
    "btu calculator",
    "btu calculator for room",
    "ac btu calculator",
    "air conditioner btu calculator",
    "cooling btu calculator",
    "heating btu calculator",
    "btu per hour calculator",
    "btu to ton calculator",
    "btu to kw calculator",
    "ac tonnage calculator",
    "hvac btu calculator",
    "heating load calculator",
    "seer calculator",
    "ac electricity cost calculator",
    "air conditioner energy cost calculator",
    "how many btus do i need for my room",
    "what size ac do i need",
    "how to calculate btu for a room",
    "btu calculator for square feet",
    "btu calculator with ceiling height"
  ],
  priority: 1,
  relatedCalculators: ["square-footage-calculator", "electricity-calculator"],
  formulaDescription: "Q = Area × Base Load + Ceiling Offset + Occupants × Multipliers",
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
