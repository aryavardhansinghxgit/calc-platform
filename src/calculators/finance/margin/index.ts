import { CalculatorModuleDefinition } from "../../types";
import { calculateProfitMargin } from "@/lib/calculator-engine/formulas/margin";

export const MARGIN_CALCULATOR: CalculatorModuleDefinition = {
  id: "margin",
  title: "Margin Calculator — Profit Margin, Markup, Stock & Forex Margin",
  slug: "margin-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Calculate profit margin and markup, stock margin requirements, margin-call prices, forex margin, leverage, and pricing sensitivity with detailed formulas and examples.",
  iconName: "PieChart",
  featured: true,
  tags: [
    "margin",
    "profit margin",
    "markup",
    "stock margin",
    "margin call",
    "forex margin",
    "leverage calculator",
  ],
  relatedCalculators: [
    "percentage-calculator",
    "discount-calculator",
    "sales-tax-calculator",
    "roi-calculator",
    "loan-calculator",
    "mortgage-calculator",
    "heloc-calculator",
    "home-equity-loan-calculator",
    "down-payment-calculator",
    "rent-vs-buy-calculator",
  ],
  formulaDescription:
    "Profit Margin % = [(Revenue - Cost) / Revenue] × 100. Markup % = [(Revenue - Cost) / Cost] × 100. Margin Call Price = Loan / [Shares × (1 - Maintenance%)].",
  faqs: [
    {
      question: "What is profit margin?",
      answer:
        "Profit margin is the percentage of revenue that remains as profit after subtracting the modeled direct cost. The basic formula is (Revenue − Cost) ÷ Revenue × 100. A product costing $120 and selling for $160 therefore has a 25% profit margin.",
    },
    {
      question: "What is the difference between margin and markup?",
      answer:
        "Margin measures profit as a percentage of revenue, while markup measures profit as a percentage of cost. A $120 cost and $160 selling price produce a 25% margin but a 33.33% markup.",
    },
    {
      question: "How do I calculate a 25% profit margin?",
      answer:
        "A target margin cannot normally be achieved by simply adding 25% to cost. The required price is Cost ÷ (1 − Margin). With a $120 cost, a 25% target margin requires $160 revenue.",
    },
    {
      question: "How is markup calculated?",
      answer:
        "Markup is (Revenue − Cost) ÷ Cost × 100. If a product costs $120 and sells for $160, the markup is 33.33%.",
    },
    {
      question: "Can profit margin be negative?",
      answer:
        "Yes. If revenue is less than cost, the business has a loss rather than a profit. A $120 cost and $100 revenue produce a $20 loss and a modeled margin of -20%.",
    },
    {
      question: "What is stock margin?",
      answer:
        "Stock margin is the amount of equity required to establish a leveraged securities position. In the calculator's example, a $1,830 stock position with a 30% initial margin requirement requires $549 of equity.",
    },
    {
      question: "What is the difference between initial margin and maintenance margin?",
      answer:
        "Initial margin is the equity required to establish a leveraged position under the applicable rule or model. Maintenance margin is the minimum equity that must remain relative to the current market value after the position has been established. Brokers can impose maintenance requirements above regulatory baselines.",
    },
    {
      question: "How is a stock margin-call price calculated?",
      answer:
        "Under the calculator's model, the trigger price is Loan ÷ [Shares × (1 − Maintenance Margin)]. For the $1,281 loan, 100 shares, and 25% maintenance example, the modeled price is approximately $17.08.",
    },
    {
      question: "Is the margin-call price from this calculator guaranteed?",
      answer:
        "No. It is a mathematical scenario under the selected inputs. Actual brokers can impose higher maintenance requirements, security-specific rules, portfolio-level requirements, or different liquidation procedures. The SEC warns that firms may liquidate securities under the terms of the margin agreement and may not always wait for a traditional margin call.",
    },
    {
      question: "What is forex margin?",
      answer:
        "Forex margin is the capital required to control a currency position under a specified leverage or security-deposit assumption. At 20:1 leverage, the mathematical margin requirement is 5%, so a $130 notional position would require $6.50 under the calculator's model.",
    },
    {
      question: "Does higher forex leverage mean higher profit?",
      answer:
        "No. Leverage increases exposure relative to the capital posted. It can magnify both gains and losses. The CFTC specifically warns that leverage amplifies gains and losses in retail forex trading.",
    },
    {
      question: "What does 20:1 leverage mean?",
      answer:
        "20:1 leverage means one unit of posted capital corresponds to approximately 20 units of notional exposure under the simplified model. The corresponding margin percentage is 1 ÷ 20 = 5%.",
    },
    {
      question: "Are forex margin requirements the same for every broker?",
      answer:
        "No. Actual requirements can depend on the broker, jurisdiction, currency pair, instrument, account type, and applicable regulatory rules. U.S. retail forex transactions are subject to regulatory security-deposit requirements, but a calculator scenario should not be interpreted as a universal broker quotation.",
    },
    {
      question: "What is a margin call?",
      answer:
        "A margin call generally occurs when account equity falls below the applicable maintenance requirement. The broker may require additional capital or liquidate positions according to the margin agreement and applicable rules. The SEC notes that firms may liquidate securities without waiting for the customer to satisfy a traditional margin call.",
    },
    {
      question: "Why are margin and markup different percentages for the same product?",
      answer:
        "Because they use different denominators. Margin divides profit by revenue; markup divides profit by cost. With $120 cost and $160 revenue, the same $40 profit is 25% of revenue but 33.33% of cost.",
    },
  ],
  inputs: [
    { name: "costOfGoods", label: "Item Cost ($)", type: "currency", defaultValue: 120, unit: "$", min: 0, max: 1000000, step: 5 },
    { name: "sellingPrice", label: "Revenue / Selling Price ($)", type: "currency", defaultValue: 160, unit: "$", min: 0, max: 1000000, step: 5 },
  ],
  outputs: [
    { name: "grossMarginPercent", label: "Profit Margin", format: "percentage", highlight: true },
    { name: "grossProfit", label: "Dollar Profit", format: "currency", highlight: true },
    { name: "markupPercent", label: "Markup Percentage", format: "percentage" },
  ],
  calculate: (inputs) => {
    const res = calculateProfitMargin({
      cost: Number(inputs.costOfGoods || 120),
      revenue: Number(inputs.sellingPrice || 160),
    });

    return {
      grossMarginPercent: `${res.marginPercent}%`,
      grossProfit: res.profit,
      markupPercent: `${res.markupPercent}%`,
    };
  },
};

export default MARGIN_CALCULATOR;
