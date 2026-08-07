import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gas_mileage_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Gas Mileage Calculator — Free Online Calculator",
  description: "Calculate vehicle fuel efficiency in MPG, L/100km, and km/L from odometer fill-ups.",
  slug: "gas-mileage-calculator",
});
