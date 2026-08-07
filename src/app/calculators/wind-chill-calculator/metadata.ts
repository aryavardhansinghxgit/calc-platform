import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const wind_chill_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Wind Chill Calculator — Free Online Calculator",
  description: "Calculate apparent wind chill temperature based on ambient temperature and wind speed.",
  slug: "wind-chill-calculator",
});
