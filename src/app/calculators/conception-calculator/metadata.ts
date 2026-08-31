import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const conception_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Conception Calculator: Estimate Conception Date & Fertile Window",
  description:
    "Estimate your conception date, ovulation, fertile window, implantation timing and due date using LMP, ovulation, ultrasound, IVF or reverse due-date information.",
  slug: "conception-calculator",
});

export default conception_calculatorMetadata;
