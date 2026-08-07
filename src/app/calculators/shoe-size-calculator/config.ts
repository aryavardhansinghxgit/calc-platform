import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateShoeSizeConversionCalculator } from "./calculator";
import { shoe_size_calculatorFaqs } from "./faq";

export const shoe_size_calculatorConfig: CalculatorModuleDefinition = {
  id: "shoe-size-calculator",
  title: "Shoe Size Conversion Calculator",
  slug: "shoe-size-calculator",
  category: "other",
  subcategory: "Everyday Utility",
  description: "Convert foot length into international shoe sizes (US, UK, EU, CM).",
  iconName: "Footprints",
  featured: true,
  keywords: ["shoe size converter","shoe size calculator","us to eu shoe size"],
  priority: 1,
  relatedCalculators: ["bra-size-calculator","conversion-calculator"],
  formulaDescription: "International Standard Foot Length Conversion",
  faqs: shoe_size_calculatorFaqs,
  inputs: [
  {
    "name": "footCm",
    "label": "Foot Length (cm)",
    "type": "number",
    "defaultValue": 26,
    "min": 10,
    "max": 40,
    "step": 0.5
  },
  {
    "name": "gender",
    "label": "Gender / Group",
    "type": "select",
    "defaultValue": "men",
    "options": [
      {
        "label": "Men's",
        "value": "men"
      },
      {
        "label": "Women's",
        "value": "women"
      }
    ]
  }
],
  outputs: [
  {
    "name": "usSize",
    "label": "US Shoe Size",
    "format": "text",
    "highlight": true
  },
  {
    "name": "ukSize",
    "label": "UK Shoe Size",
    "format": "text"
  },
  {
    "name": "euSize",
    "label": "EU Shoe Size",
    "format": "text"
  }
],
  calculate: calculateShoeSizeConversionCalculator,
};

export default shoe_size_calculatorConfig;
