import { CalculatorFAQ } from "@/calculators/types";

export const grade_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do I calculate my current grade?",
    answer:
      "First identify whether your course is weighted by categories or based on total points. For weighted grading, multiply each category grade by its weight and add the contributions. For points grading, divide total points earned by total points possible and multiply by 100.",
  },
  {
    question: "How do I calculate a weighted grade?",
    answer:
      "Use: Weighted Grade = Σ(Category Grade × Category Weight), provided the weights represent the complete course grading structure.",
  },
  {
    question: "How do I calculate what I need on my final exam?",
    answer:
      "Use: F = [T - C(1 - W)] / W, where T is your target grade, C is your current grade, and W is the final-exam weight.",
  },
  {
    question: "What if the calculator says I need more than 100% on the final?",
    answer:
      "That means the requested target is mathematically unreachable under a normal 0–100% final-exam scale. Do not replace the result with 100%. Check whether the course allows extra credit, a curve, grade replacement or another mechanism.",
  },
  {
    question: "Is weighted grading the same as averaging my assignment percentages?",
    answer:
      "No. A weighted system gives categories different levels of influence. A 50%-weighted final has much greater impact than a 5%-weighted homework category even when both percentages are identical.",
  },
  {
    question: "How does dropping the lowest grade affect my course grade?",
    answer:
      "The selected lowest score is removed before the category average is calculated. For example, dropping 60 from scores of 95, 60 and 90 leaves 95 and 90, producing a 92.5% category average.",
  },
  {
    question: "How do I calculate a points-based grade?",
    answer:
      "Add all points earned, add all points possible, then calculate: (Earned / Possible) × 100. The calculator's reference example is 246 / 270 = 91.11%.",
  },
  {
    question: "How does a grading curve change my score?",
    answer:
      "It depends on the curve defined by your course. This calculator includes a square-root reference model in which: Curved Grade = 10 × √Raw Score. For example, 64% becomes 80% under that model. The curve is a selected calculation model, not a universal grading rule.",
  },
  {
    question: "Can my course grade be higher than 100%?",
    answer:
      "It can be possible when a course permits extra credit or another mechanism that adds value beyond the ordinary 100% scale. Whether that is allowed depends on your course's grading policy.",
  },
  {
    question: "What percentage is an A or A-?",
    answer:
      "The calculator's reference model places A- at 90–92.9% and A at 93–96.9%, but these boundaries are not universal. Your school or instructor may use different cutoffs. College Board specifically notes that grading scales vary between schools.",
  },
  {
    question: "Is a 90% always a 3.7 GPA?",
    answer:
      "No. The relationship between percentages, letter grades and GPA points depends on the grading scale being used. Even universities using a 4.0-oriented system can assign different plus/minus values. ASU, for example, publishes its own grade-point table.",
  },
  {
    question: "How is my course grade converted to GPA?",
    answer:
      "Usually, a letter grade or grade-point value is combined with course credit hours to calculate quality points: Quality Points = Grade-Point Value × Credits. The GPA is then the total quality points divided by total graded credits. ASU documents this quality-point method.",
  },
];
