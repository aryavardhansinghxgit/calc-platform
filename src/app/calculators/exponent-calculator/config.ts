import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateExponentCalculator } from "./calculator";
import { exponent_calculatorFaqs } from "./faq";
import { ExponentCalculator } from "@/components/calculator/exponent/ExponentCalculator";
import { ExponentContent } from "@/components/calculator/exponent/ExponentContent";

export const exponent_calculatorConfig: CalculatorModuleDefinition = {
  id: "exponent-calculator",
  title: "Exponent Calculator",
  slug: "exponent-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Calculate powers, solve for bases or exponents, simplify fractional and negative exponents, apply exponent laws, and convert numbers to scientific, engineering and E notation with step-by-step solutions.",
  iconName: "Superscript",
  featured: true,
  keywords: [
    "exponent calculator",
    "power calculator",
    "exponent rules",
    "fractional exponent calculator",
    "radical solver",
    "scientific notation exponent",
    "solve for base",
    "solve for exponent"
  ],
  priority: 1,
  relatedCalculators: [
    "scientific-notation-calculator",
    "log-calculator",
    "root-calculator",
    "scientific-calculator"
  ],
  formulaDescription: "Evaluates y = b^n, solves for base b = ⁿ√y, or solves for exponent n = log_b(y) with step-by-step proofs.",
  faqs: exponent_calculatorFaqs,
  inputs: [
    {
      name: "base",
      label: "Base (b)",
      type: "number",
      defaultValue: 2,
      min: -100,
      max: 100,
      step: 1
    },
    {
      name: "exponent",
      label: "Exponent (n)",
      type: "number",
      defaultValue: 10,
      min: -50,
      max: 50,
      step: 1
    }
  ],
  outputs: [
    {
      name: "result",
      label: "Calculated Power (b^n)",
      format: "number",
      highlight: true
    },
    {
      name: "scientificNotation",
      label: "Scientific Notation",
      format: "text"
    }
  ],
  calculate: calculateExponentCalculator,
  CustomComponent: ExponentCalculator,
  ContentComponent: ExponentContent,
};

export default exponent_calculatorConfig;
