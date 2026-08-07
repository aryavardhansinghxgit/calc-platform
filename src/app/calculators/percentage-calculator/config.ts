import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePercentageCalculator } from "./calculator";
import { percentage_calculatorFaqs } from "./faq";

export const percentage_calculatorConfig: CalculatorModuleDefinition = {
  id: "percentage-calculator",
  title: "Percentage Calculator",
  slug: "percentage-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate percentage values, percentage changes, increases, decreases, and proportions.",
  iconName: "Percent",
  featured: true,
  keywords: ["percentage","percent change","percent increase","discount","proportion"],
  priority: 1,
  relatedCalculators: ["percent-error-calculator","fraction-calculator","ratio-calculator"],
  formulaDescription: "Percentage = (Part / Whole) × 100",
  faqs: percentage_calculatorFaqs,
  inputs: [
  {
    "name": "calcType",
    "label": "Calculation Type",
    "type": "select",
    "defaultValue": "what_is_x_pct_of_y",
    "options": [
      {
        "label": "What is X% of Y?",
        "value": "what_is_x_pct_of_y"
      },
      {
        "label": "X is what % of Y?",
        "value": "x_is_what_pct_of_y"
      },
      {
        "label": "% Increase/Decrease from X to Y",
        "value": "pct_change"
      }
    ]
  },
  {
    "name": "valueX",
    "label": "Value X",
    "type": "number",
    "defaultValue": 20,
    "min": -1000000000,
    "max": 1000000000,
    "step": 1
  },
  {
    "name": "valueY",
    "label": "Value Y",
    "type": "number",
    "defaultValue": 150,
    "min": -1000000000,
    "max": 1000000000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "result",
    "label": "Calculated Result",
    "format": "number",
    "highlight": true
  },
  {
    "name": "summary",
    "label": "Explanation",
    "format": "text"
  }
],
  calculate: calculatePercentageCalculator,
};

export default percentage_calculatorConfig;
