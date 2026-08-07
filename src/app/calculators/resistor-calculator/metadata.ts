import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const resistor_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Resistor Calculator — Free Online Calculator",
  description: "Decode 4-band resistor color codes to calculate resistance value and tolerance.",
  slug: "resistor-calculator",
});
