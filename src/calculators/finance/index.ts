import { CalculatorModuleDefinition } from "../types";

// 1. Mortgage & House
import { MORTGAGE_CALCULATOR } from "./mortgage";
import { HOME_EQUITY_LOAN_CALCULATOR } from "./home-equity";
import { VA_MORTGAGE_CALCULATOR } from "./va";
import { FHA_LOAN_CALCULATOR } from "./fha";
import { APR_CALCULATOR } from "./apr";
import { RENTAL_PROPERTY_CALCULATOR } from "./rental-property";
import { DTI_CALCULATOR } from "./dti";
import { RENT_CALCULATOR } from "./rent";
import { LOAN_CALCULATOR } from "./loan";
import { EMI_CALCULATOR } from "./emi";
import { AMORTIZATION_CALCULATOR } from "./amortization";
import { MORTGAGE_PAYOFF_CALCULATOR } from "./mortgage-payoff";
import { HOUSE_AFFORDABILITY_CALCULATOR } from "./house-affordability";
import { REFINANCE_CALCULATOR } from "./refinance";

// 2. Auto
import { AUTO_LOAN_CALCULATOR } from "./auto-loan";
import { AUTO_LEASE_CALCULATOR } from "./auto-lease";

// 3. Investment
import { COMPOUND_INTEREST_CALCULATOR } from "./compound-interest";
import { INTEREST_CALCULATOR } from "./interest";
import { SIMPLE_INTEREST_CALCULATOR } from "./simple-interest";
import { INVESTMENT_CALCULATOR } from "./investment";
import { SAVINGS_CALCULATOR } from "./savings";
import { SIP_CALCULATOR } from "./sip";
import { FD_CALCULATOR } from "./fd";
import { RD_CALCULATOR } from "./rd";
import { CAGR_CALCULATOR } from "./cagr";
import { ROI_CALCULATOR } from "./roi";
import { FUTURE_VALUE_CALCULATOR } from "./future-value";
import { PRESENT_VALUE_CALCULATOR } from "./present-value";

// 4. Taxes
import { INCOME_TAX_CALCULATOR } from "./income-tax";
import { GST_CALCULATOR } from "./gst";
import { VAT_CALCULATOR } from "./vat";
import { SALES_TAX_CALCULATOR } from "./sales-tax";

// 5. Credit & Debt
import { CREDIT_CARD_CALCULATOR } from "./credit-card";
import { CREDIT_CARD_PAYOFF_CALCULATOR } from "./credit-card-payoff";
import { DEBT_PAYOFF_CALCULATOR } from "./debt-payoff";
import { DEBT_CONSOLIDATION_CALCULATOR } from "./debt-consolidation";

// 6. Retirement
import { RETIREMENT_CALCULATOR } from "./retirement";
import { FOUR_OH_ONE_K_CALCULATOR } from "./401k";
import { TRADITIONAL_IRA_CALCULATOR } from "./traditional-ira";
import { ROTH_IRA_CALCULATOR } from "./roth-ira";
import { RMD_CALCULATOR } from "./rmd";
import { PENSION_CALCULATOR } from "./pension";
import { SOCIAL_SECURITY_CALCULATOR } from "./social-security";
import { ANNUITY_CALCULATOR } from "./annuity";
import { ANNUITY_PAYOUT_CALCULATOR } from "./annuity-payout";

// 7. Business
import { MARGIN_CALCULATOR } from "./margin";
import { DISCOUNT_CALCULATOR } from "./discount";
import { COMMISSION_CALCULATOR } from "./commission";

// 8. Personal
import { PERSONAL_LOAN_CALCULATOR } from "./personal-loan";
import { BUSINESS_LOAN_CALCULATOR } from "./business-loan";
import { STUDENT_LOAN_CALCULATOR } from "./student-loan";
import { BUDGET_CALCULATOR } from "./budget";

export const FINANCE_CALCULATORS: CalculatorModuleDefinition[] = [
  // Mortgage & House
  MORTGAGE_CALCULATOR,
  HOME_EQUITY_LOAN_CALCULATOR,
  VA_MORTGAGE_CALCULATOR,
  FHA_LOAN_CALCULATOR,
  APR_CALCULATOR,
  RENTAL_PROPERTY_CALCULATOR,
  DTI_CALCULATOR,
  RENT_CALCULATOR,
  LOAN_CALCULATOR,
  EMI_CALCULATOR,
  AMORTIZATION_CALCULATOR,
  MORTGAGE_PAYOFF_CALCULATOR,
  HOUSE_AFFORDABILITY_CALCULATOR,
  REFINANCE_CALCULATOR,

  // Auto
  AUTO_LOAN_CALCULATOR,
  AUTO_LEASE_CALCULATOR,

  // Investment
  COMPOUND_INTEREST_CALCULATOR,
  INTEREST_CALCULATOR,
  SIMPLE_INTEREST_CALCULATOR,
  INVESTMENT_CALCULATOR,
  SAVINGS_CALCULATOR,
  SIP_CALCULATOR,
  FD_CALCULATOR,
  RD_CALCULATOR,
  CAGR_CALCULATOR,
  ROI_CALCULATOR,
  FUTURE_VALUE_CALCULATOR,
  PRESENT_VALUE_CALCULATOR,

  // Taxes
  INCOME_TAX_CALCULATOR,
  GST_CALCULATOR,
  VAT_CALCULATOR,
  SALES_TAX_CALCULATOR,

  // Credit & Debt
  CREDIT_CARD_CALCULATOR,
  CREDIT_CARD_PAYOFF_CALCULATOR,
  DEBT_PAYOFF_CALCULATOR,
  DEBT_CONSOLIDATION_CALCULATOR,

  // Retirement
  RETIREMENT_CALCULATOR,
  FOUR_OH_ONE_K_CALCULATOR,
  TRADITIONAL_IRA_CALCULATOR,
  ROTH_IRA_CALCULATOR,
  RMD_CALCULATOR,
  PENSION_CALCULATOR,
  SOCIAL_SECURITY_CALCULATOR,
  ANNUITY_CALCULATOR,
  ANNUITY_PAYOUT_CALCULATOR,

  // Business
  MARGIN_CALCULATOR,
  DISCOUNT_CALCULATOR,
  COMMISSION_CALCULATOR,

  // Personal
  PERSONAL_LOAN_CALCULATOR,
  BUSINESS_LOAN_CALCULATOR,
  STUDENT_LOAN_CALCULATOR,
  BUDGET_CALCULATOR,
];

export default FINANCE_CALCULATORS;
