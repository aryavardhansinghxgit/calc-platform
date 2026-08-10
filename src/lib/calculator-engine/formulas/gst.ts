/**
 * Precision Goods and Services Tax (GST) Calculation Engine
 * Supports GST Exclusive, GST Inclusive, Reverse GST, CGST/SGST vs IGST Inter-State splits,
 * Compensation Cess, Multi-Item Invoice Builder, and Composition Scheme vs Regular Scheme comparison.
 */

export type GstCalculationType = 'exclusive' | 'inclusive' | 'reverse_tax';
export type SupplyType = 'intra_state' | 'inter_state';

export interface GstInvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  gstRate: number; // % (0, 0.25, 3, 5, 12, 18, 28, custom)
  cessRate?: number; // %
}

export interface SingleGstInput {
  amount: number;
  gstRate: number; // %
  calculationType?: GstCalculationType; // 'exclusive' | 'inclusive' | 'reverse_tax'
  supplyType?: SupplyType; // 'intra_state' | 'inter_state'
  cessRate?: number; // %
  currency?: string;
}

export interface CompositionSchemeInput {
  annualTurnover: number;
  businessType: 'trader' | 'manufacturer' | 'restaurant' | 'service';
  totalPurchases: number;
  averageInputGstRate: number; // %
}

export interface GstCalculationResult {
  netAmount: number; // Base price before GST
  gstAmount: number; // Total GST tax
  totalAmount: number; // Final gross price
  effectiveGstRate: number; // %
  
  // Tax Head Breakdown
  supplyType: SupplyType;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
  igstRate: number;
  igstAmount: number;
  
  // Cess
  cessRate: number;
  cessAmount: number;
  grandTotalWithCess: number;
}

export interface MultiItemInvoiceResult {
  items: Array<GstInvoiceItem & {
    netTotal: number;
    gstTotal: number;
    grandTotal: number;
  }>;
  totalNetBase: number;
  totalGst: number;
  totalCgst: number;
  totalSgst: number;
  totalIgst: number;
  totalCess: number;
  grandTotal: number;
}

export interface CompositionSchemeResult {
  annualTurnover: number;
  compositionTaxRate: number; // %
  compositionTaxPayable: number;
  
  regularOutputGst: number;
  regularInputTaxCredit: number; // ITC
  regularNetGstPayable: number;
  
  taxSavingsUnderComposition: number;
  recommendedScheme: 'composition' | 'regular';
}

/**
 * Calculates Single Item GST with 3-way synchronization and CGST/SGST/IGST split
 */
export function calculateSingleGst(input: SingleGstInput): GstCalculationResult {
  const amount = Math.max(0, Number(input.amount) || 0);
  const gstRate = Math.max(0, Number(input.gstRate) || 0);
  const calculationType = input.calculationType || 'exclusive';
  const supplyType = input.supplyType || 'intra_state';
  const cessRate = Math.max(0, Number(input.cessRate) || 0);

  let netAmount = 0;
  let gstAmount = 0;
  let totalAmount = 0;

  const rateDecimal = gstRate / 100;

  if (calculationType === 'inclusive') {
    // Given Total Amount (Gross), extract GST & Net
    totalAmount = amount;
    netAmount = rateDecimal > 0 ? totalAmount / (1 + rateDecimal) : totalAmount;
    gstAmount = totalAmount - netAmount;
  } else if (calculationType === 'reverse_tax') {
    // Given GST Amount, calculate Net Base & Total
    gstAmount = amount;
    netAmount = rateDecimal > 0 ? gstAmount / rateDecimal : 0;
    totalAmount = netAmount + gstAmount;
  } else {
    // Exclusive (Default): Given Net Base Amount, add GST
    netAmount = amount;
    gstAmount = netAmount * rateDecimal;
    totalAmount = netAmount + gstAmount;
  }

  // Cess Calculation on Base Amount
  const cessAmount = netAmount * (cessRate / 100);
  const grandTotalWithCess = totalAmount + cessAmount;

  // Inter-State vs Intra-State Split
  let cgstRate = 0;
  let cgstAmount = 0;
  let sgstRate = 0;
  let sgstAmount = 0;
  let igstRate = 0;
  let igstAmount = 0;

  if (supplyType === 'intra_state') {
    cgstRate = gstRate / 2;
    cgstAmount = gstAmount / 2;
    sgstRate = gstRate / 2;
    sgstAmount = gstAmount / 2;
  } else {
    igstRate = gstRate;
    igstAmount = gstAmount;
  }

  return {
    netAmount: Number(netAmount.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    totalAmount: Number(totalAmount.toFixed(2)),
    effectiveGstRate: Number(gstRate.toFixed(2)),
    supplyType,
    cgstRate: Number(cgstRate.toFixed(2)),
    cgstAmount: Number(cgstAmount.toFixed(2)),
    sgstRate: Number(sgstRate.toFixed(2)),
    sgstAmount: Number(sgstAmount.toFixed(2)),
    igstRate: Number(igstRate.toFixed(2)),
    igstAmount: Number(igstAmount.toFixed(2)),
    cessRate: Number(cessRate.toFixed(2)),
    cessAmount: Number(cessAmount.toFixed(2)),
    grandTotalWithCess: Number(grandTotalWithCess.toFixed(2)),
  };
}

/**
 * Calculates Multi-Item Tax Invoice
 */
export function calculateMultiItemInvoice(
  items: GstInvoiceItem[],
  supplyType: SupplyType = 'intra_state'
): MultiItemInvoiceResult {
  let totalNetBase = 0;
  let totalGst = 0;
  let totalCess = 0;

  const processedItems = items.map((item) => {
    const qty = Math.max(1, Number(item.quantity) || 1);
    const unitPrice = Math.max(0, Number(item.unitPrice) || 0);
    const itemBase = qty * unitPrice;
    const ratePct = Math.max(0, Number(item.gstRate) || 0);
    const cessPct = Math.max(0, Number(item.cessRate) || 0);

    const itemGst = itemBase * (ratePct / 100);
    const itemCess = itemBase * (cessPct / 100);
    const itemGrandTotal = itemBase + itemGst + itemCess;

    totalNetBase += itemBase;
    totalGst += itemGst;
    totalCess += itemCess;

    return {
      ...item,
      netTotal: Number(itemBase.toFixed(2)),
      gstTotal: Number(itemGst.toFixed(2)),
      grandTotal: Number(itemGrandTotal.toFixed(2)),
    };
  });

  const totalCgst = supplyType === 'intra_state' ? totalGst / 2 : 0;
  const totalSgst = supplyType === 'intra_state' ? totalGst / 2 : 0;
  const totalIgst = supplyType === 'inter_state' ? totalGst : 0;
  const grandTotal = totalNetBase + totalGst + totalCess;

  return {
    items: processedItems,
    totalNetBase: Number(totalNetBase.toFixed(2)),
    totalGst: Number(totalGst.toFixed(2)),
    totalCgst: Number(totalCgst.toFixed(2)),
    totalSgst: Number(totalSgst.toFixed(2)),
    totalIgst: Number(totalIgst.toFixed(2)),
    totalCess: Number(totalCess.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
  };
}

/**
 * Calculates Composition Scheme vs Regular GST Scheme comparison
 */
export function calculateCompositionScheme(input: CompositionSchemeInput): CompositionSchemeResult {
  const turnover = Math.max(0, Number(input.annualTurnover) || 0);
  const purchases = Math.max(0, Number(input.totalPurchases) || 0);
  const avgInputRate = Math.max(0, Number(input.averageInputGstRate) || 18);

  // Composition Tax Rate % based on Business Type
  let compRate = 1.0; // Trader / Manufacturer (1%)
  if (input.businessType === 'restaurant') compRate = 5.0; // Restaurant (5%)
  if (input.businessType === 'service') compRate = 6.0; // Service provider (6%)

  const compositionTaxPayable = turnover * (compRate / 100);

  // Regular Scheme (18% output GST on sales - Input Tax Credit on purchases)
  const regularOutputGst = turnover * 0.18;
  const regularInputTaxCredit = purchases * (avgInputRate / 100);
  const regularNetGstPayable = Math.max(0, regularOutputGst - regularInputTaxCredit);

  const taxSavingsUnderComposition = regularNetGstPayable - compositionTaxPayable;
  const recommendedScheme = compositionTaxPayable <= regularNetGstPayable ? 'composition' : 'regular';

  return {
    annualTurnover: Number(turnover.toFixed(2)),
    compositionTaxRate: compRate,
    compositionTaxPayable: Number(compositionTaxPayable.toFixed(2)),
    regularOutputGst: Number(regularOutputGst.toFixed(2)),
    regularInputTaxCredit: Number(regularInputTaxCredit.toFixed(2)),
    regularNetGstPayable: Number(regularNetGstPayable.toFixed(2)),
    taxSavingsUnderComposition: Number(taxSavingsUnderComposition.toFixed(2)),
    recommendedScheme,
  };
}

/**
 * Backwards compatibility helper
 */
export function calculateGstFormula(input: { amount: number; gstRate: number; type?: GstCalculationType }) {
  const res = calculateSingleGst({
    amount: input.amount,
    gstRate: input.gstRate,
    calculationType: input.type || 'exclusive',
  });
  return {
    totalAmount: res.grandTotalWithCess,
    gstAmount: res.gstAmount,
    originalAmount: res.netAmount,
  };
}
