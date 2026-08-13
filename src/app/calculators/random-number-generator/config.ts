import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRandomNumberGenerator } from "./calculator";
import { RandomCalculator } from "@/components/calculator/random-number-generator/RandomCalculator";
import { RandomContent } from "@/components/calculator/random-number-generator/RandomContent";

export const random_number_generatorConfig: CalculatorModuleDefinition = {
  id: "random-number-generator",
  title: "Random Number Generator",
  slug: "random-number-generator",
  category: "Math",
  subcategory: "General Math",
  description: "Generate bounded pseudo-random integers, decimals, hardware WebCrypto CSPRNG, unique lottery samples, and CSV/JSON downloads.",
  iconName: "Shuffle",
  featured: true,
  keywords: ["random number","rng","random generator","dice roll","probability","webcrypto","prng","lottery generator"],
  priority: 1,
  relatedCalculators: ["probability-calculator","statistics-calculator","standard-deviation-calculator"],
  formulaDescription: "Random Integer = Math.floor(Math.random() × (Max - Min + 1)) + Min",
  ContentComponent: RandomContent,
  CustomComponent: RandomCalculator,
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
