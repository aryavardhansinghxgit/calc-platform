import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateSampleSizeCalculator } from "./calculator";
import { SampleSizeCalculator } from "@/components/calculator/sample-size/SampleSizeCalculator";
import { SampleSizeContent } from "@/components/calculator/sample-size/SampleSizeContent";

export const sample_size_calculatorConfig: CalculatorModuleDefinition = {
  id: "sample-size-calculator",
  title: "Sample Size Calculator — Survey, Power Analysis & Margin of Error",
  slug: "sample-size-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Determine required statistical sample size for surveys, A/B conversion tests, clinical trials, and hypothesis testing with Finite Population Correction (FPC), SVG power curves, and APA methodology text.",
  iconName: "Users",
  featured: true,
  keywords: [
    "Sample Size Calculator",
    "Survey Sample Size Calculator",
    "How to Calculate Sample Size",
    "Margin of Error Calculator",
    "A/B Test Sample Size Calculator",
    "Statistical Power Calculator"
  ],
  priority: 1,
  relatedCalculators: ["confidence-interval-calculator", "z-score-calculator", "standard-deviation-calculator"],
  formulaDescription: "Cochran's Formula: n = [ Z² × p(1-p) ] / E²",
  faqs: [],
  CustomComponent: SampleSizeCalculator,
  ContentComponent: SampleSizeContent,
  inputs: [
    {
      name: "confidenceLevel",
      label: "Confidence Level (%)",
      type: "select",
      defaultValue: "95",
      options: [
        { label: "90% (Z = 1.645)", value: "90" },
        { label: "95% (Z = 1.960)", value: "95" },
        { label: "99% (Z = 2.576)", value: "99" }
      ]
    },
    {
      name: "marginError",
      label: "Margin of Error (%)",
      type: "number",
      defaultValue: 5,
      min: 0.1,
      max: 20,
      step: 0.5
    },
    {
      name: "population",
      label: "Population Size (Optional)",
      type: "number",
      defaultValue: 10000,
      min: 10,
      max: 1000000000,
      step: 100
    }
  ],
  outputs: [
    {
      name: "sampleSize",
      label: "Required Sample Size",
      format: "number",
      highlight: true
    },
    {
      name: "zScore",
      label: "Z-Score Used",
      format: "number"
    }
  ],
  calculate: calculateSampleSizeCalculator
} as any;

export default sample_size_calculatorConfig;
