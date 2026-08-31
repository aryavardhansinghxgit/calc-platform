import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ovulation_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Ovulation Calculator – Fertile Window, Ovulation Date & Conception Timing",
  description:
    "Estimate your ovulation date, 6-day fertile window, peak fertility days, implantation timing and expected period using cycle length and luteal-phase inputs.",
  slug: "ovulation-calculator",
});

export default ovulation_calculatorMetadata;
