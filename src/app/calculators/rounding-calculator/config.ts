import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateRoundingCalculator } from "./calculator";
import { RoundingCalculator } from "@/components/calculator/rounding/RoundingCalculator";
import { RoundingContent } from "@/components/calculator/rounding/RoundingContent";

export const rounding_calculatorConfig: CalculatorModuleDefinition = {
  id: "rounding-calculator",
  title: "Rounding Calculator",
  slug: "rounding-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Round numbers to specified decimal places, place values, sig figs, nearest fractions, custom multiples, Swedish cash rounding, and bulk column CSV rounding with 8 standard IEEE/financial algorithms.",
  iconName: "Binary",
  featured: true,
  keywords: [
    "Rounding Calculator",
    "Round to the Nearest Tenth",
    "Round to the Nearest Hundredth",
    "Round to Nearest Cent",
    "Significant Figures Rounding Calculator",
    "Bankers Rounding Calculator"
  ],
  priority: 1,
  relatedCalculators: ["percentage-calculator", "scientific-notation-calculator", "fraction-calculator"],
  formulaDescription: "Standard IEEE 754 & Financial Rounding Rules",
  faqs: [],
  CustomComponent: RoundingCalculator,
  ContentComponent: RoundingContent,
  inputs: [
    {
      name: "number",
      label: "Number to Round",
      type: "number",
      defaultValue: 12.34567,
      min: -1000000000,
      max: 1000000000,
      step: 0.001
    },
    {
      name: "precision",
      label: "Round To",
      type: "select",
      defaultValue: "2",
      options: [
        { label: "Nearest Integer", value: "0" },
        { label: "1 Decimal Place", value: "1" },
        { label: "2 Decimal Places", value: "2" },
        { label: "3 Decimal Places", value: "3" },
        { label: "Nearest 10", value: "-1" },
        { label: "Nearest 100", value: "-2" }
      ]
    }
  ],
  outputs: [
    {
      name: "roundedValue",
      label: "Rounded Result",
      format: "number",
      highlight: true
    },
    {
      name: "floorValue",
      label: "Floor (Round Down)",
      format: "number"
    },
    {
      name: "ceilValue",
      label: "Ceiling (Round Up)",
      format: "number"
    }
  ],
  calculate: calculateRoundingCalculator
} as any;

export default rounding_calculatorConfig;
