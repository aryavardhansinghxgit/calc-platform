import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const calorie_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Calorie Calculator – Daily TDEE, BMR, Weight Loss & Zigzag Cycling",
  description: "Calculate your daily calorie needs, BMR (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle), TDEE maintenance, 7-day Zigzag calorie cycling schedules, macronutrient ratios, and food energy conversions.",
  slug: "calorie-calculator",
});
