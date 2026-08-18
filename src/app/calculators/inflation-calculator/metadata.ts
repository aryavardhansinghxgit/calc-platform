import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const inflation_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Inflation Calculator: CPI Purchasing Power (1913–Present)",
    description:
      "Calculate historical purchasing power using official US BLS CPI-U data from 1913 to present. Project future inflation decay and real investment returns.",
    slug: "inflation-calculator",
  }),
  keywords: [
    "inflation calculator",
    "cpi inflation calculator",
    "purchasing power calculator",
    "us inflation calculator 1913 to present",
    "future value inflation calculator",
    "historical inflation calculator",
    "calculate inflation rate",
    "real value of dollar calculator",
    "cost of living inflation calculator",
    "cumulative inflation rate calculator",
  ],
  openGraph: {
    title: "Inflation Calculator: CPI Purchasing Power (1913–Present)",
    description:
      "Calculate historical purchasing power using official US BLS CPI-U data from 1913 to present. Project future inflation decay and real investment returns.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inflation Calculator: CPI Purchasing Power (1913–Present)",
    description:
      "Calculate historical purchasing power using official US BLS CPI-U data from 1913 to present. Project future inflation decay and real investment returns.",
  },
};
