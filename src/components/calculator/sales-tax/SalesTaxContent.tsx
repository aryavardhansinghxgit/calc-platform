"use client";

import React, { useState } from "react";
import Link from "next/link";
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
  Building2,
  FileSpreadsheet,
  ArrowRight,
  Calculator,
} from "lucide-react";

export function SalesTaxContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "1. How do I calculate sales tax?",
      answer:
        "For a tax-exclusive price, multiply the pre-tax price by the sales-tax rate and divide by 100. Then add the tax to the original price to obtain the final amount. For example, $100 at 8.25% produces $8.25 tax and a $108.25 total.",
    },
    {
      question: "2. How do I calculate the price before sales tax?",
      answer:
        "When the final price already includes sales tax, divide the final price by 1 + tax rate/100. For example, $108.25 at 8.25% corresponds to a $100 pre-tax price.",
    },
    {
      question: "3. How do I calculate the sales-tax rate from a receipt?",
      answer:
        "Subtract the pre-tax price from the final price to obtain the tax amount, then divide that tax by the pre-tax price and multiply by 100. A $100 price becoming $108.25 implies an 8.25% tax rate.",
    },
    {
      question: "4. What is the difference between tax-inclusive and tax-exclusive prices?",
      answer:
        "A tax-exclusive price does not yet contain sales tax. A tax-inclusive amount already contains the tax. The two situations require different formulas when you work backward from a final amount.",
    },
    {
      question: "5. How is sales tax calculated on multiple items?",
      answer:
        "Calculate each item's quantity × unit price, identify which items are taxable, total the taxable subtotal, and apply the relevant tax rate to that taxable base. Exempt items remain part of the receipt subtotal but do not contribute to the tax base under the modeled exemption.",
    },
    {
      question: "6. Can some items on the same receipt be tax-exempt?",
      answer:
        "Yes. Taxability can differ by product and jurisdiction. The calculator's receipt builder allows individual items to be marked taxable or exempt so that the tax applies only to the modeled taxable subtotal.",
    },
    {
      question: "7. Which U.S. states have no statewide sales tax?",
      answer:
        "As of 2026, Alaska, Delaware, Montana, New Hampshire, and Oregon do not impose a general statewide sales tax. Alaska allows local governments to impose sales taxes, so \"no statewide sales tax\" does not mean every purchase in Alaska has zero sales tax.",
    },
    {
      question: "8. Does Oregon have a sales tax?",
      answer:
        "Oregon does not have a general sales or use/transaction tax. The state does have specific transaction taxes, and purchases made in other states can involve other jurisdictions' tax rules.",
    },
    {
      question: "9. Why is the sales-tax rate on my receipt different from the state rate?",
      answer:
        "The receipt can include local sales taxes in addition to the state component. County, city, district, and other local taxes can cause the combined rate to differ from the statewide rate.",
    },
    {
      question: "10. What is an average local sales-tax rate?",
      answer:
        "An average local rate is a statistical or modeled estimate of local sales taxation within a state or defined geography. It is not automatically the exact rate that applies to every address or transaction.",
    },
    {
      question: "11. What is the maximum combined sales-tax rate?",
      answer:
        "The maximum combined rate represents a high-end combination of state and local rates under the relevant dataset. It should not be interpreted as the rate applied everywhere in the state.",
    },
    {
      question: "12. How does the Business Sales Tax Collection Calculator work?",
      answer:
        "It treats the entered gross receipts as a tax-inclusive amount and extracts the embedded sales tax using Gross × Rate / (100 + Rate). This differs from multiplying gross receipts directly by the rate.",
    },
    {
      question: "13. Why is $10,000 at 8.25% only $762.12 of embedded sales tax?",
      answer:
        "Because the $10,000 is already tax-inclusive. The embedded tax is 10,000 × 8.25 / 108.25, which is approximately $762.12. If $10,000 were instead the pre-tax taxable base, the ordinary sales tax would be $825.",
    },
    {
      question: "14. How do I compare sales tax between two states?",
      answer:
        "Enter the same purchase price and select the two jurisdictions in the What-If State Comparison. The calculator shows the modeled tax and total for each state and the difference between them.",
    },
    {
      question: "15. Does a state with no sales tax always have lower taxes?",
      answer:
        "No. A state can lack a general statewide sales tax while collecting revenue through local sales taxes, income taxes, property taxes, excise taxes, or other mechanisms. A sales-tax comparison is only one component of a broader tax comparison.",
    },
    {
      question: "16. Are groceries exempt from sales tax?",
      answer:
        "It depends on the state and the precise definition of the product. Some jurisdictions exempt certain groceries, while others tax particular categories or prepared foods differently. Use the calculator's state reference as a starting point and verify unusual transactions with the relevant jurisdiction.",
    },
    {
      question: "17. Is clothing exempt from sales tax?",
      answer:
        "Clothing treatment varies by state and sometimes by item, price, or special exemption period. It should not be assumed that the same clothing rule applies nationwide.",
    },
    {
      question: "18. Can I deduct sales tax on my federal tax return?",
      answer:
        "Eligible taxpayers who itemize may generally elect to deduct state and local general sales taxes instead of state and local income taxes, subject to federal rules and the applicable SALT limitation. The IRS provides a dedicated Sales Tax Deduction Calculator for this purpose.",
    },
    {
      question: "19. Is the sales-tax calculator an exact tax filing tool?",
      answer:
        "It is a calculation and planning tool. An exact transaction-level tax determination may require the precise customer location, seller's tax obligations, product taxability, effective date, exemption documentation, and current state/local rules.",
    },
    {
      question: "20. Why should I use the five-way solver instead of a basic sales-tax calculator?",
      answer:
        "Because real transactions do not always give you the same starting information. Sometimes you know price and rate, sometimes final amount and rate, sometimes tax amount, and sometimes both prices. The five-way solver lets you solve whichever variable is missing instead of forcing every problem into the same forward calculation.",
    },
  ];

  return (
    <div className="space-y-10 mt-8 pt-8 text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans">
      {/* 1. Overview */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
          Sales Tax Calculator: Calculate Sales Tax, Final Price, Tax Rate and More
        </h2>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            Sales tax looks simple when the question is only, &ldquo;What is 8.25% of $100?&rdquo; But real-world sales-tax calculations quickly become more complicated. Sometimes you know the price and tax rate and need to find the final amount. Sometimes the receipt already includes tax and you need to recover the original pre-tax price. A business may know how much it collected from customers and need to separate the sales tax that belongs to the taxing authority from the revenue retained by the business. A shopper may have several items on one receipt, with some taxable and others exempt. And when comparing purchases across states, the statewide rate is only one part of the story because local sales taxes can change the total rate.
          </p>
          <p>
            This Sales Tax Calculator is built to handle those different questions rather than forcing every calculation into one formula. Its five-way solver can calculate the missing part of a transaction from the other known values, while the multi-item receipt builder separates taxable and exempt purchases and reconciles the complete receipt. The business collection tool handles the different mathematics required when the amount entered is a tax-inclusive gross receipt, and the state directory separates statewide rates from average local rates and maximum combined rates. The What-If comparison then lets you see how the same purchase price changes under two different state-rate assumptions.
          </p>
          <p>
            That distinction between different types of sales-tax problems is important. A $100 item before tax at 8.25% costs $108.25 after tax. But if you are told that the customer paid $108.25 including 8.25% sales tax, the tax is not found by taking 8.25% of $108.25. The tax is embedded inside the gross amount, so the extraction formula is different. This calculator keeps those two situations separate.
          </p>
          <p>
            U.S. sales tax also varies substantially by jurisdiction. As of the 2026 midyear data, five states—Alaska, Delaware, Montana, New Hampshire, and Oregon—do not impose a general statewide sales tax, although local taxation and other transaction-specific taxes can still exist. Alaska, for example, does not impose a state sales tax but allows local municipalities to impose sales taxes; Oregon officially states that it has no general sales or use/transaction tax.
          </p>
          <p>
            Because rates, exemptions, local rules, and tax laws change, the state directory should be treated as a planning and comparison reference rather than a substitute for a jurisdiction-specific tax determination. The calculator is most useful when you understand exactly which rate it is using and whether that rate represents a statewide rate, an estimated local addition, or a maximum combined rate.
          </p>
        </div>
      </section>

      {/* 2. The Five Sales Tax Formulas */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <Calculator className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          The Five Sales Tax Formulas: One Calculator for Five Different Questions
        </h3>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            The most useful feature of the calculator is its five-way solver because the missing variable in a sales-tax problem can change from one transaction to another. The underlying relationship is always the same, but the algebra changes depending on which value you know.
          </p>
          <p>
            When you know the pre-tax price and tax rate, the ordinary calculation is straightforward. Tax is the pre-tax price multiplied by the tax rate divided by 100, and the final price is the pre-tax price plus the tax. At $100 and 8.25%, the sales tax is $8.25 and the customer pays $108.25.
          </p>
          <p>
            The second situation is the reverse problem: you know the final price and tax rate but want to recover the pre-tax price. The correct equation is:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
            Pre-Tax Price = Final Price ÷ (1 + Tax Rate / 100)
          </div>
          <p>
            For example, if a receipt shows a final price of $108.25 and the applicable tax rate is 8.25%, dividing $108.25 by 1.0825 returns $100. That is why simply subtracting 8.25% from the final amount is not the correct reverse calculation. The tax percentage was originally applied to the pre-tax base, not directly to the final amount.
          </p>
          <p>
            The third mode answers a particularly useful question: what tax rate was actually applied? When the pre-tax price and final price are both known, the tax amount is the difference between them, and the effective tax rate can then be calculated as that difference divided by the pre-tax amount. A $100 purchase that becomes $108.25 therefore implies an 8.25% tax rate.
          </p>
          <p>
            The fourth mode solves the final amount when you know the pre-tax price and tax amount. That is simply:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
            Final Price = Pre-Tax Price + Tax
          </div>
          <p>
            The fifth mode solves the rate when you know the pre-tax price and the tax amount:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
            Tax Rate = Tax ÷ Pre-Tax Price × 100
          </div>
          <p>
            These formulas create useful round-trip relationships. Starting with $100, 8.25%, $8.25 tax, and $108.25 final price, you can move forward and backward through the five modes and recover the same underlying transaction. That is important because a calculator that can solve one direction correctly but produces a different answer when the transaction is reversed is not mathematically reliable.
          </p>
          <p>
            The practical advantage is that you do not have to remember which algebraic rearrangement to use. You can choose the question that matches the information on your receipt, invoice, price tag, or business records, enter the known values, and let the solver identify the missing variable.
          </p>
        </div>
      </section>

      {/* 3. Tax-Inclusive vs. Tax-Exclusive */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <Receipt className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Tax-Inclusive vs. Tax-Exclusive Sales Tax: The Difference That Changes the Formula
        </h3>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            The phrase &ldquo;sales tax rate&rdquo; can describe the same percentage while appearing in two completely different calculation contexts. The first is a tax-exclusive price, where the amount shown is before tax. The second is a tax-inclusive amount, where the displayed amount already contains the tax.
          </p>
          <p>
            Suppose an item costs $100 before tax and the tax rate is 8.25%. The tax is $8.25, so the final amount is $108.25. In mathematical form:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            $100 + ($100 × 8.25%) = $108.25
          </div>
          <p>
            Now reverse the scenario. Suppose a customer has already paid $108.25 and that amount includes 8.25% sales tax. The tax component is not $108.25 × 8.25%. Instead, the embedded tax is:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            Tax = Gross Amount × Rate ÷ (100 + Rate)
          </div>
          <p>
            So:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            $108.25 × 8.25 ÷ 108.25 = $8.25
          </div>
          <p>
            and the amount retained before the tax is $100.
          </p>
          <p>
            This distinction becomes particularly important in the Business Sales Tax Revenue &amp; Collection Solver. The calculator&apos;s business module takes gross sales revenue already collected from customers and separates the amount attributable to sales tax from the amount retained as net sales revenue. With $10,000 of gross receipts at 8.25%, the calculator produces $762.12 of sales tax and $9,237.88 of net revenue. That is mathematically different from simply calculating 8.25% of $10,000, which would give $825.
          </p>
          <p>
            The business model therefore uses:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-emerald-600 dark:text-emerald-400">
            Sales Tax = Gross Collected Revenue × Rate ÷ (100 + Rate)
            <br />
            Net Revenue = Gross Collected Revenue − Sales Tax
          </div>
          <p>
            This is one of the most important concepts to understand when using the calculator for business collections. If a business has $10,000 in customer receipts and the advertised price already includes sales tax, the business cannot treat the entire $10,000 as taxable sales revenue and then add another 8.25% on top of it. The tax is already embedded inside the amount collected.
          </p>
          <p>
            The business module is therefore not simply a second version of the ordinary sales-tax calculator. It answers a different accounting question: how much of an already tax-inclusive amount represents sales tax, and how much remains as sales revenue?
          </p>
          <p>
            That distinction also gives the calculator a useful cross-check. If a taxable purchase costs $100 before tax at 8.25%, the final amount is $108.25. Feeding that $108.25 into the business tax extraction model at the same rate should recover exactly $8.25 of embedded tax and $100 of net revenue. When the forward and reverse calculations agree, the two modules are mathematically consistent.
          </p>
        </div>
      </section>

      {/* 4. Multi-Item Receipt */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <FileSpreadsheet className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Multi-Item Sales Receipt Calculator: Tax Only What Is Actually Taxable
        </h3>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            A real receipt rarely consists of one identical type of item. A customer may purchase taxable merchandise alongside products that are exempt or treated differently under the applicable jurisdiction&apos;s rules. That makes a simple &ldquo;subtotal × rate&rdquo; calculation potentially misleading.
          </p>
          <p>
            The Multi-Item Sales Receipt &amp; Invoice Builder handles the receipt line by line. Each item has a description, quantity, unit price, and taxable/exempt status. The calculator then determines each line subtotal, identifies the taxable subtotal, calculates tax on the taxable portion, and combines everything into the final receipt total.
          </p>
          <p>
            Consider the production example:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm bg-zinc-50 dark:bg-zinc-800 p-4 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <li><strong>Laptop Computer:</strong> 1 × $899 = $899 taxable</li>
            <li><strong>Wireless Mouse:</strong> 2 × $25 = $50 taxable</li>
            <li><strong>Prescription Glasses:</strong> 1 × $150 = $150 exempt</li>
          </ul>
          <p>
            The total receipt subtotal is therefore $1,099. But the taxable subtotal is only $949 because the $150 exempt item is excluded from the tax base. At an 8.25% tax rate, the tax is:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            $949 × 8.25% = $78.2925 → $78.29
          </div>
          <p>
            The final receipt total is therefore:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            $1,099 + $78.29 = $1,177.29
          </div>
          <p>
            That illustrates why the calculator should not apply the rate to the entire receipt automatically. The correct tax base depends on which line items are taxable under the assumptions being used.
          </p>
          <p>
            The receipt builder also makes quantities important. A product entered at $25 with quantity 2 contributes $50 to the subtotal, not $25. If the same line is taxable, the $50 becomes part of the taxable base. This sounds obvious, but multi-item invoice calculations are exactly where unnoticed quantity and taxability mistakes can propagate through the final result.
          </p>
          <p>
            The line-item model is especially useful for businesses creating a quick invoice estimate or for shoppers checking whether a manually calculated receipt makes sense. It also provides a cleaner audit trail: instead of seeing only a single $78.29 tax figure, the user can see which items contributed to the taxable subtotal.
          </p>
          <p>
            The calculator&apos;s treatment of exemptions should still be understood carefully. Product exemptions are jurisdiction-specific. A product that receives an exemption in one state may be taxable in another, and exemptions can depend on the type of product, the customer&apos;s use, the transaction circumstances, or local rules. The state directory&apos;s exemption information is therefore best regarded as a reference layer rather than a universal legal determination.
          </p>
          <p>
            This is particularly important with categories such as groceries and clothing. A general statement that &ldquo;groceries are tax-free&rdquo; or &ldquo;clothing is exempt&rdquo; is too broad for the United States. Sales-tax treatment varies by state and sometimes by locality or product definition. The calculator should therefore be used according to the jurisdiction and assumptions represented in its state data.
          </p>
        </div>
      </section>

      {/* 5. State & Local Tax */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          U.S. State and Local Sales Tax: Why the Rate on Your Receipt Can Be Different
        </h3>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            There is no single nationwide U.S. sales-tax rate. The amount charged at checkout can reflect a combination of state, county, city, transit, district, or other local taxes depending on the jurisdiction and the transaction. That is why the calculator&apos;s 50-state directory deliberately separates State Rate %, Average Local Rate %, and Maximum Combined % instead of presenting one number as though it represented every sale in the state.
          </p>
          <p>
            The distinction between those columns is important. A state&apos;s statutory rate tells you about the state-level component. An average local rate is an estimated local addition across a defined group of jurisdictions. A maximum combined rate represents a different concept again. It is not necessarily the rate that applies to every customer in the state.
          </p>
          <p>
            Current 2026 state-rate research illustrates why this matters. Tax Foundation&apos;s midyear 2026 data identifies Alaska, Delaware, Montana, New Hampshire, and Oregon as the five states with no statewide sales tax. It also notes that Alaska is the only one of those five where local governments impose local sales taxes. Alaska&apos;s own state guidance confirms that the state does not levy a sales tax while several municipalities do. Oregon&apos;s Department of Revenue likewise states that Oregon does not have a general sales or use/transaction tax, while noting that other transaction-specific taxes can still apply.
          </p>
          <p>
            The important lesson is that &ldquo;no statewide sales tax&rdquo; does not mean &ldquo;nothing can ever be taxed.&rdquo; It means the state does not impose a broad general statewide sales tax of the kind being discussed. Local sales taxes, specialized transaction taxes, use taxes, or other taxes may still exist.
          </p>
          <p>
            The same principle applies to high-tax states. A statewide rate can be only part of the amount a customer eventually pays. Tax Foundation&apos;s 2026 midyear data, for example, shows substantial differences among states in average combined state and local rates, illustrating why a state-only rate should not automatically be interpreted as the exact checkout rate everywhere in that state.
          </p>
          <p>
            That is why this calculator&apos;s state directory is most useful when you ask: What rate assumption am I actually using? If the calculator shows a state rate alongside an average local rate, those are separate concepts. If a What-If comparison uses only the statewide rate, that comparison should be understood as a state-level scenario rather than an exact address-level purchase quote.
          </p>
          <p>
            Actual sales-tax collection can also depend on where a transaction is sourced and whether the seller has an obligation to collect tax in the jurisdiction. Modern U.S. sales-tax systems therefore involve more than a simple state percentage. Businesses operating across jurisdictions should use the relevant state and local tax authority for transaction-specific compliance decisions.
          </p>
        </div>
      </section>

      {/* 6. What-If State Comparison */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <Zap className="h-5 w-5 text-amber-500" />
          What-If State Comparison: See How the Same Purchase Changes Across Jurisdictions
        </h3>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            The What-If State Comparison is designed for a simple but useful question: What would the tax difference be if the same purchase were made under two different state-rate assumptions?
          </p>
          <p>
            The production example uses a $1,000 purchase and compares Texas at 6.25% against Oregon at 0%. Under those state-level assumptions, Texas produces $62.50 in tax and a $1,062.50 total, while Oregon produces no general state sales tax and a $1,000 total. The modeled difference is therefore $62.50.
          </p>
          <p>
            This is useful for illustrating how a state-rate difference translates into dollars. It can also be used for scenario analysis. Increase the purchase price from $1,000 to $10,000 and the dollar difference increases proportionally when the rates remain fixed. Compare two states at the same rate and the modeled tax difference becomes zero.
          </p>
          <p>
            But this tool should not be interpreted as a complete relocation calculator. A state comparison based on statewide sales tax alone does not account for housing, property taxes, income taxes, local sales taxes, vehicle costs, insurance, wages, or cost-of-living differences. Even when one state produces a lower sales-tax result on a particular purchase, that does not prove that living or doing business there is financially better overall.
          </p>
          <p>
            For a broader housing decision, a user can continue to the <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Mortgage Calculator</Link>, <Link href="/calculators/home-equity-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Home Equity Loan Calculator</Link>, or <Link href="/calculators/heloc-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">HELOC Calculator</Link> depending on the decision being analyzed. A buyer comparing the upfront cash implications of a home purchase can also use the <Link href="/calculators/down-payment-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Down Payment Calculator</Link>. These links are useful because sales tax is only one part of a much larger financial decision.
          </p>
          <p>
            The correct interpretation of the What-If module is therefore: under the selected rate assumptions, how much sales tax changes on the same purchase? That is a precise and useful question, without turning the result into an unsupported claim about the overall cost of living or tax burden.
          </p>
        </div>
      </section>

      {/* 7. Exemptions */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Sales Tax Exemptions: Why Food, Clothing and Other Items Need Careful Treatment
        </h3>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            Sales-tax exemptions are one of the easiest topics to oversimplify. A user may expect a simple rule such as &ldquo;food is exempt&rdquo; or &ldquo;clothing is taxable,&rdquo; but states frequently distinguish between categories of goods and may use special rules, thresholds, temporary exemptions, or different definitions of taxable products.
          </p>
          <p>
            For that reason, the calculator&apos;s grocery and clothing indicators are best understood as jurisdictional reference information. They help the user understand the broad tax treatment associated with the selected state, but they should not be interpreted as an exhaustive legal opinion covering every product variation.
          </p>
          <p>
            Groceries are a good example. The taxation of food can differ between states, and some jurisdictions distinguish ordinary groceries from prepared food, restaurant meals, candy, soft drinks, dietary supplements, or other categories. The same word—&ldquo;food&rdquo;—can therefore describe transactions with different tax treatment.
          </p>
          <p>
            Clothing can create similar issues. Some states impose general sales tax on clothing, some provide exemptions or exclusions, and some use price thresholds or temporary exemption periods. A calculator that labels an entire category simply &ldquo;taxable&rdquo; or &ldquo;exempt&rdquo; should be understood as a simplified model unless it incorporates the jurisdiction&apos;s detailed product rules.
          </p>
          <p>
            The practical solution for a shopper is to use the calculator for an estimate and then verify an unusual or high-value transaction with the relevant tax authority. For a business, product-taxability questions should be resolved using current state and local guidance, especially when the seller&apos;s products span multiple jurisdictions.
          </p>
          <p>
            This is also why the 50-state directory should not be treated as static legal advice. Rates and product-tax rules can change. For example, Illinois&apos; Department of Revenue publishes local sales-tax changes by effective date and directs businesses to its current Tax Rate Finder for exact combined rates. That is a useful illustration of a larger principle: sales-tax systems are maintained through jurisdiction-specific rules, and the authoritative answer for a specific transaction may depend on the date, location, and product.
          </p>
        </div>
      </section>

      {/* 8. Business Sales Tax Collection */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Business Sales Tax Collection: Separating Customer Receipts From Tax Payable
        </h3>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            For a business, the question is often different from the shopper&apos;s question. A customer wants to know, &ldquo;How much tax will I pay?&rdquo; A business may instead need to know, &ldquo;How much of the money I collected belongs to the business, and how much represents sales tax collected on behalf of the taxing authority?&rdquo;
          </p>
          <p>
            The Business Sales Tax Revenue &amp; Collection Solver addresses the second question when the entered revenue is tax-inclusive. If a business collected $10,000 from customers at an 8.25% embedded sales-tax rate, the calculator determines that $762.12 of the $10,000 represents sales tax and $9,237.88 represents the remaining sales revenue under the calculator&apos;s model.
          </p>
          <p>
            The core identity is:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
            Gross Collected Revenue = Net Sales Revenue + Sales Tax
          </div>
          <p>
            The extraction formula is:
          </p>
          <div className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 font-mono text-xs sm:text-sm font-semibold text-blue-600 dark:text-blue-400">
            Sales Tax = Gross × Rate ÷ (100 + Rate)
          </div>
          <p>
            This is mathematically important because applying the ordinary tax formula to a tax-inclusive amount would overstate the tax. If you simply multiplied $10,000 by 8.25%, you would get $825. But $825 is the tax you would calculate if $10,000 were the pre-tax taxable base. In the business collection scenario, $10,000 is already the total amount collected, so the tax is embedded within it.
          </p>
          <p>
            This distinction is useful for businesses checking receipts, estimating tax collections, reconciling sales reports, or understanding why gross customer receipts do not equal net sales revenue.
          </p>
          <p>
            It does not, however, replace a business&apos;s actual sales-tax reporting and compliance process. A real business may need to account for exempt transactions, resale certificates, marketplace facilitator rules, nexus, destination sourcing, jurisdiction-specific taxability, returns, discounts, credits, and other factors. The calculator&apos;s business module is a mathematical planning tool for the assumptions entered.
          </p>
          <p>
            The broader compliance environment can also depend on economic nexus rules. The Supreme Court&apos;s 2018 South Dakota v. Wayfair decision allowed states to require certain remote sellers to collect sales tax when the state&apos;s statutory conditions are met, which helped establish the modern framework for remote-seller sales-tax obligations. Because each state&apos;s rules can differ and evolve, businesses should use the relevant state tax authority for compliance decisions rather than relying exclusively on a general calculator.
          </p>
        </div>
      </section>

      {/* 9. SALT Deductions */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <DollarSign className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
          Sales Tax, SALT Deductions and Federal Tax Planning
        </h3>
        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            Sales tax can also appear in federal tax planning because individuals who itemize deductions may, subject to applicable limitations and rules, elect to deduct state and local general sales taxes instead of state and local income taxes on Schedule A. The IRS explains that taxpayers can generally choose between deducting state/local income taxes or state/local general sales taxes, subject to the applicable SALT limitation and itemization requirements.
          </p>
          <p>
            The important word is <em>elect</em>. The existence of sales tax does not automatically create a federal deduction for every taxpayer. The deduction is connected to itemizing deductions, the applicable tax year, qualifying taxes, and the federal SALT limitation. The IRS also provides its own Sales Tax Deduction Calculator, which can use income, filing status, dependents, locality, and certain large purchases when determining the permitted deduction method.
          </p>
          <p>
            This is separate from the sales-tax calculator&apos;s core transaction mathematics. The amount of tax charged on a purchase and the amount potentially deductible on a federal return are different questions. The calculator should not imply that a sales-tax estimate is automatically a tax benefit.
          </p>
          <p>
            This distinction is particularly important for high-value purchases. The IRS notes that certain sales taxes on qualifying large purchases can be relevant to the optional sales-tax deduction method, while the overall state and local tax deduction is subject to federal limits and tax-year rules.
          </p>
          <p>
            For a homeowner comparing purchase-related costs, the <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Mortgage Calculator</Link> can be used alongside the sales-tax model to separate the mortgage payment from other transaction costs. Someone evaluating equity financing can continue to the <Link href="/calculators/home-equity-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Home Equity Loan Calculator</Link> or <Link href="/calculators/heloc-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">HELOC Calculator</Link>. These tools answer different questions and should not be combined into a single tax conclusion.
          </p>
        </div>
      </section>

      {/* 10. How to Use */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <Layers className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          How to Use the Sales Tax Calculator
        </h3>
        <div className="space-y-3 text-sm sm:text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>
            <strong>Start with the 5-Way Sales Tax Solver</strong> when you are working with one taxable amount. Choose the mode that corresponds to the values you already know. If you know the pre-tax price and rate, use the forward calculation. If you have a final receipt amount and rate, solve backward for the pre-tax price. If you know the original and final prices, solve for the implied rate. If you know the tax amount, use the appropriate reverse mode to calculate the final price or rate.
          </p>
          <p>
            <strong>Use the Multi-Item Sales Receipt Builder</strong> when a transaction contains several products. Enter each item&apos;s description, quantity, unit price, and taxable/exempt status. Then review the taxable subtotal, exempt subtotal, sales tax, and final receipt amount. This is the best option when you need to understand how one exempt item affects an otherwise taxable receipt.
          </p>
          <p>
            <strong>Use the Business Sales Tax Collection Solver</strong> when the amount you have is already a customer-collected gross amount that includes sales tax. Enter the gross revenue and applicable tax rate. The calculator will separate the embedded sales tax from the net sales revenue using the tax-inclusive extraction formula.
          </p>
          <p>
            <strong>Use the 50 U.S. States Tax Directory</strong> when you need a broader jurisdictional reference. Pay attention to the difference between the state rate, average local rate, and maximum combined rate. Those numbers answer different questions and should not be treated as interchangeable.
          </p>
          <p>
            <strong>Use the What-If State Comparison</strong> when you want to compare the same purchase price under two different state-rate assumptions. This is especially useful for simple scenario analysis, but remember that an exact checkout rate may include local taxes that are not represented by a state-only comparison.
          </p>
          <p>
            Finally, review the formula and explanatory content below the calculator if you are unsure why a particular result changed. The value of a transparent calculator is not only producing the result but making the result understandable enough that you can verify the logic yourself.
          </p>
        </div>
      </section>

      {/* 11. Common Mistakes */}
      <section className="space-y-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100 flex items-center gap-2.5">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          Common Sales Tax Calculation Mistakes
        </h3>
        <div className="space-y-3 text-xs sm:text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          <p>• <strong>Mistake 1:</strong> Applying the ordinary percentage formula to a tax-inclusive total. If the price already includes tax, the tax has to be extracted using the embedded-tax formula.</p>
          <p>• <strong>Mistake 2:</strong> Taxing exempt products as though they were taxable. This can happen easily on multi-item receipts when the entire subtotal is multiplied by one rate without separating taxable and exempt lines.</p>
          <p>• <strong>Mistake 3:</strong> Using a state&apos;s statewide rate as though it were the customer&apos;s exact combined rate. Local jurisdictions can add taxes, and combined rates can vary by address.</p>
          <p>• <strong>Mistake 4:</strong> Assuming that an item category has the same exemption treatment everywhere. Grocery and clothing rules differ among jurisdictions, and specialized products can have additional rules.</p>
          <p>• <strong>Mistake 5:</strong> Interpreting &ldquo;no statewide sales tax&rdquo; as &ldquo;no sales tax anywhere in the state.&rdquo; Alaska is a particularly clear example: the state does not levy a sales tax, but municipalities can.</p>
          <p>• <strong>Mistake 6:</strong> Treating average local rates and maximum combined rates as though they were the same statistic. The calculator intentionally displays them separately because they represent different concepts.</p>
          <p>• <strong>Mistake 7:</strong> Using a current-looking rate from an old table without checking its effective date. State and local rates can change during the year. Illinois, for example, publishes effective-date sales-tax changes and directs taxpayers to its current rate finder for exact combined rates.</p>
          <p>• <strong>Mistake 8:</strong> Confusing sales tax with use tax, excise taxes, or federal tax deductions. These may interact with a transaction but are separate concepts.</p>
          <p className="pt-2 text-zinc-900 dark:text-zinc-100 font-semibold">
            The best practice is simple: identify the tax base, identify the rate being used, determine whether the amount is tax-inclusive or tax-exclusive, identify exemptions, and then confirm whether local taxes or jurisdiction-specific rules need to be included.
          </p>
        </div>
      </section>

      {/* 12. 20 Audited Domain FAQs */}
      <section className="space-y-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3 text-blue-600 dark:text-blue-400 font-bold text-lg sm:text-xl border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <HelpCircle className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
          <h3 className="tracking-tight">Frequently Asked Questions (20 Audited Questions)</h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden transition-all shadow-xs bg-zinc-50/50 dark:bg-zinc-800/30"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between font-semibold text-sm sm:text-base text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/60 transition-colors focus:outline-none cursor-pointer"
                >
                  <span className="flex items-center gap-2.5 pr-2">
                    <span className="text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-bold min-w-[24px]">
                      Q{index + 1}.
                    </span>
                    <span>{faq.question.replace(/^\d+\.\s*/, "")}</span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-zinc-400 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-zinc-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 border-t border-zinc-100 dark:border-zinc-800/60 bg-white dark:bg-zinc-900/60 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 13. Canonical Related Calculators */}
      <section className="bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-2xl p-4 sm:p-6 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
          RELATED CALCULATORS
        </h3>
        <p className="text-xs text-zinc-600 dark:text-zinc-400">
          For a purchase involving home financing, the <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Mortgage Calculator</Link> can be used to model the financing cost separately from sales tax. A borrower considering equity-based financing can compare the result with the <Link href="/calculators/home-equity-loan-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Home Equity Loan Calculator</Link> or <Link href="/calculators/heloc-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">HELOC Calculator</Link>. For a home purchase, the upfront-cash side can be explored with the <Link href="/calculators/down-payment-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Down Payment Calculator</Link>, while someone comparing renting and buying can use the <Link href="/calculators/rent-vs-buy-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Rent vs. Buy Calculator</Link>. For pure percentage mathematics, explore our <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold underline hover:text-blue-700">Percentage Calculator</Link>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 text-xs font-medium pt-2">
          <Link
            href="/calculators/mortgage-calculator"
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 font-bold transition-colors"
          >
            Mortgage Calculator
          </Link>
          <Link
            href="/calculators/home-equity-loan-calculator"
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 font-bold transition-colors"
          >
            Home Equity Loan Calculator
          </Link>
          <Link
            href="/calculators/heloc-calculator"
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 font-bold transition-colors"
          >
            HELOC Calculator
          </Link>
          <Link
            href="/calculators/down-payment-calculator"
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 font-bold transition-colors"
          >
            Down Payment Calculator
          </Link>
          <Link
            href="/calculators/rent-vs-buy-calculator"
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 font-bold transition-colors"
          >
            Rent vs. Buy Calculator
          </Link>
          <Link
            href="/calculators/percentage-calculator"
            className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-blue-600 dark:text-blue-400 font-bold transition-colors"
          >
            Percentage Calculator
          </Link>
        </div>
      </section>

      {/* 14. Editorial / Accuracy Note */}
      <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        <p>
          <strong>Editorial / Accuracy Note:</strong> Sales-tax rates, exemptions, local taxes, sourcing rules, and federal tax-deduction rules can change. The calculator should therefore be presented as a transparent estimate based on the selected jurisdiction and assumptions, not as a substitute for transaction-specific tax advice or a state tax authority&apos;s determination.
        </p>
        <p className="mt-1">
          For the federal SALT discussion, the IRS currently states that taxpayers who itemize can generally elect to deduct state and local general sales taxes instead of state and local income taxes, subject to applicable limits and rules; the IRS also provides its own sales-tax deduction calculator.
        </p>
        <p className="mt-1">
          For current state-rate context, 2026 research identifies Alaska, Delaware, Montana, New Hampshire, and Oregon as the five states without a general statewide sales tax, while emphasizing the importance of local variation.
        </p>
        <p className="mt-1">
          This content deliberately does not claim that a single displayed state rate is an exact rate for every transaction. That distinction is important because the calculator itself exposes state rates, average local rates, and maximum combined rates as different concepts.
        </p>
      </div>
    </div>
  );
}

export default SalesTaxContent;
