import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const gravel_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Gravel Calculator — Tons, Cubic Yards, Compaction & Cost Estimator",
  description:
    "Free online gravel calculator for driveways, French drains, crushed stone #57, crusher run, pea gravel, compaction settling, delivery budgeting, and multi-zone takeoff.",
  slug: "gravel-calculator",
});
