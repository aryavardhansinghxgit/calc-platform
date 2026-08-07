import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const standard_deviation_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Standard Deviation Calculator — Free Online Math Calculator",
  description: "Calculate sample and population standard deviation, variance, mean, and range.",
  slug: "standard-deviation-calculator",
});
