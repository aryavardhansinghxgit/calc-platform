import { Locale } from "../types";

export interface PercentageLocaleOverlay {
  locale: Locale;
  title?: string;
  description?: string;
  // Section 1: Core
  s1Title: string;
  s1PctOf: string;
  s1Equals: string;
  s1CalcBtn: string;
  s1ClearBtn: string;
  s1ResultLabel: string;
  s1SaveBtn: string;
  s1SavedBtn: string;
  s1StepsLabel: string;
  s1Undefined: string;
  s1SummaryOf: string;
  s1SummaryIs: string;

  // Section 2: Common Phrases
  s2Title: string;
  s2WhatIs: string;
  s2PctOf: string;
  s2IsWhatPctOf: string;
  s2Is: string;
  s2PctOfWhat: string;
  s2CalcBtn: string;
  s2ResultLabel: string;
  s2SaveBtn: string;
  s2SavedBtn: string;
  s2StepsLabel: string;
  s2Phrase1Summary: (res: string, p: string, v: string) => string;
  s2Phrase2Summary: (v2: string, res: string, v1: string) => string;
  s2Phrase3Summary: (v2: string, p: string, res: string) => string;

  // Section 3: Percentage Difference
  s3Title: string;
  s3Val1Label: string;
  s3Val2Label: string;
  s3CalcBtn: string;
  s3ClearBtn: string;
  s3ResultLabel: string;
  s3SaveBtn: string;
  s3SavedBtn: string;
  s3Summary: (v1: number | string, v2: number | string, res: string) => string;
  s3StepsLabel: string;

  // Section 4: Percentage Change
  s4Title: string;
  s4Increase: string;
  s4Decrease: string;
  s4Equals: string;
  s4CalcBtn: string;
  s4ClearBtn: string;
  s4ResultLabel: string;
  s4SaveBtn: string;
  s4SavedBtn: string;
  s4StepsLabel: string;
  s4SummaryChange: (v1: number | string, mode: string, p: number | string, res: string) => string;
  s4SummaryDirection: (v1: number | string, v2: number | string, p: string, mode: string) => string;

  // History & Accessibility
  historyTitle: string;
  clearHistoryBtn: string;
  deleteTooltip: string;
  ariaPercentage: string;
  ariaBase: string;
  ariaTarget: string;
}

export const PERCENTAGE_OVERLAYS: Record<Locale, PercentageLocaleOverlay> = {
  en: {
    locale: "en",
    title: "Percentage Calculator",
    description: "Calculate percentage values, 3-way solvers, percentage changes, percentage differences, discounts, and proportions.",
    s1Title: "Percentage Calculator",
    s1PctOf: "% of",
    s1Equals: "=",
    s1CalcBtn: "Calculate",
    s1ClearBtn: "Clear",
    s1ResultLabel: "Result",
    s1SaveBtn: "Save",
    s1SavedBtn: "Saved!",
    s1StepsLabel: "Steps:",
    s1Undefined: "Undefined (division by zero)",
    s1SummaryOf: "of",
    s1SummaryIs: "is",

    s2Title: "Percentage Calculator in Common Phrases",
    s2WhatIs: "what is",
    s2PctOf: "% of",
    s2IsWhatPctOf: "is what % of",
    s2Is: "is",
    s2PctOfWhat: "% of what",
    s2CalcBtn: "Calculate",
    s2ResultLabel: "Result",
    s2SaveBtn: "Save",
    s2SavedBtn: "Saved!",
    s2StepsLabel: "Steps:",
    s2Phrase1Summary: (res, p, v) => `${res} is ${p}% of ${v}.`,
    s2Phrase2Summary: (v2, res, v1) => `${v2} is ${res} of ${v1}.`,
    s2Phrase3Summary: (v2, p, res) => `${v2} is ${p}% of ${res}.`,

    s3Title: "Percentage Difference Calculator",
    s3Val1Label: "Value 1",
    s3Val2Label: "Value 2",
    s3CalcBtn: "Calculate",
    s3ClearBtn: "Clear",
    s3ResultLabel: "Result",
    s3SaveBtn: "Save",
    s3SavedBtn: "Saved!",
    s3Summary: (v1, v2, res) => `Difference of ${v1} and ${v2} is ${res}`,
    s3StepsLabel: "Steps:",

    s4Title: "Percentage Change Calculator",
    s4Increase: "Increase",
    s4Decrease: "Decrease",
    s4Equals: "% =",
    s4CalcBtn: "Calculate",
    s4ClearBtn: "Clear",
    s4ResultLabel: "Result",
    s4SaveBtn: "Save",
    s4SavedBtn: "Saved!",
    s4StepsLabel: "Steps:",
    s4SummaryChange: (v1, mode, p, res) => `${v1} ${mode.toLowerCase()} ${p}% = ${res}`,
    s4SummaryDirection: (v1, v2, p, mode) => `${v1} to ${v2} is a ${p} ${mode.toLowerCase()}`,

    historyTitle: "Saved Calculations",
    clearHistoryBtn: "Clear All",
    deleteTooltip: "Delete calculation",
    ariaPercentage: "Percentage P",
    ariaBase: "Base value V1",
    ariaTarget: "Final target V2",
  },

  es: {
    locale: "es",
    title: "Calculadora de Porcentajes – Soluciones y Fórmulas Matemáticas",
    description: "Calcule valores porcentuales, ecuaciones de 3 variables, cambios porcentuales, aumentos, disminuciones, diferencias y proporciones con precisión matemática.",
    s1Title: "Calculadora de Porcentajes",
    s1PctOf: "% de",
    s1Equals: "=",
    s1CalcBtn: "Calcular",
    s1ClearBtn: "Limpiar",
    s1ResultLabel: "Resultado",
    s1SaveBtn: "Guardar",
    s1SavedBtn: "¡Guardado!",
    s1StepsLabel: "Pasos:",
    s1Undefined: "Indefinido (división por cero)",
    s1SummaryOf: "de",
    s1SummaryIs: "es",

    s2Title: "Calculadora de Porcentajes en Frases Comunes",
    s2WhatIs: "¿cuánto es el",
    s2PctOf: "% de",
    s2IsWhatPctOf: "¿qué % es de",
    s2Is: "es el",
    s2PctOfWhat: "% de qué número",
    s2CalcBtn: "Calcular",
    s2ResultLabel: "Resultado",
    s2SaveBtn: "Guardar",
    s2SavedBtn: "¡Guardado!",
    s2StepsLabel: "Pasos:",
    s2Phrase1Summary: (res, p, v) => `${res} es el ${p}% de ${v}.`,
    s2Phrase2Summary: (v2, res, v1) => `${v2} es el ${res} de ${v1}.`,
    s2Phrase3Summary: (v2, p, res) => `${v2} es el ${p}% de ${res}.`,

    s3Title: "Calculadora de Diferencia Porcentual",
    s3Val1Label: "Valor 1",
    s3Val2Label: "Valor 2",
    s3CalcBtn: "Calcular",
    s3ClearBtn: "Limpiar",
    s3ResultLabel: "Resultado",
    s3SaveBtn: "Guardar",
    s3SavedBtn: "¡Guardado!",
    s3Summary: (v1, v2, res) => `La diferencia porcentual entre ${v1} y ${v2} es ${res}`,
    s3StepsLabel: "Pasos:",

    s4Title: "Calculadora de Variación Porcentual",
    s4Increase: "Aumento",
    s4Decrease: "Disminución",
    s4Equals: "% =",
    s4CalcBtn: "Calcular",
    s4ClearBtn: "Limpiar",
    s4ResultLabel: "Resultado",
    s4SaveBtn: "Guardar",
    s4SavedBtn: "¡Guardado!",
    s4StepsLabel: "Pasos:",
    s4SummaryChange: (v1, mode, p, res) => `${v1} con ${mode.toLowerCase()} del ${p}% = ${res}`,
    s4SummaryDirection: (v1, v2, p, mode) => `De ${v1} a ${v2} representa un ${mode.toLowerCase()} del ${p}`,

    historyTitle: "Cálculos Guardados",
    clearHistoryBtn: "Borrar Todo",
    deleteTooltip: "Eliminar cálculo",
    ariaPercentage: "Porcentaje P",
    ariaBase: "Valor base V1",
    ariaTarget: "Objetivo final V2",
  },

  fr: {
    locale: "fr",
    s1Title: "Calculateur de Pourcentage",
    s1PctOf: "% de",
    s1Equals: "=",
    s1CalcBtn: "Calculer",
    s1ClearBtn: "Effacer",
    s1ResultLabel: "Résultat",
    s1SaveBtn: "Enregistrer",
    s1SavedBtn: "Enregistré !",
    s1StepsLabel: "Étapes :",
    s1Undefined: "Indéfini (division par zéro)",
    s1SummaryOf: "de",
    s1SummaryIs: "est",

    s2Title: "Calculateur de Pourcentage en Phrases Courantes",
    s2WhatIs: "combien vaut",
    s2PctOf: "% de",
    s2IsWhatPctOf: "représente quel % de",
    s2Is: "est",
    s2PctOfWhat: "% de quel montant",
    s2CalcBtn: "Calculer",
    s2ResultLabel: "Résultat",
    s2SaveBtn: "Enregistrer",
    s2SavedBtn: "Enregistré !",
    s2StepsLabel: "Étapes :",
    s2Phrase1Summary: (res, p, v) => `${res} représente ${p}% de ${v}.`,
    s2Phrase2Summary: (v2, res, v1) => `${v2} représente ${res} de ${v1}.`,
    s2Phrase3Summary: (v2, p, res) => `${v2} représente ${p}% de ${res}.`,

    s3Title: "Calculateur de Différence en Pourcentage",
    s3Val1Label: "Valeur 1",
    s3Val2Label: "Valeur 2",
    s3CalcBtn: "Calculer",
    s3ClearBtn: "Effacer",
    s3ResultLabel: "Résultat",
    s3SaveBtn: "Enregistrer",
    s3SavedBtn: "Enregistré !",
    s3Summary: (v1, v2, res) => `La différence en pourcentage entre ${v1} et ${v2} est de ${res}`,
    s3StepsLabel: "Étapes :",

    s4Title: "Calculateur de Variation en Pourcentage",
    s4Increase: "Augmentation",
    s4Decrease: "Diminution",
    s4Equals: "% =",
    s4CalcBtn: "Calculer",
    s4ClearBtn: "Effacer",
    s4ResultLabel: "Résultat",
    s4SaveBtn: "Enregistrer",
    s4SavedBtn: "Enregistré !",
    s4StepsLabel: "Étapes :",
    s4SummaryChange: (v1, mode, p, res) => `${v1} avec une ${mode.toLowerCase()} de ${p}% = ${res}`,
    s4SummaryDirection: (v1, v2, p, mode) => `De ${v1} à ${v2} est une ${mode.toLowerCase()} de ${p}`,

    historyTitle: "Calculs Enregistrés",
    clearHistoryBtn: "Tout Effacer",
    deleteTooltip: "Supprimer le calcul",
    ariaPercentage: "Pourcentage P",
    ariaBase: "Valeur de base V1",
    ariaTarget: "Valeur cible V2",
  },

  de: {
    locale: "de",
    s1Title: "Prozentrechner",
    s1PctOf: "% von",
    s1Equals: "=",
    s1CalcBtn: "Berechnen",
    s1ClearBtn: "Löschen",
    s1ResultLabel: "Ergebnis",
    s1SaveBtn: "Speichern",
    s1SavedBtn: "Gespeichert!",
    s1StepsLabel: "Schritte:",
    s1Undefined: "Undefiniert (Division durch Null)",
    s1SummaryOf: "von",
    s1SummaryIs: "ist",

    s2Title: "Prozentrechnung in gängigen Ausdrücken",
    s2WhatIs: "wie viel sind",
    s2PctOf: "% von",
    s2IsWhatPctOf: "ist wie viel % von",
    s2Is: "ist",
    s2PctOfWhat: "% von welcher Zahl",
    s2CalcBtn: "Berechnen",
    s2ResultLabel: "Ergebnis",
    s2SaveBtn: "Speichern",
    s2SavedBtn: "Gespeichert!",
    s2StepsLabel: "Schritte:",
    s2Phrase1Summary: (res, p, v) => `${res} ist ${p}% von ${v}.`,
    s2Phrase2Summary: (v2, res, v1) => `${v2} ist ${res} von ${v1}.`,
    s2Phrase3Summary: (v2, p, res) => `${v2} ist ${p}% von ${res}.`,

    s3Title: "Prozentualer Differenzrechner",
    s3Val1Label: "Wert 1",
    s3Val2Label: "Wert 2",
    s3CalcBtn: "Berechnen",
    s3ClearBtn: "Löschen",
    s3ResultLabel: "Ergebnis",
    s3SaveBtn: "Speichern",
    s3SavedBtn: "Gespeichert!",
    s3Summary: (v1, v2, res) => `Die prozentuale Differenz zwischen ${v1} und ${v2} beträgt ${res}`,
    s3StepsLabel: "Schritte:",

    s4Title: "Prozentualer Änderungsrechner",
    s4Increase: "Erhöhung",
    s4Decrease: "Verringerung",
    s4Equals: "% =",
    s4CalcBtn: "Berechnen",
    s4ClearBtn: "Löschen",
    s4ResultLabel: "Ergebnis",
    s4SaveBtn: "Speichern",
    s4SavedBtn: "Gespeichert!",
    s4StepsLabel: "Schritte:",
    s4SummaryChange: (v1, mode, p, res) => `${v1} mit ${mode.toLowerCase()} um ${p}% = ${res}`,
    s4SummaryDirection: (v1, v2, p, mode) => `Von ${v1} auf ${v2} ist eine ${mode.toLowerCase()} um ${p}`,

    historyTitle: "Gespeicherte Berechnungen",
    clearHistoryBtn: "Alles Löschen",
    deleteTooltip: "Berechnung löschen",
    ariaPercentage: "Prozentsatz P",
    ariaBase: "Basiswert V1",
    ariaTarget: "Zielwert V2",
  },

  hi: {
    locale: "hi",
    s1Title: "प्रतिशत कैलकुलेटर",
    s1PctOf: "% का",
    s1Equals: "=",
    s1CalcBtn: "गणना करें",
    s1ClearBtn: "साफ़ करें",
    s1ResultLabel: "परिणाम",
    s1SaveBtn: "सहेजें",
    s1SavedBtn: "सहेजा गया!",
    s1StepsLabel: "चरण:",
    s1Undefined: "अपरिभाषित (शून्य से विभाजन)",
    s1SummaryOf: "का",
    s1SummaryIs: "है",

    s2Title: "सामान्य वाक्यांशों में प्रतिशत कैलकुलेटर",
    s2WhatIs: "कितना है",
    s2PctOf: "% का",
    s2IsWhatPctOf: "का कितना % है",
    s2Is: "है",
    s2PctOfWhat: "% किस संख्या का",
    s2CalcBtn: "गणना करें",
    s2ResultLabel: "परिणाम",
    s2SaveBtn: "सहेजें",
    s2SavedBtn: "सहेजा गया!",
    s2StepsLabel: "चरण:",
    s2Phrase1Summary: (res, p, v) => `${v} का ${p}% = ${res} है।`,
    s2Phrase2Summary: (v2, res, v1) => `${v2}, ${v1} का ${res} है।`,
    s2Phrase3Summary: (v2, p, res) => `${v2}, ${res} का ${p}% है।`,

    s3Title: "प्रतिशत अंतर कैलकुलेटर",
    s3Val1Label: "मान 1",
    s3Val2Label: "मान 2",
    s3CalcBtn: "गणना करें",
    s3ClearBtn: "साफ़ करें",
    s3ResultLabel: "परिणाम",
    s3SaveBtn: "सहेजें",
    s3SavedBtn: "सहेजा गया!",
    s3Summary: (v1, v2, res) => `${v1} और ${v2} के बीच प्रतिशत अंतर ${res} है`,
    s3StepsLabel: "चरण:",

    s4Title: "प्रतिशत परिवर्तन कैलकुलेटर",
    s4Increase: "वृद्धि",
    s4Decrease: "कमी",
    s4Equals: "% =",
    s4CalcBtn: "गणना करें",
    s4ClearBtn: "साफ़ करें",
    s4ResultLabel: "परिणाम",
    s4SaveBtn: "सहेजें",
    s4SavedBtn: "सहेजा गया!",
    s4StepsLabel: "चरण:",
    s4SummaryChange: (v1, mode, p, res) => `${v1} में ${p}% की ${mode} = ${res}`,
    s4SummaryDirection: (v1, v2, p, mode) => `${v1} से ${v2} तक ${p} की ${mode} है`,

    historyTitle: "सहेजी गई गणनाएं",
    clearHistoryBtn: "सभी साफ़ करें",
    deleteTooltip: "गणना हटाएं",
    ariaPercentage: "प्रतिशत P",
    ariaBase: "आधार मान V1",
    ariaTarget: "अंतिम मान V2",
  },

  pt: {
    locale: "pt",
    s1Title: "Calculadora de Porcentagem",
    s1PctOf: "% de",
    s1Equals: "=",
    s1CalcBtn: "Calcular",
    s1ClearBtn: "Limpar",
    s1ResultLabel: "Resultado",
    s1SaveBtn: "Salvar",
    s1SavedBtn: "Salvo!",
    s1StepsLabel: "Passos:",
    s1Undefined: "Indefinido (divisão por zero)",
    s1SummaryOf: "de",
    s1SummaryIs: "é",

    s2Title: "Calculadora de Porcentagem em Frases Comuns",
    s2WhatIs: "quanto é",
    s2PctOf: "% de",
    s2IsWhatPctOf: "é qual % de",
    s2Is: "é",
    s2PctOfWhat: "% de qual valor",
    s2CalcBtn: "Calcular",
    s2ResultLabel: "Resultado",
    s2SaveBtn: "Salvar",
    s2SavedBtn: "Salvo!",
    s2StepsLabel: "Passos:",
    s2Phrase1Summary: (res, p, v) => `${res} é ${p}% de ${v}.`,
    s2Phrase2Summary: (v2, res, v1) => `${v2} é ${res} de ${v1}.`,
    s2Phrase3Summary: (v2, p, res) => `${v2} é ${p}% de ${res}.`,

    s3Title: "Calculadora de Diferença Percentual",
    s3Val1Label: "Valor 1",
    s3Val2Label: "Valor 2",
    s3CalcBtn: "Calcular",
    s3ClearBtn: "Limpar",
    s3ResultLabel: "Resultado",
    s3SaveBtn: "Salvar",
    s3SavedBtn: "Salvo!",
    s3Summary: (v1, v2, res) => `A diferença percentual entre ${v1} e ${v2} é ${res}`,
    s3StepsLabel: "Passos:",

    s4Title: "Calculadora de Variação Percentual",
    s4Increase: "Aumento",
    s4Decrease: "Redução",
    s4Equals: "% =",
    s4CalcBtn: "Calcular",
    s4ClearBtn: "Limpar",
    s4ResultLabel: "Resultado",
    s4SaveBtn: "Salvar",
    s4SavedBtn: "Salvo!",
    s4StepsLabel: "Passos:",
    s4SummaryChange: (v1, mode, p, res) => `${v1} com ${mode.toLowerCase()} de ${p}% = ${res}`,
    s4SummaryDirection: (v1, v2, p, mode) => `De ${v1} para ${v2} representa uma ${mode.toLowerCase()} de ${p}`,

    historyTitle: "Cálculos Salvos",
    clearHistoryBtn: "Limpar Tudo",
    deleteTooltip: "Excluir cálculo",
    ariaPercentage: "Porcentagem P",
    ariaBase: "Valor base V1",
    ariaTarget: "Valor alvo V2",
  },
};

export function getPercentageOverlay(locale: string): PercentageLocaleOverlay {
  return PERCENTAGE_OVERLAYS[locale as Locale] || PERCENTAGE_OVERLAYS.en;
}
