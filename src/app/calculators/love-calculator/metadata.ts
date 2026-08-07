import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const love_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Love Calculator — Free Online Calculator",
  description: "Calculate playful love compatibility percentage and match feedback between two names.",
  slug: "love-calculator",
});
