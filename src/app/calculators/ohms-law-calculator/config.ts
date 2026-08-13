import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateOhmsLawCalculator } from "./calculator";
import { ohms_law_calculatorFaqs } from "./faq";
import { OhmsLawCalculator } from "@/components/calculator/ohms-law/OhmsLawCalculator";
import { OhmsLawContent } from "@/components/calculator/ohms-law/OhmsLawContent";

export const ohms_law_calculatorConfig: CalculatorModuleDefinition = {
  id: "ohms-law-calculator",
  title: "Ohm's Law Calculator",
  slug: "ohms-law-calculator",
  category: "other",
  subcategory: "Electronics & Circuits",
  description: "Calculate Voltage V, Current I, Resistance R, and Electrical Power P. Solve any two parameters, check circuit consistency, and configure dividers.",
  iconName: "Zap",
  featured: true,
  keywords: [
    "ohms law",
    "voltage calculator",
    "current calculator",
    "resistance calculator",
    "power watts",
    "resistor safety",
    "voltage divider calculator",
    "current divider calculator",
    "led resistor calculator"
  ],
  priority: 1,
  relatedCalculators: ["voltage-drop-calculator", "resistor-calculator"],
  formulaDescription: "V = I × R | P = V × I",
  faqs: ohms_law_calculatorFaqs,
  ContentComponent: OhmsLawContent,
  CustomComponent: OhmsLawCalculator,
  inputs: [
    {
      name: "voltage",
      label: "Voltage V (Volts)",
      type: "number",
      defaultValue: 12,
      min: 0,
      max: 10000,
      step: 0.1
    },
    {
      name: "resistance",
      label: "Resistance R (Ohms)",
      type: "number",
      defaultValue: 4,
      min: 0.01,
      max: 10000,
      step: 0.1
    }
  ],
  outputs: [
    {
      name: "currentAmps",
      label: "Current I (Amps)",
      format: "number",
      highlight: true,
      unit: "A"
    },
    {
      name: "powerWatts",
      label: "Power P (Watts)",
      format: "number",
      unit: "W"
    }
  ],
  calculate: calculateOhmsLawCalculator,
};

export default ohms_law_calculatorConfig;
