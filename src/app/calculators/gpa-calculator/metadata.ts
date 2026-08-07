import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gpa_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "GPA Calculator — Free Online Calculator",
  description: "Calculate Grade Point Average (GPA) on a 4.0 scale from course grades and credit hours.",
  slug: "gpa-calculator",
});
