import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const hours_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Hours Calculator — Free Online Calculator",
  description: "Calculate total hours worked between start and end times minus break time.",
  slug: "hours-calculator",
});
