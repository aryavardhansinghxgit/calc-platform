import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateTargetHeartRateCalculator } from "./calculator";
import { target_heart_rate_calculatorFaqs } from "./faq";

export const target_heart_rate_calculatorConfig: CalculatorModuleDefinition = {
  id: "target-heart-rate-calculator",
  title: "Target Heart Rate Calculator",
  slug: "target-heart-rate-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Determine heart rate zones (moderate, vigorous, peak) for cardio training using Karvonen formula.",
  iconName: "HeartPulse",
  featured: true,
  keywords: ["target heart rate","heart rate zones","cardio","max heart rate","pulse"],
  priority: 1,
  relatedCalculators: ["pace-calculator","calories-burned-calculator"],
  formulaDescription: "Max HR = 208 - (0.7 × Age); Target HR = Resting HR + (HRR × Intensity)",
  faqs: target_heart_rate_calculatorFaqs,
  inputs: [
  {
    "name": "age",
    "label": "Age",
    "type": "number",
    "defaultValue": 30,
    "min": 10,
    "max": 100,
    "step": 1
  },
  {
    "name": "restingHR",
    "label": "Resting Heart Rate (bpm)",
    "type": "number",
    "defaultValue": 65,
    "min": 30,
    "max": 120,
    "step": 1
  }
],
  outputs: [
  {
    "name": "maxHR",
    "label": "Max Heart Rate",
    "format": "number",
    "highlight": true,
    "unit": "bpm"
  },
  {
    "name": "moderateZone",
    "label": "Moderate Zone (50-70%)",
    "format": "text"
  },
  {
    "name": "vigorousZone",
    "label": "Vigorous Zone (70-85%)",
    "format": "text"
  },
  {
    "name": "peakZone",
    "label": "Peak Zone (85-100%)",
    "format": "text"
  }
],
  calculate: calculateTargetHeartRateCalculator,
};

export default target_heart_rate_calculatorConfig;
