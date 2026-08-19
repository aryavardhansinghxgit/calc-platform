import { CalculatorModuleDefinition } from "../../types";
import { calculateSimpleStudentLoan } from "@/lib/calculator-engine/formulas/student-loan";

export const STUDENT_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "student-loan",
  title: "Student Loan Calculator – Repayment & Projection Suite",
  slug: "student-loan-calculator",
  category: "Finance",
  subcategory: "Others",
  description:
    "Free Student Loan Calculator. Calculate monthly student loan repayments, 4-way missing solvers, extra payment payoff acceleration, in-school debt projections, federal repayment plans, and refinancing savings.",
  iconName: "GraduationCap",
  featured: true,
  tags: [
    "student loan",
    "student loan calculator",
    "college loan",
    "education loan",
    "student loan repayment",
    "pslf forgiveness",
    "student loan projection",
  ],
  formulaDescription:
    "PMT = [Principal × r × (1 + r)^n] / [(1 + r)^n - 1]. Accelerated Payoff = PMT_base + Extra_Monthly.",
  faqs: [
    {
      question: "How does interest accrue while in school?",
      answer:
        "Direct Unsubsidized Loans and PLUS Loans accrue interest from the date funds are disbursed. If not paid while enrolled, accrued interest is capitalized (added to principal) upon graduation, increasing monthly payments.",
    },
    {
      question: "How much interest can I save by making extra monthly payments?",
      answer:
        "Making extra monthly principal payments directly reduces your loan balance, shortening repayment duration and saving thousands of dollars in cumulative interest.",
    },
  ],
  inputs: [
    { name: "loanBalance", label: "Student Loan Balance ($)", type: "currency", defaultValue: 30000, unit: "$", min: 1000, max: 500000, step: 1000 },
    { name: "interestRate", label: "Interest Rate (%)", type: "percentage", defaultValue: 6.8, unit: "%", min: 1, max: 20, step: 0.1 },
    { name: "remainingTermYears", label: "Remaining Term (Years)", type: "slider", defaultValue: 10, unit: "years", min: 1, max: 30, step: 1 },
  ],
  outputs: [
    { name: "monthlyPayment", label: "Monthly Repayment", format: "currency", highlight: true },
    { name: "totalInterestPaid", label: "Total Interest Paid", format: "currency", highlight: true },
    { name: "totalPayments", label: "Total Repayment Cost", format: "currency" },
  ],
  calculate: (inputs) => {
    const res = calculateSimpleStudentLoan({
      loanBalance: Number(inputs.loanBalance || 30000),
      interestRate: Number(inputs.interestRate || 6.8),
      remainingTermYears: Number(inputs.remainingTermYears || 10),
    });

    return {
      monthlyPayment: res.monthlyPayment,
      totalInterestPaid: res.totalInterestPaid,
      totalPayments: res.totalPayments,
    };
  },
};

export default STUDENT_LOAN_CALCULATOR;
