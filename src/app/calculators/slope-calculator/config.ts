import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateSlopeCalculator } from "./calculator";
import { SlopeCalculator } from "@/components/calculator/slope/SlopeCalculator";
import { SlopeContent } from "@/components/calculator/slope/SlopeContent";

export const slope_calculatorConfig: CalculatorModuleDefinition = {
  id: "slope-calculator",
  title: "Slope Calculator & Line Geometry Suite",
  slug: "slope-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate line slope m, incline angle θ, distance between points, slope-intercept equation y = mx + b, parallel & perpendicular lines, and angle between intersecting lines.",
  iconName: "TrendingUp",
  featured: true,
  keywords: ["slope calculator", "incline angle", "line equation", "gradient", "y=mx+b", "perpendicular slope", "two point slope"],
  priority: 1,
  relatedCalculators: ["distance-calculator", "triangle-calculator", "pythagorean-calculator"],
  formulaDescription: "Slope m = (y₂ - y₁) / (x₂ - x₁) = rise / run",
  faqs: [],
  CustomComponent: SlopeCalculator,
  ContentComponent: SlopeContent,
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
      "defaultValue": 1,
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
      "defaultValue": 7,
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
  calculate: calculateSlopeCalculator
};

export default slope_calculatorConfig;
