import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateLogCalculator } from "./calculator";
import { log_calculatorFaqs } from "./faq";
import { LogCalculator } from "@/components/calculator/log/LogCalculator";
import { LogContent } from "@/components/calculator/log/LogContent";

export const log_calculatorConfig: CalculatorModuleDefinition = {
  id: "log-calculator",
  title: "Log Calculator — Logarithm & Antilog Solver with Steps",
  slug: "log-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Free online Log Calculator & Antilog Suite. Solve log_b(x), natural logs ln(x), common logs log10(x), binary logs log2(x), change of base, and interactive curves.",
  iconName: "Binary",
  featured: true,
  keywords: [
    "log calculator",
    "logarithm calculator",
    "natural log calculator",
    "log base 10 calculator",
    "log base 2 calculator",
    "antilog calculator",
    "change of base calculator"
  ],
  priority: 1,
  relatedCalculators: ["exponent-calculator", "scientific-calculator", "root-calculator"],
  formulaDescription: "Solves log_b(x) = y, antilog b^y = x, and 3-variable logarithmic equations with change-of-base proofs.",
  faqs: log_calculatorFaqs,
  inputs: [
    {
      name: "base",
      label: "Log Base (b)",
      type: "text",
      defaultValue: "10"
    },
    {
      name: "number",
      label: "Argument (x)",
      type: "text",
      defaultValue: "100"
    }
  ],
  outputs: [
    {
      name: "result",
      label: "Logarithm Value (y)",
      format: "number",
      highlight: true
    },
    {
      name: "naturalLog",
      label: "Natural Log ln(x)",
      format: "number"
    }
  ],
  calculate: calculateLogCalculator,
  CustomComponent: LogCalculator,
  ContentComponent: LogContent,
};

export default log_calculatorConfig;
