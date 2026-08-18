import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const bond_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Bond Calculator — Calculate Bond Price, Yield to Maturity & Duration",
    description:
      "Advanced Fixed-Income & Bond Calculator. Calculate Clean & Dirty Bond Price, Yield to Maturity (YTM), Yield to Call (YTC/YTW), Macaulay/Modified Duration, Convexity, and Tax-Equivalent Municipal Yields.",
    slug: "bond-calculator",
  }),
  keywords: [
    "bond calculator",
    "yield to maturity calculator",
    "bond price calculator",
    "ytm calculator",
    "zero coupon bond calculator",
    "bond yield calculator",
    "macaulay duration calculator",
    "modified duration calculator",
    "convexity calculator",
    "clean price vs dirty price",
    "callable bond yield to worst calculator",
    "tax equivalent yield calculator",
    "treasury bond calculator",
    "accrued interest calculator",
  ],
  openGraph: {
    title: "Bond Calculator — Calculate Bond Price, Yield to Maturity & Duration",
    description:
      "Advanced Fixed-Income & Bond Valuation Suite. Solve Bond Price, Yield to Maturity (YTM), Yield to Call (YTW), Duration, Convexity, and Day-Count Accrued Interest.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bond Calculator — Calculate Bond Price, Yield to Maturity & Duration",
    description:
      "Advanced Fixed-Income & Bond Valuation Suite. Solve Bond Price, Yield to Maturity (YTM), Yield to Call (YTW), Duration, Convexity, and Day-Count Accrued Interest.",
  },
};
