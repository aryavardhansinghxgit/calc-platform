import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const fuel_cost_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Fuel Cost Calculator — Free Online Calculator",
  description: "Calculate total trip gas cost, gallons needed, and cost per mile for road trips.",
  slug: "fuel-cost-calculator",
});
