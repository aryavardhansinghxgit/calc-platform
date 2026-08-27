import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_duration_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Duration Calculator – Calculate Hours, Minutes & Seconds Between Times",
  description:
    "Calculate elapsed time between two times or dates, add multiple time intervals, handle midnight and date changes, and convert durations into hours, minutes, and seconds.",
  slug: "time-duration-calculator",
  keywords: [
    "time duration calculator",
    "calculate hours between two times",
    "calculate elapsed time between two times and dates",
    "how to calculate time difference",
    "hours minutes seconds duration",
    "elapsed time calculator",
    "time interval solver",
    "time between two dates calculator",
  ],
});
