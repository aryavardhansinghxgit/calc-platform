import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateOneRepMaxCalculator } from "./calculator";
import { one_rep_max_calculatorFaqs } from "./faq";

export const one_rep_max_calculatorConfig: CalculatorModuleDefinition = {
  id: "one-rep-max-calculator",
  title: "One Rep Max Calculator",
  slug: "one-rep-max-calculator",
  category: "Health",
  subcategory: "Fitness",
  description: "Calculate your 1RM (One Rep Max) for weightlifting using Epley, Brzycki, and Lander formulas.",
  iconName: "BarChart",
  featured: true,
  keywords: ["one rep max","1rm","bench press","squat","deadlift","weightlifting"],
  priority: 1,
  relatedCalculators: ["target-heart-rate-calculator","calories-burned-calculator"],
  formulaDescription: "Epley 1RM = Weight × (1 + Reps/30)",
  faqs: one_rep_max_calculatorFaqs,
  inputs: [
  {
    "name": "weightLiftedKg",
    "label": "Weight Lifted (kg)",
    "type": "number",
    "defaultValue": 80,
    "min": 1,
    "max": 500,
    "step": 2.5
  },
  {
    "name": "reps",
    "label": "Repetitions Performed",
    "type": "number",
    "defaultValue": 5,
    "min": 1,
    "max": 15,
    "step": 1
  }
],
  outputs: [
  {
    "name": "epley1RM",
    "label": "Estimated 1RM (Epley)",
    "format": "number",
    "highlight": true,
    "unit": "kg"
  },
  {
    "name": "brzycki1RM",
    "label": "Estimated 1RM (Brzycki)",
    "format": "number",
    "unit": "kg"
  },
  {
    "name": "percent85",
    "label": "85% of 1RM (~6 reps)",
    "format": "number",
    "unit": "kg"
  },
  {
    "name": "percent75",
    "label": "75% of 1RM (~10 reps)",
    "format": "number",
    "unit": "kg"
  }
],
  calculate: calculateOneRepMaxCalculator,
};

export default one_rep_max_calculatorConfig;
