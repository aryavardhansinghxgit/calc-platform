"use client";

import React, { useState } from "react";
import {
  BookOpen,
  HelpCircle,
  TrendingUp,
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

export function FutureValueContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Future Value (FV)?",
      answer: "Future Value (FV) is a financial calculation that estimates how much an asset, lump sum, or stream of cash flows will be worth at a specific date in the future, given a specified expected rate of interest or investment growth.",
    },
    {
      question: "How is Future Value calculated?",
      answer: "For a single lump sum, Future Value is calculated using the formula FV = PV × (1 + r/n)^(n×t), where PV is Present Value, r is the annual rate, n is compounding frequency, and t is total years. For periodic deposits, annuity formulas account for contributions made over time.",
    },
    {
      question: "What is the difference between Present Value (PV) and Future Value (FV)?",
      answer: "Present Value (PV) represents the current worth of a future sum of money or stream of cash flows discounted at a specific rate. Future Value (FV) represents what current money will accumulate to over time when compounded at a given growth rate.",
    },
    {
      question: "What is compound interest and why does it matter for Future Value?",
      answer: "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. It creates exponential growth over time, enabling your money to generate returns on its own returns.",
    },
    {
      question: "What is an Ordinary Annuity vs. an Annuity Due?",
      answer: "In an Ordinary Annuity, periodic contributions or payments occur at the end of each payment period. In an Annuity Due, payments occur at the beginning of each period. Annuity Due yields higher Future Value because each contribution earns interest for one extra period.",
    },
    {
      question: "How does inflation affect Future Value?",
      answer: "Inflation reduces the purchasing power of money over time. While nominal Future Value shows the raw dollar total in the future, Real (Inflation-Adjusted) Future Value discounts that dollar figure back to today's purchasing power using the formula FV_real = FV_nominal / (1 + i)^t.",
    },
    {
      question: "How does compounding frequency impact investment returns?",
      answer: "More frequent compounding (e.g., daily or monthly vs. annual) generates higher total returns because interest is credited and reinvested sooner. For instance, $10,000 at 8% compounded daily yields $22,255 over 10 years, compared to $21,589 compounded annually.",
    },
    {
      question: "What is the Effective Annual Rate (EAR / APY)?",
      answer: "Effective Annual Rate (also called Annual Percentage Yield) is the actual annualized return earned on an investment when compounding frequency is accounted for. EAR = (1 + r/n)^n - 1.",
    },
    {
      question: "What is tax drag and how does it reduce Future Value?",
      answer: "Tax drag occurs when investment earnings (interest or capital gains) are taxed annually. Paying taxes each year reduces the principal balance left to compound, significantly lowering the overall Future Value compared to tax-deferred or tax-free accounts.",
    },
    {
      question: "What is a step-up contribution strategy?",
      answer: "A step-up contribution (or growing SIP) increases your periodic investment by a set percentage each year (e.g., matching salary increases). Step-up contributions dramatically accelerate portfolio growth over long horizons.",
    },
    {
      question: "What is the Rule of 72?",
      answer: "The Rule of 72 is a quick mental shortcut to estimate how many years it takes for an investment to double at a fixed annual rate. Divide 72 by the annual interest rate (e.g., 72 / 8% = 9 years).",
    },
    {
      question: "Can Future Value calculations guarantee my future wealth?",
      answer: "No. Future Value projections use assumed growth rates. Real-world market investments fluctuate, inflation rates vary, and tax laws change. Using Monte Carlo simulations helps assess probabilities rather than single fixed targets.",
    },
    {
      question: "What is the difference between simple interest and compound interest?",
      answer: "Simple interest pays interest only on the original principal balance. Compound interest pays interest on principal plus all previously earned interest, creating compounding growth.",
    },
    {
      question: "How does periodic contribution frequency (monthly vs annual) affect growth?",
      answer: "Investing monthly puts capital to work sooner than investing an equal total amount once per year. This additional time in the market allows compound interest to begin accruing immediately.",
    },
    {
      question: "How does Future Value assist in retirement planning?",
      answer: "Future Value helps project whether current 401(k), IRA, or pension savings will reach your target retirement nest egg, adjusting for inflation to ensure adequate retirement income.",
    },
    {
      question: "What is a Systematic Investment Plan (SIP)?",
      answer: "An SIP is an investment method where a fixed sum is invested regularly into mutual funds or index funds. Future Value calculations demonstrate how disciplined monthly SIPs build substantial long-term wealth.",
    },
    {
      question: "How do fixed deposits (FD) use Future Value formulas?",
      answer: "Fixed deposits promise a guaranteed annual interest rate over a fixed tenure. The Future Value formula accurately calculates your guaranteed maturity payout.",
    },
    {
      question: "What common mistakes do investors make when projecting Future Value?",
      answer: "Common mistakes include ignoring inflation, underestimating taxes and fees, assuming unrealistically high returns without accounting for market downturns, and failing to step up contributions over time.",
    },
    {
      question: "How do I calculate the required monthly savings for a future goal?",
      answer: "Use our Goal Planning Mode, which rearranges the annuity formula to solve for PMT required based on your target Future Value, target date, and expected interest rate.",
    },
    {
      question: "Why should I use Monte Carlo simulations for investment growth?",
      answer: "Unlike static average returns, Monte Carlo simulations test 500+ random market volatility scenarios to estimate your actual probability of hitting a financial target under realistic market fluctuations.",
    },
  ];

  return (
    <div className="space-y-10 mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> Comprehensive Financial Guide
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          Mastering Future Value: The Mathematics & Strategy of Wealth Building
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Future Value (FV) is the foundational concept of modern quantitative finance and personal wealth management. 
          Understanding how time, compounding frequency, contribution timing, inflation, and tax drag interact allows 
          investors, financial planners, and corporate strategists to optimize long-term capital growth.
        </p>
      </div>

      {/* Structured Sections Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <TrendingUp className="h-5 w-5" /> 1. What Is Future Value?
            </div>
            <p>
              <strong>Future Value (FV)</strong> measures how much a current lump sum (Present Value) or a series of periodic 
              contributions (Annuity) will accumulate to over a specified time horizon when invested at an expected annual interest rate.
            </p>
            <p>
              It incorporates the transformative power of <strong>compound interest</strong>—earning interest not only on your 
              initial principal but also on all accumulated returns from prior compounding cycles.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-base">
              <Zap className="h-5 w-5" /> 2. Future Value Formula Explained
            </div>
            <p>
              The basic formula for lump sum Future Value is expressed mathematically as:
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-800 p-3 rounded-lg font-sans tabular-nums text-xs text-center border border-zinc-200 dark:border-zinc-700">
              FV = PV × (1 + r / n)^(n × t)
            </div>
            <ul className="text-xs space-y-1 text-zinc-600 dark:text-zinc-400">
              <li>• <strong>FV:</strong> Future Value of the investment</li>
              <li>• <strong>PV:</strong> Present Value (initial deposit)</li>
              <li>• <strong>r:</strong> Nominal annual interest rate (decimal)</li>
              <li>• <strong>n:</strong> Compounding frequency per year</li>
              <li>• <strong>t:</strong> Investment duration in years</li>
            </ul>
          </div>
        </div>

        {/* Section 3 & 4 */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Clock className="h-5 w-5 text-emerald-600" /> 3. Time Value of Money (TVM) & PV vs. FV
          </h3>
          <p>
            The <strong>Time Value of Money (TVM)</strong> is the core economic principle stating that a dollar in hand today is worth 
            more than a dollar promised at a future date. This occurs because money available today can be invested to earn interest, 
            producing a higher total balance in the future.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg border border-emerald-200 dark:border-emerald-900">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">Present Value (PV) Focus</span>
              Discounts future cash flows back to today's equivalent monetary value using a discount rate. Crucial for asset valuation and bond pricing.
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-900">
              <span className="font-bold text-blue-800 dark:text-blue-300 block mb-1">Future Value (FV) Focus</span>
              Compounds present balances forward into the future to determine accumulated wealth. Essential for wealth creation, savings targets, and retirement projections.
            </div>
          </div>
        </div>

        {/* Section 5, 6 & 7: Annuities & Timing */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-600" /> 5–7. Lump Sums vs. Ordinary Annuities vs. Annuities Due
          </h3>
          <p>
            When investing, cash can enter portfolio balances in two primary structures: a single upfront lump sum or recurring periodic deposits (annuities).
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Type</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Timing of Cash Flow</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Formula</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Relative Yield</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold">Lump Sum</td>
                  <td className="p-3">Single initial deposit at t=0</td>
                  <td className="p-3 font-sans tabular-nums text-[11px]">FV = PV × (1+r/n)^(nt)</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">Baseline growth on capital</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Ordinary Annuity</td>
                  <td className="p-3">Deposits at end of each period</td>
                  <td className="p-3 font-sans tabular-nums text-[11px]">FV = PMT × [((1+i)^n - 1) / i]</td>
                  <td className="p-3 text-zinc-600 dark:text-zinc-400">Standard recurring savings model</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Annuity Due</td>
                  <td className="p-3">Deposits at start of each period</td>
                  <td className="p-3 font-sans tabular-nums text-[11px]">FV = FV_ordinary × (1+i)</td>
                  <td className="p-3 text-emerald-600 font-bold">+1 Extra period of interest per deposit</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 8, 9 & 10: Compounding, Inflation & Taxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-1.5">
              <PieIcon className="h-4 w-4 text-blue-500" /> 8. Compounding Frequency
            </h4>
            <p className="text-xs">
              Compounding frequency dictates how often accrued interest is reinvested into the principal. 
              Compounding daily or monthly accelerates growth compared to annual compounding.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-500" /> 9. Inflation Drag
            </h4>
            <p className="text-xs">
              Inflation erodes purchasing power over time. A $1,000,000 nominal Future Value in 30 years with 3% annual inflation 
              has a real purchasing power of only <strong>$411,987</strong> in today's dollars.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-base flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-rose-500" /> 10. Tax Drag Impact
            </h4>
            <p className="text-xs">
              Taxes paid annually on investment growth reduce the compounding snowball effect. Utilizing tax-advantaged accounts 
              (401k, Roth IRA, ISA) prevents annual tax drag, maximizing ultimate wealth.
            </p>
          </div>
        </div>

        {/* Section 11 - 15: Use Cases & Pitfalls */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Award className="h-5 w-5 text-indigo-600" /> 11–15. Real-World Applications & Common Mistakes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Retirement & 401(k) Planning</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                Future Value modeling determines the target nest egg needed for financial independence. Adding annual step-up contributions 
                (e.g., increasing monthly savings by 5% each year) can increase final retirement capital by 40%–70%.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Systematic Investment Plans (SIP) & FDs</span>
              <p className="text-zinc-600 dark:text-zinc-400">
                Dollar-cost averaging into index funds or committing to guaranteed Fixed Deposits (FD) relies on Future Value formulas 
                to quantify returns across varying market conditions.
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
