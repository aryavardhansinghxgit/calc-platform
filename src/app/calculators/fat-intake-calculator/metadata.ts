import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const fat_intake_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Fat Intake Calculator — Free Online Health Calculator",
  description: "Calculate total daily dietary fat requirements, saturated fat limits, and healthy fat distribution.",
  slug: "fat-intake-calculator",
});
