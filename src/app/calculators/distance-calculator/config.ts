import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDistanceCalculator } from "./calculator";
import { distance_calculatorFaqs } from "./faq";

export const distance_calculatorConfig: CalculatorModuleDefinition = {
  id: "distance-calculator",
  title: "Distance Calculator",
  slug: "distance-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate Euclidean distance between 2D or 3D coordinate points.",
  iconName: "MapPin",
  featured: true,
  keywords: ["distance calculator","euclidean distance","coordinates distance","2d 3d distance"],
  priority: 1,
  relatedCalculators: ["slope-calculator","pythagorean-theorem-calculator"],
  formulaDescription: "Distance d = √[ (x₂ - x₁)² + (y₂ - y₁)² ]",
  faqs: distance_calculatorFaqs,
  inputs: [
  {
    "name": "x1",
    "label": "Point 1 X₁",
    "type": "number",
    "defaultValue": 0,
    "min": -10000,
    "max": 10000,
    "step": 1
  },
  {
    "name": "y1",
    "label": "Point 1 Y₁",
    "type": "number",
    "defaultValue": 0,
    "min": -10000,
    "max": 10000,
    "step": 1
  },
  {
    "name": "x2",
    "label": "Point 2 X₂",
    "type": "number",
    "defaultValue": 3,
    "min": -10000,
    "max": 10000,
    "step": 1
  },
  {
    "name": "y2",
    "label": "Point 2 Y₂",
    "type": "number",
    "defaultValue": 4,
    "min": -10000,
    "max": 10000,
    "step": 1
  }
],
  outputs: [
  {
    "name": "distance",
    "label": "Euclidean Distance",
    "format": "number",
    "highlight": true
  },
  {
    "name": "midpoint",
    "label": "Midpoint Coordinate",
    "format": "text"
  }
],
  calculate: calculateDistanceCalculator,
};

export default distance_calculatorConfig;
