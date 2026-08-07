import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const number_sequence_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Number Sequence Calculator — Free Online Math Calculator",
  description: "Calculate nth term and sum of arithmetic and geometric number sequences.",
  slug: "number-sequence-calculator",
});
