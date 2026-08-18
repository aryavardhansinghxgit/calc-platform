import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const date_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Date Calculator — Days Between Dates & Add/Subtract Days Solver",
  description:
    "Free advanced Date Calculator. Calculate exact days between two dates, add or subtract days/weeks/months/years, and calculate business working days with holiday and leap year rules.",
  slug: "date-calculator",
  keywords: [
    "date calculator",
    "days between dates",
    "add days to date",
    "subtract days from date",
    "business day calculator",
    "working days calculator",
    "date difference calculator",
    "calendar calculator",
    "how many days until",
    "add business days to date",
  ],
});
