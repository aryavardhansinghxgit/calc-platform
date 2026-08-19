import { CalculatorModuleDefinition } from "../../types";
import { calculateCreditCardPayoff } from "@/lib/calculator-engine/formulas/credit-card";

export const CREDIT_CARD_CALCULATOR: CalculatorModuleDefinition = {
  id: "credit-card",
  title: "Credit Card Calculator",
  slug: "credit-card-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Free Credit Card Calculator. Calculate payoff months, total interest, minimum payment rules, extra monthly payments, 0% balance transfers, and Debt Avalanche vs. Snowball payoff strategies.",
  iconName: "CreditCard",
  featured: true,
  tags: [
    "credit card calculator",
    "credit card payoff calculator",
    "credit card interest calculator",
    "how long to pay off credit card",
    "credit card minimum payment calculator",
    "debt avalanche calculator",
    "debt snowball calculator",
    "0 apr balance transfer calculator",
    "credit card amortization schedule",
    "credit card debt consolidation calculator",
    "average daily balance calculator",
  ],
  formulaDescription:
    "Monthly Interest = Average Daily Balance × (APR / 365) × Days in Billing Cycle. Amortization calculated monthly.",
  faqs: [
    {
      question: "How is credit card interest calculated on a daily balance?",
      answer:
        "Credit card issuers calculate interest using the Average Daily Balance (ADB) method: Daily Periodic Rate (DPR) = APR ÷ 365. Monthly Interest = ADB × DPR × Number of Days in Billing Cycle.",
    },
    {
      question: "What is the credit card minimum payment trap and how does it work?",
      answer:
        "The minimum payment trap occurs when paying only the required minimum (typically 1% to 2% of the balance plus monthly interest). Because the dollar payment decreases as the balance shrinks, repayment stretches across 15 to 30+ years, doubling or tripling total interest costs.",
    },
    {
      question: "Which debt elimination strategy is better: Debt Avalanche or Debt Snowball?",
      answer:
        "Debt Avalanche mathematically minimizes total interest paid by targeting the highest APR card first. Debt Snowball prioritizes the smallest balance first to build psychological momentum.",
    },
    {
      question: "How does a 0% APR balance transfer save money on credit card debt?",
      answer:
        "A 0% balance transfer credit card freezes interest charges for 12 to 21 months, allowing 100% of payments to reduce principal. After deducting the 3% to 5% transfer fee, borrowers often save thousands in interest.",
    },
    {
      question: "What happens if my monthly payment is less than the monthly interest charge?",
      answer:
        "Negative amortization occurs: unpaid interest is added to your principal balance, causing your debt to expand indefinitely.",
    },
    {
      question: "How does my credit card balance affect my credit utilization score?",
      answer:
        "Revolving credit utilization accounts for 30% of your FICO score. Keeping total utilization below 30% is standard, and under 10% is optimal for top-tier credit scores.",
    },
    {
      question: "Why do credit card cash advances cost significantly more than purchases?",
      answer:
        "Cash advances lack a grace period (interest accrues immediately), carry higher APRs (25%–29.99%), and incur upfront transaction fees (3%–5%) plus ATM surcharges.",
    },
    {
      question: "How does making bi-weekly payments help pay off credit card debt faster?",
      answer:
        "Making bi-weekly payments (26 half-payments per year) equals 13 full payments instead of 12, directly cutting principal balance and reducing the Average Daily Balance across every cycle.",
    },
    {
      question: "Can I lower my credit card APR by negotiating directly with my card issuer?",
      answer:
        "Yes. Cardholders with good on-time payment histories can frequently request a 1% to 5% APR reduction or temporary hardship rate by calling the card issuer's retention department.",
    },
    {
      question: "What is a Penalty APR and how is it triggered?",
      answer:
        "A Penalty APR is an elevated interest rate (often 29.99%) triggered by payments 60+ days past due. Issuers must review the account after 6 months of consecutive on-time payments to consider restoring standard rates.",
    },
    {
      question: "When should I consider a personal consolidation loan over credit cards?",
      answer:
        "A fixed-rate personal consolidation loan is ideal when you can obtain an interest rate significantly lower than your cards (e.g. 9%–13% vs. 22%–28%) with a fixed 2-to-5-year repayment schedule.",
    },
    {
      question: "What is the credit card grace period and how do I forfeit it?",
      answer:
        "The grace period is the 21+ day window between statement closing and the due date where no interest is charged if the previous statement was paid in full. Carrying any balance past the due date forfeits the grace period for subsequent purchases.",
    },
  ],
  inputs: [
    { name: "balance", label: "Credit Card Balance ($)", type: "currency", defaultValue: 8000, unit: "$", min: 0, max: 1000000, step: 500 },
    { name: "apr", label: "Interest Rate (% APR)", type: "percentage", defaultValue: 18, unit: "%", min: 0, max: 100, step: 0.25 },
    { name: "monthlyPayment", label: "Monthly Payment Amount ($)", type: "currency", defaultValue: 200, unit: "$", min: 1, max: 100000, step: 25 },
  ],
  outputs: [
    { name: "monthsToPayoff", label: "Months to Pay Off", format: "number", highlight: true },
    { name: "yearsToPayoff", label: "Years to Pay Off", format: "number" },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalAmountPaid", label: "Total Amount Paid", format: "currency" },
    { name: "payoffDate", label: "Estimated Payoff Date", format: "text" },
  ],
  calculate: (inputs) => {
    const res = calculateCreditCardPayoff({
      balance: Number(inputs.balance || 8000),
      apr: Number(inputs.apr || 18),
      monthlyPayment: Number(inputs.monthlyPayment || 200),
      mode: "A",
    });

    return {
      monthsToPayoff: res.monthsToPayoff,
      yearsToPayoff: res.yearsToPayoff,
      totalInterestPaid: res.totalInterestPaid,
      totalAmountPaid: res.totalAmountPaid,
      payoffDate: res.payoffDate,
    };
  },
};

export default CREDIT_CARD_CALCULATOR;
