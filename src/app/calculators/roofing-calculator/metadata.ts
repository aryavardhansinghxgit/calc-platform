import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const roofing_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Roofing Calculator — Free Online Calculator",
  description: "Calculate roof surface area, roofing squares, and asphalt shingle bundle requirements.",
  slug: "roofing-calculator",
});
