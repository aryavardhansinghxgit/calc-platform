import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const pregnancy_conception_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Pregnancy Conception Calculator – Conception Date, Fertile Window & Due Date",
  description:
    "Estimate conception, ovulation, fertile-window timing and due dates from your cycle, ultrasound, conception or IVF dates with a clear pregnancy timeline.",
  slug: "pregnancy-conception-calculator",
});

export default pregnancy_conception_calculatorMetadata;
