import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ovulation_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Ovulation Calculator — Free Online Health Calculator",
  description: "Predict fertile window, ovulation day, and next period dates to maximize chances of conception.",
  slug: "ovulation-calculator",
});
