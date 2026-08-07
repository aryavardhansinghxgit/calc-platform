import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const day_of_the_week_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Day of the Week Calculator — Free Online Calculator",
  description: "Determine what day of the week any past or future historical date falls on.",
  slug: "day-of-the-week-calculator",
});
