import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDewPointFromInputs } from "./calculator";
import { dew_point_calculatorFaqs } from "./faq";
import { DewPointCalculator } from "@/components/calculator/dew-point/DewPointCalculator";
import { DewPointContent } from "@/components/calculator/dew-point/DewPointContent";

export const dew_point_calculatorConfig: CalculatorModuleDefinition = {
  id: "dew-point-calculator",
  title: "Dew Point Calculator",
  slug: "dew-point-calculator",
  category: "other",
  subcategory: "Weather & Science Calculators",
  description: "Free online Dew Point Calculator. Calculate dew point, relative humidity, air temp, wet-bulb, frost point, absolute humidity, Muggy Index comfort & ISO 8502-4 painting safety.",
  iconName: "Droplets",
  featured: true,
  keywords: [
    "dew point calculator",
    "alduchov eskridge formula",
    "wet bulb calculator",
    "frost point calculator",
    "relative humidity to dew point",
    "muggy index",
    "iso 8502 4 painting rule"
  ],
  priority: 1,
  relatedCalculators: ["heat-index-calculator", "wind-chill-calculator"],
  formulaDescription: "Alduchov & Eskridge (1996) Improved Magnus Equation",
  faqs: dew_point_calculatorFaqs,
  CustomComponent: DewPointCalculator,
  ContentComponent: DewPointContent,
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
