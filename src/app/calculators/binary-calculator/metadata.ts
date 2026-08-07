import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const binary_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Binary Calculator — Free Online Math Calculator",
  description: "Perform binary arithmetic addition, subtraction, multiplication, and base conversions.",
  slug: "binary-calculator",
});
