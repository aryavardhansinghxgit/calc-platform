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
} from "lucide-react";

export function VatContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Value-Added Tax (VAT)?",
      answer: "Value-Added Tax (VAT) is a multi-stage consumption tax levied on the value added to goods and services at each stage of production, distribution, and supply. It is ultimately borne by the final consumer, while registered businesses collect and remit tax on behalf of the tax authority.",
    },
    {
      question: "How does VAT differ from Sales Tax?",
      answer: "Sales tax is a single-stage tax collected exclusively at the final point of sale to the retail consumer. VAT is collected incrementally at every production and wholesale stage, allowing businesses to claim Input Tax Credit (ITC) for VAT paid on input purchases, eliminating cascading double taxation.",
    },
    {
      question: "What is the difference between VAT Exclusive and VAT Inclusive?",
      answer: "VAT Exclusive means the tax amount is calculated on top of the net base price (Gross = Net + VAT). VAT Inclusive means tax is already included within the advertised gross price (Net = Gross / (1 + VAT Rate %)).",
    },
    {
      question: "How do I calculate Reverse VAT (extracting Net Price from Gross Price)?",
      answer: "To extract the Net Base Price from a VAT-inclusive Gross Price, use the formula: Net Price = Gross Price / (1 + VAT Rate / 100). For example, a £120 item with 20% VAT has a Net Price of £120 / 1.20 = £100.",
    },
    {
      question: "What is Input VAT vs. Output VAT?",
      answer: "Input VAT is the tax a business pays when purchasing goods or services from suppliers. Output VAT is the tax a business charges customers on sales. The net VAT remitted to the government equals Output VAT minus Input VAT.",
    },
    {
      question: "What are the standard VAT rates across major countries?",
      answer: "Standard VAT rates vary globally: UK (20%), Germany (19%), France (20%), Italy (22%), Spain (21%), Netherlands (21%), Australia (10% GST), Canada (5% GST), UAE (5%), Japan (10% Consumption Tax). The United States does not have a federal VAT, relying on state-level sales taxes.",
    },
    {
      question: "What is the EU One Stop Shop (OSS) system?",
      answer: "The EU One Stop Shop (OSS) allows businesses selling cross-border digital goods or B2C physical goods to consumers within the European Union to register for VAT in a single EU member state and declare all EU sales through a single quarterly return.",
    },
    {
      question: "What is the Reverse Charge Mechanism (RCM) in international B2B transactions?",
      answer: "Under the Reverse Charge Mechanism (RCM), when a business buys cross-border services from a supplier in another country, the buyer—rather than the seller—self-assesses and accounts for the local VAT on their own tax return.",
    },
    {
      question: "What items qualify for Reduced or Zero (0%) VAT rates?",
      answer: "Most countries apply reduced VAT rates (5% to 10%) or Zero rates (0%) to essential goods such as basic foodstuffs, medical supplies, books, children's clothing, public transportation, and passenger travel.",
    },
    {
      question: "What is the VAT registration threshold in the UK and EU?",
      answer: "In the UK, mandatory VAT registration is required when annual taxable turnover exceeds £90,000. In EU member states, domestic registration thresholds range from €10,000 to €85,000.",
    },
    {
      question: "How does VAT work in a multi-tier supply chain?",
      answer: "At each supply chain tier (Farmer -> Processor -> Wholesaler -> Retailer), each business charges VAT on output sales, subtracts VAT paid on input purchases, and remits only the difference (tax on the value added) to the tax authority.",
    },
    {
      question: "Is VAT tax-deductible for registered businesses?",
      answer: "For VAT-registered businesses, input VAT paid on legitimate business expenses is not a cost—it is reclaimed as a tax credit against output VAT collected from customers.",
    },
    {
      question: "What happens if a business charges VAT without being registered?",
      answer: "Charging VAT without holding a valid VAT registration number is illegal and subject to severe civil and criminal penalties, heavy fines, and immediate tax authority audits.",
    },
    {
      question: "How do I calculate VAT if I only know the Tax Amount?",
      answer: "If you know the Tax Amount and VAT Rate %, you can calculate the Net Base Price using the formula: Net Price = Tax Amount / (VAT Rate / 100).",
    },
    {
      question: "What is Zero-Rated vs. Exempt VAT?",
      answer: "Zero-Rated supplies attract 0% VAT, but businesses can still claim Input Tax Credit on input expenses. Exempt supplies attract no VAT, but businesses cannot claim Input Tax Credit on related input expenses.",
    },
    {
      question: "How is VAT applied to digital products and SaaS software?",
      answer: "SaaS software and electronic digital downloads are taxed based on the customer's location (destination principle). Suppliers selling to international retail consumers must apply the local VAT rate of the customer's country.",
    },
    {
      question: "What is a VAT Invoice and what details must it contain?",
      answer: "A valid VAT invoice must contain a unique invoice number, invoice date, seller's name/address/VAT registration number, buyer details, description of goods/services, net unit price, VAT rate applied, total VAT amount, and total gross payable.",
    },
    {
      question: "What are the penalties for late VAT filing or payment?",
      answer: "Tax authorities impose late filing penalties (typically 2% to 15% of unpaid VAT) plus compounding interest on overdue tax balances.",
    },
    {
      question: "Can tourists claim a VAT refund on export purchases?",
      answer: "Yes. Non-resident international tourists can claim tax-free shopping VAT refunds on physical goods purchased for personal export upon presenting eligible receipts at border customs checkpoints.",
    },
    {
      question: "Why should I use an online VAT Calculator?",
      answer: "An online VAT calculator eliminates manual calculation errors, provides 4-way solving across Net, Gross, Tax, and Rate, supports global country presets, and generates instant PDF reports for accounting.",
    },
  ];

  return (
    <div className="space-y-10 mt-8  dark:border-zinc-800 pt-8 text-zinc-700 dark:text-zinc-300">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white rounded-2xl p-6 md:p-8 shadow-lg">
        <div className="flex items-center gap-3 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-2">
          <BookOpen className="h-4 w-4" /> Global VAT & Indirect Tax Masterclass
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
          Demystifying Value-Added Tax (VAT): Complete Global Accounting Guide
        </h2>
        <p className="text-zinc-300 text-sm leading-relaxed max-w-4xl">
          Value-Added Tax (VAT) is the world's most prominent indirect consumption tax, enforced in over 160 countries including the United Kingdom, 
          the European Union, Canada, Australia, Japan, and the Middle East. Understanding how VAT operates across multi-tier supply chains, 
          Input Tax Credits (ITC), and country-specific rate slabs is vital for business owners, accountants, and consumers.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="space-y-8 text-sm leading-relaxed">
        {/* Section 1 & 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <Receipt className="h-5 w-5" /> 1. VAT Exclusive vs. Inclusive Math Formulas
            </div>
            <p>
              Whether billing clients or calculating store shelf prices, use these mathematical identities:
            </p>
            <ul className="text-xs space-y-2 text-slate-900 dark:text-slate-100 font-sans tabular-nums bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <li>• <strong>VAT Exclusive:</strong> Gross Price = Net Price × (1 + VAT Rate % / 100)</li>
              <li>• <strong>VAT Inclusive:</strong> Net Price = Gross Price / (1 + VAT Rate % / 100)</li>
              <li>• <strong>Tax Amount:</strong> VAT Amount = Gross Price - Net Price</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-base">
              <Globe className="h-5 w-5" /> 2. Multi-Stage Supply Chain Collection
            </div>
            <p>
              Unlike sales tax, VAT is collected at every production tier. Each business claims credit for input VAT paid:
            </p>
            <ul className="text-xs space-y-1.5 text-slate-900 dark:text-slate-100">
              <li>• <strong>Stage 1 (Farmer):</strong> Sells coffee beans for £10 (+ £2 VAT). Remits £2 to tax authority.</li>
              <li>• <strong>Stage 2 (Roaster):</strong> Value adds £15. Sells roasted coffee for £25 (+ £5 VAT). Remits £5 - £2 = £3.</li>
              <li>• <strong>Stage 3 (Cafe):</strong> Value adds £15. Sells brewed cups for £40 (+ £8 VAT). Remits £8 - £5 = £3.</li>
            </ul>
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400">
              Total Tax Remitted (£2 + £3 + £3 = £8) exactly equals 20% VAT on final £40 retail price!
            </p>
          </div>
        </div>

        {/* Section 3: Global VAT Rates Comparison Table */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">3. Standard VAT Rates Around the World
          </h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse border border-zinc-200 dark:border-zinc-800">
              <thead>
                <tr className="bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200">
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Country / Region</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Tax Type Name</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Standard Rate %</th>
                  <th className="p-3 border border-zinc-200 dark:border-zinc-700">Reduced Rates %</th>
                </tr>
              </thead>
              <tbody className=" dark:divide-zinc-800">
                <tr>
                  <td className="p-3 font-semibold">🇬🇧 United Kingdom</td>
                  <td className="p-3">VAT</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">20%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">5% (Energy) / 0% (Food, Books)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">🇩🇪 Germany</td>
                  <td className="p-3">MwSt (Umsatzsteuer)</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">19%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">7% (Food, Books, Cultural events)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">🇫🇷 France</td>
                  <td className="p-3">TVA</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">20%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">10% / 5.5% / 2.1%</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">🇪🇸 Spain</td>
                  <td className="p-3">IVA</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">21%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">10% / 4% (Super-reduced)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">🇦🇺 Australia</td>
                  <td className="p-3">GST</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">10%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">0% (Fresh food, Health, Education)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">🇦🇪 UAE</td>
                  <td className="p-3">VAT</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">5%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">0% (Exports, Healthcare, Education)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold">🇺🇸 United States</td>
                  <td className="p-3">State Sales Tax (No Federal VAT)</td>
                  <td className="p-3 font-sans tabular-nums font-bold text-blue-600">0% - 9.5%</td>
                  <td className="p-3 text-slate-900 dark:text-slate-100">Varies by State / County / City</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-World Use Cases */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-blue-600 dark:text-blue-400 flex items-center gap-2">Key Differences: VAT vs. Retail Sales Tax
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2 p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Value-Added Tax (VAT)</span>
              <p className="text-slate-900 dark:text-slate-100">
                Multi-stage tax with Input Tax Credit (ITC) mechanism. Businesses deduct VAT paid on raw materials from VAT charged on finished products, preventing double tax compounding.
              </p>
            </div>
            <div className="space-y-2 p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded-lg border border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Retail Sales Tax</span>
              <p className="text-slate-900 dark:text-slate-100">
                Single-stage tax collected only when the end consumer buys the final product at retail. Intermediate business-to-business transactions are exempt using resale certificates.
              </p>
            </div>
          </div>
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
