import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const quadratic_formula_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the quadratic formula?",
    answer: "The quadratic formula is x = (-b ± √(b² - 4ac))/(2a), where a ≠ 0. It gives the solutions of a quadratic equation in standard form ax² + bx + c = 0."
  },
  {
    question: "What is the discriminant?",
    answer: "The discriminant is b² − 4ac. Its sign tells you whether a quadratic has two distinct real roots, one repeated real root, or two complex conjugate roots."
  },
  {
    question: "What happens when the discriminant is positive?",
    answer: "A positive discriminant gives two distinct real roots. The corresponding parabola crosses the real x-axis at two points."
  },
  {
    question: "What happens when the discriminant is zero?",
    answer: "A zero discriminant gives one repeated real root. Geometrically, the parabola touches the x-axis at one point."
  },
  {
    question: "What happens when the discriminant is negative?",
    answer: "A negative discriminant means there are no real roots. For a quadratic with real coefficients, the two roots are complex conjugates."
  },
  {
    question: "Can a quadratic have two complex roots?",
    answer: "Yes. When the discriminant is negative, the quadratic has two non-real complex conjugate roots."
  },
  {
    question: "What if a equals zero?",
    answer: "If a = 0, the equation is no longer quadratic. If b ≠ 0 it becomes the linear equation bx + c = 0. If both a and b are zero, the equation is either an identity or a contradiction depending on c."
  },
  {
    question: "What are the roots of x² − 5x + 6 = 0?",
    answer: "The roots are x = 2 and x = 3 because the equation factors as (x − 2)(x − 3) = 0."
  },
  {
    question: "What is the vertex of a quadratic?",
    answer: "For y = ax² + bx + c, the vertex has x-coordinate h = −b/(2a) and y-coordinate k = f(h). The vertex is a minimum when a > 0 and a maximum when a < 0."
  },
  {
    question: "How do I find the axis of symmetry?",
    answer: "The axis of symmetry is the vertical line x = −b/(2a). It passes through the vertex and divides the parabola into two mirror-image halves."
  },
  {
    question: "How do I find the y-intercept of a quadratic?",
    answer: "Set x = 0. For y = ax² + bx + c, this gives y = c, so the y-intercept is (0,c)."
  },
  {
    question: "What is vertex form?",
    answer: "Vertex form is y = a(x − h)² + k, where (h,k) is the vertex. It makes the parabola's vertex and direction of opening easy to identify."
  },
  {
    question: "How do I find the focus of a parabola?",
    answer: "For y = a(x − h)² + k, use p = 1/(4a). The focus is (h,k+p)."
  },
  {
    question: "How do I find the directrix?",
    answer: "For y = a(x − h)² + k, with p = 1/(4a), the directrix is y = k − p."
  },
  {
    question: "What is the difference between a root and an x-intercept?",
    answer: "A root is a value of x that makes the equation equal zero. A real root corresponds to an x-intercept at (x,0). Complex roots are algebraic solutions but are not points on the real graph."
  },
  {
    question: "Can I solve a quadratic without the quadratic formula?",
    answer: "Yes. Factoring and completing the square are two important alternatives. They are particularly useful when the quadratic has simple factors or when you want to derive vertex form."
  },
  {
    question: "Which method is best for solving a quadratic?",
    answer: "There is no single best method for every equation. Factoring can be fastest for simple factorable quadratics, completing the square is useful for deriving vertex form, and the quadratic formula works for every quadratic with a ≠ 0."
  },
  {
    question: "Why is there a plus-or-minus sign in the quadratic formula?",
    answer: "The ± represents the two square-root possibilities. For a positive discriminant, the two choices produce the two real roots. For a negative discriminant, they produce the two complex-conjugate roots."
  },
  {
    question: "Does every quadratic have two real solutions?",
    answer: "No. A quadratic can have two distinct real roots, one repeated real root, or two complex conjugate roots. The discriminant determines which case occurs."
  },
  {
    question: "What does a negative discriminant mean on the graph?",
    answer: "A negative discriminant means the quadratic has no real x-intercepts. The parabola remains entirely above or below the x-axis depending on its orientation and vertex."
  },
  {
    question: "What does the coefficient a control?",
    answer: "The coefficient a controls the opening direction and vertical scaling of the parabola. If a > 0 it opens upward; if a < 0 it opens downward."
  },
  {
    question: "What is the relationship between the roots and the graph?",
    answer: "Real roots correspond to the x-values where the parabola crosses or touches the x-axis. Two distinct real roots create two intersections, while a repeated root creates one tangency point."
  },
  {
    question: "How can I check whether my quadratic roots are correct?",
    answer: "Use Vieta's relationships: x₁ + x₂ = −b/a and x₁x₂ = c/a. Substituting the roots back into the original equation is another direct check."
  },
  {
    question: "Can the calculator solve linear equations?",
    answer: "When a = 0, the calculator recognizes that the equation is no longer quadratic. It can handle the resulting linear or degenerate cases according to their mathematical classification."
  },
  {
    question: "Can I get complex roots from this calculator?",
    answer: "Yes. When the discriminant is negative, the calculator displays the complex conjugate roots rather than reporting only that no real roots exist."
  },
  {
    question: "Can I see the calculation steps?",
    answer: "Yes. The calculator provides a step-by-step solution showing coefficient identification, discriminant calculation, substitution into the quadratic formula, simplification and the resulting roots."
  },
  {
    question: "Can I see the parabola for my equation?",
    answer: "Yes. The calculator provides an interactive graph based on the active coefficients and updates the parabola as the equation changes."
  },
  {
    question: "Can I calculate the focus and directrix?",
    answer: "Yes. The Parabola Geometry Analyzer calculates the vertex, axis of symmetry, focus, directrix, orientation and vertex-form equation from the same quadratic coefficients."
  },
  {
    question: "Can I export my quadratic calculation?",
    answer: "Yes. The calculator provides available PDF/Print, CSV, Copy, Save and Share tools so the current calculation can be preserved or reused."
  },
  {
    question: "Why does another calculator give a slightly different decimal answer?",
    answer: "The difference may come from rounding, exact-versus-decimal representation, or a different display precision. Compare the underlying formula and coefficients rather than only the final rounded digits."
  },
  {
    question: "What are the solutions to 16x² − 5x + 6 = 0?",
    answer: "The discriminant is −359, so there are no real roots. The complex roots are approximately 0.1563 ± 0.5921i."
  },
  {
    question: "How many solutions does a degree-2 polynomial have?",
    answer: "A degree-2 polynomial has exactly two complex roots when multiplicity is counted. They may be two distinct real roots, a repeated real root, or a pair of non-real complex conjugates when the coefficients are real."
  }
];

export default quadratic_formula_calculatorFaqs;
