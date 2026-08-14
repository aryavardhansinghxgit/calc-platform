export type TaxMode = "pre-tax" | "post-tax";
export type RoundingMode = "none" | "tip" | "total" | "person";

export interface CountryTipInfo {
  code: string;
  name: string;
  currencySymbol: string;
  defaultTipPct: number;
  tipExpected: string;
  etiquetteNotes: string;
}

export interface ItemizedItem {
  id: string;
  name: string;
  price: number;
}

export interface ItemizedDiner {
  id: string;
  name: string;
  items: ItemizedItem[];
}

export interface ItemizedDinerResult {
  dinerId: string;
  name: string;
  subtotal: number;
  sharedAppetizerShare: number;
  taxShare: number;
  tipShare: number;
  total: number;
}

export interface TipCalculationResult {
  subtotal: number;
  taxAmount: number;
  taxRatePct: number;
  tipPct: number;
  rawTipAmount: number;
  tipAmount: number;
  rawTotalAmount: number;
  totalAmount: number;
  partySize: number;
  tipPerPerson: number;
  totalPerPerson: number;
  roundingAdjustment: number;
  taxMode: TaxMode;
  roundingMode: RoundingMode;
  country: CountryTipInfo;
  itemizedResults?: ItemizedDinerResult[];
}
