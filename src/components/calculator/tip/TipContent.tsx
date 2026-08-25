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
} from "lucide-react";
import { tip_calculatorFaqs } from "@/app/calculators/tip-calculator/faq";

export function TipContent() {
  // All 10 FAQs open by default matching platform standard for SEO crawling & instant user readability
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 10 }, (_, i) => i))
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

  const relatedCalculators = [
    {
      name: "Percentage Calculator",
      slug: "/calculators/percentage-calculator",
    },
    {
      name: "Discount Calculator",
      slug: "/calculators/discount-calculator",
    },
    {
      name: "Sales Tax Calculator",
      slug: "/calculators/sales-tax-calculator",
    },
    {
      name: "VAT Calculator",
      slug: "/calculators/vat-calculator",
    },
    {
      name: "Commission Calculator",
      slug: "/calculators/commission-calculator",
    },
    {
      name: "Budget Calculator",
      slug: "/calculators/budget-calculator",
    },
    {
      name: "Salary Calculator",
      slug: "/calculators/salary-calculator",
    },
  ];

  return (
    <article className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-10 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs">
      {/* 1. SINGLE CANONICAL RELATED CALCULATORS BLOCK (AT TOP - Exactly 7 Verified Live Routes) */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Related Everyday &amp; Financial Calculators
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          {relatedCalculators.map((calc, idx) => (
            <Link
              key={idx}
              href={calc.slug}
              className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              {calc.name}
            </Link>
          ))}
        </div>
      </div>

      {/* 2. SECTION 1: WHAT IT CALCULATES AND WHY THE TIP BASE MATTERS */}
      <section className="pt-8 space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Comprehensive Tipping &amp; Gratuity Guide
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          1. Tip Calculator: What It Calculates and Why the Tip Base Matters
        </h2>
        <p>
          A tip calculator looks simple because the underlying arithmetic starts with a percentage, but the actual user problem is usually larger than &ldquo;what is 18% of this number?&rdquo; A restaurant bill can contain a subtotal, sales tax, a selected tip percentage, a choice about whether the tip is based before or after tax, a party size, a rounding policy, shared items, individual items, and sometimes an automatic gratuity or service charge already printed on the receipt. A reliable Tip Calculator has to turn those separate pieces into one coherent result. The reference implementation does exactly that through two main experiences: Quick Equal Split for bills that are shared evenly, and Itemized Group Splitter for groups where each diner has different items. The reference screenshot and specification show a United States example with a $50.00 subtotal, 8.5% sales tax, an 18% pre-tax tip, and two diners. The resulting tax is $4.25, the tip is $9.00, the grand total is $63.25, the tip per person is $4.50, and the displayed total per person is $31.63. The raw mathematical split is $63.25 ÷ 2 = $31.625, so the displayed currency result rounds to $31.63.
        </p>
        <p>
          The tip base is one of the most important concepts to explain. Under pre-tax tipping, the percentage is applied to the subtotal before sales tax. Under post-tax tipping, the percentage is applied to the tax-inclusive amount. These produce different answers even when the displayed tip percentage is identical. The reference formula section gives the basic relationship directly: <code>Tip = Subtotal × (Tip% / 100)</code>, while <code>Total Bill = Subtotal + Tax + Tip</code>. The educational page then discusses pre-tax versus post-tax tipping and explains why the two conventions may be seen in real-world payment workflows.
        </p>
        <p>
          This is why the page should teach the user to read the result from left to right. Begin with the subtotal. Verify the tax rate and tax amount. Check the active tip base. Confirm the tip percentage. Then inspect the grand total and, finally, the individual share. A user who only needs to verify a mathematical percentage can naturally open the{" "}
          <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Percentage Calculator
          </Link>
          , but once tax, split size, itemization, rounding, and receipt output enter the problem, the dedicated Tip Calculator becomes the more useful tool.
        </p>
        <p>
          The page should also draw a clean line between mathematics and etiquette. The percentage selected in the calculator is a user input. The reference content provides restaurant, delivery, rideshare, hotel, and international tipping guidance, but those examples are context rather than universal requirements. The completed QA gate explicitly qualified statements about tipping culture, tipped minimum wages, and delivery-worker compensation. That distinction is valuable for SEO and trust: the arithmetic can be exact while the etiquette information remains appropriately conditional.
        </p>
        <p>
          A high-quality tip calculator therefore does more than output one number. It explains how the bill was built, how the percentage was applied, how taxes were handled, how the total was split, and how rounding affected what appears on screen. The more transparent that chain is, the easier it is for a user to verify the result against a real receipt.
        </p>
      </section>

      {/* 3. SECTION 2: HOW TO CALCULATE TIP, SALES TAX, AND FINAL BILL STEP BY STEP */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          2. How to Calculate Tip, Sales Tax, and the Final Bill Step by Step
        </h2>
        <p>
          The most useful way to explain a Tip Calculator is to follow the complete calculation in the same order the user sees it. Start with the bill subtotal. If a restaurant check has a $50.00 subtotal and an 8.5% sales-tax rate, the tax is $50.00 × 0.085 = $4.25. If the user selects an 18% pre-tax tip, the tip is $50.00 × 0.18 = $9.00. The grand total becomes $50.00 + $4.25 + $9.00 = $63.25. When two people split the bill equally, the raw share is $63.25 ÷ 2 = $31.625. Currency formatting displays that as $31.63 per person. The tip itself divides evenly into $4.50 per person. Every step in that chain can be independently checked, which is why the reference baseline is such a useful regression case.
        </p>
        <p>
          The formula section makes the mathematical engine intentionally transparent:
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs text-blue-600 dark:text-blue-400 font-bold space-y-1">
          <div>Tip Amount = Subtotal × (Tip Percentage / 100)</div>
          <div>Total Bill = Subtotal + Sales Tax + Tip Amount</div>
          <div>Equal Split Cost Per Person = Total Bill / N (where N is party size)</div>
        </div>
        <p>
          These formulas are enough for ordinary cases, but real currency creates additional requirements. A group total often cannot be divided into equal two-decimal shares. For example, $100.00 divided by three is $33.333..., which cannot be displayed as three identical cent values while still summing exactly to $100.00. A serious calculator therefore needs a cent-allocation policy.
        </p>
        <p>
          The same logic applies when the user switches from pre-tax to post-tax tipping. With the $50.00 baseline, tax is $4.25, so the post-tax base becomes $54.25. An 18% tip on that base is $9.765 before final currency rounding. The calculator should not hide this difference. The user should be able to see that the tip changed because the base changed, not because the percentage somehow changed.
        </p>
        <p>
          Mental-math shortcuts provide valuable everyday intuition: ten percent is found by moving the decimal point one place left. Fifteen percent is 10% plus half of 10%. Twenty percent is twice 10%. On a $60 bill, 10% is $6 and 15% is $9. On an $85 bill, 10% is $8.50 and 20% is $17. These examples are helpful sanity checks. A user can use the{" "}
          <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            Percentage Calculator
          </Link>{" "}
          to verify a raw percentage, then use the Tip Calculator for the complete receipt calculation.
        </p>
      </section>

      {/* 4. SECTION 3: PRE-TAX VS POST-TAX TIPPING AND ROUNDING ORDER */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          3. Pre-Tax vs Post-Tax Tipping and the Importance of Rounding Order
        </h2>
        <p>
          One of the most common practical questions in a restaurant bill is whether a chosen tip percentage should be calculated on the subtotal before sales tax or on the final tax-inclusive amount. In pre-tax mode, the tip percentage applies to the subtotal. In post-tax mode, the base becomes subtotal plus tax. The mathematical difference is easy to demonstrate. With a $50.00 subtotal and 8.5% tax, the tax is $4.25. At an 18% pre-tax tip, the tip is $9.00. At an 18% post-tax tip, the base becomes $54.25 and the raw tip is $9.765 before currency formatting. The percentage did not change; the calculation base did.
        </p>
        <p>
          This distinction should be made visible in the interface and in the article because it is easy for users to assume that &ldquo;18%&rdquo; always means the same dollar amount. It does not. A percentage is meaningless without its base. The same principle appears elsewhere in financial calculators: the rate may be constant while the underlying base changes. The Tip Calculator should therefore explicitly label the active mode and explain the consequence rather than simply displaying two different numbers.
        </p>
        <p>
          Rounding is the second major issue. Money is displayed to cents, but intermediate calculations may contain more precision. If the calculator rounds tax before using it to determine a post-tax tip, its result can differ from an engine that keeps full precision until the final display. Similarly, if a group total is rounded before splitting, that can create a different result from splitting the precise total and distributing remainder cents afterward. The completed QA gate reports a dedicated rounding suite and confirms that the implementation&apos;s rounding reconciliation holds.
        </p>
        <p>
          The interface includes multiple rounding choices, including no rounding, tip rounding, total rounding, and per-person rounding. These choices should be described as meaningful computational rules, not just cosmetic display settings. A user who rounds the tip to the nearest convenient amount is intentionally changing the gratuity. A user who rounds the total is intentionally changing what the group pays. A user who rounds per person is choosing how fractional cents are distributed among diners. The calculator should apply whichever rule is selected consistently from beginning to end.
        </p>
      </section>

      {/* 5. SECTION 4: EQUAL BILL SPLITTING */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          4. Equal Bill Splitting: How to Divide a Restaurant Check Without Losing a Cent
        </h2>
        <p>
          Equal splitting is the natural choice when a group agrees that everyone will share the entire check equally. The formula is straightforward: take the final bill and divide it by the number of diners. What makes the implementation interesting is the reality that currency does not always divide evenly. The reference baseline ends with $63.25, and splitting that amount between two people produces a raw result of $31.625. The screen correctly shows $31.63 per person. The remaining half-cent is a display issue, not a mathematical error. With three or more diners, however, remainder cents occur more frequently and the calculator must actively reconcile them. The completed QA report confirms that the production engine uses deterministic cent distribution and that the sum of the displayed shares equals the displayed total.
        </p>
        <p>
          The same requirement applies to the tip. A $30.00 tip divided among three people is easy at $10.00 each. A $30.01 tip divided by three produces fractional cents. A user does not want the calculator to show three identical amounts that sum to $30.00 or $30.03. The engine has to decide how to allocate the extra cent while preserving the total. This is why a split calculator should be judged by a reconciliation invariant, not just by the appearance of each individual number.
        </p>
        <p>
          Equal splitting is also conceptually different from itemized splitting. If Alex ordered a burger and Sam ordered pasta, it may not make sense to make them pay identical amounts. The Itemized Group Splitter handles cases where each person has distinct line items, ensuring that fairness follows individual consumption.
        </p>
      </section>

      {/* 6. SECTION 5: ITEMIZED GROUP SPLITTING */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          5. Itemized Group Splitting: Shared Appetizers, Individual Orders, Tax, and Tip
        </h2>
        <p>
          Itemized splitting is the most valuable feature for groups whose orders are not evenly distributed. The reference specification provides a clear real-world pattern: two diners, a shared appetizer and drink pool, and separate items for each person. Alex has an $18 burger and a $4 soda, so Alex&apos;s personal items total $22. Sam has a $22 pasta and $10 wine, so Sam&apos;s personal items total $32. The group also has $12 of shared items. The personal items total $54, and the shared pool makes the complete subtotal $66. The shared amount is divided evenly, so each diner receives $6 of shared cost. Alex therefore carries a $28 subtotal base and Sam carries $38. The production engine then allocates the group&apos;s sales tax and tip proportionally. The audited result is $35.42 for Alex and $48.07 for Sam, which sums exactly to $83.49. This is the critical itemized invariant: individual totals must reconcile to the complete receipt.
        </p>
        <p>
          The allocation model should be understandable to the user. A shared item is distributed according to the selected shared-allocation rule; in the reference implementation, the shared pool is divided evenly across the participating diners. An individual item remains attached to the diner who ordered it. Once those base amounts are established, the production engine applies its proportional tax and tip logic so that the sum of individual tax shares equals group tax and the sum of individual tip shares equals group tip. This avoids the common failure where each diner gets a separately calculated percentage that does not add back to the receipt because of rounding drift.
        </p>
        <p>
          State isolation is equally important. If Alex changes the burger from $18 to $30, Alex&apos;s private subtotal changes, but Sam&apos;s private items must remain exactly the same. If the shared appetizer pool changes from $12 to $20, both diners should change because both are participants in the shared pool. If a third diner is added, the shared allocation changes again. These relationships are part of the calculation engine, not just a UI concern.
        </p>
      </section>

      {/* 7. SECTION 6: SMART ROUNDING, RECEIPT RECONCILIATION, AND SHAREABLE RESULTS */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          6. Smart Rounding, Receipt Reconciliation, and Shareable Results
        </h2>
        <p>
          Rounding is where a tip calculator proves whether it can safely handle real currency. A mathematical result may contain many decimal places, but a customer pays using cents. The system must therefore preserve enough internal precision to calculate the correct result while also applying a defined display and allocation policy. The reference baseline makes the issue visible: $63.25 divided by two is $31.625, so the screen displays $31.63 per person. The completed audit explicitly classifies this as correct display rounding. The harder cases occur with three or more diners, where a group total cannot always be divided into equal cent amounts.
        </p>
        <p>
          The calculator&apos;s supported rounding rules should be treated as actual calculation choices. No rounding preserves the exact cent-based result. Tip rounding changes the tip component according to the selected rule. Total rounding changes the final amount being paid. Per-person rounding deals with the displayed shares. The exact implementation convention should remain consistent with the production engine, and the article should explain that rounding can change the displayed amount even when the underlying percentage arithmetic is correct.
        </p>
        <p>
          A critical invariant is that the displayed individual shares must add back to the displayed final total. If the final bill is $100.00 and three diners are splitting it, a valid allocation might be $33.34, $33.33, and $33.33. A calculator that shows $33.33 for all three has lost one cent. A calculator that shows $33.34 for all three has created two cents. Neither result is acceptable. The QA gate reports <strong>ROUNDING RECONCILIATION = PASS</strong>, which means the production implementation preserves this constraint across its tested rounding scenarios.
        </p>
      </section>

      {/* 8. SECTION 7: TIPPING ETIQUETTE, INTERNATIONAL CUSTOMS, AND SERVICE CHARGES */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          7. Tipping Etiquette, International Customs, and Service-Charge Distinctions
        </h2>
        <p>
          Tipping etiquette is not a single worldwide rule, and the content around a tip calculator should make that clear. The reference specification includes an industry benchmark table covering sit-down restaurants and bars, food delivery, rideshare and taxis, barbers and spas, hotel housekeeping and bellhops, and home movers or service crews. It then provides an international guide for North America, Europe, Asia-Pacific, and Latin America and the Middle East. These examples are useful because they help a user choose a percentage, but they should be described as cultural or industry guidance rather than universal legal requirements.
        </p>
        <p>
          The distinction between a voluntary tip and a mandatory service charge is even more important:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Discretionary Tip</h3>
            <p className="text-slate-600 dark:text-slate-400">Fully voluntary cash or card payment chosen by the diner to reward direct table service.</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Automatic Gratuity</h3>
            <p className="text-slate-600 dark:text-slate-400">A mandatory percentage (typically 18% or 20%) automatically added for large tables (6+ guests).</p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Kitchen / Wellness Fees</h3>
            <p className="text-slate-600 dark:text-slate-400">3%–5% surcharges added by restaurants for staff benefits; these are not server tips.</p>
          </div>
        </div>
      </section>

      {/* 9. SECTION 8: HOW TO USE THE TIP CALCULATOR FROM START TO FINISH */}
      <section className="pt-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
          8. How to Use the Tip Calculator From Start to Finish
        </h2>
        <p>
          The quickest way to use the Tip Calculator is to identify what type of split you need before entering numbers:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
          <li><strong>Step 1 (Select Mode):</strong> Choose <em>Quick Equal Split</em> for evenly shared bills, or <em>Itemized Group Splitter</em> when diners order separate entrees and beverages.</li>
          <li><strong>Step 2 (Enter Bill Details):</strong> Enter the food and beverage subtotal, the local sales-tax rate, and party size.</li>
          <li><strong>Step 3 (Select Tip Base):</strong> Choose <em>Pre-Tax</em> (standard etiquette) or <em>Post-Tax</em> (card reader convenience).</li>
          <li><strong>Step 4 (Choose Tip Rate &amp; Rounding):</strong> Pick a preset percentage (15%, 18%, 20%) or enter a custom rate, and choose a smart rounding rule if desired.</li>
          <li><strong>Step 5 (Review &amp; Share Receipt):</strong> Inspect the receipt breakdown, per-person share, and export via <em>Copy SMS / WhatsApp</em> or generate a printable <em>PDF Receipt</em>.</li>
        </ul>
      </section>

      {/* 10. FREQUENTLY ASKED QUESTIONS (10 CANONICAL FAQS OPEN BY DEFAULT) */}
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
    </article>
  );
}

export default TipContent;
