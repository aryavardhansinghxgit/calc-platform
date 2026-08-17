import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateScientificNotationCalculator } from "./calculator";
import { ScientificNotationCalculator } from "@/components/calculator/scientific-notation/ScientificNotationCalculator";
import { ScientificNotationContent } from "@/components/calculator/scientific-notation/ScientificNotationContent";

export const scientific_notation_calculatorConfig: CalculatorModuleDefinition = {
  id: "scientific-notation-calculator",
  title: "Scientific Notation Calculator & Converter",
  slug: "scientific-notation-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate and convert numbers in scientific notation (a × 10^b), engineering notation with SI metric prefixes, E-notation, expanded decimals, and physical constants presets.",
  iconName: "FileText",
  featured: true,
  keywords: [
    "Scientific Notation Calculator",
    "Scientific Notation to Decimal",
    "Decimal to Scientific Notation",
    "Scientific Notation Operations",
    "Engineering Notation Calculator",
    "E Notation Calculator"
  ],
  priority: 1,
  relatedCalculators: ["exponent-calculator", "big-number-calculator", "rounding-calculator"],
  formulaDescription: "Scientific Notation = a × 10^b (where 1 ≤ |a| < 10)",
  faqs: [],
  CustomComponent: ScientificNotationCalculator,
  ContentComponent: ScientificNotationContent,
  inputs: [
    {
      name: "number",
      label: "Input Number",
      type: "number",
      defaultValue: 3500000,
      min: -1000000000000000,
      max: 1000000000000000,
      step: 1
    }
  ],
  outputs: [
    {
      name: "scientific",
      label: "Scientific Notation",
      format: "text",
      highlight: true
    },
    {
      name: "engineering",
      label: "Engineering Notation",
      format: "text"
    },
    {
      name: "standard",
      label: "Standard Form",
      format: "number"
    }
  ],
  calculate: calculateScientificNotationCalculator
} as any;

export default scientific_notation_calculatorConfig;
