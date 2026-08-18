export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateVsUSD: number; // 1 USD = X Currency
}

export interface ConversionResult {
  fromCode: string;
  toCode: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  inverseRate: number;
}

export interface CheatSheetRow {
  unit: number;
  convertedAmount: number;
  inverseUnit: number;
  inverseConvertedAmount: number;
}

export interface BankMarkupResult {
  providerName: string;
  markupPercent: number;
  fixedFee: number;
  grossTargetAmount: number;
  feeDeduction: number;
  netTargetAmount: number;
  hiddenLossVsMidMarket: number;
}

export interface TravelBudgetResult {
  totalBudgetHome: number;
  totalBudgetForeign: number;
  tripDays: number;
  dailySpendingLimitHome: number;
  dailySpendingLimitForeign: number;
}

export interface SavedCurrencyItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
