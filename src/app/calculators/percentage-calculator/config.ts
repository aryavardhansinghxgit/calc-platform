import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePercentageCalculator } from "./calculator";
import { PercentageCalculator } from "@/components/calculator/percentage/PercentageCalculator";
import { PercentageContent } from "@/components/calculator/percentage/PercentageContent";
import { percentage_calculatorFaqs } from "./faq";

export const percentage_calculatorConfig: CalculatorModuleDefinition = {
  id: "percentage-calculator",
  title: "Percentage Calculator",
  slug: "percentage-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate percentage values, 3-way solvers, percentage changes, percentage differences, discounts, and proportions.",
  iconName: "Percent",
  featured: true,
  keywords: [
    "percentage calculator",
    "percent change",
    "percent increase",
    "percent decrease",
    "percentage difference",
    "3-way percentage",
    "calculate percentage",
    "proportion calculator"
  ],
  priority: 1,
  relatedCalculators: [
    "percent-error-calculator",
    "fraction-calculator",
    "ratio-calculator",
    "scientific-calculator",
    "statistics-calculator",
    "grade-calculator",
    "rounding-calculator"
  ],
  formulaDescription: "Percentage = (Part / Whole) × 100",
  faqs: percentage_calculatorFaqs,
  ContentComponent: PercentageContent,
  CustomComponent: PercentageCalculator,
  inputs: [
    {
      name: "calcType",
      label: "Calculation Type",
      type: "select",
      defaultValue: "what_is_x_pct_of_y",
      options: [
        {
          label: "What is X% of Y?",
          value: "what_is_x_pct_of_y"
        },
        {
          label: "X is what % of Y?",
          value: "x_is_what_pct_of_y"
        },
        {
          label: "X is Y% of what?",
          value: "x_is_y_pct_of_what"
        },
        {
          label: "Percentage Difference between X and Y",
          value: "pct_difference"
        },
        {
          label: "X increased by Y%",
          value: "pct_increase"
        },
        {
          label: "X decreased by Y%",
          value: "pct_decrease"
        },
        {
          label: "% Increase/Decrease from X to Y",
          value: "pct_change"
        }
      ]
    },
    {
      name: "valueX",
      label: "Value X",
      type: "number",
      defaultValue: 4,
      min: -1000000000,
      max: 1000000000,
      step: 1
    },
    {
      name: "valueY",
      label: "Value Y",
      type: "number",
      defaultValue: 6,
      min: -1000000000,
      max: 1000000000,
      step: 1
    }
  ],
  outputs: [
    {
      name: "result",
      label: "Calculated Result",
      format: "number",
      highlight: true
    },
    {
      name: "summary",
      label: "Explanation",
      format: "text"
    }
  ],
  calculate: calculatePercentageCalculator,
};

export default percentage_calculatorConfig;
