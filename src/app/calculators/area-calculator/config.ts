import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateAreaCalculator } from "./calculator";
import { AreaCalculator } from "@/components/calculator/area/AreaCalculator";
import { AreaContent } from "@/components/calculator/area/AreaContent";

export const area_calculatorConfig: CalculatorModuleDefinition = {
  id: "area-calculator",
  title: "Area Calculator & 2D Geometry Suite",
  slug: "area-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate 2D surface area for rectangles, triangles, circles, sectors, ellipses, trapezoids, parallelograms, regular n-gonal polygons, and irregular coordinate plots via Shoelace formula.",
  iconName: "Square",
  featured: true,
  keywords: ["area calculator", "rectangle area", "circle area", "trapezoid area", "square footage calculator", "acreage calculator", "shoelace formula"],
  priority: 1,
  relatedCalculators: ["circle-calculator", "volume-calculator", "surface-area-calculator"],
  formulaDescription: "Rectangle A = w × h; Circle A = πr²; Triangle A = ½bh",
  faqs: [],
  CustomComponent: AreaCalculator,
  ContentComponent: AreaContent,
  inputs: [
    {
      "name": "shape",
      "label": "2D Shape",
      "type": "select",
      "defaultValue": "rectangle",
      "options": [
        {
          "label": "Rectangle (w, h)",
          "value": "rectangle"
        },
        {
          "label": "Circle (r)",
          "value": "circle"
        },
        {
          "label": "Trapezoid (a, b, h)",
          "value": "trapezoid"
        }
      ]
    },
    {
      "name": "dim1",
      "label": "Width / Radius / Base A",
      "type": "number",
      "defaultValue": 10,
      "min": 0.1,
      "max": 10000,
      "step": 0.5
    },
    {
      "name": "dim2",
      "label": "Height / Base B",
      "type": "number",
      "defaultValue": 5,
      "min": 0.1,
      "max": 10000,
      "step": 0.5
    },
    {
      "name": "dim3",
      "label": "Height (Trapezoid only)",
      "type": "number",
      "defaultValue": 4,
      "min": 0.1,
      "max": 10000,
      "step": 0.5
    }
  ],
  outputs: [
    {
      "name": "area",
      "label": "Total Area",
      "format": "number",
      "highlight": true
    },
    {
      "name": "formula",
      "label": "Area Formula",
      "format": "text"
    }
  ],
  calculate: calculateAreaCalculator
};

export default area_calculatorConfig;
