import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const conversion_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Conversion Calculator — Free Online Calculator",
  description: "Universal unit converter for length, mass, volume, temperature, and speed.",
  slug: "conversion-calculator",
});
