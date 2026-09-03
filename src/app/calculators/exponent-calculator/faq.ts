import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const exponent_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is an exponent?",
    answer: "An exponent indicates a power applied to a base. For a positive integer n, bⁿ means multiplying b by itself n times. Exponents also extend naturally to zero, negative and fractional powers."
  },
  {
    question: "What is a base in an exponent?",
    answer: "The base is the quantity being raised to a power. In 2⁵, the base is 2 and the exponent is 5."
  },
  {
    question: "What is a power?",
    answer: "A power is the result of an exponentiation expression. In 2⁵ = 32, 32 is the evaluated power."
  },
  {
    question: "How do I calculate 2 to the 10th power?",
    answer: "2¹⁰ = 1024. The calculator evaluates the expression and can show the step-by-step repeated multiplication."
  },
  {
    question: "What does a zero exponent mean?",
    answer: "For a nonzero base, a⁰ = 1. The expression 0⁰ requires separate treatment because its meaning depends on mathematical context."
  },
  {
    question: "What does a negative exponent mean?",
    answer: "A negative exponent represents a reciprocal. For a ≠ 0, a⁻ⁿ = 1/aⁿ. For example, 2⁻³ = 1/8 = 0.125."
  },
  {
    question: "How do fractional exponents work?",
    answer: "A rational exponent connects powers and roots. The numerator gives the power and the denominator gives the root, so a^(m/n) = (ⁿ√a)ᵐ."
  },
  {
    question: "What is 27 to the power of 2/3?",
    answer: "27^(2/3) = (∛27)² = 3² = 9."
  },
  {
    question: "What is a negative base raised to an odd power?",
    answer: "A negative base raised to an odd integer power remains negative. For example, (−2)³ = −8."
  },
  {
    question: "What is a negative base raised to an even power?",
    answer: "A negative base raised to an even integer power is positive. For example, (−2)² = 4."
  },
  {
    question: "Can a negative number have a fractional exponent?",
    answer: "Sometimes. Odd roots can produce real results, such as (−8)^(1/3) = −2. Even roots of negative numbers are not real, so (−4)^(1/2) has no real value."
  },
  {
    question: "Why is (-3)² different from -3²?",
    answer: "Parentheses change the base. (−3)² = 9 because the negative number is squared. In −3², exponentiation occurs before the unary negative sign, giving −9."
  },
  {
    question: "What is the product rule for exponents?",
    answer: "For the same base, aᵐaⁿ = aᵐ⁺ⁿ. For example, 2³ × 2⁴ = 2⁷ = 128."
  },
  {
    question: "What is the quotient rule for exponents?",
    answer: "For an appropriate nonzero base, aᵐ/aⁿ = aᵐ⁻ⁿ. For example, 5⁸/5² = 5⁶."
  },
  {
    question: "What is the power-of-a-power rule?",
    answer: "(aᵐ)ⁿ = aᵐⁿ. The exponents are multiplied. For example, (3²)⁴ = 3⁸ = 6561."
  },
  {
    question: "What is the power-of-a-product rule?",
    answer: "(ab)ⁿ = aⁿbⁿ. For example, (2×4)³ = 2³×4³ = 512."
  },
  {
    question: "What is the power-of-a-quotient rule?",
    answer: "For a nonzero denominator, (a/b)ⁿ = aⁿ/bⁿ. For example, (3/5)³ = 27/125 = 0.216."
  },
  {
    question: "Why is 0⁻¹ undefined?",
    answer: "A negative exponent requires a reciprocal. 0⁻¹ would mean 1/0, and division by zero is undefined."
  },
  {
    question: "What is 0⁰?",
    answer: "0⁰ is context-dependent. Some algebraic and combinatorial conventions assign it the value 1, while 0⁰ also occurs as an indeterminate form in calculus limits. The calculator's displayed result should therefore be understood as its evaluation convention, not as a universal rule for every mathematical context."
  },
  {
    question: "What is scientific notation?",
    answer: "Scientific notation writes a number as a coefficient multiplied by a power of 10, such as 5.4 × 10⁶."
  },
  {
    question: "How do I convert 5,400,000 to scientific notation?",
    answer: "Move the decimal point until one nonzero digit remains before it: 5,400,000 = 5.4 × 10⁶."
  },
  {
    question: "What is engineering notation?",
    answer: "Engineering notation is similar to scientific notation, but the power of 10 is a multiple of 3, such as 10³, 10⁶ or 10⁻⁶."
  },
  {
    question: "What is E notation?",
    answer: "E notation is a compact text representation of scientific notation. 5.4 × 10⁶ can be written as 5.4e+6."
  },
  {
    question: "What is the difference between scientific notation and engineering notation?",
    answer: "Scientific notation normally uses a coefficient from 1 up to but not including 10. Engineering notation restricts the exponent of 10 to multiples of 3."
  },
  {
    question: "How do I solve bⁿ = y for n?",
    answer: "For a positive real base b ≠ 1 and positive y, use n = log_b(y) = ln(y)/ln(b)."
  },
  {
    question: "How do I solve bⁿ = y for b?",
    answer: "When the requested real root is defined, the base is the nth root of y: b = ⁿ√y."
  },
  {
    question: "Can the calculator handle complex results?",
    answer: "The calculator includes handling for non-real cases such as an even root of a negative base. Where supported, it can represent the result using the complex unit i; otherwise it clearly identifies the real-domain limitation."
  },
  {
    question: "Why do I sometimes get a decimal result instead of an exact radical?",
    answer: "The calculator can present decimal approximations for numerical convenience, while also displaying radical or mathematical forms where supported. Exact forms avoid introducing unnecessary rounding."
  },
  {
    question: "Why should I not round intermediate exponent calculations?",
    answer: "Rounding intermediate values can introduce cumulative numerical error. Keeping full precision until the final presentation generally gives a more reliable result."
  },
  {
    question: "What is Euler's number?",
    answer: "Euler's number, e, is approximately 2.718281828459. It is the natural base for exponential and logarithmic functions and is especially important in continuous growth and decay."
  },
  {
    question: "Are exponent laws always valid?",
    answer: "Exponent laws are algebraic identities subject to their domain conditions. Division requires nonzero denominators, and fractional powers require care with negative bases when working only with real numbers."
  },
  {
    question: "Can I use this calculator for scientific notation?",
    answer: "Yes. The Scientific & Engineering Converter provides ordinary decimal, scientific, engineering and E-notation representations."
  },
  {
    question: "Can I see the steps instead of only the answer?",
    answer: "Yes. Each supported module provides step-by-step educational output showing how the result was obtained."
  },
  {
    question: "Can I save my exponent calculation?",
    answer: "Yes. The calculator provides saved-calculation functionality, allowing calculations to be stored and reviewed later."
  },
  {
    question: "Can I export my result?",
    answer: "Yes. The calculator supports PDF/Print, CSV and copy functionality, with Share also available through the supported calculator workflow."
  },
  {
    question: "Why does another exponent calculator give a slightly different decimal?",
    answer: "Differences can come from rounding precision, exact versus decimal representation, domain conventions or different handling of special cases. Compare the formula and assumptions as well as the final displayed number."
  }
];

export default exponent_calculatorFaqs;
