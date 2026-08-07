import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBodySurfaceAreaCalculator } from "./calculator";
import { body_surface_area_calculatorFaqs } from "./faq";

export const body_surface_area_calculatorConfig: CalculatorModuleDefinition = {
  id: "body-surface-area-calculator",
  title: "Body Surface Area Calculator",
  slug: "body-surface-area-calculator",
  category: "Health",
  subcategory: "Nutrition & Body",
  description: "Calculate Body Surface Area (BSA) in square meters using Mosteller, Du Bois, and Haycock formulas.",
  iconName: "Maximize",
  featured: true,
  keywords: ["bsa","body surface area","mosteller","du bois"],
  priority: 1,
  relatedCalculators: ["bmi-calculator","gfr-calculator"],
  formulaDescription: "Mosteller BSA = √[ Weight (kg) × Height (cm) / 3600 ]",
  faqs: body_surface_area_calculatorFaqs,
  inputs: [
  {
    "name": "weightKg",
    "label": "Weight (kg)",
    "type": "number",
    "defaultValue": 70,
    "min": 10,
    "max": 300,
    "step": 1
  },
  {
    "name": "heightCm",
    "label": "Height (cm)",
    "type": "number",
    "defaultValue": 175,
    "min": 50,
    "max": 250,
    "step": 1
  }
],
  outputs: [
  {
    "name": "mostellerBsa",
    "label": "Mosteller BSA",
    "format": "number",
    "highlight": true,
    "unit": "m²"
  },
  {
    "name": "duBoisBsa",
    "label": "Du Bois BSA",
    "format": "number",
    "unit": "m²"
  },
  {
    "name": "haycockBsa",
    "label": "Haycock BSA",
    "format": "number",
    "unit": "m²"
  }
],
  calculate: calculateBodySurfaceAreaCalculator,
};

export default body_surface_area_calculatorConfig;
