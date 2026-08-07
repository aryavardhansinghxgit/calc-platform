import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTireSizeCalculator } from "./calculator";
import { tire_size_calculatorFaqs } from "./faq";

export const tire_size_calculatorConfig: CalculatorModuleDefinition = {
  id: "tire-size-calculator",
  title: "Tire Size Calculator",
  slug: "tire-size-calculator",
  category: "other",
  subcategory: "Transportation",
  description: "Calculate tire overall diameter, sidewall height, circumference, and speedometer error.",
  iconName: "Disc",
  featured: true,
  keywords: ["tire size calculator","tire diameter","speedometer error","wheel size"],
  priority: 1,
  relatedCalculators: ["gas-mileage-calculator","horsepower-calculator"],
  formulaDescription: "Tire Diameter = Rim Diameter + 2 × [ (Width × Aspect Ratio) / 25.4 ]",
  faqs: tire_size_calculatorFaqs,
  inputs: [
  {
    "name": "widthMm",
    "label": "Tire Section Width (mm)",
    "type": "number",
    "defaultValue": 225,
    "min": 125,
    "max": 355,
    "step": 5
  },
  {
    "name": "aspectRatio",
    "label": "Aspect Ratio (%)",
    "type": "number",
    "defaultValue": 45,
    "min": 25,
    "max": 85,
    "step": 5
  },
  {
    "name": "rimDiameterInches",
    "label": "Wheel Rim Diameter (inches)",
    "type": "number",
    "defaultValue": 17,
    "min": 10,
    "max": 30,
    "step": 1
  }
],
  outputs: [
  {
    "name": "tireDiameterInches",
    "label": "Overall Tire Diameter",
    "format": "number",
    "highlight": true,
    "unit": "in"
  },
  {
    "name": "sidewallHeightInches",
    "label": "Sidewall Height",
    "format": "number",
    "unit": "in"
  },
  {
    "name": "circumferenceInches",
    "label": "Tire Circumference",
    "format": "number",
    "unit": "in"
  }
],
  calculate: calculateTireSizeCalculator,
};

export default tire_size_calculatorConfig;
