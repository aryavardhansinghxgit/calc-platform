import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBraSizeCalculator } from "./calculator";
import { bra_size_calculatorFaqs } from "./faq";

export const bra_size_calculatorConfig: CalculatorModuleDefinition = {
  id: "bra-size-calculator",
  title: "Bra Size Calculator",
  slug: "bra-size-calculator",
  category: "other",
  subcategory: "Everyday Utility",
  description: "Calculate bra band size and cup size based on snug underbust and full bust measurements.",
  iconName: "User",
  featured: true,
  keywords: ["bra size calculator","cup size","band size","fitting"],
  priority: 1,
  relatedCalculators: ["shoe-size-calculator"],
  formulaDescription: "Band = Underbust Rounded to Nearest Even Integer; Cup = Bust - Underbust",
  faqs: bra_size_calculatorFaqs,
  inputs: [
  {
    "name": "underbustInches",
    "label": "Underbust Measurement (inches)",
    "type": "number",
    "defaultValue": 32,
    "min": 20,
    "max": 60,
    "step": 0.5
  },
  {
    "name": "bustInches",
    "label": "Bust Measurement (inches)",
    "type": "number",
    "defaultValue": 36,
    "min": 20,
    "max": 70,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "braSize",
    "label": "Calculated Bra Size",
    "format": "text",
    "highlight": true
  },
  {
    "name": "bandSize",
    "label": "Band Size",
    "format": "number"
  },
  {
    "name": "cupLetter",
    "label": "Cup Size",
    "format": "text"
  }
],
  calculate: calculateBraSizeCalculator,
};

export default bra_size_calculatorConfig;
