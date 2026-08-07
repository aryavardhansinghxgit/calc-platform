import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gfr_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "GFR Calculator — Free Online Health Calculator",
  description: "Estimate Glomerular Filtration Rate (eGFR) and kidney health stage using CKD-EPI 2021 formula.",
  slug: "gfr-calculator",
});
