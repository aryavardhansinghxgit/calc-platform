import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateEngineHorsepowerCalculator } from "./calculator";
import { engine_horsepower_calculatorFaqs } from "./faq";

export const engine_horsepower_calculatorConfig: CalculatorModuleDefinition = {
  id: "engine-horsepower-calculator",
  title: "Engine Horsepower Calculator",
  slug: "engine-horsepower-calculator",
  category: "other",
  subcategory: "Transportation",
  description: "Calculate drag strip horsepower from vehicle curb weight and quarter-mile trap speed.",
  iconName: "Gauge",
  featured: true,
  keywords: ["engine horsepower","quarter mile hp","trap speed hp","curb weight hp"],
  priority: 1,
  relatedCalculators: ["horsepower-calculator"],
  formulaDescription: "Wheel HP = Weight × (Trap Speed / 234)³",
  faqs: engine_horsepower_calculatorFaqs,
  inputs: [
  {
    "name": "weightLbs",
    "label": "Vehicle Weight with Driver (lbs)",
    "type": "number",
    "defaultValue": 3400,
    "min": 500,
    "max": 10000,
    "step": 50
  },
  {
    "name": "trapSpeedMph",
    "label": "1/4 Mile Trap Speed (mph)",
    "type": "number",
    "defaultValue": 105,
    "min": 30,
    "max": 300,
    "step": 1
  }
],
  outputs: [
  {
    "name": "wheelHp",
    "label": "Estimated Wheel HP",
    "format": "number",
    "highlight": true
  },
  {
    "name": "crankHp",
    "label": "Estimated Crank HP (15% drivetrain loss)",
    "format": "number"
  }
],
  calculate: calculateEngineHorsepowerCalculator,
};

export default engine_horsepower_calculatorConfig;
