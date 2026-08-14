import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHeatIndexFromInputs } from "./calculator";
import { heat_index_calculatorFaqs } from "./faq";

export const heat_index_calculatorConfig: CalculatorModuleDefinition = {
  id: "heat-index-calculator",
  title: "Heat Index Calculator",
  slug: "heat-index-calculator",
  category: "other",
  subcategory: "Weather & Science Calculators",
  description: "Free online NWS Heat Index Calculator. Calculate feels-like heat index with NOAA Rothfusz regression, Dew Point dual mode, direct sunshine +15°F toggle, and OSHA work/rest schedules.",
  iconName: "Sun",
  featured: true,
  keywords: [
    "heat index calculator",
    "nws rothfusz formula",
    "feels like temperature",
    "dew point to heat index",
    "osha work rest schedule",
    "wbgt estimator",
    "heat hazard safety"
  ],
  priority: 1,
  relatedCalculators: ["wind-chill-calculator", "dew-point-calculator"],
  formulaDescription: "NOAA Rothfusz 9-Term Regression Algorithm",
  faqs: heat_index_calculatorFaqs,
  inputs: [
    {
      name: "temperature",
      label: "Air Temperature (°F)",
      type: "number",
      defaultValue: 85,
      min: 70,
      max: 120,
      step: 1
    },
    {
      name: "relativeHumidity",
      label: "Relative Humidity (%)",
      type: "number",
      defaultValue: 70,
      min: 10,
      max: 100,
      step: 1
    }
  ],
  outputs: [
    {
      name: "heatIndexF",
      label: "Calculated Heat Index (°F)",
      format: "number",
      highlight: true,
      unit: "°F"
    }
  ],
  calculate: calculateHeatIndexFromInputs,
} as any;

export default heat_index_calculatorConfig;
