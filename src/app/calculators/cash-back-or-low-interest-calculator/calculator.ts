import {
  CashBackInput,
  CashBackResult,
  OfferDetails,
  MonthAmortizationRow,
  BreakevenRateInput,
  BreakevenRateResult,
  ReinvestmentInput,
  ReinvestmentResult,
  MultiOfferInput,
  MultiOfferResult,
  EarlyPayoffInput,
  EarlyPayoffResult,
  NegativeEquityInput,
  NegativeEquityResult,
} from "./types";

export function calculateCashBackVsLowInterest(input: CashBackInput): CashBackResult {
  const {
    cashBackAmount = 1000,
    highInterestRate = 5.0,
    lowInterestRate = 2.0,
    autoPrice = 50000,
    loanTermMonths = 60,
    downPayment = 10000,
    tradeInValue = 0,
    salesTaxRate = 7.0,
    fees = 2000,
    includeFeesInLoan = false,
    taxAfterRebate = false,
    currencySymbol = "$",
  } = input;

  const n = Math.max(1, loanTermMonths);

  // Sales Tax Calculation
  const taxablePriceCashBack = taxAfterRebate ? Math.max(0, autoPrice - cashBackAmount) : autoPrice;
  const salesTaxCashBack = (taxablePriceCashBack * salesTaxRate) / 100;
  const salesTaxLow = (autoPrice * salesTaxRate) / 100;

  // Upfront Payments
  const upfrontCashBack = downPayment + tradeInValue + (includeFeesInLoan ? 0 : fees) + salesTaxCashBack;
  const upfrontLow = downPayment + tradeInValue + (includeFeesInLoan ? 0 : fees) + salesTaxLow;

  // Loan Amounts
  let loanAmountCashBack = autoPrice - cashBackAmount - downPayment - tradeInValue;
  if (includeFeesInLoan) loanAmountCashBack += fees + salesTaxCashBack;

  let loanAmountLow = autoPrice - downPayment - tradeInValue;
  if (includeFeesInLoan) loanAmountLow += fees + salesTaxLow;

  loanAmountCashBack = Math.max(0, loanAmountCashBack);
  loanAmountLow = Math.max(0, loanAmountLow);

  // Monthly Rates
  const rHigh = highInterestRate / 100 / 12;
  const rLow = lowInterestRate / 100 / 12;

  // Monthly Payments
  const monthlyCashBack =
    loanAmountCashBack > 0
      ? rHigh > 0
        ? (loanAmountCashBack * rHigh * Math.pow(1 + rHigh, n)) / (Math.pow(1 + rHigh, n) - 1)
        : loanAmountCashBack / n
      : 0;

  const monthlyLow =
    loanAmountLow > 0
      ? rLow > 0
        ? (loanAmountLow * rLow * Math.pow(1 + rLow, n)) / (Math.pow(1 + rLow, n) - 1)
        : loanAmountLow / n
      : 0;

  const totalPaymentsCashBack = monthlyCashBack * n;
  const totalInterestCashBack = Math.max(0, totalPaymentsCashBack - loanAmountCashBack);
  const totalCostCashBack = upfrontCashBack + totalPaymentsCashBack;

  const totalPaymentsLow = monthlyLow * n;
  const totalInterestLow = Math.max(0, totalPaymentsLow - loanAmountLow);
  const totalCostLow = upfrontLow + totalPaymentsLow;

  // Decision & Savings
  let winningOffer: "Low Interest Rate Offer" | "Cash Back Offer" | "Tie" = "Tie";
  let savingsAmount = Math.abs(totalCostCashBack - totalCostLow);

  if (Math.abs(totalCostCashBack - totalCostLow) < 0.5) {
    winningOffer = "Tie";
  } else if (totalCostLow < totalCostCashBack) {
    winningOffer = "Low Interest Rate Offer";
  } else {
    winningOffer = "Cash Back Offer";
  }

  const interestDiff = Math.abs(totalInterestCashBack - totalInterestLow);
  let winningMessage = "";
  let subMessage = "";

  if (winningOffer === "Low Interest Rate Offer") {
    winningMessage = "The Low Interest Rate Offer is Better!";
    subMessage = `The low rate will save you ${currencySymbol}${Math.round(savingsAmount).toLocaleString()} in overall cost (${currencySymbol}${Math.round(interestDiff).toLocaleString()} interest savings vs ${currencySymbol}${Math.round(cashBackAmount).toLocaleString()} cash back).`;
  } else if (winningOffer === "Cash Back Offer") {
    winningMessage = "The Cash Back Offer is Better!";
    subMessage = `The cash back rebate will save you ${currencySymbol}${Math.round(savingsAmount).toLocaleString()} overall compared to the low interest offer.`;
  } else {
    winningMessage = "Both Offers Cost Exactly the Same!";
    subMessage = "Both financial routes yield identical overall costs under these parameters.";
  }

  // Calculate Breakeven Outside APR
  // Solves for highRate where totalCostCashBack === totalCostLow
  let breakevenRate = highInterestRate;
  let lowR = 0;
  let highR = 30.0;
  for (let i = 0; i < 30; i++) {
    const midR = (lowR + highR) / 2;
    const rMid = midR / 100 / 12;
    const mMid =
      rMid > 0
        ? (loanAmountCashBack * rMid * Math.pow(1 + rMid, n)) / (Math.pow(1 + rMid, n) - 1)
        : loanAmountCashBack / n;
    const costMid = upfrontCashBack + mMid * n;
    if (costMid < totalCostLow) {
      lowR = midR;
    } else {
      highR = midR;
    }
  }
  breakevenRate = Number(((lowR + highR) / 2).toFixed(2));

  // Amortization Schedule
  const amortizationSchedule: MonthAmortizationRow[] = [];
  let balCash = loanAmountCashBack;
  let balLow = loanAmountLow;

  for (let m = 1; m <= n; m++) {
    const intCash = balCash * rHigh;
    const prinCash = Math.min(balCash, monthlyCashBack - intCash);
    balCash = Math.max(0, balCash - prinCash);

    const intLow = balLow * rLow;
    const prinLow = Math.min(balLow, monthlyLow - intLow);
    balLow = Math.max(0, balLow - prinLow);

    amortizationSchedule.push({
      month: m,
      cashBackBalance: Math.round(balCash),
      cashBackPayment: Number(monthlyCashBack.toFixed(2)),
      cashBackInterest: Number(intCash.toFixed(2)),
      lowInterestBalance: Math.round(balLow),
      lowInterestPayment: Number(monthlyLow.toFixed(2)),
      lowInterestInterest: Number(intLow.toFixed(2)),
    });
  }

  const cashBackOffer: OfferDetails = {
    totalLoanAmount: Math.round(loanAmountCashBack),
    salesTax: Math.round(salesTaxCashBack),
    upfrontPayment: Math.round(upfrontCashBack),
    monthlyPayment: Number(monthlyCashBack.toFixed(2)),
    totalPayments: Math.round(totalPaymentsCashBack),
    totalInterest: Math.round(totalInterestCashBack),
    totalCost: Math.round(totalCostCashBack),
  };

  const lowInterestOffer: OfferDetails = {
    totalLoanAmount: Math.round(loanAmountLow),
    salesTax: Math.round(salesTaxLow),
    upfrontPayment: Math.round(upfrontLow),
    monthlyPayment: Number(monthlyLow.toFixed(2)),
    totalPayments: Math.round(totalPaymentsLow),
    totalInterest: Math.round(totalInterestLow),
    totalCost: Math.round(totalCostLow),
  };

  return {
    winningOffer,
    winningMessage,
    subMessage,
    savingsAmount: Math.round(savingsAmount),
    breakevenRate,
    cashBackOffer,
    lowInterestOffer,
    amortizationSchedule,
  };
}

export function calculateBreakevenRate(input: BreakevenRateInput): BreakevenRateResult {
  const { autoPrice = 50000, cashBackAmount = 1000, lowInterestRate = 2.0, loanTermMonths = 60 } = input;

  const res = calculateCashBackVsLowInterest({
    cashBackAmount,
    highInterestRate: 5.0,
    lowInterestRate,
    autoPrice,
    loanTermMonths,
    downPayment: 10000,
    tradeInValue: 0,
    salesTaxRate: 7.0,
    fees: 2000,
    includeFeesInLoan: false,
    taxAfterRebate: false,
    reinvestmentRate: 5.0,
    currencySymbol: "$",
  });

  return {
    breakevenRate: res.breakevenRate,
    explanation: `If your outside bank interest rate is BELOW ${res.breakevenRate}%, take the Cash Back Rebate. If your outside loan rate is ABOVE ${res.breakevenRate}%, choose the Low Interest Rate Offer (${lowInterestRate}%).`,
  };
}

export function calculateReinvestment(input: ReinvestmentInput): ReinvestmentResult {
  const { cashBackAmount = 1000, reinvestmentRate = 5.0, monthlySavings = 34.87, loanTermMonths = 60 } = input;

  const rMonthly = reinvestmentRate / 100 / 12;
  const n = loanTermMonths;

  // Path A: Invest lump sum cash rebate
  const futureReinvestedRebate = Math.round(cashBackAmount * Math.pow(1 + rMonthly, n));

  // Path B: Invest monthly payment savings from low APR
  const futureMonthlySavings = Math.round(
    rMonthly > 0 ? monthlySavings * ((Math.pow(1 + rMonthly, n) - 1) / rMonthly) : monthlySavings * n
  );

  const winner = futureReinvestedRebate > futureMonthlySavings ? "Reinvested Cash Rebate" : "Monthly Savings Investment";
  const explanation =
    futureReinvestedRebate > futureMonthlySavings
      ? `Investing the $${cashBackAmount.toLocaleString()} rebate immediately at ${reinvestmentRate}% yields $${futureReinvestedRebate.toLocaleString()} after ${n} months, beating monthly payment savings ($${futureMonthlySavings.toLocaleString()}).`
      : `Investing $${monthlySavings.toFixed(2)}/mo savings at ${reinvestmentRate}% yields $${futureMonthlySavings.toLocaleString()}, beating lump sum rebate ($${futureReinvestedRebate.toLocaleString()}).`;

  return {
    futureReinvestedRebate,
    futureMonthlySavings,
    winner,
    explanation,
  };
}

export function calculateMultiOffer(input: MultiOfferInput): MultiOfferResult {
  const {
    autoPrice = 50000,
    loanTermMonths = 60,
    offer1Rebate = 0,
    offer1Rate = 0.0,
    offer2Rebate = 1500,
    offer2Rate = 2.9,
    offer3Rebate = 3500,
    offer3Rate = 6.9,
  } = input;

  const o1 = calculateCashBackVsLowInterest({
    cashBackAmount: offer1Rebate,
    highInterestRate: offer1Rate,
    lowInterestRate: offer1Rate,
    autoPrice,
    loanTermMonths,
    downPayment: 10000,
    tradeInValue: 0,
    salesTaxRate: 7.0,
    fees: 2000,
    includeFeesInLoan: false,
    taxAfterRebate: false,
    reinvestmentRate: 5.0,
    currencySymbol: "$",
  });

  const o2 = calculateCashBackVsLowInterest({
    cashBackAmount: offer2Rebate,
    highInterestRate: offer2Rate,
    lowInterestRate: offer2Rate,
    autoPrice,
    loanTermMonths,
    downPayment: 10000,
    tradeInValue: 0,
    salesTaxRate: 7.0,
    fees: 2000,
    includeFeesInLoan: false,
    taxAfterRebate: false,
    reinvestmentRate: 5.0,
    currencySymbol: "$",
  });

  const o3 = calculateCashBackVsLowInterest({
    cashBackAmount: offer3Rebate,
    highInterestRate: offer3Rate,
    lowInterestRate: offer3Rate,
    autoPrice,
    loanTermMonths,
    downPayment: 10000,
    tradeInValue: 0,
    salesTaxRate: 7.0,
    fees: 2000,
    includeFeesInLoan: false,
    taxAfterRebate: false,
    reinvestmentRate: 5.0,
    currencySymbol: "$",
  });

  const costs = [
    { name: `Offer 1 ($${offer1Rebate} Rebate / ${offer1Rate}% Rate)`, cost: o1.cashBackOffer.totalCost },
    { name: `Offer 2 ($${offer2Rebate} Rebate / ${offer2Rate}% Rate)`, cost: o2.cashBackOffer.totalCost },
    { name: `Offer 3 ($${offer3Rebate} Rebate / ${offer3Rate}% Rate)`, cost: o3.cashBackOffer.totalCost },
  ];

  costs.sort((a, b) => a.cost - b.cost);

  return {
    offer1TotalCost: o1.cashBackOffer.totalCost,
    offer2TotalCost: o2.cashBackOffer.totalCost,
    offer3TotalCost: o3.cashBackOffer.totalCost,
    bestOfferName: costs[0].name,
  };
}

export function calculateEarlyPayoff(input: EarlyPayoffInput): EarlyPayoffResult {
  const { autoPrice = 50000, cashBackAmount = 1000, highRate = 5.0, lowRate = 2.0, payoffMonth = 24, loanTermMonths = 60 } = input;

  const res = calculateCashBackVsLowInterest({
    cashBackAmount,
    highInterestRate: highRate,
    lowInterestRate: lowRate,
    autoPrice,
    loanTermMonths,
    downPayment: 10000,
    tradeInValue: 0,
    salesTaxRate: 7.0,
    fees: 2000,
    includeFeesInLoan: false,
    taxAfterRebate: false,
    reinvestmentRate: 5.0,
    currencySymbol: "$",
  });

  let sumIntCash = 0;
  let sumIntLow = 0;

  const limit = Math.min(payoffMonth, res.amortizationSchedule.length);
  for (let m = 0; m < limit; m++) {
    sumIntCash += res.amortizationSchedule[m].cashBackInterest;
    sumIntLow += res.amortizationSchedule[m].lowInterestInterest;
  }

  const cashBackEarlyCost = Math.round(res.cashBackOffer.upfrontPayment + res.cashBackOffer.totalLoanAmount + sumIntCash);
  const lowInterestEarlyCost = Math.round(res.lowInterestOffer.upfrontPayment + res.lowInterestOffer.totalLoanAmount + sumIntLow);

  const interestSaved = Math.round(res.cashBackOffer.totalInterest - sumIntCash);
  const earlyWinner = cashBackEarlyCost < lowInterestEarlyCost ? "Cash Back Offer" : "Low Interest Offer";

  return {
    cashBackEarlyCost,
    lowInterestEarlyCost,
    earlyWinner,
    interestSaved,
  };
}

export function calculateNegativeEquity(input: NegativeEquityInput): NegativeEquityResult {
  const {
    tradeInValue = 12000,
    existingLoanBalance = 15000,
    autoPrice = 50000,
    cashBackAmount = 1000,
    highRate = 5.0,
    lowRate = 2.0,
    loanTermMonths = 60,
  } = input;

  const netTradeInEquity = tradeInValue - existingLoanBalance;
  const isNegativeEquity = netTradeInEquity < 0;
  const rolledInAmount = Math.abs(Math.min(0, netTradeInEquity));

  const res = calculateCashBackVsLowInterest({
    cashBackAmount,
    highInterestRate: highRate,
    lowInterestRate: lowRate,
    autoPrice: autoPrice + rolledInAmount,
    loanTermMonths,
    downPayment: 0,
    tradeInValue: 0,
    salesTaxRate: 7.0,
    fees: 2000,
    includeFeesInLoan: false,
    taxAfterRebate: false,
    reinvestmentRate: 5.0,
    currencySymbol: "$",
  });

  const recommendation =
    "Rolling negative equity into a low APR (0%–2%) loan protects you from compounding high interest on the underwater balance.";

  return {
    netTradeInEquity,
    isNegativeEquity,
    rolledInAmount,
    cashBackMonthly: res.cashBackOffer.monthlyPayment,
    lowInterestMonthly: res.lowInterestOffer.monthlyPayment,
    recommendation,
  };
}

export function calculateCashBackOrLowInterestCalculator(inputs: Record<string, any>): Record<string, any> {
  const autoPrice = parseFloat(inputs.autoPrice) || 50000;
  const cashBackAmount = parseFloat(inputs.cashBackAmount) || 1000;

  const res = calculateCashBackVsLowInterest({
    cashBackAmount,
    highInterestRate: parseFloat(inputs.highInterestRate) || 5.0,
    lowInterestRate: parseFloat(inputs.lowInterestRate) || 2.0,
    autoPrice,
    loanTermMonths: parseFloat(inputs.loanTermMonths) || 60,
    downPayment: parseFloat(inputs.downPayment) || 10000,
    tradeInValue: parseFloat(inputs.tradeInValue) || 0,
    salesTaxRate: parseFloat(inputs.salesTaxRate) || 7.0,
    fees: parseFloat(inputs.fees) || 2000,
    includeFeesInLoan: false,
    taxAfterRebate: false,
    reinvestmentRate: 5.0,
    currencySymbol: "$",
  });

  return {
    winningMessage: res.winningMessage,
    savingsAmount: `$${res.savingsAmount.toLocaleString()}`,
    cashBackMonthly: `$${res.cashBackOffer.monthlyPayment}`,
    lowInterestMonthly: `$${res.lowInterestOffer.monthlyPayment}`,
  };
}
