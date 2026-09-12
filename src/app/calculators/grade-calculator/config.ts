import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateGradeCalculator } from "./calculator";
import { grade_calculatorFaqs } from "./faq";
import { GradeCalculator } from "@/components/calculator/grade/GradeCalculator";
import { GradeContent } from "@/components/calculator/grade/GradeContent";

export const grade_calculatorConfig: CalculatorModuleDefinition = {
  id: "grade-calculator",
  title: "Grade Calculator – Weighted Grade, Final Exam Target & GPA",
  slug: "grade-calculator",
  category: "other",
  subcategory: "Science & Education",
  description:
    "Calculate weighted grades, total points, dropped scores and final exam targets. See your letter grade and GPA reference with an easy course grade calculator.",
  iconName: "FileCheck",
  featured: true,
  keywords: [
    "grade calculator",
    "weighted grade calculator",
    "final grade calculator",
    "final exam grade calculator",
    "what grade do I need on my final",
    "weighted average grade calculator",
    "points based grade calculator",
    "drop lowest grade calculator",
    "grading curve calculator",
    "exam grade calculator",
    "course grade calculator",
    "current grade calculator",
    "GPA calculator",
    "percentage to letter grade",
  ],
  priority: 1,
  CustomComponent: GradeCalculator,
  ContentComponent: GradeContent,
  relatedCalculators: [
    "gpa-calculator",
    "percentage-calculator",
    "hours-calculator",
    "statistics-calculator",
  ],
  formulaDescription:
    "Weighted Grade = Σ(Grade × Weight) / Σ(Weight) | Required Final = [Target - Current × (1 - Weight)] / Weight",
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
