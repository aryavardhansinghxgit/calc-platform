import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const body_fat_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Body Fat Calculator – U.S. Navy Method, BMI, FFMI & Ideal Body Fat",
  description:
    "Calculate body fat percentage with the U.S. Navy and Deurenberg BMI formulas. Track lean mass, fat mass, FFMI, age-based target weight, and fat loss timelines.",
  slug: "body-fat-calculator",
});
