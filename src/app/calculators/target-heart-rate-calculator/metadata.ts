import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const target_heart_rate_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Target Heart Rate Calculator – Karvonen, Tanaka, Haskell & Borg Scales",
  description: "Calculate your Target Heart Rate (THR) zones using Karvonen HRR, Haskell & Fox, Tanaka, Nes formulas, and Borg RPE scales for fat loss, cardio, and endurance training.",
  slug: "target-heart-rate-calculator",
});
