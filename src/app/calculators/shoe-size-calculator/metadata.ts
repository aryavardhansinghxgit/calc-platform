import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const shoe_size_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Shoe Size Conversion Calculator — Free Online Calculator",
  description: "Convert foot length into international shoe sizes (US, UK, EU, CM).",
  slug: "shoe-size-calculator",
});
