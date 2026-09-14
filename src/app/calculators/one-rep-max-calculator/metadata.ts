import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const one_rep_max_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "One Rep Max Calculator (1RM): Estimate Your Max & Training Weights",
  description: "Calculate your estimated one-rep max from weight and reps using Epley, Brzycki, Lombardi, Mayhew, O'Conner, Wathan and Lander formulas, then get training weights from 1RM percentages.",
  slug: "one-rep-max-calculator",
});

export default one_rep_max_calculatorMetadata;
