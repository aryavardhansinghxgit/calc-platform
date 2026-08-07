import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRoofingCalculator } from "./calculator";
import { roofing_calculatorFaqs } from "./faq";

export const roofing_calculatorConfig: CalculatorModuleDefinition = {
  id: "roofing-calculator",
  title: "Roofing Calculator",
  slug: "roofing-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate roof surface area, roofing squares, and asphalt shingle bundle requirements.",
  iconName: "Home",
  featured: true,
  keywords: ["roofing calculator","roof squares","shingles needed","roof area"],
  priority: 1,
  relatedCalculators: ["square-footage-calculator","tile-calculator"],
  formulaDescription: "Roof Area = Base Footprint × Pitch Multiplier × 1.10 (Waste)",
  faqs: roofing_calculatorFaqs,
  inputs: [
  {
    "name": "houseLengthFt",
    "label": "House Length (ft)",
    "type": "number",
    "defaultValue": 40,
    "min": 1,
    "max": 500,
    "step": 1
  },
  {
    "name": "houseWidthFt",
    "label": "House Width (ft)",
    "type": "number",
    "defaultValue": 30,
    "min": 1,
    "max": 500,
    "step": 1
  },
  {
    "name": "pitch",
    "label": "Roof Pitch",
    "type": "select",
    "defaultValue": "1.118",
    "options": [
      {
        "label": "Low Pitch (4/12)",
        "value": "1.054"
      },
      {
        "label": "Medium Pitch (6/12)",
        "value": "1.118"
      },
      {
        "label": "Steep Pitch (8/12)",
        "value": "1.202"
      }
    ]
  }
],
  outputs: [
  {
    "name": "roofSquares",
    "label": "Roofing Squares Needed",
    "format": "number",
    "highlight": true
  },
  {
    "name": "bundlesNeeded",
    "label": "Shingle Bundles (3/square)",
    "format": "number"
  },
  {
    "name": "totalAreaSqFt",
    "label": "Estimated Roof Area",
    "format": "number",
    "unit": "sq ft"
  }
],
  calculate: calculateRoofingCalculator,
};

export default roofing_calculatorConfig;
