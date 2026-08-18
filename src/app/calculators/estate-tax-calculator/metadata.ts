import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const estate_tax_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Estate Tax Calculator: Federal & State Death Tax Estimator",
    description:
      "Calculate your federal estate tax liability, state death taxes, portability (DSUE) election, and wealth transfer to heirs with our free estate tax calculator.",
    slug: "estate-tax-calculator",
  }),
  keywords: [
    "estate tax calculator",
    "federal estate tax calculator",
    "death tax calculator",
    "inheritance tax calculator",
    "estate tax exemption limit",
    "gift and estate tax calculator",
    "portability dsue calculator",
    "state estate tax calculator",
    "how much is estate tax",
    "generation skipping transfer tax calculator",
    "step up in basis calculator",
  ],
  openGraph: {
    title: "Estate Tax Calculator: Federal & State Death Tax Estimator",
    description:
      "Calculate your federal estate tax liability, state death taxes, portability (DSUE) election, and wealth transfer to heirs.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Estate Tax Calculator: Federal & State Death Tax Estimator",
    description:
      "Calculate your federal estate tax liability, state death taxes, portability (DSUE) election, and wealth transfer to heirs.",
  },
};
