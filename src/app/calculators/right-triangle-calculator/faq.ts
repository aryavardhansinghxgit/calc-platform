import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const right_triangle_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the formula for a right triangle?",
    answer: "The primary side relationship is the Pythagorean theorem: a² + b² = c² where c is the hypotenuse."
  },
  {
    question: "How do I find the hypotenuse?",
    answer: "If the two legs are known: c = √(a² + b²). For example, legs 3 and 4 produce a hypotenuse of 5."
  },
  {
    question: "How do I find a missing leg?",
    answer: "If the hypotenuse c and the other leg are known: a = √(c² − b²) or b = √(c² − a²). The hypotenuse must be greater than the known leg."
  },
  {
    question: "How do I find an angle in a right triangle?",
    answer: "Use an inverse trigonometric function such as: α = arctan(a / b), α = arcsin(a / c), or α = arccos(b / c). The other acute angle is 90° − α."
  },
  {
    question: "What is the area of a right triangle?",
    answer: "The area is: A = ab / 2 because the two legs are perpendicular and can be used as the base and height."
  },
  {
    question: "What is the perimeter of a right triangle?",
    answer: "Add the three side lengths: P = a + b + c."
  },
  {
    question: "What is the altitude to the hypotenuse?",
    answer: "For legs a and b and hypotenuse c: h_c = ab / c. For a 5-12-13 triangle, the altitude is approximately 4.6154."
  },
  {
    question: "What are the six trigonometric ratios?",
    answer: "For an acute angle in a right triangle they are: sin, cos, tan, csc, sec, and cot. The calculator evaluates all six for the acute angles."
  },
  {
    question: "What is a 3-4-5 triangle?",
    answer: "A 3-4-5 triangle is a right triangle because: 3² + 4² = 5². It is the simplest and most widely recognized integer Pythagorean triple."
  },
  {
    question: "What is a 5-12-13 triangle?",
    answer: "It is another Pythagorean triple: 5² + 12² = 13². Its area is 30 square units and its perimeter is 30 units."
  },
  {
    question: "Can a right triangle have a hypotenuse shorter than a leg?",
    answer: "No. The hypotenuse is always the longest side because it is opposite the 90° angle."
  },
  {
    question: "Can I use decimal measurements?",
    answer: "Yes. Decimal side lengths and angles can be used as long as the values satisfy the geometric constraints of a valid right triangle."
  }
];
