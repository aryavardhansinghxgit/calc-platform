import { CalculatorFAQ } from "@/calculators/types";

export const scientific_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I use an online scientific calculator?",
    answer:
      "First identify the mathematical operation you need, set the correct angle mode if using trigonometry, enter the expression with parentheses where needed, evaluate it, and then check the displayed precision. The calculator supports arithmetic, powers, roots, trigonometry, logarithms, factorials, memory, history and scientific notation.",
  },
  {
    question: "What do the DEG, RAD and GRAD buttons mean?",
    answer:
      "They select the unit used for trigonometric angles. DEG uses degrees, RAD uses radians, and GRAD uses gradians. For example, sin(90) equals 1 in DEG mode, while sin(pi/2) equals 1 in RAD mode and sin(100) equals 1 in GRAD mode.",
  },
  {
    question: "How do I calculate sin, cos or tan?",
    answer:
      "Choose DEG, RAD or GRAD first, then enter the angle and the desired trig function. For example, in DEG mode enter sin(30) to obtain 0.5. For inverse trigonometry, use asin, acos or atan and interpret the result in the active angle unit.",
  },
  {
    question: "How do I calculate logarithms with this scientific calculator?",
    answer:
      "Use log for base-10 logarithms and ln for natural logarithms. For another base b, use log_b(x) = ln(x) / ln(b) when direct arbitrary-base input is not available.",
  },
  {
    question: "How do I calculate powers and roots?",
    answer:
      "Use the power operator for expressions such as 2^10 or 1.05^20. Use square root or the supported general-root function for expressions such as sqrt(144) or the cube root of 27. Put the full base or radicand in parentheses when the expression is complex.",
  },
  {
    question: "How do I use factorial on a scientific calculator?",
    answer:
      "Enter a non-negative integer followed by the factorial operator. For example, 5! = 120. Factorials grow very quickly, so very large values can exceed floating-point range; the validated calculator safely handles the overflow boundary rather than treating Infinity as a valid finite result.",
  },
  {
    question: "Can I use this scientific calculator to solve equations?",
    answer:
      "It can evaluate the numerical expressions that appear in algebraic and scientific equations, but it should not be described as a symbolic equation solver unless a dedicated solve feature is implemented. For simple equations, rearrange the equation manually, use the calculator for each numerical step, and substitute the final value back into the original equation to verify it.",
  },
  {
    question: "How do I use a scientific calculator for trigonometry and triangles?",
    answer:
      "Use the Pythagorean relationship with roots and powers, such as sqrt(a^2 + b^2), or use inverse trigonometric functions such as atan(opposite/adjacent). Set the correct angle mode before evaluating the expression.",
  },
  {
    question: "How do I enter a multi-step formula?",
    answer:
      "Write the formula first, then enter it using parentheses for grouped terms, powers, roots and denominators. For example, compound growth can be entered as P × (1 + r)^n. Keeping the complete structure in one expression reduces manual rounding errors.",
  },
  {
    question: "What is the difference between FIX and SCI mode?",
    answer:
      "FIX displays a chosen number of decimal places, while SCI displays the value in scientific notation. These are presentation settings and should not be treated as a change to the underlying mathematical result.",
  },
  {
    question: "How do I use the memory buttons M+, M-, MR and MC?",
    answer:
      "M+ adds the current result to memory, M- subtracts it, MR recalls the stored value and MC clears the memory register. Store and Recall can be used for reusable intermediate values. Memory is particularly useful when a long calculation repeats the same constant.",
  },
  {
    question: "Why can my scientific-calculator result differ from a hand calculation?",
    answer:
      "Common causes include the wrong DEG/RAD/GRAD mode, missing parentheses, negative-power precedence, premature rounding, a domain error or a different interpretation of the formula. Re-enter the expression with explicit grouping and verify the angle mode before comparing results.",
  },
];
