import { CalculatorFAQ } from "@/calculators/types";

export const gpa_calculatorFaqs: CalculatorFAQ[] = [
  {
    question: "How is GPA calculated?",
    answer:
      "For a credit-weighted GPA, multiply each course's numerical grade value by its credit hours, add the resulting quality points, and divide by the total graded credit hours: GPA = [Σ(Grade Value × Credits)] / [Σ Credits]. Universities such as ASU and Georgia Tech document this basic quality-point method.",
  },
  {
    question: "What is the difference between semester GPA and cumulative GPA?",
    answer:
      "Semester GPA measures the selected academic term using only the quality points and credits earned during that term. Cumulative GPA combines your entire academic history across terms using the corresponding combined quality points and graded credits. Cumulative GPA is therefore not generally the simple average of semester GPAs.",
  },
  {
    question: "What is a good GPA?",
    answer:
      "There is no single GPA that universally means 'good.' Academic standing, scholarships, honors, and graduate admissions thresholds vary significantly by institution and program. Check the actual catalog criteria of the school or academic program you are evaluating.",
  },
  {
    question: "How many quality points is an A?",
    answer:
      "On a standard 4.0 model, an A is worth 4.0 grade points per credit hour. A three-credit A contributes 12.0 quality points (4.0 × 3 = 12.0), while a four-credit A contributes 16.0 quality points. The exact grade-point value can vary by institution.",
  },
  {
    question: "Does a 4-credit course affect GPA more than a 3-credit course?",
    answer:
      "Yes, when GPA is credit-weighted. A four-credit course has greater weight than a three-credit course because its grade contributes four times the grade-point value to the numerator instead of three times, and increases the denominator by four credits.",
  },
  {
    question: "How can I raise my cumulative GPA?",
    answer:
      "First determine the GPA required in your remaining credits. Improving grades in future courses raises the cumulative GPA only to the extent that the future grade average exceeds your current cumulative average. The Target GPA Solver can quantify the exact future performance needed.",
  },
  {
    question: "Why is my required target GPA above 4.0?",
    answer:
      "That means the requested cumulative target is mathematically unreachable under the standard 4.0 scale ceiling and the remaining credit hours specified. Your completed credits and accumulated quality points are too heavily established for the remaining courses to move the cumulative average that high.",
  },
  {
    question: "What is a weighted GPA?",
    answer:
      "A weighted GPA gives additional numerical weight to selected advanced courses according to a school's grading policy. AP, IB, or Honors courses may receive additional weighting (typically +0.5 for Honors and +1.0 for AP/IB), but exact values depend entirely on the school's approved policy.",
  },
  {
    question: "Can a weighted GPA be higher than 4.0?",
    answer:
      "Yes. A school or district using an advanced weighted scale (such as a 5.0 maximum scale) can produce weighted GPAs greater than 4.0 when students excel in honors, AP, IB, or dual-enrollment coursework.",
  },
  {
    question: "Do colleges use the GPA printed by my high school?",
    answer:
      "Not necessarily. College admissions offices frequently recalculate GPAs using their own standardized institutional criteria, such as focusing on core academic subjects, removing non-academic electives, or modifying weighting policies.",
  },
  {
    question: "Does retaking a course replace the old grade?",
    answer:
      "It depends on institutional policy. Some colleges replace or forgive the prior grade in the cumulative average under an official grade-forgiveness policy, while others average both attempts or include all completed attempts on the official transcript.",
  },
  {
    question: "Do Pass/Fail and Withdrawals count toward GPA?",
    answer:
      "Most colleges exclude Pass/Fail (P/NP), Satisfactory/Unsatisfactory (S/U), Incompletes (I), and Official Withdrawals (W) from the GPA credit-hour denominator. However, policies vary, so always confirm with your registrar.",
  },
  {
    question: "How do I calculate cumulative GPA from previous GPA and current semester GPA?",
    answer:
      "Do not simply average the two GPAs unless they represent identical numbers of graded credits. Convert each GPA into quality points using its corresponding credit total, sum the quality points and credits, and divide total points by total credits.",
  },
  {
    question: "How do I convert my GPA to another country's grading system?",
    answer:
      "There is no single universal conversion formula. Country, institution, credential level, and grading scale affect international evaluations. Credential evaluators like World Education Services (WES) use country-specific methodologies rather than linear equations.",
  },
  {
    question: "Is Indian CGPA divided by 2.5 to get a U.S. GPA?",
    answer:
      "Dividing by 2.5 is sometimes used as a rough illustrative shortcut (e.g., 8.0 / 2.5 = 3.2), but it is not an official universal conversion. Accredited credential evaluators and university admissions perform individualized transcript conversions.",
  },
  {
    question: "Is 3.5 GPA good for graduate school?",
    answer:
      "A 3.5 GPA is generally competitive for many master's and doctoral programs, but admissions committees also evaluate prerequisite course grades, research experience, recommendation letters, test scores, and personal statements.",
  },
  {
    question: "How does GPA affect academic standing?",
    answer:
      "Academic-standing rules are set by individual institutions. While maintaining a 2.0 or 3.0 cumulative GPA is common for good standing, specific thresholds for Dean's List, academic warning, probation, or suspension are institution-specific.",
  },
  {
    question: "How does GPA affect Latin honors?",
    answer:
      "Latin honors thresholds (Cum Laude, Magna Cum Laude, Summa Cum Laude) are established by individual universities and often differ across colleges or graduating class percentiles within the same institution.",
  },
  {
    question: "Should I use this calculator for an official transcript evaluation?",
    answer:
      "Use this tool for academic planning, scenario analysis, and grade-goal tracking. It should not replace an official transcript calculation, institutional degree audit, or accredited credential evaluation report.",
  },
];
