import { Locale } from "../types";

export interface CurrencyLocaleOverlay {
  locale: Locale;
  converterTitle: string;
  amountLabel: string;
  fromLabel: string;
  toLabel: string;
  swapBtn: string;
  convertBtn: string;
  customRateTitle: string;
  multiCurrencyTitle: string;
  feeSimulatorTitle: string;
  cheatSheetTitle: string;
  copyBtn: string;
  copiedBtn: string;
  saveBtn: string;
  savedBtn: string;
  resultLabel: string;
  rateLabel: string;
  inverseRateLabel: string;
}

export const CURRENCY_OVERLAYS: Record<Locale, CurrencyLocaleOverlay> = {
  en: {
    locale: "en",
    converterTitle: "Live Currency Converter",
    amountLabel: "Amount",
    fromLabel: "From Currency",
    toLabel: "To Currency",
    swapBtn: "Swap Currencies",
    convertBtn: "Convert",
    customRateTitle: "Manual / Custom Exchange Rate",
    multiCurrencyTitle: "Multi-Currency Comparison Matrix",
    feeSimulatorTitle: "Bank Markup & Hidden Fee Calculator",
    cheatSheetTitle: "Traveler Currency Conversion Table",
    copyBtn: "Copy",
    copiedBtn: "Copied!",
    saveBtn: "Save Conversion",
    savedBtn: "Saved!",
    resultLabel: "Converted Amount",
    rateLabel: "Exchange Rate",
    inverseRateLabel: "Inverse Rate",
  },

  es: {
    locale: "es",
    converterTitle: "Conversor de Divisas en Tiempo Real",
    amountLabel: "Importe",
    fromLabel: "De (Moneda Origen)",
    toLabel: "A (Moneda Destino)",
    swapBtn: "Invertir Divisas",
    convertBtn: "Convertir",
    customRateTitle: "Tipo de Cambio Manual / Personalizado",
    multiCurrencyTitle: "Matriz Comparativa Multidivisa",
    feeSimulatorTitle: "Calculadora de Comisiones y Diferencial Bancario",
    cheatSheetTitle: "Tabla de Conversión Rápida para Viajeros",
    copyBtn: "Copiar",
    copiedBtn: "¡Copiado!",
    saveBtn: "Guardar Conversión",
    savedBtn: "¡Guardado!",
    resultLabel: "Importe Convertido",
    rateLabel: "Tipo de Cambio",
    inverseRateLabel: "Tipo Inverso",
  },

  fr: {
    locale: "fr",
    converterTitle: "Convertisseur de Devises en Temps Réel",
    amountLabel: "Montant",
    fromLabel: "Devise Source",
    toLabel: "Devise Cible",
    swapBtn: "Inverser les Devises",
    convertBtn: "Convertir",
    customRateTitle: "Taux de Change Manuel / Personnalisé",
    multiCurrencyTitle: "Matrice Comparative Multi-Devises",
    feeSimulatorTitle: "Calculateur de Frais et Marges Bancaires",
    cheatSheetTitle: "Tableau de Conversion pour Voyageurs",
    copyBtn: "Copier",
    copiedBtn: "Copié !",
    saveBtn: "Enregistrer",
    savedBtn: "Enregistré !",
    resultLabel: "Montant Converti",
    rateLabel: "Taux de Change",
    inverseRateLabel: "Taux Inverse",
  },

  de: {
    locale: "de",
    converterTitle: "Echtzeit-Währungsrechner",
    amountLabel: "Betrag",
    fromLabel: "Ausgangswährung",
    toLabel: "Zielwährung",
    swapBtn: "Währungen tauschen",
    convertBtn: "Umrechnen",
    customRateTitle: "Manueller / Eigener Wechselkurs",
    multiCurrencyTitle: "Multi-Währungs-Vergleichsmatrix",
    feeSimulatorTitle: "Rechner für Bankgebühren & Wechselkursmarge",
    cheatSheetTitle: "Reise-Umrechnungstabelle",
    copyBtn: "Kopieren",
    copiedBtn: "Kopiert!",
    saveBtn: "Speichern",
    savedBtn: "Gespeichert!",
    resultLabel: "Umgerechneter Betrag",
    rateLabel: "Wechselkurs",
    inverseRateLabel: "Inverser Kurs",
  },

  hi: {
    locale: "hi",
    converterTitle: "रीयल-टाइम मुद्रा परिवर्तक",
    amountLabel: "राशि (Amount)",
    fromLabel: "स्रोत मुद्रा (From)",
    toLabel: "लक्षित मुद्रा (To)",
    swapBtn: "मुद्राएं बदलें",
    convertBtn: "परिवर्तित करें",
    customRateTitle: "कस्टम विनिमय दर (Custom Rate)",
    multiCurrencyTitle: "बहु-मुद्रा तुलना मैट्रिक्स",
    feeSimulatorTitle: "बैंक शुल्क एवं स्प्रेड कैलकुलेटर",
    cheatSheetTitle: "यात्री मुद्रा रूपांतरण तालिका",
    copyBtn: "कॉपी करें",
    copiedBtn: "कॉपी हो गया!",
    saveBtn: "सहेजें",
    savedBtn: "सहेजा गया!",
    resultLabel: "परिवर्तित राशि",
    rateLabel: "विनिमय दर",
    inverseRateLabel: "व्युत्क्रम दर (Inverse Rate)",
  },

  pt: {
    locale: "pt",
    converterTitle: "Conversor de Moedas em Tempo Real",
    amountLabel: "Valor",
    fromLabel: "Moeda de Origem",
    toLabel: "Moeda de Destino",
    swapBtn: "Inverter Moedas",
    convertBtn: "Converter",
    customRateTitle: "Taxa de Câmbio Manual / Personalizada",
    multiCurrencyTitle: "Matriz Comparativa Multi-Moedas",
    feeSimulatorTitle: "Calculadora de Taxas e Spread Bancário",
    cheatSheetTitle: "Tabela de Conversão Rápida para Viagens",
    copyBtn: "Copiar",
    copiedBtn: "Copiado!",
    saveBtn: "Salvar Conversão",
    savedBtn: "Salvo!",
    resultLabel: "Valor Convertido",
    rateLabel: "Taxa de Câmbio",
    inverseRateLabel: "Taxa Inversa",
  },
};

export function getCurrencyOverlay(locale: string): CurrencyLocaleOverlay {
  return CURRENCY_OVERLAYS[locale as Locale] || CURRENCY_OVERLAYS.en;
}
