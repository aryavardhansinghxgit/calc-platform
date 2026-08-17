import {
  HomeEquityInput,
  HomeEquityResult,
  CLTVSolverInput,
  CLTVSolverResult,
  LoanVsHelocVsRefiInput,
  LoanVsHelocVsRefiResult,
  DebtConsolidationInput,
  DebtConsolidationResult,
  ImprovementROIInput,
  ImprovementROIResult,
  PrepaymentInput,
  PrepaymentResult,
  EquityDTIInput,
  EquityDTIResult,
  TaxDeductionInput,
  TaxDeductionResult,
  AmortizationRow,
} from "./types";

export function calculateHomeEquityLoan(input: HomeEquityInput): HomeEquityResult {
  const {
    calcMode = "amount",
    homeValue = 500000,
    currentMortgageBalance = 275000,
    cltvLimitPct = 80,
    loanAmount = 125000,
    loanTermYears = 15,
    interestRate = 8.0,
    closingCostsAmount = 2500,
    closingCostTreatment = "upfront",
  } = input;

  const maxTotalDebt = (homeValue * cltvLimitPct) / 100;
  const maxBorrowableEquity = Math.max(0, maxTotalDebt - currentMortgageBalance);

  let desiredLoan = loanAmount;
  if (calcMode === "max_ltv") {
    desiredLoan = maxBorrowableEquity;
  }

  const actualLoanAmount = Math.min(desiredLoan, maxBorrowableEquity);
  const currentLtvPct = homeValue > 0 ? (currentMortgageBalance / homeValue) * 100 : 0;

  let netProceedsDisbursed = actualLoanAmount;
  let totalFinancedLoanAmount = actualLoanAmount;

  if (closingCostTreatment === "deducted") {
    netProceedsDisbursed = Math.max(0, actualLoanAmount - closingCostsAmount);
    totalFinancedLoanAmount = actualLoanAmount;
  } else if (closingCostTreatment === "financed") {
    netProceedsDisbursed = actualLoanAmount;
    totalFinancedLoanAmount = actualLoanAmount + closingCostsAmount;
  }

  const newCltvPct =
    homeValue > 0
      ? ((currentMortgageBalance + totalFinancedLoanAmount) / homeValue) * 100
      : 0;

  const unencumberedEquity = Math.max(0, homeValue - (currentMortgageBalance + totalFinancedLoanAmount));

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPayment =
    totalFinancedLoanAmount > 0 && monthlyRate > 0 && totalMonths > 0
      ? (totalFinancedLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const totalRepayment = Math.round(monthlyPayment * totalMonths);
  const totalInterestPaid = Math.max(0, totalRepayment - totalFinancedLoanAmount);
  const totalCostOfLoan = Math.round(totalRepayment + (closingCostTreatment === "upfront" ? closingCostsAmount : 0));

  let trueApr = interestRate;
  if (closingCostsAmount > 0 && netProceedsDisbursed > 0) {
    const feeEffect = (closingCostsAmount / netProceedsDisbursed / loanTermYears) * 100;
    trueApr = Number((interestRate + feeEffect * 0.75).toFixed(2));
  }

  // Build Monthly and Annual Amortization Schedules
  const monthlyAmortization: AmortizationRow[] = [];
  const annualAmortization: AmortizationRow[] = [];

  let balance = totalFinancedLoanAmount;
  let currentYear = 1;
  let yearBeginningBalance = balance;
  let yearInterestAcc = 0;
  let yearPrincipalAcc = 0;
  let yearPaymentAcc = 0;

  for (let m = 1; m <= totalMonths; m++) {
    if (balance <= 0.01) break;

    const mInterest = balance * monthlyRate;
    let mPmt = monthlyPayment;
    if (mPmt > balance + mInterest) mPmt = balance + mInterest;

    const mPrincipal = Math.min(balance, mPmt - mInterest);
    const endingBal = Math.max(0, balance - mPrincipal);

    monthlyAmortization.push({
      period: m,
      dateLabel: `Month ${m}`,
      beginningBalance: Math.round(balance),
      payment: Math.round(mPmt),
      principal: Math.round(mPrincipal),
      interest: Math.round(mInterest),
      endingBalance: Math.round(endingBal),
    });

    yearInterestAcc += mInterest;
    yearPrincipalAcc += mPrincipal;
    yearPaymentAcc += mPmt;

    if (m % 12 === 0 || m === totalMonths || endingBal <= 0.01) {
      annualAmortization.push({
        period: currentYear,
        dateLabel: `Year ${currentYear}`,
        beginningBalance: Math.round(yearBeginningBalance),
        payment: Math.round(yearPaymentAcc),
        principal: Math.round(yearPrincipalAcc),
        interest: Math.round(yearInterestAcc),
        endingBalance: Math.round(endingBal),
      });
      currentYear++;
      yearBeginningBalance = endingBal;
      yearInterestAcc = 0;
      yearPrincipalAcc = 0;
      yearPaymentAcc = 0;
    }

    balance = endingBal;
  }

  return {
    maxBorrowableEquity: Math.round(maxBorrowableEquity),
    actualLoanAmount: Math.round(actualLoanAmount),
    currentLtvPct: Number(currentLtvPct.toFixed(1)),
    newCltvPct: Number(newCltvPct.toFixed(1)),
    unencumberedEquity: Math.round(unencumberedEquity),
    totalFinancedLoanAmount: Math.round(totalFinancedLoanAmount),
    monthlyPayment: Math.round(monthlyPayment),
    netProceedsDisbursed: Math.round(netProceedsDisbursed),
    totalRepayment,
    totalInterestPaid,
    totalCostOfLoan,
    trueApr,
    annualAmortization,
    monthlyAmortization,
  };
}

export function calculateCLTVSolver(input: CLTVSolverInput): CLTVSolverResult {
  const { homeValue = 500000, currentMortgageBalance = 275000, cltvCapPct = 80 } = input;

  const maxAllowableTotalDebt = Math.round((homeValue * cltvCapPct) / 100);
  const maxBorrowableEquity = Math.max(0, maxAllowableTotalDebt - currentMortgageBalance);
  const currentLtv = Number(((currentMortgageBalance / homeValue) * 100).toFixed(1));
  const unencumberedEquity = Math.max(0, homeValue - maxAllowableTotalDebt);

  return {
    maxAllowableTotalDebt,
    maxBorrowableEquity,
    currentLtv,
    cltvCap: cltvCapPct,
    unencumberedEquity,
  };
}

export function calculateLoanVsHelocVsRefi(input: LoanVsHelocVsRefiInput): LoanVsHelocVsRefiResult {
  const {
    homeValue = 500000,
    currentBalance = 275000,
    currentRate = 3.5,
    cashNeeded = 75000,
    fixedEquityRate = 8.0,
    helocRate = 9.25,
    refiRate = 6.75,
  } = input;

  const eqRate = fixedEquityRate / 100 / 12;
  const equityLoanMonthly = Math.round(
    (cashNeeded * eqRate * Math.pow(1 + eqRate, 180)) / (Math.pow(1 + eqRate, 180) - 1)
  );
  const equityLoan5YrCost = Math.round(equityLoanMonthly * 60);
  const equityLoanTotalCost = Math.round(equityLoanMonthly * 180);

  const helocDrawMonthly = Math.round((cashNeeded * (helocRate / 100)) / 12);
  const heloc5YrCost = Math.round(helocDrawMonthly * 60);
  const helocRepayRate = (helocRate + 0.5) / 100 / 12;
  const helocRepayPmt = (cashNeeded * helocRepayRate * Math.pow(1 + helocRepayRate, 180)) / (Math.pow(1 + helocRepayRate, 180) - 1);
  const helocTotalCost = Math.round(helocDrawMonthly * 120 + helocRepayPmt * 180);

  const newRefiBalance = currentBalance + cashNeeded + 4000;
  const refiMonthlyRate = refiRate / 100 / 12;
  const refiNewMonthly = Math.round(
    (newRefiBalance * refiMonthlyRate * Math.pow(1 + refiMonthlyRate, 360)) /
      (Math.pow(1 + refiMonthlyRate, 360) - 1)
  );
  const refi5YrCost = Math.round(refiNewMonthly * 60);
  const refiTotalCost = Math.round(refiNewMonthly * 360);

  let recommendation = "Fixed Home Equity Loan is Best (Preserves your low 1st mortgage interest rate!)";
  if (currentRate >= refiRate) {
    recommendation = "Cash-Out Refinance is Best (Refinancing lowers rate on your entire balance)";
  } else if (cashNeeded < 30000) {
    recommendation = "HELOC is Best (Flexible draw period for smaller short-term expenses)";
  }

  return {
    equityLoanMonthly,
    equityLoan5YrCost,
    equityLoanTotalCost,
    helocDrawMonthly,
    heloc5YrCost,
    helocTotalCost,
    refiNewMonthly,
    refi5YrCost,
    refiTotalCost,
    recommendation,
  };
}

export function calculateDebtConsolidation(input: DebtConsolidationInput): DebtConsolidationResult {
  const {
    creditCardBalance = 25000,
    creditCardRate = 22.0,
    personalLoanBalance = 15000,
    personalLoanRate = 12.0,
    autoLoanBalance = 10000,
    autoLoanRate = 8.0,
    equityLoanRate = 8.5,
    equityLoanTermYears = 5,
  } = input;

  const totalHighInterestDebt = creditCardBalance + personalLoanBalance + autoLoanBalance;

  const ccMonthly = (creditCardBalance * (creditCardRate / 100 / 12)) + creditCardBalance * 0.02;
  const plMonthly = (personalLoanBalance * (personalLoanRate / 100 / 12)) + personalLoanBalance / 36;
  const autoMonthly = (autoLoanBalance * (autoLoanRate / 100 / 12)) + autoLoanBalance / 48;

  const currentCombinedMonthlyPayment = Math.round(ccMonthly + plMonthly + autoMonthly);
  const currentTotalInterestToPay = Math.round(
    (creditCardBalance * 0.22 * 4) + (personalLoanBalance * 0.12 * 3) + (autoLoanBalance * 0.08 * 3)
  );

  const monthlyRate = equityLoanRate / 100 / 12;
  const totalMonths = equityLoanTermYears * 12;

  const newConsolidatedMonthlyPayment = Math.round(
    (totalHighInterestDebt * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const newConsolidatedTotalRepayment = newConsolidatedMonthlyPayment * totalMonths;
  const newConsolidatedInterest = Math.round(newConsolidatedTotalRepayment - totalHighInterestDebt);

  const monthlyCashFlowSavings = Math.max(0, currentCombinedMonthlyPayment - newConsolidatedMonthlyPayment);
  const lifetimeInterestSaved = Math.max(0, currentTotalInterestToPay - newConsolidatedInterest);

  return {
    totalHighInterestDebt,
    currentCombinedMonthlyPayment,
    newConsolidatedMonthlyPayment,
    monthlyCashFlowSavings,
    currentTotalInterestToPay,
    newConsolidatedInterest,
    lifetimeInterestSaved,
  };
}

export function calculateImprovementROI(input: ImprovementROIInput): ImprovementROIResult {
  const {
    currentHomeValue = 450000,
    existingMortgage = 250000,
    projectCost = 50000,
    expectedAppreciationPct = 70,
    loanRate = 8.0,
    loanTermYears = 10,
  } = input;

  const monthlyRate = loanRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPayment = Math.round(
    (projectCost * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const valueAddedToHome = Math.round(projectCost * (expectedAppreciationPct / 100));
  const projectedPostRenovationHomeValue = Math.round(currentHomeValue + valueAddedToHome);
  const newNetHomeEquity = Math.round(projectedPostRenovationHomeValue - (existingMortgage + projectCost));
  const netEquityGain = Math.round(valueAddedToHome - projectCost);

  return {
    renovationLoanAmount: projectCost,
    monthlyPayment,
    valueAddedToHome,
    projectedPostRenovationHomeValue,
    newNetHomeEquity,
    netEquityGain,
  };
}

export function calculatePrepayment(input: PrepaymentInput): PrepaymentResult {
  const { loanAmount = 100000, interestRate = 8.0, loanTermYears = 15, extraMonthlyPayment = 150, extraAnnualLumpSum = 0 } = input;

  const monthlyRate = interestRate / 100 / 12;
  const originalMonths = loanTermYears * 12;
  const basePmt =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, originalMonths)) /
    (Math.pow(1 + monthlyRate, originalMonths) - 1);

  let balance = loanAmount;
  let newMonths = 0;
  let newTotalInterest = 0;

  while (balance > 0.01 && newMonths < originalMonths) {
    newMonths++;
    const mInterest = balance * monthlyRate;
    let pay = basePmt + extraMonthlyPayment;
    if (newMonths % 12 === 0) pay += extraAnnualLumpSum;

    if (pay > balance + mInterest) pay = balance + mInterest;
    const principalPaid = pay - mInterest;
    newTotalInterest += mInterest;
    balance = Math.max(0, balance - principalPaid);
  }

  const originalTotalInterest = basePmt * originalMonths - loanAmount;
  const monthsSaved = Math.max(0, originalMonths - newMonths);
  const yearsSaved = Number((monthsSaved / 12).toFixed(1));
  const interestSaved = Math.max(0, Math.round(originalTotalInterest - newTotalInterest));

  return {
    originalMonths,
    newMonths,
    monthsSaved,
    yearsSaved,
    interestSaved,
  };
}

export function calculateEquityDTI(input: EquityDTIInput): EquityDTIResult {
  const { grossMonthlyIncome = 8500, proposedHousingPayment = 2500, existingMonthlyDebt = 800 } = input;

  if (grossMonthlyIncome <= 0) {
    return {
      frontEndDTI: 0,
      backEndDTI: 0,
      statusColor: "red",
      statusText: "Invalid Income Input",
    };
  }

  const frontEndDTI = Number(((proposedHousingPayment / grossMonthlyIncome) * 100).toFixed(1));
  const totalDebt = proposedHousingPayment + existingMonthlyDebt;
  const backEndDTI = Number(((totalDebt / grossMonthlyIncome) * 100).toFixed(1));

  let statusColor: "green" | "yellow" | "red" = "green";
  let statusText = "Excellent DTI (Under 36% Benchmark)";

  if (backEndDTI > 43.0) {
    statusColor = "red";
    statusText = "Exceeds Standard 43% DTI Cap (High Risk)";
  } else if (backEndDTI > 36.0) {
    statusColor = "yellow";
    statusText = "Moderate DTI (36%–43% Tier)";
  }

  return {
    frontEndDTI,
    backEndDTI,
    statusColor,
    statusText,
  };
}

export function calculateTaxDeduction(input: TaxDeductionInput): TaxDeductionResult {
  const { annualInterestPaid = 8000, isUsedForHomeImprovement = true, marginalTaxBracketPct = 24 } = input;

  if (!isUsedForHomeImprovement) {
    return {
      isDeductible: false,
      projectedAnnualTaxSavings: 0,
      effectiveInterestRate: 8.0,
      statusExplanation: "Not Tax-Deductible (IRS TCJA Rules require proceeds to be used for substantial home improvements).",
    };
  }

  const projectedAnnualTaxSavings = Math.round(annualInterestPaid * (marginalTaxBracketPct / 100));
  const effectiveInterestRate = Number((8.0 * (1 - marginalTaxBracketPct / 100)).toFixed(2));

  return {
    isDeductible: true,
    projectedAnnualTaxSavings,
    effectiveInterestRate,
    statusExplanation: `Tax-Deductible! Projected ${marginalTaxBracketPct}% tax bracket write-off saves ~$${projectedAnnualTaxSavings.toLocaleString()}/yr.`,
  };
}

export function calculateHomeEquityLoanCalculator(inputs: Record<string, any>): Record<string, any> {
  const homeValue = parseFloat(inputs.homeValue) || 500000;
  const currentMortgageBalance = parseFloat(inputs.currentMortgageBalance) || 275000;
  const loanAmount = parseFloat(inputs.loanAmount) || 125000;
  const interestRate = parseFloat(inputs.interestRate) || 8.0;

  const res = calculateHomeEquityLoan({
    calcMode: "amount",
    homeValue,
    currentMortgageBalance,
    cltvLimitPct: 80,
    loanAmount,
    loanTermYears: 15,
    interestRate,
    closingCostsAmount: 2500,
    closingCostTreatment: "upfront",
    currencySymbol: "$",
  });

  return {
    monthlyPayment: `$${res.monthlyPayment.toLocaleString()}`,
    maxBorrowableEquity: `$${res.maxBorrowableEquity.toLocaleString()}`,
    newCltvPct: `${res.newCltvPct}%`,
    totalInterestPaid: `$${res.totalInterestPaid.toLocaleString()}`,
    trueApr: `${res.trueApr}%`,
  };
}
