import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateStatisticsCalculator } from "./calculator";
import { statistics_calculatorFaqs } from "./faq";
import { StatisticsCalculator } from "@/components/calculator/statistics/StatisticsCalculator";
import { StatisticsContent } from "@/components/calculator/statistics/StatisticsContent";

export const statistics_calculatorConfig: CalculatorModuleDefinition = {
  id: "statistics-calculator",
  title: "Statistics Calculator",
  slug: "statistics-calculator",
  category: "Math",
  subcategory: "Statistics",
  description:
    "Calculate descriptive statistics, grouped data, correlation, linear regression, hypothesis tests, confidence intervals and normal probabilities with step-by-step results.",
  iconName: "BarChart",
  featured: true,
  keywords: [
    "statistics calculator",
    "statistics calculator online",
    "descriptive statistics calculator",
    "mean median mode calculator",
    "standard deviation calculator",
    "sample standard deviation calculator",
    "population standard deviation calculator",
    "variance calculator",
    "IQR calculator",
    "quartile calculator",
    "outlier calculator",
    "grouped data calculator",
    "frequency table calculator",
    "Pearson correlation calculator",
    "regression calculator",
    "R-squared calculator",
    "covariance calculator",
    "hypothesis test calculator",
    "p-value calculator",
    "confidence interval calculator",
    "normal distribution calculator",
    "z-score calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "mean-median-mode-calculator",
    "standard-deviation-calculator",
    "sample-size-calculator",
    "probability-calculator",
    "z-score-calculator",
    "percent-error-calculator",
    "scientific-calculator",
  ],
  formulaDescription:
    "Summary Descriptive Statistics & Statistical Inference Engine",
  faqs: statistics_calculatorFaqs,
  CustomComponent: StatisticsCalculator,
  ContentComponent: StatisticsContent,
  inputs: [
    {
      name: "dataSeries",
      label: "Dataset (comma-separated)",
      type: "text",
      defaultValue: "4, 8, 6, 5, 3, 2, 8, 9, 2, 5",
    },
  ],
  outputs: [
    {
      name: "count",
      label: "Count (N)",
      format: "number",
    },
    {
      name: "sum",
      label: "Sum (ΣX)",
      format: "number",
    },
    {
      name: "mean",
      label: "Mean (Average)",
      format: "number",
      highlight: true,
    },
    {
      name: "median",
      label: "Median",
      format: "number",
    },
    {
      name: "range",
      label: "Range (Max - Min)",
      format: "number",
    },
  ],
  calculate: calculateStatisticsCalculator,
};

export default statistics_calculatorConfig;
