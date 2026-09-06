import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateNumberSequenceCalculator } from "./calculator";
import { SequenceCalculator } from "@/components/calculator/number-sequence/SequenceCalculator";
import { SequenceContent } from "@/components/calculator/number-sequence/SequenceContent";

export const numberSequenceFaqs = [
  {
    question: "What is a number sequence?",
    answer:
      "A number sequence is an ordered list of terms generated according to a mathematical rule. The position of each term is represented by an index such as n, and the term at that position can be written as aₙ."
  },
  {
    question: "How do I find the next number in a sequence?",
    answer:
      "First look for a simple relationship between consecutive terms. Check whether the same amount is added or subtracted, whether the same factor is multiplied, or whether a recurrence or polynomial difference pattern is present. A finite list does not always determine a unique continuation."
  },
  {
    question: "What is the difference between an arithmetic and geometric sequence?",
    answer:
      "An arithmetic sequence has a constant difference between consecutive terms. A geometric sequence has a constant ratio between consecutive terms. For example, 3, 7, 11, 15 is arithmetic with d = 4, while 2, 6, 18, 54 is geometric with r = 3."
  },
  {
    question: "What is the arithmetic sequence nth-term formula?",
    answer:
      "The nth term of an arithmetic sequence is: aₙ = a₁ + (n − 1)d, where a₁ is the first term and d is the common difference."
  },
  {
    question: "What is the geometric sequence nth-term formula?",
    answer:
      "The nth term of a geometric sequence is: aₙ = a₁rⁿ⁻¹, where a₁ is the first term and r is the common ratio."
  },
  {
    question: "How does a finite-difference table identify a quadratic sequence?",
    answer:
      "For a polynomial sequence of degree two, the second finite differences are constant. For example, 2, 5, 10, 17, 26 has first differences 3, 5, 7, 9 and second differences 2, 2, 2, revealing a quadratic pattern."
  },
  {
    question: "Can two numbers determine a unique sequence?",
    answer:
      "No. Two terms can suggest a simple candidate such as an arithmetic progression, but infinitely many different rules can fit the same two values. More terms are needed before a pattern can be identified with stronger confidence."
  },
  {
    question: "Can a Fibonacci-type sequence use different starting values?",
    answer:
      "Yes. A recurrence can use any supplied first two terms and continue with: aₙ = aₙ₋₁ + aₙ₋₂. For example, starting with 2 and 3 produces 2, 3, 5, 8, 13, 21, 34, ..."
  },
  {
    question: "When does an infinite geometric series converge?",
    answer:
      "An infinite geometric series with first term a₁ and ratio r converges to a finite sum when |r| < 1. The sum is S∞ = a₁/(1 − r). For |r| ≥ 1, the infinite geometric series does not converge to a finite value."
  },
  {
    question: "Why might the calculator call a sequence ambiguous or unclassified?",
    answer:
      "A sequence may be ambiguous when too few terms are provided or when several plausible rules fit the available data. It may be unclassified when its structure falls outside the supported pattern families. An unclassified result does not mean the sequence has no mathematical rule."
  }
];

export const number_sequence_calculatorConfig: CalculatorModuleDefinition = {
  id: "number-sequence-calculator",
  title: "Number Sequence Calculator — Arithmetic, Geometric & Pattern Solver",
  slug: "number-sequence-calculator",
  category: "Math",
  subcategory: "Discrete Mathematics",
  description:
    "Find sequence patterns, nth terms, partial sums and formulas for arithmetic, geometric, quadratic, cubic, Fibonacci and custom recurrences. Free step-by-step number sequence calculator.",
  iconName: "TrendingUp",
  featured: true,
  keywords: [
    "number sequence calculator",
    "arithmetic sequence",
    "geometric sequence",
    "nth term",
    "finite differences",
    "Fibonacci",
    "Lucas",
    "custom recurrence",
    "partial sum",
    "infinite geometric series"
  ],
  priority: 1,
  relatedCalculators: [
    "standard-deviation-calculator",
    "exponent-calculator",
    "big-number-calculator"
  ],
  formulaDescription:
    "Arithmetic: aₙ = a₁ + (n - 1)d; Geometric: aₙ = a₁ · rⁿ⁻¹; Quadratic: aₙ = an² + bn + c; Recurrence: aₙ = aₙ₋₁ + aₙ₋₂",
  faqs: numberSequenceFaqs,
  CustomComponent: SequenceCalculator,
  ContentComponent: SequenceContent,
  inputs: [
    {
      name: "seqType",
      label: "Sequence Type",
      type: "select",
      defaultValue: "arithmetic",
      options: [
        { label: "Arithmetic (aₙ = a₁ + (n-1)d)", value: "arithmetic" },
        { label: "Geometric (aₙ = a₁ × r^(n-1))", value: "geometric" }
      ]
    },
    {
      name: "firstTerm",
      label: "First Term (a₁)",
      type: "number",
      defaultValue: 2,
      min: -1000,
      max: 1000,
      step: 1
    },
    {
      name: "diffRatio",
      label: "Difference (d) / Ratio (r)",
      type: "number",
      defaultValue: 3,
      min: -100,
      max: 100,
      step: 1
    },
    {
      name: "termCount",
      label: "Term Count (n)",
      type: "number",
      defaultValue: 10,
      min: 1,
      max: 100,
      step: 1
    }
  ],
  outputs: [
    {
      name: "nthTerm",
      label: "nth Term (aₙ)",
      format: "number",
      highlight: true
    },
    {
      name: "sumN",
      label: "Sum of n Terms (Sₙ)",
      format: "number"
    },
    {
      name: "sequencePreview",
      label: "Sequence Preview",
      format: "text"
    }
  ],
  calculate: calculateNumberSequenceCalculator
} as any;

export default number_sequence_calculatorConfig;
