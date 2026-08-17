import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const mulch_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Mulch Calculator — Cubic Yards, Bags, Weight & Cost Estimator",
  description:
    "Free online mulch calculator for flower beds, tree rings, cubic yards, 2 cu ft bag requirements, bulk vs bagged price comparison, and truck payload safety.",
  slug: "mulch-calculator",
});
