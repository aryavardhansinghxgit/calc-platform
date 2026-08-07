import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateScientificNotationCalculator } from "./calculator";
import { scientific_notation_calculatorFaqs } from "./faq";

export const scientific_notation_calculatorConfig: CalculatorModuleDefinition = {
  id: "scientific-notation-calculator",
  title: "Scientific Notation Calculator",
  slug: "scientific-notation-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Convert numbers to and from scientific notation (a × 10^b) and engineering notation.",
  iconName: "FileText",
  featured: true,
  keywords: ["scientific notation","exponential notation","engineering notation","big numbers"],
  priority: 1,
  relatedCalculators: ["exponent-calculator","big-number-calculator"],
  formulaDescription: "Scientific Notation = a × 10^b (where 1 ≤ |a| < 10)",
  faqs: scientific_notation_calculatorFaqs,
  inputs: [
  {
    "name": "number",
    "label": "Input Number",
    "type": "number",
    "defaultValue": 3500000,
    "min": -1000000000000000,
    "max": 1000000000000000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "scientific",
    "label": "Scientific Notation",
    "format": "text",
    "highlight": true
  },
  {
    "name": "engineering",
    "label": "Engineering Notation",
    "format": "text"
  },
  {
    "name": "standard",
    "label": "Standard Form",
    "format": "number"
  }
],
  calculate: calculateScientificNotationCalculator,
};

export default scientific_notation_calculatorConfig;
