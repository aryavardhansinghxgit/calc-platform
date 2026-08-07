import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateResistorCalculator } from "./calculator";
import { resistor_calculatorFaqs } from "./faq";

export const resistor_calculatorConfig: CalculatorModuleDefinition = {
  id: "resistor-calculator",
  title: "Resistor Calculator",
  slug: "resistor-calculator",
  category: "other",
  subcategory: "Electronics & Circuits",
  description: "Decode 4-band resistor color codes to calculate resistance value and tolerance.",
  iconName: "Cpu",
  featured: true,
  keywords: ["resistor color code","resistor calculator","resistance ohms","resistor bands"],
  priority: 1,
  relatedCalculators: ["ohms-law-calculator","voltage-drop-calculator"],
  formulaDescription: "Resistance = (Band1 × 10 + Band2) × Multiplier",
  faqs: resistor_calculatorFaqs,
  inputs: [
  {
    "name": "band1",
    "label": "1st Band (Digit 1)",
    "type": "select",
    "defaultValue": "1",
    "options": [
      {
        "label": "Brown (1)",
        "value": "1"
      },
      {
        "label": "Red (2)",
        "value": "2"
      },
      {
        "label": "Orange (3)",
        "value": "3"
      },
      {
        "label": "Yellow (4)",
        "value": "4"
      }
    ]
  },
  {
    "name": "band2",
    "label": "2nd Band (Digit 2)",
    "type": "select",
    "defaultValue": "0",
    "options": [
      {
        "label": "Black (0)",
        "value": "0"
      },
      {
        "label": "Brown (1)",
        "value": "1"
      },
      {
        "label": "Red (2)",
        "value": "2"
      },
      {
        "label": "Orange (3)",
        "value": "3"
      }
    ]
  },
  {
    "name": "multiplier",
    "label": "3rd Band (Multiplier)",
    "type": "select",
    "defaultValue": "100",
    "options": [
      {
        "label": "Black (×1)",
        "value": "1"
      },
      {
        "label": "Brown (×10)",
        "value": "10"
      },
      {
        "label": "Red (×100)",
        "value": "100"
      },
      {
        "label": "Orange (×1k)",
        "value": "1000"
      }
    ]
  }
],
  outputs: [
  {
    "name": "resistanceOhms",
    "label": "Resistance Value",
    "format": "number",
    "highlight": true,
    "unit": "Ω"
  },
  {
    "name": "formattedValue",
    "label": "Formatted Resistance",
    "format": "text"
  }
],
  calculate: calculateResistorCalculator,
};

export default resistor_calculatorConfig;
