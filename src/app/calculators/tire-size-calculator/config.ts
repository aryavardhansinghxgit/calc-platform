import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTireSizeFromInputs } from "./calculator";
import { tire_size_calculatorFaqs } from "./faq";

export const tire_size_calculatorConfig: CalculatorModuleDefinition = {
  id: "tire-size-calculator",
  title: "Tire Size Calculator",
  slug: "tire-size-calculator",
  category: "other",
  subcategory: "Automotive & Fuel",
  description: "Calculate tire overall diameter, sidewall height, circumference, speedometer error, wheel offset clearance, and gear ratio impact.",
  iconName: "Disc",
  featured: true,
  keywords: [
    "tire size calculator",
    "tire diameter calculator",
    "speedometer error calculator",
    "wheel offset calculator",
    "tire size comparison",
    "flotation tire size",
    "gear ratio tire calculator"
  ],
  priority: 1,
  relatedCalculators: ["gas-mileage-calculator", "mileage-calculator", "horsepower-calculator"],
  formulaDescription: "Overall Tire Diameter = Rim Diameter + 2 × [ (Section Width × Aspect Ratio) / 25.4 ]",
  faqs: tire_size_calculatorFaqs,
  inputs: [
    {
      name: "widthMm",
      label: "Stock Tire Width (mm)",
      type: "number",
      defaultValue: 225,
      min: 125,
      max: 355,
      step: 5
    },
    {
      name: "aspectRatio",
      label: "Stock Aspect Ratio (%)",
      type: "number",
      defaultValue: 50,
      min: 25,
      max: 85,
      step: 5
    },
    {
      name: "rimDiameterInches",
      label: "Stock Rim Diameter (in)",
      type: "number",
      defaultValue: 17,
      min: 10,
      max: 30,
      step: 1
    }
  ],
  outputs: [
    {
      name: "diameterDiffIn",
      label: "Diameter Difference",
      format: "number",
      highlight: true,
      unit: "in"
    },
    {
      name: "speedAt65Mph",
      label: "Actual Speed @ 65 mph",
      format: "number",
      unit: "mph"
    }
  ],
  calculate: calculateTireSizeFromInputs,
};

export default tire_size_calculatorConfig;
