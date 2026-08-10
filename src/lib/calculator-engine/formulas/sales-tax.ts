/**
 * Precision Sales Tax Calculation Engine
 * Supports 5 Calculation Modes (Modes A through E),
 * Full US 50-State + DC + Territories Tax Database,
 * Multi-Item Receipt Engine, Business Tax Collection Solver, and What-If Comparison.
 */

export interface StateTaxInfo {
  state: string;
  code: string;
  stateRate: number; // General State Sales Tax %
  avgLocalRate: number; // Average Local Sales Tax %
  maxCombinedRate: number; // Max Combined Rate %
  groceryExempt: boolean;
  clothingExempt: boolean;
}

export interface ReceiptItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
  isTaxable: boolean;
}

export interface ReceiptResult {
  items: (ReceiptItem & { lineSubtotal: number; lineTax: number; lineTotal: number })[];
  subtotal: number;
  taxableSubtotal: number;
  exemptSubtotal: number;
  totalTax: number;
  grandTotal: number;
}

export interface SalesTaxSolveInput {
  preTaxPrice?: number;
  taxRate?: number;
  afterTaxPrice?: number;
  taxAmount?: number;
  mode?: "A" | "B" | "C" | "D" | "E";
}

export interface SalesTaxSolveResult {
  preTaxPrice: number;
  taxRate: number;
  taxAmount: number;
  afterTaxPrice: number;
  activeMode: string;
  solvedField1: string;
  solvedField2: string;
}

export interface BusinessCollectionResult {
  grossSalesRevenue: number;
  taxRate: number;
  netSalesRevenue: number;
  taxCollected: number;
}

export const US_STATE_TAX_DATABASE: StateTaxInfo[] = [
  { state: "Alabama", code: "AL", stateRate: 4.0, avgLocalRate: 5.25, maxCombinedRate: 11.5, groceryExempt: false, clothingExempt: false },
  { state: "Alaska", code: "AK", stateRate: 0.0, avgLocalRate: 1.76, maxCombinedRate: 7.5, groceryExempt: true, clothingExempt: true },
  { state: "Arizona", code: "AZ", stateRate: 5.6, avgLocalRate: 2.8, maxCombinedRate: 11.2, groceryExempt: true, clothingExempt: false },
  { state: "Arkansas", code: "AR", stateRate: 6.5, avgLocalRate: 2.97, maxCombinedRate: 11.5, groceryExempt: false, clothingExempt: false },
  { state: "California", code: "CA", stateRate: 7.25, avgLocalRate: 1.6, maxCombinedRate: 10.75, groceryExempt: true, clothingExempt: false },
  { state: "Colorado", code: "CO", stateRate: 2.9, avgLocalRate: 4.87, maxCombinedRate: 11.2, groceryExempt: true, clothingExempt: false },
  { state: "Connecticut", code: "CT", stateRate: 6.35, avgLocalRate: 0.0, maxCombinedRate: 6.35, groceryExempt: true, clothingExempt: false },
  { state: "Delaware", code: "DE", stateRate: 0.0, avgLocalRate: 0.0, maxCombinedRate: 0.0, groceryExempt: true, clothingExempt: true },
  { state: "District of Columbia", code: "DC", stateRate: 6.0, avgLocalRate: 0.0, maxCombinedRate: 6.0, groceryExempt: true, clothingExempt: false },
  { state: "Florida", code: "FL", stateRate: 6.0, avgLocalRate: 1.05, maxCombinedRate: 8.0, groceryExempt: true, clothingExempt: false },
  { state: "Georgia", code: "GA", stateRate: 4.0, avgLocalRate: 3.35, maxCombinedRate: 9.0, groceryExempt: true, clothingExempt: false },
  { state: "Hawaii", code: "HI", stateRate: 4.0, avgLocalRate: 0.44, maxCombinedRate: 4.5, groceryExempt: false, clothingExempt: false },
  { state: "Idaho", code: "ID", stateRate: 6.0, avgLocalRate: 0.03, maxCombinedRate: 9.0, groceryExempt: false, clothingExempt: false },
  { state: "Illinois", code: "IL", stateRate: 6.25, avgLocalRate: 2.57, maxCombinedRate: 11.0, groceryExempt: false, clothingExempt: false },
  { state: "Indiana", code: "IN", stateRate: 7.0, avgLocalRate: 0.0, maxCombinedRate: 7.0, groceryExempt: true, clothingExempt: false },
  { state: "Iowa", code: "IA", stateRate: 6.0, avgLocalRate: 0.94, maxCombinedRate: 7.0, groceryExempt: true, clothingExempt: false },
  { state: "Kansas", code: "KS", stateRate: 6.5, avgLocalRate: 2.19, maxCombinedRate: 10.6, groceryExempt: false, clothingExempt: false },
  { state: "Kentucky", code: "KY", stateRate: 6.0, avgLocalRate: 0.0, maxCombinedRate: 6.0, groceryExempt: true, clothingExempt: false },
  { state: "Louisiana", code: "LA", stateRate: 4.45, avgLocalRate: 5.1, maxCombinedRate: 11.45, groceryExempt: true, clothingExempt: false },
  { state: "Maine", code: "ME", stateRate: 5.5, avgLocalRate: 0.0, maxCombinedRate: 5.5, groceryExempt: true, clothingExempt: false },
  { state: "Maryland", code: "MD", stateRate: 6.0, avgLocalRate: 0.0, maxCombinedRate: 6.0, groceryExempt: true, clothingExempt: false },
  { state: "Massachusetts", code: "MA", stateRate: 6.25, avgLocalRate: 0.0, maxCombinedRate: 6.25, groceryExempt: true, clothingExempt: true },
  { state: "Michigan", code: "MI", stateRate: 6.0, avgLocalRate: 0.0, maxCombinedRate: 6.0, groceryExempt: true, clothingExempt: false },
  { state: "Minnesota", code: "MN", stateRate: 6.875, avgLocalRate: 0.62, maxCombinedRate: 9.03, groceryExempt: true, clothingExempt: true },
  { state: "Mississippi", code: "MS", stateRate: 7.0, avgLocalRate: 0.07, maxCombinedRate: 8.0, groceryExempt: false, clothingExempt: false },
  { state: "Missouri", code: "MO", stateRate: 4.225, avgLocalRate: 4.1, maxCombinedRate: 10.35, groceryExempt: false, clothingExempt: false },
  { state: "Montana", code: "MT", stateRate: 0.0, avgLocalRate: 0.0, maxCombinedRate: 3.0, groceryExempt: true, clothingExempt: true },
  { state: "Nebraska", code: "NE", stateRate: 5.5, avgLocalRate: 1.47, maxCombinedRate: 8.0, groceryExempt: true, clothingExempt: false },
  { state: "Nevada", code: "NV", stateRate: 6.85, avgLocalRate: 1.38, maxCombinedRate: 8.38, groceryExempt: true, clothingExempt: false },
  { state: "New Hampshire", code: "NH", stateRate: 0.0, avgLocalRate: 0.0, maxCombinedRate: 0.0, groceryExempt: true, clothingExempt: true },
  { state: "New Jersey", code: "NJ", stateRate: 6.625, avgLocalRate: -0.03, maxCombinedRate: 12.88, groceryExempt: true, clothingExempt: true },
  { state: "New Mexico", code: "NM", stateRate: 5.125, avgLocalRate: 2.71, maxCombinedRate: 9.06, groceryExempt: true, clothingExempt: false },
  { state: "New York", code: "NY", stateRate: 4.0, avgLocalRate: 4.52, maxCombinedRate: 8.88, groceryExempt: true, clothingExempt: true },
  { state: "North Carolina", code: "NC", stateRate: 4.75, avgLocalRate: 2.23, maxCombinedRate: 7.5, groceryExempt: true, clothingExempt: false },
  { state: "North Dakota", code: "ND", stateRate: 5.0, avgLocalRate: 1.96, maxCombinedRate: 8.5, groceryExempt: true, clothingExempt: false },
  { state: "Ohio", code: "OH", stateRate: 5.75, avgLocalRate: 1.49, maxCombinedRate: 8.0, groceryExempt: true, clothingExempt: false },
  { state: "Oklahoma", code: "OK", stateRate: 4.5, avgLocalRate: 4.49, maxCombinedRate: 11.5, groceryExempt: false, clothingExempt: false },
  { state: "Oregon", code: "OR", stateRate: 0.0, avgLocalRate: 0.0, maxCombinedRate: 0.0, groceryExempt: true, clothingExempt: true },
  { state: "Pennsylvania", code: "PA", stateRate: 6.0, avgLocalRate: 0.34, maxCombinedRate: 8.0, groceryExempt: true, clothingExempt: true },
  { state: "Puerto Rico", code: "PR", stateRate: 10.5, avgLocalRate: 1.0, maxCombinedRate: 11.5, groceryExempt: true, clothingExempt: false },
  { state: "Rhode Island", code: "RI", stateRate: 7.0, avgLocalRate: 0.0, maxCombinedRate: 7.0, groceryExempt: true, clothingExempt: true },
  { state: "South Carolina", code: "SC", stateRate: 6.0, avgLocalRate: 1.43, maxCombinedRate: 9.0, groceryExempt: true, clothingExempt: false },
  { state: "South Dakota", code: "SD", stateRate: 4.2, avgLocalRate: 1.91, maxCombinedRate: 6.7, groceryExempt: false, clothingExempt: false },
  { state: "Tennessee", code: "TN", stateRate: 7.0, avgLocalRate: 2.55, maxCombinedRate: 9.75, groceryExempt: false, clothingExempt: false },
  { state: "Texas", code: "TX", stateRate: 6.25, avgLocalRate: 1.94, maxCombinedRate: 8.25, groceryExempt: true, clothingExempt: false },
  { state: "Utah", code: "UT", stateRate: 6.1, avgLocalRate: 1.09, maxCombinedRate: 9.05, groceryExempt: false, clothingExempt: false },
  { state: "Vermont", code: "VT", stateRate: 6.0, avgLocalRate: 0.24, maxCombinedRate: 7.0, groceryExempt: true, clothingExempt: true },
  { state: "Virginia", code: "VA", stateRate: 5.3, avgLocalRate: 0.45, maxCombinedRate: 7.0, groceryExempt: false, clothingExempt: false },
  { state: "Washington", code: "WA", stateRate: 6.5, avgLocalRate: 2.79, maxCombinedRate: 10.6, groceryExempt: true, clothingExempt: false },
  { state: "West Virginia", code: "WV", stateRate: 6.0, avgLocalRate: 0.55, maxCombinedRate: 7.0, groceryExempt: true, clothingExempt: false },
  { state: "Wisconsin", code: "WI", stateRate: 5.0, avgLocalRate: 0.43, maxCombinedRate: 6.75, groceryExempt: true, clothingExempt: false },
  { state: "Wyoming", code: "WY", stateRate: 4.0, avgLocalRate: 1.36, maxCombinedRate: 6.0, groceryExempt: true, clothingExempt: false },
];

/**
 * Universal 5-Way Sales Tax Solver
 */
export function solveSalesTax(input: SalesTaxSolveInput): SalesTaxSolveResult {
  let preTax = Math.max(0, Number(input.preTaxPrice) || 0);
  let rate = Math.max(0, Number(input.taxRate) || 0);
  let afterTax = Math.max(0, Number(input.afterTaxPrice) || 0);
  let taxAmt = Math.max(0, Number(input.taxAmount) || 0);

  let mode = input.mode || "A";
  let solved1 = "";
  let solved2 = "";

  // Auto-detect mode if not explicitly provided
  if (!input.mode) {
    if (preTax > 0 && rate > 0) mode = "A";
    else if (afterTax > 0 && rate > 0) mode = "B";
    else if (preTax > 0 && afterTax > 0) mode = "C";
    else if (taxAmt > 0 && rate > 0) mode = "D";
    else if (taxAmt > 0 && preTax > 0) mode = "E";
  }

  switch (mode) {
    case "A":
      // Pre-Tax Price + Tax Rate -> Calculate Tax Amount & Final Price
      taxAmt = preTax * (rate / 100);
      afterTax = preTax + taxAmt;
      solved1 = "Tax Amount";
      solved2 = "Final Price";
      break;

    case "B":
      // Final Price + Tax Rate -> Calculate Pre-Tax Price & Tax Amount
      preTax = afterTax / (1 + rate / 100);
      taxAmt = afterTax - preTax;
      solved1 = "Pre-Tax Price";
      solved2 = "Tax Amount";
      break;

    case "C":
      // Pre-Tax Price + Final Price -> Calculate Tax Rate & Tax Amount
      taxAmt = afterTax - preTax;
      rate = preTax > 0 ? (taxAmt / preTax) * 100 : 0;
      solved1 = "Tax Amount";
      solved2 = "Tax Rate %";
      break;

    case "D":
      // Tax Amount + Tax Rate -> Calculate Base Price & Final Price
      preTax = rate > 0 ? taxAmt / (rate / 100) : 0;
      afterTax = preTax + taxAmt;
      solved1 = "Pre-Tax Price";
      solved2 = "Final Price";
      break;

    case "E":
      // Tax Amount + Pre-Tax Price -> Calculate Tax Rate & Final Price
      rate = preTax > 0 ? (taxAmt / preTax) * 100 : 0;
      afterTax = preTax + taxAmt;
      solved1 = "Tax Rate %";
      solved2 = "Final Price";
      break;
  }

  return {
    preTaxPrice: Number(preTax.toFixed(2)),
    taxRate: Number(rate.toFixed(3)),
    taxAmount: Number(taxAmt.toFixed(2)),
    afterTaxPrice: Number(afterTax.toFixed(2)),
    activeMode: mode,
    solvedField1: solved1,
    solvedField2: solved2,
  };
}

/**
 * Multi-Item Receipt Calculation
 */
export function calculateReceipt(items: ReceiptItem[], taxRatePct: number): ReceiptResult {
  const rate = Math.max(0, taxRatePct) / 100;

  let subtotal = 0;
  let taxableSubtotal = 0;
  let exemptSubtotal = 0;
  let totalTax = 0;

  const processedItems = items.map((item) => {
    const qty = Math.max(1, item.quantity || 1);
    const unitP = Math.max(0, item.unitPrice || 0);
    const lineSubtotal = qty * unitP;
    const lineTax = item.isTaxable ? lineSubtotal * rate : 0;
    const lineTotal = lineSubtotal + lineTax;

    subtotal += lineSubtotal;
    if (item.isTaxable) {
      taxableSubtotal += lineSubtotal;
      totalTax += lineTax;
    } else {
      exemptSubtotal += lineSubtotal;
    }

    return {
      ...item,
      lineSubtotal: Number(lineSubtotal.toFixed(2)),
      lineTax: Number(lineTax.toFixed(2)),
      lineTotal: Number(lineTotal.toFixed(2)),
    };
  });

  const grandTotal = subtotal + totalTax;

  return {
    items: processedItems,
    subtotal: Number(subtotal.toFixed(2)),
    taxableSubtotal: Number(taxableSubtotal.toFixed(2)),
    exemptSubtotal: Number(exemptSubtotal.toFixed(2)),
    totalTax: Number(totalTax.toFixed(2)),
    grandTotal: Number(grandTotal.toFixed(2)),
  };
}

/**
 * Business Sales Tax Collection Solver
 */
export function calculateBusinessCollection(grossSalesRevenue: number, taxRatePct: number): BusinessCollectionResult {
  const gross = Math.max(0, grossSalesRevenue);
  const rate = Math.max(0, taxRatePct) / 100;

  const netSalesRevenue = gross / (1 + rate);
  const taxCollected = gross - netSalesRevenue;

  return {
    grossSalesRevenue: Number(gross.toFixed(2)),
    taxRate: taxRatePct,
    netSalesRevenue: Number(netSalesRevenue.toFixed(2)),
    taxCollected: Number(taxCollected.toFixed(2)),
  };
}
