import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const log_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the difference between log(x) and ln(x)?",
    answer: "log(x) typically refers to the common logarithm with base 10 (log₁₀). ln(x) refers to the natural logarithm with base e (Euler's constant e ≈ 2.718281828459)."
  },
  {
    question: "Why is the logarithm of a negative number undefined in real numbers?",
    answer: "Because raising any positive base b to any real power y always yields a positive number (b^y > 0). Therefore, there is no real exponent y such that b^y equals a negative number."
  },
  {
    question: "Why can a logarithm base never be 1 or negative?",
    answer: "Base 1 is excluded because 1^y = 1 for all y, rendering log₁(x) undefined for x ≠ 1 and indeterminate for x = 1. Negative bases are excluded to avoid non-real complex numbers when taking fractional powers."
  },
  {
    question: "How do you calculate a logarithm with any custom base using a standard calculator?",
    answer: "Use the Change of Base Formula: log_b(x) = ln(x) / ln(b) or log₁₀(x) / log₁₀(b). Simply divide the natural log of the number by the natural log of the base."
  },
  {
    question: "What is an antilogarithm and how do you calculate it?",
    answer: "An antilogarithm is the inverse operation of a logarithm: antilog_b(y) = b^y. For common log, antilog₁₀(y) = 10^y. For natural log, antiln(y) = e^y."
  },
  {
    question: "Why does log(1) = 0 for any base?",
    answer: "Because any non-zero base raised to the power of 0 equals 1 (b⁰ = 1). By logarithmic definition log_b(1) = 0."
  },
  {
    question: "How does the change of base formula work?",
    answer: "The Change of Base Formula states log_b(x) = log_k(x) / log_k(b) for any positive reference base k. It works because if b^y = x, taking log_k of both sides gives y · log_k(b) = log_k(x), so y = log_k(x) / log_k(b)."
  },
  {
    question: "How are logarithms used to measure earthquake intensity on the Richter scale?",
    answer: "The Richter scale uses a base-10 logarithmic formula M = log₁₀(A / A₀). Each whole number increase on the scale represents a 10-fold increase in amplitude and approximately a 31.6-fold increase in energy release."
  },
  {
    question: "Can a logarithm result be negative?",
    answer: "Yes! While the input argument x must be positive, the output logarithm value y is negative whenever the argument x is a fraction between 0 and 1 (0 < x < 1) for a base b > 1. For example, log₁₀(0.01) = -2."
  },
  {
    question: "What is the relationship between logarithms and exponential functions?",
    answer: "Logarithms and exponential functions are inverse operations. Graphically, y = log_b(x) is the reflection of y = b^x across the diagonal line y = x."
  }
];

export default log_calculatorFaqs;
