import {
  RefinanceInput,
  RefinanceOutput,
  RefinanceTimelinePoint,
  AmortizationComparisonRow,
  ItemizedClosingCosts,
  ConsolidatedDebtItem,
} from "./types";

export function calculateRefinanceModule(inputs: RefinanceInput): RefinanceOutput {
  const {
    currentLoanMode = "remaining-balance",
    remainingBalance = 250000,
    originalLoanAmount = 300000,
    originalLoanTermYears = 30,
    yearsPaid = 5,
    payoffAmount = 250000,
    currentMonthlyPayment = 1800,
    currentInterestRate = 7.0,

    newLoanTermYears = 20,
    newInterestRate = 6.0,
    discountPoints = 2,
    closingCosts = 1500,
    cashOutAmount = 0,

    homeMarketValue = 400000,
    maxLtvPercent = 80,
    consolidatedDebts = [],
    refinanceGoal = "reduce-payment",
    itemizedCosts = {},
  } = inputs;

  const r1 = Math.max(0, currentInterestRate) / 100 / 12;
  let B1 = 250000;
  let M1 = Math.max(0, currentMonthlyPayment);
  let N1 = 25 * 12; // 25 years default remaining

  if (currentLoanMode === "remaining-balance") {
    B1 = Math.max(0, remainingBalance);
    if (r1 > 0 && M1 > B1 * r1) {
      N1 = Math.round(Math.log(M1 / (M1 - B1 * r1)) / Math.log(1 + r1));
    }
  } else if (currentLoanMode === "original-amount") {
    const P0 = Math.max(0, originalLoanAmount);
    const N0 = Math.max(1, Math.round(originalLoanTermYears * 12));
    const paidMos = Math.max(0, Math.round(yearsPaid * 12));

    let pmt0 = P0 / N0;
    if (r1 > 0) {
      pmt0 = (P0 * (r1 * Math.pow(1 + r1, N0))) / (Math.pow(1 + r1, N0) - 1);
    }
    M1 = pmt0;
    N1 = Math.max(1, N0 - paidMos);

    let curB = P0;
    for (let m = 1; m <= paidMos && curB > 0; m++) {
      const interest = curB * r1;
      const prin = pmt0 - interest;
      curB = Math.max(0, curB - prin);
    }
    B1 = curB;
  } else if (currentLoanMode === "payoff-amount") {
    B1 = Math.max(0, payoffAmount);
    if (r1 > 0 && M1 > B1 * r1) {
      N1 = Math.round(Math.log(M1 / (M1 - B1 * r1)) / Math.log(1 + r1));
    }
  }

  // Calculate Itemized Closing Costs Total
  const itemizedTotal =
    (itemizedCosts.applicationFee ?? 0) +
    (itemizedCosts.appraisalFee ?? 0) +
    (itemizedCosts.originationFee ?? 0) +
    (itemizedCosts.titleFee ?? 0) +
    (itemizedCosts.recordingFee ?? 0) +
    (itemizedCosts.inspectionFee ?? 0) +
    (itemizedCosts.surveyFee ?? 0) +
    (itemizedCosts.customFee ?? 0);

  const effectiveClosingCosts = itemizedTotal > 0 ? itemizedTotal : Math.max(0, closingCosts);

  // Current Loan Remaining Interest
  const currentRemainingInterest = Math.max(0, M1 * N1 - B1);

  // Debt Consolidation Calculations
  let totalConsolidatedDebt = 0;
  let consolidatedMonthlyPayment = 0;
  let weightedInterestSum = 0;

  consolidatedDebts.forEach((d) => {
    totalConsolidatedDebt += Math.max(0, d.balance);
    consolidatedMonthlyPayment += Math.max(0, d.monthlyPayment);
    weightedInterestSum += Math.max(0, d.balance) * Math.max(0, d.interestRate);
  });

  const blendedInterestRate =
    totalConsolidatedDebt > 0 ? weightedInterestSum / totalConsolidatedDebt : 0;

  // New Loan Calculations
  const r2 = Math.max(0, newInterestRate) / 100 / 12;
  const N2 = Math.max(1, Math.round(newLoanTermYears * 12));

  const newBasePrincipal = B1 + Math.max(0, cashOutAmount) + totalConsolidatedDebt;
  const pointsCost = newBasePrincipal * (Math.max(0, discountPoints) / 100);
  const upfrontFees = effectiveClosingCosts + pointsCost;
  const newLoanAmount = newBasePrincipal;

  let M2 = newLoanAmount / N2;
  if (r2 > 0) {
    M2 = (newLoanAmount * (r2 * Math.pow(1 + r2, N2))) / (Math.pow(1 + r2, N2) - 1);
  }

  const newLoanTotalInterest = Math.max(0, M2 * N2 - newLoanAmount);

  // Cash-Out & Equity Metrics
  const marketVal = Math.max(1, homeMarketValue);
  const availableEquity = Math.max(0, marketVal - B1);
  const maxBorrowableAmount = Math.max(0, marketVal * (Math.min(100, maxLtvPercent) / 100));
  const cashReceived = Math.max(0, newLoanAmount - B1 - totalConsolidatedDebt - upfrontFees);
  const newLtvRatio = Number(((newLoanAmount / marketVal) * 100).toFixed(1));

  // Comparisons
  const monthlySavings = M1 - M2;
  const monthlySavingsPercent = M1 > 0 ? (monthlySavings / M1) * 100 : 0;
  const debtConsolidationMonthlySavings = (M1 + consolidatedMonthlyPayment) - M2;

  const interestSaved = currentRemainingInterest - newLoanTotalInterest;
  const totalRefinanceCost = upfrontFees + Math.max(0, cashOutAmount);
  const netSavings = interestSaved - upfrontFees;

  let breakEvenMonths = 0;
  if (monthlySavings > 0) {
    breakEvenMonths = Math.ceil(upfrontFees / monthlySavings);
  } else {
    breakEvenMonths = 999;
  }

  const breakEvenYears = Number((breakEvenMonths / 12).toFixed(1));
  const totalCostReduction = M1 * N1 - (M2 * N2 + upfrontFees);
  const interestReductionPercent =
    currentRemainingInterest > 0
      ? ((currentRemainingInterest - newLoanTotalInterest) / currentRemainingInterest) * 100
      : 0;

  // -------------------------------------------------------------
  // REFINANCE SCORE ALGORITHM (0 - 100)
  // -------------------------------------------------------------
  let scorePmt = 0;
  if (monthlySavingsPercent >= 20) scorePmt = 25;
  else if (monthlySavingsPercent >= 10) scorePmt = 20;
  else if (monthlySavingsPercent > 0) scorePmt = 15;
  else if (monthlySavingsPercent >= -5) scorePmt = 5;

  let scoreSavings = 0;
  if (netSavings >= 30000) scoreSavings = 25;
  else if (netSavings >= 15000) scoreSavings = 20;
  else if (netSavings >= 5000) scoreSavings = 15;
  else if (netSavings > 0) scoreSavings = 10;

  let scoreBreakEven = 0;
  if (breakEvenMonths <= 24) scoreBreakEven = 25;
  else if (breakEvenMonths <= 36) scoreBreakEven = 20;
  else if (breakEvenMonths <= 60) scoreBreakEven = 12;
  else if (breakEvenMonths <= 96) scoreBreakEven = 5;

  let scoreGoal = 15;
  if (refinanceGoal === "reduce-payment" && monthlySavings > 0) scoreGoal = 25;
  else if (refinanceGoal === "reduce-interest" && interestSaved > 0) scoreGoal = 25;
  else if (refinanceGoal === "shorten-loan" && N2 < N1) scoreGoal = 25;
  else if (refinanceGoal === "access-equity" && cashOutAmount > 0 && newLtvRatio <= 80) scoreGoal = 25;
  else if (refinanceGoal === "consolidate-debt" && debtConsolidationMonthlySavings > 0) scoreGoal = 25;

  const rawScore = scorePmt + scoreSavings + scoreBreakEven + scoreGoal;
  const refinanceScore = Math.min(100, Math.max(0, Math.round(rawScore)));

  let refinanceRating: "Excellent" | "Good" | "Average" | "Poor" = "Poor";
  if (refinanceScore >= 85) refinanceRating = "Excellent";
  else if (refinanceScore >= 70) refinanceRating = "Good";
  else if (refinanceScore >= 50) refinanceRating = "Average";

  const isRecommended = refinanceScore >= 60;

  // Recommendation Reasons
  const recommendationReasons: string[] = [];
  if (isRecommended) {
    if (monthlySavings > 0) {
      recommendationReasons.push(
        `Lower monthly payment saves $${Math.round(monthlySavings).toLocaleString()} / month (${monthlySavingsPercent.toFixed(1)}% reduction)`
      );
    }
    if (interestSaved > 0) {
      recommendationReasons.push(
        `Total lifetime interest savings of $${Math.round(interestSaved).toLocaleString()}`
      );
    }
    if (breakEvenMonths <= N2) {
      recommendationReasons.push(`Break-even point achieved in ${breakEvenMonths} months (${breakEvenYears} years)`);
    }
    if (refinanceGoal === "consolidate-debt" && debtConsolidationMonthlySavings > 0) {
      recommendationReasons.push(`Consolidating high-interest debts saves $${Math.round(debtConsolidationMonthlySavings).toLocaleString()} / month`);
    }
  } else {
    if (monthlySavings <= 0) {
      recommendationReasons.push(`New monthly payment is higher by $${Math.abs(Math.round(monthlySavings)).toLocaleString()} / month`);
    }
    if (upfrontFees > interestSaved) {
      recommendationReasons.push(
        `Upfront fees ($${Math.round(upfrontFees).toLocaleString()}) exceed lifetime interest savings ($${Math.round(interestSaved).toLocaleString()})`
      );
    }
    if (breakEvenMonths > N2) {
      recommendationReasons.push(`Break-even timeline (${breakEvenMonths} mos) exceeds the new loan term (${N2} mos)`);
    }
  }

  // Generate Timeline Data for Break-Even Chart
  const timelineData: RefinanceTimelinePoint[] = [];
  const maxMos = Math.min(120, Math.max(48, breakEvenMonths + 24));
  let curCumulativeCurrent = 0;
  let curCumulativeNew = upfrontFees;

  for (let m = 1; m <= maxMos; m += 3) {
    curCumulativeCurrent = M1 * m;
    curCumulativeNew = upfrontFees + M2 * m;
    const netDiff = curCumulativeCurrent - curCumulativeNew;

    timelineData.push({
      month: m,
      currentPaid: Math.round(curCumulativeCurrent),
      newPaid: Math.round(curCumulativeNew),
      netDifference: Math.round(netDiff),
    });
  }

  // Generate Side-by-Side Amortization Comparison Schedule (up to 360 months)
  const amortizationComparisonSchedule: AmortizationComparisonRow[] = [];
  let curB1 = B1;
  let curB2 = newLoanAmount;
  const maxScheduleMonths = Math.max(N1, N2);

  for (let m = 1; m <= maxScheduleMonths; m++) {
    // Current Loan Row
    let curInt1 = 0;
    let curPrin1 = 0;
    if (curB1 > 0 && m <= N1) {
      curInt1 = curB1 * r1;
      curPrin1 = M1 - curInt1;
      if (curPrin1 > curB1) curPrin1 = curB1;
      curB1 = Math.max(0, curB1 - curPrin1);
    }

    // New Loan Row
    let curInt2 = 0;
    let curPrin2 = 0;
    if (curB2 > 0 && m <= N2) {
      curInt2 = curB2 * r2;
      curPrin2 = M2 - curInt2;
      if (curPrin2 > curB2) curPrin2 = curB2;
      curB2 = Math.max(0, curB2 - curPrin2);
    }

    amortizationComparisonSchedule.push({
      month: m,
      currentPayment: m <= N1 ? M1 : 0,
      currentPrincipal: curPrin1,
      currentInterest: curInt1,
      currentBalance: curB1,
      newPayment: m <= N2 ? M2 : 0,
      newPrincipal: curPrin2,
      newInterest: curInt2,
      newBalance: curB2,
    });
  }

  // Generate AI Insights
  const benefits: string[] = [];
  const risks: string[] = [];

  if (monthlySavings > 0) {
    benefits.push(`Reduces monthly cash obligations by $${Math.round(monthlySavings).toLocaleString()} every month.`);
  }
  if (interestSaved > 0) {
    benefits.push(`Saves $${Math.round(interestSaved).toLocaleString()} in total lifetime interest charges.`);
  }
  if (cashOutAmount > 0) {
    benefits.push(`Extracts $${Math.round(cashOutAmount).toLocaleString()} in cash equity for home improvements or debt payoff.`);
  }
  if (totalConsolidatedDebt > 0) {
    benefits.push(`Consolidates $${Math.round(totalConsolidatedDebt).toLocaleString()} of high-interest debt into a lower mortgage rate.`);
  }

  if (upfrontFees > 0) {
    risks.push(`Requires $${Math.round(upfrontFees).toLocaleString()} in upfront closing costs and points.`);
  }
  if (N2 > N1) {
    risks.push(`Extends your loan payoff timeline by ${Math.round((N2 - N1) / 12)} years.`);
  }
  if (newLtvRatio > 80) {
    risks.push(`New LTV ratio is ${newLtvRatio}%, which may require mandatory PMI mortgage insurance.`);
  }

  const aiSummary = isRecommended
    ? `Refinancing is highly advantageous with an ${refinanceRating} Refinance Score of ${refinanceScore}/100. Your break-even period is ${breakEvenMonths} months with a net financial benefit of $${Math.round(netSavings).toLocaleString()}.`
    : `Refinancing carries a ${refinanceRating} Refinance Score of ${refinanceScore}/100. Upfront refinancing fees or extended loan terms outweigh immediate payment benefits.`;

  return {
    currentRemainingBalance: B1,
    currentMonthlyPayment: M1,
    currentRemainingInterest,
    currentRemainingMonths: N1,
    newLoanAmount,
    newMonthlyPayment: M2,
    newLoanTotalInterest,
    monthlySavings,
    monthlySavingsPercent: Number(monthlySavingsPercent.toFixed(1)),
    closingCosts: effectiveClosingCosts,
    pointsCost,
    itemizedTotalCosts: itemizedTotal,
    cashOutAmount: Math.max(0, cashOutAmount),
    totalRefinanceCost,
    breakEvenMonths,
    breakEvenYears,
    interestSaved,
    netSavings,
    totalCostReduction: Math.round(totalCostReduction),
    interestReductionPercent: Number(interestReductionPercent.toFixed(1)),
    refinanceScore,
    refinanceRating,
    isRecommended,
    recommendationReasons,
    availableEquity,
    maxBorrowableAmount,
    cashReceived,
    newLtvRatio,
    totalConsolidatedDebt,
    consolidatedMonthlyPayment,
    blendedInterestRate: Number(blendedInterestRate.toFixed(2)),
    debtConsolidationMonthlySavings: Math.round(debtConsolidationMonthlySavings),
    timelineData,
    amortizationComparisonSchedule,
    aiInsights: {
      summary: aiSummary,
      benefits,
      risks,
    },
  };
}
