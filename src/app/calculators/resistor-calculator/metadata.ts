import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const resistor_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Resistor Calculator – Color Code, SMD, Series/Parallel & E-Series",
  description: "Calculate resistor values from color bands, SMD markings, series and parallel networks, conductor resistance, E-series values, tolerance and power.",
  slug: "resistor-calculator",
});
