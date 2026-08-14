import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const fuel_cost_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Fuel Cost Calculator — Road Trips, Commutes & EV vs Gas",
  description: "Free online Fuel Cost Calculator. Calculate trip gas costs, split passenger expenses, project monthly commute budgets & compare EV vs gas savings.",
  slug: "fuel-cost-calculator",
});
