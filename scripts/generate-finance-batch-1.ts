import * as fs from "fs";
import * as path from "path";

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// ----------------------------------------------------------------------
// 1. OVERLAYS GENERATION
// ----------------------------------------------------------------------
interface OverlayDef {
  title: string;
  description: string;
  inputs: Record<string, string>;
  outputs: Record<string, string>;
}

const OVERLAYS_DATA: Record<string, Record<string, OverlayDef>> = {
  "home-equity": {
    es: {
      title: "Calculadora de Préstamo con Garantía Hipotecaria",
      description: "Calcule pagos mensuales de préstamos sobre el valor neto de la vivienda, CLTV, amortización fija y capacidad de endeudamiento.",
      inputs: {
        homeValue: "Valor de Mercado de la Vivienda",
        currentMortgageBalance: "Saldo de Hipoteca Existente",
        loanAmount: "Monto del Préstamo con Garantía",
        interestRate: "Tasa de Interés Fija (%)",
        loanTermYears: "Plazo del Préstamo (Años)",
      },
      outputs: {
        monthlyPayment: "Pago Mensual (Capital e Interés)",
        totalInterest: "Interés Total Pagado",
        cltvRatio: "Ratio Préstamo-Valor Combinado (CLTV)",
        maxBorrowable: "Capacidad Máxima de Endeudamiento",
      },
    },
    fr: {
      title: "Calculateur de Prêt sur Valeur Nette Immobilière",
      description: "Calculez vos mensualités de prêt hypothécaire de second rang, ratio CLTV, amortissement fixe et capacité d'emprunt.",
      inputs: {
        homeValue: "Valeur Marchande Estimée",
        currentMortgageBalance: "Solde Hypothécaire Existant",
        loanAmount: "Montant du Prêt Sollicité",
        interestRate: "Taux d'Intérêt Fixe (%)",
        loanTermYears: "Durée du Prêt (Années)",
      },
      outputs: {
        monthlyPayment: "Mensualité (Capital et Intérêts)",
        totalInterest: "Intérêts Totaux",
        cltvRatio: "Ratio Prêt-Valeur Combiné (CLTV)",
        maxBorrowable: "Capacité d'Emprunt Maximale",
      },
    },
    de: {
      title: "Eigenkapitaldarlehen-Rechner",
      description: "Berechnen Sie monatliche Raten für Eigenkapitaldarlehen (Zweitgrundschuld), CLTV-Beleihungsquote und Gesamtzinsen.",
      inputs: {
        homeValue: "Geschätzter Immobilienwert",
        currentMortgageBalance: "Bestehende Restschuld (1. Rang)",
        loanAmount: "Gewünschter Darlehensbetrag",
        interestRate: "Fester Sollzinssatz (%)",
        loanTermYears: "Laufzeit (Jahre)",
      },
      outputs: {
        monthlyPayment: "Monatliche Rate (Zins & Tilgung)",
        totalInterest: "Gesamte Zinskosten",
        cltvRatio: "Kombinierte Beleihungsquote (CLTV)",
        maxBorrowable: "Maximaler Beleihungsrahmen",
      },
    },
    hi: {
      title: "होम इक्विटी लोन कैलकुलेटर",
      description: "होम इक्विटी लोन की मासिक किस्त, CLTV अनुपात, निश्चित ब्याज और अधिकतम ऋण सीमा की गणना करें।",
      inputs: {
        homeValue: "घर का अनुमानित बाजार मूल्य",
        currentMortgageBalance: "मौजूदा होम लोन शेष",
        loanAmount: "वांछित होम इक्विटी ऋण राशि",
        interestRate: "निश्चित ब्याज दर (%)",
        loanTermYears: "ऋण अवधि (वर्ष)",
      },
      outputs: {
        monthlyPayment: "मासिक किस्त (मूलधन और ब्याज)",
        totalInterest: "कुल देय ब्याज",
        cltvRatio: "संयुक्त एलटीवी अनुपात (CLTV)",
        maxBorrowable: "अधिकतम ऋण पात्रता",
      },
    },
    pt: {
      title: "Calculadora de Empréstimo com Garantia de Imóvel",
      description: "Calcule parcelas mensais de crédito com garantia imobiliária (home equity), CLTV e juros totais amortizados.",
      inputs: {
        homeValue: "Valor de Mercado do Imóvel",
        currentMortgageBalance: "Saldo Devedor do Financiamento Atual",
        loanAmount: "Valor do Empréstimo com Garantia",
        interestRate: "Taxa de Juros Fixa (%)",
        loanTermYears: "Prazo do Empréstimo (Anos)",
      },
      outputs: {
        monthlyPayment: "Parcela Mensal (Amortização e Juros)",
        totalInterest: "Juros Totais Pagos",
        cltvRatio: "Índice Empréstimo-Garantia (CLTV)",
        maxBorrowable: "Capacidade Máxima de Empréstimo",
      },
    },
  },
  heloc: {
    es: {
      title: "Calculadora de Línea de Crédito Hipotecario (HELOC)",
      description: "Calcule pagos en período de disposición y amortización, impacto de tasas variables y riesgo de choque de pago.",
      inputs: {
        homeValue: "Valor Estimado de la Vivienda",
        firstMortgageBalance: "Saldo de Hipoteca Primaria",
        creditLine: "Línea de Crédito Solicitada",
        drawInterestRate: "Tasa de Interés en Disposición (%)",
        repayInterestRate: "Tasa de Interés en Repago (%)",
      },
      outputs: {
        drawMonthlyPayment: "Pago Mensual en Disposición (Solo Interés)",
        repayMonthlyPayment: "Pago Mensual en Repago (P&I)",
        totalInterest: "Interés Total Estimado",
      },
    },
    fr: {
      title: "Calculateur de Marge de Crédit Hypothécaire (HELOC)",
      description: "Estimez vos paiements en période de tirage et de remboursement, avec simulation de hausse de taux variable.",
      inputs: {
        homeValue: "Valeur Estimée du Bien",
        firstMortgageBalance: "Solde Première Hypothèque",
        creditLine: "Montant de la Marge Demandé",
        drawInterestRate: "Taux d'Intérêt en Période de Tirage (%)",
        repayInterestRate: "Taux d'Intérêt en Remboursement (%)",
      },
      outputs: {
        drawMonthlyPayment: "Mensualité en Tirage (Intérêts Seuls)",
        repayMonthlyPayment: "Mensualité en Remboursement (P&I)",
        totalInterest: "Intérêts Totaux Prévus",
      },
    },
    de: {
      title: "HELOC-Kreditlinien-Rechner",
      description: "Berechnen Sie Zinszahlungen während der Ziehungsphase und Tilgungsraten in der Rückzahlungsphase für variable Kreditlinien.",
      inputs: {
        homeValue: "Immobilienwert",
        firstMortgageBalance: "Ersthypotheken-Restschuld",
        creditLine: "Kreditrahmenlinie",
        drawInterestRate: "Zinssatz Ziehungsphase (%)",
        repayInterestRate: "Zinssatz Rückzahlungsphase (%)",
      },
      outputs: {
        drawMonthlyPayment: "Monatliche Zinsrate (Ziehungsphase)",
        repayMonthlyPayment: "Monatliche Tilgungsrate (Rückzahlung)",
        totalInterest: "Gesamtzinsen",
      },
    },
    hi: {
      title: "HELOC कैलकुलेटर (क्रेडिट लाइन)",
      description: "HELOC की निकासी अवधि (ड्रॉ पीरियड) और पुनर्भुगतान अवधि की मासिक किस्तों एवं ब्याज की गणना करें।",
      inputs: {
        homeValue: "घर का अनुमानित मूल्य",
        firstMortgageBalance: "प्राथमिक बंधक ऋण शेष",
        creditLine: "क्रेडिट लाइन सीमा",
        drawInterestRate: "निकासी ब्याज दर (%)",
        repayInterestRate: "पुनर्भुगतान ब्याज दर (%)",
      },
      outputs: {
        drawMonthlyPayment: "निकासी अवधि मासिक भुगतान (केवल ब्याज)",
        repayMonthlyPayment: "पुनर्भुगतान मासिक किस्त (मूलधन + ब्याज)",
        totalInterest: "कुल अनुमानित ब्याज",
      },
    },
    pt: {
      title: "Calculadora de Linha de Crédito com Garantia (HELOC)",
      description: "Estime parcelas no período de saque e amortização para linhas de crédito com garantia imobiliária.",
      inputs: {
        homeValue: "Valor de Avaliação do Imóvel",
        firstMortgageBalance: "Saldo da Primeira Hipoteca",
        creditLine: "Limite de Crédito Solicitado",
        drawInterestRate: "Taxa de Juros no Saque (%)",
        repayInterestRate: "Taxa de Juros na Amortização (%)",
      },
      outputs: {
        drawMonthlyPayment: "Pagamento Mensal no Saque (Só Juros)",
        repayMonthlyPayment: "Parcela Mensal na Amortização (P&I)",
        totalInterest: "Total de Juros Estimados",
      },
    },
  },
  "down-payment": {
    es: {
      title: "Calculadora de Entrada y Pago Inicial Hipotecario",
      description: "Compare tramos de entrada del 3% al 20%, cancelación de seguro PMI y costo de oportunidad de inversión.",
      inputs: {
        homePrice: "Precio de Compra de la Vivienda",
        downPaymentPercent: "Porcentaje de Entrada (%)",
        interestRate: "Tasa de Interés Hipotecaria (%)",
        loanTermYears: "Plazo del Préstamo (Años)",
      },
      outputs: {
        downPaymentAmount: "Monto de la Entrada",
        loanAmount: "Monto del Préstamo",
        monthlyPayment: "Pago Mensual Base",
        pmiMonthly: "Seguro Hipotecario Privado (PMI)",
      },
    },
    fr: {
      title: "Calculateur d'Apport Personnel Immobilier",
      description: "Simulez vos tranches d'apport (3% à 20%), suppression de l'assurance PMI et coût d'opportunité d'épargne.",
      inputs: {
        homePrice: "Prix d'Acquisition du Bien",
        downPaymentPercent: "Pourcentage d'Apport (%)",
        interestRate: "Taux d'Intérêt du Prêt (%)",
        loanTermYears: "Durée du Financement (Années)",
      },
      outputs: {
        downPaymentAmount: "Montant de l'Apport Personnel",
        loanAmount: "Montant du Prêt Emprunté",
        monthlyPayment: "Mensualité de Base",
        pmiMonthly: "Prime d'Assurance Emprunteur (PMI)",
      },
    },
    de: {
      title: "Eigenkapitalrechner Immobilienkauf",
      description: "Vergleichen Sie Eigenkapitalquoten (3% bis 20%), Tilgungspläne und Opportunitätskosten von Anlagekapital.",
      inputs: {
        homePrice: "Immobilien-Kaufpreis",
        downPaymentPercent: "Eigenkapitalanteil (%)",
        interestRate: "Hypothekenzins (%)",
        loanTermYears: "Darlehenslaufzeit (Jahre)",
      },
      outputs: {
        downPaymentAmount: "Eigenkapitalbetrag",
        loanAmount: "Nettodarlehensbetrag",
        monthlyPayment: "Monatliche Basisrate",
        pmiMonthly: "Zusätzliche Versicherungskosten",
      },
    },
    hi: {
      title: "डाउन पेमेंट कैलकुलेटर (गृह ऋण अग्रिम भुगतान)",
      description: "3% से 20% तक डाउन पेमेंट, मासिक बचत और बीमा लागत की विस्तृत तुलना करें।",
      inputs: {
        homePrice: "मकान का कुल क्रय मूल्य",
        downPaymentPercent: "डाउन पेमेंट प्रतिशत (%)",
        interestRate: "ऋण ब्याज दर (%)",
        loanTermYears: "ऋण अवधि (वर्ष)",
      },
      outputs: {
        downPaymentAmount: "डाउन पेमेंट की नकद राशि",
        loanAmount: "आवश्यक ऋण राशि",
        monthlyPayment: "मासिक किस्त",
        pmiMonthly: "मासिक बीमा लागत",
      },
    },
    pt: {
      title: "Calculadora de Entrada Imobiliária",
      description: "Compare faixas de entrada de 3% a 20%, custos de seguro habitacional e custo de oportunidade de capital.",
      inputs: {
        homePrice: "Preço de Compra do Imóvel",
        downPaymentPercent: "Percentual de Entrada (%)",
        interestRate: "Taxa de Juros do Financiamento (%)",
        loanTermYears: "Prazo do Empréstimo (Anos)",
      },
      outputs: {
        downPaymentAmount: "Valor da Entrada",
        loanAmount: "Valor do Financiamento",
        monthlyPayment: "Parcela Mensal Básica",
        pmiMonthly: "Seguro Habitacional Mensal",
      },
    },
  },
  "rent-vs-buy": {
    es: {
      title: "Calculadora de Alquilar vs. Comprar Vivienda",
      description: "Calcule el punto de equilibrio financiero, costos irrecuperables, regla del 5% y divergencia patrimonial a 30 años.",
      inputs: {
        monthlyRent: "Alquiler Mensual Inicial",
        homePrice: "Precio de Compra de la Vivienda",
        downPaymentPercent: "Entrada Inicial (%)",
        mortgageRate: "Tasa de Interés Hipotecaria (%)",
        timeHorizonYears: "Horizonte Temporal (Años)",
      },
      outputs: {
        breakevenYears: "Años para Punto de Equilibrio",
        totalBuyingCost: "Costo Total de Comprar",
        totalRentingCost: "Costo Total de Alquilar",
        netWorthDifference: "Diferencia Patrimonial Neta",
      },
    },
    fr: {
      title: "Calculateur Acheter ou Louer son Logement",
      description: "Déterminez l'horizon de rentabilité financière, les coûts irrécupérables (règle des 5%) et l'évolution patrimoniale.",
      inputs: {
        monthlyRent: "Loyer Mensuel Initial",
        homePrice: "Prix d'Achat du Logement",
        downPaymentPercent: "Apport Personnel (%)",
        mortgageRate: "Taux d'Intérêt du Crédit (%)",
        timeHorizonYears: "Horizon d'Analyse (Années)",
      },
      outputs: {
        breakevenYears: "Point d'Équilibre (Années)",
        totalBuyingCost: "Coût Global Achat",
        totalRentingCost: "Coût Global Location",
        netWorthDifference: "Différentiel de Valeur Nette",
      },
    },
    de: {
      title: "Mieten oder Kaufen Rechner",
      description: "Ermitteln Sie den finanziellen Break-Even-Zeitpunkt, unwiederbringliche Kosten (5%-Regel) und 30-Jahre-Vermögensvergleich.",
      inputs: {
        monthlyRent: "Monatliche Kaltmiete",
        homePrice: "Immobilien-Kaufpreis",
        downPaymentPercent: "Eigenkapitalquote (%)",
        mortgageRate: "Hypothekenzinssatz (%)",
        timeHorizonYears: "Betrachtungszeitraum (Jahre)",
      },
      outputs: {
        breakevenYears: "Break-Even-Horizont (Jahre)",
        totalBuyingCost: "Gesamtkosten Kauf",
        totalRentingCost: "Gesamtkosten Miete",
        netWorthDifference: "Vermögensdifferenz",
      },
    },
    hi: {
      title: "किराया बनाम खरीद कैलकुलेटर (Rent vs. Buy)",
      description: "घर खरीदने बनाम किराए पर रहने के वित्तीय लाभ, ब्रेक-ईवन अवधि और 30 साल की संपत्ति निर्माण तुलना की गणना करें।",
      inputs: {
        monthlyRent: "प्रारंभिक मासिक किराया",
        homePrice: "मकान का खरीद मूल्य",
        downPaymentPercent: "डाउन पेमेंट (%)",
        mortgageRate: "होम लोन ब्याज दर (%)",
        timeHorizonYears: "समय सीमा (वर्ष)",
      },
      outputs: {
        breakevenYears: "ब्रेक-ईवन समय सीमा (वर्ष)",
        totalBuyingCost: "खरीद की कुल लागत",
        totalRentingCost: "किराए की कुल लागत",
        netWorthDifference: "कुल संपत्ति में अंतर",
      },
    },
    pt: {
      title: "Calculadora Alugar ou Comprar Imóvel",
      description: "Analise o ponto de equilíbrio financeiro, custos irrecuperáveis (regra dos 5%) e divergência patrimonial a longo prazo.",
      inputs: {
        monthlyRent: "Aluguel Mensal Inicial",
        homePrice: "Preço do Imóvel",
        downPaymentPercent: "Entrada (%)",
        mortgageRate: "Taxa de Juros Hipotecária (%)",
        timeHorizonYears: "Horizonte de Tempo (Anos)",
      },
      outputs: {
        breakevenYears: "Ponto de Equilíbrio (Anos)",
        totalBuyingCost: "Custo Total de Compra",
        totalRentingCost: "Custo Total de Aluguel",
        netWorthDifference: "Diferença Patrimonial Líquida",
      },
    },
  },
  va: {
    es: {
      title: "Calculadora de Hipotecas Militares VA",
      description: "Calcule pagos mensuales de préstamos VA, tarifa de financiamiento (Funding Fee), exenciones y derecho de garantía.",
      inputs: {
        homePrice: "Precio de Compra de la Vivienda",
        downPayment: "Pago Inicial (Opcional $)",
        firstTimeUse: "Primer Uso del Beneficio VA",
        interestRate: "Tasa de Interés Fija (%)",
        loanTermYears: "Plazo del Préstamo (Años)",
      },
      outputs: {
        vaFundingFee: "Tarifa de Financiamiento VA (Funding Fee)",
        totalLoanWithFee: "Préstamo Total Financiado",
        monthlyPiPayment: "Pago Mensual (Capital e Interés)",
      },
    },
    fr: {
      title: "Calculateur de Prêt Immobilier Militaire VA",
      description: "Estimez vos mensualités de prêt VA, frais de financement (Funding Fee), exonérations d'invalidité et droits garantis.",
      inputs: {
        homePrice: "Prix d'Acquisition du Logement",
        downPayment: "Apport Initial (Optionnel $)",
        firstTimeUse: "Première Utilisation du Droit VA",
        interestRate: "Taux d'Intérêt Fixe (%)",
        loanTermYears: "Durée du Financement (Années)",
      },
      outputs: {
        vaFundingFee: "Frais de Financement VA (Funding Fee)",
        totalLoanWithFee: "Prêt Total Financement Inclus",
        monthlyPiPayment: "Mensualité Principale (Capital et Intérêts)",
      },
    },
    de: {
      title: "VA-Veteranen-Hypothekenrechner",
      description: "Berechnen Sie monatliche Raten für US-Veteranen-Darlehen (VA Loans), Gebührenstrukturen und Zinsersparnisse.",
      inputs: {
        homePrice: "Immobilien-Kaufpreis",
        downPayment: "Eigenkapital (Optional $)",
        firstTimeUse: "Erstmalige Nutzung des VA-Rechts",
        interestRate: "Fester Sollzins (%)",
        loanTermYears: "Darlehenslaufzeit (Jahre)",
      },
      outputs: {
        vaFundingFee: "VA-Finanzierungsgebühr (Funding Fee)",
        totalLoanWithFee: "Gesamtdarlehen inkl. Gebühr",
        monthlyPiPayment: "Monatliche Rate (P&I)",
      },
    },
    hi: {
      title: "VA मॉर्गेज कैलकुलेटर (सैन्य आवास ऋण)",
      description: "VA सैन्य आवास ऋण की मासिक किस्त, फंडिंग शुल्क, छूट और ब्याज बचत की सटीक गणना करें।",
      inputs: {
        homePrice: "घर का खरीद मूल्य",
        downPayment: "डाउन पेमेंट (वैकल्पिक $)",
        firstTimeUse: "पहली बार उपयोग",
        interestRate: "निश्चित ब्याज दर (%)",
        loanTermYears: "ऋण अवधि (वर्ष)",
      },
      outputs: {
        vaFundingFee: "VA फंडिंग शुल्क (Funding Fee)",
        totalLoanWithFee: "शुल्क सहित कुल ऋण",
        monthlyPiPayment: "मासिक भुगतान (मूलधन + ब्याज)",
      },
    },
    pt: {
      title: "Calculadora de Financiamento Militar VA",
      description: "Calcule parcelas de financiamento militar VA, taxa de adesão (Funding Fee), isenções e vantagens de juros.",
      inputs: {
        homePrice: "Preço de Compra do Imóvel",
        downPayment: "Entrada (Opcional $)",
        firstTimeUse: "Primeiro Uso do Benefício VA",
        interestRate: "Taxa de Juros Fixa (%)",
        loanTermYears: "Prazo do Financiamento (Anos)",
      },
      outputs: {
        vaFundingFee: "Taxa de Financiamento VA (Funding Fee)",
        totalLoanWithFee: "Total Financiado com Taxa",
        monthlyPiPayment: "Parcela Mensal (Capital e Juros)",
      },
    },
  },
};

// Write overlay files
for (const [calcKey, locales] of Object.entries(OVERLAYS_DATA)) {
  const dir = `src/i18n/overlays/${calcKey}`;
  ensureDir(dir);

  for (const [locale, data] of Object.entries(locales)) {
    const fileContent = `export const ${locale.toUpperCase()}_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY = ${JSON.stringify(data, null, 2)};\n`;
    fs.writeFileSync(path.join(dir, `${locale}.ts`), fileContent, "utf-8");
  }

  // index.ts
  const indexContent = `import { ES_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY } from "./es";
import { FR_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY } from "./fr";
import { DE_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY } from "./de";
import { HI_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY } from "./hi";
import { PT_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY } from "./pt";

export function get${calcKey.split("-").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("")}Overlay(locale: string) {
  switch (locale) {
    case "es": return ES_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY;
    case "fr": return FR_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY;
    case "de": return DE_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY;
    case "hi": return HI_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY;
    case "pt": return PT_${calcKey.replace(/-/g, "_").toUpperCase()}_OVERLAY;
    default: return null;
  }
}
`;
  fs.writeFileSync(path.join(dir, "index.ts"), indexContent, "utf-8");
}

console.log("All Overlays created.");
