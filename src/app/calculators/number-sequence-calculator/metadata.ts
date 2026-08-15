import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const number_sequence_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Number Sequence Calculator — Arithmetic, Geometric & Pattern Solver",
    description: "Free online Number Sequence Calculator & Series Suite. Automatically detect sequence patterns (Arithmetic, Geometric, Quadratic, Fibonacci), find explicit formulas, generate 2D graphs, and finite difference tables.",
    slug: "number-sequence-calculator"
  }),
  keywords: [
    "Number Sequence Calculator",
    "Arithmetic Sequence Calculator",
    "Geometric Sequence Calculator",
    "Sequence Solver",
    "Find the Next Number in the Sequence",
    "Fibonacci Calculator",
    "Series and Sequences Solver"
  ]
};
