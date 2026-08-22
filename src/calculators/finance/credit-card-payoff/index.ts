import { CalculatorModuleDefinition } from "../../types";
import { safePmt } from "@/lib/calculator-engine/formulas/safety";

export const CREDIT_CARD_PAYOFF_CALCULATOR: CalculatorModuleDefinition = {
  id: "credit-card-payoff",
  title: "Credit Card Payoff Calculator",
  slug: "credit-card-payoff-calculator",
  category: "Finance",
  subcategory: "Credit & Debt",
  description:
    "Calculate credit card payoff time, required monthly payments for target dates, multi-card Debt Avalanche vs. Snowball plans, and 0% balance transfer savings.",
  iconName: "CreditCard",
  featured: false,
  tags: [
    "credit card payoff calculator",
    "credit card debt payoff calculator",
    "pay off credit card calculator",
    "how long to pay off credit card",
    "credit card payoff calculator with interest",
    "credit card payoff time calculator",
    "credit card payoff with extra payments",
    "credit card payment calculator for payoff date",
    "credit card avalanche calculator",
    "credit card snowball calculator",
    "0 apr balance transfer payoff calculator",
  ],
  relatedCalculators: [
    "credit-card-calculator",
    "apr-calculator",
    "loan-calculator",
    "amortization-calculator",
    "debt-payoff-calculator",
    "debt-consolidation-calculator",
    "personal-loan-calculator",
  ],
  formulaDescription:
    "This calculator uses a standardized monthly periodic-rate model: Monthly Periodic Rate (r) = APR / 12, with payoff duration solved via ordinary annuity logarithmic equations: n = -ln(1 - B×r/P) / ln(1+r). A separate simplified Daily Periodic Rate (DPR = APR / 365) model is provided for illustrative finance charge comparisons.",
  faqs: [
    {
      question: "What is the Debt Avalanche method for paying off credit cards?",
      answer:
        "The Debt Avalanche method allocates all discretionary debt payoff funds toward the credit card with the highest Annual Percentage Rate (APR) while paying minimum dues on the rest. Once the highest-rate card is cleared, the freed-up payment rolls down to the next highest APR. Under fixed-rate, fixed-budget assumptions with no new purchases or changing fees, the Avalanche method prioritizes the highest-APR debt and minimizes modeled interest cost.",
    },
    {
      question: "What is the Debt Snowball method?",
      answer:
        "The Debt Snowball method directs all extra payments to the credit card with the smallest outstanding dollar balance, regardless of interest rate. Once that card is fully paid off, the payment 'snowballs' into the next smallest balance, providing fast psychological wins and momentum.",
    },
    {
      question: "What is the Minimum Payment Trap on credit cards?",
      answer:
        "Credit card issuers typically set minimum monthly payments using formulas that combine a percentage of principal with finance charges and fees (or a mandatory minimum dollar floor). Paying only the minimum causes the required payment to shrink as the balance declines, stretching repayment over extended timelines and substantially increasing total lifetime finance charges.",
    },
    {
      question: "How does Daily Periodic Rate (DPR) work on credit card balances?",
      answer:
        "Credit card interest is compounded daily by many card issuers using the Daily Periodic Rate (DPR = APR ÷ 365). Your DPR is multiplied each day by your Average Daily Balance, meaning making payments earlier in your billing cycle reduces accrued interest charges immediately.",
    },
    {
      question: "What is a 0% APR Balance Transfer and how does it save money?",
      answer:
        "A balance transfer card offers a 0% promotional interest rate for an introductory window (commonly 12 to 21 months) in exchange for an upfront transfer fee (typically 3% to 5%). During this interest-free promotional window, 100% of your monthly payments go directly toward reducing principal debt. Any balance remaining after the promotional period incurs standard post-promotional APR charges.",
    },
    {
      question: "Does paying off credit cards improve my credit score?",
      answer:
        "Credit utilization is an important factor in many credit-scoring models. Lower reported balances relative to available credit can be beneficial, but no utilization percentage guarantees a particular credit score.",
    },
    {
      question: "Should I close paid-off credit card accounts?",
      answer:
        "In many cases, keeping paid-off cards open can help preserve your overall available credit limit (which keeps overall revolving utilization lower) and support credit history length. However, closing an account may make sense if the card carries high annual fees or presents an ongoing spending temptation.",
    },
    {
      question: "How does making bi-weekly credit card payments help?",
      answer:
        "Making an accelerated bi-weekly payment of half your monthly payment every two weeks results in 26 half-payments per year (equal to 13 full monthly payments). This extra annual payment reduces principal faster and shortens debt-free timelines.",
    },
    {
      question: "What is the difference between a Credit Card and a Debt Consolidation Loan?",
      answer:
        "A debt consolidation personal loan replaces multiple revolving credit card balances with a single fixed-rate installment loan, providing a set payoff end date and fixed monthly payments, whereas credit cards are open-ended revolving lines of credit.",
    },
    {
      question: "Can I negotiate lower interest rates with credit card companies?",
      answer:
        "Cardholders may ask their issuer about a lower APR, hardship program, or other account options. Approval and the terms of any change depend on the issuer, account history, and circumstances.",
    },
    {
      question: "What happens if I miss a minimum credit card payment?",
      answer:
        "A missed payment can trigger late fees, forfeit promotional 0% APRs, impose a high penalty APR, and result in a negative delinquency report to credit bureaus if unpaid past 30 days. Late-fee limits and amounts depend on applicable federal rules and the cardholder agreement.",
    },
    {
      question: "How much should I pay each month to become debt-free in 2 years?",
      answer:
        "To clear debt in 24 months, use an amortized installment formula that covers both monthly interest charges and steady principal reduction. For example, an $8,000 balance at 22.5% APR requires approximately $417.00/month to reach a zero balance in 24 months.",
    },
  ],
  inputs: [
    { name: "cardBalance", label: "Credit Card Balance", type: "currency", defaultValue: 10000, unit: "$", min: 100, max: 200000, step: 500 },
    { name: "interestRate", label: "APR (Interest Rate)", type: "percentage", defaultValue: 22.5, unit: "%", min: 1, max: 40, step: 0.1 },
    { name: "targetMonths", label: "Desired Payoff Time", type: "slider", defaultValue: 24, unit: "months", min: 6, max: 60, step: 6 },
  ],
  outputs: [
    { name: "requiredMonthlyPayment", label: "Required Monthly Payment", format: "currency", highlight: true },
    { name: "totalInterest", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalAmountPaid", label: "Total Amount Paid", format: "currency" },
  ],
  calculate: (inputs) => {
    const P = Math.max(0, Number(inputs.cardBalance || 10000));
    const r = Math.min(100, Math.max(0, Number(inputs.interestRate || 22.5))) / 100 / 12;
    const n = Math.max(1, Number(inputs.targetMonths || 24));

    if (P <= 0 || n <= 0) return { requiredMonthlyPayment: 0, totalInterest: 0, totalAmountPaid: 0 };

    const pmt = safePmt(P, r, n);
    const totalPaid = pmt * n;
    const totalInterest = Math.max(0, totalPaid - P);

    return {
      requiredMonthlyPayment: Number(pmt.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      totalAmountPaid: Number(totalPaid.toFixed(2)),
    };
  },
};

export default CREDIT_CARD_PAYOFF_CALCULATOR;
