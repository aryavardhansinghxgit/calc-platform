import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateMatrixCalculator } from "./calculator";
import { matrix_calculatorFaqs } from "./faq";

export const matrix_calculatorConfig: CalculatorModuleDefinition = {
  id: "matrix-calculator",
  title: "Matrix Calculator",
  slug: "matrix-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Perform 2x2 matrix addition, subtraction, multiplication, and determinant calculations.",
  iconName: "Grid",
  featured: true,
  keywords: ["matrix calculator","matrix determinant","matrix multiplication","linear algebra"],
  priority: 1,
  relatedCalculators: ["scientific-calculator","big-number-calculator"],
  formulaDescription: "det(A) = a₁₁a₂₂ - a₁₂a₂₁; tr(A) = a₁₁ + a₂₂",
  faqs: matrix_calculatorFaqs,
  inputs: [
  {
    "name": "a11",
    "label": "Matrix A (1,1)",
    "type": "number",
    "defaultValue": 1,
    "min": -100,
    "max": 100,
    "step": 1
  },
  {
    "name": "a12",
    "label": "Matrix A (1,2)",
    "type": "number",
    "defaultValue": 2,
    "min": -100,
    "max": 100,
    "step": 1
  },
  {
    "name": "a21",
    "label": "Matrix A (2,1)",
    "type": "number",
    "defaultValue": 3,
    "min": -100,
    "max": 100,
    "step": 1
  },
  {
    "name": "a22",
    "label": "Matrix A (2,2)",
    "type": "number",
    "defaultValue": 4,
    "min": -100,
    "max": 100,
    "step": 1
  },
  {
    "name": "operation",
    "label": "Operation on Matrix B",
    "type": "select",
    "defaultValue": "det",
    "options": [
      {
        "label": "Determinant det(A)",
        "value": "det"
      },
      {
        "label": "Trace tr(A)",
        "value": "trace"
      },
      {
        "label": "Multiply A × A",
        "value": "square"
      }
    ]
  }
],
  outputs: [
  {
    "name": "detA",
    "label": "Determinant det(A)",
    "format": "number",
    "highlight": true
  },
  {
    "name": "traceA",
    "label": "Trace tr(A)",
    "format": "number"
  },
  {
    "name": "matrixSquare",
    "label": "Matrix A² Result",
    "format": "text"
  }
],
  calculate: calculateMatrixCalculator,
};

export default matrix_calculatorConfig;
