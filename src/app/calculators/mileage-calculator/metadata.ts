import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const mileage_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Mileage Calculator – MPG, L/100km, km/L, MPGe & Mileage Cost",
  description: "Calculate gas mileage, MPG, L/100km, km/L, trip fuel cost, IRS mileage reimbursement, multi-fill-up averages, EV MPGe and driving efficiency.",
  slug: "mileage-calculator",
});
