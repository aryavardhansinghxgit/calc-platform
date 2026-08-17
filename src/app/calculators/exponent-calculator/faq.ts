import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const exponent_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is an exponent and how does it work?",
    answer: "An exponent indicates how many times a base number is multiplied by itself, such as 3^4 = 3 × 3 × 3 × 3 = 81."
  },
  {
    question: "Why is any number to the power of zero equal to 1?",
    answer: "Using the quotient law: b^n / b^n = b^(n-n) = b^0. Since any non-zero number divided by itself equals 1, b^0 = 1."
  },
  {
    question: "How do you calculate negative exponents?",
    answer: "A negative exponent represents the reciprocal of the base raised to the positive power: b^(-n) = 1 / (b^n)."
  },
  {
    question: "How do fractional exponents work (e.g., 16^(1/2) or 8^(2/3))?",
    answer: "The denominator represents the root and the numerator represents the power: b^(p/q) = q-th root of (b^p), so 8^(2/3) = (3rd root of 8)^2 = 2^2 = 4."
  },
  {
    question: "What is the difference between (-2)^4 and -2^4?",
    answer: "(-2)^4 = (-2) × (-2) × (-2) × (-2) = 16, while -2^4 = -(2 × 2 × 2 × 2) = -16 because exponents take precedence over negation in the order of operations (PEMDAS/BODMAS)."
  },
  {
    question: "How do you multiply numbers with the same base but different exponents?",
    answer: "State the Product Rule: keep the base and add the exponents, b^m · b^n = b^(m+n)."
  },
  {
    question: "What is the value of 0^0 (zero to the power of zero)?",
    answer: "In algebra and combinatorics 0^0 is commonly defined as 1, while in mathematical analysis and calculus it is considered an indeterminate form."
  },
  {
    question: "How do exponents relate to scientific notation?",
    answer: "Scientific notation expresses very large or small numbers as a decimal between 1 and 10 multiplied by a power of 10, such as 5.4 × 10^6."
  },
  {
    question: "Can you have a negative base with a fractional exponent?",
    answer: "Odd roots of negative numbers yield negative real numbers (e.g. (-8)^(1/3) = -2), while even roots yield imaginary/complex numbers involving i (e.g. (-4)^(1/2) = 2i)."
  },
  {
    question: "How do you calculate power of a power (e.g., (2^3)^4)?",
    answer: "State the Power Rule: multiply the exponents together, so (2^3)^4 = 2^(3 × 4) = 2^12 = 4096."
  }
];

export default exponent_calculatorFaqs;
