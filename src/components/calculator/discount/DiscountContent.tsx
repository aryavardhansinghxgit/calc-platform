"use client";

import React, { useState } from "react";
import {
  ChevronDown,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Shield,
  Clock,
  Landmark,
  Percent,
  Sparkles,
  TrendingUp,
  Heart,
  Briefcase,
  DollarSign,
  PieChart,
  Tag,
} from "lucide-react";
import Link from "next/link";

export function DiscountContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How do you calculate a percentage discount?",
      a: "To calculate a percentage discount, multiply the original price by the discount percentage divided by 100 to get total dollar savings. Subtract total savings from the original price to find the final sale price.",
    },
    {
      q: "How do stacked or double discounts work?",
      a: "Stacked discounts apply sequentially rather than additively. For example, a 20% discount on a $100 item reduces the price to $80, and a secondary 10% discount reduces $80 to $72, yielding an effective 28% discount.",
    },
    {
      q: "What is the difference between a discount and a rebate?",
      a: "A discount is deducted immediately at the point of sale. A rebate requires paying full price upfront and submitting proof of purchase to receive money back later.",
    },
    {
      q: "Is sales tax calculated before or after a discount?",
      a: "In most states and retail stores, sales tax is calculated on the net discounted price. If an item listed for $100 is discounted 20% to $80, an 8% sales tax is calculated on $80 ($6.40 tax).",
    },
    {
      q: "What is the difference between marked price and selling price?",
      a: "Marked price (or list price / MSRP) is the original retail price printed on an item tag. Selling price (or final sale price) is the actual amount paid after applying discounts and coupons.",
    },
    {
      q: "What is the formula for calculating original price from sale price?",
      a: "To reverse-calculate original price from sale price: Original Price = Sale Price / (1 - Discount Percentage / 100).",
    },
    {
      q: "How do fixed dollar coupons combine with percentage discounts?",
      a: "Most retailers apply percentage discounts first (e.g. 20% off $100 = $80) and then apply fixed dollar coupons (e.g. $10 off $80 = $70 final price).",
    },
    {
      q: "What is the difference between discount and cashback?",
      a: "A discount lowers the purchase price upfront. Cashback rewards return a percentage of spent funds (e.g., 2% to 5%) to your credit card or rewards balance after the transaction.",
    },
    {
      q: "Why do stores offer double discounts instead of one large discount?",
      a: "Retailers use stacked discounts (like 30% off clearance plus extra 20% off) because it sounds psychologically larger than a single 44% discount, driving higher conversion rates.",
    },
    {
      q: "How does Black Friday BOGO (Buy One Get One) math work?",
      a: "Buy One Get One 50% Off equals an effective 25% discount on the total transaction if both items cost the same amount.",
    },
    {
      q: "Can a discount result in negative sales tax?",
      a: "No. Sales tax applies to positive net purchase balances. If store rewards bring your total to $0, zero sales tax is assessed.",
    },
    {
      q: "How do trade discounts differ from cash discounts?",
      a: "Trade discounts are price reductions offered between B2B manufacturers and wholesalers. Cash discounts are prompt-payment incentives offered to buyers for paying invoices early (e.g., 2/10 net 30).",
    },
    {
      q: "What is dynamic pricing in e-commerce?",
      a: "Dynamic pricing uses algorithms to adjust item prices and discounts in real time based on demand, competitor prices, inventory levels, and browsing history.",
    },
    {
      q: "How can I calculate required discount for a target budget?",
      a: "Required Discount % = [(Original Price - Target Budget) / Original Price] × 100.",
    },
    {
      q: "Why does 20% off + 20% off not equal 40% off?",
      a: "Because the second 20% discount is taken off the reduced 80% balance (16% savings), making total combined savings 36% rather than 40%.",
    },
  ];

  return (
    <div className="mt-12 space-y-12 border-t border-zinc-200 dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200">
      {/* Article Header */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Complete Shopping &amp; Business Discount Guide
        </div>
        <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-100">
          Discount Calculator Guide: Single, Stacked &amp; Coupon Savings Mechanics
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-4xl">
          Discounts are ubiquitous in retail, wholesale, e-commerce, and corporate purchasing. Understanding discount formulas—such as single percentage off, fixed dollar coupons, stacked sequential discounts, and sales tax interactions—empowers shoppers and businesses to calculate exact final checkout costs and maximize financial savings.
        </p>
      </section>

      {/* Main Educational Content with Required H2 Headings */}
      <div className="space-y-8 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">What Is a Discount?</h2>
          <p>
            A discount is a reduction in the normal list price or marked price of a product or service offered by sellers to entice buyers, liquidate inventory, or reward prompt payment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">How Discounts Work</h2>
          <p>
            Discounts function by subtracting a specified percentage or fixed dollar amount from an item's list price. In multi-tier pricing, secondary discounts apply sequentially to previously reduced balances.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Percentage &amp; Fixed Amount Discount Formulas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-mono text-xs space-y-1">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block">Percentage Discount Formula</span>
              <div>Savings = Original Price × (Discount % / 100)</div>
              <div>Final Price = Original Price - Savings</div>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-mono text-xs space-y-1">
              <span className="font-sans font-bold text-zinc-900 dark:text-zinc-100 block">Fixed Amount Discount Formula</span>
              <div>Savings = Fixed Discount Amount</div>
              <div>Final Price = Original Price - Fixed Discount</div>
            </div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Multiple Discount Calculations (Stacked Discounts)</h2>
          <p>
            When a store advertises "20% off clearance plus an extra 10% off at register", the discounts compound sequentially:
          </p>
          <div className="bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-xl border font-mono text-xs space-y-1">
            <div>Final Price = Original Price × (1 - D1) × (1 - D2)</div>
            <div>Example: $100 × (1 - 0.20) × (1 - 0.10) = $100 × 0.80 × 0.90 = $72.00</div>
            <div>Effective Combined Discount = 28% (Not 30%)</div>
          </div>
        </section>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Coupon Discounts &amp; Sales Tax Interaction</h2>
          <p>
            Coupons can combine percentage off with fixed dollar amounts. In standard retail, sales tax is calculated on the net discounted price (after discount):
          </p>
          <p>
            If a $100 coat is discounted 20% to $80 with an 8% sales tax, tax equals $80 × 0.08 = $6.40, bringing final checkout total to $86.40.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-y border-zinc-200 dark:border-zinc-800 py-6 text-xs">
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Marked Price vs Selling Price</h3>
            <p>Marked price is the MSRP tag; selling price is net cost after applying discounts.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Discount vs Rebate</h3>
            <p>Discounts lower checkout price immediately; rebates require mail-in submission.</p>
          </div>
          <div>
            <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Discount vs Cashback</h3>
            <p>Cashback credits rewards accounts after purchase; discounts reduce upfront cash spent.</p>
          </div>
        </div>

        <section className="space-y-2">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">Retail Pricing &amp; E-commerce Discount Strategies</h2>
          <p>
            Retailers employ promotional pricing strategies—such as loss leaders, flash sales, seasonal clearance, and promo code stacking—to accelerate sales volume and customer acquisition while managing gross margins.
          </p>
        </section>
      </div>

      {/* 15+ FAQ Accordion Section */}
      <section className="space-y-6 border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100">
            Frequently Asked Questions (15 Key Discount Insights)
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs font-bold shrink-0">
                      Q{idx + 1}.
                    </span>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Related Calculators */}
      <section className="space-y-3 border-t border-zinc-200 dark:border-zinc-800 pt-6">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Related Financial &amp; Shopping Calculators</h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link href="/calculators/percentage-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Percentage Calculator
          </Link>
          <Link href="/calculators/sales-tax-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Sales Tax Calculator
          </Link>
          <Link href="/calculators/gst-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            GST Calculator
          </Link>
          <Link href="/calculators/vat-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            VAT Calculator
          </Link>
          <Link href="/calculators/margin-calculator" className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 font-semibold hover:underline">
            Profit Margin Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
