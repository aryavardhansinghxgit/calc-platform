import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Calculator — Add & Subtract Time, Hours, Minutes, and Seconds",
  description:
    "Free advanced Time Calculator. Add and subtract days, hours, minutes, and seconds, parse multi-term time expressions, calculate date-time shifts, and track work shift hours with break deductions.",
  slug: "time-calculator",
  keywords: [
    "time calculator",
    "add hours and minutes",
    "subtract time",
    "time duration calculator",
    "time expression calculator",
    "add time to date",
    "hours and minutes calculator",
    "time math",
    "calculate time difference",
  ],
});
