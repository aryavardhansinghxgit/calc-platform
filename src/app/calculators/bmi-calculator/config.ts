import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateBMICalculator } from "./calculator";
import { bmi_calculatorFaqs } from "./faq";

export const bmi_calculatorConfig: CalculatorModuleDefinition = {
  id: "bmi-calculator",
  title: "BMI Calculator",
  slug: "bmi-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Calculate Body Mass Index (BMI), WHO weight classification, and ideal body weight range.",
  iconName: "HeartPulse",
  featured: true,
  keywords: ["bmi","body mass index","health","weight","fitness","ideal weight"],
  priority: 1,
  relatedCalculators: ["calorie-calculator","body-fat-calculator","ideal-weight-calculator"],
  formulaDescription: "BMI = Weight (kg) / [Height (m)]²",
  faqs: bmi_calculatorFaqs,
  inputs: [
  {
    "name": "weightKg",
    "label": "Weight (kg)",
    "type": "number",
    "defaultValue": 70,
    "min": 20,
    "max": 300,
    "step": 1
  },
  {
    "name": "heightCm",
    "label": "Height (cm)",
    "type": "number",
    "defaultValue": 175,
    "min": 50,
    "max": 250,
    "step": 1
  }
],
  outputs: [
  {
    "name": "bmi",
    "label": "Body Mass Index (BMI)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "category",
    "label": "Classification",
    "format": "text"
  },
  {
    "name": "healthyWeightRange",
    "label": "Ideal Weight Range",
    "format": "text"
  },
  {
    "name": "primeIndex",
    "label": "BMI Prime",
    "format": "number"
  }
],
  calculate: calculateBMICalculator,
};

export default bmi_calculatorConfig;
