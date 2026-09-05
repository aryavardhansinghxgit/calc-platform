import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRandomNumberGenerator } from "./calculator";
import { random_number_generatorFaqs } from "./faq";
import { RandomCalculator } from "@/components/calculator/random-number-generator/RandomCalculator";
import { RandomContent } from "@/components/calculator/random-number-generator/RandomContent";

export const random_number_generatorConfig: CalculatorModuleDefinition = {
  id: "random-number-generator",
  title: "Random Number Generator",
  slug: "random-number-generator",
  category: "Math",
  subcategory: "General Math",
  description: "Generate random integers and high-precision decimal numbers within a custom range. Create one or many values, inspect the distribution visually, and copy or export your results as CSV or JSON.",
  iconName: "Shuffle",
  featured: true,
  keywords: ["random number", "rng", "random generator", "csprng", "webcrypto", "unbiased random", "dice roll", "probability", "random integer", "random decimal"],
  priority: 1,
  relatedCalculators: ["exponent-calculator", "scientific-calculator", "rounding-calculator"],
  formulaDescription: "Random Integer in [Min, Max] via unbiased Web Crypto CSPRNG rejection sampling",
  faqs: random_number_generatorFaqs,
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
