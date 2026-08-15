import React from "react";

export function GPAContent() {
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none space-y-8 text-slate-700 dark:text-zinc-300">
      {/* 1. WHAT IS GPA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          What is Grade Point Average (GPA)?
        </h2>
        <p className="leading-relaxed">
          Grade Point Average (GPA) is the standard standardized numerical metric used by high schools, universities, admissions committees, and employers to evaluate a student&apos;s overall academic performance. 
          By converting alphabetical letter grades into numerical point values and weighting them by course credit hours, GPA provides a single, uniform index of academic rigor and mastery.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Term / Semester GPA</h4>
            <p className="leading-relaxed">
              Measures academic performance exclusively within a single session or semester (e.g., Fall 2026). It reflects short-term focus, recent grade improvements, or specific term honors like the Dean&apos;s List.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Cumulative GPA (CGPA)</h4>
            <p className="leading-relaxed">
              Encompasses your complete academic transcript history by combining all quality points and credit hours earned from freshman through senior years across your entire academic career.
            </p>
          </div>
        </div>
      </section>

      {/* 2. CORE MATHEMATICAL FORMULAS */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          The Core Mathematical Formulas for GPA Calculation
        </h2>
        <p className="leading-relaxed">
          Calculating GPA relies on three fundamental arithmetic steps: determining Quality Points per course, summing semester totals, and combining cumulative histories.
        </p>

        {/* Math Formula Cards */}
        <div className="space-y-3 my-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <span className="text-slate-900 font-bold block text-[10px] uppercase">1. Quality Points Formula:</span>
            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
              Quality Points = Grade Point Value × Credit Hours
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <span className="text-slate-900 font-bold block text-[10px] uppercase">2. Semester GPA Formula:</span>
            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
              Semester GPA = Total Quality Points in Semester / Total Graded Credit Hours
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 font-sans tabular-nums text-xs space-y-1">
            <span className="text-slate-900 font-bold block text-[10px] uppercase">3. Cumulative GPA Formula:</span>
            <div className="text-blue-600 dark:text-blue-400 font-extrabold text-sm">
              Cumulative GPA = (Prior Quality Points + Term Quality Points) / (Prior Credits + Term Credits)
            </div>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 pt-2">
          Step-by-Step Multi-Course Worked Example
        </h3>
        <p className="leading-relaxed">
          Consider a college student taking 4 courses during a 14-credit semester:
        </p>

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
                <td className="p-2 border border-slate-200 dark:border-zinc-800">English Comp</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">A-</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.7</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.0</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">11.1</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">Chemistry</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">B+</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.3</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.0</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">13.2</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">History</td>
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

        <p className="leading-relaxed text-xs">
          Dividing total quality points (49.3) by total credit hours (14.0) yields a <strong>Semester GPA of 3.52</strong>.
        </p>
      </section>

      {/* 3. CONVERSION TABLE */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          Standard 4.0 Grade Point Conversion Table
        </h2>
        <p className="leading-relaxed">
          Standard US grading scales map letter grades to unweighted 4.0 points and weighted 5.0 AP/IB scales:
        </p>

        <div className="overflow-x-auto my-4">
          <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-zinc-800">
            <thead className="bg-slate-100 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold">
              <tr>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Letter Grade</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Unweighted 4.0</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Honors (+0.5)</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">AP / IB Weighted (+1.0)</th>
                <th className="p-2 border border-slate-200 dark:border-zinc-800">Percentage Range</th>
              </tr>
            </thead>
            <tbody className="font-sans tabular-nums">
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">A+</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.0 / 4.33</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.50</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">5.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">97% – 100%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">A</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.50</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">5.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">93% – 96%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">A-</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.70</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.20</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.70</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">90% – 92%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">B+</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.30</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.80</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.30</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">87% – 89%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">B</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.50</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">4.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">83% – 86%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">B-</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.70</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.20</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.70</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">80% – 82%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">C+</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.30</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.80</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.30</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">77% – 79%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">C</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.50</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">3.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">73% – 76%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">C-</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">1.70</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.20</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.70</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">70% – 72%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold">D</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">1.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">1.50</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">2.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">65% – 69%</td>
              </tr>
              <tr>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 font-bold text-blue-600">F</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-blue-600">0.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-blue-600">0.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800 text-blue-600">0.00</td>
                <td className="p-2 border border-slate-200 dark:border-zinc-800">&lt; 65%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. WEIGHTED VS UNWEIGHTED */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          Weighted vs. Unweighted High School GPA
        </h2>
        <p className="leading-relaxed">
          High schools evaluate student achievement using two complementary metrics:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs my-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Unweighted GPA (Strict 4.0 Ceiling)</h4>
            <p className="leading-relaxed">
              Measures raw academic performance regardless of course difficulty. An A in regular history and an A in AP European History both yield 4.0 points.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-2">
            <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-sm">Weighted GPA (5.0 Scale)</h4>
            <p className="leading-relaxed">
              Incentivizes academic rigor by awarding extra point bonuses for challenging coursework: +0.5 for Honors classes and +1.0 for Advanced Placement (AP), International Baccalaureate (IB), and Dual Enrollment courses.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INTERNATIONAL CONVERSIONS */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          International Grading System Conversions
        </h2>
        <p className="leading-relaxed">
          Higher education systems worldwide utilize distinct evaluation frameworks:
        </p>

        <ul className="list-disc pl-6 space-y-2 text-xs">
          <li><strong>US 4.0 Scale:</strong> Standard 0.0 to 4.0 grade point average.</li>
          <li><strong>Canadian &amp; ASU 4.33 Scale:</strong> Includes 4.33 points for A+ grades.</li>
          <li><strong>Indian 10.0 CGPA:</strong> CBSE/university scale converted linearly to US 4.0 by dividing CGPA by 2.5.</li>
          <li><strong>UK Degree Honours:</strong> First Class (3.7–4.0), Upper Second 2:1 (3.3–3.6), Lower Second 2:2 (2.7–3.2), Third Class (2.0–2.6).</li>
          <li><strong>European ECTS:</strong> Grade A (3.8+), Grade B (3.4+), Grade C (2.8+), Grade D (2.2+), Grade E (2.0+).</li>
        </ul>
      </section>

      {/* 6. STRATEGIES TO RAISE GPA */}
      <section className="space-y-4  dark:border-zinc-800 pt-6">
        <h2 className="text-2xl font-extrabold tracking-tight text-blue-600 dark:text-blue-400">
          Evidence-Based Strategies to Raise Your GPA
        </h2>
        <p className="leading-relaxed">
          Students looking to boost their cumulative GPA can apply three mathematically proven strategies:
        </p>

        <div className="space-y-3 my-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-zinc-100">1. Prioritize High-Credit Courses</h4>
            <p className="leading-relaxed text-slate-900 dark:text-slate-100">
              A 4-credit science lecture carries double the weight of a 2-credit elective lab. Earning an A in a 4-credit course provides maximum quality point leverage.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-zinc-100">2. Utilize Grade Forgiveness &amp; Retake Policies</h4>
            <p className="leading-relaxed text-slate-900 dark:text-slate-100">
              Retaking a course where you earned a D or F replaces the low grade point value in your cumulative denominator with your new retake grade, boosting CGPA significantly faster than taking new courses.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-zinc-100">3. Recognize the &quot;Freshman Year Leverage Effect&quot;</h4>
            <p className="leading-relaxed text-slate-900 dark:text-slate-100">
              Raising your GPA is mathematically easiest during freshman and sophomore years when your earned credit total is small. Every early semester A has a powerful impact before cumulative inertia sets in.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}
