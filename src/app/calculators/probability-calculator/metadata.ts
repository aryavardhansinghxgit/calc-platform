import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const probability_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Probability Calculator — Single & Multiple Events, Bayes' Theorem & Odds",
    description: "Free online Probability Calculator & Combinatorics Suite. Calculate single, two-event (independent, mutually exclusive), and multi-trial probabilities, Bayes' theorem, Binomial & Poisson distributions, and odds with SVG Venn diagrams.",
    slug: "probability-calculator"
  }),
  keywords: [
    "Probability Calculator",
    "Probability of A and B",
    "Odds Calculator",
    "Binomial Probability Calculator",
    "Bayes Theorem Calculator",
    "Dice Probability Calculator",
    "Conditional Probability Calculator"
  ]
};
