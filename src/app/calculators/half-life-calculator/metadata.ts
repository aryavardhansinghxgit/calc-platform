import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const half_life_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Half-Life Calculator – Radioactive Decay, Half-Life & Time",
  description:
    "Calculate radioactive decay, remaining quantity, initial amount, half-life, or elapsed time with our free Half-Life Calculator. Includes decay graphs, 10 isotope presets, decay constant, mean lifetime, step-by-step formulas, and scientific notation.",
  slug: "half-life-calculator",
});

export default half_life_calculatorMetadata;
