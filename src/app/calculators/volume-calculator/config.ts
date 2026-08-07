import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateVolumeCalculator } from "./calculator";
import { volume_calculatorFaqs } from "./faq";

export const volume_calculatorConfig: CalculatorModuleDefinition = {
  id: "volume-calculator",
  title: "Volume Calculator",
  slug: "volume-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate 3D volume for spheres, cylinders, cones, cubes, and rectangular prisms.",
  iconName: "Box",
  featured: true,
  keywords: ["volume calculator","cylinder volume","sphere volume","cube volume"],
  priority: 1,
  relatedCalculators: ["surface-area-calculator","area-calculator"],
  formulaDescription: "Cylinder V = πr²h; Sphere V = (4/3)πr³",
  faqs: volume_calculatorFaqs,
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
        "label": "Cone (r, h)",
        "value": "cone"
      },
      {
        "label": "Rectangular Prism (l, w, h)",
        "value": "prism"
      }
    ]
  },
  {
    "name": "dim1",
    "label": "Radius / Length",
    "type": "number",
    "defaultValue": 5,
    "min": 0.1,
    "max": 10000,
    "step": 0.5
  },
  {
    "name": "dim2",
    "label": "Height / Width",
    "type": "number",
    "defaultValue": 10,
    "min": 0.1,
    "max": 10000,
    "step": 0.5
  },
  {
    "name": "dim3",
    "label": "Depth (Prism only)",
    "type": "number",
    "defaultValue": 4,
    "min": 0.1,
    "max": 10000,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "volume",
    "label": "Total 3D Volume",
    "format": "number",
    "highlight": true
  },
  {
    "name": "formula",
    "label": "Volume Formula Used",
    "format": "text"
  }
],
  calculate: calculateVolumeCalculator,
};

export default volume_calculatorConfig;
