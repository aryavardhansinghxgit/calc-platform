import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const payment_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Payment Calculator — Monthly Loan Payment, Amortization & Payoff",
    description:
      "Calculate monthly loan payments, total interest, amortization schedules, payoff time, affordable borrowing, biweekly savings, extra-payment savings and fee-adjusted borrowing costs.",
    slug: "payment-calculator",
  }),
  keywords: [
    "Payment Calculator",
    "loan payment calculator",
    "monthly payment calculator",
    "installment loan calculator",
    "loan amortization calculator",
    "payment schedule calculator",
    "loan payment formula",
    "how to calculate monthly loan payment",
    "loan affordability calculator",
    "maximum loan calculator",
    "extra payment loan calculator",
    "biweekly payment calculator",
    "loan payoff calculator",
  ],
  openGraph: {
    title: "Payment Calculator — Monthly Loan Payment, Amortization & Payoff",
    description:
      "Calculate monthly loan payments, total interest, amortization schedules, payoff time, affordable borrowing, biweekly savings, extra-payment savings and fee-adjusted borrowing costs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Payment Calculator — Monthly Loan Payment, Amortization & Payoff",
    description:
      "Calculate monthly loan payments, total interest, amortization schedules, payoff time, affordable borrowing, biweekly savings, extra-payment savings and fee-adjusted borrowing costs.",
  },
};
