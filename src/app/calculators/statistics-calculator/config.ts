import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStatisticsCalculator } from "./calculator";
import { statistics_calculatorFaqs } from "./faq";

export const statistics_calculatorConfig: CalculatorModuleDefinition = {
  id: "statistics-calculator",
  title: "Statistics Calculator",
  slug: "statistics-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate complete descriptive statistics summary including mean, median, mode, range, and variance.",
  iconName: "BarChart",
  featured: true,
  keywords: ["statistics calculator","descriptive statistics","mean median mode","summary stats"],
  priority: 1,
  relatedCalculators: ["standard-deviation-calculator","mean-median-mode-calculator"],
  formulaDescription: "Summary Descriptive Statistics Engine",
  faqs: statistics_calculatorFaqs,
  inputs: [
  {
    "name": "dataSeries",
    "label": "Dataset (comma-separated)",
    "type": "text",
    "defaultValue": "4, 8, 6, 5, 3, 2, 8, 9, 2, 5"
  }
],
  outputs: [
  {
    "name": "count",
    "label": "Count (N)",
    "format": "number"
  },
  {
    "name": "sum",
    "label": "Sum (ΣX)",
    "format": "number"
  },
  {
    "name": "mean",
    "label": "Mean (Average)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "median",
    "label": "Median",
    "format": "number"
  },
  {
    "name": "range",
    "label": "Range (Max - Min)",
    "format": "number"
  }
],
  calculate: calculateStatisticsCalculator,
};

export default statistics_calculatorConfig;
