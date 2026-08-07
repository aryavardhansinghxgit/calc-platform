import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateSlopeCalculator } from "./calculator";
import { slope_calculatorFaqs } from "./faq";

export const slope_calculatorConfig: CalculatorModuleDefinition = {
  id: "slope-calculator",
  title: "Slope Calculator",
  slug: "slope-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate line slope m, incline angle, distance between points, and equation of a line y = mx + b.",
  iconName: "TrendingUp",
  featured: true,
  keywords: ["slope calculator","incline","line equation","gradient","y=mx+b"],
  priority: 1,
  relatedCalculators: ["distance-calculator","triangle-calculator"],
  formulaDescription: "Slope m = (y₂ - y₁) / (x₂ - x₁)",
  faqs: slope_calculatorFaqs,
  inputs: [
  {
    "name": "x1",
    "label": "Point 1 X₁",
    "type": "number",
    "defaultValue": 1,
    "min": -10000,
    "max": 10000,
    "step": 1
  },
  {
    "name": "y1",
    "label": "Point 1 Y₁",
    "type": "number",
    "defaultValue": 2,
    "min": -10000,
    "max": 10000,
    "step": 1
  },
  {
    "name": "x2",
    "label": "Point 2 X₂",
    "type": "number",
    "defaultValue": 4,
    "min": -10000,
    "max": 10000,
    "step": 1
  },
  {
    "name": "y2",
    "label": "Point 2 Y₂",
    "type": "number",
    "defaultValue": 8,
    "min": -10000,
    "max": 10000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "slopeM",
    "label": "Slope (m)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "angleDeg",
    "label": "Incline Angle θ",
    "format": "number",
    "unit": "°"
  },
  {
    "name": "lineEquation",
    "label": "Line Equation (y = mx + b)",
    "format": "text"
  }
],
  calculate: calculateSlopeCalculator,
};

export default slope_calculatorConfig;
