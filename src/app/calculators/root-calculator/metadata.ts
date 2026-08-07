import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const root_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Root Calculator — Free Online Math Calculator",
  description: "Calculate square roots, cube roots, and nth roots for any real positive number.",
  slug: "root-calculator",
});
