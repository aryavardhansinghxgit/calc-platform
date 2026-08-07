import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const percent_error_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Percent Error Calculator — Free Online Math Calculator",
  description: "Calculate percent error between experimental results and accepted theoretical values.",
  slug: "percent-error-calculator",
});
