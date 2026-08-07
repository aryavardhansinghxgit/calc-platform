import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bandwidth_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Bandwidth Calculator — Free Online Calculator",
  description: "Calculate file download and upload duration based on network bandwidth speed.",
  slug: "bandwidth-calculator",
});
