import {
  DownPaymentInput,
  DownPaymentResult,
  DownPaymentComparisonResult,
  DownPaymentTierRow,
  OpportunityCostInput,
  OpportunityCostResult,
  CashToCloseInput,
  CashToCloseResult,
  LoanProgramResult,
  LoanProgramComparisonRow,
  SavingsGoalInput,
  SavingsGoalResult,
  AmortizationRow,
} from "./types";

export function calculateDownPayment(input: DownPaymentInput): DownPaymentResult {
  let {
    calculationMode = "home_price",
    homePrice = 500000,
    downPaymentPct = 20,
    upfrontCashAvailable = 100000,
    loanTermYears = 30,
    interestRate = 6.5,
    propertyTaxAnnual = 6000,
    homeInsuranceAnnual = 1800,
    pmiRatePct = 0.5,
    hoaDuesMonthly = 0,
    closingCostsPct = 3.0,
  } = input;

  let actualHomePrice = homePrice;
  let actualDownPaymentPct = downPaymentPct;
  let actualDownPaymentAmount = 0;

  if (calculationMode === "upfront_cash") {
    // Mode: Upfront Cash Available determines max home price
    // Cash = DownPayment + ClosingCosts = HomePrice * (DownPct/100 + ClosingPct/100)
    const combinedCashFactor = (downPaymentPct + closingCostsPct) / 100;
    if (combinedCashFactor > 0) {
      actualHomePrice = upfrontCashAvailable / combinedCashFactor;
    } else {
      actualHomePrice = upfrontCashAvailable;
    }
    actualDownPaymentPct = downPaymentPct;
    actualDownPaymentAmount = (actualHomePrice * actualDownPaymentPct) / 100;
  } else {
    // Mode: Home Price is fixed input
    actualDownPaymentAmount = (actualHomePrice * actualDownPaymentPct) / 100;
  }

  const loanAmount = Math.max(0, actualHomePrice - actualDownPaymentAmount);
  const closingCostsAmount = (actualHomePrice * closingCostsPct) / 100;
  const totalCashToClose = actualDownPaymentAmount + closingCostsAmount;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPrincipalAndInterest =
    loanAmount > 0 && monthlyRate > 0 && totalMonths > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const monthlyPropertyTax = propertyTaxAnnual / 12;
  const monthlyHomeInsurance = homeInsuranceAnnual / 12;
  const monthlyHoa = hoaDuesMonthly;

  // PMI applies only if Down Payment < 20%
  const monthlyPmi = actualDownPaymentPct < 20 ? (loanAmount * (pmiRatePct / 100)) / 12 : 0;

  const totalMonthlyPayment = Math.round(
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyPmi + monthlyHoa
  );

  const totalPaymentsOverTerm = Math.round(monthlyPrincipalAndInterest * totalMonths);
  const totalInterestOverTerm = Math.round(totalPaymentsOverTerm - loanAmount);

  // Amortization Schedule & PMI Cancellation Date Calculation
  const monthlyAmortization: AmortizationRow[] = [];
  const annualAmortization: AmortizationRow[] = [];

  let balance = loanAmount;
  let currentYear = 1;
  let yearBeginningBalance = balance;
  let yearInterestAcc = 0;
  let yearPrincipalAcc = 0;
  let yearPaymentAcc = 0;
  let yearPmiAcc = 0;

  let pmiCancellationMonth = 0;
  let pmiTotalCost = 0;

  // Target balance for 80% LTV borrower PMI cancellation
  const target80LtvBalance = actualHomePrice * 0.80;

  for (let m = 1; m <= totalMonths; m++) {
    if (balance <= 0.01) break;

    const mInterest = balance * monthlyRate;
    let mPmt = monthlyPrincipalAndInterest;
    if (mPmt > balance + mInterest) mPmt = balance + mInterest;

    const mPrincipal = Math.min(balance, mPmt - mInterest);
    const endingBal = Math.max(0, balance - mPrincipal);

    // Track active PMI until LTV reaches 80%
    let activePmiThisMonth = 0;
    if (actualDownPaymentPct < 20) {
      if (balance > target80LtvBalance) {
        activePmiThisMonth = monthlyPmi;
        pmiTotalCost += monthlyPmi;
      } else if (pmiCancellationMonth === 0) {
        pmiCancellationMonth = m;
      }
    }

    monthlyAmortization.push({
      period: m,
      dateLabel: `Month ${m}`,
      beginningBalance: Math.round(balance),
      payment: Math.round(mPmt + monthlyPropertyTax + monthlyHomeInsurance + activePmiThisMonth + monthlyHoa),
      principal: Math.round(mPrincipal),
      interest: Math.round(mInterest),
      pmi: Math.round(activePmiThisMonth),
      endingBalance: Math.round(endingBal),
    });

    yearInterestAcc += mInterest;
    yearPrincipalAcc += mPrincipal;
    yearPaymentAcc += (mPmt + monthlyPropertyTax + monthlyHomeInsurance + activePmiThisMonth + monthlyHoa);
    yearPmiAcc += activePmiThisMonth;

    if (m % 12 === 0 || m === totalMonths || endingBal <= 0.01) {
      annualAmortization.push({
        period: currentYear,
        dateLabel: `Year ${currentYear}`,
        beginningBalance: Math.round(yearBeginningBalance),
        payment: Math.round(yearPaymentAcc),
        principal: Math.round(yearPrincipalAcc),
        interest: Math.round(yearInterestAcc),
        pmi: Math.round(yearPmiAcc),
        endingBalance: Math.round(endingBal),
      });
      currentYear++;
      yearBeginningBalance = endingBal;
      yearInterestAcc = 0;
      yearPrincipalAcc = 0;
      yearPaymentAcc = 0;
      yearPmiAcc = 0;
    }

    balance = endingBal;
  }

  const pmiCancellationDateLabel =
    actualDownPaymentPct >= 20
      ? "No PMI Required ($0)"
      : pmiCancellationMonth > 0
      ? `Year ${Math.ceil(pmiCancellationMonth / 12)} (Month ${pmiCancellationMonth})`
      : "Never (FHA Lifetime)";

  return {
    homePrice: Math.round(actualHomePrice),
    downPaymentAmount: Math.round(actualDownPaymentAmount),
    downPaymentPct: Number(actualDownPaymentPct.toFixed(1)),
    loanAmount: Math.round(loanAmount),
    monthlyPrincipalAndInterest: Math.round(monthlyPrincipalAndInterest),
    monthlyPropertyTax: Math.round(monthlyPropertyTax),
    monthlyHomeInsurance: Math.round(monthlyHomeInsurance),
    monthlyPmi: Math.round(monthlyPmi),
    monthlyHoa: Math.round(monthlyHoa),
    totalMonthlyPayment,
    closingCostsAmount: Math.round(closingCostsAmount),
    totalCashToClose: Math.round(totalCashToClose),
    totalPaymentsOverTerm,
    totalInterestOverTerm,
    pmiCancellationMonth,
    pmiCancellationDateLabel,
    pmiTotalCost: Math.round(pmiTotalCost),
    annualAmortization,
    monthlyAmortization,
  };
}

export function calculateDownPaymentComparison(
  homePrice: number,
  interestRate: number,
  loanTermYears: number
): DownPaymentComparisonResult {
  const tiersPct = [0, 3.5, 5, 10, 20, 30];
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const tiers: DownPaymentTierRow[] = tiersPct.map((pct) => {
    const downAmount = (homePrice * pct) / 100;
    const loanAmt = homePrice - downAmount;
    const pmtPI = (loanAmt * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    
    const monthlyPmi = pct < 20 ? (loanAmt * 0.005) / 12 : 0;
    const totalPmt = pmtPI + monthlyPmi + (6000 / 12) + (1800 / 12);
    
    // Estimate PMI lifetime until 80% LTV
    let lifetimePmi = 0;
    if (pct < 20 && pct > 0) {
      const pmiMonthsNeeded = Math.round(((20 - pct) / 100 * homePrice) / (loanAmt * 0.003));
      lifetimePmi = Math.min(monthlyPmi * 120, monthlyPmi * Math.max(12, pmiMonthsNeeded));
    } else if (pct === 0) {
      lifetimePmi = monthlyPmi * totalMonths; // VA/FHA lifetime estimate
    }

    const lifetimeInterest = pmtPI * totalMonths - loanAmt;

    return {
      pct,
      downPaymentAmount: Math.round(downAmount),
      loanAmount: Math.round(loanAmt),
      monthlyPayment: Math.round(totalPmt),
      monthlyPmi: Math.round(monthlyPmi),
      lifetimePmi: Math.round(lifetimePmi),
      lifetimeInterest: Math.round(lifetimeInterest),
      totalCashToClose: Math.round(downAmount + homePrice * 0.03),
    };
  });

  return { tiers };
}

export function calculateOpportunityCost(input: OpportunityCostInput): OpportunityCostResult {
  const {
    homePrice = 500000,
    baseDownPct = 5,
    largerDownPct = 20,
    interestRate = 6.5,
    investmentReturnRate = 8.5,
    years = 10,
  } = input;

  const baseDownAmount = (homePrice * baseDownPct) / 100;
  const largerDownAmount = (homePrice * largerDownPct) / 100;
  const extraDownAmount = Math.max(0, largerDownAmount - baseDownAmount);

  // Mortgage Interest Saved by extra down payment
  const monthlyMortgageRate = interestRate / 100 / 12;
  const totalMonths = 30 * 12;
  const baseLoan = homePrice - baseDownAmount;
  const largerLoan = homePrice - largerDownAmount;

  const basePmt = (baseLoan * monthlyMortgageRate * Math.pow(1 + monthlyMortgageRate, totalMonths)) /
    (Math.pow(1 + monthlyMortgageRate, totalMonths) - 1);
  const largerPmt = (largerLoan * monthlyMortgageRate * Math.pow(1 + monthlyMortgageRate, totalMonths)) /
    (Math.pow(1 + monthlyMortgageRate, totalMonths) - 1);

  const monthlySavings = basePmt - largerPmt;
  const mortgageInterestSaved = Math.round(monthlySavings * (years * 12));

  // Investment Future Value if extra cash was invested in S&P 500
  const monthlyInvRate = investmentReturnRate / 100 / 12;
  const investmentFutureValue = Math.round(
    extraDownAmount * Math.pow(1 + monthlyInvRate, years * 12)
  );

  const netInvestmentAdvantage = Math.round(investmentFutureValue - (extraDownAmount + mortgageInterestSaved));

  let recommendation = "Investing Extra Cash is Better (Historical index returns outpace mortgage rate savings)";
  if (interestRate >= investmentReturnRate) {
    recommendation = "Larger Down Payment is Better (Mortgage interest savings exceed projected investment returns)";
  }

  return {
    extraDownAmount: Math.round(extraDownAmount),
    mortgageInterestSaved,
    investmentFutureValue,
    netInvestmentAdvantage,
    recommendation,
  };
}

export function calculateCashToClose(input: CashToCloseInput): CashToCloseResult {
  const {
    homePrice = 500000,
    downPaymentAmount = 100000,
    originationFeePct = 1.0,
    appraisalFee = 600,
    titleInsuranceFee = 1500,
    escrowPrepaidMonths = 3,
    propertyTaxAnnual = 6000,
    homeInsuranceAnnual = 1800,
  } = input;

  const originationFee = (homePrice * originationFeePct) / 100;
  const monthlyPrepaids = (propertyTaxAnnual + homeInsuranceAnnual) / 12;
  const escrowPrepaids = monthlyPrepaids * escrowPrepaidMonths;

  const totalClosingCosts = Math.round(originationFee + appraisalFee + titleInsuranceFee + escrowPrepaids);
  const totalCashToClose = Math.round(downPaymentAmount + totalClosingCosts);

  return {
    downPaymentAmount: Math.round(downPaymentAmount),
    originationFee: Math.round(originationFee),
    appraisalFee: Math.round(appraisalFee),
    titleInsuranceFee: Math.round(titleInsuranceFee),
    escrowPrepaids: Math.round(escrowPrepaids),
    totalClosingCosts,
    totalCashToClose,
  };
}

export function calculateLoanPrograms(homePrice: number, interestRate: number): LoanProgramResult {
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = 30 * 12;

  const createProg = (
    programName: string,
    minDownPct: number,
    upfrontFeePct: number,
    annualMipRatePct: number,
    pmiRules: string
  ): LoanProgramComparisonRow => {
    const minDownAmount = (homePrice * minDownPct) / 100;
    const baseLoan = homePrice - minDownAmount;
    const upfrontFeeAmount = (baseLoan * upfrontFeePct) / 100;
    const totalFinancedLoan = baseLoan + upfrontFeeAmount;

    const pmtPI = (totalFinancedLoan * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
    const monthlyMortgageInsurance = (baseLoan * (annualMipRatePct / 100)) / 12;
    const totalMonthlyPayment = Math.round(pmtPI + monthlyMortgageInsurance + (6000 / 12) + (1800 / 12));

    return {
      programName,
      minDownPct,
      minDownAmount: Math.round(minDownAmount),
      upfrontFeePct,
      upfrontFeeAmount: Math.round(upfrontFeeAmount),
      annualMipRatePct,
      monthlyMortgageInsurance: Math.round(monthlyMortgageInsurance),
      totalMonthlyPayment,
      pmiRules,
    };
  };

  const programs: LoanProgramComparisonRow[] = [
    createProg("Conventional 97", 3.0, 0.0, 0.55, "Cancels automatically at 78% LTV"),
    createProg("FHA Loan", 3.5, 1.75, 0.55, "Life of loan (unless >10% down)"),
    createProg("VA Loan (Veteran)", 0.0, 2.15, 0.0, "$0 Monthly PMI Benefit!"),
    createProg("USDA Rural Development", 0.0, 1.0, 0.35, "0.35% Annual Fee for life of loan"),
    createProg("Jumbo Mortgage", 20.0, 0.0, 0.0, "No PMI required (20% Down)"),
  ];

  return { programs };
}

export function calculateSavingsGoal(input: SavingsGoalInput): SavingsGoalResult {
  const {
    targetCashGoal = 115000,
    currentSavings = 25000,
    monthlySavings = 2500,
    savingsInterestRate = 4.5,
  } = input;

  const needed = Math.max(0, targetCashGoal - currentSavings);
  if (needed <= 0) {
    return {
      monthsToGoal: 0,
      yearsToGoal: 0,
      totalInterestEarned: 0,
      projectedDateLabel: "Goal Already Achieved!",
    };
  }

  const monthlyRate = savingsInterestRate / 100 / 12;
  let balance = currentSavings;
  let months = 0;
  let totalInterest = 0;

  while (balance < targetCashGoal && months < 360) {
    months++;
    const mInterest = balance * monthlyRate;
    totalInterest += mInterest;
    balance += monthlySavings + mInterest;
  }

  const yearsToGoal = Number((months / 12).toFixed(1));
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + months);
  const projectedDateLabel = futureDate.toLocaleDateString([], { month: "short", year: "numeric" });

  return {
    monthsToGoal: months,
    yearsToGoal,
    totalInterestEarned: Math.round(totalInterest),
    projectedDateLabel,
  };
}

export function calculateDownPaymentCalculator(inputs: Record<string, any>): Record<string, any> {
  const homePrice = parseFloat(inputs.homePrice) || 500000;
  const downPaymentPct = parseFloat(inputs.downPaymentPct) || 20;

  const res = calculateDownPayment({
    calculationMode: "home_price",
    homePrice,
    downPaymentPct,
    upfrontCashAvailable: 100000,
    loanTermYears: 30,
    interestRate: 6.5,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
    pmiRatePct: 0.5,
    hoaDuesMonthly: 0,
    closingCostsPct: 3.0,
    currencySymbol: "$",
  });

  return {
    downPaymentAmount: `$${res.downPaymentAmount.toLocaleString()} (${res.downPaymentPct}%)`,
    totalMonthlyPayment: `$${res.totalMonthlyPayment.toLocaleString()}/mo`,
    totalCashToClose: `$${res.totalCashToClose.toLocaleString()}`,
    pmiCancellationDateLabel: res.pmiCancellationDateLabel,
  };
}
