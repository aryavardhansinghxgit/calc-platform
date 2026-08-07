import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateSurfaceAreaCalculator } from "./calculator";
import { surface_area_calculatorFaqs } from "./faq";

export const surface_area_calculatorConfig: CalculatorModuleDefinition = {
  id: "surface-area-calculator",
  title: "Surface Area Calculator",
  slug: "surface-area-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate total surface area for 3D shapes including spheres, cylinders, cubes, and cones.",
  iconName: "Maximize",
  featured: true,
  keywords: ["surface area","cylinder surface area","sphere area","3d area"],
  priority: 1,
  relatedCalculators: ["volume-calculator","area-calculator"],
  formulaDescription: "Cylinder SA = 2πr(r + h); Sphere SA = 4πr²",
  faqs: surface_area_calculatorFaqs,
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
  calculate: calculateSurfaceAreaCalculator,
};

export default surface_area_calculatorConfig;
