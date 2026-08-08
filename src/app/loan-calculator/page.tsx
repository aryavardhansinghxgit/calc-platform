import { Metadata } from "next";
import LoanCalculatorPage, { generateMetadata as baseGenerateMetadata } from "../calculators/loan-calculator/page";

export async function generateMetadata(): Promise<Metadata> {
  return baseGenerateMetadata();
}

export default function RootLoanCalculatorPage() {
  return <LoanCalculatorPage />;
}
