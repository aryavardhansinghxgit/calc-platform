import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStairCalculator } from "./calculator";
import { stair_calculatorFaqs } from "./faq";

export const stair_calculatorConfig: CalculatorModuleDefinition = {
  id: "stair-calculator",
  title: "Stair Calculator",
  slug: "stair-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate stair riser height, tread depth, number of steps, total run, stair angle, stringer length and headroom. Includes stair geometry, material cost and code-reference checks.",
  iconName: "Layers",
  featured: true,
  keywords: ["stair calculator","stair riser","stair tread","staircase design","stringer calculator"],
  priority: 1,
  relatedCalculators: ["square-footage-calculator","concrete-calculator"],
  formulaDescription: "Risers Count = ceil(Total Rise / Target Riser Height)",
  faqs: stair_calculatorFaqs,
  inputs: [
  {
    "name": "totalRiseInches",
    "label": "Total Rise Height (inches)",
    "type": "number",
    "defaultValue": 108,
    "min": 10,
    "max": 600,
    "step": 1
  },
  {
    "name": "targetRiserHeight",
    "label": "Target Riser Height (inches)",
    "type": "number",
    "defaultValue": 7.5,
    "min": 4,
    "max": 10,
    "step": 0.25
  }
],
  outputs: [
  {
    "name": "numberOfSteps",
    "label": "Number of Risers (Steps)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "exactRiserHeight",
    "label": "Exact Riser Height (inches)",
    "format": "number"
  },
  {
    "name": "totalRunInches",
    "label": "Total Run Length (10\" treads)",
    "format": "number",
    "unit": "in"
  }
],
  calculate: calculateStairCalculator,
};

export default stair_calculatorConfig;
