import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const body_fat_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Body Fat Calculator – U.S. Navy Method, Ideal BFP & FFMI Analysis",
  description: "Calculate your Body Fat Percentage (BFP), Lean Body Mass, Fat Mass, FFMI index, ACE fitness categories, and Jackson & Pollock ideal body fat standards using the U.S. Navy and BMI methods.",
  slug: "body-fat-calculator",
});
