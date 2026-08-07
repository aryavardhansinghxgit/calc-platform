import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateVoltageDropCalculator } from "./calculator";
import { voltage_drop_calculatorFaqs } from "./faq";

export const voltage_drop_calculatorConfig: CalculatorModuleDefinition = {
  id: "voltage-drop-calculator",
  title: "Voltage Drop Calculator",
  slug: "voltage-drop-calculator",
  category: "other",
  subcategory: "Electronics & Circuits",
  description: "Calculate electrical wire voltage drop percentage based on wire gauge, current, and distance.",
  iconName: "Zap",
  featured: true,
  keywords: ["voltage drop","wire gauge","electrical voltage drop","awg"],
  priority: 1,
  relatedCalculators: ["ohms-law-calculator","electricity-calculator"],
  formulaDescription: "Vdrop = (2 × L × I × R) / 1000",
  faqs: voltage_drop_calculatorFaqs,
  inputs: [
  {
    "name": "voltage",
    "label": "Supply Voltage (V)",
    "type": "number",
    "defaultValue": 120,
    "min": 12,
    "max": 600,
    "step": 12
  },
  {
    "name": "currentAmps",
    "label": "Current (Amps)",
    "type": "number",
    "defaultValue": 15,
    "min": 0.1,
    "max": 200,
    "step": 1
  },
  {
    "name": "distanceFt",
    "label": "One-Way Distance (ft)",
    "type": "number",
    "defaultValue": 100,
    "min": 1,
    "max": 5000,
    "step": 10
  },
  {
    "name": "wireGauge",
    "label": "Wire Gauge (AWG)",
    "type": "select",
    "defaultValue": "12",
    "options": [
      {
        "label": "14 AWG (15A max)",
        "value": "14"
      },
      {
        "label": "12 AWG (20A max)",
        "value": "12"
      },
      {
        "label": "10 AWG (30A max)",
        "value": "10"
      },
      {
        "label": "8 AWG (40A max)",
        "value": "8"
      }
    ]
  }
],
  outputs: [
  {
    "name": "voltageDrop",
    "label": "Voltage Drop (V)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "voltageDropPct",
    "label": "Voltage Drop (%)",
    "format": "percentage"
  },
  {
    "name": "endVoltage",
    "label": "Voltage at End of Line",
    "format": "number",
    "unit": "V"
  }
],
  calculate: calculateVoltageDropCalculator,
};

export default voltage_drop_calculatorConfig;
