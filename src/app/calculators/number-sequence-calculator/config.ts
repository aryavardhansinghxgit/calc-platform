import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateNumberSequenceCalculator } from "./calculator";
import { SequenceCalculator } from "@/components/calculator/number-sequence/SequenceCalculator";
import { SequenceContent } from "@/components/calculator/number-sequence/SequenceContent";

export const number_sequence_calculatorConfig: CalculatorModuleDefinition = {
  id: "number-sequence-calculator",
  title: "Number Sequence Calculator — Arithmetic, Geometric & Pattern Solver",
  slug: "number-sequence-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Identify patterns, find explicit formulas, and solve arithmetic, geometric, quadratic, and Fibonacci number sequences with interactive 2D graphs and finite difference tables.",
  iconName: "TrendingUp",
  featured: true,
  keywords: [
    "Number Sequence Calculator",
    "Arithmetic Sequence Calculator",
    "Geometric Sequence Calculator",
    "Sequence Solver",
    "Find the Next Number in the Sequence",
    "Fibonacci Calculator",
    "Series and Sequences Solver"
  ],
  priority: 1,
  relatedCalculators: ["standard-deviation-calculator", "exponent-calculator", "big-number-calculator"],
  formulaDescription: "Arithmetic: aₙ = a₁ + (n-1)d; Geometric: aₙ = a₁ × r^(n-1)",
  faqs: [],
  CustomComponent: SequenceCalculator,
  ContentComponent: SequenceContent,
  inputs: [
    {
      name: "seqType",
      label: "Sequence Type",
      type: "select",
      defaultValue: "arithmetic",
      options: [
        { label: "Arithmetic (aₙ = a₁ + (n-1)d)", value: "arithmetic" },
        { label: "Geometric (aₙ = a₁ × r^(n-1))", value: "geometric" }
      ]
    },
    {
      name: "firstTerm",
      label: "First Term (a₁)",
      type: "number",
      defaultValue: 2,
      min: -1000,
      max: 1000,
      step: 1
    },
    {
      name: "diffRatio",
      label: "Difference (d) / Ratio (r)",
      type: "number",
      defaultValue: 3,
      min: -100,
      max: 100,
      step: 1
    },
    {
      name: "termCount",
      label: "Term Count (n)",
      type: "number",
      defaultValue: 10,
      min: 1,
      max: 100,
      step: 1
    }
  ],
  outputs: [
    {
      name: "nthTerm",
      label: "nth Term (aₙ)",
      format: "number",
      highlight: true
    },
    {
      name: "sumN",
      label: "Sum of n Terms (Sₙ)",
      format: "number"
    },
    {
      name: "sequencePreview",
      label: "Sequence Preview",
      format: "text"
    }
  ],
  calculate: calculateNumberSequenceCalculator
} as any;

export default number_sequence_calculatorConfig;
