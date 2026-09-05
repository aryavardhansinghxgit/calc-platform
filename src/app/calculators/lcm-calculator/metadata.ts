import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const lcm_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "LCM Calculator – Least Common Multiple & GCF With Steps",
    description: "Calculate the LCM and GCF of 2 or more numbers with prime factorization, division ladder, Euclidean steps, multiples, Venn diagram, and LCD help.",
    slug: "lcm-calculator"
  }),
  keywords: [
    "lcm calculator",
    "least common multiple calculator",
    "lcm calculator with steps",
    "lcm and gcf calculator",
    "least common multiple of 2 numbers",
    "least common multiple of 3 numbers",
    "how to find lcm",
    "lcm using prime factorization",
    "lcm using gcf",
    "lcm for fractions",
    "least common denominator calculator",
    "gcf vs lcm",
    "lcm formula",
    "lcm division ladder"
  ]
};
