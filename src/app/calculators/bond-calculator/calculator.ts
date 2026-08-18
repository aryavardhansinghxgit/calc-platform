import {
  CouponFrequency,
  DayCountConvention,
  StandardBondParams,
  StandardBondResult,
  DayCountPricingParams,
  DayCountPricingResult,
  ZeroCouponParams,
  ZeroCouponResult,
  CallableBondParams,
  CallableBondResult,
  DurationConvexityParams,
  DurationConvexityResult,
  TaxEquivalentYieldParams,
  TaxEquivalentYieldResult,
  RateShiftScenario,
  BondStatus,
} from "./types";

export function getFrequencyMultiplier(freq: CouponFrequency): number {
  switch (freq) {
    case "annual":
      return 1;
    case "semiannual":
      return 2;
    case "quarterly":
      return 4;
    case "monthly":
      return 12;
    default:
      return 2;
  }
}

/**
 * High-precision Bond Price calculator given nominal YTM (decimal, e.g. 0.05)
 */
export function calculateBondPriceFromYield(
  faceValue: number,
  annualCouponRateDecimal: number,
  yearsToMaturity: number,
  ytmDecimal: number,
  m: number
): number {
  const n = Math.max(1, Math.round(yearsToMaturity * m));
  const C = (faceValue * annualCouponRateDecimal) / m;
  const periodicYield = ytmDecimal / m;

  if (Math.abs(periodicYield) < 1e-10) {
    // 0% yield: price is simply sum of undiscounted cash flows
    return C * n + faceValue;
  }

  const pvAnnuity = C * ((1 - Math.pow(1 + periodicYield, -n)) / periodicYield);
  const pvFace = faceValue / Math.pow(1 + periodicYield, n);
  return pvAnnuity + pvFace;
}

/**
 * Newton-Raphson solver for Yield to Maturity (nominal annual rate) with bisection fallback
 */
export function solveYTMNewtonRaphson(
  targetPrice: number,
  faceValue: number,
  annualCouponRateDecimal: number,
  yearsToMaturity: number,
  m: number
): number {
  if (targetPrice <= 0 || faceValue <= 0 || yearsToMaturity <= 0) return 0;

  const n = Math.max(1, Math.round(yearsToMaturity * m));
  const C = (faceValue * annualCouponRateDecimal) / m;

  // Initial guess using simple approximation formula
  // y_approx = [ C_annual + (F - P)/t ] / [ (F + P)/2 ]
  const approxAnnual =
    (faceValue * annualCouponRateDecimal + (faceValue - targetPrice) / yearsToMaturity) /
    ((faceValue + targetPrice) / 2);
  let y = Math.max(0.0001, approxAnnual);

  const maxIter = 100;
  const tolerance = 1e-9;

  for (let i = 0; i < maxIter; i++) {
    const periodicYield = y / m;
    if (1 + periodicYield <= 0.00001) {
      y = 0.001;
      break;
    }

    const discountFactor = Math.pow(1 + periodicYield, -n);
    let pvCoupons = 0;
    let dPvCoupons = 0;

    if (Math.abs(periodicYield) < 1e-10) {
      pvCoupons = C * n;
      dPvCoupons = (-C * n * (n + 1)) / (2 * m);
    } else {
      pvCoupons = C * ((1 - discountFactor) / periodicYield);
      // derivative of coupon PV w.r.t y
      // d/dy [ C*(1 - (1+y/m)^-n)/(y/m) ]
      // = C/m * [ (n*(1+y/m)^-(n+1)*y/m - (1-(1+y/m)^-n)) / (y/m)^2 ]
      const u = 1 - discountFactor;
      const v = periodicYield;
      const du = (n / m) * Math.pow(1 + periodicYield, -n - 1);
      const dv = 1 / m;
      dPvCoupons = C * ((du * v - u * dv) / (v * v));
    }

    const pvFace = faceValue * discountFactor;
    const dPvFace = -(n / m) * faceValue * Math.pow(1 + periodicYield, -n - 1);

    const price = pvCoupons + pvFace;
    const dPrice = dPvCoupons + dPvFace;

    const diff = price - targetPrice;
    if (Math.abs(diff) < tolerance) {
      return y;
    }

    if (Math.abs(dPrice) < 1e-12) {
      break; // Slope too flat, switch to bisection
    }

    const step = diff / dPrice;
    y = y - step;

    if (y <= -0.99 || y > 5.0 || isNaN(y)) {
      break; // Out of reasonable bounds, switch to bisection
    }
  }

  // Fallback: Binary Bisection
  let low = -0.2;
  let high = 3.0;

  for (let i = 0; i < 120; i++) {
    const mid = (low + high) / 2;
    const midPrice = calculateBondPriceFromYield(
      faceValue,
      annualCouponRateDecimal,
      yearsToMaturity,
      mid,
      m
    );

    if (Math.abs(midPrice - targetPrice) < tolerance) {
      return mid;
    }

    // Since Price is strictly decreasing with respect to Yield:
    if (midPrice > targetPrice) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return (low + high) / 2;
}

/**
 * Standard Fixed-Rate Bond Valuation Suite Calculator
 */
export function calculateStandardBond(params: StandardBondParams): StandardBondResult {
  const faceValue = Math.max(1, params.faceValue || 1000);
  const couponRate = Math.max(0, params.couponRate || 0);
  const couponRateDecimal = couponRate / 100;
  const yearsToMaturity = Math.max(0.01, params.yearsToMaturity || 1);
  const m = getFrequencyMultiplier(params.couponFrequency);
  const totalPeriods = Math.max(1, Math.round(yearsToMaturity * m));
  const periodicCoupon = (faceValue * couponRateDecimal) / m;
  const annualCoupon = faceValue * couponRateDecimal;

  let cleanPrice = 1000;
  let ytmPercent = 5.0;

  if (params.goal === "ytm") {
    cleanPrice = Math.max(0.01, params.marketPrice || 1000);
    const solvedYtm = solveYTMNewtonRaphson(
      cleanPrice,
      faceValue,
      couponRateDecimal,
      yearsToMaturity,
      m
    );
    ytmPercent = solvedYtm * 100;
  } else {
    ytmPercent = Math.max(0, params.ytm !== undefined ? params.ytm : 5.0);
    const ytmDecimal = ytmPercent / 100;
    cleanPrice = calculateBondPriceFromYield(
      faceValue,
      couponRateDecimal,
      yearsToMaturity,
      ytmDecimal,
      m
    );
  }

  const ytmDecimal = ytmPercent / 100;
  const periodicYield = ytmDecimal / m;

  // Accrued interest calculation
  const daysInPeriod = params.dayCount === "30/360" ? 360 / m : Math.round(365 / m);
  const daysSinceLastCoupon = Math.min(daysInPeriod, Math.max(0, params.daysSinceLastCoupon || 0));
  const accruedInterest = daysSinceLastCoupon > 0 ? periodicCoupon * (daysSinceLastCoupon / daysInPeriod) : 0;
  const dirtyPrice = cleanPrice + accruedInterest;

  // Effective Annual Yield: (1 + y/m)^m - 1
  const effectiveAnnualYield = (Math.pow(1 + periodicYield, m) - 1) * 100;
  const currentYieldPercent = cleanPrice > 0 ? (annualCoupon / cleanPrice) * 100 : 0;
  const totalCouponPayments = periodicCoupon * totalPeriods;
  const totalCashFlow = totalCouponPayments + faceValue;
  const netProfit = totalCashFlow - dirtyPrice;

  // Bond Status
  let status: BondStatus = "Par";
  if (cleanPrice > faceValue + 0.01) {
    status = "Premium";
  } else if (cleanPrice < faceValue - 0.01) {
    status = "Discount";
  }

  // Duration & Convexity
  let weightedTimeSum = 0;
  let convexitySum = 0;

  for (let k = 1; k <= totalPeriods; k++) {
    const tYears = k / m;
    const cf = k === totalPeriods ? periodicCoupon + faceValue : periodicCoupon;
    const pv = cf / Math.pow(1 + periodicYield, k);

    weightedTimeSum += tYears * pv;
    convexitySum += (k * (k + 1) * cf) / Math.pow(1 + periodicYield, k);
  }

  const macaulayDurationYears = cleanPrice > 0 ? weightedTimeSum / cleanPrice : yearsToMaturity;
  const modifiedDuration = macaulayDurationYears / (1 + periodicYield);
  const convexity =
    cleanPrice > 0
      ? convexitySum / (cleanPrice * Math.pow(1 + periodicYield, 2) * (m * m))
      : 0;

  // Generate Price-Yield Curve points for dynamic SVG charting (15 evenly spaced points)
  const baseYield = Math.max(0.5, ytmPercent);
  const minYield = Math.max(0.1, baseYield - 5);
  const maxYield = baseYield + 6;
  const priceYieldCurve: Array<{ yieldRate: number; price: number }> = [];

  for (let r = minYield; r <= maxYield; r += (maxYield - minYield) / 16) {
    const p = calculateBondPriceFromYield(faceValue, couponRateDecimal, yearsToMaturity, r / 100, m);
    priceYieldCurve.push({
      yieldRate: Number(r.toFixed(2)),
      price: Number(p.toFixed(2)),
    });
  }

  // Cash flow schedule (first 30 periods or all if smaller)
  const cashFlowSchedule: StandardBondResult["cashFlowSchedule"] = [];
  for (let k = 1; k <= totalPeriods; k++) {
    const isMaturity = k === totalPeriods;
    const cVal = periodicCoupon;
    const pVal = isMaturity ? faceValue : 0;
    const totalCf = cVal + pVal;
    const pv = totalCf / Math.pow(1 + periodicYield, k);

    cashFlowSchedule.push({
      period: k,
      year: Number((k / m).toFixed(2)),
      couponPayment: Number(cVal.toFixed(2)),
      principalPayment: Number(pVal.toFixed(2)),
      totalCashFlow: Number(totalCf.toFixed(2)),
      presentValue: Number(pv.toFixed(2)),
      remainingPrincipal: isMaturity ? 0 : faceValue,
    });
  }

  return {
    goal: params.goal,
    faceValue: Number(faceValue.toFixed(2)),
    couponRate: Number(couponRate.toFixed(4)),
    yearsToMaturity: Number(yearsToMaturity.toFixed(2)),
    couponFrequency: params.couponFrequency,
    frequencyMultiplier: m,
    totalPeriods,
    periodicCoupon: Number(periodicCoupon.toFixed(2)),
    annualCoupon: Number(annualCoupon.toFixed(2)),
    cleanPrice: Number(cleanPrice.toFixed(2)),
    dirtyPrice: Number(dirtyPrice.toFixed(2)),
    accruedInterest: Number(accruedInterest.toFixed(2)),
    ytmPercent: Number(ytmPercent.toFixed(4)),
    effectiveAnnualYield: Number(effectiveAnnualYield.toFixed(4)),
    currentYieldPercent: Number(currentYieldPercent.toFixed(4)),
    totalCouponPayments: Number(totalCouponPayments.toFixed(2)),
    totalCashFlow: Number(totalCashFlow.toFixed(2)),
    netProfit: Number(netProfit.toFixed(2)),
    status,
    macaulayDurationYears: Number(macaulayDurationYears.toFixed(3)),
    modifiedDuration: Number(modifiedDuration.toFixed(3)),
    convexity: Number(convexity.toFixed(3)),
    priceYieldCurve,
    cashFlowSchedule,
  };
}

/**
 * Day Count Convention & Accrued Interest Pricing Engine
 */
export function calculateDayCountPricing(params: DayCountPricingParams): DayCountPricingResult {
  const faceValue = Math.max(1, params.faceValue || 1000);
  const couponRate = Math.max(0, params.couponRate || 0);
  const couponRateDecimal = couponRate / 100;
  const ytm = Math.max(0, params.ytm || 0);
  const ytmDecimal = ytm / 100;
  const m = getFrequencyMultiplier(params.couponFrequency);

  const settlement = new Date(params.settlementDate || "2026-08-18");
  const maturity = new Date(params.maturityDate || "2036-08-18");

  // Calculate remaining time
  const msDiff = Math.max(86400000, maturity.getTime() - settlement.getTime());
  const yearsRemaining = Math.max(0.01, msDiff / (365.25 * 86400000));

  const periodicCoupon = (faceValue * couponRateDecimal) / m;
  const annualCoupon = faceValue * couponRateDecimal;

  // Approximate coupon period cycle
  const monthsBetweenCoupons = 12 / m;
  const nextCoupon = new Date(settlement);
  nextCoupon.setMonth(nextCoupon.getMonth() + monthsBetweenCoupons);

  const prevCoupon = new Date(settlement);
  prevCoupon.setMonth(prevCoupon.getMonth() - monthsBetweenCoupons / 2);

  let daysAccrued = 0;
  let daysInPeriod = 180;

  if (params.dayCount === "30/360") {
    daysInPeriod = 360 / m;
    const d1 = settlement.getDate();
    const m1 = settlement.getMonth();
    const d0 = 1;
    const m0 = prevCoupon.getMonth();
    daysAccrued = Math.max(0, Math.min(daysInPeriod, (m1 - m0) * 30 + (d1 - d0)));
    if (daysAccrued === 0) daysAccrued = Math.round(daysInPeriod * 0.25);
  } else if (params.dayCount === "actual/actual") {
    daysInPeriod = Math.round(365 / m);
    daysAccrued = Math.max(1, Math.min(daysInPeriod, Math.round(daysInPeriod * 0.35)));
  } else if (params.dayCount === "actual/360") {
    daysInPeriod = Math.round(360 / m);
    daysAccrued = Math.max(1, Math.min(daysInPeriod, Math.round(daysInPeriod * 0.35)));
  } else {
    daysInPeriod = Math.round(365 / m);
    daysAccrued = Math.max(1, Math.min(daysInPeriod, Math.round(daysInPeriod * 0.35)));
  }

  const fractionElapsed = daysAccrued / daysInPeriod;
  const accruedInterest = periodicCoupon * fractionElapsed;

  // Clean Price from discounting
  const cleanPrice = calculateBondPriceFromYield(
    faceValue,
    couponRateDecimal,
    yearsRemaining,
    ytmDecimal,
    m
  );
  const dirtyPrice = cleanPrice + accruedInterest;

  return {
    faceValue: Number(faceValue.toFixed(2)),
    cleanPrice: Number(cleanPrice.toFixed(2)),
    dirtyPrice: Number(dirtyPrice.toFixed(2)),
    accruedInterest: Number(accruedInterest.toFixed(2)),
    daysAccrued,
    daysInPeriod,
    previousCouponDate: prevCoupon.toISOString().split("T")[0],
    nextCouponDate: nextCoupon.toISOString().split("T")[0],
    fractionElapsed: Number(fractionElapsed.toFixed(4)),
    yearsRemaining: Number(yearsRemaining.toFixed(2)),
    ytm: Number(ytm.toFixed(4)),
    annualCoupon: Number(annualCoupon.toFixed(2)),
    periodicCoupon: Number(periodicCoupon.toFixed(2)),
  };
}

/**
 * Zero-Coupon Bond Pricing & Compound Accretion Engine
 */
export function calculateZeroCouponBond(params: ZeroCouponParams): ZeroCouponResult {
  const faceValue = Math.max(1, params.faceValue || 1000);
  const m = params.compoundingFrequency === "semiannual" ? 2 : 1;

  let price = 600;
  let ytm = 5.0;
  let yearsToMaturity = 10;

  if (params.solveFor === "price") {
    ytm = Math.max(0.001, params.ytm || 5.0);
    yearsToMaturity = Math.max(0.1, params.yearsToMaturity || 10);
    const yDec = ytm / 100;
    price = faceValue / Math.pow(1 + yDec / m, m * yearsToMaturity);
  } else if (params.solveFor === "ytm") {
    price = Math.max(0.01, Math.min(faceValue * 1.5, params.price || 600));
    yearsToMaturity = Math.max(0.1, params.yearsToMaturity || 10);
    // P = F / (1 + y/m)^(m*t) => y = m * [ (F/P)^(1/(m*t)) - 1 ]
    const ratio = faceValue / price;
    const exp = 1 / (m * yearsToMaturity);
    const periodicYield = Math.pow(ratio, exp) - 1;
    ytm = periodicYield * m * 100;
  } else {
    // Solve for Maturity
    price = Math.max(0.01, Math.min(faceValue * 0.999, params.price || 600));
    ytm = Math.max(0.001, params.ytm || 5.0);
    const yDec = ytm / 100;
    // t = ln(F/P) / [ m * ln(1 + y/m) ]
    const numerator = Math.log(faceValue / price);
    const denominator = m * Math.log(1 + yDec / m);
    yearsToMaturity = numerator / denominator;
  }

  const yDec = ytm / 100;
  const effectiveAnnualRate = (Math.pow(1 + yDec / m, m) - 1) * 100;
  const totalDiscount = faceValue - price;
  const totalProfit = totalDiscount;

  // Generate annual phantom tax accretion schedule (constant yield method)
  const accretionSchedule: ZeroCouponResult["accretionSchedule"] = [];
  let currentVal = price;
  const totalYearsCeil = Math.min(30, Math.ceil(yearsToMaturity));

  for (let yr = 1; yr <= totalYearsCeil; yr++) {
    const endOfYearT = Math.min(yearsToMaturity, yr);
    const endOfYearVal = faceValue / Math.pow(1 + yDec / m, m * (yearsToMaturity - endOfYearT));
    const imputedInterest = endOfYearVal - currentVal;

    accretionSchedule.push({
      year: yr,
      beginningValue: Number(currentVal.toFixed(2)),
      imputedInterest: Number(imputedInterest.toFixed(2)),
      endingValue: Number(endOfYearVal.toFixed(2)),
      cumulativeAccretion: Number((endOfYearVal - price).toFixed(2)),
    });

    currentVal = endOfYearVal;
  }

  return {
    solveFor: params.solveFor,
    faceValue: Number(faceValue.toFixed(2)),
    price: Number(price.toFixed(2)),
    ytm: Number(ytm.toFixed(4)),
    effectiveAnnualRate: Number(effectiveAnnualRate.toFixed(4)),
    yearsToMaturity: Number(yearsToMaturity.toFixed(2)),
    totalDiscount: Number(totalDiscount.toFixed(2)),
    totalProfit: Number(totalProfit.toFixed(2)),
    compoundingFrequency: params.compoundingFrequency,
    accretionSchedule,
  };
}

/**
 * Callable & Puttable Bond Yield Suite (YTC, YTP, YTW)
 */
export function calculateCallableBond(params: CallableBondParams): CallableBondResult {
  const faceValue = Math.max(1, params.faceValue || 1000);
  const couponRate = Math.max(0, params.couponRate || 0);
  const couponRateDecimal = couponRate / 100;
  const marketPrice = Math.max(0.01, params.marketPrice || 1000);
  const yearsToMaturity = Math.max(0.1, params.yearsToMaturity || 10);
  const yearsToCall = Math.max(0.1, Math.min(yearsToMaturity, params.yearsToCall || 5));
  const callPriceDollar = (faceValue * (params.callPricePercent || 100)) / 100;
  const m = getFrequencyMultiplier(params.couponFrequency);

  // 1. Yield to Maturity (YTM)
  const ytmDecimal = solveYTMNewtonRaphson(
    marketPrice,
    faceValue,
    couponRateDecimal,
    yearsToMaturity,
    m
  );
  const ytmPercent = ytmDecimal * 100;

  // 2. Yield to Call (YTC)
  const ytcDecimal = solveYTMNewtonRaphson(
    marketPrice,
    callPriceDollar,
    couponRateDecimal,
    yearsToCall,
    m
  );
  const ytcPercent = ytcDecimal * 100;

  // 3. Optional Put option
  let ytpPercent: number | undefined = undefined;
  let putPriceDollar: number | undefined = undefined;

  if (params.hasPutOption && params.yearsToPut) {
    putPriceDollar = (faceValue * (params.putPricePercent || 100)) / 100;
    const ytpDecimal = solveYTMNewtonRaphson(
      marketPrice,
      putPriceDollar,
      couponRateDecimal,
      params.yearsToPut,
      m
    );
    ytpPercent = ytpDecimal * 100;
  }

  // 4. Yield to Worst (YTW) = minimum of achievable yields
  let ytwPercent = Math.min(ytmPercent, ytcPercent);
  let worstScenario: "Maturity" | "Call" | "Put" = ytcPercent < ytmPercent ? "Call" : "Maturity";

  if (ytpPercent !== undefined) {
    if (ytpPercent < ytwPercent) {
      ytwPercent = ytpPercent;
      worstScenario = "Put";
    }
  }

  return {
    faceValue: Number(faceValue.toFixed(2)),
    marketPrice: Number(marketPrice.toFixed(2)),
    couponRate: Number(couponRate.toFixed(4)),
    couponFrequency: params.couponFrequency,
    ytmPercent: Number(ytmPercent.toFixed(4)),
    ytcPercent: Number(ytcPercent.toFixed(4)),
    ytpPercent: ytpPercent !== undefined ? Number(ytpPercent.toFixed(4)) : undefined,
    ytwPercent: Number(ytwPercent.toFixed(4)),
    worstScenario,
    callPriceDollar: Number(callPriceDollar.toFixed(2)),
    putPriceDollar: putPriceDollar !== undefined ? Number(putPriceDollar.toFixed(2)) : undefined,
    yearsToCall: Number(yearsToCall.toFixed(2)),
    yearsToMaturity: Number(yearsToMaturity.toFixed(2)),
  };
}

/**
 * Interest Rate Risk, Duration & Convexity Matrix
 */
export function calculateDurationConvexity(params: DurationConvexityParams): DurationConvexityResult {
  const faceValue = Math.max(1, params.faceValue || 1000);
  const couponRate = Math.max(0, params.couponRate || 0);
  const couponRateDecimal = couponRate / 100;
  const ytm = Math.max(0.0001, params.ytm || 5.0);
  const ytmDecimal = ytm / 100;
  const yearsToMaturity = Math.max(0.1, params.yearsToMaturity || 10);
  const m = getFrequencyMultiplier(params.couponFrequency);

  const totalPeriods = Math.max(1, Math.round(yearsToMaturity * m));
  const periodicCoupon = (faceValue * couponRateDecimal) / m;
  const periodicYield = ytmDecimal / m;

  const bondPrice = calculateBondPriceFromYield(
    faceValue,
    couponRateDecimal,
    yearsToMaturity,
    ytmDecimal,
    m
  );

  let weightedTimeSum = 0;
  let convexitySum = 0;

  for (let k = 1; k <= totalPeriods; k++) {
    const tYears = k / m;
    const cf = k === totalPeriods ? periodicCoupon + faceValue : periodicCoupon;
    const pv = cf / Math.pow(1 + periodicYield, k);

    weightedTimeSum += tYears * pv;
    convexitySum += (k * (k + 1) * cf) / Math.pow(1 + periodicYield, k);
  }

  const macaulayDuration = bondPrice > 0 ? weightedTimeSum / bondPrice : yearsToMaturity;
  const modifiedDuration = macaulayDuration / (1 + periodicYield);
  const convexity =
    bondPrice > 0 ? convexitySum / (bondPrice * Math.pow(1 + periodicYield, 2) * (m * m)) : 0;

  const dollarDuration = (modifiedDuration * bondPrice) / 100;
  const dv01 = (modifiedDuration * bondPrice) / 10000; // Dollar Value of 1 basis point

  // Rate shift shock scenarios
  const shiftBpsList = [-300, -200, -100, -50, 50, 100, 200, 300];
  const rateShifts: RateShiftScenario[] = shiftBpsList.map((shiftBps) => {
    const dy = shiftBps / 10000; // in decimal, e.g. -0.01 for -100 bps
    const newYield = Math.max(0.0001, ytm + shiftBps / 100);
    const exactPrice = calculateBondPriceFromYield(
      faceValue,
      couponRateDecimal,
      yearsToMaturity,
      newYield / 100,
      m
    );

    // Duration-only estimate: ΔP ≈ -ModD * Δy * P
    const durationDelta = -modifiedDuration * dy * bondPrice;
    const durationEstPrice = bondPrice + durationDelta;

    // Duration + Convexity estimate: ΔP ≈ -ModD * Δy * P + 0.5 * Convexity * (Δy)^2 * P
    const convexityAdjustment = 0.5 * convexity * Math.pow(dy, 2) * bondPrice;
    const durConvexityDelta = durationDelta + convexityAdjustment;
    const durationConvexityEstPrice = bondPrice + durConvexityDelta;

    const exactChangePercent = ((exactPrice - bondPrice) / bondPrice) * 100;
    const durConvexityChangePercent = (durConvexityDelta / bondPrice) * 100;
    const dollarChange = exactPrice - bondPrice;

    return {
      shiftBps,
      shiftPercent: shiftBps / 100,
      newYield: Number(newYield.toFixed(2)),
      exactPrice: Number(exactPrice.toFixed(2)),
      durationEstPrice: Number(durationEstPrice.toFixed(2)),
      durationConvexityEstPrice: Number(durationConvexityEstPrice.toFixed(2)),
      exactChangePercent: Number(exactChangePercent.toFixed(2)),
      durConvexityChangePercent: Number(durConvexityChangePercent.toFixed(2)),
      dollarChange: Number(dollarChange.toFixed(2)),
    };
  });

  return {
    bondPrice: Number(bondPrice.toFixed(2)),
    macaulayDuration: Number(macaulayDuration.toFixed(3)),
    modifiedDuration: Number(modifiedDuration.toFixed(3)),
    convexity: Number(convexity.toFixed(3)),
    dollarDuration: Number(dollarDuration.toFixed(2)),
    dv01: Number(dv01.toFixed(4)),
    rateShifts,
  };
}

/**
 * Tax-Equivalent Municipal Yield (TEY) Engine
 */
export function calculateTaxEquivalentYield(
  params: TaxEquivalentYieldParams
): TaxEquivalentYieldResult {
  const muniYield = Math.max(0, params.municipalYield || 0);
  const fedTax = Math.max(0, Math.min(99, params.federalTaxRate || 0)) / 100;
  const stateTax = Math.max(0, Math.min(99, params.stateTaxRate || 0)) / 100;

  // Combined marginal tax rate: T_eff = T_fed + T_state * (1 - T_fed)
  const combinedTaxRate = (fedTax + stateTax * (1 - fedTax)) * 100;
  const combinedTaxDecimal = combinedTaxRate / 100;

  // TEY = Muni Yield / (1 - combinedTaxDecimal)
  const taxEquivalentYield =
    combinedTaxDecimal < 0.999 ? muniYield / (1 - combinedTaxDecimal) : muniYield * 100;

  let afterTaxCorporateYield: number | undefined = undefined;
  let corporateAdvantagePercent: number | undefined = undefined;
  let recommendedOption: "Municipal" | "Corporate" | "Neutral" = "Neutral";

  if (params.corporateBondYield !== undefined) {
    const corpYield = params.corporateBondYield;
    afterTaxCorporateYield = corpYield * (1 - combinedTaxDecimal);
    corporateAdvantagePercent = corpYield - taxEquivalentYield;

    if (muniYield > afterTaxCorporateYield + 0.01) {
      recommendedOption = "Municipal";
    } else if (afterTaxCorporateYield > muniYield + 0.01) {
      recommendedOption = "Corporate";
    } else {
      recommendedOption = "Neutral";
    }
  }

  const taxSavingsPer10k = (taxEquivalentYield - muniYield) * 100;

  return {
    municipalYield: Number(muniYield.toFixed(3)),
    federalTaxRate: Number((fedTax * 100).toFixed(2)),
    stateTaxRate: Number((stateTax * 100).toFixed(2)),
    combinedTaxRate: Number(combinedTaxRate.toFixed(2)),
    taxEquivalentYield: Number(taxEquivalentYield.toFixed(3)),
    afterTaxCorporateYield:
      afterTaxCorporateYield !== undefined ? Number(afterTaxCorporateYield.toFixed(3)) : undefined,
    corporateAdvantagePercent:
      corporateAdvantagePercent !== undefined
        ? Number(corporateAdvantagePercent.toFixed(3))
        : undefined,
    recommendedOption,
    taxSavingsPer10k: Number(taxSavingsPer10k.toFixed(2)),
  };
}
