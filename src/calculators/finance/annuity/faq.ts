import { CalculatorFAQ } from "@/calculators/types";

export const annuityFaqs: CalculatorFAQ[] = [
  {
    question: "What is an annuity?",
    answer:
      "An annuity is a financial arrangement involving a defined pattern of contributions or payments. In an accumulation model, the calculator treats recurring contributions as a series of cash flows that compound over time according to the selected rate and timing assumptions.",
  },
  {
    question: "What is the difference between an ordinary annuity and an annuity due?",
    answer:
      "An ordinary annuity pays at the end of each period, while an annuity due pays at the beginning. Because beginning-of-period contributions receive an additional period of growth, an annuity due normally produces a higher future value when the growth rate is positive.",
  },
  {
    question: "How does an annuity accumulate money?",
    answer:
      "An annuity accumulates through two sources: the money contributed and the growth earned on the accumulated balance. Earlier contributions remain invested longer, so their growth contribution is generally larger than that of later contributions.",
  },
  {
    question: "How does compound growth affect an annuity?",
    answer:
      "Compound growth means previously earned returns remain part of the balance used for future growth. Over longer periods, this can make the growth portion of the final balance increasingly significant.",
  },
  {
    question: "How is an annuity future value calculated?",
    answer:
      "The future value depends on the starting principal, periodic contribution, rate, number of periods and whether payments occur at the beginning or end of each period. The exact formula changes when payment timing changes.",
  },
  {
    question: "How does the Target Balance Planner work?",
    answer:
      "The Target Balance Planner reverses the accumulation equation. It calculates the contribution required to reach a specified future balance under the selected starting principal, growth rate, duration and timing assumptions.",
  },
  {
    question: "How do annual and monthly contributions differ?",
    answer:
      "They differ mainly in timing. A monthly contribution enters the model throughout the year, while an annual contribution is deposited as a single event under the calculator's selected timing convention.",
  },
  {
    question: "How does inflation affect future annuity purchasing power?",
    answer:
      "Inflation can reduce the purchasing power represented by a future nominal balance. The calculator models this by applying the selected inflation assumption to the ending balance over the selected time horizon.",
  },
  {
    question: "How does tax affect modeled annuity growth?",
    answer:
      "Tax can reduce the modeled value of the earnings component. The calculator's tax result is a simplified scenario assumption and is not a personalized tax determination.",
  },
  {
    question: "What is the difference between fixed, fixed-indexed and variable annuities?",
    answer:
      "These structures differ in how interest or investment performance is determined and what contractual features apply. Specific rates, participation rules, fees, guarantees and surrender provisions depend on the contract.",
  },
  {
    question: "What are surrender charges?",
    answer:
      "Surrender charges are contract-specific fees that may apply when money is withdrawn during an applicable surrender period. The exact schedule varies by product and insurer.",
  },
  {
    question: "Can annuity withdrawals be subject to additional tax or penalties?",
    answer:
      "Certain withdrawals can have tax consequences or additional penalties depending on the account, contract, age, distribution circumstances and applicable rules. The calculator's educational content should not be interpreted as personalized tax advice.",
  },
];
