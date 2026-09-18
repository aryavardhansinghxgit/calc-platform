import { getPercentageOverlay } from "./percentage";
import { getBmiOverlay } from "./bmi";
import { getScientificOverlay } from "./scientific";
import { getDateOverlay } from "./date";
import { getConcreteOverlay } from "./concrete";
import { getCurrencyOverlay } from "./currency";
import { getAutoLoanOverlay } from "./auto-loan";
import { getOhmsLawOverlay } from "./ohms-law";
import { getMortgageOverlay } from "./mortgage";
import { getFuelCostOverlay } from "./fuel-cost";
import { getAmortizationOverlay } from "./amortization";

export {
  getPercentageOverlay,
  getBmiOverlay,
  getScientificOverlay,
  getDateOverlay,
  getConcreteOverlay,
  getCurrencyOverlay,
  getAutoLoanOverlay,
  getOhmsLawOverlay,
  getMortgageOverlay,
  getFuelCostOverlay,
  getAmortizationOverlay,
};

export function getCalculatorOverlay(slug: string, locale: string): any {
  switch (slug) {
    case "mortgage-calculator":
      return getMortgageOverlay(locale);
    case "amortization-calculator":
      return getAmortizationOverlay(locale);
    case "percentage-calculator":
      return getPercentageOverlay(locale);
    case "bmi-calculator":
      return getBmiOverlay(locale);
    case "scientific-calculator":
      return getScientificOverlay(locale);
    case "date-calculator":
      return getDateOverlay(locale);
    case "concrete-calculator":
      return getConcreteOverlay(locale);
    case "currency-calculator":
      return getCurrencyOverlay(locale);
    case "auto-loan-calculator":
      return getAutoLoanOverlay(locale);
    case "ohms-law-calculator":
      return getOhmsLawOverlay(locale);
    case "fuel-cost-calculator":
      return getFuelCostOverlay(locale);
    default:
      return null;
  }
}
