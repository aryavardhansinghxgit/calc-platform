import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const grade_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Grade Calculator: Weighted Percentage & Final Exam Target Solver",
  description: "Free Grade Calculator & Final Exam Target Solver. Calculate weighted category grades, total points, drop lowest scores, curved grades, and final exam targets.",
  slug: "grade-calculator",
});
