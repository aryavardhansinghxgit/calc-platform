import { CalculatorModuleDefinition } from "../../types";
import { calculateSimpleStudentLoan } from "@/lib/calculator-engine/formulas/student-loan";
import { studentLoanFaqs } from "./faq";
import { StudentLoanCalculator } from "@/components/calculator/student-loan/StudentLoanCalculator";
import { StudentLoanContent } from "@/components/calculator/student-loan/StudentLoanContent";

export const STUDENT_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "student-loan",
  title: "Student Loan Calculator",
  slug: "student-loan-calculator",
  category: "Finance",
  subcategory: "Loans",
  CustomComponent: StudentLoanCalculator,
  ContentComponent: StudentLoanContent,
  description:
    "Calculate student loan payments, total interest, payoff time, extra-payment savings, in-school balance projections, refinancing scenarios, and federal repayment-plan options.",
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
    "student loan refinancing",
  ],
  formulaDescription:
    "PMT = [Principal × r × (1 + r)^n] / [(1 + r)^n - 1]. Accelerated Payoff = PMT_base + Extra_Monthly.",
  faqs: studentLoanFaqs,
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
      loanBalance: Number(inputs.loanBalance ?? 30000),
      interestRate: Number(inputs.interestRate ?? 6.8),
      remainingTermYears: Number(inputs.remainingTermYears ?? 10),
    });

    return {
      monthlyPayment: res.monthlyPayment,
      totalInterestPaid: res.totalInterestPaid,
      totalPayments: res.totalPayments,
    };
  },
};

export default STUDENT_LOAN_CALCULATOR;
