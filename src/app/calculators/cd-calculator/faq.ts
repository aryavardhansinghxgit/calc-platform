import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const cdFaqs: CalculatorFAQ[] = [
  {
    question: "How does a Certificate of Deposit (CD) work?",
    answer:
      "A Certificate of Deposit (CD) is a low-risk time deposit account offered by banks and credit unions. You deposit a fixed sum of money for a specified period (ranging from 3 months to 5 years). In exchange for keeping your money untouched until maturity, the institution pays a guaranteed, fixed interest rate that is usually higher than standard savings rates.",
  },
  {
    question: "What is the difference between APR and APY on a CD?",
    answer:
      "APR (Annual Percentage Rate) is the simple annual interest rate without taking intra-year compounding into account. APY (Annual Percentage Yield) reflects the true effective annual rate of return, including the compounding frequency (daily, monthly, or quarterly). Banks advertise APY because compounding causes your actual dollar earnings to exceed the simple APR.",
  },
  {
    question: "What happens when a CD reaches its maturity date?",
    answer:
      "When a CD matures, the bank opens a 7-to-10 day 'grace period.' During this window, you can withdraw your principal plus earned interest, transfer the funds to another account, or roll the balance into a new CD term. If you take no action, most financial institutions automatically renew the CD for the same term length at the current prevailing interest rate.",
  },
  {
    question: "How does a CD ladder work and why is it beneficial?",
    answer:
      "A CD ladder is a fixed-income strategy where you divide your total investment capital into equal tranches across varying maturities (e.g., 1-year, 2-year, 3-year, 4-year, and 5-year CDs). As each CD matures every year, you gain liquidity or reinvest the funds into a top-tier 5-year CD. This captures higher long-term yields while ensuring annual liquidity access.",
  },
  {
    question: "How is the early withdrawal penalty calculated if I cash out early?",
    answer:
      "If you withdraw principal before the CD maturity date, banks charge an early withdrawal penalty equal to a set number of days of simple interest (e.g., 90 days of interest for terms up to 12 months, or 180 days of interest for terms from 1 to 3 years). If you exit early enough, the penalty can exceed earned interest and erode a small portion of your initial principal.",
  },
  {
    question: "Is CD interest taxable every year even if I don't withdraw it?",
    answer:
      "Yes. Interest earned on CDs in standard taxable accounts is subject to federal and state income taxes in the year it is credited by the bank, even if the CD has not matured and interest remains locked inside the account (often called 'Phantom Income'). The bank issues a Form 1099-INT annually reporting your taxable interest.",
  },
  {
    question: "Are CDs safer than stock market index funds and bonds?",
    answer:
      "CDs are significantly safer than stocks and corporate bonds because they offer guaranteed principal protection backed by federal insurance. Deposits at banks are insured by the FDIC up to $250,000 per depositor, per institution, and credit union CDs are insured by the NCUA up to the same limit.",
  },
  {
    question: "What is a No-Penalty CD and how does its APY compare to standard CDs?",
    answer:
      "A No-Penalty (or Liquid) CD allows you to withdraw your full principal and earned interest anytime after the initial 7 days without incurring early withdrawal fees. In exchange for this liquidity, No-Penalty CDs usually offer a slightly lower APY (typically 0.20% to 0.40% less) than fixed standard CDs.",
  },
  {
    question: "Can I add more money to an existing CD after opening it?",
    answer:
      "Generally, no. Standard fixed-rate CDs only accept a single lump-sum initial deposit at account opening. However, some banks offer specialty 'Add-On CDs' that permit additional periodic contributions during the term.",
  },
  {
    question: "Is it better to choose a CD or a High-Yield Savings Account (HYSA) when interest rates are dropping?",
    answer:
      "When central banks are expected to cut interest rates, a CD is generally superior because it locks in your high APY for the full term. In contrast, HYSA interest rates are variable and drop automatically whenever market rates decline, reducing your ongoing yield.",
  },
];

export default cdFaqs;
