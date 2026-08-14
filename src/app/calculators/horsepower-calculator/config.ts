import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHorsepowerFromInputs } from "./calculator";
import { horsepower_calculatorFaqs } from "./faq";

export const horsepower_calculatorConfig: CalculatorModuleDefinition = {
  id: "horsepower-calculator",
  title: "Horsepower Calculator",
  slug: "horsepower-calculator",
  category: "other",
  subcategory: "Performance & Engine Calculators",
  description: "Calculate engine horsepower from Torque/RPM, 1/4-mile drag times, 0–60 mph acceleration, WHP vs BHP drivetrain losses, and SAE weather corrections.",
  iconName: "Zap",
  featured: true,
  keywords: [
    "horsepower calculator",
    "hp calculator",
    "engine torque to hp",
    "quarter mile hp calculator",
    "whp to bhp calculator",
    "0-60 hp calculator",
    "kw to hp converter",
    "dyno horsepower calculator"
  ],
  priority: 1,
  relatedCalculators: ["engine-horsepower-calculator", "tire-size-calculator"],
  formulaDescription: "HP = (Torque lb-ft × RPM) / 5252.11 | WHP = BHP × (1 - Loss%)",
  faqs: horsepower_calculatorFaqs,
  inputs: [
    {
      name: "torqueLbFt",
      label: "Torque (lb-ft)",
      type: "number",
      defaultValue: 400,
      min: 1,
      max: 3000,
      step: 10,
    },
    {
      name: "rpm",
      label: "Engine Speed (RPM)",
      type: "number",
      defaultValue: 5252,
      min: 500,
      max: 15000,
      step: 100,
    },
  ],
  outputs: [
    {
      name: "crankBHP",
      label: "Crankshaft Horsepower (BHP)",
      format: "number",
      highlight: true,
    },
    {
      name: "wheelWHP",
      label: "Wheel Horsepower (WHP)",
      format: "number",
    },
  ],
  calculate: calculateHorsepowerFromInputs,
};

export default horsepower_calculatorConfig;
