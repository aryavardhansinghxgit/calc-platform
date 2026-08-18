import {
  MutualFundInputs,
  MutualFundStandardResult,
  YearScheduleRow,
  ActiveVsIndexInputs,
  ActiveVsIndexResult,
  SipStepUpInputs,
  SipStepUpResult,
  SipStepUpRow,
  CdscInputs,
  CdscResult,
  CdscScheduleRow,
  InflationTaxInputs,
  InflationTaxResult,
  TargetGoalInputs,
  TargetGoalResult,
} from "./types";

/**
 * Robust Newton-Raphson Net IRR root finder with binary bisection fallback
 */
export function solveNetIRR(
  initialOutflow: number,
  monthlyCashFlows: number[],
  finalInflow: number,
  months: number
): number {
  if (months <= 0) return 0;
  const totalInvested = initialOutflow + monthlyCashFlows.reduce((a, b) => a + b, 0);
  if (totalInvested <= 0) return 0;

  // NPV function using effective monthly compounding: mRate = (1 + r)^(1/12) - 1
  const npv = (r: number): number => {
    if (r <= -1) return -initialOutflow;
    const mRate = Math.pow(1 + r, 1 / 12) - 1;
    let sum = -initialOutflow;
    for (let m = 1; m <= months; m++) {
      const deposit = monthlyCashFlows[m - 1] || 0;
      if (deposit > 0) {
        sum -= deposit / Math.pow(1 + mRate, m);
      }
    }
    sum += finalInflow / Math.pow(1 + mRate, months);
    return sum;
  };

  // Derivative dNPV/dr for Newton-Raphson
  const dNpv = (r: number): number => {
    const delta = 1e-6;
    return (npv(r + delta) - npv(r - delta)) / (2 * delta);
  };

  // Initial estimate
  const simpleGainRatio = finalInflow / totalInvested;
  const years = months / 12;
  let r = years > 0 ? Math.pow(Math.max(0.01, simpleGainRatio), 1 / years) - 1 : 0.05;

  // Newton-Raphson Iteration
  for (let i = 0; i < 30; i++) {
    const val = npv(r);
    if (Math.abs(val) < 1e-4) {
      return parseFloat((r * 100).toFixed(3));
    }
    const deriv = dNpv(r);
    if (Math.abs(deriv) < 1e-9) break;
    const nextR = r - val / deriv;
    if (isNaN(nextR) || nextR < -0.99 || nextR > 5.0) break;
    r = nextR;
  }

  // Fallback: Binary Bisection
  let low = -0.99;
  let high = 5.0;
  let valLow = npv(low);
  let valHigh = npv(high);

  if (valLow * valHigh > 0) {
    // If same sign, adjust bounds
    if (npv(0) > 0) high = 10.0;
    else low = -0.999;
  }

  for (let i = 0; i < 80; i++) {
    const mid = (low + high) / 2;
    const valMid = npv(mid);
    if (Math.abs(valMid) < 1e-4 || (high - low) < 1e-7) {
      return parseFloat((mid * 100).toFixed(3));
    }
    if (valLow * valMid <= 0) {
      high = mid;
      valHigh = valMid;
    } else {
      low = mid;
      valLow = valMid;
    }
  }

  return parseFloat((((low + high) / 2) * 100).toFixed(3));
}

/**
 * 1. Comprehensive Mutual Fund Fee & Growth Analyzer (Core Engine)
 */
export function calculateStandardMutualFund(inputs: MutualFundInputs): MutualFundStandardResult {
  const initial = Math.max(0, inputs.initialInvestment || 0);
  const monthly = Math.max(0, inputs.monthlyContribution || 0);
  const annual = Math.max(0, inputs.annualContribution || 0);
  const grossReturnRate = (inputs.expectedAnnualReturn || 0) / 100;
  const frontLoadRate = Math.max(0, Math.min(1, (inputs.frontEndLoad || 0) / 100));
  const deferredLoadRate = Math.max(0, Math.min(1, (inputs.deferredBackEndLoad || 0) / 100));
  const expRatioRate = Math.max(0, Math.min(1, (inputs.expenseRatio || 0) / 100));
  const redemptionFee = Math.max(0, inputs.redemptionFee || 0);

  const totalMonths = Math.max(1, (inputs.holdingYears || 0) * 12 + (inputs.holdingMonths || 0));

  // Front-end load deductions
  const initialSalesCharge = initial * frontLoadRate;
  const netInitial = initial - initialSalesCharge;

  const monthlySalesCharge = monthly * frontLoadRate;
  const netMonthly = monthly - monthlySalesCharge;

  const annualSalesCharge = annual * frontLoadRate;
  const netAnnual = annual - annualSalesCharge;

  // Monthly compounding factors: (1 + r)^(1/12) - 1
  const netAnnualReturnRate = Math.max(-0.99, grossReturnRate - expRatioRate);
  const monthlyNetRate = Math.pow(1 + netAnnualReturnRate, 1 / 12) - 1;
  const monthlyGrossRate = Math.pow(1 + grossReturnRate, 1 / 12) - 1;

  let currentNetBalance = netInitial;
  let currentGrossBalanceNoFees = initial;
  let cumulativePrincipal = initial;
  let totalSalesCharge = initialSalesCharge;
  const monthlyOutflowsForIRR: number[] = [];

  const schedule: YearScheduleRow[] = [];
  let currentYearStartBalance = netInitial;
  let currentYearContributions = 0;
  let currentYearGrossInterest = 0;
  let currentYearOperatingExpenses = 0;

  for (let m = 1; m <= totalMonths; m++) {
    // Deposit during this month
    const isYearEnd = m % 12 === 0;
    const addAnnual = isYearEnd ? annual : 0;
    const addNetAnnual = isYearEnd ? netAnnual : 0;
    const addAnnualCharge = isYearEnd ? annualSalesCharge : 0;

    const thisMonthContributionGross = monthly + addAnnual;
    const thisMonthNetContribution = netMonthly + addNetAnnual;
    const thisMonthSalesCharge = monthlySalesCharge + addAnnualCharge;

    totalSalesCharge += thisMonthSalesCharge;
    cumulativePrincipal += thisMonthContributionGross;
    monthlyOutflowsForIRR.push(thisMonthContributionGross);

    // Net growth
    const netGrowth = currentNetBalance * monthlyNetRate;
    currentNetBalance = currentNetBalance + netGrowth + thisMonthNetContribution;

    // Gross growth (0 fees)
    const grossGrowth = currentGrossBalanceNoFees * monthlyGrossRate;
    currentGrossBalanceNoFees = currentGrossBalanceNoFees + grossGrowth + thisMonthContributionGross;

    // Operating expenses drag for this month
    const monthOpExpense = Math.max(0, currentNetBalance * (expRatioRate / 12));

    currentYearContributions += thisMonthContributionGross;
    currentYearGrossInterest += netGrowth;
    currentYearOperatingExpenses += monthOpExpense;

    if (m % 12 === 0 || m === totalMonths) {
      const yearIndex = Math.ceil(m / 12);
      schedule.push({
        year: yearIndex,
        month: m,
        startingBalance: parseFloat(currentYearStartBalance.toFixed(2)),
        contributions: parseFloat(currentYearContributions.toFixed(2)),
        grossInterestEarned: parseFloat(currentYearGrossInterest.toFixed(2)),
        operatingExpenses: parseFloat(currentYearOperatingExpenses.toFixed(2)),
        endingBalance: parseFloat(currentNetBalance.toFixed(2)),
        cumulativePrincipal: parseFloat(cumulativePrincipal.toFixed(2)),
        cumulativeFees: parseFloat((totalSalesCharge + schedule.reduce((s, r) => s + r.operatingExpenses, 0) + currentYearOperatingExpenses).toFixed(2)),
      });
      currentYearStartBalance = currentNetBalance;
      currentYearContributions = 0;
      currentYearGrossInterest = 0;
      currentYearOperatingExpenses = 0;
    }
  }

  // Back-End Deferred Sales Load (Lesser of Principal vs. Market Value rule)
  const deferredFeeBase = Math.min(cumulativePrincipal, currentNetBalance);
  const deferredSalesCharge = deferredFeeBase * deferredLoadRate;

  // Ending Net Balance after all back-end and redemption fees
  const finalEndingValue = Math.max(0, currentNetBalance - deferredSalesCharge - redemptionFee);
  const totalContributions = cumulativePrincipal - initial;
  const netReturn = finalEndingValue - cumulativePrincipal;

  // Gross value without any fees at all
  const grossProfitNoFees = Math.max(0, currentGrossBalanceNoFees - cumulativePrincipal);

  // Total Charges & Fees = Gross Profit (Zero Fees) - Net Profit
  const totalChargesAndFees = Math.max(0, grossProfitNoFees - netReturn);
  const operatingExpenses = Math.max(0, totalChargesAndFees - totalSalesCharge - deferredSalesCharge - redemptionFee);
  const feeDragPercent = grossProfitNoFees > 0 ? (totalChargesAndFees / currentGrossBalanceNoFees) * 100 : 0;

  // Net IRR Calculation
  const netIrrPercent = solveNetIRR(initial, monthlyOutflowsForIRR, finalEndingValue, totalMonths);

  // Share allocation data for donut chart
  const shareInitial = initial;
  const shareContr = totalContributions;
  const shareNetProfit = Math.max(0, netReturn);
  const shareFees = totalChargesAndFees;
  const totalPortfolioSum = shareInitial + shareContr + shareNetProfit + shareFees;

  const shareData = [
    {
      label: "Initial Investment",
      value: shareInitial,
      color: "#2563eb", // Blue
      percent: totalPortfolioSum > 0 ? (shareInitial / totalPortfolioSum) * 100 : 0,
    },
    {
      label: "Total Contributions",
      value: shareContr,
      color: "#60a5fa", // Light Blue
      percent: totalPortfolioSum > 0 ? (shareContr / totalPortfolioSum) * 100 : 0,
    },
    {
      label: "Net Earnings",
      value: shareNetProfit,
      color: "#10b981", // Emerald
      percent: totalPortfolioSum > 0 ? (shareNetProfit / totalPortfolioSum) * 100 : 0,
    },
    {
      label: "Fees & Charges Paid",
      value: shareFees,
      color: "#ef4444", // Red
      percent: totalPortfolioSum > 0 ? (shareFees / totalPortfolioSum) * 100 : 0,
    },
  ];

  return {
    endingValue: parseFloat(finalEndingValue.toFixed(2)),
    totalPrincipal: parseFloat(cumulativePrincipal.toFixed(2)),
    totalContributions: parseFloat(totalContributions.toFixed(2)),
    initialInvestment: parseFloat(initial.toFixed(2)),
    netReturn: parseFloat(netReturn.toFixed(2)),
    netIrrPercent,
    salesCharge: parseFloat(totalSalesCharge.toFixed(2)),
    deferredSalesCharge: parseFloat(deferredSalesCharge.toFixed(2)),
    operatingExpenses: parseFloat(operatingExpenses.toFixed(2)),
    redemptionFee: parseFloat(redemptionFee.toFixed(2)),
    totalChargesAndFees: parseFloat(totalChargesAndFees.toFixed(2)),
    grossEndingValueNoFees: parseFloat(currentGrossBalanceNoFees.toFixed(2)),
    grossProfitNoFees: parseFloat(grossProfitNoFees.toFixed(2)),
    feeDragPercent: parseFloat(feeDragPercent.toFixed(2)),
    schedule,
    shareData,
  };
}

/**
 * 2. Active Mutual Fund vs. Low-Cost Index Fund / ETF Fee Drag Comparator
 */
export function calculateActiveVsIndex(inputs: ActiveVsIndexInputs): ActiveVsIndexResult {
  const timeHorizons = [10, 20, 30];
  const comparisons = timeHorizons.map((years) => {
    const activeRes = calculateStandardMutualFund({
      initialInvestment: inputs.initialInvestment,
      monthlyContribution: inputs.monthlyContribution,
      annualContribution: 0,
      expectedAnnualReturn: inputs.expectedGrossReturn,
      holdingYears: years,
      holdingMonths: 0,
      frontEndLoad: inputs.activeFrontLoad,
      deferredBackEndLoad: 0,
      expenseRatio: inputs.activeExpenseRatio,
    });

    const indexRes = calculateStandardMutualFund({
      initialInvestment: inputs.initialInvestment,
      monthlyContribution: inputs.monthlyContribution,
      annualContribution: 0,
      expectedAnnualReturn: inputs.expectedGrossReturn,
      holdingYears: years,
      holdingMonths: 0,
      frontEndLoad: inputs.indexFrontLoad,
      deferredBackEndLoad: 0,
      expenseRatio: inputs.indexExpenseRatio,
    });

    return {
      years,
      totalInvested: activeRes.totalPrincipal,
      activeEndingValue: activeRes.endingValue,
      activeTotalFees: activeRes.totalChargesAndFees,
      indexEndingValue: indexRes.endingValue,
      indexTotalFees: indexRes.totalChargesAndFees,
      wealthAdvantage: parseFloat((indexRes.endingValue - activeRes.endingValue).toFixed(2)),
      feeSavings: parseFloat((activeRes.totalChargesAndFees - indexRes.totalChargesAndFees).toFixed(2)),
    };
  });

  const summary30YrLoss = comparisons.find((c) => c.years === 30)?.wealthAdvantage || 0;

  return {
    comparisons,
    summary30YrLoss,
  };
}

/**
 * 3. Systematic Investment Plan (SIP) with Step-Up Booster
 */
export function calculateSipStepUp(inputs: SipStepUpInputs): SipStepUpResult {
  const initial = Math.max(0, inputs.initialInvestment || 0);
  let monthlyDeposit = Math.max(0, inputs.startingMonthlySIP || 0);
  const stepUpPercent = (inputs.annualStepUpPercent || 0) / 100;
  const grossReturn = (inputs.expectedReturn || 0) / 100;
  const expRatio = (inputs.expenseRatio || 0) / 100;
  const netReturnRate = Math.max(-0.99, grossReturn - expRatio);
  const monthlyRate = Math.pow(1 + netReturnRate, 1 / 12) - 1;
  const totalYears = Math.max(1, inputs.timeHorizonYears || 1);

  let balance = initial;
  let totalInvested = initial;
  const schedule: SipStepUpRow[] = [];
  const monthlyCashFlows: number[] = [];

  for (let y = 1; y <= totalYears; y++) {
    let yearContributions = 0;
    for (let m = 1; m <= 12; m++) {
      balance = balance * (1 + monthlyRate) + monthlyDeposit;
      yearContributions += monthlyDeposit;
      totalInvested += monthlyDeposit;
      monthlyCashFlows.push(monthlyDeposit);
    }

    // Cumulative fees estimated from fee difference
    const grossMonthlyRate = Math.pow(1 + grossReturn, 1 / 12) - 1;
    let theoreticalGross = initial;
    let tempMonthly = inputs.startingMonthlySIP;
    for (let py = 1; py <= y; py++) {
      for (let pm = 1; pm <= 12; pm++) {
        theoreticalGross = theoreticalGross * (1 + grossMonthlyRate) + tempMonthly;
      }
      tempMonthly *= 1 + stepUpPercent;
    }
    const yearFees = Math.max(0, theoreticalGross - balance);

    schedule.push({
      year: y,
      monthlyDeposit: parseFloat(monthlyDeposit.toFixed(2)),
      annualContributions: parseFloat(yearContributions.toFixed(2)),
      cumulativeInvested: parseFloat(totalInvested.toFixed(2)),
      endingBalance: parseFloat(balance.toFixed(2)),
      totalFees: parseFloat(yearFees.toFixed(2)),
    });

    // Step up monthly deposit for next year
    monthlyDeposit *= 1 + stepUpPercent;
  }

  const endingBalance = parseFloat(balance.toFixed(2));
  const totalProfit = parseFloat((endingBalance - totalInvested).toFixed(2));
  const netIrr = solveNetIRR(initial, monthlyCashFlows, endingBalance, totalYears * 12);
  const totalFees = schedule.length > 0 ? schedule[schedule.length - 1].totalFees : 0;

  return {
    endingBalance,
    totalInvested: parseFloat(totalInvested.toFixed(2)),
    totalProfit,
    netIrr,
    totalFees: parseFloat(totalFees.toFixed(2)),
    schedule,
  };
}

/**
 * 4. Contingent Deferred Sales Charge (CDSC) Taper Schedule
 */
export function calculateCdscSchedule(inputs: CdscInputs): CdscResult {
  const initial = Math.max(0, inputs.initialInvestment || 10000);
  const yearsHeld = Math.max(1, Math.min(10, inputs.yearsHeld || 3));
  const annualReturn = (inputs.expectedAnnualReturn || 0) / 100;
  const expRatio = (inputs.expenseRatio || 0) / 100;
  const netRate = Math.max(-0.99, annualReturn - expRatio);

  const defaultTaper = [
    { year: 1, feePercent: 5.0 },
    { year: 2, feePercent: 4.0 },
    { year: 3, feePercent: 3.0 },
    { year: 4, feePercent: 2.0 },
    { year: 5, feePercent: 1.0 },
    { year: 6, feePercent: 0.0 },
  ];

  const taper = inputs.taperSchedule && inputs.taperSchedule.length > 0 ? inputs.taperSchedule : defaultTaper;

  const schedule: CdscScheduleRow[] = taper.map((item) => {
    const grossVal = initial * Math.pow(1 + netRate, item.year);
    // CDSC is lesser of original purchase cost or current market value
    const base = Math.min(initial, grossVal);
    const penalty = base * (item.feePercent / 100);
    const netCash = grossVal - penalty;

    return {
      year: item.year,
      cdscRate: item.feePercent,
      projectedGrossValue: parseFloat(grossVal.toFixed(2)),
      exitPenaltyDollar: parseFloat(penalty.toFixed(2)),
      netPayoutToInvestor: parseFloat(netCash.toFixed(2)),
    };
  });

  const selectedRow = schedule.find((s) => s.year === yearsHeld) || schedule[schedule.length - 1];

  return {
    holdingYearSelected: yearsHeld,
    applicableCdscPercent: selectedRow.cdscRate,
    estimatedGrossValue: selectedRow.projectedGrossValue,
    redemptionPenalty: selectedRow.exitPenaltyDollar,
    netCashReceived: selectedRow.netPayoutToInvestor,
    schedule,
  };
}

/**
 * 5. Real Inflation-Adjusted & Capital Gains Tax Estimator
 */
export function calculateInflationAndTax(inputs: InflationTaxInputs): InflationTaxResult {
  const baseRes = calculateStandardMutualFund({
    initialInvestment: inputs.initialInvestment,
    monthlyContribution: inputs.monthlyContribution,
    annualContribution: 0,
    expectedAnnualReturn: inputs.expectedGrossReturn,
    holdingYears: inputs.holdingYears,
    holdingMonths: 0,
    frontEndLoad: 0,
    deferredBackEndLoad: 0,
    expenseRatio: inputs.expenseRatio,
  });

  const nominalEndingValue = baseRes.endingValue;
  const totalPrincipal = baseRes.totalPrincipal;
  const nominalProfit = Math.max(0, nominalEndingValue - totalPrincipal);

  const taxRate = Math.max(0, Math.min(1, (inputs.capitalGainsTaxRate || 0) / 100));
  const inflationRate = Math.max(0, (inputs.annualInflationRate || 0) / 100);

  const estimatedTaxAmount = nominalProfit * taxRate;
  const afterTaxEndingBalance = nominalEndingValue - estimatedTaxAmount;

  // Real purchasing power: After-Tax Balance / (1 + inflation)^years
  const inflationFactor = Math.pow(1 + inflationRate, inputs.holdingYears);
  const realPurchasingPowerBalance = inflationFactor > 0 ? afterTaxEndingBalance / inflationFactor : afterTaxEndingBalance;
  const inflationPurchasingPowerLoss = Math.max(0, afterTaxEndingBalance - realPurchasingPowerBalance);

  return {
    nominalEndingValue: parseFloat(nominalEndingValue.toFixed(2)),
    totalPrincipal: parseFloat(totalPrincipal.toFixed(2)),
    nominalProfit: parseFloat(nominalProfit.toFixed(2)),
    estimatedTaxAmount: parseFloat(estimatedTaxAmount.toFixed(2)),
    afterTaxEndingBalance: parseFloat(afterTaxEndingBalance.toFixed(2)),
    realPurchasingPowerBalance: parseFloat(realPurchasingPowerBalance.toFixed(2)),
    inflationPurchasingPowerLoss: parseFloat(inflationPurchasingPowerLoss.toFixed(2)),
  };
}

/**
 * 6. Target Wealth & Retirement Goal Solver (Reverse Mutual Fund Calculator)
 */
export function calculateTargetGoal(inputs: TargetGoalInputs): TargetGoalResult {
  const target = Math.max(1, inputs.targetWealth || 1000000);
  const years = Math.max(0.5, inputs.timeHorizonYears || 20);
  const totalMonths = years * 12;
  const grossReturn = (inputs.expectedGrossReturn || 0) / 100;
  const expRatio = (inputs.expenseRatio || 0) / 100;
  const frontLoad = (inputs.frontEndLoad || 0) / 100;

  const netRate = Math.max(-0.99, grossReturn - expRatio);
  const monthlyRate = Math.pow(1 + netRate, 1 / 12) - 1;

  if (inputs.solveFor === "lumpSum") {
    // FV = Initial * (1 - frontLoad) * (1 + netRate)^years
    // Initial = Target / [ (1 - frontLoad) * (1 + netRate)^years ]
    const growthMultiplier = Math.pow(1 + netRate, years) * (1 - frontLoad);
    const requiredLumpSum = growthMultiplier > 0 ? target / growthMultiplier : target;
    const totalInvested = requiredLumpSum;
    const totalProfit = target - totalInvested;
    const theoreticalGross = requiredLumpSum * Math.pow(1 + grossReturn, years);
    const totalEstimatedFees = Math.max(0, theoreticalGross - target + requiredLumpSum * frontLoad);

    return {
      targetWealth: parseFloat(target.toFixed(2)),
      requiredAmount: parseFloat(requiredLumpSum.toFixed(2)),
      solveFor: "lumpSum",
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      totalProfit: parseFloat(totalProfit.toFixed(2)),
      totalEstimatedFees: parseFloat(totalEstimatedFees.toFixed(2)),
    };
  } else {
    // FV = Monthly * (1 - frontLoad) * [ ((1 + monthlyRate)^months - 1) / monthlyRate ]
    // Monthly = Target / [ (1 - frontLoad) * AnnuityFactor ]
    let annuityFactor = totalMonths;
    if (monthlyRate !== 0) {
      annuityFactor = (Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate;
    }
    const effectiveFactor = annuityFactor * (1 - frontLoad);
    const requiredMonthly = effectiveFactor > 0 ? target / effectiveFactor : target / totalMonths;
    const totalInvested = requiredMonthly * totalMonths;
    const totalProfit = target - totalInvested;

    const grossMonthlyRate = Math.pow(1 + grossReturn, 1 / 12) - 1;
    let grossAnnuity = totalMonths;
    if (grossMonthlyRate !== 0) {
      grossAnnuity = (Math.pow(1 + grossMonthlyRate, totalMonths) - 1) / grossMonthlyRate;
    }
    const theoreticalGross = requiredMonthly * grossAnnuity;
    const totalEstimatedFees = Math.max(0, theoreticalGross - target + totalInvested * frontLoad);

    return {
      targetWealth: parseFloat(target.toFixed(2)),
      requiredAmount: parseFloat(requiredMonthly.toFixed(2)),
      solveFor: "monthly",
      totalInvested: parseFloat(totalInvested.toFixed(2)),
      totalProfit: parseFloat(totalProfit.toFixed(2)),
      totalEstimatedFees: parseFloat(totalEstimatedFees.toFixed(2)),
    };
  }
}
