import { CalculatorFAQ } from "@/calculators/types";

export const present_valueFaqs: CalculatorFAQ[] = [
  {
    question: "What is Present Value (PV)?",
    answer:
      "Present Value is the current economic value of a future lump sum or series of cash flows after discounting them at a selected rate. It lets future payments be compared with money available today under a consistent set of assumptions.",
  },
  {
    question: "How is Present Value calculated?",
    answer:
      "A lump sum is discounted using PV = FV / (1 + r/n)^(n×t). Recurring payments use an annuity formula that discounts each payment according to its timing.",
  },
  {
    question: "What is the difference between Present Value and Future Value?",
    answer:
      "Future Value projects today's money forward through compounding. Present Value takes a future amount and discounts it backward into today's dollars.",
  },
  {
    question: "What is Net Present Value (NPV)?",
    answer:
      "NPV is the present value of future cash inflows minus the initial capital outlay. A positive modeled NPV means discounted inflows exceed the initial outlay under the selected assumptions.",
  },
  {
    question: "What is the difference between an ordinary annuity and an annuity due?",
    answer:
      "An ordinary annuity pays at the end of each period. An annuity due pays at the beginning of each period, so its present value is higher when the discount rate is positive.",
  },
  {
    question: "How does the discount rate affect Present Value?",
    answer:
      "A higher discount rate generally lowers present value because future cash flows are discounted more heavily. A lower rate produces a higher present value, all else equal.",
  },
  {
    question: "What is a discount factor?",
    answer:
      "A discount factor converts a future cash flow into its present value. It becomes smaller as the payment moves farther into the future or as the discount rate increases.",
  },
  {
    question: "How do I choose a discount rate or hurdle rate?",
    answer:
      "The appropriate rate depends on the purpose of the analysis, risk, opportunity cost and valuation framework. Presets in the calculator are illustrative scenario assumptions rather than universal market rates.",
  },
  {
    question: "What is the difference between nominal cash flow and Present Value?",
    answer:
      "Nominal cash flow is the number of dollars expected to arrive in the future. Present Value translates that amount into today's economic value under the selected discount rate.",
  },
  {
    question: "How does NPV help evaluate an investment or project?",
    answer:
      "NPV provides a model-based comparison between the present value of expected cash flows and the initial investment. It can support project screening, but it is not a guarantee of realized investment performance.",
  },
  {
    question: "Why does a higher discount rate produce a lower Present Value?",
    answer:
      "A higher rate implies a greater amount of return or opportunity cost required over time, so future dollars must be discounted more heavily to express their value today.",
  },
  {
    question: "How do I calculate the Present Value of uneven cash flows?",
    answer:
      "Each future cash flow is discounted separately according to when it is expected to occur, and those discounted values are then added before the initial capital outlay is considered for NPV.",
  },
];
