import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const tire_size_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Tire Size Calculator — Free Online Calculator",
  description: "Calculate tire overall diameter, sidewall height, circumference, and speedometer error.",
  slug: "tire-size-calculator",
});
