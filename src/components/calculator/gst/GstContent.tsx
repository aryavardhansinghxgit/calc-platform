"use client";

import React, { useState } from "react";
import {
  HelpCircle,
  Receipt,
  DollarSign,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Scale,
  Landmark,
  Building,
  ListOrdered,
  FileSpreadsheet,
} from "lucide-react";
import { gstFaqs } from "@/calculators/finance/gst/faq";

export function GstContent() {
  // All 20 FAQs open by default (401(k) / Pension / Business Loan standard)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: gstFaqs.length }, (_, i) => i))
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
      {/* 1. MAIN EDUCATIONAL BODY */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GST Calculator – Indian Goods &amp; Services Tax Calculator
          </h2>
          <p>
            Use this GST Calculator to calculate GST inclusive and exclusive prices, extract GST from a tax-inclusive amount, calculate reverse GST, and split GST into CGST, SGST/UTGST, or IGST depending on the type of supply. You can also calculate GST for multiple items with different rates and compare an illustrative Composition Scheme calculation.
          </p>
          <p>
            This calculator is designed for quick estimates and invoice planning. It applies the GST rate you enter; it does not determine the legally applicable HSN or SAC classification. GST treatment can depend on the exact goods or service, HSN/SAC classification, place of supply, exemption status, applicable notification, and effective date. Always verify the applicable rate and tax treatment against the current official GST provisions before issuing an invoice or filing a return. CBIC publishes GST rate schedules by tariff classification.
          </p>
        </section>

        {/* Section 2: What is GST? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What is GST?
          </h2>
          <p>
            Goods and Services Tax (GST) is an indirect tax charged on taxable supplies of goods and services in India. GST replaced several central and state indirect taxes with a destination-based tax framework administered through the CGST, SGST/UTGST, and IGST mechanisms.
          </p>
          <p>
            For a simple calculation, GST is expressed as a percentage of the taxable value.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 font-sans tabular-nums text-xs">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block">
              For example, at an 18% GST rate:
            </strong>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
              <li>Taxable value: <strong>₹10,000</strong></li>
              <li>GST: <strong>₹1,800</strong></li>
              <li>Invoice total: <strong>₹11,800</strong></li>
            </ul>
          </div>
          <p>
            The calculator performs the arithmetic automatically so you can work backward or forward from the amount you know.
          </p>
        </section>

        {/* Section 3: GST Calculator Modes */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GST Calculator Modes
          </h2>

          {/* Mode 1: Exclusive */}
          <div className="space-y-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              1. GST Exclusive Calculator
            </h3>
            <p>
              Use GST exclusive mode when the amount you enter is the price before GST.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs">
              GST = Taxable Value &times; GST Rate &divide; 100<br />
              Final Price = Taxable Value + GST
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 text-xs">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">Example</strong>
              <p className="text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                Suppose a service costs ₹10,000 before GST and attracts 18% GST:<br />
                ₹10,000 &times; 18% = ₹1,800 GST<br />
                ₹10,000 + ₹1,800 = ₹11,800 total<br />
                So the customer-facing amount is <strong>₹11,800</strong>.
              </p>
            </div>
          </div>

          {/* Mode 2: Inclusive */}
          <div className="space-y-2 pt-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              2. GST Inclusive Calculator
            </h3>
            <p>
              Use GST inclusive mode when the quoted or advertised price already contains GST.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs">
              Taxable Value = Gross Amount &divide; (1 + GST Rate &divide; 100)<br />
              GST = Gross Amount &minus; Taxable Value
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 text-xs">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">Example</strong>
              <p className="text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                For a GST-inclusive price of ₹11,800 at 18%:<br />
                ₹11,800 &divide; 1.18 = ₹10,000 taxable value<br />
                ₹11,800 &minus; ₹10,000 = ₹1,800 GST<br />
                This is useful when a business receives a total amount and needs to determine how much of that amount represents GST.
              </p>
            </div>
          </div>

          {/* Extracting GST */}
          <div className="space-y-2 pt-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              How to Calculate GST from a Tax-Inclusive Price
            </h3>
            <p>
              A common mistake is to calculate 18% of ₹11,800 and assume that amount is the GST included in the price. That is not the correct inclusive-GST calculation.
            </p>
            <p>
              When GST is already included, the tax portion is:
            </p>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs">
              GST = Inclusive Price &times; GST Rate &divide; (100 + GST Rate)
            </div>
            <p className="font-sans tabular-nums text-xs">
              At 18%:<br />
              GST = ₹11,800 &times; 18 &divide; 118 = <strong>₹1,800</strong><br />
              and: Taxable Value = ₹11,800 &minus; ₹1,800 = <strong>₹10,000</strong>.
            </p>
            <p>The calculator handles this extraction automatically.</p>
          </div>

          {/* Reverse GST */}
          <div className="space-y-2 pt-2">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Reverse GST Calculator
            </h3>
            <p>
              Reverse GST is useful when you know the GST amount paid or charged and want to determine the underlying taxable value.
            </p>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs">
              Taxable Value = GST Amount &divide; (GST Rate &divide; 100)
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 text-xs">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">Example</strong>
              <p className="text-slate-700 dark:text-slate-300 font-sans tabular-nums">
                GST paid = ₹1,800 | GST rate = 18%<br />
                ₹1,800 &divide; 0.18 = ₹10,000 taxable value<br />
                Total including GST: ₹10,000 + ₹1,800 = <strong>₹11,800</strong><br />
                This is particularly useful when reconstructing the taxable base from a known GST amount.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: CGST, SGST and IGST */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            CGST, SGST and IGST Calculator
          </h2>
          <p>
            The GST framework distinguishes between intra-State and inter-State supplies.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Landmark className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                Intra-State Supply
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                GST is generally divided between <strong>CGST + SGST</strong> (or CGST + UTGST where applicable).
              </p>
              <div className="font-mono text-[11px] text-purple-700 dark:text-purple-300 font-semibold">
                For 18%: CGST = 9% (₹900) + SGST = 9% (₹900)
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                Inter-State Supply
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Tax is generally charged as a single <strong>IGST</strong> levy.
              </p>
              <div className="font-mono text-[11px] text-blue-700 dark:text-blue-300 font-semibold">
                For 18%: IGST = 18% (₹1,800)
              </div>
            </div>
          </div>
          <p>
            The calculator uses the supplied GST rate and the selected supply type to show the corresponding tax-head split.
          </p>
        </section>

        {/* Section 5: Why the Correct Rate Matters */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GST Rate: Why the Correct Rate Matters
          </h2>
          <p>
            GST is not a single universal percentage. Rates depend on the classification of the goods or services and the applicable notification.
          </p>
          <p>
            The calculator therefore treats the rate as an input, rather than pretending that a broad category such as &ldquo;electronics,&rdquo; &ldquo;luxury,&rdquo; or &ldquo;basic goods&rdquo; automatically determines the correct legal rate.
          </p>
          <p>
            The current GST framework includes multiple rate categories and special rates. The GST Council&apos;s post-56th Council material records major rate changes effective from 22 September 2025, while certain specified products were subject to separate implementation provisions.
          </p>
          <p>
            The GST Council&apos;s published FAQ also confirms a <strong>40% GST rate</strong> for specified actionable claims, including betting, casinos, gambling, horse racing, lottery, and online money gaming, as well as 40% treatment for specified sporting-event admissions such as IPL.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 text-xs">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block">
              Classification Precaution
            </strong>
            <p className="text-slate-600 dark:text-slate-400">
              Do not select a GST rate merely because a product &ldquo;looks like&rdquo; a particular category. Verify its HSN/SAC classification and the applicable notification. CBIC&apos;s published schedules demonstrate that GST rates are linked to specific tariff headings and descriptions.
            </p>
          </div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Common GST Rate Inputs available in the calculator:
          </p>
          <div className="flex flex-wrap gap-2 text-xs font-mono">
            {["0% / Nil", "0.25%", "3%", "5%", "12%", "18%", "28%", "40%"].map((rate) => (
              <span key={rate} className="px-2.5 py-1 bg-slate-100 dark:bg-zinc-800 rounded-md border border-slate-200 dark:border-zinc-700">
                {rate}
              </span>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            These are calculation inputs, not automatic classification rules. For a real transaction, the correct rate must be established from the applicable HSN/SAC classification, notification, and supply conditions.
          </p>
        </section>

        {/* Section 6: Multi-Item GST Calculator */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Multi-Item GST Calculator
          </h2>
          <p>
            Real invoices often contain products or services with different GST rates. Instead of applying one rate to the entire invoice, calculate each line separately.
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">Item</th>
                  <th className="p-2.5 border-b">Quantity</th>
                  <th className="p-2.5 border-b">Unit Price</th>
                  <th className="p-2.5 border-b">GST Rate</th>
                  <th className="p-2.5 border-b">Taxable Value</th>
                  <th className="p-2.5 border-b">GST</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-2.5 font-medium">IT Services</td>
                  <td className="p-2.5">1</td>
                  <td className="p-2.5">₹25,000</td>
                  <td className="p-2.5">18%</td>
                  <td className="p-2.5">₹25,000</td>
                  <td className="p-2.5 font-semibold text-emerald-600">₹4,500</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Office Hardware</td>
                  <td className="p-2.5">2</td>
                  <td className="p-2.5">₹15,000</td>
                  <td className="p-2.5">12%</td>
                  <td className="p-2.5">₹30,000</td>
                  <td className="p-2.5 font-semibold text-emerald-600">₹3,600</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Other Goods</td>
                  <td className="p-2.5">1</td>
                  <td className="p-2.5">₹5,000</td>
                  <td className="p-2.5">28%</td>
                  <td className="p-2.5">₹5,000</td>
                  <td className="p-2.5 font-semibold text-emerald-600">₹1,400</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td colSpan={4} className="p-2.5 text-right">Total:</td>
                  <td className="p-2.5">₹60,000</td>
                  <td className="p-2.5 text-emerald-600">₹9,500</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="font-sans tabular-nums text-xs">
            Total invoice amount: ₹60,000 + ₹9,500 = <strong>₹69,500</strong>.<br />
            For an intra-State illustration: CGST = <strong>₹4,750</strong> | SGST = <strong>₹4,750</strong>.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            The important principle is that the calculation is performed line by line, not by blindly applying one GST rate to the entire invoice.
          </p>
        </section>

        {/* Section 7: GST Inclusive vs GST Exclusive */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GST Inclusive vs GST Exclusive
          </h2>
          <p>
            These two terms describe two completely different starting points:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">GST Exclusive</strong>
              <p className="text-slate-600 dark:text-slate-400">The displayed price does not include GST.</p>
              <div className="font-mono text-[11px] text-blue-700 dark:text-blue-300 font-semibold">
                ₹10,000 + 18% GST = ₹11,800
              </div>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">GST Inclusive</strong>
              <p className="text-slate-600 dark:text-slate-400">The displayed price already includes GST.</p>
              <div className="font-mono text-[11px] text-emerald-700 dark:text-emerald-300 font-semibold">
                ₹11,800 contains ₹10,000 Base + ₹1,800 GST
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            <strong>Why the distinction matters:</strong> Using the wrong formula can materially change an invoice calculation. For inclusive amounts, you divide by (1 + rate), rather than simply adding the percentage to the total.
          </p>
        </section>

        {/* Section 8: Compensation Cess */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Compensation Cess
          </h2>
          <p>
            Compensation Cess is not a universal GST charge. It applies only to specified supplies covered by the applicable law and notifications. CBIC&apos;s published compensation-cess material lists specified goods and corresponding cess structures.
          </p>
          <p>
            The calculator therefore treats compensation cess as an additional applicable input, rather than assuming that every GST transaction has cess.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 text-xs">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block">
              When entering cess, verify:
            </strong>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
              <li>Whether the supply is subject to compensation cess;</li>
              <li>The applicable cess rate or amount;</li>
              <li>The valuation basis;</li>
              <li>Any special rules applicable to that supply.</li>
            </ul>
          </div>
          <p className="text-xs text-slate-500">Do not add cess merely because a transaction attracts GST.</p>
        </section>

        {/* Section 9: GST Composition Scheme Calculator */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GST Composition Scheme Calculator
          </h2>
          <p>
            The calculator includes an illustrative Composition Scheme comparison for eligible small taxpayers.
          </p>
          <p>
            The Composition Scheme is an alternative method of paying GST for qualifying taxpayers, subject to statutory conditions. It is not simply a &ldquo;lower GST rate for every small business.&rdquo;
          </p>
          <p>
            Composition taxpayers operate under important restrictions, including restrictions relating to input tax credit and collection of tax from customers. CBIC&apos;s composition guidance explains the scheme and its eligibility framework.
          </p>
          <p>
            The calculator&apos;s Composition Scheme comparison should therefore be interpreted as an <em>illustrative financial comparison based on the values you enter</em>. It is not an eligibility determination. Actual eligibility depends on the taxpayer, turnover, nature of supplies, State/UT, applicable provisions, exclusions, and current notifications.
          </p>

          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 pt-2">
            Composition Scheme vs Regular GST
          </h3>
          <p>
            A regular GST taxpayer and a composition taxpayer can have very different tax economics. A simplified comparison can consider:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs">
            Composition tax <span className="font-sans font-bold">vs.</span> Regular output GST &minus; eligible input tax credit
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            A composition taxpayer generally does not operate like a regular taxpayer claiming normal ITC. Therefore, a numerical &ldquo;tax saving&rdquo; from the calculator should not be interpreted as guaranteed cash savings without considering pricing, input costs, customer type, eligibility, and compliance consequences. Use the Composition Scheme tool as a planning illustration, then verify the legal position before opting into the scheme.
          </p>
        </section>

        {/* Section 10: GST Calculation Formula */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GST Calculation Formula Summary
          </h2>
          <p>
            The core formulas used by the calculator are straightforward:
          </p>
          <div className="space-y-2 font-mono text-xs">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="block font-sans font-bold mb-1">GST on an exclusive amount:</strong>
              GST = Base &times; Rate &divide; 100
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="block font-sans font-bold mb-1">GST-inclusive total:</strong>
              Total = Base &times; (1 + Rate &divide; 100)
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="block font-sans font-bold mb-1">Extract taxable value from an inclusive total:</strong>
              Base = Total &divide; (1 + Rate &divide; 100)
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="block font-sans font-bold mb-1">Extract base from known GST:</strong>
              Base = GST &divide; (Rate &divide; 100)
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60">
              <strong className="block font-sans font-bold mb-1">Intra-State &amp; Inter-State Splits:</strong>
              Intra-State: CGST = Total GST &divide; 2 | SGST/UTGST = Total GST &divide; 2<br />
              Inter-State: IGST = Total GST
            </div>
          </div>
          <p className="text-xs text-slate-500">
            These equations explain the arithmetic performed by the calculator; determining whether a particular transaction is taxable, exempt, zero-rated, subject to reverse charge, or assigned a particular HSN/SAC classification requires separate legal analysis.
          </p>
        </section>

        {/* Section 11: Worked Example */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GST Calculation Example
          </h2>
          <p>
            Suppose you sell a service for <strong>₹50,000</strong> and the applicable GST rate is <strong>18%</strong>:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 font-sans tabular-nums text-xs">
            <div>
              <strong>Step 1: Calculate GST</strong><br />
              ₹50,000 &times; 18% = <strong>₹9,000</strong>
            </div>
            <div>
              <strong>Step 2: Calculate invoice total</strong><br />
              ₹50,000 + ₹9,000 = <strong>₹59,000</strong>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-zinc-700 flex flex-wrap gap-6">
              <div>
                <span className="text-slate-500 font-medium">Intra-State Split:</span><br />
                CGST = <strong>₹4,500</strong> | SGST = <strong>₹4,500</strong>
              </div>
              <div>
                <span className="text-slate-500 font-medium">Inter-State:</span><br />
                IGST = <strong>₹9,000</strong>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            This example demonstrates the arithmetic only. The actual GST rate must come from the classification applicable to the particular service.
          </p>
        </section>

        {/* Section 12: How to Use */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Use This GST Calculator
          </h2>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li><strong>Enter the amount:</strong> Type the transaction amount involved in your sale or purchase.</li>
            <li><strong>Choose calculation mode:</strong> Select GST Exclusive, GST Inclusive, or Reverse GST.</li>
            <li><strong>Enter the GST rate:</strong> Select a standard preset (5%, 12%, 18%, 28%, 40%) or enter a custom rate.</li>
            <li><strong>Select supply location:</strong> Choose intra-State (CGST + SGST) or inter-State (IGST).</li>
            <li><strong>Multi-Item Invoice:</strong> Use the Multi-Item Tax Invoice Builder tab to enter multiple line items with different rates.</li>
            <li><strong>Composition Planning:</strong> Enter turnover and input assumptions to review an illustrative comparison.</li>
          </ul>
        </section>

        {/* Section 13: Business Invoices */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GST Calculator for Business Invoices
          </h2>
          <p>
            This calculator can be useful for:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {[
              "Retail invoices",
              "Service invoices",
              "B2B pricing",
              "B2C price calculations",
              "GST-inclusive quotations",
              "GST-exclusive quotations",
              "Reverse GST calculations",
              "Multi-rate invoices",
              "CGST/SGST calculations",
              "IGST calculations",
              "Tax planning estimates",
              "Export planning",
            ].map((item) => (
              <div key={item} className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            For formal accounting, reconcile the result with the actual invoice, accounting records, and applicable GST rules.
          </p>
        </section>

        {/* Section 14: Classification Warning */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Important GST Classification Warning
          </h2>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 text-xs">
            <p>
              A calculator can perform the mathematics of GST extremely accurately while still being unable to answer the separate legal question: <em>&ldquo;What GST rate legally applies to this exact supply?&rdquo;</em>
            </p>
            <p className="font-semibold text-slate-900 dark:text-slate-100">
              That question may require:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300">
              <li>HSN classification for goods;</li>
              <li>SAC classification for services;</li>
              <li>Notification-based rate checking;</li>
              <li>Place-of-supply analysis;</li>
              <li>Exemption analysis;</li>
              <li>Special valuation rules;</li>
              <li>Reverse-charge analysis;</li>
              <li>Compensation-cess rules;</li>
              <li>Sector-specific provisions.</li>
            </ul>
            <p className="text-slate-600 dark:text-slate-400 pt-1">
              CBIC publishes GST rate schedules according to tariff classifications rather than simply according to broad consumer categories. Therefore, this calculator should be used to calculate, not to independently determine legal classification.
            </p>
          </div>
        </section>

        {/* Section 15: What Is the GST on ₹10,000? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is the GST on ₹10,000?
          </h2>
          <p>
            The answer depends on the GST rate:
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">GST Rate</th>
                  <th className="p-2.5 border-b">GST Amount (₹)</th>
                  <th className="p-2.5 border-b">Total Price (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                <tr>
                  <td className="p-2.5 font-bold text-blue-600">At 5%</td>
                  <td className="p-2.5">₹500.00</td>
                  <td className="p-2.5 font-semibold">₹10,500.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-indigo-600">At 12%</td>
                  <td className="p-2.5">₹1,200.00</td>
                  <td className="p-2.5 font-semibold">₹11,200.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-violet-600">At 18%</td>
                  <td className="p-2.5">₹1,800.00</td>
                  <td className="p-2.5 font-semibold">₹11,800.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-rose-600">At 28%</td>
                  <td className="p-2.5">₹2,800.00</td>
                  <td className="p-2.5 font-semibold">₹12,800.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-red-700 dark:text-red-400">At 40%</td>
                  <td className="p-2.5">₹4,000.00</td>
                  <td className="p-2.5 font-semibold">₹14,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            These are arithmetic examples only. The applicable percentage must be determined from the actual supply classification.
          </p>
        </section>

        {/* Section 16: Checklist */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            A Practical GST Calculation Checklist
          </h2>
          <p>
            Before relying on a GST calculation, confirm these items:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {[
              { num: "1", title: "Identify the supply", desc: "Determine exactly what is being sold or supplied." },
              { num: "2", title: "Determine the classification", desc: "Check the applicable HSN or SAC." },
              { num: "3", title: "Verify the GST rate", desc: "Use the current official rate schedule or notification." },
              { num: "4", title: "Determine the supply type", desc: "Check whether the supply is intra-State or inter-State." },
              { num: "5", title: "Check exemptions and special rules", desc: "Do not assume every supply is taxable at standard rate." },
              { num: "6", title: "Check cess or other components", desc: "Only add compensation cess where legally applicable." },
              { num: "7", title: "Calculate the invoice", desc: "Use exclusive, inclusive, or reverse mode as appropriate." },
              { num: "8", title: "Reconcile before invoicing", desc: "Ensure result agrees with accounting and tax records." },
            ].map((step) => (
              <div key={step.num} className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-0.5">
                <span className="font-bold text-blue-600 dark:text-blue-400 block text-xs">
                  {step.num}. {step.title}
                </span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px] block">{step.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 17: Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            GST Calculator Disclaimer
          </h2>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              Tax Compliance &amp; Estimation Notice
            </div>
            <p>
              This GST Calculator is an estimation and calculation tool. It does not constitute tax, legal, or accounting advice and does not determine HSN/SAC classification, GST registration status, exemption eligibility, reverse-charge applicability, place-of-supply treatment, or other statutory requirements.
            </p>
            <p>
              GST rates and rules can change through legislation, notifications, and GST Council decisions. For an actual invoice, return, or compliance decision, verify the current applicable provisions and classification from official government sources such as CBIC and the GST Council.
            </p>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION (20 FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {gstFaqs.map((faq, idx) => {
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

export default GstContent;
