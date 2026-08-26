import { CalculatorModuleDefinition } from "../../types";
import { solveSalesTax } from "@/lib/calculator-engine/formulas/sales-tax";
import { SalesTaxCalculator } from "@/components/calculator/sales-tax/SalesTaxCalculator";
import { SalesTaxContent } from "@/components/calculator/sales-tax/SalesTaxContent";

export const SALES_TAX_CALCULATOR: CalculatorModuleDefinition = {
  id: "sales-tax",
  title: "Sales Tax Calculator — U.S. State & Local Tax Estimator",
  slug: "sales-tax-calculator",
  category: "Finance",
  subcategory: "Tax and Salary",
  description:
    "Calculate sales tax in five ways, split taxable and exempt items, extract tax from gross business receipts, compare U.S. state rates, and estimate state-by-state tax differences.",
  iconName: "Receipt",
  featured: true,
  tags: [
    "sales tax calculator",
    "us sales tax calculator",
    "state sales tax rates",
    "california sales tax",
    "texas sales tax",
    "sales tax deduction",
    "multi item receipt calculator",
    "business sales tax collection",
  ],
  relatedCalculators: [
    "mortgage-calculator",
    "home-equity-loan-calculator",
    "heloc-calculator",
    "down-payment-calculator",
    "rent-vs-buy-calculator",
    "percentage-calculator",
  ],
  formulaDescription:
    "Mode A: Tax = Price × (Rate / 100). Mode B: Pre-Tax = Final / (1 + Rate / 100). Mode C: Rate = ((Final - Pre-Tax) / Pre-Tax) × 100. Mode D: Pre-Tax = Tax / (Rate / 100). Mode E: Rate = (Tax / Pre-Tax) × 100.",
  faqs: [
    {
      question: "How do I calculate sales tax?",
      answer:
        "For a tax-exclusive price, multiply the pre-tax price by the sales-tax rate and divide by 100. Then add the tax to the original price to obtain the final amount. For example, $100 at 8.25% produces $8.25 tax and a $108.25 total.",
    },
    {
      question: "How do I calculate the price before sales tax?",
      answer:
        "When the final price already includes sales tax, divide the final price by 1 + tax rate/100. For example, $108.25 at 8.25% corresponds to a $100 pre-tax price.",
    },
    {
      question: "How do I calculate the sales-tax rate from a receipt?",
      answer:
        "Subtract the pre-tax price from the final price to obtain the tax amount, then divide that tax by the pre-tax price and multiply by 100. A $100 price becoming $108.25 implies an 8.25% tax rate.",
    },
    {
      question: "What is the difference between tax-inclusive and tax-exclusive prices?",
      answer:
        "A tax-exclusive price does not yet contain sales tax. A tax-inclusive amount already contains the tax. The two situations require different formulas when you work backward from a final amount.",
    },
    {
      question: "How is sales tax calculated on multiple items?",
      answer:
        "Calculate each item's quantity × unit price, identify which items are taxable, total the taxable subtotal, and apply the relevant tax rate to that taxable base. Exempt items remain part of the receipt subtotal but do not contribute to the tax base under the modeled exemption.",
    },
    {
      question: "Can some items on the same receipt be tax-exempt?",
      answer:
        "Yes. Taxability can differ by product and jurisdiction. The calculator's receipt builder allows individual items to be marked taxable or exempt so that the tax applies only to the modeled taxable subtotal.",
    },
    {
      question: "Which U.S. states have no statewide sales tax?",
      answer:
        "As of 2026, Alaska, Delaware, Montana, New Hampshire, and Oregon do not impose a general statewide sales tax. Alaska allows local governments to impose sales taxes, so \"no statewide sales tax\" does not mean every purchase in Alaska has zero sales tax.",
    },
    {
      question: "Does Oregon have a sales tax?",
      answer:
        "Oregon does not have a general sales or use/transaction tax. The state does have specific transaction taxes, and purchases made in other states can involve other jurisdictions' tax rules.",
    },
    {
      question: "Why is the sales-tax rate on my receipt different from the state rate?",
      answer:
        "The receipt can include local sales taxes in addition to the state component. County, city, district, and other local taxes can cause the combined rate to differ from the statewide rate.",
    },
    {
      question: "What is an average local sales-tax rate?",
      answer:
        "An average local rate is a statistical or modeled estimate of local sales taxation within a state or defined geography. It is not automatically the exact rate that applies to every address or transaction.",
    },
    {
      question: "What is the maximum combined sales-tax rate?",
      answer:
        "The maximum combined rate represents a high-end combination of state and local rates under the relevant dataset. It should not be interpreted as the rate applied everywhere in the state.",
    },
    {
      question: "How does the Business Sales Tax Collection Calculator work?",
      answer:
        "It treats the entered gross receipts as a tax-inclusive amount and extracts the embedded sales tax using Gross × Rate / (100 + Rate). This differs from multiplying gross receipts directly by the rate.",
    },
    {
      question: "Why is $10,000 at 8.25% only $762.12 of embedded sales tax?",
      answer:
        "Because the $10,000 is already tax-inclusive. The embedded tax is 10,000 × 8.25 / 108.25, which is approximately $762.12. If $10,000 were instead the pre-tax taxable base, the ordinary sales tax would be $825.",
    },
    {
      question: "How do I compare sales tax between two states?",
      answer:
        "Enter the same purchase price and select the two jurisdictions in the What-If State Comparison. The calculator shows the modeled tax and total for each state and the difference between them.",
    },
    {
      question: "Does a state with no sales tax always have lower taxes?",
      answer:
        "No. A state can lack a general statewide sales tax while collecting revenue through local sales taxes, income taxes, property taxes, excise taxes, or other mechanisms. A sales-tax comparison is only one component of a broader tax comparison.",
    },
    {
      question: "Are groceries exempt from sales tax?",
      answer:
        "It depends on the state and the precise definition of the product. Some jurisdictions exempt certain groceries, while others tax particular categories or prepared foods differently. Use the calculator's state reference as a starting point and verify unusual transactions with the relevant jurisdiction.",
    },
    {
      question: "Is clothing exempt from sales tax?",
      answer:
        "Clothing treatment varies by state and sometimes by item, price, or special exemption period. It should not be assumed that the same clothing rule applies nationwide.",
    },
    {
      question: "Can I deduct sales tax on my federal tax return?",
      answer:
        "Eligible taxpayers who itemize may generally elect to deduct state and local general sales taxes instead of state and local income taxes, subject to federal rules and the applicable SALT limitation. The IRS provides a dedicated Sales Tax Deduction Calculator for this purpose.",
    },
    {
      question: "Is the sales-tax calculator an exact tax filing tool?",
      answer:
        "It is a calculation and planning tool. An exact transaction-level tax determination may require the precise customer location, seller's tax obligations, product taxability, effective date, exemption documentation, and current state/local rules.",
    },
    {
      question: "Why should I use the five-way solver instead of a basic sales-tax calculator?",
      answer:
        "Because real transactions do not always give you the same starting information. Sometimes you know price and rate, sometimes final amount and rate, sometimes tax amount, and sometimes both prices. The five-way solver lets you solve whichever variable is missing instead of forcing every problem into the same forward calculation.",
    },
  ],
  inputs: [
    { name: "preTaxPrice", label: "Pre-Tax Price ($)", type: "currency", defaultValue: 100, unit: "$", min: 0, max: 100000000, step: 10 },
    { name: "taxRate", label: "Sales Tax Rate (%)", type: "percentage", defaultValue: 8.25, unit: "%", min: 0, max: 100, step: 0.125 },
  ],
  outputs: [
    { name: "afterTaxPrice", label: "Final Total Price (After Tax)", format: "currency", highlight: true },
    { name: "taxAmount", label: "Sales Tax Amount", format: "currency", highlight: true },
    { name: "preTaxPrice", label: "Pre-Tax Base Price", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = solveSalesTax({
      preTaxPrice: Number(inputs.preTaxPrice || 100),
      taxRate: Number(inputs.taxRate || 8.25),
      mode: "A",
    });

    return {
      afterTaxPrice: res.afterTaxPrice,
      taxAmount: res.taxAmount,
      preTaxPrice: res.preTaxPrice,
    };
  },
};

(SALES_TAX_CALCULATOR as any).CustomComponent = SalesTaxCalculator;
(SALES_TAX_CALCULATOR as any).ContentComponent = SalesTaxContent;

export default SALES_TAX_CALCULATOR;
