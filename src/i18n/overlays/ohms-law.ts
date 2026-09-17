import { Locale } from "../types";

export interface OhmsLawLocaleOverlay {
  locale: Locale;
  tabCore: string;
  tabVoltageDivider: string;
  tabCurrentDivider: string;
  tabLedResistor: string;
  voltageLabel: string;
  currentLabel: string;
  resistanceLabel: string;
  powerLabel: string;
  calculateBtn: string;
  resetBtn: string;
  copyBtn: string;
  copiedBtn: string;
  saveBtn: string;
  savedBtn: string;
  resultsTitle: string;
  voltageUnit: string;
  currentUnit: string;
  resistanceUnit: string;
  powerUnit: string;
}

export const OHMS_LAW_OVERLAYS: Record<Locale, OhmsLawLocaleOverlay> = {
  en: {
    locale: "en",
    tabCore: "Ohm's Law Core",
    tabVoltageDivider: "Voltage Divider",
    tabCurrentDivider: "Current Divider",
    tabLedResistor: "LED Resistor Limit",
    voltageLabel: "Voltage (V)",
    currentLabel: "Current (I)",
    resistanceLabel: "Resistance (R)",
    powerLabel: "Power (P)",
    calculateBtn: "Calculate",
    resetBtn: "Reset Defaults",
    copyBtn: "Copy",
    copiedBtn: "Copied!",
    saveBtn: "Save",
    savedBtn: "Saved!",
    resultsTitle: "Electrical Parameters & Solutions",
    voltageUnit: "Volts (V)",
    currentUnit: "Amperes (A)",
    resistanceUnit: "Ohms (Ω)",
    powerUnit: "Watts (W)",
  },

  es: {
    locale: "es",
    tabCore: "Ley de Ohm Fundamental",
    tabVoltageDivider: "Divisor de Tensión (Voltaje)",
    tabCurrentDivider: "Divisor de Corriente",
    tabLedResistor: "Resistencia Limitadora LED",
    voltageLabel: "Tensión / Voltaje (V)",
    currentLabel: "Corriente / Intensidad (I)",
    resistanceLabel: "Resistencia (R)",
    powerLabel: "Potencia Eléctrica (P)",
    calculateBtn: "Calcular",
    resetBtn: "Restablecer",
    copyBtn: "Copiar",
    copiedBtn: "¡Copiado!",
    saveBtn: "Guardar",
    savedBtn: "¡Guardado!",
    resultsTitle: "Parámetros Eléctricos y Resultados",
    voltageUnit: "Voltios (V)",
    currentUnit: "Amperios (A)",
    resistanceUnit: "Ohmios (Ω)",
    powerUnit: "Vatios (W)",
  },

  fr: {
    locale: "fr",
    tabCore: "Loi d'Ohm Fondamentale",
    tabVoltageDivider: "Diviseur de Tension",
    tabCurrentDivider: "Diviseur de Courant",
    tabLedResistor: "Résistance pour LED",
    voltageLabel: "Tension (U / V)",
    currentLabel: "Intensité du Courant (I)",
    resistanceLabel: "Résistance (R)",
    powerLabel: "Puissance Électrique (P)",
    calculateBtn: "Calculer",
    resetBtn: "Réinitialiser",
    copyBtn: "Copier",
    copiedBtn: "Copié !",
    saveBtn: "Enregistrer",
    savedBtn: "Enregistré !",
    resultsTitle: "Grandeurs Électriques et Résultats",
    voltageUnit: "Volts (V)",
    currentUnit: "Ampères (A)",
    resistanceUnit: "Ohms (Ω)",
    powerUnit: "Watts (W)",
  },

  de: {
    locale: "de",
    tabCore: "Ohmsches Gesetz (Grundformel)",
    tabVoltageDivider: "Spannungsteiler",
    tabCurrentDivider: "Stromteiler",
    tabLedResistor: "LED-Vorwiderstand",
    voltageLabel: "Elektrische Spannung (U / V)",
    currentLabel: "Elektrischer Strom (I)",
    resistanceLabel: "Elektrischer Widerstand (R)",
    powerLabel: "Elektrische Leistung (P)",
    calculateBtn: "Berechnen",
    resetBtn: "Zurücksetzen",
    copyBtn: "Kopieren",
    copiedBtn: "Kopiert!",
    saveBtn: "Speichern",
    savedBtn: "Gespeichert!",
    resultsTitle: "Elektrische Kennwerte & Ergebnisse",
    voltageUnit: "Volt (V)",
    currentUnit: "Ampere (A)",
    resistanceUnit: "Ohm (Ω)",
    powerUnit: "Watt (W)",
  },

  hi: {
    locale: "hi",
    tabCore: "ओम का नियम (Ohm's Law)",
    tabVoltageDivider: "वोल्टेज डिवाइडर",
    tabCurrentDivider: "करंट डिवाइडर",
    tabLedResistor: "एलईडी प्रतिरोधक (LED Resistor)",
    voltageLabel: "वोल्टेज (V)",
    currentLabel: "विद्युत धारा (I / Current)",
    resistanceLabel: "प्रतिरोध (R / Resistance)",
    powerLabel: "विद्युत शक्ति (P / Power)",
    calculateBtn: "गणना करें",
    resetBtn: "रीसेट करें",
    copyBtn: "कॉपी करें",
    copiedBtn: "कॉपी हो गया!",
    saveBtn: "सहेजें",
    savedBtn: "सहेजा गया!",
    resultsTitle: "विद्युत मान एवं परिणाम",
    voltageUnit: "वोल्ट (V)",
    currentUnit: "एम्पीयर (A)",
    resistanceUnit: "ओम (Ω)",
    powerUnit: "वाट (W)",
  },

  pt: {
    locale: "pt",
    tabCore: "Lei de Ohm Fundamental",
    tabVoltageDivider: "Divisor de Tensão",
    tabCurrentDivider: "Divisor de Corrente",
    tabLedResistor: "Resistor para LED",
    voltageLabel: "Tensão / Voltagem (V)",
    currentLabel: "Corrente Elétrica (I)",
    resistanceLabel: "Resistência (R)",
    powerLabel: "Potência Elétrica (P)",
    calculateBtn: "Calcular",
    resetBtn: "Redefinir",
    copyBtn: "Copiar",
    copiedBtn: "Copiado!",
    saveBtn: "Salvar",
    savedBtn: "Salvo!",
    resultsTitle: "Parâmetros Elétricos e Resultados",
    voltageUnit: "Volts (V)",
    currentUnit: "Ampères (A)",
    resistanceUnit: "Ohms (Ω)",
    powerUnit: "Watts (W)",
  },
};

export function getOhmsLawOverlay(locale: string): OhmsLawLocaleOverlay {
  return OHMS_LAW_OVERLAYS[locale as Locale] || OHMS_LAW_OVERLAYS.en;
}
