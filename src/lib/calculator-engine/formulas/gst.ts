/**
 * Pure Mathematical Logic for Goods and Services Tax (GST) Calculation.
 */

export interface GstFormulaInput {
  amount: number;
  gstRate: number;
  type?: "exclusive" | "inclusive";
}

export interface GstFormulaResult {
  originalAmount: number;
  gstAmount: number;
  totalAmount: number;
}

export function calculateGstFormula({
  amount,
  gstRate,
  type = "exclusive",
}: GstFormulaInput): GstFormulaResult {
  if (type === "inclusive") {
    const gstAmount = (amount * gstRate) / (100 + gstRate);
    const originalAmount = amount - gstAmount;
    return {
      originalAmount,
      gstAmount,
      totalAmount: amount,
    };
  }

  const gstAmount = (amount * gstRate) / 100;
  const totalAmount = amount + gstAmount;

  return {
    originalAmount: amount,
    gstAmount,
    totalAmount,
  };
}
