import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHorsepowerCalculator } from "./calculator";
import { horsepower_calculatorFaqs } from "./faq";

export const horsepower_calculatorConfig: CalculatorModuleDefinition = {
  id: "horsepower-calculator",
  title: "Horsepower Calculator",
  slug: "horsepower-calculator",
  category: "other",
  subcategory: "Transportation",
  description: "Calculate engine horsepower (HP = Torque × RPM / 5252) and kilowatt equivalent.",
  iconName: "Zap",
  featured: true,
  keywords: ["horsepower calculator","hp calculator","engine torque","rpm to hp"],
  priority: 1,
  relatedCalculators: ["engine-horsepower-calculator","tire-size-calculator"],
  formulaDescription: "HP = (Torque lb-ft × RPM) / 5252",
  faqs: horsepower_calculatorFaqs,
  inputs: [
  {
    "name": "torqueLbFt",
    "label": "Torque (lb-ft)",
    "type": "number",
    "defaultValue": 300,
    "min": 1,
    "max": 2000,
    "step": 10
  },
  {
    "name": "rpm",
    "label": "Engine Speed (RPM)",
    "type": "number",
    "defaultValue": 5252,
    "min": 500,
    "max": 15000,
    "step": 250
  }
],
  outputs: [
  {
    "name": "horsepower",
    "label": "Engine Horsepower (HP)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "kilowatts",
    "label": "Power in Kilowatts (kW)",
    "format": "number"
  }
],
  calculate: calculateHorsepowerCalculator,
};

export default horsepower_calculatorConfig;
