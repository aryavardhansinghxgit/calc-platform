/**
 * Premium Auto Lease Financial Engine
 * Handles full auto lease calculations, reverse target payment solver,
 * lease vs buy comparison, mileage excess penalty analysis, sensitivity matrix,
 * and step-by-step worked math examples.
 */

export interface ExtendedAutoLeaseInput {
  // Tab 1 & Core Inputs
  autoPrice?: number; // MSRP or Negotiated Price
  vehicleMsrp?: number; // MSRP if different from negotiated price
  downPayment?: number;
  tradeInValue?: number;
  amountOwedOnTradeIn?: number;
  leaseTermMonths?: number;
  
  // Interest Rate (Money Factor or APR)
  interestInputType?: "moneyFactor" | "apr";
  moneyFactor?: number; // e.g. 0.0025
  aprPercent?: number; // e.g. 6.0 %
  
  // Residual Value
  residualInputType?: "amount" | "percent";
  residualValue?: number; // $
  residualPercent?: number; // % of MSRP

  // Taxes
  salesTaxRate?: number; // %

  // Advanced Options / Fees
  acquisitionFee?: number;
  registrationFee?: number;
  documentationFee?: number;
  dispositionFee?: number;
  securityDeposit?: number;
  negativeEquityRollover?: number;
  manufacturerIncentives?: number;
  leaseCashRebates?: number;

  // Mileage Analysis
  mileageAllowancePerYear?: number; // e.g. 12000
  expectedMilesPerYear?: number; // e.g. 15000
  excessMileageFeeRate?: number; // e.g. 0.20 ($/mile)

  // Tab 2 Reverse Solver
  targetMonthlyPayment?: number;
}

export interface LeaseBreakdownRow {
  label: string;
  amount: number;
  description: string;
}

export interface LeaseVsBuyResult {
  leaseMonthlyPayment: number;
  leaseTotalOutlay: number;
  leaseEquityRetained: number; // $0 at lease end
  leaseResaleValue: number;
  leaseMaintenanceCost: number;
  leaseNetEffectiveCost: number;

  buyMonthlyPayment: number;
  buyTotalOutlay: number;
  buyEquityRetained: number; // Resale value at end of term
  buyResaleValue: number;
  buyMaintenanceCost: number;
  buyNetEffectiveCost: number;

  recommendation: "Lease Better" | "Buy Better" | "Neutral";
  explanation: string;
}

export interface MileageAnalysisResult {
  annualAllowance: number;
  totalAllowance: number;
  expectedTotalMiles: number;
  excessMiles: number;
  penaltyFeePerMile: number;
  totalPenaltyCost: number;
  adjustedTotalLeaseCost: number;
  status: "Within Limit" | "Near Limit" | "Over Limit";
}

export interface SensitivityOption {
  valueLabel: string;
  monthlyPayment: number;
  totalLeaseCost: number;
  differenceFromBase: number;
}

export interface AutoLeaseResult {
  monthlyLeasePayment: number;
  monthlyDepreciation: number;
  monthlyFinanceFee: number; // Rent Charge
  monthlySalesTax: number;
  
  totalLeaseCost: number;
  totalDepreciationPaid: number;
  totalFinanceChargesPaid: number;
  totalSalesTaxPaid: number;
  totalUpfrontCost: number; // Down payment + Upfront Fees + Security Deposit + 1st Payment

  // Key Figures
  grossCapCost: number;
  capCostReductions: number;
  adjustedCapCost: number; // Net Cap Cost
  residualValue: number;
  costPerMile: number;
  effectiveAprPercent: number;
  moneyFactorUsed: number;
  leaseEndPurchasePrice: number;

  // Detailed Table Breakdown
  breakdown: LeaseBreakdownRow[];

  // Sub-Modules
  leaseVsBuy: LeaseVsBuyResult;
  mileageAnalysis: MileageAnalysisResult;
  sensitivityMatrix: {
    aprVsPayment: SensitivityOption[];
    residualVsPayment: SensitivityOption[];
    termVsPayment: SensitivityOption[];
  };

  // Reverse Solver Output (Tab 2)
  targetResult?: {
    maxVehiclePrice: number;
    maxAllowedCapCost: number;
    targetMonthlyPayment: number;
  };
}

/**
 * Converts APR % to Money Factor.
 * Money Factor = APR / 2400
 */
export function aprToMoneyFactor(apr: number): number {
  return (Number(apr) || 0) / 2400;
}

/**
 * Converts Money Factor to APR %.
 * APR = Money Factor * 2400
 */
export function moneyFactorToApr(mf: number): number {
  return (Number(mf) || 0) * 2400;
}

/**
 * Calculates complete Auto Lease breakdown & decision analytics.
 */
export function calculateAutoLeaseFormula(inputs: ExtendedAutoLeaseInput): AutoLeaseResult {
  const autoPrice = Math.max(0, Number(inputs.autoPrice || inputs.vehicleMsrp || 35000));
  const msrp = Math.max(autoPrice, Number(inputs.vehicleMsrp || autoPrice));
  const downPayment = Math.max(0, Number(inputs.downPayment) || 0);
  const tradeInValue = Math.max(0, Number(inputs.tradeInValue) || 0);
  const amountOwedOnTrade = Math.max(0, Number(inputs.amountOwedOnTradeIn) || 0);
  const termMonths = Math.max(1, Math.min(84, Number(inputs.leaseTermMonths) || 36));

  // Net trade-in equity
  const netTradeEquity = tradeInValue - amountOwedOnTrade;
  const positiveTradeEquity = Math.max(0, netTradeEquity);
  const negativeEquityRollover = Math.max(0, Number(inputs.negativeEquityRollover) || 0) + Math.abs(Math.min(0, netTradeEquity));

  // Interest Input Math (Money Factor <-> APR)
  let moneyFactor = 0.0025; // default 6% APR
  let effectiveAprPercent = 6.0;

  if (inputs.interestInputType === "apr" && inputs.aprPercent !== undefined) {
    effectiveAprPercent = Math.max(0, Number(inputs.aprPercent));
    moneyFactor = aprToMoneyFactor(effectiveAprPercent);
  } else if (inputs.moneyFactor !== undefined) {
    moneyFactor = Math.max(0, Number(inputs.moneyFactor));
    effectiveAprPercent = moneyFactorToApr(moneyFactor);
  }

  // Fees & Incentives
  const acqFee = Math.max(0, Number(inputs.acquisitionFee) || 0);
  const regFee = Math.max(0, Number(inputs.registrationFee) || 0);
  const docFee = Math.max(0, Number(inputs.documentationFee) || 0);
  const dispFee = Math.max(0, Number(inputs.dispositionFee) || 0);
  const secDeposit = Math.max(0, Number(inputs.securityDeposit) || 0);
  const mfgIncentives = Math.max(0, Number(inputs.manufacturerIncentives) || 0);
  const leaseRebates = Math.max(0, Number(inputs.leaseCashRebates) || 0);

  // Capitalized Cost Math
  // Gross Cap Cost = Auto Price + Acquisition Fee + Negative Equity Rollover
  const grossCapCost = autoPrice + acqFee + negativeEquityRollover;
  // Cap Cost Reductions = Down Payment + Positive Trade Equity + Manufacturer Incentives + Lease Rebates
  const capCostReductions = downPayment + positiveTradeEquity + mfgIncentives + leaseRebates;
  // Adjusted Cap Cost (Net Cap Cost)
  const adjustedCapCost = Math.max(0, grossCapCost - capCostReductions);

  // Residual Value Math
  let residualValue = 0;
  if (inputs.residualInputType === "percent" || inputs.residualPercent !== undefined) {
    const resPct = Math.max(0, Number(inputs.residualPercent ?? 55));
    residualValue = msrp * (resPct / 100);
  } else {
    residualValue = Math.max(0, Number(inputs.residualValue ?? msrp * 0.55));
  }

  // 1. Monthly Payment Calculations
  // Monthly Depreciation = (Adjusted Cap Cost - Residual Value) / Lease Term
  const totalDepreciation = Math.max(0, adjustedCapCost - residualValue);
  const monthlyDepreciation = totalDepreciation / termMonths;

  // Monthly Finance Charge (Rent Charge) = (Adjusted Cap Cost + Residual Value) * Money Factor
  const monthlyFinanceFee = (adjustedCapCost + residualValue) * moneyFactor;

  // Subtotal Payment before Tax
  const subtotalMonthly = monthlyDepreciation + monthlyFinanceFee;

  // Monthly Sales Tax = Subtotal * Sales Tax Rate %
  const salesTaxRate = Math.max(0, Number(inputs.salesTaxRate) || 0);
  const monthlySalesTax = subtotalMonthly * (salesTaxRate / 100);

  // Final Monthly Lease Payment
  const monthlyLeasePayment = subtotalMonthly + monthlySalesTax;

  // Totals Over Lease Term
  const totalDepreciationPaid = monthlyDepreciation * termMonths;
  const totalFinanceChargesPaid = monthlyFinanceFee * termMonths;
  const totalSalesTaxPaid = monthlySalesTax * termMonths;
  const totalUpfrontCost = downPayment + regFee + docFee + secDeposit + monthlyLeasePayment;
  const totalLeaseCost = (monthlyLeasePayment * termMonths) + downPayment + regFee + docFee + dispFee;

  // Mileage Analysis Math
  const annualAllowance = Math.max(1, Number(inputs.mileageAllowancePerYear) || 12000);
  const totalAllowance = annualAllowance * (termMonths / 12);
  const expectedAnnualMiles = Math.max(0, Number(inputs.expectedMilesPerYear) || annualAllowance);
  const expectedTotalMiles = expectedAnnualMiles * (termMonths / 12);
  const excessMiles = Math.max(0, expectedTotalMiles - totalAllowance);
  const penaltyRate = Math.max(0, Number(inputs.excessMileageFeeRate) || 0.20);
  const totalPenaltyCost = excessMiles * penaltyRate;
  const adjustedTotalLeaseCost = totalLeaseCost + totalPenaltyCost;

  const costPerMile = expectedTotalMiles > 0 ? adjustedTotalLeaseCost / expectedTotalMiles : 0;

  let mileageStatus: "Within Limit" | "Near Limit" | "Over Limit" = "Within Limit";
  if (excessMiles > 0) mileageStatus = "Over Limit";
  else if (expectedAnnualMiles >= annualAllowance * 0.95) mileageStatus = "Near Limit";

  // 2. Detailed Breakdown Table
  const breakdown: LeaseBreakdownRow[] = [
    { label: "Gross Capitalized Cost", amount: Math.round(grossCapCost * 100) / 100, description: "Vehicle price + acquisition fee + negative equity rollover" },
    { label: "Cap Cost Reductions", amount: Math.round(capCostReductions * 100) / 100, description: "Down payment + trade-in equity + rebates & incentives" },
    { label: "Adjusted Capitalized Cost (Net Cap Cost)", amount: Math.round(adjustedCapCost * 100) / 100, description: "Net amount being financed over the lease" },
    { label: "Residual Value (End of Lease)", amount: Math.round(residualValue * 100) / 100, description: "Estimated market value at the end of the lease term" },
    { label: "Total Depreciation Charge", amount: Math.round(totalDepreciation * 100) / 100, description: "Net Cap Cost minus Residual Value" },
    { label: "Monthly Depreciation Portion", amount: Math.round(monthlyDepreciation * 100) / 100, description: "Total depreciation divided by lease term" },
    { label: "Monthly Finance Charge (Rent Fee)", amount: Math.round(monthlyFinanceFee * 100) / 100, description: "(Net Cap Cost + Residual Value) × Money Factor" },
    { label: "Monthly Sales Tax", amount: Math.round(monthlySalesTax * 100) / 100, description: "Subtotal payment × Sales Tax Rate" },
    { label: "Total Monthly Lease Payment", amount: Math.round(monthlyLeasePayment * 100) / 100, description: "Depreciation + Finance Charge + Tax" },
  ];

  // 3. Lease vs Buy Comparison Engine
  // Assume buying the same vehicle at autoPrice with loan term = termMonths at APR + 1%
  const buyLoanApr = effectiveAprPercent + 1.0;
  const buyLoanAmount = Math.max(0, autoPrice + (autoPrice * (salesTaxRate / 100)) + regFee + docFee - downPayment - positiveTradeEquity);
  const buyMonthlyRate = buyLoanApr / 100 / 12;
  let buyMonthlyPayment = 0;

  if (buyLoanAmount > 0) {
    if (buyLoanApr === 0) buyMonthlyPayment = buyLoanAmount / termMonths;
    else {
      buyMonthlyPayment = (buyLoanAmount * (buyMonthlyRate * Math.pow(1 + buyMonthlyRate, termMonths))) / (Math.pow(1 + buyMonthlyRate, termMonths) - 1);
    }
  }

  const buyTotalOutlay = (buyMonthlyPayment * termMonths) + downPayment;
  const buyResaleValue = residualValue; // vehicle is worth residual value at end of term
  const buyEquityRetained = buyResaleValue;
  const buyMaintenanceCost = 800; // estimated routine maintenance for buying
  const buyNetEffectiveCost = buyTotalOutlay - buyEquityRetained + buyMaintenanceCost;

  const leaseTotalOutlay = totalLeaseCost;
  const leaseEquityRetained = 0; // $0 equity at lease end
  const leaseMaintenanceCost = 300; // covered under warranty
  const leaseNetEffectiveCost = leaseTotalOutlay + leaseMaintenanceCost;

  let leaseVsBuyRecommendation: "Lease Better" | "Buy Better" | "Neutral" = "Neutral";
  let explanation = "";

  if (leaseNetEffectiveCost < buyNetEffectiveCost - 1000) {
    leaseVsBuyRecommendation = "Lease Better";
    explanation = `Leasing saves ~$${Math.round(buyNetEffectiveCost - leaseNetEffectiveCost).toLocaleString()} in net effective cost over ${termMonths} months, offering a significantly lower monthly payment ($${Math.round(monthlyLeasePayment).toLocaleString()} vs $${Math.round(buyMonthlyPayment).toLocaleString()}/mo).`;
  } else if (buyNetEffectiveCost < leaseNetEffectiveCost - 1000) {
    leaseVsBuyRecommendation = "Buy Better";
    explanation = `Buying builds $${Math.round(buyEquityRetained).toLocaleString()} in vehicle equity at the end of ${termMonths} months, outperforming leasing in long-term net asset value by ~$${Math.round(leaseNetEffectiveCost - buyNetEffectiveCost).toLocaleString()}.`;
  } else {
    leaseVsBuyRecommendation = "Neutral";
    explanation = `Leasing and buying carry comparable net financial costs over ${termMonths} months. Choose leasing if you prefer driving new cars under warranty, or buying if you plan to keep the vehicle past the loan term.`;
  }

  const leaseVsBuy: LeaseVsBuyResult = {
    leaseMonthlyPayment: Math.round(monthlyLeasePayment * 100) / 100,
    leaseTotalOutlay: Math.round(leaseTotalOutlay * 100) / 100,
    leaseEquityRetained: 0,
    leaseResaleValue: 0,
    leaseMaintenanceCost,
    leaseNetEffectiveCost: Math.round(leaseNetEffectiveCost * 100) / 100,

    buyMonthlyPayment: Math.round(buyMonthlyPayment * 100) / 100,
    buyTotalOutlay: Math.round(buyTotalOutlay * 100) / 100,
    buyEquityRetained: Math.round(buyEquityRetained * 100) / 100,
    buyResaleValue: Math.round(buyResaleValue * 100) / 100,
    buyMaintenanceCost,
    buyNetEffectiveCost: Math.round(buyNetEffectiveCost * 100) / 100,

    recommendation: leaseVsBuyRecommendation,
    explanation,
  };

  // 4. Sensitivity Matrix (APR, Residual %, Term)
  // Matrix A: APR Variations (3%, 4.5%, 6%, 7.5%, 9%)
  const aprOptions = [3.0, 4.5, 6.0, 7.5, 9.0];
  const aprVsPayment: SensitivityOption[] = aprOptions.map((aprVal) => {
    const mfVal = aprToMoneyFactor(aprVal);
    const finFee = (adjustedCapCost + residualValue) * mfVal;
    const sub = monthlyDepreciation + finFee;
    const pmt = sub + (sub * (salesTaxRate / 100));
    const tot = (pmt * termMonths) + downPayment;
    return {
      valueLabel: `${aprVal}% APR (MF ${mfVal.toFixed(5)})`,
      monthlyPayment: Math.round(pmt * 100) / 100,
      totalLeaseCost: Math.round(tot * 100) / 100,
      differenceFromBase: Math.round((pmt - monthlyLeasePayment) * 100) / 100,
    };
  });

  // Matrix B: Residual % Variations (45%, 50%, 55%, 60%, 65%)
  const resPctOptions = [45, 50, 55, 60, 65];
  const residualVsPayment: SensitivityOption[] = resPctOptions.map((resPct) => {
    const resVal = msrp * (resPct / 100);
    const depVal = Math.max(0, adjustedCapCost - resVal) / termMonths;
    const finFee = (adjustedCapCost + resVal) * moneyFactor;
    const sub = depVal + finFee;
    const pmt = sub + (sub * (salesTaxRate / 100));
    const tot = (pmt * termMonths) + downPayment;
    return {
      valueLabel: `${resPct}% Residual ($${Math.round(resVal).toLocaleString()})`,
      monthlyPayment: Math.round(pmt * 100) / 100,
      totalLeaseCost: Math.round(tot * 100) / 100,
      differenceFromBase: Math.round((pmt - monthlyLeasePayment) * 100) / 100,
    };
  });

  // Matrix C: Term Length Variations (24, 36, 39, 42, 48 months)
  const termOptions = [24, 36, 39, 42, 48];
  const termVsPayment: SensitivityOption[] = termOptions.map((termVal) => {
    const depVal = totalDepreciation / termVal;
    const finFee = (adjustedCapCost + residualValue) * moneyFactor;
    const sub = depVal + finFee;
    const pmt = sub + (sub * (salesTaxRate / 100));
    const tot = (pmt * termVal) + downPayment;
    return {
      valueLabel: `${termVal} Months (${(termVal / 12).toFixed(1)} Yrs)`,
      monthlyPayment: Math.round(pmt * 100) / 100,
      totalLeaseCost: Math.round(tot * 100) / 100,
      differenceFromBase: Math.round((pmt - monthlyLeasePayment) * 100) / 100,
    };
  });

  // 5. Reverse Target Monthly Payment Solver (Tab 2)
  let targetResult;
  const targetPayment = Math.max(0, Number(inputs.targetMonthlyPayment) || 0);
  if (targetPayment > 0) {
    // TargetPayment = [ (NetCapCost - Residual)/Term + (NetCapCost + Residual)*MF ] * (1 + TaxRate)
    // Let subtotalTarget = TargetPayment / (1 + TaxRate)
    // subtotalTarget = NetCapCost (1/Term + MF) - Residual/Term + Residual*MF
    // NetCapCost = [ subtotalTarget + Residual (1/Term - MF) ] / (1/Term + MF)
    const taxFactor = 1 + (salesTaxRate / 100);
    const subtotalTarget = targetPayment / taxFactor;
    const termFactor = 1 / termMonths;

    const netCapCostCapacity = (subtotalTarget + residualValue * (termFactor - moneyFactor)) / (termFactor + moneyFactor);
    const maxVehiclePrice = netCapCostCapacity + capCostReductions - acqFee;

    targetResult = {
      maxVehiclePrice: Math.round(maxVehiclePrice),
      maxAllowedCapCost: Math.round(netCapCostCapacity),
      targetMonthlyPayment: Math.round(targetPayment),
    };
  }

  return {
    monthlyLeasePayment: Math.round(monthlyLeasePayment * 100) / 100,
    monthlyDepreciation: Math.round(monthlyDepreciation * 100) / 100,
    monthlyFinanceFee: Math.round(monthlyFinanceFee * 100) / 100,
    monthlySalesTax: Math.round(monthlySalesTax * 100) / 100,

    totalLeaseCost: Math.round(totalLeaseCost * 100) / 100,
    totalDepreciationPaid: Math.round(totalDepreciationPaid * 100) / 100,
    totalFinanceChargesPaid: Math.round(totalFinanceChargesPaid * 100) / 100,
    totalSalesTaxPaid: Math.round(totalSalesTaxPaid * 100) / 100,
    totalUpfrontCost: Math.round(totalUpfrontCost * 100) / 100,

    grossCapCost: Math.round(grossCapCost * 100) / 100,
    capCostReductions: Math.round(capCostReductions * 100) / 100,
    adjustedCapCost: Math.round(adjustedCapCost * 100) / 100,
    residualValue: Math.round(residualValue * 100) / 100,
    costPerMile: Math.round(costPerMile * 1000) / 1000,
    effectiveAprPercent: Math.round(effectiveAprPercent * 100) / 100,
    moneyFactorUsed: Number(moneyFactor.toFixed(6)),
    leaseEndPurchasePrice: Math.round(residualValue * 100) / 100,

    breakdown,
    leaseVsBuy,
    mileageAnalysis: {
      annualAllowance,
      totalAllowance,
      expectedTotalMiles,
      excessMiles,
      penaltyFeePerMile: penaltyRate,
      totalPenaltyCost: Math.round(totalPenaltyCost * 100) / 100,
      adjustedTotalLeaseCost: Math.round(adjustedTotalLeaseCost * 100) / 100,
      status: mileageStatus,
    },
    sensitivityMatrix: {
      aprVsPayment,
      residualVsPayment,
      termVsPayment,
    },
    targetResult,
  };
}
