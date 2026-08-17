import {
  VAMortgageInput,
  VAMortgageResult,
  VAVsConvVsFHAInput,
  VAVsConvVsFHAResult,
  EntitlementInput,
  EntitlementResult,
  BiWeeklyInput,
  BiWeeklyResult,
  ExtraPaymentsInput,
  ExtraPaymentsResult,
  IRRRLInput,
  IRRRLResult,
  AmortizationRow,
} from "./types";

export function getVAFundingFeeRate(
  downPaymentPct: number,
  usedVALoanBefore: boolean,
  isDisabilityExempt: boolean
): number {
  if (isDisabilityExempt) return 0.0;

  if (!usedVALoanBefore) {
    // First-time use
    if (downPaymentPct >= 10.0) return 1.25;
    if (downPaymentPct >= 5.0) return 1.50;
    return 2.15;
  } else {
    // Subsequent use
    if (downPaymentPct >= 10.0) return 1.25;
    if (downPaymentPct >= 5.0) return 1.50;
    return 3.30;
  }
}

export function calculateVAMortgage(input: VAMortgageInput): VAMortgageResult {
  const {
    homePrice = 500000,
    downPaymentPct = 0,
    loanTermYears = 30,
    interestRate = 6.5,
    militaryStatus = "Active/Veteran",
    usedVALoanBefore = false,
    isDisabilityExempt = false,
    financeFundingFee = true,
    propertyTaxAnnual = 6000,
    homeInsuranceAnnual = 2500,
    hoaDuesMonthly = 0,
    estimatedClosingCostsPct = 2.5,
  } = input;

  const downPaymentAmount = Math.round((homePrice * downPaymentPct) / 100);
  const baseLoanAmount = Math.max(0, homePrice - downPaymentAmount);

  const isExempt = isDisabilityExempt || militaryStatus === "Surviving Spouse";
  const fundingFeeRatePct = getVAFundingFeeRate(downPaymentPct, usedVALoanBefore, isExempt);
  const fundingFeeAmount = Math.round((baseLoanAmount * fundingFeeRatePct) / 100);

  const totalFinancedLoanAmount = financeFundingFee
    ? baseLoanAmount + fundingFeeAmount
    : baseLoanAmount;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPrincipalAndInterest =
    totalFinancedLoanAmount > 0 && monthlyRate > 0 && totalMonths > 0
      ? (totalFinancedLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const monthlyPropertyTax = Math.round(propertyTaxAnnual / 12);
  const monthlyHomeInsurance = Math.round(homeInsuranceAnnual / 12);
  const totalMonthlyPiti = Math.round(
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + hoaDuesMonthly
  );

  const estimatedClosingCosts = (homePrice * estimatedClosingCostsPct) / 100;
  const cashFundingFee = financeFundingFee ? 0 : fundingFeeAmount;
  const totalUpfrontCashRequired = Math.round(downPaymentAmount + cashFundingFee + estimatedClosingCosts);

  const totalPaymentsOverTerm = Math.round(monthlyPrincipalAndInterest * totalMonths);
  const totalInterestOverTerm = Math.round(totalPaymentsOverTerm - totalFinancedLoanAmount);

  // Build Monthly and Annual Amortization Schedules for VA Loan ($0 PMI)
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
    let mPmt = monthlyPrincipalAndInterest;
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
    downPaymentAmount,
    baseLoanAmount,
    fundingFeeRatePct,
    fundingFeeAmount,
    totalFinancedLoanAmount,
    monthlyPrincipalAndInterest: Math.round(monthlyPrincipalAndInterest),
    monthlyPropertyTax,
    monthlyHomeInsurance,
    monthlyHoa: hoaDuesMonthly,
    totalMonthlyPiti,
    totalUpfrontCashRequired,
    totalPaymentsOverTerm,
    totalInterestOverTerm,
    annualAmortization,
    monthlyAmortization,
  };
}

export function calculateVAVsConvVsFHA(input: VAVsConvVsFHAInput): VAVsConvVsFHAResult {
  const { homePrice, downPaymentPct, creditScore, interestRate } = input;

  // VA Loan (0% Down, 0% PMI, 2.15% Funding Fee)
  const vaCalc = calculateVAMortgage({
    homePrice,
    downPaymentPct: 0,
    loanTermYears: 30,
    interestRate: interestRate - 0.25, // VA rates typically 0.25% lower
    militaryStatus: "Active/Veteran",
    usedVALoanBefore: false,
    isDisabilityExempt: false,
    financeFundingFee: true,
    propertyTaxAnnual: homePrice * 0.012,
    homeInsuranceAnnual: 1500,
    hoaDuesMonthly: 0,
    estimatedClosingCostsPct: 2.5,
    currencySymbol: "$",
  });

  // FHA Loan (3.5% Down, 1.75% UFMIP, 0.55% MIP)
  const fhaBase = homePrice * 0.965;
  const fhaUfmip = fhaBase * 0.0175;
  const fhaLoan = fhaBase + fhaUfmip;
  const fhaRate = interestRate / 100 / 12;
  const fhaPmt = (fhaLoan * fhaRate * Math.pow(1 + fhaRate, 360)) / (Math.pow(1 + fhaRate, 360) - 1);
  const fhaMonthlyMIP = (fhaBase * 0.0055) / 12;
  const fhaMonthlyPiti = Math.round(fhaPmt + (homePrice * 0.012) / 12 + 125 + fhaMonthlyMIP);
  const fhaUpfrontCash = Math.round(homePrice * 0.035 + homePrice * 0.03);
  const fha30YrCost = Math.round(fhaMonthlyPiti * 360);

  // Conventional Loan
  const convDown = (homePrice * Math.max(5, downPaymentPct)) / 100;
  const convLoan = homePrice - convDown;
  const convRate = (interestRate + 0.25) / 100 / 12;
  const convPmt = (convLoan * convRate * Math.pow(1 + convRate, 360)) / (Math.pow(1 + convRate, 360) - 1);
  const convPMI = convDown < homePrice * 0.2 ? (convLoan * 0.006) / 12 : 0;
  const convMonthlyPiti = Math.round(convPmt + (homePrice * 0.012) / 12 + 125 + convPMI);
  const convUpfrontCash = Math.round(convDown + homePrice * 0.025);
  const conv30YrCost = Math.round(convPmt * 360 + convPMI * 96 + (homePrice * 0.012) * 30 + 1500 * 30);

  return {
    vaMonthlyPiti: vaCalc.totalMonthlyPiti,
    vaUpfrontCash: vaCalc.totalUpfrontCashRequired,
    va30YrCost: Math.round(vaCalc.totalMonthlyPiti * 360),
    fhaMonthlyPiti,
    fhaUpfrontCash,
    fha30YrCost,
    convMonthlyPiti,
    convUpfrontCash,
    conv30YrCost,
    vaSavingsOverConv: Math.round(conv30YrCost - vaCalc.totalMonthlyPiti * 360),
    vaSavingsOverFHA: Math.round(fha30YrCost - vaCalc.totalMonthlyPiti * 360),
  };
}

export function calculateEntitlement(input: EntitlementInput): EntitlementResult {
  const { targetHomePrice, priorUsedEntitlement = 0, countyLoanLimit = 766550 } = input;

  const fullEntitlementAvailable = priorUsedEntitlement <= 0;

  if (fullEntitlementAvailable) {
    return {
      fullEntitlementAvailable: true,
      maxZeroDownPurchasePrice: targetHomePrice > 0 ? targetHomePrice : countyLoanLimit,
      requiredDownPaymentForTarget: 0,
      remainingEntitlement: Math.round(countyLoanLimit * 0.25),
    };
  }

  // If user entered prior loan amount (e.g. > 100,000) vs direct 25% entitlement dollar amount
  const actualPriorEntitlement =
    priorUsedEntitlement > countyLoanLimit * 0.25
      ? priorUsedEntitlement * 0.25
      : priorUsedEntitlement;

  // Partial entitlement calculation:
  // Max Guaranty = 25% of County Limit - Prior Used Entitlement
  const maxGuaranty = Math.max(0, countyLoanLimit * 0.25 - actualPriorEntitlement);
  const maxZeroDownPurchasePrice = Math.round(maxGuaranty * 4);

  let requiredDownPaymentForTarget = 0;
  if (targetHomePrice > maxZeroDownPurchasePrice) {
    // 25% of the shortfall between target price and max zero down
    const shortfall = targetHomePrice - maxZeroDownPurchasePrice;
    requiredDownPaymentForTarget = Math.round(shortfall * 0.25);
  }

  return {
    fullEntitlementAvailable: false,
    maxZeroDownPurchasePrice,
    requiredDownPaymentForTarget,
    remainingEntitlement: Math.round(maxGuaranty),
  };
}

export function calculateBiWeekly(input: BiWeeklyInput): BiWeeklyResult {
  const { loanAmount = 400000, interestRate = 6.5, loanTermYears = 30 } = input;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const monthlyPayment =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
    (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const biWeeklyPayment = monthlyPayment / 2;

  // Monthly timeline
  const monthlyTotalInterest = monthlyPayment * totalMonths - loanAmount;

  // Bi-weekly timeline (26 half payments = 13 full payments per year)
  let balance = loanAmount;
  let biWeeklyPeriod = 0;
  let biWeeklyTotalInterest = 0;

  while (balance > 0.01 && biWeeklyPeriod < totalMonths * 2) {
    biWeeklyPeriod++;
    const periodInterest = balance * (interestRate / 100 / 26);
    let pay = biWeeklyPayment;
    if (pay > balance + periodInterest) pay = balance + periodInterest;
    const principalPaid = pay - periodInterest;
    biWeeklyTotalInterest += periodInterest;
    balance = Math.max(0, balance - principalPaid);
  }

  const newMonths = Math.round(biWeeklyPeriod / 2.1667);
  const monthsSaved = Math.max(0, totalMonths - newMonths);
  const yearsSaved = Number((monthsSaved / 12).toFixed(1));
  const interestSaved = Math.max(0, Math.round(monthlyTotalInterest - biWeeklyTotalInterest));

  return {
    monthlyPayment: Math.round(monthlyPayment),
    biWeeklyPayment: Math.round(biWeeklyPayment),
    monthlyTotalInterest: Math.round(monthlyTotalInterest),
    biWeeklyTotalInterest: Math.round(biWeeklyTotalInterest),
    interestSaved,
    monthsSaved,
    yearsSaved,
  };
}

export function calculateExtraPayments(input: ExtraPaymentsInput): ExtraPaymentsResult {
  const { loanAmount = 400000, interestRate = 6.5, loanTermYears = 30, extraMonthlyPayment = 200 } = input;

  const monthlyRate = interestRate / 100 / 12;
  const originalMonths = loanTermYears * 12;
  const basePmt =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, originalMonths)) /
    (Math.pow(1 + monthlyRate, originalMonths) - 1);

  const newMonthlyPmt = basePmt + extraMonthlyPayment;
  let balance = loanAmount;
  let newMonths = 0;
  let newTotalInterest = 0;

  while (balance > 0.01 && newMonths < originalMonths) {
    newMonths++;
    const mInterest = balance * monthlyRate;
    let pay = newMonthlyPmt;
    if (pay > balance + mInterest) pay = balance + mInterest;
    const principalPaid = pay - mInterest;
    newTotalInterest += mInterest;
    balance = Math.max(0, balance - principalPaid);
  }

  const originalTotalInterest = basePmt * originalMonths - loanAmount;
  const monthsSaved = Math.max(0, originalMonths - newMonths);
  const interestSaved = Math.max(0, Math.round(originalTotalInterest - newTotalInterest));

  return {
    originalMonths,
    newMonths,
    monthsSaved,
    interestSaved,
  };
}

export function calculateIRRRL(input: IRRRLInput): IRRRLResult {
  const { existingBalance = 350000, currentRate = 7.25, newRate = 6.0, closingCosts = 3000 } = input;

  const mCurrentRate = currentRate / 100 / 12;
  const mNewRate = newRate / 100 / 12;

  const currentMonthlyPmt = Math.round(
    (existingBalance * mCurrentRate * Math.pow(1 + mCurrentRate, 360)) /
      (Math.pow(1 + mCurrentRate, 360) - 1)
  );

  const irrrlFundingFee = Math.round(existingBalance * 0.005); // 0.5% IRRRL fee
  const newLoanBalance = existingBalance + irrrlFundingFee;

  const newMonthlyPmt = Math.round(
    (newLoanBalance * mNewRate * Math.pow(1 + mNewRate, 360)) /
      (Math.pow(1 + mNewRate, 360) - 1)
  );

  const monthlySavings = Math.max(0, currentMonthlyPmt - newMonthlyPmt);
  const totalOutlay = closingCosts + irrrlFundingFee;
  const breakEvenMonths = monthlySavings > 0 ? Math.round(totalOutlay / monthlySavings) : 0;
  const lifetimeSavings5Yr = Math.max(0, monthlySavings * 60 - totalOutlay);

  return {
    currentMonthlyPmt,
    newMonthlyPmt,
    monthlySavings,
    irrrlFundingFee,
    breakEvenMonths,
    lifetimeSavings5Yr: Math.round(lifetimeSavings5Yr),
  };
}

export function calculateVAMortgageCalculator(inputs: Record<string, any>): Record<string, any> {
  const homePrice = parseFloat(inputs.homePrice) || 500000;
  const downPaymentPct = parseFloat(inputs.downPaymentPct) || 0;
  const interestRate = parseFloat(inputs.interestRate) || 6.5;

  const res = calculateVAMortgage({
    homePrice,
    downPaymentPct,
    loanTermYears: 30,
    interestRate,
    militaryStatus: "Active/Veteran",
    usedVALoanBefore: false,
    isDisabilityExempt: false,
    financeFundingFee: true,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 2500,
    hoaDuesMonthly: 0,
    estimatedClosingCostsPct: 2.5,
    currencySymbol: "$",
  });

  return {
    totalMonthlyPiti: `$${res.totalMonthlyPiti.toLocaleString()}`,
    monthlyPrincipalAndInterest: `$${res.monthlyPrincipalAndInterest.toLocaleString()}`,
    fundingFeeAmount: `$${res.fundingFeeAmount.toLocaleString()}`,
    baseLoanAmount: `$${res.baseLoanAmount.toLocaleString()}`,
    totalFinancedLoanAmount: `$${res.totalFinancedLoanAmount.toLocaleString()}`,
    totalUpfrontCashRequired: `$${res.totalUpfrontCashRequired.toLocaleString()}`,
  };
}
