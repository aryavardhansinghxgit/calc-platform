import { Metadata } from "next";
import FinanceCalculatorPage, { metadata as baseMetadata } from "../calculators/finance-calculator/page";

export const metadata: Metadata = baseMetadata;

export default function RootFinanceCalculatorPage() {
  return <FinanceCalculatorPage />;
}
