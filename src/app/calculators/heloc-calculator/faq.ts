export interface HELOCFAQItem {
  question: string;
  answer: string;
}

export const helocFaqs: HELOCFAQItem[] = [
  {
    question: "What is a HELOC and how does it work?",
    answer:
      "A HELOC is a revolving line of credit secured by home equity. The calculator models available credit, draw-phase payments, repayment-phase payments, rate scenarios, fees, and total modeled interest.",
  },
  {
    question: "How is a HELOC credit limit calculated?",
    answer:
      "The calculator multiplies home value by the selected maximum CLTV and subtracts the existing first-mortgage balance. A negative result is safely clamped to zero.",
  },
  {
    question: "What is CLTV and why does it matter for a HELOC?",
    answer:
      "CLTV compares the combined first mortgage and HELOC balance with the home's market value. It is used in the calculator to estimate the maximum borrowing amount and the percentage of the property value secured by debt.",
  },
  {
    question: "How are HELOC draw-period and repayment-period payments calculated?",
    answer:
      "Interest-only draw payments are based on the HELOC balance and rate. The repayment phase uses amortizing payment mathematics over the selected repayment term. The calculator also supports a principal-and-interest draw structure.",
  },
  {
    question: "What is HELOC payment shock?",
    answer:
      "Payment shock is the positive increase between the repayment payment and the draw payment. The calculator clamps negative values to zero, so a repayment payment lower than the draw payment is shown as no upward payment shock.",
  },
  {
    question: "How do variable HELOC interest rates and rate caps work?",
    answer:
      "The calculator models a benchmark plus lender margin and allows a stress increase subject to a lifetime cap. The current benchmark assumptions are model inputs and should not be treated as a permanent market rate.",
  },
  {
    question: "Can I make extra principal payments on a HELOC?",
    answer:
      "Yes. The lifecycle simulator allows extra principal payments and models their effect on the outstanding balance, later repayment payment, and interest.",
  },
  {
    question: "How does a HELOC compare with a fixed home equity loan?",
    answer:
      "A HELOC is revolving and can have variable-rate behavior, while a fixed home equity loan is generally modeled as a lump-sum installment loan. The appropriate choice depends on the amount needed, timing, rate structure, fees, and repayment preferences.",
  },
  {
    question: "How does a HELOC compare with a cash-out refinance?",
    answer:
      "A cash-out refinance replaces the existing first mortgage with a new mortgage, while a HELOC keeps the first mortgage in place. The calculator's comparison is scenario-specific and should consider the rate and balance of the existing first mortgage.",
  },
  {
    question: "Is HELOC interest tax-deductible?",
    answer:
      "The calculator includes an illustrative tax estimator for qualifying home-use assumptions. Tax treatment depends on applicable law, the use of the proceeds, filing circumstances, and other factors, so the result is not tax advice.",
  },
  {
    question: "What happens to a HELOC when I sell my home?",
    answer:
      "An outstanding HELOC balance generally must be satisfied as part of the sale because the line is secured by the property. The calculator can estimate the balance but cannot determine final settlement requirements.",
  },
  {
    question: "What fees and risks should I understand before opening a HELOC?",
    answer:
      "Users should consider closing costs, annual fees, variable-rate risk, payment shock, the possibility of credit-line changes, and the fact that the home secures the debt. Actual fees and lender rights vary by product and lender.",
  },
];
