import {
  TaxMode,
  RoundingMode,
  CountryTipInfo,
  ItemizedDiner,
  ItemizedDinerResult,
  TipCalculationResult,
} from "./types";

export const COUNTRY_TIPPING_DATABASE: CountryTipInfo[] = [
  {
    code: "US",
    name: "United States",
    currencySymbol: "$",
    defaultTipPct: 18,
    tipExpected: "Customary (15%–20%)",
    etiquetteNotes: "15%–20% is customary for table service in the United States. Applicable minimum wage and tip-credit provisions depend on federal and state regulations.",
  },
  {
    code: "CA",
    name: "Canada",
    currencySymbol: "$",
    defaultTipPct: 15,
    tipExpected: "Customary (15%–18%)",
    etiquetteNotes: "15%–18% is standard for table service and bartenders.",
  },
  {
    code: "GB",
    name: "United Kingdom",
    currencySymbol: "£",
    defaultTipPct: 12.5,
    tipExpected: "Optional / Expected",
    etiquetteNotes: "10%–12.5% is customary. Check if an optional service charge is already added.",
  },
  {
    code: "FR",
    name: "France",
    currencySymbol: "€",
    defaultTipPct: 0,
    tipExpected: "Service Compris",
    etiquetteNotes: "15% service charge is included by law. Leave €1–€2 small change (pourboire) for great service.",
  },
  {
    code: "DE",
    name: "Germany",
    currencySymbol: "€",
    defaultTipPct: 10,
    tipExpected: "Customary",
    etiquetteNotes: "Round up to the nearest euro or add 5%–10% when paying the server directly (Trinkgeld).",
  },
  {
    code: "IT",
    name: "Italy",
    currencySymbol: "€",
    defaultTipPct: 10,
    tipExpected: "Optional",
    etiquetteNotes: "Coperto (cover charge) is common. Leave €1–€2 per diner or 10% for fine dining.",
  },
  {
    code: "ES",
    name: "Spain",
    currencySymbol: "€",
    defaultTipPct: 5,
    tipExpected: "Optional",
    etiquetteNotes: "Not strictly required. Round up small change or leave 5%–10% for good service.",
  },
  {
    code: "JP",
    name: "Japan",
    currencySymbol: "¥",
    defaultTipPct: 0,
    tipExpected: "Service Included",
    etiquetteNotes: "Standard hospitality (Omotenashi) is included in the bill. Offering extra cash directly is not customary and may cause confusion.",
  },
  {
    code: "KR",
    name: "South Korea",
    currencySymbol: "₩",
    defaultTipPct: 0,
    tipExpected: "Not Expected",
    etiquetteNotes: "Tipping is not customary in restaurants, taxis, or daily services.",
  },
  {
    code: "CN",
    name: "China",
    currencySymbol: "¥",
    defaultTipPct: 0,
    tipExpected: "Not Expected",
    etiquetteNotes: "Tipping is generally not expected or practiced in mainland China, except for tour guides.",
  },
  {
    code: "AU",
    name: "Australia",
    currencySymbol: "$",
    defaultTipPct: 0,
    tipExpected: "Not Expected",
    etiquetteNotes: "Fair minimum wages mean tips are not expected. 10% is appreciated for exceptional fine dining.",
  },
  {
    code: "NZ",
    name: "New Zealand",
    currencySymbol: "$",
    defaultTipPct: 0,
    tipExpected: "Not Expected",
    etiquetteNotes: "Tipping is not part of daily culture. Optional for outstanding service.",
  },
  {
    code: "IN",
    name: "India",
    currencySymbol: "₹",
    defaultTipPct: 10,
    tipExpected: "Customary",
    etiquetteNotes: "10% is standard. Check receipt to see if a 'Service Charge' is already included.",
  },
  {
    code: "AE",
    name: "United Arab Emirates",
    currencySymbol: "AED ",
    defaultTipPct: 10,
    tipExpected: "Customary",
    etiquetteNotes: "10% service fee is often added to bills; handing a small cash tip directly to your server is appreciated.",
  },
  {
    code: "MX",
    name: "Mexico",
    currencySymbol: "$",
    defaultTipPct: 15,
    tipExpected: "Customary",
    etiquetteNotes: "10%–15% propina is expected in restaurants and casual eateries.",
  },
  {
    code: "BR",
    name: "Brazil",
    currencySymbol: "R$ ",
    defaultTipPct: 10,
    tipExpected: "Service Charge",
    etiquetteNotes: "A 10% service fee (gorjeta) is usually included in the bill total.",
  },
];

/**
 * Distributes total integer cents proportionally across weights using the
 * Largest Remainder Method (Hare-Niemeyer Algorithm), guaranteeing exact cent reconciliation.
 */
function allocateCentsProportionally(totalCents: number, weights: number[]): number[] {
  const sumWeights = weights.reduce((a, b) => a + b, 0);
  if (totalCents === 0 || sumWeights === 0) {
    return weights.map(() => 0);
  }

  const exactCents = weights.map((w) => (w / sumWeights) * totalCents);
  const floorCents = exactCents.map((c) => Math.floor(c));
  const remainders = exactCents.map((c, idx) => ({
    fraction: c - Math.floor(c),
    index: idx,
  }));

  let unallocatedCents = totalCents - floorCents.reduce((a, b) => a + b, 0);

  // Stable sort by fractional remainder descending; tie-break by original index
  remainders.sort((a, b) => {
    const diff = b.fraction - a.fraction;
    if (Math.abs(diff) > 1e-9) return diff;
    return a.index - b.index;
  });

  const allocated = [...floorCents];
  for (let i = 0; i < unallocatedCents; i++) {
    const targetIdx = remainders[i % remainders.length].index;
    allocated[targetIdx] += 1;
  }

  return allocated;
}

export function calculateTip(
  subtotal: number,
  taxRatePct: number = 0,
  tipPct: number = 18,
  partySize: number = 1,
  taxMode: TaxMode = "pre-tax",
  roundingMode: RoundingMode = "none",
  countryCode: string = "US"
): TipCalculationResult {
  const safeSubtotal = Math.max(0, subtotal);
  const safeTaxRate = Math.max(0, taxRatePct);
  const safeTipPct = Math.max(0, tipPct);
  const safePartySize = Math.max(1, Math.round(partySize));

  const country = COUNTRY_TIPPING_DATABASE.find((c) => c.code === countryCode) || COUNTRY_TIPPING_DATABASE[0];

  const subtotalCents = Math.round(safeSubtotal * 100);
  const taxCents = Math.round(subtotalCents * (safeTaxRate / 100));

  // Tip calculation base in cents
  const tipBaseCents = taxMode === "pre-tax" ? subtotalCents : subtotalCents + taxCents;
  const rawTipCents = Math.round(tipBaseCents * (safeTipPct / 100));
  const rawTotalCents = subtotalCents + taxCents + rawTipCents;

  let tipCents = rawTipCents;
  let totalCents = rawTotalCents;
  let roundingAdjustmentCents = 0;

  if (roundingMode === "tip") {
    tipCents = Math.ceil(rawTipCents / 100) * 100;
    totalCents = subtotalCents + taxCents + tipCents;
    roundingAdjustmentCents = tipCents - rawTipCents;
  } else if (roundingMode === "total") {
    totalCents = Math.ceil(rawTotalCents / 100) * 100;
    tipCents = Math.max(0, totalCents - (subtotalCents + taxCents));
    roundingAdjustmentCents = totalCents - rawTotalCents;
  } else if (roundingMode === "person") {
    const rawPerPersonCents = rawTotalCents / safePartySize;
    const roundedPerPersonCents = Math.ceil(rawPerPersonCents / 100) * 100;
    totalCents = roundedPerPersonCents * safePartySize;
    tipCents = Math.max(0, totalCents - (subtotalCents + taxCents));
    roundingAdjustmentCents = totalCents - rawTotalCents;
  }

  const baseShareCents = Math.floor(totalCents / safePartySize);
  const remainderCents = totalCents % safePartySize;

  // Deterministic Fair-Cent Allocation: first remainderCents diners receive +1 cent
  const allocatedShares = Array.from({ length: safePartySize }, (_, i) => {
    const cents = baseShareCents + (i < remainderCents ? 1 : 0);
    return cents / 100;
  });

  const tipAmount = tipCents / 100;
  const totalAmount = totalCents / 100;
  const taxAmount = taxCents / 100;
  const tipPerPerson = tipAmount / safePartySize;
  const totalPerPerson = totalAmount / safePartySize;

  return {
    subtotal: subtotalCents / 100,
    taxAmount: taxAmount,
    taxRatePct: safeTaxRate,
    tipPct: safeTipPct,
    rawTipAmount: rawTipCents / 100,
    tipAmount: tipAmount,
    rawTotalAmount: rawTotalCents / 100,
    totalAmount: totalAmount,
    partySize: safePartySize,
    tipPerPerson: parseFloat(tipPerPerson.toFixed(2)),
    totalPerPerson: parseFloat(totalPerPerson.toFixed(2)),
    roundingAdjustment: roundingAdjustmentCents / 100,
    taxMode,
    roundingMode,
    country,
    allocatedShares,
    isUnequalSplit: remainderCents > 0,
  };
}

export function calculateItemizedTip(
  diners: ItemizedDiner[],
  sharedAppetizersTotal: number = 0,
  taxRatePct: number = 0,
  tipPct: number = 18,
  taxMode: TaxMode = "pre-tax"
): { diners: ItemizedDinerResult[]; overall: TipCalculationResult } {
  const activeDiners = diners.length > 0 ? diners : [{ id: "1", name: "Guest 1", items: [] }];

  // 1. Calculate diner subtotals in integer cents
  const dinerSubtotalCents = activeDiners.map((diner) => {
    const sumDollars = diner.items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
    return Math.round(Math.max(0, sumDollars) * 100);
  });

  const totalDinerSubtotalCents = dinerSubtotalCents.reduce((a, b) => a + b, 0);
  const sharedCentsTotal = Math.round(Math.max(0, sharedAppetizersTotal) * 100);

  // 2. Allocate shared items evenly with deterministic remainder cents
  const baseSharedPerPersonCents = Math.floor(sharedCentsTotal / activeDiners.length);
  const sharedRemainderCents = sharedCentsTotal % activeDiners.length;
  const sharedPerDinerCents = activeDiners.map(
    (_, idx) => baseSharedPerPersonCents + (idx < sharedRemainderCents ? 1 : 0)
  );

  // 3. Combined subtotal in cents
  const totalSubtotalCents = totalDinerSubtotalCents + sharedCentsTotal;
  const totalSubtotal = totalSubtotalCents / 100;

  // 4. Calculate overall totals using integer cents engine
  const overall = calculateTip(totalSubtotal, taxRatePct, tipPct, activeDiners.length, taxMode, "none");
  const overallTaxCents = Math.round(overall.taxAmount * 100);
  const overallTipCents = Math.round(overall.tipAmount * 100);

  // Diner base for proportional distribution (subtotal + allocated shared cents)
  const dinerBaseCents = dinerSubtotalCents.map((sub, idx) => sub + sharedPerDinerCents[idx]);

  // 5. Allocate Tax and Tip using Largest Remainder Method
  const allocatedTaxCents = allocateCentsProportionally(overallTaxCents, dinerBaseCents);
  const allocatedTipCents = allocateCentsProportionally(overallTipCents, dinerBaseCents);

  // 6. Assemble diner results with exact cents
  const dinerResults: ItemizedDinerResult[] = activeDiners.map((diner, index) => {
    const rawSub = dinerSubtotalCents[index] / 100;
    const sharedShare = sharedPerDinerCents[index] / 100;
    const taxShare = allocatedTaxCents[index] / 100;
    const tipShare = allocatedTipCents[index] / 100;
    const total = (dinerBaseCents[index] + allocatedTaxCents[index] + allocatedTipCents[index]) / 100;

    return {
      dinerId: diner.id,
      name: diner.name || `Guest ${index + 1}`,
      subtotal: rawSub,
      sharedAppetizerShare: sharedShare,
      taxShare: taxShare,
      tipShare: tipShare,
      total: total,
    };
  });

  return { diners: dinerResults, overall };
}



export function calculateTipFromInputs(inputs: Record<string, any>): TipCalculationResult {
  const subtotal = Number(inputs.billAmount || inputs.subtotal) || 50;
  const taxRate = Number(inputs.taxRate || inputs.taxRatePct) || 0;
  const tipPct = Number(inputs.tipPercentage || inputs.tipPct) || 18;
  const partySize = Number(inputs.numberOfPeople || inputs.partySize) || 1;
  const taxMode = (inputs.taxMode as TaxMode) || "pre-tax";
  const roundingMode = (inputs.roundingMode as RoundingMode) || "none";
  const countryCode = String(inputs.country || "US");

  return calculateTip(subtotal, taxRate, tipPct, partySize, taxMode, roundingMode, countryCode);
}
