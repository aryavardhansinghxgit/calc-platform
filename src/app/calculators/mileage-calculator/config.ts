import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMileageFromInputs } from "./calculator";
import { mileage_calculatorFaqs } from "./faq";

export const mileage_calculatorConfig: CalculatorModuleDefinition = {
  id: "mileage-calculator",
  title: "Mileage Calculator",
  slug: "mileage-calculator",
  category: "other",
  subcategory: "Automotive & Fuel",
  description: "Calculate gas mileage, MPG, L/100km, km/L, trip fuel cost, IRS mileage reimbursement, multi-fill-up averages, EV MPGe and driving efficiency.",
  iconName: "Navigation",
  featured: true,
  keywords: [
    "mileage calculator",
    "gas mileage calculator",
    "irs mileage rate",
    "business mileage reimbursement",
    "l 100km to mpg converter",
    "multi leg fuel logger",
    "ev mpge calculator"
  ],
  priority: 1,
  relatedCalculators: ["gas-mileage-calculator", "fuel-cost-calculator", "horsepower-calculator"],
  formulaDescription: "MPG = Miles / Gallons | L/100km = (Liters × 100) / km | Claim = Miles × Rate",
  faqs: mileage_calculatorFaqs,
  inputs: [
    {
      name: "distanceInput",
      label: "Trip Distance Driven (miles)",
      type: "number",
      defaultValue: 350,
      min: 1,
      max: 10000,
      step: 10
    },
    {
      name: "fuelInput",
      label: "Fuel Consumed (gallons)",
      type: "number",
      defaultValue: 11.5,
      min: 0.1,
      max: 500,
      step: 0.5
    }
  ],
  outputs: [
    {
      name: "usMpg",
      label: "Calculated Fuel Economy (US MPG)",
      format: "number",
      highlight: true,
      unit: "MPG"
    }
  ],
  calculate: calculateMileageFromInputs,
} as any;

export default mileage_calculatorConfig;
