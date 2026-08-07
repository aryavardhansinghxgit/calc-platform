import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculatePregnancyWeightGainCalculator } from "./calculator";
import { pregnancy_weight_gain_calculatorFaqs } from "./faq";

export const pregnancy_weight_gain_calculatorConfig: CalculatorModuleDefinition = {
  id: "pregnancy-weight-gain-calculator",
  title: "Pregnancy Weight Gain Calculator",
  slug: "pregnancy-weight-gain-calculator",
  category: "Health",
  subcategory: "Pregnancy",
  description: "Calculate healthy weight gain targets by week of pregnancy based on Institute of Medicine (IOM) guidelines.",
  iconName: "TrendingUp",
  featured: true,
  keywords: ["pregnancy weight gain","maternal weight","iom guidelines","pregnancy bmi"],
  priority: 1,
  relatedCalculators: ["pregnancy-calculator","bmi-calculator"],
  formulaDescription: "Based on Institute of Medicine (IOM) pre-pregnancy BMI weight gain targets.",
  faqs: pregnancy_weight_gain_calculatorFaqs,
  inputs: [
  {
    "name": "preWeightKg",
    "label": "Pre-Pregnancy Weight (kg)",
    "type": "number",
    "defaultValue": 62,
    "min": 30,
    "max": 200,
    "step": 0.5
  },
  {
    "name": "heightCm",
    "label": "Height (cm)",
    "type": "number",
    "defaultValue": 165,
    "min": 120,
    "max": 220,
    "step": 1
  },
  {
    "name": "week",
    "label": "Current Pregnancy Week",
    "type": "number",
    "defaultValue": 20,
    "min": 1,
    "max": 40,
    "step": 1
  }
],
  outputs: [
  {
    "name": "preBmi",
    "label": "Pre-Pregnancy BMI",
    "format": "number"
  },
  {
    "name": "recommendedGainTotal",
    "label": "Recommended Total Weight Gain",
    "format": "text",
    "highlight": true
  },
  {
    "name": "targetGainWeek",
    "label": "Target Gain for Current Week",
    "format": "text"
  }
],
  calculate: calculatePregnancyWeightGainCalculator,
};

export default pregnancy_weight_gain_calculatorConfig;
