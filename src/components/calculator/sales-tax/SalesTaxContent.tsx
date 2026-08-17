"use client";

import React, { useState } from "react";
import {
  BookOpen,
  HelpCircle,
  Receipt,
  DollarSign,
  PieChart as PieIcon,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Award,
  Clock,
  Layers,
  Globe,
  MapPin,
} from "lucide-react";

export function SalesTaxContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is sales tax and how is it calculated?",
      answer: "Sales tax is a single-stage consumption tax imposed by state and local governments on retail purchases of goods and services. It is calculated by multiplying the pre-tax retail price by the combined state and local sales tax rate: Sales Tax = Pre-Tax Price × (Tax Rate % / 100).",
    },
    {
      question: "Which US states have NO state sales tax?",
      answer: "Five US states do not levy a general state sales tax (often remembered by the acronym NOMAD): New Hampshire, Oregon, Montana, Alaska, and Delaware. However, local municipalities in Alaska and resort areas in Montana may levy local sales taxes.",
    },
    {
      question: "What is the difference between State Tax Rate and Combined Tax Rate?",
      answer: "The State Tax Rate is the baseline sales tax mandated statewide by state legislation. The Combined Tax Rate includes the state rate plus county, municipal, city, and special district transit taxes applicable to the specific purchase location.",
    },
    {
      question: "How do I calculate Pre-Tax Price from a Tax-Inclusive Final Price?",
      answer: "To extract the original pre-tax price from a final total price, divide the final price by (1 + Tax Rate / 100). For example, a $108.25 item bought with an 8.25% sales tax rate has a pre-tax price of $108.25 / 1.0825 = $100.00.",
    },
    {
      question: "Is sales tax tax-deductible on federal income tax returns?",
      answer: "Yes. Taxpayers who itemize deductions on IRS Schedule A (Form 1040) can choose to deduct either state and local income taxes OR state and local sales taxes, capped at a maximum combined deduction of $10,000 under the SALT cap.",
    },
    {
      question: "Are groceries, clothing, and prescription drugs subject to sales tax?",
      answer: "Rules vary by state. Most states fully exempt prescription drugs and grocery food items from state sales tax. Some states (like Massachusetts, Pennsylvania, Minnesota, New Jersey, and New York) also exempt general clothing up to certain price thresholds.",
    },
    {
      question: "How does sales tax differ from Value-Added Tax (VAT)?",
      answer: "Sales tax is a single-stage tax collected exclusively from the final retail consumer. Value-Added Tax (VAT) is a multi-stage tax collected incrementally at every stage of production and distribution, where businesses reclaim input tax credits.",
    },
    {
      question: "What is Goods and Services Tax (GST)?",
      answer: "GST is a national value-added tax system used in countries like Canada, Australia, India, Singapore, and New Zealand. It functions similarly to VAT, taxing consumption at each stage of the supply chain with input tax credits.",
    },
    {
      question: "Do online e-commerce purchases include sales tax?",
      answer: "Yes. Following the landmark 2018 U.S. Supreme Court decision in South Dakota v. Wayfair, Inc., states require remote online sellers and marketplace facilitators (such as Amazon, eBay, and Etsy) to collect local sales tax based on the buyer's delivery state once economic nexus thresholds are met.",
    },
    {
      question: "What is Origin-Based vs. Destination-Based sales tax sourcing?",
      answer: "Under Destination-Based sourcing (used by most US states), sales tax is calculated based on the delivery location where the buyer receives the item. Under Origin-Based sourcing, sales tax is charged based on the seller's business location.",
    },
    {
      question: "How do businesses calculate sales tax collected for tax returns?",
      answer: "Businesses that sell goods at tax-inclusive prices calculate their net taxable sales revenue by dividing gross collected revenue by (1 + Tax Rate). The tax collected payable to the state equals Gross Revenue minus Net Revenue.",
    },
    {
      question: "What is a Sales Tax Resale Exemption Certificate?",
      answer: "A resale certificate allows registered wholesalers, manufacturers, and retailers to purchase goods tax-free from suppliers, provided the items will be resold to end consumers who will pay retail sales tax.",
    },
    {
      question: "Which US state has the highest combined sales tax rate?",
      answer: "Louisiana and Tennessee frequently rank highest for average combined state and local sales tax rates, exceeding 9.5% to 11.5% in certain municipalities.",
    },
    {
      question: "Why do some items have tax holidays?",
      answer: "Many US states host annual 'Sales Tax Holidays' (usually in August for back-to-school items or May for disaster preparedness gear), temporarily waiving sales tax on eligible clothing, footwear, school supplies, and hurricane supplies.",
    },
    {
      question: "How is sales tax calculated on discounted items?",
      answer: "If a retailer offers a store discount or coupon, sales tax is calculated on the reduced net price. However, manufacturer coupons usually do not reduce the taxable base because the manufacturer reimburses the retailer.",
    },
    {
      question: "Do services incur sales tax?",
      answer: "Traditionally, sales tax applied primarily to physical tangible personal property (TPP). However, an increasing number of states now tax select services, digital downloads, SaaS software subscriptions, and streaming media.",
    },
    {
      question: "What is Use Tax?",
      answer: "Use tax is a companion tax to sales tax. If an out-of-state retailer does not collect sales tax on a taxable purchase delivered to your home, state law requires the buyer to self-report and pay 'Use Tax' on their state income tax return.",
    },
    {
      question: "What happens if a business fails to remit collected sales tax?",
      answer: "Sales tax collected from customers is held in trust for the government. Failing to remit collected sales tax is a severe violation resulting in personal liability for business officers, heavy fines, interest penalties, and potential criminal charges.",
    },
    {
      question: "How can I estimate sales tax before buying a car?",
      answer: "Automobile sales tax is calculated on the net price after trade-in allowances (in most states). Enter your vehicle purchase price minus trade-in value into our calculator and select your state to see estimated sales tax and DMV fees.",
    },
    {
      question: "Why use an online Sales Tax Calculator?",
      answer: "An online sales tax calculator instantly computes pre-tax price, tax amount, and final total across all 50 US states, provides 5-way solving, supports multi-item receipts, and generates printable PDF tax summaries.",
    },
  ];

  return (
    <div className="space-y-10 mt-8  dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> Comprehensive Retail &amp; State Sales Tax Guide
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          Mastering U.S. State &amp; Local Sales Tax: Formulas, Exemptions &amp; Compliance
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Sales tax is the primary consumption tax mechanism in the United States, generating hundreds of billions of dollars annually 
          to fund state infrastructure, public schools, emergency services, and local municipal operations. Unlike national VAT systems, 
          U.S. sales tax features a complex tapestry of 50 state tax codes, over 13,000 local taxing jurisdictions, destination sourcing, and product exemptions.
        </p>
      </div>

      {/* Main Content Sections Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <Receipt className="h-5 w-5" /> 1. The 5 Core Sales Tax Calculation Formulas
            </div>
            <p>
              Depending on which variables you possess, use these exact algebraic relationships:
            </p>
            <ul className="text-xs space-y-2 text-slate-900 dark:text-slate-100 font-sans tabular-nums bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <li>• <strong>Mode A (Pre-Tax + Rate):</strong> Tax = Price × (Rate / 100)</li>
              <li>• <strong>Mode B (Final + Rate):</strong> Pre-Tax = Final / (1 + Rate / 100)</li>
              <li>• <strong>Mode C (Pre-Tax + Final):</strong> Rate = ((Final - Pre-Tax) / Pre-Tax) × 100</li>
              <li>• <strong>Mode D (Tax + Rate):</strong> Pre-Tax = Tax / (Rate / 100)</li>
              <li>• <strong>Mode E (Tax + Pre-Tax):</strong> Rate = (Tax / Pre-Tax) × 100</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <MapPin className="h-5 w-5" /> 2. Anatomy of Combined Tax Rates
            </div>
            <p>
              In most U.S. cities, your final sales tax receipt reflects a layered combination of multiple independent taxing authorities:
            </p>
            <ul className="text-xs space-y-1.5 text-slate-900 dark:text-slate-100">
              <li>• <strong>State Baseline Tax Rate:</strong> Mandated statewide by state legislature (e.g. California 7.25%, Texas 6.25%).</li>
              <li>• <strong>County Sales Tax:</strong> Added by county commissioners (e.g. 0.50% to 2.50%).</li>
              <li>• <strong>City / Municipal Tax:</strong> Added by local city councils (e.g. 1.00% to 3.00%).</li>
              <li>• <strong>Special Transit / District Tax:</strong> Targeted assessments for regional light-rail, stadium, or flood districts.</li>
            </ul>
          </div>
        </div>

        {/* Section 3: 50 State Sales Tax Summary */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">3. U.S. State Sales Tax Rates &amp; Exemption Overview
          </h3>
          <p className="text-xs text-slate-900 dark:text-slate-100">
            Below is a summary of baseline state sales tax rates, average local tax additions, and grocery/clothing exemption policies across major states:
          </p>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">State Name</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">State Rate %</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Avg. Local Rate %</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Max Combined Rate %</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Grocery Exempt?</th>
                </tr>
              </thead>
              <tbody className=" dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold">California</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">7.25%</td>
                  <td className="p-3 font-sans tabular-nums text-slate-900">1.60%</td>
                  <td className="p-3 font-sans tabular-nums">10.75%</td>
                  <td className="p-3 text-blue-600 font-bold">Yes (Exempt)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Texas</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">6.25%</td>
                  <td className="p-3 font-sans tabular-nums text-slate-900">1.94%</td>
                  <td className="p-3 font-sans tabular-nums">8.25%</td>
                  <td className="p-3 text-blue-600 font-bold">Yes (Exempt)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Florida</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">6.00%</td>
                  <td className="p-3 font-sans tabular-nums text-slate-900">1.05%</td>
                  <td className="p-3 font-sans tabular-nums">8.00%</td>
                  <td className="p-3 text-blue-600 font-bold">Yes (Exempt)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">New York</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">4.00%</td>
                  <td className="p-3 font-sans tabular-nums text-slate-900">4.52%</td>
                  <td className="p-3 font-sans tabular-nums">8.88%</td>
                  <td className="p-3 text-blue-600 font-bold">Yes (Exempt)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">Oregon / Delaware / Montana / NH / AK</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">0.00% (No Tax)</td>
                  <td className="p-3 font-sans tabular-nums text-slate-900">0.00%</td>
                  <td className="p-3 font-sans tabular-nums">0.00%</td>
                  <td className="p-3 text-blue-600 font-bold">Yes (Exempt)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: History & IRS Deduction */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">U.S. Sales Tax History &amp; IRS Income Tax Deductions
          </h3>
          <p className="text-xs text-slate-900 dark:text-slate-100">
            <strong>Historical Context:</strong> Taxation on goods played a pivotal role in American independence, starting with the 1773 Boston Tea Party protesting British tea taxes. 
            Modern state sales taxes emerged during the Great Depression in the 1930s (led by Mississippi in 1930) as states sought reliable revenue sources.
          </p>
          <p className="text-xs text-slate-900 dark:text-slate-100">
            <strong>IRS Schedule A Deduction:</strong> When filing federal tax returns, taxpayers who itemize can deduct either state/local income tax OR state/local sales tax. 
            If you made major purchases during the tax year (such as buying a car, boat, motorhome, or major home renovation materials), retaining receipts and claiming sales tax can result in significant federal tax savings under the SALT deduction allowance.
          </p>
        </div>
      </div>

      {/* 20 SEO FAQs Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 flex items-center justify-between font-semibold text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors focus:outline-none"
                >
                  <span className="flex items-center gap-2">
                    <span className="text-xs text-blue-600 dark:text-blue-400 font-bold min-w-[20px]">
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400 flex-shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs text-slate-900 dark:text-slate-100  dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
