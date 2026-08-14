import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gas_mileage_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Gas Mileage Calculator — MPG, L/100km & Fuel Economy",
  description: "Free online Gas Mileage Calculator. Calculate MPG, L/100km, multi-tank rolling averages, tank driving range, annual fuel spending & CO2 emissions.",
  slug: "gas-mileage-calculator",
});
