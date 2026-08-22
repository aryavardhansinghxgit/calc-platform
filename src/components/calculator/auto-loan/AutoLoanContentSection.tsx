import React from "react";
import Link from "next/link";
import { BookOpen, HelpCircle, ShieldAlert, FileText } from "lucide-react";
import { AUTO_LOAN_FAQS } from "@/app/calculators/auto-loan-calculator/faq";

export function AutoLoanContentSection() {
  const faqs = AUTO_LOAN_FAQS;

  return (
    <div className="space-y-10 mt-8 text-zinc-800 dark:text-zinc-200">
      {/* ==========================================
          15 EDUCATIONAL SECTIONS
         ========================================== */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-8">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Understanding Auto Financing &amp; Vehicle Loan Mathematics
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              A comprehensive technical guide to auto loan structures, discrete monthly amortization, trade-in tax treatment, and borrowing economics.
            </p>
          </div>
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {/* Section 1 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              1. What Is an Auto Loan Calculator?
            </h3>
            <p>
              An auto loan calculator is a quantitative financial modeling tool designed to calculate the scheduled monthly payments, total borrowing costs, and principal amortization trajectory associated with financing a motor vehicle. When acquiring a vehicle through debt financing, the transaction involves far more than simply dividing the vehicle&apos;s sticker price by a chosen number of months. A comprehensive auto loan model must evaluate multiple interrelated financial variables, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Agreed Vehicle Purchase Price:</strong> The negotiated base price of the car before taxes, government registration, dealer documentation fees, or trade-in deductions.</li>
              <li><strong>Cash Down Payment:</strong> The upfront equity contributed in cash, which directly reduces the initial borrowing requirement.</li>
              <li><strong>Trade-In Allowance &amp; Outstanding Lien:</strong> The gross valuation assigned to an existing vehicle minus any remaining loan balance owed to the current lienholder.</li>
              <li><strong>Net Trade-In Equity or Negative Equity Rollover:</strong> The resulting equity credit (if positive) or underwater balance added to the new loan (if negative).</li>
              <li><strong>Annual Percentage Rate (APR):</strong> The annualized cost of borrowing charged by the financing institution across the life of the loan.</li>
              <li><strong>Loan Term (Maturity):</strong> The repayment duration in months, typically structured in 12-month increments (36, 48, 60, 72, or 84 months).</li>
              <li><strong>State &amp; Municipal Sales Taxes:</strong> Government-mandated excise or sales taxes calculated on the vehicle&apos;s taxable purchase base.</li>
              <li><strong>Itemized Dealer &amp; Registration Fees:</strong> Title transfer, registration, and dealer documentation (doc) charges.</li>
              <li><strong>Conditional Financing Toggles:</strong> Whether upfront sales taxes and dealer fees are paid out-of-pocket in cash or capitalized into the financed loan balance.</li>
            </ul>
            <p className="mt-2">
              This calculator generates mathematical simulations based strictly on user-entered parameters. The outputs reflect discrete amortization modeling under specified assumptions and do not constitute formal lender underwriting, credit pre-approval, or legal tax determination.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              2. How Auto Loan Payments Are Calculated
            </h3>
            <p>
              Auto loan installment payments are computed using a standard fixed-payment discrete monthly amortization model. In consumer installment lending, interest accrues across monthly billing cycles based on the remaining unamortized principal balance and the monthly periodic interest rate.
            </p>
            <div className="my-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 space-y-1">
              <div>r = APR / 12</div>
              <div>Payment = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]</div>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Where <strong>P</strong> is the net financed principal, <strong>r</strong> is the monthly periodic interest rate (APR / 12), and <strong>n</strong> is the total number of monthly payment periods.
            </p>
            <p className="mt-2">
              In our verified baseline scenario ($35,000 purchase price, $5,000 down payment, $3,000 trade-in credit, $960 sales tax, $700 itemized fees, 5.9% APR, 60 months), the net financed principal is $28,660.00. The monthly periodic interest rate is 0.059 / 12 ≈ 0.00491667. Applying the discrete amortization formula yields a monthly payment of <strong>$552.75 per month</strong>, resulting in $33,164.79 in total loan payments ($4,504.79 total interest). You can inspect the exact month-by-month principal reduction and interest trajectory for any loan balance using our dedicated <Link href="/calculators/amortization-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">loan amortization calculator</Link>.
            </p>
          </div>

          {/* Section 3 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              3. Financed Principal vs. Total Vehicle Purchase Cost
            </h3>
            <p>
              A critical distinction in automotive financial planning is the difference between the <strong>Total Financed Loan Payments</strong> and the <strong>Total Vehicle Purchase Cost</strong>. Conflating these two metrics leads to significant budgeting errors because each metric measures a fundamentally different economic scope:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 mt-2">
              <li><strong>Total Financed Loan Payments ($33,164.79):</strong> Represents the cumulative cash paid directly to the financing institution over the 60-month loan term. It is the sum of the financed principal ($28,660.00) plus total lifetime interest charges ($4,504.79).</li>
              <li><strong>Total Vehicle Purchase Cost ($41,164.79):</strong> Represents the complete, all-inclusive economic expenditure required to acquire and finance the vehicle. It is calculated by adding the cash down payment ($5,000.00) and positive trade-in equity credit ($3,000.00) to the total loan payments ($33,164.79), or equivalently: Vehicle Sticker Price ($35,000) + Sales Tax ($960) + Title &amp; Dealer Fees ($700) + Loan Interest ($4,504.79) = <strong>$41,164.79</strong>.</li>
            </ul>
            <p className="mt-2">
              Understanding this boundary ensures borrowers evaluate both their immediate financing debt and their comprehensive capital outlay. To explore general installment borrowing structures across different loan types, utilize our <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">installment loan calculator</Link>.
            </p>
          </div>

          {/* Section 4 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              4. Down Payments and Initial Equity
            </h3>
            <p>
              A cash down payment is the initial equity capital contributed by the car buyer at the time of purchase. Contributing an upfront down payment produces four distinct financial effects within the loan model:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Reduces Financed Principal:</strong> Every dollar contributed in cash down payment reduces the initial loan balance on a 1-to-1 basis.</li>
              <li><strong>Decreases Monthly Installment Requirements:</strong> A smaller principal balance results in lower required monthly payments across any chosen loan duration.</li>
              <li><strong>Lowers Cumulative Lifetime Interest:</strong> Because interest is calculated against the remaining principal balance each month, reducing starting principal decreases the dollar interest accrued across every payment period.</li>
              <li><strong>Establishes an Initial Equity Cushion:</strong> Motor vehicles experience market depreciation during ownership. A substantial down payment helps ensure the vehicle&apos;s fair market value remains higher than the outstanding loan balance, mitigating the risk of becoming underwater.</li>
            </ul>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              While financial literature frequently references a 20% down payment as an illustrative conservative planning heuristic, down payment requirements vary widely across lenders, loan programs, and credit profiles. The 20% benchmark is an educational reference point rather than a mandatory lending requirement.
            </p>
          </div>

          {/* Section 5 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              5. Trade-In Equity and Negative Equity Rollover Mechanics
            </h3>
            <p>
              When trading in an existing vehicle as part of a new purchase, the transaction&apos;s financial outcome depends entirely on the relationship between the vehicle&apos;s market value and any outstanding lien balance owed to the existing lender:
            </p>
            <div className="my-2 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800 font-mono text-xs">
              Net Trade-In Equity = Agreed Trade-In Allowance - Amount Owed on Trade-In
            </div>
            <p className="mt-2">
              <strong>Positive Trade-In Equity:</strong> When the trade-in allowance exceeds the payoff amount on the existing loan, the surplus acts as an additional down payment, directly lowering the new loan principal ($3,000 trade value with $0 owed provides a $3,000 equity deduction).
            </p>
            <p className="mt-1">
              <strong>Negative Equity Rollover:</strong> When the remaining loan balance exceeds the trade-in allowance, the vehicle carries negative equity. If permitted by the lender, this shortfall is rolled over into the new loan balance. Rolling over negative equity increases the new financed principal, raises monthly payments, and elevates the new loan&apos;s Loan-to-Value (LTV) ratio.
            </p>
          </div>

          {/* Section 6 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              6. How Sales Tax and Trade-In Value Can Affect the Taxable Vehicle Price
            </h3>
            <p>
              Vehicle sales taxes are assessed by state, county, and municipal governments. In automotive financing, sales tax treatment varies significantly depending on statutory state rules governing trade-in tax credits:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Jurisdictions with Trade-In Tax Credits:</strong> In many states, the agreed value of a trade-in vehicle is deducted from the purchase price of the new vehicle before calculating state sales tax. In our baseline scenario ($35,000 price with a $3,000 trade-in at a 3% tax rate), the tax is assessed on $32,000, yielding $960.00 in sales tax (saving $90.00 in tax compared to a zero-trade transaction).</li>
              <li><strong>Jurisdictions Without Trade-In Tax Credits:</strong> Certain states assess sales tax on the full gross purchase price of the replacement vehicle regardless of trade-in allowance ($35,000 × 0.03 = $1,050.00).</li>
            </ul>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              The calculator models user-entered tax rates and provides statutory trade-in tax credit toggles. However, because local municipal surcharges, vehicle weight classifications, and regional tax caps vary, calculator outputs serve as planning simulations rather than official legal tax determinations.
            </p>
          </div>

          {/* Section 7 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              7. Dealer Fees, Title, Registration, and Financed Costs
            </h3>
            <p>
              In addition to the vehicle purchase price and sales tax, vehicle transactions include itemized governmental and dealership fees:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>State Title &amp; License Registration Fees:</strong> Statutory government charges required to transfer title ownership, register the vehicle, and issue state license plates.</li>
              <li><strong>Dealer Documentation (Doc) Fees:</strong> Administrative charges levied by dealerships to process title paperwork, compliance filings, and sales contracts. These fees vary by dealer and are subject to state-specific statutory fee caps in certain jurisdictions.</li>
              <li><strong>Optional Vehicle Protection Products:</strong> Extended warranties, service contracts, and tire/wheel protection packages.</li>
            </ul>
            <p className="mt-2">
              Borrowers can choose whether to pay these itemized fees upfront with cash or capitalize them into the loan balance. Capitalizing $700.00 in documentation and title fees into a 60-month loan at 5.9% APR increases the financed principal, adding approximately $13.51 per month to payments and generating approximately $110.45 in additional interest charges over the 5-year term.
            </p>
          </div>

          {/* Section 8 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              8. APR and Loan-Term Trade-Offs
            </h3>
            <p>
              The duration of an auto loan exerts a profound influence on both monthly cash flow obligations and lifetime interest expenses. While extending the loan term lowers the required monthly payment, it substantially increases the total interest charged across the life of the loan:
            </p>
            <div className="overflow-x-auto my-3">
              <table className="min-w-full text-xs border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <thead className="bg-zinc-50 dark:bg-zinc-950 font-bold text-zinc-900 dark:text-zinc-100">
                  <tr>
                    <th className="p-2 text-left">Term</th>
                    <th className="p-2 text-left">Scenario Classification</th>
                    <th className="p-2 text-right">Monthly Payment</th>
                    <th className="p-2 text-right">Total Interest</th>
                    <th className="p-2 text-right">Total Loan Payments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 font-sans tabular-nums">
                  <tr><td className="p-2 font-bold">36 Months</td><td className="p-2">Shortest Term in Comparison</td><td className="p-2 text-right font-bold">$869.96</td><td className="p-2 text-right">$2,658.46</td><td className="p-2 text-right">$31,318.46</td></tr>
                  <tr><td className="p-2 font-bold">48 Months</td><td className="p-2">Standard Short-Term</td><td className="p-2 text-right font-bold">$671.95</td><td className="p-2 text-right">$3,593.42</td><td className="p-2 text-right">$32,253.42</td></tr>
                  <tr><td className="p-2 font-bold">60 Months</td><td className="p-2">Mid-Range Term (Baseline)</td><td className="p-2 text-right font-bold">$552.75</td><td className="p-2 text-right">$4,504.79</td><td className="p-2 text-right">$33,164.79</td></tr>
                  <tr><td className="p-2 font-bold">72 Months</td><td className="p-2">Extended Term</td><td className="p-2 text-right font-bold">$473.49</td><td className="p-2 text-right">$5,431.18</td><td className="p-2 text-right">$34,091.18</td></tr>
                  <tr><td className="p-2 font-bold">84 Months</td><td className="p-2">Lowest Payment in Comparison</td><td className="p-2 text-right font-bold">$417.03</td><td className="p-2 text-right">$6,370.47</td><td className="p-2 text-right">$35,030.47</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              To evaluate how prepaid dealer finance charges, discount points, or administrative origination fees adjust the effective annualized cost of borrowing, analyze your loan terms with our <Link href="/calculators/apr-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">annual percentage rate calculator</Link>.
            </p>
          </div>

          {/* Section 9 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              9. How Much Car Can You Afford?
            </h3>
            <p>
              The reverse affordability solver calculates a modeled vehicle sticker price that corresponds to a target monthly payment under the selected assumptions. When a target monthly payment ($500.00/mo), APR (5.9%), term (60 months), down payment ($5,000), trade-in value ($3,000), sales tax (3%), and dealer fees ($700) are entered:
            </p>
            <ol className="list-decimal pl-5 space-y-1 mt-1">
              <li>The engine determines the maximum supported loan principal: <strong>$25,924.52</strong>.</li>
              <li>Incorporating the trade-in tax shield credit ($90) into the inverse capacity formula produces an exact <strong>Maximum Affordable Vehicle Sticker Price of $32,344.19</strong>.</li>
              <li><strong>Forward Verification:</strong> A $32,344.19 vehicle minus $8,000 upfront credits plus $880.33 tax and $700 fees yields a $25,924.52 loan, generating a forward payment of exactly <strong>$500.00/month</strong>.</li>
            </ol>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              Important Distinction: The reverse affordability solver computes the mathematical vehicle price corresponding to entered payment parameters; it does not evaluate overall household budgetary health or constitute personal financial advice.
            </p>
          </div>

          {/* Section 10 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              10. The 20/4/10 Planning Rule
            </h3>
            <p>
              The 20/4/10 Planning Rule is an illustrative household budgeting heuristic designed to help consumers evaluate vehicle affordability relative to their broader cash flow:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>20% Down Payment:</strong> Contribute at least 20% upfront to establish an equity cushion.</li>
              <li><strong>4-Year Maximum Term:</strong> Finance for no more than 48 months (4 years) to limit cumulative interest.</li>
              <li><strong>10% Income Ceiling:</strong> Cap monthly auto loan payments at no more than 10% of gross monthly income.</li>
            </ul>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              For a household with a gross monthly income of $6,500.00, the 10% ceiling allows up to $650.00/month. The baseline payment of $552.75 consumes 8.5% of gross income, satisfying the front-end planning guideline. The 20/4/10 framework is an illustrative budgeting model, not an official lending standard or regulatory requirement.
            </p>
          </div>

          {/* Section 11 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              11. Direct Bank Financing vs. Dealer-Arranged Auto Loans
            </h3>
            <p>
              Car buyers generally access auto loan financing through one of two institutional channels:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2">
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <strong className="text-blue-600 dark:text-blue-400 block mb-1">Direct Bank &amp; Credit Union Lending</strong>
                Borrowers apply directly to a financial institution before shopping, establishing a firm APR benchmark and independent loan pre-approval.
              </div>
              <div className="p-3 bg-zinc-50 dark:bg-zinc-950 rounded-lg border border-zinc-200 dark:border-zinc-800">
                <strong className="text-blue-600 dark:text-blue-400 block mb-1">Dealer-Arranged Financing</strong>
                Dealerships submit applications across a network of lenders and captive automaker finance companies, providing convenience and access to promotional financing programs.
              </div>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              When evaluating unsecured personal borrowing options as an alternative to secured vehicle financing for private vehicle purchases, compare rates with our <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">unsecured personal loan calculator</Link>.
            </p>
          </div>

          {/* Section 12 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              12. Paying Off an Auto Loan Early
            </h3>
            <p>
              Because standard retail installment auto loans calculate interest based on the remaining unamortized balance, making extra monthly principal payments accelerates loan payoff and reduces cumulative borrowing costs:
            </p>
            <p className="mt-1">
              Applying an extra $100.00 per month (increasing total payment from $552.75 to $652.75) toward a $28,660.00 loan at 5.9% APR shortens the payoff timeline from 60 months to <strong>49 months (saving 11 months)</strong> and reduces total interest from $4,504.79 to $3,656.76 (producing <strong>$848.03 in modeled interest savings</strong>).
            </p>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              Many consumer auto loans use simple-interest amortization, but prepayment terms vary by contract and jurisdiction. Review your retail installment contract for any applicable prepayment provisions. Borrowers seeking to evaluate whether refinancing an existing high-rate auto loan to a lower APR yields greater savings can model options with our <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">loan refinance calculator</Link>.
            </p>
          </div>

          {/* Section 13 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              13. Understanding Vehicle Purchase and Financing Cost
            </h3>
            <p>
              To maintain financial clarity, consumers must distinguish the costs modeled within this calculator from the broader operational expenses of vehicle ownership:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-1">
              <li><strong>Costs Modeled in This Calculator:</strong> Negotiated vehicle price ($35,000), government title &amp; registration fees ($300), dealer documentation fees ($400), state sales tax ($960), and 60-month loan interest ($4,504.79), totaling a modeled purchase cost of $41,164.79.</li>
              <li><strong>Broader Operational Expenses:</strong> Comprehensive auto insurance premiums, fuel or electricity, scheduled maintenance, unscheduled mechanical repairs, replacement tires, annual municipal property taxes, and market value depreciation.</li>
            </ul>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              When structuring household debt across multiple credit products, managing revolving credit balances with our <Link href="/calculators/credit-card-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">credit card payoff calculator</Link> or integrating loans into a structured debt reduction plan with our <Link href="/calculators/debt-payoff-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">debt payoff calculator</Link> can optimize overall cash flow.
            </p>
          </div>

          {/* Section 14 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              14. Frequently Asked Questions
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Authoritative, mathematically validated answers to common vehicle financing, interest rate, and trade-in questions are detailed below.
            </p>
          </div>

          {/* Section 15 */}
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100 mb-2">
              15. Calculation Methodology &amp; Financial Planning Disclaimer
            </h3>
            <p>
              Calculations generated by this platform utilize deterministic discrete financial annuity mathematics. Monthly payment calculations execute the standard discrete periodic rate formula (r = APR / 12). Amortization schedules iteratively allocate each periodic installment between accrued monthly interest and principal reduction, tracking the declining balance to exactly $0.00.
            </p>
            <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
              Educational &amp; Planning Disclaimer: This calculator provides mathematical estimates based on user-entered parameters for personal financial planning and educational purposes only. Actual auto loan financing terms, approved annual percentage rates (APR), required down payments, trade-in valuations, itemized documentation fees, and state/local tax liabilities are established by commercial lending institutions, motor vehicle dealers, and government revenue authorities subject to formal credit underwriting and statutory regulations. This tool does not constitute a formal loan application, credit pre-approval, underwriting commitment, legal tax determination, or individualized financial advisory service.
            </p>
          </div>
        </div>
      </section>

      {/* ==========================================
          20 AUTHORITATIVE FAQ CARDS (OPEN BY DEFAULT)
         ========================================== */}
      <section className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
            <HelpCircle className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              Authoritative answers to common auto financing, interest rate, and trade-in calculations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={`faq-card-${idx}`}
              className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-2"
            >
              <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100">
                {faq.question}
              </h3>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          METHODOLOGY & DISCLAIMER
         ========================================== */}
      <section className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 space-y-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <div className="flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-bold text-sm">
          <FileText className="h-4 w-4 text-blue-600" />
          Calculation Methodology &amp; Source Standards
        </div>
        <p>
          Calculations are generated using deterministic discrete financial annuity formulas. Monthly amortization is computed using the standard periodic rate (r = APR / 12). State sales tax calculations reflect user-entered rates or estimated state benchmarks, accounting for conditional trade-in credit deductions where selected.
        </p>
        <div className="flex items-start gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500">
          <ShieldAlert className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
          <span>
            <strong>Educational Disclaimer:</strong> This calculator is designed for educational and personal financial planning purposes only. Final loan approval, interest rates, down payment requirements, itemized documentation fees, and sales tax liabilities are determined by lenders and authorized retail dealerships subject to credit review and state statutory regulations.
          </span>
        </div>
      </section>
    </div>
  );
}
