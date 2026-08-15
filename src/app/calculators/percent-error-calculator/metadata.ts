import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const percent_error_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Percent Error Calculator: Absolute, Relative & Signed Error",
  description: "Free percent error calculator for observed and true values. See absolute error, relative error, signed error, accuracy, worked steps, charts, saved runs, and CSV export.",
  slug: "percent-error-calculator",
});
