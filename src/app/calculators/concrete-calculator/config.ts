import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateConcreteCalculator } from "./calculator";
import { concrete_calculatorFaqs } from "./faq";

export const concrete_calculatorConfig: CalculatorModuleDefinition = {
  id: "concrete-calculator",
  title: "Concrete Calculator",
  slug: "concrete-calculator",
  category: "construction",
  subcategory: "Housing / Building",
  description: "Calculate concrete volume for slabs, footings, columns, tubes, curbs and stairs. Get cubic feet, cubic yards, weight and bag estimates with waste.",
  iconName: "Hammer",
  featured: true,
  keywords: ["concrete calculator", "concrete calculator cubic yards", "concrete volume calculator", "how much concrete do I need", "cubic yards of concrete calculator", "concrete slab calculator", "concrete footing calculator", "concrete column calculator", "concrete bag calculator", "concrete stairs calculator", "concrete curb and gutter calculator"],
  priority: 1,
  relatedCalculators: ["square-footage-calculator","gravel-calculator"],
  formulaDescription: "Cubic Yards = (Length ft × Width ft × Depth ft) / 27",
  faqs: concrete_calculatorFaqs,
  inputs: [
  {
    "name": "lengthFt",
    "label": "Length (feet)",
    "type": "number",
    "defaultValue": 10,
    "min": 0.1,
    "max": 1000,
    "step": 0.5
  },
  {
    "name": "widthFt",
    "label": "Width (feet)",
    "type": "number",
    "defaultValue": 10,
    "min": 0.1,
    "max": 1000,
    "step": 0.5
  },
  {
    "name": "depthInches",
    "label": "Thickness / Depth (inches)",
    "type": "number",
    "defaultValue": 4,
    "min": 0.5,
    "max": 48,
    "step": 0.5
  }
],
  outputs: [
  {
    "name": "cubicYards",
    "label": "Concrete Volume (Cubic Yards)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "bags80lb",
    "label": "80 lb Premix Bags Needed",
    "format": "number"
  },
  {
    "name": "bags60lb",
    "label": "60 lb Premix Bags Needed",
    "format": "number"
  }
],
  calculate: calculateConcreteCalculator,
};

export default concrete_calculatorConfig;
