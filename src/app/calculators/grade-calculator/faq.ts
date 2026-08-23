import { CalculatorFAQ } from "@/calculators/types";

export const grade_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate my current grade in a course?",
    answer:
      "Enter the grades or category averages and their weights. If only part of the course has been completed, the calculator normalizes the weighted contributions over the completed weight rather than treating ungraded future work as zero.",
  },
  {
    question: "How is a weighted grade different from a simple average?",
    answer:
      "A simple average gives each entered score equal influence. A weighted grade gives each category or assessment influence according to its syllabus weight, so a 90% final exam worth 40% affects the course more than a 90% quiz worth 5%.",
  },
  {
    question: "How do I calculate my grade when the course is not 100% complete?",
    answer:
      "Use the weighted values for the work that has been graded. The calculator divides the weighted contribution by the total completed weight, so a current grade reflects the work completed so far rather than assuming missing future grades are zeros.",
  },
  {
    question: "What grade do I need on my final exam?",
    answer:
      "Enter your current course grade, desired overall grade and final-exam weight. The calculator solves the weighted-average equation backward and returns the final score required to reach the target.",
  },
  {
    question: "What does it mean if I need more than 100% on my final?",
    answer:
      "It means the target is mathematically infeasible from the final exam alone under ordinary 0-100% grading and the entered assumptions. Extra credit, a grading curve or additional uncompleted coursework could change the assumptions.",
  },
  {
    question: "How does drop-lowest affect my grade?",
    answer:
      "The calculator removes the selected number of lowest scores from the category before calculating its average. The resulting category average is then multiplied by that category's course weight.",
  },
  {
    question: "How does extra credit affect my final grade?",
    answer:
      "Extra credit depends on the method defined by your course. The calculator can model its configured extra-credit behavior, but your syllabus determines whether bonus points are added to assignment scores, category totals or the overall grade.",
  },
  {
    question: "How does a grading curve change my grade?",
    answer:
      "A curve applies a mathematical transformation to the score according to the selected curve model. The calculator's available curve methods are examples and do not imply that every instructor or school uses the same curve.",
  },
  {
    question: "What is the difference between percentage grading and total-points grading?",
    answer:
      "Percentage grading can weight categories explicitly, while total-points grading divides all earned points by all possible points. The two methods can produce different results from the same underlying assignments.",
  },
  {
    question: "What percentage is an A, A-, B+, or another letter grade?",
    answer:
      "The calculator uses an illustrative percentage-to-letter mapping. Your actual course or institution may use different cutoffs, so the syllabus or official academic policy controls the final letter grade.",
  },
  {
    question: "How does the Grade Calculator convert a percentage to GPA?",
    answer:
      "It maps the percentage to a letter grade and then applies the calculator's selected quality-point mapping. GPA scales differ among institutions, so the displayed GPA should be treated as an illustrative conversion unless it matches your school's official policy.",
  },
  {
    question: "Why can my calculator grade differ from my official course grade?",
    answer:
      "Your instructor may use different weights, dropped assignments, extra-credit rules, rounding, category formulas, grade boundaries, curves, penalties or other policies. The calculator is only as accurate as the assumptions entered and should be checked against the official syllabus and gradebook.",
  },
];
