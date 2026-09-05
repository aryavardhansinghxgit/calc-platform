import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateSurfaceAreaCalculator } from "./calculator";
import { SurfaceAreaCalculator } from "@/components/calculator/surface-area/SurfaceAreaCalculator";
import { SurfaceAreaContent } from "@/components/calculator/surface-area/SurfaceAreaContent";

export const surface_area_calculatorConfig: CalculatorModuleDefinition = {
  id: "surface-area-calculator",
  title: "Surface Area Calculator & 3D Solids Net Suite",
  slug: "surface-area-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate surface area for spheres, hemispheres, cones, frustums, cylinders, pipes, cubes, prisms, pyramids, capsules and ellipsoids. Includes formulas and unit conversions.",
  iconName: "Maximize",
  featured: true,
  keywords: [
    "surface area calculator",
    "surface area formula",
    "total surface area calculator",
    "lateral surface area calculator",
    "surface area of a sphere",
    "surface area of a cylinder",
    "surface area of a cone",
    "surface area of a rectangular prism",
    "surface area of a cube",
    "surface area of a pyramid",
    "surface area of a hemisphere",
    "surface area of a pipe",
    "surface area of a frustum",
    "surface area of an ellipsoid",
    "surface area unit converter"
  ],
  priority: 1,
  relatedCalculators: ["volume-calculator", "area-calculator", "circle-calculator"],
  formulaDescription: "Sphere SA = 4πr²; Cylinder SA = 2πr(r + h); Cone SA = πr(r + s); Box SA = 2(lw + lh + wh)",
  faqs: [],
  CustomComponent: SurfaceAreaCalculator,
  ContentComponent: SurfaceAreaContent,
  inputs: [
    {
      "name": "shape",
      "label": "3D Shape",
      "type": "select",
      "defaultValue": "cylinder",
      "options": [
        {
          "label": "Cylinder (r, h)",
          "value": "cylinder"
        },
        {
          "label": "Sphere (r)",
          "value": "sphere"
        },
        {
          "label": "Cube (side)",
          "value": "cube"
        }
      ]
    },
    {
      "name": "dim1",
      "label": "Radius / Side Length",
      "type": "number",
      "defaultValue": 4,
      "min": 0.1,
      "max": 10000,
      "step": 0.5
    },
    {
      "name": "dim2",
      "label": "Height (Cylinder)",
      "type": "number",
      "defaultValue": 10,
      "min": 0.1,
      "max": 10000,
      "step": 0.5
    }
  ],
  outputs: [
    {
      "name": "surfaceArea",
      "label": "Total Surface Area",
      "format": "number",
      "highlight": true
    },
    {
      "name": "formula",
      "label": "Formula Used",
      "format": "text"
    }
  ],
  calculate: calculateSurfaceAreaCalculator
};

export default surface_area_calculatorConfig;
