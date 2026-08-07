import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const random_number_generatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Random Number Generator — Free Online Math Calculator",
  description: "Generate bounded pseudo-random integers or floating point numbers instantly.",
  slug: "random-number-generator",
});
