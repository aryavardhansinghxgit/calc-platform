import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateEngineHorsepowerFromInputs } from "./calculator";
import { engine_horsepower_calculatorFaqs } from "./faq";

export const engine_horsepower_calculatorConfig: CalculatorModuleDefinition = {
  id: "engine-horsepower-calculator",
  title: "Engine Horsepower Calculator",
  slug: "engine-horsepower-calculator",
  category: "other",
  subcategory: "Automotive & Fuel",
  description: "Calculate engine horsepower from torque and RPM, 1/4-mile ET, trap speed, 0–60 time, or boost and displacement. Compare BHP, WHP, kW and PS.",
  iconName: "Gauge",
  featured: true,
  keywords: [
    "engine horsepower calculator",
    "horsepower calculator",
    "calculate horsepower",
    "horsepower from torque and rpm",
    "torque to horsepower calculator",
    "HP from RPM",
    "BHP calculator",
    "WHP calculator",
    "wheel horsepower calculator",
    "quarter mile horsepower calculator",
    "trap speed horsepower calculator",
    "0-60 horsepower calculator",
    "horsepower from boost",
    "HP to kW",
    "HP to PS",
    "SAE J1349 horsepower correction"
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
