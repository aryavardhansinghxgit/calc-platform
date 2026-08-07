import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStandardDeviationCalculator } from "./calculator";
import { standard_deviation_calculatorFaqs } from "./faq";

export const standard_deviation_calculatorConfig: CalculatorModuleDefinition = {
  id: "standard-deviation-calculator",
  title: "Standard Deviation Calculator",
  slug: "standard-deviation-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate sample and population standard deviation, variance, mean, and range.",
  iconName: "BarChart2",
  featured: true,
  keywords: ["standard deviation","sd calculator","variance","sample sd","population sd"],
  priority: 1,
  relatedCalculators: ["statistics-calculator","z-score-calculator"],
  formulaDescription: "Sample SD s = √[ Σ(x - x̄)² / (n - 1) ]",
  faqs: standard_deviation_calculatorFaqs,
  inputs: [
  {
    "name": "dataSeries",
    "label": "Data Values (comma-separated)",
    "type": "text",
    "defaultValue": "10, 12, 23, 23, 16, 23, 21, 16"
  }
],
  outputs: [
  {
    "name": "sampleSD",
    "label": "Sample Standard Deviation (s)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "populationSD",
    "label": "Population Standard Deviation (σ)",
    "format": "number"
  },
  {
    "name": "mean",
    "label": "Mean (μ)",
    "format": "number"
  },
  {
    "name": "sampleVariance",
    "label": "Sample Variance (s²)",
    "format": "number"
  }
],
  calculate: calculateStandardDeviationCalculator,
};

export default standard_deviation_calculatorConfig;
