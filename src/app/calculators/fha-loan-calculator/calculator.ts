import {
  FHALoanInput,
  FHALoanResult,
  FHAVsConvInput,
  FHAVsConvResult,
  CountyLimitInput,
  CountyLimitResult,
  FHADTIInput,
  FHADTIResult,
  FHA203kInput,
  FHA203kResult,
  FHAPrepaymentInput,
  FHAPrepaymentResult,
  AmortizationRow,
} from "./types";

export function calculateFHALoan(input: FHALoanInput): FHALoanResult {
  const {
    homePrice = 350000,
    downPaymentPct = 3.5,
    creditScoreBand = "580+",
    loanTermYears = 30,
    interestRate = 6.5,
    financeUfmip = true,
    propertyTaxAnnual = 3600,
    homeInsuranceAnnual = 1400,
    hoaDuesMonthly = 0,
    estimatedClosingCostsPct = 3.0,
    sellerConcessionsPct = 0,
  } = input;

  // Enforce minimum down payment rules based on credit score
  const minDownPct = creditScoreBand === "500-579" ? 10.0 : 3.5;
  const effectiveDownPaymentPct = Math.max(downPaymentPct, minDownPct);

  const downPaymentAmount = Math.round((homePrice * effectiveDownPaymentPct) / 100);
  const baseLoanAmount = Math.max(0, homePrice - downPaymentAmount);

  // Upfront MIP (UFMIP) = 1.75%
  const ufmipRate = 1.75;
  const ufmipAmount = Math.round((baseLoanAmount * ufmipRate) / 100);
  const totalFinancedLoanAmount = financeUfmip ? baseLoanAmount + ufmipAmount : baseLoanAmount;

  // Annual MIP Rate Determination
  let annualMipRate = 0.55;
  let mipDurationYears: number | "Life of Loan" = "Life of Loan";

  if (loanTermYears > 15) {
    if (effectiveDownPaymentPct >= 10.0) {
      annualMipRate = 0.50;
      mipDurationYears = 11;
    } else {
      annualMipRate = 0.55;
      mipDurationYears = "Life of Loan";
    }
  } else {
    // 15 Year or shorter
    if (effectiveDownPaymentPct >= 10.0) {
      annualMipRate = 0.15;
      mipDurationYears = 11;
    } else {
      annualMipRate = 0.40;
      mipDurationYears = "Life of Loan";
    }
  }

  const monthlyMipAmount = Math.round((baseLoanAmount * (annualMipRate / 100)) / 12);

  // Monthly Principal & Interest Payment
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
    monthlyPrincipalAndInterest + monthlyPropertyTax + monthlyHomeInsurance + monthlyMipAmount + hoaDuesMonthly
  );

  const estimatedClosingCosts = (homePrice * estimatedClosingCostsPct) / 100;
  const sellerConcessions = (homePrice * sellerConcessionsPct) / 100;
  const cashUfmip = financeUfmip ? 0 : ufmipAmount;

  const totalUpfrontCashRequired = Math.round(
    downPaymentAmount + cashUfmip + estimatedClosingCosts - sellerConcessions
  );

  const totalPaymentsOverTerm = Math.round(monthlyPrincipalAndInterest * totalMonths);
  const totalInterestOverTerm = Math.round(totalPaymentsOverTerm - totalFinancedLoanAmount);

  // Build Monthly and Annual Amortization Schedules for FHA Loan
  const monthlyAmortization: AmortizationRow[] = [];
  const annualAmortization: AmortizationRow[] = [];

  let balance = totalFinancedLoanAmount;
  let currentYear = 1;
  let yearBeginningBalance = balance;
  let yearInterestAcc = 0;
  let yearPrincipalAcc = 0;
  let yearPaymentAcc = 0;
  let yearMipAcc = 0;

  const mipDurationMonths = typeof mipDurationYears === "number" ? mipDurationYears * 12 : totalMonths;

  for (let m = 1; m <= totalMonths; m++) {
    if (balance <= 0.01) break;

    const mInterest = balance * monthlyRate;
    let mPmt = monthlyPrincipalAndInterest;
    if (mPmt > balance + mInterest) mPmt = balance + mInterest;

    const mPrincipal = Math.min(balance, mPmt - mInterest);
    const endingBal = Math.max(0, balance - mPrincipal);

    const activeMip = m <= mipDurationMonths ? monthlyMipAmount : 0;

    monthlyAmortization.push({
      period: m,
      dateLabel: `Month ${m}`,
      beginningBalance: Math.round(balance),
      payment: Math.round(mPmt + activeMip),
      principal: Math.round(mPrincipal),
      interest: Math.round(mInterest),
      mip: Math.round(activeMip),
      endingBalance: Math.round(endingBal),
    });

    yearInterestAcc += mInterest;
    yearPrincipalAcc += mPrincipal;
    yearPaymentAcc += (mPmt + activeMip);
    yearMipAcc += activeMip;

    if (m % 12 === 0 || m === totalMonths || endingBal <= 0.01) {
      annualAmortization.push({
        period: currentYear,
        dateLabel: `Year ${currentYear}`,
        beginningBalance: Math.round(yearBeginningBalance),
        payment: Math.round(yearPaymentAcc),
        principal: Math.round(yearPrincipalAcc),
        interest: Math.round(yearInterestAcc),
        mip: Math.round(yearMipAcc),
        endingBalance: Math.round(endingBal),
      });
      currentYear++;
      yearBeginningBalance = endingBal;
      yearInterestAcc = 0;
      yearPrincipalAcc = 0;
      yearPaymentAcc = 0;
      yearMipAcc = 0;
    }

    balance = endingBal;
  }

  return {
    downPaymentAmount,
    effectiveDownPaymentPct,
    baseLoanAmount,
    ufmipRate,
    ufmipAmount,
    totalFinancedLoanAmount,
    annualMipRate,
    monthlyMipAmount,
    mipDurationYears,
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

export function calculateFHAVsConv(input: FHAVsConvInput): FHAVsConvResult {
  const { homePrice, downPaymentPct, creditScore, interestRateFHA, interestRateConv } = input;

  const fhaCalc = calculateFHALoan({
    homePrice,
    downPaymentPct,
    creditScoreBand: creditScore < 580 ? "500-579" : "580+",
    loanTermYears: 30,
    interestRate: interestRateFHA,
    financeUfmip: true,
    propertyTaxAnnual: homePrice * 0.012,
    homeInsuranceAnnual: 1200,
    hoaDuesMonthly: 0,
    estimatedClosingCostsPct: 3.0,
    sellerConcessionsPct: 0,
    currencySymbol: "$",
  });

  // Conventional 97 / Standard Calculation with PMI
  const convDown = (homePrice * downPaymentPct) / 100;
  const convLoan = homePrice - convDown;
  const convMonthlyRate = interestRateConv / 100 / 12;
  const convPmt =
    (convLoan * convMonthlyRate * Math.pow(1 + convMonthlyRate, 360)) /
    (Math.pow(1 + convMonthlyRate, 360) - 1);

  // Conventional PMI rate based on credit score (approx 0.75% for 680, 0.45% for 740+)
  const pmiRate = creditScore >= 740 ? 0.45 : creditScore >= 680 ? 0.75 : 1.15;
  const convMonthlyPMI = (convLoan * (pmiRate / 100)) / 12;

  const convMonthlyPiti = Math.round(
    convPmt + (homePrice * 0.012) / 12 + 100 + convMonthlyPMI
  );
  const convUpfrontCash = Math.round(convDown + homePrice * 0.03);

  // Conventional PMI cancels at 80% LTV (~Year 8 or 9)
  const convPMICancelMonth = 96;
  const convTotal30YrCost = Math.round(convPmt * 360 + convMonthlyPMI * convPMICancelMonth + (homePrice * 0.012) * 30 + 1200 * 30);
  const fhaTotal30YrCost = Math.round(fhaCalc.totalMonthlyPiti * 360);

  // Find Crossover Month where Conventional total cost catches up/exceeds or stays cheaper
  let crossoverMonth = 72; // default ~6 years
  if (convMonthlyPiti < fhaCalc.totalMonthlyPiti) {
    crossoverMonth = 1; // Immediately cheaper
  } else {
    crossoverMonth = Math.round((fhaCalc.ufmipAmount / Math.abs(convMonthlyPiti - fhaCalc.totalMonthlyPiti)));
  }

  const recommendation =
    creditScore >= 720 && downPaymentPct >= 5.0
      ? "Conventional is Recommended (Lower total lifetime cost & cancellable PMI)"
      : "FHA is Recommended (Lower interest rate & flexible underwriting limits)";

  return {
    fhaMonthlyPiti: fhaCalc.totalMonthlyPiti,
    fhaUpfrontCash: fhaCalc.totalUpfrontCashRequired,
    fhaTotal30YrCost,
    convMonthlyPiti,
    convUpfrontCash,
    convTotal30YrCost,
    crossoverMonth: Math.min(360, Math.max(1, crossoverMonth)),
    recommendation,
  };
}

export function calculateCountyLimit(input: CountyLimitInput): CountyLimitResult {
  const { propertyType = "Single Family", customLimit, proposedLoanAmount } = input;

  // 2024 Baseline FHA Floor & Ceiling by Property Type
  const limits: Record<string, { floor: number; ceiling: number }> = {
    "Single Family": { floor: 498257, ceiling: 1149825 },
    Duplex: { floor: 637950, ceiling: 1472250 },
    Triplex: { floor: 771125, ceiling: 1779525 },
    Fourplex: { floor: 958350, ceiling: 2211600 },
  };

  const current = limits[propertyType] || limits["Single Family"];
  const appliedLimit = customLimit || current.floor;

  const isWithinLimit = proposedLoanAmount <= appliedLimit;
  const statusMessage = isWithinLimit
    ? `Eligible: Proposed loan of $${proposedLoanAmount.toLocaleString()} is within the $${appliedLimit.toLocaleString()} limit for ${propertyType}.`
    : `Exceeds Limit: Proposed loan of $${proposedLoanAmount.toLocaleString()} exceeds the $${appliedLimit.toLocaleString()} FHA limit. Jumbo or Conventional financing required.`;

  return {
    floorLimit: current.floor,
    ceilingLimit: current.ceiling,
    appliedLimit,
    isWithinLimit,
    statusMessage,
  };
}

export function calculateFHADTI(input: FHADTIInput): FHADTIResult {
  const { grossMonthlyIncome, proposedHousingPayment, existingMonthlyDebt } = input;

  if (grossMonthlyIncome <= 0) {
    return {
      frontEndDTI: 0,
      backEndDTI: 0,
      meetsStandard31_43: false,
      meetsAUS_46_56: false,
      statusBadge: "Invalid Income",
    };
  }

  const frontEndDTI = Number(((proposedHousingPayment / grossMonthlyIncome) * 100).toFixed(1));
  const totalMonthlyOutflow = proposedHousingPayment + existingMonthlyDebt;
  const backEndDTI = Number(((totalMonthlyOutflow / grossMonthlyIncome) * 100).toFixed(1));

  const meetsStandard31_43 = frontEndDTI <= 31.0 && backEndDTI <= 43.0;
  const meetsAUS_46_56 = frontEndDTI <= 46.9 && backEndDTI <= 56.9;

  let statusBadge = "Exceeds Maximum DTI";
  if (meetsStandard31_43) {
    statusBadge = "Likely Approved (Meets 31/43 Standard)";
  } else if (meetsAUS_46_56) {
    statusBadge = "Compensating Factors Needed (AUS Approval Limit)";
  }

  return {
    frontEndDTI,
    backEndDTI,
    meetsStandard31_43,
    meetsAUS_46_56,
    statusBadge,
  };
}

export function calculateFHA203k(input: FHA203kInput): FHA203kResult {
  const { purchasePrice, repairEscrowBudget, contingencyPct = 15, arv } = input;

  const contingencyAmount = (repairEscrowBudget * contingencyPct) / 100;
  const totalRenovationBudget = Math.round(repairEscrowBudget + contingencyAmount);
  const base203kLoanAmount = Math.round((purchasePrice + totalRenovationBudget) * 0.965); // 3.5% down

  const ufmipAmount = Math.round(base203kLoanAmount * 0.0175);
  const totalFinancedLoanAmount = base203kLoanAmount + ufmipAmount;

  const monthlyRate = 6.5 / 100 / 12;
  const estimatedMonthlyPayment = Math.round(
    (totalFinancedLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, 360)) /
      (Math.pow(1 + monthlyRate, 360) - 1) +
      (base203kLoanAmount * 0.0055) / 12
  );

  return {
    totalRenovationBudget,
    base203kLoanAmount,
    ufmipAmount,
    totalFinancedLoanAmount,
    estimatedMonthlyPayment,
  };
}

export function calculateFHAPrepayment(input: FHAPrepaymentInput): FHAPrepaymentResult {
  const { baseLoanAmount, interestRate, loanTermYears, extraMonthlyPayment } = input;

  const monthlyRate = interestRate / 100 / 12;
  const originalMonths = loanTermYears * 12;
  const basePmt =
    (baseLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, originalMonths)) /
    (Math.pow(1 + monthlyRate, originalMonths) - 1);

  const newMonthlyPmt = basePmt + extraMonthlyPayment;
  let balance = baseLoanAmount;
  let newMonths = 0;
  let newTotalInterest = 0;

  while (balance > 0.01 && newMonths < originalMonths) {
    newMonths++;
    const mInterest = balance * monthlyRate;
    let pay = newMonthlyPmt;
    if (pay > balance + mInterest) pay = balance + mInterest;
    const pPaid = pay - mInterest;
    newTotalInterest += mInterest;
    balance = Math.max(0, balance - pPaid);
  }

  const originalTotalInterest = basePmt * originalMonths - baseLoanAmount;
  const monthsSaved = Math.max(0, originalMonths - newMonths);
  const interestSaved = Math.max(0, Math.round(originalTotalInterest - newTotalInterest));
  const mipSaved = Math.round(((baseLoanAmount * 0.0055) / 12) * monthsSaved);

  return {
    originalMonths,
    newMonths,
    monthsSaved,
    interestSaved,
    mipSaved,
  };
}

export function calculateFHALoanCalculator(inputs: Record<string, any>): Record<string, any> {
  const homePrice = parseFloat(inputs.homePrice) || 350000;
  const downPaymentPct = parseFloat(inputs.downPaymentPct) || 3.5;
  const interestRate = parseFloat(inputs.interestRate) || 6.5;

  const res = calculateFHALoan({
    homePrice,
    downPaymentPct,
    creditScoreBand: "580+",
    loanTermYears: 30,
    interestRate,
    financeUfmip: true,
    propertyTaxAnnual: 3600,
    homeInsuranceAnnual: 1400,
    hoaDuesMonthly: 0,
    estimatedClosingCostsPct: 3.0,
    sellerConcessionsPct: 0,
    currencySymbol: "$",
  });

  return {
    totalMonthlyPiti: `$${res.totalMonthlyPiti.toLocaleString()}`,
    monthlyPrincipalAndInterest: `$${res.monthlyPrincipalAndInterest.toLocaleString()}`,
    monthlyMipAmount: `$${res.monthlyMipAmount.toLocaleString()}`,
    totalUpfrontCashRequired: `$${res.totalUpfrontCashRequired.toLocaleString()}`,
    baseLoanAmount: `$${res.baseLoanAmount.toLocaleString()}`,
    totalFinancedLoanAmount: `$${res.totalFinancedLoanAmount.toLocaleString()}`,
  };
}
