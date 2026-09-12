import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const tire_size_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Tire Size Calculator – Compare Tire Sizes, Diameter, Speedometer & Fitment",
  description:
    "Compare tire sizes and calculate diameter, sidewall, circumference, revs per mile, speedometer error, offset, backspacing and gear-ratio effects.",
  slug: "tire-size-calculator",
});
