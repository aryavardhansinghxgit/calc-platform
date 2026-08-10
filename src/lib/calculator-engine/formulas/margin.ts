/**
 * Margin Formula Engine
 * Fully implementing Calculator.net's 3 reference sub-calculators:
 * 1. Profit Margin & Markup Solver (Cost, Revenue, Margin %, Profit)
 * 2. Stock Trading Margin Calculator (Stock Price, Shares, Margin Req %, Maintenance Margin %)
 * 3. Currency Exchange / Forex Margin Calculator (Exchange Rate, Leverage Ratio, Units)
 * 4. Margin Call Trigger Price Solver
 */

export interface ProfitMarginInput {
  cost?: number;
  revenue?: number;
  marginPercent?: number;
  profit?: number;
}

export interface ProfitMarginResult {
  cost: number;
  revenue: number;
  profit: number;
  marginPercent: number;
  markupPercent: number;
  costPercentage: number;
  marginPercentage: number;
}

export interface StockMarginInput {
  stockPrice: number; // e.g. 18.30
  numberOfShares: number; // e.g. 100
  initialMarginPercent: number; // e.g. 30 (or Reg T 50%)
  maintenanceMarginPercent?: number; // e.g. 25
}

export interface StockMarginResult {
  totalPositionValue: number;
  requiredDeposit: number; // Amount required
  borrowedAmount: number; // Loan from broker
  leverageRatio: number;
  marginCallPrice: number; // Stock price where margin call is triggered
  marginCallLossPercent: number;
}

export interface ForexMarginInput {
  exchangeRate: number; // e.g. 1.30
  leverageRatio: number; // e.g. 20 (for 20:1), 50 (50:1), 100 (100:1)
  units: number; // e.g. 100
}

export interface ForexMarginResult {
  totalNotionalValue: number;
  requiredMarginDeposit: number;
  effectiveLeverage: string;
}

export interface MarginSensitivityRow {
  scenarioLabel: string;
  cost: number;
  revenue: number;
  profit: number;
  marginPercent: number;
  markupPercent: number;
}

/**
 * 1. Profit Margin Multi-Variable Solver
 * Solves for missing fields given ANY TWO of: Cost, Revenue, Profit, Margin %
 */
export function calculateProfitMargin(input: ProfitMarginInput): ProfitMarginResult {
  let c = input.cost !== undefined && !isNaN(input.cost) ? input.cost : null;
  let r = input.revenue !== undefined && !isNaN(input.revenue) ? input.revenue : null;
  let m = input.marginPercent !== undefined && !isNaN(input.marginPercent) ? input.marginPercent : null;
  let p = input.profit !== undefined && !isNaN(input.profit) ? input.profit : null;

  // Solve based on available pairs
  if (c !== null && r !== null) {
    p = r - c;
    m = r > 0 ? (p / r) * 100 : 0;
  } else if (c !== null && m !== null) {
    const marginDec = m / 100;
    r = marginDec < 1 ? c / (1 - marginDec) : c;
    p = r - c;
  } else if (r !== null && m !== null) {
    const marginDec = m / 100;
    p = r * marginDec;
    c = r - p;
  } else if (c !== null && p !== null) {
    r = c + p;
    m = r > 0 ? (p / r) * 100 : 0;
  } else if (r !== null && p !== null) {
    c = r - p;
    m = r > 0 ? (p / r) * 100 : 0;
  }

  const finalCost = Math.max(0, c || 120);
  const finalRevenue = Math.max(0, r || 160);
  const finalProfit = Number((finalRevenue - finalCost).toFixed(2));
  const finalMargin = finalRevenue > 0 ? Number(((finalProfit / finalRevenue) * 100).toFixed(2)) : 0;
  const finalMarkup = finalCost > 0 ? Number(((finalProfit / finalCost) * 100).toFixed(2)) : 0;

  const totalSum = finalRevenue > 0 ? finalRevenue : 1;
  const costPercentage = Number(((finalCost / totalSum) * 100).toFixed(1));
  const marginPercentage = Number(((finalProfit / totalSum) * 100).toFixed(1));

  return {
    cost: Number(finalCost.toFixed(2)),
    revenue: Number(finalRevenue.toFixed(2)),
    profit: finalProfit,
    marginPercent: finalMargin,
    markupPercent: finalMarkup,
    costPercentage,
    marginPercentage,
  };
}

/**
 * 2. Stock Trading Margin & Margin Call Solver (Calculator.net Sub-Calc 2)
 */
export function calculateStockMargin(input: StockMarginInput): StockMarginResult {
  const price = Math.max(0.01, Number(input.stockPrice || 18.30));
  const shares = Math.max(1, Number(input.numberOfShares || 100));
  const initMarginPct = Math.max(1, Math.min(100, Number(input.initialMarginPercent || 30))) / 100;
  const maintMarginPct = Math.max(1, Math.min(99, Number(input.maintenanceMarginPercent || 25))) / 100;

  const totalPositionValue = Number((price * shares).toFixed(2));
  const requiredDeposit = Number((totalPositionValue * initMarginPct).toFixed(2));
  const borrowedAmount = Number((totalPositionValue - requiredDeposit).toFixed(2));
  const leverageRatio = requiredDeposit > 0 ? Number((totalPositionValue / requiredDeposit).toFixed(2)) : 1;

  // Margin Call Trigger Price formula: Price_call = Loan / (Shares * (1 - Maintenance%))
  let marginCallPrice = 0;
  if (1 - maintMarginPct > 0) {
    marginCallPrice = Number((borrowedAmount / (shares * (1 - maintMarginPct))).toFixed(2));
  }

  const marginCallLossPercent = price > 0 ? Number((((price - marginCallPrice) / price) * 100).toFixed(1)) : 0;

  return {
    totalPositionValue,
    requiredDeposit,
    borrowedAmount,
    leverageRatio,
    marginCallPrice,
    marginCallLossPercent,
  };
}

/**
 * 3. Currency Exchange / Forex Margin Calculator (Calculator.net Sub-Calc 3)
 */
export function calculateForexMargin(input: ForexMarginInput): ForexMarginResult {
  const rate = Math.max(0.0001, Number(input.exchangeRate || 1.30));
  const leverage = Math.max(1, Number(input.leverageRatio || 20));
  const units = Math.max(1, Number(input.units || 100));

  const totalNotionalValue = rate * units;
  const requiredMarginDeposit = Number((totalNotionalValue / leverage).toFixed(3));

  return {
    totalNotionalValue: Number(totalNotionalValue.toFixed(2)),
    requiredMarginDeposit,
    effectiveLeverage: `${leverage}:1`,
  };
}

/**
 * Price & Margin Sensitivity Matrix Generator
 */
export function generateMarginSensitivityMatrix(baseCost: number, baseRevenue: number): MarginSensitivityRow[] {
  const multipliers = [0.8, 0.9, 1.0, 1.1, 1.2];
  return multipliers.map((m) => {
    const rev = baseRevenue * m;
    const res = calculateProfitMargin({ cost: baseCost, revenue: rev });
    return {
      scenarioLabel: `${Math.round(m * 100)}% Revenue Price`,
      cost: baseCost,
      revenue: Number(rev.toFixed(2)),
      profit: res.profit,
      marginPercent: res.marginPercent,
      markupPercent: res.markupPercent,
    };
  });
}
