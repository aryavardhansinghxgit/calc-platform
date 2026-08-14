import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const tip_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Tip Calculator — Split Bills, Pre-Tax Tipping & Global Matrix",
  description: "Free online tip calculator. Calculate tips pre-tax or post-tax, split restaurant bills evenly or itemized by diner, and inspect global tipping customs across 50+ countries.",
  slug: "tip-calculator",
});
