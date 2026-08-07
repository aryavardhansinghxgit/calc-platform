import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const statistics_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Statistics Calculator — Free Online Math Calculator",
  description: "Calculate complete descriptive statistics summary including mean, median, mode, range, and variance.",
  slug: "statistics-calculator",
});
