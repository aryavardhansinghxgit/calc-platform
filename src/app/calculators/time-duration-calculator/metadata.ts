import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_duration_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Duration Calculator — Hours, Minutes & Seconds Between Times",
  description:
    "Free advanced Time Duration Calculator. Calculate exact elapsed time between two times or dates, view step-by-step sexagesimal borrow solutions, and sum multi-segment intervals.",
  slug: "time-duration-calculator",
  keywords: [
    "time duration calculator",
    "calculate hours between two times",
    "how to calculate time difference",
    "hours minutes seconds duration",
    "elapsed time calculator",
    "time interval solver",
    "time between two dates calculator",
  ],
});
