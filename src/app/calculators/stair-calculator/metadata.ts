import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const stair_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Stair Calculator — Riser, Tread & Stringer Layout Suite",
  description:
    "Free online stair calculator compliant with IRC/IBC building codes. Calculate riser height, tread depth, stringer length, headroom opening, and lumber materials with 2D diagrams.",
  slug: "stair-calculator",
});
