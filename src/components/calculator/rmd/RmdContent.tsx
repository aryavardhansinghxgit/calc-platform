"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Clock,
  Landmark,
  Percent,
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
} from "lucide-react";

export function RmdContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "What is a Required Minimum Distribution (RMD)?",
      a: "A Required Minimum Distribution (RMD) is the mandatory minimum amount of money that the Internal Revenue Service (IRS) requires account holders to withdraw each year from tax-deferred retirement plans once they reach a specified starting age. Because traditional IRAs and 401(k) accounts grow tax-deferred without income taxation during your working years, the government mandates RMDs to ensure tax revenues are eventually collected on those contributions and investment gains as ordinary income.",
    },
    {
      q: "At what age must I start taking RMDs under SECURE Act 2.0?",
      a: "The SECURE Act 2.0 introduced a phased increase in the RMD starting age. If you reached age 72 in 2022 or earlier, your RMD age remained 70½ or 72. If you turned 72 in 2023, your RMD starting age increased to 73 (born 1951 through 1959). If you were born in 1960 or later, your RMD starting age increases to 75, starting in calendar year 2033 (or 2035).",
    },
    {
      q: "When is the exact annual deadline to take my RMD?",
      a: "For every standard year, your annual RMD must be taken by December 31st. However, for your very FIRST RMD year, the IRS grants a grace period allowing you to delay your first withdrawal until April 1st of the calendar year FOLLOWING the year you turn age 73 (or 75). For all subsequent years, the withdrawal deadline is strictly December 31st.",
    },
    {
      q: "What happens if I delay my first RMD to April 1st?",
      a: "While delaying your initial RMD to April 1st of the following year delays taxes for a few months, it forces you to take TWO Required Minimum Distributions in a single tax year: your first RMD by April 1st and your second annual RMD by December 31st of that same year. Combining two distributions into one tax year can push you into a significantly higher federal and state income tax bracket and trigger higher Medicare IRMAA premiums.",
    },
    {
      q: "What retirement accounts are subject to IRS RMD rules?",
      a: "RMDs apply to almost all tax-deferred retirement accounts, including Traditional IRAs, SEP IRAs, SIMPLE IRAs, Rollover IRAs, employer 401(k) plans, 403(b) plans, 457(b) governmental plans, and profit-sharing plans. Roth IRAs during the owner's lifetime are completely exempt from RMDs. Under SECURE Act 2.0, designated Roth 401(k) and Roth 403(b) accounts are also exempt from lifetime RMDs starting in 2024.",
    },
    {
      q: "Can I aggregate my RMDs and take the total amount from a single account?",
      a: "It depends on the account type. You can calculate the RMD for each of your Traditional, SEP, and SIMPLE IRAs separately, sum them together, and take the total combined RMD amount from one or any combination of your IRAs. Similarly, 403(b) plan RMDs can be aggregated across 403(b) accounts. However, employer 401(k) plans CANNOT be aggregated—you must take the exact calculated RMD separately from each individual 401(k) account.",
    },
    {
      q: "What is the penalty for failing to take an RMD on time?",
      a: "Prior to 2023, the penalty for missing an RMD was a steep 50% excise tax on the undistributed amount. Under SECURE Act 2.0, the penalty has been reduced to 25%. Furthermore, if you correct the missed distribution within the IRS 'timely correction window' (generally within 2 years) and submit IRS Form 5329, the penalty is further reduced to just 10%.",
    },
    {
      q: "How can I request a waiver of the missed RMD penalty from the IRS?",
      a: "If you missed an RMD due to a reasonable error (such as severe illness, medical emergency, or brokerage error), you can request a penalty waiver. First, withdraw the full missed RMD amount immediately. Then, file IRS Form 5329 along with a detailed letter of explanation detailing the reasonable cause and the corrective actions taken. You do not pay the excise tax upfront when requesting a waiver under reasonable cause.",
    },
    {
      q: "What is a Qualified Charitable Distribution (QCD) and how does it lower RMD taxes?",
      a: "A Qualified Charitable Distribution (QCD) allows IRA owners who are age 70½ or older to transfer up to $105,000 per year directly from an IRA to an eligible 501(c)(3) public charity. The transferred amount counts directly toward satisfying your annual RMD requirement but is completely excluded from your Adjusted Gross Income (AGI). This prevents the distribution from boosting your taxable income, Medicare IRMAA surcharges, or Social Security taxability.",
    },
    {
      q: "How does the 10-Year Rule work for Inherited IRAs under the SECURE Act?",
      a: "For beneficiaries who inherit an IRA or 401(k) after December 31, 2019, the SECURE Act eliminated the traditional 'stretch IRA' for most non-spouse beneficiaries. Non-spouse beneficiaries (designated beneficiaries) must completely empty the inherited account by December 31st of the 10th year following the original account owner's death. If the owner died after their required beginning date, the beneficiary must also take annual RMDs during years 1 through 9 based on their single life expectancy.",
    },
    {
      q: "Who is exempt from the Inherited IRA 10-Year Rule?",
      a: "The SECURE Act defines five categories of 'Eligible Designated Beneficiaries' (EDBs) who can still stretch distributions over their single life expectancy rather than adhering to the 10-year deadline: 1) Surviving spouses, 2) Minor children of the deceased account owner (until reaching age 21), 3) Disabled individuals, 4) Chronically ill individuals, and 5) Beneficiaries not more than 10 years younger than the deceased owner.",
    },
    {
      q: "How are RMDs calculated if my spouse is more than 10 years younger than me?",
      a: "Normally, RMDs are calculated using IRS Table III (Uniform Lifetime Table). However, if your spouse is your SOLE primary beneficiary for the entire tax year AND is more than 10 years younger than you, you are permitted to use IRS Table II (Joint Life and Last Survivor Expectancy Table). Table II provides a longer combined life expectancy factor, which results in a lower required annual RMD amount and keeps more funds growing tax-deferred.",
    },
    {
      q: "Can I delay taking RMDs from a 401(k) if I am still actively working?",
      a: "Yes, under the 'still-working exception', if you continue working past your RMD age for an employer (and you do NOT own 5% or more of the business sponsoring the plan), you can delay taking RMDs from that current employer's 401(k) or 403(b) plan until April 1st of the year after you officially retire. Note that this exception applies only to your current employer's active plan—it does NOT apply to IRAs or 401(k) plans from prior employers.",
    },
    {
      q: "How can pre-RMD Roth conversions prevent the 'RMD Tax Torpedo'?",
      a: "The 'RMD Tax Torpedo' occurs when large required distributions spike your taxable income in your mid-70s, triggering higher income tax brackets, taxation of Social Security benefits, and Medicare IRMAA surcharges. By executing strategic, systematic partial Roth conversions between retirement (e.g., age 60-72) and your RMD starting age, you convert tax-deferred funds to tax-free Roth status at lower current tax rates, thereby shrinking your traditional IRA balance and reducing future mandatory RMDs.",
    },
    {
      q: "Are state income taxes levied on RMD withdrawals?",
      a: "Yes, in most US states, RMD withdrawals are taxed as ordinary state income alongside federal taxes. However, states with no state income tax (such as Florida, Texas, Nevada, Washington, Wyoming, Alaska, South Dakota, and Tennessee) do not tax RMDs. Certain states also offer retirement income exemptions or exclusions for pension and IRA income up to specific dollar thresholds for seniors aged 62 or 65+.",
    },
  ];

  return (
    <div className="mt-12 space-y-12  dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Overview Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive IRS Publication 590-B Guide
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
          Understanding Required Minimum Distributions (RMDs) &amp; IRS Rules
        </h2>
        <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl">
          The Required Minimum Distribution (RMD) is one of the most critical retirement tax mandates established by the Internal Revenue Service (IRS). Once you reach your mandated starting age under federal law, you are legally required to withdraw a calculated minimum amount from your tax-deferred retirement accounts each calendar year. This guide breaks down the SECURE Act 2.0 modifications, calculation formulas, tax minimization strategies, and penalty protection rules.
        </p>
      </section>

      {/* Grid of Core Concepts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <Clock className="h-5 w-5" /> SECURE Act 2.0 Ages
          </div>
          <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
            SECURE Act 2.0 increased the RMD age from 72 to <strong>73</strong> for individuals turning 72 between 2023 and 2032 (born 1951–1959). For those born in 1960 or later, the RMD starting age advances to <strong>75</strong> starting in 2033.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <Sparkles className="h-5 w-5" /> QCD Tax Elimination
          </div>
          <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
            Starting at age 70½, you can make a Qualified Charitable Distribution (QCD) up to $105,000 annually directly from your IRA to a qualifying charity. QCDs satisfy your RMD requirement without adding a single dollar to your Adjusted Gross Income (AGI).
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 shadow-sm space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm">
            <AlertTriangle className="h-5 w-5" /> Reduced Penalty Rates
          </div>
          <p className="text-xs text-slate-900 dark:text-slate-100 leading-relaxed">
            Missing an RMD deadline triggers an IRS excise penalty. SECURE 2.0 reduced the penalty from 50% down to <strong>25%</strong>, and further down to <strong>10%</strong> if the shortfall is corrected within the 2-year IRS correction window via Form 5329.
          </p>
        </div>
      </div>

      {/* Deep-Dive Section 1: Calculation Formula & IRS Life Expectancy Tables */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">How RMDs Are Calculated: Mathematical Formulas &amp; IRS Tables
        </h3>
        <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
          Calculating your annual RMD requires two primary numbers: your account balance as of December 31st of the previous calendar year, and your life expectancy distribution factor from IRS Publication 590-B.
        </p>

        <div className="bg-blue-50/70 dark:bg-blue-50/30 border border-indigo-200 dark:border-indigo-800 p-5 rounded-xl text-xs space-y-3 font-sans tabular-nums">
          <div className="text-indigo-900 dark:text-indigo-200 font-bold text-sm font-sans">
            Primary RMD Equation:
          </div>
          <div className="text-base text-blue-600 dark:text-blue-400 font-extrabold">
            Annual RMD = Account Balance (Dec 31 Prior Year) / IRS Life Expectancy Factor
          </div>
          <div className="text-slate-900 dark:text-slate-100 font-sans text-xs">
            Example: If your Traditional IRA balance on Dec 31, 2025 was $300,000 and you turn 75 in 2026, your IRS Table III factor is 24.6.
            <br />
            <span className="font-sans tabular-nums font-bold text-blue-600 dark:text-blue-400">
              RMD = $300,000 / 24.6 = $12,195.12
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">1. IRS Table III (Uniform Lifetime Table)</h4>
            <p className="text-slate-900 dark:text-slate-100">
              Used by almost all account owners, including unmarried individuals, married individuals whose spouses are not sole beneficiaries, or married individuals whose spouses are not more than 10 years younger. It assumes a joint life expectancy with a hypothetical beneficiary 10 years younger.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-zinc-900 dark:text-zinc-100 text-sm">2. IRS Table II (Joint Life and Last Survivor)</h4>
            <p className="text-slate-900 dark:text-slate-100">
              Used exclusively when your spouse is the SOLE primary beneficiary of your account for the entire tax year AND is more than 10 years younger than you. Table II accounts for both real ages, resulting in a higher distribution period factor and smaller required annual withdrawals.
            </p>
          </div>
        </div>
      </section>

      {/* Deep-Dive Section 2: Account Rules & Aggregation Matrix */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Account Types &amp; IRS Aggregation Rules
        </h3>
        <p className="text-sm text-slate-900 dark:text-slate-100 leading-relaxed">
          Not all tax-advantaged retirement accounts follow identical RMD rules. Understanding which accounts allow aggregation can prevent costly IRS compliance errors.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
            <thead>
              <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold">
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Account Category</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Subject to RMD?</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">Aggregation Allowed?</th>
                <th className="p-3 border border-zinc-200 dark:border-zinc-700">IRS Rule &amp; Notes</th>
              </tr>
            </thead>
            <tbody className=" dark:divide-zinc-800 text-slate-900 dark:text-slate-100">
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Traditional IRA / SEP / SIMPLE</td>
                <td className="p-3 text-blue-600 font-bold border">YES</td>
                <td className="p-3 text-blue-600 font-bold border">YES (IRA Pool)</td>
                <td className="p-3 border">Calculate RMD per account, sum total, and withdraw from any single IRA or combination.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Employer 401(k) / Profit-Sharing</td>
                <td className="p-3 text-blue-600 font-bold border">YES</td>
                <td className="p-3 text-blue-600 font-bold border">NO</td>
                <td className="p-3 border">Must calculate and withdraw the exact RMD separately from each employer 401(k) plan.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">403(b) Tax-Sheltered Annuities</td>
                <td className="p-3 text-blue-600 font-bold border">YES</td>
                <td className="p-3 text-blue-600 font-bold border">YES (403b Pool)</td>
                <td className="p-3 border">Can aggregate RMDs across multiple 403(b) plans, but cannot aggregate with IRAs or 401(k)s.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Roth IRA (Lifetime Owner)</td>
                <td className="p-3 text-blue-600 font-bold border">NO (EXEMPT)</td>
                <td className="p-3 border">N/A</td>
                <td className="p-3 border">Roth IRAs have no lifetime RMDs for the original account holder.</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-zinc-900 dark:text-zinc-100 border">Designated Roth 401(k) / 403(b)</td>
                <td className="p-3 text-blue-600 font-bold border">NO (Starting 2024)</td>
                <td className="p-3 border">N/A</td>
                <td className="p-3 border">SECURE Act 2.0 eliminated lifetime RMDs for designated Roth 401(k)s effective 2024.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Deep-Dive Section 3: Tax Minimization Strategies */}
      <section className="space-y-4">
        <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Proven Strategies to Reduce or Eliminate RMD Taxes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl space-y-3">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">1. Qualified Charitable Distributions (QCDs)
            </h4>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              If you donate to charities and are age 70½ or older, direct your IRA custodian to issue payments directly to eligible 501(c)(3) organizations. Up to $105,000 per year per individual can be transferred tax-free. Because QCDs bypass AGI, they protect you from higher Medicare Part B and D IRMAA surcharges and lessen taxability on Social Security benefits.
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl space-y-3">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">2. Pre-RMD Partial Roth Conversions
            </h4>
            <p className="text-slate-900 dark:text-slate-100 leading-relaxed">
              Between retirement (e.g. age 60–65) and your RMD starting age (73/75), you may be in a temporary lower income tax bracket. Executing annual partial Roth conversions fills lower marginal brackets (e.g. 12% or 22%), systematically reducing your pre-tax IRA balance and permanently lowering future mandatory RMD withdrawals.
            </p>
          </div>
        </div>
      </section>

      {/* 15+ FAQ Accordion Section */}
      <section className="space-y-6  dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions (15 Key RMD &amp; Tax Insights)
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-900 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed  dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
