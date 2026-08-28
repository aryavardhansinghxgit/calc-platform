/**
 * Precision Value-Added Tax (VAT) Calculation Engine
 * Supports Universal 4-Way Bi-Directional Solver (Net, Gross, Tax, Rate),
 * Multi-Stage Supply Chain Value Addition, Global Country VAT Presets, and Currency Support.
 */

export interface VatCountryPreset {
  country: string;
  flag: string;
  taxType: string; // 'VAT' | 'GST' | 'Sales Tax' | 'Consumption Tax'
  standardRate: number;
  reducedRate?: number;
  currencySymbol: string;
  code: string;
  notes?: string;
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
  { country: "United Kingdom", flag: "🇬🇧", taxType: "VAT", standardRate: 20, reducedRate: 5, currencySymbol: "£", code: "UK", notes: "Standard 20%, Reduced 5% (domestic energy, child car seats)" },
  { country: "Germany", flag: "🇩🇪", taxType: "VAT (MwSt)", standardRate: 19, reducedRate: 7, currencySymbol: "€", code: "DE", notes: "Standard 19%, Reduced 7% (foodstuffs, books, passenger transport)" },
  { country: "France", flag: "🇫🇷", taxType: "VAT (TVA)", standardRate: 20, reducedRate: 10, currencySymbol: "€", code: "FR", notes: "Standard 20%, Reduced 10% & 5.5% (food, books, energy)" },
  { country: "Italy", flag: "🇮🇹", taxType: "VAT (IVA)", standardRate: 22, reducedRate: 10, currencySymbol: "€", code: "IT", notes: "Standard 22%, Reduced 10% & 5% (tourism, food, medicine)" },
  { country: "Spain", flag: "🇪🇸", taxType: "VAT (IVA)", standardRate: 21, reducedRate: 10, currencySymbol: "€", code: "ES", notes: "Standard 21%, Reduced 10% & 4% (basic food, books, pharma)" },
  { country: "Netherlands", flag: "🇳🇱", taxType: "VAT (Btw)", standardRate: 21, reducedRate: 9, currencySymbol: "€", code: "NL", notes: "Standard 21%, Reduced 9% (food, water, medicines, books)" },
  { country: "Australia", flag: "🇦🇺", taxType: "GST", standardRate: 10, currencySymbol: "A$", code: "AU", notes: "Standard 10% GST; basic food, healthcare, and education are GST-free" },
  { country: "Canada", flag: "🇨🇦", taxType: "GST / HST", standardRate: 5, currencySymbol: "C$", code: "CA", notes: "Federal GST 5%; combined HST reaches 13%–15% in participating provinces" },
  { country: "UAE", flag: "🇦🇪", taxType: "VAT", standardRate: 5, currencySymbol: "AED", code: "AE", notes: "Standard 5% VAT across GCC member framework" },
  { country: "Saudi Arabia", flag: "🇸🇦", taxType: "VAT", standardRate: 15, currencySymbol: "SAR", code: "SA", notes: "Standard 15% VAT enacted by ZATCA" },
  { country: "Japan", flag: "🇯🇵", taxType: "Consumption Tax", standardRate: 10, reducedRate: 8, currencySymbol: "¥", code: "JP", notes: "Standard 10%, Reduced 8% (food and beverages for takeaway)" },
  { country: "Singapore", flag: "🇸🇬", taxType: "GST", standardRate: 9, currencySymbol: "S$", code: "SG", notes: "Standard 9% GST effective from 2024" },
  { country: "India", flag: "🇮🇳", taxType: "GST (Dual)", standardRate: 18, reducedRate: 12, currencySymbol: "₹", code: "IN", notes: "Multi-tier slabs (5%, 12%, 18%, 28%, 40%); 18% general rate" },
  { country: "United States", flag: "🇺🇸", taxType: "Sales Tax (State/Local)", standardRate: 7, currencySymbol: "$", code: "US", notes: "No federal VAT; state and local retail sales taxes average ~7% (range 4%–9.5%)" },
];

/**
 * Universal 4-Way Bi-Directional VAT Solver
 * Solves for missing 2 parameters given ANY 2 inputs among (Rate, Net, Gross, Tax)
 */
export function solveVat(input: VatSolveInput): VatSolveResult {
  const currencySymbol = input.currencySymbol || "£";

  const hasRate = input.vatRate !== undefined && !isNaN(Number(input.vatRate)) && String(input.vatRate).trim() !== "";
  const hasNet = input.netPrice !== undefined && !isNaN(Number(input.netPrice)) && String(input.netPrice).trim() !== "" && Number(input.netPrice) > 0;
  const hasGross = input.grossPrice !== undefined && !isNaN(Number(input.grossPrice)) && String(input.grossPrice).trim() !== "" && Number(input.grossPrice) > 0;
  const hasTax = input.taxAmount !== undefined && !isNaN(Number(input.taxAmount)) && String(input.taxAmount).trim() !== "" && Number(input.taxAmount) >= 0;

  const rawRate = hasRate ? Math.max(0, Number(input.vatRate)) : 0;
  const rawNet = hasNet ? Math.max(0, Number(input.netPrice)) : 0;
  const rawGross = hasGross ? Math.max(0, Number(input.grossPrice)) : 0;
  const rawTax = hasTax ? Math.max(0, Number(input.taxAmount)) : 0;

  let rate = rawRate;
  let net = rawNet;
  let gross = rawGross;
  let tax = rawTax;

  let solved1 = "";
  let solved2 = "";

  // Priority Solver Logic
  if (hasRate && hasNet) {
    // 1. Given Rate & Net -> Solve Tax & Gross
    tax = net * (rate / 100);
    gross = net + tax;
    solved1 = "Tax Amount";
    solved2 = "Gross Price";
  } else if (hasRate && hasGross) {
    // 2. Given Rate & Gross -> Solve Net & Tax
    net = gross / (1 + rate / 100);
    tax = gross - net;
    solved1 = "Net Price";
    solved2 = "Tax Amount";
  } else if (hasRate && hasTax && rawTax > 0) {
    // 3. Given Rate & Tax -> Solve Net & Gross
    if (rate > 0) {
      net = tax / (rate / 100);
      gross = net + tax;
    } else {
      net = 0;
      gross = 0;
    }
    solved1 = "Net Price";
    solved2 = "Gross Price";
  } else if (hasNet && hasGross && rawGross >= rawNet) {
    // 4. Given Net & Gross -> Solve Tax & Rate
    tax = gross - net;
    rate = net > 0 ? (tax / net) * 100 : 0;
    solved1 = "Tax Amount";
    solved2 = "VAT Rate %";
  } else if (hasNet && hasTax) {
    // 5. Given Net & Tax -> Solve Gross & Rate
    gross = net + tax;
    rate = net > 0 ? (tax / net) * 100 : 0;
    solved1 = "Gross Price";
    solved2 = "VAT Rate %";
  } else if (hasGross && hasTax && rawGross >= rawTax) {
    // 6. Given Gross & Tax -> Solve Net & Rate
    net = gross - tax;
    rate = net > 0 ? (tax / net) * 100 : 0;
    solved1 = "Net Price";
    solved2 = "VAT Rate %";
  } else {
    // Default fallback
    rate = hasRate ? rawRate : 20;
    net = 1200;
    tax = net * (rate / 100);
    gross = net + tax;
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

  const s1Val = Math.max(0, Number(baseProducerCost) || 0);
  const s2Val = Math.max(0, Number(manufacturerValueAdd) || 0);
  const s3Val = Math.max(0, Number(wholesalerValueAdd) || 0);
  const s4Val = Math.max(0, Number(retailerValueAdd) || 0);

  // Stage 1: Producer / Farmer
  const s1Purchase = 0;
  const s1Net = s1Val;
  const s1OutputVat = s1Net * rate;
  const s1InputVat = 0;
  const s1NetRemitted = s1OutputVat - s1InputVat;

  // Stage 2: Manufacturer / Processor
  const s2Purchase = s1Net;
  const s2Net = s2Purchase + s2Val;
  const s2OutputVat = s2Net * rate;
  const s2InputVat = s1OutputVat;
  const s2NetRemitted = s2OutputVat - s2InputVat;

  // Stage 3: Wholesaler / Distributor
  const s3Purchase = s2Net;
  const s3Net = s3Purchase + s3Val;
  const s3OutputVat = s3Net * rate;
  const s3InputVat = s2OutputVat;
  const s3NetRemitted = s3OutputVat - s3InputVat;

  // Stage 4: Retailer / Store
  const s4Purchase = s3Net;
  const s4Net = s4Purchase + s4Val;
  const s4OutputVat = s4Net * rate;
  const s4InputVat = s3OutputVat;
  const s4NetRemitted = s4OutputVat - s4InputVat;

  const stages: SupplyChainStage[] = [
    {
      stageName: "1. Producer / Farmer",
      purchasePrice: Number(s1Purchase.toFixed(2)),
      valueAdded: Number(s1Val.toFixed(2)),
      saleNetPrice: Number(s1Net.toFixed(2)),
      outputVat: Number(s1OutputVat.toFixed(2)),
      inputVatCredit: Number(s1InputVat.toFixed(2)),
      netVatRemitted: Number(s1NetRemitted.toFixed(2)),
    },
    {
      stageName: "2. Manufacturer / Processor",
      purchasePrice: Number(s2Purchase.toFixed(2)),
      valueAdded: Number(s2Val.toFixed(2)),
      saleNetPrice: Number(s2Net.toFixed(2)),
      outputVat: Number(s2OutputVat.toFixed(2)),
      inputVatCredit: Number(s2InputVat.toFixed(2)),
      netVatRemitted: Number(s2NetRemitted.toFixed(2)),
    },
    {
      stageName: "3. Wholesaler / Distributor",
      purchasePrice: Number(s3Purchase.toFixed(2)),
      valueAdded: Number(s3Val.toFixed(2)),
      saleNetPrice: Number(s3Net.toFixed(2)),
      outputVat: Number(s3OutputVat.toFixed(2)),
      inputVatCredit: Number(s3InputVat.toFixed(2)),
      netVatRemitted: Number(s3NetRemitted.toFixed(2)),
    },
    {
      stageName: "4. Retailer / Store",
      purchasePrice: Number(s4Purchase.toFixed(2)),
      valueAdded: Number(s4Val.toFixed(2)),
      saleNetPrice: Number(s4Net.toFixed(2)),
      outputVat: Number(s4OutputVat.toFixed(2)),
      inputVatCredit: Number(s4InputVat.toFixed(2)),
      netVatRemitted: Number(s4NetRemitted.toFixed(2)),
    },
  ];

  const totalValueAdded = s1Val + s2Val + s3Val + s4Val;
  const totalVatCollectedByGovt = s1NetRemitted + s2NetRemitted + s3NetRemitted + s4NetRemitted;

  return {
    vatRate: vatRatePct,
    stages,
    totalValueAdded: Number(totalValueAdded.toFixed(2)),
    totalVatCollectedByGovt: Number(totalVatCollectedByGovt.toFixed(2)),
  };
}
