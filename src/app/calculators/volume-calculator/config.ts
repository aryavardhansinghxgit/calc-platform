import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateVolumeCalculator } from "./calculator";
import { VolumeCalculator } from "@/components/calculator/volume/VolumeCalculator";
import { VolumeContent } from "@/components/calculator/volume/VolumeContent";
import { volume_calculatorFaqs } from "./faq";

export const volume_calculatorConfig: CalculatorModuleDefinition = {
  id: "volume-calculator",
  title: "Volume Calculator – 3D Shapes, Tanks & Volume Conversions",
  slug: "volume-calculator",
  category: "Math",
  subcategory: "Geometry",
  description: "Calculate the volume of common 3D shapes, rectangular tanks and containers with accurate formulas and automatic unit conversions. Enter dimensions to find volume, surface area, liquid capacity and related measurements in units such as cubic meters, cubic feet, liters and gallons.",
  iconName: "Box",
  featured: true,
  keywords: [
    "volume calculator",
    "volume of a cylinder",
    "volume of a sphere",
    "volume of a cone",
    "volume of a rectangular prism",
    "tank capacity",
    "liquid volume",
    "cubic feet to liters",
    "cubic meters to liters",
    "volume conversion",
    "3D shape volume"
  ],
  priority: 1,
  relatedCalculators: ["surface-area-calculator", "area-calculator", "density-calculator"],
  formulaDescription: "Cylinder V = πr²h; Sphere V = (4/3)πr³; Prism V = l·w·h; Cone V = (1/3)πr²h",
  faqs: volume_calculatorFaqs,
  CustomComponent: VolumeCalculator,
  ContentComponent: VolumeContent,
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
  calculate: calculateVolumeCalculator
};

export default volume_calculatorConfig;
