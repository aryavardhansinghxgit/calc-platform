import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const mean_median_mode_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Mean Median Mode Calculator: Find Average, Median, Mode & Range",
  description: "Calculate mean, median, mode and range from raw data. Also find weighted, geometric, harmonic and trimmed means, grouped-data averages, target scores, dataset comparisons, outliers and skewness with step-by-step results.",
  slug: "mean-median-mode-calculator",
});

export default mean_median_mode_calculatorMetadata;
