import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGradeCalculator } from "./calculator";
import { grade_calculatorFaqs } from "./faq";

export const grade_calculatorConfig: CalculatorModuleDefinition = {
  id: "grade-calculator",
  title: "Grade Calculator & Final Exam Target Solver",
  slug: "grade-calculator",
  category: "other",
  subcategory: "Academic & Education",
  description: "Next-Gen Grade Calculator. Calculate weighted category grades, total points, drop lowest N scores, what-if scenario simulation, and solve required final exam scores.",
  iconName: "FileCheck",
  featured: true,
  keywords: [
    "grade calculator",
    "final exam calculator",
    "weighted grade calculator",
    "what do i need on my final exam",
    "total points grade calculator",
    "drop lowest score calculator",
    "grading curve calculator",
    "class grade calculator",
    "gpa grade converter",
    "syllabus grade calculator"
  ],
  priority: 1,
  relatedCalculators: ["gpa-calculator", "hours-calculator", "percentage-calculator"],
  formulaDescription: "Weighted Grade = Σ(Grade × Weight) / Σ(Weight) | Required Final = [Target - Current × (1 - Weight)] / Weight",
  faqs: grade_calculatorFaqs,
  inputs: [
    {
      name: "mode",
      label: "Grading System Mode",
      type: "select",
      defaultValue: "weighted",
      options: [
        { label: "Weighted Grade Mode (Percentage System)", value: "weighted" },
        { label: "Total Points Mode (Points System)", value: "points" },
        { label: "Final Exam Target Solver", value: "final_solver" },
        { label: "Custom Scale & Letter Grade Converter", value: "scale_converter" },
      ],
    },
    {
      name: "currentGrade",
      label: "Current Course Grade (%)",
      type: "number",
      defaultValue: 85,
      min: 0,
      max: 100,
    },
    {
      name: "targetGrade",
      label: "Desired Target Grade (%)",
      type: "number",
      defaultValue: 90,
      min: 0,
      max: 100,
    },
    {
      name: "finalExamWeight",
      label: "Final Exam Weight (%)",
      type: "number",
      defaultValue: 20,
      min: 1,
      max: 99,
    },
  ],
  outputs: [
    {
      name: "overallGrade",
      label: "Overall Course Grade (%)",
      format: "number",
      highlight: true,
    },
    {
      name: "letterGrade",
      label: "Letter Grade Equivalent",
      format: "text",
    },
    {
      name: "performanceStatus",
      label: "Academic Performance Status",
      format: "text",
    },
  ],
  calculate: calculateGradeCalculator,
};

export default grade_calculatorConfig;
