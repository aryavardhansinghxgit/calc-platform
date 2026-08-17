import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const lcm_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Least Common Multiple (LCM) Calculator with Steps",
    description: "Free online Least Common Multiple (LCM) Calculator & Factorization Suite. Calculate LCM and GCF for 2 to 15+ numbers with Prime Factorization, Division Grid (Ladder), GCF Formula, and Venn Diagrams.",
    slug: "lcm-calculator"
  }),
  keywords: [
    "Least Common Multiple Calculator",
    "LCM Calculator",
    "Find LCM with Steps",
    "Lowest Common Multiple",
    "LCM and GCF Calculator",
    "Least Common Denominator Calculator"
  ]
};
