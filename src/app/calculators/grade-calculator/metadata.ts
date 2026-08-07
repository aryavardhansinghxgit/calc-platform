import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const grade_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Grade Calculator — Free Online Calculator",
  description: "Calculate overall class grade and required score on final exam to achieve target grade.",
  slug: "grade-calculator",
});
