import {
  CurrencyInfo,
  ConversionResult,
  CheatSheetRow,
  BankMarkupResult,
  TravelBudgetResult,
} from "./types";

export const POPULAR_CURRENCIES: CurrencyInfo[] = [
  { code: "USD", name: "United States Dollar", symbol: "$", flag: "🇺🇸", rateVsUSD: 1.0 },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺", rateVsUSD: 0.9215 },
  { code: "GBP", name: "British Pound Sterling", symbol: "£", flag: "🇬🇧", rateVsUSD: 0.7885 },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵", rateVsUSD: 154.65 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦", rateVsUSD: 1.3850 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺", rateVsUSD: 1.5280 },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭", rateVsUSD: 0.8920 },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳", rateVsUSD: 7.2450 },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳", rateVsUSD: 83.55 },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$", flag: "🇲🇽", rateVsUSD: 17.85 },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷", rateVsUSD: 5.42 },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬", rateVsUSD: 1.3520 },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿", rateVsUSD: 1.6420 },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰", rateVsUSD: 7.8120 },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪", rateVsUSD: 10.55 },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴", rateVsUSD: 10.72 },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷", rateVsUSD: 1380.0 },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦", rateVsUSD: 18.25 },
  { code: "AED", name: "United Arab Emirates Dirham", symbol: "AED", flag: "🇦🇪", rateVsUSD: 3.6725 },
  { code: "SAR", name: "Saudi Riyal", symbol: "SAR", flag: "🇸🇦", rateVsUSD: 3.7500 },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭", rateVsUSD: 36.45 },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷", rateVsUSD: 32.85 },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭", rateVsUSD: 58.60 },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩", rateVsUSD: 16350.0 },
  { code: "BTC", name: "Bitcoin", symbol: "₿", flag: "🪙", rateVsUSD: 0.000015 },
  { code: "XAU", name: "Gold (Troy Ounce)", symbol: "oz t", flag: "🥇", rateVsUSD: 0.00041 },
];

export const CURRENCY_MAP: Record<string, CurrencyInfo> = POPULAR_CURRENCIES.reduce(
  (acc, cur) => {
    acc[cur.code] = cur;
    return acc;
  },
  {} as Record<string, CurrencyInfo>
);

/**
 * 1. Convert Currency using live or custom rate
 */
export function convertCurrency(
  amount: number,
  fromCode: string,
  toCode: string,
  customRate?: number
): ConversionResult {
  const amt = Math.abs(amount || 0);

  if (fromCode === toCode) {
    return {
      fromCode,
      toCode,
      fromAmount: amt,
      toAmount: amt,
      rate: 1.0,
      inverseRate: 1.0,
    };
  }

  let rate = 1.0;
  if (customRate !== undefined && customRate > 0) {
    rate = customRate;
  } else {
    const fromInfo = CURRENCY_MAP[fromCode] || { rateVsUSD: 1.0 };
    const toInfo = CURRENCY_MAP[toCode] || { rateVsUSD: 1.0 };
    // 1 From = (toRateVsUSD / fromRateVsUSD) To
    rate = toInfo.rateVsUSD / fromInfo.rateVsUSD;
  }

  const toAmount = amt * rate;
  const inverseRate = rate > 0 ? 1 / rate : 0;

  return {
    fromCode,
    toCode,
    fromAmount: Math.round(amt * 100) / 100,
    toAmount: Math.round(toAmount * 100) / 100,
    rate: Math.round(rate * 1000000) / 1000000,
    inverseRate: Math.round(inverseRate * 1000000) / 1000000,
  };
}

/**
 * 2. Generate Conversion Cheat Sheet Matrix
 */
export function generateCheatSheet(fromCode: string, toCode: string, rate: number): CheatSheetRow[] {
  const units = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];
  const inverseRate = rate > 0 ? 1 / rate : 0;

  return units.map((u) => ({
    unit: u,
    convertedAmount: Math.round(u * rate * 100) / 100,
    inverseUnit: u,
    inverseConvertedAmount: Math.round(u * inverseRate * 100) / 100,
  }));
}

/**
 * 3. Generate Major Currency Pairs Cross Table
 */
export function generateMajorCurrencyMatrix(codes: string[]): { base: string; rates: Record<string, number> }[] {
  return codes.map((base) => {
    const baseInfo = CURRENCY_MAP[base] || { rateVsUSD: 1.0 };
    const rowRates: Record<string, number> = {};

    codes.forEach((target) => {
      if (base === target) {
        rowRates[target] = 1.0;
      } else {
        const targetInfo = CURRENCY_MAP[target] || { rateVsUSD: 1.0 };
        const cross = targetInfo.rateVsUSD / baseInfo.rateVsUSD;
        rowRates[target] = Math.round(cross * 10000) / 10000;
      }
    });

    return { base, rates: rowRates };
  });
}

/**
 * 4. Bank Transfer Fee & Hidden Spread Markup Simulator
 */
export function calculateBankMarkup(
  amount: number,
  fromCode: string,
  toCode: string,
  midMarketRate: number,
  markupPercent: number,
  fixedFee: number,
  providerName: string
): BankMarkupResult {
  const amt = Math.abs(amount || 0);
  const fee = Math.abs(fixedFee || 0);
  const netFromAmt = Math.max(0, amt - fee);

  const effectiveRate = midMarketRate * (1 - (markupPercent || 0) / 100);
  const grossTargetAmount = amt * midMarketRate;
  const netTargetAmount = netFromAmt * effectiveRate;
  const hiddenLossVsMidMarket = Math.max(0, grossTargetAmount - netTargetAmount);

  return {
    providerName,
    markupPercent: Math.round(markupPercent * 10) / 10,
    fixedFee: Math.round(fee * 100) / 100,
    grossTargetAmount: Math.round(grossTargetAmount * 100) / 100,
    feeDeduction: Math.round(fee * 100) / 100,
    netTargetAmount: Math.round(netTargetAmount * 100) / 100,
    hiddenLossVsMidMarket: Math.round(hiddenLossVsMidMarket * 100) / 100,
  };
}

/**
 * 5. Travel Budget & Daily Spending Limit Splitter
 */
export function calculateTravelBudget(
  totalBudgetHome: number,
  fromCode: string,
  toCode: string,
  rate: number,
  tripDays: number
): TravelBudgetResult {
  const budgetHome = Math.abs(totalBudgetHome || 0);
  const days = Math.max(1, tripDays || 1);

  const totalBudgetForeign = budgetHome * rate;
  const dailySpendingLimitHome = budgetHome / days;
  const dailySpendingLimitForeign = totalBudgetForeign / days;

  return {
    totalBudgetHome: Math.round(budgetHome * 100) / 100,
    totalBudgetForeign: Math.round(totalBudgetForeign * 100) / 100,
    tripDays: days,
    dailySpendingLimitHome: Math.round(dailySpendingLimitHome * 100) / 100,
    dailySpendingLimitForeign: Math.round(dailySpendingLimitForeign * 100) / 100,
  };
}
