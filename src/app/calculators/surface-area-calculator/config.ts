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
  description: "Calculate total and lateral surface area for 3D solid shapes including spheres, cones, cylinders, rectangular tanks, pyramids, capsules, and ellipsoids.",
  iconName: "Maximize",
  featured: true,
  keywords: ["surface area calculator", "cylinder surface area", "sphere surface area", "cone surface area", "cube surface area", "box surface area"],
  priority: 1,
  relatedCalculators: ["volume-calculator", "area-calculator", "circle-calculator"],
  formulaDescription: "Sphere SA = 4πr²; Cylinder SA = 2πr(r + h); Cone SA = πr(r + s)",
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
