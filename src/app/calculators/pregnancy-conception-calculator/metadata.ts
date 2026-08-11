import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const pregnancy_conception_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Pregnancy Conception Calculator — 7 Modes & Fertile Window Estimator",
  description:
    "Calculate your exact conception date, fertile intercourse window, ovulation day, and embryo implantation timing. Supports 7 calculation modes (Due Date, LMP, Ultrasound, Ovulation, Reverse, IVF) with interactive probability curves.",
  slug: "pregnancy-conception-calculator",
});

export default pregnancy_conception_calculatorMetadata;
