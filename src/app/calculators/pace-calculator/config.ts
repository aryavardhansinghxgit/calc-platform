import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePaceCalculator } from "./calculator";
import { pace_calculatorFaqs } from "./faq";

export const pace_calculatorConfig: CalculatorModuleDefinition = {
  id: "pace-calculator",
  title: "Pace Calculator",
  slug: "pace-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Calculate running or cycling pace per km, per mile, and total speed from distance and time.",
  iconName: "Timer",
  featured: true,
  keywords: ["running pace","pace calculator","speed","marathon","running"],
  priority: 1,
  relatedCalculators: ["calories-burned-calculator","target-heart-rate-calculator"],
  formulaDescription: "Pace = Total Time / Distance",
  faqs: pace_calculatorFaqs,
  inputs: [
  {
    "name": "distanceKm",
    "label": "Distance (km)",
    "type": "number",
    "defaultValue": 10,
    "min": 0.1,
    "max": 500,
    "step": 0.1
  },
  {
    "name": "timeHours",
    "label": "Time (Hours)",
    "type": "number",
    "defaultValue": 0,
    "min": 0,
    "max": 48,
    "step": 1
  },
  {
    "name": "timeMinutes",
    "label": "Time (Minutes)",
    "type": "number",
    "defaultValue": 50,
    "min": 0,
    "max": 59,
    "step": 1
  },
  {
    "name": "timeSeconds",
    "label": "Time (Seconds)",
    "type": "number",
    "defaultValue": 0,
    "min": 0,
    "max": 59,
    "step": 1
  }
],
  outputs: [
  {
    "name": "paceKm",
    "label": "Pace per Km",
    "format": "text",
    "highlight": true
  },
  {
    "name": "paceMile",
    "label": "Pace per Mile",
    "format": "text"
  },
  {
    "name": "speedKmh",
    "label": "Speed (km/h)",
    "format": "number"
  },
  {
    "name": "speedMph",
    "label": "Speed (mph)",
    "format": "number"
  }
],
  calculate: calculatePaceCalculator,
};

export default pace_calculatorConfig;
