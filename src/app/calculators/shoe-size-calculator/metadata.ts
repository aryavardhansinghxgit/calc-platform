import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const shoe_size_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Shoe Size Calculator — International Matrix & Brand Fit Profile",
  description: "Free online shoe size calculator. Measure foot length & width in inches or cm, convert between US, UK, EU, JP, MX & AU sizes, and tune fits for Nike, Adidas & Converse.",
  slug: "shoe-size-calculator",
});
