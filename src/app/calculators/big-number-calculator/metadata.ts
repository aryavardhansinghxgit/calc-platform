import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const big_number_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Big Number Calculator — Free Online Math Calculator",
  description: "Perform arbitrary precision integer arithmetic on extremely large numbers.",
  slug: "big-number-calculator",
});
