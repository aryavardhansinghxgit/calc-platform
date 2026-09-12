import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const wind_chill_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Wind Chill Calculator – NWS Formula, Frostbite Risk & Wind Chill Chart",
  description: "Calculate wind chill with the NWS formula, compare temperature and wind, estimate frostbite exposure risk, and explore an interactive wind chill chart.",
  slug: "wind-chill-calculator",
});
