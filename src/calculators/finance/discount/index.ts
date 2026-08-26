import { CalculatorModuleDefinition } from "../../types";
import { calculateDiscountSolver } from "@/lib/calculator-engine/formulas/discount";
import { DiscountCalculator } from "@/components/calculator/discount/DiscountCalculator";
import { DiscountContent } from "@/components/calculator/discount/DiscountContent";

export const DISCOUNT_CALCULATOR: CalculatorModuleDefinition = {
  id: "discount",
  title: "Discount Calculator — Calculate Sale Price, Stacked Discounts & Coupons",
  slug: "discount-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate discounts, final sale prices, stacked percentage discounts, fixed coupons, and sales tax after discounts. Compare savings and solve reverse discount problems.",
  iconName: "Tag",
  featured: true,
  tags: [
    "discount",
    "discount calculator",
    "sale price",
    "savings",
    "coupon",
    "stacked discount",
    "sales tax discount",
  ],
  relatedCalculators: [
    "percentage-calculator",
    "sales-tax-calculator",
    "gst-calculator",
    "vat-calculator",
    "margin-calculator",
    "mortgage-calculator",
    "home-equity-loan-calculator",
    "heloc-calculator",
    "down-payment-calculator",
    "rent-vs-buy-calculator",
  ],
  formulaDescription:
    "Single Discount: Savings = Price × Discount %. Final Price = Price - Savings. Stacked Discount: Final Price = Price × (1 - D1) × (1 - D2).",
  faqs: [
    {
      question: "How do I calculate a percentage discount?",
      answer:
        "Multiply the original price by the discount percentage divided by 100. Subtract that savings amount from the original price. For example, 20% off $100 saves $20, producing an $80 final price.",
    },
    {
      question: "What is the formula for a sale price?",
      answer:
        "The standard formula is Final Price = Original Price × (1 − Discount Percentage/100). For a $200 item discounted by 15%, the final price is $170.",
    },
    {
      question: "How much is 20% off $100?",
      answer:
        "A 20% discount on $100 saves $20, leaving a final price of $80 before any applicable taxes or additional charges.",
    },
    {
      question: "How do I calculate the original price from a discounted price?",
      answer:
        "Divide the final price by the remaining percentage. For example, if an item costs $80 after a 20% discount, divide $80 by 0.80 to get an original price of $100.",
    },
    {
      question: "What is a stacked discount?",
      answer:
        "A stacked discount means multiple discounts are applied sequentially to the amount remaining after the previous discount. A second 10% discount applied after a first 20% discount is taken from the already reduced price.",
    },
    {
      question: "Is 20% off plus 10% off the same as 30% off?",
      answer:
        "No. On a $100 item, 20% off leaves $80. Another 10% removes $8, leaving $72. The total saving is $28, so the effective discount is 28%, not 30%.",
    },
    {
      question: "How do I calculate the effective discount from two discounts?",
      answer:
        "For two sequential discounts, use Effective Discount = 1 − (1 − D1)(1 − D2). With 20% and 10%, the effective discount is 28%.",
    },
    {
      question: "How does a percentage coupon plus a fixed coupon work?",
      answer:
        "Under this calculator's model, the percentage discount is applied first and the fixed-dollar coupon is then subtracted from the reduced amount. A $100 item with 20% off and a $10 fixed coupon therefore becomes $70.",
    },
    {
      question: "Does the order of coupons matter?",
      answer:
        "Yes when different types of discounts are combined. Two pure percentage discounts produce the same result regardless of order, but a percentage discount and a fixed-dollar coupon can produce different prices depending on which is applied first.",
    },
    {
      question: "Is sales tax calculated before or after a discount?",
      answer:
        "The calculator's Sales Tax + Discount model applies the discount first and then calculates tax on the discounted taxable amount. However, actual sales-tax treatment of coupons, rebates, and manufacturer-funded promotions varies by jurisdiction. New York and Illinois both publish guidance showing that coupon reimbursement can affect the taxable amount.",
    },
    {
      question: "Can a manufacturer's coupon be taxed differently from a store coupon?",
      answer:
        "Yes. Tax treatment can depend on whether the retailer is reimbursed for the coupon. New York, for example, generally treats store-issued coupons and manufacturer's coupons differently for sales-tax purposes.",
    },
    {
      question: "What is the difference between a discount and a rebate?",
      answer:
        "A discount normally reduces the selling price at purchase. A rebate generally provides a later payment or credit after qualifying conditions are satisfied. A rebate can therefore reduce the customer's eventual economic cost without necessarily reducing the taxable selling price in every jurisdiction.",
    },
    {
      question: "What is the difference between a discount and cashback?",
      answer:
        "A discount reduces the amount due at checkout. Cashback usually returns money after the purchase through a retailer, card issuer, payment platform, or other program. They can have similar economic effects but are different transaction mechanisms.",
    },
    {
      question: "How much did I actually save from a sale?",
      answer:
        "Your savings are normally the original price minus the applicable discounted price. Your effective savings percentage is the savings divided by the original price, multiplied by 100. For stacked discounts, calculate the effective percentage from the final price rather than adding the advertised percentages.",
    },
    {
      question: "Why does my final checkout price differ from a discount calculator?",
      answer:
        "The calculator uses the discount, coupon, and tax assumptions entered. A retailer's checkout may apply exclusions, manufacturer reimbursement, minimum-purchase rules, shipping, local taxes, fees, or other promotion-specific conditions. For a real transaction, the retailer's disclosed checkout calculation is the authoritative amount.",
    },
  ],
  inputs: [
    { name: "originalPrice", label: "Original List Price ($)", type: "currency", defaultValue: 59.99, unit: "$", min: 0.1, max: 1000000, step: 5 },
    { name: "discountValue", label: "Discount Value", type: "number", defaultValue: 15, unit: "%", min: 0, max: 100, step: 1 },
  ],
  outputs: [
    { name: "finalPrice", label: "Final Sale Price", format: "currency", highlight: true },
    { name: "youSaved", label: "Total Amount Saved", format: "currency", highlight: true },
    { name: "effectiveDiscountPercent", label: "Effective Savings %", format: "percentage" },
  ],
  calculate: (inputs) => {
    const res = calculateDiscountSolver({
      originalPrice: Number(inputs.originalPrice || 59.99),
      discountValue: Number(inputs.discountValue || 15),
      discountType: "percent",
    });

    return {
      finalPrice: res.finalPrice,
      youSaved: res.youSaved,
      effectiveDiscountPercent: `${res.effectiveDiscountPercent}%`,
    };
  },
};

(DISCOUNT_CALCULATOR as any).CustomComponent = DiscountCalculator;
(DISCOUNT_CALCULATOR as any).ContentComponent = DiscountContent;

export default DISCOUNT_CALCULATOR;
