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
  const homePrice = Math.max(0, input.homePrice ?? 350000);
  const rawDownPct = Math.max(0, input.downPaymentPct ?? 3.5);
  const creditScoreBand = input.creditScoreBand || "580+";
  const loanTermYears = Math.max(1, input.loanTermYears ?? 30);
  const interestRate = Math.max(0, input.interestRate ?? 6.5);
  const financeUfmip = input.financeUfmip !== undefined ? input.financeUfmip : true;
  const propertyTaxAnnual = Math.max(0, input.propertyTaxAnnual ?? 3600);
  const homeInsuranceAnnual = Math.max(0, input.homeInsuranceAnnual ?? 1400);
  const hoaDuesMonthly = Math.max(0, input.hoaDuesMonthly ?? 0);
  const estimatedClosingCostsPct = Math.max(0, input.estimatedClosingCostsPct ?? 3.0);
  const sellerConcessionsPct = Math.max(0, input.sellerConcessionsPct ?? 0);

  // Enforce minimum down payment rules based on credit score
  const minDownPct = creditScoreBand === "500-579" ? 10.0 : 3.5;
  const effectiveDownPaymentPct = Math.min(100, Math.max(rawDownPct, minDownPct));

  const downPaymentAmount = Math.round((homePrice * effectiveDownPaymentPct) / 100);
  const baseLoanAmount = Math.max(0, homePrice - downPaymentAmount);

  // Upfront MIP (UFMIP) = 1.75% of base loan
  const ufmipRate = 1.75;
  const ufmipAmount = Math.round((baseLoanAmount * ufmipRate) / 100);
  const totalFinancedLoanAmount = financeUfmip ? baseLoanAmount + ufmipAmount : baseLoanAmount;

  // Annual MIP Rate Determination (HUD Official Guidelines)
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

  // Monthly MIP is calculated based on BASE loan amount
  const monthlyMipAmount = Math.round((baseLoanAmount * (annualMipRate / 100)) / 12);

  // Monthly Principal & Interest Payment
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  let monthlyPrincipalAndInterest = 0;
  if (totalFinancedLoanAmount > 0 && totalMonths > 0) {
    if (monthlyRate === 0) {
      monthlyPrincipalAndInterest = totalFinancedLoanAmount / totalMonths;
    } else {
      monthlyPrincipalAndInterest =
        (totalFinancedLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
  }

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
  const totalInterestOverTerm = Math.max(0, Math.round(totalPaymentsOverTerm - totalFinancedLoanAmount));

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

    const mInterest = monthlyRate > 0 ? balance * monthlyRate : 0;
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
  const homePrice = Math.max(0, input.homePrice || 350000);
  const downPaymentPct = Math.max(0, input.downPaymentPct || 3.5);
  const creditScore = Math.max(300, input.creditScore || 700);
  const interestRateFHA = Math.max(0, input.interestRateFHA || 6.5);
  const interestRateConv = Math.max(0, input.interestRateConv || 6.75);

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
    convLoan > 0 && convMonthlyRate > 0
      ? (convLoan * convMonthlyRate * Math.pow(1 + convMonthlyRate, 360)) /
        (Math.pow(1 + convMonthlyRate, 360) - 1)
      : convLoan / 360;

  // Conventional PMI rate based on credit score (approx 0.45% for 740+, 0.75% for 680-739, 1.15% for <680)
  const pmiRate = creditScore >= 740 ? 0.45 : creditScore >= 680 ? 0.75 : 1.15;
  const convMonthlyPMI = (convLoan * (pmiRate / 100)) / 12;

  const convMonthlyPiti = Math.round(
    convPmt + (homePrice * 0.012) / 12 + 100 + convMonthlyPMI
  );
  const convUpfrontCash = Math.round(convDown + homePrice * 0.03);

  // Conventional PMI cancels at 80% LTV (~Month 96 / Year 8)
  const convPMICancelMonth = 96;
  const convTotal30YrCost = Math.round(
    convPmt * 360 + convMonthlyPMI * convPMICancelMonth + (homePrice * 0.012) * 30 + 1200 * 30
  );
  const fhaTotal30YrCost = Math.round(fhaCalc.totalMonthlyPiti * 360);

  // Find Crossover Month where Conventional total cost catches up/exceeds or stays cheaper
  let crossoverMonth = 79;
  const monthlyDiff = convMonthlyPiti - fhaCalc.totalMonthlyPiti;
  if (monthlyDiff <= 0) {
    crossoverMonth = 1;
  } else {
    crossoverMonth = Math.min(360, Math.max(1, Math.round(fhaCalc.ufmipAmount / monthlyDiff)));
  }

  const recommendation =
    creditScore >= 720 && downPaymentPct >= 5.0
      ? "Conventional is Recommended (Lower lifetime cost & cancellable PMI)"
      : "FHA is Recommended (Lower interest rate & flexible underwriting limits)";

  return {
    fhaMonthlyPiti: fhaCalc.totalMonthlyPiti,
    fhaUpfrontCash: fhaCalc.totalUpfrontCashRequired,
    fhaTotal30YrCost,
    convMonthlyPiti,
    convUpfrontCash,
    convTotal30YrCost,
    crossoverMonth,
    recommendation,
  };
}

export function calculateCountyLimit(input: CountyLimitInput): CountyLimitResult {
  const { propertyType = "Single Family", customLimit, proposedLoanAmount = 0 } = input;

  // 2024 Baseline FHA Floor & Ceiling by Property Type (Time-Sensitive HUD benchmark data)
  const limits: Record<string, { floor: number; ceiling: number }> = {
    "Single Family": { floor: 498257, ceiling: 1149825 },
    Duplex: { floor: 637950, ceiling: 1472250 },
    Triplex: { floor: 771125, ceiling: 1779525 },
    Fourplex: { floor: 958350, ceiling: 2211600 },
  };

  const current = limits[propertyType] || limits["Single Family"];
  const appliedLimit = customLimit && customLimit > 0 ? customLimit : current.floor;

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
  const grossMonthlyIncome = Math.max(0, input.grossMonthlyIncome || 0);
  const proposedHousingPayment = Math.max(0, input.proposedHousingPayment || 0);
  const existingMonthlyDebt = Math.max(0, input.existingMonthlyDebt || 0);

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

  let statusBadge = "Above Maximum DTI Limit";
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
  const purchasePrice = Math.max(0, input.purchasePrice || 350000);
  const repairEscrowBudget = Math.max(0, input.repairEscrowBudget || 0);
  const contingencyPct = Math.max(0, input.contingencyPct ?? 15);

  const contingencyAmount = (repairEscrowBudget * contingencyPct) / 100;
  const totalRenovationBudget = Math.round(repairEscrowBudget + contingencyAmount);
  const totalProjectCost = purchasePrice + totalRenovationBudget;
  const base203kLoanAmount = Math.round(totalProjectCost * 0.965); // 3.5% down

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
  const baseLoanAmount = Math.max(0, input.baseLoanAmount || 0);
  const interestRate = Math.max(0, input.interestRate || 6.5);
  const loanTermYears = Math.max(1, input.loanTermYears || 30);
  const extraMonthlyPayment = Math.max(0, input.extraMonthlyPayment || 0);

  const monthlyRate = interestRate / 100 / 12;
  const originalMonths = loanTermYears * 12;

  let basePmt = 0;
  if (baseLoanAmount > 0 && originalMonths > 0) {
    if (monthlyRate === 0) {
      basePmt = baseLoanAmount / originalMonths;
    } else {
      basePmt =
        (baseLoanAmount * monthlyRate * Math.pow(1 + monthlyRate, originalMonths)) /
        (Math.pow(1 + monthlyRate, originalMonths) - 1);
    }
  }

  const newMonthlyPmt = basePmt + extraMonthlyPayment;
  let balance = baseLoanAmount;
  let newMonths = 0;
  let newTotalInterest = 0;

  while (balance > 0.01 && newMonths < originalMonths) {
    newMonths++;
    const mInterest = monthlyRate > 0 ? balance * monthlyRate : 0;
    let pay = newMonthlyPmt;
    if (pay > balance + mInterest) pay = balance + mInterest;
    const pPaid = pay - mInterest;
    newTotalInterest += mInterest;
    balance = Math.max(0, balance - pPaid);
  }

  const originalTotalInterest = Math.max(0, basePmt * originalMonths - baseLoanAmount);
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
  const loanTermYears = parseFloat(inputs.loanTermYears) || 30;

  const res = calculateFHALoan({
    homePrice,
    downPaymentPct,
    creditScoreBand: "580+",
    loanTermYears,
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
