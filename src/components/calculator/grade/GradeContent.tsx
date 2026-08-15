import React from "react";

export function GradeContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-zinc-300">
      {/* 1. HOW ACADEMIC GRADING SYSTEMS WORK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          How Academic Grading Systems Work
        </h2>
        <p className="leading-relaxed">
          Educational institutions evaluate academic performance using two primary mathematical frameworks: 
          <strong> Weighted Percentage Grading</strong> and <strong>Points-Based Grading</strong>. Understanding how your instructor structures your syllabus is critical to calculating your overall course average accurately.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">Weighted Percentage Grading</h4>
            <p className="leading-relaxed">
              Course work is divided into distinct assessment categories (e.g., Homework 20%, Quizzes 30%, Midterm 20%, Final Exam 30%). Each category is assigned a fixed percentage proportion of the final 100% course grade.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Points-Based Grading</h4>
            <p className="leading-relaxed">
              Every assignment carries a raw maximum point value (e.g., Homework 50 pts, Exam 200 pts). Your final grade is calculated by simply summing all points earned across the term and dividing by total possible points.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs leading-relaxed space-y-1">
          <strong className="text-slate-900 dark:text-zinc-100">Category Weight Paradox:</strong> In a weighted grading system, a 10-point quiz in a 40% category impacts your overall course grade significantly more than a 100-point project in a 5% category. Raw point values only matter relative to their category&apos;s overall course weight.
        </div>
      </section>

      {/* 2. CORE MATHEMATICAL FORMULAS */}
      <section className="space-y-4 border-t border-slate-200 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          The Core Mathematical Formulas for Grade Calculation
        </h2>
        <p className="leading-relaxed">
          The exact mathematical equations governing course averages depend on whether category weights are complete, partial, or points-based:
        </p>

        {/* Math Formula Cards */}
        <div className="space-y-3 my-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">1. Weighted Grade Formula (Summing to 100%):</span>
            <div className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
              Overall Grade = (G₁ × W₁) + (G₂ × W₂) + ... + (Gₙ × Wₙ)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">2. Partial Term Normalized Weighted Formula:</span>
            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
              Current Grade = Σ(Gradeᵢ × Weightᵢ) / Σ(Weightᵢ)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">3. Points-Based Formula:</span>
            <div className="text-purple-600 dark:text-purple-400 font-extrabold text-sm">
              Overall Grade = (Σ Points Earned / Σ Total Possible Points) × 100
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <span className="text-slate-500 font-bold block text-[10px] uppercase">4. The Final Exam Target Equation:</span>
            <div className="text-amber-600 dark:text-amber-400 font-extrabold text-sm">
              Final Exam Score Needed = [Target Grade - (Current Grade × (1 - Final Weight))] / Final Weight
            </div>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-slate-900 dark:text-zinc-100 pt-2">
          Step-by-Step Final Exam Target Worked Example
        </h3>
        <p className="leading-relaxed text-xs">
          Suppose your current course grade is <strong>85%</strong> heading into finals, your desired target final grade is <strong>90% (A-)</strong>, and your upcoming final exam is worth <strong>20%</strong> of your overall course grade:
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-2">
          <p className="text-slate-700 dark:text-zinc-300">
            Final Exam Score Needed = [90 - (85 × (1 - 0.20))] / 0.20
          </p>
          <p className="text-slate-700 dark:text-zinc-300">
            Final Exam Score Needed = [90 - (85 × 0.80)] / 0.20 = [90 - 68] / 0.20 = 22 / 0.20
          </p>
          <p className="text-emerald-600 dark:text-emerald-400 font-black text-sm">
            Required Final Exam Score = 110.0%
          </p>
        </div>

        <p className="leading-relaxed text-xs">
          Because 110% exceeds 100%, achieving an A- requires extra credit points or curved grading on the final exam.
        </p>
      </section>

      {/* 3. STANDARD CONVERSION TABLES */}
      <section className="space-y-4 border-t border-slate-200 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Standard Grading Scales &amp; Conversion Tables
        </h2>
        <p className="leading-relaxed">
          Standard US university letter grade cutoffs and 4.0 quality point baseline mappings:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-zinc-800">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold">
              <tr>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Letter Grade</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Percentage Cutoff</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">4.0 Quality Points</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Academic Level</th>
              </tr>
            </thead>
            <tbody className="font-sans tabular-nums">
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-emerald-600">A+</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">97% – 100%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.00 / 4.33</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Highest Distinction</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-emerald-600">A</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">93% – 96%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Excellent / Honor Roll</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-emerald-600">A-</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">90% – 92%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.70</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Superior</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">B+</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">87% – 89%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.30</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Very Good</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">B</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">83% – 86%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Good Standing</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">B-</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">80% – 82%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.70</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Above Average</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-purple-600">C+</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">77% – 79%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.30</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Average</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-purple-600">C</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">73% – 76%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Satisfactory Pass</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-purple-600">C-</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">70% – 72%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">1.70</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Minimum Credit Pass</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-amber-600">D</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">65% – 69%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">1.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Marginal Pass</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-rose-600">F</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-rose-600">&lt; 65%</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-rose-600">0.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-rose-600">Failing Grade</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. ADVANCED POLICIES */}
      <section className="space-y-4 border-t border-slate-200 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Advanced Grading Policies &amp; Mechanics Explained
        </h2>
        <p className="leading-relaxed">
          Instructors often integrate mathematical adjustments to compensate for assignment difficulty:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs my-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">Dropping the Lowest Score</h4>
            <p className="leading-relaxed">
              Discards your worst raw assignment percentage in a cluster (e.g., dropping 1 quiz out of 5). Removing low outliers elevates the harmonic category average before category weighting occurs.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Square-Root Curve Mechanics</h4>
            <p className="leading-relaxed">
              Calculated using <code>10 × √Raw Score</code>. A raw score of 64% boosts to 80% (B-), while a raw score of 81% boosts to 90% (A-), providing proportional relief to lower scores.
            </p>
          </div>
        </div>
      </section>

      {/* 5. STRATEGIC STUDY PLANNING */}
      <section className="space-y-4 border-t border-slate-200 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-zinc-100">
          Strategic Study Planning &amp; Academic Triage
        </h2>
        <p className="leading-relaxed">
          During finals week, students face severe time constraints. Applying mathematical grade triage helps optimize study time based on return on investment (ROI):
        </p>

        <ul className="list-disc pl-6 space-y-2 text-xs">
          <li><strong>Identify Guaranteed Grades:</strong> If your required final exam score for a B is under 20%, spend minimal time reviewing for that exam.</li>
          <li><strong>Target High-Weight Finals:</strong> Direct 80% of your study hours toward final exams worth 30% to 50% of your overall course grade.</li>
          <li><strong>Recognize Unachievable Cutoffs:</strong> If reaching an A requires 115% on the final exam, shift study focus to courses where an A is realistically achievable (e.g., needing 88%).</li>
        </ul>
      </section>
    </article>
  );
}
