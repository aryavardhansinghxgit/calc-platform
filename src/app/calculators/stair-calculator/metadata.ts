import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const stair_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Stair Calculator — Free Online Calculator",
  description: "Calculate stair riser height, tread depth, number of steps, and stringer angle for building code compliance.",
  slug: "stair-calculator",
});
