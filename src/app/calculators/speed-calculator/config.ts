import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateSpeedCalculator } from "./calculator";
import { speed_calculatorFaqs } from "./faq";

export const speed_calculatorConfig: CalculatorModuleDefinition = {
  id: "speed-calculator",
  title: "Speed Calculator",
  slug: "speed-calculator",
  category: "other",
  subcategory: "Measurements & Units",
  description: "Calculate speed, distance, or time from velocity equation v = d / t.",
  iconName: "Zap",
  featured: true,
  keywords: ["speed calculator","velocity","distance time speed","mph kmh"],
  priority: 1,
  relatedCalculators: ["conversion-calculator"],
  formulaDescription: "Speed v = Distance (d) / Time (t)",
  faqs: speed_calculatorFaqs,
  inputs: [
  {
    "name": "distanceKm",
    "label": "Distance (km)",
    "type": "number",
    "defaultValue": 150,
    "min": 0.1,
    "max": 10000,
    "step": 1
  },
  {
    "name": "timeHours",
    "label": "Time (Hours)",
    "type": "number",
    "defaultValue": 2,
    "min": 0.01,
    "max": 1000,
    "step": 0.25
  }
],
  outputs: [
  {
    "name": "speedKmh",
    "label": "Speed (km/h)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "speedMph",
    "label": "Speed (mph)",
    "format": "number"
  },
  {
    "name": "speedMs",
    "label": "Speed (m/s)",
    "format": "number"
  }
],
  calculate: calculateSpeedCalculator,
};

export default speed_calculatorConfig;
