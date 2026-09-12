import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateHeatIndexFromInputs } from "./calculator";
import { heat_index_calculatorFaqs } from "./faq";

export const heat_index_calculatorConfig: CalculatorModuleDefinition = {
  id: "heat-index-calculator",
  title: "Heat Index Calculator – NWS Formula, Chart & Heat Risk",
  slug: "heat-index-calculator",
  category: "other",
  subcategory: "Science & Education",
  description: "Calculate heat index from temperature and humidity using the NWS method. See the heat index chart, direct-sun estimate, dew point mode and heat-risk guidance.",
  iconName: "Sun",
  featured: true,
  keywords: [
    "heat index calculator",
    "heat index",
    "heat index chart",
    "NWS heat index calculator",
    "NWS heat index formula",
    "heat index formula",
    "heat index by temperature and humidity",
    "feels like temperature calculator",
    "temperature humidity calculator",
    "heat index at 85 degrees",
    "heat index 70 humidity",
    "heat index in Celsius",
    "heat index in Fahrenheit",
    "dew point heat index",
    "direct sun heat index",
    "heat risk calculator",
    "heat index vs WBGT"
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
