import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const weight_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Weight Calculator — Free Online Calculator",
  description: "Calculate weight force W = m × g on Earth, Moon, Mars, and convert weight units.",
  slug: "weight-calculator",
});
