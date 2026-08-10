/**
 * Discount Formula Engine
 * Fully implementing Calculator.net's baseline multi-variable solver:
 * 1. Price before discount, Discount %, Price after discount, You saved (2-variable solver)
 * 2. Percent Off vs Fixed Amount Off
 * 3. Stacked / Multiple Discounts (e.g. 20% off + 10% off = 28% total)
 * 4. Coupon Stack (Percentage + Fixed Coupon)
 * 5. Sales Tax + Discount (Before vs After tax)
 * 6. Reverse Discount Solver
 */

export interface DiscountSolverInput {
  originalPrice?: number;
  discountValue?: number;
  discountType?: "percent" | "fixed";
  finalPrice?: number;
  youSaved?: number;
}

export interface DiscountSolverResult {
  originalPrice: number;
  discountValue: number;
  discountType: "percent" | "fixed";
  finalPrice: number;
  youSaved: number;
  effectiveDiscountPercent: number;
  savingsPercentage: number;
}

export interface StackedDiscountInput {
  originalPrice: number;
  discount1Percent: number; // e.g. 20%
  discount2Percent: number; // e.g. 10%
  discount3Percent?: number; // e.g. 0%
}

export interface StackedDiscountResult {
  originalPrice: number;
  step1Price: number;
  step2Price: number;
  finalPrice: number;
  totalSaved: number;
  effectiveCombinedDiscountPercent: number;
}

export interface CouponDiscountInput {
  originalPrice: number;
  percentOff: number; // e.g. 20%
  fixedCoupon: number; // e.g. $10
}

export interface CouponDiscountResult {
  originalPrice: number;
  percentSavings: number;
  couponSavings: number;
  totalSaved: number;
  finalPrice: number;
  effectiveDiscountPercent: number;
}

export interface TaxDiscountInput {
  originalPrice: number;
  discountPercent: number;
  taxRatePercent: number;
  taxTiming: "before_tax" | "after_tax";
}

export interface TaxDiscountResult {
  originalPrice: number;
  discountAmount: number;
  taxableAmount: number;
  taxAmount: number;
  finalCheckoutPrice: number;
  totalSaved: number;
}

/**
 * 1. Multi-Variable Discount Solver (Calculator.net Baseline)
 * Solves for missing fields given ANY TWO of: Original Price, Discount %, Final Price, You Saved
 */
export function calculateDiscountSolver(input: DiscountSolverInput): DiscountSolverResult {
  let orig = input.originalPrice !== undefined && !isNaN(input.originalPrice) ? input.originalPrice : null;
  let disc = input.discountValue !== undefined && !isNaN(input.discountValue) ? input.discountValue : null;
  let type = input.discountType || "percent";
  let finalP = input.finalPrice !== undefined && !isNaN(input.finalPrice) ? input.finalPrice : null;
  let saved = input.youSaved !== undefined && !isNaN(input.youSaved) ? input.youSaved : null;

  // Defaults if empty
  if (orig === null && disc === null && finalP === null && saved === null) {
    orig = 59.99;
    disc = 15;
    type = "percent";
  }

  // Solvers based on available inputs
  if (orig !== null && disc !== null) {
    if (type === "percent") {
      saved = orig * (disc / 100);
      finalP = orig - saved;
    } else {
      saved = disc;
      finalP = orig - saved;
      disc = orig > 0 ? (saved / orig) * 100 : 0;
    }
  } else if (orig !== null && finalP !== null) {
    saved = orig - finalP;
    disc = orig > 0 ? (saved / orig) * 100 : 0;
  } else if (orig !== null && saved !== null) {
    finalP = orig - saved;
    disc = orig > 0 ? (saved / orig) * 100 : 0;
  } else if (finalP !== null && saved !== null) {
    orig = finalP + saved;
    disc = orig > 0 ? (saved / orig) * 100 : 0;
  } else if (finalP !== null && disc !== null) {
    if (type === "percent") {
      const dec = disc / 100;
      orig = dec < 1 ? finalP / (1 - dec) : finalP;
      saved = orig - finalP;
    } else {
      saved = disc;
      orig = finalP + saved;
    }
  }

  const finalOrig = Math.max(0, orig || 59.99);
  const finalSaved = Math.max(0, saved || 9.00);
  const finalPrice = Math.max(0, finalP !== null ? finalP : finalOrig - finalSaved);
  const effectiveDiscountPercent = finalOrig > 0 ? Number(((finalSaved / finalOrig) * 100).toFixed(2)) : 0;

  return {
    originalPrice: Number(finalOrig.toFixed(2)),
    discountValue: Number((disc || 15).toFixed(2)),
    discountType: type,
    finalPrice: Number(finalPrice.toFixed(2)),
    youSaved: Number(finalSaved.toFixed(2)),
    effectiveDiscountPercent,
    savingsPercentage: effectiveDiscountPercent,
  };
}

/**
 * 2. Stacked / Multiple Discount Solver (e.g. 20% off + 10% off)
 */
export function calculateStackedDiscounts(input: StackedDiscountInput): StackedDiscountResult {
  const P = Math.max(0, Number(input.originalPrice || 100));
  const d1 = Math.max(0, Number(input.discount1Percent || 20)) / 100;
  const d2 = Math.max(0, Number(input.discount2Percent || 10)) / 100;
  const d3 = Math.max(0, Number(input.discount3Percent || 0)) / 100;

  const step1Price = P * (1 - d1);
  const step2Price = step1Price * (1 - d2);
  const finalPrice = step2Price * (1 - d3);

  const totalSaved = P - finalPrice;
  const effectiveCombinedDiscountPercent = P > 0 ? Number(((totalSaved / P) * 100).toFixed(2)) : 0;

  return {
    originalPrice: Number(P.toFixed(2)),
    step1Price: Number(step1Price.toFixed(2)),
    step2Price: Number(step2Price.toFixed(2)),
    finalPrice: Number(finalPrice.toFixed(2)),
    totalSaved: Number(totalSaved.toFixed(2)),
    effectiveCombinedDiscountPercent,
  };
}

/**
 * 3. Coupon Stack Calculator (Percent Off + Fixed Coupon)
 */
export function calculateCouponDiscount(input: CouponDiscountInput): CouponDiscountResult {
  const P = Math.max(0, Number(input.originalPrice || 100));
  const pct = Math.max(0, Number(input.percentOff || 20)) / 100;
  const coupon = Math.max(0, Number(input.fixedCoupon || 10));

  const percentSavings = P * pct;
  const afterPercent = P - percentSavings;
  const finalPrice = Math.max(0, afterPercent - coupon);
  const couponSavings = afterPercent - finalPrice;

  const totalSaved = P - finalPrice;
  const effectiveDiscountPercent = P > 0 ? Number(((totalSaved / P) * 100).toFixed(2)) : 0;

  return {
    originalPrice: Number(P.toFixed(2)),
    percentSavings: Number(percentSavings.toFixed(2)),
    couponSavings: Number(couponSavings.toFixed(2)),
    totalSaved: Number(totalSaved.toFixed(2)),
    finalPrice: Number(finalPrice.toFixed(2)),
    effectiveDiscountPercent,
  };
}

/**
 * 4. Sales Tax + Discount Calculator
 */
export function calculateTaxDiscount(input: TaxDiscountInput): TaxDiscountResult {
  const P = Math.max(0, Number(input.originalPrice || 100));
  const discPct = Math.max(0, Number(input.discountPercent || 20)) / 100;
  const taxPct = Math.max(0, Number(input.taxRatePercent || 8.0)) / 100;
  const isBeforeTax = input.taxTiming === "before_tax";

  let discountAmount = 0;
  let taxableAmount = 0;
  let taxAmount = 0;
  let finalCheckoutPrice = 0;

  if (isBeforeTax) {
    // Discount applied BEFORE tax (Standard retail)
    discountAmount = P * discPct;
    taxableAmount = P - discountAmount;
    taxAmount = taxableAmount * taxPct;
    finalCheckoutPrice = taxableAmount + taxAmount;
  } else {
    // Discount applied AFTER tax
    const originalWithTax = P * (1 + taxPct);
    discountAmount = originalWithTax * discPct;
    taxableAmount = P;
    taxAmount = P * taxPct;
    finalCheckoutPrice = Math.max(0, originalWithTax - discountAmount);
  }

  const totalSaved = P * (1 + taxPct) - finalCheckoutPrice;

  return {
    originalPrice: Number(P.toFixed(2)),
    discountAmount: Number(discountAmount.toFixed(2)),
    taxableAmount: Number(taxableAmount.toFixed(2)),
    taxAmount: Number(taxAmount.toFixed(2)),
    finalCheckoutPrice: Number(finalCheckoutPrice.toFixed(2)),
    totalSaved: Number(totalSaved.toFixed(2)),
  };
}
