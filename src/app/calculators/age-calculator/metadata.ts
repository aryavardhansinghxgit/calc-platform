import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const age_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Age Calculator — Exact Chronological Age & Date Interval Solver",
  description:
    "Free advanced Age Calculator & Date Interval Solver. Calculate exact age in years, months, days, hours, minutes, and seconds. Includes leap year edge cases, next birthday countdown, sub-unit duration matrix, zodiac signs, and planetary ages.",
  slug: "age-calculator",
  keywords: [
    "age calculator",
    "calculate age online",
    "chronological age calculator",
    "days between two dates",
    "date interval calculator",
    "exact age in days",
    "next birthday countdown",
    "age on mars calculator",
  ],
});
