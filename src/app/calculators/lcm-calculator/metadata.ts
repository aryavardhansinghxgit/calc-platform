import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const lcm_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Least Common Multiple (LCM) Calculator — Free Online Math Calculator",
  description: "Find the Least Common Multiple (LCM) of two or three numbers instantly.",
  slug: "lcm-calculator",
});
