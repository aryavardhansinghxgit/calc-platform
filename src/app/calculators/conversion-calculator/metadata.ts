import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const conversion_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Conversion Calculator — Universal Multi-Category Unit Converter",
  description:
    "Free online conversion calculator for length, temperature, area, volume, weight, time, speed, pressure, energy, power, data, and fuel economy with live unit matrix and multiplier formulas.",
  slug: "conversion-calculator",
});
