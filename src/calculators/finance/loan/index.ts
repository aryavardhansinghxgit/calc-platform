import { CalculatorModuleDefinition } from "../../types";
import { calculateLoanFormula } from "@/lib/calculator-engine/formulas/loan";
import LoanContentSection from "@/components/calculator/loan/LoanContentSection";

export const LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "loan",
  title: "Loan Calculator – Monthly, Biweekly & Extra Payment Payoff",
  slug: "loan-calculator",
  category: "Finance",
  subcategory: "Others",
  description: "Calculate loan payments across monthly, biweekly, and weekly schedules. Model extra payments, generate complete amortization schedules, and solve for loan amount, term, or interest rate.",
  iconName: "CalcIcon",
  featured: true,
  tags: ["loan", "loan calculator", "loan payment calculator", "loan amortization calculator", "biweekly loan payment", "loan payoff calculator", "extra payments"],
  formulaDescription: "PMT = P × [r(1 + r)^n] / [(1 + r)^n − 1]. Supports 4 solver modes: Monthly Payment, Loan Amount, Loan Term, and Interest Rate across Monthly, Biweekly, and Weekly schedules.",
  ContentComponent: LoanContentSection,
  faqs: [
    {
      question: "What is an amortized loan?",
      answer: "An amortized loan is an installment debt structure where a borrower repays borrowed principal along with interest charges through regularly scheduled payments over a fixed duration. Each payment covers the interest accrued during the period, with the remainder reducing the outstanding principal balance until the debt is fully retired.",
    },
    {
      question: "How is a monthly loan payment calculated?",
      answer: "Monthly payments are calculated using the standard amortization formula: PMT = P × [r(1+r)^n] / [(1+r)^n - 1], where P is the principal loan amount, r is the monthly interest rate (annual rate / 12 / 100), and n is the total number of payment months (years × 12).",
    },
    {
      question: "What is the difference between nominal interest rate and APR?",
      answer: "The nominal interest rate is the base percentage charged on the outstanding loan balance. The Annual Percentage Rate (APR) is a standardized regulatory metric under U.S. Truth in Lending Act (TILA) Regulation Z that measures the total cost of credit, incorporating both the nominal rate and applicable prepaid finance charges (such as origination points and processing fees).",
    },
    {
      question: "What is the difference between Regular Biweekly and Accelerated Biweekly payments?",
      answer: "Under Regular Biweekly payments (calculated in this tool's frequency dropdown), the annual interest rate is divided across 26 equal periods, amortizing the debt over the full scheduled term. Under Accelerated Biweekly payments, the borrower pays exactly half of the standard monthly payment every two weeks, generating 26 half-payments (equal to 13 full payments per year) to pay off the loan years early.",
    },
    {
      question: "How do extra monthly payments reduce total loan interest?",
      answer: "In this calculator's model, extra payments apply directly to the outstanding principal balance. By reducing principal ahead of schedule, less interest accrues in subsequent compounding cycles, shortening the required repayment term and lowering cumulative interest charges.",
    },
    {
      question: "How does loan term length affect monthly payment and total interest?",
      answer: "Shorter loan terms require higher monthly payments but generate significantly lower total interest charges because principal is retired faster. Longer loan terms lower required monthly payments, enhancing short-term cash flow flexibility, but increase total interest paid over the life of the debt.",
    },
    {
      question: "Can I estimate how much loan principal I can afford?",
      answer: "Mode 2 (Loan Amount Solver) calculates the estimated loan principal corresponding mathematically to a selected monthly budget, interest rate, and term length. However, this is a mathematical reverse calculation and does not evaluate income, debt-to-income (DTI) ratios, or lender underwriting qualification criteria.",
    },
    {
      question: "Does a 740+ credit score guarantee prime interest rates?",
      answer: "A credit score of 740 or higher is a commonly referenced benchmark for prime credit tiers, which frequently corresponds to competitive loan pricing. However, credit scores do not guarantee approval or specific rate tiers; lenders evaluate additional underwriting factors including income stability, employment history, collateral value, and debt obligations.",
    },
    {
      question: "Can I pay off a consumer loan early without prepayment penalties?",
      answer: "Whether a loan permits penalty-free early repayment depends on the loan agreement, credit product, lender, and applicable state or federal statutes. While federal regulations restrict prepayment penalties on most qualified residential mortgages, borrowers should always review the specific prepayment provisions in their promissory note.",
    },
    {
      question: "Does refinancing a loan always save money?",
      answer: "Refinancing may lower monthly payments, reduce interest rates, or decrease total lifetime borrowing costs depending on new loan terms, closing costs, borrower credit standing, and prevailing market rates. Borrowers should evaluate closing costs against monthly interest savings to determine the financial break-even timeline.",
    },
  ],
  inputs: [
    { name: "loanAmount", label: "Loan Amount", type: "currency", defaultValue: 25000, unit: "$", min: 1000, max: 1000000, step: 1000 },
    { name: "interestRate", label: "Interest Rate (p.a.)", type: "percentage", defaultValue: 7.5, unit: "%", min: 0.1, max: 30, step: 0.1 },
    { name: "loanTermYears", label: "Loan Term", type: "slider", defaultValue: 5, unit: "years", min: 1, max: 30, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Payment", format: "currency", highlight: true },
    { name: "totalInterest", label: "Total Interest Paid", format: "currency" },
    { name: "totalRepayment", label: "Total Amount Paid", format: "currency" },
    { name: "payoffDate", label: "Loan Payoff Date", format: "text" },
  ],
  calculate: (inputs) => {
    return calculateLoanFormula({
      mode: inputs.mode || "monthly-payment",
      loanAmount: Number(inputs.loanAmount || 25000),
      interestRate: Number(inputs.interestRate || 7.5),
      loanTermYears: Number(inputs.loanTermYears || 5),
      loanTermMonths: Number(inputs.loanTermMonths || 0),
      desiredPayment: Number(inputs.desiredPayment || 500),
      paymentFrequency: inputs.paymentFrequency || "monthly",
      extraMonthlyPayment: Number(inputs.extraMonthlyPayment || 0),
    });
  },
};

export default LOAN_CALCULATOR;
