"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, Info, Clock, CheckCircle2, TrendingUp, DollarSign, Layers } from "lucide-react";

export function PaybackPeriodContent() {
  const faqs = [
    {
      q: "What is the difference between Simple Payback Period and Discounted Payback Period?",
      a: "Simple Payback Period uses nominal, undiscounted cash flows to determine how long it takes to recover the initial investment. Discounted Payback first converts each future cash flow into present-value terms using a discount rate, then determines when those discounted cash flows recover the initial investment. Because future cash flows are worth less than their nominal amounts when the discount rate is positive, discounted payback is generally longer.",
    },
    {
      q: "Why is the Discounted Payback Period usually longer than Simple Payback?",
      a: "Simple payback treats future dollars at their stated value. Discounted payback reduces each future cash flow according to the selected discount rate, so less of each future cash flow counts toward recovering the original investment. The result is normally a later recovery date when the discount rate is positive.",
    },
    {
      q: "What is a good or acceptable payback period for a business investment?",
      a: "There is no universal acceptable payback period. A three-year payback might be attractive for one project and unsuitable for another depending on project life, risk, capital availability, technology changes, and the organization's required return. Payback should generally be evaluated alongside NPV and other capital-budgeting measures rather than using a universal cutoff.",
    },
    {
      q: "Why does the Payback Period ignore cash flows that occur after the break-even point?",
      a: "Payback measures only the time required to recover the original investment. Once cumulative cash flow reaches that amount, the calculation has answered its specific question. It does not measure the additional profits or losses generated afterward. This is one of the major reasons payback should not be used as the sole profitability metric.",
    },
    {
      q: "How is linear interpolation used to calculate exact fractional months and days in payback?",
      a: "When cumulative cash flow does not exactly recover the investment at the end of a period, the calculator determines the unrecovered amount and divides it by the cash flow generated during the recovery period. For example, if $35,000 remains and the recovery-year cash flow is $40,000, the project needs 0.875 of that year. The result is then converted into a human-readable year/month/day representation according to the calculator's specified conversion convention.",
    },
    {
      q: "How do I choose a discount rate for calculating Discounted Payback?",
      a: "The discount rate should represent an economically meaningful required return or cost of capital for the project. Depending on the organization, this may be based on WACC, opportunity cost of capital, a required return, or a risk-adjusted hurdle rate. There is no single percentage that is appropriate for every project.",
    },
    {
      q: "Can a project have a positive NPV but fail a strict payback requirement?",
      a: "Yes. A project can generate substantial value over a long period while taking longer to recover its initial investment than an organization's chosen payback cutoff. This is one reason payback and NPV can rank projects differently. NPV explicitly considers the present value of the full modeled cash-flow stream, whereas payback focuses on recovery time.",
    },
    {
      q: "How does inflation affect real payback time?",
      a: "Simple payback does not explicitly adjust future cash flows for inflation. If inflation affects the project's costs, revenues, or cash savings, those effects should be reflected appropriately in the projected cash flows. Discounted analysis can incorporate the economic effect of inflation through an appropriate cash-flow and discount-rate framework, but the discount rate itself should not be treated as a direct substitute for an inflation forecast.",
    },
    {
      q: "What is the relationship between Payback Period and Accounting Rate of Return (ARR)?",
      a: "Payback measures the time required to recover the initial investment. Accounting Rate of Return is an accounting-based profitability measure that generally uses accounting income rather than cash-flow recovery. They therefore measure different aspects of a project and should not be treated as interchangeable.",
    },
    {
      q: "Why should companies never rely solely on the Payback Period to make capital-budgeting decisions?",
      a: "Payback ignores cash flows after recovery and ordinary payback ignores the time value of money. It also does not provide a universal economically grounded acceptance criterion. A project with a longer payback can still produce more value because of large cash flows later in its life. NPV and other measures provide additional information about value creation and risk.",
    },
    {
      q: "What is the closed-form formula for Discounted Payback for equal annual payments?",
      a: "For equal annual cash flows, discounted payback can be solved using an annuity present-value relationship instead of calculating every period manually. The calculator's reference material includes a closed-form expression based on the initial investment, constant payment, and discount rate. This closed-form method should only be used when the cash flows satisfy the uniform-annuity assumptions; irregular cash flows require period-by-period discounting.",
    },
    {
      q: "Does high cash flow after the payback point affect total project profitability?",
      a: "Absolutely. Payback stops measuring once the initial investment has been recovered, but the project's later cash flows can determine much of its total economic value. A project with a slightly longer payback can therefore generate a substantially higher NPV or lifetime profit than a project with a shorter payback. This post-payback blind spot is one of the fundamental limitations of the payback method.",
    },
  ];

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-xs leading-relaxed">
      {/* 1. INTRODUCTION & CORE CONCEPTS */}
      <section className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          Payback Period Calculator — Simple &amp; Discounted Payback Analysis
        </h1>
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          Measure How Long an Investment Takes to Recover Its Cost
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          A capital investment creates one fundamental question before profitability can be discussed: how long does it take to recover the money invested? The Payback Period Calculator answers that question by tracing the cumulative cash flows generated by a project until they recover the initial capital outlay. Unlike a simple annualized-return calculator, payback focuses on the timing of capital recovery. This makes it particularly useful when liquidity, capital exposure, technological obsolescence, project uncertainty, or the speed at which invested funds become available again matters to the decision.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The simplest payback calculation divides an initial investment by a constant annual cash inflow. If a project requires $100,000 and generates $25,000 of cash flow each year, its simple payback period is four years. When annual cash flows are uneven, however, division is no longer sufficient. The calculation must accumulate each year&apos;s cash flow until the investment is recovered and then determine the fraction of the recovery year required to close the remaining balance. OpenStax similarly defines the payback period as the time required to recover an initial investment and notes that fractional years arise when recovery occurs between two annual periods.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          That distinction is central to the calculator. In the primary reference scenario, the initial outlay is $100,000 and annual net cash flows are $5,000, $25,000, $35,000, $40,000, $30,000 and $10,000. The cumulative undiscounted cash flow reaches $65,000 after Year 3 and $105,000 after Year 4, so the initial investment is recovered during Year 4. The calculator reports approximately 3.88 years, or about 3 years, 10 months and 15 days. The reference screenshot shows the corresponding recovery visualization and capital-recovery status.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The calculator goes further because simple payback has an important limitation: it treats a dollar received later as equivalent to a dollar received earlier. Discounted Payback Period addresses part of that problem by converting future cash flows into present values using a selected discount rate or WACC. In the same reference scenario, the simple payback occurs in about 3.88 years, while discounted payback takes about 5.45 years. The difference is the financial effect of recognizing the time value of money.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          This distinction is well established in capital-budgeting literature. OpenStax explains that the standard payback method ignores the time value of money, while discounted payback discounts future cash flows before determining when the initial investment has been recovered. MIT Sloan&apos;s capital-budgeting lecture materials make the same point and describe discounted payback as the recovery point based on discounted rather than nominal cash flows.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          However, neither version of payback should be interpreted as a complete measure of project profitability. A project can recover its capital quickly and then produce very little additional cash. Another project can take longer to recover its initial investment but generate substantially more value afterward. Payback also does not, by itself, provide a universal economically justified acceptance threshold. OpenStax specifically identifies these limitations, including the fact that cash flows after the payback point are ignored.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          That is why this calculator combines payback with NPV, IRR, profitability index, project comparison, and sensitivity analysis. The purpose is not to replace one metric with another, but to give the user a more complete capital-budgeting picture: how quickly capital comes back, how much future cash flow is worth today, how the project compares with its cost of capital, and how sensitive the result is to changes in assumptions.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          For investment-return analysis outside project capital budgeting, the <Link href="/calculators/roi-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">ROI Calculator</Link> can measure return relative to invested capital, while the <Link href="/calculators/present-value-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Present Value Calculator</Link> and <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Future Value Calculator</Link> can isolate the time-value-of-money calculations used in discounted cash-flow analysis.
        </p>
      </section>

      {/* 2. SIMPLE PAYBACK PERIOD: HOW TO CALCULATE */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Simple Payback Period: How to Calculate Recovery Time from Cash Flows
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          Simple Payback Period is the amount of time required for cumulative undiscounted cash inflows to recover the project&apos;s initial investment. It is intentionally straightforward. The method does not attempt to convert future dollars into today&apos;s dollars, and it does not estimate the project&apos;s total lifetime profitability. Instead, it answers a narrower operational question: when does cumulative cash recovery reach the original capital outlay?
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          Simple Payback Period = Initial Investment ÷ Annual Cash Flow
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          For example, a $100,000 project producing $25,000 per year has a simple payback period of $100,000 ÷ $25,000 = 4 years.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The calculation becomes more interesting when cash flows are uneven. Suppose a $100,000 investment produces: Year 1: $5,000; Year 2: $25,000; Year 3: $35,000; Year 4: $40,000.
        </p>
        <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-xl space-y-1.5 font-sans">
          <div className="font-bold text-blue-900 dark:text-blue-200 text-xs">Step-by-Step Cumulative Recovery:</div>
          <div>After Year 1: Cumulative = $5,000 (Remaining = $95,000)</div>
          <div>After Year 2: Cumulative = $30,000 (Remaining = $70,000)</div>
          <div>After Year 3: Cumulative = $65,000 (Remaining = $35,000)</div>
          <div>Year 4 Cash Flow = $40,000 &rarr; Fraction = $35,000 ÷ $40,000 = 0.875 year</div>
          <div className="font-bold text-blue-900 dark:text-blue-200">Payback = 3 + 0.875 = 3.875 years ≈ 3.88 years (3 yrs, 10 mos, 15 days)</div>
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          For unequal cash flows, this interpolation approach is much more accurate than simply dividing the investment by average cash flow:
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          Payback = Last Fully Recovered Year + (Unrecovered Amount ÷ Recovery-Year Cash Flow)
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          The important phrase is <em>recovery-year cash flow</em>. The remaining investment is divided by the actual cash flow expected in the year during which recovery occurs. This preserves the timing information contained in the cash-flow schedule.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The method also makes it possible to represent a project that pays back before the end of its first year. If $100,000 is invested and $120,000 arrives during the first year, the simple payback is approximately $100,000 ÷ $120,000 = 0.8333 years, or roughly ten months.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          Negative cash flows make the calculation even more important. If a project receives $50,000 in Year 1, loses $20,000 in Year 2, and receives $40,000 in Year 3, the negative Year 2 amount reduces cumulative recovery. Payback should therefore be based on the actual sequence of cash flows rather than only on positive inflow totals.
        </p>
      </section>

      {/* 3. DISCOUNTED PAYBACK PERIOD */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Discounted Payback Period: Accounting for the Time Value of Money
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          Simple payback treats every dollar of cash flow equally regardless of when it arrives. Discounted Payback Period changes that assumption by converting each future cash flow into its estimated present value before accumulating it toward the original investment.
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          PV of Cash Flow = Cash Flow ÷ (1 + r)^t
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          In the calculator&apos;s primary example, the initial investment is $100,000 and the selected discount rate is 10%. The annual cash flows are $5,000, $25,000, $35,000, $40,000, $30,000 and $10,000. The simple payback is around 3.88 years, but once each future cash flow is discounted, the project does not recover its initial value until approximately 5.45 years.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          At a discount rate of 0%, discounted payback must equal simple payback because 1 ÷ (1 + 0)^t = 1. Therefore, every cash flow retains its full nominal value. As the discount rate increases, future cash flows are worth less in present-value terms, pushing discounted payback farther into the future and reducing NPV.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          However, discounted payback still ignores cash flows after the point of recovery. Analysts must consider WACC, required return, opportunity cost of capital, or a risk-adjusted hurdle rate when selecting the discount rate.
        </p>
      </section>

      {/* 4. NPV, IRR AND PROFITABILITY INDEX */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          NPV, IRR and Profitability Index: What Payback Does Not Tell You
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          Payback answers when capital comes back. NPV answers how much value the project creates today after accounting for the cost of capital. <Link href="/calculators/irr-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">IRR</Link> answers what discount rate makes the project&apos;s NPV equal to zero. Profitability Index relates present-value benefits to the initial investment. These metrics overlap, but they are not interchangeable.
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          NPV = Σ [CFₜ ÷ (1 + r)^t] − Initial Investment
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          With a $100,000 initial investment, 10% discount rate, and the modeled annual cash flows, the calculation reports approximately $3,095.55 NPV, approximately 10.964% IRR, and a profitability index of approximately 1.031.
        </p>
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[11px]">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold">Metric</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Core Question Answered</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Decision Criteria</th>
              </tr>
            </thead>
            <tbody className="text-slate-900 dark:text-slate-100">
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Simple Payback</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">How quickly do I recover the original investment?</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Shorter than policy hurdle</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Discounted Payback (DPP)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">How quickly do I recover it accounting for time value?</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Shorter than project lifespan</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Net Present Value (NPV)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">How much net wealth is created in today&apos;s dollars?</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">NPV &gt; 0 (Accept project)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Internal Rate of Return (IRR)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">What discount rate makes the project break even?</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">IRR &gt; Hurdle Rate / WACC</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Profitability Index (PI)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">How much PV inflow is generated per dollar invested?</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">PI &gt; 1.0</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          For annualized return analysis, the <Link href="/calculators/cagr-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">CAGR Calculator</Link> provides additional perspective on compounding rates.
        </p>
      </section>

      {/* 5. GROWING AND MONTHLY CASH FLOWS */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Growing and Monthly Cash Flows: When the Basic Payback Formula Is Not Enough
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          Not every project produces the same cash flow every year. The calculator includes a fixed/growing annual cash-flow model and a monthly cash-flow model rather than forcing every project into a constant annual-inflow assumption.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The reference growing-cash-flow example starts with a $100,000 investment, a $30,000 first-year cash flow, 5% annual growth, a five-year life, and a 10% discount rate:
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          CFₜ = CF₁ × (1 + Growth Rate)^(t−1)
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          Under a 5% escalation, annual cash flows become: Year 1: $30,000; Year 2: $31,500; Year 3: $33,075; Year 4: $34,728.75; Year 5: $36,465.19. The calculator reports approximately 3.16 years simple payback, 3.92 years discounted payback, and $24,517.74 NPV.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The monthly module handles recurring projects (e.g., equipment savings, SaaS subscriptions). With an initial outlay of $25,000, monthly cash flow of $1,200, 8% annual discount rate, and 36 months duration:
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          Monthly Simple Payback = $25,000 ÷ $1,200 = 20.833 Months ≈ 20.8 Months (20 mos, 25 days)
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          Discounted monthly payback is approximately 22.5–22.8 months under standard monthly discounting (Annual Rate ÷ 12).
        </p>
      </section>

      {/* 6. PROJECT COMPARISON, TARGET PAYBACK AND SENSITIVITY */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Project Comparison, Target Payback and Sensitivity Analysis
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          A serious capital-budgeting decision rarely involves only one project. The Project Comparison module allows two proposals to be examined using several metrics. For example, Project A (front-loaded) may recover in 2.67 years with $1,895.67 NPV, while Project B (back-loaded) recovers in 3.70 years with $23,321.80 NPV. Selecting Project B creates substantially more enterprise value despite the longer payback.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The Target Payback Solver reverses the calculation: for a $100,000 investment and a 3-year simple-payback target, Required Annual Flow = $100,000 ÷ 3 = $33,333.33/yr. For discounted payback at 10% WACC, the required annual flow is approximately $40,211.48/yr.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The Sensitivity Matrix stress-tests the project across discount rates (0% to 20%) and cash-flow variances (-20% to +20%). Simple payback remains invariant to the discount rate, while discounted payback and NPV change dynamically.
        </p>
      </section>

      {/* 7. LIMITATIONS AND APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Payback Period Limitations, Real-World Applications and How to Use the Result
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900 dark:text-slate-100">
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">1. Renewable Energy &amp; Solar</span>
            <p className="text-[11px]">Calculate how many years of utility savings and tax credits are required to offset upfront photovoltaic equipment and installation outlays.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">2. Manufacturing Automation</span>
            <p className="text-[11px]">Evaluate robotics and assembly line upgrades based on labor reduction, lower scrap rates, and throughput gains.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">3. IT Infrastructure &amp; SaaS</span>
            <p className="text-[11px]">Determine the break-even duration of enterprise software deployments and cloud migrations against legacy server contracts.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">4. Commercial Real Estate</span>
            <p className="text-[11px]">Analyze the recovery period of tenant improvements, HVAC retrofits, and renovations funded by incremental rental income.</p>
          </div>
        </div>
      </section>

      {/* 8. FORMULA REFERENCE MATRIX */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Formula Reference Matrix
        </h2>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl font-mono text-[11px] space-y-2 text-slate-800 dark:text-slate-200">
          <div><strong>Simple Payback (Equal Flows):</strong> Payback = Initial Investment ÷ Annual Cash Flow</div>
          <div><strong>Simple Payback (Unequal Flows):</strong> Payback = Last Full Year + (Unrecovered Outlay ÷ Recovery-Year Cash Flow)</div>
          <div><strong>Present Value:</strong> PV = Cash Flow ÷ (1 + r)^t</div>
          <div><strong>Net Present Value:</strong> NPV = Σ [Cash Flow ÷ (1 + r)^t] − Initial Investment</div>
          <div><strong>Profitability Index:</strong> PI = PV of Future Cash Inflows ÷ Initial Investment</div>
          <div><strong>Growing Annual Cash Flow:</strong> CFₜ = CF₁ × (1 + Growth Rate)^(t−1)</div>
          <div><strong>Closed-Form DPP (Uniform Annuities):</strong> DPP = −ln[1 − (CF₀ × r) ÷ PMT] ÷ ln(1 + r)</div>
        </div>
      </section>

      {/* 9. FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-xs space-y-2"
            >
              <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums font-bold shrink-0">
                  Q{idx + 1}.
                </span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. IMPORTANT INTERPRETATION & YMYL DISCLOSURES */}
      <section className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-3">
        <div className="font-bold flex items-center gap-2 text-zinc-800 dark:text-zinc-200 text-xs">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Important Capital Budgeting Interpretation</span>
        </div>
        <p>
          <strong>Payback Period as a Screening Metric:</strong> Payback Period is best treated as a capital-recovery and liquidity metric, not as a complete measure of investment profitability. Academic finance material consistently identifies the same limitations reflected in this calculator: ordinary payback ignores the time value of money, discounted payback corrects that specific weakness but still ignores post-break-even cash flows, and neither provides a universal acceptance threshold.
        </p>
        <p>
          For larger capital decisions, interpret the calculator as a sequence: Payback &rarr; Discounted Payback &rarr; NPV &rarr; IRR &rarr; Sensitivity &rarr; Project Comparison. The calculator&apos;s results depend entirely on the cash flows, lifespan, initial investment, growth assumptions, and discount rate entered and should be treated as financial model outputs rather than guaranteed future project performance.
        </p>
      </section>
    </article>
  );
}

export default PaybackPeriodContent;
