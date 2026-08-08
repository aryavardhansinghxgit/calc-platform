export interface USStateTaxData {
  code: string;
  name: string;
  taxRate: number; // percentage e.g. 6.0
  tradeInTaxCredit: boolean; // whether trade-in value reduces taxable vehicle purchase price
  avgFees: number; // average state registration & title fees
}

export const US_STATE_TAXES: Record<string, USStateTaxData> = {
  AL: { code: "AL", name: "Alabama", taxRate: 2.0, tradeInTaxCredit: true, avgFees: 300 },
  AK: { code: "AK", name: "Alaska", taxRate: 0.0, tradeInTaxCredit: true, avgFees: 250 },
  AZ: { code: "AZ", name: "Arizona", taxRate: 5.6, tradeInTaxCredit: true, avgFees: 450 },
  AR: { code: "AR", name: "Arkansas", taxRate: 6.5, tradeInTaxCredit: true, avgFees: 200 },
  CA: { code: "CA", name: "California", taxRate: 7.25, tradeInTaxCredit: false, avgFees: 600 },
  CO: { code: "CO", name: "Colorado", taxRate: 2.9, tradeInTaxCredit: true, avgFees: 400 },
  CT: { code: "CT", name: "Connecticut", taxRate: 6.35, tradeInTaxCredit: true, avgFees: 350 },
  DE: { code: "DE", name: "Delaware", taxRate: 4.25, tradeInTaxCredit: true, avgFees: 200 },
  FL: { code: "FL", name: "Florida", taxRate: 6.0, tradeInTaxCredit: true, avgFees: 500 },
  GA: { code: "GA", name: "Georgia", taxRate: 7.0, tradeInTaxCredit: true, avgFees: 350 },
  HI: { code: "HI", name: "Hawaii", taxRate: 4.0, tradeInTaxCredit: false, avgFees: 300 },
  ID: { code: "ID", name: "Idaho", taxRate: 6.0, tradeInTaxCredit: true, avgFees: 220 },
  IL: { code: "IL", name: "Illinois", taxRate: 6.25, tradeInTaxCredit: true, avgFees: 450 },
  IN: { code: "IN", name: "Indiana", taxRate: 7.0, tradeInTaxCredit: true, avgFees: 250 },
  IA: { code: "IA", name: "Iowa", taxRate: 5.0, tradeInTaxCredit: true, avgFees: 280 },
  KS: { code: "KS", name: "Kansas", taxRate: 6.5, tradeInTaxCredit: true, avgFees: 300 },
  KY: { code: "KY", name: "Kentucky", taxRate: 6.0, tradeInTaxCredit: false, avgFees: 220 },
  LA: { code: "LA", name: "Louisiana", taxRate: 4.45, tradeInTaxCredit: true, avgFees: 350 },
  ME: { code: "ME", name: "Maine", taxRate: 5.5, tradeInTaxCredit: true, avgFees: 200 },
  MD: { code: "MD", name: "Maryland", taxRate: 6.0, tradeInTaxCredit: false, avgFees: 400 },
  MA: { code: "MA", name: "Massachusetts", taxRate: 6.25, tradeInTaxCredit: true, avgFees: 300 },
  MI: { code: "MI", name: "Michigan", taxRate: 6.0, tradeInTaxCredit: false, avgFees: 320 },
  MN: { code: "MN", name: "Minnesota", taxRate: 6.875, tradeInTaxCredit: true, avgFees: 380 },
  MS: { code: "MS", name: "Mississippi", taxRate: 5.0, tradeInTaxCredit: true, avgFees: 250 },
  MO: { code: "MO", name: "Missouri", taxRate: 4.225, tradeInTaxCredit: true, avgFees: 220 },
  MT: { code: "MT", name: "Montana", taxRate: 0.0, tradeInTaxCredit: false, avgFees: 400 },
  NE: { code: "NE", name: "Nebraska", taxRate: 5.5, tradeInTaxCredit: true, avgFees: 250 },
  NV: { code: "NV", name: "Nevada", taxRate: 8.25, tradeInTaxCredit: true, avgFees: 450 },
  NH: { code: "NH", name: "New Hampshire", taxRate: 0.0, tradeInTaxCredit: true, avgFees: 200 },
  NJ: { code: "NJ", name: "New Jersey", taxRate: 6.625, tradeInTaxCredit: true, avgFees: 350 },
  NM: { code: "NM", name: "New Mexico", taxRate: 4.0, tradeInTaxCredit: true, avgFees: 200 },
  NY: { code: "NY", name: "New York", taxRate: 4.0, tradeInTaxCredit: true, avgFees: 400 },
  NC: { code: "NC", name: "North Carolina", taxRate: 3.0, tradeInTaxCredit: true, avgFees: 280 },
  ND: { code: "ND", name: "North Dakota", taxRate: 5.0, tradeInTaxCredit: true, avgFees: 200 },
  OH: { code: "OH", name: "Ohio", taxRate: 5.75, tradeInTaxCredit: true, avgFees: 300 },
  OK: { code: "OK", name: "Oklahoma", taxRate: 4.5, tradeInTaxCredit: true, avgFees: 250 },
  OR: { code: "OR", name: "Oregon", taxRate: 0.5, tradeInTaxCredit: false, avgFees: 350 },
  PA: { code: "PA", name: "Pennsylvania", taxRate: 6.0, tradeInTaxCredit: true, avgFees: 300 },
  RI: { code: "RI", name: "Rhode Island", taxRate: 7.0, tradeInTaxCredit: true, avgFees: 250 },
  SC: { code: "SC", name: "South Carolina", taxRate: 5.0, tradeInTaxCredit: true, avgFees: 500 },
  SD: { code: "SD", name: "South Dakota", taxRate: 4.5, tradeInTaxCredit: true, avgFees: 200 },
  TN: { code: "TN", name: "Tennessee", taxRate: 7.0, tradeInTaxCredit: true, avgFees: 350 },
  TX: { code: "TX", name: "Texas", taxRate: 6.25, tradeInTaxCredit: true, avgFees: 400 },
  UT: { code: "UT", name: "Utah", taxRate: 6.85, tradeInTaxCredit: true, avgFees: 350 },
  VT: { code: "VT", name: "Vermont", taxRate: 6.0, tradeInTaxCredit: true, avgFees: 220 },
  VA: { code: "VA", name: "Virginia", taxRate: 4.15, tradeInTaxCredit: false, avgFees: 300 },
  WA: { code: "WA", name: "Washington", taxRate: 6.5, tradeInTaxCredit: true, avgFees: 450 },
  WV: { code: "WV", name: "West Virginia", taxRate: 6.0, tradeInTaxCredit: true, avgFees: 200 },
  WI: { code: "WI", name: "Wisconsin", taxRate: 5.0, tradeInTaxCredit: true, avgFees: 300 },
  WY: { code: "WY", name: "Wyoming", taxRate: 4.0, tradeInTaxCredit: true, avgFees: 200 },
  DC: { code: "DC", name: "District of Columbia", taxRate: 6.0, tradeInTaxCredit: false, avgFees: 350 },
};

export const DEFAULT_STATE_CODE = "NC";
