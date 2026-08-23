import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Calculator – Add, Subtract, Duration & Work Hours",
  description:
    "Add and subtract time, shift dates by hours or days, evaluate time expressions, calculate work duration and convert time between days, hours, minutes and seconds.",
  slug: "time-calculator",
  keywords: [
    "time calculator",
    "time duration calculator",
    "add time calculator",
    "subtract time calculator",
    "hours and minutes calculator",
    "time difference calculator",
    "calculate hours between times",
    "time card calculator",
    "work hours calculator",
    "add hours minutes seconds",
    "subtract hours minutes seconds",
    "date time calculator",
    "time expression calculator",
    "duration calculator",
    "decimal hours calculator",
    "time calculator with seconds",
  ],
});
