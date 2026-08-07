import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const conception_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Conception Calculator — Free Online Health Calculator",
  description: "Calculate estimated date of conception and last menstrual period from your estimated due date.",
  slug: "conception-calculator",
});
