import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const period_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Period Calculator — Free Online Health Calculator",
  description: "Predict upcoming menstrual cycles, period start dates, fertile days, and ovulation timing.",
  slug: "period-calculator",
});
