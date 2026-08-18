import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const hours_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Hours Calculator — Calculate Hours Between Two Times & Dates",
  description:
    "Free advanced Hours Calculator. Calculate exact hours and minutes between two times, compute multi-day date durations, deduct unpaid breaks, and calculate overtime pay.",
  slug: "hours-calculator",
  keywords: [
    "hours calculator",
    "calculate hours between two times",
    "work hours calculator",
    "hours and minutes finder",
    "time card calculator",
    "hours between dates",
    "overtime hours calculator",
    "decimal hours calculator",
  ],
});
