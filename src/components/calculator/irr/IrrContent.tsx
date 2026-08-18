"use client";

import React from "react";

export function IrrContent() {
  return (
    <div className="space-y-10 text-black dark:text-slate-100 font-medium leading-relaxed">
      {/* 1. WHAT IS IRR? */}
      <section className="space-y-3">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          1. What is the Internal Rate of Return (IRR)? Core Financial Principles
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          In corporate finance, private equity, and capital budgeting, the <strong>Internal Rate of Return (IRR)</strong> is the annualized discount rate that makes the <strong>Net Present Value (NPV)</strong> of all future cash flows (both positive inflows and negative capital outlays) from a specific investment project exactly equal to zero:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 text-center font-mono font-bold text-xs text-black dark:text-slate-100">
          NPV = &sum; [ CF_t / (1 + IRR)^t ] = 0 &nbsp;&rArr;&nbsp; Initial Outlay (CF_0) = &sum; [ CF_t / (1 + IRR)^t ]
        </div>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The metric is termed <em>&ldquo;internal&rdquo;</em> because it evaluates the inherent cash-generating capability of the underlying project itself, deliberately excluding external macroeconomic variables such as market inflation rates, cost of financing fluctuations, or broader stock market movements.
        </p>
      </section>

      {/* 2. HOW IRR IS CALCULATED */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          2. How IRR is Calculated: The Mathematics of Polynomial Root Finding
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Unlike simple financial ratios where the unknown variable can be isolated algebraically, the fundamental IRR equation is an n-th degree polynomial. For any project extending beyond two periods (n &gt; 2), the equation cannot be solved in closed form through standard algebra and requires numerical iteration algorithms such as <strong>Newton-Raphson iteration</strong>:
        </p>
        <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs font-bold text-center text-black dark:text-slate-100">
          r_(k+1) = r_k - [ NPV(r_k) / NPV&apos;(r_k) ]
        </div>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          Our calculator executes a high-precision Newton-Raphson iterative solver with automatic bisection fallback to pinpoint exact project IRRs to within four decimal places in under 5 milliseconds.
        </p>
      </section>

      {/* 3. PRACTICAL APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          3. Practical Applications of IRR Across Global Industries
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. Corporate Capital Budgeting
            </h3>
            <p className="text-black dark:text-slate-100">
              Corporations evaluate capital expenditures (CapEx) such as opening new manufacturing facilities, acquiring robotics, or upgrading IT infrastructure by comparing project IRR against the company&apos;s <strong>Weighted Average Cost of Capital (WACC)</strong> or minimum <strong>Hurdle Rate</strong>.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Private Equity &amp; Venture Capital
            </h3>
            <p className="text-black dark:text-slate-100">
              PE fund managers structure deals based on target gross and net IRR thresholds (typically 20% to 25%+ per year) across 3 to 7-year holding periods between leveraged buyouts (LBOs) and terminal trade sales or IPO exits.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. Commercial Real Estate (CRE)
            </h3>
            <p className="text-black dark:text-slate-100">
              Real estate syndicators project multi-family and commercial property returns by modeling acquisition equity outlays, annual Net Operating Income (NOI) after debt service, and final refinancing or disposition terminal proceeds.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. Equipment Leasing &amp; Financing
            </h3>
            <p className="text-black dark:text-slate-100">
              Commercial lenders determine effective borrowing costs and lease implicit interest rates by solving for the IRR across scheduled customer lease installments and residual equipment scrap value.
            </p>
          </div>
        </div>
      </section>

      {/* 4. IRR VS ROI VS NPV */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          4. IRR vs. Simple ROI vs. Net Present Value (NPV)
        </h2>
        <div className="overflow-x-auto rounded-xl border border-slate-300 dark:border-slate-700 text-xs">
          <table className="w-full text-center border-collapse font-sans font-medium">
            <thead className="bg-slate-100 dark:bg-slate-800 font-bold text-black dark:text-slate-100">
              <tr className="border-b border-slate-300 dark:border-slate-700">
                <th className="p-2.5 text-left pl-3">Evaluation Metric</th>
                <th className="p-2.5">Output Unit</th>
                <th className="p-2.5">Time Value of Money?</th>
                <th className="p-2.5">Primary Strength</th>
                <th className="p-2.5">Key Limitation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 text-black dark:text-slate-100">
              <tr>
                <td className="p-2 text-left pl-3 font-bold text-blue-700 dark:text-blue-400">Internal Rate of Return (IRR)</td>
                <td className="p-2">Percentage (%/yr)</td>
                <td className="p-2 text-emerald-600 font-bold">Yes (Compounded)</td>
                <td className="p-2">Intuitive benchmarking across scales</td>
                <td className="p-2">Unrealistic reinvestment rate assumption</td>
              </tr>
              <tr>
                <td className="p-2 text-left pl-3 font-bold text-emerald-700 dark:text-emerald-400">Net Present Value (NPV)</td>
                <td className="p-2">Dollar Amount ($)</td>
                <td className="p-2 text-emerald-600 font-bold">Yes (Discounted)</td>
                <td className="p-2">Direct measure of enterprise wealth added</td>
                <td className="p-2">Requires estimating a precise hurdle rate</td>
              </tr>
              <tr>
                <td className="p-2 text-left pl-3 font-bold text-amber-700 dark:text-amber-400">Simple Return on Investment (ROI)</td>
                <td className="p-2">Percentage (%)</td>
                <td className="p-2 text-red-600 font-bold">No (Ignored)</td>
                <td className="p-2">Extremely simple to calculate</td>
                <td className="p-2">Completely blind to project duration</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 5. LIMITATIONS OF IRR & MIRR */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          5. Limitations of Standard IRR &amp; Why You Should Use Modified IRR (MIRR)
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          While IRR is widely used, standard polynomial IRR contains four major theoretical flaws that can lead to disastrous capital budgeting errors:
        </p>

        <div className="space-y-2.5 text-xs">
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">
              1. The Reinvestment Rate Flaw (Solved by MIRR)
            </h3>
            <p className="text-black dark:text-slate-100">
              Standard IRR mathematically assumes that all interim positive cash flows generated during Year 1, Year 2, etc., are continuously reinvested at the project&apos;s own internal rate of return. If a project has a 45% IRR, it assumes all cash is reinvested at 45% per year—an assumption that is virtually impossible in practical corporate management. <strong>Modified IRR (MIRR)</strong> corrects this by compounding inflows forward at the company&apos;s actual cost of capital (e.g., 10%) and discounting financing outlays at the borrowing rate.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">
              2. Scale Insensitivity
            </h3>
            <p className="text-black dark:text-slate-100">
              A $1,000 project with an 80% IRR generates only $800 in profit, whereas a $10,000,000 project with a 22% IRR creates $2,200,000 in wealth. Selecting projects solely by IRR without evaluating total Net Present Value can destroy enterprise value.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-300 dark:border-slate-700 space-y-1">
            <h3 className="font-extrabold text-black dark:text-slate-100">
              3. Multiple Real Roots in Non-Conventional Cash Flows
            </h3>
            <p className="text-black dark:text-slate-100">
              When a project features alternating signs in its cash flow series (such as -$10k then +$30k then -$25k due to mid-project maintenance or environmental cleanup costs), Descartes&apos; Rule of Signs proves that the polynomial has multiple real roots, rendering standard IRR mathematically ambiguous.
            </p>
          </div>
        </div>
      </section>

      {/* 6. WORKED STEP-BY-STEP EXAMPLES */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          6. Worked Step-by-Step Practical Examples
        </h2>

        {/* Example 1 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            Example 1: Single Manufacturing Machine Purchase
          </h3>
          <p className="text-black dark:text-slate-100">
            Initial outlay of <strong>$40,000</strong> upfront (CF_0 = -$40,000). Projected cash inflows: Year 1: $10,000, Year 2: $20,000, Year 3: $30,000.
          </p>
          <div className="space-y-1 font-mono text-black dark:text-slate-100 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div>1. Equation: $40,000 = $10,000 / (1 + r)^1 + $20,000 / (1 + r)^2 + $30,000 / (1 + r)^3</div>
            <div>2. Solving numerically yields Internal Rate of Return (IRR) = 19.438% per year</div>
            <div>3. Hurdle Rate Evaluation @ 12.0% WACC: Net Present Value (NPV) = +$4,639.24 &rarr; ACCEPT PROJECT</div>
            <div>4. Hurdle Rate Evaluation @ 20.0% WACC: Net Present Value (NPV) = -$370.37 &rarr; REJECT PROJECT</div>
            <div>5. Modified IRR (MIRR @ 10% Reinvestment / 8% Financing) = 17.022% per year</div>
            <div>6. Simple Payback Period = 2.33 Years | Discounted Payback Period (@ 12%) = 2.76 Years</div>
          </div>
        </div>

        {/* Example 2 */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-2 text-xs">
          <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
            Example 2: Front-Loaded (Project A) vs. Back-Loaded (Project B) Cash Flows
          </h3>
          <p className="text-black dark:text-slate-100">
            Both projects require <strong>$100,000</strong> outlay and pay out <strong>$150,000</strong> total over 5 years (identical 50% simple ROI).
          </p>
          <div className="space-y-1 font-mono text-black dark:text-slate-100 bg-white dark:bg-slate-900 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
            <div>Project A (Front-Loaded: $5k, $20k, $25k, $40k, $60k) &rarr; IRR = 11.290% / yr (NPV @ 10% = +$3,425)</div>
            <div>Project B (Back-Loaded: $0, $10k, $30k, $30k, $80k) &rarr; IRR = 10.259% / yr (NPV @ 10% = +$649)</div>
            <div>Conclusion: Project A is financially superior because faster cash velocity allows earlier capital reinvestment.</div>
          </div>
        </div>
      </section>

      {/* 7. SUMMARY */}
      <section className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          7. Educational Summary
        </h2>
        <p className="text-sm leading-relaxed text-black dark:text-slate-100">
          The Internal Rate of Return (IRR) is a vital capital budgeting tool for benchmarking corporate and personal investments. To make optimal capital allocation decisions, analysts should always evaluate IRR alongside Net Present Value (NPV), Modified IRR (MIRR), and the Profitability Index, guarding against the reinvestment rate assumption flaw and scale blindness.
        </p>
      </section>

      {/* 8. FREQUENTLY ASKED QUESTIONS (12 FAQS) */}
      <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <h2 className="text-xl sm:text-2xl font-extrabold text-black dark:text-slate-100 tracking-tight">
          Frequently Asked Questions (FAQ)
        </h2>
        <div className="space-y-3 text-xs leading-relaxed text-black dark:text-slate-100">
          {/* FAQ 1 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              1. What is the difference between IRR and NPV?
            </h3>
            <p className="text-black dark:text-slate-100">
              <strong>IRR</strong> is the annualized percentage rate of return at which a project breaks even (NPV = $0). <strong>NPV</strong> is the total dollar amount of enterprise value created today above the cost of capital. NPV is the ultimate metric for maximizing shareholder wealth.
            </p>
          </div>

          {/* FAQ 2 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              2. Why is IRR important in corporate capital budgeting decisions?
            </h3>
            <p className="text-black dark:text-slate-100">
              IRR provides an intuitive percentage benchmark that executive decision-makers can easily compare against borrowing interest rates, corporate bond yields, or minimum hurdle rates across projects of differing sizes.
            </p>
          </div>

          {/* FAQ 3 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              3. What is a good or acceptable IRR for an investment project?
            </h3>
            <p className="text-black dark:text-slate-100">
              An acceptable IRR is any rate that comfortably exceeds the project&apos;s risk-adjusted cost of capital (WACC). For stable infrastructure projects, 8% to 12% is typical; for real estate syndications, 14% to 18% is standard; and for venture capital, 25% to 35%+ is required.
            </p>
          </div>

          {/* FAQ 4 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              4. What is the reinvestment rate assumption flaw in IRR and how does MIRR fix it?
            </h3>
            <p className="text-black dark:text-slate-100">
              Standard IRR assumes cash inflows are reinvested at the project&apos;s own IRR (which can be unrealistically high, e.g., 40%). <strong>Modified IRR (MIRR)</strong> fixes this by allowing the user to specify a realistic reinvestment rate equal to the firm&apos;s cost of capital.
            </p>
          </div>

          {/* FAQ 5 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              5. Why can some cash flow streams have multiple real IRRs?
            </h3>
            <p className="text-black dark:text-slate-100">
              When a project features non-conventional cash flows that switch signs more than once (e.g., negative outlay &rarr; positive returns &rarr; negative decommissioning cost), Descartes&apos; Rule of Signs proves that the polynomial equation can produce multiple mathematically valid roots.
            </p>
          </div>

          {/* FAQ 6 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              6. How does IRR account for the time value of money compared to simple ROI?
            </h3>
            <p className="text-black dark:text-slate-100">
              Simple ROI divides total profit by cost without regard to how many years elapsed. IRR explicitly discounts every individual cash flow based on the exact year or month it occurs, rewarding faster capital recovery.
            </p>
          </div>

          {/* FAQ 7 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              7. What is a hurdle rate and how does it relate to IRR?
            </h3>
            <p className="text-black dark:text-slate-100">
              A hurdle rate is the minimum required rate of return an investor or corporate board demands before approving an investment. If project IRR is greater than or equal to the Hurdle Rate, the project is accepted; otherwise, it is rejected.
            </p>
          </div>

          {/* FAQ 8 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              8. How does the timing of cash inflows affect the calculated IRR?
            </h3>
            <p className="text-black dark:text-slate-100">
              Front-loaded cash inflows produce significantly higher IRRs than back-loaded cash flows because early dollars are discounted less heavily and can be immediately reinvested elsewhere in the enterprise.
            </p>
          </div>

          {/* FAQ 9 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              9. Can IRR be negative and what does a negative IRR mean?
            </h3>
            <p className="text-black dark:text-slate-100">
              Yes. A negative IRR occurs when the total sum of all undiscounted cash inflows is less than the initial capital outlay, indicating that the investment fails to recover its principal and destroys capital.
            </p>
          </div>

          {/* FAQ 10 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              10. What is the Profitability Index (PI) and how is it used alongside IRR?
            </h3>
            <p className="text-black dark:text-slate-100">
              The Profitability Index (PI) divides the present value of future cash inflows by the initial outlay cost. A project with Profitability Index &gt; 1.0 is profitable and corresponds to a positive NPV.
            </p>
          </div>

          {/* FAQ 11 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              11. What is the Fisher crossover rate in multi-project evaluation?
            </h3>
            <p className="text-black dark:text-slate-100">
              The Fisher crossover rate is the discount rate at which the Net Present Values (NPVs) of two competing projects are identical. Below the crossover rate, one project dominates; above it, the other project becomes optimal.
            </p>
          </div>

          {/* FAQ 12 */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 space-y-1.5">
            <h3 className="font-extrabold text-sm text-black dark:text-slate-100">
              12. How do non-conventional cash flows affect capital budgeting decisions?
            </h3>
            <p className="text-black dark:text-slate-100">
              Non-conventional cash flows undermine standard IRR reliability due to multiple roots. When evaluating non-conventional projects (like mines or nuclear facilities with end-of-life cleanup liabilities), financial analysts rely strictly on Net Present Value (NPV) and Modified IRR (MIRR).
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default IrrContent;
