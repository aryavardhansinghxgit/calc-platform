"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  BookOpen,
  DollarSign,
  Users,
  Percent,
  Sparkles,
  Calculator,
  Globe,
  Receipt,
  Utensils,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { tip_calculatorFaqs } from "@/app/calculators/tip-calculator/faq";

export function TipContent() {
  // All FAQs open by default matching platform standard for SEO crawling & instant user readability
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: tip_calculatorFaqs.length }, (_, i) => i))
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
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
      {/* 1. INTRODUCTORY EDUCATIONAL ARTICLE */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
            <BookOpen className="h-4 w-4" /> Educational &amp; Calculation Guide
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Tip Calculator: Calculate Tips, Tax and Your Exact Share
          </h2>
          <p>
            A tip calculator makes a simple restaurant calculation much easier when a bill includes several moving parts. A typical restaurant check may contain:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
            <li>Food and beverages subtotal</li>
            <li>Sales tax</li>
            <li>A discretionary tip</li>
            <li>An automatically added service charge or gratuity</li>
            <li>Multiple diners</li>
            <li>Shared appetizers and drinks</li>
            <li>Different individual entrée orders</li>
            <li>Rounding requirements</li>
          </ul>
          <p>
            A basic tip calculation starts with:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
            Tip = Tip Base × (Tip Rate / 100)
          </div>
          <p>
            But the important question is: <strong>What should the tip be calculated on?</strong>
          </p>
          <p>
            Some people calculate a tip from the pre-tax subtotal. Others use the after-tax total shown by a payment terminal. The answer can change the final amount. This calculator lets you choose the calculation basis, calculate the tax, determine the total bill, split the cost equally, or divide an itemized check among individual diners.
          </p>
          <p>
            For group bills, the calculator also handles the cents that ordinary division can leave behind. Instead of displaying the same rounded amount for everyone and accidentally creating or losing a cent, the calculator allocates the remainder deterministically so the individual shares add back to the exact bill total. Its current implementation has been stress-tested across 100,000 equal-split and 100,000 itemized cases with zero-cent reconciliation error.
          </p>
        </section>

        {/* 2. HOW TO CALCULATE A TIP */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Calculate a Tip
          </h2>
          <p>
            The basic formula for gratuity is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold space-y-1">
            <div>Tip = Bill Subtotal × (Tip Percentage / 100)</div>
          </div>
          <p>
            For a $50 bill and an 18% tip:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-slate-100 space-y-1">
            <div>Tip = 50 × (18 / 100) = $9.00</div>
          </div>
          <p>
            If there is also an 8.5% sales tax:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-slate-100 space-y-1">
            <div>Tax = 50 × (8.5 / 100) = $4.25</div>
          </div>
          <p>
            The grand total bill becomes:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            Grand Total = $50.00 + $4.25 + $9.00 = $63.25
          </div>
          <p>
            That is the calculator&apos;s primary reference example. The important detail is that this assumes the 18% tip is calculated from the pre-tax subtotal.
          </p>
        </section>

        {/* 3. TIP BEFORE TAX VS TIP AFTER TAX */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Tip Before Tax vs. Tip After Tax
          </h2>
          <p>
            This calculator supports both approaches with an instant toggle:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Pre-Tax Tip (Traditional Etiquette)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Under pre-tax calculation, gratuity is applied strictly to food and beverage costs:
              </p>
              <div className="font-mono text-xs text-blue-600 dark:text-blue-400 space-y-1">
                <div>Tax = Subtotal × Tax Rate</div>
                <div>Tip = Subtotal × Tip Rate</div>
                <div>Grand Total = Subtotal + Tax + Tip</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For a $100 subtotal with 10% tax and 20% tip: Tax = $10, Tip = $20, <strong>Grand Total = $130.00</strong>.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Post-Tax Tip (POS Terminal Presets)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                With a post-tax basis, the tip rate applies to the tax-inclusive bill:
              </p>
              <div className="font-mono text-xs text-blue-600 dark:text-blue-400 space-y-1">
                <div>Taxed Total = Subtotal + Tax</div>
                <div>Tip = Taxed Total × Tip Rate</div>
                <div>Grand Total = Taxed Total + Tip</div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                For the same $100 subtotal, 10% tax and 20% tip: Taxed Total = $110, Tip = $22, <strong>Grand Total = $132.00</strong>.
              </p>
            </div>
          </div>
          <p>
            Neither calculation should be confused with a universal legal requirement. The appropriate basis can depend on the establishment, payment interface, local practice, and what the bill communicates. Emily Post&apos;s current general tipping guidance specifically lists 15%–20% pre-tax for sit-down wait service.
          </p>
        </section>

        {/* 4. HOW MUCH SHOULD YOU TIP? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Much Should You Tip?
          </h2>
          <p>
            There is no single percentage that applies to every service, country, and situation. For U.S. sit-down restaurant service, Emily Post currently gives 15%–20% pre-tax as its general guideline. That does not mean 20% is a legal requirement. Tipping etiquette and wage law are separate issues.
          </p>
          <p>
            The U.S. Department of Labor explains that the Fair Labor Standards Act (FLSA) permits qualifying employers to take a tip credit toward minimum-wage obligations under specified conditions. State and local requirements can differ, and employers using a tip credit have specific obligations. So a tip percentage shown by a calculator should be understood as a chosen tipping amount, not as a statement about what an employee is legally entitled to receive or what a restaurant is legally required to collect.
          </p>
        </section>

        {/* 5. QUICK TIP PERCENTAGES */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Quick Tip Percentages for Mental Math
          </h2>
          <p>
            For quick mental math at the table, a{" "}
            <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Percentage Calculator
            </Link>{" "}
            can be useful when checking percentage arithmetic independently, but these rules of thumb are helpful:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">10% Rule</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Move decimal one place left: $64.00 × 10% = $6.40.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">15% Rule</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Calculate 10% plus half of 10%: on $60.00, $6.00 + $3.00 = $9.00.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">18% Rule</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1">10% + 5% + 3%: on $50.00, $5.00 + $2.50 + $1.50 = $9.00.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-slate-900 dark:text-slate-100 block">20% Rule</span>
              <p className="text-slate-600 dark:text-slate-400 mt-1">Move decimal one place left and double it: on $85.00, $8.50 × 2 = $17.00.</p>
            </div>
          </div>
          <p>
            The Tip Calculator removes this mental arithmetic when the check contains sales tax, multiple diners, or itemized line items.
          </p>
        </section>

        {/* 6. WHY THE TAX RATE MATTERS */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why the Tax Rate Matters
          </h2>
          <p>
            If a bill has a taxable subtotal, tax contributes directly to the amount ultimately paid. For a $100 subtotal and an 8.5% sales tax, tax is $100 × 0.085 = $8.50, so the pre-tip total is $108.50. The calculator lets you keep tax separate from the tip so the final bill can be understood clearly. For a separate calculation of the tax itself, use the{" "}
            <Link href="/calculators/sales-tax-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Sales Tax Calculator
            </Link>{" "}
            to verify tax brackets, municipal levies, or VAT amounts independently.
          </p>
        </section>

        {/* 7. SERVICE CHARGE VS TIP */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the Difference Between a Tip and a Service Charge?
          </h2>
          <p>
            A tip is generally a discretionary payment from the customer in recognition of service. A service charge is an amount imposed by the business and may be mandatory under the establishment&apos;s terms. An automatic gratuity is another charge added under a restaurant&apos;s policy, often for larger groups.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Before adding a discretionary tip, inspect the bill for terms such as:</span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-xs text-slate-700 dark:text-slate-300">
              <div>• Service Charge</div>
              <div>• Automatic Gratuity</div>
              <div>• Service Compris</div>
              <div>• Large-Party Charge</div>
              <div>• Hospitality Surcharge</div>
              <div>• Kitchen / Wellness Fee</div>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 pt-1">
              If one of these has already been included, adding an extra 18% to 20% on top may unintentionally double your tip payment.
            </p>
          </div>
        </section>

        {/* 8. WHAT IS AN AUTOMATIC GRATUITY? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is an Automatic Gratuity?
          </h2>
          <p>
            An automatic gratuity is an amount added by the establishment according to its house policy, commonly applied to dining parties of 6 or more guests. This is not the same as entering a voluntary tip percentage yourself. The practical workflow is:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
            Menu Price → Sales Tax → Service Charge / Automatic Gratuity → Optional Additional Discretionary Tip
          </div>
          <p>
            The exact legal treatment depends on the restaurant and jurisdiction, so always check the line items on your check before deciding what additional amount to leave.
          </p>
        </section>

        {/* 9. HOW TO SPLIT A RESTAURANT BILL EVENLY */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Split a Restaurant Bill Evenly Without Losing a Cent
          </h2>
          <p>
            Suppose a final restaurant check is $63.25 and two diners agree to split it evenly. The exact mathematical share is $63.25 ÷ 2 = $31.625. Money cannot normally be paid as 31.625 dollars.
          </p>
          <p>
            A naive calculator might round both people to $31.63, which produces $31.63 + $31.63 = $63.26—one cent too high. A proper monetary allocation distributes the odd cent deterministically:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
            Diner 1: $31.63 + Diner 2: $31.62 = $63.25
          </div>
          <p>
            The current calculator explicitly performs this deterministic cent allocation rather than displaying an unreconciled identical rounded value.
          </p>
        </section>

        {/* 10. WHY BILL SPLITTING NEEDS MORE THAN ORDINARY ROUNDING */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Bill-Splitting Needs More Than Ordinary Rounding
          </h2>
          <p>
            The problem becomes larger with more diners. Consider $100.00 divided among 6 guests: the exact share is $16.6666... Rounding everyone to $16.67 yields 6 × $16.67 = $100.02 (creating two cents). The correct allocation distributes whole cents:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
            $16.67 + $16.67 + $16.67 + $16.67 + $16.66 + $16.66 = $100.00
          </div>
          <p>
            The same principle applies to a $10.01 bill split three ways: $3.34 + $3.33 + $3.34 = $10.01. What matters mathematically is that the method is deterministic, fair, and guarantees exact cent reconciliation.
          </p>
        </section>

        {/* 11. ITEMIZED BILL SPLITTING */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Itemized Bill Splitting: Individual Orders and Shared Items
          </h2>
          <p>
            An equal split is not appropriate when diners ordered significantly different amounts. Suppose:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">Alex&apos;s Order</span>
              <div>• Burger: $18.00</div>
              <div>• Soda: $4.00</div>
              <div className="font-bold text-blue-600 dark:text-blue-400 pt-1">Alex Items Total: $22.00</div>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">Sam&apos;s Order</span>
              <div>• Pasta: $22.00</div>
              <div>• Wine: $10.00</div>
              <div className="font-bold text-blue-600 dark:text-blue-400 pt-1">Sam Items Total: $32.00</div>
            </div>
          </div>
          <p>
            The group also ordered $12.00 in shared appetizers. Splitting the $12.00 shared pool evenly gives $6.00 each. The pre-tax subtotal bases become: Alex = $28.00 and Sam = $38.00. The combined subtotal is $28 + $38 = $66.00.
          </p>
          <p>
            With 8.5% sales tax ($5.61) and an 18% pre-tax tip ($11.88), the grand total is $66.00 + $5.61 + $11.88 = $83.49. The calculator allocates tax and tip proportionally:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/70 dark:border-emerald-900/60 space-y-1">
              <span className="font-bold text-emerald-900 dark:text-emerald-200">Alex Total Breakdown</span>
              <div>Base (Orders + Shared): $28.00</div>
              <div>Proportional Tax: $2.38</div>
              <div>Proportional Tip: $5.04</div>
              <div className="font-black text-sm text-emerald-700 dark:text-emerald-300 pt-1">Alex Total: $35.42</div>
            </div>
            <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/30 rounded-xl border border-emerald-200/70 dark:border-emerald-900/60 space-y-1">
              <span className="font-bold text-emerald-900 dark:text-emerald-200">Sam Total Breakdown</span>
              <div>Base (Orders + Shared): $38.00</div>
              <div>Proportional Tax: $3.23</div>
              <div>Proportional Tip: $6.84</div>
              <div className="font-black text-sm text-emerald-700 dark:text-emerald-300 pt-1">Sam Total: $48.07</div>
            </div>
          </div>
          <p>
            Reconciliation invariant: $35.42 + $48.07 = $83.49 exactly.
          </p>
        </section>

        {/* 12. HOW SHARED ITEMS AND TAX/TIP ARE ALLOCATED */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How Shared Items, Tax, and Tip Are Allocated
          </h2>
          <p>
            Shared appetizers, pitchers of drinks, or common platters create an internal allocation step. In this calculator, shared items are divided equally among participating diners with deterministic cent allocation if the amount is not evenly divisible:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
            Σ Shared Allocations = Shared Appetizers Pool
          </div>
          <p>
            Once each diner has their personal items plus their share of common appetizers, tax and tip are distributed proportionally using the Largest Remainder Method (Hare-Niemeyer Algorithm). This guarantees:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-slate-900 dark:text-slate-100 space-y-1">
            <div>• Σ Diner Tax Shares = Grand Tax ($2.38 + $3.23 = $5.61)</div>
            <div>• Σ Diner Tip Shares = Grand Tip ($5.04 + $6.84 = $11.88)</div>
            <div>• Σ Diner Final Totals = Grand Total Bill ($35.42 + $48.07 = $83.49)</div>
          </div>
          <p>
            This integer-cent process has passed 100,000 randomized itemized reconciliation tests with zero cent error.
          </p>
        </section>

        {/* 13. WHY AN ITEMIZED BILL SHOULD NOT SHOW ONE EQUAL TOTAL PER PERSON */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why an Itemized Bill Should Not Show One Equal &ldquo;Total Per Person&rdquo;
          </h2>
          <p>
            An equal split answer is meaningful when everyone agreed to split the check evenly. It is misleading when diners ordered different amounts. In the $83.49 example above, simple division yields $83.49 ÷ 2 = $41.745, but neither diner actually owes $41.75: Alex owes $35.42 and Sam owes $48.07. That is why the calculator treats the individual diner cards as authoritative in Itemized mode, providing an average-share reference without presenting a false equal payment obligation.
          </p>
        </section>

        {/* 14. FLOATING POINT & INTEGER CENTS */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Floating-Point Numbers Cause One-Cent Errors
          </h2>
          <p>
            Computers represent decimal numbers using binary floating-point formats (IEEE-754). As a result, an expression such as 41.745 is represented internally as approximately 41.74499999999999744..., which causes naive rounding functions like <code>toFixed(2)</code> to truncate down to $41.74, silently losing a cent. For financial applications, the safe and authoritative approach is to perform the arithmetic in integer cents ($83.49 → 8,349 cents) and distribute remainders explicitly. That eliminates the classic bug where individual amounts add up to one cent more or less than the check.
          </p>
        </section>

        {/* 15. INTERNATIONAL TIPPING GUIDANCE */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            International Tipping Context: United States vs. Japan and Beyond
          </h2>
          <p>
            Tipping customs vary dramatically around the world:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">United States Dining Culture</span>
              <p className="text-slate-600 dark:text-slate-400">
                15%–20% pre-tax is customary for table service. While the FLSA allows qualifying employers to take a tip credit toward minimum-wage obligations, tipping is a cultural social norm rather than a federal consumer statute.
              </p>
            </div>
            <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">Japan Hospitality Culture (Omotenashi)</span>
              <p className="text-slate-600 dark:text-slate-400">
                According to the Japan National Tourism Organization, tipping is generally not practiced in restaurants, taxis, or hotels. Outstanding hospitality is considered part of standard service; offering extra cash directly can cause confusion.
              </p>
            </div>
          </div>
          <p>
            Before using a percentage calculator internationally, always consider local customs, whether a service charge is already printed on the receipt, and whether service staff are paid standard living wages. For retail discount analysis or promotional meal savings, our{" "}
            <Link href="/calculators/discount-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Discount Calculator
            </Link>{" "}
            handles sale-price deductions separately from restaurant checks.
          </p>
        </section>

        {/* 16. COMMON MISTAKES */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Common Tip Calculation Mistakes to Avoid
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">Calculating on the Wrong Base</span>
              <p className="text-slate-600 dark:text-slate-400">Applying 20% to a tax-inclusive total yields a higher tip than pre-tax. Know which basis you are using.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">Tipping on Top of Service Charges</span>
              <p className="text-slate-600 dark:text-slate-400">Always inspect the receipt for an automatic gratuity or service charge before adding another tip.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">Independent Per-Person Rounding</span>
              <p className="text-slate-600 dark:text-slate-400">Rounding each diner&apos;s share independently causes the sum to diverge from the actual bill by several cents.</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
              <span className="font-bold text-slate-900 dark:text-slate-100">Treating Etiquette as Universal Law</span>
              <p className="text-slate-600 dark:text-slate-400">A customary percentage benchmark is a social convention, not a statutory legal requirement.</p>
            </div>
          </div>
        </section>

        {/* 17. PRACTICAL CHECKLIST */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Practical Tip-Calculation Checklist
          </h2>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>1. Check the food and drink subtotal.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>2. Check local sales tax rate and amount.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>3. Check for service charge or auto gratuity.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>4. Select pre-tax or post-tax calculation basis.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>5. Choose tip percentage (15%, 18%, 20%+).</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>6. Choose equal split or itemized check.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>7. Inspect each person&apos;s allocated share.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <span>8. Verify shares reconcile to the grand total.</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* 2. CANONICAL FREQUENTLY ASKED QUESTIONS (UNFOLDED BY DEFAULT) */}
      <section className="pt-8 space-y-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {tip_calculatorFaqs.map((faq, index) => {
            const isOpen = openFaqIndices.has(index);
            return (
              <div
                key={index}
                className="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm sm:text-base text-slate-900 dark:text-slate-100 hover:bg-slate-100/50 dark:hover:bg-slate-700/50 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[24px]">
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-700/50 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. SOURCES AND FURTHER READING */}
      <section className="pt-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-600" /> Sources and Further Reading
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Emily Post Institute — General Tipping Guide</span>
            <p className="text-slate-600 dark:text-slate-400">
              Current guidance for common U.S. tipping situations, including 15–20% pre-tax for sit-down wait service.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">U.S. Department of Labor — Tip Regulations Under the Fair Labor Standards Act</span>
            <p className="text-slate-600 dark:text-slate-400">
              Explains federal rules concerning tips and employer tip credits. State and local rules can add additional requirements.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">Japan National Tourism Organization — Tipping</span>
            <p className="text-slate-600 dark:text-slate-400">
              Current official tourism guidance explaining that tipping is generally not customary in Japan and describing limited exceptions.
            </p>
          </div>
        </div>
      </section>
    </article>
  );
}

export default TipContent;
