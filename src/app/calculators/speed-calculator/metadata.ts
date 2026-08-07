import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const speed_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Speed Calculator — Free Online Calculator",
  description: "Calculate speed, distance, or time from velocity equation v = d / t.",
  slug: "speed-calculator",
});
