import { CalculatorModuleDefinition } from "../../types";
import { calculateRepayment } from "@/lib/calculator-engine/formulas/repayment";

export const REPAYMENT_CALCULATOR: CalculatorModuleDefinition = {
  id: "repayment",
  title: "Repayment Calculator",
  slug: "repayment-calculator",
  category: "Finance",
  subcategory: "Credit & Debt",
  description:
    "Free Repayment Calculator. Calculate loan payments and debt payoff timelines with 8 compounding intervals, 8 payment frequencies, fixed term vs. fixed payment modes, extra payments, and bi-weekly accelerators.",
  iconName: "DollarSign",
  featured: true,
  tags: [
    "repayment calculator",
    "loan repayment calculator",
    "debt repayment calculator",
    "mortgage repayment calculator",
    "credit card repayment calculator",
    "calculate loan payoff time",
    "fixed term vs fixed payment calculator",
    "amortization repayment schedule",
    "biweekly loan repayment calculator",
    "how long to repay loan",
  ],
  formulaDescription:
    "PMT = P × [i(1+i)^n] / [(1+i)^n - 1] where i = (1 + r/m)^(m/k) - 1. For fixed installment: n = -ln(1 - (P×i)/PMT) / ln(1+i).",
  faqs: [
    {
      question: "What is the difference between a fixed term and fixed installment repayment plan?",
      answer:
        "A fixed term plan establishes a set maturity date (e.g., 5 years or 30 years) and calculates the exact periodic payment required. A fixed installment plan allows the borrower to set a custom payment amount, solving logarithmically for total payoff time.",
    },
    {
      question: "How does compounding frequency affect my total loan repayment amount?",
      answer:
        "Compounding frequency dictates how often unpaid interest is added to principal. More frequent compounding slightly increases the effective periodic interest rate via i = (1 + r/m)^(m/k) - 1.",
    },
    {
      question: "What happens if my fixed installment is less than the periodic interest charge?",
      answer:
        "Negative amortization occurs: unpaid interest is capitalized into the loan principal, causing the debt balance to grow indefinitely.",
    },
    {
      question: "How does making accelerated bi-weekly repayments shorten loan terms?",
      answer:
        "Accelerated bi-weekly payments split your monthly payment into two halves paid every 14 days (26 half-payments = 13 full payments per year), cutting 4 to 8 years off long-term mortgages.",
    },
    {
      question: "Can I pay off my loan early without incurring prepayment penalties?",
      answer:
        "Most standard consumer loans and mortgages allow fee-free early payoff, but always verify your contract's prepayment penalty clause.",
    },
    {
      question: "Why are early loan payments mostly interest while later payments are mostly principal?",
      answer:
        "Because interest is calculated on the remaining balance, which is highest at the start of the loan. As the balance falls, more of each payment goes toward principal.",
    },
    {
      question: "How are student loan repayment plans structured differently than standard loans?",
      answer:
        "Federal student loans offer income-driven repayment (IDR) plans based on discretionary income, whereas standard loans use fixed amortization schedules.",
    },
    {
      question: "Why does paying only the minimum on credit cards take decades to pay off?",
      answer:
        "Credit card minimum payments drop as the balance falls, creating an asymptotic repayment timeline that maximizes bank interest profits.",
    },
    {
      question: "How do extra lump-sum payments reduce total interest over the life of a loan?",
      answer:
        "Lump-sum payments apply directly to principal, instantly lowering future interest compounding across all subsequent billing cycles.",
    },
    {
      question: "What is debt consolidation and when should I use it to repay multiple loans?",
      answer:
        "Debt consolidation combines multiple debts into a single loan with a lower interest rate, reducing monthly payments and total interest costs.",
    },
    {
      question: "How does continuous compounding differ from discrete compounding?",
      answer:
        "Continuous compounding calculates interest at every infinitesimal moment using e^(r/k) - 1 rather than at discrete monthly or daily intervals.",
    },
    {
      question: "How does inflation reduce the real economic burden of fixed-rate debt?",
      answer:
        "Inflation erodes the purchasing power of money, meaning fixed monthly payments become cheaper in real economic terms as wages and prices rise.",
    },
  ],
  inputs: [
    { name: "loanBalance", label: "Loan Balance ($)", type: "currency", defaultValue: 10000, unit: "$", min: 100, max: 10000000, step: 100 },
    { name: "interestRate", label: "Interest Rate (%)", type: "percentage", defaultValue: 10, unit: "%", min: 0.1, max: 100, step: 0.1 },
  ],
  outputs: [
    { name: "installmentPayment", label: "Periodic Payment", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest", format: "currency", highlight: true },
    { name: "totalAmountRepaid", label: "Total Amount Repaid", format: "currency" },
  ],
  calculate: (inputs: Record<string, any>) => {
    const res = calculateRepayment({
      loanBalance: Number(inputs.loanBalance) || 0,
      interestRatePct: Number(inputs.interestRate) || 0,
      compoundingFrequency: "monthly",
      paymentFrequency: "monthly",
      mode: "term",
      targetYears: 5,
      targetMonths: 0,
    });
    return {
      installmentPayment: res.installmentPayment,
      totalInterestPaid: res.totalInterestPaid,
      totalAmountRepaid: res.totalAmountRepaid,
    };
  },
};
