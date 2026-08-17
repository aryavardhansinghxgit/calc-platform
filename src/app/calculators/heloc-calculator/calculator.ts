import {
  HELOCInput,
  HELOCResult,
  StressTestInput,
  StressTestResult,
  MultiDrawInput,
  MultiDrawResult,
  HelocVsLoanVsRefiInput,
  HelocVsLoanVsRefiResult,
  HelocDebtConsolidationInput,
  HelocDebtConsolidationResult,
  HelocTaxInput,
  HelocTaxResult,
  AmortizationRow,
} from "./types";

export function calculateHELOC(input: HELOCInput): HELOCResult {
  const {
    homeValue = 500000,
    currentMortgageBalance = 260000,
    cltvLimitPct = 80,
    creditLineAmount = 50000,
    drawPeriodYears = 10,
    drawPaymentStructure = "interest_only",
    repaymentPeriodYears = 20,
    interestRate = 8.0,
    closingCostsAmount = 2000,
    closingCostTreatment = "upfront",
    annualMaintenanceFee = 50,
  } = input;

  const maxTotalDebt = (homeValue * cltvLimitPct) / 100;
  const maxBorrowableCreditLine = Math.max(0, maxTotalDebt - currentMortgageBalance);
  const actualCreditLine = Math.min(creditLineAmount, maxBorrowableCreditLine > 0 ? maxBorrowableCreditLine : creditLineAmount);

  const initialCltvPct = homeValue > 0 ? Number(((currentMortgageBalance / homeValue) * 100).toFixed(1)) : 0;
  const fullyDrawnCltvPct = homeValue > 0 ? Number((((currentMortgageBalance + actualCreditLine) / homeValue) * 100).toFixed(1)) : 0;
  const unencumberedEquity = Math.max(0, homeValue - (currentMortgageBalance + actualCreditLine));

  const monthlyRate = interestRate / 100 / 12;
  const drawMonths = drawPeriodYears * 12;
  const repayMonths = repaymentPeriodYears * 12;
  const totalMonths = drawMonths + repayMonths;

  // Draw Period Monthly Payment
  let drawPeriodMonthlyPayment = 0;
  if (drawPaymentStructure === "interest_only") {
    drawPeriodMonthlyPayment = actualCreditLine * monthlyRate;
  } else {
    // Principal + Interest during draw (e.g. 1.5% of balance or standard P&I)
    const drawPmtPI = (actualCreditLine * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    drawPeriodMonthlyPayment = Math.max(actualCreditLine * 0.015, drawPmtPI);
  }

  // Repayment Period Monthly Payment (Full amortization of remaining balance over repayment period)
  const repaymentPeriodMonthlyPayment =
    actualCreditLine > 0 && monthlyRate > 0 && repayMonths > 0
      ? (actualCreditLine * monthlyRate * Math.pow(1 + monthlyRate, repayMonths)) /
        (Math.pow(1 + monthlyRate, repayMonths) - 1)
      : 0;

  const paymentShockDollarIncrease = Math.max(0, repaymentPeriodMonthlyPayment - drawPeriodMonthlyPayment);
  const paymentShockPctIncrease =
    drawPeriodMonthlyPayment > 0
      ? Number(((paymentShockDollarIncrease / drawPeriodMonthlyPayment) * 100).toFixed(1))
      : 0;

  const totalDrawPeriodPayments = drawPeriodMonthlyPayment * drawMonths;
  const totalRepaymentPeriodPayments = repaymentPeriodMonthlyPayment * repayMonths;
  const totalLifetimePayments = Math.round(totalDrawPeriodPayments + totalRepaymentPeriodPayments);

  const totalAnnualFeesPaid = annualMaintenanceFee * drawPeriodYears;
  const totalInterestPaid = Math.round(totalLifetimePayments - actualCreditLine);

  // Amortization Schedule Generation
  const monthlyAmortization: AmortizationRow[] = [];
  const annualAmortization: AmortizationRow[] = [];

  let balance = actualCreditLine;
  let currentYear = 1;
  let yearBeginningBalance = balance;
  let yearInterestAcc = 0;
  let yearPrincipalAcc = 0;
  let yearPaymentAcc = 0;
  let yearFeesAcc = 0;

  for (let m = 1; m <= totalMonths; m++) {
    if (balance <= 0.01 && m > drawMonths) break;

    const isDrawPhase = m <= drawMonths;
    const phaseLabel = isDrawPhase ? "Draw (Interest-Only)" : "Repayment (Amortizing)";

    const mInterest = balance * monthlyRate;
    let mPmt = 0;
    let mPrincipal = 0;

    if (isDrawPhase) {
      if (drawPaymentStructure === "interest_only") {
        mPmt = mInterest;
        mPrincipal = 0;
      } else {
        mPmt = Math.min(balance + mInterest, drawPeriodMonthlyPayment);
        mPrincipal = Math.max(0, mPmt - mInterest);
      }
    } else {
      mPmt = Math.min(balance + mInterest, repaymentPeriodMonthlyPayment);
      mPrincipal = Math.max(0, mPmt - mInterest);
    }

    const endingBal = Math.max(0, balance - mPrincipal);
    const feeThisMonth = isDrawPhase && m % 12 === 1 ? annualMaintenanceFee : 0;

    monthlyAmortization.push({
      period: m,
      dateLabel: `Month ${m}`,
      phase: phaseLabel,
      beginningBalance: Math.round(balance),
      payment: Math.round(mPmt + feeThisMonth),
      principal: Math.round(mPrincipal),
      interest: Math.round(mInterest),
      annualFee: Math.round(feeThisMonth),
      endingBalance: Math.round(endingBal),
    });

    yearInterestAcc += mInterest;
    yearPrincipalAcc += mPrincipal;
    yearPaymentAcc += (mPmt + feeThisMonth);
    yearFeesAcc += feeThisMonth;

    if (m % 12 === 0 || m === totalMonths || (endingBal <= 0.01 && m > drawMonths)) {
      annualAmortization.push({
        period: currentYear,
        dateLabel: `Year ${currentYear}`,
        phase: currentYear <= drawPeriodYears ? "Draw (Interest-Only)" : "Repayment (Amortizing)",
        beginningBalance: Math.round(yearBeginningBalance),
        payment: Math.round(yearPaymentAcc),
        principal: Math.round(yearPrincipalAcc),
        interest: Math.round(yearInterestAcc),
        annualFee: Math.round(yearFeesAcc),
        endingBalance: Math.round(endingBal),
      });
      currentYear++;
      yearBeginningBalance = endingBal;
      yearInterestAcc = 0;
      yearPrincipalAcc = 0;
      yearPaymentAcc = 0;
      yearFeesAcc = 0;
    }

    balance = endingBal;
  }

  return {
    maxBorrowableCreditLine: Math.round(maxBorrowableCreditLine),
    actualCreditLine: Math.round(actualCreditLine),
    initialCltvPct,
    fullyDrawnCltvPct,
    unencumberedEquity: Math.round(unencumberedEquity),
    drawPeriodMonthlyPayment: Math.round(drawPeriodMonthlyPayment),
    repaymentPeriodMonthlyPayment: Math.round(repaymentPeriodMonthlyPayment),
    paymentShockDollarIncrease: Math.round(paymentShockDollarIncrease),
    paymentShockPctIncrease,
    totalDrawPeriodPayments: Math.round(totalDrawPeriodPayments),
    totalRepaymentPeriodPayments: Math.round(totalRepaymentPeriodPayments),
    totalLifetimePayments,
    totalInterestPaid,
    totalAnnualFeesPaid,
    annualAmortization,
    monthlyAmortization,
  };
}

export function calculateStressTest(input: StressTestInput): StressTestResult {
  const {
    drawnBalance = 50000,
    wsjPrimeRate = 8.5,
    lenderMargin = 1.0,
    rateScenario = "+2",
    lifetimeCapPct = 18.0,
    repayYears = 20,
  } = input;

  const currentRate = wsjPrimeRate + lenderMargin;
  let addOn = 2.0;
  if (rateScenario === "+1") addOn = 1.0;
  if (rateScenario === "+3") addOn = 3.0;
  if (rateScenario === "cap") addOn = lifetimeCapPct - currentRate;

  const stressedRate = Math.min(lifetimeCapPct, Math.max(0, currentRate + addOn));

  const currMonthlyRate = currentRate / 100 / 12;
  const stressMonthlyRate = stressedRate / 100 / 12;

  const currentDrawPayment = Math.round(drawnBalance * currMonthlyRate);
  const stressedDrawPayment = Math.round(drawnBalance * stressMonthlyRate);

  const repayMonths = repayYears * 12;
  const currentRepayPayment = Math.round(
    (drawnBalance * currMonthlyRate * Math.pow(1 + currMonthlyRate, repayMonths)) /
      (Math.pow(1 + currMonthlyRate, repayMonths) - 1)
  );

  const stressedRepayPayment = Math.round(
    (drawnBalance * stressMonthlyRate * Math.pow(1 + stressMonthlyRate, repayMonths)) /
      (Math.pow(1 + stressMonthlyRate, repayMonths) - 1)
  );

  const monthlyIncrease = Math.max(0, stressedRepayPayment - currentRepayPayment);
  const pctIncrease = currentRepayPayment > 0 ? Number(((monthlyIncrease / currentRepayPayment) * 100).toFixed(1)) : 0;

  return {
    currentRate,
    stressedRate: Number(stressedRate.toFixed(2)),
    currentDrawPayment,
    stressedDrawPayment,
    currentRepayPayment,
    stressedRepayPayment,
    monthlyIncrease,
    pctIncrease,
  };
}

export function calculateMultiDraw(input: MultiDrawInput): MultiDrawResult {
  const {
    creditLine = 100000,
    initialDraw = 20000,
    futureDrawAmount = 15000,
    futureDrawYear = 3,
    extraMonthlyPrincipal = 100,
    interestRate = 8.0,
    drawYears = 10,
    repayYears = 20,
  } = input;

  const totalDrawnCapital = initialDraw + futureDrawAmount;
  const monthlyRate = interestRate / 100 / 12;
  const drawMonths = drawYears * 12;
  const repayMonths = repayYears * 12;

  let balance = initialDraw;
  let totalInterestInDraw = 0;

  for (let m = 1; m <= drawMonths; m++) {
    if (m === futureDrawYear * 12) {
      balance = Math.min(creditLine, balance + futureDrawAmount);
    }
    const mInterest = balance * monthlyRate;
    totalInterestInDraw += mInterest;
    balance = Math.max(0, balance - extraMonthlyPrincipal);
  }

  const balanceAtDrawEnd = Math.round(balance);
  const drawPhaseMonthlyPayment = Math.round(balance * monthlyRate);

  const repaymentPhaseMonthlyPayment = Math.round(
    balanceAtDrawEnd > 0 && monthlyRate > 0
      ? (balanceAtDrawEnd * monthlyRate * Math.pow(1 + monthlyRate, repayMonths)) /
        (Math.pow(1 + monthlyRate, repayMonths) - 1)
      : 0
  );

  const baseNoExtraRepay = (totalDrawnCapital * monthlyRate * Math.pow(1 + monthlyRate, repayMonths)) /
    (Math.pow(1 + monthlyRate, repayMonths) - 1);
  const baseTotalInterest = (totalDrawnCapital * monthlyRate * drawMonths) + (baseNoExtraRepay * repayMonths - totalDrawnCapital);
  const actualTotalInterest = totalInterestInDraw + (repaymentPhaseMonthlyPayment * repayMonths - balanceAtDrawEnd);
  const interestSaved = Math.max(0, Math.round(baseTotalInterest - actualTotalInterest));

  return {
    totalDrawnCapital,
    balanceAtDrawEnd,
    drawPhaseMonthlyPayment,
    repaymentPhaseMonthlyPayment,
    interestSaved,
  };
}

export function calculateHelocVsLoanVsRefi(input: HelocVsLoanVsRefiInput): HelocVsLoanVsRefiResult {
  const {
    homeValue = 500000,
    currentBalance = 260000,
    currentRate = 3.5,
    cashNeeded = 50000,
    helocRate = 8.0,
    fixedLoanRate = 8.5,
    refiRate = 6.75,
  } = input;

  const helocRateMonthly = helocRate / 100 / 12;
  const helocDrawMonthly = Math.round(cashNeeded * helocRateMonthly);
  const helocRepayPmt = (cashNeeded * helocRateMonthly * Math.pow(1 + helocRateMonthly, 240)) / (Math.pow(1 + helocRateMonthly, 240) - 1);
  const helocRepayMonthly = Math.round(helocRepayPmt);
  const heloc5YrCost = Math.round(helocDrawMonthly * 60);
  const helocTotalCost = Math.round(helocDrawMonthly * 120 + helocRepayPmt * 240);

  const fixedMonthlyRate = fixedLoanRate / 100 / 12;
  const fixedLoanMonthly = Math.round(
    (cashNeeded * fixedMonthlyRate * Math.pow(1 + fixedMonthlyRate, 180)) / (Math.pow(1 + fixedMonthlyRate, 180) - 1)
  );
  const fixedLoan5YrCost = Math.round(fixedLoanMonthly * 60);
  const fixedLoanTotalCost = Math.round(fixedLoanMonthly * 180);

  const newRefiBalance = currentBalance + cashNeeded + 3500;
  const refiMonthlyRate = refiRate / 100 / 12;
  const refiNewMonthly = Math.round(
    (newRefiBalance * refiMonthlyRate * Math.pow(1 + refiMonthlyRate, 360)) /
      (Math.pow(1 + refiMonthlyRate, 360) - 1)
  );
  const refi5YrCost = Math.round(refiNewMonthly * 60);
  const refiTotalCost = Math.round(refiNewMonthly * 360);

  let recommendation = "HELOC is Best (Offers flexible revolving draw and interest-only payments while keeping your low 1st mortgage rate!)";
  if (currentRate >= refiRate) {
    recommendation = "Cash-Out Refinance is Best (Refinancing lowers rate on your entire mortgage balance)";
  } else if (cashNeeded > 100000) {
    recommendation = "Fixed Home Equity Loan is Best (Provides fixed rate stability for large lump-sum borrowing)";
  }

  return {
    helocDrawMonthly,
    helocRepayMonthly,
    heloc5YrCost,
    helocTotalCost,
    fixedLoanMonthly,
    fixedLoan5YrCost,
    fixedLoanTotalCost,
    refiNewMonthly,
    refi5YrCost,
    refiTotalCost,
    recommendation,
  };
}

export function calculateHelocDebtConsolidation(input: HelocDebtConsolidationInput): HelocDebtConsolidationResult {
  const {
    creditCardBalance = 30000,
    creditCardRate = 24.0,
    helocRate = 8.5,
    drawYears = 10,
    repayYears = 20,
  } = input;

  const ccMonthlyRate = creditCardRate / 100 / 12;
  const currentCombinedMonthlyPayment = Math.round(creditCardBalance * ccMonthlyRate + creditCardBalance * 0.015);
  const currentTotalInterestToPay = Math.round(creditCardBalance * (creditCardRate / 100) * 4);

  const helocMonthlyRate = helocRate / 100 / 12;
  const helocDrawPayment = Math.round(creditCardBalance * helocMonthlyRate);
  const repayMonths = repayYears * 12;
  const helocRepayPayment = Math.round(
    (creditCardBalance * helocMonthlyRate * Math.pow(1 + helocMonthlyRate, repayMonths)) /
      (Math.pow(1 + helocMonthlyRate, repayMonths) - 1)
  );

  const helocTotalInterestPaid = Math.round(
    (helocDrawPayment * drawYears * 12) + (helocRepayPayment * repayMonths - creditCardBalance)
  );

  const monthlyCashFlowSavingsDrawPhase = Math.max(0, currentCombinedMonthlyPayment - helocDrawPayment);
  const lifetimeInterestSaved = Math.max(0, currentTotalInterestToPay - helocTotalInterestPaid);

  return {
    currentCombinedMonthlyPayment,
    helocDrawPayment,
    helocRepayPayment,
    monthlyCashFlowSavingsDrawPhase,
    currentTotalInterestToPay,
    helocTotalInterestPaid,
    lifetimeInterestSaved,
  };
}

export function calculateHelocTax(input: HelocTaxInput): HelocTaxResult {
  const { annualInterestPaid = 4000, isUsedForHomeImprovement = true, marginalTaxBracketPct = 24, helocRate = 8.0 } = input;

  if (!isUsedForHomeImprovement) {
    return {
      isDeductible: false,
      projectedAnnualTaxSavings: 0,
      effectiveInterestRate: helocRate,
      statusExplanation: "Not Tax-Deductible (IRS TCJA Rules require proceeds to be used for substantial home improvements).",
    };
  }

  const projectedAnnualTaxSavings = Math.round(annualInterestPaid * (marginalTaxBracketPct / 100));
  const effectiveInterestRate = Number((helocRate * (1 - marginalTaxBracketPct / 100)).toFixed(2));

  return {
    isDeductible: true,
    projectedAnnualTaxSavings,
    effectiveInterestRate,
    statusExplanation: `Tax-Deductible! Projected ${marginalTaxBracketPct}% tax bracket write-off saves ~$${projectedAnnualTaxSavings.toLocaleString()}/yr.`,
  };
}

export function calculateHelocCalculator(inputs: Record<string, any>): Record<string, any> {
  const homeValue = parseFloat(inputs.homeValue) || 500000;
  const currentMortgageBalance = parseFloat(inputs.currentMortgageBalance) || 260000;
  const creditLineAmount = parseFloat(inputs.creditLineAmount) || 50000;
  const interestRate = parseFloat(inputs.interestRate) || 8.0;

  const res = calculateHELOC({
    homeValue,
    currentMortgageBalance,
    cltvLimitPct: 80,
    creditLineAmount,
    drawPeriodYears: 10,
    drawPaymentStructure: "interest_only",
    repaymentPeriodYears: 20,
    interestRate,
    closingCostsAmount: 2000,
    closingCostTreatment: "upfront",
    annualMaintenanceFee: 50,
    currencySymbol: "$",
  });

  return {
    drawPeriodMonthlyPayment: `$${res.drawPeriodMonthlyPayment.toLocaleString()}/mo`,
    repaymentPeriodMonthlyPayment: `$${res.repaymentPeriodMonthlyPayment.toLocaleString()}/mo`,
    maxBorrowableCreditLine: `$${res.maxBorrowableCreditLine.toLocaleString()}`,
    paymentShockDollarIncrease: `+$${res.paymentShockDollarIncrease.toLocaleString()}/mo (+${res.paymentShockPctIncrease}%)`,
    totalInterestPaid: `$${res.totalInterestPaid.toLocaleString()}`,
  };
}
