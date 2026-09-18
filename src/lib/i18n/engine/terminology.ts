import { Locale } from "@/i18n/types";

export interface TermTranslation {
  en: string;
  es: string;
  fr: string;
  de: string;
  hi: string;
  pt: string;
}

export const FINANCIAL_GLOSSARY: Record<string, TermTranslation> = {
  principal: {
    en: "Principal",
    es: "Capital",
    fr: "Capital",
    de: "Darlehensbetrag / Tilgungsanteil",
    hi: "मूलधन (Principal)",
    pt: "Principal",
  },
  interestRate: {
    en: "Interest Rate",
    es: "Tasa de Interés",
    fr: "Taux d'Intérêt",
    de: "Zinssatz (Sollzins)",
    hi: "ब्याज दर (Interest Rate)",
    pt: "Taxa de Juros",
  },
  loanTerm: {
    en: "Loan Term",
    es: "Plazo del Préstamo",
    fr: "Durée du Prêt",
    de: "Darlehenslaufzeit",
    hi: "ऋण अवधि (Loan Term)",
    pt: "Prazo do Financiamento",
  },
  monthlyPayment: {
    en: "Monthly Payment",
    es: "Pago Mensual",
    fr: "Mensualité",
    de: "Monatliche Rate",
    hi: "मासिक किस्त (Monthly Payment)",
    pt: "Parcela Mensal",
  },
  totalInterest: {
    en: "Total Interest",
    es: "Interés Total",
    fr: "Intérêts Totaux",
    de: "Gesamtzinsen",
    hi: "कुल ब्याज (Total Interest)",
    pt: "Juros Totais",
  },
  amortizationSchedule: {
    en: "Amortization Schedule",
    es: "Tabla de Amortización",
    fr: "Tableau d'Amortissement",
    de: "Tilgungsplan",
    hi: "ऋण परिशोधन तालिका (Amortization Schedule)",
    pt: "Tabela de Amortização",
  },
  remainingBalance: {
    en: "Remaining Balance",
    es: "Saldo Restante",
    fr: "Solde Restant Dû",
    de: "Restschuld",
    hi: "शेष ऋण राशि (Remaining Balance)",
    pt: "Saldo Devedor",
  },
  extraPayment: {
    en: "Extra Payment",
    es: "Pago Extraordinario",
    fr: "Paiement Supplémentaire",
    de: "Sondertilgung",
    hi: "अतिरिक्त भुगतान (Extra Payment)",
    pt: "Amortização Extraordinária",
  },
};

export const COMMON_UI_GLOSSARY: Record<string, TermTranslation> = {
  calculate: {
    en: "Calculate",
    es: "Calcular",
    fr: "Calculer",
    de: "Berechnen",
    hi: "गणना करें (Calculate)",
    pt: "Calcular",
  },
  reset: {
    en: "Reset",
    es: "Restablecer",
    fr: "Réinitialiser",
    de: "Zurücksetzen",
    hi: "रीसेट करें (Reset)",
    pt: "Redefinir",
  },
  save: {
    en: "Save",
    es: "Guardar",
    fr: "Enregistrer",
    de: "Speichern",
    hi: "सहेजें (Save)",
    pt: "Salvar",
  },
  copy: {
    en: "Copy",
    es: "Copiar",
    fr: "Copier",
    de: "Kopieren",
    hi: "कॉपी करें (Copy)",
    pt: "Copiar",
  },
  exportCsv: {
    en: "Export CSV",
    es: "Exportar CSV",
    fr: "Exporter en CSV",
    de: "CSV exportieren",
    hi: "CSV निर्यात करें (Export CSV)",
    pt: "Exportar CSV",
  },
  exportPdf: {
    en: "Export PDF",
    es: "Exportar PDF",
    fr: "Exporter en PDF",
    de: "PDF exportieren",
    hi: "PDF निर्यात करें (Export PDF)",
    pt: "Exportar PDF",
  },
};

export class TerminologyMemory {
  /**
   * Look up standard term translation across glossaries.
   */
  public static getTerm(key: string, locale: Locale): string {
    const term = FINANCIAL_GLOSSARY[key] || COMMON_UI_GLOSSARY[key];
    if (!term) return key;
    return term[locale] || term.en || key;
  }

  /**
   * Check if a term exists in standard terminology.
   */
  public static hasTerm(key: string): boolean {
    return Boolean(FINANCIAL_GLOSSARY[key] || COMMON_UI_GLOSSARY[key]);
  }
}
