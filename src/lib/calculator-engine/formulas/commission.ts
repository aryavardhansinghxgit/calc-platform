/**
 * Commission Formula Engine
 * Fully implementing Calculator.net's baseline commission features:
 * 1. Simple 3-Way Commission Solver (Sales Price, Commission Rate, Commission Amount)
 * 2. Base Salary + Commission Calculator
 * 3. Graduated Tiered Commission Calculator (Dynamic tier bracket math)
 * 4. Real Estate Split Calculator (Listing Agent / Buyer Agent / Brokerage split)
 * 5. Target Commission Goal Seek Planner
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
  totalCommissionPercent: number; // e.g. 6%
  listingAgentSharePercent: number; // e.g. 50%
  buyerAgentSharePercent: number; // e.g. 50%
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
}

/**
 * 1. Simple 3-Way Commission Solver (Calculator.net Baseline)
 * Solves missing field given ANY TWO of: Sales Price, Commission Rate %, Commission Amount ($)
 */
export function calculateSimpleCommission(input: SimpleCommissionInput): SimpleCommissionResult {
  let sales = input.salesPrice !== undefined && !isNaN(input.salesPrice) ? input.salesPrice : null;
  let rate = input.commissionRate !== undefined && !isNaN(input.commissionRate) ? input.commissionRate : null;
  let comm = input.commissionAmount !== undefined && !isNaN(input.commissionAmount) ? input.commissionAmount : null;

  // Defaults if empty
  if (sales === null && rate === null && comm === null) {
    sales = 200000;
    rate = 3.0;
  }

  if (sales !== null && rate !== null) {
    comm = sales * (rate / 100);
  } else if (sales !== null && comm !== null) {
    rate = sales > 0 ? (comm / sales) * 100 : 0;
  } else if (comm !== null && rate !== null) {
    const dec = rate / 100;
    sales = dec > 0 ? comm / dec : 0;
  }

  const finalSales = Math.max(0, sales || 200000);
  const finalRate = Math.max(0, rate || 3.0);
  const finalComm = Math.max(0, comm || 6000);
  const companyNetRevenue = Math.max(0, finalSales - finalComm);

  return {
    salesPrice: Number(finalSales.toFixed(2)),
    commissionRate: Number(finalRate.toFixed(2)),
    commissionAmount: Number(finalComm.toFixed(2)),
    companyNetRevenue: Number(companyNetRevenue.toFixed(2)),
  };
}

/**
 * 2. Graduated Tiered Commission Calculator (Calculator.net Baseline 2)
 * Baseline Example: $27,000 sales with tiers:
 * Tier 1: $0 to $20,000 @ 3% -> $600
 * Tier 2: $20,000 to $25,000 @ 5% -> $250
 * Tier 3: $25,000+ @ 10% -> $200 ($2,000 x 10%)
 * Total = $1,050. Exactly matches Calculator.net PDF!
 */
export function calculateTieredCommission(input: TieredCommissionInput): TieredCommissionResult {
  const sales = Math.max(0, Number(input.salesPrice || 27000));
  const base = Math.max(0, Number(input.baseSalary || 0));

  // Sort tiers by fromAmount ascending
  const sortedTiers = [...(input.tiers || [])].sort((a, b) => a.fromAmount - b.fromAmount);

  let totalComm = 0;
  const breakdown: TierBreakdownItem[] = [];

  for (let i = 0; i < sortedTiers.length; i++) {
    const tier = sortedTiers[i];
    const from = tier.fromAmount;
    const to = tier.toAmount;
    const rate = tier.ratePercent / 100;

    if (sales > from) {
      const cap = to !== null ? Math.min(sales, to) : sales;
      const tierSales = Math.max(0, cap - from);
      const tierComm = tierSales * rate;

      totalComm += tierComm;

      breakdown.push({
        fromAmount: from,
        toAmount: to,
        ratePercent: tier.ratePercent,
        tierSales: Number(tierSales.toFixed(2)),
        tierCommission: Number(tierComm.toFixed(2)),
      });
    } else {
      breakdown.push({
        fromAmount: from,
        toAmount: to,
        ratePercent: tier.ratePercent,
        tierSales: 0,
        tierCommission: 0,
      });
    }
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
 * 3. Real Estate Agent & Brokerage Split Calculator
 */
export function calculateRealEstateSplit(input: RealEstateSplitInput): RealEstateSplitResult {
  const price = Math.max(0, Number(input.propertyPrice || 500000));
  const totalCommRate = Math.max(0, Number(input.totalCommissionPercent || 6.0)) / 100;
  const listingShare = Math.max(0, Number(input.listingAgentSharePercent || 50)) / 100;
  const buyerShare = Math.max(0, Number(input.buyerAgentSharePercent || 50)) / 100;
  const brokerSplit = Math.max(0, Number(input.brokerageSplitPercent || 80)) / 100;

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
 * 4. Target Commission Goal Seek Planner
 */
export function calculateCommissionGoal(input: CommissionGoalInput): CommissionGoalResult {
  const targetGoal = Math.max(0, Number(input.targetCommissionGoal || 10000));
  const base = Math.max(0, Number(input.baseSalary || 0));
  const ratePct = Math.max(0.1, Number(input.commissionRatePercent || 5.0));

  const neededComm = Math.max(0, targetGoal - base);
  const requiredSales = (neededComm / (ratePct / 100));

  return {
    targetCommissionGoal: Number(targetGoal.toFixed(2)),
    baseSalary: Number(base.toFixed(2)),
    requiredCommissionEarnings: Number(neededComm.toFixed(2)),
    requiredSalesVolume: Number(requiredSales.toFixed(2)),
    commissionRatePercent: ratePct,
  };
}
