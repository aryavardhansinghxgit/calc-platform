/**
 * Gross Domestic Product (GDP) & Macroeconomic Accounting Mathematical Engine
 */

export interface ExpenditureGdpParams {
  personalConsumption: number; // C
  grossInvestment: number; // I
  governmentSpending: number; // G
  exports: number; // X
  imports: number; // M
  population?: number;
}

export interface ExpenditureGdpResult {
  totalGdp: number;
  netExports: number;
  consumptionPct: number;
  investmentPct: number;
  governmentPct: number;
  netExportsPct: number;
  gdpPerCapita: number;
}

/**
 * 1. Expenditure Approach: GDP = C + I + G + (X - M)
 */
export function calculateExpenditureGdp(params: ExpenditureGdpParams): ExpenditureGdpResult {
  const C = Math.max(0, params.personalConsumption);
  const I = Math.max(0, params.grossInvestment);
  const G = Math.max(0, params.governmentSpending);
  const X = Math.max(0, params.exports);
  const M = Math.max(0, params.imports);
  const pop = Math.max(1, params.population || 335000000);

  const netExports = X - M;
  const gdp = C + I + G + netExports;

  const base = gdp > 0 ? gdp : 1;
  const cPct = (C / base) * 100;
  const iPct = (I / base) * 100;
  const gPct = (G / base) * 100;
  const nxPct = (netExports / base) * 100;
  const perCapita = gdp / pop;

  return {
    totalGdp: gdp,
    netExports,
    consumptionPct: cPct,
    investmentPct: iPct,
    governmentPct: gPct,
    netExportsPct: nxPct,
    gdpPerCapita: perCapita,
  };
}

/**
 * 2. Resource Cost - Income Approach:
 * GNP = Employee Compensation + Proprietors' Income + Rental Income + Corporate Profits + Net Interest Income
 * GDP = GNP + Indirect Business Taxes + Depreciation + Net Income of Foreigners
 */
export interface IncomeGdpParams {
  employeeCompensation: number;
  proprietorsIncome: number;
  rentalIncome: number;
  corporateProfits: number;
  netInterestIncome: number;
  indirectTaxes: number;
  depreciation: number;
  netForeignIncome: number;
}

export interface IncomeGdpResult {
  gnp: number;
  totalGdp: number;
  nationalIncome: number;
  capitalConsumptionShare: number;
}

export function calculateIncomeGdp(params: IncomeGdpParams): IncomeGdpResult {
  const comp = Math.max(0, params.employeeCompensation);
  const prop = Math.max(0, params.proprietorsIncome);
  const rent = Math.max(0, params.rentalIncome);
  const profit = Math.max(0, params.corporateProfits);
  const interest = Math.max(0, params.netInterestIncome);

  const nationalIncome = comp + prop + rent + profit + interest;
  const gnp = nationalIncome;

  const taxes = Math.max(0, params.indirectTaxes);
  const depr = Math.max(0, params.depreciation);
  const foreign = params.netForeignIncome; // can be negative or positive

  const gdp = gnp + taxes + depr + foreign;
  const capShare = gdp > 0 ? (depr / gdp) * 100 : 0;

  return {
    gnp,
    totalGdp: gdp,
    nationalIncome,
    capitalConsumptionShare: capShare,
  };
}

/**
 * 3. Real GDP & GDP Deflator: Real GDP = (Nominal GDP / Deflator) * 100
 */
export function calculateRealGdp(
  nominalGdp: number,
  gdpDeflator: number
): {
  realGdp: number;
  inflationDragAmount: number;
  deflatorMultiplier: number;
} {
  const nom = Math.max(0, nominalGdp);
  const deflator = Math.max(1, gdpDeflator);

  const real = (nom / deflator) * 100;
  const drag = nom - real;

  return {
    realGdp: real,
    inflationDragAmount: drag,
    deflatorMultiplier: deflator / 100,
  };
}

/**
 * 4. GDP Growth Rate
 */
export function calculateGdpGrowth(
  priorGdp: number,
  currentGdp: number,
  years: number = 1
): {
  nominalGrowthPct: number;
  annualizedGrowthCagr: number;
  dollarExpansion: number;
} {
  const p = Math.max(0.01, priorGdp);
  const c = Math.max(0, currentGdp);
  const t = Math.max(1, years);

  const diff = c - p;
  const totalGrowth = (diff / p) * 100;
  const cagr = (Math.pow(c / p, 1 / t) - 1) * 100;

  return {
    nominalGrowthPct: totalGrowth,
    annualizedGrowthCagr: cagr,
    dollarExpansion: diff,
  };
}

/**
 * 5. Production (Value-Added) Approach: GVA = Gross Output - Intermediate Inputs + Net Taxes
 */
export function calculateProductionGdp(
  grossOutput: number,
  intermediateConsumption: number,
  netTaxesOnProducts: number
): {
  grossValueAdded: number;
  totalGdpContribution: number;
  valueAddedMarginPct: number;
} {
  const output = Math.max(0, grossOutput);
  const inputs = Math.max(0, intermediateConsumption);
  const taxes = Math.max(0, netTaxesOnProducts);

  const gva = Math.max(0, output - inputs);
  const total = gva + taxes;
  const margin = output > 0 ? (gva / output) * 100 : 0;

  return {
    grossValueAdded: gva,
    totalGdpContribution: total,
    valueAddedMarginPct: margin,
  };
}

/**
 * Country Benchmark Macroeconomic Presets (in Billions USD & Population Millions)
 */
export const COUNTRY_MACRO_PRESETS: Record<
  string,
  { name: string; C: number; I: number; G: number; X: number; M: number; pop: number }
> = {
  US: { name: "United States", C: 19100, I: 5100, G: 4850, X: 3150, M: 3820, pop: 335 },
  CN: { name: "China", C: 7200, I: 7800, G: 3200, X: 3600, M: 2700, pop: 1410 },
  DE: { name: "Germany", C: 2450, I: 950, G: 980, X: 2100, M: 1890, pop: 84 },
  JP: { name: "Japan", C: 2300, I: 1050, G: 890, X: 910, M: 940, pop: 125 },
  IN: { name: "India", C: 2400, I: 1250, G: 430, X: 780, M: 890, pop: 1430 },
  UK: { name: "United Kingdom", C: 2150, I: 620, G: 740, X: 1080, M: 1120, pop: 67 },
};
