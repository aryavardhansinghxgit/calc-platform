import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateConfidenceIntervalCalculator } from "./calculator";
import { ConfidenceIntervalCalculator } from "@/components/calculator/confidence-interval/ConfidenceIntervalCalculator";
import { ConfidenceIntervalContent } from "@/components/calculator/confidence-interval/ConfidenceIntervalContent";

export const confidence_interval_calculatorConfig: CalculatorModuleDefinition = {
  id: "confidence-interval-calculator",
  title: "Confidence Interval Calculator & Estimation Suite",
  slug: "confidence-interval-calculator",
  category: "Math",
  subcategory: "Statistics",
  description: "Calculate confidence intervals for population means (Normal Z & Student's t), proportions (Wilson Score & Wald), two-sample differences, and population variance with APA citations.",
  iconName: "Sliders",
  featured: true,
  keywords: ["confidence interval", "margin of error", "confidence level", "sample mean", "wilson score", "welch t interval", "apa citation"],
  priority: 1,
  relatedCalculators: ["sample-size-calculator", "z-score-calculator", "statistics-calculator"],
  formulaDescription: "CI = x̄ ± Z × (s / √n)",
  faqs: [],
  CustomComponent: ConfidenceIntervalCalculator,
  ContentComponent: ConfidenceIntervalContent,
  inputs: [
    {
      "name": "mean",
      "label": "Sample Mean (x̄)",
      "type": "number",
      "defaultValue": 50,
      "min": -1000000,
      "max": 1000000,
      "step": 1
    },
    {
      "name": "sd",
      "label": "Sample SD (s)",
      "type": "number",
      "defaultValue": 8,
      "min": 0.1,
      "max": 1000000,
      "step": 0.1
    },
    {
      "name": "sampleSize",
      "label": "Sample Size (n)",
      "type": "number",
      "defaultValue": 100,
      "min": 2,
      "max": 1000000,
      "step": 1
    },
    {
      "name": "confidenceLevel",
      "label": "Confidence Level",
      "type": "select",
      "defaultValue": "95",
      "options": [
        {
          "label": "90%",
          "value": "90"
        },
        {
          "label": "95%",
          "value": "95"
        },
        {
          "label": "99%",
          "value": "99"
        }
      ]
    }
  ],
  outputs: [
    {
      "name": "marginError",
      "label": "Margin of Error (±)",
      "format": "number",
      "highlight": true
    },
    {
      "name": "intervalRange",
      "label": "Confidence Interval Range",
      "format": "text"
    }
  ],
  calculate: calculateConfidenceIntervalCalculator
};

export default confidence_interval_calculatorConfig;
