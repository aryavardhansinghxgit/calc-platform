import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ohms_law_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Ohm's Law Calculator — Free Online Calculator",
  description: "Calculate Voltage V, Current I, Resistance R, and Electrical Power P.",
  slug: "ohms-law-calculator",
});
