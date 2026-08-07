import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const mean_median_mode_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Mean, Median, Mode & Range Calculator — Free Online Math Calculator",
  description: "Calculate central tendency metrics (Mean, Median, Mode) and dispersion Range for data sets.",
  slug: "mean-median-mode-calculator",
});
