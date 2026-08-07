/**
 * Shared Math Safety Utilities for Financial Calculations
 */

export function safePmt(P: number, r: number, n: number): number {
  if (P <= 0 || n <= 0) return 0;
  // If rate is zero or near zero
  if (r <= 0) return P / n;
  
  // Cap extreme compounding rates to prevent Infinity overflow
  const safeRate = Math.min(r, 5); // 500% per period max
  const pow = Math.pow(1 + safeRate, n);
  
  if (!isFinite(pow) || (pow - 1) === 0) {
    return P / n;
  }
  
  const pmt = (P * (safeRate * pow)) / (pow - 1);
  return isFinite(pmt) ? pmt : 0;
}
