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
  ArrowRight,
} from "lucide-react";

export function GstContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Goods and Services Tax (GST) in India?",
      answer: "GST is a comprehensive, multi-stage, destination-based indirect tax levied on the manufacture, sale, and consumption of goods and services throughout India. Introduced on July 1, 2017, GST replaced multiple cascading indirect taxes such as Excise Duty, VAT, Service Tax, and Octroi.",
    },
    {
      question: "What are the four GST components (CGST, SGST, UTGST, IGST)?",
      answer: "CGST (Central GST) and SGST (State GST) are levied equal halves on intra-state transactions (within the same state). UTGST applies to Union Territories. IGST (Integrated GST) is levied by the Central Government on inter-state transactions (between two different states) and imported goods.",
    },
    {
      question: "What is the difference between GST Exclusive and GST Inclusive?",
      answer: "GST Exclusive means the tax amount is calculated on top of the net base price (Total = Base + GST). GST Inclusive means the tax is already embedded within the advertised gross price (Net Base = Total / (1 + Rate%)).",
    },
    {
      question: "How do I calculate Reverse GST?",
      answer: "Reverse GST calculates the original net base price when you only know the GST tax amount paid. Formula: Net Base Amount = GST Amount × (100 / GST Rate %).",
    },
    {
      question: "What are the primary GST Rate Slabs in India?",
      answer: "The main GST rate slabs are 0% (NIL rate for essential food/grains), 0.25% (Rough diamonds), 3% (Gold & Silver), 5% (Household items, basic apparel), 12% (Processed foods, computers), 18% (Standard rate for most goods & services), and 28% (Luxury goods, automobiles, sin goods).",
    },
    {
      question: "What is Input Tax Credit (ITC) under GST?",
      answer: "Input Tax Credit allows registered businesses to reduce the GST tax they owe on output sales by claiming credit for the GST tax already paid on input business purchases, avoiding double taxation.",
    },
    {
      question: "Who needs to register for GST in India?",
      answer: "GST registration is mandatory for businesses selling goods with an annual turnover exceeding ₹40 Lakhs (₹20 Lakhs for special category states) and service providers exceeding ₹20 Lakhs (₹10 Lakhs for special states). Registration is also mandatory for e-commerce sellers and inter-state traders regardless of turnover.",
    },
    {
      question: "What is the GST Composition Scheme?",
      answer: "The Composition Scheme is a simplified tax scheme for small businesses with turnover up to ₹1.5 Crore (₹75 Lakhs for North-East states). Taxpayers pay a fixed low turnover tax (1% for traders/manufacturers, 5% for restaurants, 6% for service providers) with minimal return filing, but cannot claim Input Tax Credit or issue tax invoices.",
    },
    {
      question: "What is Reverse Charge Mechanism (RCM)?",
      answer: "Under standard GST, the seller collects tax from the buyer and deposits it with the government. Under RCM, the recipient of goods/services is directly liable to pay GST to the government, typically applicable when buying from unregistered suppliers.",
    },
    {
      question: "What is Compensation Cess under GST?",
      answer: "Compensation Cess is an additional tax levied over and above the 28% peak GST rate on specified luxury items and sin goods (such as tobacco, aerated beverages, and motor vehicles) to compensate state governments for revenue loss.",
    },
    {
      question: "How is GST calculated for Freelancers and Independent Contractors?",
      answer: "Freelancers in India providing services (software development, design, consulting) attract an 18% GST rate. GST registration is mandatory if total annual revenue exceeds ₹20 Lakhs (or if billing foreign clients with export of services under LUT).",
    },
    {
      question: "What is HSN Code and SAC Code?",
      answer: "HSN (Harmonized System of Nomenclature) Code is a 4 to 8-digit international commodity coding system used to classify physical goods. SAC (Services Accounting Code) is used to classify services under GST.",
    },
    {
      question: "What is an E-Way Bill and when is it required?",
      answer: "An E-Way Bill is an electronic document generated on the GST portal for the movement of goods worth over ₹50,000 in value, required for both intra-state and inter-state transit.",
    },
    {
      question: "What are the penalties for delayed GST return filing?",
      answer: "Filing GSTR-3B or GSTR-1 after the due date attracts a late fee of ₹50 per day (₹20 per day for NIL returns), subject to maximum caps, along with 18% per annum interest on unpaid tax liability.",
    },
    {
      question: "Can I claim GST on personal purchases?",
      answer: "No. Input Tax Credit (ITC) can only be claimed on purchases made strictly for business purposes and used in the furtherance of business.",
    },
    {
      question: "What is the difference between NIL rated, Exempted, and Zero Rated supplies?",
      answer: "NIL rated goods attract 0% GST (e.g. fresh vegetables). Exempted goods are specially exempted by notification. Zero-rated supplies refer to exports of goods/services or supplies to SEZ (Special Economic Zones) where input tax credit can be fully refunded.",
    },
    {
      question: "How does GST apply to online sales and e-commerce platforms?",
      answer: "E-commerce operators (like Amazon, Flipkart) deduct TCS (Tax Collected at Source) at 1% on net sales, and all sellers listing on e-commerce platforms must hold mandatory GST registration.",
    },
    {
      question: "What is GSTR-1, GSTR-3B, and GSTR-9?",
      answer: "GSTR-1 is the monthly/quarterly return for reporting outward sales invoices. GSTR-3B is a summary return for declaring monthly tax liability and ITC. GSTR-9 is the annual GST return.",
    },
    {
      question: "How do I calculate GST on discounted items?",
      answer: "GST is calculated on the net transaction value after deducting trade discounts offered before or at the time of supply, as long as the discount is recorded in the invoice.",
    },
    {
      question: "Why should I use an online GST Calculator?",
      answer: "An online GST calculator eliminates manual calculation errors, provides instant CGST/SGST/IGST splits, supports multi-item invoice generation, and saves valuable time for accountants, freelancers, and small business owners.",
    },
  ];

  return (
    <div className="space-y-10 mt-8  dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> Comprehensive Indian Tax Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          Goods & Services Tax (GST): The Complete Business & Accounting Guide
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          The Goods and Services Tax (GST) transformed India's taxation system into a unified <em>"One Nation, One Tax"</em> model. 
          Whether you are a freelancer issuing invoices, a retailer calculating exclusive prices, or a business owner analyzing 
          Composition Scheme savings, understanding GST formulas, tax slabs, and Input Tax Credit (ITC) is essential for financial compliance.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <Receipt className="h-5 w-5" /> 1. GST Exclusive vs. Inclusive Formulas
            </div>
            <p>
              Understanding whether a price includes or excludes GST determines your exact invoice billing structure:
            </p>
            <ul className="text-xs space-y-2 text-slate-900 dark:text-slate-100 font-sans tabular-nums bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <li>• <strong>GST Exclusive:</strong> GST Amount = Base Price × (GST Rate % / 100)</li>
              <li>• <strong>GST Inclusive:</strong> Base Price = Total Amount / (1 + GST Rate % / 100)</li>
              <li>• <strong>Reverse GST:</strong> Base Price = GST Amount × (100 / GST Rate %)</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <Zap className="h-5 w-5" /> 2. Dual GST Model (CGST + SGST vs. IGST)
            </div>
            <p>
              India uses a <strong>Dual GST Model</strong> where Central and State Governments administer tax concurrently:
            </p>
            <ul className="text-xs space-y-1.5 text-slate-900 dark:text-slate-100">
              <li>• <strong>Intra-State Supply (Same State):</strong> Tax is split 50/50 into <strong>CGST</strong> (Central GST) and <strong>SGST</strong> (State GST).</li>
              <li>• <strong>Inter-State Supply (Different State):</strong> Full tax is collected as <strong>IGST</strong> (Integrated GST).</li>
            </ul>
          </div>
        </div>

        {/* Section 3: GST Rate Slabs Table */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Layers className="h-5 w-5 text-blue-600" /> 3. Official GST Tax Rate Slabs in India
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">GST Slab Rate</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Key Eligible Categories & Items</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">CGST / SGST Split</th>
                </tr>
              </thead>
              <tbody className=" dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold text-blue-600">0% (NIL Rate)</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">Fresh milk, vegetables, food grains, salt, curd, books</td>
                  <td className="p-3 font-sans tabular-nums">0% / 0%</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">0.25%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">Rough precious stones & cut/polished diamonds</td>
                  <td className="p-3 font-sans tabular-nums">0.125% / 0.125%</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">3%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">Gold, silver, platinum, jewelry</td>
                  <td className="p-3 font-sans tabular-nums">1.5% / 1.5%</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">5%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">Sugar, tea, coffee, edible oil, apparel &lt; ₹1,000, medicines</td>
                  <td className="p-3 font-sans tabular-nums">2.5% / 2.5%</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">12%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">Computers, processed foods, fruit juice, apparel &gt; ₹1,000</td>
                  <td className="p-3 font-sans tabular-nums">6% / 6%</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-700">18% (Standard)</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">IT services, software, freelancing, telecom, restaurants, cosmetics</td>
                  <td className="p-3 font-sans tabular-nums">9% / 9%</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-blue-600">28% (Peak)</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">Automobiles, motorcycles, sin goods, tobacco, aerated drinks (+ Cess)</td>
                  <td className="p-3 font-sans tabular-nums">14% / 14%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-World Use Cases */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <Award className="h-5 w-5 text-blue-600" /> Composition Scheme vs. Regular GST Scheme
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Regular GST Scheme</span>
              <p className="text-slate-900 dark:text-slate-100">
                Taxpayers charge standard GST on output sales and claim full <strong>Input Tax Credit (ITC)</strong> on input purchases. Ideal for B2B businesses and traders with high purchase expenses.
              </p>
            </div>
            <div className="space-y-2 p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Composition Scheme</span>
              <p className="text-slate-900 dark:text-slate-100">
                Small traders and restaurants pay a flat 1% to 5% tax on annual turnover without claiming ITC. Offers quarterly filing and zero tax invoice paperwork.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 20 SEO FAQs Section */}
      <div className="space-y-6 pt-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-blue-600" />
          <h3 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
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
