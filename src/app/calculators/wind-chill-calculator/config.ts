import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateWindChillCalculator } from "./calculator";
import { wind_chill_calculatorFaqs } from "./faq";

export const wind_chill_calculatorConfig: CalculatorModuleDefinition = {
  id: "wind-chill-calculator",
  title: "Wind Chill Calculator",
  slug: "wind-chill-calculator",
  category: "other",
  subcategory: "Weather",
  description: "Calculate apparent wind chill temperature based on ambient temperature and wind speed.",
  iconName: "Wind",
  featured: true,
  keywords: ["wind chill","feels like temperature","weather calculator","cold index"],
  priority: 1,
  relatedCalculators: ["heat-index-calculator","dew-point-calculator"],
  formulaDescription: "NWS Wind Chill = 35.74 + 0.6215T - 35.75V⁰.¹⁶ + 0.4275TV⁰.¹⁶",
  faqs: wind_chill_calculatorFaqs,
  inputs: [
  {
    "name": "tempF",
    "label": "Air Temperature (°F)",
    "type": "number",
    "defaultValue": 30,
    "min": -50,
    "max": 50,
    "step": 1
  },
  {
    "name": "windMph",
    "label": "Wind Speed (mph)",
    "type": "number",
    "defaultValue": 15,
    "min": 3,
    "max": 100,
    "step": 1
  }
],
  outputs: [
  {
    "name": "windChillF",
    "label": "Wind Chill Temperature (°F)",
    "format": "number",
    "highlight": true,
    "unit": "°F"
  },
  {
    "name": "windChillC",
    "label": "Wind Chill in Celsius (°C)",
    "format": "number",
    "unit": "°C"
  }
],
  calculate: calculateWindChillCalculator,
};

export default wind_chill_calculatorConfig;
