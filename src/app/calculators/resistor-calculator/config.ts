import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateResistorCalculator } from "./calculator";
import { resistor_calculatorFaqs } from "./faq";
import { ResistorCalculator } from "@/components/calculator/resistor/ResistorCalculator";
import { ResistorContent } from "@/components/calculator/resistor/ResistorContent";

export const resistor_calculatorConfig: CalculatorModuleDefinition = {
  id: "resistor-calculator",
  title: "Resistor Calculator",
  slug: "resistor-calculator",
  category: "other",
  subcategory: "Tech & Electrical",
  description: "Decode resistor color codes (4, 5, or 6 bands), calculate series and parallel resistor combinations, decode SMD codes, and determine wire conductor resistance.",
  iconName: "Cpu",
  featured: true,
  keywords: [
    "resistor calculator",
    "resistor color code calculator",
    "series resistor calculator",
    "parallel resistor calculator",
    "SMD resistor code decoder",
    "conductor resistance calculator",
    "resistor color bands",
    "resistor calculator suite"
  ],
  priority: 1,
  relatedCalculators: ["ohms-law-calculator", "voltage-drop-calculator"],
  formulaDescription: "4-Band: (Band1×10 + Band2) × Multiplier | 5-Band: (Band1×100 + Band2×10 + Band3) × Multiplier",
  faqs: resistor_calculatorFaqs,
  ContentComponent: ResistorContent,
  CustomComponent: ResistorCalculator,
  inputs: [
    {
      name: "bandCount",
      label: "Band Count",
      type: "select",
      defaultValue: "4",
      options: [
        { label: "4 Bands", value: "4" },
        { label: "5 Bands", value: "5" },
        { label: "6 Bands", value: "6" }
      ]
    },
    {
      name: "band1",
      label: "1st Band",
      type: "select",
      defaultValue: "brown",
      options: [
        { label: "Brown (1)", value: "brown" },
        { label: "Red (2)", value: "red" },
        { label: "Orange (3)", value: "orange" },
        { label: "Yellow (4)", value: "yellow" }
      ]
    },
    {
      name: "band2",
      label: "2nd Band",
      type: "select",
      defaultValue: "black",
      options: [
        { label: "Black (0)", value: "black" },
        { label: "Brown (1)", value: "brown" },
        { label: "Red (2)", value: "red" }
      ]
    },
    {
      name: "multiplier",
      label: "Multiplier",
      type: "select",
      defaultValue: "red",
      options: [
        { label: "Black (x1)", value: "black" },
        { label: "Brown (x10)", value: "brown" },
        { label: "Red (x100)", value: "red" },
        { label: "Orange (x1k)", value: "orange" }
      ]
    }
  ],
  outputs: [
    {
      name: "resistanceOhms",
      label: "Resistance Value",
      format: "number",
      highlight: true,
      unit: "Ω"
    },
    {
      name: "formattedValue",
      label: "Resistance Formatted",
      format: "text"
    }
  ],
  calculate: calculateResistorCalculator,
};

export default resistor_calculatorConfig;
