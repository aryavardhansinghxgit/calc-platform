import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const sleep_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Sleep Calculator – Bedtime, Wake Time, Sleep Debt & Nap Planner",
  description: "Use a sleep calculator to plan bedtime and wake times, estimate sleep duration, track weekly sleep deficit, plan naps and explore a simple chronotype profile.",
  slug: "sleep-calculator",
});

