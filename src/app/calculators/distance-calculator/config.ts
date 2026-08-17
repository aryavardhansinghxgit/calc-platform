import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDistanceCalculator } from "./calculator";
import { DistanceCalculator } from "@/components/calculator/distance/DistanceCalculator";
import { DistanceContent } from "@/components/calculator/distance/DistanceContent";

export const distance_calculatorConfig: CalculatorModuleDefinition = {
  id: "distance-calculator",
  title: "Distance Calculator & Geodesic Navigation Suite",
  slug: "distance-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate 2D and 3D Euclidean distance between coordinates, Haversine Great-Circle Earth distances between Lat/Long points, speed-distance-time kinematics, and point-to-line orthogonal distances.",
  iconName: "MapPin",
  featured: true,
  keywords: ["distance calculator", "euclidean distance", "haversine formula", "coordinates distance", "speed distance time", "flight distance"],
  priority: 1,
  relatedCalculators: ["slope-calculator", "pythagorean-calculator", "triangle-calculator"],
  formulaDescription: "2D d = √[(x₂-x₁)² + (y₂-y₁)²]; Haversine d = 2R · arcsin(...)",
  faqs: [],
  CustomComponent: DistanceCalculator,
  ContentComponent: DistanceContent,
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
  calculate: calculateDistanceCalculator
};

export default distance_calculatorConfig;
