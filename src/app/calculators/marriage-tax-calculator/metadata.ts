import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const marriage_tax_calculatorMetadata: Metadata = {
  ...generateCalculatorMetadata({
    title: "Marriage Tax Calculator: Calculate Marriage Penalty or Bonus",
    description:
      "Calculate your marriage tax penalty or bonus instantly. Compare Single, Married Filing Jointly, and Married Filing Separately with our free, comprehensive tax tool.",
    slug: "marriage-tax-calculator",
  }),
  keywords: [
    "marriage tax calculator",
    "marriage tax penalty calculator",
    "marriage tax bonus calculator",
    "married filing jointly vs separately calculator",
    "marriage penalty vs bonus",
    "do married couples pay more taxes",
    "marriage tax bracket calculator",
    "married tax deductions",
    "salt cap marriage penalty",
    "niit marriage penalty",
  ],
  openGraph: {
    title: "Marriage Tax Calculator: Calculate Marriage Penalty or Bonus",
    description:
      "Calculate your marriage tax penalty or bonus instantly. Compare Single, Married Filing Jointly, and Married Filing Separately.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marriage Tax Calculator: Calculate Marriage Penalty or Bonus",
    description:
      "Calculate your marriage tax penalty or bonus instantly. Compare Single, Married Filing Jointly, and Married Filing Separately.",
  },
};
