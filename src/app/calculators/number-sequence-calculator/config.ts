import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateNumberSequenceCalculator } from "./calculator";
import { number_sequence_calculatorFaqs } from "./faq";

export const number_sequence_calculatorConfig: CalculatorModuleDefinition = {
  id: "number-sequence-calculator",
  title: "Number Sequence Calculator",
  slug: "number-sequence-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate nth term and sum of arithmetic and geometric number sequences.",
  iconName: "TrendingUp",
  featured: true,
  keywords: ["number sequence","arithmetic sequence","geometric sequence","progression"],
  priority: 1,
  relatedCalculators: ["standard-deviation-calculator","statistics-calculator"],
  formulaDescription: "Arithmetic: aₙ = a₁ + (n-1)d; Geometric: aₙ = a₁ × r^(n-1)",
  faqs: number_sequence_calculatorFaqs,
  inputs: [
  {
    "name": "seqType",
    "label": "Sequence Type",
    "type": "select",
    "defaultValue": "arithmetic",
    "options": [
      {
        "label": "Arithmetic (aₙ = a₁ + (n-1)d)",
        "value": "arithmetic"
      },
      {
        "label": "Geometric (aₙ = a₁ × r^(n-1))",
        "value": "geometric"
      }
    ]
  },
  {
    "name": "firstTerm",
    "label": "First Term (a₁)",
    "type": "number",
    "defaultValue": 2,
    "min": -1000,
    "max": 1000,
    "step": 1
  },
  {
    "name": "diffRatio",
    "label": "Difference (d) / Ratio (r)",
    "type": "number",
    "defaultValue": 3,
    "min": -100,
    "max": 100,
    "step": 1
  },
  {
    "name": "termCount",
    "label": "Term Count (n)",
    "type": "number",
    "defaultValue": 10,
    "min": 1,
    "max": 100,
    "step": 1
  }
],
  outputs: [
  {
    "name": "nthTerm",
    "label": "nth Term (aₙ)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "sumN",
    "label": "Sum of n Terms (Sₙ)",
    "format": "number"
  },
  {
    "name": "sequencePreview",
    "label": "Sequence Preview",
    "format": "text"
  }
],
  calculate: calculateNumberSequenceCalculator,
};

export default number_sequence_calculatorConfig;
