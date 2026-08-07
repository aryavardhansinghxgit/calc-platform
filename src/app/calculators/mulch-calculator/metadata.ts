import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const mulch_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Mulch Calculator — Free Online Calculator",
  description: "Calculate cubic yards and bag count of garden mulch for landscaping coverage.",
  slug: "mulch-calculator",
});
