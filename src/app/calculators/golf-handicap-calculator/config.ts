import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGolfHandicapCalculator } from "./calculator";
import { golf_handicap_calculatorFaqs } from "./faq";

export const golf_handicap_calculatorConfig: CalculatorModuleDefinition = {
  id: "golf-handicap-calculator",
  title: "Golf Handicap Calculator",
  slug: "golf-handicap-calculator",
  category: "other",
  subcategory: "Everyday Utility",
  description: "Calculate World Handicap System (WHS) golf score differentials and handicap index.",
  iconName: "Trophy",
  featured: true,
  keywords: ["golf handicap","whs handicap","golf score differential","handicap index"],
  priority: 1,
  relatedCalculators: ["gpa-calculator"],
  formulaDescription: "Score Differential = (Adjusted Score - Course Rating) × (113 / Slope Rating)",
  faqs: golf_handicap_calculatorFaqs,
  inputs: [
  {
    "name": "adjustedScore",
    "label": "Adjusted Gross Score",
    "type": "number",
    "defaultValue": 85,
    "min": 50,
    "max": 150,
    "step": 1
  },
  {
    "name": "courseRating",
    "label": "Course Rating",
    "type": "number",
    "defaultValue": 72.1,
    "min": 50,
    "max": 90,
    "step": 0.1
  },
  {
    "name": "slopeRating",
    "label": "Slope Rating",
    "type": "number",
    "defaultValue": 125,
    "min": 55,
    "max": 155,
    "step": 1
  }
],
  outputs: [
  {
    "name": "differential",
    "label": "Score Differential",
    "format": "number",
    "highlight": true
  },
  {
    "name": "handicapIndex",
    "label": "Estimated Handicap Index",
    "format": "number"
  }
],
  calculate: calculateGolfHandicapCalculator,
};

export default golf_handicap_calculatorConfig;
