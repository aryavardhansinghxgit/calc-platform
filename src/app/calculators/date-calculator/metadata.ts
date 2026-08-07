import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const date_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Date Calculator — Free Online Calculator",
  description: "Add or subtract days, weeks, months, or years from any given starting date.",
  slug: "date-calculator",
});
