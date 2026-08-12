import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateScientificCalculator } from "./calculator";

export const scientific_calculatorConfig: CalculatorModuleDefinition = {
  id: "scientific-calculator",
  title: "Scientific Calculator",
  slug: "scientific-calculator",
  category: "Math",
  subcategory: "General Math",
  description: "Perform advanced scientific calculations including trigonometry, logarithms, factorials, roots, and exponents.",
  iconName: "Calculator",
  featured: true,
  keywords: ["scientific calculator", "trigonometry", "logarithm", "sin cos tan", "math solver", "exponents"],
  priority: 1,
  relatedCalculators: ["exponent-calculator", "log-calculator", "root-calculator", "pythagorean-theorem-calculator"],
  formulaDescription: "Evaluates trigonometric ratios, logarithmic base transforms, factorials, and exponential series.",
  inputs: [
    {
      name: "value1",
      label: "Primary Number (X)",
      type: "number",
      defaultValue: 45,
      min: -1000000000,
      max: 1000000000,
      step: 1
    },
    {
      name: "operation",
      label: "Operation",
      type: "select",
      defaultValue: "sin",
      options: [
        { label: "Sine (sin X)", value: "sin" },
        { label: "Cosine (cos X)", value: "cos" },
        { label: "Tangent (tan X)", value: "tan" },
        { label: "ArcSine (arcsin X)", value: "asin" },
        { label: "ArcCosine (arccos X)", value: "acos" },
        { label: "ArcTangent (arctan X)", value: "atan" },
        { label: "Natural Log (ln X)", value: "ln" },
        { label: "Base-10 Log (log₁₀ X)", value: "log10" },
        { label: "Base-2 Log (log₂ X)", value: "log2" },
        { label: "Square (X²)", value: "sqr" },
        { label: "Cube (X³)", value: "cube" },
        { label: "X to Power Y (X^Y)", value: "pow" },
        { label: "Exponential (e^X)", value: "exp" },
        { label: "10 to Power X (10^X)", value: "pow10" },
        { label: "Square Root (√X)", value: "sqrt" },
        { label: "Cube Root (∛X)", value: "cbrt" },
        { label: "Y-th Root of X (ⁿ√X)", value: "yroot" },
        { label: "Factorial (X!)", value: "factorial" },
        { label: "Absolute Value (|X|)", value: "abs" },
        { label: "Reciprocal (1/X)", value: "recip" },
        { label: "Modulo (X mod Y)", value: "mod" }
      ]
    },
    {
      name: "value2",
      label: "Secondary Value (Y) — For X^Y, Y-th Root, Modulo",
      type: "number",
      defaultValue: 2,
      min: -1000000000,
      max: 1000000000,
      step: 1
    },
    {
      name: "angleUnit",
      label: "Angle Unit (Trigonometry)",
      type: "select",
      defaultValue: "deg",
      options: [
        { label: "Degrees (°)", value: "deg" },
        { label: "Radians (rad)", value: "rad" }
      ]
    }
  ],
  outputs: [
    {
      name: "result",
      label: "Calculated Result",
      format: "text",
      highlight: true
    },
    {
      name: "explanation",
      label: "Operation Summary & Step",
      format: "text"
    },
    {
      name: "domainNote",
      label: "Domain & Mathematical Boundary Note",
      format: "text"
    }
  ],
  calculate: calculateScientificCalculator,
};

export default scientific_calculatorConfig;
