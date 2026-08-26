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
  Receipt,
  Layers,
  ArrowRight,
  Info,
} from "lucide-react";
import Link from "next/link";

export function DiscountContent() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I calculate a percentage discount?",
      a: "Multiply the original price by the discount percentage divided by 100. Subtract that savings amount from the original price. For example, 20% off $100 saves $20, producing an $80 final price.",
    },
    {
      q: "What is the formula for a sale price?",
      a: "The standard formula is Final Price = Original Price × (1 − Discount Percentage / 100). For a $200 item discounted by 15%, the final price is $170.",
    },
    {
      q: "How much is 20% off $100?",
      a: "A 20% discount on $100 saves $20, leaving a final price of $80 before any applicable taxes or additional charges.",
    },
    {
      q: "How do I calculate the original price from a discounted price?",
      a: "Divide the final price by the remaining percentage. For example, if an item costs $80 after a 20% discount, divide $80 by 0.80 to get an original price of $100.",
    },
    {
      q: "What is a stacked discount?",
      a: "A stacked discount means multiple discounts are applied sequentially to the amount remaining after the previous discount. A second 10% discount applied after a first 20% discount is taken from the already reduced price.",
    },
    {
      q: "Is 20% off plus 10% off the same as 30% off?",
      a: "No. On a $100 item, 20% off leaves $80. Another 10% removes $8, leaving $72. The total saving is $28, so the effective discount is 28%, not 30%.",
    },
    {
      q: "How do I calculate the effective discount from two discounts?",
      a: "For two sequential discounts, use Effective Discount = 1 − (1 − D1)(1 − D2). With 20% and 10%, the effective discount is 28%.",
    },
    {
      q: "How does a percentage coupon plus a fixed coupon work?",
      a: "Under this calculator's model, the percentage discount is applied first and the fixed-dollar coupon is then subtracted from the reduced amount. A $100 item with 20% off and a $10 fixed coupon therefore becomes $70.",
    },
    {
      q: "Does the order of coupons matter?",
      a: "Yes when different types of discounts are combined. Two pure percentage discounts produce the same result regardless of order, but a percentage discount and a fixed-dollar coupon can produce different prices depending on which is applied first.",
    },
    {
      q: "Is sales tax calculated before or after a discount?",
      a: "The calculator's Sales Tax + Discount model applies the discount first and then calculates tax on the discounted taxable amount. However, actual sales-tax treatment of coupons, rebates, and manufacturer-funded promotions varies by jurisdiction. New York and Illinois both publish guidance showing that coupon reimbursement can affect the taxable amount.",
    },
    {
      q: "Can a manufacturer's coupon be taxed differently from a store coupon?",
      a: "Yes. Tax treatment can depend on whether the retailer is reimbursed for the coupon. New York, for example, generally treats store-issued coupons and manufacturer's coupons differently for sales-tax purposes.",
    },
    {
      q: "What is the difference between a discount and a rebate?",
      a: "A discount normally reduces the selling price at purchase. A rebate generally provides a later payment or credit after qualifying conditions are satisfied. A rebate can therefore reduce the customer's eventual economic cost without necessarily reducing the taxable selling price in every jurisdiction.",
    },
    {
      q: "What is the difference between a discount and cashback?",
      a: "A discount reduces the amount due at checkout. Cashback usually returns money after the purchase through a retailer, card issuer, payment platform, or other program. They can have similar economic effects but are different transaction mechanisms.",
    },
    {
      q: "How much did I actually save from a sale?",
      a: "Your savings are normally the original price minus the applicable discounted price. Your effective savings percentage is the savings divided by the original price, multiplied by 100. For stacked discounts, calculate the effective percentage from the final price rather than adding the advertised percentages.",
    },
    {
      q: "Why does my final checkout price differ from a discount calculator?",
      a: "The calculator uses the discount, coupon, and tax assumptions entered. A retailer's checkout may apply exclusions, manufacturer reimbursement, minimum-purchase rules, shipping, local taxes, fees, or other promotion-specific conditions. For a real transaction, the retailer's disclosed checkout calculation is the authoritative amount.",
    },
  ];

  return (
    <div className="mt-12 space-y-12 dark:border-zinc-800 pt-10 text-zinc-800 dark:text-zinc-200 font-sans">
      {/* SECTION 1: HEADER & EXECUTIVE OVERVIEW */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" /> Complete Promotional &amp; Retail Pricing Reference
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-600 dark:text-blue-400">
          Discount Calculator — Calculate Sale Price, Stacked Discounts &amp; Coupons
        </h1>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          Discounts appear simple until the promotion contains more than one offer. A product marked at $100 with 20% off is easy to calculate: you save $20 and pay $80. But what happens when the store advertises 20% off plus an extra 10% at checkout? Is that 30% off? No. The second discount is applied to the already discounted price, so the final price is $72 and the actual combined savings is 28%. That distinction is one of the most common sources of confusion in shopping, retail pricing, e-commerce promotions, and business quoting.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          This Discount Calculator is designed to handle those different situations rather than treating every promotion as a simple percentage subtraction. The calculator can solve ordinary percentage discounts and fixed-dollar discounts, work backward from a final sale price, calculate stacked sequential discounts, combine percentage and fixed coupons, estimate sales tax after a discount, and visualize the relationship between the original price, final price, and amount saved. The result is not just a discount number; it is a way to understand how a promotional price was constructed.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          The basic relationship is straightforward. For a percentage discount, the savings equal the original price multiplied by the discount percentage. A $200 product at 15% off produces $30 in savings and a $170 sale price. For a fixed-dollar discount, the calculation is even simpler: a $200 product with a $30 coupon costs $170 before any applicable tax. The difficulty begins when multiple reductions are applied in sequence because each percentage discount works on the price remaining after the previous discount.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          That is why "20% off plus 10% off" is not the same as 30% off. Starting from $100, the first 20% discount reduces the price to $80. The second 10% discount removes $8 from that $80, leaving $72. The customer saves $28, so the effective discount is 28%. The reference calculator uses exactly this sequential model.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          The same principle becomes important when coupons and sales tax are involved. A percentage discount can reduce the taxable selling price, while a fixed coupon may be applied after that reduction. However, sales-tax treatment is jurisdiction-specific. New York, for example, distinguishes between store-issued coupons and manufacturer coupons, with the former generally reducing the taxable receipt while the latter can leave the full selling price subject to tax. Illinois similarly states that the treatment of discounts, rebates, and coupons can depend on whether the retailer receives reimbursement.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed max-w-4xl font-normal">
          The calculator therefore works best as a transparent planning tool: enter the promotion exactly as it is described, inspect the intermediate calculation, and distinguish between the mathematical discount model and any jurisdiction-specific tax rule that may apply at checkout.
        </p>
      </section>

      {/* SECTION 2: HOW A DISCOUNT CHANGES THE ORIGINAL PRICE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Tag className="h-5 w-5" /> How a Discount Changes the Original Price
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The foundation of every discount calculation is the relationship between the original price, the amount saved, and the final selling price. If an item has an original price of $100 and a 20% discount, the savings are $20 because 20% of $100 is $20. Subtracting that amount from the original price leaves a final price of $80. The mathematical sequence is simple, but understanding the sequence is more useful than memorizing one formula because the same relationship can be rearranged to solve different problems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Standard Percentage Discount Formula
            </h3>
            <div className="space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div>Savings = Original Price × (Discount % ÷ 100)</div>
              <div>Final Price = Original Price − Savings</div>
              <div className="text-zinc-500 dark:text-zinc-400 text-[11px] pt-1">
                Alternative: Final Price = Original Price × (1 − Discount % ÷ 100)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Fixed-Dollar Discount Formula
            </h3>
            <div className="space-y-1 font-mono text-xs text-slate-800 dark:text-slate-200">
              <div>Savings = Fixed Coupon Amount</div>
              <div>Final Price = Original Price − Fixed Coupon</div>
              <div className="text-zinc-500 dark:text-zinc-400 text-[11px] pt-1">
                Effective Rate = (Fixed Coupon ÷ Original Price) × 100
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          This second form is especially useful when comparing multiple discounts because it makes the remaining price percentage visible. A 20% discount means that 80% of the original price remains. A 15% discount means 85% remains. A 40% discount means 60% remains.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          Suppose an item originally costs $59.99 and the store advertises 15% off. The mathematical savings are:
          <br />
          <strong className="font-mono">$59.99 × 15% = $8.9985</strong>
          <br />
          When displayed as currency, the savings become approximately $9.00, leaving a final price of $50.99. That is the calculator's reference scenario.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The calculator also supports fixed-dollar discounts. In that situation there is no percentage conversion. A $100 item with a $20 fixed discount simply becomes $80 before tax. This distinction matters because a "$20 off" promotion does not have the same percentage effect at every price. On a $100 product it represents 20% savings, while on a $400 product it represents only 5%. Percentage discounts behave in the opposite direction: the dollar savings increase as the original price rises, while the percentage relationship stays constant.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          This is useful when comparing promotions. A retailer might offer either "$20 off" or "20% off." Which one is better depends on the original price. At $50, a 20% discount saves $10, making the $20 coupon better. At $200, 20% saves $40, making the percentage discount better. The calculator makes those comparisons explicit rather than requiring mental arithmetic.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The inverse calculation is equally useful. If the final price is known, the original price can be recovered when the discount percentage is known:
          <br />
          <strong className="font-mono">Original Price = Final Price ÷ (1 − Discount Percentage ÷ 100)</strong>
          <br />
          For example, if an item sells for $80 after a 20% discount, the original price was $100. Likewise, if an original price and final price are known, the effective discount can be reconstructed:
          <br />
          <strong className="font-mono">Discount Percentage = (Original Price − Final Price) ÷ Original Price × 100</strong>
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          These inverse calculations are useful for checking advertisements, receipts, invoices, and sale tags. They also explain why a calculator that only provides one forward calculation is less useful than a true multi-variable solver. The question is not always "How much is 20% off?" Sometimes the question is "This item now costs $84; what percentage discount did I actually receive?" The calculator should answer both.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          When checking a promotion manually, remember that the displayed "percentage off" should normally be calculated from the reference price or eligible price specified by the promotion. A sale may use an MSRP, marked price, previous selling price, or another promotional base. Those definitions are commercial terms and can affect whether a stated percentage reflects the price you expected to pay.
        </p>
      </section>

      {/* SECTION 3: STACKED DISCOUNTS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Layers className="h-5 w-5" /> Stacked Discounts: Why 20% + 10% Equals 28%, Not 30%
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          Stacked discounts are where many otherwise sensible calculations go wrong. A retailer may advertise "20% off plus an extra 10% off," and it is tempting to add the two percentages and conclude that the item is 30% off. That is not how sequential percentage discounts generally work. The second percentage is applied to the price left after the first discount.
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3">
          <h3 className="font-bold text-xs uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Step-by-Step Breakdown: $100 @ 20% Off + Extra 10% Off
          </h3>
          <div className="space-y-1.5 text-xs font-mono text-slate-800 dark:text-slate-200">
            <div>1. First 20% Discount: $100 × 20% = $20.00 Savings → Price becomes $80.00</div>
            <div>2. Secondary 10% Discount: $80 × 10% = $8.00 Savings → Final Price becomes $72.00</div>
            <div>3. Total Cumulative Savings: $100 − $72 = $28.00 Saved</div>
            <div className="text-blue-600 dark:text-blue-400 font-bold pt-1">
              4. Effective Combined Discount: $28.00 ÷ $100 = 28.00% (Not 30.00%)
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The calculator models this sequentially as:
          <br />
          <strong className="font-mono">Final Price = Original Price × (1 − D1) × (1 − D2)</strong>
          <br />
          The effective discount can then be written as:
          <br />
          <strong className="font-mono">Effective Discount = 1 − [(1 − D1)(1 − D2)]</strong>
          <br />
          For 20% and 10%: <strong className="font-mono">1 − (0.80 × 0.90) = 0.28 = 28%</strong>
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          This is more than a mathematical curiosity. It matters whenever a consumer compares promotions. Suppose Store A offers 30% off and Store B offers 20% off plus an extra 10%. At first glance, those offers look identical. They are not. Store A's 30% promotion produces a $70 price on a $100 item, while Store B's sequential promotion produces $72. Store B therefore provides only 28% effective savings.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The same reasoning applies to larger stacks. A 20% discount followed by 20% is:
          <br />
          <strong className="font-mono">$100 × 0.80 × 0.80 = $64</strong> (Effective discount is 36%, not 40%).
          <br />
          A 30% discount followed by 10% gives:
          <br />
          <strong className="font-mono">$100 × 0.70 × 0.90 = $63</strong> (Effective discount is 37%).
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          An important mathematical property is that two pure percentage discounts produce the same final price regardless of which one comes first. Applying 20% and then 10% produces the same result as applying 10% and then 20%, because multiplication is commutative:
          <br />
          <strong className="font-mono">0.80 × 0.90 = 0.90 × 0.80 = 0.72</strong>
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          But this does not mean every promotional stack is order-independent. Once you combine percentage discounts with fixed-dollar coupons, the order matters. A $10 coupon taken from $100 before a 20% discount gives:
          <br />
          <strong className="font-mono">($100 − $10) × 0.80 = $72</strong>
          <br />
          while taking 20% first and then $10 gives:
          <br />
          <strong className="font-mono">$100 × 0.80 − $10 = $70</strong>
          <br />
          That $2 difference exists entirely because the fixed-dollar amount is applied at a different stage.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          This distinction is one reason the calculator has a dedicated Stacked Discounts module and a separate Coupon Stack module. They represent different pricing mechanisms and should not be collapsed into one generic "discount" field.
        </p>
      </section>

      {/* SECTION 4: COUPONS & FIXED-DOLLAR PROMOTIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Percent className="h-5 w-5" /> Coupons and Fixed-Dollar Promotions: Percentage First, Fixed Amount Second
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          Coupons require a different mental model because a fixed-dollar coupon does not operate as a percentage of whatever price remains. A $10 coupon always represents $10 of nominal savings, subject to any conditions attached to the offer. When the coupon is combined with a percentage discount, the order in which the offers are applied becomes important.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The calculator's Coupon Stack module uses a percentage discount first and then a fixed-dollar coupon. Its reference scenario starts with $100, applies a 20% percentage coupon, and then applies a $10 fixed coupon. The first discount reduces the price to $80. The fixed coupon then reduces that $80 by another $10, resulting in a final price of $70. Total savings are therefore $30.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
          <div>Formula: Final Price = max(0, [Original Price × (1 − % Off)] − Fixed Coupon)</div>
          <div>Reference: $100 × (1 − 0.20) − $10 = $80 − $10 = $70.00 Final Checkout</div>
        </div>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          This means the effective savings are 30% in this specific example, but that does not mean that a "20% + $10" promotion is always equivalent to 30% off. The effective percentage depends on the original price.
          <br />
          • On a $50 item: <strong className="font-mono">$50 × 0.80 − $10 = $30</strong> (Savings: $20, or <strong>40%</strong>).
          <br />
          • On a $200 item: <strong className="font-mono">$200 × 0.80 − $10 = $150</strong> (Savings: $50, or <strong>25%</strong>).
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The same coupon therefore produces a different effective discount depending on the purchase price. This is why shoppers should compare the final checkout amount rather than judging a coupon solely by its advertised percentage or dollar amount.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          Coupon terms also matter. A promotion may specify a minimum purchase, maximum discount, eligible products, excluded brands, one-use restrictions, or a particular order of application. A calculator can perform the mathematics described by the user, but it cannot infer hidden promotional terms that are not entered.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The distinction becomes particularly important when sales tax is involved. If a percentage discount and a store-funded coupon reduce the taxable selling price, sales tax may be calculated on the amount after the discount. But this is not a universal rule for every coupon type and every jurisdiction. New York's tax guidance explicitly distinguishes store-issued coupons from manufacturer's coupons: a store coupon generally reduces the taxable receipt, while a manufacturer's coupon can leave the full selling price subject to tax because the seller is reimbursed. Illinois similarly explains that the treatment can depend on whether the retailer is reimbursed for the incentive.
        </p>
      </section>

      {/* SECTION 5: SALES TAX AFTER A DISCOUNT */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Receipt className="h-5 w-5" /> Sales Tax After a Discount: The Checkout Price Is More Than the Sale Price
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The Sales Tax + Discount module combines two different operations: reduce the original price and then calculate tax on the modeled taxable amount. The production reference example starts with $100, applies a 20% discount, and then applies an 8% sales-tax rate. The discounted price is $80, the modeled sales tax is $6.40, and the final checkout price is $86.40.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
          <div>1. Original Price: $100.00</div>
          <div>2. Discount (20%): -$20.00 → Net Taxable Base = $80.00</div>
          <div>3. Sales Tax (8% of $80): +$6.40</div>
          <div className="text-blue-600 dark:text-blue-400 font-bold pt-1">
            4. Final Checkout Total: $80.00 + $6.40 = $86.40
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The order matters. A calculator that adds sales tax and then applies the discount can produce a different interpretation, depending on how the promotion is structured. The calculator therefore models discount first and tax second for this module.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          But the page should be careful not to claim that every U.S. transaction is legally taxed exactly this way. Sales-tax treatment of discounts and coupons varies by jurisdiction and by the type of promotion. New York's Department of Taxation and Finance explicitly distinguishes store-issued coupons from manufacturer's coupons, and Illinois also distinguishes reimbursed and non-reimbursed discounts.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          This means a generic "sales tax after discount" calculator is best interpreted as a modeled checkout scenario, not a universal statement of tax law. If a retailer's receipt says that tax was calculated on the original price because a manufacturer reimbursed the discount, the receipt's tax calculation is the relevant transaction result.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The same principle applies to rebates. A rebate may reduce the customer's ultimate economic cost without necessarily reducing the taxable selling price at the time of sale. New York, for example, states that manufacturers' rebates do not reduce the taxable receipt because the manufacturer is subsidizing the purchase rather than reducing the seller's selling price.
        </p>
      </section>

      {/* SECTION 6: REVERSE DISCOUNT CALCULATIONS */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <TrendingUp className="h-5 w-5" /> Reverse Discount Calculations: Recover the Original Price and Real Savings
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          Discount mathematics is often used backward. A customer may see a sale price and want to know the original price. A business may know its list price and sale price and want to calculate the actual discount percentage. A receipt may show the amount saved without clearly displaying the effective percentage. These are inverse problems, and they are exactly why the calculator's multi-variable solver is useful.
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          Suppose an item costs $80 after a 20% discount. The remaining price represents 80% of the original price. Therefore:
          <br />
          <strong className="font-mono">Original Price = $80 ÷ 0.80 = $100.00</strong>
          <br />
          The same method works for any percentage where the discount is below 100%. If the final price is $170 after a 15% discount, then:
          <br />
          <strong className="font-mono">Original Price = $170 ÷ 0.85 = $200.00</strong>
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The calculator can also solve for the actual discount rate when both original and final prices are known. Suppose an item was originally $250 and is now $200. The customer saved $50:
          <br />
          <strong className="font-mono">$250 − $200 = $50</strong> → <strong className="font-mono">$50 ÷ $250 × 100 = 20%</strong>
        </p>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          The ability to reconstruct savings is particularly useful when promotions are worded in ways that obscure the underlying price. A "sale" can be compared against the original selling price by calculating the actual percentage reduction. This is more reliable than judging a deal by promotional language such as "save big" or "limited-time offer."
        </p>
      </section>

      {/* SECTION 7: DISCOUNT VS REBATE, CASHBACK & SELLING PRICE */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <Shield className="h-5 w-5" /> Discount vs. Rebate, Cashback and Selling Price
        </h2>
        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          A discount is not the same thing as a rebate or cashback offer, even though all three can reduce the customer's effective cost. Understanding the difference is important because the timing of the benefit and its possible tax treatment can be different.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">Discount</h3>
            <p className="text-xs text-slate-900 dark:text-slate-100 font-normal">
              Reduces the selling price immediately at the point of sale. Lowers the checkout total and generally establishes a lower taxable base for store-funded offers.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">Rebate</h3>
            <p className="text-xs text-slate-900 dark:text-slate-100 font-normal">
              Provides money back after the purchase via mail-in or digital submission. Full price and full sales tax are paid upfront at the register.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h3 className="font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400">Cashback</h3>
            <p className="text-xs text-slate-900 dark:text-slate-100 font-normal">
              Rewards returned to your credit card or platform account post-transaction. Does not alter invoice list prices or checkout tax assessments.
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-900 dark:text-slate-100 leading-relaxed font-normal">
          A practical example makes this clearer. Imagine a $1,000 appliance with either:
          <br />
          1. $200 immediate store discount; or
          <br />
          2. $200 manufacturer rebate after purchase.
          <br />
          The store discount reduces the selling price immediately. The manufacturer's rebate may reduce the consumer's eventual out-of-pocket cost after the rebate is received, but the taxable receipt can be determined differently depending on the jurisdiction and promotion.
        </p>
      </section>

      {/* SECTION 8: HOW TO USE THE DISCOUNT CALCULATOR */}
      <section className="space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5" /> How to Use the Discount Calculator
        </h2>
        <div className="space-y-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 font-normal leading-relaxed">
          <p>
            • <strong>Start with the Standard Discount Solver:</strong> When you have an ordinary percentage or fixed-dollar promotion. Enter any two variables (Original Price, Discount %, Final Price, or You Saved) to solve for the missing values.
          </p>
          <p>
            • <strong>Use Stacked Discounts:</strong> When multiple percentage discounts are applied sequentially (e.g., clearance 20% off plus extra 10% coupon). The calculator shows step-by-step price reductions and the true effective rate (28%).
          </p>
          <p>
            • <strong>Use Coupon Stack:</strong> When combining percentage coupons with fixed dollar promo codes. The tool models percent off first and fixed dollar second.
          </p>
          <p>
            • <strong>Use Sales Tax + Discount:</strong> To estimate total cash required at checkout by applying sales tax to the discounted taxable base.
          </p>
          <p>
            • <strong>Use Visual Dashboards:</strong> To compare original list price, final sale price, and total dollars saved on dynamic visual charts.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs font-mono text-blue-900 dark:text-blue-200">
          Optimal Workflow: Original Price → Discount Mechanism → Intermediate Price → Tax if applicable → Final Checkout Price → Total Savings
        </div>
      </section>

      {/* SECTION 9: FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-5 shadow-xs space-y-2"
            >
              <h3 className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-zinc-100 flex items-start gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums font-bold shrink-0">
                  Q{idx + 1}.
                </span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 10: RESEARCH & JURISDICTIONAL TAX BASIS */}
      <section className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-500 dark:text-zinc-400 space-y-1.5">
        <div className="font-bold flex items-center gap-1.5 text-zinc-700 dark:text-zinc-300">
          <Info className="h-3.5 w-3.5" /> Research Basis for Tax &amp; Coupon Computations
        </div>
        <p>
          The sequential discount compounding model ($D_1 \times D_2$), percentage-first coupon stack, and post-discount sales-tax calculations reflect standard retail arithmetic. Official tax guidance confirms that coupon treatment varies by jurisdiction: New York distinguishes store-issued from manufacturer-reimbursed coupons, while Illinois confirms that reimbursement rules govern whether promotional amounts remain subject to retail sales tax.
        </p>
      </section>
    </div>
  );
}
