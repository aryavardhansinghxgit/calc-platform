import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGradeCalculator } from "./calculator";
import { grade_calculatorFaqs } from "./faq";

export const grade_calculatorConfig: CalculatorModuleDefinition = {
  id: "grade-calculator",
  title: "Grade Calculator",
  slug: "grade-calculator",
  category: "other",
  subcategory: "Everyday Utility",
  description: "Calculate overall class grade and required score on final exam to achieve target grade.",
  iconName: "FileCheck",
  featured: true,
  keywords: ["grade calculator","final exam grade","target grade"],
  priority: 1,
  relatedCalculators: ["gpa-calculator"],
  formulaDescription: "Required Final = [Target - Current × (1 - Weight)] / Weight",
  faqs: grade_calculatorFaqs,
  inputs: [
  {
    "name": "currentGrade",
    "label": "Current Grade (%)",
    "type": "number",
    "defaultValue": 85,
    "min": 0,
    "max": 100,
    "step": 1
  },
  {
    "name": "targetGrade",
    "label": "Desired Grade (%)",
    "type": "number",
    "defaultValue": 90,
    "min": 0,
    "max": 100,
    "step": 1
  },
  {
    "name": "finalWeight",
    "label": "Final Exam Weight (%)",
    "type": "number",
    "defaultValue": 20,
    "min": 1,
    "max": 50,
    "step": 5
  }
],
  outputs: [
  {
    "name": "requiredFinalScore",
    "label": "Required Score on Final Exam",
    "format": "percentage",
    "highlight": true
  },
  {
    "name": "verdict",
    "label": "Feasibility Status",
    "format": "text"
  }
],
  calculate: calculateGradeCalculator,
};

export default grade_calculatorConfig;
