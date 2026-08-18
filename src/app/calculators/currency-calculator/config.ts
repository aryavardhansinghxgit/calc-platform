import { CalculatorModuleDefinition } from "@/calculators/types";
import { convertCurrency } from "./calculator";
import { CurrencyCalculator } from "@/components/calculator/currency/CurrencyCalculator";
import { CurrencyContent } from "@/components/calculator/currency/CurrencyContent";

export const currency_calculatorConfig: CalculatorModuleDefinition = {
  id: "currency-calculator",
  title: "Currency Calculator — Live Exchange Rates & Multi-Currency Converter",
  slug: "currency-calculator",
  category: "Finance",
  subcategory: "Banking & Global",
  description:
    "Convert between 25+ global currencies in real-time, simulate bank transfer fees and markups, calculate travel budgets, and view exchange rate cross-matrices.",
  iconName: "Coins",
  featured: true,
  keywords: [
    "currency calculator",
    "currency converter",
    "live exchange rates",
    "money exchange calculator",
    "forex converter",
    "usd to eur converter",
    "real time currency rates",
    "bank transfer exchange fee calculator",
    "travel exchange rate calculator",
    "historical foreign exchange rates",
    "mid market rate calculator",
  ],
  priority: 1,
  relatedCalculators: [
    "sales-tax-calculator",
    "vat-calculator",
    "salary-calculator",
    "budget-calculator",
    "take-home-pay-calculator",
    "payment-calculator",
  ],
  formulaDescription:
    "Converted Amount = Base Amount × Exchange Rate, where Exchange Rate is the relative mid-market quote between Currency A and Currency B.",
  inputs: [
    {
      name: "amount",
      label: "Amount",
      type: "number",
      defaultValue: 100,
      min: 0,
      max: 1000000000,
    },
    {
      name: "fromCurrency",
      label: "From Currency",
      type: "select",
      defaultValue: "USD",
      options: [
        { label: "USD - US Dollar", value: "USD" },
        { label: "EUR - Euro", value: "EUR" },
        { label: "GBP - British Pound", value: "GBP" },
        { label: "JPY - Japanese Yen", value: "JPY" },
        { label: "CAD - Canadian Dollar", value: "CAD" },
        { label: "AUD - Australian Dollar", value: "AUD" },
      ],
    },
    {
      name: "toCurrency",
      label: "To Currency",
      type: "select",
      defaultValue: "EUR",
      options: [
        { label: "EUR - Euro", value: "EUR" },
        { label: "USD - US Dollar", value: "USD" },
        { label: "GBP - British Pound", value: "GBP" },
        { label: "JPY - Japanese Yen", value: "JPY" },
        { label: "CAD - Canadian Dollar", value: "CAD" },
        { label: "AUD - Australian Dollar", value: "AUD" },
      ],
    },
  ],
  outputs: [
    {
      name: "convertedAmount",
      label: "Converted Amount",
      type: "currency",
    },
    {
      name: "exchangeRate",
      label: "Exchange Rate",
      type: "number",
    },
  ],
  calculate: (inputs: Record<string, any>) => {
    const amt = Number(inputs.amount) || 100;
    const from = inputs.fromCurrency || "USD";
    const to = inputs.toCurrency || "EUR";

    const res = convertCurrency(amt, from, to);

    return {
      convertedAmount: `${res.toAmount.toLocaleString()} ${to}`,
      exchangeRate: `1 ${from} = ${res.rate} ${to}`,
    };
  },
  CustomComponent: CurrencyCalculator,
  ContentComponent: CurrencyContent,
};

export default currency_calculatorConfig;
