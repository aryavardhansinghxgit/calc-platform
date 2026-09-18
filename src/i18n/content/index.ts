import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

// Percentage
import { SPANISH_PERCENTAGE_SEO, SPANISH_PERCENTAGE_FAQS, SpanishPercentageContent } from "./percentage/es";
import { FRENCH_PERCENTAGE_SEO, FRENCH_PERCENTAGE_FAQS, FrenchPercentageContent } from "./percentage/fr";
import { GERMAN_PERCENTAGE_SEO, GERMAN_PERCENTAGE_FAQS, GermanPercentageContent } from "./percentage/de";
import { HINDI_PERCENTAGE_SEO, HINDI_PERCENTAGE_FAQS, HindiPercentageContent } from "./percentage/hi";
import { PORTUGUESE_PERCENTAGE_SEO, PORTUGUESE_PERCENTAGE_FAQS, PortuguesePercentageContent } from "./percentage/pt";

// BMI
import { SPANISH_BMI_SEO, SPANISH_BMI_FAQS, SpanishBmiContent } from "./bmi/es";
import { FRENCH_BMI_SEO, FRENCH_BMI_FAQS, FrenchBmiContent } from "./bmi/fr";
import { GERMAN_BMI_SEO, GERMAN_BMI_FAQS, GermanBmiContent } from "./bmi/de";
import { HINDI_BMI_SEO, HINDI_BMI_FAQS, HindiBmiContent } from "./bmi/hi";
import { PORTUGUESE_BMI_SEO, PORTUGUESE_BMI_FAQS, PortugueseBmiContent } from "./bmi/pt";

// Scientific
import { SPANISH_SCIENTIFIC_SEO, SPANISH_SCIENTIFIC_FAQS, SpanishScientificContent } from "./scientific/es";
import { FRENCH_SCIENTIFIC_SEO, FRENCH_SCIENTIFIC_FAQS, FrenchScientificContent } from "./scientific/fr";
import { GERMAN_SCIENTIFIC_SEO, GERMAN_SCIENTIFIC_FAQS, GermanScientificContent } from "./scientific/de";
import { HINDI_SCIENTIFIC_SEO, HINDI_SCIENTIFIC_FAQS, HindiScientificContent } from "./scientific/hi";
import { PORTUGUESE_SCIENTIFIC_SEO, PORTUGUESE_SCIENTIFIC_FAQS, PortugueseScientificContent } from "./scientific/pt";

// Date
import { ES_DATE_SEO, ES_DATE_FAQS, EsDateContent } from "./date/es";
import { FR_DATE_SEO, FR_DATE_FAQS, FrDateContent } from "./date/fr";
import { DE_DATE_SEO, DE_DATE_FAQS, DeDateContent } from "./date/de";
import { HI_DATE_SEO, HI_DATE_FAQS, HiDateContent } from "./date/hi";
import { PT_DATE_SEO, PT_DATE_FAQS, PtDateContent } from "./date/pt";

// Concrete
import { ES_CONCRETE_SEO, ES_CONCRETE_FAQS, EsConcreteContent } from "./concrete/es";
import { FR_CONCRETE_SEO, FR_CONCRETE_FAQS, FrConcreteContent } from "./concrete/fr";
import { DE_CONCRETE_SEO, DE_CONCRETE_FAQS, DeConcreteContent } from "./concrete/de";
import { HI_CONCRETE_SEO, HI_CONCRETE_FAQS, HiConcreteContent } from "./concrete/hi";
import { PT_CONCRETE_SEO, PT_CONCRETE_FAQS, PtConcreteContent } from "./concrete/pt";

// Currency
import { ES_CURRENCY_SEO, ES_CURRENCY_FAQS, EsCurrencyContent } from "./currency/es";
import { FR_CURRENCY_SEO, FR_CURRENCY_FAQS, FrCurrencyContent } from "./currency/fr";
import { DE_CURRENCY_SEO, DE_CURRENCY_FAQS, DeCurrencyContent } from "./currency/de";
import { HI_CURRENCY_SEO, HI_CURRENCY_FAQS, HiCurrencyContent } from "./currency/hi";
import { PT_CURRENCY_SEO, PT_CURRENCY_FAQS, PtCurrencyContent } from "./currency/pt";

// Auto Loan
import { ES_AUTO_LOAN_SEO, ES_AUTO_LOAN_FAQS, EsAutoLoanContent } from "./auto-loan/es";
import { FR_AUTO_LOAN_SEO, FR_AUTO_LOAN_FAQS, FrAutoLoanContent } from "./auto-loan/fr";
import { DE_AUTO_LOAN_SEO, DE_AUTO_LOAN_FAQS, DeAutoLoanContent } from "./auto-loan/de";
import { HI_AUTO_LOAN_SEO, HI_AUTO_LOAN_FAQS, HiAutoLoanContent } from "./auto-loan/hi";
import { PT_AUTO_LOAN_SEO, PT_AUTO_LOAN_FAQS, PtAutoLoanContent } from "./auto-loan/pt";

// Ohms Law
import { ES_OHMS_LAW_SEO, ES_OHMS_LAW_FAQS, EsOhmsLawContent } from "./ohms-law/es";
import { FR_OHMS_LAW_SEO, FR_OHMS_LAW_FAQS, FrOhmsLawContent } from "./ohms-law/fr";
import { DE_OHMS_LAW_SEO, DE_OHMS_LAW_FAQS, DeOhmsLawContent } from "./ohms-law/de";
import { HI_OHMS_LAW_SEO, HI_OHMS_LAW_FAQS, HiOhmsLawContent } from "./ohms-law/hi";
import { PT_OHMS_LAW_SEO, PT_OHMS_LAW_FAQS, PtOhmsLawContent } from "./ohms-law/pt";

// Mortgage
import { SPANISH_MORTGAGE_SEO, SPANISH_MORTGAGE_FAQS } from "./mortgage/es";
import { MortgageContentSectionEs } from "@/components/calculator/mortgage/MortgageContentSectionEs";
import { FRENCH_MORTGAGE_SEO, FRENCH_MORTGAGE_FAQS, FrenchMortgageContent } from "./mortgage/fr";
import { GERMAN_MORTGAGE_SEO, GERMAN_MORTGAGE_FAQS, GermanMortgageContent } from "./mortgage/de";
import { HINDI_MORTGAGE_SEO, HINDI_MORTGAGE_FAQS, HindiMortgageContent } from "./mortgage/hi";
import { PORTUGUESE_MORTGAGE_SEO, PORTUGUESE_MORTGAGE_FAQS, PortugueseMortgageContent } from "./mortgage/pt";

// Amortization
import { SPANISH_AMORTIZATION_SEO, SPANISH_AMORTIZATION_FAQS, SpanishAmortizationContent } from "./amortization/es";
import { FRENCH_AMORTIZATION_SEO, FRENCH_AMORTIZATION_FAQS, FrenchAmortizationContent } from "./amortization/fr";
import { GERMAN_AMORTIZATION_SEO, GERMAN_AMORTIZATION_FAQS, GermanAmortizationContent } from "./amortization/de";
import { HINDI_AMORTIZATION_SEO, HINDI_AMORTIZATION_FAQS, HindiAmortizationContent } from "./amortization/hi";
import { PORTUGUESE_AMORTIZATION_SEO, PORTUGUESE_AMORTIZATION_FAQS, PortugueseAmortizationContent } from "./amortization/pt";

// Fuel Cost
import { SPANISH_FUEL_COST_SEO, SPANISH_FUEL_COST_FAQS, SpanishFuelCostContent } from "./fuel-cost/es";

export interface LocalizedCalculatorContentPack {
  seo: {
    title: string;
    description: string;
    keywords?: string[];
  };
  faqs: CalculatorFAQ[];
  ContentComponent: React.ComponentType<any>;
}

export const LOCALIZED_CONTENT_REGISTRY: Record<string, Record<string, LocalizedCalculatorContentPack>> = {
  "amortization-calculator": {
    es: { seo: SPANISH_AMORTIZATION_SEO, faqs: SPANISH_AMORTIZATION_FAQS, ContentComponent: SpanishAmortizationContent },
    fr: { seo: FRENCH_AMORTIZATION_SEO, faqs: FRENCH_AMORTIZATION_FAQS, ContentComponent: FrenchAmortizationContent },
    de: { seo: GERMAN_AMORTIZATION_SEO, faqs: GERMAN_AMORTIZATION_FAQS, ContentComponent: GermanAmortizationContent },
    hi: { seo: HINDI_AMORTIZATION_SEO, faqs: HINDI_AMORTIZATION_FAQS, ContentComponent: HindiAmortizationContent },
    pt: { seo: PORTUGUESE_AMORTIZATION_SEO, faqs: PORTUGUESE_AMORTIZATION_FAQS, ContentComponent: PortugueseAmortizationContent },
  },
  "percentage-calculator": {
    es: { seo: SPANISH_PERCENTAGE_SEO, faqs: SPANISH_PERCENTAGE_FAQS, ContentComponent: SpanishPercentageContent },
    fr: { seo: FRENCH_PERCENTAGE_SEO, faqs: FRENCH_PERCENTAGE_FAQS, ContentComponent: FrenchPercentageContent },
    de: { seo: GERMAN_PERCENTAGE_SEO, faqs: GERMAN_PERCENTAGE_FAQS, ContentComponent: GermanPercentageContent },
    hi: { seo: HINDI_PERCENTAGE_SEO, faqs: HINDI_PERCENTAGE_FAQS, ContentComponent: HindiPercentageContent },
    pt: { seo: PORTUGUESE_PERCENTAGE_SEO, faqs: PORTUGUESE_PERCENTAGE_FAQS, ContentComponent: PortuguesePercentageContent },
  },
  "bmi-calculator": {
    es: { seo: SPANISH_BMI_SEO, faqs: SPANISH_BMI_FAQS, ContentComponent: SpanishBmiContent },
    fr: { seo: FRENCH_BMI_SEO, faqs: FRENCH_BMI_FAQS, ContentComponent: FrenchBmiContent },
    de: { seo: GERMAN_BMI_SEO, faqs: GERMAN_BMI_FAQS, ContentComponent: GermanBmiContent },
    hi: { seo: HINDI_BMI_SEO, faqs: HINDI_BMI_FAQS, ContentComponent: HindiBmiContent },
    pt: { seo: PORTUGUESE_BMI_SEO, faqs: PORTUGUESE_BMI_FAQS, ContentComponent: PortugueseBmiContent },
  },
  "scientific-calculator": {
    es: { seo: SPANISH_SCIENTIFIC_SEO, faqs: SPANISH_SCIENTIFIC_FAQS, ContentComponent: SpanishScientificContent },
    fr: { seo: FRENCH_SCIENTIFIC_SEO, faqs: FRENCH_SCIENTIFIC_FAQS, ContentComponent: FrenchScientificContent },
    de: { seo: GERMAN_SCIENTIFIC_SEO, faqs: GERMAN_SCIENTIFIC_FAQS, ContentComponent: GermanScientificContent },
    hi: { seo: HINDI_SCIENTIFIC_SEO, faqs: HINDI_SCIENTIFIC_FAQS, ContentComponent: HindiScientificContent },
    pt: { seo: PORTUGUESE_SCIENTIFIC_SEO, faqs: PORTUGUESE_SCIENTIFIC_FAQS, ContentComponent: PortugueseScientificContent },
  },
  "date-calculator": {
    es: { seo: ES_DATE_SEO, faqs: ES_DATE_FAQS, ContentComponent: EsDateContent },
    fr: { seo: FR_DATE_SEO, faqs: FR_DATE_FAQS, ContentComponent: FrDateContent },
    de: { seo: DE_DATE_SEO, faqs: DE_DATE_FAQS, ContentComponent: DeDateContent },
    hi: { seo: HI_DATE_SEO, faqs: HI_DATE_FAQS, ContentComponent: HiDateContent },
    pt: { seo: PT_DATE_SEO, faqs: PT_DATE_FAQS, ContentComponent: PtDateContent },
  },
  "concrete-calculator": {
    es: { seo: ES_CONCRETE_SEO, faqs: ES_CONCRETE_FAQS, ContentComponent: EsConcreteContent },
    fr: { seo: FR_CONCRETE_SEO, faqs: FR_CONCRETE_FAQS, ContentComponent: FrConcreteContent },
    de: { seo: DE_CONCRETE_SEO, faqs: DE_CONCRETE_FAQS, ContentComponent: DeConcreteContent },
    hi: { seo: HI_CONCRETE_SEO, faqs: HI_CONCRETE_FAQS, ContentComponent: HiConcreteContent },
    pt: { seo: PT_CONCRETE_SEO, faqs: PT_CONCRETE_FAQS, ContentComponent: PtConcreteContent },
  },
  "currency-calculator": {
    es: { seo: ES_CURRENCY_SEO, faqs: ES_CURRENCY_FAQS, ContentComponent: EsCurrencyContent },
    fr: { seo: FR_CURRENCY_SEO, faqs: FR_CURRENCY_FAQS, ContentComponent: FrCurrencyContent },
    de: { seo: DE_CURRENCY_SEO, faqs: DE_CURRENCY_FAQS, ContentComponent: DeCurrencyContent },
    hi: { seo: HI_CURRENCY_SEO, faqs: HI_CURRENCY_FAQS, ContentComponent: HiCurrencyContent },
    pt: { seo: PT_CURRENCY_SEO, faqs: PT_CURRENCY_FAQS, ContentComponent: PtCurrencyContent },
  },
  "auto-loan-calculator": {
    es: { seo: ES_AUTO_LOAN_SEO, faqs: ES_AUTO_LOAN_FAQS, ContentComponent: EsAutoLoanContent },
    fr: { seo: FR_AUTO_LOAN_SEO, faqs: FR_AUTO_LOAN_FAQS, ContentComponent: FrAutoLoanContent },
    de: { seo: DE_AUTO_LOAN_SEO, faqs: DE_AUTO_LOAN_FAQS, ContentComponent: DeAutoLoanContent },
    hi: { seo: HI_AUTO_LOAN_SEO, faqs: HI_AUTO_LOAN_FAQS, ContentComponent: HiAutoLoanContent },
    pt: { seo: PT_AUTO_LOAN_SEO, faqs: PT_AUTO_LOAN_FAQS, ContentComponent: PtAutoLoanContent },
  },
  "ohms-law-calculator": {
    es: { seo: ES_OHMS_LAW_SEO, faqs: ES_OHMS_LAW_FAQS, ContentComponent: EsOhmsLawContent },
    fr: { seo: FR_OHMS_LAW_SEO, faqs: FR_OHMS_LAW_FAQS, ContentComponent: FrOhmsLawContent },
    de: { seo: DE_OHMS_LAW_SEO, faqs: DE_OHMS_LAW_FAQS, ContentComponent: DeOhmsLawContent },
    hi: { seo: HI_OHMS_LAW_SEO, faqs: HI_OHMS_LAW_FAQS, ContentComponent: HiOhmsLawContent },
    pt: { seo: PT_OHMS_LAW_SEO, faqs: PT_OHMS_LAW_FAQS, ContentComponent: PtOhmsLawContent },
  },
  "mortgage-calculator": {
    es: { seo: SPANISH_MORTGAGE_SEO, faqs: SPANISH_MORTGAGE_FAQS, ContentComponent: MortgageContentSectionEs },
    fr: { seo: FRENCH_MORTGAGE_SEO, faqs: FRENCH_MORTGAGE_FAQS, ContentComponent: FrenchMortgageContent },
    de: { seo: GERMAN_MORTGAGE_SEO, faqs: GERMAN_MORTGAGE_FAQS, ContentComponent: GermanMortgageContent },
    hi: { seo: HINDI_MORTGAGE_SEO, faqs: HINDI_MORTGAGE_FAQS, ContentComponent: HindiMortgageContent },
    pt: { seo: PORTUGUESE_MORTGAGE_SEO, faqs: PORTUGUESE_MORTGAGE_FAQS, ContentComponent: PortugueseMortgageContent },
  },
  "fuel-cost-calculator": {
    es: { seo: SPANISH_FUEL_COST_SEO, faqs: SPANISH_FUEL_COST_FAQS, ContentComponent: SpanishFuelCostContent },
  },
};

export function getCalculatorLocalizedContent(slug: string, locale: string): LocalizedCalculatorContentPack | null {
  return LOCALIZED_CONTENT_REGISTRY[slug]?.[locale] || null;
}
