import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const day_counter_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Day Counter — Free Online Calculator",
  description: "Count exact total calendar days and business days between two dates.",
  slug: "day-counter-calculator",
});
