import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const mileage_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Mileage Calculator — Free Online Calculator",
  description: "Calculate business trip mileage reimbursement and travel driving expenses.",
  slug: "mileage-calculator",
});
