import { Metadata } from "next";
import CashBackCalculatorPage, { metadata as baseMetadata } from "../calculators/cash-back-or-low-interest-calculator/page";

export const metadata: Metadata = baseMetadata;

export default function RootCashBackCalculatorPage() {
  return <CashBackCalculatorPage />;
}
