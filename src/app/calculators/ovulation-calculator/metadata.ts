import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ovulation_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Ovulation Calculator & Fertility Tracker — 6 Modes & Interactive Calendar",
  description:
    "Predict your peak ovulation date, 6-day fertile window, daily fertility score, and 35-day interactive calendar. Features 6 calculation modes and Shettles gender timing optimization.",
  slug: "ovulation-calculator",
});

export default ovulation_calculatorMetadata;
