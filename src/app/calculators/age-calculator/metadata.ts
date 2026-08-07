import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const age_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Age Calculator — Free Online Calculator",
  description: "Calculate exact age in years, months, days, hours, and minutes from birth date.",
  slug: "age-calculator",
});
