import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bra_size_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Bra Size Calculator — Free Online Calculator",
  description: "Calculate bra band size and cup size based on snug underbust and full bust measurements.",
  slug: "bra-size-calculator",
});
