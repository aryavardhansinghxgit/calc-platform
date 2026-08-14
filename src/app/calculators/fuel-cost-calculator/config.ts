import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFuelCostFromInputs } from "./calculator";
import { fuel_cost_calculatorFaqs } from "./faq";

export const fuel_cost_calculatorConfig: CalculatorModuleDefinition = {
  id: "fuel-cost-calculator",
  title: "Fuel Cost Calculator",
  slug: "fuel-cost-calculator",
  category: "other",
  subcategory: "Transportation Calculators",
  description: "Free online Fuel Cost Calculator. Calculate road trip gas cost, commute monthly budget, EV vs gas savings, passenger split, and carbon footprint.",
  iconName: "Fuel",
  featured: true,
  keywords: [
    "fuel cost calculator",
    "road trip gas calculator",
    "trip fuel cost",
    "mpg cost per mile",
    "carpool cost splitter",
    "ev vs gas cost calculator",
    "commute fuel budget"
  ],
  priority: 1,
  relatedCalculators: ["gas-mileage-calculator", "mileage-calculator"],
  formulaDescription: "Total Fuel Cost = (Distance / MPG) × Fuel Price + Tolls",
  faqs: fuel_cost_calculatorFaqs,
  inputs: [
    {
      name: "distance",
      label: "Trip Distance (miles)",
      type: "number",
      defaultValue: 300,
      min: 1,
      max: 10000,
      step: 10
    },
    {
      name: "efficiency",
      label: "Vehicle Efficiency (MPG)",
      type: "number",
      defaultValue: 25,
      min: 5,
      max: 100,
      step: 1
    },
    {
      name: "fuelPrice",
      label: "Fuel Price per Gallon ($)",
      type: "number",
      defaultValue: 3.5,
      min: 0.5,
      max: 20,
      step: 0.05
    }
  ],
  outputs: [
    {
      name: "totalCost",
      label: "Total Trip Expense",
      format: "currency",
      highlight: true
    }
  ],
  calculate: calculateFuelCostFromInputs,
} as any;

export default fuel_cost_calculatorConfig;
