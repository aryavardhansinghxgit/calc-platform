import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const golf_handicap_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Golf Handicap Calculator — WHS Index & Course Strokes",
  description: "Free online World Handicap System (WHS) golf handicap calculator. Calculate your Handicap Index from 1–20 rounds, Course Handicap, and Playing Handicap.",
  slug: "golf-handicap-calculator",
});
