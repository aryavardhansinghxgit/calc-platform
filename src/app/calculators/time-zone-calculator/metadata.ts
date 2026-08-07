import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const time_zone_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Time Zone Calculator — Free Online Calculator",
  description: "Convert time between UTC/GMT and major global time zones.",
  slug: "time-zone-calculator",
});
