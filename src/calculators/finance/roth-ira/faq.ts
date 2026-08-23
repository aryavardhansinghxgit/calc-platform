import { CalculatorFAQ } from "@/calculators/types";

export const roth_ira_faqs: CalculatorFAQ[] = [
  {
    question: "How does a Roth IRA calculator estimate retirement growth?",
    answer:
      "It projects a Roth IRA balance from the entered current balance, annual contribution, investment-return assumption, current age and retirement age. This calculator uses beginning-of-year contribution timing and shows the resulting annual schedule.",
  },
  {
    question: "What is the 2026 Roth IRA contribution limit?",
    answer:
      "For 2026, the regular IRA contribution limit is $7,500. The limit is shared across an individual's traditional and Roth IRAs, and the amount can be lower if taxable compensation is lower.",
  },
  {
    question: "What is the Roth IRA age-50+ catch-up contribution?",
    answer:
      "For 2026, the IRA catch-up contribution is $1,100, making the general age-50-and-over combined IRA limit $8,600. The $8,000 catch-up that applies to many 401(k) plans is not the IRA catch-up.",
  },
  {
    question: "How do Roth IRA income limits affect direct contributions?",
    answer:
      "For 2026, the direct Roth IRA contribution phase-out range is $153,000 to $168,000 for single filers and heads of household, $242,000 to $252,000 for married filing jointly, and $0 to $10,000 for married filing separately. A user's actual eligibility depends on the applicable filing-status and MAGI rules.",
  },
  {
    question: "What is the difference between a Roth IRA and a taxable account?",
    answer:
      "A Roth IRA uses after-tax contributions and can receive tax-free qualified distributions, while a taxable account can generate taxable investment income and realized gains under applicable tax rules. This calculator compares them using a simplified taxable-account tax-drag model.",
  },
  {
    question: "When are Roth IRA withdrawals tax-free?",
    answer:
      "Qualified Roth IRA distributions generally require the applicable five-year period plus a qualifying condition such as age 59 1/2, disability, death or the qualified first-home exception. Not every Roth IRA withdrawal is automatically tax-free.",
  },
  {
    question: "Can I withdraw Roth IRA contributions before retirement?",
    answer:
      "Roth IRA distributions generally follow ordering rules under which regular contributions come out before conversion amounts and earnings. The treatment of conversion amounts and earnings can differ, so a specific withdrawal may require analysis of the account's contribution and conversion history.",
  },
  {
    question: "What is a Backdoor Roth IRA?",
    answer:
      "A Backdoor Roth generally involves a nondeductible traditional IRA contribution followed by a Roth conversion. This calculator models the conversion using a simplified tax-rate assumption; it does not determine a taxpayer's complete conversion tax liability.",
  },
  {
    question: "How can the pro-rata rule affect a Backdoor Roth conversion?",
    answer:
      "Other pre-tax traditional, SEP and SIMPLE IRA balances can affect the taxable portion of a Roth conversion under the applicable pro-rata rules. Because the calculator does not collect every tax-return fact needed for a full pro-rata calculation, its conversion result is an illustrative model.",
  },
  {
    question: "What is the Roth IRA Saver's Credit?",
    answer:
      "The Saver's Credit is a federal tax credit for eligible retirement contributions when the taxpayer meets the applicable income, age, student, dependency and other requirements. The credit percentage depends on filing status and income; the calculator is an eligibility model rather than a filed Form 8880.",
  },
  {
    question: "Does a Roth IRA have required minimum distributions for the original owner?",
    answer:
      "An original Roth IRA owner generally is not required to take lifetime RMDs under current federal rules. Inherited Roth IRAs are different and generally have beneficiary distribution requirements.",
  },
  {
    question: "Why can this calculator differ from my actual Roth IRA results?",
    answer:
      "The calculator uses fixed assumptions for returns, annual contribution timing and taxable-account tax drag. Real investments have changing returns, fees, different contribution timing and more complex tax treatment. The Backdoor Roth, MAGI and Saver's Credit modes are also simplified models of rules that can depend on additional taxpayer facts.",
  },
];
