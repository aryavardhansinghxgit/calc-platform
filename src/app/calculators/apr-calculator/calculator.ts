import {
  StandardAPRInput,
  StandardAPRResult,
  MortgageAPRInput,
  MortgageAPRResult,
  CreditCardAPRInput,
  CreditCardAPRResult,
  ReverseAPRInput,
  ReverseAPRResult,
  LoanOfferItem,
  LoanOfferResult,
  PrepaymentInput,
  PrepaymentResult,
} from "./types";

export function solveAPRNewtonRaphson(
  amountFinanced: number,
  periodicPayment: number,
  totalPeriods: number,
  periodsPerYear: number = 12
): number {
  if (amountFinanced <= 0 || periodicPayment <= 0 || totalPeriods <= 0) return 0;

  // Total payments must exceed amount financed for positive APR
  if (periodicPayment * totalPeriods <= amountFinanced) return 0;

  let r = 0.01; // Initial guess 1% per period
  const maxIter = 100;
  const tol = 1e-7;

  for (let i = 0; i < maxIter; i++) {
    let pv = 0;
    let dpv = 0;

    for (let t = 1; t <= totalPeriods; t++) {
      const denom = Math.pow(1 + r, t);
      pv += periodicPayment / denom;
      dpv -= (t * periodicPayment) / Math.pow(1 + r, t + 1);
    }

    const diff = pv - amountFinanced;
    if (Math.abs(diff) < tol) break;
    if (Math.abs(dpv) < 1e-12) break;

    const rNext = r - diff / dpv;
    if (isNaN(rNext) || !isFinite(rNext) || rNext <= -0.9) break;
    r = rNext;
  }

  const annualAPR = r * periodsPerYear * 100;
  return isNaN(annualAPR) || !isFinite(annualAPR) ? 0 : Number(annualAPR.toFixed(3));
}

export function calculateStandardAPR(input: StandardAPRInput): StandardAPRResult {
  const {
    loanAmount = 100000,
    interestRate = 6.0,
    loanTermYears = 10,
    loanTermMonths = 0,
    upfrontFees = 2500,
    payback = "monthly",
  } = input;

  const periodsPerYear = payback === "weekly" ? 52 : payback === "bi-weekly" ? 26 : 12;
  const totalPeriods = (loanTermYears * 12 + loanTermMonths) * (periodsPerYear / 12);

  const nominalRate = interestRate;
  const periodicRate = nominalRate / 100 / periodsPerYear;

  const periodicPayment =
    loanAmount > 0 && periodicRate > 0 && totalPeriods > 0
      ? (loanAmount * periodicRate * Math.pow(1 + periodicRate, totalPeriods)) /
        (Math.pow(1 + periodicRate, totalPeriods) - 1)
      : 0;

  const amountFinanced = Math.max(0, loanAmount - upfrontFees);
  const totalPayments = periodicPayment * totalPeriods;
  const totalInterest = totalPayments - loanAmount;

  const realAPR = solveAPRNewtonRaphson(
    amountFinanced,
    periodicPayment,
    totalPeriods,
    periodsPerYear
  );

  const aprGap = Number((realAPR - nominalRate).toFixed(3));

  return {
    realAPR,
    nominalRate,
    periodicPayment: Math.round(periodicPayment * 100) / 100,
    totalPayments: Math.round(totalPayments * 100) / 100,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalFees: upfrontFees,
    amountFinanced,
    aprGap,
  };
}

export function calculateMortgageAPR(input: MortgageAPRInput): MortgageAPRResult {
  const {
    houseValue = 350000,
    downPayment = 70000,
    loanTermYears = 30,
    interestRate = 6.2,
    loanFees = 3500,
    pointsPct = 0.5,
    pmiPerYear = 0,
  } = input;

  const loanAmount = Math.max(0, houseValue - downPayment);
  const pointsFee = (loanAmount * pointsPct) / 100;
  const totalUpfrontFees = loanFees + pointsFee;

  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  const baseMonthlyPayment =
    loanAmount > 0 && monthlyRate > 0 && totalMonths > 0
      ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1)
      : 0;

  const monthlyPMI = pmiPerYear / 12;
  const totalMonthlyPayment = baseMonthlyPayment + monthlyPMI;

  const amountFinanced = Math.max(0, loanAmount - totalUpfrontFees);
  const realAPR = solveAPRNewtonRaphson(
    amountFinanced,
    baseMonthlyPayment, // Standard TILA APR evaluates base P&I against net financed
    totalMonths,
    12
  );

  const totalPayments = totalMonthlyPayment * totalMonths;
  const totalInterest = baseMonthlyPayment * totalMonths - loanAmount;

  return {
    loanAmount,
    downPaymentAmount: downPayment,
    pointsFee: Math.round(pointsFee),
    totalUpfrontFees: Math.round(totalUpfrontFees),
    monthlyPayment: Math.round(totalMonthlyPayment * 100) / 100,
    realAPR,
    totalPayments: Math.round(totalPayments),
    totalInterest: Math.round(totalInterest),
  };
}

export function calculateCreditCardAPR(input: CreditCardAPRInput): CreditCardAPRResult {
  const {
    balance = 5000,
    apr = 21.99,
    minPaymentPct = 2.5,
    minPaymentFloor = 25,
    extraMonthlyPayment = 50,
  } = input;

  let currentBalance = balance;
  const monthlyRate = apr / 100 / 12;
  let months = 0;
  let totalInterest = 0;
  let totalPaid = 0;

  const maxMonths = 600; // 50 years safety limit

  while (currentBalance > 0.01 && months < maxMonths) {
    months++;
    const monthlyInterest = currentBalance * monthlyRate;
    let minPay = Math.max(minPaymentFloor, currentBalance * (minPaymentPct / 100));
    let pay = minPay + extraMonthlyPayment;

    if (pay > currentBalance + monthlyInterest) {
      pay = currentBalance + monthlyInterest;
    }

    const principalPaid = pay - monthlyInterest;
    totalInterest += monthlyInterest;
    totalPaid += pay;
    currentBalance = Math.max(0, currentBalance - principalPaid);
  }

  const yearsToPayoff = Number((months / 12).toFixed(1));

  // Baseline calculation (without extra payment) for comparison
  let baseBalance = balance;
  let baseMonths = 0;
  let baseInterest = 0;
  while (baseBalance > 0.01 && baseMonths < maxMonths) {
    baseMonths++;
    const mInterest = baseBalance * monthlyRate;
    let mPay = Math.max(minPaymentFloor, baseBalance * (minPaymentPct / 100));
    if (mPay > baseBalance + mInterest) mPay = baseBalance + mInterest;
    const pPaid = mPay - mInterest;
    baseInterest += mInterest;
    baseBalance = Math.max(0, baseBalance - pPaid);
  }

  const interestSaved = Math.max(0, Math.round(baseInterest - totalInterest));

  return {
    monthsToPayoff: months,
    yearsToPayoff,
    totalInterestPaid: Math.round(totalInterest),
    totalAmountPaid: Math.round(totalPaid),
    interestSaved,
  };
}

export function calculateReverseAPR(input: ReverseAPRInput): ReverseAPRResult {
  const {
    desiredMonthlyPayment = 500,
    loanTermYears = 5,
    upfrontFees = 1000,
    targetAPR = 7.5,
  } = input;

  const totalMonths = loanTermYears * 12;
  const monthlyRate = targetAPR / 100 / 12;

  // Present Value of annuity: P_financed = PMT * (1 - (1+r)^-N) / r
  const amountFinanced =
    monthlyRate > 0
      ? (desiredMonthlyPayment * (1 - Math.pow(1 + monthlyRate, -totalMonths))) / monthlyRate
      : desiredMonthlyPayment * totalMonths;

  const maxBorrowingCapacity = Math.round(amountFinanced + upfrontFees);
  const totalFinanceCharges = Math.round(desiredMonthlyPayment * totalMonths - amountFinanced);

  return {
    maxBorrowingCapacity,
    baseInterestRate: targetAPR,
    totalFinanceCharges,
  };
}

export function calculateLoanComparison(offers: LoanOfferItem[]): LoanOfferResult[] {
  if (!offers || offers.length === 0) return [];

  const results: LoanOfferResult[] = offers.map((offer) => {
    const calc = calculateStandardAPR({
      loanAmount: offer.loanAmount,
      interestRate: offer.nominalRate,
      loanTermYears: offer.loanTermYears,
      loanTermMonths: 0,
      upfrontFees: offer.upfrontFees,
      compounding: "monthly",
      payback: "monthly",
      currencySymbol: "$",
    });

    return {
      id: offer.id,
      name: offer.name,
      realAPR: calc.realAPR,
      monthlyPayment: calc.periodicPayment,
      totalPayments: calc.totalPayments,
      totalInterest: calc.totalInterest,
      totalFees: offer.upfrontFees,
      isBestValue: false,
    };
  });

  // Find lowest APR
  let minAPR = Infinity;
  let bestIdx = -1;
  results.forEach((r, idx) => {
    if (r.realAPR > 0 && r.realAPR < minAPR) {
      minAPR = r.realAPR;
      bestIdx = idx;
    }
  });

  if (bestIdx >= 0) {
    results[bestIdx].isBestValue = true;
  }

  return results;
}

export function calculatePrepaymentAPR(input: PrepaymentInput): PrepaymentResult {
  const {
    loanAmount = 25000,
    nominalRate = 7.0,
    loanTermYears = 5,
    upfrontFees = 500,
    extraMonthlyPayment = 100,
  } = input;

  const originalCalc = calculateStandardAPR({
    loanAmount,
    interestRate: nominalRate,
    loanTermYears,
    loanTermMonths: 0,
    upfrontFees,
    compounding: "monthly",
    payback: "monthly",
    currencySymbol: "$",
  });

  const originalMonths = loanTermYears * 12;
  const basePayment = originalCalc.periodicPayment;
  const newMonthlyPayment = basePayment + extraMonthlyPayment;
  const monthlyRate = nominalRate / 100 / 12;

  let balance = loanAmount;
  let newMonths = 0;
  let newTotalInterest = 0;

  while (balance > 0.01 && newMonths < originalMonths) {
    newMonths++;
    const mInterest = balance * monthlyRate;
    let pay = newMonthlyPayment;
    if (pay > balance + mInterest) pay = balance + mInterest;
    const principalPaid = pay - mInterest;
    newTotalInterest += mInterest;
    balance = Math.max(0, balance - principalPaid);
  }

  const monthsSaved = Math.max(0, originalMonths - newMonths);
  const interestSaved = Math.max(0, Math.round(originalCalc.totalInterest - newTotalInterest));

  const amountFinanced = Math.max(0, loanAmount - upfrontFees);
  const realizedAPR = solveAPRNewtonRaphson(
    amountFinanced,
    newMonthlyPayment,
    newMonths,
    12
  );

  return {
    originalMonths,
    newMonths,
    monthsSaved,
    originalTotalInterest: Math.round(originalCalc.totalInterest),
    newTotalInterest: Math.round(newTotalInterest),
    interestSaved,
    realizedAPR,
  };
}

export function calculateAPRCalculator(inputs: Record<string, any>): Record<string, any> {
  const loanAmount = parseFloat(inputs.loanAmount) || 100000;
  const interestRate = parseFloat(inputs.interestRate) || 6.0;
  const loanTermYears = parseFloat(inputs.loanTermYears) || 10;
  const upfrontFees = parseFloat(inputs.upfrontFees) || 2500;

  const res = calculateStandardAPR({
    loanAmount,
    interestRate,
    loanTermYears,
    loanTermMonths: 0,
    upfrontFees,
    compounding: "monthly",
    payback: "monthly",
    currencySymbol: "$",
  });

  return {
    realAPR: `${res.realAPR}%`,
    nominalRate: `${res.nominalRate}%`,
    periodicPayment: `$${res.periodicPayment.toLocaleString()}`,
    totalPayments: `$${res.totalPayments.toLocaleString()}`,
    totalInterest: `$${res.totalInterest.toLocaleString()}`,
    totalFees: `$${res.totalFees.toLocaleString()}`,
  };
}
