import React from "react";
import Link from "next/link";

export function GPAContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-zinc-300">
      {/* 1. WHAT IS A GPA CALCULATOR? */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          1. What Is a GPA Calculator?
        </h2>
        <p className="leading-relaxed">
          A GPA calculator converts course grades into a grade point average by combining grade-point values with the credit or unit value of each course. The core calculation is simple: convert each grade into points, multiply points by credits to obtain quality points, total the quality points, and divide by total graded credits. Because the calculation is credit-weighted, a four-credit course has more influence than a one-credit course with the same letter grade. This makes a GPA calculator useful not only for a quick semester calculation but also for comparing how future courses can change an overall academic record.
        </p>
        <p className="leading-relaxed">
          The calculator should not be presented as a universal transcript evaluator. Institutions can use different scales and rules for pass/fail work, repeated courses, withdrawals, transfer credit, incomplete grades, and academic standing. MIT&apos;s official GPA methodology, for example, uses a 5.0 scale and excludes several categories from GPA computation. The calculator therefore provides a mathematical planning model rather than a universal replacement for an institution&apos;s transcript policy.
        </p>
      </section>

      {/* 2. HOW SEMESTER GPA IS CALCULATED */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          2. How Semester GPA Is Calculated
        </h2>
        <p className="leading-relaxed">
          The validated baseline demonstrates the standard quality-point method. Calculus I has an A worth 4.0 over 4 credits, producing 16.0 quality points. English Composition has an A- worth 3.7 over 3 credits, producing 11.1. General Chemistry contributes 13.2 quality points from a B+ worth 3.3 over 4 credits, and World History contributes 9.0 from a B worth 3.0 over 3 credits. The semester total is therefore 49.3 quality points across 14 graded credits.
        </p>
        <p className="leading-relaxed">
          The semester GPA is 49.3 divided by 14, or approximately 3.5214, which is displayed as 3.52. The important implementation detail is that the calculator keeps full internal precision and rounds only at the presentation layer. That prevents a rounded semester GPA from contaminating later cumulative calculations. You can explore how course grades contribute to overall academic performance using our dedicated{" "}
          <Link href="/calculators/grade-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Grade Calculator
          </Link>.
        </p>

        {/* Step-by-Step Table */}
        <div className="overflow-x-auto my-4">
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
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.0</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">16.0</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">English Composition</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">A-</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.7</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.0</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">11.1</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">General Chemistry</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">B+</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.3</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.0</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">13.2</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">World History</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">B</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.0</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.0</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">9.0</td>
              </tr>
              <tr className="bg-slate-100 dark:bg-zinc-800 font-extrabold">
                <td className="p-2 border border-slate-200 dark:border-zinc-800" colSpan={3}>
                  Total Semester
                </td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-blue-600">14.0 Credits</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-blue-600">49.3 Points</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 3. HOW CUMULATIVE GPA IS CALCULATED */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          3. How Cumulative GPA Is Calculated
        </h2>
        <p className="leading-relaxed">
          Cumulative GPA is a credit-weighted average across academic history. In the baseline, the prior academic record is a 3.2 GPA across 30 graded credits, equivalent to 96.0 prior quality points. The current term adds 49.3 quality points and 14 credits. The combined record is therefore 145.3 quality points across 44 credits, producing a cumulative GPA of approximately 3.3023 and a displayed value of 3.30.
        </p>
        <p className="leading-relaxed">
          A cumulative GPA must not be calculated by simply averaging semester GPAs. For example, a 4.0 semester over 4 credits followed by a 2.0 semester over 20 credits produces (16 + 40) / 24 = 2.33, not 3.00. The calculator correctly aggregates quality points and graded credits, which preserves the weight of larger academic terms.
        </p>
      </section>

      {/* 4. QUALITY POINTS, CREDITS AND WHY COURSE WEIGHT MATTERS */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          4. Quality Points, Credits and Why Course Weight Matters
        </h2>
        <p className="leading-relaxed">
          Quality points are the bridge between an individual grade and an overall GPA. A course&apos;s contribution is grade-point value multiplied by credits. This means the same letter grade can have different impact depending on how many credits the course carries. A four-credit A contributes 16.0 quality points, while a three-credit A- contributes 11.1. Courses with more credits affect the denominator as well, so both the numerator and denominator change when a course is added.
        </p>
        <p className="leading-relaxed">
          For students planning future terms, this is why a low grade in a high-credit class can influence cumulative GPA more strongly than the same grade in a low-credit elective. It also explains why adding more credits at an average higher than the current cumulative GPA tends to raise the cumulative GPA, while adding credits below the current average tends to lower it. When managing weekly academic study loads, students can plan credit-hour commitments with our{" "}
          <Link href="/calculators/hours-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Hours Calculator
          </Link>{" "}
          or verify proportional weighting with the{" "}
          <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Percentage Calculator
          </Link>.
        </p>
      </section>

      {/* 5. PREVIOUS ACADEMIC HISTORY AND GPA INERTIA */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          5. Previous Academic History and GPA Inertia
        </h2>
        <p className="leading-relaxed">
          When prior GPA and prior graded credits are entered, the calculator combines that history with the current term. The effect of a new semester depends on how much academic history already exists. A small number of new credits can move a cumulative GPA noticeably when prior credits are low, while the same semester has a smaller effect after a student has accumulated many credits.
        </p>
        <p className="leading-relaxed">
          This effect is sometimes described informally as GPA inertia. It is not a separate formula; it is simply the mathematical consequence of averaging quality points over a larger credit base. A student with 100 prior credits at a 3.2 GPA cannot move the cumulative result to 4.0 with one 15-credit semester, because the existing 100 credits remain part of the denominator. The calculator&apos;s Target GPA Solver uses the same underlying quality-point logic when determining how much future performance would be needed for a target.
        </p>
      </section>

      {/* 6. WEIGHTED HIGH SCHOOL GPA ON A 5.0-STYLE MODEL */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          6. Weighted High School GPA on a 5.0-Style Model
        </h2>
        <p className="leading-relaxed">
          Weighted high-school GPA gives additional points to selected course levels such as honors or AP/IB courses. In the calculator&apos;s configured model, regular courses receive the base grade-point value, honors courses receive the configured additional weight (+0.5), and AP/IB courses receive the configured higher modifier (+1.0). In the validated example, Calculus I at A receives 5.0 points under the AP/IB rule, English Composition at A- receives 4.2 under the honors rule, and the regular Chemistry and History courses retain their base values. The resulting weighted GPA is approximately 3.91.
        </p>
        <p className="leading-relaxed">
          This is a calculator model, not a universal U.S. high-school grading rule. Schools and districts can use different weighting systems, different course categories, and different maximum scales. The page should therefore describe 5.0 weighting as an illustrative and configurable framework and encourage users to compare it with their school&apos;s official grading policy.
        </p>
      </section>

      {/* 7. UNWEIGHTED VS. WEIGHTED GPA */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          7. Unweighted vs. Weighted GPA
        </h2>
        <p className="leading-relaxed">
          An unweighted GPA generally assigns the configured base grade-point value regardless of course level, while a weighted GPA adds a course-level modifier for approved honors, AP, IB, or other advanced classes. The distinction can materially change a student&apos;s reported GPA. An A in a regular course may remain 4.0 in an unweighted system, while the same A can exceed 4.0 in a weighted model.
        </p>
        <p className="leading-relaxed">
          The important question is not whether weighted GPA is better, but which grading policy the student&apos;s school uses. A college admissions office may evaluate transcript rigor using the school&apos;s original scale rather than relying on a generic 5.0 conversion. The calculator is therefore most useful when the user selects rules that match the school&apos;s official grading policy or transcript instructions.
        </p>
      </section>

      {/* 8. TARGET GPA SOLVER */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          8. Target GPA Solver
        </h2>
        <p className="leading-relaxed">
          The Target GPA Solver works backward from a desired cumulative GPA and the number of future graded credits. The calculation is based on required future quality points: target GPA multiplied by the future total credits, minus quality points already accumulated, divided by future credits. The result is the average GPA required across the future credits under the calculator&apos;s assumptions. For complex quantitative academic planning and algebraic goal modeling, you can also use our{" "}
          <Link href="/calculators/scientific-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Scientific Calculator
          </Link>.
        </p>
        <p className="leading-relaxed">
          The solver is useful because it reveals whether a goal is mathematically reachable. A target may require a future GPA above the configured maximum scale, in which case the goal is infeasible with the stated number of credits. Conversely, if the current cumulative GPA already exceeds the target, the future requirement can become minimal or unnecessary. The calculator should present these outcomes as mathematical planning results, not as predictions of a student&apos;s eventual academic performance.
        </p>
      </section>

      {/* 9. WHY TARGET GPA RESULTS CAN BE ABOVE 4.0 */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          9. Why Target GPA Results Can Be Above 4.0
        </h2>
        <p className="leading-relaxed">
          A required future GPA above 4.0 does not automatically mean the solver is broken. It can mean the desired cumulative target is too high for the number of future credits available on the configured grading scale. The correct interpretation is that the target is mathematically unreachable under the current assumptions.
        </p>
        <p className="leading-relaxed">
          The calculator should also avoid silently rounding intermediate cumulative values before solving the target. In the validated GPA build, preserving full internal quality points corrected an intermediate-rounding anomaly: 145.3 cumulative quality points must remain 145.3 rather than becoming 145.2 through a rounded 3.30 multiplied by 44. The corrected target result is 4.4733..., displayed as 4.47.
        </p>
      </section>

      {/* 10. GPA IMPROVEMENT PLANNING */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          10. GPA Improvement Planning
        </h2>
        <p className="leading-relaxed">
          A GPA calculator can help students test the effect of future grades, but it should not promise that a certain study strategy will produce a guaranteed result. The mathematical part is straightforward: if future grades are above the current cumulative GPA, the cumulative GPA tends to rise; if they are below it, the cumulative GPA tends to fall. The size of the change depends on the number of future credits.
        </p>
        <p className="leading-relaxed">
          Students can use the solver to compare scenarios such as 3.5, 3.7, and 4.0 future-term GPAs. That can provide a realistic range rather than one fixed outcome. Actual academic performance depends on course difficulty, instructor grading, workload, assessment design, institutional rules, and many other factors that are outside the calculator&apos;s mathematical model.
        </p>
      </section>

      {/* 11. INTERNATIONAL GPA CONVERSION */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          11. International GPA Conversion
        </h2>
        <p className="leading-relaxed">
          The International Scale mode provides illustrative equivalents across the calculator&apos;s configured MIT 5.0, Canadian/ASU 4.33, Indian 10.0, UK degree classification, and ECTS outputs. These should be interpreted as reference conversions generated by the calculator&apos;s tables, not as official credential evaluations. Students working with non-standard ratio conversions or fraction-based grading schemes can cross-reference calculations using our{" "}
          <Link href="/calculators/ratio-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Ratio Calculator
          </Link>{" "}
          and{" "}
          <Link href="/calculators/fraction-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Fraction Calculator
          </Link>.
        </p>
        <p className="leading-relaxed">
          International grading systems are not directly interchangeable in every context. WES provides its own GPA conversion tools, while some admissions offices explicitly tell applicants not to convert their own international grades and instead review the original scale. Therefore, the calculator should use terms such as illustrative equivalent, estimated conversion, or calculator model and should not promise that a particular GPA will always receive one official classification.
        </p>
      </section>

      {/* 12. INTERNATIONAL GPA VS. CREDENTIAL EVALUATION */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          12. International GPA vs. Credential Evaluation
        </h2>
        <p className="leading-relaxed">
          A GPA conversion tool and an official credential evaluation are different products. A calculator can apply a lookup table or mathematical mapping to produce an approximate equivalent. A credential evaluator may review transcripts, institutions, grading scales, course content, and documentation before producing an evaluation report. WES offers an iGPA tool as well as formal evaluation services, illustrating the distinction between a quick estimate and an official evaluation.
        </p>
        <p className="leading-relaxed">
          A student applying internationally should therefore use the calculator for planning and rough comparison, but follow the destination university or credential evaluator&apos;s instructions for official admissions or transfer-credit decisions. Professional licensing and credential recognition can also have separate rules.
        </p>
      </section>

      {/* 13. ACADEMIC STANDING AND HONORS LABELS */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          13. Academic Standing and Honors Labels
        </h2>
        <p className="leading-relaxed">
          The calculator includes academic-standing and honors labels based on configured GPA thresholds. These labels are useful as planning indicators, but the educational copy should not present them as universal institutional policy. Colleges can use different GPA thresholds and additional requirements for good standing, Dean&apos;s List status, Latin honors, probation, and dismissal.
        </p>
        <p className="leading-relaxed">
          The calculator&apos;s current configured labels include thresholds such as good standing at or above 2.0 and higher honor tiers at progressively higher GPAs. These are model outputs. A student&apos;s official academic standing or honors eligibility is determined by the relevant institution and program policy, not by a generic online calculator.
        </p>
      </section>

      {/* 14. REPEATED COURSES, WITHDRAWALS AND SPECIAL GRADE CODES */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          14. Repeated Courses, Withdrawals and Special Grade Codes
        </h2>
        <p className="leading-relaxed">
          GPA treatment for repeated courses, withdrawals, pass/fail courses, incompletes, audits, and other special grade codes varies by institution. A calculator can only model a special status if its engine knows the applicable rule. MIT, for example, excludes several non-standard grade categories from its GPA calculation and counts a repeated subject each time it is taken under its published methodology. Other institutions may use grade replacement, forgiveness, or averaging policies.
        </p>
        <p className="leading-relaxed">
          This calculator should therefore avoid implying that one retake or withdrawal rule applies everywhere. If a user has a different institutional policy, the official catalog, registrar, or academic policy should take precedence.
        </p>
      </section>

      {/* 15. HOW GPA ROUNDING WORKS */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          15. How GPA Rounding Works
        </h2>
        <p className="leading-relaxed">
          Internal precision matters because GPA calculations are ratios. The validated engine keeps full floating-point precision throughout quality-point, cumulative, and target calculations and rounds only when a result is displayed. That prevents errors caused by using a displayed 3.30 cumulative GPA as though it were the exact underlying value when the exact result is 3.3022727... or similar. When conducting broader academic data analysis or distribution checks, you can reference our{" "}
          <Link href="/calculators/statistics-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
            Statistics Calculator
          </Link>.
        </p>
        <p className="leading-relaxed">
          For students comparing a hand calculation with the calculator, small differences can occur if the hand calculation rounds each step. The best practice is to keep all course quality points and credits unrounded, divide only at the appropriate stage, and round the final displayed GPA.
        </p>
      </section>

      {/* 16. SAVE, TRANSCRIPT REPORT AND ACADEMIC PLANNING */}
      <section className="space-y-4 dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          16. Save, Transcript Report and Academic Planning
        </h2>
        <p className="leading-relaxed">
          The calculator&apos;s save and report features can turn a one-time calculation into a reusable academic planning record. A user can enter courses, review semester and cumulative GPA, test weighted high-school scenarios, inspect a target GPA requirement, and generate a report data set represented by the current mode. Because the report is generated by the calculator state, it should be treated as a calculated GPA report or academic planning summary rather than as an institution-issued transcript unless an actual institution has issued it.
        </p>
        <p className="leading-relaxed">
          A third-party calculator cannot establish an institution&apos;s official academic record.
        </p>
      </section>

      {/* 17. METHODOLOGY, PRIVACY AND ACADEMIC DISCLAIMER */}
      <section className="space-y-4 dark:border-zinc-800 pt-6 pb-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          17. Methodology, Privacy and Academic Disclaimer
        </h2>
        <p className="leading-relaxed">
          <strong>Core methodology:</strong> Each course is mapped to a grade-point value under the selected scale. Quality points equal grade-point value multiplied by course credits. Semester GPA equals total quality points divided by graded credits. Cumulative GPA combines prior quality points with current and additional term quality points and divides by the combined graded credits. Weighted high-school GPA applies the configured course-level modifiers. The Target GPA Solver works backward from the desired cumulative GPA, current quality points, and future credits. International mode applies the calculator&apos;s configured conversion tables.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 text-xs leading-relaxed space-y-2">
          <p className="font-bold text-slate-900 dark:text-zinc-100">Educational &amp; Privacy Notice</p>
          <p>
            This is an educational planning calculator, not an official transcript system, credential evaluator, admissions decision tool, or institutional academic-policy engine. GPA scales, grade mappings, honors standards, retake policies, academic standing, and international conversion practices vary. The calculator performs its computations in the browser, and saved calculator history can be stored locally when the feature is enabled. Users should verify official academic decisions with their institution, registrar, school district, admissions office, or credential evaluator.
          </p>
        </div>
      </section>
    </article>
  );
}

export default GPAContent;
