import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bandwidth_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Bandwidth Calculator — Download Time & Speed Converter",
  description: "Free online bandwidth calculator. Calculate download and upload time, convert Mbps to MB/s, estimate web hosting traffic, and simulate multi-device network speed.",
  slug: "bandwidth-calculator",
});
