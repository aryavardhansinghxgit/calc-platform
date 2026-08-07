import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const pace_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Pace Calculator — Free Online Health Calculator",
  description: "Calculate running or cycling pace per km, per mile, and total speed from distance and time.",
  slug: "pace-calculator",
});
