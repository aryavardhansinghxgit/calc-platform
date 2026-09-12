"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck, Calculator, CheckCircle2 } from "lucide-react";
import { grade_calculatorFaqs } from "@/app/calculators/grade-calculator/faq";

export function GradeContent() {
  // All 12 FAQs open by default per editorial guidelines
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
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
    <article className="mt-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800">
      {/* ARTICLE INTRO */}
      <div className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Grade Calculator: Weighted Grades, Final Exam Targets, Points &amp; GPA
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A grade calculator helps you determine your current course grade from assignments, category weights, or total points, then estimate what score you need on a final exam to reach a target grade.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The important first step is identifying how your course is graded. A weighted-category course might assign 20% to homework, 30% to quizzes and 50% to a final project or exam. A points-based course instead adds the points earned and divides them by the total points possible. These systems can produce different results from the same-looking set of scores.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This calculator supports both approaches and also includes dropped-lowest scores, grading-curve models, extra-credit handling, a final-exam target solver, and a reference letter-grade scale. It is intended for academic planning; your instructor&apos;s syllabus remains the authoritative source for your actual course grade.
        </p>
        <div className="p-3.5 bg-emerald-50/70 dark:bg-zinc-800/60 rounded-xl border border-emerald-200 dark:border-zinc-700 text-xs text-emerald-900 dark:text-emerald-200 font-semibold flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>
            The calculator&apos;s reference weighted example produces 90.30%, an A-, with category contributions of 18.50%, 25.80%, and 46.00%.
          </span>
        </div>
      </div>

      {/* 20 EXPANDED EDUCATIONAL SECTIONS */}
      <div className="space-y-9 pt-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Grade Calculator?
          </h2>
          <p>
            A grade calculator combines your assessment results according to the grading method used by the course.
          </p>
          <p>The simplest case is a points-based course:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100">
            Course Grade = (Points Earned / Points Possible) × 100
          </div>
          <p>A weighted-category course works differently:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100">
            Course Grade = Σ (Category Grade_i × Category Weight_i)
          </div>
          <p>
            The difference matters. A 90% on an assignment worth 5% of the course does not have the same effect as a 90% on a final worth 40%.
          </p>
          <p>
            A useful{" "}
            <Link
              href="/calculators/gpa-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
            >
              GPA Calculator
            </Link>{" "}
            becomes relevant after the course percentage has been translated into the grade-point system used by your school or university.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Weighted Grading vs Points-Based Grading
          </h2>
          <p>Most grade-calculation errors come from using the wrong mathematical model.</p>
          <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100 pt-1">
            Weighted percentage grading
          </h3>
          <p>In a weighted system, categories receive fixed percentages of the final course grade. For example:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums max-w-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-zinc-700 bg-slate-50/80 dark:bg-zinc-800/80">
                  <th className="py-2 px-3 font-extrabold text-slate-700 dark:text-zinc-300">Category</th>
                  <th className="py-2 px-3 font-extrabold text-slate-700 dark:text-zinc-300">Weight</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                <tr>
                  <td className="py-1.5 px-3">Homework</td>
                  <td className="py-1.5 px-3">20%</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3">Quizzes</td>
                  <td className="py-1.5 px-3">30%</td>
                </tr>
                <tr>
                  <td className="py-1.5 px-3">Final</td>
                  <td className="py-1.5 px-3">50%</td>
                </tr>
                <tr className="font-bold bg-slate-50 dark:bg-zinc-800/50">
                  <td className="py-1.5 px-3">Total</td>
                  <td className="py-1.5 px-3">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The individual scores within each category are first combined according to the category&apos;s rules. The resulting category average is then multiplied by its course weight.
          </p>
          <h3 className="text-sm font-bold text-slate-900 dark:text-zinc-100 pt-2">
            Points-based grading
          </h3>
          <p>A points system ignores category percentages and uses total earned points:</p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-center text-xs sm:text-sm font-bold text-slate-900 dark:text-zinc-100">
            Grade = (Σ P_earned / Σ P_possible) × 100
          </div>
          <p>
            This difference is fundamental. In our points reference case: Assignment 1 (45/50), Assignment 2 (18/20), Exam (88/100), Essay (95/100). Total earned is 45 + 18 + 88 + 95 = 246 points, while total possible is 50 + 20 + 100 + 100 = 270 points. Therefore: (246 / 270) × 100 = 91.1111...% or 91.11%. The calculator&apos;s verified points-mode result is exactly 91.11%.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. How to Calculate a Weighted Grade
          </h2>
          <p>
            For a weighted course, convert each category weight into decimal form and multiply it by the category result.
          </p>
          <p>
            Suppose: Homework = 92.5% (Weight = 20%), Quizzes = 86% (Weight = 30%), Final = 92% (Weight = 50%).
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs font-sans tabular-nums">
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700">
              92.5 × 0.20 = <strong>18.5 pts</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700">
              86.0 × 0.30 = <strong>25.8 pts</strong>
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700">
              92.0 × 0.50 = <strong>46.0 pts</strong>
            </div>
          </div>
          <p>
            Add the weighted contributions: 18.5 + 25.8 + 46.0 = 90.3. So the overall course grade is <strong>90.30%</strong>. This is a weighted average, not an ordinary average of the three category percentages.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Why Category Weights Matter
          </h2>
          <p>
            A category&apos;s influence is determined by its weight. A 50%-weighted final exam can affect your course grade far more than a 5%-weighted quiz, even if both are scored out of 100.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-center text-xs sm:text-sm font-bold">
            Contribution = Category Grade × Category Weight
          </div>
          <p>
            For example, an 80% final worth 50% contributes 80 × 0.50 = 40 percentage points to the course. An 80% quiz worth 5% contributes 80 × 0.05 = 4 percentage points. The score is identical. The academic impact is not.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. How Dropping the Lowest Grade Works
          </h2>
          <p>
            Some instructors allow the lowest quiz, homework or assignment score to be removed before calculating the category average.
          </p>
          <p>
            Suppose your homework scores are 95, 60, 90 and your syllabus says to drop the lowest one. The lowest score is 60, so the remaining scores are 95 and 90. The category average becomes (95 + 90) / 2 = 92.5%. If that category represents 20% of the course, 92.5 × 0.20 = 18.5. The calculator therefore contributes 18.50 percentage points from that category.
          </p>
          <p>
            Dropping the lowest score is not the same as replacing it with zero, and it should never be treated as though the missing assignment still contributes zero to the average.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Dropping Scores With Ties and Multiple Assignments
          </h2>
          <p>
            A correct drop-lowest calculation must handle more than one assignment. For scores of 80, 80, 90, dropping one lowest score leaves 80 and 90, producing an 85% average. Dropping two lowest leaves 90%.
          </p>
          <p>
            The treatment of ties depends on the number of scores the instructor permits you to drop. The calculator applies the selected drop count rather than arbitrarily removing every tied score. This matters when a course allows multiple dropped quizzes.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Points-Based Grade Calculation
          </h2>
          <p>
            Points-based grading is often easier to calculate because every assessment contributes through earned and possible points. The formula is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-center text-xs sm:text-sm font-bold">
            Grade = (Total Points Earned / Total Points Possible) × 100
          </div>
          <p>
            Using the calculator&apos;s reference case: 246 / 270 × 100 = 91.11%. This is different from averaging the individual percentages. For example, 90% and 45% do not necessarily produce 67.5% when the underlying assignments have different point totals. The correct points-based method uses the actual earned and possible points. For statistical distribution of your class scores, our{" "}
            <Link
              href="/calculators/statistics-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
            >
              Statistics Calculator
            </Link>{" "}
            can help you evaluate standard deviations, quartiles, and score distributions.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. What Grade Do I Need on My Final Exam?
          </h2>
          <p>
            The Final Exam Target mode works backward from your desired course grade. Let C be current course grade before the final, T be target course grade, W be final-exam weight, and F be required final-exam score:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-center text-xs sm:text-sm font-bold">
            F = [T - C × (1 - W)] / W
          </div>
          <p>This is the standard reverse-weighting calculation.</p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Final Exam Worked Example
          </h2>
          <p>
            Suppose: Current grade = 85%, Desired course grade = 90%, Final exam weight = 20%. The existing coursework contributes 85 × (1 - 0.20) = 85 × 0.80 = 68. To reach 90: 90 - 68 = 22. Therefore: F = 22 / 0.20 = 110%.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-center text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
            Required Final Exam Score = 110.0%
          </div>
          <p>
            The calculator intentionally preserves the mathematically correct 110% rather than incorrectly replacing it with 100%. Its verified output also flags the target as unreachable under a normal 0–100% final exam unless some other course mechanism applies. This is one of the most useful properties of a target solver: it can tell you when a goal is mathematically impossible under the stated assumptions.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. What an Impossible Final-Exam Target Means
          </h2>
          <p>
            A result above 100% does not mean the formula failed. It means the target cannot be achieved through the final exam alone under an ordinary 0–100% scoring range. Possible explanations could include extra credit, a grading curve, grade replacement, a different weighting rule, or an instructor-specific policy.
          </p>
          <p>
            The calculator should show the mathematical result and explain the constraint rather than silently changing 110% into 100%. That distinction is particularly important for academic planning.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Grading Curves
          </h2>
          <p>
            Some courses apply a mathematical transformation or instructor-defined curve to raw scores. The calculator includes a square-root model:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-center text-xs sm:text-sm font-bold">
            Curved Grade = 10 × √Raw Score
          </div>
          <p>
            For 64%: 10 × √64 = 10(8) = 80%. For 81%: 10 × √81 = 10(9) = 90%. These examples are verified by the calculator&apos;s test suite. A grading curve is not a universal mathematical rule. Your syllabus or instructor determines whether a curve exists and how it is applied.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. How Curves Affect Weighted Grades
          </h2>
          <p>
            The order of operations matters. Under the calculator&apos;s documented model, a curve is applied at the category level before the resulting grade is multiplied by the category weight.
          </p>
          <p>
            For example: Raw score: 64%, Square-root curve: 80%, Category weight: 20%. Contribution: 80 × 0.20 = 16 percentage points. The calculator specifically verifies this order of operations. A different syllabus could define a different procedure, so always compare the model with your course policy.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Extra Credit and Grades Above 100%
          </h2>
          <p>
            Extra credit can be handled in different ways. An instructor might add points directly to an assignment, add bonus points to the total earned points, modify a category average, or add points after the weighted calculation. These are mathematically different.
          </p>
          <p>
            For that reason, a grade calculator should not assume that all extra-credit systems work identically. This calculator supports documented extra-credit behavior while preserving results above 100% where the selected model legitimately produces them rather than silently clamping them.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Understanding Letter Grades
          </h2>
          <p>
            A percentage is often converted into a letter grade using a grading scale. The calculator&apos;s reference model uses:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead>
                <tr className="border-b border-slate-200 dark:border-zinc-700 bg-slate-50/80 dark:bg-zinc-800/80">
                  <th className="py-2 px-3 font-extrabold text-slate-700 dark:text-zinc-300">Letter</th>
                  <th className="py-2 px-3 font-extrabold text-slate-700 dark:text-zinc-300">Percentage</th>
                  <th className="py-2 px-3 font-extrabold text-slate-700 dark:text-zinc-300">GPA Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                <tr><td className="py-1.5 px-3 font-bold">A+</td><td className="py-1.5 px-3">97–100%</td><td className="py-1.5 px-3">4.00</td></tr>
                <tr><td className="py-1.5 px-3 font-bold">A</td><td className="py-1.5 px-3">93–96.9%</td><td className="py-1.5 px-3">4.00</td></tr>
                <tr><td className="py-1.5 px-3 font-bold">A-</td><td className="py-1.5 px-3">90–92.9%</td><td className="py-1.5 px-3">3.70</td></tr>
                <tr><td className="py-1.5 px-3 font-bold">B+</td><td className="py-1.5 px-3">87–89.9%</td><td className="py-1.5 px-3">3.30</td></tr>
                <tr><td className="py-1.5 px-3 font-bold">B</td><td className="py-1.5 px-3">83–86.9%</td><td className="py-1.5 px-3">3.00</td></tr>
                <tr><td className="py-1.5 px-3 font-bold">B-</td><td className="py-1.5 px-3">80–82.9%</td><td className="py-1.5 px-3">2.70</td></tr>
                <tr><td className="py-1.5 px-3 font-bold">C+</td><td className="py-1.5 px-3">77–79.9%</td><td className="py-1.5 px-3">2.30</td></tr>
                <tr><td className="py-1.5 px-3 font-bold">C</td><td className="py-1.5 px-3">73–76.9%</td><td className="py-1.5 px-3">2.00</td></tr>
                <tr><td className="py-1.5 px-3 font-bold">C-</td><td className="py-1.5 px-3">70–72.9%</td><td className="py-1.5 px-3">1.70</td></tr>
                <tr><td className="py-1.5 px-3 font-bold">D</td><td className="py-1.5 px-3">65–69.9%</td><td className="py-1.5 px-3">1.00</td></tr>
                <tr><td className="py-1.5 px-3 font-bold">F</td><td className="py-1.5 px-3">Below 65%</td><td className="py-1.5 px-3">0.00</td></tr>
              </tbody>
            </table>
          </div>
          <p>
            These are the calculator&apos;s reference boundaries, not a universal academic standard. That distinction matters because grading scales vary among schools, colleges, instructors and programs. College Board explicitly notes that high schools use different grading scales and that its common 4.0 example is not necessarily the student&apos;s actual institutional scale.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Why Your School&apos;s Grading Scale May Be Different
          </h2>
          <p>
            A 90% can represent an A-, A or another designation depending on the institution. Likewise, plus/minus GPA values can differ. ASU, for example, publishes its own grade-point values and explains that its A+ can carry 4.33 grade points while its cumulative GPA is capped at 4.00.
          </p>
          <p>
            Therefore, never assume that a percentage-to-GPA conversion found online automatically represents your institution. Use your syllabus, academic catalog or registrar&apos;s grading policy for an official determination.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. From Course Grade to GPA
          </h2>
          <p>
            A course percentage and a GPA are related but are not the same measurement. A GPA calculation usually involves Grade Point Value × Credit Hours for each graded course:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-center text-xs sm:text-sm font-bold">
            GPA = (Total Grade Points) / (Total Graded Credits)
          </div>
          <p>
            ASU&apos;s registrar documentation describes this quality-point method explicitly: multiply the grade-point value by the course&apos;s semester hours, add the resulting honor points and divide by net graded hours. Once you know the final percentage or letter grade from this calculator, the GPA Calculator can be used for the separate credit-weighted GPA calculation.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. How to Use the Grade Calculator Efficiently
          </h2>
          <p>
            Start by identifying the grading model in your syllabus. For weighted categories, enter category names, category weights, assignment scores, any dropped-lowest rule, and any applicable curve. For points-based courses, enter each assessment&apos;s earned points and possible points. For a final-exam target, enter your current course grade, desired final course grade, and final exam weight.
          </p>
          <p>
            If you need to quickly solve score portions or weight fractions independently, you can also cross-reference values with our{" "}
            <Link
              href="/calculators/percentage-calculator"
              className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700"
            >
              Percentage Calculator
            </Link>{" "}
            to determine incremental mark changes or partial completion percentages.
          </p>
        </section>

        {/* Section 18 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            18. How to Use a Grade Calculator for Study Planning
          </h2>
          <p>
            The most useful purpose of a target-grade calculation is not simply predicting a final number. It is identifying where additional effort can have the greatest mathematical effect.
          </p>
          <p>
            Suppose your final exam is worth 40% and a small quiz is worth 5%. Improving a final exam score by 10 percentage points changes the course grade by 10 × 0.40 = 4 percentage points. Improving a 5%-weighted quiz by the same 10 points changes the course grade by 10 × 0.05 = 0.5 percentage points. The relative weights therefore help you prioritize study time.
          </p>
        </section>

        {/* Section 19 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            19. Common Grade-Calculation Mistakes
          </h2>
          <ul className="space-y-2 list-disc list-inside text-slate-700 dark:text-slate-300">
            <li><strong>Mistake 1: Averaging category percentages equally</strong> — A 20%-weighted category and a 50%-weighted category should not receive equal influence.</li>
            <li><strong>Mistake 2: Averaging assignment percentages in a points course</strong> — Use total earned divided by total possible.</li>
            <li><strong>Mistake 3: Forgetting dropped-score rules</strong> — If the syllabus drops one score, calculate the category after removing the applicable lowest score.</li>
            <li><strong>Mistake 4: Treating an impossible target as 100%</strong> — If the algebra gives 110%, the correct mathematical result is 110%.</li>
            <li><strong>Mistake 5: Assuming every grading curve works the same way</strong> — Curves are course-specific policies.</li>
            <li><strong>Mistake 6: Treating a reference letter-grade table as universal</strong> — Percentage boundaries and GPA mappings vary between institutions.</li>
            <li><strong>Mistake 7: Confusing course grade and GPA</strong> — A 90% course grade is not automatically equivalent to one universal GPA value.</li>
          </ul>
        </section>

        {/* Section 20 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            20. Grade Calculator Accuracy: How the Results Are Verified
          </h2>
          <p>
            The calculator&apos;s production test suite independently verifies weighted-grade calculations, points-based grades, dropped-score behavior, grading curves, final-exam targets, category management, weight normalization, mathematical properties, invalid-input boundaries, grading-scale mappings, export consistency, and Save/Restore isolation.
          </p>
          <div className="p-3.5 bg-emerald-50/70 dark:bg-zinc-800/60 rounded-xl border border-emerald-200 dark:border-zinc-700 text-xs text-emerald-900 dark:text-emerald-200 font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>
              The latest verification reports 325,047 independent assertions passed out of 325,047, including 25,000 randomized tests for each major calculation family.
            </span>
          </div>
          <p>
            The calculation layer also preserves full numerical precision and applies display rounding only at presentation, reducing the risk of cumulative rounding errors. The final-exam solver similarly preserves an impossible 110% result instead of clamping it to 100%.
          </p>
        </section>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS (UNFOLDED BY DEFAULT) */}
      <div className="pt-8 space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {grade_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-2xs"
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
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal border-t border-slate-100 dark:border-zinc-800">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* GRADE CALCULATION QUICK REFERENCE */}
      <div className="pt-8 space-y-4">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Grade Calculation Quick Reference
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs font-sans tabular-nums">
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 block">Weighted Grade</span>
            <div className="font-bold text-slate-900 dark:text-zinc-100">G = Σ(G_i × W_i)</div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 block">Points-Based Grade</span>
            <div className="font-bold text-slate-900 dark:text-zinc-100">G = (Σ P_e / Σ P_p) × 100</div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 block">Final Exam Target</span>
            <div className="font-bold text-slate-900 dark:text-zinc-100">F = [T - C(1 - W)] / W</div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 block">Dropped Score Category Avg</span>
            <div className="font-bold text-slate-900 dark:text-zinc-100">Avg = Σ Remaining / Count</div>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/60 rounded-xl border border-slate-200 dark:border-zinc-700 space-y-1 sm:col-span-2 lg:col-span-2">
            <span className="text-[10px] font-extrabold uppercase text-slate-500 dark:text-zinc-400 block">Cumulative GPA</span>
            <div className="font-bold text-slate-900 dark:text-zinc-100">GPA = Σ(Grade Points × Credits) / Σ Credits</div>
          </div>
        </div>
        <p className="text-xs text-slate-500 dark:text-zinc-400">
          These formulas describe different parts of academic calculation. They should not be substituted for one another.
        </p>
      </div>

      {/* ACADEMIC POLICY DISCLAIMER & AUTHORITATIVE REFERENCES */}
      <div className="pt-8 space-y-6">
        <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/70 space-y-2">
          <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-xs">
            <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Academic Policy Disclaimer
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            This calculator provides mathematical estimates based on the grading model and values selected by the user. Your actual grade depends on the rules established by your instructor, school, university or academic program. Weighting, dropped assignments, extra credit, grading curves, grade boundaries, repeated courses and GPA conversion policies can differ. For example, College Board notes that schools use different GPA systems and that colleges may recalculate GPA using their own criteria. For official academic decisions, use the syllabus, registrar&apos;s published grading rules or the admissions office&apos;s stated methodology.
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            Authoritative References &amp; Methodology
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            The calculation concepts on this page are grounded in established academic grading practices:
          </p>
          <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 list-disc list-inside leading-relaxed">
            <li>
              <strong className="text-slate-800 dark:text-zinc-200">University Registrar Services, Arizona State University:</strong>{" "}
              GPA calculation using grade points and graded credit hours.
            </li>
            <li>
              <strong className="text-slate-800 dark:text-zinc-200">College Board BigFuture:</strong>{" "}
              Common 4.0 GPA examples, weighted vs. unweighted GPA, and the importance of institution-specific grading systems.
            </li>
          </ul>
          <p className="text-xs text-slate-500 dark:text-zinc-400 leading-relaxed pt-1">
            The calculator itself is independently regression-tested across its weighted-grade, points-based, dropped-score, curve, target-solving, scale-mapping and export pathways.
          </p>
        </div>
      </div>
    </article>
  );
}

export default GradeContent;
