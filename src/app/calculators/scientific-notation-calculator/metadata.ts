import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const scientific_notation_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Scientific Notation Calculator & Converter with Steps",
    description: "Use this scientific notation calculator to convert numbers and calculate in scientific, engineering, and E notation with step-by-step results.",
    slug: "scientific-notation-calculator"
  }),
  keywords: [
    "scientific notation calculator",
    "scientific notation converter",
    "scientific notation calculator with steps",
    "engineering notation calculator",
    "engineering notation converter",
    "E notation converter",
    "scientific notation conversion",
    "convert to scientific notation",
    "scientific notation arithmetic",
    "scientific notation multiplication",
    "scientific notation division",
    "scientific notation addition",
    "scientific notation subtraction",
    "scientific notation exponent calculator"
  ]
};
