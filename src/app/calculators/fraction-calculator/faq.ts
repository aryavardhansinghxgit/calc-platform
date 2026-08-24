import { CalculatorFAQ } from "@/calculators/types";

export const fraction_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I add fractions with different denominators?",
    answer:
      "Enter the two fractions, choose addition, and evaluate. When the denominators differ, the calculator converts them to an equivalent common-denominator form, adds the numerators and reduces the result.",
  },
  {
    question: "How do I subtract fractions with different denominators?",
    answer:
      "The calculator first creates an equivalent common-denominator representation, subtracts the numerators and reduces the resulting fraction to lowest terms.",
  },
  {
    question: "How do I multiply fractions?",
    answer:
      "Multiply the numerators together and the denominators together, then reduce the result. A common denominator is not required for multiplication.",
  },
  {
    question: "How do I divide fractions?",
    answer:
      "Divide the first fraction by multiplying it by the reciprocal of the second fraction. For example, 3/4 ÷ 1/6 = 3/4 × 6 = 18/4 = 9/2.",
  },
  {
    question: "How do I simplify a fraction to lowest terms?",
    answer:
      "The calculator finds the greatest common divisor of the numerator and denominator and divides both by that value. For example, 84/126 reduces to 2/3.",
  },
  {
    question: "How do I convert a mixed number to an improper fraction?",
    answer:
      "Multiply the whole number by the denominator, add the numerator, and keep the original denominator. For example, 2 3/4 becomes (2×4+3)/4 = 11/4.",
  },
  {
    question: "How do I convert an improper fraction to a mixed number?",
    answer:
      "Divide the numerator by the denominator. The quotient is the whole number and the remainder becomes the numerator over the same denominator. For example, 31/14 = 2 3/14.",
  },
  {
    question: "How do I convert a decimal to a fraction?",
    answer:
      "A supported finite decimal is written as an integer over a power of 10 and then reduced. For example, 1.375 = 1375/1000 = 11/8 = 1 3/8.",
  },
  {
    question: "How do I convert a fraction to a decimal?",
    answer:
      "Divide the numerator by the denominator. Terminating fractions produce finite decimals, while repeating fractions such as 1/3 produce a finite displayed approximation of an infinite decimal expansion.",
  },
  {
    question: "How does the calculator handle negative fractions and mixed numbers?",
    answer:
      "The engine preserves the sign and normalizes equivalent representations. For example, -1/2 and 1/-2 represent the same value, and -2 3/4 is treated as -11/4 rather than -2 + 3/4.",
  },
  {
    question: "How does the Big Number Fraction Calculator preserve exact precision?",
    answer:
      "The Big Number mode uses arbitrary-precision integer arithmetic so large numerators and denominators can be multiplied, divided and reduced without the integer rounding limitations of ordinary JavaScript Number arithmetic.",
  },
  {
    question: "Why can my manual fraction calculation differ from the calculator?",
    answer:
      "Common causes include using the wrong common denominator, forgetting to reduce, reversing a reciprocal during division, mishandling a negative mixed number, or rounding a decimal too early. Compare the calculator's step-by-step derivation with the formula you used.",
  },
];
