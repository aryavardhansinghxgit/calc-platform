import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGasMileageFromInputs } from "./calculator";
import { gas_mileage_calculatorFaqs } from "./faq";
import { GasMileageCalculator } from "@/components/calculator/gas-mileage/GasMileageCalculator";
import { GasMileageContent } from "@/components/calculator/gas-mileage/GasMileageContent";

export const gas_mileage_calculatorConfig: CalculatorModuleDefinition = {
  id: "gas-mileage-calculator",
  title: "Gas Mileage Calculator",
  slug: "gas-mileage-calculator",
  category: "other",
  subcategory: "Auto Calculators",
  description: "Free online Gas Mileage Calculator. Calculate US/UK MPG, L/100km, multi-tank rolling averages, annual fuel spending, carbon footprint & MPGe benchmarks.",
  iconName: "Gauge",
  featured: true,
  keywords: [
    "gas mileage calculator",
    "mpg calculator",
    "fuel economy calculator",
    "l/100km to mpg",
    "multi tank rolling average",
    "tank range planner",
    "mpge calculator"
  ],
  priority: 1,
  relatedCalculators: ["fuel-cost-calculator", "mileage-calculator"],
  formulaDescription: "MPG = Miles Driven / Gallons Consumed",
  faqs: gas_mileage_calculatorFaqs,
  CustomComponent: GasMileageCalculator,
  ContentComponent: GasMileageContent,
  inputs: [
    {
      name: "startOdometer",
      label: "Starting Odometer",
      type: "number",
      defaultValue: 12000,
      min: 0,
      max: 1000000,
      step: 10
    },
    {
      name: "endOdometer",
      label: "Ending Odometer",
      type: "number",
      defaultValue: 12360,
      min: 0,
      max: 1000000,
      step: 10
    },
    {
      name: "fuelAdded",
      label: "Fuel Volume Added",
      type: "number",
      defaultValue: 12,
      min: 0.1,
      max: 100,
      step: 0.1
    }
  ],
  outputs: [
    {
      name: "usMPG",
      label: "Fuel Economy (MPG)",
      format: "number",
      highlight: true
    }
  ],
  calculate: calculateGasMileageFromInputs,
} as any;

export default gas_mileage_calculatorConfig;
