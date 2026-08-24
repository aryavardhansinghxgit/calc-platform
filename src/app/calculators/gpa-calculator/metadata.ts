import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gpa_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "GPA Calculator - College, Cumulative, Weighted & Target GPA",
  description: "Calculate semester and cumulative GPA, weighted high school GPA, target GPA requirements, and illustrative international scale conversions with a detailed academic planning calculator.",
  slug: "gpa-calculator",
});
