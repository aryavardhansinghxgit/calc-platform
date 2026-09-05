import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gcf_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "GCF Calculator – Greatest Common Factor, GCD & HCF",
    description: "Calculate the GCF, GCD or HCF of 2 or more numbers with prime factorization, Euclidean steps, common factors, Bézout identity and LCM.",
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
