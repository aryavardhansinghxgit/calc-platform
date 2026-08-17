import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const matrix_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Matrix Calculator — Matrix Arithmetic, Determinants, Inverses & RREF",
    description: "Free online Matrix Calculator & Linear Algebra Suite. Compute matrix multiplication, addition, determinants, inverses, RREF Gauss-Jordan reduction, linear system solving (Ax=b), and eigenvalues for up to 10×10 matrices.",
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
