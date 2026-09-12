import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gpa_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "GPA Calculator – Calculate Semester, Cumulative & Weighted GPA",
  description: "Calculate semester and cumulative GPA from grades and credits, estimate weighted high school GPA, solve target GPA requirements, and explore international GPA mappings.",
  slug: "gpa-calculator",
});
