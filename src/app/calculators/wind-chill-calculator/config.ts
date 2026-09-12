import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateWindChillFromInputs } from "./calculator";
import { wind_chill_calculatorFaqs } from "./faq";

export const wind_chill_calculatorConfig: CalculatorModuleDefinition = {
  id: "wind-chill-calculator",
  title: "Wind Chill Calculator – NWS Formula, Frostbite Risk & Wind Chill Chart",
  slug: "wind-chill-calculator",
  category: "other",
  subcategory: "Science & Education",
  description: "Calculate wind chill with the NWS formula, compare temperature and wind, estimate frostbite exposure risk, and explore an interactive wind chill chart.",
  iconName: "Wind",
  featured: true,
  keywords: [
    "wind chill calculator",
    "wind chill chart",
    "wind chill formula",
    "NWS wind chill calculator",
    "wind chill temperature",
    "feels like temperature wind",
    "frostbite wind chill",
    "frostbite calculator",
    "wind chill at 20 mph",
    "wind chill by temperature and wind speed",
    "NWS wind chill formula",
    "wind chill in Celsius",
    "wind chill in Fahrenheit",
    "Steadman apparent temperature"
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
