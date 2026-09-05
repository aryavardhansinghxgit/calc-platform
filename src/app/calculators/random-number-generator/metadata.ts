import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const random_number_generatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Random Number Generator – Free Online Random Integer & Decimal Tool",
  description: "Generate random integers or high-precision decimal numbers within a chosen range. Create multiple values, visualize results, copy, and export CSV or JSON.",
  slug: "random-number-generator",
});
