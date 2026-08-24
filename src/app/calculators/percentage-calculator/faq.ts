import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const percentage_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a percentage and how is it calculated?",
    answer: "A percentage is a dimensionless ratio expressed as a fraction of 100. It is calculated by dividing the part by the whole and multiplying the quotient by 100: Percentage = (Part / Whole) × 100. For example, 25 out of 50 is (25 / 50) × 100 = 50%."
  },
  {
    question: "How do I calculate what percent one number is of another?",
    answer: "To determine what percent number A is of number B, divide A by B and multiply by 100: P = (A / B) × 100. For instance, to find what percent 8 is of 2: (8 / 2) × 100 = 400%. If B is 0, the percentage is mathematically undefined."
  },
  {
    question: "How do I find a percentage of a number?",
    answer: "To calculate P% of a value V, convert the percentage to a decimal by dividing by 100, then multiply by V: Result = (P / 100) × V. For example, 4% of 6 is (4 / 100) × 6 = 0.04 × 6 = 0.24."
  },
  {
    question: "How do I find the whole when I know a percentage and the resulting part?",
    answer: "To find the whole (base value) when you know that part A represents P% of it, divide the part by the decimal percentage rate: Whole = A / (P / 100). For example, if 20 is 25% of a number, the whole is 20 / 0.25 = 80."
  },
  {
    question: "What is the difference between percentage change and percentage difference?",
    answer: "Percentage change is directional and compares a new value to a specific initial baseline value: ((V2 - V1) / V1) × 100. Percentage difference is symmetric and compares two values relative to their average when neither value is the baseline: (|V1 - V2| / ((V1 + V2) / 2)) × 100."
  },
  {
    question: "How do I calculate a percentage increase?",
    answer: "To increase a number V by P%, multiply V by (1 + P / 100). For example, 50 increased by 25% is 50 × (1 + 0.25) = 50 × 1.25 = 62.5. Alternatively, compute the increase amount ((25 / 100) × 50 = 12.5) and add it to 50."
  },
  {
    question: "How do I calculate a percentage decrease?",
    answer: "To decrease a number V by P%, multiply V by (1 - P / 100). For example, 100 decreased by 10% is 100 × (1 - 0.10) = 100 × 0.90 = 90."
  },
  {
    question: "How do I calculate percentage difference between two numbers?",
    answer: "To find the percentage difference between V1 and V2, compute the absolute difference divided by their arithmetic mean, multiplied by 100: Percentage Difference = (|V1 - V2| / ((V1 + V2) / 2)) × 100. For 5 and 9: |5 - 9| / ((5 + 9) / 2) × 100 = 4 / 7 × 100 ≈ 57.142857%."
  },
  {
    question: "How do I convert a decimal to a percentage?",
    answer: "To convert a decimal to a percentage, multiply the decimal value by 100 and append the percent sign (%). For example, 0.35 × 100 = 35%, and 0.0025 × 100 = 0.25%."
  },
  {
    question: "How do I convert a fraction to a percentage?",
    answer: "To convert a fraction to a percentage, divide the numerator by the denominator to obtain the decimal value, then multiply by 100. For example, 3/4 = 0.75, and 0.75 × 100 = 75%. For 1/3, 1 ÷ 3 ≈ 0.333333, which equals 33.333333%."
  },
  {
    question: "Why can percentage calculations be undefined when the original value is zero?",
    answer: "Percentage formulas where the base value serves as the denominator—such as solving for percentage rate (A / B × 100) or percentage change ((V2 - V1) / V1 × 100)—require dividing by the original value. In mathematics, division by zero is undefined because no finite number multiplied by zero can yield a non-zero numerator."
  },
  {
    question: "Why can this percentage calculator differ from a rounded hand calculation?",
    answer: "Hand calculations frequently round intermediate fractions or decimals (such as using 0.33 instead of 1/3, or rounding 4/7 to 0.57), which compounds rounding errors in subsequent operations. This calculator maintains full 64-bit IEEE 754 floating-point precision throughout all intermediate calculation steps and only formats at the final presentation layer."
  }
];
