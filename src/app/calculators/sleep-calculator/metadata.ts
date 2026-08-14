import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const sleep_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Sleep Calculator — Bedtimes, 90-Min Cycles & Power Naps",
  description: "Free online sleep calculator. Calculate optimal bedtimes & wake-up times from 90-minute ultradian cycles, calibrate sleep latency, track sleep debt & test your chronotype.",
  slug: "sleep-calculator",
});
