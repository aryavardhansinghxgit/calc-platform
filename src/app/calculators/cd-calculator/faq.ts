import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const cdFaqs: CalculatorFAQ[] = [
  {
    question: "How does a Certificate of Deposit (CD) work?",
    answer:
      "A CD is a time-deposit product in which money is committed for a specified term in exchange for a stated or otherwise defined return. The exact rate, compounding method and withdrawal rules depend on the product.",
  },
  {
    question: "What is the difference between APR and APY on a CD?",
    answer:
      "APY reflects the effective annual yield after compounding. A nominal interest rate does not by itself include the full effect of intra-year compounding.",
  },
  {
    question: "What happens when a CD reaches its maturity date?",
    answer:
      "At maturity, the principal and earned interest can generally be withdrawn or handled according to the account's renewal instructions. Exact maturity and grace-period rules depend on the institution and CD contract.",
  },
  {
    question: "How does a CD ladder work and why is it beneficial?",
    answer:
      "A CD ladder distributes money among CDs with different maturity dates. This can create recurring liquidity opportunities while allowing part of the capital to remain in longer-term products.",
  },
  {
    question: "How is the early-withdrawal penalty calculated if I cash out early?",
    answer:
      "The penalty depends on the CD contract. The calculator uses the selected penalty assumption to estimate accrued interest, penalty cost and net early payout.",
  },
  {
    question: "Is CD interest taxable every year even if I don't withdraw it?",
    answer:
      "Interest from taxable CD accounts can be subject to tax under applicable rules, and certain interest may be reportable before maturity. The calculator's tax input is an illustrative assumption rather than a personal tax determination.",
  },
  {
    question: "Are CDs safer than stock market index funds or bonds?",
    answer:
      "CDs have different risk and return characteristics from stocks and bonds. Safety depends on product type, issuer, deposit protection eligibility and other factors, while the calculator focuses on modeled CD cash flows.",
  },
  {
    question: "Can I add more money to an existing CD after opening it?",
    answer:
      "Many standard CDs do not allow additional deposits after opening, but some specialized products may. The actual CD agreement controls.",
  },
  {
    question: "Is it better to choose a higher APY or a longer term?",
    answer:
      "Not necessarily. A higher APY can increase projected earnings, while a longer term can improve rate certainty but reduce liquidity. The better choice depends on rates, cash needs and expected holding period.",
  },
  {
    question: "What is a no-penalty CD and how does its APY compare?",
    answer:
      "A no-penalty CD generally offers more flexible withdrawals after applicable conditions are met, but its APY may be lower than a standard fixed CD. The calculator can quantify that trade-off under selected assumptions.",
  },
  {
    question: "How do I calculate how much I need to deposit today to reach a CD goal?",
    answer:
      "The maturity-goal solver works backward from the target balance, APY and term to estimate the starting principal required today under the calculator's growth assumptions.",
  },
  {
    question: "Is a CD always better than a high-yield savings account?",
    answer:
      "No. A CD may offer a fixed rate for a defined term, while a HYSA can provide greater liquidity and may benefit if future rates remain high. The better result depends on the selected assumptions and the depositor's liquidity needs.",
  },
];

export default cdFaqs;
