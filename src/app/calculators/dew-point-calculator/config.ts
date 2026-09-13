import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDewPointFromInputs } from "./calculator";
import { dew_point_calculatorFaqs } from "./faq";

export const dew_point_calculatorConfig: CalculatorModuleDefinition = {
  id: "dew-point-calculator",
  title: "Dew Point Calculator",
  slug: "dew-point-calculator",
  category: "other",
  subcategory: "Science & Education",
  description:
    "Calculate dew point from air temperature and relative humidity, or work backward from dew point to estimate humidity and temperature.",
  iconName: "Droplets",
  featured: true,
  keywords: [
    "dew point calculator",
    "dew point from temperature and humidity",
    "dew point temperature",
    "relative humidity from dew point",
    "humidity calculator",
    "wet bulb temperature calculator",
    "frost point calculator",
    "vapor pressure calculator",
    "absolute humidity calculator",
    "cloud base calculator",
    "condensation calculator",
    "dew point for painting",
    "surface temperature dew point",
    "dew point and relative humidity",
    "calculate dew point",
    "dew point formula"
  ],
  priority: 1,
  relatedCalculators: ["heat-index-calculator", "wind-chill-calculator"],
  formulaDescription: "Alduchov & Eskridge (1996) Improved Magnus Empirical Approximation",
  faqs: dew_point_calculatorFaqs,
  inputs: [
    {
      name: "airTemp",
      label: "Air Temperature (°F)",
      type: "number",
      defaultValue: 70,
      min: -20,
      max: 120,
      step: 1
    },
    {
      name: "relativeHumidity",
      label: "Relative Humidity (%)",
      type: "number",
      defaultValue: 65,
      min: 1,
      max: 100,
      step: 1
    }
  ],
  outputs: [
    {
      name: "dewPointF",
      label: "Calculated Dew Point (°F)",
      format: "number",
      highlight: true,
      unit: "°F"
    }
  ],
  calculate: calculateDewPointFromInputs,
} as any;

export default dew_point_calculatorConfig;
