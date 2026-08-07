import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const tip_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Tip Calculator — Free Online Calculator",
  description: "Calculate tip amount, total restaurant bill, and split bill per person.",
  slug: "tip-calculator",
});
