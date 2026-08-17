import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const roofing_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Roofing Calculator — Pitch, Squares, Bundles & Cost Suite",
  description:
    "Free online roofing calculator for pitch slope multiplier, true roof surface area, roofing squares, shingle bundles, underlayment rolls, and contractor replacement costs.",
  slug: "roofing-calculator",
});
