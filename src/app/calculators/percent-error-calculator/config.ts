import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePercentErrorCalculator } from "./calculator";
import { percent_error_calculatorFaqs } from "./faq";

export const percent_error_calculatorConfig: CalculatorModuleDefinition = {
  id: "percent-error-calculator",
  title: "Percent Error Calculator",
  slug: "percent-error-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate percent error between experimental results and accepted theoretical values.",
  iconName: "AlertCircle",
  featured: true,
  keywords: ["percent error","error percentage","experimental error","accuracy"],
  priority: 1,
  relatedCalculators: ["percentage-calculator","rounding-calculator"],
  formulaDescription: "Percent Error = |Experimental - Theoretical| / |Theoretical| × 100%",
  faqs: percent_error_calculatorFaqs,
  inputs: [
  {
    "name": "expVal",
    "label": "Experimental / Measured Value",
    "type": "number",
    "defaultValue": 9.5,
    "min": -1000000,
    "max": 1000000,
    "step": 0.1
  },
  {
    "name": "theoVal",
    "label": "Theoretical / Accepted Value",
    "type": "number",
    "defaultValue": 9.8,
    "min": -1000000,
    "max": 1000000,
    "step": 0.1
  }
],
  outputs: [
  {
    "name": "percentError",
    "label": "Percent Error (%)",
    "format": "percentage",
    "highlight": true
  },
  {
    "name": "absoluteError",
    "label": "Absolute Error",
    "format": "number"
  }
],
  calculate: calculatePercentErrorCalculator,
};

export default percent_error_calculatorConfig;
