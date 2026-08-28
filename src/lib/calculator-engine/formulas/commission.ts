/**
 * Commission Formula Engine
 * Fully implementing 4 core commission modules:
 * 1. Simple 3-Way Commission Solver (Sales Price, Commission Rate, Commission Amount)
 *    - Mode 1: Price + Rate -> Commission, Company Net Revenue
 *    - Mode 2: Price + Commission -> Rate, Company Net Revenue
 *    - Mode 3: Commission + Rate -> Sales Price, Company Net Revenue
 * 2. Graduated Tiered & Base Salary Commission Calculator
 *    - True progressive bracket math: sum [ (Tier Sales) * Tier Rate ]
 *    - Total Compensation = Base Salary + Total Commission
 *    - Effective Commission Rate = (Total Commission / Total Sales) * 100
 * 3. Real Estate Agent & Brokerage Split Calculator
 *    - Total Gross Commission = Property Price * Total Commission Rate
 *    - Listing Side Gross = Total Gross * Listing Share
 *    - Buyer Side Gross = Total Gross * Buyer Share
 *    - Listing Agent Net = Listing Gross * Broker Split
 *    - Buyer Agent Net = Buyer Gross * Broker Split
 *    - Brokerage Total Retained = Total Gross - (Listing Agent Net + Buyer Agent Net)
 * 4. Target Commission Goal Seek Planner
 *    - Needed Commission = max(0, Target Total Goal - Base Salary)
 *    - Required Sales Volume = Needed Commission / (Commission Rate / 100)
 */

export interface SimpleCommissionInput {
  salesPrice?: number;
  commissionRate?: number;
  commissionAmount?: number;
}

export interface SimpleCommissionResult {
  salesPrice: number;
  commissionRate: number;
  commissionAmount: number;
  companyNetRevenue: number;
}

export interface TierBracket {
  fromAmount: number;
  toAmount: number | null; // null means unbounded (infinity)
  ratePercent: number;
}

export interface TieredCommissionInput {
  salesPrice: number;
  baseSalary?: number;
  tiers: TierBracket[];
}

export interface TierBreakdownItem {
  tierNumber: number;
  fromAmount: number;
  toAmount: number | null;
  ratePercent: number;
  tierSales: number;
  tierCommission: number;
}

export interface TieredCommissionResult {
  salesPrice: number;
  baseSalary: number;
  totalCommission: number;
  totalCompensation: number;
  effectiveCommissionRate: number;
  companyNetRevenue: number;
  breakdown: TierBreakdownItem[];
}

export interface RealEstateSplitInput {
  propertyPrice: number;
  totalCommissionPercent: number; // e.g. 6.0%
  listingAgentSharePercent?: number; // e.g. 50%
  buyerAgentSharePercent?: number; // e.g. 50%
  brokerageSplitPercent: number; // e.g. 80% to agent, 20% to brokerage
}

export interface RealEstateSplitResult {
  propertyPrice: number;
  totalGrossCommission: number;
  listingAgentGross: number;
  buyerAgentGross: number;
  listingAgentNet: number;
  buyerAgentNet: number;
  brokerageTotal: number;
}

export interface CommissionGoalInput {
  targetCommissionGoal: number;
  commissionRatePercent: number;
  baseSalary?: number;
}

export interface CommissionGoalResult {
  targetCommissionGoal: number;
  baseSalary: number;
  requiredCommissionEarnings: number;
  requiredSalesVolume: number;
  commissionRatePercent: number;
  isAchievable: boolean;
}

function safeNum(val: number | undefined | null, fallback: number): number {
  if (val !== undefined && val !== null && !isNaN(Number(val))) {
    return Number(val);
  }
  return fallback;
}

/**
 * 1. Simple 3-Way Commission Solver (Calculator.net Baseline 1)
 * Solves missing field given ANY TWO of: Sales Price, Commission Rate %, Commission Amount ($)
 */
export function calculateSimpleCommission(input: SimpleCommissionInput): SimpleCommissionResult {
  const hasSales = input.salesPrice !== undefined && input.salesPrice !== null && !isNaN(input.salesPrice);
  const hasRate = input.commissionRate !== undefined && input.commissionRate !== null && !isNaN(input.commissionRate);
  const hasComm = input.commissionAmount !== undefined && input.commissionAmount !== null && !isNaN(input.commissionAmount);

  let sales = hasSales ? Math.max(0, input.salesPrice!) : null;
  let rate = hasRate ? Math.max(0, input.commissionRate!) : null;
  let comm = hasComm ? Math.max(0, input.commissionAmount!) : null;

  // Defaults if nothing provided
  if (sales === null && rate === null && comm === null) {
    sales = 200000;
    rate = 3.0;
    comm = 6000;
  } else if (sales !== null && rate !== null) {
    // Mode 1: Price + Rate -> Commission
    comm = sales * (rate / 100);
  } else if (sales !== null && comm !== null) {
    // Mode 2: Price + Commission -> Rate
    rate = sales > 0 ? (comm / sales) * 100 : 0;
  } else if (comm !== null && rate !== null) {
    // Mode 3: Commission + Rate -> Price
    const dec = rate / 100;
    sales = dec > 0 ? comm / dec : 0;
  } else if (sales !== null) {
    rate = 3.0;
    comm = sales * (rate / 100);
  } else if (rate !== null) {
    sales = 200000;
    comm = sales * (rate / 100);
  } else if (comm !== null) {
    rate = 3.0;
    sales = comm / (rate / 100);
  }

  const finalSales = sales !== null ? Math.max(0, sales) : 0;
  const finalRate = rate !== null ? Math.max(0, rate) : 0;
  const finalComm = comm !== null ? Math.max(0, comm) : 0;
  const companyNet = Math.max(0, finalSales - finalComm);

  return {
    salesPrice: Number(finalSales.toFixed(2)),
    commissionRate: Number(finalRate.toFixed(4)),
    commissionAmount: Number(finalComm.toFixed(2)),
    companyNetRevenue: Number(companyNet.toFixed(2)),
  };
}

/**
 * 2. Graduated Tiered Commission Calculator (Calculator.net Baseline 2)
 * Progressive bracket math:
 * Baseline: $27,000 sales
 * Tier 1: $0 to $20,000 @ 3% -> $600
 * Tier 2: $20,000 to $25,000 @ 5% -> $250
 * Tier 3: $25,000+ @ 10% -> $200 ($2,000 x 10%)
 * Total Commission = $1,050. Total Compensation = $500 base + $1,050 = $1,550.
 * Effective Rate = 3.89% ($1,050 / $27,000).
 */
export function calculateTieredCommission(input: TieredCommissionInput): TieredCommissionResult {
  const sales = Math.max(0, safeNum(input.salesPrice, 27000));
  const base = Math.max(0, safeNum(input.baseSalary, 0));

  // Sort tiers by fromAmount ascending
  const rawTiers = input.tiers && input.tiers.length > 0 ? input.tiers : [
    { fromAmount: 0, toAmount: 20000, ratePercent: 3.0 },
    { fromAmount: 20000, toAmount: 25000, ratePercent: 5.0 },
    { fromAmount: 25000, toAmount: null, ratePercent: 10.0 },
  ];

  const sortedTiers = [...rawTiers].sort((a, b) => a.fromAmount - b.fromAmount);

  let totalComm = 0;
  const breakdown: TierBreakdownItem[] = [];

  for (let i = 0; i < sortedTiers.length; i++) {
    const tier = sortedTiers[i];
    const from = Math.max(0, tier.fromAmount);
    const to = tier.toAmount !== null ? Math.max(from, tier.toAmount) : null;
    const rate = Math.max(0, tier.ratePercent) / 100;

    let tierSales = 0;
    if (sales > from) {
      const cap = to !== null ? Math.min(sales, to) : sales;
      tierSales = Math.max(0, cap - from);
    }

    const tierComm = tierSales * rate;
    totalComm += tierComm;

    breakdown.push({
      tierNumber: i + 1,
      fromAmount: from,
      toAmount: to,
      ratePercent: tier.ratePercent,
      tierSales: Number(tierSales.toFixed(2)),
      tierCommission: Number(tierComm.toFixed(2)),
    });
  }

  const totalComp = base + totalComm;
  const effectiveRate = sales > 0 ? (totalComm / sales) * 100 : 0;
  const companyNet = Math.max(0, sales - totalComm);

  return {
    salesPrice: Number(sales.toFixed(2)),
    baseSalary: Number(base.toFixed(2)),
    totalCommission: Number(totalComm.toFixed(2)),
    totalCompensation: Number(totalComp.toFixed(2)),
    effectiveCommissionRate: Number(effectiveRate.toFixed(2)),
    companyNetRevenue: Number(companyNet.toFixed(2)),
    breakdown,
  };
}

/**
 * 3. Real Estate Agent & Brokerage Split Calculator (Calculator.net Baseline 3)
 * Baseline: $500,000 property @ 6.0% commission, 80% split to agent
 * Total Gross = $30,000
 * Listing Side Gross = $15,000 | Buyer Side Gross = $15,000
 * Listing Agent Net (80%) = $12,000 | Buyer Agent Net (80%) = $12,000
 * Combined Brokerage Retained = $6,000
 */
export function calculateRealEstateSplit(input: RealEstateSplitInput): RealEstateSplitResult {
  const price = Math.max(0, safeNum(input.propertyPrice, 500000));
  const totalCommRate = Math.max(0, safeNum(input.totalCommissionPercent, 6.0)) / 100;
  const listingShare = Math.max(0, safeNum(input.listingAgentSharePercent, 50)) / 100;
  const buyerShare = Math.max(0, safeNum(input.buyerAgentSharePercent, 50)) / 100;
  const brokerSplit = Math.max(0, Math.min(100, safeNum(input.brokerageSplitPercent, 80))) / 100;

  const totalGrossCommission = price * totalCommRate;
  const listingAgentGross = totalGrossCommission * listingShare;
  const buyerAgentGross = totalGrossCommission * buyerShare;

  const listingAgentNet = listingAgentGross * brokerSplit;
  const buyerAgentNet = buyerAgentGross * brokerSplit;

  const brokerageTotal = (listingAgentGross - listingAgentNet) + (buyerAgentGross - buyerAgentNet);

  return {
    propertyPrice: Number(price.toFixed(2)),
    totalGrossCommission: Number(totalGrossCommission.toFixed(2)),
    listingAgentGross: Number(listingAgentGross.toFixed(2)),
    buyerAgentGross: Number(buyerAgentGross.toFixed(2)),
    listingAgentNet: Number(listingAgentNet.toFixed(2)),
    buyerAgentNet: Number(buyerAgentNet.toFixed(2)),
    brokerageTotal: Number(brokerageTotal.toFixed(2)),
  };
}

/**
 * 4. Target Commission Goal Seek Planner (Calculator.net Baseline 4)
 * Baseline: Target Total = $10,000, Base Salary = $2,000, Rate = 5%
 * Needed Commission = $8,000 -> Required Gross Sales = $8,000 / 0.05 = $160,000
 */
export function calculateCommissionGoal(input: CommissionGoalInput): CommissionGoalResult {
  const targetGoal = Math.max(0, safeNum(input.targetCommissionGoal, 10000));
  const base = Math.max(0, safeNum(input.baseSalary, 2000));
  const ratePct = Math.max(0, safeNum(input.commissionRatePercent, 5.0));

  const neededComm = Math.max(0, targetGoal - base);
  let requiredSales = 0;
  let isAchievable = true;

  if (ratePct > 0) {
    requiredSales = neededComm / (ratePct / 100);
  } else if (neededComm > 0) {
    // Zero commission rate and commission is needed -> impossible
    requiredSales = 0;
    isAchievable = false;
  } else {
    // Base salary already meets or exceeds target
    requiredSales = 0;
  }

  return {
    targetCommissionGoal: Number(targetGoal.toFixed(2)),
    baseSalary: Number(base.toFixed(2)),
    requiredCommissionEarnings: Number(neededComm.toFixed(2)),
    requiredSalesVolume: Number(requiredSales.toFixed(2)),
    commissionRatePercent: ratePct,
    isAchievable,
  };
}
