import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const z_score_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Z-Score Calculator: Find Z-Scores, Percentiles & Normal Probabilities",
  description: "Calculate z-scores, percentiles, left and right-tail probabilities, critical z-values, interval probabilities, and batch z-scores with step-by-step results.",
  slug: "z-score-calculator",
});

export default z_score_calculatorMetadata;
