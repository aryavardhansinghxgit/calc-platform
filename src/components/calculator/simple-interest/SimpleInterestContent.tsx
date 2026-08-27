import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  Percent,
  Clock,
  ArrowRightLeft,
  Scale,
  Calendar,
  Layers,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Calculator as CalcIcon,
} from "lucide-react";

export function SimpleInterestContent() {
  return (
    <article className="space-y-10 text-slate-800 dark:text-slate-200 leading-relaxed">
      {/* Introduction Section */}
      <section className="space-y-4">
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2.5">
          <TrendingUp className="h-7 w-7 text-blue-600 dark:text-blue-400" />
          Simple Interest Calculator – Interest, Principal, Rate &amp; Time
        </h2>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Simple interest is one of the most straightforward ways to calculate the cost of borrowing or the return earned on an amount of money. Unlike compound interest, where accumulated interest can itself begin generating additional interest, simple interest is calculated directly from the original principal for the selected period. That makes the calculation especially useful when you need a transparent estimate for a fixed amount borrowed or invested over a defined time. The standard mathematical formula is <em>I = Prt</em>, where <em>I</em> represents interest, <em>P</em> represents principal, <em>r</em> is the annual interest rate expressed as a decimal, and <em>t</em> is time measured in years. OpenStax uses the same formula and emphasizes that the rate and time must be expressed on compatible time scales.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This Simple Interest Calculator goes beyond simply multiplying three numbers. It is designed so that you can solve the problem from whichever values you already know. You can calculate a final balance from principal, rate, and time; work backward from a target interest amount to determine the required principal; determine the interest rate implied by a known principal, interest amount, and term; or solve for the time needed to generate a particular amount of interest. The result is accompanied by a mathematical derivation so that the number is not a black box. You can see the inputs substituted into the formula and follow the algebra used to obtain the result.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator also supports different ways of expressing time. A term can be entered in years, months, weeks, or days, allowing a short-term calculation without manually converting everything before beginning. For example, 18 months corresponds to 1.5 years under a 12-month year convention, while 520 weeks corresponds to 10 years under a 52-week convention. A day-based calculation uses the calculator&rsquo;s specified 365-day convention. These conversions are important because the simple-interest formula requires the rate and time to use compatible units. A 6% annual rate multiplied by &ldquo;18&rdquo; without converting 18 months to years would produce a fundamentally incorrect result.
        </p>

        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
          <span className="font-bold text-blue-950 dark:text-blue-200 text-sm block">
            Standard Reference Baseline:
          </span>
          <p className="text-xs text-blue-900/90 dark:text-blue-300/90 font-mono">
            Principal = $20,000 | Annual Rate = 3.0% | Term = 10 Years
          </p>
          <p className="text-xs text-blue-900/90 dark:text-blue-300/90 font-mono">
            Interest = $20,000 × 0.03 × 10 = $6,000.00 | Final Balance = $20,000 + $6,000 = $26,000.00
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-sans">
            The calculator also shows the equivalent annual interest of $600, monthly interest of $50, and approximately $1.64 per day under its presentation convention.
          </p>
        </div>

        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          There is an important conceptual distinction between simple interest and compound interest. Simple interest produces a linear accumulation when the principal and rate remain constant. If $600 of simple interest is generated each year on $20,000 at 3%, the interest remains $600 each year. Compound interest behaves differently because previously accumulated interest is included in subsequent calculations. In the calculator&rsquo;s reference comparison, $20,000 at 3% for 10 years produces a $26,000 simple-interest balance, while monthly compounding produces approximately $26,987.07. That difference is why choosing the correct interest model matters.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          For related calculations, the <Link href="/calculators/interest-calculator" className="font-semibold text-blue-600 underline">Interest Calculator</Link> can help when you need a broader interest analysis, while the <Link href="/calculators/compound-interest-calculator" className="font-semibold text-blue-600 underline">Compound Interest Calculator</Link> is more appropriate when interest is periodically added to the balance. The <Link href="/calculators/future-value-calculator" className="font-semibold text-blue-600 underline">Future Value Calculator</Link> is useful when you want to examine the value of money at a future point under a growth model.
        </p>
      </section>

      {/* Section 1: What Simple Interest Means */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          1. What Simple Interest Means and Why the Formula Is Linear
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Simple interest is called &ldquo;simple&rdquo; because the interest calculation is based on the original principal rather than repeatedly adding previously earned interest to the amount on which the next period&rsquo;s interest is calculated. In the standard formula, the principal, rate, and time are multiplied together to determine the interest. That relationship is expressed as <em>I = Prt</em>, where <em>P</em> is the initial amount, <em>r</em> is the annual rate in decimal form, and <em>t</em> is the number of years. This is the standard formula taught in elementary algebra and financial mathematics.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The easiest way to understand the formula is to imagine a fixed amount of money generating the same dollar amount of interest in each full year. Suppose $20,000 earns simple interest at 3% per year. One year of interest is:
        </p>
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-sm text-center">
          20,000 × 0.03 = $600 / year
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          After one year, the interest is $600. After two years, the total interest is $1,200. After five years, it is $3,000. After ten years, it is $6,000. The interest itself does not become a new principal for the following year in the simple-interest model. The balance therefore moves in a straight-line pattern:
        </p>
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs sm:text-sm text-center overflow-x-auto">
          $20,000 → $20,600 → $21,200 → $21,800 → ... → $26,000
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This linear behavior is the defining mathematical feature of simple interest. The final accumulated amount is commonly written as:
        </p>
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 font-mono text-sm text-center">
          A = P + I = P + Prt = P(1 + rt)
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          This form is useful because it makes the relationship between the original amount and final amount obvious. If the rate or time increases, the interest increases proportionally, assuming the principal remains unchanged. Doubling the principal doubles the interest. Doubling the time doubles the interest. Doubling the rate doubles the interest. That proportionality is another reason simple interest is easy to audit.
        </p>
      </section>

      {/* Section 2: How to Calculate Step by Step */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <CalcIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          2. How to Calculate Simple Interest Step by Step
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Calculating simple interest manually requires only a few steps, but accuracy depends on identifying the variables correctly before doing any multiplication. Start by identifying the principal <em>P</em>, the annual interest rate <em>r</em>, and the time <em>t</em>. Then convert the percentage rate into decimal form and make sure the time uses the same annual basis as the rate. Finally, substitute the values into <em>I = Prt</em>, calculate the interest, and add it to the principal when you need the final balance.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-xs text-blue-600 dark:text-blue-400 block">Step 1: Convert Rate</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">r = 3% / 100 = 0.03</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-xs text-blue-600 dark:text-blue-400 block">Step 2: Multiply I = Prt</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">I = 20,000 × 0.03 × 10 = $6,000</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-xs text-blue-600 dark:text-blue-400 block">Step 3: Ending Balance</span>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono">A = 20,000 + 6,000 = $26,000</p>
          </div>
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The calculator makes this relationship visible in its output dashboard. For the $20,000 example, the result shows a final balance of $26,000, total simple interest of $6,000, interest of $600 per year, $50 per month, and approximately $1.64 per day. These are not separate calculations with different economic assumptions; they are different ways of expressing the same simple-interest result.
        </p>
      </section>

      {/* Section 3: Solving for Principal, Rate, or Time */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <ArrowRightLeft className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          3. Solving for Principal, Interest Rate, or Time When the Unknown Changes
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The simple-interest formula is especially useful because it can be rearranged to solve for any one of its variables. This turns the equation from a one-direction calculation into a complete four-variable relationship. Rather than always entering principal, rate, and time to find interest, you can begin with the interest amount and solve backward for the missing input.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-sans font-bold text-slate-900 dark:text-slate-100 block mb-1">Principal Mode</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">P = I / (r × t)</p>
            <p className="text-slate-500 mt-1">P = $6,000 / (0.03 × 10) = $20,000</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-sans font-bold text-slate-900 dark:text-slate-100 block mb-1">Rate Mode</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">r = I / (P × t)</p>
            <p className="text-slate-500 mt-1">r = $6,000 / (20,000 × 10) = 3%</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="font-sans font-bold text-slate-900 dark:text-slate-100 block mb-1">Term Mode</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">t = I / (P × r)</p>
            <p className="text-slate-500 mt-1">t = $6,000 / (20,000 × 0.03) = 10 yrs</p>
          </div>
        </div>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          These inverse modes also provide a powerful way to verify the main calculation. Start with known values (P=$20,000, r=3%, t=10 yrs), compute $I=$6,000$, and then solve backward for principal, rate, and time. All modes return the original inputs, ensuring complete round-trip consistency.
        </p>
      </section>

      {/* Section 4: Calculating for Months, Weeks, Days */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          4. Calculating Simple Interest for Months, Weeks and Days
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Time conversion is one of the easiest places to make a simple-interest calculation error because the formula itself is uncomplicated while financial terms can be stated in different units. If the annual interest rate is 4%, the value of <em>t</em> must represent a fraction of a year unless the rate has first been converted to another compatible period. The calculator therefore lets you enter the term in years, months, weeks, or days and converts the selected unit into the annual time basis used by the simple-interest formula.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono">
            <span className="font-sans font-bold text-slate-900 dark:text-slate-100 block mb-1">Months to Years</span>
            <p>t = months / 12</p>
            <p className="text-slate-500 mt-1">18 months = 18/12 = 1.5 yrs</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono">
            <span className="font-sans font-bold text-slate-900 dark:text-slate-100 block mb-1">Weeks to Years</span>
            <p>t = weeks / 52</p>
            <p className="text-slate-500 mt-1">26 weeks = 26/52 = 0.5 yr</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono">
            <span className="font-sans font-bold text-slate-900 dark:text-slate-100 block mb-1">Days to Years</span>
            <p>t = days / 365</p>
            <p className="text-slate-500 mt-1">90 days = 90/365 ≈ 0.2466 yr</p>
          </div>
        </div>
      </section>

      {/* Section 5: Simple Interest vs. Compound Interest */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Scale className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          5. Simple Interest vs. Compound Interest: Why the Results Diverge
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The difference between simple and compound interest is fundamentally a difference in what happens to accumulated interest. With simple interest, the calculation remains tied to the original principal. With compound interest, previously accumulated interest becomes part of the amount on which future interest is calculated. That difference creates linear growth in the first case and geometric or exponential-style growth in the second.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-1.5">
            <span className="font-bold text-blue-950 dark:text-blue-200 block text-sm">Simple Interest ($20k @ 3%, 10 yrs)</span>
            <p className="font-mono text-base font-bold text-blue-600 dark:text-blue-400">$26,000.00</p>
            <p className="text-slate-600 dark:text-slate-400">Total Interest: $6,000.00 ($600/yr linear constant)</p>
          </div>
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 space-y-1.5">
            <span className="font-bold text-emerald-950 dark:text-emerald-200 block text-sm">Compound Interest (Monthly Compounding)</span>
            <p className="font-mono text-base font-bold text-emerald-600 dark:text-emerald-400">$26,987.07</p>
            <p className="text-slate-600 dark:text-slate-400">Compounding Advantage: +$987.07 (+16.45% bonus wealth)</p>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          For users specifically interested in compound growth, the <Link href="/calculators/compound-interest-calculator" className="font-semibold text-blue-600 underline">Compound Interest Calculator</Link> is the dedicated tool for multi-frequency compounding analysis.
        </p>
      </section>

      {/* Section 6: Understanding the Yearly Schedule */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          6. Understanding the Yearly Schedule and the Meaning of Each Result
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          A calculator result becomes much easier to trust when the user can inspect how it was generated. That is why the yearly schedule is more than a decorative table. It provides a period-by-period ledger showing the opening balance, interest earned, and closing balance. For the standard example of $20,000 at 3% for ten years, the schedule demonstrates the defining characteristic of simple interest: the interest amount is constant in each full year while the balance increases linearly.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border rounded-xl overflow-hidden font-sans">
            <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-2.5">Year</th>
                <th className="p-2.5">Opening Balance</th>
                <th className="p-2.5">Interest Earned</th>
                <th className="p-2.5">Closing Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-mono">
              <tr><td className="p-2 font-sans">Year 1</td><td className="p-2">$20,000.00</td><td className="p-2 text-emerald-600 font-bold">+$600.00</td><td className="p-2 font-bold">$20,600.00</td></tr>
              <tr><td className="p-2 font-sans">Year 2</td><td className="p-2">$20,600.00</td><td className="p-2 text-emerald-600 font-bold">+$600.00</td><td className="p-2 font-bold">$21,200.00</td></tr>
              <tr><td className="p-2 font-sans">Year 5</td><td className="p-2">$22,400.00</td><td className="p-2 text-emerald-600 font-bold">+$600.00</td><td className="p-2 font-bold">$23,000.00</td></tr>
              <tr><td className="p-2 font-sans">Year 10</td><td className="p-2">$25,400.00</td><td className="p-2 text-emerald-600 font-bold">+$600.00</td><td className="p-2 font-bold">$26,000.00</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 7: When Simple Interest Is Useful */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          7. When Simple Interest Is Useful—and When Another Calculator Is Better
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          Simple interest is useful precisely because it strips the calculation down to a clear relationship between principal, rate and time. This makes it valuable for learning, quick estimates, checking manually stated calculations, and certain financial arrangements where interest is explicitly based on an unchanged principal. It is also useful when the main question is mathematical rather than contractual.
        </p>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          However, many consumer loans and investment accounts involve amortized payments, daily compounding, or fees. For installment loans where monthly payments reduce principal over time, the <Link href="/calculators/loan-calculator" className="font-semibold text-blue-600 underline">Loan Calculator</Link> or <Link href="/calculators/amortization-calculator" className="font-semibold text-blue-600 underline">Amortization Calculator</Link> is more appropriate. For general investment modeling, explore the <Link href="/calculators/investment-calculator" className="font-semibold text-blue-600 underline">Investment Calculator</Link>.
        </p>
      </section>

      {/* Section 8: How to Use Responsibly */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
          8. How to Use the Simple Interest Calculator and Interpret the Result Correctly
        </h3>
        <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          The most reliable way to use the calculator is to begin by identifying exactly what you know and what you want to find. If you know the principal, annual rate and term, use the final-balance calculation to determine interest and ending value. If you know the interest amount and want to determine how much principal is required, use the principal solver. If you know principal, interest and time and want the implied annual rate, use the interest-rate solver. If you know principal, interest and rate and need to determine the duration, use the term-length solver.
        </p>
      </section>

      {/* Formula Reference & Methodology */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Formula &amp; Calculation Method
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-sans block">Total Simple Interest</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">I = P × r × t</p>
            <p className="text-slate-500 font-sans text-[11px]">P = Principal, r = Annual rate (decimal), t = Time in years</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-sans block">Ending Balance</span>
            <p className="text-blue-600 dark:text-blue-400 font-bold">A = P + I = P(1 + r × t)</p>
            <p className="text-slate-500 font-sans text-[11px]">Total accumulated balance at maturity</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-sans block">Inverse Principal &amp; Rate</span>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold">P = I / (r × t) | r = I / (P × t)</p>
            <p className="text-slate-500 font-sans text-[11px]">Solve for required deposit or implied annual yield</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-sans block">Time Unit Conversions</span>
            <p className="text-indigo-600 dark:text-indigo-400 font-bold">Months/12 | Weeks/52 | Days/365</p>
            <p className="text-slate-500 font-sans text-[11px]">Compatible annual time-scale transformations</p>
          </div>
        </div>
      </section>

      {/* Quick Worked Examples */}
      <section className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
          <CalcIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          Quick Worked Examples
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 font-mono">
            <span className="font-sans font-bold text-slate-900 dark:text-slate-100 block">Ex 1: $20,000 @ 3% for 10 Yrs</span>
            <p>I = 20,000 × 0.03 × 10 = $6,000.00</p>
            <p>A = 20,000 + 6,000 = $26,000.00</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 font-mono">
            <span className="font-sans font-bold text-slate-900 dark:text-slate-100 block">Ex 2: $5,000 @ 4.5% for 9 Mos</span>
            <p>t = 9/12 = 0.75 yrs</p>
            <p>I = 5,000 × 0.045 × 0.75 = $168.75 | A = $5,168.75</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 font-mono">
            <span className="font-sans font-bold text-slate-900 dark:text-slate-100 block">Ex 3: Find Principal from $6,000 I</span>
            <p>P = 6,000 / (0.03 × 10) = $20,000.00</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 font-mono">
            <span className="font-sans font-bold text-slate-900 dark:text-slate-100 block">Ex 4: Find Rate from $20k, $6k I</span>
            <p>r = 6,000 / (20,000 × 10) = 0.03 = 3.00%</p>
          </div>
        </div>
      </section>

      {/* Methodology & Limitations */}
      <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
        <span className="font-bold text-slate-900 dark:text-slate-100 block text-sm">
          Methodology &amp; Limitations
        </span>
        <p className="leading-relaxed">
          This calculator uses the mathematical simple-interest model <em>I = Prt</em>. Time is converted to years according to the selected unit convention, and the final balance is calculated as principal plus simple interest. The model is intended for calculations where the original principal remains the basis of the interest calculation.
        </p>
        <p className="leading-relaxed">
          For actual financial products, always check the underlying agreement. Some products use compound interest, amortization, daily accrual, changing balances, fees, penalties or different day-count conventions. A mathematically correct simple-interest result should not be interpreted as an official lender, bank or investment-product statement unless the product actually uses the same calculation methodology.
        </p>
        <p className="leading-relaxed">
          The calculator is an educational and analytical tool and does not constitute financial, legal, tax, lending or investment advice.
        </p>
      </section>
    </article>
  );
}

export default SimpleInterestContent;
