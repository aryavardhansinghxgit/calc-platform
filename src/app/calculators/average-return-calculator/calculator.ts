import {
  CashFlowCalculatorInputs,
  CashFlowCalculatorResult,
  CashFlowLedgerRow,
  MultiPeriodCalculatorInputs,
  MultiPeriodCalculatorResult,
  MultiPeriodScheduleRow,
  VolatilityRiskInputs,
  VolatilityRiskResult,
  BenchmarkCompareInputs,
  BenchmarkCompareResult,
  BenchmarkData,
} from "./types";

export const BENCHMARKS_LIST: BenchmarkData[] = [
  { id: "sp500", name: "S&P 500 (US Large-Cap)", historicalAnnualReturn: 10.2, assetClass: "US Equities" },
  { id: "nasdaq100", name: "Nasdaq-100 (Tech & Growth)", historicalAnnualReturn: 13.8, assetClass: "US Growth Equities" },
  { id: "reit", name: "US Real Estate (REITs)", historicalAnnualReturn: 8.8, assetClass: "Real Estate" },
  { id: "gold", name: "Gold Spot Price", historicalAnnualReturn: 8.2, assetClass: "Commodities" },
  { id: "treasury10y", name: "US 10-Year Treasury Bonds", historicalAnnualReturn: 4.5, assetClass: "Fixed Income" },
  { id: "inflation", name: "US CPI Inflation Baseline", historicalAnnualReturn: 3.2, assetClass: "Macro Baseline" },
];

function parseDateSafely(dateStr: string): Date {
  if (!dateStr) return new Date();
  const parts = dateStr.split(/[-/]/);
  if (parts.length === 3) {
    // Check if MM/DD/YYYY or YYYY-MM-DD
    if (parts[0].length === 4) {
      // YYYY-MM-DD
      return new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    } else {
      // MM/DD/YYYY
      return new Date(parseInt(parts[2]), parseInt(parts[0]) - 1, parseInt(parts[1]));
    }
  }
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? new Date() : d;
}

function getDaysBetween(d1: Date, d2: Date): number {
  const diffTime = d2.getTime() - d1.getTime();
  return diffTime / (1000 * 60 * 60 * 24);
}

/**
 * 1. Calculate Money-Weighted Rate of Return (XIRR / MWRR) and ARR from Cash Flows
 */
export function calculateCashFlowReturn(inputs: CashFlowCalculatorInputs): CashFlowCalculatorResult {
  const dStart = parseDateSafely(inputs.startDate);
  const dEnd = parseDateSafely(inputs.endDate);
  const totalDays = Math.max(1, Math.round(getDaysBetween(dStart, dEnd)));
  const totalYears = totalDays / 365.25;

  const validFlows = inputs.cashFlows.filter((cf) => cf.amount > 0 && cf.date);

  // Build sorted timeline items
  interface InternalFlow {
    date: Date;
    daysFromStart: number;
    fractionYears: number;
    amount: number; // Negative for outflow/deposit into fund, positive for withdrawal
    type: string;
    displayAmount: number;
  }

  const flows: InternalFlow[] = [
    {
      date: dStart,
      daysFromStart: 0,
      fractionYears: 0,
      amount: -Math.abs(inputs.startingBalance),
      type: "Starting Balance",
      displayAmount: inputs.startingBalance,
    },
  ];

  let totalContributions = 0;
  let totalWithdrawals = 0;

  validFlows.forEach((cf) => {
    const d = parseDateSafely(cf.date);
    const days = Math.max(0, Math.min(totalDays, getDaysBetween(dStart, d)));
    const isDeposit = cf.type === "deposit";
    const signedAmount = isDeposit ? -Math.abs(cf.amount) : Math.abs(cf.amount);

    if (isDeposit) {
      totalContributions += cf.amount;
    } else {
      totalWithdrawals += cf.amount;
    }

    flows.push({
      date: d,
      daysFromStart: days,
      fractionYears: days / 365.25,
      amount: signedAmount,
      type: isDeposit ? "Deposit" : "Withdrawal",
      displayAmount: cf.amount,
    });
  });

  // Ending balance is terminal positive cash flow for XIRR
  flows.push({
    date: dEnd,
    daysFromStart: totalDays,
    fractionYears: totalYears,
    amount: Math.abs(inputs.endingBalance),
    type: "Ending Balance",
    displayAmount: inputs.endingBalance,
  });

  // Sort flows by daysFromStart
  flows.sort((a, b) => a.daysFromStart - b.daysFromStart);

  const netInvested = inputs.startingBalance + totalContributions - totalWithdrawals;
  const totalGainLoss = inputs.endingBalance - netInvested;

  // NPV function for XIRR
  const npv = (r: number): number => {
    let sum = 0;
    for (const f of flows) {
      sum += f.amount / Math.pow(1 + r, f.fractionYears);
    }
    return sum;
  };

  // Derivative of NPV for Newton-Raphson
  const dNpv = (r: number): number => {
    let sum = 0;
    for (const f of flows) {
      if (f.fractionYears !== 0) {
        sum += (-f.fractionYears * f.amount) / Math.pow(1 + r, f.fractionYears + 1);
      }
    }
    return sum;
  };

  // High-performance Newton-Raphson root solver with bisection fallback
  let r = totalGainLoss > 0 ? 0.08 : -0.05;
  let converged = false;

  for (let i = 0; i < 40; i++) {
    const val = npv(r);
    if (Math.abs(val) < 1e-6) {
      converged = true;
      break;
    }
    const deriv = dNpv(r);
    if (Math.abs(deriv) < 1e-9) break;
    const nextR = r - val / deriv;
    if (nextR <= -0.99 || nextR > 20.0) break;
    r = nextR;
  }

  if (!converged) {
    // Bisection method fallback
    let low = -0.99;
    let high = 5.0;
    let valLow = npv(low);
    let valHigh = npv(high);

    if (valLow * valHigh <= 0) {
      for (let i = 0; i < 100; i++) {
        const mid = (low + high) / 2;
        const valMid = npv(mid);
        if (Math.abs(valMid) < 1e-5) {
          r = mid;
          converged = true;
          break;
        }
        if (valLow * valMid <= 0) {
          high = mid;
          valHigh = valMid;
        } else {
          low = mid;
          valLow = valMid;
        }
        r = mid;
      }
    }
  }

  const mwrrPercent = Math.round(r * 100000) / 1000;

  // Simple Accounting Rate of Return (ARR) % per year
  // ARR = (Total Dollar Gain / Net Capital Invested) / Total Years * 100
  let arrPercent = 0;
  if (netInvested > 0 && totalYears > 0) {
    arrPercent = Math.round(((totalGainLoss / netInvested) / totalYears) * 10000) / 100;
  }

  // Build Ledger
  let runningInvested = 0;
  const ledger: CashFlowLedgerRow[] = flows.map((f) => {
    if (f.type === "Starting Balance" || f.type === "Deposit") {
      runningInvested += f.displayAmount;
    } else if (f.type === "Withdrawal") {
      runningInvested -= f.displayAmount;
    }

    return {
      date: f.date.toISOString().split("T")[0],
      type: f.type,
      cashFlowAmount: f.displayAmount,
      runningInvested: Math.round(runningInvested * 100) / 100,
      daysFromStart: Math.round(f.daysFromStart),
      fractionYears: Math.round(f.fractionYears * 100) / 100,
    };
  });

  // Generate Timeline Chart Data (interpolated tracking)
  const chartTimeline = flows.map((f) => {
    const estVal =
      f.type === "Ending Balance"
        ? inputs.endingBalance
        : f.type === "Starting Balance"
        ? inputs.startingBalance
        : Math.round((inputs.startingBalance + (inputs.endingBalance - inputs.startingBalance) * (f.daysFromStart / totalDays)) * 100) / 100;

    return {
      date: f.date.toISOString().split("T")[0],
      label: f.type,
      invested: Math.round(runningInvested * 100) / 100,
      estimatedValue: estVal,
    };
  });

  return {
    mwrrPercent: isNaN(mwrrPercent) ? 0 : mwrrPercent,
    arrPercent: isNaN(arrPercent) ? 0 : arrPercent,
    totalContributions: Math.round(totalContributions * 100) / 100,
    totalWithdrawals: Math.round(totalWithdrawals * 100) / 100,
    netInvested: Math.round(netInvested * 100) / 100,
    totalGainLoss: Math.round(totalGainLoss * 100) / 100,
    totalDays,
    totalYears: Math.round(totalYears * 100) / 100,
    ledger,
    chartTimeline,
  };
}

/**
 * 2. Calculate Multi-Period Holding Returns (Time-Weighted TWRR & Cumulative Return)
 */
export function calculateMultiPeriodReturn(inputs: MultiPeriodCalculatorInputs): MultiPeriodCalculatorResult {
  const validLegs = inputs.legs.filter((l) => l.years > 0 || l.months > 0 || l.returnPercent !== 0);

  if (validLegs.length === 0) {
    return {
      cumulativeReturnPercent: 0,
      annualizedGeometricReturnPercent: 0,
      arithmeticAverageReturnPercent: 0,
      annualizedArithmeticReturnPercent: 0,
      totalYears: 0,
      totalMonthsTotal: 0,
      growthMultiplier: 1,
      schedule: [],
    };
  }

  let cumulativeMultiplier = 1;
  let totalTimeYears = 0;
  let arithmeticSum = 0;
  let runningMultiplier = 1;

  const schedule: MultiPeriodScheduleRow[] = [];

  validLegs.forEach((leg, index) => {
    const legYears = (leg.years || 0) + (leg.months || 0) / 12;
    const decimalReturn = (leg.returnPercent || 0) / 100;

    cumulativeMultiplier *= 1 + decimalReturn;
    runningMultiplier *= 1 + decimalReturn;
    totalTimeYears += legYears;
    arithmeticSum += leg.returnPercent || 0;

    schedule.push({
      period: index + 1,
      returnPercent: leg.returnPercent,
      durationYears: Math.round(legYears * 100) / 100,
      cumulativeReturnPercent: Math.round((runningMultiplier - 1) * 10000) / 100,
      growthFactor: Math.round(runningMultiplier * 10000) / 10000,
    });
  });

  const cumulativeReturnPercent = Math.round((cumulativeMultiplier - 1) * 100000) / 1000;
  const growthMultiplier = Math.round(cumulativeMultiplier * 10000) / 10000;

  // Annualized Geometric Return (Time-Weighted)
  let annualizedGeometricReturnPercent = 0;
  if (totalTimeYears > 0 && cumulativeMultiplier > 0) {
    annualizedGeometricReturnPercent = Math.round((Math.pow(cumulativeMultiplier, 1 / totalTimeYears) - 1) * 100000) / 1000;
  }

  const arithmeticAverageReturnPercent = Math.round((arithmeticSum / validLegs.length) * 1000) / 1000;
  const annualizedArithmeticReturnPercent =
    totalTimeYears > 0 ? Math.round((arithmeticSum / totalTimeYears) * 1000) / 1000 : 0;

  return {
    cumulativeReturnPercent: isNaN(cumulativeReturnPercent) ? 0 : cumulativeReturnPercent,
    annualizedGeometricReturnPercent: isNaN(annualizedGeometricReturnPercent) ? 0 : annualizedGeometricReturnPercent,
    arithmeticAverageReturnPercent: isNaN(arithmeticAverageReturnPercent) ? 0 : arithmeticAverageReturnPercent,
    annualizedArithmeticReturnPercent: isNaN(annualizedArithmeticReturnPercent) ? 0 : annualizedArithmeticReturnPercent,
    totalYears: Math.round(totalTimeYears * 100) / 100,
    totalMonthsTotal: Math.round(totalTimeYears * 12),
    growthMultiplier,
    schedule,
  };
}

/**
 * 3. Calculate Portfolio Volatility & Risk-Adjusted Return Metrics (Sharpe, Sortino, Max Drawdown)
 */
export function calculateVolatilityAndRisk(inputs: VolatilityRiskInputs): VolatilityRiskResult {
  const series = inputs.returnsSeries.filter((r) => !isNaN(r));
  const n = series.length;

  if (n === 0) {
    return {
      meanReturn: 0,
      standardDeviation: 0,
      sharpeRatio: 0,
      sortinoRatio: 0,
      maxDrawdownPercent: 0,
      downsideDeviation: 0,
      positivePeriods: 0,
      negativePeriods: 0,
      totalPeriods: 0,
    };
  }

  const meanReturn = series.reduce((sum, r) => sum + r, 0) / n;

  // Standard deviation (Sample standard deviation if n > 1)
  let variance = 0;
  if (n > 1) {
    const sumSq = series.reduce((sum, r) => sum + Math.pow(r - meanReturn, 2), 0);
    variance = sumSq / (n - 1);
  }
  const standardDeviation = Math.sqrt(variance);

  // Sharpe Ratio = (Mean Return - Risk Free Rate) / Std Dev
  const sharpeRatio = standardDeviation > 0 ? (meanReturn - inputs.riskFreeRate) / standardDeviation : 0;

  // Downside deviation & Sortino Ratio
  const downsideSq = series.reduce((sum, r) => {
    const diff = r - inputs.riskFreeRate;
    return diff < 0 ? sum + Math.pow(diff, 2) : sum;
  }, 0);
  const downsideDeviation = Math.sqrt(downsideSq / (n > 1 ? n - 1 : 1));
  const sortinoRatio = downsideDeviation > 0 ? (meanReturn - inputs.riskFreeRate) / downsideDeviation : 0;

  // Maximum Drawdown simulation
  let peak = 100;
  let currentWealth = 100;
  let maxDrawdown = 0;

  series.forEach((ret) => {
    currentWealth *= 1 + ret / 100;
    if (currentWealth > peak) {
      peak = currentWealth;
    }
    const drawdown = (peak - currentWealth) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });

  const positivePeriods = series.filter((r) => r >= 0).length;
  const negativePeriods = series.filter((r) => r < 0).length;

  return {
    meanReturn: Math.round(meanReturn * 100) / 100,
    standardDeviation: Math.round(standardDeviation * 100) / 100,
    sharpeRatio: Math.round(sharpeRatio * 100) / 100,
    sortinoRatio: Math.round(sortinoRatio * 100) / 100,
    maxDrawdownPercent: Math.round(maxDrawdown * 10000) / 100,
    downsideDeviation: Math.round(downsideDeviation * 100) / 100,
    positivePeriods,
    negativePeriods,
    totalPeriods: n,
  };
}

/**
 * 4. Calculate Market Benchmark Performance Comparison
 */
export function calculateBenchmarkComparison(inputs: BenchmarkCompareInputs): BenchmarkCompareResult {
  const chosenBm = BENCHMARKS_LIST.find((b) => b.id === inputs.selectedBenchmarkId) || BENCHMARKS_LIST[0];
  const pRet = (inputs.portfolioAnnualReturn || 0) / 100;
  const bmRet = chosenBm.historicalAnnualReturn / 100;
  const years = Math.max(1, inputs.timeHorizonYears || 5);
  const principal = inputs.startingCapital > 0 ? inputs.startingCapital : 10000;

  const portfolioFinalWealth = Math.round(principal * Math.pow(1 + pRet, years) * 100) / 100;
  const benchmarkFinalWealth = Math.round(principal * Math.pow(1 + bmRet, years) * 100) / 100;
  const alphaPercent = Math.round((inputs.portfolioAnnualReturn - chosenBm.historicalAnnualReturn) * 100) / 100;
  const wealthAdvantage = Math.round((portfolioFinalWealth - benchmarkFinalWealth) * 100) / 100;

  const comparisonTable = BENCHMARKS_LIST.map((bm) => {
    const rate = bm.historicalAnnualReturn / 100;
    const finalVal = Math.round(principal * Math.pow(1 + rate, years) * 100) / 100;
    return {
      assetName: bm.name,
      annualReturn: bm.historicalAnnualReturn,
      endingValue: finalVal,
      totalProfit: Math.round((finalVal - principal) * 100) / 100,
    };
  });

  return {
    portfolioFinalWealth,
    benchmarkFinalWealth,
    alphaPercent,
    wealthAdvantage,
    benchmarkName: chosenBm.name,
    benchmarkRate: chosenBm.historicalAnnualReturn,
    comparisonTable,
  };
}
