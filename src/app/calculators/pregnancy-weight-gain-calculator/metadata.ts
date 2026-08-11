import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const pregnancy_weight_gain_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Pregnancy Weight Gain Calculator — IOM & ACOG Week-by-Week Guide",
  description:
    "Calculate personalized, healthy weight gain targets by week of pregnancy based on Institute of Medicine (IOM) & ACOG guidelines. Features 40-week weight schedule, interactive charts, weight composition breakdown, and trimester nutritional targets for single and twin gestations.",
  slug: "pregnancy-weight-gain-calculator",
});

export default pregnancy_weight_gain_calculatorMetadata;
