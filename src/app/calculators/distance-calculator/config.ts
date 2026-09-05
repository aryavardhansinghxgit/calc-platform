import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateDistanceCalculator } from "./calculator";
import { DistanceCalculator } from "@/components/calculator/distance/DistanceCalculator";
import { DistanceContent } from "@/components/calculator/distance/DistanceContent";

export const distance_calculatorConfig: CalculatorModuleDefinition = {
  id: "distance-calculator",
  title: "Distance Calculator – 2D, 3D, GPS & Geodesic Distance",
  slug: "distance-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate distance quickly using the method that matches your problem. This Distance Calculator can find the straight-line distance between two points in 2D or 3D, calculate great-circle distance between latitude and longitude coordinates, solve speed–distance–time problems, find perpendicular distance from a point to a line, and convert distances between common metric and imperial units. Enter your values to see the result, the relevant intermediate measurements, and a visual explanation of the calculation. The calculator is designed for coordinate geometry, mathematics, physics, navigation, engineering, travel planning, and everyday distance conversions.",
  iconName: "MapPin",
  featured: true,
  keywords: [
    "distance calculator",
    "distance between two points",
    "2D distance calculator",
    "3D distance calculator",
    "GPS distance calculator",
    "haversine formula",
    "point to line distance",
    "speed distance time",
    "great circle distance"
  ],
  priority: 1,
  relatedCalculators: [
    "pythagorean-theorem-calculator",
    "slope-calculator",
    "triangle-calculator",
    "standard-deviation-calculator"
  ],
  formulaDescription: "2D d = √[(x₂-x₁)² + (y₂-y₁)²]; 3D d = √[Δx² + Δy² + Δz²]; Haversine d = 2R · atan2(√a, √(1-a)); d = s × t; d = |Ax₀+By₀+C| / √(A²+B²)",
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
