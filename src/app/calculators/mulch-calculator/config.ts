import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMulchCalculator } from "./calculator";
import { mulch_calculatorFaqs } from "./faq";

export const mulch_calculatorConfig: CalculatorModuleDefinition = {
  id: "mulch-calculator",
  title: "Mulch Calculator",
  slug: "mulch-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate cubic yards and bag count of garden mulch for landscaping coverage.",
  iconName: "Trees",
  featured: true,
  keywords: ["mulch calculator","garden mulch","landscape mulch","cubic yards"],
  priority: 1,
  relatedCalculators: ["gravel-calculator","square-footage-calculator"],
  formulaDescription: "Cubic Yards = (Area sq ft × Depth ft) / 27",
  faqs: mulch_calculatorFaqs,
  inputs: [
  {
    "name": "areaSqFt",
    "label": "Landscape Bed Area (sq ft)",
    "type": "number",
    "defaultValue": 300,
    "min": 1,
    "max": 50000,
    "step": 10
  },
  {
    "name": "depthInches",
    "label": "Mulch Depth (inches)",
    "type": "number",
    "defaultValue": 3,
    "min": 1,
    "max": 12,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "cubicYards",
    "label": "Mulch Volume (Cubic Yards)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "bags2CuFt",
    "label": "2 Cu Ft Bags Needed",
    "format": "number"
  }
],
  calculate: calculateMulchCalculator,
};

export default mulch_calculatorConfig;
