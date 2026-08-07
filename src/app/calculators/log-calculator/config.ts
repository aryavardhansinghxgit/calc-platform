import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateLogCalculator } from "./calculator";
import { log_calculatorFaqs } from "./faq";

export const log_calculatorConfig: CalculatorModuleDefinition = {
  id: "log-calculator",
  title: "Log Calculator",
  slug: "log-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate logarithms for any custom base, natural log (ln), and common log (log₁₀).",
  iconName: "FunctionSquare",
  featured: true,
  keywords: ["log calculator","logarithm","natural log","ln","log base 10"],
  priority: 1,
  relatedCalculators: ["exponent-calculator","scientific-calculator"],
  formulaDescription: "log_b(X) = ln(X) / ln(b)",
  faqs: log_calculatorFaqs,
  inputs: [
  {
    "name": "value",
    "label": "Value (X)",
    "type": "number",
    "defaultValue": 100,
    "min": 0.0001,
    "max": 1000000000,
    "step": 1
  },
  {
    "name": "base",
    "label": "Base (b)",
    "type": "number",
    "defaultValue": 10,
    "min": 0.0001,
    "max": 1000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "logResult",
    "label": "Log_b (X)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "lnResult",
    "label": "Natural Log ln(X)",
    "format": "number"
  },
  {
    "name": "log10Result",
    "label": "Common Log log10(X)",
    "format": "number"
  }
],
  calculate: calculateLogCalculator,
};

export default log_calculatorConfig;
