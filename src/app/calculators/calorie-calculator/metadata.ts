import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const calorie_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Calorie Calculator – Daily Intake, TDEE, Deficit & Macro Planner",
  description:
    "Calculate your estimated daily calorie needs for weight loss, maintenance, or weight gain using BMR, TDEE, activity level, and goal-based calorie targets.",
  slug: "calorie-calculator",
  keywords: [
    "calorie calculator",
    "daily calorie calculator",
    "calorie intake calculator",
    "calorie needs calculator",
    "calorie deficit calculator",
    "maintenance calorie calculator",
    "tdee calculator",
    "bmr calculator",
  ],
});
