import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const dew_point_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Dew Point Calculator — Bidirectional Solver & Wet-Bulb",
  description: "Free online Dew Point Calculator. Calculate dew point, relative humidity, wet-bulb temp, frost point, Muggy Index comfort scale & ISO 8502-4 painting risk.",
  slug: "dew-point-calculator",
});
