import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const circle_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Circle Calculator — Free Online Math Calculator",
  description: "Calculate circle radius, diameter, circumference, and area from any single known dimension.",
  slug: "circle-calculator",
});
