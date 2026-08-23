import { CalculatorFAQ } from "@/calculators/types";

export const four_zero_one_kFaqs: CalculatorFAQ[] = [
  {
    question: "How does a 401(k) calculator estimate retirement savings?",
    answer:
      "It projects the account from the current balance using the entered salary, employee contribution rate, employer matching formula, salary-growth assumption, investment-return assumption and retirement age. The result is a scenario projection, not a guaranteed future account balance.",
  },
  {
    question: "How much should I contribute to get my full employer match?",
    answer:
      "Enter your employer's match percentage and the percentage of salary eligible for the match. In the validated example, a 50% match up to 6% of salary means contributing at least 6% captures the model's maximum $2,250 annual match on a $75,000 salary.",
  },
  {
    question: "How does an employer match affect 401(k) growth?",
    answer:
      "Employer contributions add to the modeled retirement balance and can also participate in subsequent investment growth. The exact effect depends on the match formula, eligibility, vesting, timing and plan terms. This calculator models the matching formula you enter and does not separately model vesting.",
  },
  {
    question: "How do salary increases affect my projected 401(k) balance?",
    answer:
      "When contributions are defined as a percentage of salary, salary growth can increase future employee contributions and the modeled employer match. The calculator applies the selected annual salary-growth assumption year by year.",
  },
  {
    question: "What is the difference between a traditional and Roth 401(k)?",
    answer:
      "Traditional 401(k) contributions are generally made on a pre-tax basis under applicable rules, while Roth 401(k) contributions are made with after-tax dollars. Roth distributions can be tax-free when the distribution is qualified; not every Roth distribution is automatically tax-free.",
  },
  {
    question: "What is the 2026 401(k) contribution limit?",
    answer:
      "For 2026, the IRS lists a $24,500 employee elective-deferral limit for most 401(k) plans. Plan terms can impose lower limits, and separate catch-up rules can increase the amount available to eligible participants.",
  },
  {
    question: "What is the age-50+ 401(k) catch-up contribution?",
    answer:
      "For 2026, the general age-50+ catch-up limit is $8,000 for most 401(k) plans when permitted. The IRS also lists an enhanced $11,250 catch-up for participants who attain age 60, 61, 62 or 63 during 2026. This calculator models the general $8,000 catch-up and does not separately model the enhanced age-60-to-63 rule.",
  },
  {
    question: "What happens if I withdraw money from a 401(k) early?",
    answer:
      "A taxable distribution from a qualified retirement plan before age 59 1/2 may be subject to an additional 10% tax unless an exception applies. The calculator's Early Withdrawal mode provides a simplified scenario using the tax rates and penalty assumptions you enter; it is not an IRS tax-return calculation.",
  },
  {
    question: "Are hardship withdrawals subject to the 10% additional tax?",
    answer:
      "They may be. Hardship distributions are plan-dependent, and a distribution received before age 59 1/2 may be subject to the additional 10% tax unless an exception applies. The calculator should be treated as an illustrative scenario and not as a determination of plan eligibility or tax treatment.",
  },
  {
    question: "How does a 401(k) loan differ from an early withdrawal?",
    answer:
      "A plan loan, when permitted and properly maintained under the plan's rules, is generally not treated as a taxable distribution while the loan requirements are satisfied. A default or failure to follow the plan's repayment terms can change the tax treatment. The calculator does not model every plan-specific loan rule.",
  },
  {
    question: "How is purchasing power calculated for a future 401(k) balance?",
    answer:
      "The calculator converts the projected future balance into an approximate today's-dollar value using the selected inflation rate and the number of years to retirement. For the validated baseline, $1,899,989.67 at age 65 with 3% inflation over 35 years corresponds to about $675,224.81 in today's dollars.",
  },
  {
    question: "Why can this calculator's projection differ from my actual 401(k) balance?",
    answer:
      "The calculator uses fixed assumptions for salary growth, contribution timing, employer matching, investment return and inflation. Real accounts experience changing market returns, payroll timing, plan fees, vesting rules, investment choices and other plan-specific factors. Compare the model with your actual plan documents and statements.",
  },
];
