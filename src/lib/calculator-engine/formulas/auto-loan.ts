import { PMT } from "@/lib/finance/financial-math";
import { US_STATE_TAXES } from "@/data/us-state-taxes";

export interface ExtendedAutoLoanInput {
  // Tab 1 & Core inputs
  vehiclePrice?: number;
  downPayment?: number;
  tradeInValue?: number;
  amountOwedOnTradeIn?: number;
  interestRate?: number; // APR %
  loanTermMonths?: number;
  salesTaxRate?: number; // %
  registrationFees?: number;
  dealerFees?: number;
  docFees?: number;
  extendedWarranty?: number;
  includeFeesInLoan?: boolean;
  stateCode?: string;

  // Extra features
  extraMonthlyPayment?: number;
  grossMonthlyIncome?: number;
  existingMonthlyDebt?: number;

  // Tab 2: Affordable Vehicle Price inputs
  desiredMonthlyPayment?: number;

  // Tab 3: Comparison Scenarios
  scenarioB?: {
    vehiclePrice: number;
    interestRate: number;
    loanTermMonths: number;
    downPayment: number;
  };
}

export interface AmortizationMonthRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  totalInterestPaid: number;
  remainingBalance: number;
  loanToValueRatio: number;
}

export interface AmortizationYearRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  endingBalance: number;
}

export interface TermOption {
  months: number;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  recommended: boolean;
  tag?: string;
}

export interface AutoLoanResult {
  monthlyPayment: number;
  loanAmount: number;
  totalInterestPaid: number;
  totalSalesTax: number;
  totalFees: number;
  totalPayment: number;
  totalCost: number;
  totalOutofPocketCost: number;

  // Trade-in Breakdown
  netTradeInEquity: number;
  isNegativeEquity: boolean;
  negativeEquityRollover: number;

  // Fee breakdown
  upfrontPaidFees: number;
  financedFees: number;

  // Key Ratios
  downPaymentPercentage: number;
  principalPercentage: number;
  interestPercentage: number;
  loanToValueRatio: number;

  // Schedules
  monthlySchedule: AmortizationMonthRow[];
  annualSchedule: AmortizationYearRow[];

  // Early Payoff Analysis
  earlyPayoff?: {
    extraMonthlyPayment: number;
    newMonthlyPayment: number;
    newPayoffMonths: number;
    monthsSaved: number;
    interestSaved: number;
    newPayoffDate: string;
  };

  // Term Comparison (36 to 84 months)
  termComparison: TermOption[];

  // Affordability Rating
  affordability?: {
    frontEndRatio: number; // payment / income %
    backEndRatio: number; // (payment + debt) / income %
    rating: "Excellent" | "Good" | "Moderate" | "Risky" | "Very Risky";
    explanation: string;
  };

  // Health Score (0-100)
  healthScore: {
    score: number;
    category: "Excellent" | "Good" | "Average" | "Poor";
    factors: { label: string; status: "good" | "warning" | "danger"; detail: string }[];
  };

  // Smart Insights
  insights: string[];

  // Tab 2 Output (Reverse Affordability)
  affordableResult?: {
    maxVehiclePrice: number;
    maxLoanAmount: number;
    maxTotalPurchaseCost: number;
  };

  // Tab 3 Output (Scenario Comparison)
  comparisonResult?: {
    scenarioA: { monthlyPayment: number; totalInterest: number; totalCost: number };
    scenarioB: { monthlyPayment: number; totalInterest: number; totalCost: number };
    interestDifference: number;
    monthlyDifference: number;
    recommendation: string;
  };
}

/**
 * Calculates complete Auto Loan financial analysis.
 */
export function calculateAutoLoanFormula(inputs: ExtendedAutoLoanInput): AutoLoanResult {
  const vehiclePrice = Math.max(0, Number(inputs.vehiclePrice) || 0);
  const downPayment = Math.max(0, Number(inputs.downPayment) || 0);
  const tradeInValue = Math.max(0, Number(inputs.tradeInValue) || 0);
  const amountOwedOnTradeIn = Math.max(0, Number(inputs.amountOwedOnTradeIn) || 0);
  const interestRate = Math.max(0, Number(inputs.interestRate) || 0);
  const loanTermMonths = Math.max(1, Math.min(120, Number(inputs.loanTermMonths) || 60));
  const includeFeesInLoan = inputs.includeFeesInLoan ?? true;

  // Fees itemization
  const regFees = Math.max(0, Number(inputs.registrationFees) || 0);
  const dealerFees = Math.max(0, Number(inputs.dealerFees) || 0);
  const docFees = Math.max(0, Number(inputs.docFees) || 0);
  const warranty = Math.max(0, Number(inputs.extendedWarranty) || 0);
  const totalFees = regFees + dealerFees + docFees + warranty;

  // Trade-In Net Equity Math
  const netTradeInEquity = tradeInValue - amountOwedOnTradeIn;
  const isNegativeEquity = netTradeInEquity < 0;
  const positiveTradeInEquity = Math.max(0, netTradeInEquity);
  const negativeEquityRollover = Math.abs(Math.min(0, netTradeInEquity));

  // Sales Tax & State Trade-In Credit Rule
  const stateCode = inputs.stateCode || "";
  const stateRule = stateCode ? US_STATE_TAXES[stateCode] : null;
  const allowsTradeInCredit = stateRule ? stateRule.tradeInTaxCredit : true; // default true for most states

  const salesTaxRate = Math.max(0, Number(inputs.salesTaxRate) || 0);
  const taxableVehicleBase = allowsTradeInCredit
    ? Math.max(0, vehiclePrice - tradeInValue)
    : vehiclePrice;
  const totalSalesTax = taxableVehicleBase * (salesTaxRate / 100);

  // Upfront vs Financed Fees & Taxes
  let financedFeesAndTax = 0;
  let upfrontPaidFees = 0;

  if (includeFeesInLoan) {
    financedFeesAndTax = totalSalesTax + totalFees;
    upfrontPaidFees = 0;
  } else {
    financedFeesAndTax = 0;
    upfrontPaidFees = totalSalesTax + totalFees;
  }

  // Financed Loan Amount
  // Formula: Vehicle Price - Down Payment - Positive Trade-In Equity + Negative Equity Rollover + Financed (Tax + Fees)
  const grossPurchaseCost = vehiclePrice + negativeEquityRollover + financedFeesAndTax;
  const totalUpfrontCredits = downPayment + positiveTradeInEquity;
  const loanAmount = Math.max(0, grossPurchaseCost - totalUpfrontCredits);

  // 1. Calculate Monthly Payment
  let monthlyPayment = 0;
  if (loanAmount > 0) {
    if (interestRate === 0) {
      monthlyPayment = loanAmount / loanTermMonths;
    } else {
      const monthlyRate = interestRate / 100 / 12;
      monthlyPayment = PMT(monthlyRate, loanTermMonths, loanAmount);
    }
  }

  const totalPayment = monthlyPayment * loanTermMonths;
  const totalInterestPaid = Math.max(0, totalPayment - loanAmount);
  const totalCost = vehiclePrice + totalSalesTax + totalFees + totalInterestPaid;
  const totalOutofPocketCost = downPayment + positiveTradeInEquity + upfrontPaidFees + totalPayment;

  // Percentages & Ratios
  const downPaymentPercentage = vehiclePrice > 0 ? (downPayment / vehiclePrice) * 100 : 0;
  const principalPercentage = totalCost > 0 ? (loanAmount / totalCost) * 100 : 0;
  const interestPercentage = totalCost > 0 ? (totalInterestPaid / totalCost) * 100 : 0;
  const loanToValueRatio = vehiclePrice > 0 ? (loanAmount / vehiclePrice) * 100 : 0;

  // 2. Amortization Schedule
  const monthlySchedule: AmortizationMonthRow[] = [];
  const annualScheduleMap: Record<number, { principal: number; interest: number; endingBalance: number }> = {};

  let currentBalance = loanAmount;
  let runningTotalInterest = 0;
  const monthlyRate = interestRate / 100 / 12;

  for (let m = 1; m <= loanTermMonths; m++) {
    if (currentBalance <= 0) break;

    const interestForMonth = interestRate === 0 ? 0 : currentBalance * monthlyRate;
    const principalForMonth = Math.min(currentBalance, monthlyPayment - interestForMonth);
    currentBalance = Math.max(0, currentBalance - principalForMonth);
    runningTotalInterest += interestForMonth;

    const currentLtv = vehiclePrice > 0 ? (currentBalance / vehiclePrice) * 100 : 0;

    monthlySchedule.push({
      month: m,
      payment: Math.round((principalForMonth + interestForMonth) * 100) / 100,
      principal: Math.round(principalForMonth * 100) / 100,
      interest: Math.round(interestForMonth * 100) / 100,
      totalInterestPaid: Math.round(runningTotalInterest * 100) / 100,
      remainingBalance: Math.round(currentBalance * 100) / 100,
      loanToValueRatio: Math.round(currentLtv * 10) / 10,
    });

    const yearNum = Math.ceil(m / 12);
    if (!annualScheduleMap[yearNum]) {
      annualScheduleMap[yearNum] = { principal: 0, interest: 0, endingBalance: 0 };
    }
    annualScheduleMap[yearNum].principal += principalForMonth;
    annualScheduleMap[yearNum].interest += interestForMonth;
    annualScheduleMap[yearNum].endingBalance = currentBalance;
  }

  const annualSchedule: AmortizationYearRow[] = Object.entries(annualScheduleMap).map(([yr, val]) => ({
    year: Number(yr),
    principalPaid: Math.round(val.principal * 100) / 100,
    interestPaid: Math.round(val.interest * 100) / 100,
    endingBalance: Math.round(val.endingBalance * 100) / 100,
  }));

  // 3. Early Payoff Analysis
  const extraPayment = Math.max(0, Number(inputs.extraMonthlyPayment) || 0);
  let earlyPayoffData;
  if (extraPayment > 0 && loanAmount > 0) {
    let bal = loanAmount;
    let monthsCount = 0;
    let acceleratedInterest = 0;
    const acceleratedPayment = monthlyPayment + extraPayment;

    while (bal > 0 && monthsCount < loanTermMonths) {
      monthsCount++;
      const intr = interestRate === 0 ? 0 : bal * monthlyRate;
      const prin = Math.min(bal, acceleratedPayment - intr);
      bal = Math.max(0, bal - prin);
      acceleratedInterest += intr;
    }

    const monthsSaved = Math.max(0, loanTermMonths - monthsCount);
    const interestSaved = Math.max(0, totalInterestPaid - acceleratedInterest);

    const targetDate = new Date();
    targetDate.setMonth(targetDate.getMonth() + monthsCount);
    const dateStr = targetDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

    earlyPayoffData = {
      extraMonthlyPayment: extraPayment,
      newMonthlyPayment: Math.round(acceleratedPayment * 100) / 100,
      newPayoffMonths: monthsCount,
      monthsSaved,
      interestSaved: Math.round(interestSaved * 100) / 100,
      newPayoffDate: dateStr,
    };
  }

  // 4. Term Comparison Engine (36, 48, 60, 72, 84 months)
  const termOptions = [36, 48, 60, 72, 84];
  const termComparison: TermOption[] = termOptions.map((term) => {
    let pmt = 0;
    if (loanAmount > 0) {
      if (interestRate === 0) {
        pmt = loanAmount / term;
      } else {
        const r = interestRate / 100 / 12;
        pmt = PMT(r, term, loanAmount);
      }
    }
    const totPmt = pmt * term;
    const totInt = Math.max(0, totPmt - loanAmount);
    const totCst = vehiclePrice + totalSalesTax + totalFees + totInt;

    let isRec = false;
    let tag = undefined;
    if (term === 60) {
      isRec = true;
      tag = "Mid-Range Term";
    } else if (term === 36) {
      tag = "Shortest Term in Comparison";
    } else if (term === 84) {
      tag = "Lowest Payment in Comparison";
    }

    return {
      months: term,
      monthlyPayment: Math.round(pmt * 100) / 100,
      totalInterest: Math.round(totInt * 100) / 100,
      totalCost: Math.round(totCst * 100) / 100,
      recommended: isRec,
      tag,
    };
  });

  // 5. Affordability Analyzer (20/4/10 Rule)
  let affordabilityData;
  const grossMonthlyIncome = Math.max(0, Number(inputs.grossMonthlyIncome) || 0);
  const existingMonthlyDebt = Math.max(0, Number(inputs.existingMonthlyDebt) || 0);

  if (grossMonthlyIncome > 0) {
    const frontEndRatio = (monthlyPayment / grossMonthlyIncome) * 100;
    const backEndRatio = ((monthlyPayment + existingMonthlyDebt) / grossMonthlyIncome) * 100;

    let rating: "Excellent" | "Good" | "Moderate" | "Risky" | "Very Risky" = "Moderate";
    let explanation = "";

    if (frontEndRatio <= 10 && backEndRatio <= 36) {
      rating = "Excellent";
      explanation = "Your vehicle payment is under 10% of monthly income, following the conservative 20/4/10 rule.";
    } else if (frontEndRatio <= 15 && backEndRatio <= 42) {
      rating = "Good";
      explanation = "Payment is well balanced relative to your income and existing debt obligations.";
    } else if (frontEndRatio <= 20 && backEndRatio <= 48) {
      rating = "Moderate";
      explanation = "Payment takes up 15–20% of income. Ensure room in your budget for insurance and maintenance.";
    } else if (frontEndRatio <= 25) {
      rating = "Risky";
      explanation = "Payment exceeds 20% of gross income. High risk of financial strain if unbudgeted car expenses arise.";
    } else {
      rating = "Very Risky";
      explanation = "Vehicle payment exceeds 25% of gross monthly income. Strongly consider a lower vehicle price or larger down payment.";
    }

    affordabilityData = {
      frontEndRatio: Math.round(frontEndRatio * 10) / 10,
      backEndRatio: Math.round(backEndRatio * 10) / 10,
      rating,
      explanation,
    };
  }

  // 6. Loan Health Score (0-100)
  let score = 100;
  const healthFactors: { label: string; status: "good" | "warning" | "danger"; detail: string }[] = [];

  // Factor A: Down Payment %
  if (downPaymentPercentage >= 20) {
    healthFactors.push({ label: "Down Payment", status: "good", detail: `${downPaymentPercentage.toFixed(1)}% (Met ideal 20% target)` });
  } else if (downPaymentPercentage >= 10) {
    score -= 10;
    healthFactors.push({ label: "Down Payment", status: "warning", detail: `${downPaymentPercentage.toFixed(1)}% (Recommended 20% to avoid depreciation risk)` });
  } else {
    score -= 20;
    healthFactors.push({ label: "Down Payment", status: "danger", detail: `${downPaymentPercentage.toFixed(1)}% (High risk of being underwater)` });
  }

  // Factor B: Loan Term
  if (loanTermMonths <= 60) {
    healthFactors.push({ label: "Loan Term", status: "good", detail: `${loanTermMonths} months (Healthy term length)` });
  } else if (loanTermMonths <= 72) {
    score -= 10;
    healthFactors.push({ label: "Loan Term", status: "warning", detail: `${loanTermMonths} months (Extended term increases total interest)` });
  } else {
    score -= 25;
    healthFactors.push({ label: "Loan Term", status: "danger", detail: `${loanTermMonths} months (Long term creates negative equity risk)` });
  }

  // Factor C: APR Interest Rate
  if (interestRate <= 6) {
    healthFactors.push({ label: "Interest Rate", status: "good", detail: `${interestRate}% APR (Competitive rate)` });
  } else if (interestRate <= 10) {
    score -= 10;
    healthFactors.push({ label: "Interest Rate", status: "warning", detail: `${interestRate}% APR (Moderate interest rate)` });
  } else {
    score -= 20;
    healthFactors.push({ label: "Interest Rate", status: "danger", detail: `${interestRate}% APR (High interest rate)` });
  }

  // Factor D: Trade-In Equity
  if (isNegativeEquity) {
    score -= 15;
    healthFactors.push({ label: "Trade-In Equity", status: "danger", detail: `Negative equity of $${negativeEquityRollover.toLocaleString()} rolled over into loan` });
  } else if (positiveTradeInEquity > 0) {
    healthFactors.push({ label: "Trade-In Equity", status: "good", detail: `Positive trade-in equity of $${positiveTradeInEquity.toLocaleString()}` });
  }

  const finalScore = Math.max(0, Math.min(100, score));
  let category: "Excellent" | "Good" | "Average" | "Poor" = "Good";
  if (finalScore >= 85) category = "Excellent";
  else if (finalScore >= 70) category = "Good";
  else if (finalScore >= 50) category = "Average";
  else category = "Poor";

  // 7. Smart Insights Generator
  const insights: string[] = [];

  if (downPaymentPercentage < 20 && vehiclePrice > 0) {
    const target20 = vehiclePrice * 0.2;
    const addDown = target20 - downPayment;
    const pmtReduction = monthlyPayment > 0 ? (monthlyPayment * (addDown / loanAmount)) : 0;
    insights.push(`Adding $${Math.round(addDown).toLocaleString()} to your down payment (reaching 20%) reduces your monthly payment by ~$${Math.round(pmtReduction)}/mo.`);
  }

  if (loanTermMonths > 60) {
    const term60Opt = termComparison.find((t) => t.months === 60);
    if (term60Opt) {
      const intSaved = totalInterestPaid - term60Opt.totalInterest;
      if (intSaved > 0) {
        insights.push(`Choosing a 60-month loan instead of ${loanTermMonths} months saves $${Math.round(intSaved).toLocaleString()} in total interest.`);
      }
    }
  }

  if (isNegativeEquity) {
    insights.push(`Rolling over $${negativeEquityRollover.toLocaleString()} of negative trade-in equity increases your monthly payment and extends time spent underwater.`);
  }

  if (interestRate > 7) {
    insights.push(`Improving your credit score or shopping for pre-approved bank rates below 6.0% APR could save thousands over your loan term.`);
  }

  // 8. Tab 2 Reverse Affordability Calculator
  let affordableResult;
  const desiredPayment = Math.max(0, Number(inputs.desiredMonthlyPayment) || 0);
  if (desiredPayment > 0) {
    let maxLoan = 0;
    if (interestRate === 0) {
      maxLoan = desiredPayment * loanTermMonths;
    } else {
      const r = interestRate / 100 / 12;
      maxLoan = (desiredPayment * (1 - Math.pow(1 + r, -loanTermMonths))) / r;
    }

    // Work backwards to maximum vehicle sticker price
    const taxRateDecimal = salesTaxRate / 100;
    let maxVehiclePrice = 0;
    let computedTax = 0;

    if (includeFeesInLoan) {
      // loanAmount = Price*(1 + t) - (allowsTradeInCredit ? t*TradeIn : 0) + negEquity - totalUpfrontCredits + totalFees
      const tradeInTaxShield = allowsTradeInCredit ? (taxRateDecimal * tradeInValue) : 0;
      const grossFinancedCapacity = maxLoan + totalUpfrontCredits - negativeEquityRollover - totalFees + tradeInTaxShield;
      maxVehiclePrice = Math.max(0, grossFinancedCapacity / (1 + taxRateDecimal));
      const taxableBase = allowsTradeInCredit ? Math.max(0, maxVehiclePrice - tradeInValue) : maxVehiclePrice;
      computedTax = taxableBase * taxRateDecimal;
    } else {
      // loanAmount = Price + negEquity - totalUpfrontCredits
      maxVehiclePrice = Math.max(0, maxLoan + totalUpfrontCredits - negativeEquityRollover);
      const taxableBase = allowsTradeInCredit ? Math.max(0, maxVehiclePrice - tradeInValue) : maxVehiclePrice;
      computedTax = taxableBase * taxRateDecimal;
    }

    const totalInterestOnMax = Math.max(0, (desiredPayment * loanTermMonths) - maxLoan);
    const maxTotalCost = maxVehiclePrice + computedTax + totalFees + totalInterestOnMax;

    affordableResult = {
      maxVehiclePrice: Math.round(maxVehiclePrice * 100) / 100,
      maxLoanAmount: Math.round(maxLoan * 100) / 100,
      maxTotalPurchaseCost: Math.round(maxTotalCost * 100) / 100,
    };
  }

  // 9. Tab 3 Scenario Comparison
  let comparisonResult;
  if (inputs.scenarioB) {
    const scB = inputs.scenarioB;
    const priceB = Math.max(0, Number(scB.vehiclePrice) || 0);
    const rateB = Math.max(0, Number(scB.interestRate) || 0);
    const termB = Math.max(1, Number(scB.loanTermMonths) || 60);
    const downB = Math.max(0, Number(scB.downPayment) || 0);

    const taxableBaseB = allowsTradeInCredit ? Math.max(0, priceB - tradeInValue) : priceB;
    const taxB = taxableBaseB * (salesTaxRate / 100);
    const loanB = Math.max(0, priceB - downB - positiveTradeInEquity + negativeEquityRollover + (includeFeesInLoan ? (taxB + totalFees) : 0));
    let pmtB = 0;
    if (loanB > 0) {
      if (rateB === 0) pmtB = loanB / termB;
      else {
        const rB = rateB / 100 / 12;
        pmtB = PMT(rB, termB, loanB);
      }
    }
    const totPmtB = pmtB * termB;
    const totIntB = Math.max(0, totPmtB - loanB);
    const totCostB = priceB + taxB + totalFees + totIntB;

    const intDiff = Math.abs(totalInterestPaid - totIntB);
    const pmtDiff = Math.abs(monthlyPayment - pmtB);
    const costDiff = Math.abs(totalCost - totCostB);

    let recommendation = "";
    if (totalCost < totCostB) {
      if (totalInterestPaid <= totIntB) {
        recommendation = `Scenario A has a lower overall acquisition cost (saving $${Math.round(costDiff).toLocaleString()}) and lower interest expense (saving $${Math.round(intDiff).toLocaleString()}) compared to Scenario B.`;
      } else {
        recommendation = `Scenario A has a lower overall acquisition cost (saving $${Math.round(costDiff).toLocaleString()}), though Scenario B has lower total interest charges (saving $${Math.round(intDiff).toLocaleString()} due to its lower APR).`;
      }
    } else if (totCostB < totalCost) {
      if (totIntB <= totalInterestPaid) {
        recommendation = `Scenario B has a lower overall acquisition cost (saving $${Math.round(costDiff).toLocaleString()}) and lower interest expense (saving $${Math.round(intDiff).toLocaleString()}) compared to Scenario A.`;
      } else {
        recommendation = `Scenario B has a lower overall acquisition cost (saving $${Math.round(costDiff).toLocaleString()}), though Scenario A has lower total interest charges (saving $${Math.round(intDiff).toLocaleString()} due to its lower APR).`;
      }
    } else {
      recommendation = "Both scenarios have identical total borrowing costs.";
    }

    comparisonResult = {
      scenarioA: {
        monthlyPayment: Math.round(monthlyPayment * 100) / 100,
        totalInterest: Math.round(totalInterestPaid * 100) / 100,
        totalCost: Math.round(totalCost * 100) / 100,
      },
      scenarioB: {
        monthlyPayment: Math.round(pmtB * 100) / 100,
        totalInterest: Math.round(totIntB * 100) / 100,
        totalCost: Math.round(totCostB * 100) / 100,
      },
      interestDifference: Math.round(intDiff * 100) / 100,
      monthlyDifference: Math.round(pmtDiff * 100) / 100,
      recommendation,
    };
  }

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    loanAmount: Math.round(loanAmount * 100) / 100,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    totalSalesTax: Math.round(totalSalesTax * 100) / 100,
    totalFees: Math.round(totalFees * 100) / 100,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalCost: Math.round(totalCost * 100) / 100,
    totalOutofPocketCost: Math.round(totalOutofPocketCost * 100) / 100,

    netTradeInEquity: Math.round(netTradeInEquity * 100) / 100,
    isNegativeEquity,
    negativeEquityRollover: Math.round(negativeEquityRollover * 100) / 100,

    upfrontPaidFees: Math.round(upfrontPaidFees * 100) / 100,
    financedFees: Math.round(financedFeesAndTax * 100) / 100,

    downPaymentPercentage: Math.round(downPaymentPercentage * 10) / 10,
    principalPercentage: Math.round(principalPercentage * 10) / 10,
    interestPercentage: Math.round(interestPercentage * 10) / 10,
    loanToValueRatio: Math.round(loanToValueRatio * 10) / 10,

    monthlySchedule,
    annualSchedule,
    earlyPayoff: earlyPayoffData,
    termComparison,
    affordability: affordabilityData,
    healthScore: {
      score: finalScore,
      category,
      factors: healthFactors,
    },
    insights,
    affordableResult,
    comparisonResult,
  };
}
