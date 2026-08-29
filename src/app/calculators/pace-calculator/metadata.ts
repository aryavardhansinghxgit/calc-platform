import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const pace_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Pace Calculator – Running Pace, Speed, Race Time & Heart Rate Zones",
  description:
    "Calculate running pace, finish time, distance and speed per km or mile. Compare split times, predict 5K to marathon performances with Riegel's formula, and estimate heart-rate training zones.",
  slug: "pace-calculator",
});
