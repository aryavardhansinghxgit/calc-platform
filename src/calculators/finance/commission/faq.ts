export interface FaqItem {
  question: string;
  answer: string;
}

export const commissionFaqs: FaqItem[] = [
  {
    question: "How do I calculate a commission?",
    answer:
      "Multiply the commissionable sales amount by the commission rate expressed as a decimal. For example, $100,000 at 5% produces $5,000 in commission.",
  },
  {
    question: "What is 3% commission on $200,000?",
    answer:
      "A 3% commission on $200,000 is $6,000 ($200,000 × 0.03 = $6,000).",
  },
  {
    question: "How do I calculate the commission percentage from the commission amount?",
    answer:
      "Divide the commission by the sales amount and multiply by 100. For example, a $6,000 commission on $200,000 of sales equals 3% [($6,000 / $200,000) × 100 = 3%].",
  },
  {
    question: "How do I calculate sales needed to earn a specific commission?",
    answer:
      "Divide the desired commission by the commission rate. For example, at 5%, earning $10,000 in commission requires $200,000 in sales ($10,000 / 0.05 = $200,000).",
  },
  {
    question: "How does a tiered commission work?",
    answer:
      "A progressive tiered commission applies different percentages to different portions of sales. For example, the first $20,000 might earn 3%, the next $5,000 5%, and amounts above $25,000 10%. The rates are not necessarily applied to the entire sales amount.",
  },
  {
    question: "Is a 10% commission applied to all sales after reaching a 10% tier?",
    answer:
      "Not necessarily. That depends on the compensation agreement. In a progressive tier structure, 10% applies only to sales falling inside the 10% bracket. A different plan may award a higher rate to all qualifying sales after reaching a threshold.",
  },
  {
    question: "How do I calculate commission with a base salary?",
    answer:
      "Add the commission earned to the base salary: Total Compensation = Base Salary + Commission. This calculator separates those components so you can see both the variable commission and total modeled earnings.",
  },
  {
    question: "How are real estate commissions calculated?",
    answer:
      "At the simplest mathematical level, gross commission is property value multiplied by the applicable commission rate. The amount actually received by a particular agent can then depend on the transaction structure and contractual splits. Real-estate compensation is negotiable and is not set by law.",
  },
  {
    question: "Is there a standard real estate commission percentage?",
    answer:
      "There is no universal commission percentage imposed by law. Compensation is negotiated between the relevant parties and can be structured in different ways.",
  },
  {
    question: "How does an agent/brokerage split work?",
    answer:
      "A brokerage split determines how a particular agent's share is divided between the agent and brokerage under their agreement. A transaction may also involve separate listing-side and buyer-side compensation arrangements, so the exact calculation depends on the contracts and transaction structure.",
  },
  {
    question: "Are commissions taxable?",
    answer:
      "For employees, commissions are generally wages subject to applicable employment taxes, and commissions can be treated as supplemental wages for federal income-tax withholding. Independent contractors have different tax and reporting rules.",
  },
  {
    question: "Is the 22% supplemental wage withholding rate the same as my tax rate?",
    answer:
      "No. The IRS's 22% rate can be an applicable federal income-tax withholding method for certain separately identified supplemental wage payments, but withholding is not necessarily the employee's final tax liability.",
  },
  {
    question: "What is an effective commission rate?",
    answer:
      "The effective commission rate is the actual total commission divided by total sales. It is especially useful for evaluating progressive commission plans where different portions of sales receive different rates.",
  },
  {
    question: "What happens if my commission rate is 0%?",
    answer:
      "At a 0% commission rate, percentage-based commission is $0 regardless of sales volume. A target-earnings calculation that requires positive commission cannot be reached through a 0% rate under the simplified model.",
  },
  {
    question: "Can this calculator determine my actual real estate commission agreement?",
    answer:
      "It can calculate the mathematical result of the assumptions you enter, but it cannot determine the legal or contractual terms of your transaction. Real-estate compensation can vary by agreement, transaction, brokerage, jurisdiction, and the services provided. NAR guidance states that broker compensation is negotiable and not set by law.",
  },
];
