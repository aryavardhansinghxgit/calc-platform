import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_zone_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Zone Converter — Global Meeting Planner & World Clock",
  description:
    "Free advanced Time Zone Converter. Convert time between global cities (UTC-12 to UTC+14), automatically calculate Daylight Saving Time (DST) shifts, and plan multi-city meetings with 3D world map.",
  slug: "time-zone-calculator",
  keywords: [
    "time zone calculator",
    "timezone converter",
    "utc converter",
    "gmt time converter",
    "world clock meeting planner",
    "est to gmt calculator",
    "convert timezones online",
    "daylight saving time converter",
  ],
});
