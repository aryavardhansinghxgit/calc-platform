import { Metadata } from "next";

export const financeMetadata: Metadata = {
  title: "Finance Calculator — Time Value of Money (TVM) Solvers",
  description:
    "Free Finance Calculator. Solve for Future Value (FV), Present Value (PV), Periodic Payment (PMT), Interest Rate (I/Y), and Term (N). Features compound interest visualizers, inflation drag, and post-tax net returns.",
  keywords: [
    "finance calculator",
    "TVM calculator",
    "time value of money formula",
    "compound interest calculator",
    "future value formula",
    "present value calculations",
    "ordinary annuity vs annuity due",
    "nominal vs real return rate",
    "continuous compounding calculator"
  ],
  authors: [{ name: "Calculator Platform Financial Engineering Team" }],
  openGraph: {
    title: "Finance Calculator — Advanced Time Value of Money (TVM) Suite",
    description:
      "Calculate compound interest, periodic savings, present value, and loan payments with interactive charts and schedule tables.",
    type: "website",
    url: "https://calculator-platform.com/calculators/finance-calculator",
  },
  alternates: {
    canonical: "https://calculator-platform.com/calculators/finance-calculator",
  },
};
