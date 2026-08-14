import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gpa_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "GPA Calculator: College Cumulative, Weighted AP & Target Planner",
  description: "Free College & High School GPA Calculator. Multi-term semester tracking, AP/IB weighted 5.0 scales, grade forgiveness retakes, Target GPA planner, and CGPA converter.",
  slug: "gpa-calculator",
});
