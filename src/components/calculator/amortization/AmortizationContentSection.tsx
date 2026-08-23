"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { amortization_calculatorFaqs } from "@/calculators/finance/amortization/faq";

export function AmortizationContentSection() {
  // All 12 FAQs open by default
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

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. SINGLE CANONICAL RELATED CALCULATORS BLOCK (Exactly 7 Verified Live Routes) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Related Financial Calculators
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Mortgage Calculator
          </Link>
          <Link
            href="/calculators/loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Loan Calculator
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Auto Loan Calculator
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Personal Loan Calculator
          </Link>
          <Link
            href="/calculators/interest-rate-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Interest Rate Calculator
          </Link>
          <Link
            href="/calculators/emi-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            EMI Calculator
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Refinance Calculator
          </Link>
        </div>
      </div>

      {/* 2. EXPANDED MAIN EDUCATIONAL CONTENT (17 COMPLETE SECTIONS) */}
      <div className="space-y-8 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. What Is an Amortization Calculator?
          </h2>
          <p>
            An amortization calculator shows how a loan balance is paid down as scheduled payments are made over time. For a standard fixed-rate amortizing loan, every periodic payment contains an interest component and a principal component. Early in the schedule, the outstanding balance is larger, so the interest portion is larger; as principal is repaid, the balance falls and the amount of interest accruing each period also falls. The remaining payment can then be applied more heavily to principal. This is the basic mechanism of amortization, and it is why two loans with the same original balance but different rates or terms can have very different total interest costs. The Consumer Financial Protection Bureau (CFPB) describes the same progression: early mortgage payments generally contain more interest, while later payments contain more principal as the balance declines.
          </p>
          <p>
            The calculator is especially useful because it exposes the schedule rather than hiding the calculation inside one headline number. A borrower can see the payment amount, beginning balance, principal reduction, interest charged, ending balance and cumulative totals for individual periods. The resulting annual view then summarizes the same monthly data into a year-by-year picture. This makes the tool useful for understanding the cost of a loan, comparing terms, checking a lender&apos;s amortization schedule, evaluating extra-payment scenarios with a dedicated{" "}
            <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Mortgage Calculator
            </Link>
            , and estimating how quickly the balance may decline. It should still be treated as a mathematical planning model: actual loan documents can contain fees, escrow, insurance, servicing rules, prepayment provisions, or other features that are outside this calculator&apos;s fixed-rate principal-and-interest model.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. How Monthly Amortization Payments Are Calculated
          </h2>
          <p>
            For the fixed-rate model used here, the monthly principal-and-interest payment follows the standard annuity formula. If <em>P</em> is the original principal, <em>r</em> is the monthly interest rate, and <em>n</em> is the total number of payments, the payment is:
          </p>
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center">
            PMT = P &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ &minus; 1 ]
          </div>
          <p>
            For a nominal annual percentage rate entered as 6%, the monthly rate in this model is 0.06 / 12. The payment is then computed from the complete loan term in months. The calculator retains full numerical precision internally and rounds displayed dollar values for presentation. This distinction matters because repeatedly rounding each intermediate balance or interest charge can create cumulative errors in a long amortization schedule.
          </p>
          <p>
            For the validated baseline, a $200,000 loan at 6% for 15 years produces a payment of approximately $1,687.71365, displayed as $1,687.71. Over 180 scheduled payments, the model produces $200,000 of principal repayment and $103,788.46 of interest, for $303,788.46 in total principal and interest. The CFPB similarly describes typical fixed-rate mortgage payments as being determined from the loan amount, interest rate and term using a standard mathematical formula designed to amortize the balance by the end of the stated term when payments are made as scheduled.
          </p>
        </section>

        {/* Section 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Principal vs. Interest: Why the Split Changes Over Time
          </h2>
          <p>
            At the beginning of an amortizing loan, interest is calculated from a relatively large outstanding principal balance. As a result, the interest component of the scheduled payment is relatively high and the principal reduction is relatively smaller. After each payment reduces principal, the next interest calculation is applied to a slightly smaller balance. The payment itself can remain unchanged under a standard fixed-rate structure, while the allocation gradually moves from interest toward principal. This is why the amortization schedule is more informative than a payment-only calculator: it shows not merely what you pay, but what the payment accomplishes against the debt.
          </p>
          <p>
            The exact percentage going to interest in a given period is not universal. It depends on the original balance, rate, term, payment timing and remaining balance. For the validated $200,000, 6%, 15-year baseline, the first month&apos;s interest is $1,000.00 and principal is $687.71; by month 12, interest has fallen to about $961.19 while principal has risen to about $726.52. The annual schedule shows the same pattern at a larger scale: in year 1, $8,483.33 of principal and $11,769.23 of interest are paid, whereas by year 12, the modeled annual principal is $16,386.52 and annual interest has fallen to $3,866.04. These figures demonstrate the direction of amortization without relying on a blanket claim such as &ldquo;80% of every early payment goes to interest.&rdquo;
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. What an Amortization Schedule Contains
          </h2>
          <p>
            A monthly amortization schedule records the path from the original loan balance to zero. A complete row normally contains a payment number or date, beginning balance, scheduled payment, principal portion, interest portion, any extra principal, ending balance and cumulative totals. The annual schedule is an aggregation of those monthly rows rather than a separate approximation. This architecture matters because a borrower should be able to reconcile an annual total back to the underlying month-by-month schedule: annual principal should equal the sum of monthly principal for that year, annual interest should equal the sum of monthly interest, and the year&apos;s ending balance should match the final monthly balance in that year.
          </p>
          <p>
            For the baseline, month 1 begins at $200,000.00, charges $1,000.00 of interest, applies $687.71 to principal and ends near $199,312.29. Month 2 begins at the new lower balance, produces about $996.56 of interest and applies about $691.15 to principal. By month 12, the balance is $191,516.67. The final year ends with a zero balance and cumulative principal of $200,000. This makes the schedule useful for auditing the calculator itself and for understanding why the balance does not decline by the same dollar amount every month even though the scheduled payment is constant.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Total Interest and Total Payments
          </h2>
          <p>
            Total interest is the sum of all modeled interest charges over the scheduled life of the loan. Total principal is the amount originally borrowed, assuming the loan is fully amortized without additional fees or balances being added. Total principal plus total interest therefore equals the modeled total of principal-and-interest payments. The phrase &ldquo;total payments&rdquo; can have a broader meaning in real mortgage disclosures because a borrower&apos;s total payment can include mortgage insurance, escrowed taxes and homeowners insurance, and other costs. The CFPB distinguishes the principal-and-interest component from the broader monthly payment and explains that total payments in loan disclosures can incorporate additional costs.
          </p>
          <p>
            This calculator&apos;s baseline headline is specifically a principal-and-interest amortization result. That distinction should remain clear in the SEO content. A $1,687.71 amortization payment for the example does not mean a real homeowner will necessarily send exactly $1,687.71 to the servicer each month if the loan also has escrow, mortgage insurance, HOA charges or other items. Those costs can be layered on top of principal and interest. The calculator should therefore be positioned as a transparent principal-and-interest schedule rather than as a complete estimate of every cost of homeownership.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. How Loan Term Changes Monthly Payment and Total Interest
          </h2>
          <p>
            Loan term is one of the strongest inputs in an amortization calculation. Holding principal and interest rate constant, extending the term generally lowers the required monthly principal-and-interest payment because the same balance is spread across more scheduled periods. The tradeoff is that interest has more time to accrue, so total interest generally increases. Shortening the term does the opposite: the monthly payment generally rises, but the balance is retired sooner and the total amount of interest tends to fall. The CFPB notes this relationship directly for amortizing loans: a longer term can reduce the monthly payment while increasing the total interest paid over the life of the loan.
          </p>
          <p>
            The calculator combines years and additional months into one total number of monthly periods, so a 15-year loan and a 15-year-plus-six-month loan are mathematically distinct schedules. When comparing terms using our{" "}
            <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Loan Calculator
            </Link>
            , users should compare more than the payment. A lower payment can look attractive while carrying a materially higher lifetime interest cost, whereas a shorter term can increase monthly cash-flow pressure even if the total financing cost is lower. The right choice is therefore a household-specific decision; the calculator presents the tradeoff rather than labeling one term universally &ldquo;better.&rdquo;
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. What Happens When You Make Extra Monthly Payments?
          </h2>
          <p>
            An extra monthly payment reduces the modeled principal faster than the scheduled payment alone. Once the balance has been reduced, future interest charges are calculated from the lower balance, so the loan can reach zero sooner and the total modeled interest can fall. In this calculator&apos;s model, extra money is explicitly applied to reduce the remaining principal balance. That is a modeling assumption and should not be confused with a statement that every real servicer automatically allocates every extra dollar the same way. The CFPB advises borrowers who make extra principal payments to check whether their loan allows them and to make sure the extra amount is applied to principal.
          </p>
          <p>
            In the validated baseline, adding $100 per month reduces the modeled payoff period substantially and produces significant interest savings. The precise savings depends on the original balance, rate, term and timing of the extra payments. You can also explore payoff acceleration scenarios on our{" "}
            <Link href="/calculators/mortgage-payoff-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Mortgage Payoff Calculator
            </Link>{" "}
            or evaluate rate reductions with our{" "}
            <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Refinance Calculator
            </Link>
            . Larger extra payments generally accelerate payoff further in an otherwise unchanged fixed-rate model, but a borrower should also consider emergency savings, higher-interest debt, taxes, investment opportunities and any contractual prepayment rules before treating an extra payment as the best use of cash. The calculator is designed to show the mathematical consequence of the extra payment rather than decide the financial choice for the user.
          </p>
        </section>

        {/* Section 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Extra Yearly Payments and One-Time Lump-Sum Payments
          </h2>
          <p>
            A borrower can accelerate amortization without changing the scheduled payment by making additional principal reductions. A yearly extra payment represents a recurring additional principal amount under the timing convention defined by the calculator, while a one-time lump sum creates a single principal reduction at the selected point in the schedule. Both mechanisms can reduce future interest because subsequent interest calculations start from a lower outstanding balance. The timing matters: a $5,000 reduction at the beginning of a loan normally changes more future interest calculations than the same $5,000 reduction made much later because the earlier lower balance persists for more periods.
          </p>
          <p>
            The validated calculator shows this directly. A $1,200 annual extra payment beginning in the modeled August schedule accelerates the example to roughly 164 periods and saves about $10,131.78 in modeled interest. A $5,000 one-time extra payment at the start reduces the schedule to roughly 173 periods and saves about $5,876.32. These are scenario results for the calculator&apos;s assumptions, not universal savings figures. The actual contractual effect of a principal-only payment can depend on the loan agreement and servicing process, so real borrowers should verify how additional payments are credited.
          </p>
        </section>

        {/* Section 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Delayed Extra Payments and Why Timing Matters
          </h2>
          <p>
            The calculator includes an extra-payment start month and year so users can model a strategy that begins later instead of assuming extra money is available immediately. If an extra payment starts in August 2031 on a loan that begins in August 2026, the model leaves the earlier periods untouched and activates the additional principal stream at the defined start. This is important because an extra-payment strategy has both an amount and a timing dimension. Two borrowers who each contribute an additional $1,200 per year can produce different results if one starts immediately and the other begins after several years.
          </p>
          <p>
            Earlier principal reductions usually have more time to reduce subsequent interest accrual, so earlier extra payments generally create greater modeled interest savings than otherwise identical payments made later. The calculator communicates that relationship without turning it into a personalized recommendation. A user may deliberately delay extra payments to maintain liquidity, fund an emergency reserve, pay down a higher-rate debt, or meet another financial goal. The model answers the narrower question: what happens to this loan if the extra-payment stream begins on the date entered?
          </p>
        </section>

        {/* Section 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Zero-Interest and Edge-Case Loans
          </h2>
          <p>
            A standard amortization formula contains a division by the monthly interest rate term, so an implementation must handle a 0% APR separately rather than plugging zero into the general formula and creating a numerical error. At 0% interest, the payment is simply principal divided by the number of scheduled periods. For example, a $120,000 balance over 120 months produces a $1,000 payment and $0 interest. The validated engine handles this case explicitly and avoids NaN, Infinity and division-by-zero errors.
          </p>
          <p>
            Edge cases also include very small principals, fractional loan amounts, long terms, high rates, additional months, extra payments larger than the remaining balance, and extra-payment start dates after the scheduled payoff. A robust amortization implementation clamps the terminal payment so that the ending balance reaches exactly zero rather than becoming negative. It also avoids applying extra money to a loan after the balance has already been retired. These cases matter for software correctness even if they are less common in normal mortgage use.
          </p>
        </section>

        {/* Section 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Amortization vs. Interest-Only, Negative-Amortization and Adjustable-Rate Loans
          </h2>
          <p>
            This calculator models a standard fixed-rate amortizing schedule. That means the scheduled principal-and-interest payment is calculated to retire the modeled balance over the selected term. It should not be interpreted as an interest-only calculator, negative-amortization calculator or adjustable-rate mortgage simulator. In an interest-only structure, scheduled payments may not reduce principal during the interest-only period; in negative amortization, unpaid interest can be added to the balance, causing the amount owed to increase. The CFPB distinguishes these structures from ordinary amortizing loans and notes that negative amortization can cause the balance to grow even while payments are being made.
          </p>
          <p>
            Adjustable-rate mortgages are also a different modeling problem because the interest rate can change according to the loan&apos;s contractual index, margin, adjustment periods and caps. A generic statement that all ARMs use SOFR is therefore inappropriate. For this page, the safe boundary is simple: the calculator models the entered rate as fixed for the amortization schedule. Users analyzing a variable-rate loan should use a tool that explicitly models rate resets and should rely on the terms of their actual loan documents.
          </p>
        </section>

        {/* Section 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. What Is Included in a Real Mortgage Payment?
          </h2>
          <p>
            An amortization calculator usually focuses on principal and interest because those are the components that amortize the loan balance. A real mortgage payment can be broader. The CFPB describes total monthly mortgage payments as potentially including principal, interest, mortgage insurance, property taxes and homeowners insurance, with HOA charges often separate. Escrow amounts can also change over time as taxes or insurance costs change.
          </p>
          <p>
            This distinction is essential when a user compares a calculator result with a lender quote. A $1,687.71 principal-and-interest payment does not necessarily equal the total amount leaving a homeowner&apos;s bank account. Closing costs, points, prepaid items, escrow, mortgage insurance and other loan costs are separate from the mathematical amortization schedule unless explicitly modeled. For assessing broader rates and installments, compare results with our{" "}
            <Link href="/calculators/interest-rate-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Interest Rate Calculator
            </Link>{" "}
            and{" "}
            <Link href="/calculators/emi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              EMI Calculator
            </Link>
            . The calculator is positioned as a transparent principal-and-interest schedule rather than as a complete estimate of every cost of homeownership.
          </p>
        </section>

        {/* Section 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. How the Payoff Date Is Determined
          </h2>
          <p>
            The payoff date is derived from the loan start month and year plus the number of periods required to reduce the balance to zero under the calculated payment streams. In the baseline, a loan beginning in August 2026 with 180 scheduled monthly payments reaches its modeled final period in July 2041 under the calculator&apos;s date convention. When extra payments shorten the number of periods, the payoff date moves earlier. When the extra-payment start is delayed, the accelerated payoff cannot begin before the extra stream actually starts.
          </p>
          <p>
            Payoff-date calculations should be treated as schedule projections rather than guaranteed contractual dates. Actual loans can contain due-date conventions, holidays, payment processing rules, fees, modifications or other events that are outside this model. The useful purpose of the calculator is to provide a reproducible mathematical schedule from the assumptions entered, allowing users to compare scenarios and see how payment changes affect the modeled end date.
          </p>
        </section>

        {/* Section 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Reading the Amortization Chart and Annual Summary
          </h2>
          <p>
            The chart provides a visual version of the same numbers contained in the schedule. For the validated baseline, approximately 65.8% of total principal-and-interest payments represent principal and 34.2% represent interest. That percentage is a property of this particular loan scenario, not a universal feature of every mortgage. Changing the term or interest rate changes the entire allocation. A shorter term can increase the principal share of total payments, while a higher rate can increase lifetime interest relative to principal.
          </p>
          <p>
            The annual table is especially useful when the monthly schedule contains hundreds of rows. Instead of scanning 180 individual payments, a user can see the principal paid, interest paid and ending balance for each year. Because the annual table is aggregated from the monthly schedule, it reconciles exactly to the same underlying model. The first year of the baseline pays $8,483.33 toward principal and $11,769.23 toward interest, while year 12 has a much larger principal component and a much smaller interest component. That progression makes the long-term effect of amortization easy to inspect.
          </p>
        </section>

        {/* Section 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Exporting and Auditing an Amortization Schedule
          </h2>
          <p>
            The calculator supports searchable and sortable tables plus CSV, Excel, PDF and print outputs. Exporting is useful when a borrower wants to compare scenarios outside the calculator, attach a schedule to a personal budgeting workbook, or review the exact payment progression without scrolling through the live interface. The export preserves the same inputs, payment schedule, totals, payoff date and extra-payment assumptions shown on screen; it does not recalculate using a separate approximate formula.
          </p>
          <p>
            For an audit, the most useful checks are simple. Payment should equal principal plus interest for each period, except where a terminal-payment adjustment is intentionally applied. Beginning balance for one period should equal the prior period&apos;s ending balance. Total principal should reconcile to the original balance, total interest should equal the sum of period interest, and the last modeled balance should be zero. If a downloaded schedule differs from the on-screen schedule, the export is not a separate source of truth—it is a defect that needs correction.
          </p>
        </section>

        {/* Section 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. How to Use an Amortization Calculator Before Making a Loan Decision
          </h2>
          <p>
            Use an amortization calculator as a scenario-analysis tool, not as a substitute for loan disclosures or professional advice. Start by matching the loan amount, interest rate and term shown in the lender&apos;s documents. Then inspect the payment, total interest and schedule. Next, run alternative terms to understand the payment-versus-interest tradeoff. Finally, test plausible extra-payment scenarios if you are considering paying more than the contractual amount. If evaluating non-mortgage financing, test terms on our{" "}
            <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Personal Loan Calculator
            </Link>
            . Comparing these scenarios can reveal how strongly the loan&apos;s total cost responds to rate changes, term changes and principal reductions.
          </p>
          <p>
            The most important limitation is scope. A calculator typically models a mathematical loan balance; a real mortgage can include taxes, insurance, mortgage insurance, fees, escrow, prepayment provisions and servicing rules that are outside the amortization formula. The CFPB recommends reviewing actual written disclosures and total-payment information when evaluating a mortgage. A responsible calculator page makes that distinction clear so that a mathematically correct amortization schedule is not mistaken for a complete cost-of-homeownership forecast.
          </p>
        </section>

        {/* Section 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Calculation Methodology and Financial Disclaimer
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Methodology &amp; Model Assumptions
              </div>
              <p>
                Core methodology: the calculator converts the entered annual rate to a monthly rate (r = APR / 1200), converts the combined years-and-months term to a total number of scheduled monthly periods (n = years &times; 12 + months), calculates the fixed principal-and-interest payment, then generates the schedule one period at a time. The zero-interest case uses principal divided by the number of payments. Each period calculates interest from the current balance, applies the scheduled payment and any modeled extra principal, and produces a new ending balance. Annual totals are aggregated from the monthly schedule. Extra monthly, annual and one-time payments are applied according to the calculator&apos;s defined timing assumptions, and the terminal period is clamped so that the loan ends at exactly zero rather than overpaying the modeled balance. The calculator retains full internal precision and rounds display values for presentation.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Disclaimer &amp; Privacy Notice
              </div>
              <p>
                This is an educational planning tool, not a lender, mortgage servicer, underwriting system, tax adviser, legal adviser or personalized financial recommendation. The core model represents a standard fixed-rate amortizing loan and may not reproduce every feature of a real loan contract. Actual loan payments can include taxes, insurance, mortgage insurance, HOA charges or other costs; actual servicing can determine how payments and extra principal are credited; and loan documents control contractual terms. Extra-payment scenarios assume the calculator&apos;s stated principal-reduction model. Users should verify prepayment provisions, payoff amounts and payment-application rules with their servicer or lender before acting on a payoff strategy. The calculator&apos;s job is to make the mathematical consequences of the assumptions transparent and reproducible.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. FAQ SECTION (Exactly 12 Approved FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {amortization_calculatorFaqs.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default AmortizationContentSection;
