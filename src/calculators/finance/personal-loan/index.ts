import { CalculatorModuleDefinition } from "../../types";
import { calculatePersonalLoan } from "@/lib/calculator-engine/formulas/personal-loan";
import { PersonalLoanContent } from "@/components/calculator/personal-loan/PersonalLoanContent";

export const PERSONAL_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "personal-loan",
  title: "Personal Loan Calculator – Payments, APR & Fees",
  slug: "personal-loan-calculator",
  category: "Finance",
  subcategory: "Others",
  ContentComponent: PersonalLoanContent,
  description:
    "Calculate monthly personal loan payments, total interest, origination fees, actuarial APR, and amortization schedules with our free personal loan calculator.",
  iconName: "DollarSign",
  featured: true,
  tags: [
    "personal loan",
    "unsecured loan",
    "monthly payment",
    "loan interest",
    "amortization schedule",
    "debt consolidation",
    "origination fee",
    "actuarial apr",
    "early payoff",
  ],
  formulaDescription:
    "PMT = P × [r(1 + r)^n] / [(1 + r)^n - 1]. Total Interest = (PMT × n) - P.",
  faqs: [
    {
      question: "What is a personal loan?",
      answer:
        "A personal loan is a closed-end installment loan provided by a bank, credit union, or online lender that disburses a lump sum of money upfront. Borrowers repay the debt in fixed monthly payments over a predetermined term (commonly 12 to 84 months, or 1 to 7 years) with interest.",
    },
    {
      question: "How is a personal loan payment calculated?",
      answer:
        "Personal loan payments are calculated using the ordinary annuity formula: PMT = P × [r(1 + r)^n] / [(1 + r)^n - 1], where P is principal, r is the monthly periodic interest rate (APR / 12 / 100), and n is total months.",
    },
    {
      question: "How does an origination fee affect the net amount I receive?",
      answer:
        "When an origination fee (commonly 1% to 8% in illustrative market tiers) is deducted from proceeds, net cash received equals the gross loan amount minus the fee. For example, a 5% fee on a $20,000 loan reduces net disbursed cash to $19,000 while monthly payments remain based on the full $20,000 principal.",
    },
    {
      question: "What is the difference between nominal interest rate and APR?",
      answer:
        "The nominal interest rate reflects the basic annualized percentage charged on the principal balance. The Annual Percentage Rate (APR) incorporates both the nominal interest rate and prepaid lender finance charges (such as origination fees), reflecting the true annualized cost of borrowing.",
    },
    {
      question: "How does this calculator estimate fee-inclusive APR?",
      answer:
        "This calculator estimates fee-inclusive APR using an actuarial cash-flow discounting model that solves for the internal rate of return (i) equating net disbursed proceeds to the present value of scheduled monthly payments: Net Proceeds = Σ [PMT_t / (1 + i)^t].",
    },
    {
      question: "Can a personal loan consolidate high-interest credit card debt?",
      answer:
        "Yes. Consolidating multiple high-interest credit cards into a single fixed-rate personal loan combines balances into one monthly payment, often at a lower interest rate, establishing a structured payoff timeline.",
    },
    {
      question: "Does a lower monthly payment always mean I am saving money?",
      answer:
        "Not necessarily. A lower monthly payment can result simply from extending the repayment term over more years. While this provides monthly cash-flow relief, it can increase total cumulative interest paid over the life of the loan.",
    },
    {
      question: "How does loan term length affect total borrowing cost?",
      answer:
        "Shorter loan terms require higher monthly payments but minimize total interest charges. Longer loan terms lower monthly payments but increase total lifetime interest expenses because interest compounds over a longer duration.",
    },
    {
      question: "Can extra principal payments reduce personal loan interest?",
      answer:
        "In this calculator's model, extra monthly payments reduce principal balance faster, which shortens the remaining repayment duration and reduces future interest charges. Borrowers should always verify specific prepayment provisions with their lender.",
    },
    {
      question: "Are personal loans always unsecured?",
      answer:
        "No. While many personal loans are unsecured (requiring no collateral), lenders also offer secured personal loans backed by pledged assets such as savings accounts, certificates of deposit (CDs), or vehicles.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Personal Loan Amount ($)", type: "currency", defaultValue: 20000, unit: "$", min: 1000, max: 200000, step: 500 },
    { name: "interestRate", label: "Interest Rate (APR %)", type: "percentage", defaultValue: 10.0, unit: "%", min: 0, max: 36, step: 0.25 },
    { name: "loanTermYears", label: "Loan Term (Years)", type: "slider", defaultValue: 5, unit: "years", min: 0, max: 10, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Payment", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalPayments", label: "Total Loan Cost", format: "currency" },
    { name: "payoffDateStr", label: "Payoff Date", format: "text" },
  ],
  calculate: (inputs) => {
    const res = calculatePersonalLoan({
      loanAmount: Number(inputs.loanAmount ?? 20000),
      interestRate: Number(inputs.interestRate ?? 10.0),
      loanTermYears: Number(inputs.loanTermYears ?? 5),
    });

    return {
      monthlyPayment: res.monthlyPayment,
      totalInterestPaid: res.totalInterestPaid,
      totalPayments: res.totalPayments,
      payoffDateStr: res.payoffDateStr,
    };
  },
};

export default PERSONAL_LOAN_CALCULATOR;
