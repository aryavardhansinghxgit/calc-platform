/**
 * Precision Value-Added Tax (VAT) Calculation Engine
 * Supports Universal 4-Way Bi-Directional Solver (Net, Gross, Tax, Rate),
 * Multi-Stage Supply Chain Value Addition, Global Country VAT Presets, and Currency Support.
 */

export interface VatCountryPreset {
  country: string;
  flag: string;
  standardRate: number;
  reducedRate?: number;
  currencySymbol: string;
  code: string;
}

export interface VatSolveInput {
  vatRate?: number;
  netPrice?: number;
  grossPrice?: number;
  taxAmount?: number;
  knownFields?: ('rate' | 'net' | 'gross' | 'tax')[];
  currencySymbol?: string;
}

export interface VatSolveResult {
  vatRate: number;
  netPrice: number;
  taxAmount: number;
  grossPrice: number;
  currencySymbol: string;
  solvedField1: string;
  solvedField2: string;
}

export interface SupplyChainStage {
  stageName: string;
  purchasePrice: number;
  valueAdded: number;
  saleNetPrice: number;
  outputVat: number;
  inputVatCredit: number;
  netVatRemitted: number;
}

export interface SupplyChainResult {
  vatRate: number;
  stages: SupplyChainStage[];
  totalValueAdded: number;
  totalVatCollectedByGovt: number;
}

export const GLOBAL_VAT_PRESETS: VatCountryPreset[] = [
  { country: "United Kingdom", flag: "🇬🇧", standardRate: 20, reducedRate: 5, currencySymbol: "£", code: "UK" },
  { country: "Germany", flag: "🇩🇪", standardRate: 19, reducedRate: 7, currencySymbol: "€", code: "DE" },
  { country: "France", flag: "🇫🇷", standardRate: 20, reducedRate: 10, currencySymbol: "€", code: "FR" },
  { country: "Italy", flag: "🇮🇹", standardRate: 22, reducedRate: 10, currencySymbol: "€", code: "IT" },
  { country: "Spain", flag: "🇪🇸", standardRate: 21, reducedRate: 10, currencySymbol: "€", code: "ES" },
  { country: "Netherlands", flag: "🇳🇱", standardRate: 21, reducedRate: 9, currencySymbol: "€", code: "NL" },
  { country: "Australia (GST)", flag: "🇦🇺", standardRate: 10, currencySymbol: "A$", code: "AU" },
  { country: "Canada (GST)", flag: "🇨🇦", standardRate: 5, currencySymbol: "C$", code: "CA" },
  { country: "UAE (VAT)", flag: "🇦🇪", standardRate: 5, currencySymbol: "AED", code: "AE" },
  { country: "Saudi Arabia", flag: "🇸🇦", standardRate: 15, currencySymbol: "SAR", code: "SA" },
  { country: "Japan (Consumption)", flag: "🇯🇵", standardRate: 10, reducedRate: 8, currencySymbol: "¥", code: "JP" },
  { country: "Singapore (GST)", flag: "🇸🇬", standardRate: 9, currencySymbol: "S$", code: "SG" },
  { country: "India (GST Standard)", flag: "🇮🇳", standardRate: 18, reducedRate: 12, currencySymbol: "₹", code: "IN" },
  { country: "United States (Sales Tax Avg)", flag: "🇺🇸", standardRate: 7, currencySymbol: "$", code: "US" },
];

/**
 * Universal 4-Way Bi-Directional VAT Solver
 * Solves for missing 2 parameters given ANY 2 inputs among (Rate, Net, Gross, Tax)
 */
export function solveVat(input: VatSolveInput): VatSolveResult {
  const currencySymbol = input.currencySymbol || "£";

  let rate = Math.max(0, Number(input.vatRate) || 0);
  let net = Math.max(0, Number(input.netPrice) || 0);
  let gross = Math.max(0, Number(input.grossPrice) || 0);
  let tax = Math.max(0, Number(input.taxAmount) || 0);

  let solved1 = "";
  let solved2 = "";

  // Priority Solver Logic based on non-zero inputs
  if (rate > 0 && net > 0) {
    // 1. Given Rate & Net -> Solve Tax & Gross
    tax = net * (rate / 100);
    gross = net + tax;
    solved1 = "Tax Amount";
    solved2 = "Gross Price";
  } else if (rate > 0 && gross > 0) {
    // 2. Given Rate & Gross -> Solve Net & Tax
    net = gross / (1 + rate / 100);
    tax = gross - net;
    solved1 = "Net Price";
    solved2 = "Tax Amount";
  } else if (rate > 0 && tax > 0) {
    // 3. Given Rate & Tax -> Solve Net & Gross
    net = tax / (rate / 100);
    gross = net + tax;
    solved1 = "Net Price";
    solved2 = "Gross Price";
  } else if (net > 0 && gross > 0 && gross >= net) {
    // 4. Given Net & Gross -> Solve Tax & Rate
    tax = gross - net;
    rate = net > 0 ? (tax / net) * 100 : 0;
    solved1 = "Tax Amount";
    solved2 = "VAT Rate %";
  } else if (net > 0 && tax > 0) {
    // 5. Given Net & Tax -> Solve Gross & Rate
    gross = net + tax;
    rate = (tax / net) * 100;
    solved1 = "Gross Price";
    solved2 = "VAT Rate %";
  } else if (gross > 0 && tax > 0 && gross >= tax) {
    // 6. Given Gross & Tax -> Solve Net & Rate
    net = gross - tax;
    rate = net > 0 ? (tax / net) * 100 : 0;
    solved1 = "Net Price";
    solved2 = "VAT Rate %";
  } else {
    // Fallback default (Rate 20%, Net 100)
    rate = 20;
    net = 100;
    tax = 20;
    gross = 120;
    solved1 = "Tax Amount";
    solved2 = "Gross Price";
  }

  return {
    vatRate: Number(rate.toFixed(2)),
    netPrice: Number(net.toFixed(2)),
    taxAmount: Number(tax.toFixed(2)),
    grossPrice: Number(gross.toFixed(2)),
    currencySymbol,
    solvedField1: solved1,
    solvedField2: solved2,
  };
}

/**
 * Multi-Stage Supply Chain VAT Calculation (Producer -> Manufacturer -> Wholesaler -> Retailer)
 */
export function calculateSupplyChainVat(
  vatRatePct: number,
  baseProducerCost: number = 10,
  manufacturerValueAdd: number = 15,
  wholesalerValueAdd: number = 15,
  retailerValueAdd: number = 20
): SupplyChainResult {
  const rate = Math.max(0, vatRatePct) / 100;

  // Stage 1: Producer / Farmer
  const s1Purchase = 0;
  const s1ValueAdd = baseProducerCost;
  const s1Net = s1ValueAdd;
  const s1OutputVat = s1Net * rate;
  const s1InputVat = 0;
  const s1NetRemitted = s1OutputVat - s1InputVat;

  // Stage 2: Manufacturer / Roaster
  const s2Purchase = s1Net;
  const s2ValueAdd = manufacturerValueAdd;
  const s2Net = s2Purchase + s2ValueAdd;
  const s2OutputVat = s2Net * rate;
  const s2InputVat = s1OutputVat;
  const s2NetRemitted = s2OutputVat - s2InputVat;

  // Stage 3: Wholesaler / Distributor
  const s3Purchase = s2Net;
  const s3ValueAdd = wholesalerValueAdd;
  const s3Net = s3Purchase + s3ValueAdd;
  const s3OutputVat = s3Net * rate;
  const s3InputVat = s2OutputVat;
  const s3NetRemitted = s3OutputVat - s3InputVat;

  // Stage 4: Retailer / Shop Owner
  const s4Purchase = s3Net;
  const s4ValueAdd = retailerValueAdd;
  const s4Net = s4Purchase + s4ValueAdd;
  const s4OutputVat = s4Net * rate;
  const s4InputVat = s3OutputVat;
  const s4NetRemitted = s4OutputVat - s4InputVat;

  const stages: SupplyChainStage[] = [
    {
      stageName: "1. Producer / Farmer",
      purchasePrice: Number(s1Purchase.toFixed(2)),
      valueAdded: Number(s1ValueAdd.toFixed(2)),
      saleNetPrice: Number(s1Net.toFixed(2)),
      outputVat: Number(s1OutputVat.toFixed(2)),
      inputVatCredit: Number(s1InputVat.toFixed(2)),
      netVatRemitted: Number(s1NetRemitted.toFixed(2)),
    },
    {
      stageName: "2. Manufacturer / Processor",
      purchasePrice: Number(s2Purchase.toFixed(2)),
      valueAdded: Number(s2ValueAdd.toFixed(2)),
      saleNetPrice: Number(s2Net.toFixed(2)),
      outputVat: Number(s2OutputVat.toFixed(2)),
      inputVatCredit: Number(s2InputVat.toFixed(2)),
      netVatRemitted: Number(s2NetRemitted.toFixed(2)),
    },
    {
      stageName: "3. Wholesaler / Distributor",
      purchasePrice: Number(s3Purchase.toFixed(2)),
      valueAdded: Number(s3ValueAdd.toFixed(2)),
      saleNetPrice: Number(s3Net.toFixed(2)),
      outputVat: Number(s3OutputVat.toFixed(2)),
      inputVatCredit: Number(s3InputVat.toFixed(2)),
      netVatRemitted: Number(s3NetRemitted.toFixed(2)),
    },
    {
      stageName: "4. Retailer / Store",
      purchasePrice: Number(s4Purchase.toFixed(2)),
      valueAdded: Number(s4ValueAdd.toFixed(2)),
      saleNetPrice: Number(s4Net.toFixed(2)),
      outputVat: Number(s4OutputVat.toFixed(2)),
      inputVatCredit: Number(s4InputVat.toFixed(2)),
      netVatRemitted: Number(s4NetRemitted.toFixed(2)),
    },
  ];

  const totalValueAdded = s1ValueAdd + s2ValueAdd + s3ValueAdd + s4ValueAdd;
  const totalVatCollectedByGovt = s1NetRemitted + s2NetRemitted + s3NetRemitted + s4NetRemitted;

  return {
    vatRate: vatRatePct,
    stages,
    totalValueAdded: Number(totalValueAdded.toFixed(2)),
    totalVatCollectedByGovt: Number(totalVatCollectedByGovt.toFixed(2)),
  };
}
