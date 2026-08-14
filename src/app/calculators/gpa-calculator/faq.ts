import { CalculatorFAQ } from "@/calculators/types";

export const gpa_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How is college GPA calculated?",
    answer:
      "College GPA is calculated by multiplying each course's numerical grade point value (e.g., A = 4.0, B = 3.0) by its credit hours to determine Quality Points. Total quality points earned across all courses are then divided by the total number of graded credit hours.",
  },
  {
    question: "What is the difference between Semester GPA and Cumulative GPA?",
    answer:
      "Semester GPA (Term GPA) measures academic performance strictly within a single academic term or semester. Cumulative GPA (CGPA) encompasses your total academic history, combining quality points and graded credit hours earned across all completed semesters.",
  },
  {
    question: "What is the difference between a weighted and unweighted GPA?",
    answer:
      "An unweighted GPA measures raw course grades on a strict 4.0 ceiling regardless of course difficulty. A weighted GPA awards extra grade point bonuses for challenging courses—typically adding +0.5 for Honors classes (4.5 scale) and +1.0 for Advanced Placement (AP) or International Baccalaureate (IB) classes (5.0 scale).",
  },
  {
    question: "Do Pass/Fail (P/F) or Withdrawn (W) classes affect your GPA?",
    answer:
      "No. Standard Pass/Fail (P/NP), Satisfactory/Unsatisfactory (S/U), Incomplete (I), and Official Withdrawal (W) grades carry zero grade points and are excluded from the GPA credit hour denominator. Earned credits count toward graduation totals without impacting GPA averages.",
  },
  {
    question: "How do retaking classes and grade forgiveness work?",
    answer:
      "Many universities offer grade forgiveness or course retake policies where repeating a failed or low-graded course replaces the prior low grade point value in your cumulative GPA calculation with the new grade earned, though both attempts usually remain visible on official transcripts.",
  },
  {
    question: "What is considered a \"good\" GPA in college and high school?",
    answer:
      "In high school and college, a 3.0 GPA represents a solid B average (good standing). A 3.5 or higher qualifies students for the Dean's List and merit scholarships, while a 3.7 to 4.0 is highly competitive for top graduate programs, medical school, and law school admissions.",
  },
  {
    question: "Why is it harder to raise your GPA during junior and senior years?",
    answer:
      "This occurs due to mathematical credit hour inertia. As you accumulate 60+ credit hours during freshman and sophomore years, each new 3-credit course represents a progressively smaller fraction of your total credit denominator, requiring significantly more high-grade credits to shift your cumulative average.",
  },
  {
    question: "What are \"Quality Points\" in academic grading?",
    answer:
      "Quality Points are the product of multiplying a course's numerical grade value by its assigned credit hour weight. For example, earning an A (4.0 points) in a 4-credit calculus course yields 16.0 Quality Points (4.0 × 4).",
  },
  {
    question: "How do you convert a 10.0 CGPA scale to a 4.0 US GPA?",
    answer:
      "While official credential evaluators (like WES) perform course-by-course transcript conversions, a standard direct linear conversion divides Indian CGPA by 2.5 (e.g., 8.0 CGPA / 2.5 = 3.2 US GPA) or converts percentage ranges directly to US letter grade scales.",
  },
  {
    question: "What GPA is required for Latin Honors (Cum Laude, Magna Cum Laude, Summa Cum Laude)?",
    answer:
      "Latin Honors thresholds vary by university, but standard guidelines require: Cum Laude (Honor) ~3.50–3.69, Magna Cum Laude (High Honor) ~3.70–3.89, and Summa Cum Laude (Highest Honor) ~3.90–4.00.",
  },
];
