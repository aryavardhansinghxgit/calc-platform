import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const roofing_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Roofing Calculator — Roof Area, Pitch, Squares & Cost",
  description:
    "Calculate roof area, pitch, roofing squares, shingle bundles, underlayment, fasteners and estimated replacement cost with step-by-step results.",
  slug: "roofing-calculator",
});
