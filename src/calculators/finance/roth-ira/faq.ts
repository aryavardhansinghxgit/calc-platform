import { CalculatorFAQ } from "@/calculators/types";

export const roth_ira_faqs: CalculatorFAQ[] = [
  {
    question: "What is a Roth IRA calculator?",
    answer:
      "A Roth IRA calculator is a planning tool that estimates how a Roth IRA could grow from a starting balance and future contributions under an assumed investment return. A comprehensive calculator can also compare the modeled result with a taxable account, test contribution limits and income thresholds, and show an annual schedule so the headline result can be audited.",
  },
  {
    question: "How much can I contribute to a Roth IRA in 2026?",
    answer:
      "For 2026, the IRS says the combined annual contribution limit for an individual's Traditional and Roth IRAs is $7,500, or $8,600 if the individual is age 50 or older, subject to the taxable-compensation limitation if compensation is lower. The limit is shared across Traditional and Roth IRAs rather than being a separate $7,500 allowance for each account.",
  },
  {
    question: "What is the Roth IRA income limit for 2026?",
    answer:
      "For 2026, the Roth IRA MAGI phase-out range is $153,000 to $168,000 for single filers and heads of household, $242,000 to $252,000 for married filing jointly, and $0 to $10,000 for married filing separately under the applicable rule. The exact contribution treatment depends on filing status and MAGI calculation, so the calculator should be used as an estimate rather than a complete tax-return determination.",
  },
  {
    question: "Can I contribute $7,500 to both a Traditional IRA and a Roth IRA?",
    answer:
      "Not under the ordinary 2026 annual IRA limit. The IRS limit applies to total contributions across all of your Traditional and Roth IRAs. You can split the $7,500 between the accounts, but you generally cannot contribute $7,500 to each and treat the combined $15,000 as within the annual limit.",
  },
  {
    question: "What happens if I am age 50 or older?",
    answer:
      "For 2026, the IRA catch-up contribution amount is $1,100. That raises the general combined IRA contribution limit from $7,500 to $8,600 for an eligible individual age 50 or older, subject to the same taxable-compensation constraint.",
  },
  {
    question: "How does a Roth IRA compound?",
    answer:
      "The account compounds when investment returns are earned on the existing balance and those returns remain invested. In a recurring-contribution model, each contribution also gets its own period of growth. The timing convention matters: a beginning-of-year contribution receives one more compounding interval than an otherwise identical end-of-year contribution.",
  },
  {
    question: "What is the difference between a Roth IRA and a taxable investment account?",
    answer:
      "The primary modeled difference is tax treatment. A Roth IRA can provide tax-free qualified distributions, while a taxable account may create taxes during the investment period or at realization depending on the income and transaction. This calculator uses a simplified taxable-account model, so its “Roth advantage” is conditional on the stated assumptions rather than a universal guarantee.",
  },
  {
    question: "What is a Backdoor Roth IRA?",
    answer:
      "A Backdoor Roth is generally a strategy involving a Traditional IRA contribution followed by a Roth IRA conversion. The tax result depends on the amount that is taxable and on the taxpayer’s broader IRA situation. The IRS confirms that previously untaxed amounts converted from a Traditional IRA to a Roth IRA can be included in gross income.",
  },
  {
    question: "Does a Roth conversion create taxes?",
    answer:
      "It can. The taxable portion of a Traditional IRA amount converted to a Roth IRA is generally included in gross income. The exact tax result depends on basis and the taxpayer’s broader tax situation, so a simple percentage-times-conversion estimate should be treated as a planning illustration rather than an exact tax bill.",
  },
  {
    question: "What is the Roth IRA five-year rule?",
    answer:
      "For qualified Roth IRA distributions, the IRS generally requires that the five-year period beginning with the first tax year for which the Roth IRA was established and contributed to has been satisfied, along with an applicable qualifying event such as reaching age 59 1/2, disability, death, or the first-home exception under its rules.",
  },
  {
    question: "Are Roth IRA withdrawals always tax-free?",
    answer:
      "No. Qualified Roth IRA distributions can be tax-free, but not every distribution is automatically qualified. The tax treatment depends on the type of amount being distributed, the five-year rules, age, and other qualifying conditions. The IRS provides a specific test for determining whether a Roth distribution is qualified.",
  },
  {
    question: "How accurate is a Roth IRA calculator?",
    answer:
      "A calculator can be mathematically accurate for the assumptions it uses, but the future investment result is still a projection. Returns, inflation, tax laws, contribution eligibility, and personal circumstances can change. The best use of the calculator is to compare scenarios and inspect the assumptions rather than treat one projected balance as a guaranteed outcome.",
  },
];
