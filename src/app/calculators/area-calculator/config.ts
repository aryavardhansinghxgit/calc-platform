import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateAreaCalculator } from "./calculator";
import { AreaCalculator } from "@/components/calculator/area/AreaCalculator";
import { AreaContent } from "@/components/calculator/area/AreaContent";
import { areaFaqs } from "./faq";

export const area_calculatorConfig: CalculatorModuleDefinition = {
  id: "area-calculator",
  title: "Area Calculator — Calculate the Area of 2D Shapes",
  slug: "area-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate area for rectangles, triangles, circles, trapezoids, polygons and more. See formulas, units, perimeter and step-by-step results.",
  iconName: "Square",
  featured: true,
  keywords: [
    "area calculator",
    "area calculator online",
    "area of a rectangle calculator",
    "area of a triangle calculator",
    "area of a circle calculator",
    "area of a trapezoid calculator",
    "area of a parallelogram calculator",
    "area of a rhombus calculator",
    "area of a regular polygon",
    "irregular polygon area calculator",
    "polygon area calculator",
    "calculate area",
    "area formula",
    "square feet calculator",
    "square meters calculator",
    "area unit converter",
    "area from coordinates",
    "Shoelace formula calculator",
    "Heron's formula area",
    "area and perimeter calculator"
  ],
  priority: 1,
  relatedCalculators: ["triangle-calculator", "volume-calculator", "surface-area-calculator"],
  formulaDescription: "Rectangle A = lw; Circle A = πr²; Triangle A = ½bh; Regular Polygon A = ½ap; Shoelace A = ½|∑(x_i y_{i+1} - x_{i+1} y_i)|",
  faqs: areaFaqs,
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
