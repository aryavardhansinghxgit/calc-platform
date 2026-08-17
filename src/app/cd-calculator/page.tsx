import { Metadata } from "next";
import CdCalculatorPage, { metadata as baseMetadata } from "../calculators/cd-calculator/page";

export const metadata: Metadata = baseMetadata;

export default function RootCdCalculatorPage() {
  return <CdCalculatorPage />;
}
