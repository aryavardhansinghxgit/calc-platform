import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const tip_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Tip Calculator — Calculate Tip, Tax, Split Bills & Itemized Shares",
  description:
    "Calculate tips before or after tax, split restaurant bills evenly or by item, share appetizers, apply smart rounding, and generate a clear receipt summary.",
  slug: "tip-calculator",
});
