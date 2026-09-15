import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const day_counter_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Day Counter Calculator: Days Between Dates & Business Days",
  description:
    "Calculate days between two dates, working days, weekends and U.S. federal holidays. Add or subtract days, check weekdays with Doomsday, and explore date-count conventions.",
  slug: "day-counter-calculator",
  keywords: [
    "day counter calculator",
    "days between dates",
    "business days calculator",
    "working days counter",
    "calendar days calculator",
    "conway doomsday rule calculator",
  ],
});
