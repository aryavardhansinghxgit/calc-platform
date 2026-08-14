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
    tipExpected: "Mandatory Custom",
    etiquetteNotes: "15%–20% is expected in sit-down restaurants due to tipped minimum wage laws.",
  },
  {
    code: "CA",
    name: "Canada",
    currencySymbol: "$",
    defaultTipPct: 15,
    tipExpected: "Mandatory Custom",
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
    tipExpected: "Offensive / Unusual",
    etiquetteNotes: "Tipping is not part of Japanese culture and can cause confusion or offense. Good service is standard.",
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
  const safePartySize = Math.max(1, partySize);

  const country = COUNTRY_TIPPING_DATABASE.find((c) => c.code === countryCode) || COUNTRY_TIPPING_DATABASE[0];

  const taxAmount = safeSubtotal * (safeTaxRate / 100);

  // Tip calculation base
  const tipBase = taxMode === "pre-tax" ? safeSubtotal : safeSubtotal + taxAmount;
  const rawTipAmount = tipBase * (safeTipPct / 100);
  const rawTotalAmount = safeSubtotal + taxAmount + rawTipAmount;

  let tipAmount = rawTipAmount;
  let totalAmount = rawTotalAmount;
  let roundingAdjustment = 0;

  if (roundingMode === "tip") {
    tipAmount = Math.ceil(rawTipAmount);
    totalAmount = safeSubtotal + taxAmount + tipAmount;
    roundingAdjustment = tipAmount - rawTipAmount;
  } else if (roundingMode === "total") {
    totalAmount = Math.ceil(rawTotalAmount);
    tipAmount = Math.max(0, totalAmount - (safeSubtotal + taxAmount));
    roundingAdjustment = totalAmount - rawTotalAmount;
  } else if (roundingMode === "person") {
    const rawPerPerson = rawTotalAmount / safePartySize;
    const roundedPerPerson = Math.ceil(rawPerPerson);
    totalAmount = roundedPerPerson * safePartySize;
    tipAmount = Math.max(0, totalAmount - (safeSubtotal + taxAmount));
    roundingAdjustment = totalAmount - rawTotalAmount;
  }

  const tipPerPerson = tipAmount / safePartySize;
  const totalPerPerson = totalAmount / safePartySize;

  return {
    subtotal: parseFloat(safeSubtotal.toFixed(2)),
    taxAmount: parseFloat(taxAmount.toFixed(2)),
    taxRatePct: safeTaxRate,
    tipPct: safeTipPct,
    rawTipAmount: parseFloat(rawTipAmount.toFixed(2)),
    tipAmount: parseFloat(tipAmount.toFixed(2)),
    rawTotalAmount: parseFloat(rawTotalAmount.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    partySize: safePartySize,
    tipPerPerson: parseFloat(tipPerPerson.toFixed(2)),
    totalPerPerson: parseFloat(totalPerPerson.toFixed(2)),
    roundingAdjustment: parseFloat(roundingAdjustment.toFixed(2)),
    taxMode,
    roundingMode,
    country,
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

  // Calculate individual subtotals
  const dinerSubtotals = activeDiners.map((diner) => {
    const sum = diner.items.reduce((acc, item) => acc + (Number(item.price) || 0), 0);
    return sum;
  });

  const totalDinerSubtotal = dinerSubtotals.reduce((a, b) => a + b, 0);
  const sharedPerPerson = sharedAppetizersTotal / activeDiners.length;

  const totalSubtotal = totalDinerSubtotal + sharedAppetizersTotal;

  const overall = calculateTip(totalSubtotal, taxRatePct, tipPct, activeDiners.length, taxMode, "none");

  // Proportional Tax and Tip distribution
  const dinerResults: ItemizedDinerResult[] = activeDiners.map((diner, index) => {
    const rawSub = dinerSubtotals[index];
    const subWithShared = rawSub + sharedPerPerson;
    const proportion = totalSubtotal > 0 ? subWithShared / totalSubtotal : 1 / activeDiners.length;

    const dinerTax = overall.taxAmount * proportion;
    const dinerTip = overall.tipAmount * proportion;
    const dinerTotal = subWithShared + dinerTax + dinerTip;

    return {
      dinerId: diner.id,
      name: diner.name || `Guest ${index + 1}`,
      subtotal: parseFloat(rawSub.toFixed(2)),
      sharedAppetizerShare: parseFloat(sharedPerPerson.toFixed(2)),
      taxShare: parseFloat(dinerTax.toFixed(2)),
      tipShare: parseFloat(dinerTip.toFixed(2)),
      total: parseFloat(dinerTotal.toFixed(2)),
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
