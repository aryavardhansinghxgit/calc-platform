"use client";

import React, { useState } from "react";
import {
  BookOpen,
  HelpCircle,
  TrendingDown,
  DollarSign,
  PieChart as PieIcon,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Award,
  Clock,
  Layers,
  ArrowRight,
} from "lucide-react";

export function PresentValueContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Present Value (PV)?",
      answer: "Present Value (PV) is the current worth of a future sum of money or stream of cash flows, given a specified discount rate (or rate of return). It measures how much money would need to be invested today to equal a target future sum.",
    },
    {
      question: "How is Present Value calculated for a lump sum?",
      answer: "Present Value of a future lump sum is calculated using the discounting formula PV = FV / (1 + r/n)^(n×t), where FV is Future Value, r is annual discount rate, n is compounding frequency, and t is time in years.",
    },
    {
      question: "What is the difference between Present Value (PV) and Future Value (FV)?",
      answer: "Future Value (FV) calculates what today's money will compound into in the future. Present Value (PV) does the reverse—discounting future cash flows back to determine their equivalent value in today's dollars.",
    },
    {
      question: "What is a discount rate and how is it chosen?",
      answer: "The discount rate is the interest rate used to discount future cash flows back to the present. It represents expected return, opportunity cost of capital, cost of borrowing (WACC), or hurdle rate based on risk level.",
    },
    {
      question: "What is an Ordinary Annuity vs. an Annuity Due in Present Value?",
      answer: "In an Ordinary Annuity, periodic cash flows occur at the end of each period. In an Annuity Due, payments occur at the beginning of each period. Present Value of an Annuity Due is higher because each cash flow is discounted by one fewer period.",
    },
    {
      question: "What is Net Present Value (NPV)?",
      answer: "Net Present Value (NPV) is the sum of the present values of incoming cash flows minus initial capital outlays. An NPV greater than zero indicates that a project or investment is expected to generate profit above the discount rate.",
    },
    {
      question: "How does inflation affect Present Value?",
      answer: "Inflation reduces future purchasing power. When discounting future money, adding an inflation adjustment ensures you evaluate real purchasing power rather than just nominal dollar amounts.",
    },
    {
      question: "Why does a higher discount rate decrease Present Value?",
      answer: "A higher discount rate implies a higher required return or opportunity cost. As the denominator (1 + r)^t increases, the resulting present value decreases, making future dollars worth less today.",
    },
    {
      question: "What is a Growing Annuity?",
      answer: "A Growing Annuity is a stream of periodic cash flows that grow at a constant annual percentage rate (g). The formula PV = PMT / (r - g) * [1 - ((1+g)/(1+r))^t] computes the present value of growing deposits or revenues.",
    },
    {
      question: "How is Present Value used in real estate valuation?",
      answer: "Real estate investors use PV and Discounted Cash Flow (DCF) models to discount projected rental income streams and terminal property resale prices to decide fair purchase prices.",
    },
    {
      question: "How is Present Value used in bond pricing?",
      answer: "Bond pricing equals the present value of all future coupon interest payments plus the present value of the face value principal repayment at maturity, discounted at current market yield.",
    },
    {
      question: "What is the Weighted Average Cost of Capital (WACC)?",
      answer: "WACC is the average rate of return a company is expected to pay to all its security holders (debt and equity) to finance its assets. It serves as the standard corporate discount rate for NPV calculations.",
    },
    {
      question: "How does compounding frequency impact Present Value?",
      answer: "More frequent compounding (e.g., monthly or daily vs. annual) increases the effective discount rate per year, resulting in a lower Present Value.",
    },
    {
      question: "What is the difference between NPV and IRR?",
      answer: "NPV calculates dollar profitability at a specified discount rate. Internal Rate of Return (IRR) is the exact discount rate that makes the NPV equal to zero.",
    },
    {
      question: "How is Present Value applied in retirement planning?",
      answer: "Present Value determines the lump sum nest egg required at retirement age to generate your target annual living expenses over your expected retirement years.",
    },
    {
      question: "What common mistakes should I avoid when calculating PV?",
      answer: "Avoid misaligning period rates with payment frequencies, confusing nominal vs. real rates, using inappropriate discount rates for high-risk assets, and ignoring tax impacts.",
    },
    {
      question: "Can Present Value be negative?",
      answer: "Individual present value of a future inflow is always positive. However, Net Present Value (NPV) can be negative if future discounted inflows fail to cover initial investment outlays.",
    },
    {
      question: "How do I calculate the present value of a perpetuity?",
      answer: "A perpetuity pays an infinite stream of equal cash flows. Present value of a simple perpetuity is PV = PMT / r. For a growing perpetuity, PV = PMT / (r - g).",
    },
    {
      question: "What is sensitivity analysis in Present Value calculations?",
      answer: "Sensitivity analysis tests how changes in key variables—such as discount rate or cash flow growth rate—impact the final Present Value, helping quantify financial risk.",
    },
    {
      question: "Why is Present Value essential for lottery lump sum vs. annuity choices?",
      answer: "Lottery winners choose between a reduced upfront lump sum cash payout or an annuity paid over 30 years. Calculating PV at market investment rates determines which option yields higher total wealth.",
    },
  ];

  return (
    <div className="space-y-10 mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> Quantitative Valuation Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          Present Value (PV) & Capital Discounting: Complete Strategic Guide
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Present Value (PV) is the cornerstone of corporate finance, investment banking, real estate appraisal, and 
          personal financial management. By converting future cash flows into today's purchasing power, investors can 
          accurately compare competing investments, evaluate capital expenditures, and make disciplined financial decisions.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <DollarSign className="h-5 w-5" /> 1. What Is Present Value (PV)?
            </div>
            <p>
              <strong>Present Value (PV)</strong> represents the current monetary worth of a future sum of money or stream of 
              cash flows, discounted at a specific rate of return.
            </p>
            <p>
              It answers the fundamental financial question: <em>"How much money do I need to invest today at rate r to end up 
              with $X in the future?"</em>
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-base">
              <Zap className="h-5 w-5" /> 2. Present Value Formula & Variables
            </div>
            <p>
              The basic formula for lump sum Present Value is expressed as:
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg font-mono text-xs text-center border border-zinc-200 dark:border-zinc-700">
              PV = FV / (1 + r / n)^(n × t)
            </div>
            <ul className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>• <strong>PV:</strong> Present Value (Current upfront worth)</li>
              <li>• <strong>FV:</strong> Future Value target sum</li>
              <li>• <strong>r:</strong> Annual discount rate (decimal)</li>
              <li>• <strong>n:</strong> Compounding frequency per year</li>
              <li>• <strong>t:</strong> Investment duration in years</li>
            </ul>
          </div>
        </div>

        {/* Section 3 & 4: TVM Principle & Comparison */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-emerald-600" /> 3. The Time Value of Money (TVM) Principle
          </h3>
          <p>
            The <strong>Time Value of Money (TVM)</strong> states that money available at the present time is worth more than 
            the identical sum in the future due to its potential earning capacity. Receiving $10,000 today allows you to earn interest or investment returns; receiving $10,000 in 10 years misses a decade of compounding opportunities.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <span className="font-bold text-blue-800 dark:text-blue-300 block mb-1">Present Value (Discounting)</span>
              Moves backward in time. Calculates what future income is worth right now by stripping out potential compound interest.
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Future Value (Compounding)</span>
              Moves forward in time. Calculates how current capital grows over time by adding compound interest.
            </div>
          </div>
        </div>

        {/* Section 5 & 6: Annuities & Timing */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-600" /> 5–7. Lump Sum PV vs. Annuity PV vs. Growing Annuity
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Cash Flow Structure</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Timing of Cash Flows</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Formula</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Key Application</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold">Lump Sum</td>
                  <td className="p-3">Single payment at end of term</td>
                  <td className="p-3 font-mono text-[11px]">PV = FV / (1+r)^t</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">Zero-coupon bonds, single target payouts</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Ordinary Annuity</td>
                  <td className="p-3">Equal deposits at period end</td>
                  <td className="p-3 font-mono text-[11px]">PV = PMT × [1 - (1+r)^-t] / r</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">Mortgages, fixed loan repayments</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Annuity Due</td>
                  <td className="p-3">Equal deposits at period start</td>
                  <td className="p-3 font-mono text-[11px]">PV = PV_ordinary × (1+r)</td>
                  <td className="p-3 text-emerald-600 font-bold">Lease payments, rent prepayments</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Growing Annuity</td>
                  <td className="p-3">Cash flows growing at rate g</td>
                  <td className="p-3 font-mono text-[11px]">PV = PMT / (r-g) × [1 - ((1+g)/(1+r))^t]</td>
                  <td className="p-3 text-purple-600 font-bold">Inflation-indexed pensions, dividend growth</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 8 & 9: Net Present Value & Discount Rates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-1.5">
              <PieIcon className="h-4 w-4 text-blue-500" /> 8. Net Present Value (NPV)
            </h4>
            <p className="text-xs">
              NPV evaluates commercial profitability by subtracting upfront capital outlays from the sum of discounted future cash flows.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> 9. Discount Rate Selection
            </h4>
            <p className="text-xs">
              Choosing the right rate (WACC for corporates, risk-free rate + premium for investments) determines whether projects pass hurdle checks.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-rose-500" /> 10. Sensitivity Analysis
            </h4>
            <p className="text-xs">
              Testing Present Value across rate variations (±1% to ±3%) quantifies interest rate risk before committing capital.
            </p>
          </div>
        </div>

        {/* Real Applications & Pitfalls */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-600" /> 11–15. Real-World Applications & Best Practices
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Lottery Payout Decisions</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                Determines whether taking a reduced immediate cash option or an annual annuity payout over 30 years yields superior net wealth after expected market returns.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Real Estate & Commercial DCF</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                Discounting projected property rental revenues and exit cap rates back to current dollars ensures real estate acquisitions don't overpay.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 20 SEO FAQs Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[20px]">
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
