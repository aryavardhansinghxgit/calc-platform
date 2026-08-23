"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { grade_calculatorFaqs } from "@/app/calculators/grade-calculator/faq";

export function GradeContent() {
  // All 12 FAQs open by default
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. SINGLE CANONICAL RELATED CALCULATORS BLOCK (Exactly 7 Verified Live Routes) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Related Academic &amp; Calculation Tools
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/gpa-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            GPA Calculator
          </Link>
          <Link
            href="/calculators/percentage-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Percentage Calculator
          </Link>
          <Link
            href="/calculators/hours-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Hours Calculator
          </Link>
          <Link
            href="/calculators/scientific-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Scientific Calculator
          </Link>
          <Link
            href="/calculators/statistics-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Statistics Calculator
          </Link>
          <Link
            href="/calculators/fraction-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Fraction Calculator
          </Link>
          <Link
            href="/calculators/percent-error-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Percent Error Calculator
          </Link>
        </div>
      </div>

      {/* 2. EXPANDED MAIN EDUCATIONAL CONTENT (17 COMPLETE SECTIONS) */}
      <div className="space-y-8 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is a Grade Calculator?
          </h2>
          <p>
            A grade calculator combines assessment results into an estimate of a current or projected course grade. In a simple course, an ordinary average may be enough, but in a weighted course a 90% quiz is not equivalent to a 90% final exam if the two assessments have different weights. A weighted calculator therefore combines both the score and the fraction of the course represented by that score. This Grade Calculator extends that core calculation to incomplete course weights, dropped scores, final-exam target solving, grading curves, extra credit, total-point grading and illustrative letter and{" "}
            <Link href="/calculators/gpa-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              GPA Calculator
            </Link>{" "}
            conversion.
          </p>
          <p>
            The page should also distinguish the mathematical result from an official academic result. The tool can calculate the percentage implied by the inputs, but the instructor or institution controls official letter-grade cutoffs, GPA rules, honor-roll status, passing requirements, extra-credit policies and grading curves. Official university policies themselves show that GPA systems vary: Stanford uses a 4.3 scale, while MIT uses a 5.0 scale. Those differences are exactly why the converter must be described as illustrative rather than universal.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How a Weighted Grade Is Calculated
          </h2>
          <p>
            For a weighted course, each category average is multiplied by its decimal weight and the resulting contributions are added. If homework is worth 20%, quizzes 30%, and a final project 50%, the corresponding averages are multiplied by 0.20, 0.30 and 0.50 before being added. The important concept is that weights describe the share of the course, not the number of assignments inside the category. A category can contain three assignments or thirty and still carry the same course weight. You can also analyze raw proportions with our{" "}
            <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Percentage Calculator
            </Link>
            .
          </p>
          <p>
            The validated baseline makes the calculation concrete. Homework scores of 95%, 60% and 90% have a 20% weight with one lowest score dropped, so the 60% is removed and the category average becomes 92.5%. Its contribution is 18.5 points. Quizzes and Midterm average 86%, contributing 25.8 points at a 30% weight. Final Project and Exam is 92% at 50%, contributing 46 points. The overall result is 18.5 + 25.8 + 46 = 90.3%, producing the validated A- result.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Current Grade When the Course Is Not 100% Complete
          </h2>
          <p>
            If only part of a course has been graded, treating the missing weight as zero would make the current grade misleadingly low. Instead, the calculator normalizes the weighted contribution over the completed weight. With 90% homework worth 20% and 80% quizzes worth 30%, for example, the current normalized grade is (90 &times; 20 + 80 &times; 30) / 50 = 84%. The remaining 50% is future coursework, not a zero score. Plan study schedules effectively with our{" "}
            <Link href="/calculators/hours-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Hours Calculator
            </Link>
            .
          </p>
          <p>
            This distinction is important for searches such as current grade calculator and what is my grade so far. A useful result should separate the current normalized standing from the eventual final course grade and should make remaining weight understandable. Current competitors increasingly surface completed weight, remaining weight and required future performance because those details answer the planning question more directly than a single raw average.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Total Points Grading vs. Weighted Grading
          </h2>
          <p>
            In a total-points course, the grade is total earned points divided by total possible points. The validated example 45/50 + 18/20 + 88/100 + 95/100 equals 246/270, or 91.11%. Each assignment matters according to its possible-point value. A 100-point exam therefore carries more raw influence than a 10-point quiz when the course uses pure points.
          </p>
          <p>
            Weighted grading is different because the syllabus gives categories explicit percentages. A course can assign homework 20%, quizzes 30% and a final 50% even if the point totals in those categories are completely different. The same raw scores can therefore produce different answers under the two systems. Students should identify the grading method from the syllabus before entering data, because combining points and weights without a defined course policy can double-count the influence of assignments.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. What Grade Do I Need on My Final Exam?
          </h2>
          <p>
            The final-exam target solver works backward from the desired overall grade. If <em>C</em> is the current grade, <em>T</em> is the target, and <em>W</em> is the final-exam weight as a decimal, the required final is:
          </p>
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center">
            Required Final Score = [ T &minus; C &times; (1 &minus; W) ] / W
          </div>
          <p>
            With an 85% current grade, 20% final weight, and 90% target, the calculator returns 110%. The number is mathematically correct even though a normal final cannot exceed 100%, so the result is flagged as infeasible under ordinary scoring.
          </p>
          <p>
            The reverse solver also shows the leverage of an assessment. A final worth 50% can alter the overall course grade far more than a final worth 10%. A required score can also be lower than the current grade when the target is lower. The calculator should never clamp a mathematical result above 100% to 100%, because the value itself communicates whether the target is reachable from the remaining assessment.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. What It Means When You Need More Than 100% on the Final
          </h2>
          <p>
            A required final score above 100% means the target cannot be reached through that final alone under the current inputs and ordinary 0&ndash;100 scoring. It is not a calculation error. An 85% current grade, 20% final and 90% target requires 110%; an 80% current grade, 20% final and 100% target requires 180%. The final simply does not carry enough remaining weight to close the gap.
          </p>
          <p>
            The result is best treated as a planning signal. Course-specific extra credit, a grading curve, additional ungraded work or other syllabus provisions may change the assumptions. The calculator cannot know those policies unless they are modeled explicitly, so the appropriate interpretation is that the target is infeasible under the standard assumptions entered.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. How Drop-Lowest Scores Affect a Grade
          </h2>
          <p>
            A drop-lowest rule removes one or more of the lowest scores from a category before calculating the category average. For 95%, 60% and 90%, dropping zero gives 81.67%, dropping one gives 92.50%, and dropping two gives 95.00%. After the category average is calculated, the category weight is then applied to the overall course.
          </p>
          <p>
            This is a category operation, not a course-wide deletion. If homework is worth 20%, improving its average changes the final course grade only through that 20% share. The engine also handles tied lows, drop counts larger than the number of assignments and single-score categories safely without producing NaN. The actual course policy still determines which assessments may be dropped.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Extra Credit and Scores Above 100%
          </h2>
          <p>
            Extra credit is one of the least standardized parts of grading. One instructor may add bonus points to an assignment, another may add a fixed number of percentage points to the course, and another may use a separate rubric. The calculator should therefore expose the method it actually models rather than implying that all extra credit behaves the same way.
          </p>
          <p>
            A final-exam result above 100% also communicates a useful extra-credit question. A result of 110% says the ordinary final alone is insufficient, but it does not promise that ten bonus percentage points are available. Users should use the result to identify the size of the gap and then check the syllabus or instructor policy for any legitimate bonus opportunities.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Grading Curves and the Order of Operations
          </h2>
          <p>
            The calculator supports a square-root curve and a flat curve. The square-root transformation maps 64% to 80% and 81% to 90% using <code>10 &times; &radic;Raw Score</code>. The flat curve adds a configured number of points subject to a 100% ceiling. These formulas are mathematical models available in the tool, not universal academic rules.
          </p>
          <p>
            The validated processing order is raw scores, drop-lowest, category average, category weighting, overall course percentage, then the grading curve. This matters because applying a curve to each assignment before averaging can produce a different outcome. The content explains the order so users understand why their result may differ from an instructor&apos;s curve if the instructor applies a different policy.
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Letter Grades and GPA Quality Points Are Not Universal
          </h2>
          <p>
            The calculator&apos;s letter-grade table is an illustrative mapping: A+, A, A-, B+, B, B-, and lower bands. It must not be described as the universal U.S. university grading system. Some schools use different percentage boundaries, some do not use plus/minus grades, and others calculate academic standing with course-specific rules.
          </p>
          <p>
            GPA quality points vary even more. Stanford&apos;s official GPA page uses a 4.3 scale, while MIT&apos;s registrar states that MIT uses a 5.0 scale. Consequently, a generic online converter cannot know the official GPA equivalent for every institution. The calculator&apos;s 4.0 and 4.33 mappings should be identified as illustrative reference models and should be checked against the user&apos;s school policy before academic decisions are made.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Syllabus Presets and Category Weights
          </h2>
          <p>
            The College 20/30/50 and High School 40/40/20 presets are convenience templates, not statements about how every institution grades. A user should compare the preset with the actual syllabus and adjust categories, weights, drop rules and scores as necessary. Presets are useful because they reduce setup time, but they are safe only when treated as starting points.
          </p>
          <p>
            State behavior also matters. Switching presets should not leave hidden assignments or old weights contaminating a new calculation. Reset should restore the defined default state. A strong implementation keeps the preset logic separate from the mathematical engine so the same formulas remain valid whether the user starts from a preset or builds a course manually.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Category Contribution Charts and Interpreting Your Grade
          </h2>
          <p>
            The contribution chart shows how much each category actually adds to the overall percentage after weighting. In the baseline, Homework contributes 18.5 points, Quizzes and Midterm 25.8 points, and Final Project and Exam 46 points, summing to 90.3. This differs from simply showing the raw category percentages because a high category score may have a small course weight, while a lower score may carry a much larger weight.
          </p>
          <p>
            The chart is therefore best used for explanation rather than as a prescription for study time. It shows where mathematical leverage exists, but students also need to consider difficulty, remaining assessments, time constraints and course policies. The chart should always reconcile with the underlying calculator output and should never become a separate source of calculation logic.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Academic Standing, Honor Roll and Passing Labels
          </h2>
          <p>
            A calculator may display labels such as A-, Honor Roll or Passing, but those labels are not universal academic determinations. Honor-roll eligibility can depend on GPA, course load, minimum course grades and institutional rules. Passing can mean different things for credit, prerequisites or degree requirements. A generic percentage-to-label mapping cannot capture all of those conditions. For broader sample distributions, review our{" "}
            <Link href="/calculators/statistics-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Statistics Calculator
            </Link>
            .
          </p>
          <p>
            The correct framing is that these labels are illustrative or calculator-defined outputs. The student&apos;s official status comes from the institution, instructor, course syllabus and registrar policy. That distinction is especially important for SEO content because a useful educational page should not turn a configurable model into a claim about what every school considers passing or honors-level performance.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Study Planning: What the Calculator Can and Cannot Tell You
          </h2>
          <p>
            A grade calculator can quantify leverage. A final worth 50% has greater mathematical impact on the final course percentage than a quiz worth 5%, and a drop-lowest rule can materially change a category average. These calculations can help a student identify which remaining assignments matter most numerically and whether a target remains reachable.
          </p>
          <p>
            The calculator should not prescribe a universal study schedule. There is no mathematically valid rule that every student should spend a fixed percentage of study time on finals. Exam difficulty, course policy, current mastery, remaining assignments and available time all matter. The appropriate message is that the grade calculation can inform planning, while study strategy remains a personal decision.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Grade Calculator for Different Course Structures
          </h2>
          <p>
            Weighted grading can appear in homework-heavy classes, lab courses, project-based courses, exam-heavy university courses and secondary-school classes. The mathematics remains straightforward when the syllabus explicitly defines category weights, but the structure around those weights changes. A course may also contain hybrid rules, such as a points-based set of exams inside a weighted exam category.
          </p>
          <p>
            Users should match the calculator mode to the official grading method instead of forcing a course into the closest-looking template. If a syllabus says that a category is 30% of the final grade, the category should be calculated first according to its stated internal rules and then weighted at 30%. If the course is pure points, the total-points mode is the appropriate model. Hybrid policies require careful interpretation of the syllabus rather than assumptions.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Common Grade-Calculation Mistakes
          </h2>
          <p>
            The most common mistakes are using a simple average for weighted coursework, treating ungraded future work as zero, applying a drop rule to the wrong category, confusing point totals with category weights, and using a generic GPA scale as though it were the official university scale. For point breakdowns, check calculations with our{" "}
            <Link href="/calculators/fraction-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Fraction Calculator
            </Link>
            . Another frequent error is attempting to solve a final target without accounting for the portion of the course that is already complete.
          </p>
          <p>
            The calculator exists to reduce these errors by exposing the inputs and formulas. The best workflow is to reproduce the syllabus exactly, verify weights, verify which scores belong to which categories, confirm drop-lowest and curve rules, and then interpret the result as a mathematical projection. If the official gradebook differs, the first task is to compare the model assumptions rather than assume the calculator or gradebook is automatically wrong.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Calculation Methodology and Academic Disclaimer
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Methodology &amp; Model Assumptions
              </div>
              <p>
                Core methodology: weighted mode processes assignment scores within each category, removes the requested lowest scores, calculates the remaining category average, and combines categories using entered weights. When completed weight is less than 100%, the calculator normalizes over the completed weight. Total-points mode divides total earned by total possible points. Final-exam mode solves the weighted equation for the remaining exam score. Curve modes apply the configured mathematical transformation after the validated grading sequence. The scale converter maps the percentage to the configured illustrative letter/GPA reference.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Disclaimer &amp; Privacy Notice
              </div>
              <p>
                This calculator is a mathematical planning tool, not an official transcript, gradebook or institutional grading policy. Actual letter-grade boundaries, GPA values, academic-standing thresholds, honor-roll rules, passing requirements, extra-credit policies, drop rules and grading curves come from the relevant institution, instructor and syllabus. Verify high-stakes academic decisions against those official sources. The 0%-final-weight behavior is also an implementation caveat: the current engine clamps that input to 1% to avoid division by zero, and this should remain documented rather than silently changed during SEO integration.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. FAQ SECTION (Exactly 12 Approved FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
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
    </article>
  );
}

export default GradeContent;
