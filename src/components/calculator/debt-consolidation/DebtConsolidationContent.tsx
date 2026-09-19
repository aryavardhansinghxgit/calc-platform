"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  TrendingDown,
  ShieldCheck,
  Zap,
  Landmark,
  BarChart3,
  FileSpreadsheet,
  Percent,
  Layers,
  BookOpen,
  HelpCircle,
  ChevronDown,
  Sparkles,
} from "lucide-react";

export const debtConsolidationFaqs = [
  {
    question: "What is the mathematical difference between weighted APR and a simple average APR?",
    answer:
      "A simple average adds the interest rates together and divides by the count of debts, ignoring how much money is owed at each rate. Balance-weighted APR accounts for loan size: Weighted APR = Σ(Balance_i × APR_i) ÷ Σ(Balance_i). If you have a $20,000 balance at 24% and a $1,000 balance at 10%, a simple average is 17%, but the true balance-weighted APR is 23.33%, accurately reflecting your real interest expense.",
  },
  {
    question: "How does an upfront origination fee affect the Real Effective APR?",
    answer:
      "An origination fee (typically 1% to 8%) is either deducted from your disbursement or added onto the principal. This reduces the net proceeds you receive while you pay interest on the full gross amount. Solving for the internal rate of return (actuarial IRR) yields the Real Effective APR. For example, a 10.99% nominal loan with a 5% fee on a 5-year term yields an effective APR of approximately 15.45%.",
  },
  {
    question: "Can a debt consolidation loan lower my monthly payment but increase my total lifetime interest?",
    answer:
      "Yes. If you stretch a 2-year remaining multi-debt payoff into a new 5-year or 7-year consolidation loan, your monthly installment will drop due to the extended repayment term, but interest will compound for years longer. Always compare both the monthly payment difference and the total lifetime repayment cost before deciding.",
  },
  {
    question: "What is the Maximum Fee Threshold percentage and how is it calculated?",
    answer:
      "The Maximum Fee Threshold is the break-even origination fee percentage at which all projected interest savings from a lower interest rate are completely eliminated by the upfront fee. If the lender's origination fee exceeds this threshold percentage, consolidating will cost more overall than continuing your existing multi-debt repayment schedule.",
  },
  {
    question: "How does a 0% introductory balance transfer card compare to a fixed-rate consolidation loan?",
    answer:
      "A 0% balance transfer credit card offers zero interest for a promotional period (typically 12 to 21 months) in exchange for an upfront transfer fee (typically 3% to 5%). If you can afford the higher monthly payment required to fully pay off the balance before the promo period expires ((Balance + Fee) ÷ Promo Months), it is usually cheaper than a loan. If unpaid, remaining balances revert to high standard APRs.",
  },
  {
    question: "How does debt consolidation impact credit score and credit utilization?",
    answer:
      "Paying off revolving credit card balances with a fixed installment loan immediately drops your revolving credit utilization ratio, which can positively influence credit scores. However, opening a new loan creates a hard credit inquiry and lowers average account age. Keeping paid-off credit cards open with zero balances preserves available credit.",
  },
  {
    question: "What is the risk of 'double debt' after consolidating?",
    answer:
      "Double debt occurs when a borrower consolidates credit cards into a personal loan and then continues using the newly emptied cards for lifestyle purchases. This leaves the borrower responsible for both the monthly consolidation loan installment and new revolving card balances. Freezing card usage is critical during debt payoff.",
  },
  {
    question: "What is the difference between an unsecured consolidation loan and a secured HELOC/home equity loan?",
    answer:
      "An unsecured personal consolidation loan requires no collateral; your home or vehicle cannot be automatically seized if you default, though rates may be higher. A Home Equity Line of Credit (HELOC) or home equity loan uses your property as collateral to secure a lower interest rate, but defaulting puts your home at risk of foreclosure.",
  },
  {
    question: "How do extra principal prepayments accelerate consolidation loan payoff?",
    answer:
      "Consolidation installment loans calculate interest on the declining balance (Interest = Balance × (APR ÷ 12)). Making additional payments allocated directly to principal reduces the balance immediately, permanently reducing the interest calculated across all future months and shortening the payoff horizon.",
  },
  {
    question: "When is debt consolidation NOT recommended?",
    answer:
      "Debt consolidation is not recommended if: (1) The loan's effective APR (including fees) is higher than your current weighted APR, (2) You do not qualify for a lower interest rate, (3) The term is extended so long that total interest increases, or (4) The underlying spending habits that accumulated the debt have not been resolved.",
  },
];

export function DebtConsolidationContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-10 text-zinc-800 dark:text-zinc-200">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="h-3.5 w-3.5" /> Comprehensive Financial Guide
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Debt Consolidation Calculator: The Complete Mathematical &amp; Financial Guide
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            Compare your current debts with a consolidation loan, calculate weighted APR, real effective APR, monthly savings, total interest, fees, balance-transfer costs, and side-by-side payoff schedules.
          </p>
        </div>
      </div>

      {/* SECTION 1 */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-lg sm:text-xl border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Landmark className="h-6 w-6 shrink-0" />
          <h3>1. Debt Consolidation Calculator: Compare Your Current Debts With One New Loan</h3>
        </div>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            A debt consolidation calculator helps answer a much more important question than simply, &ldquo;What would my new monthly payment be?&rdquo; The real question is whether replacing several existing debts with one consolidation loan actually improves the overall financial position under the assumptions you enter. That requires comparing the current balances, interest rates, minimum payments, repayment timelines, and total cost of the existing debts against the proposed consolidation loan, including any origination fee or other upfront borrowing cost. In the production reference scenario, three existing debts total $24,000, with a combined monthly payment of $630 and a balance-weighted current APR of 18.89%. The proposed consolidation loan uses a 10.99% nominal APR, a 60-month term, and a 5% fee. The calculator models the resulting $25,200 funded loan, $547.78 monthly payment, 15.45% real effective APR, and $32,867 total consolidation cost. The current debt position is modeled at $36,963.17 total cost, producing $4,096.17 of net refinance savings under those assumptions.
          </p>
          <p>
            That example illustrates why debt consolidation should never be judged from the monthly payment alone. A lower payment can be useful for cash-flow management, but if a new loan stretches repayment over a much longer period, the borrower can sometimes pay more interest overall even while the monthly bill becomes easier to manage. A good <Link href="/calculators/loan-calculator" className="text-indigo-600 dark:text-indigo-400 underline font-semibold hover:text-indigo-700">Loan Calculator</Link> can help model the underlying installment payment, while the <Link href="/calculators/credit-card-payoff-calculator" className="text-indigo-600 dark:text-indigo-400 underline font-semibold hover:text-indigo-700">Credit Card Payoff Calculator</Link> can help examine what happens when revolving balances are attacked directly rather than refinanced. The purpose of a dedicated debt consolidation calculator is to place those calculations beside one another so the user can see both the cash-flow effect and the total-cost effect.
          </p>
          <p>
            The first major number to understand is total debt. In the reference case, $10,000 + $7,500 + $6,500 = $24,000. The second is the weighted APR. Because the debts have different balances and different APRs, the calculator does not simply average the three percentages. Instead, the rates are weighted according to the balances they apply to, producing an independently verified 18.89% current weighted APR. That distinction is important because a simple average would give an incomplete picture of the actual borrowing cost represented by the current debt mix.
          </p>
          <p>
            From there, the calculator compares the current debt schedules with the consolidation schedule. The result is not presented as an approval decision or a guarantee that consolidation is beneficial. It is a mathematical comparison based on the assumptions entered by the user.
          </p>
          <p>
            A strong debt consolidation calculator therefore does more than output one number. It explains how the current debt was constructed, how the proposed loan is priced, how fees affect the result, how the repayment schedule changes, and whether the modeled total cost goes up or down.
          </p>
        </div>
      </section>

      {/* SECTION 2 */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-lg sm:text-xl border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Percent className="h-6 w-6 shrink-0 text-blue-500" />
          <h3>2. How a Debt Consolidation Calculator Calculates Weighted APR and Current Debt Cost</h3>
        </div>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            The weighted APR is one of the most useful features of a serious debt consolidation calculator because people often have several debts with different rates. Suppose one credit card has a $10,000 balance at 17.99%, another has $7,500 at 19.99%, and a third has $6,500 at 18.99%. The calculator must account for the fact that the 19.99% rate applies to a smaller balance than the 17.99% rate. The correct weighted rate is found by multiplying each balance by its APR, summing those weighted amounts, and dividing by total balances. In the verified reference case, that calculation produces an unrounded weighted APR of approximately 18.8858%, which displays as 18.89%.
          </p>
          <p>
            However, weighted APR is only a summary statistic. It is not sufficient to calculate the actual lifetime cost of multiple debts. That is because each debt can have a different payment amount, different payoff period, and different amortization behavior. The production calculator therefore keeps the debts separate when determining the current repayment schedule. The reference scenario&apos;s combined minimum payment is $630 per month, and the current debt engine produces 59 months to payoff, $12,963.17 of total interest, and $36,963.17 of total cost.
          </p>
          <p>
            That distinction is essential for users who are tempted to take a weighted APR and multiply it by the number of years remaining. That shortcut can be misleading because credit cards and other revolving debts are not necessarily amortized like a new fixed installment loan. The actual production schedule must therefore be calculated from each balance, rate, and minimum-payment assumption.
          </p>
          <p>
            Once the current debt position has been calculated, the proposed consolidation loan can be evaluated independently. The new loan uses one principal, one interest rate, one term, and one fee structure. A separate schedule is then generated. This makes it possible to compare two genuinely different repayment structures instead of collapsing all existing debts into one artificial weighted-rate loan.
          </p>
        </div>
      </section>

      {/* SECTION 3 */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-lg sm:text-xl border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <TrendingDown className="h-6 w-6 shrink-0 text-emerald-500" />
          <h3>3. Real Effective APR: Why Fees Can Change the Economics of Consolidation</h3>
        </div>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            An advertised interest rate does not always represent the complete economic cost of borrowing. A debt consolidation loan can include an origination fee, points, or another upfront charge. If that fee is deducted from the amount actually received or financed into the loan, the effective cost of the borrowing can differ materially from the nominal APR displayed by the lender. That is why the calculator includes a dedicated Real Effective APR analysis rather than treating nominal APR and actual borrowing cost as the same thing. In the verified reference scenario, the nominal consolidation rate is 10.99%, the loan fee is 5%, and the effective APR calculates to 15.45%.
          </p>
          <p>
            The distinction becomes clearer with the actual numbers. The existing debts total $24,000. A 5% fee produces a $1,200 upfront fee, and the funded consolidation loan is therefore $25,200 under the calculator&apos;s configured convention. The resulting monthly payment is $547.78, and the schedule produces approximately $8,866.80 of underlying interest before display rounding, which is presented as $8,867.00. The total displayed consolidation cost is $32,867.00.
          </p>
          <p>
            A proper effective-APR calculation should be derived from the economic cash flows rather than approximated by simply adding the fee percentage to the interest rate. The maximum-fee threshold is an additional analytical feature: in the reference scenario, the maximum fee threshold is approximately 18.09%, illustrating the highest upfront fee before projected savings are erased.
          </p>
        </div>
      </section>

      {/* SECTION 4 */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-lg sm:text-xl border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <BarChart3 className="h-6 w-6 shrink-0 text-amber-500" />
          <h3>4. Debt Consolidation Savings: Monthly Payment vs Total Cost</h3>
        </div>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            One of the biggest mistakes people make when evaluating debt consolidation is treating a lower monthly payment as proof that the new loan is cheaper. A lower payment answers a cash-flow question, not a total-cost question. The production calculator separates those two ideas explicitly. In the reference scenario, the current debts require $630 per month, while the proposed consolidation loan requires $547.78. That produces a monthly difference of $82.22. At the same time, the current debt position is modeled at $36,963.17 total cost, while the consolidation loan is modeled at $32,867.00, resulting in $4,096.17 of net total savings.
          </p>
          <p>
            That is an example where both cash flow and total cost move in the same favorable direction. But that should not be assumed in every case. A longer consolidation term can reduce the monthly payment while increasing the total amount of interest paid over time.
          </p>
          <p>
            Users should therefore compare at least four numbers: current monthly payment, new monthly payment, current total cost, and new total cost. It is also useful to compare current and new payoff dates.
          </p>
        </div>
      </section>

      {/* SECTION 5 */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-lg sm:text-xl border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Zap className="h-6 w-6 shrink-0 text-amber-500" />
          <h3>5. 0% Balance Transfer vs Debt Consolidation Loan</h3>
        </div>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            A 0% introductory balance-transfer card can sometimes look dramatically cheaper than a consolidation loan because the promotional interest rate is zero. But the calculator correctly treats this as a separate repayment scenario rather than automatically assuming that 0% means free. In the reference example, the debt balance is $24,000 and the transfer fee is 3%, producing a $720 transfer fee. The promotional period is 18 months, so the required monthly payoff is $24,720 ÷ 18 = approximately $1,373.33. Total interest during the modeled promotional period is $0, and total cost is $24,720.
          </p>
          <p>
            That creates a very different cash-flow profile from the consolidation loan. The consolidation loan requires $547.78 per month, while the balance-transfer strategy requires approximately $1,373.33 per month to eliminate the entire balance during the 18-month introductory period. The transfer has the lower modeled total cost in the reference scenario, but the monthly payment requirement is much higher.
          </p>
        </div>
      </section>

      {/* SECTION 6 */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-lg sm:text-xl border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <FileSpreadsheet className="h-6 w-6 shrink-0 text-purple-500" />
          <h3>6. Amortization Comparison: See Where the Debt Actually Goes Each Month</h3>
        </div>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            A consolidation decision becomes much easier to understand when the user can see the debt balances declining over time. The calculator&apos;s amortization comparison provides a month-by-month view of the current debt plan versus the consolidation plan.
          </p>
          <p>
            The current debt side is itself a combined representation of multiple debts, while the consolidation side is a single amortizing loan. An amortization schedule is useful because total interest is an accumulated result, not a single event. Early in repayment, a larger portion of an installment payment is absorbed by interest. As principal declines, the interest portion falls and the principal portion rises.
          </p>
        </div>
      </section>

      {/* SECTION 7 */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-lg sm:text-xl border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <ShieldCheck className="h-6 w-6 shrink-0 text-emerald-500" />
          <h3>7. Debt Consolidation Options, Credit Considerations, and Financial Decision-Making</h3>
        </div>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            Debt consolidation is not a single financial product. Depending on the borrower&apos;s circumstances, consolidation can involve an unsecured personal loan, a balance-transfer card, a home-equity loan, a HELOC, or a structured debt-management arrangement.
          </p>
          <p>
            The security of the debt changes the risk profile. An unsecured personal loan does not use a particular asset as collateral, whereas a home-equity loan or HELOC is secured by property. Moving unsecured debt into a loan secured by a home creates risk of foreclosure if payments cannot be maintained.
          </p>
          <p>
            Credit utilization improves when revolving balances are paid off, but opening new loans creates inquiries. Post-consolidation behavior is paramount: closing high-interest credit card debt will not help long term if new revolving debt is accumulated on zeroed cards.
          </p>
        </div>
      </section>

      {/* SECTION 8 */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-lg sm:text-xl border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <Layers className="h-6 w-6 shrink-0 text-blue-500" />
          <h3>8. How to Use the Debt Consolidation Calculator, Common Mistakes, and Analysis</h3>
        </div>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            Start by entering every existing debt separately: balance, APR, and current payment. Then enter the proposed consolidation interest rate, term, and origination fee percentage.
          </p>
          <p>
            Avoid common mistakes:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-zinc-700 dark:text-zinc-300">
            <li><strong>Ignoring Fees:</strong> Comparing nominal APR rather than Real Effective APR.</li>
            <li><strong>Payment vs. Cost Confusion:</strong> Assuming lower monthly payments always mean less total interest.</li>
            <li><strong>Double Debt Trap:</strong> Continuing to spend on zeroed-out credit cards after consolidating.</li>
            <li><strong>Unrealistic 0% Assumptions:</strong> Not preparing for regular post-promotional rates on balance transfers.</li>
          </ul>
        </div>
      </section>

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold text-lg sm:text-xl border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <HelpCircle className="h-6 w-6 shrink-0 text-indigo-500" />
          <h3>9. Frequently Asked Questions (FAQ)</h3>
        </div>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Explore essential mathematical, financial, and strategic questions about consolidating multiple debts into a single loan.
        </p>

        <div className="space-y-3 pt-2">
          {debtConsolidationFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-800/20">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 10: SUMMARY & KEY TAKEAWAYS */}
      <section className="p-6 sm:p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-3">
        <h3 className="font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
          10. Educational Key Takeaways
        </h3>
        <ul className="space-y-2 text-slate-700 dark:text-slate-300 list-disc pl-5 leading-relaxed">
          <li><strong>Balance-Weighted APR:</strong> Multi-debt interest cost is determined by balance-weighted rates, not simple averages.</li>
          <li><strong>Effective APR vs Nominal APR:</strong> Always include upfront origination fees when evaluating whether a consolidation loan saves money.</li>
          <li><strong>Cash Flow vs Lifetime Cost:</strong> A lower monthly payment that doubles the repayment duration often increases total lifetime interest.</li>
          <li><strong>Maximum Fee Threshold:</strong> Know your break-even fee percentage before signing loan agreements.</li>
          <li><strong>Behavioral Discipline:</strong> Freeze credit card balances after consolidation to avoid the devastating double-debt trap.</li>
        </ul>
      </section>

      {/* YMYL & EDITORIAL POLICY DISCLOSURE */}
      <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        <p>
          <strong>YMYL &amp; Editorial Standards Disclosure:</strong> All calculations, weighted APR metrics, savings comparisons, and balance-transfer estimates are model-based mathematical projections under the user-specified assumptions. They do not constitute guaranteed loan approval, lending commitments, or individualized legal, credit, or financial advice. Loan approval, terms, interest rates, and origination fees are determined exclusively by lenders based on individual underwriting criteria.
        </p>
      </div>
    </div>
  );
}

export default DebtConsolidationContent;
