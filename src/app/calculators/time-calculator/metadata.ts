import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Calculator — Free Online Calculator",
  description: "Add and subtract time durations in hours, minutes, and seconds.",
  slug: "time-calculator",
});
