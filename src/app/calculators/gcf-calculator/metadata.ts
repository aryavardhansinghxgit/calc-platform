import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gcf_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Greatest Common Factor (GCF) Calculator — Free Online Math Calculator",
  description: "Calculate the Greatest Common Factor (GCF / HCF) of multiple integers.",
  slug: "gcf-calculator",
});
