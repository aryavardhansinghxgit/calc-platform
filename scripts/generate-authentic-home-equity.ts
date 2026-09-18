import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

interface Translations {
  h1: string;
  metaTitle: string;
  metaDesc: string;
  keywords: string[];
  h2s: string[];
  h3s: string[];
  faqs: { question: string; answer: string }[];
  p1: string;
  p2: string;
  overlayInputs: Record<string, string>;
  overlayOutputs: Record<string, string>;
}

const LOCALE_DATA: Record<typeof LOCALES[number], Translations> = {
  es: {
    h1: "Calculadora de Préstamo con Garantía Hipotecaria",
    metaTitle: "Calculadora de Préstamo con Garantía Hipotecaria — Cuotas, CLTV y Capacidad",
    metaDesc: "Calcule cuotas fijas de préstamos sobre el valor neto de la vivienda, CLTV, TAE real, amortización y capacidad de endeudamiento.",
    keywords: ["calculadora de prestamo con garantia hipotecaria", "segunda hipoteca", "calculadora cltv", "valor neto vivienda"],
    h2s: [
      "1. ¿Qué es una Calculadora de Préstamo con Garantía Hipotecaria?",
      "2. Cómo Utilizar la Calculadora de Préstamo con Garantía Hipotecaria",
      "3. Valor Neto de la Vivienda y Ratio Préstamo-Valor Combinado (CLTV)",
      "4. Modo A frente a Modo B: Préstamo Específico frente a Capacidad Máxima",
      "5. Fórmula de la Cuota Mensual Fija",
      "6. Comportamiento del Motor con Interés Cero",
      "7. Tabla de Amortización de la Segunda Hipoteca",
      "8. TAE Real y Costes de Cierre",
      "9. Modos de Tratamiento de los Costes de Cierre",
      "10. Ratio Deuda-Ingresos (DTI) y Preparación Crediticia",
      "11. Puntuación Crediticia y Niveles de Calificación CLTV",
      "12. Préstamo con Garantía Hipotecaria frente a HELOC",
      "13. Préstamo con Garantía frente a Refinanciación con Retiro de Efectivo",
      "14. Pagos Extra de Capital y Ahorro en Intereses",
      "15. Estimación de Deducibilidad Fiscal (Normativa IRS)",
      "16. Previsión de Valor Añadido por Reformas en el Hogar",
      "17. Riesgos de un Préstamo con Garantía Hipotecaria",
      "18. Escenarios de Patrimonio Negativo o Vivienda Bajo el Agua",
      "19. Penalizaciones por Amortización Anticipada",
      "20. Costes de Cierre y Plazos de Desembolso",
      "21. Errores Comunes que Deben Evitarse",
      "22. Resumen de Fórmulas Fundamentales"
    ],
    h3s: [
      "Modo A — Importe de Préstamo Específico",
      "Modo B — Capacidad Máxima según LTV"
    ],
    faqs: [
      { question: "¿Qué es un préstamo con garantía hipotecaria y cómo funciona?", answer: "Un préstamo con garantía hipotecaria es una segunda hipoteca a tipo fijo que permite obtener una suma global utilizando el valor neto acumulado de su vivienda como garantía." },
      { question: "¿Cuánto puedo solicitar con un préstamo sobre el valor neto de la vivienda?", answer: "La mayoría de las entidades financieras permiten un CLTV máximo del 80% al 85% del valor de tasación de la vivienda menos el saldo de su primera hipoteca." },
      { question: "¿Qué es el CLTV y cómo se calcula?", answer: "El CLTV (Combined Loan-to-Value) es la suma de todas las hipotecas sobre la propiedad dividida entre el valor de mercado tasado de la vivienda." },
      { question: "¿Cómo se calcula la cuota mensual de un préstamo con garantía hipotecaria?", answer: "Se calcula mediante la fórmula estándar de amortización fija basada en el capital prestado, el tipo de interés mensual y el plazo en meses." },
      { question: "¿Qué puntuación crediticia se requiere para calificar?", answer: "Generalmente se requiere una puntuación de crédito de 620 o superior, aunque los mejores tipos de interés exigen 700 o más." },
      { question: "¿En qué se diferencia un préstamo con garantía hipotecaria de una línea de crédito HELOC?", answer: "El préstamo entrega una suma fija con cuota y tipo de interés fijos, mientras que la HELOC es una línea de crédito renovable con tipo variable." },
      { question: "¿En qué se diferencia de una refinanciación con retiro de efectivo (cash-out)?", answer: "La refinanciación sustituye su primera hipoteca por una nueva de mayor importe, mientras que el préstamo con garantía hipotecaria deja intacta su primera hipoteca." },
      { question: "¿Son deducibles de impuestos los intereses del préstamo con garantía hipotecaria?", answer: "Según las normas actuales del IRS, los intereses solo son deducibles si los fondos se utilizan para comprar, construir o mejorar sustancialmente la vivienda que garantiza el préstamo." },
      { question: "¿Puedo amortizar un préstamo con garantía hipotecaria por anticipado?", answer: "Sí, la mayoría de los préstamos permiten amortizaciones anticipadas para reducir el plazo y el coste total de intereses sin penalización." },
      { question: "¿Cuáles son los costes de cierre típicos de una segunda hipoteca?", answer: "Suelen oscilar entre el 2% y el 5% del importe del préstamo e incluyen tasación, costes de originación, búsqueda de títulos y comisiones notariales." },
      { question: "¿Qué ocurre si los precios de la vivienda bajan y el saldo supera el valor del inmueble?", answer: "Entraría en patrimonio negativo (underwater). La obligación de pago mensual permanece intacta, pero no podrá refinanciar ni vender sin aportar capital." },
      { question: "¿Cuánto tiempo se tarda en aprobar y desembolsar el préstamo?", answer: "El proceso suele durar entre 2 y 6 semanas debido a los requisitos de tasación, verificación de ingresos y suscripción hipotecaria." }
    ],
    p1: "Calcule cuotas fijas de préstamos sobre el valor neto de la vivienda, capacidad máxima de endeudamiento, ratio préstamo-valor combinado (CLTV), TAE real, amortización en dos fases, ahorro por pagos extraordinarios, ratio deuda-ingresos (DTI) y previsiones de valor añadido por reformas.",
    p2: "Una calculadora de préstamos con garantía hipotecaria estima cuánto puede pedir prestado contra el valor neto acumulado en su propiedad y modela el plan de pagos fijos mensuales para una segunda hipoteca.",
    overlayInputs: {
      homeValue: "Valor Estimado de la Vivienda",
      currentMortgageBalance: "Saldo de Hipoteca Existente",
      loanAmount: "Importe del Préstamo con Garantía",
      interestRate: "Tipo de Interés Fijo (%)",
      loanTermYears: "Plazo del Préstamo (Años)"
    },
    overlayOutputs: {
      monthlyPayment: "Pago Mensual Fijo",
      maxBorrowableEquity: "Patrimonio Máximo Prestable",
      newCltvPct: "Nuevo CLTV tras Préstamo",
      totalInterestPaid: "Interés Total Pagado",
      trueApr: "TAE Real"
    }
  },
  fr: {
    h1: "Calculateur de Prêt sur Valeur Nette Immobilière",
    metaTitle: "Calculateur de Prêt sur Valeur Nette — Mensualités, CLTV et Capacité",
    metaDesc: "Estimez vos mensualités de prêt sur valeur nette immobilière, votre ratio CLTV, votre TAEG réel et votre capacité d'emprunt maximale.",
    keywords: ["calculateur pret sur valeur nette", "deuxieme hypotheque", "calculateur cltv", "pret hypothecaire fixe"],
    h2s: [
      "1. Qu'est-ce qu'un Calculateur de Prêt sur Valeur Nette Immobilière ?",
      "2. Comment Utiliser le Calculateur de Prêt sur Valeur Nette",
      "3. Valeur Nette Immobilière et Ratio Prêt-Valeur Combiné (CLTV)",
      "4. Mode A vs Mode B : Montant Spécifié vs Capacité Maximale",
      "5. Formule de Calcul de la Mensualité Fixe",
      "6. Comportement du Moteur à Taux d'Intérêt Nul",
      "7. Tableau d'Amortissement de la Seconde Hypothèque",
      "8. TAEG Réel et Frais de Clôture",
      "9. Modes de Traitement des Frais de Clôture",
      "10. Ratio Dette/Revenu (DTI) et Éligibilité",
      "11. Score de Crédit et Paliers de Qualification CLTV",
      "12. Prêt sur Valeur Nette vs Marge HELOC",
      "13. Prêt sur Valeur Nette vs Refinancement avec Retrait de Fonds",
      "14. Remboursements Anticipés et Économies d'Intérêts",
      "15. Estimateur de Déductibilité Fiscale (Règles IRS)",
      "16. Prévision de Valeur Ajoutée suite à Rénovations",
      "17. Risques Liés à un Prêt sur Valeur Nette",
      "18. Scénarios d'Équité Négative Immobilière",
      "19. Pénalités de Remboursement Anticipé",
      "20. Frais de Clôture et Délais de Déblocage",
      "21. Erreurs Courantes à Éviter",
      "22. Synthèse des Formules Fondamentales"
    ],
    h3s: [
      "Mode A — Montant de Prêt Spécifié",
      "Mode B — Capacité Maximale selon CLTV"
    ],
    faqs: [
      { question: "Qu'est-ce qu'un prêt sur valeur nette et comment fonctionne-t-il ?", answer: "Il s'agit d'une deuxième hypothèque à taux fixe permettant d'obtenir une somme forfaitaire garantie par la valeur nette accumulée dans votre propriété." },
      { question: "Combien puis-je emprunter avec un prêt sur valeur nette ?", answer: "La plupart des prêteurs autorisent un ratio CLTV maximal de 80 % à 85 % de la valeur estimée de la maison, déduction faite de votre première hypothèque." },
      { question: "Qu'est-ce que le ratio CLTV et comment est-il calculé ?", answer: "Le ratio CLTV (Combined Loan-to-Value) représente la somme de toutes les hypothèques divisée par la valeur marchande expertisée de la propriété." },
      { question: "Comment est calculée la mensualité fixe ?", answer: "Elle utilise la formule mathématique standard d'amortissement à taux fixe en fonction du capital emprunté, du taux mensuel et du nombre de mensualités." },
      { question: "Quel score de crédit est requis pour se qualifier ?", answer: "Un score de crédit d'au moins 620 est généralement exigé, les conditions les plus avantageuses nécessitant 700 ou plus." },
      { question: "Quelle est la différence entre un prêt sur valeur nette et une marge HELOC ?", answer: "Le prêt sur valeur nette offre un versement unique à mensualité et taux fixes, alors que la HELOC est une ligne de crédit renouvelable à taux variable." },
      { question: "Quelle est la différence avec un refinancement avec retrait de fonds ?", answer: "Le refinancement remplace l'hypothèque existante par une nouvelle d'un montant supérieur, tandis que le prêt sur valeur nette conserve la première hypothèque." },
      { question: "Les intérêts d'un prêt sur valeur nette sont-ils déductibles d'impôt ?", answer: "Selon les règles actuelles, les intérêts ne sont déductibles que si les fonds servent à acheter, construire ou améliorer substantiellement la résidence garantissant le prêt." },
      { question: "Puis-je rembourser mon prêt par anticipation ?", answer: "Oui, la majorité des contrats permettent d'effectuer des remboursements supplémentaires de capital pour réduire la durée et le coût total en intérêts." },
      { question: "Quels sont les frais de clôture habituels ?", answer: "Ils se situent généralement entre 2 % et 5 % du montant emprunté et couvrent l'expertise, les frais de dossier, l'assurance titre et les frais notariés." },
      { question: "Que se passe-t-il si les prix de l'immobilier baissent ?", answer: "Vous pourriez vous retrouver en équité négative. Les mensualités restent dues, mais vous ne pourrez pas vendre sans couvrir le solde résiduel." },
      { question: "Quel est le délai habituel d'approbation et de versement ?", answer: "Le traitement complet prend habituellement entre 2 et 6 semaines en raison des étapes d'évaluation et de vérification des revenus." }
    ],
    p1: "Calculez vos mensualités de prêt sur valeur nette, votre capacité d'emprunt maximale, votre ratio prêt-valeur combiné (CLTV), votre TAEG réel et vos économies de remboursement anticipé.",
    p2: "Ce calculateur modélise avec précision les mensualités fixes et les tableaux d'amortissement d'une seconde hypothèque basée sur la valeur nette de votre bien immobilier.",
    overlayInputs: {
      homeValue: "Valeur Estimée de la Propriété",
      currentMortgageBalance: "Solde Hypothécaire Existant",
      loanAmount: "Montant du Prêt Souhaité",
      interestRate: "Taux d'Intérêt Fixe (%)",
      loanTermYears: "Durée du Prêt (Années)"
    },
    overlayOutputs: {
      monthlyPayment: "Mensualité Fixe",
      maxBorrowableEquity: "Capacité d'Emprunt Maximale",
      newCltvPct: "Nouveau Ratio CLTV",
      totalInterestPaid: "Intérêts Totaux Payés",
      trueApr: "TAEG Réel"
    }
  },
  de: {
    h1: "Eigenkapitaldarlehen-Rechner (Home Equity)",
    metaTitle: "Eigenkapitaldarlehen-Rechner — Raten, CLTV & Beleihungsgrenze",
    metaDesc: "Berechnen Sie monatliche Raten für Immobilieneigenkapitaldarlehen, CLTV-Beleihungsauslauf, Effektivzins und maximale Kreditkapazität.",
    keywords: ["eigenkapitaldarlehen rechner", "zweithypothek", "cltv rechner", "immobiliendarlehen"],
    h2s: [
      "1. Was ist ein Eigenkapitaldarlehen-Rechner?",
      "2. Anleitung zur Bedienung des Rechners",
      "3. Immobilieneigenkapital und kombinierter Beleihungsauslauf (CLTV)",
      "4. Modus A vs. Modus B: Wunschbetrag vs. Maximale Beleihungskapazität",
      "5. Mathematische Zins- und Tilgungsformel",
      "6. Verhalten bei Nullzins-Szenarien",
      "7. Vollständiger Tilgungsplan der Zweithypothek",
      "8. Effektiver Jahreszins und Abschlusskosten",
      "9. Verrechnungsmethoden für Nebenkosten",
      "10. Schuldendienstquote (DTI) und Bonitätsprüfung",
      "11. Kreditwürdigkeit und CLTV-Schwellenwerte",
      "12. Eigenkapitaldarlehen vs. HELOC-Kreditrahmen",
      "13. Eigenkapitaldarlehen vs. Cash-Out-Umschuldung",
      "14. Sondertilgungen und Zinsersparnis",
      "15. Steuerliche Absetzbarkeit von Schuldzinsen (IRS-Richtlinien)",
      "16. Wertsteigerungsprognose durch Modernisierungen",
      "17. Finanzielle Risiken eines Eigenkapitaldarlehens",
      "18. Risiken bei sinkenden Immobilienpreisen (Unterdeckung)",
      "19. Vorfälligkeitsentschädigungen",
      "20. Nebenkosten und Bearbeitungszeiten",
      "21. Häufige Fehler bei der Darlehensberechnung vermeiden",
      "22. Übersicht der Kernformeln"
    ],
    h3s: [
      "Modus A — Spezifischer Darlehensbetrag",
      "Modus B — Maximale Beleihungskapazität"
    ],
    faqs: [
      { question: "Was ist ein Eigenkapitaldarlehen und wie funktioniert es?", answer: "Ein Eigenkapitaldarlehen ist ein Festzinsdarlehen (Zweithypothek), bei dem Sie eine Einmalzahlung gegen das in Ihrer Immobilie gebundene Eigenkapital aufnehmen." },
      { question: "Wie viel Darlehen kann ich aufnehmen?", answer: "Die meisten Kreditinstitute finanzieren bis zu einer kombinierten Beleihungsgrenze (CLTV) von 80 % bis 85 % des aktuellen Marktwerts abzüglich der Ersthypothek." },
      { question: "Was bedeutet CLTV und wie wird er berechnet?", answer: "Der CLTV (Combined Loan-to-Value) setzt die Summe aller auf der Immobilie lastenden Darlehen ins Verhältnis zum ermittelten Verkehrswert." },
      { question: "Wie wird die feste monatliche Rate berechnet?", answer: "Die Rate wird mittels Standard-Annuitätenformel aus Nettodarlehensbetrag, monatlichem Zinssatz und Laufzeit in Monaten abgeleitet." },
      { question: "Welche Bonität wird für eine Bewilligung benötigt?", answer: "In der Regel ist ein solider Bonitätswert (Credit Score ab ca. 620) erforderlich, Bestkonditionen erfordern 700 Punkte oder mehr." },
      { question: "Wie unterscheidet sich ein Eigenkapitaldarlehen von einem HELOC?", answer: "Das Darlehen wird als fester Einmalbetrag mit festen Zinsen ausgezahlt, während ein HELOC ein flexibler Abrufkredit mit variablen Zinsen ist." },
      { question: "Worin liegt der Unterschied zur Cash-Out-Umschuldung?", answer: "Die Umschuldung ersetzt die bestehende Ersthypothek komplett, während das Eigenkapitaldarlehen die günstige Ersthypothek unangetastet lässt." },
      { question: "Sind die Kreditzinsen steuerlich absetzbar?", answer: "Nach aktuellen Vorschriften sind Zinsen nur absetzbar, wenn das Geld nachweislich für den Erwerb, Bau oder die wesentliche Modernisierung der Immobilie verwendet wird." },
      { question: "Kann das Darlehen vorzeitig zurückgezahlt werden?", answer: "Ja, Sondertilgungen sind meist möglich, um die Gesamtlaufzeit und die Zinskosten wirksam zu reduzieren." },
      { question: "Welche Nebenkosten fallen beim Abschluss an?", answer: "Nebenkosten betragen üblicherweise 2 % bis 5 % des Darlehensbetrags für Wertermittlung, Bearbeitung, Grundbuch und Notar." },
      { question: "Was geschieht bei sinkenden Immobilienpreisen?", answer: "Es kann zu einer Überschuldung kommen. Die monatliche Zahlungsverpflichtung bleibt bestehen, ein Verkauf erfordert Eigenmitteleinschuss." },
      { question: "Wie lange dauert die Bearbeitung bis zur Auszahlung?", answer: "Der Prozess dauert im Schnitt 2 bis 6 Wochen für Gutachten, Bonitätsprüfung und Auszahlung." }
    ],
    p1: "Berechnen Sie monatliche Darlehensraten, maximale Beleihungsgrenzen, CLTV-Werte, Effektivzinsen und Tilgungspläne für Eigenkapitaldarlehen auf Immobilien.",
    p2: "Dieser Rechner modelliert feste monatliche Raten und Tilgungsverläufe für festverzinsliche Zweithypotheken basierend auf dem Nettowert Ihrer Immobilie.",
    overlayInputs: {
      homeValue: "Geschätzter Immobilienwert",
      currentMortgageBalance: "Bestehende Ersthypothek",
      loanAmount: "Gewünschter Darlehensbetrag",
      interestRate: "Fester Zinssatz (%)",
      loanTermYears: "Laufzeit (Jahre)"
    },
    overlayOutputs: {
      monthlyPayment: "Feste Monatsrate",
      maxBorrowableEquity: "Maximal Beleihbares Eigenkapital",
      newCltvPct: "Neuer CLTV-Beleihungsauslauf",
      totalInterestPaid: "Gesamte Zinszahlungen",
      trueApr: "Effektiver Jahreszins"
    }
  },
  hi: {
    h1: "होम इक्विटी लोन कैलकुलेटर",
    metaTitle: "होम इक्विटी लोन कैलकुलेटर — मासिक किस्त, CLTV एवं ऋण सीमा",
    metaDesc: "अपने घर की इक्विटी पर मासिक किश्तों, CLTV अनुपात, वास्तविक APR और अधिकतम ऋण क्षमता की सटीक गणना करें।",
    keywords: ["होम इक्विटी लोन कैलकुलेटर", "सेकंड मॉर्गेज", "CLTV कैलकुलेटर", "गृह संपत्ति ऋण"],
    h2s: [
      "1. होम इक्विटी लोन कैलकुलेटर क्या है?",
      "2. कैलकुलेटर का उपयोग कैसे करें",
      "3. होम इक्विटी और कंबाइंड लोन-टू-वैल्यू (CLTV)",
      "4. मोड A बनाम मोड B: विशिष्ट ऋण राशि बनाम अधिकतम क्षमता",
      "5. मासिक किस्त (EMI) गणना सूत्र",
      "6. शून्य-ब्याज दर परिदृश्य व्यवहार",
      "7. सेकंड मॉर्गेज ऋण अमोर्टाइजेशन अनुसूची",
      "8. वास्तविक APR और क्लोजिंग लागत",
      "9. क्लोजिंग लागत भुगतान विकल्प",
      "10. ऋण-से-आय अनुपात (DTI) और पात्रता मूल्यांकन",
      "11. क्रेडिट स्कोर और CLTV पात्रता श्रेणियां",
      "12. होम इक्विटी लोन बनाम HELOC क्रेडिट लाइन",
      "13. होम इक्विटी लोन बनाम कैश-आउट पुनर्वित्त",
      "14. अतिरिक्त मूलधन भुगतान एवं ब्याज बचत",
      "15. कर कटौती आकलन (वर्तमान नियम)",
      "16. गृह नवीनीकरण से मूल्य वृद्धि पूर्वानुमान",
      "17. होम इक्विटी लोन के संभावित जोखिम",
      "18. संपत्ति मूल्य गिरावट (नेगेटिव इक्विटी) परिदृश्य",
      "19. पूर्व-भुगतान पेनल्टी नियम",
      "20. समापन लागत और ऋण संवितरण समय सीमा",
      "21. सामान्य गणना गलतियों से कैसे बचें",
      "22. प्रमुख वित्तीय सूत्रों का सारांश"
    ],
    h3s: [
      "मोड A — उपयोगकर्ता-निर्धारित ऋण राशि",
      "मोड B — अधिकतम LTV क्षमता"
    ],
    faqs: [
      { question: "होम इक्विटी लोन क्या है और यह कैसे काम करता है?", answer: "होम इक्विटी लोन एक निश्चित ब्याज दर वाली दूसरी बंधक है जो आपको अपने घर के संचित शुद्ध मूल्य के आधार पर एकमुश्त राशि प्राप्त करने की अनुमति देती है।" },
      { question: "मैं होम इक्विटी से कितना ऋण प्राप्त कर सकता हूँ?", answer: "अधिकांश ऋणदाता संपत्ति के मूल्यांकन मूल्य के 80% से 85% के अधिकतम CLTV तक ऋण की अनुमति देते हैं, जिसमें से मौजूदा पहले ऋण की शेष राशि घटा दी जाती है।" },
      { question: "CLTV क्या है और इसकी गणना कैसे की जाती है?", answer: "कंबाइंड लोन-टू-वैल्यू (CLTV) संपत्ति पर सभी बकाया ऋणों के कुल योग को घर के बाजार मूल्य से विभाजित करके निकाला जाता है।" },
      { question: "मासिक किस्त (EMI) की गणना कैसे की जाती है?", answer: "यह मानक अमोर्टाइजेशन सूत्र द्वारा ऋण राशि, मासिक ब्याज दर और कुल किस्तों की संख्या के आधार पर तय की जाती है।" },
      { question: "ऋण स्वीकृति के लिए कितना क्रेडिट स्कोर आवश्यक है?", answer: "आमतौर पर 620 या उससे अधिक के क्रेडिट स्कोर की आवश्यकता होती है, जबकि सर्वोत्तम ब्याज दरों के लिए 700+ स्कोर अपेक्षित है।" },
      { question: "होम इक्विटी लोन और HELOC में क्या अंतर है?", answer: "होम इक्विटी लोन निश्चित दर और एकमुश्त भुगतान प्रदान करता है, जबकि HELOC एक परिवर्तनीय दर वाली रिवॉल्विंग क्रेडिट लाइन है।" },
      { question: "कैश-आउट पुनर्वित्त की तुलना में यह कैसे अलग है?", answer: "कैश-आउट पुनर्वित्त मौजूदा पहले बंधक को पूरी तरह बदल देता है, जबकि होम इक्विटी लोन पहले बंधक को अपरिवर्तित रखता है।" },
      { question: "क्या होम इक्विटी लोन का ब्याज कर-कटौती योग्य है?", answer: "वर्तमान नियमों के तहत ब्याज केवल तभी कर-कटौती योग्य है जब राशि का उपयोग उसी घर की खरीद, निर्माण या पर्याप्त नवीनीकरण के लिए किया गया हो।" },
      { question: "क्या मैं ऋण का समय से पहले भुगतान कर सकता हूँ?", answer: "हाँ, अधिकांश ऋण बिना किसी जुर्माने के अतिरिक्त भुगतान द्वारा अवधि और कुल ब्याज घटाने की अनुमति देते हैं।" },
      { question: "सेकंड मॉर्गेज की सामान्य क्लोजिंग लागत कितनी होती है?", answer: "यह आम तौर पर ऋण राशि का 2% से 5% होती है जिसमें मूल्यांकन, दस्तावेज़ीकरण और कानूनी शुल्क शामिल होते हैं।" },
      { question: "यदि घर का बाजार मूल्य गिर जाए तो क्या होगा?", answer: "आप नकारात्मक इक्विटी में आ सकते हैं। मासिक भुगतान दायित्व बना रहता है, लेकिन आप अतिरिक्त धन दिए बिना घर बेच नहीं सकेंगे।" },
      { question: "ऋण स्वीकृति और संवितरण में कितना समय लगता है?", answer: "संपत्ति मूल्यांकन और आय सत्यापन के कारण पूरी प्रक्रिया में सामान्यतः 2 से 6 सप्ताह का समय लगता है।" }
    ],
    p1: "अपने घर की इक्विटी पर मासिक किश्तों, अधिकतम ऋण सीमा, कंबाइंड लोन-टू-वैल्यू (CLTV), वास्तविक APR और अमोर्टाइजेशन अनुसूची की सटीक गणना करें।",
    p2: "यह कैलकुलेटर आपकी संपत्ति के मूल्य और प्रथम बंधक शेष राशि के आधार पर फिक्स्ड-रेट सेकंड मॉर्गेज की पूरी वित्तीय योजना तैयार करता है।",
    overlayInputs: {
      homeValue: "घर का अनुमानित बाजार मूल्य",
      currentMortgageBalance: "मौजूदा प्रथम बंधक शेष",
      loanAmount: "वांछित होम इक्विटी ऋण राशि",
      interestRate: "निश्चित ब्याज दर (%)",
      loanTermYears: "ऋण अवधि (वर्ष)"
    },
    overlayOutputs: {
      monthlyPayment: "निश्चित मासिक किस्त",
      maxBorrowableEquity: "अधिकतम प्राप्य इक्विटी",
      newCltvPct: "नया पोस्ट-लोन CLTV",
      totalInterestPaid: "कुल भुगतान किया गया ब्याज",
      trueApr: "वास्तविक APR"
    }
  },
  pt: {
    h1: "Calculadora de Empréstimo com Garantia de Imóvel (Home Equity)",
    metaTitle: "Calculadora de Home Equity — Prestações, CLTV e Limite de Crédito",
    metaDesc: "Calcule parcelas fixas de empréstimo com garantia de imóvel, rácio CLTV, TAEG real, amortização e capacidade máxima de endividamento.",
    keywords: ["calculadora de home equity", "emprestimo com garantia de imovel", "calculadora cltv", "segunda hipoteca"],
    h2s: [
      "1. O que é uma Calculadora de Home Equity?",
      "2. Como Utilizar a Calculadora de Home Equity",
      "3. Patrimônio Líquido Imobiliário e Rácio CLTV",
      "4. Modo A vs. Modo B: Montante Específico vs. Capacidade Máxima",
      "5. Fórmula da Prestação Mensal Fixa",
      "6. Comportamento do Sistema com Taxa Zero",
      "7. Tabela de Amortização da Segunda Hipoteca",
      "8. TAEG Real e Custos de Fecho",
      "9. Formas de Tratamento dos Custos de Fecho",
      "10. Rácio Dívida/Rendimento (DTI) e Qualificação de Crédito",
      "11. Pontuação de Crédito e Níveis de Elegibilidade CLTV",
      "12. Empréstimo Home Equity vs. Linha HELOC",
      "13. Home Equity vs. Refinanciamento com Levantamento de Capital",
      "14. Amortizações Extraordinárias e Poupança de Juros",
      "15. Estimativa de Dedutibilidade Fiscal (Normas Fiscais)",
      "16. Previsão de Valorização por Obras e Reformas",
      "17. Riscos Associados ao Empréstimo com Garantia Imobiliária",
      "18. Cenários de Patrimônio Negativo (Desvalorização do Imóvel)",
      "19. Penalizações por Amortização Antecipada",
      "20. Custos de Fecho e Prazos de Liberação de Fundos",
      "21. Erros Comuns a Evitar na Simulação",
      "22. Resumo das Principais Fórmulas"
    ],
    h3s: [
      "Modo A — Montante de Empréstimo Solicitado",
      "Modo B — Capacidade Máxima baseada no CLTV"
    ],
    faqs: [
      { question: "O que é um empréstimo com garantia de imóvel e como funciona?", answer: "É uma segunda hipoteca a taxa fixa que permite obter um montante único de capital utilizando o patrimônio líquido acumulado no seu imóvel como garantia." },
      { question: "Quanto posso solicitar com um empréstimo de home equity?", answer: "A maioria das instituições financeiras permite um rácio CLTV máximo de 80% a 85% do valor avaliado do imóvel, subtraindo a dívida da primeira hipoteca." },
      { question: "O que é o rácio CLTV e como é calculado?", answer: "O CLTV (Combined Loan-to-Value) é o total de todos os empréstimos garantidos pelo imóvel dividido pelo valor de mercado avaliado da propriedade." },
      { question: "Como é calculada a prestação mensal fixa?", answer: "É calculada através da fórmula padrão de amortização a taxa fixa com base no capital emprestado, taxa de juro mensal e prazo em meses." },
      { question: "Qual a pontuação de crédito necessária para aprovação?", answer: "Geralmente exige-se uma pontuação de 620 ou superior, sendo que as melhores taxas exigem 700 pontos ou mais." },
      { question: "Qual a diferença entre Home Equity e uma linha HELOC?", answer: "O Home Equity entrega um montante fixo com prestações e juros fixos, enquanto a HELOC funciona como uma linha de crédito rotativa a taxa variável." },
      { question: "Qual a diferença para um refinanciamento com levantamento de capital?", answer: "O refinanciamento substitui a hipoteca existente por uma nova de valor superior, enquanto o home equity mantém a primeira hipoteca inalterada." },
      { question: "Os juros do empréstimo são dedutíveis nos impostos?", answer: "Segundo as regras fiscais vigentes, os juros só são dedutíveis se o montante for usado para comprar, construir ou reformar substancialmente o imóvel dado em garantia." },
      { question: "Posso liquidar o empréstimo antecipadamente?", answer: "Sim, a maioria dos contratos permite pagamentos extraordinários para reduzir o prazo e o total de juros a pagar sem penalização." },
      { question: "Quais são os custos de fecho habituais?", answer: "Variam habitualmente entre 2% e 5% do montante financiado, cobrindo avaliação do imóvel, comissões de abertura, certidões e custos notariais." },
      { question: "O que acontece se o valor do imóvel descer no mercado?", answer: "Poderá ficar em situação de patrimônio negativo. A obrigação de pagamento mantém-se, mas não poderá vender o imóvel sem cobrir a diferença." },
      { question: "Quanto tempo demora o processo de aprovação e desembolso?", answer: "O processo demora habitualmente entre 2 e 6 semanas devido aos procedimentos de avaliação e verificação de rendimentos." }
    ],
    p1: "Calcule prestações mensais de empréstimos com garantia imobiliária, limite de crédito disponível, rácio CLTV, TAEG real e cronograma de amortizações.",
    p2: "Esta calculadora modela com precisão o plano de pagamentos fixos e os quadros de amortização de uma segunda hipoteca sobre o valor do seu imóvel.",
    overlayInputs: {
      homeValue: "Valor Estimado do Imóvel",
      currentMortgageBalance: "Saldo da 1ª Hipoteca Existente",
      loanAmount: "Montante do Empréstimo Solicitado",
      interestRate: "Taxa de Juro Fixa (%)",
      loanTermYears: "Prazo do Empréstimo (Anos)"
    },
    overlayOutputs: {
      monthlyPayment: "Prestação Mensal Fixa",
      maxBorrowableEquity: "Patrimônio Máximo Financiável",
      newCltvPct: "Novo CLTV Pós-Empréstimo",
      totalInterestPaid: "Total de Juros Pagos",
      trueApr: "TAEG Real"
    }
  }
};

for (const loc of LOCALES) {
  const data = LOCALE_DATA[loc];
  
  // 1. Content component
  const contentCode = `import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(data.faqs, null, 2)};

export const seo = {
  title: "${data.metaTitle}",
  description: "${data.metaDesc}",
  keywords: ${JSON.stringify(data.keywords)}
};

export const ContentComponent = function HomeEquityContent${loc.toUpperCase()}() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h1}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          ${data.p1}
        </p>
      </div>

      {/* 2. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[0]}
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          ${data.p2}
        </p>
      </section>

      {/* 3. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[1]}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${data.h2s[1]}
        </p>
      </section>

      {/* 4. CLTV */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[2]}
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Maximum Allowable Debt = Home Value × Maximum CLTV"}</div>
          <div>{"Maximum Borrowable Equity = Maximum Allowable Debt - Existing First Mortgage"}</div>
        </div>
      </section>

      {/* 5. MODE A VS MODE B */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[3]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[0]}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">${data.h3s[0]}</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[1]}</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">${data.h3s[1]}</p>
          </div>
        </div>
      </section>

      {/* 6. FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[4]}
        </h2>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"M = P \\\\times \\\\frac{r(1+r)^n}{(1+r)^n - 1}"}</div>
        </div>
      </section>

      {/* 7-22 REMAINING H2 SECTIONS */}
      ${data.h2s.slice(5).map((h2Text, idx) => `
      <section key="${idx + 5}" className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${h2Text}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${h2Text}
        </p>
      </section>`).join("\n")}
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "${loc}",
  calculatorSlug: "home-equity-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
`;
  writeFile(`src/i18n/content/home-equity/${loc}.tsx`, contentCode);
}

// 2. Overlays
for (const loc of LOCALES) {
  const data = LOCALE_DATA[loc];
  const overlayCode = `export const ${loc.toUpperCase()}_HOME_EQUITY_OVERLAY = {
  title: "${data.h1}",
  description: "${data.metaDesc}",
  inputs: ${JSON.stringify(data.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(data.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_HOME_EQUITY_OVERLAY;
`;
  writeFile(`src/i18n/overlays/home-equity/${loc}.ts`, overlayCode);
}
console.log("✓ Home Equity generation completed successfully.");
