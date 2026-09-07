import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGravelCalculator } from "./calculator";
import { gravel_calculatorFaqs } from "./faq";

export const gravel_calculatorConfig: CalculatorModuleDefinition = {
  id: "gravel-calculator",
  title: "Gravel Calculator",
  slug: "gravel-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate gravel needed in cubic yards, tons, bags and truckloads for driveways, patios, walkways and drainage. Includes compaction, waste, cost and French drain estimates.",
  iconName: "Layers",
  featured: true,
  keywords: ["gravel calculator","cubic yards of gravel","tons of gravel","driveway gravel","french drain gravel","crushed stone calculator"],
  priority: 1,
  relatedCalculators: ["square-footage-calculator", "concrete-calculator"],
  formulaDescription: "Volume = Area × Depth; Cubic Yards = Volume (ft³) / 27; Adjusted Volume = Volume × (1 + Compaction%) × (1 + Waste%); Tons = Cubic Yards × Density (tons/yd³).",
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
