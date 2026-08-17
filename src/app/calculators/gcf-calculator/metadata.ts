import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gcf_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Greatest Common Factor (GCF) Calculator with Steps",
    description: "Free online Greatest Common Factor (GCF) Calculator & Factorization Suite. Calculate GCF, GCD, HCF, and LCM for 2 to 15+ numbers with Prime Factorization, Euclidean Algorithm, Division Grid, Bézout Identity, and Venn Diagrams.",
    slug: "gcf-calculator"
  }),
  keywords: [
    "Greatest Common Factor Calculator",
    "GCF Calculator",
    "GCD Calculator",
    "HCF Calculator",
    "Highest Common Factor",
    "Euclidean Algorithm Calculator"
  ]
};
