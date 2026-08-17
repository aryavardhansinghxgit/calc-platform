import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const speed_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Speed, Distance, Time & Pace Calculator — Kinematics & Race Splits",
  description:
    "Free online speed, distance, time, and running pace calculator. Calculate velocity (s = d/t), convert mph to km/h, compute marathon splits, and analyze multi-segment trip average speeds.",
  slug: "speed-calculator",
});
