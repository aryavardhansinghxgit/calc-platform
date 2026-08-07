import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRandomNumberGenerator } from "./calculator";
import { random_number_generatorFaqs } from "./faq";

export const random_number_generatorConfig: CalculatorModuleDefinition = {
  id: "random-number-generator",
  title: "Random Number Generator",
  slug: "random-number-generator",
  category: "Math",
  subcategory: "General Math",
  description: "Generate bounded pseudo-random integers or floating point numbers instantly.",
  iconName: "Shuffle",
  featured: true,
  keywords: ["random number","rng","random generator","dice roll","probability"],
  priority: 1,
  relatedCalculators: ["probability-calculator","statistics-calculator"],
  formulaDescription: "Random Integer = Math.floor(Math.random() × (Max - Min + 1)) + Min",
  faqs: random_number_generatorFaqs,
  inputs: [
  {
    "name": "min",
    "label": "Minimum Bound",
    "type": "number",
    "defaultValue": 1,
    "min": -1000000,
    "max": 1000000,
    "step": 1
  },
  {
    "name": "max",
    "label": "Maximum Bound",
    "type": "number",
    "defaultValue": 100,
    "min": -1000000,
    "max": 1000000,
    "step": 1
  },
  {
    "name": "count",
    "label": "Quantity to Generate",
    "type": "number",
    "defaultValue": 5,
    "min": 1,
    "max": 50,
    "step": 1
  }
],
  outputs: [
  {
    "name": "generatedList",
    "label": "Generated Random Numbers",
    "format": "text",
    "highlight": true
  },
  {
    "name": "average",
    "label": "Average Value",
    "format": "number"
  },
  {
    "name": "sum",
    "label": "Sum of Generated Numbers",
    "format": "number"
  }
],
  calculate: calculateRandomNumberGenerator,
};

export default random_number_generatorConfig;
