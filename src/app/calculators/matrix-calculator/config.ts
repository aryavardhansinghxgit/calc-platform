import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMatrixCalculator } from "./calculator";
import { MatrixCalculator } from "@/components/calculator/matrix/MatrixCalculator";
import { MatrixContent } from "@/components/calculator/matrix/MatrixContent";

export const matrix_calculatorConfig: CalculatorModuleDefinition = {
  id: "matrix-calculator",
  title: "Matrix Calculator & Linear Algebra Solver",
  slug: "matrix-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Use this free matrix calculator to perform common linear algebra calculations without doing every row and column operation by hand. Enter one or two matrices, choose the operation you need, and get the calculated result with mathematical details. The calculator supports matrix addition, subtraction, multiplication, transpose, determinant, inverse, rank, trace, reduced row echelon form (RREF), and systems of linear equations in the form Ax = b.",
  iconName: "Grid",
  featured: true,
  keywords: [
    "Matrix Calculator",
    "Matrix Multiplication Calculator",
    "Matrix Inverse Calculator",
    "Determinant Calculator",
    "RREF Calculator",
    "Eigenvalue Calculator",
    "Linear Algebra Solver"
  ],
  priority: 1,
  relatedCalculators: ["scientific-calculator", "slope-calculator", "distance-calculator", "quadratic-formula-calculator"],
  formulaDescription: "Linear Algebra & Gauss-Jordan Reduction",
  faqs: [],
  CustomComponent: MatrixCalculator,
  ContentComponent: MatrixContent,
  inputs: [
    {
      name: "a11",
      label: "Matrix A (1,1)",
      type: "number",
      defaultValue: 1,
      min: -100,
      max: 100,
      step: 1
    },
    {
      name: "a12",
      label: "Matrix A (1,2)",
      type: "number",
      defaultValue: 2,
      min: -100,
      max: 100,
      step: 1
    },
    {
      name: "a21",
      label: "Matrix A (2,1)",
      type: "number",
      defaultValue: 3,
      min: -100,
      max: 100,
      step: 1
    },
    {
      name: "a22",
      label: "Matrix A (2,2)",
      type: "number",
      defaultValue: 4,
      min: -100,
      max: 100,
      step: 1
    }
  ],
  outputs: [
    {
      name: "detA",
      label: "Determinant det(A)",
      format: "number",
      highlight: true
    },
    {
      name: "traceA",
      label: "Trace tr(A)",
      format: "number"
    },
    {
      name: "matrixSquare",
      label: "Matrix A² Result",
      format: "text"
    }
  ],
  calculate: calculateMatrixCalculator
} as any;

export default matrix_calculatorConfig;
