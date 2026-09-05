import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const matrix_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Matrix Calculator – Multiply, Add, Inverse, Determinant & RREF",
    description: "Free matrix calculator for matrix multiplication, addition, subtraction, determinant, inverse, transpose, rank, trace, RREF and solving Ax = b. See results and mathematical steps instantly.",
    slug: "matrix-calculator"
  }),
  keywords: [
    "Matrix Calculator",
    "Matrix Multiplication Calculator",
    "Matrix Inverse Calculator",
    "Determinant Calculator",
    "RREF Calculator",
    "Eigenvalue Calculator",
    "Linear Algebra Solver"
  ]
};
