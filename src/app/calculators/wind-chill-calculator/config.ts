import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateWindChillFromInputs } from "./calculator";
import { wind_chill_calculatorFaqs } from "./faq";

export const wind_chill_calculatorConfig: CalculatorModuleDefinition = {
  id: "wind-chill-calculator",
  title: "Wind Chill Calculator",
  slug: "wind-chill-calculator",
  category: "other",
  subcategory: "Science & Education",
  description: "Free online NWS Wind Chill Calculator. Calculate wind chill temperature, real-time frostbite risk timer, apparent temperature, and winter PPE clothing advice.",
  iconName: "Wind",
  featured: true,
  keywords: [
    "wind chill calculator",
    "nws wind chill formula",
    "frostbite risk calculator",
    "feels like temperature",
    "apparent temperature",
    "jag ti wind chill"
  ],
  priority: 1,
  relatedCalculators: ["heat-index-calculator", "dew-point-calculator"],
  formulaDescription: "Wind Chill (°F) = 35.74 + 0.6215T - 35.75V^0.16 + 0.4275T V^0.16",
  faqs: wind_chill_calculatorFaqs,
  inputs: [
    {
      name: "temperature",
      label: "Air Temperature (°F)",
      type: "number",
      defaultValue: 10,
      min: -50,
      max: 50,
      step: 1
    },
    {
      name: "windSpeed",
      label: "Wind Speed (mph)",
      type: "number",
      defaultValue: 15,
      min: 0,
      max: 100,
      step: 1
    }
  ],
  outputs: [
    {
      name: "windChillF",
      label: "Calculated Wind Chill (°F)",
      format: "number",
      highlight: true,
      unit: "°F"
    }
  ],
  calculate: calculateWindChillFromInputs,
} as any;

export default wind_chill_calculatorConfig;
