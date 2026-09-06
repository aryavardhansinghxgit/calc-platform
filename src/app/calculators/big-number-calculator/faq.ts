import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const big_number_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a big number calculator?",
    answer: "A big number calculator performs arithmetic on integers that are too large to represent exactly with ordinary fixed-precision numeric types. It uses arbitrary-precision integer arithmetic so the exact digits can be preserved."
  },
  {
    question: "What is arbitrary-precision arithmetic?",
    answer: "Arbitrary-precision arithmetic represents numbers using as much storage as required rather than restricting them to a fixed machine-sized numeric format. For integers, this allows exact calculations far beyond the safe range of standard floating-point integers."
  },
  {
    question: "How large a number can this calculator handle?",
    answer: "The mathematical engine has been tested with integers up to 10⁵⁰⁰⁰, including exact 5,000-digit stress cases. Practical limits can still depend on browser memory, rendering requirements, output size, and the particular operation."
  },
  {
    question: "Does the calculator round large integers?",
    answer: "The exact integer result is not intentionally rounded into scientific notation. Scientific notation is provided separately as a compact approximation."
  },
  {
    question: "What is the difference between BigInt and Number?",
    answer: "JavaScript Number uses IEEE 754 double precision and can represent integers exactly only through 2⁵³ − 1 (9,007,199,254,740,991). BigInt is designed for integer values beyond that exact range."
  },
  {
    question: "Can I calculate factorials such as 1000!?",
    answer: "Yes. The calculator supports arbitrary-precision factorials and has been verified with 100!, 500!, and 1000!."
  },
  {
    question: "Can I calculate huge combinations such as 100C50?",
    answer: "Yes. The combinatorics module supports arbitrary-precision nPr and nCr. The exact value of 100C50 has been independently verified."
  },
  {
    question: "Can I calculate a large number modulo another large number?",
    answer: "Yes. The calculator supports exact modulo and modular exponentiation. Negative bases are normalized to canonical non-negative residues when the modulus is positive."
  },
  {
    question: "Does it support negative integers?",
    answer: "Yes, where the particular operation permits them. Scientific approximations preserve negative signs, and modular results use canonical non-negative residues for positive moduli."
  },
  {
    question: "Can I test whether a very large number is prime?",
    answer: "Yes. The calculator includes a Miller-Rabin primality-testing engine. Results distinguish deterministic behavior within the supported bounded range from probabilistic testing for larger inputs."
  },
  {
    question: "Can I calculate GCD and LCM for very large integers?",
    answer: "Yes. Both GCD and LCM are supported using arbitrary-precision integer arithmetic, including values far beyond ordinary safe-integer limits."
  },
  {
    question: "Can I save a large-number calculation?",
    answer: "Yes. Saved records preserve the original raw inputs rather than only a shortened summary. The restore system was tested with 500-digit values."
  },
  {
    question: "Can I export the result?",
    answer: "Yes. The calculator supports copying exact results, LaTeX output, TXT downloads, and CSV export. Large integer fields are preserved as exact text during CSV export."
  },
  {
    question: "Why not just use a normal calculator?",
    answer: "Normal calculators are excellent for everyday numerical calculations, but fixed-precision floating-point arithmetic can lose integer precision beyond its safe range. Arbitrary-precision arithmetic is specifically useful when every digit of a large integer must be preserved."
  },
  {
    question: "Is scientific notation an exact representation?",
    answer: "Scientific notation can be exact when the coefficient and exponent represent the integer exactly, but in calculator interfaces it is often used as a rounded compact approximation. The exact full integer should be used whenever every digit matters."
  },
  {
    question: "Why is modular exponentiation faster than calculating the full power?",
    answer: "Repeated squaring reduces the number of required exponentiation steps dramatically and reduces modulo during the calculation. This avoids constructing an unnecessarily enormous intermediate value."
  }
];
