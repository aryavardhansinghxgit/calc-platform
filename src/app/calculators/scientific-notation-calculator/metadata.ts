import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const scientific_notation_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Scientific Notation Calculator & Converter with Steps",
    description: "Free online Scientific Notation Calculator & Converter Suite. Perform arithmetic (+, -, ×, /), convert across Normalized Scientific, Engineering Notation with SI Metric Prefixes, E-Notation, and Physical Constants.",
    slug: "scientific-notation-calculator"
  }),
  keywords: [
    "Scientific Notation Calculator",
    "Scientific Notation to Decimal",
    "Decimal to Scientific Notation",
    "Scientific Notation Operations",
    "Engineering Notation Calculator",
    "E Notation Calculator"
  ]
};
