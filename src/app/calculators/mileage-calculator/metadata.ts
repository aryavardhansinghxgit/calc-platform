import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const mileage_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Mileage Calculator: MPG, IRS Tax Claim & EV MPGe",
  description: "Free Mileage Calculator. Calculate gas mileage (MPG, L/100km), IRS business tax deductions ($0.67/mi), multi-fill-up fleet logs, and EV MPGe equivalents.",
  slug: "mileage-calculator",
});
