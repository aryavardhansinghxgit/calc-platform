import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const square_footage_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Square Footage Calculator — Free Online Calculator",
  description: "Calculate total floor, wall, or land square footage and estimated material costs.",
  slug: "square-footage-calculator",
});
