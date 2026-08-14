import { CalculatorFAQ } from "@/calculators/types";

export const grade_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How do you calculate a weighted grade?",
    answer:
      "To calculate a weighted grade, multiply each assignment or category score (percentage) by its assigned decimal weight (e.g., 20% = 0.20), sum all weighted values together, and divide by the total completed weight percentage.",
  },
  {
    question: "How do I calculate what score I need on my final exam to pass or get an A?",
    answer:
      "Use the Final Exam Target Formula: Required Final Score = [Target Grade - (Current Grade × (1 - Final Exam Weight))] / Final Exam Weight. For example, if you have an 85% current grade, want a 90% target, and your final is worth 20%, you need a 110% unless extra credit or curved grading applies.",
  },
  {
    question: "What is the difference between weighted grading and points-based grading?",
    answer:
      "Weighted grading assigns fixed percentage proportions to different assignment categories (e.g., Homework 20%, Exams 50%), while points-based grading sums all earned points across all assignments and divides by total possible points regardless of category.",
  },
  {
    question: "What happens if my category weights do not add up to 100%?",
    answer:
      "If category weights sum to less than 100% (e.g., during an ongoing semester where future projects haven't been assigned yet), our calculator automatically normalizes your grade by dividing the weighted sum of completed work by the sum of completed category weights.",
  },
  {
    question: "How does dropping the lowest quiz or assignment score affect my grade?",
    answer:
      "Dropping the lowest score removes your single worst assignment percentage from that category's average before the category weight is applied, raising your overall category mean and boosting your final course grade.",
  },
  {
    question: "What is a standard grading curve and how is it calculated?",
    answer:
      "A grading curve adjusts raw scores across a class. Common methods include flat point curves (adding a fixed number of points so the highest score reaches 100%) and square-root curves (Curved Grade = 10 × √Raw Score).",
  },
  {
    question: "How does extra credit impact a weighted grade?",
    answer:
      "Extra credit can be applied in two ways: adding points directly to an assignment's earned score (raising that category's average) or adding flat percentage points directly to your final course grade total.",
  },
  {
    question: "What is the minimum percentage needed for an A, B, C, or D?",
    answer:
      "Standard US collegiate cutoffs require: 90% for A- / 93% for A, 80% for B- / 83% for B, 70% for C- / 73% for C, and 60%–65% for D. Grades below 60%–65% are classified as failing (F).",
  },
  {
    question: "Can a final exam lower my grade if I already have an A?",
    answer:
      "Yes. Because a final exam typically carries heavy weight (20% to 50% of the total course grade), scoring poorly on the final exam can pull your cumulative course average down below the 90% A threshold.",
  },
  {
    question: "How do I convert a percentage grade into a 4.0 GPA scale?",
    answer:
      "Standard 4.0 GPA conversion maps percentage ranges directly: 93%–100% = 4.0 (A), 90%–92% = 3.7 (A-), 87%–89% = 3.3 (B+), 83%–86% = 3.0 (B), 80%–82% = 2.7 (B-), 77%–79% = 2.3 (C+), 73%–76% = 2.0 (C), 70%–72% = 1.7 (C-), 65%–69% = 1.0 (D), and <65% = 0.0 (F).",
  },
];
