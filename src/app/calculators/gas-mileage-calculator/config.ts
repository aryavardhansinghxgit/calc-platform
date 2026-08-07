import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGasMileageCalculator } from "./calculator";
import { gas_mileage_calculatorFaqs } from "./faq";

export const gas_mileage_calculatorConfig: CalculatorModuleDefinition = {
  id: "gas-mileage-calculator",
  title: "Gas Mileage Calculator",
  slug: "gas-mileage-calculator",
  category: "other",
  subcategory: "Transportation",
  description: "Calculate vehicle fuel efficiency in MPG, L/100km, and km/L from odometer fill-ups.",
  iconName: "Gauge",
  featured: true,
  keywords: ["gas mileage","mpg calculator","fuel economy","l/100km"],
  priority: 1,
  relatedCalculators: ["fuel-cost-calculator","mileage-calculator"],
  formulaDescription: "MPG = (End Odometer - Start Odometer) / Gallons Filled",
  faqs: gas_mileage_calculatorFaqs,
  inputs: [
  {
    "name": "startOdometer",
    "label": "Starting Odometer",
    "type": "number",
    "defaultValue": 45000,
    "min": 0,
    "max": 1000000,
    "step": 10
  },
  {
    "name": "endOdometer",
    "label": "Ending Odometer",
    "type": "number",
    "defaultValue": 45350,
    "min": 0,
    "max": 1000000,
    "step": 10
  },
  {
    "name": "gallonsFilled",
    "label": "Gallons Filled",
    "type": "number",
    "defaultValue": 12.5,
    "min": 0.1,
    "max": 100,
    "step": 0.1
  }
],
  outputs: [
  {
    "name": "mpg",
    "label": "Fuel Economy (MPG)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "l100km",
    "label": "Metric (L/100km)",
    "format": "number"
  }
],
  calculate: calculateGasMileageCalculator,
};

export default gas_mileage_calculatorConfig;
