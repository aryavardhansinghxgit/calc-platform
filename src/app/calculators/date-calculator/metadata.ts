import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const date_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Date Calculator - Days Between Dates, Add/Subtract & Business Days",
  description:
    "Calculate days between two dates, add or subtract days, weeks, months and years, and count business days with leap-year, month-end, weekend and holiday support.",
  slug: "date-calculator",
  keywords: [
    "date calculator",
    "days between dates calculator",
    "days calculator",
    "date difference calculator",
    "add days to date",
    "subtract days from date",
    "business days calculator",
    "working days calculator",
    "date duration calculator",
    "date interval calculator",
    "days between two dates",
    "calculate days between dates",
    "date add/subtract calculator",
    "holiday-aware business days calculator",
  ],
});
