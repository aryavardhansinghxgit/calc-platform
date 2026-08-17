import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateElectricityCalculator } from "./calculator";
import { electricity_calculatorFaqs } from "./faq";

export const electricity_calculatorConfig: CalculatorModuleDefinition = {
  id: "electricity-calculator",
  title: "Electricity Calculator",
  slug: "electricity-calculator",
  category: "other",
  subcategory: "Everyday Utility",
  description: "Calculate electric appliance energy consumption (kWh) and monthly power bill cost.",
  iconName: "Zap",
  featured: true,
  keywords: ["electricity cost","kwh calculator","power consumption","electric bill"],
  priority: 1,
  relatedCalculators: ["ohms-law-calculator","voltage-drop-calculator"],
  formulaDescription: "Monthly kWh = (Watts × Hours/Day × 30 Days) / 1000",
  faqs: electricity_calculatorFaqs,
  inputs: [
  {
    "name": "wattage",
    "label": "Appliance Power (Watts)",
    "type": "number",
    "defaultValue": 1500,
    "min": 1,
    "max": 50000,
    "step": 50
  },
  {
    "name": "hoursPerDay",
    "label": "Usage Hours per Day",
    "type": "number",
    "defaultValue": 4,
    "min": 0.1,
    "max": 24,
    "step": 0.5
  },
  {
    "name": "costPerKwh",
    "label": "Electricity Rate ($/kWh)",
    "type": "number",
    "defaultValue": 0.15,
    "min": 0.01,
    "max": 2,
    "step": 0.01
  }
],
  outputs: [
  {
    "name": "monthlyCost",
    "label": "Estimated Monthly Cost",
    "format": "currency",
    "highlight": true
  },
  {
    "name": "monthlyKwh",
    "label": "Monthly kWh Consumption",
    "format": "number",
    "unit": "kWh"
  },
  {
    "name": "annualCost",
    "label": "Annual Cost",
    "format": "currency"
  }
],
  calculate: calculateElectricityCalculator,
};

export default electricity_calculatorConfig;
