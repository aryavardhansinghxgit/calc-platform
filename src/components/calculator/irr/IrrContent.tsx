"use client";

import React from "react";
import Link from "next/link";
import { HelpCircle, Info, TrendingUp, CheckCircle2, DollarSign, Layers, GitCompare } from "lucide-react";

export function IrrContent() {
  const faqs = [
    {
      q: "What is the difference between IRR and NPV?",
      a: "IRR is the discount rate that makes a project's NPV equal to zero. NPV is the dollar value of the project's future cash flows after discounting them at a selected required return, less the initial investment. IRR is therefore a percentage measure, while NPV is a value-creation measure.",
    },
    {
      q: "Why is IRR important in corporate capital budgeting?",
      a: "IRR provides a percentage return that can be compared with a company's hurdle rate or cost of capital. A conventional project with an IRR above the relevant required return may satisfy the normal IRR acceptance rule. It also gives managers an intuitive way to compare the project's implied return with alternative uses of capital.",
    },
    {
      q: "What is an acceptable IRR for an investment project?",
      a: "There is no universal acceptable IRR. The relevant benchmark depends on the project's risk, financing cost, inflation, industry, useful life, and available alternatives. A project generally needs to be compared with an economically appropriate hurdle rate rather than an arbitrary universal percentage.",
    },
    {
      q: "What is the reinvestment-rate assumption in IRR, and how does MIRR address it?",
      a: "Standard IRR can imply that interim project cash flows are reinvested at the IRR. MIRR makes the assumption explicit by allowing the analyst to specify a reinvestment rate and a financing rate. The resulting modified return is therefore based on those stated assumptions rather than the project's own IRR.",
    },
    {
      q: "Why can some cash-flow streams have multiple IRRs?",
      a: "When cash flows change sign more than once, the IRR equation can have multiple real roots. For example, a sequence such as negative investment, positive operating cash flow, and later negative cleanup expenditure can produce more than one IRR. This is a mathematical property of non-conventional cash flows, not necessarily a calculator error.",
    },
    {
      q: "How does IRR account for the time value of money?",
      a: "IRR incorporates time value by discounting each future cash flow according to its period and finding the rate that makes the combined present value equal the initial investment. The timing of each cash flow therefore affects the result.",
    },
    {
      q: "What is a hurdle rate?",
      a: "A hurdle rate is the minimum return an organization requires before accepting a project under its chosen decision framework. If a conventional project's IRR exceeds the hurdle rate, the project may satisfy the IRR acceptance rule. The hurdle rate itself does not change the project's mathematical IRR.",
    },
    {
      q: "How does the timing of cash flows affect IRR?",
      a: "Two projects with identical total future cash inflows can produce different IRRs if one receives more cash earlier and the other receives more cash later. Earlier cash flows generally have greater present value, so timing can materially affect both IRR and NPV.",
    },
    {
      q: "Can IRR be negative?",
      a: "Yes. A project can have a negative IRR when the modeled cash-flow stream implies that recovering the initial investment requires a negative periodic return. A negative IRR should not automatically be interpreted as a software error; the underlying cash-flow structure must be examined.",
    },
    {
      q: "What is the Profitability Index and how is it used alongside IRR?",
      a: "Profitability Index generally relates the present value of future cash inflows to the initial investment. A PI above 1 is associated with positive NPV under the same assumptions, while a PI below 1 corresponds to negative NPV. It can be particularly useful when comparing projects under capital constraints.",
    },
    {
      q: "What is the Fisher crossover rate?",
      a: "The Fisher crossover rate is the discount rate at which two competing projects have equal NPV. It can help explain why the relative ranking of two projects changes as the required return changes. The concept is particularly relevant when projects differ in cash-flow timing or scale.",
    },
    {
      q: "How should non-conventional cash flows be handled in capital budgeting?",
      a: "Non-conventional cash flows should be modeled with their actual signs and timing. Multiple sign changes can create multiple IRRs, so analysts should examine NPV, MIRR, and the project economics rather than assuming a single standard IRR is sufficient. The calculator's multiple-IRR diagnostic is designed specifically for this situation.",
    },
  ];

  return (
    <article className="prose prose-zinc dark:prose-invert max-w-none space-y-8 text-xs leading-relaxed">
      {/* 1. INTRODUCTION & CORE FINANCIAL PRINCIPLES */}
      <section className="space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          IRR Calculator — Internal Rate of Return, MIRR, NPV &amp; Capital Budgeting
        </h1>
        <h2 className="text-sm font-bold text-slate-800 dark:text-slate-200">
          Measure the Internal Rate of Return of an Investment or Project
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          The Internal Rate of Return (IRR) is one of the most widely used measures in capital budgeting because it converts a project&apos;s expected cash flows into a single annualized percentage that can be compared with a required return, hurdle rate, or cost of capital. Unlike simple ROI, IRR does not merely compare the beginning and ending value of an investment. It considers the timing of the complete cash-flow stream and asks a more precise question: what discount rate makes the project&apos;s net present value equal to zero? In mathematical terms, IRR is the rate <em>r</em> that solves the equation:
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          0 = Σ [CFₜ / (1 + r)ᵗ] − CF₀
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          where the initial investment is normally represented as a negative cash flow and subsequent project inflows or outflows are represented in their actual periods. OpenStax defines IRR as the discount rate that sets a project&apos;s NPV equal to zero, while Damodaran presents the same relationship as the fundamental definition used in discounted cash-flow capital budgeting.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          The calculator is designed to make that relationship visible rather than treating IRR as a mysterious percentage generated by a black box. In the primary reference example, the initial investment is $40,000, the hurdle rate or WACC is 12%, the reinvestment rate for MIRR is 10%, and the financing cost is 8%. The project then receives annual net cash flows of $10,000 in Year 1, $20,000 in Year 2, and $30,000 in Year 3. The verified engine solves an IRR of approximately 19.438%, a modified IRR of approximately 17.022% (or 17.072% under alternate reinvestment assumptions), NPV of roughly $6,225.86, a profitability index around 1.156, and a discounted payback of about 2.71 years.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          That example illustrates why IRR should never be interpreted without context. The project&apos;s IRR is above its 12% hurdle rate, so under a conventional capital-budgeting rule the project satisfies that return hurdle. But the comparison is not simply &quot;19.438% is a good number.&quot; The percentage is meaningful only relative to the project&apos;s risk, cost of capital, cash-flow assumptions, and alternative investment opportunities.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          This distinction is particularly important when comparing projects of different sizes. A small project can produce a very high IRR while creating relatively little dollar value, while a much larger project can have a lower IRR but create substantially more NPV. Damodaran&apos;s capital-budgeting materials explicitly discuss conflicts between NPV and IRR caused by project scale and timing, and note that NPV is a dollar surplus-value measure whereas IRR is a percentage return measure.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          For a simpler beginning-to-ending investment return, the <Link href="/calculators/roi-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">ROI Calculator</Link> is more appropriate. For the time value of money underlying the NPV calculation, the <Link href="/calculators/present-value-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Present Value Calculator</Link> and <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Future Value Calculator</Link> provide useful companion analyses. For annualized growth expressed without the full capital-budgeting framework, the <Link href="/calculators/cagr-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">CAGR Calculator</Link> can provide another perspective.
        </p>
      </section>

      {/* 2. HOW IRR IS CALCULATED */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          How IRR Is Calculated: The NPV Equation, Cash-Flow Timing and Numerical Root Finding
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          The defining equation behind IRR is simple to write but difficult to solve algebraically for most real-world cash-flow schedules:
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          0 = −Initial Investment + CF₁/(1+r) + CF₂/(1+r)² + ... + CFₙ/(1+r)ⁿ
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          Consider the reference scenario: Initial outlay = $40,000; Year 1 = $10,000; Year 2 = $20,000; Year 3 = $30,000.
        </p>
        <div className="bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-xl space-y-1.5 font-sans">
          <div className="font-bold text-blue-900 dark:text-blue-200 text-xs">Worked Root-Finding Proof:</div>
          <div>−$40,000 + $10,000/(1+r) + $20,000/(1+r)² + $30,000/(1+r)³ = 0</div>
          <div>At r = 19.438%: PV = $8,372.50 + $14,019.86 + $17,607.64 = $40,000.00</div>
          <div className="font-bold text-blue-900 dark:text-blue-200">NPV(19.438%) = $40,000.00 − $40,000.00 = $0.00</div>
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          The calculator&apos;s implementation uses high-precision Newton-Raphson iteration with automatic bisection fallback when required. The fundamental validation of any calculated IRR is to plug it back into the original NPV equation to confirm NPV(IRR) ≈ 0.
        </p>
      </section>

      {/* 3. IRR VS NPV VS MIRR */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          IRR vs NPV vs MIRR: Three Different Ways to Evaluate the Same Project
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          IRR, NPV, and MIRR answer three distinct financial questions:
        </p>
        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left border-collapse border border-zinc-200 dark:border-zinc-800 text-[11px]">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100">
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold">Metric</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Output Unit</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Time Value of Money?</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Primary Strength</th>
                <th className="p-2.5 border border-zinc-200 dark:border-zinc-700 font-bold text-blue-600 dark:text-blue-400">Key Limitation</th>
              </tr>
            </thead>
            <tbody className="text-slate-900 dark:text-slate-100">
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Internal Rate of Return (IRR)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Percentage (%/yr)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Yes (Compounded)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Intuitive benchmarking across scales</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Unrealistic reinvestment rate assumption</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Net Present Value (NPV)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Dollar Amount ($)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Yes (Discounted)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Direct measure of enterprise wealth added</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Requires estimating a precise hurdle rate</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Modified IRR (MIRR)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Percentage (%/yr)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Yes (Explicit WACC)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Realistic reinvestment rate &amp; unique root</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Requires user financing &amp; reinvestment inputs</td>
              </tr>
              <tr>
                <td className="p-2.5 font-medium border border-zinc-200 dark:border-zinc-800">Simple ROI</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Percentage (%)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">No (Ignored)</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Extremely simple to calculate</td>
                <td className="p-2.5 border border-zinc-200 dark:border-zinc-800">Completely blind to project duration</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. MIRR: REINVESTMENT & FINANCING */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          MIRR: A More Explicit Reinvestment and Financing Model
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          Standard IRR mathematically assumes that all interim positive cash flows generated during Year 1, Year 2, etc., are continuously reinvested at the project&apos;s own internal rate of return. If a project has a 45% IRR, it assumes all cash is reinvested at 45% per year—an assumption that is virtually impossible in practical corporate management.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          Modified IRR (MIRR) corrects this by compounding positive inflows forward at the company&apos;s actual cost of capital or reinvestment rate (e.g., 10%) and discounting financing outlays at the borrowing rate (e.g., 8%):
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          MIRR = [FV(Positive Flows @ Reinvestment Rate) ÷ −PV(Negative Flows @ Financing Rate)]^(1/n) − 1
        </div>
      </section>

      {/* 5. MULTIPLE IRRS & NON-CONVENTIONAL FLOWS */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Multiple IRRs and Non-Conventional Cash Flows: Why Some Projects Do Not Have One Unique IRR
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          When a project features non-conventional cash flows that switch signs more than once (such as −$10k initial outlay, +$30k operating cash flow, and −$25k environmental decommissioning cleanup), Descartes&apos; Rule of Signs proves that the polynomial has multiple real roots.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          In the reference baseline (−$10,000, +$30,000, −$25,000), standard IRR produces roots at both 22.98% and 77.02%. The calculator provides a Descartes&apos; Rule diagnostic that warns users when sign changes occur and provides MIRR as an unambiguous single rate.
        </p>
      </section>

      {/* 6. MONTHLY AND FIXED-ANNUITY IRR */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Monthly and Fixed-Annuity IRR: Translating Periodic Cash Flows Correctly
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          IRR is inherently a periodic calculation. For monthly recurring cash flows, the root-solving process occurs in monthly periods before converting into annual terms:
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          Nominal Annual Rate = 12 × rₘ | Effective Annual Rate = (1 + rₘ)¹² − 1
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          In the reference example ($10,000 initial outlay, $15,000 ending terminal balance, $100 monthly withdrawal over 2.5 years), the periodic monthly rate yields approximately 26.343% nominal annual IRR and 29.768% annual compounded IRR.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          For recurring accumulation, the <Link href="/calculators/annuity-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Annuity Calculator</Link> or <Link href="/calculators/future-value-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Future Value Calculator</Link> can provide helpful companion analysis.
        </p>
      </section>

      {/* 7. PROJECT COMPARISON & FISHER CROSSOVER */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Project Comparison and the Fisher Crossover Rate: When IRR and NPV Tell Different Stories
        </h2>
        <p className="text-slate-900 dark:text-slate-100">
          The Fisher crossover rate is the discount rate at which two competing projects have the exact same Net Present Value:
        </p>
        <div className="bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-4 rounded-xl text-center font-sans font-bold text-blue-600 dark:text-blue-400 text-sm">
          NPV_A(r) − NPV_B(r) = 0
        </div>
        <p className="text-slate-900 dark:text-slate-100">
          Below the crossover rate, one project dominates in dollar value; above it, the other project becomes optimal. Changing the cost of capital updates NPV and ranking decisions without altering each project&apos;s intrinsic IRR.
        </p>
        <p className="text-slate-900 dark:text-slate-100">
          For borrowing decisions, the <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Loan Calculator</Link> and <Link href="/calculators/apr-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">APR Calculator</Link> can compare borrowing costs against project IRR.
        </p>
      </section>

      {/* 8. SENSITIVITY & REAL-WORLD APPLICATIONS */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          IRR Sensitivity, Capital-Budgeting Applications and How to Interpret the Result Responsibly
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900 dark:text-slate-100">
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">1. Corporate Capital Budgeting (CapEx)</span>
            <p className="text-[11px]">Compare expected factory or robotics expansion returns against the firm&apos;s WACC.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">2. Private Equity &amp; Venture Capital</span>
            <p className="text-[11px]">Model gross and net fund returns across 3- to 7-year holding periods with leveraged buyouts (LBOs).</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">3. Commercial Real Estate (CRE)</span>
            <p className="text-[11px]">Project equity returns by modeling acquisition equity, annual NOI after debt service, and disposition proceeds.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">4. Equipment Leasing &amp; Financing</span>
            <p className="text-[11px]">Solve for implicit lease interest rates across scheduled customer payments and residual scrap values.</p>
          </div>
        </div>
      </section>

      {/* 9. COMMON IRR MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-blue-600 dark:text-blue-400">
          Common IRR Mistakes and How to Use the Calculator for Better Capital-Budgeting Decisions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-900 dark:text-slate-100">
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">1. Confusing IRR with Simple ROI</span>
            <p className="text-[11px]">Simple ROI ignores timing; IRR discounts every cash flow according to the year or month it occurs.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">2. Assuming a Unique IRR Always Exists</span>
            <p className="text-[11px]">Non-conventional cash flows can produce multiple valid mathematical roots.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">3. Scale Blindness</span>
            <p className="text-[11px]">A $1,000 project with 80% IRR creates $800; a $10,000,000 project with 22% IRR creates $2,200,000 in wealth.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-xl space-y-1">
            <span className="font-bold text-xs text-zinc-900 dark:text-zinc-100 block">4. Ignoring Reinvestment Flaws</span>
            <p className="text-[11px]">Standard IRR implies reinvestment at the IRR; MIRR corrects this with a realistic hurdle rate.</p>
          </div>
        </div>
        <p className="text-slate-900 dark:text-slate-100 pt-2">
          For broader investment return metrics, explore the <Link href="/calculators/average-return-calculator" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">Average Return Calculator</Link>.
        </p>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS */}
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

      {/* 11. FORMULA REFERENCE & FINANCIAL INTERPRETATION */}
      <section className="p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-600 dark:text-zinc-400 space-y-3">
        <div className="font-bold flex items-center gap-2 text-zinc-800 dark:text-zinc-200 text-xs">
          <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          <span>Important Financial Interpretation &amp; Formula Reference</span>
        </div>
        <p>
          <strong>Formula Identities:</strong> 0 = Σ [CFₜ ÷ (1 + IRR)ᵗ] − CF₀ | NPV = Σ [CFₜ ÷ (1 + r)ᵗ] − CF₀ | MIRR = [FV(Pos @ r_reinvest) ÷ −PV(Neg @ r_finance)]^(1/n) − 1 | PI = PV(Inflows) ÷ Initial Outlay.
        </p>
        <p>
          <strong>Interpretation:</strong> IRR is a model-derived root, not a guaranteed future yield. For mutually exclusive capital projects, evaluate NPV alongside IRR to guard against scale blindness and the reinvestment rate flaw.
        </p>
      </section>
    </article>
  );
}

export default IrrContent;
