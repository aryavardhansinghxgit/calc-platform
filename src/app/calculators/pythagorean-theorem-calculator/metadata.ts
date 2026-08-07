import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const pythagorean_theorem_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Pythagorean Theorem Calculator — Free Online Math Calculator",
  description: "Solve missing side lengths a, b, or c in right-angled triangles using a² + b² = c².",
  slug: "pythagorean-theorem-calculator",
});
