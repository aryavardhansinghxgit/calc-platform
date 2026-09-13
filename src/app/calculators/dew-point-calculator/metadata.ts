import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const dew_point_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Dew Point Calculator – Humidity, Wet Bulb, Frost Point & Condensation",
  description:
    "Calculate dew point from temperature and humidity, or solve humidity from dew point. Includes wet-bulb, vapor pressure, absolute humidity, frost point, cloud-base and coating condensation screening.",
  slug: "dew-point-calculator",
});
