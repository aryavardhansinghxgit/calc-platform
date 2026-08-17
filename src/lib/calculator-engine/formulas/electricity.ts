/**
 * Pure Mathematical Calculation Engine for Electricity & Power Consumption Suite
 * Supports International Currencies (USD, INR, EUR, GBP, AUD, CAD, AED)
 * Dual Imperial/Metric power units (Watts, kW, BTU/hr, HP, Tons of Refrigeration)
 * Carbon Emission Intensity modeling by region
 */

export type PowerUnit = "watts" | "kilowatts" | "btu_hr" | "mechanical_hp" | "metric_hp" | "refrigeration_tons";
export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP" | "AUD" | "CAD" | "AED";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  defaultRatePerKwh: number;
  carbonIntensityKgPerKwh: number; // kg CO2e / kWh
  billingUnitName: string; // e.g. "kWh" or "Units" (India)
}

export const CURRENCY_CONFIGS: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: "USD",
    symbol: "$",
    name: "United States (USD $)",
    defaultRatePerKwh: 0.16,
    carbonIntensityKgPerKwh: 0.386,
    billingUnitName: "kWh",
  },
  INR: {
    code: "INR",
    symbol: "₹",
    name: "India (INR ₹)",
    defaultRatePerKwh: 8.0,
    carbonIntensityKgPerKwh: 0.710,
    billingUnitName: "Units (kWh)",
  },
  EUR: {
    code: "EUR",
    symbol: "€",
    name: "European Union (EUR €)",
    defaultRatePerKwh: 0.28,
    carbonIntensityKgPerKwh: 0.230,
    billingUnitName: "kWh",
  },
  GBP: {
    code: "GBP",
    symbol: "£",
    name: "United Kingdom (GBP £)",
    defaultRatePerKwh: 0.27,
    carbonIntensityKgPerKwh: 0.207,
    billingUnitName: "kWh",
  },
  AUD: {
    code: "AUD",
    symbol: "A$",
    name: "Australia (AUD A$)",
    defaultRatePerKwh: 0.32,
    carbonIntensityKgPerKwh: 0.530,
    billingUnitName: "kWh",
  },
  CAD: {
    code: "CAD",
    symbol: "C$",
    name: "Canada (CAD C$)",
    defaultRatePerKwh: 0.15,
    carbonIntensityKgPerKwh: 0.120,
    billingUnitName: "kWh",
  },
  AED: {
    code: "AED",
    symbol: "AED ",
    name: "United Arab Emirates (AED)",
    defaultRatePerKwh: 0.30,
    carbonIntensityKgPerKwh: 0.450,
    billingUnitName: "kWh",
  },
};

export interface AppliancePreset {
  id: string;
  name: string;
  category: "HVAC & Heating" | "Kitchen" | "Lighting" | "Entertainment & Computing" | "Laundry & Water" | "EV & Mobility";
  defaultWatts: number;
  defaultHoursPerDay: number;
  defaultDutyCyclePct: number;
}

export const APPLIANCE_PRESETS: AppliancePreset[] = [
  { id: "custom", name: "Custom Appliance", category: "Entertainment & Computing", defaultWatts: 500, defaultHoursPerDay: 4, defaultDutyCyclePct: 100 },
  { id: "central_ac", name: "Central Air Conditioner (3.5 kW)", category: "HVAC & Heating", defaultWatts: 3500, defaultHoursPerDay: 8, defaultDutyCyclePct: 70 },
  { id: "split_ac_1_5_ton", name: "Split AC 1.5 Ton (Inverter 1500W)", category: "HVAC & Heating", defaultWatts: 1500, defaultHoursPerDay: 8, defaultDutyCyclePct: 60 },
  { id: "space_heater", name: "Space Heater / Radiator (1500W)", category: "HVAC & Heating", defaultWatts: 1500, defaultHoursPerDay: 5, defaultDutyCyclePct: 80 },
  { id: "water_heater_geyser", name: "Electric Water Heater / Geyser (3000W)", category: "Laundry & Water", defaultWatts: 3000, defaultHoursPerDay: 2, defaultDutyCyclePct: 100 },
  { id: "refrigerator", name: "Refrigerator (Frost-Free 200W)", category: "Kitchen", defaultWatts: 200, defaultHoursPerDay: 24, defaultDutyCyclePct: 35 },
  { id: "ev_charger_l2", name: "EV Level 2 Home Charger (7.2 kW)", category: "EV & Mobility", defaultWatts: 7200, defaultHoursPerDay: 3, defaultDutyCyclePct: 100 },
  { id: "gaming_pc", name: "Gaming Desktop PC & Monitor (450W)", category: "Entertainment & Computing", defaultWatts: 450, defaultHoursPerDay: 5, defaultDutyCyclePct: 80 },
  { id: "laptop", name: "Laptop Computer (65W)", category: "Entertainment & Computing", defaultWatts: 65, defaultHoursPerDay: 8, defaultDutyCyclePct: 70 },
  { id: "smart_tv_55", name: "55\" 4K Smart Television (110W)", category: "Entertainment & Computing", defaultWatts: 110, defaultHoursPerDay: 5, defaultDutyCyclePct: 100 },
  { id: "clothes_dryer", name: "Clothes Dryer (Electric 3000W)", category: "Laundry & Water", defaultWatts: 3000, defaultHoursPerDay: 1, defaultDutyCyclePct: 100 },
  { id: "washing_machine", name: "Washing Machine (500W)", category: "Laundry & Water", defaultWatts: 500, defaultHoursPerDay: 1.5, defaultDutyCyclePct: 60 },
  { id: "microwave", name: "Microwave Oven (1200W)", category: "Kitchen", defaultWatts: 1200, defaultHoursPerDay: 0.5, defaultDutyCyclePct: 100 },
  { id: "induction_cooktop", name: "Induction Cooktop (2000W)", category: "Kitchen", defaultWatts: 2000, defaultHoursPerDay: 1.5, defaultDutyCyclePct: 75 },
  { id: "dishwasher", name: "Dishwasher with Heated Dry (1400W)", category: "Kitchen", defaultWatts: 1400, defaultHoursPerDay: 1.5, defaultDutyCyclePct: 80 },
  { id: "ceiling_fan", name: "Ceiling Fan (65W)", category: "HVAC & Heating", defaultWatts: 65, defaultHoursPerDay: 12, defaultDutyCyclePct: 100 },
  { id: "led_light_bulb", name: "LED Light Bulb (9W - 60W eq)", category: "Lighting", defaultWatts: 9, defaultHoursPerDay: 6, defaultDutyCyclePct: 100 },
  { id: "incandescent_bulb", name: "Incandescent Light Bulb (60W)", category: "Lighting", defaultWatts: 60, defaultHoursPerDay: 6, defaultDutyCyclePct: 100 },
];

export function convertPowerToWatts(val: number, unit: PowerUnit): number {
  switch (unit) {
    case "kilowatts": return val * 1000;
    case "btu_hr": return val * 0.293071; // 1 BTU/hr = 0.293071 W
    case "mechanical_hp": return val * 745.699872; // 1 hp (US/Imperial)
    case "metric_hp": return val * 735.49875; // 1 hp (Metric / PS)
    case "refrigeration_tons": return val * 3516.85284; // 1 Ton = 12,000 BTU/hr
    case "watts":
    default: return val;
  }
}

// ─── CARD 1: SINGLE APPLIANCE ESTIMATOR ─────────────────────────────────────

export interface SingleApplianceInput {
  powerValue: number;
  powerUnit: PowerUnit;
  dutyCyclePct: number; // 0 - 100%
  hoursPerDay: number;
  daysPerWeek: number; // 1 - 7
  monthsPerYear: number; // 1 - 12
  currency: CurrencyCode;
  ratePerKwh: number;
}

export interface SingleApplianceResult {
  effectiveWatts: number;
  effectiveKw: number;
  dailyKwh: number;
  monthlyKwh: number;
  annualKwh: number;

  hourlyCost: number;
  dailyCost: number;
  monthlyCost: number;
  annualCost: number;

  carbonKgPerYear: number;
  carbonMetricTonnesPerYear: number;
  currencySymbol: string;
}

export function calculateSingleAppliance(input: SingleApplianceInput): SingleApplianceResult {
  const baseWatts = Math.max(0, convertPowerToWatts(input.powerValue || 1000, input.powerUnit || "watts"));
  const duty = Math.max(1, Math.min(100, input.dutyCyclePct ?? 100)) / 100;
  const effectiveWatts = baseWatts * duty;
  const effectiveKw = effectiveWatts / 1000;

  const hours = Math.max(0.1, Math.min(24, input.hoursPerDay || 4));
  const daysPerWeek = Math.max(1, Math.min(7, input.daysPerWeek || 7));
  const monthsPerYear = Math.max(1, Math.min(12, input.monthsPerYear || 12));

  // Daily energy in kWh
  const dailyKwh = (effectiveWatts * hours) / 1000;
  // Weekly & Monthly energy
  const weeklyKwh = dailyKwh * daysPerWeek;
  const daysInMonth = (365.25 / 12);
  const monthlyKwh = (weeklyKwh / 7) * daysInMonth;
  const annualKwh = (weeklyKwh / 7) * 365.25 * (monthsPerYear / 12);

  const rate = Math.max(0, input.ratePerKwh || 0.16);
  const hourlyCost = effectiveKw * rate;
  const dailyCost = dailyKwh * rate;
  const monthlyCost = monthlyKwh * rate;
  const annualCost = annualKwh * rate;

  const currConfig = CURRENCY_CONFIGS[input.currency || "USD"] || CURRENCY_CONFIGS.USD;
  const carbonKgPerYear = Math.round(annualKwh * currConfig.carbonIntensityKgPerKwh);
  const carbonMetricTonnesPerYear = Math.round((carbonKgPerYear / 1000) * 100) / 100;

  return {
    effectiveWatts: Math.round(effectiveWatts * 10) / 10,
    effectiveKw: Math.round(effectiveKw * 1000) / 1000,
    dailyKwh: Math.round(dailyKwh * 100) / 100,
    monthlyKwh: Math.round(monthlyKwh * 10) / 10,
    annualKwh: Math.round(annualKwh),

    hourlyCost: Math.round(hourlyCost * 1000) / 1000,
    dailyCost: Math.round(dailyCost * 100) / 100,
    monthlyCost: Math.round(monthlyCost * 100) / 100,
    annualCost: Math.round(annualCost * 100) / 100,

    carbonKgPerYear,
    carbonMetricTonnesPerYear,
    currencySymbol: currConfig.symbol,
  };
}

// ─── CARD 2: TIERED TARIFF & TIME-OF-USE (TOU) CALCULATOR ──────────────────

export interface TimeOfUseInput {
  peakKwhPerDay: number;
  offPeakKwhPerDay: number;
  peakRate: number;
  offPeakRate: number;
  fixedMonthlyGridFee: number;
  currency: CurrencyCode;
}

export interface TimeOfUseResult {
  totalDailyKwh: number;
  totalMonthlyKwh: number;
  totalAnnualKwh: number;

  peakMonthlyCost: number;
  offPeakMonthlyCost: number;
  fixedMonthlyFee: number;
  totalMonthlyBill: number;
  totalAnnualBill: number;

  effectiveRatePerKwh: number;
  peakPct: number;
  offPeakPct: number;
  currencySymbol: string;
}

export function calculateTimeOfUse(input: TimeOfUseInput): TimeOfUseResult {
  const peakDaily = Math.max(0, input.peakKwhPerDay || 8);
  const offPeakDaily = Math.max(0, input.offPeakKwhPerDay || 16);
  const totalDailyKwh = peakDaily + offPeakDaily;

  const daysInMonth = 30.4375;
  const peakMonthlyKwh = peakDaily * daysInMonth;
  const offPeakMonthlyKwh = offPeakDaily * daysInMonth;
  const totalMonthlyKwh = totalDailyKwh * daysInMonth;
  const totalAnnualKwh = totalDailyKwh * 365.25;

  const peakRate = Math.max(0, input.peakRate || 0.28);
  const offPeakRate = Math.max(0, input.offPeakRate || 0.12);
  const fixedFee = Math.max(0, input.fixedMonthlyGridFee || 15);

  const peakMonthlyCost = peakMonthlyKwh * peakRate;
  const offPeakMonthlyCost = offPeakMonthlyKwh * offPeakRate;
  const totalMonthlyBill = peakMonthlyCost + offPeakMonthlyCost + fixedFee;
  const totalAnnualBill = totalMonthlyBill * 12;

  const effectiveRatePerKwh = totalMonthlyKwh > 0 ? (peakMonthlyCost + offPeakMonthlyCost) / totalMonthlyKwh : 0;
  const peakPct = totalDailyKwh > 0 ? Math.round((peakDaily / totalDailyKwh) * 100) : 0;
  const offPeakPct = 100 - peakPct;

  const currConfig = CURRENCY_CONFIGS[input.currency || "USD"] || CURRENCY_CONFIGS.USD;

  return {
    totalDailyKwh: Math.round(totalDailyKwh * 10) / 10,
    totalMonthlyKwh: Math.round(totalMonthlyKwh * 10) / 10,
    totalAnnualKwh: Math.round(totalAnnualKwh),

    peakMonthlyCost: Math.round(peakMonthlyCost * 100) / 100,
    offPeakMonthlyCost: Math.round(offPeakMonthlyCost * 100) / 100,
    fixedMonthlyFee: Math.round(fixedFee * 100) / 100,
    totalMonthlyBill: Math.round(totalMonthlyBill * 100) / 100,
    totalAnnualBill: Math.round(totalAnnualBill * 100) / 100,

    effectiveRatePerKwh: Math.round(effectiveRatePerKwh * 1000) / 1000,
    peakPct,
    offPeakPct,
    currencySymbol: currConfig.symbol,
  };
}

// ─── CARD 3: WHOLE-HOUSE MULTI-APPLIANCE AGGREGATOR ────────────────────────

export interface HouseApplianceRow {
  id: string;
  name: string;
  quantity: number;
  powerWatts: number;
  dailyHours: number;
  category: string;
}

export interface HouseAggregatorInput {
  appliances: HouseApplianceRow[];
  ratePerKwh: number;
  currency: CurrencyCode;
}

export interface ApplianceAllocationItem {
  id: string;
  name: string;
  category: string;
  monthlyKwh: number;
  monthlyCost: number;
  pctOfTotal: number;
}

export interface HouseAggregatorResult {
  totalDailyKwh: number;
  totalMonthlyKwh: number;
  totalAnnualKwh: number;
  totalMonthlyBill: number;
  totalAnnualBill: number;
  totalAnnualCarbonKg: number;
  topDrainingAppliance: string;
  allocations: ApplianceAllocationItem[];
  currencySymbol: string;
}

export function calculateHouseAggregator(input: HouseAggregatorInput): HouseAggregatorResult {
  const rate = Math.max(0, input.ratePerKwh || 0.16);
  const currConfig = CURRENCY_CONFIGS[input.currency || "USD"] || CURRENCY_CONFIGS.USD;
  const daysInMonth = 30.4375;

  let totalDailyKwh = 0;
  const itemKwhList: { id: string; name: string; category: string; monthlyKwh: number; monthlyCost: number }[] = [];

  for (const item of input.appliances) {
    const qty = Math.max(1, item.quantity || 1);
    const watts = Math.max(0, item.powerWatts || 100);
    const hours = Math.max(0, item.dailyHours || 1);

    const itemDailyKwh = (qty * watts * hours) / 1000;
    const itemMonthlyKwh = itemDailyKwh * daysInMonth;
    const itemMonthlyCost = itemMonthlyKwh * rate;

    totalDailyKwh += itemDailyKwh;
    itemKwhList.push({
      id: item.id,
      name: item.name || "Appliance",
      category: item.category || "General",
      monthlyKwh: Math.round(itemMonthlyKwh * 10) / 10,
      monthlyCost: Math.round(itemMonthlyCost * 100) / 100,
    });
  }

  const totalMonthlyKwh = totalDailyKwh * daysInMonth;
  const totalAnnualKwh = totalDailyKwh * 365.25;
  const totalMonthlyBill = totalMonthlyKwh * rate;
  const totalAnnualBill = totalAnnualKwh * rate;
  const totalAnnualCarbonKg = Math.round(totalAnnualKwh * currConfig.carbonIntensityKgPerKwh);

  const allocations: ApplianceAllocationItem[] = itemKwhList.map((item) => ({
    ...item,
    pctOfTotal: totalMonthlyKwh > 0 ? Math.round((item.monthlyKwh / totalMonthlyKwh) * 100) : 0,
  })).sort((a, b) => b.monthlyKwh - a.monthlyKwh);

  const topDrainingAppliance = allocations.length > 0 ? `${allocations[0].name} (${allocations[0].pctOfTotal}%)` : "None";

  return {
    totalDailyKwh: Math.round(totalDailyKwh * 10) / 10,
    totalMonthlyKwh: Math.round(totalMonthlyKwh * 10) / 10,
    totalAnnualKwh: Math.round(totalAnnualKwh),
    totalMonthlyBill: Math.round(totalMonthlyBill * 100) / 100,
    totalAnnualBill: Math.round(totalAnnualBill * 100) / 100,
    totalAnnualCarbonKg,
    topDrainingAppliance,
    allocations,
    currencySymbol: currConfig.symbol,
  };
}

// ─── CARD 4: ENERGY EFFICIENCY & LED SAVINGS CONVERTER ──────────────────────

export interface EnergyEfficiencyInput {
  oldWatts: number;
  newWatts: number;
  quantity: number;
  dailyHours: number;
  ratePerKwh: number;
  replacementCostPerUnit: number; // purchase price of upgrade
  currency: CurrencyCode;
}

export interface EnergyEfficiencyResult {
  powerSavedWatts: number;
  powerSavedKw: number;
  dailyKwhSaved: number;
  monthlyKwhSaved: number;
  annualKwhSaved: number;

  monthlyCostSaved: number;
  annualCostSaved: number;
  fiveYearSavings: number;
  tenYearSavings: number;

  totalInvestmentCost: number;
  paybackMonths: number;
  annualRoiPct: number;
  annualCarbonAvoidedKg: number;
  currencySymbol: string;
}

export function calculateEnergyEfficiency(input: EnergyEfficiencyInput): EnergyEfficiencyResult {
  const oldW = Math.max(0, input.oldWatts || 60);
  const newW = Math.max(0, input.newWatts || 9);
  const qty = Math.max(1, input.quantity || 10);
  const hours = Math.max(0.1, input.dailyHours || 6);
  const rate = Math.max(0, input.ratePerKwh || 0.16);
  const unitCost = Math.max(0, input.replacementCostPerUnit || 4.0);

  const perUnitSavedW = Math.max(0, oldW - newW);
  const totalPowerSavedW = perUnitSavedW * qty;
  const powerSavedKw = totalPowerSavedW / 1000;

  const dailyKwhSaved = (totalPowerSavedW * hours) / 1000;
  const monthlyKwhSaved = dailyKwhSaved * 30.4375;
  const annualKwhSaved = dailyKwhSaved * 365.25;

  const monthlyCostSaved = monthlyKwhSaved * rate;
  const annualCostSaved = annualKwhSaved * rate;
  const fiveYearSavings = annualCostSaved * 5;
  const tenYearSavings = annualCostSaved * 10;

  const totalInvestmentCost = qty * unitCost;
  const paybackMonths = monthlyCostSaved > 0 ? Math.round((totalInvestmentCost / monthlyCostSaved) * 10) / 10 : 0;
  const annualRoiPct = totalInvestmentCost > 0 ? Math.round((annualCostSaved / totalInvestmentCost) * 100) : 0;

  const currConfig = CURRENCY_CONFIGS[input.currency || "USD"] || CURRENCY_CONFIGS.USD;
  const annualCarbonAvoidedKg = Math.round(annualKwhSaved * currConfig.carbonIntensityKgPerKwh);

  return {
    powerSavedWatts: totalPowerSavedW,
    powerSavedKw: Math.round(powerSavedKw * 1000) / 1000,
    dailyKwhSaved: Math.round(dailyKwhSaved * 100) / 100,
    monthlyKwhSaved: Math.round(monthlyKwhSaved * 10) / 10,
    annualKwhSaved: Math.round(annualKwhSaved),

    monthlyCostSaved: Math.round(monthlyCostSaved * 100) / 100,
    annualCostSaved: Math.round(annualCostSaved * 100) / 100,
    fiveYearSavings: Math.round(fiveYearSavings),
    tenYearSavings: Math.round(tenYearSavings),

    totalInvestmentCost: Math.round(totalInvestmentCost * 100) / 100,
    paybackMonths,
    annualRoiPct,
    annualCarbonAvoidedKg,
    currencySymbol: currConfig.symbol,
  };
}
