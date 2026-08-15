import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const quadratic_formula_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the quadratic formula and when should I use it?",
    answer: "The quadratic formula is x = [-b ± √(b² - 4ac)] / (2a). It provides a universal solution for any quadratic equation in standard form ax² + bx + c = 0, especially when factoring over integers is impossible."
  },
  {
    question: "What happens if the coefficient a is zero?",
    answer: "If a = 0, the equation is no longer quadratic. It degenerates into a linear equation bx + c = 0, which has a single solution x = -c / b."
  },
  {
    question: "How do complex or imaginary roots work in quadratic equations?",
    answer: "When the discriminant (b² - 4ac) is negative, taking its square root produces an imaginary number containing i = √(-1). Complex roots appear as conjugate pairs: u ± vi."
  },
  {
    question: "What does the discriminant tell you about the graph of a parabola?",
    answer: "If Δ > 0, the parabola crosses the x-axis twice. If Δ = 0, the vertex touches the x-axis at one point. If Δ < 0, the parabola does not cross the real x-axis."
  },
  {
    question: "How do you convert standard form ax²+bx+c to vertex form a(x-h)²+k?",
    answer: "Complete the square by factoring out 'a' from the x terms, adding and subtracting (b / 2a)², to get h = -b / (2a) and k = c - b² / (4a)."
  },
  {
    question: "Can a quadratic equation have more than two solutions?",
    answer: "No. By the Fundamental Theorem of Algebra, a degree-2 polynomial equation has exactly two complex solutions (counting multiplicity)."
  },
  {
    question: "Why does the quadratic formula have a ± (plus-minus) sign?",
    answer: "The ± sign accounts for both the positive and negative square roots when solving (x + h)² = k, since both (+r)² and (-r)² equal k."
  },
  {
    question: "How do you find the vertex of a parabola without calculus?",
    answer: "Use the vertex formula h = -b / (2a) for the x-coordinate, then evaluate f(h) = c - b² / (4a) for the y-coordinate k."
  },
  {
    question: "What is the difference between a root, a zero, and an x-intercept?",
    answer: "A 'zero' is an input x making f(x) = 0. A 'root' is a solution to the equation f(x) = 0. An 'x-intercept' is the real point (x, 0) where the graph crosses the x-axis."
  },
  {
    question: "How do you simplify square roots of non-perfect squares in quadratic results?",
    answer: "Factor out the largest perfect square integer factor. For example, √72 = √(36 × 2) = 6√2."
  }
];

export default quadratic_formula_calculatorFaqs;
