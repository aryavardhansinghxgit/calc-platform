import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_zone_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Zone Calculator & Converter — World Clock & Meeting Planner",
  description:
    "Convert time between cities with DST-aware time zone calculations. Compare world clocks, check date changes, and find working-hour overlaps for international meetings.",
  slug: "time-zone-calculator",
  keywords: [
    "time zone calculator",
    "timezone converter",
    "utc converter",
    "gmt time converter",
    "world clock meeting planner",
    "convert time between time zones",
    "daylight saving time converter",
    "meeting planner grid",
    "iana time zone calculator",
  ],
});
