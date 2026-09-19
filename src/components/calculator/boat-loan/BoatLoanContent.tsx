"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Anchor,
  Scale,
  Calculator,
  BookOpen,
  AlertCircle,
  FileText,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Compass,
  HelpCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export const boatLoanFaqs = [
  {
    question: "What are typical interest rates, terms, and down payments on boat loans?",
    answer:
      "Marine financing terms typically range from 5 to 20 years (longer for yachts and vessels over $100,000). Fixed interest rates standardly range between 6.5% and 10.5% depending on credit rating, loan size, and vessel age. Marine lenders typically require a 10% to 20% down payment in cash or verified trade-in equity.",
  },
  {
    question: "What is the Total Cost of Boat Ownership (TCO) beyond the monthly loan payment?",
    answer:
      "A standard marine industry rule of thumb estimates recurring annual operating expenses at 10% to 15% of the boat's purchase price each year. This includes marina wet slip or dry-stack storage ($150–$600+/mo), comprehensive marine hull insurance (1%–1.5% of value annually), seasonal fuel, routine engine servicing, anti-fouling bottom paint, and winterization.",
  },
  {
    question: "What is a Marine Survey and why do boat lenders require one?",
    answer:
      "A Marine Survey is an in-depth physical inspection and appraisal conducted by a certified marine surveyor (accredited by SAMS or NAMS). Lenders mandate surveys on used boats (typically over 25–30 feet or valued over $25,000) to verify structural hull integrity, engine condition, safety gear, and fair market appraisal value before underwriting a loan.",
  },
  {
    question: "Can a boat loan qualify for the US Second Home Mortgage Interest tax deduction?",
    answer:
      "Yes. Under IRS Section 163(h), a boat can qualify as a secondary residence for mortgage interest deductions if it contains basic living accommodations: a permanent dedicated sleeping berth (bed), a galley (cooking appliances), and an onboard head (marine toilet/bathroom).",
  },
  {
    question: "What is the difference between US Coast Guard (USCG) Documentation and State Titling?",
    answer:
      "USCG Documentation is a federal vessel registration for boats measuring at least 5 net tons (typically 25+ feet). Most marine lenders require USCG Documentation with a Preferred Ship Mortgage because it establishes a clear federal lien, simplifying financing and granting international recognition for cruising outside US territorial waters.",
  },
  {
    question: "How fast do new and used boats depreciate over time?",
    answer:
      "New boats experience rapid initial depreciation: typically 15% to 25% in the first year and 8% to 12% annually in years two through five. By year five, most vessels retain approximately 50% to 60% of their original MSRP before the depreciation curve flattens out.",
  },
  {
    question: "When should I consider refinancing my existing boat loan?",
    answer:
      "Refinancing is financially advantageous when prevailing marine market rates drop by at least 1.0% to 1.5% below your existing APR, your credit score has improved significantly, or you wish to extend or shorten your repayment timeline to optimize monthly cash flow.",
  },
  {
    question: "What is the difference between a Secured Marine Loan and an Unsecured Personal Loan?",
    answer:
      "A secured marine loan uses the boat as collateral, offering lower interest rates, higher loan amounts ($500,000+), and terms up to 20 years. An unsecured personal loan requires no collateral or marine survey but carries higher interest rates (10%–20%), shorter terms (3 to 7 years), and lower borrowing caps ($50,000–$100,000).",
  },
  {
    question: "How do boat loan terms differ between new vs. older used vessels?",
    answer:
      "New vessels qualify for the longest repayment horizons (15 to 20 years) and lowest interest rates. Vessels older than 10 to 15 years often face stricter lender caps: maximum 5-to-10-year terms, mandatory hull surveys, lower loan-to-value limits (e.g., 70%–80%), and higher APRs.",
  },
  {
    question: "What credit score is needed to qualify for prime boat financing?",
    answer:
      "While subprime marine lenders exist for scores around 640–660, prime competitive rates and maximum loan-to-value terms require a FICO score of 700 to 740+ along with a debt-to-income (DTI) ratio below 40%–45% and verifiable liquidity reserves.",
  },
  {
    question: "Are boat sales taxes paid upfront or financed into the loan balance?",
    answer:
      "Depending on the state where the boat is registered and lender underwriting policies, state sales/use taxes (typically 3% to 8%, with some states having tax caps like Florida's $18,000 cap) can be paid out-of-pocket at closing or rolled into the financed principal balance.",
  },
  {
    question: "How does boat winterization and seasonal storage affect ownership costs?",
    answer:
      "In cold-climate regions, professional winterization (engine fogging, antifreeze flushing, shrink-wrapping) and dry-stack or outdoor yard storage typically add $1,000 to $3,500+ annually to ownership costs to protect engines, outdrives, and onboard plumbing from freeze damage.",
  },
];

export function BoatLoanContent() {
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
          <Anchor className="w-4 h-4" />
          <span>Marine Financing Guide</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. Introduction: Principles of Marine Financing &amp; Vessel Lending
        </h2>
        <p>
          Marine financing represents a specialized sector of secured installment lending designed specifically for watercraft—including bowriders, center console fishing boats, pontoon boats, sailboats, cabin cruisers, and luxury motor yachts.
        </p>
        <p>
          Because marine vessels operate in demanding aquatic environments, undergo distinct depreciation curves, and maintain substantial capital value over decades, boat loans feature repayment horizons ranging from <strong>5 to 20 years</strong>. Unlike automotive loans, boat ownership involves significant ongoing operational costs (the &ldquo;Total Cost of Ownership&rdquo; or TCO), making it essential to evaluate both the monthly amortization installment and recurring marina slip, insurance, fuel, and maintenance obligations.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-200 dark:border-blue-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <Compass className="w-4 h-4 text-blue-600" />
              Secured Marine Installment Loans
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              The boat serves as direct collateral through a state title lien or federal USCG Preferred Ship Mortgage. Offers low fixed interest rates (6.5%–10.5%) and extended terms up to 240 months.
            </p>
          </div>
          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              The 10%–15% TCO Rule
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Annual operating expenses (mooring/slips, hull insurance, engine servicing, winterization, fuel) typically equal 10% to 15% of the boat&apos;s purchase price every single year.
            </p>
          </div>
        </div>
      </section>

      {/* 2. MATHEMATICAL CONCEPT */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Scale className="w-4 h-4" />
          <span>Underlying Financial Mathematics</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. Mathematical Concept: Marine Loan Amortization &amp; Compounding
        </h2>
        <p>
          Boat loans operate on a standard fixed-rate annuity amortization structure with monthly compounding. Each equal monthly installment covers accrued periodic interest on the remaining unpaid principal balance, with the remainder reducing the loan principal.
        </p>
        <p>
          Because marine loan durations can extend to 15 or 20 years (180 to 240 monthly billing periods), interest compounding in the early years constitutes the majority of each payment before principal reduction accelerates in the second half of the loan term.
        </p>

        <div className="p-5 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs sm:text-sm space-y-3 shadow-inner">
          <div className="text-slate-400 font-sans text-xs uppercase tracking-wider border-b border-slate-700 pb-1">
            Monthly Marine Debt Service Equation
          </div>
          <div>
            <span className="text-blue-400">Monthly Payment (M)</span> = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <div className="text-slate-300 text-xs font-sans">
            Where: <strong>P</strong> = Financed Principal, <strong>r</strong> = Monthly Interest Rate (Annual APR / 12), <strong>n</strong> = Total Number of Months (Years × 12).
          </div>
        </div>
      </section>

      {/* 3. FORMULA SECTION */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <Calculator className="w-4 h-4" />
          <span>Formulas &amp; Variable Definitions</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Marine Financing &amp; Total Cost of Ownership Formulas
        </h2>
        <p>
          Accurate marine budget modeling integrates four core mathematical relationships:
        </p>

        <div className="space-y-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              1. Financed Loan Principal (P)
            </h3>
            <div className="font-mono text-xs text-blue-600 dark:text-blue-400">
              P = Boat Purchase Price - Down Payment - Trade-In Equity + Financed Taxes &amp; Dealer Rigging Fees
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Marine lenders typically require 10% to 20% down. If sales tax and rigging fees are paid out-of-pocket, they are excluded from <em>P</em>.
            </p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              2. Total Cost of Ownership (Annual &amp; Monthly TCO)
            </h3>
            <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
              Monthly TCO = Monthly Loan Payment + Marina Slip Fee + (Annual Insurance / 12) + (Annual Fuel &amp; Maintenance / 12) + (Annual Winterization / 12)
            </div>
            <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
              Annual TCO = (Monthly Loan Payment × 12) + Marina Fees + Insurance + Fuel &amp; Maintenance + Winterization
            </div>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              3. Vessel Resale Value Depreciation Model
            </h3>
            <div className="font-mono text-xs text-amber-600 dark:text-amber-400">
              V(t) = Purchase Price × (1 - d)^t
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Where <em>d</em> is the annual depreciation rate (typically 15%–20% in Year 1, leveling to 8%–10% in later years) and <em>t</em> is the ownership duration in years.
            </p>
          </div>
        </div>
      </section>

      {/* 4. HOW THE CALCULATION WORKS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Execution Sequence</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. How the Boat Loan Calculation Works (Step-by-Step Execution)
        </h2>
        <ol className="list-decimal list-inside space-y-3 pl-2 text-xs sm:text-sm">
          <li>
            <strong>Gross Vessel Valuation:</strong> Establishes the negotiated price for the hull, outboard/inboard motors, trailer, electronics, and rigging.
          </li>
          <li>
            <strong>Equity &amp; Down Payment Subtraction:</strong> Deducts cash down payments and agreed trade-in equity allowances to establish the net base loan balance.
          </li>
          <li>
            <strong>Taxes, Title &amp; Marine Documentation:</strong> Evaluates state sales tax (or state tax cap limits, such as Florida&apos;s $18,000 cap) and USCG documentation fees, either adding them to the principal or categorizing them as upfront cash closing costs.
          </li>
          <li>
            <strong>Amortization Matrix Generation:</strong> Calculates the exact periodic monthly payment across the selected loan horizon (e.g., 60, 120, 180, or 240 months) and computes total cumulative interest charges.
          </li>
          <li>
            <strong>Operational Expense Layering (TCO):</strong> Adds monthly wet slip / dry-stack storage fees, hull insurance, scheduled fuel, engine maintenance, and winterization to reveal the true monthly cost of ownership.
          </li>
          <li>
            <strong>Early Payoff &amp; Resale Solving:</strong> Computes the accelerated payoff schedule if extra principal is added and estimates the future residual resale equity when the vessel is sold.
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
          5. Worked Examples: Step-by-Step Mathematical Solutions
        </h2>

        <div className="space-y-6">
          {/* Example 1 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center justify-between">
              <span>Example 1: $35,000 Center Console Fishing Boat (10-Year Term @ 7.0% APR)</span>
              <span className="text-blue-600 dark:text-blue-400 font-bold text-xs bg-blue-100 dark:bg-blue-950/40 px-2 py-1 rounded-md">Trailerable Boat</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Purchase price: $35,000, Down payment: $7,000 (20%), Loan term: 10 Years (120 Months), APR: 7.0%.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5">
              <div>• <strong>Financed Principal:</strong> $35,000 - $7,000 = <strong>$28,000</strong></div>
              <div>• <strong>Monthly Interest Rate (r):</strong> 0.07 / 12 = 0.0058333</div>
              <div>• <strong>Monthly Payment (M):</strong> $28,000 × [ 0.0058333(1.0058333)^120 ] / [ (1.0058333)^120 - 1 ] = <strong>$325.10 / month</strong></div>
              <div>• <strong>Total Payments over 10 Years:</strong> $325.10 × 120 = <strong>$39,012</strong></div>
              <div>• <strong>Total Finance Interest:</strong> $39,012 - $28,000 = <strong>$11,012</strong></div>
              <div>• <strong>All-In Purchase Cost:</strong> $7,000 (down) + $39,012 = <strong>$46,012</strong></div>
            </div>
          </div>

          {/* Example 2 */}
          <div className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base flex items-center justify-between">
              <span>Example 2: $120,000 Cabin Cruiser — 15-Year Loan with TCO Layering</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xs bg-emerald-100 dark:bg-emerald-950/40 px-2 py-1 rounded-md">Slip-Kept Cruiser</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Purchase price: $120,000, Down payment: $24,000 (20%), Loan term: 15 Years (180 Mos) @ 7.5% APR. Marina: $450/mo, Insurance: $1,400/yr, Maintenance: $3,500/yr.
            </p>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 font-mono text-xs space-y-1.5">
              <div>• <strong>Financed Principal:</strong> $120,000 - $24,000 = <strong>$96,000</strong></div>
              <div>• <strong>Monthly Loan Debt Service:</strong> <strong>$889.96 / month</strong> ($64,192 total interest over 15 years)</div>
              <div>• <strong>Monthly Operational Expenses:</strong> $450 (slip) + $116.67 (insurance) + $291.67 (maint) = <strong>$858.34 / month</strong></div>
              <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                ★ Total Monthly Out-of-Pocket Ownership Cost (TCO): $889.96 + $858.34 = $1,748.30 / month!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. VISUAL DECISION MATRIX */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <TrendingUp className="w-4 h-4" />
          <span>Comparative Matrix</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Visual Understanding: Loan Term Horizon vs. Interest Compounding
        </h2>

        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800 text-xs">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-100 dark:bg-slate-800 font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="p-3">Loan Term</th>
                <th className="p-3">Monthly Payment ($50k Financed @ 7.5%)</th>
                <th className="p-3">Total Finance Interest</th>
                <th className="p-3">Principal / Interest Ratio</th>
                <th className="p-3">Target Buyer Profile</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-2.5 font-bold">5 Years (60 Mos)</td>
                <td className="p-2.5 font-mono font-bold text-blue-600">$1,001.90 / mo</td>
                <td className="p-2.5 font-mono text-emerald-600">$10,114</td>
                <td className="p-2.5">83% Principal / 17% Interest</td>
                <td className="p-2.5">High monthly cash flow, minimizes interest cost.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">10 Years (120 Mos)</td>
                <td className="p-2.5 font-mono font-bold text-blue-600">$593.51 / mo</td>
                <td className="p-2.5 font-mono text-slate-700 dark:text-slate-300">$21,221</td>
                <td className="p-2.5">70% Principal / 30% Interest</td>
                <td className="p-2.5">Standard sweet spot for trailerable vessels.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">15 Years (180 Mos)</td>
                <td className="p-2.5 font-mono font-bold text-blue-600">$463.52 / mo</td>
                <td className="p-2.5 font-mono text-amber-600">$33,433</td>
                <td className="p-2.5">60% Principal / 40% Interest</td>
                <td className="p-2.5">Cruisers &amp; larger vessels over $75,000.</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold">20 Years (240 Mos)</td>
                <td className="p-2.5 font-mono font-bold text-blue-600">$402.80 / mo</td>
                <td className="p-2.5 font-mono text-rose-600">$46,672</td>
                <td className="p-2.5">52% Principal / 48% Interest</td>
                <td className="p-2.5">Luxury yachts; interest almost equals vessel loan principal!</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. COMMON PITFALLS & STRATEGIC INSIGHTS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-semibold text-xs tracking-wider uppercase">
          <AlertCircle className="w-4 h-4" />
          <span>Marine Pitfalls &amp; Insights</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Critical Pitfalls &amp; Strategic Marine Guidelines
        </h2>

        <div className="space-y-3 text-xs sm:text-sm">
          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-amber-600 font-extrabold">✕</span>
              The &ldquo;Payment-Only&rdquo; Budgeting Trap
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Many first-time boaters qualify easily for a $350/month loan payment but fail to anticipate $300/month marina slip rent, $100/month insurance, and $2,000 annual maintenance, leading to unexpected financial strain. Always budget for the complete Total Cost of Ownership.
            </p>
          </div>

          <div className="p-4 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200 dark:border-amber-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-amber-600 font-extrabold">✕</span>
              Skipping the Marine Survey on Used Vessels
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              Never purchase a used boat without an independent SAMS or NAMS accredited marine survey. Hidden transom rot, stringer delamination, blistered fiberglass, or corroded manifolds can cost tens of thousands of dollars to repair.
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/20 rounded-xl border border-emerald-200 dark:border-emerald-800 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span className="text-emerald-600 font-extrabold">✓</span>
              IRS Section 163(h) Second Home Tax Deduction
            </h3>
            <p className="text-slate-600 dark:text-slate-300">
              If your boat features a dedicated sleeping berth, onboard galley (stove/microwave), and marine head (toilet), it may legally qualify as a second home, allowing you to deduct loan interest from your federal income taxes.
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
          Click any question below to expand or collapse detailed guidance on boat loans, marine interest rates, surveys, and ownership costs.
        </p>

        <div className="space-y-3 pt-2">
          {boatLoanFaqs.map((faq, index) => {
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

      {/* 9. RELATED VEHICLE & LOAN CALCULATORS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 font-semibold text-xs tracking-wider uppercase">
          <BookOpen className="w-4 h-4" />
          <span>Related Marine &amp; Loan Calculators</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          9. Related Financial &amp; Vehicle Calculators
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <Link
            href="/calculators/auto-loan-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Auto Loan Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Model vehicle loan amortization, taxes, and monthly payments.</p>
          </Link>

          <Link
            href="/calculators/down-payment-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">Down Payment Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Evaluate upfront cash equity impact on marine interest savings.</p>
          </Link>

          <Link
            href="/calculators/loan-calculator"
            className="p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50 dark:hover:bg-blue-950/30 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors block space-y-1"
          >
            <div className="font-bold text-blue-600 dark:text-blue-400">General Loan Calculator</div>
            <p className="text-slate-600 dark:text-slate-300">Calculate custom amortization, payoff schedules, and early repayments.</p>
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
            <li><strong>Extended Amortization Increases Interest:</strong> Choosing 15-to-20-year terms lowers monthly payments but can result in paying nearly 100% of the boat value in interest charges.</li>
            <li><strong>Always Plan for the 10%–15% TCO:</strong> Factor in marina slip fees, marine insurance, routine maintenance, and seasonal winterization alongside monthly loan installments.</li>
            <li><strong>Mandatory Used Surveys:</strong> Protect yourself against catastrophic hull and structural defects by hiring a certified SAMS/NAMS surveyor before closing.</li>
            <li><strong>Second Home Tax Opportunities:</strong> Boats with living berths, galleys, and marine heads can qualify for mortgage interest tax deductions.</li>
          </ul>
        </div>
      </section>

    </article>
  );
}

export default BoatLoanContent;
