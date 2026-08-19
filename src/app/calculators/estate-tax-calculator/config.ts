import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculateFederalEstateTax } from "./calculator";
import { EstateTaxCalculator } from "@/components/calculator/estate-tax/EstateTaxCalculator";
import { EstateTaxContent } from "@/components/calculator/estate-tax/EstateTaxContent";

export const estate_tax_calculatorConfig: CalculatorModuleDefinition = {
  id: "estate-tax-calculator",
  title: "Estate Tax Calculator — Federal & State Death Tax Estimator",
  slug: "estate-tax-calculator",
  category: "Finance",
  subcategory: "Tax and Salary",
  description:
    "Calculate your federal estate tax liability, state death taxes, portability (DSUE) election, and wealth transfer to heirs with our comprehensive estate planning tool.",
  iconName: "Landmark",
  featured: true,
  keywords: [
    "estate tax calculator",
    "federal estate tax calculator",
    "death tax calculator",
    "inheritance tax calculator",
    "estate tax exemption limit",
    "gift and estate tax calculator",
    "portability dsue calculator",
    "state estate tax calculator",
    "how much is estate tax",
    "generation skipping transfer tax calculator",
    "step up in basis calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "income-tax-calculator",
    "marriage-tax-calculator",
    "salary-calculator",
    "capital-gains-tax-calculator",
    "401k-calculator",
    "ira-calculator",
    "future-value-calculator",
  ],
  formulaDescription:
    "Net Federal Estate Tax = ProgressiveTax(Tentative Tax Base) - Unified Credit",
  inputs: [
    {
      name: "grossEstate",
      label: "Total Gross Estate Assets ($)",
      type: "currency",
      defaultValue: 16000000,
      min: 0,
      max: 1000000000,
    },
    {
      name: "debtsAndCharity",
      label: "Total Debts & Deductions ($)",
      type: "currency",
      defaultValue: 1000000,
      min: 0,
      max: 1000000000,
    },
  ],
  outputs: [
    {
      name: "netFederalEstateTax",
      label: "Estimated Federal Estate Tax",
      type: "currency",
    },
    {
      name: "effectiveTaxRate",
      label: "Effective Tax Rate (%)",
      type: "percentage",
    },
    {
      name: "netToHeirs",
      label: "Net Wealth Transferred to Heirs",
      type: "currency",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const gross = Number(inputs.grossEstate) || 16000000;
    const deductions = Number(inputs.debtsAndCharity) || 1000000;

    const res = calculateFederalEstateTax({
      taxYear: "2024",
      filingStatus: "single",
      assets: {
        realEstate: gross,
        stocksAndInvestments: 0,
        cashAndBankAccounts: 0,
        retirementAccounts: 0,
        businessEquity: 0,
        lifeInsuranceBenefit: 0,
        vehiclesAndPersonalProperty: 0,
      },
      deductions: {
        debtsAndMortgages: deductions * 0.5,
        funeralAndAdminExpenses: 0,
        maritalDeduction: 0,
        charitableBequests: deductions * 0.5,
        priorTaxableGifts: 0,
        deceasedSpousalUnusedExemption: 0,
      },
    });

    return {
      netFederalEstateTax: `$${res.netFederalEstateTax.toLocaleString()}`,
      effectiveTaxRate: `${res.effectiveTaxRatePercent}%`,
      netToHeirs: `$${res.netWealthTransferredToHeirs.toLocaleString()}`,
    };
  },
  CustomComponent: EstateTaxCalculator,
  ContentComponent: EstateTaxContent,
};

export default estate_tax_calculatorConfig;
