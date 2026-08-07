import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHeatIndexCalculator } from "./calculator";
import { heat_index_calculatorFaqs } from "./faq";

export const heat_index_calculatorConfig: CalculatorModuleDefinition = {
  id: "heat-index-calculator",
  title: "Heat Index Calculator",
  slug: "heat-index-calculator",
  category: "other",
  subcategory: "Weather",
  description: "Calculate apparent \"feels like\" heat index from air temperature and relative humidity.",
  iconName: "Sun",
  featured: true,
  keywords: ["heat index","feels like","humidity heat","weather calculator"],
  priority: 1,
  relatedCalculators: ["wind-chill-calculator","dew-point-calculator"],
  formulaDescription: "NWS Rothfusz Heat Index Regression Equation",
  faqs: heat_index_calculatorFaqs,
  inputs: [
  {
    "name": "tempF",
    "label": "Air Temperature (°F)",
    "type": "number",
    "defaultValue": 90,
    "min": 80,
    "max": 120,
    "step": 1
  },
  {
    "name": "humidityPct",
    "label": "Relative Humidity (%)",
    "type": "number",
    "defaultValue": 65,
    "min": 10,
    "max": 100,
    "step": 5
  }
],
  outputs: [
  {
    "name": "heatIndexF",
    "label": "Feels Like Heat Index (°F)",
    "format": "number",
    "highlight": true,
    "unit": "°F"
  },
  {
    "name": "dangerLevel",
    "label": "NWS Caution Level",
    "format": "text"
  }
],
  calculate: calculateHeatIndexCalculator,
};

export default heat_index_calculatorConfig;
