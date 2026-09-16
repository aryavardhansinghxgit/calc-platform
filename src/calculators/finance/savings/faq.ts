import { CalculatorFAQ } from "@/calculators/types";

export const savingsFaqs: CalculatorFAQ[] = [
  {
    question: "How does a savings calculator work?",
    answer:
      "It projects a future balance from an initial deposit, recurring contributions, an assumed rate, compounding frequency and time horizon. This calculator also supports contribution increases, tax assumptions, inflation adjustment, goal planning and retirement/FIRE scenarios.",
  },
  {
    question: "What is the difference between a savings calculator and a compound interest calculator?",
    answer:
      "A savings calculator can combine an initial balance with recurring contributions and may include goal or inflation features. A compound-interest calculator often focuses on growth from a starting amount and one or more recurring contributions.",
  },
  {
    question: "How is compound interest calculated?",
    answer:
      "For a simple lump-sum model, future value can be represented as P(1+r/n)^(nt). With recurring contributions, the contribution timing must also be modeled. This calculator uses a month-by-month simulation rather than relying on a single formula for every feature.",
  },
  {
    question: "What happens if I make both annual and monthly contributions?",
    answer:
      "Both streams can be active at the same time. Annual contributions are deposited in the first month of each year in this model, while monthly contributions are deposited at the beginning of each month.",
  },
  {
    question: "Does contributing more always increase the projected balance?",
    answer:
      "Under the same other assumptions, increasing contributions increases the modeled ending balance because more principal is being added. The calculator's sensitivity module uses the full contribution schedule so changes are reflected in both principal and subsequent interest.",
  },
  {
    question: "What is APY and how is it different from the interest rate?",
    answer:
      "APY is an annualized yield that reflects the effect of compounding. A nominal annual rate does not itself include the same annual compounding effect. This calculator derives an effective annual yield from the entered rate and compounding frequency.",
  },
  {
    question: "How often should savings interest compound?",
    answer:
      "Accounts may compound daily, monthly, quarterly or on other schedules depending on the product. More frequent compounding can increase the effective annual yield when the nominal rate is the same, although real account terms depend on the product.",
  },
  {
    question: "Is savings account interest taxable?",
    answer:
      "Most interest that is received or credited to an account and available to withdraw is generally taxable income, subject to specific exceptions. Tax treatment can vary by account or product.",
  },
  {
    question: "How does inflation affect savings?",
    answer:
      "Inflation reduces purchasing power. A future balance can be larger in nominal dollars while representing less buying power in today's dollars. The calculator estimates this by discounting the future balance with the selected inflation rate.",
  },
  {
    question: "How much should I keep in an emergency fund?",
    answer:
      "There is no single amount that fits every household. The CFPB says the amount needed depends on your situation and the types of unexpected expenses you need to withstand.",
  },
  {
    question: "Are savings accounts and CDs FDIC insured?",
    answer:
      "Qualifying savings accounts and CDs at FDIC-insured banks are covered subject to FDIC rules and ownership categories. The standard coverage amount is $250,000 per depositor, per insured bank, per ownership category.",
  },
  {
    question: "Does FDIC insurance cover stocks or mutual funds?",
    answer:
      "No. FDIC deposit insurance covers qualifying bank deposit products such as savings accounts and CDs. It does not insure investment products such as stocks, bonds or mutual funds.",
  },
  {
    question: "What is the savings goal calculator used for?",
    answer:
      "It works backward from a target amount to estimate the required lump sum or recurring contribution under the selected assumptions. The result depends on the target, starting balance, rate, compounding and time horizon.",
  },
  {
    question: "Can I increase my savings contributions each year?",
    answer:
      "Yes. This calculator supports annual and monthly contribution increases. The increase is applied according to the selected contribution stream during the simulation.",
  },
  {
    question: "What is the 4% rule for retirement?",
    answer:
      "The 4% figure is a historical planning heuristic often used to illustrate a possible first-year withdrawal rate from a retirement portfolio. It is not a guaranteed safe rate, and actual sustainable withdrawals depend on portfolio mix, time horizon, taxes, inflation, fees and market returns.",
  },
  {
    question: "What is FIRE?",
    answer:
      "FIRE means Financial Independence, Retire Early. The calculator uses a 25-times-annual-expenses planning multiplier and shows LeanFIRE, Standard FIRE and FatFIRE variants. These are scenario targets, not guarantees of financial independence.",
  },
  {
    question: "Should I keep savings in a savings account or invest it?",
    answer:
      "The decision depends on the goal, time horizon, liquidity needs and tolerance for loss. Cash deposits can offer stability and accessibility; investments can fluctuate in value and have different risk and return characteristics.",
  },
  {
    question: "Are high-yield savings account rates fixed?",
    answer:
      "Many savings account APYs are variable and can change over time. The calculator assumes the entered rate remains constant for the selected horizon unless you change it. Current rates should be checked directly with the financial institution.",
  },
  {
    question: "Does the calculator guarantee the ending balance?",
    answer:
      "No. The ending balance is a mathematical projection using the assumptions you enter. Actual rates, contribution timing, fees, taxes, inflation and account terms can differ.",
  },
  {
    question: "Why does an annual contribution differ from the same amount saved monthly?",
    answer:
      "Contribution timing changes how long each deposit earns interest. In this calculator, an annual contribution is deposited in the first month of the year, while monthly contributions are deposited at the beginning of each month, so their results can differ.",
  },
];
