import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bac_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "BAC Calculator — Free Online Health Calculator",
  description: "Estimate Blood Alcohol Concentration (BAC %) and time required to reach sobriety using Widmark formula.",
  slug: "bac-calculator",
});
