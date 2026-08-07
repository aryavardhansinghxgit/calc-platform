import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const voltage_drop_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Voltage Drop Calculator — Free Online Calculator",
  description: "Calculate electrical wire voltage drop percentage based on wire gauge, current, and distance.",
  slug: "voltage-drop-calculator",
});
