"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Heart, Scale, Calculator, BookOpen, AlertCircle, FileText, CheckCircle2, TrendingUp, HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";

export function MarriageTaxContent() {
  // All 12 FAQs open by default for rich user visibility & search scanning
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const faqs = [
    {
      q: "1. Does getting married automatically lower our federal income taxes?",
      a: "No. Getting married only lowers your taxes if there is significant income disparity between spouses (e.g., an 80/20 or 100/0 income split). If both spouses earn similar, equal incomes, their combined taxes will generally remain identical or increase due to statutory deduction caps (like the $10,000 SALT limit) and compressed surtax thresholds."
    },
    {
      q: "2. When does a couple receive a Marriage Tax Bonus?",
      a: "A marriage bonus occurs when one spouse earns the majority of the household income while the other earns little or nothing. Filing Married Filing Jointly (MFJ) allows the primary earner's wages to fill the lower-earning spouse's unused lower tax brackets, effectively shifting higher-bracket income into the 10%, 12%, and 22% brackets."
    },
    {
      q: "3. When does a couple experience a Marriage Tax Penalty?",
      a: "A marriage penalty occurs primarily when dual high-earning spouses marry. Because statutory deduction caps (like the $10,000 SALT limit) and surtax thresholds ($250,000 for NIIT and Medicare surtax vs. $200,000 for singles) are not fully doubled for married couples, their joint tax bill exceeds what they would have paid as two unmarried single filers."
    },
    {
      q: "4. What is the $10,000 SALT cap marriage trap?",
      a: "Under the Tax Cuts and Jobs Act (TCJA), two unmarried single filers can deduct up to $10,000 each in State and Local Taxes ($20,000 combined). However, when married filing jointly, the IRS restricts the couple to a single $10,000 total deduction, directly eliminating up to $10,000 in itemized deductions for homeowners and high-tax state residents."
    },
    {
      q: "5. Can married couples choose to file as Single on their tax returns?",
      a: "No. Under IRS marital status rules, if you are legally married on December 31 of the tax year, you are considered married for the entire tax year. You can only choose between Married Filing Jointly (MFJ) or Married Filing Separately (MFS); you cannot legally file as Single."
    },
    {
      q: "6. How do children and the Child Tax Credit (CTC) affect the marriage calculation?",
      a: "The Child Tax Credit provides up to $2,000 per qualifying child. The phaseout begins at $200,000 Modified AGI for single filers and $400,000 for married couples. Because the married threshold is exactly double the single threshold, the CTC does not generate a marriage penalty for most families."
    },
    {
      q: "7. Why do dual high-earning couples face Net Investment Income Tax (NIIT) penalties?",
      a: "The 3.8% Net Investment Income Tax applies to investment income exceeding $200,000 for single individuals ($400,000 for two singles combined). For married couples filing jointly, however, the statutory threshold is compressed to $250,000. This $150,000 gap subjects substantial investment returns and capital gains to surtaxes."
    },
    {
      q: "8. What are the disadvantages of filing Married Filing Separately (MFS)?",
      a: "Filing separately generally results in higher taxes because the tax code penalizes separate returns: it completely disallows the student loan interest deduction, education tax credits, and the Child & Dependent Care Credit. It also forces both spouses to use the same deduction method (both itemize or both use standard)."
    },
    {
      q: "9. How does student loan interest deduction change after marriage?",
      a: "The student loan interest deduction allows up to $2,500 per tax return. Two singles can deduct up to $5,000 combined ($2,500 each). When married filing jointly, the cap remains $2,500 total, and joint phaseout thresholds may completely disqualify couples who would have qualified individually."
    },
    {
      q: "10. How can maximizing pre-tax 401(k) and HSA contributions eliminate a marriage penalty?",
      a: "Contributing the maximum allowable annual amounts to traditional 401(k) accounts ($23,000+ per spouse) and family HSAs ($8,300+) reduces your household Adjusted Gross Income (AGI). This lowers taxable income and can pull your household below the $250,000 surtax threshold."
    },
    {
      q: "11. How does the Earned Income Tax Credit (EITC) phase out for low-income married couples?",
      a: "The EITC has strict household income caps. When two low-to-moderate earning individuals marry, their combined income frequently pushes them over the EITC phaseout threshold, resulting in the loss of thousands of dollars in refundable tax credits."
    },
    {
      q: "12. How do state income taxes affect the marriage penalty?",
      a: "Many state income tax codes (e.g., California, New York, Maryland) have progressive brackets that do not double the bracket width for married couples, compounding the federal marriage penalty with additional state-level tax burdens."
    }
  ];

  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Heart className="w-4 h-4 text-rose-500" />
          <span>Foundational Tax Policy</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. Introduction to the Marriage Tax Penalty and Bonus
        </h2>
        <p>
          In the United States federal tax code, the <strong>Marriage Tax Penalty</strong> and <strong>Marriage Tax Bonus</strong> refer to the mathematical difference between the total income taxes a couple pays when filing together as <strong>Married Filing Jointly (MFJ)</strong> compared to the combined taxes they would pay if they were unmarried and filed as two <strong>Single</strong> individuals.
        </p>
        <p>
          The tax code is intentionally progressive, but designing a system that simultaneously achieves <em>progressivity</em>, <em>equal taxation of equal-income couples</em>, and <em>marriage neutrality</em> is mathematically impossible. As a result, the federal tax code creates significant financial winners and losers depending on how household earnings are split between spouses.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              The Marriage Bonus (Tax Savings)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Occurs when spouses have <strong>unequal incomes</strong> (e.g., one primary earner and one stay-at-home or part-time earner). Joint filing allows the higher earner&apos;s income to flow into the lower-earner&apos;s unused lower tax brackets, saving thousands in taxes annually.
            </p>
          </div>
          <div className="p-4 bg-rose-50/60 dark:bg-rose-950/20 rounded-xl border border-rose-200 dark:border-rose-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              The Marriage Penalty (Higher Tax Bill)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Occurs when both partners are <strong>dual high earners with similar salaries</strong>. Combining two high incomes triggers statutory deduction caps (like the $10,000 SALT limit) and surtax thresholds (such as the 3.8% NIIT and 0.9% Additional Medicare tax).
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL ARCHITECTURE */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Scale className="w-4 h-4" />
          <span>Filing Status Architecture</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. Mathematical Architecture: Single vs. MFJ vs. MFS
        </h2>
        <p>
          Under Internal Revenue Code (IRC) Title 26 § 1, tax brackets and standard deductions are structured differently across filing statuses:
        </p>
        <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-1">
          <li>
            <strong>Single Status (IRC § 1(c)):</strong> Applied to unmarried individuals. Each individual receives their own basic standard deduction ($15,000 in 2025/2026) and their own progressive rate brackets.
          </li>
          <li>
            <strong>Married Filing Jointly (IRC § 1(a)):</strong> For the 10%, 12%, 22%, 24%, and 32% brackets, the threshold is exactly double the single bracket width. However, the top 37% bracket is compressed ($751,600 MFJ vs. $626,350 × 2 = $1,252,700 for two singles).
          </li>
          <li>
            <strong>Married Filing Separately (IRC § 1(d)):</strong> Exactly half of the MFJ bracket widths, but subjects filers to severe statutory limitations and credit disqualifications.
          </li>
        </ul>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Calculator className="w-4 h-4" />
          <span>Mathematical Formulation</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Formula Section &amp; Variable Definitions
        </h2>
        <p>
          The marriage difference is calculated by evaluating three independent tax liabilities using identical pre-tax gross incomes and allowable deductions:
        </p>

        <div className="p-5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm space-y-3 shadow-inner">
          <div className="text-slate-400 font-sans text-xs uppercase tracking-wider border-b border-slate-700 pb-1">
            Mathematical Equations
          </div>
          <div>
            <span className="text-blue-400">Combined Single Tax</span> = Tax(Spouse1_Single) + Tax(Spouse2_Single)
          </div>
          <div>
            <span className="text-emerald-400">Joint MFJ Tax</span> = Tax(Spouse1_Income + Spouse2_Income, MFJ_Brackets)
          </div>
          <div>
            <span className="text-amber-400">Marriage Difference</span> = Joint MFJ Tax - Combined Single Tax
          </div>
          <div className="text-slate-300">
            • If Difference &lt; 0: <strong className="text-emerald-400">Marriage Bonus</strong> = |Difference|
          </div>
          <div className="text-slate-300">
            • If Difference &gt; 0: <strong className="text-rose-400">Marriage Penalty</strong> = Difference
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Variable</th>
                <th className="p-3">Calculation Component</th>
                <th className="p-3">Significance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-mono font-semibold text-blue-600 dark:text-blue-400">AGI (Adjusted Gross Income)</td>
                <td className="p-3">Gross Wages + SE Income + Capital Gains - Pre-Tax Deductions (401k, HSA, IRA).</td>
                <td className="p-3">Determines statutory phaseouts and surtax liability.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-emerald-600 dark:text-emerald-400">SALT Deduction</td>
                <td className="p-3">State income tax + local property taxes, capped at $10,000 per return ($10k MFJ vs $20k combined singles).</td>
                <td className="p-3">Primary driver of marriage penalty for homeowners in high-tax states.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-purple-600 dark:text-purple-400">NIIT Surtax (3.8%)</td>
                <td className="p-3">3.8% on net investment income exceeding $200k (Single) or $250k (MFJ).</td>
                <td className="p-3">Compresses $150k of investment income into federal surtaxes upon marriage.</td>
              </tr>
              <tr>
                <td className="p-3 font-mono font-semibold text-rose-600 dark:text-rose-400">Additional Medicare (0.9%)</td>
                <td className="p-3">0.9% payroll tax on earned wages exceeding $200k (Single) or $250k (MFJ).</td>
                <td className="p-3">Assesses extra FICA withholdings on dual-income couples.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Step-by-Step Procedure</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. How the Calculation Works (Execution Mechanics)
        </h2>
        <p>
          The calculator performs a rigorous multi-pass algorithmic evaluation across three distinct tax profiles:
        </p>

        <ol className="list-decimal list-inside space-y-3 pl-2 text-xs sm:text-sm">
          <li>
            <strong>Individual Single Simulations:</strong> Calculates Spouse 1&apos;s and Spouse 2&apos;s tax bills separately as unmarried single filers using Single standard deductions ($15,000 each) or individual itemized deductions (each with up to $10,000 SALT cap).
          </li>
          <li>
            <strong>Single FICA &amp; Surtax Computations:</strong> Computes Social Security (6.2% up to wage base), Medicare (1.45%), Additional Medicare (0.9% over $200k), and NIIT (3.8% over $200k) for each individual.
          </li>
          <li>
            <strong>Married Joint Simulation (MFJ):</strong> Combines all household income streams. Applies the joint standard deduction ($30,000) or joint itemized deductions (restricted to a single $10,000 total SALT cap).
          </li>
          <li>
            <strong>Joint Surtaxes &amp; Credits:</strong> Applies the 0.9% Medicare surtax and 3.8% NIIT against the compressed $250,000 joint threshold and computes Child Tax Credits against the $400,000 phaseout limit.
          </li>
          <li>
            <strong>Married Separate Simulation (MFS):</strong> Evaluates individual returns under MFS rules, enforcing mandatory deduction consistency and applying credit restrictions.
          </li>
          <li>
            <strong>Delta Analysis:</strong> Calculates the exact dollar difference between MFJ and Two Singles, pinpointing whether the household receives a marriage bonus or suffers a marriage penalty.
          </li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <FileText className="w-4 h-4" />
          <span>Detailed Worked Examples</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. Worked Examples: Step-by-Step Mathematical Solutions
        </h2>

        <div className="space-y-6">
          {/* Example 1 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center justify-between">
              <span>Scenario 1: Unequal Incomes ($150,000 vs. $0)</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-100 dark:bg-emerald-950/40 px-2 py-1 rounded-md">Large Marriage Bonus</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Spouse 1 earns $150,000 W-2 salary; Spouse 2 is a homemaker ($0 income). Both use standard deductions.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5">
              <div>• <strong>Spouse 1 as Single:</strong> Taxable Income = $150,000 - $15,000 = $135,000 → Federal Tax = <strong>$23,842</strong></div>
              <div>• <strong>Spouse 2 as Single:</strong> Taxable Income = $0 → Federal Tax = <strong>$0</strong></div>
              <div>• <strong>Combined Unmarried Tax:</strong> $23,842 + $0 = <strong>$23,842</strong></div>
              <div>• <strong>Married Filing Jointly:</strong> Taxable Income = $150,000 - $30,000 = $120,000 → Joint Federal Tax = <strong>$15,640</strong></div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                ★ Net Marriage Bonus: $23,842 - $15,640 = $8,202 / year in tax savings!
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center justify-between">
              <span>Scenario 2: Dual High Earners ($220,000 vs. $220,000) with High SALT</span>
              <span className="text-rose-600 dark:text-rose-400 font-bold text-xs bg-rose-100 dark:bg-rose-950/40 px-2 py-1 rounded-md">Marriage Penalty</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Both spouses earn $220,000 ($440,000 combined). Each pays $12,000 in state taxes and property taxes in a high-tax state.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5">
              <div>• <strong>As Two Singles:</strong> Each claims $10,000 SALT cap ($20,000 total deduction). Each pays $0 in 0.9% Medicare surtax (both &lt; $200k threshold).</div>
              <div>• <strong>Combined Unmarried Total Tax:</strong> <strong>$82,460</strong></div>
              <div>• <strong>Married Filing Jointly:</strong> SALT deduction is capped at only $10,000 (losing $10,000 deduction). Joint income of $440,000 exceeds the $250,000 threshold by $190,000, triggering $1,710 in Additional Medicare surtaxes.</div>
              <div>• <strong>Joint Federal Tax:</strong> <strong>$87,670</strong></div>
              <div className="text-rose-600 dark:text-rose-400 font-bold">
                ★ Net Marriage Penalty: $87,670 - $82,460 = $5,210 / year higher tax bill!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL BRACKET COMPARISON TABLE */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <TrendingUp className="w-4 h-4" />
          <span>Tax Bracket Matrix</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Visual Bracket Comparison: Single vs. Married Filing Jointly
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Rate</th>
                <th className="p-3">Single Filer Bracket</th>
                <th className="p-3">Two Singles Combined</th>
                <th className="p-3">Married Filing Jointly (MFJ)</th>
                <th className="p-3">Marriage Neutral?</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-2.5 font-bold">10%</td>
                <td className="p-2.5 font-mono">$0 – $11,925</td>
                <td className="p-2.5 font-mono">$0 – $23,850</td>
                <td className="p-2.5 font-mono">$0 – $23,850</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Exactly Doubled)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">12%</td>
                <td className="p-2.5 font-mono">$11,925 – $48,475</td>
                <td className="p-2.5 font-mono">$23,850 – $96,950</td>
                <td className="p-2.5 font-mono">$23,850 – $96,950</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Exactly Doubled)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">22%</td>
                <td className="p-2.5 font-mono">$48,475 – $103,350</td>
                <td className="p-2.5 font-mono">$96,950 – $206,700</td>
                <td className="p-2.5 font-mono">$96,950 – $206,700</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Exactly Doubled)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">24%</td>
                <td className="p-2.5 font-mono">$103,350 – $197,300</td>
                <td className="p-2.5 font-mono">$206,700 – $394,600</td>
                <td className="p-2.5 font-mono">$206,700 – $394,600</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Exactly Doubled)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">32%</td>
                <td className="p-2.5 font-mono">$197,300 – $250,525</td>
                <td className="p-2.5 font-mono">$394,600 – $501,050</td>
                <td className="p-2.5 font-mono">$394,600 – $501,050</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">Yes (Exactly Doubled)</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">35%</td>
                <td className="p-2.5 font-mono">$250,525 – $626,350</td>
                <td className="p-2.5 font-mono">$501,050 – $1,252,700</td>
                <td className="p-2.5 font-mono">$501,050 – $751,600</td>
                <td className="p-2.5 text-rose-600 dark:text-rose-400 font-semibold">No (Compressed at $751.6k)</td>
              </tr>
              <tr className="bg-rose-50/50 dark:bg-rose-950/20 font-bold">
                <td className="p-2.5 text-rose-600">37%</td>
                <td className="p-2.5 font-mono">Over $626,350</td>
                <td className="p-2.5 font-mono">Over $1,252,700</td>
                <td className="p-2.5 font-mono text-rose-600 dark:text-rose-400">Over $751,600</td>
                <td className="p-2.5 text-rose-600 dark:text-rose-400">Penalty Window of $501,100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. STRATEGIES TO MITIGATE PENALTY */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <ShieldCheck className="w-4 h-4" />
          <span>Tax Optimization</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Strategies to Eliminate or Mitigate the Marriage Penalty
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              1. Maximize Dual Pre-Tax 401(k) / 403(b) Accounts
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Both spouses contributing the maximum annual limit ($23,500+ each, plus $7,500 catch-up if age 50+) reduces household MAGI by up to $47,000–$62,000, bringing income below surtax triggers.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              2. Fully Fund Health Savings Accounts (HSA)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Enrolling in a high-deductible health plan allows family HSA contributions up to $8,550 pre-tax, reducing federal income taxes, state taxes, and FICA payroll withholdings.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              3. Charitable Donation Bunching (DAF)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Combine multiple years of planned charitable giving into a single calendar year through a Donor-Advised Fund to easily exceed the $30,000 standard deduction hurdle.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">
              4. Pass-Through Entity (PTE) State Tax Workaround
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Small business owners and partners can elect state Pass-Through Entity taxes, deducting state income taxes at the entity level to legally bypass the personal $10,000 SALT cap.
            </p>
          </div>
        </div>
      </section>

      {/* 8. INTERACTIVE FAQ SECTION */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <HelpCircle className="w-4 h-4 text-blue-500" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. Frequently Asked Questions (FAQ)
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          Click any question below to expand or collapse detailed guidance on the marriage tax penalty and bonus.
        </p>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-xs sm:text-sm gap-3"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. RELATED CALCULATORS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Related Tax Tools</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. Related Mathematical &amp; Financial Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/income-tax-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Income Tax Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Model individual federal and state income tax liabilities with full deductions.</p>
          </Link>

          <Link
            href="/calculators/salary-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Salary Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Convert between hourly, monthly, and annual gross paychecks.</p>
          </Link>

          <Link
            href="/calculators/estate-tax-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Estate Tax Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Evaluate spousal portability (DSUE) and lifetime wealth transfer exemptions.</p>
          </Link>
        </div>
      </section>

      {/* 10. EDUCATIONAL SUMMARY */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
          <CheckCircle2 className="w-4 h-4" />
          <span>Educational Recap</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. Educational Key Takeaways
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Income Disparity Creates Bonuses:</strong> Unequal-earner couples save thousands annually by shifting higher earnings into lower brackets.</li>
            <li><strong>Equal Earners Face Penalties:</strong> Dual high earners face penalties due to the $10,000 SALT cap and compressed $250,000 surtax limits.</li>
            <li><strong>MFS is Rarely Better:</strong> Married Filing Separately disallows student loan, child care, and education tax credits.</li>
            <li><strong>Pre-Tax Deductions Mitigate Penalties:</strong> Maxing out 401(k) and HSA contributions pulls household income below penalty thresholds.</li>
          </ul>
        </div>
      </section>

    </article>
  );
}

export default MarriageTaxContent;
