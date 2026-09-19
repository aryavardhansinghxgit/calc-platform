"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingDown,
  TrendingUp,
  DollarSign,
  PieChart as PieIcon,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Zap,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Target,
  Scale,
  Calculator,
  FileText,
  Clock,
  Layers,
  Award,
} from "lucide-react";

export const debtPayoffFaqs = [
  {
    question: "What is the mathematical difference between Debt Avalanche and Debt Snowball?",
    answer:
      "Debt Avalanche prioritizes debts by highest interest rate (APR) descending. This mathematically minimizes total interest charges and achieves debt freedom in the absolute shortest time. Debt Snowball prioritizes debts by lowest balance ascending. While it may cost slightly more in total interest, it produces rapid psychological milestones that help borrowers stay motivated.",
  },
  {
    question: "What is the payment rollover (snowball acceleration) effect?",
    answer:
      "When a debt is fully paid off, you keep your total monthly debt budget constant. The freed minimum payment from the eliminated account is rolled directly into the payment pool for the next target debt. This causes your principal repayment power to compound exponentially as each debt is cleared.",
  },
  {
    question: "Should I pay off high-interest debt or invest in the stock market first?",
    answer:
      "Paying off high-interest consumer debt (e.g., credit cards at 18%–29% APR) delivers a guaranteed, risk-free, tax-free return equal to the debt's APR. Because historical stock market returns average 8%–10% before taxes, eliminating high-interest debt should almost always precede non-matched investing.",
  },
  {
    question: "How does a Debt Consolidation Loan compare to Avalanche/Snowball payoff?",
    answer:
      "A debt consolidation loan combines multiple unsecured balances into a single new loan with a fixed repayment term and lower APR (e.g., 7%–12% vs. 20%+ credit cards). It simplifies payments into a single monthly installment and locks in fixed interest savings, provided you avoid accumulating new charges on the cleared cards.",
  },
  {
    question: "How do Debt Management Plans (DMPs) work?",
    answer:
      "Offered by accredited non-profit credit counseling agencies (NFCC/FCAA), a DMP consolidates payments into a single monthly disbursement while the agency negotiates reduced interest rates (often 0%–8%) and waived fees with credit card issuers.",
  },
  {
    question: "What are the risks of Debt Settlement?",
    answer:
      "Debt settlement involves intentionally stopping payments to negotiate paying a lump sum (often 45%–55% of balance). Severe risks include steep credit score drops (100–150+ points), aggressive collection actions, potential creditor lawsuits, and federal income tax liability on forgiven debt exceeding $600.",
  },
  {
    question: "How does paying off debt improve my credit score?",
    answer:
      "Paying down revolving balances reduces your credit utilization ratio (which accounts for 30% of your FICO score). Reducing overall credit utilization below 10%–30% typically triggers rapid credit score increases of 40 to 100+ points.",
  },
  {
    question: "Should I keep an emergency fund while aggressively paying down debt?",
    answer:
      "Yes. Financial advisors recommend maintaining a starter emergency fund of $1,000 to $2,500 (or one month of essential expenses) in a high-yield savings account to prevent unexpected expenses from forcing you into new high-interest credit card debt.",
  },
  {
    question: "Can annual lump-sum payments accelerate my debt-free date?",
    answer:
      "Yes. Directing tax refunds, annual work bonuses, or inheritance windfalls directly toward high-APR principal balances eliminates future compounding interest immediately, cutting months or years off your repayment timeline.",
  },
  {
    question: "What is a Hybrid Debt Payoff Strategy?",
    answer:
      "A hybrid strategy clears one or two small balances first using the Snowball method to build psychological momentum and simplify monthly cash flow, and then switches to the Avalanche method to maximize mathematical interest savings across larger remaining balances.",
  },
  {
    question: "What happens if my monthly payment is less than monthly accrued interest?",
    answer:
      "If your monthly payment fails to cover accrued interest, your balance experiences negative amortization and grows larger over time. You must increase your monthly payment, negotiate hardship terms with creditors, or explore consolidation relief immediately.",
  },
  {
    question: "How does my Debt-to-Income (DTI) ratio affect mortgage and auto loan approvals?",
    answer:
      "Your back-end DTI ratio is the percentage of gross monthly income required to service all debt payments. Mortgage lenders typically enforce a maximum DTI cap of 36% to 43%. Eliminating consumer debt lowers your DTI and dramatically expands your borrowing power.",
  },
];

export function DebtPayoffContent() {
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(new Set([0, 1]));

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

  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
      
      {/* 1. INTRODUCTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <TrendingDown className="w-4 h-4" />
          <span>Debt Elimination Masterclass</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. Introduction: The Mathematics of Accelerated Debt Freedom
        </h2>
        <p>
          Carrying multiple debts across credit cards, auto loans, personal loans, and student debt creates significant interest drag on household wealth. When borrowers pay only the minimum required payments across all accounts, credit card balances can take <strong>20 to 30 years</strong> to extinguish, with cumulative interest charges often exceeding the original principal borrowed.
        </p>
        <p>
          Achieving accelerated debt freedom requires structured algorithmic repayment strategies. By establishing a fixed total monthly debt budget and channeling all discretionary surplus cash into a single targeted account—while systematically rolling over freed minimum payments as each balance hits zero—borrowers can cut years off their repayment horizon and save thousands of dollars in compounding interest charges.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              Debt Avalanche (Mathematical Optimum)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Orders debts by <strong>highest APR first</strong>. Eliminates the most expensive interest drain first, guaranteeing the absolute lowest lifetime interest paid and fastest mathematical debt-free date.
            </p>
          </div>
          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Debt Snowball (Behavioral Optimum)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Orders debts by <strong>lowest balance first</strong>. Produces rapid psychological victories as small balances reach zero, building emotional momentum to maintain long-term discipline.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPTS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Scale className="w-4 h-4" />
          <span>Underlying Financial Mechanics</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. Mathematical Foundations: Multi-Debt Amortization &amp; Rollover Pooling
        </h2>
        <p>
          In a multi-debt portfolio with <em>K</em> active credit accounts, each account <em>k</em> has an outstanding balance $B_k(t)$, an annual interest rate $r_k$, and a contractual minimum payment $M_k(t)$.
        </p>
        <p>
          In each monthly billing period, monthly periodic interest accrues on every unpaid balance:
        </p>

        <div className="p-5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm space-y-3 shadow-inner">
          <div className="text-slate-400 font-sans text-xs uppercase tracking-wider border-b border-slate-700 pb-1">
            Monthly Debt Interest &amp; Principal Reduction Equations
          </div>
          <div>
            <span className="text-rose-400">Periodic Interest Charge (I_k)</span> = B_k(t) × (r_k / 12)
          </div>
          <div>
            <span className="text-blue-400">Principal Reduction (ΔB_k)</span> = Payment_k(t) - I_k
          </div>
          <div className="text-slate-300 text-xs font-sans">
            Where: If Payment_k &le; I_k, the balance experiences negative amortization and expands infinitely.
          </div>
        </div>

        <p>
          The true engine of accelerated debt elimination is <strong>Rollover Reallocation</strong>. When debt <em>j</em> is eliminated ($B_j = 0$), its minimum payment $M_j$ does not disappear from your budget; it rolls directly into the available surplus cash pool targeting debt $j+1$:
        </p>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400">
          Rollover Pool R(t) = Extra Monthly Budget + &sum; [ M_j of all paid-off accounts ]
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Calculator className="w-4 h-4" />
          <span>Formulas &amp; Prioritization Rules</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Repayment Strategy Algorithms &amp; Interest Savings
        </h2>
        <p>
          Both primary acceleration methods maintain contractual minimum payments across all active accounts while directing 100% of the rollover pool $R(t)$ to the top-priority debt:
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              1. Debt Avalanche Algorithm (Greedy APR Sort)
            </h3>
            <div className="font-mono text-xs text-blue-600 dark:text-blue-400">
              Priority Order = Sort Debts by APR (r_k) Descending: max(r_1, r_2, ..., r_K)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Targets the most damaging compounding interest first. Minimizes total lifetime interest paid.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              2. Debt Snowball Algorithm (Ascending Balance Sort)
            </h3>
            <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
              Priority Order = Sort Debts by Current Balance (B_k) Ascending: min(B_1, B_2, ..., B_K)
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Eliminates the smallest balance first regardless of interest rate. Maximizes velocity of account closures.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              3. Lifetime Interest Savings Equation
            </h3>
            <div className="font-mono text-xs text-amber-600 dark:text-amber-400">
              Net Savings (&Delta;I) = Total Interest (Minimums Only) - Total Interest (Accelerated Strategy)
            </div>
          </div>
        </div>
      </section>

      {/* 4. STEP BY STEP PROCEDURE */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Step-by-Step Procedure</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. How the Multi-Debt Payoff Calculation Works (Execution Loop)
        </h2>
        <ol className="list-decimal list-inside space-y-3 pl-2 text-xs sm:text-sm">
          <li>
            <strong>Inventory All Liabilities:</strong> Compile every credit card, auto loan, personal loan, and medical balance with exact current balance ($B_k$), interest rate ($r_k$), and minimum monthly payment ($M_k$).
          </li>
          <li>
            <strong>Establish Total Monthly Debt Budget:</strong> Sum all minimum required payments plus any discretionary surplus cash ($Extra$), establishing your fixed monthly commitment: $TotalBudget = \sum M_k + Extra$.
          </li>
          <li>
            <strong>Apply Prioritization Sorting:</strong> Rank debts based on your chosen strategy (APR descending for Avalanche, Balance ascending for Snowball).
          </li>
          <li>
            <strong>Execute Monthly Payment Distribution:</strong> In month $t$, assign contractual minimums to lower-ranked accounts. Assign all remaining budget cash (minimum + extra + accumulated rollover) to the #1 priority target account.
          </li>
          <li>
            <strong>Trigger Account Payoff Rollover:</strong> When the target debt reaches $0, celebrate the milestone and immediately roll its entire previous payment into the surplus cash pool targeting the next account in line.
          </li>
          <li>
            <strong>Iterate Until Zero Debt:</strong> Continue the rollover loop month by month until all accounts reach zero balance, recording total interest paid and your exact debt-free date.
          </li>
        </ol>
      </section>

      {/* 5. WORKED EXAMPLES */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <FileText className="w-4 h-4" />
          <span>Detailed Numerical Demonstrations</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. Worked Examples: Step-by-Step Portfolio Payoff Solutions
        </h2>

        <div className="space-y-6">
          {/* Example 1 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center justify-between">
              <span>Example 1: 4-Debt Household Portfolio ($284,000 Total Debt with $100 Extra/Month)</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xs bg-blue-100 dark:bg-blue-950/40 px-2 py-1 rounded-md">Avalanche vs. Snowball</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Debts: Credit Card 1 ($6,000 @ 18.99%, min $150), Credit Card 2 ($3,000 @ 16.99%, min $60), Auto Loan ($25,000 @ 4.90%, min $519), Mortgage ($250,000 @ 4.00%, min $1,800). Total Minimums = $2,529/mo + $100 extra = $2,629/mo.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5">
              <div>• <strong>Debt Avalanche Order:</strong> CC #1 (18.99%) &rarr; CC #2 (16.99%) &rarr; Auto Loan (4.90%) &rarr; Mortgage (4.00%).</div>
              <div>&nbsp;&nbsp;CC #1 paid off in Month 25. Rollover pool grows from $100 to $250. CC #2 paid in Month 34. Total Interest = <strong>$146,820</strong>.</div>
              <div>• <strong>Debt Snowball Order:</strong> CC #2 ($3k) &rarr; CC #1 ($6k) &rarr; Auto Loan ($25k) &rarr; Mortgage ($250k).</div>
              <div>&nbsp;&nbsp;CC #2 cleared in Month 19 (quick psychological win!). CC #1 paid in Month 35. Total Interest = <strong>$147,410</strong>.</div>
              <div className="text-blue-600 dark:text-blue-400 font-bold">
                ★ Comparison: Avalanche saves $590 more in interest; Snowball delivers the first zero-balance victory 6 months faster!
              </div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center justify-between">
              <span>Example 2: Impact of a $3,000 One-Time Tax Refund Windfall</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-100 dark:bg-emerald-950/40 px-2 py-1 rounded-md">Lump-Sum Power</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Applying a single $3,000 tax refund in Month 4 directly to Credit Card #1 (18.99% APR).
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5">
              <div>• Immediately reduces Credit Card #1 principal by $3,000.</div>
              <div>• Eliminates $570/year in ongoing compounding interest charges.</div>
              <div>• Accelerates CC #1 payoff date by 14 months and triggers the $150 rollover pool more than a year early!</div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                ★ Total Portfolio Interest Saved from one $3,000 windfall: Over $1,850 in lifetime savings!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DECISION MATRIX & RELIEF COMPARISON */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <TrendingUp className="w-4 h-4" />
          <span>Strategy Decision Matrix</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Visual Strategy Matrix: Comparing Debt Relief Pathways
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Debt Strategy</th>
                <th className="p-3">Primary Mechanism</th>
                <th className="p-3">Credit Score Impact</th>
                <th className="p-3">Best Suited For</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-2.5 font-bold text-blue-600 dark:text-blue-400">Debt Avalanche</td>
                <td className="p-2.5">Sort by highest APR first; roll over freed minimums.</td>
                <td className="p-2.5 font-semibold text-emerald-600">Highly Positive (+40 to +100 pts)</td>
                <td className="p-2.5">Analytical borrowers seeking maximum mathematical savings.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-emerald-600 dark:text-emerald-400">Debt Snowball</td>
                <td className="p-2.5">Sort by lowest balance first; roll over freed minimums.</td>
                <td className="p-2.5 font-semibold text-emerald-600">Highly Positive (+40 to +100 pts)</td>
                <td className="p-2.5">Borrowers needing quick emotional wins to stay disciplined.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-indigo-600 dark:text-indigo-400">Consolidation Loan</td>
                <td className="p-2.5">Refinances multiple cards into 1 fixed-rate loan (7%–12%).</td>
                <td className="p-2.5 font-semibold text-blue-600">Positive (clears revolving debt)</td>
                <td className="p-2.5">Borrowers with good credit (660+) wanting a single payment.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-amber-600 dark:text-amber-400">Non-Profit DMP</td>
                <td className="p-2.5">Credit counselor negotiates 0%–8% APR with card issuers.</td>
                <td className="p-2.5 font-semibold text-amber-600">Mild Temporary Drop</td>
                <td className="p-2.5">Overwhelmed borrowers with high card debt and poor credit.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-rose-600 dark:text-rose-400">Debt Settlement</td>
                <td className="p-2.5">Negotiates paying 45%–55% lump-sum settlement.</td>
                <td className="p-2.5 font-semibold text-rose-600">Severe Drop (-100 to -150 pts)</td>
                <td className="p-2.5">Severe insolvency; forgiven debt is taxable to the IRS.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-rose-700 dark:text-rose-500">Chapter 7 Bankruptcy</td>
                <td className="p-2.5">Court-ordered liquidation of eligible unsecured debts in 3–6 mos.</td>
                <td className="p-2.5 font-semibold text-rose-700">Maximum Damage (10 yrs on report)</td>
                <td className="p-2.5">Extreme financial hardship with no viable repayment path.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON PITFALLS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-semibold text-xs tracking-wider uppercase">
          <AlertTriangle className="w-4 h-4" />
          <span>Strategic Pitfalls &amp; Rules</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Critical Pitfalls to Avoid on Your Debt-Free Journey
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-amber-600 font-extrabold">✕</span>
              The &ldquo;Minimum-Only&rdquo; Repayment Trap
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Credit card minimums are structured as 1% to 2% of the principal plus monthly interest. Paying only minimums extends repayment over 20 to 30 years and results in paying 200% to 300% of the original purchase in pure finance charges.
            </p>
          </div>

          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-amber-600 font-extrabold">✕</span>
              Closing Credit Cards Immediately After Payoff
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Closing a cleared credit card account destroys that credit line from your total available limit and shortens your average account age, causing your credit utilization ratio to spike and your credit score to drop. Keep zero-balance cards open with occasional small auto-paid charges.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-emerald-600 font-extrabold">✓</span>
              Maintain a Starter Emergency Fund ($1,000–$2,500)
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Never deplete your checking account to $0 while paying debt. A small cash buffer prevents minor emergencies (car repairs, medical copays) from forcing you back into high-APR credit card borrowing.
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
          Click any question below to expand or collapse detailed guidance on debt payoff strategies, interest optimization, and relief methods.
        </p>

        <div className="space-y-3 pt-2">
          {debtPayoffFaqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-900 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 text-xs sm:text-sm gap-3 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/60 dark:border-slate-700/60 bg-white dark:bg-slate-900">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 9. RELATED FINANCIAL CALCULATORS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Related Debt &amp; Credit Tools</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. Related Debt &amp; Financial Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/credit-card-payoff-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Credit Card Payoff Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Model individual credit card interest, payoff timelines, and balance transfers.</p>
          </Link>

          <Link
            href="/calculators/personal-loan-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Personal Loan Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Evaluate fixed-rate consolidation loans to refinance high-APR credit card balances.</p>
          </Link>

          <Link
            href="/calculators/dti-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Debt-to-Income (DTI) Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Measure front-end and back-end DTI ratios for mortgage and loan eligibility.</p>
          </Link>
        </div>
      </section>

      {/* 10. EDUCATIONAL SUMMARY */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold text-xs tracking-wider uppercase">
          <CheckCircle2 className="w-4 h-4" />
          <span>Educational Key Takeaways</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          10. Educational Key Takeaways
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs sm:text-sm">
          <ul className="list-disc list-inside space-y-1.5 text-slate-700 dark:text-slate-300">
            <li><strong>Rollover Reallocation is Key:</strong> Never reduce your monthly debt budget when an account reaches zero; roll 100% of freed payments into the next target.</li>
            <li><strong>Avalanche Minimizes Interest:</strong> Prioritizing highest APR balances first mathematically produces the lowest total interest cost.</li>
            <li><strong>Snowball Maximizes Motivation:</strong> Clearing small balances first generates psychological wins that prevent plan abandonment.</li>
            <li><strong>Protect Your Credit Score:</strong> Keep zero-balance credit cards open to maintain low credit utilization and long credit history.</li>
          </ul>
        </div>
      </section>

    </article>
  );
}

export default DebtPayoffContent;
