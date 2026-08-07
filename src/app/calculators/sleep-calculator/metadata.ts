import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const sleep_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Sleep Calculator — Free Online Calculator",
  description: "Calculate optimal bedtimes and wake times based on 90-minute natural sleep cycles.",
  slug: "sleep-calculator",
});
