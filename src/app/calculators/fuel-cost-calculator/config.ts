import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFuelCostCalculator } from "./calculator";
import { fuel_cost_calculatorFaqs } from "./faq";

export const fuel_cost_calculatorConfig: CalculatorModuleDefinition = {
  id: "fuel-cost-calculator",
  title: "Fuel Cost Calculator",
  slug: "fuel-cost-calculator",
  category: "other",
  subcategory: "Transportation",
  description: "Calculate total trip gas cost, gallons needed, and cost per mile for road trips.",
  iconName: "Fuel",
  featured: true,
  keywords: ["fuel cost","gas cost calculator","road trip cost","gasoline expense"],
  priority: 1,
  relatedCalculators: ["gas-mileage-calculator","mileage-calculator"],
  formulaDescription: "Trip Cost = (Distance / MPG) × Gas Price",
  faqs: fuel_cost_calculatorFaqs,
  inputs: [
  {
    "name": "distanceMiles",
    "label": "Trip Distance (miles)",
    "type": "number",
    "defaultValue": 300,
    "min": 1,
    "max": 10000,
    "step": 10
  },
  {
    "name": "mpg",
    "label": "Vehicle Fuel Economy (MPG)",
    "type": "number",
    "defaultValue": 28,
    "min": 5,
    "max": 100,
    "step": 1
  },
  {
    "name": "gasPrice",
    "label": "Gas Price per Gallon ($)",
    "type": "number",
    "defaultValue": 3.5,
    "min": 1,
    "max": 10,
    "step": 0.1
  }
],
  outputs: [
  {
    "name": "totalFuelCost",
    "label": "Total Trip Fuel Cost",
    "format": "currency",
    "highlight": true
  },
  {
    "name": "gallonsNeeded",
    "label": "Gallons Required",
    "format": "number",
    "unit": "gal"
  },
  {
    "name": "costPerMile",
    "label": "Cost Per Mile",
    "format": "currency"
  }
],
  calculate: calculateFuelCostCalculator,
};

export default fuel_cost_calculatorConfig;
