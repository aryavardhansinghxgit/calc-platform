import {
  RentalPropertyInput,
  RentalPropertyResult,
  BRRRRInput,
  BRRRRResult,
  UnitRentRollItem,
  MultiUnitRentRollResult,
  TaxDepreciationInput,
  TaxDepreciationResult,
  RulesOfThumbInput,
  RulesOfThumbResult,
  SensitivityMatrixResult,
} from "./types";

export function calculateIRR(cashFlows: number[]): number {
  if (!cashFlows || cashFlows.length < 2) return 0;
  let rate = 0.1; // initial guess 10%
  const maxIter = 100;
  const tol = 1e-6;

  for (let i = 0; i < maxIter; i++) {
    let npv = 0;
    let dnpv = 0;

    for (let t = 0; t < cashFlows.length; t++) {
      const denom = Math.pow(1 + rate, t);
      npv += cashFlows[t] / denom;
      dnpv -= (t * cashFlows[t]) / Math.pow(1 + rate, t + 1);
    }

    if (Math.abs(npv) < tol) break;
    if (Math.abs(dnpv) < 1e-12) break;

    const newRate = rate - npv / dnpv;
    if (isNaN(newRate) || !isFinite(newRate)) break;
    rate = newRate;
  }

  return isNaN(rate) || !isFinite(rate) ? 0 : Number((rate * 100).toFixed(2));
}

export function calculateRentalProperty(input: RentalPropertyInput): RentalPropertyResult {
  const {
    purchasePrice,
    useLoan = true,
    downPaymentPct = 20,
    interestRate = 6.5,
    loanTermYears = 30,
    closingCosts = 5000,
    initialRehab = 0,
    monthlyRent = 2000,
    otherIncome = 0,
    vacancyRatePct = 5,
    managementFeePct = 8,
    annualPropertyTax = 3000,
    annualInsurance = 1200,
    monthlyHoa = 0,
    annualMaintenance = 2000,
    monthlyUtilities = 0,
    otherCostsAnnual = 500,
    holdingPeriodYears = 20,
    appreciationPct = 3,
    costToSellPct = 8,
  } = input;

  const downPayment = useLoan ? (purchasePrice * downPaymentPct) / 100 : purchasePrice;
  const loanAmount = useLoan ? purchasePrice - downPayment : 0;
  const initialCashInvested = Math.round((useLoan ? downPayment : purchasePrice) + closingCosts + initialRehab);

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyMortgagePayment =
    useLoan && loanAmount > 0 && monthlyRate > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const monthlyGrossIncome = monthlyRent + otherIncome;
  const monthlyVacancyLoss = (monthlyRent * vacancyRatePct) / 100;
  const monthlyEffectiveIncome = monthlyGrossIncome - monthlyVacancyLoss;

  const monthlyManagementFee = (monthlyGrossIncome * managementFeePct) / 100;
  const monthlyOperatingExpenses =
    annualPropertyTax / 12 +
    annualInsurance / 12 +
    monthlyHoa +
    annualMaintenance / 12 +
    monthlyUtilities +
    otherCostsAnnual / 12 +
    monthlyManagementFee;

  const monthlyNOI = monthlyEffectiveIncome - monthlyOperatingExpenses;
  const annualNOI = monthlyNOI * 12;

  const monthlyNetCashFlow = monthlyNOI - monthlyMortgagePayment;
  const annualNetCashFlow = monthlyNetCashFlow * 12;

  const capRate = purchasePrice > 0 ? Number(((annualNOI / purchasePrice) * 100).toFixed(2)) : 0;
  const cashOnCashReturn =
    initialCashInvested > 0 ? Number(((annualNetCashFlow / initialCashInvested) * 100).toFixed(2)) : 0;

  const grossRentMultiplier =
    monthlyRent * 12 > 0 ? Number((purchasePrice / (monthlyRent * 12)).toFixed(2)) : 0;

  const annualDebtService = monthlyMortgagePayment * 12;
  const dscr = annualDebtService > 0 ? Number((annualNOI / annualDebtService).toFixed(2)) : 99;

  // Multi-year Cash Flow & Loan Amortization Simulation for IRR
  const cashFlows: number[] = [-initialCashInvested];
  let remainingBalance = loanAmount;

  for (let yr = 1; yr <= holdingPeriodYears; yr++) {
    // Principal paydown over the year
    if (useLoan && remainingBalance > 0) {
      for (let m = 0; m < 12; m++) {
        const interestPaid = remainingBalance * monthlyRate;
        const principalPaid = monthlyMortgagePayment - interestPaid;
        remainingBalance = Math.max(0, remainingBalance - principalPaid);
      }
    }
    cashFlows.push(annualNetCashFlow);
  }

  const futureSalePrice = purchasePrice * Math.pow(1 + appreciationPct / 100, holdingPeriodYears);
  const netSaleProceeds = futureSalePrice * (1 - costToSellPct / 100) - remainingBalance;

  // Add terminal sale proceeds to final year cash flow
  cashFlows[cashFlows.length - 1] += netSaleProceeds;

  const irr = calculateIRR(cashFlows);
  const totalNetProfitAtSale = Math.round(
    cashFlows.reduce((a, b) => a + b, 0) // Sum of cash flows including initial outlay + sale
  );

  return {
    initialCashInvested,
    monthlyMortgagePayment: Math.round(monthlyMortgagePayment),
    monthlyGrossIncome: Math.round(monthlyGrossIncome),
    monthlyEffectiveIncome: Math.round(monthlyEffectiveIncome),
    monthlyOperatingExpenses: Math.round(monthlyOperatingExpenses),
    monthlyNOI: Math.round(monthlyNOI),
    annualNOI: Math.round(annualNOI),
    monthlyNetCashFlow: Math.round(monthlyNetCashFlow),
    annualNetCashFlow: Math.round(annualNetCashFlow),
    capRate,
    cashOnCashReturn,
    grossRentMultiplier,
    dscr,
    irr,
    totalNetProfitAtSale,
    futureSalePrice: Math.round(futureSalePrice),
    equityAtSale: Math.round(futureSalePrice - remainingBalance),
  };
}

export function calculateBRRRR(input: BRRRRInput): BRRRRResult {
  const {
    purchasePrice,
    rehabCost,
    arv,
    postRehabMonthlyRent,
    refinanceLtvPct = 75,
    refinanceInterestRate = 6.5,
    refinanceTermYears = 30,
  } = input;

  const totalInitialCashOutlay = purchasePrice + rehabCost;
  const refinanceLoanAmount = arv * (refinanceLtvPct / 100);
  const cashRecoupedAtRefinance = refinanceLoanAmount;
  const netCapitalTrapped = totalInitialCashOutlay - cashRecoupedAtRefinance;

  const isInfiniteReturn = netCapitalTrapped <= 0;

  const monthlyRate = refinanceInterestRate / 100 / 12;
  const totalMonths = refinanceTermYears * 12;

  const postRefinanceMonthlyMortgage =
    refinanceLoanAmount > 0 && monthlyRate > 0
      ? (refinanceLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  // Estimate 45% operating expenses for BRRRR post-refinance
  const estimatedMonthlyOpEx = postRehabMonthlyRent * 0.45;
  const postRefinanceMonthlyCashFlow = postRehabMonthlyRent - estimatedMonthlyOpEx - postRefinanceMonthlyMortgage;

  return {
    totalInitialCashOutlay: Math.round(totalInitialCashOutlay),
    refinanceLoanAmount: Math.round(refinanceLoanAmount),
    cashRecoupedAtRefinance: Math.round(cashRecoupedAtRefinance),
    netCapitalTrapped: Math.round(netCapitalTrapped),
    isInfiniteReturn,
    postRefinanceMonthlyMortgage: Math.round(postRefinanceMonthlyMortgage),
    postRefinanceMonthlyCashFlow: Math.round(postRefinanceMonthlyCashFlow),
  };
}

export function calculateMultiUnitRentRoll(
  units: UnitRentRollItem[],
  laundryOtherIncome: number = 0
): MultiUnitRentRollResult {
  if (!units || units.length === 0) {
    return {
      totalGrossPotentialIncome: 0,
      totalEffectiveIncome: 0,
      averageRentPerUnit: 0,
      totalUnits: 0,
    };
  }

  const totalUnits = units.length;
  let totalGrossPotentialIncome = 0;
  let totalEffectiveIncome = 0;

  units.forEach((u) => {
    const gross = u.monthlyRent || 0;
    const vacancyLoss = (gross * (u.vacancyRatePct || 5)) / 100;
    totalGrossPotentialIncome += gross;
    totalEffectiveIncome += gross - vacancyLoss;
  });

  totalGrossPotentialIncome += laundryOtherIncome;
  totalEffectiveIncome += laundryOtherIncome;

  const averageRentPerUnit = Math.round(totalGrossPotentialIncome / totalUnits);

  return {
    totalGrossPotentialIncome: Math.round(totalGrossPotentialIncome),
    totalEffectiveIncome: Math.round(totalEffectiveIncome),
    averageRentPerUnit,
    totalUnits,
  };
}

export function calculateTaxDepreciation(
  input: TaxDepreciationInput,
  monthlyRent: number = 2000
): TaxDepreciationResult {
  const { purchasePrice, landValuePct = 20, taxBracketPct = 24 } = input;

  const depreciableBuildingValue = purchasePrice * (1 - landValuePct / 100);
  // MACRS 27.5 year straight line depreciation
  const annualDepreciationDeduction = depreciableBuildingValue / 27.5;
  const annualTaxSavings = annualDepreciationDeduction * (taxBracketPct / 100);
  const monthlyTaxShieldSavings = annualTaxSavings / 12;

  const monthlyGrossRent = monthlyRent || 1;
  const taxShieldedPctOfRent = Number(((monthlyTaxShieldSavings / monthlyGrossRent) * 100).toFixed(1));

  return {
    depreciableBuildingValue: Math.round(depreciableBuildingValue),
    annualDepreciationDeduction: Math.round(annualDepreciationDeduction),
    monthlyTaxShieldSavings: Math.round(monthlyTaxShieldSavings),
    taxShieldedPctOfRent,
  };
}

export function calculateRulesOfThumb(input: RulesOfThumbInput): RulesOfThumbResult {
  const { purchasePrice, rehabCost, grossMonthlyRent, arv } = input;

  const totalInvested = purchasePrice + rehabCost;
  const onePercentRulePct = totalInvested > 0 ? Number(((grossMonthlyRent / totalInvested) * 100).toFixed(2)) : 0;

  const passesOnePercent = onePercentRulePct >= 1.0;
  const passesTwoPercent = onePercentRulePct >= 2.0;

  const estimated50PercentOpEx = grossMonthlyRent * 0.5;
  const estimated50PercentCashFlow = grossMonthlyRent * 0.5; // pre-debt service

  const maxAllowableOffer70 = Math.round(arv * 0.7 - rehabCost);

  return {
    onePercentRulePct,
    passesOnePercent,
    passesTwoPercent,
    estimated50PercentOpEx: Math.round(estimated50PercentOpEx),
    estimated50PercentCashFlow: Math.round(estimated50PercentCashFlow),
    maxAllowableOffer70,
  };
}

export function calculateSensitivityMatrix(
  baseRent: number,
  basePrice: number,
  baseRate: number
): SensitivityMatrixResult {
  const vacancies = [3, 5, 10];
  const rates = [baseRate - 1, baseRate, baseRate + 1];

  const matrix = vacancies.map((vPct) => {
    const row = {
      vacancyPct: vPct,
      rateMinus1: 0,
      rateBase: 0,
      ratePlus1: 0,
    };

    rates.forEach((r, idx) => {
      const res = calculateRentalProperty({
        purchasePrice: basePrice,
        useLoan: true,
        downPaymentPct: 20,
        interestRate: r,
        loanTermYears: 30,
        closingCosts: 4000,
        initialRehab: 0,
        afterRepairValue: basePrice,
        monthlyRent: baseRent,
        rentGrowthPct: 3,
        otherIncome: 0,
        otherIncomeGrowthPct: 0,
        vacancyRatePct: vPct,
        managementFeePct: 8,
        annualPropertyTax: basePrice * 0.012,
        propertyTaxGrowthPct: 2,
        annualInsurance: 1200,
        insuranceGrowthPct: 2,
        monthlyHoa: 0,
        annualMaintenance: 1500,
        monthlyUtilities: 0,
        otherCostsAnnual: 0,
        holdingPeriodYears: 20,
        appreciationPct: 3,
        costToSellPct: 7,
        currencySymbol: "$",
      });

      if (idx === 0) row.rateMinus1 = res.monthlyNetCashFlow;
      else if (idx === 1) row.rateBase = res.monthlyNetCashFlow;
      else if (idx === 2) row.ratePlus1 = res.monthlyNetCashFlow;
    });

    return row;
  });

  return { matrix };
}

export function calculateRentalPropertyCalculator(inputs: Record<string, any>): Record<string, any> {
  const purchasePrice = parseFloat(inputs.purchasePrice) || 200000;
  const monthlyRent = parseFloat(inputs.monthlyRent) || 2000;
  const interestRate = parseFloat(inputs.interestRate) || 6.5;

  const res = calculateRentalProperty({
    purchasePrice,
    useLoan: true,
    downPaymentPct: 20,
    interestRate,
    loanTermYears: 30,
    closingCosts: 5000,
    initialRehab: 0,
    afterRepairValue: purchasePrice,
    monthlyRent,
    rentGrowthPct: 3,
    otherIncome: 0,
    otherIncomeGrowthPct: 0,
    vacancyRatePct: 5,
    managementFeePct: 8,
    annualPropertyTax: 3000,
    propertyTaxGrowthPct: 2,
    annualInsurance: 1200,
    insuranceGrowthPct: 2,
    monthlyHoa: 0,
    annualMaintenance: 2000,
    monthlyUtilities: 0,
    otherCostsAnnual: 500,
    holdingPeriodYears: 20,
    appreciationPct: 3,
    costToSellPct: 8,
    currencySymbol: "$",
  });

  return {
    irr: `${res.irr}%`,
    cashOnCashReturn: `${res.cashOnCashReturn}%`,
    capRate: `${res.capRate}%`,
    monthlyNetCashFlow: `$${res.monthlyNetCashFlow.toLocaleString()}`,
    annualNOI: `$${res.annualNOI.toLocaleString()}`,
    totalNetProfitAtSale: `$${res.totalNetProfitAtSale.toLocaleString()}`,
  };
}
