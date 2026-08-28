export interface FaqItem {
  question: string;
  answer: string;
}

export const pensionFaqs: FaqItem[] = [
  {
    question: "Is a monthly pension better than a lump sum?",
    answer:
      "Neither option is universally better. A monthly pension provides a stream of retirement income and can reduce the burden of managing investments for spending needs. A lump sum provides greater flexibility and control but transfers investment and longevity risk to the retiree. Compare both using realistic investment returns, life expectancy, COLA, taxes and survivor requirements.",
  },
  {
    question: "How do I compare a pension lump sum to monthly payments?",
    answer:
      "Compare the expected lifetime pension payments with the lump sum's potential investment value, and also calculate the present value of the pension. The Pension Calculator performs these comparisons using retirement age, life expectancy, monthly pension, COLA, lump sum and investment-return assumptions.",
  },
  {
    question: "What is the present value of a pension?",
    answer:
      "Present value is the modeled value today of a stream of future pension payments after discounting those future payments using a selected return or discount-rate assumption. It is different from the total nominal amount of all future pension checks.",
  },
  {
    question: "What is a pension breakeven age?",
    answer:
      "A pension breakeven age is the modeled point at which one pension option catches up with another under the assumptions used in the calculation. It is not a prediction of your lifespan and can change substantially when the pension, lump sum, return, COLA or life expectancy assumptions change.",
  },
  {
    question: "How does a pension COLA affect the calculation?",
    answer:
      "A COLA increases future pension payments according to the annual percentage entered. Because the increases compound over time, a pension with a COLA can produce significantly more lifetime income than the same starting pension without an adjustment.",
  },
  {
    question: "What is the difference between a single-life and joint-and-survivor pension?",
    answer:
      "A single-life pension generally provides benefits based on the participant's lifetime. A joint-and-survivor pension is structured to continue benefits to a surviving spouse after the participant dies. The participant's initial payment is often lower when survivor protection is included.",
  },
  {
    question: "How does a 100% survivor pension work?",
    answer:
      "A 100% survivor option means that, under the calculator's simplified model, the surviving spouse continues receiving 100% of the joint pension payment after the participant's death. Actual plan definitions and actuarial reductions must be confirmed with the pension plan.",
  },
  {
    question: "Can working longer increase my pension?",
    answer:
      "Yes, depending on the plan. Additional years of service, higher compensation and plan-specific accrual rules can increase the pension. Working longer also means giving up some years of earlier pension payments, so the economically better choice depends on the size of the increase and how long the pension is expected to be received.",
  },
  {
    question: "How is a defined-benefit pension calculated?",
    answer:
      "A common simplified formula is: Annual Pension = Final Average Salary × Years of Service × Benefit Multiplier. For example, $80,000 × 25 years × 2% produces a $40,000 annual pension, or approximately $3,333.33 per month. Your actual plan may use a different formula or additional adjustments.",
  },
  {
    question: "Does a higher investment return make the lump sum more attractive?",
    answer:
      "Generally, a higher assumed investment return makes the lump-sum option more competitive because the model assumes the invested capital grows faster. However, higher expected returns generally come with greater uncertainty and investment risk. The return entered in the calculator is an assumption, not a guaranteed result.",
  },
  {
    question: "Does life expectancy affect whether a pension is better?",
    answer:
      "Yes. A longer modeled life expectancy generally increases the value of lifetime pension income because more payments are received. A shorter retirement horizon can make a lump sum relatively more attractive, depending on the other assumptions.",
  },
  {
    question: "Is the pension calculator's result an official pension estimate?",
    answer:
      "No. It is a mathematical planning estimate. Your pension plan's benefit statement, plan document and official election calculation control the actual benefit. Plan-specific actuarial factors, mortality assumptions, interest rates, survivor provisions and early-retirement rules can produce different results.",
  },
  {
    question: "Are pension payments taxable?",
    answer:
      "Many pension payments are taxable, although the taxable portion can depend on the source of the benefit and the recipient's basis. The IRS provides specific rules for periodic and nonperiodic pension and annuity distributions.",
  },
  {
    question: "Is a lump-sum pension distribution taxable?",
    answer:
      "It can be. The tax treatment depends on the type of distribution and the plan. Certain eligible distributions may qualify for rollover treatment, while amounts not rolled over can generally have tax consequences. Consult the plan administrator and tax professional before making an election.",
  },
  {
    question: "Should I choose a pension or lump sum?",
    answer:
      "The decision depends on your circumstances. Consider guaranteed income needs, health and longevity expectations, investment experience, other retirement income, spouse protection, flexibility, inheritance goals, inflation protection and taxes. The calculator can quantify the mathematical tradeoffs, but it cannot determine which option is appropriate for every household.",
  },
];
