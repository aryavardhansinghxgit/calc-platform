import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gdp_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "GDP Calculator — Free Online Calculator",
  description: "Calculate Gross Domestic Product (GDP) using the expenditure approach (C + I + G + NX).",
  slug: "gdp-calculator",
});
