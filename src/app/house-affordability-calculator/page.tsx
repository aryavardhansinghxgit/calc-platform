import { Metadata } from "next";
import HouseAffordabilityPage, { generateMetadata as generateCalcMetadata } from "../calculators/house-affordability-calculator/page";

export async function generateMetadata(): Promise<Metadata> {
  return generateCalcMetadata();
}

export default HouseAffordabilityPage;
