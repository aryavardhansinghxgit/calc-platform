import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const day_of_the_week_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Day of the Week Calculator — What Day Was I Born?",
  description:
    "Free advanced Day of the Week Calculator. Find the exact day of the week for any date in history with Zeller's congruence, live monthly calendar view, and planetary etymology.",
  slug: "day-of-the-week-calculator",
  keywords: [
    "day of the week calculator",
    "what day of the week was I born",
    "find day for date",
    "born on a monday calculator",
    "day of week finder",
    "zeller congruence solver",
  ],
});
