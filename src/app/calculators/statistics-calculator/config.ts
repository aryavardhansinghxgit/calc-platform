import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStatisticsCalculator } from "./calculator";
import { StatisticsCalculator } from "@/components/calculator/statistics/StatisticsCalculator";
import { StatisticsContent } from "@/components/calculator/statistics/StatisticsContent";

export const statistics_calculatorConfig: CalculatorModuleDefinition = {
  id: "statistics-calculator",
  title: "Statistics Calculator — Descriptive Statistics, Regression & Hypothesis Testing",
  slug: "statistics-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate complete descriptive statistics summary, frequency tables, bivariate linear regression, hypothesis testing, confidence intervals, and probability distributions.",
  iconName: "BarChart",
  featured: true,
  keywords: ["statistics calculator","descriptive statistics","mean median mode","summary stats","linear regression calculator","hypothesis testing calculator"],
  priority: 1,
  relatedCalculators: ["standard-deviation-calculator","mean-median-mode-calculator"],
  formulaDescription: "Summary Descriptive Statistics & Statistical Inference Engine",
  faqs: [],
  CustomComponent: StatisticsCalculator,
  ContentComponent: StatisticsContent,
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
