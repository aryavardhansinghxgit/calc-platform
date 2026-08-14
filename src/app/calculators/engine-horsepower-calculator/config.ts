import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateEngineHorsepowerFromInputs } from "./calculator";
import { engine_horsepower_calculatorFaqs } from "./faq";

export const engine_horsepower_calculatorConfig: CalculatorModuleDefinition = {
  id: "engine-horsepower-calculator",
  title: "Engine Horsepower Calculator",
  slug: "engine-horsepower-calculator",
  category: "other",
  subcategory: "Performance & Engine Calculators",
  description: "Free Engine Horsepower Calculator. Compute Crank BHP & Wheel WHP from 1/4-mile ET, finish line trap speed, torque & RPM, or displacement & forced induction boost pressure.",
  iconName: "Gauge",
  featured: true,
  keywords: [
    "engine horsepower calculator",
    "quarter mile et hp",
    "trap speed hp calculator",
    "whp to bhp converter",
    "boost horsepower estimator",
    "fox hale hunt drag formula",
    "sae j1349 dyno correction"
  ],
  priority: 1,
  relatedCalculators: ["horsepower-calculator", "gas-mileage-calculator", "fuel-cost-calculator"],
  formulaDescription: "HP = Weight / (ET / 5.825)³ | HP = Weight × (Trap Speed / 234)³ | HP = Torque × RPM / 5252",
  faqs: engine_horsepower_calculatorFaqs,
  inputs: [
    {
      name: "quarterMileET",
      label: "1/4-Mile ET (sec)",
      type: "number",
      defaultValue: 12.0,
      min: 5.0,
      max: 30.0,
      step: 0.1
    },
    {
      name: "curbWeightLbs",
      label: "Vehicle Curb Weight (lbs)",
      type: "number",
      defaultValue: 3500,
      min: 500,
      max: 10000,
      step: 50
    }
  ],
  outputs: [
    {
      name: "crankBHP",
      label: "Calculated Crank Horsepower (BHP)",
      format: "number",
      highlight: true,
      unit: "BHP"
    }
  ],
  calculate: calculateEngineHorsepowerFromInputs,
} as any;

export default engine_horsepower_calculatorConfig;
