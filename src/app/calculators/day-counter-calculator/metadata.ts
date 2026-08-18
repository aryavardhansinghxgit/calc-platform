import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const day_counter_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Day Counter — Days Between Dates & Business Days Calculator",
  description:
    "Free advanced Day Counter. Calculate exact calendar days, working days, weekends, and holidays between dates, count days from a date, and solve day of the week with Conway's Doomsday rule.",
  slug: "day-counter-calculator",
  keywords: [
    "day counter",
    "days between two dates",
    "calculate days from date",
    "business days counter",
    "workday duration calculator",
    "working days between dates",
    "conway doomsday rule calculator",
  ],
});
