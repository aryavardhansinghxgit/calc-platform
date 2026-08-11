import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const calories_burned_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Calories Burned Calculator – ACSM MET Database for 50+ Activities",
  description: "Calculate calories burned by duration or distance across 50+ physical activities (walking, running, cycling, swimming, HIIT, sports) with fat loss equivalents and food portion comparisons.",
  slug: "calories-burned-calculator",
});
