import { RefinanceInput, RefinanceOutput, RefinanceTimelinePoint } from "./types";
import { PMT } from "@/lib/finance/financial-math";

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

    propertyTaxAnnual = 0,
    insuranceAnnual = 0,
    hoaMonthly = 0,
    pmiMonthly = 0,
    extraMonthlyPayment = 0,
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

    // Amortize to find remaining balance
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

  // Current Loan Remaining Interest
  const currentRemainingInterest = Math.max(0, M1 * N1 - B1);

  // New Loan Calculations
  const r2 = Math.max(0, newInterestRate) / 100 / 12;
  const N2 = Math.max(1, Math.round(newLoanTermYears * 12));

  const newBasePrincipal = B1 + Math.max(0, cashOutAmount);
  const pointsCost = newBasePrincipal * (Math.max(0, discountPoints) / 100);
  const upfrontFees = Math.max(0, closingCosts) + pointsCost;
  const newLoanAmount = newBasePrincipal;

  let M2 = newLoanAmount / N2;
  if (r2 > 0) {
    M2 = (newLoanAmount * (r2 * Math.pow(1 + r2, N2))) / (Math.pow(1 + r2, N2) - 1);
  }

  const newLoanTotalInterest = Math.max(0, M2 * N2 - newLoanAmount);

  // Comparisons
  const monthlySavings = M1 - M2;
  const monthlySavingsPercent = M1 > 0 ? (monthlySavings / M1) * 100 : 0;
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
  const totalCostReduction = (M1 * N1) - (M2 * N2 + upfrontFees);
  const interestReductionPercent = currentRemainingInterest > 0
    ? ((currentRemainingInterest - newLoanTotalInterest) / currentRemainingInterest) * 100
    : 0;

  // Recommendation Engine
  const isRecommended = monthlySavings > 0 && netSavings > 0 && breakEvenMonths <= N2;
  const recommendationReasons: string[] = [];

  if (isRecommended) {
    if (monthlySavings > 0) {
      recommendationReasons.push(`Lower monthly payment saves $${Math.round(monthlySavings).toLocaleString()} / month (${monthlySavingsPercent.toFixed(1)}% reduction)`);
    }
    if (interestSaved > 0) {
      recommendationReasons.push(`Total lifetime interest savings of $${Math.round(interestSaved).toLocaleString()}`);
    }
    if (breakEvenMonths <= N2) {
      recommendationReasons.push(`Break-even point achieved in ${breakEvenMonths} months (${breakEvenYears} years)`);
    }
  } else {
    if (monthlySavings <= 0) {
      recommendationReasons.push(`New monthly payment is higher by $${Math.abs(Math.round(monthlySavings)).toLocaleString()} / month`);
    }
    if (upfrontFees > interestSaved) {
      recommendationReasons.push(`Upfront fees ($${Math.round(upfrontFees).toLocaleString()}) exceed lifetime interest savings ($${Math.round(interestSaved).toLocaleString()})`);
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
    closingCosts: Math.max(0, closingCosts),
    pointsCost,
    cashOutAmount: Math.max(0, cashOutAmount),
    totalRefinanceCost,
    breakEvenMonths,
    breakEvenYears,
    interestSaved,
    netSavings,
    totalCostReduction: Math.round(totalCostReduction),
    interestReductionPercent: Number(interestReductionPercent.toFixed(1)),
    isRecommended,
    recommendationReasons,
    timelineData,
  };
}
