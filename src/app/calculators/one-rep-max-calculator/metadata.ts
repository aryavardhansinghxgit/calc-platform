import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const one_rep_max_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "One Rep Max Calculator — Free Online Health Calculator",
  description: "Calculate your 1RM (One Rep Max) for weightlifting using Epley, Brzycki, and Lander formulas.",
  slug: "one-rep-max-calculator",
});
