import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHalfLifeCalculator } from "./calculator";
import { half_life_calculatorFaqs } from "./faq";

export const half_life_calculatorConfig: CalculatorModuleDefinition = {
  id: "half-life-calculator",
  title: "Half-Life Calculator",
  slug: "half-life-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate radioactive decay, half-life duration, initial amount, or remaining substance quantity.",
  iconName: "Clock",
  featured: true,
  keywords: ["half life","radioactive decay","decay constant","exponential decay"],
  priority: 1,
  relatedCalculators: ["exponent-calculator","log-calculator"],
  formulaDescription: "N(t) = N₀ × (1/2)^(t / t½)",
  faqs: half_life_calculatorFaqs,
  inputs: [
  {
    "name": "initialAmount",
    "label": "Initial Quantity (N₀)",
    "type": "number",
    "defaultValue": 100,
    "min": 0,
    "max": 1000000000,
    "step": 1
  },
  {
    "name": "halfLife",
    "label": "Half-Life Time (t½)",
    "type": "number",
    "defaultValue": 5,
    "min": 0.001,
    "max": 1000000,
    "step": 0.1
  },
  {
    "name": "elapsedTime",
    "label": "Elapsed Time (t)",
    "type": "number",
    "defaultValue": 15,
    "min": 0,
    "max": 1000000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "remainingAmount",
    "label": "Remaining Quantity N(t)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "pctRemaining",
    "label": "Percentage Remaining",
    "format": "percentage"
  },
  {
    "name": "decayConstant",
    "label": "Decay Constant (λ)",
    "format": "number"
  }
],
  calculate: calculateHalfLifeCalculator,
};

export default half_life_calculatorConfig;
