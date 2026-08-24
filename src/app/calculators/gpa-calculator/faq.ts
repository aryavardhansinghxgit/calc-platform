import { CalculatorFAQ } from "@/calculators/types";

export const gpa_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "What is a GPA and how is it calculated?",
    answer:
      "GPA is a credit-weighted average of grade points. Each course contributes grade points multiplied by its credits, and the total quality points are divided by total graded credits under the selected grading model.",
  },
  {
    question: "How do I calculate my semester GPA?",
    answer:
      "Enter each course, its grade and its credits. The calculator multiplies each grade-point value by the course credits, totals the quality points, divides by graded credits and rounds the displayed result to the calculator's configured precision.",
  },
  {
    question: "How is cumulative GPA different from semester GPA?",
    answer:
      "Semester GPA covers the selected term. Cumulative GPA combines prior academic history and current or additional terms using total quality points divided by total graded credits. It is not a simple average of semester GPAs.",
  },
  {
    question: "How does a GPA calculator handle prior credits and prior GPA?",
    answer:
      "The calculator converts the prior GPA and prior graded credits into prior quality points, then combines those points with the current term's quality points and credits. A larger prior-credit history generally makes the cumulative GPA less responsive to one new term.",
  },
  {
    question: "What is a weighted high school GPA?",
    answer:
      "A weighted GPA adds configured course-level modifiers to selected advanced classes such as honors or AP/IB courses. The exact weighting policy varies by school, so the calculator's 5.0-style model should be treated as an illustrative framework.",
  },
  {
    question: "How does the Target GPA Solver work?",
    answer:
      "It calculates the average GPA required across your future graded credits to reach a selected cumulative target using the current quality points, current credits and future credits. If the required future GPA exceeds the configured grading scale, the target is flagged as mathematically unreachable under those assumptions.",
  },
  {
    question: "Can I raise my cumulative GPA to 4.0?",
    answer:
      "It depends on your current GPA, completed credits, remaining graded credits and the maximum grade point available on your scale. The Target GPA Solver shows the required future GPA so you can see whether the goal is mathematically achievable.",
  },
  {
    question: "How are international GPA conversions calculated?",
    answer:
      "The International Scale mode uses the calculator's configured conversion tables to provide illustrative equivalents for selected grading systems. These are not official credential evaluations, and universities or credential evaluators may use different conversion methods.",
  },
  {
    question: "Does a 3.3 GPA always equal the same international GPA?",
    answer:
      "No. International GPA equivalence depends on the grading system, institution, country, program and evaluation method. A calculator can provide a reference estimate, but an official credential evaluation may produce a different result.",
  },
  {
    question: "How are honors, Dean's List and academic standing determined?",
    answer:
      "The calculator uses configured GPA thresholds to display planning labels. Official academic standing, honors and Latin-honor eligibility depend on the institution, program and applicable academic policy.",
  },
  {
    question: "Do repeated courses, withdrawals and pass/fail grades affect GPA?",
    answer:
      "They can, but the treatment varies by institution. Some schools replace grades, some average attempts, and some exclude particular non-graded categories. Use the calculator's supported model and verify your school's official policy.",
  },
  {
    question: "Why can my calculated GPA differ from my official transcript?",
    answer:
      "Your institution may use a different grade-point scale, rounding method, repeated-course policy, treatment of special grades, credit definitions or transfer rules. The calculator is a mathematical planning model and does not replace the institution's official transcript calculation.",
  },
];
