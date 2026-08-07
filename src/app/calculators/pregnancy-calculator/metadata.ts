import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const pregnancy_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Pregnancy Calculator — Free Online Health Calculator",
  description: "Track pregnancy milestone dates, gestational age in weeks & days, trimester, and estimated due date.",
  slug: "pregnancy-calculator",
});
