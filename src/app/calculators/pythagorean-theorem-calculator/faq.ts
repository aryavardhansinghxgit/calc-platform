import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const pythagorean_theorem_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is the Pythagorean theorem?",
    answer: "The Pythagorean theorem states that in a right triangle, the sum of the squares of the two legs equals the square of the hypotenuse: a² + b² = c²."
  },
  {
    question: "How do I find the hypotenuse?",
    answer: "Square the two legs, add them, and take the square root: c = √(a² + b²). For example, legs 3 and 4 give a hypotenuse of 5."
  },
  {
    question: "How do I find a missing leg?",
    answer: "If c is the hypotenuse and b is known: a = √(c² − b²). The hypotenuse must be the longest side."
  },
  {
    question: "Can the Pythagorean theorem be used on any triangle?",
    answer: "No. The standard Pythagorean theorem applies specifically to right triangles."
  },
  {
    question: "What is a Pythagorean triple?",
    answer: "A Pythagorean triple is a set of positive integers that satisfies: a² + b² = c². Examples include 3-4-5, 5-12-13, and 8-15-17."
  },
  {
    question: "What if the answer contains a square root?",
    answer: "Keep the exact radical form when precision matters. For example, √2 is exact, while 1.4142 is a rounded decimal approximation."
  },
  {
    question: "How does the side-and-angle solver work?",
    answer: "It uses sine, cosine, and tangent according to the selected acute angle and the calculator's explicit side convention: sin θ = a/c, cos θ = b/c, tan θ = a/b."
  },
  {
    question: "Can the calculator calculate distance in 3D?",
    answer: "Yes. The 3D solver uses: d = √(x² + y² + z²), and also reports the corresponding two-dimensional base distance."
  },
  {
    question: "How can I check whether three sides form a right triangle?",
    answer: "Identify the longest side as c and test whether: a² + b² = c². If the two sides are not equal, the triangle is not right-angled."
  },
  {
    question: "What is the 3-4-5 rule?",
    answer: "A triangle with side lengths 3, 4, and 5 satisfies 3² + 4² = 5², so it is a right triangle. Scaled versions such as 6-8-10 work for the same reason."
  },
  {
    question: "Why is the hypotenuse always the longest side?",
    answer: "Because: c² = a² + b² and both a and b are positive lengths, so c² is greater than either a² or b². Therefore c is greater than either leg."
  },
  {
    question: "Do I need to use the same unit for every side?",
    answer: "Yes. Convert measurements to compatible units before applying the theorem. A length in meters cannot be combined directly with a length in centimeters without conversion."
  }
];
