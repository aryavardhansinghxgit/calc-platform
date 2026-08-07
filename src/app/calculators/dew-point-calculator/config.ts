import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDewPointCalculator } from "./calculator";
import { dew_point_calculatorFaqs } from "./faq";

export const dew_point_calculatorConfig: CalculatorModuleDefinition = {
  id: "dew-point-calculator",
  title: "Dew Point Calculator",
  slug: "dew-point-calculator",
  category: "other",
  subcategory: "Weather",
  description: "Calculate dew point temperature and relative humidity comfort levels using Magnus formula.",
  iconName: "Droplets",
  featured: true,
  keywords: ["dew point","humidity","comfort level","weather dew point"],
  priority: 1,
  relatedCalculators: ["heat-index-calculator","wind-chill-calculator"],
  formulaDescription: "Magnus Formula: Dew Point = (b × α) / (a - α)",
  faqs: dew_point_calculatorFaqs,
  inputs: [
  {
    "name": "tempC",
    "label": "Air Temperature (°C)",
    "type": "number",
    "defaultValue": 25,
    "min": -20,
    "max": 50,
    "step": 1
  },
  {
    "name": "humidityPct",
    "label": "Relative Humidity (%)",
    "type": "number",
    "defaultValue": 60,
    "min": 1,
    "max": 100,
    "step": 5
  }
],
  outputs: [
  {
    "name": "dewPointC",
    "label": "Dew Point (°C)",
    "format": "number",
    "highlight": true,
    "unit": "°C"
  },
  {
    "name": "comfortLevel",
    "label": "Humidity Comfort Assessment",
    "format": "text"
  }
],
  calculate: calculateDewPointCalculator,
};

export default dew_point_calculatorConfig;
