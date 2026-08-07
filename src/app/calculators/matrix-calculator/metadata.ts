import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const matrix_calculatorMetadata: Metadata = generateCalculatorMetadata({
  title: "Matrix Calculator — Free Online Math Calculator",
  description: "Perform 2x2 matrix addition, subtraction, multiplication, and determinant calculations.",
  slug: "matrix-calculator",
});
