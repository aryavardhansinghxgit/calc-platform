import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const btu_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "BTU Calculator — Free Online Calculator",
  description: "Calculate required heating and air conditioning cooling BTU output for a room.",
  slug: "btu-calculator",
});
