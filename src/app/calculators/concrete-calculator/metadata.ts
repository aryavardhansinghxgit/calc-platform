import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const concrete_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Concrete Calculator — Free Online Calculator",
  description: "Estimate concrete volume in cubic yards and pre-mixed bag quantities for slabs and footings.",
  slug: "concrete-calculator",
});
