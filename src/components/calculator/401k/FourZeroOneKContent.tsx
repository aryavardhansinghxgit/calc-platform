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
  Globe,
  Lock,
  Landmark,
} from "lucide-react";

export function FourZeroOneKContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the 2025 and 2026 IRS 401(k) contribution limit?",
      answer: "For 2025, the IRS 401(k) employee elective deferral limit is $23,500 ($24,500 for 2026). Individuals aged 50 and older can make an additional catch-up contribution of $7,500 ($31,000 / $32,000 total).",
    },
    {
      question: "What is an Employer 401(k) Match?",
      answer: "An employer match is additional money contributed by your employer to your 401(k) based on your contributions (e.g., matching 50% of your contributions up to 6% of your salary, granting an effective 3% salary bonus).",
    },
    {
      question: "What is the 10% IRS Early Withdrawal Penalty?",
      answer: "If you withdraw funds from your 401(k) before age 59½, the IRS levies an immediate 10% penalty fee on top of federal, state, and local income taxes, unless you qualify for an IRS exemption.",
    },
    {
      question: "What is Traditional 401(k) vs. Roth 401(k)?",
      answer: "Traditional 401(k) contributions are made pre-tax today, lowering your taxable income now, but withdrawals in retirement are taxed. Roth 401(k) contributions are made after-tax today, but all future growth and retirement withdrawals are 100% tax-free.",
    },
    {
      question: "What is a 401(k) Vesting Schedule?",
      answer: "Vesting determines how much of your employer's matching contributions you get to keep if you leave the company. Employee contributions are always 100% vested immediately, while employer match may vest over 1 to 6 years.",
    },
    {
      question: "What is a 401(k) Hardship Withdrawal?",
      answer: "The IRS permits early withdrawals without penalty for specific financial hardships, such as un-reimbursed medical expenses exceeding 7.5% AGI, primary home purchase, post-secondary tuition, or foreclosure prevention.",
    },
    {
      question: "Can I take a loan from my 401(k)?",
      answer: "Yes, most plans allow borrowing up to 50% of your vested balance or $50,000 (whichever is less). You pay the loan back with interest to yourself via automatic payroll deductions over 5 years.",
    },
    {
      question: "What happens to my 401(k) when I change jobs?",
      answer: "You have 4 options: 1) Leave it in the old employer's plan; 2) Roll it over into your new employer's 401(k); 3) Roll it over into a Rollover IRA; 4) Cash out (incurring taxes & 10% penalty).",
    },
    {
      question: "What is a Required Minimum Distribution (RMD)?",
      answer: "The IRS requires traditional 401(k) owners to begin taking mandatory taxable annual distributions (RMDs) starting at age 73 (age 75 starting in 2033).",
    },
    {
      question: "What is a Solo 401(k) for self-employed individuals?",
      answer: "A Solo 401(k) is designed for business owners with no employees (except a spouse), allowing contributions as both employee (up to $23,500/$24,500) and employer (up to 25% of net self-employment income).",
    },
    {
      question: "How does purchasing power inflation affect my 401(k)?",
      answer: "Inflation reduces what your future dollars can buy. At a 3% annual inflation rate, a $1,000,000 nest egg at age 65 has the purchasing power of ~$350,000 in today's dollars.",
    },
    {
      question: "What is the Super Catch-Up contribution for ages 60 to 63?",
      answer: "Under SECURE Act 2.0, starting in 2025/2026, employees aged 60, 61, 62, and 63 qualify for a higher catch-up contribution limit equal to $11,250 or 150% of the standard catch-up amount.",
    },
    {
      question: "Are 401(k) assets protected from bankruptcy?",
      answer: "Yes. ERISA-qualified 401(k) plans carry strong federal creditor protection, shielding your retirement balance from judgment creditors and bankruptcy proceedings.",
    },
    {
      question: "What is Rule 72(t) SEPP for early retirement?",
      answer: "Rule 72(t) allows penalty-free early 401(k)/IRA withdrawals before age 59½ by committing to Substantially Equal Periodic Payments (SEPP) for at least 5 years or until reaching age 59½.",
    },
    {
      question: "What is the total combined 401(k) limit (Section 415(c))?",
      answer: "The total combined limit for employee contributions plus employer match for 2025 is $70,000 ($77,500 with catch-up) or 100% of employee compensation.",
    },
    {
      question: "What are administrative & expense ratio fees in a 401(k)?",
      answer: "401(k) plans charge administrative fees and fund expense ratios (ranging from 0.03% for index funds to 1.5%+ for actively managed funds). High fees can erode hundreds of thousands in compounding wealth.",
    },
    {
      question: "Can I contribute to both a 401(k) and an IRA in the same year?",
      answer: "Yes. You can maximize your 401(k) ($23,500/$24,500) and also contribute to a Traditional or Roth IRA ($7,000 limit for 2025/2026) in the same tax year.",
    },
    {
      question: "What is auto-enrollment and auto-escalation in 401(k) plans?",
      answer: "Many employers automatically enroll new hires at a default contribution rate (e.g. 3%) and automatically escalate the contribution by 1% each year until reaching a target cap (e.g. 10%).",
    },
    {
      question: "What is the difference between defined contribution and defined benefit?",
      answer: "A 401(k) is a defined contribution plan where you control contributions and investment choices. A pension is a defined benefit plan where the employer guarantees a fixed monthly payment in retirement.",
    },
    {
      question: "Why use an online 401(k) Calculator?",
      answer: "An online 401(k) calculator models compounding investment returns, computes employer matching dollars, enforces IRS contribution caps, projects purchasing power inflation, and evaluates early withdrawal penalties.",
    },
  ];

  return (
    <div className="space-y-10 mt-8 border-t border-zinc-200 dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> 401(k) Wealth &amp; Retirement Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          The Power of 401(k) Compounding: Matching, Tax-Deferral &amp; Growth
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          A 401(k) is one of the most effective tools for building long-term wealth. Combining pre-tax contributions, 
          employer matching dollars, tax-deferred compounding, and high IRS annual limits ($23,500 / $24,500+) creates exponential multi-generational wealth.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1: Employer Match & IRS Caps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <Award className="h-5 w-5" /> 1. Employer Match: Guaranteed 100% Return
            </div>
            <p>
              Employer matching is free money. For example, a 50% match up to 6% of your salary grants an instant guaranteed 50% return on your saved dollars. Always contribute at least enough to capture your full employer match.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-base">
              <ShieldCheck className="h-5 w-5" /> 2. Traditional vs. Roth 401(k)
            </div>
            <p>
              <strong>Traditional 401(k):</strong> Contributions are pre-tax, lowering your taxable income today. Payouts in retirement are taxed as ordinary income.<br />
              <strong>Roth 401(k):</strong> Contributions are after-tax today, but all future investment growth and retirement withdrawals are 100% tax-free.
            </p>
          </div>
        </div>

        {/* Section 2: Early Withdrawal Penalties Table */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" /> 3. Early Withdrawal Penalties &amp; Taxes Breakdown
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Withdrawal Type</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">IRS Penalty Fee</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Income Taxes</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Net Cash Retained</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold text-red-600">Early Cash-Out (under 59½)</td>
                  <td className="p-3 font-bold text-red-600">10% IRS Penalty</td>
                  <td className="p-3 text-red-500">Federal + State + Local Tax</td>
                  <td className="p-3 font-bold text-red-600">Only 55% – 65% of balance</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-amber-600">IRS Hardship Withdrawal</td>
                  <td className="p-3 font-medium text-amber-600">10% Penalty (unless exempt)</td>
                  <td className="p-3">Federal + State Income Tax</td>
                  <td className="p-3 font-medium text-amber-700">70% – 75% of balance</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">401(k) Participant Loan</td>
                  <td className="p-3 font-bold text-emerald-600">0% Penalty</td>
                  <td className="p-3 font-bold text-emerald-600">0% Tax (Loan proceeds)</td>
                  <td className="p-3 font-bold text-emerald-600">100% (Repaid with interest to self)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-emerald-600">Qualified Retirement (59½+)</td>
                  <td className="p-3 font-bold text-emerald-600">0% Penalty</td>
                  <td className="p-3">Ordinary Income Tax (Traditional)</td>
                  <td className="p-3 font-bold text-emerald-600">100% Tax-Free if Roth 401(k)</td>
                </tr>
              </tbody>
            </table>
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
