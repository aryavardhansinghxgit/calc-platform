import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateConfidenceIntervalCalculator } from "./calculator";
import { ConfidenceIntervalCalculator } from "@/components/calculator/confidence-interval/ConfidenceIntervalCalculator";
import { ConfidenceIntervalContent } from "@/components/calculator/confidence-interval/ConfidenceIntervalContent";
import { confidence_interval_calculatorFaqs } from "./faq";

export const confidence_interval_calculatorConfig: CalculatorModuleDefinition = {
  id: "confidence-interval-calculator",
  title: "Confidence Interval Calculator",
  slug: "confidence-interval-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate confidence intervals for means, proportions, two-group differences, variance and standard deviation. Compare t, Z, Wilson, Wald and Agresti-Coull intervals.",
  iconName: "Sliders",
  featured: true,
  keywords: [
    "confidence interval calculator",
    "confidence interval",
    "confidence interval calculator mean",
    "95 confidence interval calculator",
    "confidence interval for mean",
    "confidence interval for proportion",
    "confidence interval formula",
    "t confidence interval calculator",
    "Z confidence interval calculator",
    "Wilson confidence interval calculator",
    "Agresti Coull confidence interval",
    "Wald confidence interval",
    "confidence interval for two means",
    "Welch confidence interval",
    "confidence interval for two proportions",
    "variance confidence interval",
    "standard deviation confidence interval",
    "margin of error",
    "confidence level"
  ],
  priority: 1,
  relatedCalculators: ["sample-size-calculator", "z-score-calculator", "statistics-calculator"],
  formulaDescription: "CI = x̄ ± (Critical Value × Standard Error)",
  faqs: confidence_interval_calculatorFaqs,
  CustomComponent: ConfidenceIntervalCalculator,
  ContentComponent: ConfidenceIntervalContent,
  inputs: [
    {
      name: "mean",
      label: "Sample Mean (x̄)",
      type: "number",
      defaultValue: 24.5,
      min: -1000000,
      max: 1000000,
      step: 0.1
    },
    {
      name: "sd",
      label: "Sample SD (s)",
      type: "number",
      defaultValue: 4.0,
      min: 0.0001,
      max: 1000000,
      step: 0.1
    },
    {
      name: "sampleSize",
      label: "Sample Size (n)",
      type: "number",
      defaultValue: 16,
      min: 2,
      max: 1000000,
      step: 1
    },
    {
      name: "confidenceLevel",
      label: "Confidence Level (%)",
      type: "number",
      defaultValue: 95,
      min: 1,
      max: 99.99,
      step: 0.1
    }
  ],
  outputs: [
    {
      name: "marginError",
      label: "Margin of Error (±)",
      format: "number",
      highlight: true
    },
    {
      name: "intervalRange",
      label: "Confidence Interval Range",
      format: "text"
    }
  ],
  calculate: calculateConfidenceIntervalCalculator
};

export default confidence_interval_calculatorConfig;
