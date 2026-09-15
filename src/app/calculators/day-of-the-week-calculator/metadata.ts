import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const day_of_the_week_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Day of the Week Calculator: What Day Was Any Date?",
  description:
    "Find the day of the week for any date, including birthdays and historical dates. Calculate day of year, ISO week, leap-year status and compare Gregorian and Julian calendars.",
  slug: "day-of-the-week-calculator",
  keywords: [
    "day of the week calculator",
    "what day was any date",
    "what day of the week was I born",
    "find day for date",
    "born on a monday calculator",
    "day of week finder",
    "zeller congruence solver",
    "proleptic julian calendar",
  ],
});
