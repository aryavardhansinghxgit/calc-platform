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
  Globe,
  Layers,
  FileSpreadsheet,
  BookOpen,
} from "lucide-react";
import { vatFaqs } from "@/calculators/finance/vat/faq";

export function VatContent() {
  // All 18 FAQs open by default (matching 401(k) standard)
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: vatFaqs.length }, (_, i) => i))
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
      {/* 1. MAIN EDUCATIONAL CONTENT */}
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        
        {/* Section 1: Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            VAT Calculator – Global Value-Added Tax Estimator
          </h2>
          <p>
            Use this VAT calculator to calculate VAT-inclusive and VAT-exclusive prices, work backward from a tax-inclusive amount, determine the VAT amount, and compare VAT with retail sales tax. The calculator also includes a multi-stage supply-chain model and a global VAT/GST rate directory for common reference rates.
          </p>
          <p>
            A VAT calculation is usually straightforward mathematically, but the tax treatment of an actual transaction can be much more complicated. Countries and jurisdictions may have different standard, reduced, zero-rated, exempt, or special rates, and the applicable rate can depend on the product, service, customer, location, and place-of-supply rules. Use the calculator to estimate the arithmetic from a stated rate; verify the legal rate and tax treatment with the relevant tax authority before invoicing or filing a return.
          </p>
        </section>

        {/* Section 2: What Is VAT? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is VAT?
          </h2>
          <p>
            Value-added tax (VAT) is an indirect consumption tax charged through the supply chain. In a typical VAT system, businesses charge VAT on taxable sales and may recover eligible VAT paid on business purchases through an input-tax mechanism. This means VAT can be collected at multiple stages while the economic burden ultimately falls largely on the final consumer.
          </p>
          <p>The basic distinction is important:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-700 dark:text-slate-300">
            <li><strong>Output VAT</strong> is VAT charged on a business&apos;s taxable sales.</li>
            <li><strong>Input VAT</strong> is VAT paid by the business on qualifying purchases.</li>
            <li><strong>Net VAT payable</strong> is generally related to output VAT minus allowable input tax credits, subject to the rules of the relevant jurisdiction.</li>
          </ul>
          <p>
            The exact recovery rules differ by country. For example, Australia&apos;s GST system allows registered businesses to claim credits for eligible GST included in business purchases, while UAE guidance distinguishes recoverable input VAT on taxable activities from costs associated with exempt supplies.
          </p>
        </section>

        {/* Section 3: Inclusive vs Exclusive */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            VAT Inclusive vs. VAT Exclusive
          </h2>
          <p>
            One of the most common VAT mistakes is confusing a VAT-exclusive price with a VAT-inclusive price.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1.5">
                <Receipt className="h-4 w-4" />
                VAT-Exclusive Price
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A VAT-exclusive price is the amount before VAT. For example, with a net price of £1,200 and a VAT rate of 20%:
              </p>
              <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-slate-200 dark:border-zinc-700 space-y-1 text-slate-900 dark:text-slate-100">
                <div>VAT = £1,200 &times; 20% = <strong>£240</strong></div>
                <div>Gross price = £1,200 + £240 = <strong>£1,440</strong></div>
              </div>
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Net = £1,200 | VAT = £240 | Gross = £1,440
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
              <h3 className="font-bold text-emerald-600 dark:text-emerald-400 text-sm flex items-center gap-1.5">
                <DollarSign className="h-4 w-4" />
                VAT-Inclusive Price
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                A VAT-inclusive price already contains VAT. You cannot simply multiply the gross price by the VAT rate to find the VAT portion. At 20% VAT:
              </p>
              <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-slate-200 dark:border-zinc-700 space-y-1 text-slate-900 dark:text-slate-100">
                <div>Net = Gross &divide; 1.20</div>
                <div>VAT = Gross &minus; Net</div>
                <div className="pt-1 text-slate-600 dark:text-slate-400">For a £1,440 VAT-inclusive price:</div>
                <div>Net = £1,440 &divide; 1.20 = <strong>£1,200</strong></div>
                <div>VAT = £1,440 &minus; £1,200 = <strong>£240</strong></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            HMRC explicitly describes this distinction and uses a VAT fraction of 20/120, or one-sixth, for extracting VAT from a 20%-inclusive price.
          </p>
        </section>

        {/* Section 4: VAT Formula */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            VAT Formula
          </h2>
          <p>
            The calculator uses the standard arithmetic relationship between the net amount, VAT rate, VAT amount, and gross amount:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 text-xs block">VAT from Net Price:</span>
              <div className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                VAT = Net &times; (Rate / 100)
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 text-xs block">Gross from Net Price:</span>
              <div className="font-mono text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                Gross = Net &times; (1 + Rate / 100)
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 text-xs block">Net from Gross Price:</span>
              <div className="font-mono text-xs text-purple-600 dark:text-purple-400 font-bold">
                Net = Gross / (1 + Rate / 100)
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-slate-900 dark:text-zinc-100 text-xs block">VAT from Inclusive Price:</span>
              <div className="font-mono text-xs text-amber-600 dark:text-amber-400 font-bold">
                VAT = Gross &minus; Net
              </div>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 sm:col-span-2 md:col-span-2">
              <span className="font-bold text-slate-900 dark:text-zinc-100 text-xs block">Implied VAT Rate:</span>
              <div className="font-mono text-xs text-blue-600 dark:text-blue-400 font-bold">
                Rate = (VAT / Net) &times; 100
              </div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            These equations allow the calculator to solve different combinations of known values rather than requiring the user to enter every field.
          </p>
        </section>

        {/* Section 5: How to Calculate VAT */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Calculate VAT
          </h2>
          <p>
            Suppose a product costs <strong>£1,200</strong> before VAT and the VAT rate is <strong>20%</strong>.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 font-mono text-xs">
            <div>Step 1: Calculate the tax &rarr; £1,200 &times; 0.20 = <strong>£240</strong></div>
            <div>Step 2: Add VAT to net price &rarr; £1,200 + £240 = <strong>£1,440</strong></div>
          </div>
          <p>
            The final invoice amount is therefore <strong>£1,440 including VAT</strong>, the VAT component is <strong>£240</strong>, and the pre-VAT amount is <strong>£1,200</strong>. This is the basic VAT-exclusive calculation.
          </p>
        </section>

        {/* Section 6: How to Remove VAT */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How to Remove VAT From a VAT-Inclusive Price
          </h2>
          <p>
            Suppose you are given a final price of <strong>£1,440</strong> including 20% VAT.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2 text-xs">
            <div className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              Common Mistake: Do NOT calculate £1,440 &times; 20% (= £288). That produces £288, which is NOT the VAT contained in the £1,440 total.
            </div>
            <div className="font-mono pt-1 text-slate-800 dark:text-slate-200 space-y-1">
              <div>Correct Method: Net = £1,440 / 1.20 = <strong>£1,200</strong></div>
              <div>Then: VAT = £1,440 &minus; £1,200 = <strong>£240</strong></div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            So a £1,440 VAT-inclusive price contains <strong>£1,200 net price + £240 VAT</strong>. This is why VAT-inclusive calculations use a tax fraction, rather than simply multiplying the final price by the percentage rate. HMRC gives the same principle for UK VAT-inclusive prices.
          </p>
        </section>

        {/* Section 7: Reverse VAT */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            What Is Reverse VAT?
          </h2>
          <p>
            Reverse VAT calculation means starting with a VAT-inclusive price and working backward to determine:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>The VAT-exclusive price</li>
            <li>The VAT amount</li>
            <li>The effective tax fraction</li>
          </ul>
          <p>
            For a VAT rate of <em>r</em> (where <em>r</em> is the decimal rate):
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs space-y-1">
            <div>Net = Gross / (1 + r)</div>
            <div>VAT = Gross &minus; Net</div>
            <div className="pt-2 border-t border-slate-200 dark:border-zinc-700 grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
              <div>At 20% VAT: Net = Gross / 1.20</div>
              <div>At 10% VAT: Net = Gross / 1.10</div>
              <div>At 5% VAT: Net = Gross / 1.05</div>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            The higher the VAT rate, the larger the tax portion embedded in a VAT-inclusive amount.
          </p>
        </section>

        {/* Section 8: VAT Calculation Example */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            VAT Calculation Example
          </h2>
          <p>
            Consider a product with a VAT-exclusive price of <strong>€2,500</strong> and a VAT rate of <strong>19%</strong>:
          </p>
          <div className="font-mono text-xs p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
            <div>VAT: €2,500 &times; 0.19 = <strong>€475</strong></div>
            <div>Gross: €2,500 + €475 = <strong>€2,975</strong></div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 font-semibold">
                  <th className="p-2.5">Component</th>
                  <th className="p-2.5 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 font-sans tabular-nums text-[11px]">
                <tr>
                  <td className="p-2.5 font-medium">Net price</td>
                  <td className="p-2.5 text-right font-bold text-slate-900 dark:text-slate-100">€2,500</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">VAT at 19%</td>
                  <td className="p-2.5 text-right font-bold text-purple-600">€475</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold">Gross price</td>
                  <td className="p-2.5 text-right font-bold text-emerald-600">€2,975</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            To reverse the calculation: €2,975 &divide; 1.19 = €2,500, and €2,975 &minus; €2,500 = €475. The calculator returns to the original amount after an exclusive &rarr; inclusive &rarr; exclusive round trip, subject to normal currency rounding.
          </p>
        </section>

        {/* Section 9: VAT on an Invoice */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            VAT on an Invoice
          </h2>
          <p>
            A simple VAT invoice calculation usually separates the taxable amount from the tax:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-sans tabular-nums text-xs space-y-1">
            <div className="flex justify-between"><span>Net goods:</span><strong>£5,000</strong></div>
            <div className="flex justify-between"><span>VAT rate:</span><strong>20%</strong></div>
            <div className="flex justify-between"><span>VAT amount:</span><strong className="text-purple-600">£1,000</strong></div>
            <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-zinc-700 font-bold">
              <span>Invoice total:</span><span className="text-emerald-600">£6,000</span>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            The business records £5,000 as the VAT-exclusive taxable amount and £1,000 as VAT charged. Actual invoice requirements vary by jurisdiction. For example, HMRC&apos;s VAT guidance specifies information that must appear on VAT invoices and explains when full VAT invoices are required.
          </p>
        </section>

        {/* Section 10: VAT vs GST vs Sales Tax */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            VAT, GST and Sales Tax Are Not the Same Thing
          </h2>
          <p>
            VAT, GST and retail sales tax are all forms of consumption taxation, but their mechanics differ:
          </p>
          <div className="space-y-3">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-xs uppercase tracking-wider">
                VAT / GST (Multi-Stage)
              </span>
              <p className="text-slate-700 dark:text-slate-300">
                A VAT or GST system generally operates through multiple stages of production and distribution. Businesses charge tax on taxable supplies and may receive input-tax credits for eligible purchases. Australia&apos;s GST system, for example, applies a 10% GST to most goods and services and generally allows registered businesses to claim credits for GST included in eligible business purchases.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
              <span className="font-bold text-amber-600 dark:text-amber-400 block text-xs uppercase tracking-wider">
                Retail Sales Tax (Single-Stage)
              </span>
              <p className="text-slate-700 dark:text-slate-300">
                A traditional retail sales tax is generally imposed on the final retail sale rather than being collected through every stage using an input-credit mechanism. The United States is a particularly important example: there is no nationwide federal VAT. State and local sales taxes apply at jurisdictional levels, and the applicable rate depends on location and transaction rules. IRS guidance distinguishes state and local general sales taxes and shows that local rates can vary significantly.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            Therefore, this calculator&apos;s VAT vs. Sales Tax comparison is an educational comparison of tax mechanisms, not a statement that the two systems are legally interchangeable.
          </p>
        </section>

        {/* Section 11: Supply Chain Model */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why Input Tax Credits Matter
          </h2>
          <p>
            Consider a simplified four-stage supply chain:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>Producer adds £10 of value.</li>
            <li>Manufacturer adds £15.</li>
            <li>Wholesaler adds £15.</li>
            <li>Retailer adds £20.</li>
          </ul>
          <p>
            Total value added: £10 + £15 + £15 + £20 = <strong>£60</strong>. At a 20% VAT rate, final consumer VAT is £60 &times; 20% = <strong>£12</strong>.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 font-semibold">
                  <th className="p-2.5">Stage</th>
                  <th className="p-2.5 text-right">Value Added</th>
                  <th className="p-2.5 text-right">Net Sale</th>
                  <th className="p-2.5 text-right">Output VAT</th>
                  <th className="p-2.5 text-right">Input Credit</th>
                  <th className="p-2.5 text-right">Net VAT Remitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 font-sans tabular-nums text-[11px]">
                <tr>
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">Producer</td>
                  <td className="p-2.5 text-right">£10</td>
                  <td className="p-2.5 text-right text-blue-600">£10</td>
                  <td className="p-2.5 text-right">£2</td>
                  <td className="p-2.5 text-right text-slate-400">£0</td>
                  <td className="p-2.5 text-right text-emerald-600 font-bold">£2</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">Manufacturer</td>
                  <td className="p-2.5 text-right">£15</td>
                  <td className="p-2.5 text-right text-blue-600">£25</td>
                  <td className="p-2.5 text-right">£5</td>
                  <td className="p-2.5 text-right text-slate-400">£2</td>
                  <td className="p-2.5 text-right text-emerald-600 font-bold">£3</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">Wholesaler</td>
                  <td className="p-2.5 text-right">£15</td>
                  <td className="p-2.5 text-right text-blue-600">£40</td>
                  <td className="p-2.5 text-right">£8</td>
                  <td className="p-2.5 text-right text-slate-400">£5</td>
                  <td className="p-2.5 text-right text-emerald-600 font-bold">£3</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-bold text-slate-900 dark:text-slate-100">Retailer</td>
                  <td className="p-2.5 text-right">£20</td>
                  <td className="p-2.5 text-right text-blue-600">£60</td>
                  <td className="p-2.5 text-right">£12</td>
                  <td className="p-2.5 text-right text-slate-400">£8</td>
                  <td className="p-2.5 text-right text-emerald-600 font-bold">£4</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/80 font-bold border-t-2 border-slate-300 dark:border-zinc-600">
                  <td className="p-2.5 text-slate-900 dark:text-slate-100">Total</td>
                  <td className="p-2.5 text-right text-slate-900 dark:text-slate-100">£60</td>
                  <td className="p-2.5 text-right text-blue-600">£60</td>
                  <td className="p-2.5 text-right">—</td>
                  <td className="p-2.5 text-right">—</td>
                  <td className="p-2.5 text-right text-emerald-600">£12</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            The simplified chain demonstrates why VAT is called a value-added tax: the tax burden is modeled around value added through the chain rather than repeatedly taxing the same value without an offset. Actual input-tax recovery, however, depends on the jurisdiction, taxable status of the purchase, exemptions, business use and other statutory conditions. The UAE Federal Tax Authority, for example, expressly distinguishes recoverable input tax related to taxable supplies from input tax associated with exempt supplies.
          </p>
        </section>

        {/* Section 12: Global Rates Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            VAT Rates Around the World
          </h2>
          <p>
            There is no single worldwide VAT rate. Examples of current standard rates include:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 font-semibold">
                  <th className="p-2.5">Jurisdiction</th>
                  <th className="p-2.5 text-right">Reference Standard Rate</th>
                  <th className="p-2.5">Tax Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 font-sans tabular-nums text-[11px]">
                <tr><td className="p-2.5 font-medium">United Kingdom</td><td className="p-2.5 text-right font-bold text-blue-600">20%</td><td className="p-2.5 text-slate-500">VAT</td></tr>
                <tr><td className="p-2.5 font-medium">Germany</td><td className="p-2.5 text-right font-bold text-blue-600">19%</td><td className="p-2.5 text-slate-500">VAT</td></tr>
                <tr><td className="p-2.5 font-medium">France</td><td className="p-2.5 text-right font-bold text-blue-600">20%</td><td className="p-2.5 text-slate-500">VAT</td></tr>
                <tr><td className="p-2.5 font-medium">Italy</td><td className="p-2.5 text-right font-bold text-blue-600">22%</td><td className="p-2.5 text-slate-500">VAT</td></tr>
                <tr><td className="p-2.5 font-medium">Spain</td><td className="p-2.5 text-right font-bold text-blue-600">21%</td><td className="p-2.5 text-slate-500">VAT</td></tr>
                <tr><td className="p-2.5 font-medium">Netherlands</td><td className="p-2.5 text-right font-bold text-blue-600">21%</td><td className="p-2.5 text-slate-500">VAT</td></tr>
                <tr><td className="p-2.5 font-medium">Australia</td><td className="p-2.5 text-right font-bold text-blue-600">10%</td><td className="p-2.5 text-slate-500">GST</td></tr>
                <tr><td className="p-2.5 font-medium">Canada</td><td className="p-2.5 text-right font-bold text-blue-600">5% federal GST, with HST/PST variations</td><td className="p-2.5 text-slate-500">GST/HST</td></tr>
                <tr><td className="p-2.5 font-medium">UAE</td><td className="p-2.5 text-right font-bold text-blue-600">5%</td><td className="p-2.5 text-slate-500">VAT</td></tr>
                <tr><td className="p-2.5 font-medium">Saudi Arabia</td><td className="p-2.5 text-right font-bold text-blue-600">15%</td><td className="p-2.5 text-slate-500">VAT</td></tr>
                <tr><td className="p-2.5 font-medium">Japan</td><td className="p-2.5 text-right font-bold text-blue-600">10%</td><td className="p-2.5 text-slate-500">Consumption Tax</td></tr>
                <tr><td className="p-2.5 font-medium">Singapore</td><td className="p-2.5 text-right font-bold text-blue-600">9%</td><td className="p-2.5 text-slate-500">GST</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            The figures above should be treated as reference standard rates, not as universal rates for every product or transaction. For example, the UK currently lists a 20% standard VAT rate, a 5% reduced rate and 0% zero-rated supplies. Japan currently has a 10% standard consumption tax rate and an 8% reduced rate for specified categories. Singapore applies GST at 9% to standard-rated supplies from 1 January 2024. The UAE&apos;s standard VAT rate is 5%. Saudi Arabia&apos;s standard VAT rate is 15%. Australia&apos;s GST rate is 10% on most taxable goods and services. Canada requires additional care because the applicable GST/HST rate depends on the province or territory and the place-of-supply rules (5% GST in non-participating provinces, 13% HST in Ontario, 14% in Nova Scotia and 15% in other participating provinces).
          </p>
        </section>

        {/* Section 13: Why Rate Alone Is Not Enough */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Why the Tax Rate Alone Is Not Enough
          </h2>
          <p>
            A calculator can correctly compute <em>Price &times; Rate</em> while still producing the wrong legal tax result if the wrong rate was selected. The applicable rate can depend on:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
            {[
              "Country or subnational jurisdiction",
              "Type of goods or services",
              "Whether the supply is taxable",
              "Whether it is zero-rated",
              "Whether it is exempt",
              "Customer's business status",
              "Where the supply takes place",
              "Import or export rules",
              "Special accounting schemes",
              "Temporary statutory measures",
              "Registration threshold status",
              "Invoice compliance rules",
            ].map((item) => (
              <div key={item} className="p-2.5 bg-slate-50 dark:bg-zinc-800/50 rounded-lg border border-slate-200 dark:border-zinc-700/60 flex items-center gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-slate-500">
            The European Commission specifically notes that EU Member States determine the number and level of their VAT rates within the EU framework. Therefore, the most accurate workflow is: <strong>Identify jurisdiction &rarr; identify supply &rarr; determine applicable tax treatment &rarr; enter rate &rarr; calculate amount</strong>.
          </p>
        </section>

        {/* Section 14: Zero-Rated vs Exempt */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Zero-Rated vs. Exempt
          </h2>
          <p>These terms are often confused:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-xs uppercase tracking-wider">
                Zero-Rated Supplies (0% Rate)
              </span>
              <p className="text-slate-700 dark:text-slate-300">
                A zero-rated supply is generally taxable at a 0% rate. The supplier may still retain certain rights associated with taxable supplies, including input-tax recovery where the jurisdiction allows it.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <span className="font-bold text-purple-600 dark:text-purple-400 block text-xs uppercase tracking-wider">
                Exempt Supplies (Outside Credit System)
              </span>
              <p className="text-slate-700 dark:text-slate-300">
                An exempt supply is treated differently. VAT is not charged, but input-tax recovery can also be restricted.
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-500">
            HMRC explicitly distinguishes zero-rated supplies from exempt supplies, and UAE guidance makes the same conceptual distinction. This difference matters because <strong>0% VAT does not automatically mean the transaction has the same treatment as an exempt transaction</strong>.
          </p>
        </section>

        {/* Section 15: VAT Inclusive Pricing Formula */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            VAT Inclusive Pricing Formula
          </h2>
          <p>
            For a VAT rate <em>r</em>, where <em>r</em> is expressed as a decimal:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-xs space-y-1">
            <div>Gross = Net &times; (1 + r)</div>
            <div>Net = Gross / (1 + r)</div>
            <div className="text-emerald-600 dark:text-emerald-400 font-bold pt-1">
              VAT = Gross &times; (r / (1 + r))
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-zinc-700 text-slate-600 dark:text-slate-400 text-[11px]">
              For 20% VAT: VAT = Gross &times; (20 / 120) = Gross &times; (1 / 6). This is why £120 including 20% VAT contains exactly £20 VAT and £100 of net value.
            </div>
          </div>
        </section>

        {/* Section 16: For Businesses, Consumers, International */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Applications: Businesses, Consumers &amp; Cross-Border Trade
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <span className="font-bold text-blue-600 dark:text-blue-400 block text-xs">For Businesses</span>
              <p className="text-slate-600 dark:text-slate-400">
                Quick estimation of customer invoice totals, VAT-exclusive pricing, VAT-inclusive pricing, reverse VAT extraction, tax portions of quoted prices, mixed-rate calculations, and basic invoice checks.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-xs">For Consumers</span>
              <p className="text-slate-600 dark:text-slate-400">
                Decomposes advertised retail prices into net base price + VAT component (e.g. £100 net + £20 VAT = £120 total) to understand underlying costs.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <span className="font-bold text-purple-600 dark:text-purple-400 block text-xs">International Trade</span>
              <p className="text-slate-600 dark:text-slate-400">
                Models destination principle calculations. Cross-border trade involves place-of-supply rules, reverse-charge mechanisms (RCM), B2B vs B2C rules, and import thresholds.
              </p>
            </div>
          </div>
        </section>

        {/* Section 17: How This Calculator Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            How This VAT Calculator Works
          </h2>
          <p>The calculator is organized around four practical tasks:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-blue-600 dark:text-blue-400 block">1. Universal VAT Solver</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Enter any two relevant values (Rate + Net, Rate + Gross, Net + VAT) and the calculator derives the remaining values.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-emerald-600 dark:text-emerald-400 block">2. Supply Chain VAT Map</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Enter value added at successive production stages to visualize: value added &rarr; output VAT &rarr; input credit &rarr; net VAT remitted.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-purple-600 dark:text-purple-400 block">3. Global VAT/GST Directory</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Use the rate directory as a reference point when comparing standard tax rates across international jurisdictions.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <span className="font-bold text-amber-600 dark:text-amber-400 block">4. VAT vs. Sales Tax Comparison</span>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Compare the conceptual differences between a multi-stage VAT/GST system and a retail sales-tax system.
              </p>
            </div>
          </div>
        </section>

        {/* Section 18: Worked Examples */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Worked Examples
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
              <h3 className="font-bold text-blue-600 dark:text-blue-400 text-xs uppercase tracking-wider">
                Example A: Adding VAT to a Price
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Suppose Net price = €800, VAT rate = 21%:</p>
              <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-slate-200 dark:border-zinc-700 space-y-1">
                <div>VAT: €800 &times; 0.21 = <strong>€168</strong></div>
                <div>Gross: €800 + €168 = <strong>€968</strong></div>
              </div>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                VAT = €168 | Final price = €968
              </div>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-2">
              <h3 className="font-bold text-purple-600 dark:text-purple-400 text-xs uppercase tracking-wider">
                Example B: Removing VAT From a Price
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Suppose VAT-inclusive price = €968, VAT rate = 21%:</p>
              <div className="font-mono text-xs bg-white dark:bg-zinc-900 p-2.5 rounded border border-slate-200 dark:border-zinc-700 space-y-1">
                <div>Net: €968 / 1.21 = <strong>€800</strong></div>
                <div>VAT: €968 &minus; €800 = <strong>€168</strong></div>
              </div>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400">
                Reverse calculation recovers original net price €800.
              </div>
            </div>
          </div>
        </section>

        {/* Section 19: Cheat Sheet Table */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            VAT Calculation Cheat Sheet
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-slate-300 font-semibold">
                  <th className="p-2.5">Need</th>
                  <th className="p-2.5">Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 font-mono text-[11px]">
                <tr><td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">VAT from net price</td><td className="p-2.5 text-blue-600">Net &times; Rate</td></tr>
                <tr><td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Gross from net price</td><td className="p-2.5 text-emerald-600">Net &times; (1 + Rate)</td></tr>
                <tr><td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Net from gross price</td><td className="p-2.5 text-purple-600">Gross &divide; (1 + Rate)</td></tr>
                <tr><td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">VAT from gross price</td><td className="p-2.5 text-amber-600">Gross &minus; Net</td></tr>
                <tr><td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">VAT rate from net + VAT</td><td className="p-2.5 text-blue-600">VAT &divide; Net</td></tr>
                <tr><td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Net price from VAT + rate</td><td className="p-2.5 text-purple-600">VAT &divide; Rate</td></tr>
                <tr><td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">VAT fraction</td><td className="p-2.5 text-emerald-600">Rate &divide; (100 + Rate)</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">
            Use the percentage as a decimal when performing multiplication (e.g. 20% = 0.20).
          </p>
        </section>

        {/* Section 20: Final Note & Disclaimer */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Final Note &amp; Compliance Notice
          </h2>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
            <div className="font-bold text-slate-900 dark:text-zinc-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
              Tax Compliance Notice
            </div>
            <p>
              VAT arithmetic is simple; determining the correct tax treatment is not always simple. Standard rates are useful reference points, but real transactions can involve reduced rates, zero-rating, exemptions, place-of-supply rules, input-tax restrictions, special schemes and jurisdiction-specific requirements. Current official guidance should be checked whenever the result will be used for an actual invoice, tax return, contract or compliance decision.
            </p>
            <p>
              This calculator provides mathematical estimates based on the rate and inputs supplied. It is not tax advice and does not determine legal VAT/GST liability.
            </p>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION (18 FAQs, Open by Default) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {vatFaqs.map((faq, idx) => {
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

export default VatContent;
