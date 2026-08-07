import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_duration_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Duration Calculator — Free Online Calculator",
  description: "Calculate exact elapsed duration in days, hours, and minutes between two dates & times.",
  slug: "time-duration-calculator",
});
