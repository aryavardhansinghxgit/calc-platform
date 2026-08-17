import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStandardDeviationCalculator } from "./calculator";
import { StdDevCalculator } from "@/components/calculator/standard-deviation/StdDevCalculator";
import { StdDevContent } from "@/components/calculator/standard-deviation/StdDevContent";

export const standard_deviation_calculatorConfig: CalculatorModuleDefinition = {
  id: "standard-deviation-calculator",
  title: "Standard Deviation Calculator — Sample, Population & Step-by-Step Variance",
  slug: "standard-deviation-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate Sample (s) and Population (σ) Standard Deviation, Variance, Standard Error, Coefficient of Variation, Tukey Outliers, interactive SVG Bell Curve, and step-by-step variance tables.",
  iconName: "BarChart2",
  featured: true,
  keywords: [
    "Standard Deviation Calculator",
    "Sample Standard Deviation Calculator",
    "Population Standard Deviation",
    "Variance Calculator",
    "How to Calculate Standard Deviation",
    "Bell Curve Standard Deviation Calculator"
  ],
  priority: 1,
  relatedCalculators: ["statistics-calculator", "z-score-calculator", "mean-median-mode-calculator"],
  formulaDescription: "Sample SD s = √[ Σ(x - x̄)² / (n - 1) ]",
  faqs: [],
  CustomComponent: StdDevCalculator,
  ContentComponent: StdDevContent,
  inputs: [
    {
      name: "dataSeries",
      label: "Data Values (comma-separated)",
      type: "text",
      defaultValue: "10, 12, 23, 23, 16, 23, 21, 16"
    }
  ],
  outputs: [
    {
      name: "sampleSD",
      label: "Sample Standard Deviation (s)",
      format: "number",
      highlight: true
    },
    {
      name: "populationSD",
      label: "Population Standard Deviation (σ)",
      format: "number"
    },
    {
      name: "mean",
      label: "Mean (μ)",
      format: "number"
    },
    {
      name: "sampleVariance",
      label: "Sample Variance (s²)",
      format: "number"
    }
  ],
  calculate: calculateStandardDeviationCalculator
} as any;

export default standard_deviation_calculatorConfig;
