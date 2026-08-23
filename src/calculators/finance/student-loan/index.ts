import { CalculatorModuleDefinition } from "../../types";
import { calculateSimpleStudentLoan } from "@/lib/calculator-engine/formulas/student-loan";

export const STUDENT_LOAN_CALCULATOR: CalculatorModuleDefinition = {
  id: "student-loan",
  title: "Student Loan Calculator",
  slug: "student-loan-calculator",
  category: "Finance",
  subcategory: "Loans",
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
  faqs: [
    {
      question: "How is a student loan monthly payment calculated?",
      answer:
        "For a fixed-rate amortizing loan, the calculator uses the loan balance, monthly interest rate and number of monthly payments to determine a level payment. The monthly rate is the annual rate divided by 12.",
    },
    {
      question: "How much interest will I pay on my student loan?",
      answer:
        "It depends on the balance, interest rate, payment schedule and term. The calculator estimates total interest by comparing total modeled repayment with the principal under the selected fixed-payment assumptions.",
    },
    {
      question: "Can I calculate my student loan payoff date?",
      answer:
        "Yes. The repayment and extra-payment modules estimate the number of payments required under the selected payment assumptions and show how additional payments can shorten the modeled timeline.",
    },
    {
      question: "How much can I save by making extra student loan payments?",
      answer:
        "The calculator compares the normal and accelerated repayment scenarios and reports the difference in modeled interest and payoff time. Actual savings can depend on payment timing and how your servicer applies payments.",
    },
    {
      question: "What happens if my student loan payment is less than the interest?",
      answer:
        "The loan may become non-amortizing. If the payment is at or below the modeled monthly interest, the calculator flags the scenario rather than assigning a false finite payoff period.",
    },
    {
      question: "What is the difference between subsidized and unsubsidized student loans?",
      answer:
        "Federal Direct Subsidized and Direct Unsubsidized Loans have different interest-treatment rules. Subsidized loans can receive federal interest benefits during qualifying periods, while unsubsidized loans accrue interest from disbursement under their applicable rules.",
    },
    {
      question: "Does student-loan interest accrue while I am in school?",
      answer:
        "It depends on the loan type and the applicable rules. Direct Loans use daily interest accrual, and the treatment of interest during school can differ between subsidized and unsubsidized loans.",
    },
    {
      question: "What is a student loan grace period?",
      answer:
        "For certain federal student loans, a grace period is generally the period after leaving school or dropping below half-time enrollment before required repayment begins. A commonly applicable federal grace period is six months, but loan type and circumstances matter.",
    },
    {
      question: "Does the grace period increase my student loan balance?",
      answer:
        "It can, depending on the loan type and whether interest accrues during the period. The calculator lets you model a grace period so you can see how the assumed accrual changes the projected repayment balance.",
    },
    {
      question: "What is the difference between federal and private student loans?",
      answer:
        "Federal loans are subject to federal program rules and may qualify for federal repayment plans and protections. Private loans are governed primarily by the lender's contract and generally do not provide the same federal repayment-plan framework.",
    },
    {
      question: "What student loan repayment plans are currently available?",
      answer:
        "Federal repayment-plan availability depends on the loan type and borrower circumstances. Current federal information includes RAP and Tiered Standard, while SAVE is no longer available; PAYE and ICR are subject to transition/end-date rules. Check StudentAid.gov for current eligibility and official terms.",
    },
    {
      question: "Is the SAVE Plan still available?",
      answer:
        "No. Federal Student Aid states that the SAVE Plan is no longer available following a federal court order. Borrowers affected by the change should use StudentAid.gov or their servicer for current repayment-plan options.",
    },
    {
      question: "What are RAP and Tiered Standard?",
      answer:
        "RAP, or the Repayment Assistance Plan, and Tiered Standard are part of the federal repayment-plan changes effective July 1, 2026. Their availability and eligibility depend on applicable federal rules and the borrower's loans.",
    },
    {
      question: "Can a student loan repayment plan qualify me for forgiveness?",
      answer:
        "Some federal programs provide potential forgiveness or discharge after specific requirements are met. Selecting a repayment plan does not by itself guarantee forgiveness. PSLF, for example, has separate qualifying requirements and payment-count rules.",
    },
    {
      question: "What is PSLF?",
      answer:
        "Public Service Loan Forgiveness is a federal forgiveness program with specific loan, employment, repayment and qualifying-payment requirements. Federal Student Aid specifies 120 qualifying payments for PSLF under the program rules.",
    },
    {
      question: "Can I refinance a federal student loan?",
      answer:
        "A federal student loan can be refinanced through a private lender, subject to that lender's eligibility requirements. Refinancing federal debt into private financing can change access to federal repayment plans and protections, so the interest-rate comparison should not be the only consideration.",
    },
    {
      question: "How much can I save by refinancing my student loan?",
      answer:
        "It depends on the current balance, current rate, new rate, term and any refinancing costs. This calculator separates modeled monthly payment reduction from total modeled interest savings so that the two aren't confused.",
    },
    {
      question: "Does making extra payments always save money?",
      answer:
        "Additional principal payments generally reduce future interest under the calculator's amortization model, but the actual effect depends on the loan and how the servicer applies payments. Check your loan terms and payment-allocation instructions.",
    },
    {
      question: "Should I choose the repayment plan with the lowest monthly payment?",
      answer:
        "Not necessarily. A lower payment can extend the repayment period and increase the total amount paid. Compare estimated monthly payment, total amount paid, payoff date and other relevant factors rather than focusing on one number alone.",
    },
    {
      question: "Are the results from this student loan calculator exact?",
      answer:
        "They are mathematical estimates based on the assumptions entered. Actual federal repayment-plan eligibility, servicer calculations, interest accrual, payment allocation, forgiveness eligibility and private refinance terms can differ.",
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
