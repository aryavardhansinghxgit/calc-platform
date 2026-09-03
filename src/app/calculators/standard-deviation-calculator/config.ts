import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStandardDeviationCalculator } from "./calculator";
import { StdDevCalculator } from "@/components/calculator/standard-deviation/StdDevCalculator";
import { StdDevContent } from "@/components/calculator/standard-deviation/StdDevContent";
import { standard_deviation_calculatorFaqs } from "./faq";

export const standard_deviation_calculatorConfig: CalculatorModuleDefinition = {
  id: "standard-deviation-calculator",
  title: "Standard Deviation Calculator",
  slug: "standard-deviation-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate sample or population standard deviation, variance, standard error, coefficient of variation and more. Compare datasets, visualize spread and work through every step of the calculation.",
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
  faqs: standard_deviation_calculatorFaqs,
  CustomComponent: StdDevCalculator,
  ContentComponent: StdDevContent,
  inputs: [
    {
      name: "dataSeries",
      label: "Data Values (comma-separated)",
      type: "text",
      defaultValue: "10, 12, 23, 16, 23, 21, 16, 16"
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
