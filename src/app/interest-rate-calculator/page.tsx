import { Metadata } from "next";
import InterestRateCalculatorPage, { metadata as baseMetadata } from "../calculators/interest-rate-calculator/page";

export const metadata: Metadata = baseMetadata;

export default function RootInterestRateCalculatorPage() {
  return <InterestRateCalculatorPage />;
}
