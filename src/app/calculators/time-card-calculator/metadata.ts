import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_card_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Card Calculator — Free Online Calculator",
  description: "Calculate weekly work hours, overtime, regular pay, and gross earnings.",
  slug: "time-card-calculator",
});
