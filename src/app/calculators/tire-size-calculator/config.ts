import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTireSizeFromInputs } from "./calculator";
import { tire_size_calculatorFaqs } from "./faq";

export const tire_size_calculatorConfig: CalculatorModuleDefinition = {
  id: "tire-size-calculator",
  title: "Tire Size Calculator",
  slug: "tire-size-calculator",
  category: "other",
  subcategory: "Automotive & Fuel",
  description: "Compare tire sizes and calculate diameter, sidewall, circumference, revs per mile, speedometer error, offset, backspacing and gear-ratio effects.",
  iconName: "Disc",
  featured: true,
  keywords: [
    "tire size calculator",
    "tire size comparison",
    "tire diameter calculator",
    "tire size conversion",
    "tire speedometer calculator",
    "tire circumference calculator",
    "tire offset calculator",
    "backspacing calculator",
    "tire gear ratio calculator",
    "plus sizing calculator",
    "225/50R17 calculator",
    "245/45R18 comparison",
    "overall tire diameter",
    "sidewall height calculator",
    "revolutions per mile",
    "speedometer error with larger tires",
    "wheel offset ET calculator",
    "wheel backspacing",
    "effective final drive ratio",
    "33x12.50R15",
    "flotation tire size",
    "metric tire size",
    "tire fitment",
    "tire clearance",
    "DOT tire date",
    "load index",
    "speed rating"
  ],
  priority: 1,
  relatedCalculators: ["engine-horsepower-calculator", "gas-mileage-calculator", "fuel-cost-calculator"],
  formulaDescription: "Overall Tire Diameter = Rim Diameter + 2 × [ (Section Width × Aspect Ratio) / 25.4 ]",
  faqs: tire_size_calculatorFaqs,
  inputs: [
    {
      name: "widthMm",
      label: "Stock Tire Width (mm)",
      type: "number",
      defaultValue: 225,
      min: 125,
      max: 355,
      step: 5
    },
    {
      name: "aspectRatio",
      label: "Stock Aspect Ratio (%)",
      type: "number",
      defaultValue: 50,
      min: 25,
      max: 85,
      step: 5
    },
    {
      name: "rimDiameterInches",
      label: "Stock Rim Diameter (in)",
      type: "number",
      defaultValue: 17,
      min: 10,
      max: 30,
      step: 1
    }
  ],
  outputs: [
    {
      name: "diameterDiffIn",
      label: "Diameter Difference",
      format: "number",
      highlight: true,
      unit: "in"
    },
    {
      name: "speedAt65Mph",
      label: "Actual Speed @ 65 mph",
      format: "number",
      unit: "mph"
    }
  ],
  calculate: calculateTireSizeFromInputs,
};

export default tire_size_calculatorConfig;
