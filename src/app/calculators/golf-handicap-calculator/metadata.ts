import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const golf_handicap_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Golf Handicap Calculator — Free Online Calculator",
  description: "Calculate World Handicap System (WHS) golf score differentials and handicap index.",
  slug: "golf-handicap-calculator",
});
