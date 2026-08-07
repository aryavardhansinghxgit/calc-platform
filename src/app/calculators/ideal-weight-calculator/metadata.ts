import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ideal_weight_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Ideal Weight Calculator — Free Online Health Calculator",
  description: "Find your ideal body weight based on height and gender using Devine, Robinson, Miller, and Hamwi formulas.",
  slug: "ideal-weight-calculator",
});
