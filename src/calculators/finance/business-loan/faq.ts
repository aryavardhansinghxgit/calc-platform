export interface FaqItem {
  question: string;
  answer: string;
}

export const businessLoanFaqs: FaqItem[] = [
  {
    question: "What is a business loan calculator?",
    answer:
      "A business loan calculator estimates the repayment cost of commercial financing from inputs such as loan amount, interest rate, repayment term, and fees. Depending on the calculator, it can show periodic payments, total interest, total financing cost, amortization, and debt-service coverage.",
  },
  {
    question: "How do I calculate a business loan payment?",
    answer:
      "For a fully amortizing loan, the periodic payment is calculated from the principal, periodic interest rate, and number of payments: PMT = [P × r × (1+r)^n] / [(1+r)^n − 1]. For monthly payments, the annual interest rate is converted to a monthly rate (annual rate / 12) for the repayment calculation.",
  },
  {
    question: "How much interest will I pay on a business loan?",
    answer:
      "It depends on the principal, interest rate, payment frequency, and term. The total interest is the sum of scheduled payments minus the principal, assuming a fully amortizing loan with no additional balance changes.",
  },
  {
    question: "Do business loan fees matter?",
    answer:
      "Yes. Origination fees, documentation fees, and other charges increase the economic cost of financing even when they do not change the nominal interest rate.",
  },
  {
    question: "What is the difference between interest rate and APR?",
    answer:
      "The interest rate describes the rate applied to the outstanding loan balance. An annualized effective cost measure (Actuarial APR) incorporates upfront fees and the timing of borrower cash flows. The exact legal meaning and disclosure requirements of APR depend on the type of transaction.",
  },
  {
    question: "Is the calculator's actuarial APR the same as a consumer APR?",
    answer:
      "Not necessarily. This calculator's actuarial figure is based on modeled cash flows (IRR method) and is intended to provide an annualized financing-cost comparison. Business-purpose credit can fall outside Regulation Z's consumer-credit disclosure coverage.",
  },
  {
    question: "What is DSCR on a business loan?",
    answer:
      "DSCR, or Debt Service Coverage Ratio, compares cash flow available for debt service with required debt payments: DSCR = Net Operating Income (NOI) / Annual Debt Service. A higher ratio generally indicates more cash-flow coverage.",
  },
  {
    question: "Is 1.25x DSCR required for every business loan?",
    answer:
      "No. A 1.25× level is commonly useful as an analytical benchmark, but lender requirements vary by financing product and underwriting policy. It should not be treated as a universal approval rule.",
  },
  {
    question: "What is an SBA 7(a) loan?",
    answer:
      "SBA describes 7(a) as its primary business loan program. It can support qualifying uses including working capital, real estate, equipment, business acquisition, and certain refinancing transactions.",
  },
  {
    question: "What is an SBA 504 loan?",
    answer:
      "The SBA 504 program provides long-term, fixed-rate financing for major fixed assets such as commercial real estate and heavy machinery, and is delivered through Certified Development Companies (CDCs).",
  },
  {
    question: "What is an SBA Microloan?",
    answer:
      "The SBA Microloan Program provides loans of up to $50,000 through approved intermediary lenders and is designed for smaller financing requirements such as working capital, inventory, supplies, furniture, fixtures, machinery, and equipment.",
  },
  {
    question: "Does SBA guarantee the entire business loan?",
    answer:
      "No. SBA guarantees a portion of qualifying loans according to the applicable program and rules. For example, SBA states that most 7(a) loans have guarantee percentages that depend on loan size, while specialized programs can have different guarantee structures.",
  },
  {
    question: "Can I use a business loan for working capital?",
    answer:
      "Many business financing products permit working-capital uses. SBA's 7(a) program specifically lists short- and long-term working capital among permitted uses.",
  },
  {
    question: "Does a longer business loan term reduce interest?",
    answer:
      "It usually reduces the required periodic payment but increases total interest because the debt remains outstanding for longer. The amortization schedule is the best way to see this trade-off for a specific scenario.",
  },
  {
    question: "Is business loan interest tax deductible?",
    answer:
      "Interest on debt used for a trade or business may be deductible subject to the tax rules and limitations that apply to the business and the particular debt. The IRS notes that business interest expense can be subject to limitations (such as Section 163(j)).",
  },
];
