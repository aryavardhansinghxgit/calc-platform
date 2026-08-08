import { Metadata } from "next";
import RefinancePage, { generateMetadata as generateCalcMetadata } from "../calculators/refinance-calculator/page";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalcMetadata();
}

export default RefinancePage;
