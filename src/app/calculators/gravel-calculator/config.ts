import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGravelCalculator } from "./calculator";
import { gravel_calculatorFaqs } from "./faq";

export const gravel_calculatorConfig: CalculatorModuleDefinition = {
  id: "gravel-calculator",
  title: "Gravel Calculator",
  slug: "gravel-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate weight in tons and volume in cubic yards of crushed stone or gravel.",
  iconName: "Layers",
  featured: true,
  keywords: ["gravel calculator","crushed stone","tons of gravel","driveway gravel"],
  priority: 1,
  relatedCalculators: ["mulch-calculator","concrete-calculator"],
  formulaDescription: "Gravel Weight (Tons) = Cubic Yards × 1.4 Tons/Yard",
  faqs: gravel_calculatorFaqs,
  inputs: [
  {
    "name": "areaSqFt",
    "label": "Driveway / Path Area (sq ft)",
    "type": "number",
    "defaultValue": 500,
    "min": 1,
    "max": 50000,
    "step": 50
  },
  {
    "name": "depthInches",
    "label": "Gravel Depth (inches)",
    "type": "number",
    "defaultValue": 4,
    "min": 1,
    "max": 24,
    "step": 1
  }
],
  outputs: [
  {
    "name": "tonsNeeded",
    "label": "Total Gravel Needed (Tons)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "cubicYards",
    "label": "Volume (Cubic Yards)",
    "format": "number"
  }
],
  calculate: calculateGravelCalculator,
};

export default gravel_calculatorConfig;
