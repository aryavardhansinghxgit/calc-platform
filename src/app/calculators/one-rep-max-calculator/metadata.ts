import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const one_rep_max_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "One Rep Max Calculator – Epley, Brzycki, Lombardi, Mayhew & Lander Formulas",
  description: "Calculate your One Rep Max (1RM) using 7 strength equations (Epley, Brzycki, Lombardi, Mayhew, O'Conner, Wathan, Lander) with 1RM to 12RM rep breakdown and training intensity zones.",
  slug: "one-rep-max-calculator",
});
