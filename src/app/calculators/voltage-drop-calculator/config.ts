import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateVoltageDropCalculator } from "./calculator";
import { voltage_drop_calculatorFaqs } from "./faq";
import { VoltageDropCalculator } from "@/components/calculator/voltage-drop/VoltageDropCalculator";
import { VoltageDropContent } from "@/components/calculator/voltage-drop/VoltageDropContent";

export const voltage_drop_calculatorConfig: CalculatorModuleDefinition = {
  id: "voltage-drop-calculator",
  title: "Voltage Drop Calculator",
  slug: "voltage-drop-calculator",
  category: "other",
  subcategory: "Electronics & Circuits",
  description: "Calculate electrical wire voltage drop percentage based on wire gauge, current, distance, phase, power factor, and conduit type.",
  iconName: "Zap",
  featured: true,
  keywords: [
    "voltage drop calculator",
    "voltage drop calculator AC",
    "voltage drop calculator DC",
    "voltage drop formula",
    "wire voltage drop calculator",
    "electrical voltage drop",
    "three phase voltage drop",
    "single phase voltage drop"
  ],
  priority: 1,
  relatedCalculators: ["ohms-law-calculator", "electricity-calculator"],
  formulaDescription: "AC 1Ø: Vdrop = (2 × L × I × Z_eff) / 1000 | AC 3Ø: Vdrop = (√3 × L × I × Z_eff) / 1000",
  faqs: voltage_drop_calculatorFaqs,
  ContentComponent: VoltageDropContent,
  CustomComponent: VoltageDropCalculator,
  inputs: [
    {
      name: "voltage",
      label: "Supply Voltage (V)",
      type: "number",
      defaultValue: 120,
      min: 12,
      max: 600,
      step: 12
    },
    {
      name: "currentAmps",
      label: "Current (Amps)",
      type: "number",
      defaultValue: 15,
      min: 0.1,
      max: 200,
      step: 1
    },
    {
      name: "distance",
      label: "One-Way Distance",
      type: "number",
      defaultValue: 100,
      min: 1,
      max: 5000,
      step: 10
    },
    {
      name: "wireSize",
      label: "Wire Gauge (AWG)",
      type: "select",
      defaultValue: "12",
      options: [
        { label: "14 AWG", value: "14" },
        { label: "12 AWG", value: "12" },
        { label: "10 AWG", value: "10" },
        { label: "8 AWG", value: "8" }
      ]
    }
  ],
  outputs: [
    {
      name: "voltageDrop",
      label: "Voltage Drop (V)",
      format: "number",
      highlight: true
    },
    {
      name: "voltageDropPct",
      label: "Voltage Drop (%)",
      format: "percentage"
    },
    {
      name: "endVoltage",
      label: "Voltage at End of Line",
      format: "number",
      unit: "V"
    }
  ],
  calculate: calculateVoltageDropCalculator,
};

export default voltage_drop_calculatorConfig;
