import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const wind_chill_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Wind Chill Calculator — NWS Formula & Frostbite Timer",
  description: "Free online Wind Chill Calculator. Calculate wind chill using official NWS JAG/TI formulas, track real-time frostbite risk, and get winter PPE clothing advice.",
  slug: "wind-chill-calculator",
});
