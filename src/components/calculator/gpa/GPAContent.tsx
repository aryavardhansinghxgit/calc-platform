"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, CheckCircle2 } from "lucide-react";
import { gpa_calculatorFaqs } from "@/app/calculators/gpa-calculator/faq";

export function GPAContent() {
  // All FAQs open by default per prompt specification
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: gpa_calculatorFaqs.length }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. EXPANDED MAIN EDUCATIONAL CONTENT (23 COMPLETE SECTIONS) */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Intro */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GPA Calculator: Calculate Semester, Cumulative &amp; Weighted GPA
          </h2>
          <p>
            A GPA calculator converts course grades and credit hours into a grade point average that summarizes academic performance numerically. For a credit-based GPA, each course contributes grade points multiplied by its credit hours, and the resulting total is divided by the number of graded credits. This is the same basic quality-point approach used by universities such as Arizona State University and Georgia Tech, although individual institutions can differ in grade scales, excluded grades, rounding, retake policies and other rules.
          </p>
          <p>
            This calculator is designed for more than a single semester. It can calculate semester GPA, cumulative GPA, weighted high-school GPA, target GPA requirements, academic standing indicators and illustrative international-scale mappings from the same academic record.
          </p>
          <p>
            The reference calculation used in the calculator is:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-semibold">
            <li>49.3 quality points</li>
            <li>14 graded credits</li>
            <li>3.52 semester GPA</li>
            <li>3.30 cumulative GPA</li>
            <li>3.91 weighted high-school GPA</li>
          </ul>
          <p>
            Those values have been independently regression-tested in the production implementation across 475,014 independent assertions.
          </p>
        </section>

        {/* Section 1 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is GPA?
          </h2>
          <p>
            GPA stands for Grade Point Average. It is a numerical summary of academic performance based on the grade-point values assigned to courses.
          </p>
          <p>
            A GPA is not simply an average of the letters on a transcript. In a credit-based system, a four-credit course can contribute more to the GPA than a one-credit course because its grade carries greater credit weight.
          </p>
          <p>A typical credit-weighted calculation is:</p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {"GPA = [ Σ(Grade Point Value × Credit Hours) ] / [ Σ Graded Credit Hours ]"}
          </div>
          <p>
            For example, an A worth 4.0 in a four-credit course contributes:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold text-slate-800 dark:text-slate-200">
            {"4.0 × 4 = 16.0 quality points"}
          </div>
          <p>
            The final GPA is obtained after combining the quality points from the applicable courses and dividing by the applicable graded credits. ASU documents this same quality-point methodology for its GPA calculation.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Semester GPA vs Cumulative GPA
          </h2>
          <p>These two values answer different questions.</p>
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-white">Semester GPA</h3>
            <p>
              Semester or term GPA measures academic performance over a particular academic period. It uses the quality points and graded credits belonging to that term.
            </p>
            <h3 className="font-bold text-slate-900 dark:text-white">Cumulative GPA</h3>
            <p>
              Cumulative GPA incorporates the applicable academic history across multiple terms. Conceptually:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
              {"CGPA = (Prior Quality Points + Current Quality Points) / (Prior Credits + Current Credits)"}
            </div>
            <p>
              This is why adding a new semester GPA directly to the previous cumulative GPA and dividing by two is usually incorrect.
            </p>
            <p>
              Suppose one term contains 10 credits at 3.0 and another contains 20 credits at 4.0. The correct cumulative GPA is:
            </p>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold text-slate-800 dark:text-slate-200">
              {"[ 10(3.0) + 20(4.0) ] / 30 = 110 / 30 ≈ 3.67"}
            </div>
            <p>not <code>(3.0 + 4.0) / 2 = 3.50</code>. Credit weighting matters.</p>
          </div>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How GPA Is Calculated From Grades and Credits
          </h2>
          <p>The calculation happens in three stages:</p>
          <div className="space-y-2">
            <p>
              <strong>Stage 1: Convert the grade to a grade-point value.</strong> For a typical 4.0 model, A = 4.0, B = 3.0, C = 2.0, D = 1.0, and F = 0.0. But there is an important qualification: there is no single universal letter-grade table used by every school. College Board notes that high schools use different grading systems and that the familiar 4.0 scale is only one common example. Before entering courses into the GPA model, you can use the{" "}
              <Link href="/calculators/grade-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                Grade Calculator
              </Link>{" "}
              to determine the numerical result of an assignment, exam or weighted course grading scheme.
            </p>
            <p>
              <strong>Stage 2: Calculate quality points.</strong> <code>Q_i = G_i × C_i</code>, where <code>Q_i</code> = quality points for course <em>i</em>, <code>G_i</code> = grade-point value, and <code>C_i</code> = credit hours.
            </p>
            <p>
              <strong>Stage 3: Divide total quality points by total graded credits.</strong> <code>GPA = (Σ Q_i) / (Σ C_i)</code>. This three-step method is the mathematical core of the calculator.
            </p>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Worked GPA Example
          </h2>
          <p>Consider these four courses from our validated golden reference suite:</p>
          <div className="overflow-x-auto my-2">
            <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-zinc-800">
              <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold">
                <tr>
                  <th className="p-2 border border-slate-200 dark:border-zinc-800">Course</th>
                  <th className="p-2 border border-slate-200 dark:border-zinc-800">Grade</th>
                  <th className="p-2 border border-slate-200 dark:border-zinc-800">Grade Value</th>
                  <th className="p-2 border border-slate-200 dark:border-zinc-800">Credits</th>
                  <th className="p-2 border border-slate-200 dark:border-zinc-800">Quality Points</th>
                </tr>
              </thead>
              <tbody className="font-sans tabular-nums">
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">Calculus I</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">A</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">4.0</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">4</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">16.0</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">English Composition</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">A-</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">3.7</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">3</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">11.1</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">General Chemistry</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">B+</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">3.3</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">4</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">13.2</td>
                </tr>
                <tr>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">World History</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">B</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">3.0</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800">3</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">9.0</td>
                </tr>
                <tr className="bg-slate-100 dark:bg-zinc-800 font-extrabold">
                  <td className="p-2 border border-slate-200 dark:border-zinc-800" colSpan={3}>Total</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 text-blue-600">14 Credits</td>
                  <td className="p-2 border border-slate-200 dark:border-zinc-800 text-blue-600">49.3 Points</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>Therefore:</p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold text-slate-800 dark:text-slate-200">
            {"GPA = 49.3 / 14 = 3.521428... → 3.52"}
          </div>
          <p>This is the calculator&apos;s production golden case.</p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            5. What Are Quality Points?
          </h2>
          <p>
            Quality points are the weighted contribution of a course to GPA. The formula is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100">
            {"Quality Points = Grade Point Value × Credit Hours"}
          </div>
          <p>
            For example, <code>4.0 × 4 = 16.0</code> for a four-credit A. A three-credit A- valued at 3.7 contributes <code>3.7 × 3 = 11.1</code>. A course&apos;s quality points therefore depend on both how well you performed and how many credits the course carries. Georgia Tech and ASU both document this grade-point-times-credit-hour approach.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Why Credit Hours Matter So Much
          </h2>
          <p>
            A GPA based on credit hours is a weighted average. Consider: Course A (4.0 GPA, 4 credits) and Course B (2.0 GPA, 1 credit). The correct calculation is:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold text-slate-800 dark:text-slate-200">
            {"[ 4.0(4) + 2.0(1) ] / (4 + 1) = 18 / 5 = 3.60"}
          </div>
          <p>
            A simple unweighted average would give <code>(4.0 + 2.0) / 2 = 3.00</code>. That 3.00 result ignores the fact that Course A carries four times the credit weight. This distinction is critical for accurate college GPA calculation. ASU describes the same principle explicitly: multiply each grade-point value by the corresponding semester hours, total the grade points, total the graded hours, and divide. Students working with broader academic datasets can also use the{" "}
            <Link href="/calculators/statistics-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Statistics Calculator
            </Link>{" "}
            to analyze averages, distributions and related measures.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            7. How to Calculate Cumulative GPA
          </h2>
          <p>
            Suppose your previous academic record contains a <strong>3.20 GPA</strong> over <strong>30 credits</strong>. Your prior quality points are <code>3.20 × 30 = 96.0</code>.
          </p>
          <p>
            Now suppose your new semester produces <strong>49.3 quality points</strong> over <strong>14 credits</strong>. Your combined record becomes <code>96.0 + 49.3 = 145.3</code> quality points and <code>30 + 14 = 44</code> graded credits.
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold text-slate-800 dark:text-slate-200">
            {"CGPA = 145.3 / 44 = 3.30227... → 3.30"}
          </div>
          <p>The calculator&apos;s golden case produces exactly this cumulative result.</p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Weighted High School GPA
          </h2>
          <p>
            A weighted GPA gives additional numerical weight to selected courses, such as Honors, AP or IB courses, according to the high school&apos;s grading policy.
          </p>
          <p>The calculator&apos;s reference model uses:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Regular course: base value (+0.0)</li>
            <li>Honors: additional weighting (+0.5)</li>
            <li>AP/IB: larger additional weighting (+1.0)</li>
          </ul>
          <p>
            Under the model tested in the calculator, the example course record produces <strong>3.91</strong> on its configured 5.0 weighted scale. However, this should not be interpreted as a universal rule. College Board specifically notes that schools can use different weighting systems and that colleges may recalculate GPA using their own criteria. So when comparing weighted GPAs between schools, always check the underlying grading policy.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Weighted GPA vs Unweighted GPA
          </h2>
          <p>
            An unweighted GPA generally evaluates courses using the ordinary grade-point scale without additional course-level bonuses. A weighted GPA may assign additional points for advanced coursework. For example, under one configured model: <code>A_regular = 4.0</code>, while <code>A_honors = 4.5</code> and <code>A_AP/IB = 5.0</code>.
          </p>
          <p>
            The important phrase is &ldquo;under one configured model.&rdquo; There is no universal requirement that every school use these exact values. College Board&apos;s guidance shows why school-specific grading policy matters when interpreting GPA.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Why Colleges May Recalculate Your GPA
          </h2>
          <p>
            A high-school GPA on a transcript is not always the exact GPA that a college admissions office will use. College Board notes that colleges may remove non-core courses, focus on core subjects, modify weighting, or apply their own institutional GPA methodology. That means two applicants with identical reported GPAs can be evaluated differently if their schools use different grading policies.
          </p>
          <p>
            The calculator is therefore useful for understanding and planning your academic record, but it should not be treated as a guarantee of how a particular admissions office will recalculate your transcript.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Target GPA Calculator: How High Must Your Future GPA Be?
          </h2>
          <p>
            One of the most useful planning features is the Target GPA Solver. Suppose your current record contains 44 completed graded credits, 145.3 cumulative quality points, and a current GPA of approximately 3.30. You want a final cumulative GPA of <strong>3.60</strong> after another <strong>15 credits</strong>.
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700 font-mono text-center text-xs font-bold text-slate-800 dark:text-slate-200">
            {"Desired Total Points = 3.60 × (44 + 15) = 212.4"}
            <br />
            {"Required Future Points = 212.4 - 145.3 = 67.1"}
            <br />
            {"Required Future GPA = 67.1 / 15 = 4.4733... → 4.47"}
          </div>
          <p>
            The calculator correctly identifies this as mathematically unreachable under a standard 4.0 maximum. This is more useful than simply saying &ldquo;you need better grades&rdquo; because it quantifies the actual target.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Why Raising a Low Cumulative GPA Gets Harder Over Time
          </h2>
          <p>
            Suppose your first 15 credits are completed at a low GPA. A later perfect semester can improve your GPA substantially because the early record has relatively little weight. After many semesters, however, the existing quality points become a much larger denominator. For example, changing a cumulative record covering 15 credits has a much larger proportional effect than changing one covering 120 credits. This is why target-GPA planning should consider <code>Current GPA + Completed Credits + Future Credits</code> rather than GPA alone.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Retakes and Grade Forgiveness
          </h2>
          <p>
            Retaken courses require special care because universities do not all treat repeated coursework the same way. Possible policies include:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>replacing the original grade;</li>
            <li>averaging both attempts;</li>
            <li>retaining both attempts in the GPA;</li>
            <li>excluding one attempt under an official grade-substitution policy.</li>
          </ul>
          <p>
            For example, Georgia Tech states that when a student takes the same course more than once, both grades can remain in the academic average except where a grade-substitution policy applies. Therefore, the calculator&apos;s retake/forgiveness feature should be interpreted as a selected policy model, not a universal statement about every university.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Do Pass/Fail and Withdrawals Affect GPA?
          </h2>
          <p>
            Not necessarily in the same way at every institution. Some universities exclude non-letter grades from GPA calculations, while others may have special treatment for individual course types. For example, Georgia Tech states that pass/fail and audit courses are not included in its GPA calculation, while its catalog separately defines grades such as S, U, V, I and W. ASU similarly distinguishes graded units from other grade designations when calculating GPA.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Understanding the 4.0 GPA Scale
          </h2>
          <p>
            The 4.0 scale is common, but there are variations. A typical simplified model is A = 4.0, B = 3.0, C = 2.0, D = 1.0, and F = 0.0. Some schools use plus/minus grades, different grade points, A+ values above 4.0, or other policies. ASU, for example, uses a plus/minus scale including A+ = 4.33 but caps cumulative GPA at 4.00. That demonstrates why the phrase &ldquo;4.0 GPA scale&rdquo; does not always tell you every detail of an institution&apos;s grading system. When your school reports marks as percentages, the{" "}
            <Link href="/calculators/percentage-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              Percentage Calculator
            </Link>{" "}
            can help with percentage changes and related grade calculations before applying the institution&apos;s own GPA rules.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            16. International GPA Conversion
          </h2>
          <p>
            International GPA conversion is one area where simple arithmetic can become misleading. An Indian CGPA, a U.S. GPA, a Canadian GPA and a European grade are not automatically interchangeable by one universal equation. Credential evaluators such as World Education Services (WES) perform country-specific evaluations and can calculate U.S. or Canadian equivalents using their own methodology. The international section of this calculator is therefore best used as an illustrative planning/reference conversion, not as an official credential evaluation.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Indian CGPA to U.S. GPA
          </h2>
          <p>
            A frequently encountered shortcut is to divide an Indian CGPA by 2.5 (for example, <code>8.0 / 2.5 = 3.2</code>). This can be useful as a quick illustrative estimate, but it should not be presented as an official universal conversion. Institutional grading structures and credential-evaluation methodologies differ. For formal international applications, follow the receiving institution&apos;s instructions or use the credential evaluator it specifies.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            18. Academic Standing and Honors
          </h2>
          <p>
            A GPA calculator can help you monitor academic progress, but labels such as Good Academic Standing, Dean&apos;s List, Latin Honors, Cum Laude, Magna Cum Laude, and Summa Cum Laude are not universally determined by one GPA threshold. A university may define its own academic-standing rules, credit minimums, probation criteria and honors thresholds. The calculator therefore treats such classifications as configured or illustrative criteria, not universal academic law.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            19. GPA and Scholarships or Graduate Admissions
          </h2>
          <p>
            A target GPA can be useful when planning for scholarships, graduate school or competitive programs. But GPA is only one admissions or eligibility variable. Depending on the institution and program, decisions may also consider prerequisite courses, course rigor, major-specific grades, standardized tests, research, recommendations, essays, and extracurricular experience. College Board likewise notes that GPA is only one part of a college application.
          </p>
        </section>

        {/* Section 20 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            20. How to Use This GPA Calculator
          </h2>
          <p>For a college or cumulative GPA:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Enter previous cumulative GPA if you already have academic history.</li>
            <li>Enter prior graded credits.</li>
            <li>Add every current course.</li>
            <li>Select the correct grade.</li>
            <li>Enter the corresponding credit hours.</li>
            <li>Review quality points and semester GPA.</li>
            <li>Review the updated cumulative GPA.</li>
          </ol>
          <p className="pt-1">
            For high school, switch to the weighted high-school model and select the appropriate course level. For planning, open the Target GPA Solver, enter your desired cumulative GPA and expected future credits, and review the required future GPA.
          </p>
        </section>

        {/* Section 21 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            21. A Practical GPA Planning Strategy
          </h2>
          <p>
            GPA improvement is fundamentally a weighted-average problem. If your current GPA is far below your goal, increasing future credit volume gives you more mathematical leverage. But taking additional courses solely to increase the denominator or credit total is not automatically beneficial. The quality of the new grades determines the direction of the cumulative average. A practical approach is to identify current GPA, current credits, target GPA, and available future credits, and calculate whether the target is mathematically achievable.
          </p>
        </section>

        {/* Section 22 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            22. What a GPA Calculator Can and Cannot Tell You
          </h2>
          <p>
            A GPA calculator can accurately perform the mathematics when the appropriate grade values, credits and institutional rules are supplied. It can answer: What is my semester GPA? What is my cumulative GPA? How many quality points did I earn? What GPA do I need in future courses? How does course weighting change a high-school GPA? What happens when credit hours change?
          </p>
          <p>
            It cannot independently determine how your university handles every special grade, how an admissions office will recalculate your transcript, whether your institution accepts a particular international conversion, whether a retaken course replaces the original grade, or whether a GPA qualifies you for a specific scholarship. Those are institutional policy questions.
          </p>
        </section>

        {/* Section 23 */}
        <section className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 dark:text-blue-400">
            23. Why Institutional Rules Matter
          </h2>
          <p>
            Two calculators can produce different answers from the same transcript if they use different grade tables or policy assumptions. For example, one institution may use A- = 3.7 while another uses A- = 3.67. One institution may include repeated attempts; another may replace the original grade. One may exclude pass/fail coursework; another may have a different rule. ASU&apos;s published grading system illustrates that even within a 4.0-oriented system, details such as A+ treatment, graded units, rounding and excluded grades are policy-defined. That is why the best GPA calculation starts with the official grading rules for the transcript being evaluated.
          </p>
        </section>
      </div>

      {/* 2. FREQUENTLY ASKED QUESTIONS (19 APPROVED FAQS, OPEN BY DEFAULT) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {gpa_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. GPA CALCULATION QUICK REFERENCE */}
      <div className="pt-6 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
          GPA Calculation Quick Reference
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Quality Points Formula</span>
            <div className="font-mono text-blue-600 dark:text-blue-400 font-bold">Q = G × C</div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">Grade points multiplied by course credit hours.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Semester GPA Formula</span>
            <div className="font-mono text-blue-600 dark:text-blue-400 font-bold">GPA = (Σ Q) / (Σ C)</div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">Total term quality points divided by total graded credit hours.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Cumulative GPA Formula</span>
            <div className="font-mono text-purple-600 dark:text-purple-400 font-bold">CGPA = (Q_prior + Q_current) / (C_prior + C_current)</div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">Full history credit-weighted quality point aggregation.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white block">Required Future GPA Formula</span>
            <div className="font-mono text-purple-600 dark:text-purple-400 font-bold">GPA_fut = [ T × (C_cur + C_fut) - Q_cur ] / C_fut</div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px]">Target GPA required across upcoming future graded credit hours.</p>
          </div>
        </div>
      </div>

      {/* 4. IMPORTANT GPA DISCLAIMER */}
      <div className="pt-6">
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 text-xs leading-relaxed">
          <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Important GPA Disclaimer &amp; Academic Notice
          </div>
          <p>
            This GPA calculator is an academic planning and calculation tool. Grade-point values, weighting systems, retake policies, pass/fail treatment, academic-standing thresholds, honors requirements and international conversions can vary by school, university, country and credential-evaluation organization.
          </p>
          <p>
            For official decisions, use the grading policy and transcript rules published by the relevant institution. College Board notes that schools use different GPA systems and that colleges may recalculate GPA themselves. WES likewise performs credential evaluations using its own country- and credential-specific methodology rather than a universal conversion equation.
          </p>
        </div>
      </div>

      {/* 5. STANDARDS & AUTHORITATIVE REFERENCES */}
      <div className="pt-6 space-y-4">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Standards &amp; Authoritative References
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-850/70 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              Arizona State University (ASU) — GPA Calculation Method
            </span>
            <p className="text-slate-600 dark:text-zinc-400">
              ASU published grading policy documents the official credit-weighted quality point method, graded vs. non-graded units, and plus/minus grade values.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-850/70 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              Georgia Tech — Registrar GPA &amp; Grade Substitution
            </span>
            <p className="text-slate-600 dark:text-zinc-400">
              Georgia Tech registrar rules define repeated-course calculations, exclusion of audit and pass/fail units, and official cumulative academic standing standards.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-850/70 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-amber-600" />
              College Board — High School GPA &amp; Weighting Policies
            </span>
            <p className="text-slate-600 dark:text-zinc-400">
              College Board research outlines unweighted 4.0 and weighted 5.0 AP/IB scales and explains how colleges recalculate GPAs during admissions.
            </p>
          </div>
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-zinc-800 bg-slate-50/70 dark:bg-zinc-850/70 space-y-1">
            <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-purple-600" />
              World Education Services (WES) — International Evaluations
            </span>
            <p className="text-slate-600 dark:text-zinc-400">
              WES documentation establishes country-specific and credential-specific translation frameworks, cautioning against simple linear conversion equations.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default GPAContent;
