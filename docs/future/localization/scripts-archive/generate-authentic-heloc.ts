import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

// =========================================================================
// 1. HELOC CALCULATOR (23 H2s, 12 FAQs)
// =========================================================================
const HELOC_H2S_EN = [
  "1. What Is a HELOC Calculator?",
  "2. How to Use the HELOC Calculator",
  "3. How HELOC Borrowing Power Is Calculated",
  "4. CLTV: The Key HELOC Borrowing Metric",
  "5. Interest-Only Draw Phase Mechanics",
  "6. Principal + Interest Draw Phase Mechanics",
  "7. Payment Shock: What Happens When the Draw Phase Ends?",
  "8. HELOC Draw and Repayment Terms",
  "9. Total Lifetime HELOC Interest",
  "10. Variable HELOC Rates and Rate Caps (Prime + Margin)",
  "11. How Rate Stress Affects HELOC Payments",
  "12. Custom Multi-Draw and Future Draws",
  "13. Extra Principal Payments",
  "14. HELOC vs. Fixed Home Equity Loan",
  "15. HELOC vs. Cash-Out Refinance",
  "16. Debt Consolidation and HELOC \"Interest Arbitrage\"",
  "17. HELOC Tax Deductibility Estimator (Current IRS Rules)",
  "18. HELOC Fees and Closing Costs",
  "19. What Happens When You Sell the Home?",
  "20. HELOC Credit-Limit Reductions and Freezes",
  "21. Home-Equity and Foreclosure Risk",
  "22. Common HELOC Calculator Mistakes to Avoid",
  "23. Core HELOC Formulas Summary"
];

const HELOC_TRANSLATIONS = {
  es: {
    h1: "Calculadora de HELOC (Línea de Crédito sobre el Valor Neto)",
    metaTitle: "Calculadora de HELOC — Pagos, CLTV, Período de Disposición y Amortización",
    metaDesc: "Estime pagos de HELOC en fases de disposición y amortización, impacto de tipos variables, CLTV y capacidad de endeudamiento.",
    keywords: ["calculadora heloc", "linea de credito hipotecaria", "interes heloc", "cuota heloc"],
    h2s: [
      "1. ¿Qué es una Calculadora de HELOC?",
      "2. Cómo Utilizar la Calculadora de HELOC",
      "3. Cómo se Calcula la Capacidad de Endeudamiento de una HELOC",
      "4. CLTV: La Métrica Clave de Endeudamiento en una HELOC",
      "5. Mecánica de la Fase de Disposición de Solo Interés",
      "6. Mecánica de la Fase de Disposición con Capital e Interés",
      "7. Impacto de Pago (Payment Shock): Fin de la Fase de Disposición",
      "8. Plazos de Disposición y Amortización de una HELOC",
      "9. Interés Total durante la Vida del Crédito",
      "10. Tipos Variables y Topes de Tipo de Interés (Prime + Margen)",
      "11. Cómo Afecta la Prueba de Estrés de Tipos a los Pagos",
      "12. Disposiciones Múltiples Personalizadas y Futuras",
      "13. Pagos Extraordinarios de Capital",
      "14. HELOC frente a Préstamo con Garantía Hipotecaria Fijo",
      "15. HELOC frente a Refinanciación con Retiro de Efectivo",
      "16. Consolidación de Deudas y Arbitraje de Intereses",
      "17. Estimador de Deducibilidad Fiscal (Normas IRS)",
      "18. Comisiones y Costes de Cierre de una HELOC",
      "19. ¿Qué Sucede al Vender la Vivienda?",
      "20. Reducciones y Congelaciones del Límite de Crédito",
      "21. Riesgo Patrimonial y de Ejecución Hipotecaria",
      "22. Errores Comunes que Deben Evitarse en una HELOC",
      "23. Resumen de Fórmulas Fundamentales de HELOC"
    ],
    faqs: [
      { question: "¿Qué es una HELOC y cómo funciona?", answer: "Una HELOC es una línea de crédito rotativa respaldada por el valor neto de su vivienda, con una fase de disposición flexible y una fase posterior de amortización." },
      { question: "¿Cómo se calcula el límite de crédito de una HELOC?", answer: "Se calcula multiplicando el valor de tasación por el límite de CLTV (ej. 80%) y restando el saldo de su primera hipoteca." },
      { question: "¿Qué es el CLTV y por qué es importante para una HELOC?", answer: "El CLTV mide la proporción total de deuda hipotecaria sobre el valor del inmueble y determina su límite máximo de endeudamiento." },
      { question: "¿Cómo se calculan los pagos en la fase de disposición y amortización?", answer: "Durante la disposición suele pagarse solo interés mensual sobre el saldo utilizado. En la amortización, se paga capital e interés fijo para liquidar el saldo." },
      { question: "¿Qué es el choque de pago (payment shock) en una HELOC?", answer: "Es el aumento drástico en la cuota mensual cuando termina el período de solo interés y comienza la amortización obligatoria de capital." },
      { question: "¿Cómo funcionan las tasas de interés variables y los topes?", answer: "La tasa suele basarse en el tipo preferencial (Prime Rate) más un margen bancario, sujeta a límites periódicos y vitalicios." },
      { question: "¿Puedo realizar pagos anticipados de capital en una HELOC?", answer: "Sí, amortizar capital durante la fase de disposición reduce el saldo deudor, el interés devengado y reconstituye la línea de crédito disponible." },
      { question: "¿En qué se diferencia una HELOC de un préstamo con garantía hipotecaria fijo?", answer: "La HELOC es flexible y de tipo variable, mientras que el préstamo con garantía entrega una suma global fija con pagos predecibles." },
      { question: "¿Cómo se compara una HELOC con una refinanciación cash-out?", answer: "La refinanciación reemplaza toda su primera hipoteca, mientras que la HELOC se añade como un gravamen secundario independiente." },
      { question: "¿Son deducibles de impuestos los intereses de una HELOC?", answer: "Solo si los fondos retirados se destinan a comprar, edificar o reformar sustancialmente la vivienda que garantiza la línea." },
      { question: "¿Qué ocurre con una HELOC cuando vendo mi casa?", answer: "El saldo pendiente de la HELOC debe cancelarse por completo con los fondos obtenidos del cierre de la venta." },
      { question: "¿Qué comisiones y riesgos debo considerar antes de contratar una HELOC?", answer: "Debe evaluar comisiones de apertura, cuotas anuales de mantenimiento, costes de tasación y el riesgo de ejecución hipotecaria si no puede afrontar los pagos." }
    ],
    overlayInputs: {
      homeValue: "Valor Estimado de la Vivienda",
      currentMortgageBalance: "Saldo de Hipoteca Existente",
      creditLineAmount: "Límite de Línea de Crédito Solicitado",
      interestRate: "Tipo de Interés Inicial (%)"
    },
    overlayOutputs: {
      monthlyPayment: "Pago Mensual en Fase de Disposición",
      maxCreditLine: "Línea de Crédito Máxima Disponible",
      repaymentMonthlyPayment: "Pago Mensual en Fase de Amortización",
      newCltvPct: "CLTV Combinado",
      totalLifetimeInterest: "Interés Total Estimado"
    }
  },
  fr: {
    h1: "Calculateur de Marge HELOC (Crédit sur Valeur Nette)",
    metaTitle: "Calculateur HELOC — Mensualités, CLTV, Période de Tirage et Remboursement",
    metaDesc: "Estimez vos paiements HELOC en phases de tirage et de remboursement, l'impact des taux variables et votre capacité d'emprunt.",
    keywords: ["calculateur heloc", "marge de credit hypothecaire", "interet heloc", "pret valeur nette"],
    h2s: [
      "1. Qu'est-ce qu'un Calculateur HELOC ?",
      "2. Comment Utiliser le Calculateur HELOC",
      "3. Comment la Capacité d'Emprunt HELOC est Calculée",
      "4. CLTV : La Métrique Clé pour une Marge HELOC",
      "5. Fonctionnement de la Phase de Tirage en Intérêts Seuls",
      "6. Fonctionnement du Tirage avec Capital et Intérêts",
      "7. Choc de Paiement : Fin de la Phase de Tirage",
      "8. Modalités de Tirage et de Remboursement",
      "9. Intérêts Totaux sur la Durée du Crédit",
      "10. Taux Variables et Plafonds de Taux (Prime + Marge)",
      "11. Impact des Tests de Résistance des Taux d'Intérêt",
      "12. Tirages Multiples et Futurs Personnalisés",
      "13. Remboursements Anticipés de Capital",
      "14. HELOC vs Prêt sur Valeur Nette à Taux Fixe",
      "15. HELOC vs Refinancement avec Retrait de Fonds",
      "16. Consolidation de Dettes et Arbitrage de Taux",
      "17. Déductibilité Fiscale des Intérêts (Règles IRS)",
      "18. Frais et Coûts de Clôture d'une Marge HELOC",
      "19. Que se Passe-t-il lors de la Vente du Bien ?",
      "20. Réductions et Gels de la Ligne de Crédit",
      "21. Risque Hypothécaire et Risque de Saisie",
      "22. Erreurs Courantes à Éviter avec une HELOC",
      "23. Synthèse des Formules Mathématiques HELOC"
    ],
    faqs: [
      { question: "Qu'est-ce qu'une HELOC et comment fonctionne-t-elle ?", answer: "Une HELOC est une marge de crédit renouvelable garantie par la valeur nette de votre logement, combinant phase de tirage flexible et phase de remboursement." },
      { question: "Comment est calculée la limite de crédit d'une HELOC ?", answer: "Elle correspond à la valeur d'expertise multipliée par le plafond CLTV (ex. 80 %), déduction faite du solde de la première hypothèque." },
      { question: "Qu'est-ce que le CLTV et pourquoi est-il essentiel ?", answer: "Le CLTV mesure le ratio d'endettement hypothécaire total par rapport à la valeur du bien et dicte la capacité d'emprunt autorisée." },
      { question: "Comment sont calculés les paiements de tirage et de remboursement ?", answer: "Durant le tirage, vous ne payez généralement que les intérêts sur les sommes utilisées. En remboursement, le capital et les intérêts sont amortis." },
      { question: "Qu'est-ce que le choc de paiement (payment shock) d'une HELOC ?", answer: "Il s'agit de la hausse brutale de mensualité au terme de la phase d'intérêts seuls lors du passage à l'amortissement obligatoire du capital." },
      { question: "Comment fonctionnent les taux variables et les plafonds ?", answer: "Le taux s'ajuste selon le taux préférentiel (Prime) majoré d'une marge, encadré par des plafonds de variation périodiques et globaux." },
      { question: "Puis-je rembourser du capital par anticipation sur une HELOC ?", answer: "Oui, les remboursements anticipés réduisent immédiatement le solde débiteur et reconstituent votre réserve de crédit disponible." },
      { question: "Quelle est la différence entre HELOC et prêt sur valeur nette fixe ?", answer: "La HELOC est une ligne renouvelable à taux variable, tandis que le prêt sur valeur nette est un versement unique à mensualité fixe." },
      { question: "Quelle est la différence avec un refinancement avec retrait de fonds ?", answer: "Le refinancement restructure l'intégralité de la première hypothèque, tandis que la HELOC constitue un second rang autonome." },
      { question: "Les intérêts d'une HELOC sont-ils déductibles des impôts ?", answer: "Uniquement si les sommes empruntées sont réinvesties dans l'achat, la construction ou la rénovation majeure du logement garant." },
      { question: "Que devient la HELOC en cas de vente du bien immobilier ?", answer: "Le solde total utilisé de la HELOC doit être intégralement soldé lors de la clôture notariée de la vente." },
      { question: "Quels frais et risques faut-il anticiper avant de souscrire ?", answer: "Vérifiez les frais d'ouverture, cotisations annuelles, frais d'évaluation et le risque de saisie en cas de défaut de paiement." }
    ],
    overlayInputs: {
      homeValue: "Valeur Estimée de la Propriété",
      currentMortgageBalance: "Solde Hypothécaire Existant",
      creditLineAmount: "Montant de Ligne de Crédit Souhaité",
      interestRate: "Taux d'Intérêt Initial (%)"
    },
    overlayOutputs: {
      monthlyPayment: "Mensualité en Phase de Tirage",
      maxCreditLine: "Ligne de Crédit Maximale Autorisée",
      repaymentMonthlyPayment: "Mensualité en Phase d'Amortissement",
      newCltvPct: "Ratio CLTV Combiné",
      totalLifetimeInterest: "Intérêts Totaux Estimés"
    }
  },
  de: {
    h1: "HELOC-Rechner (Rahmenkredit auf Immobilien-Eigenkapital)",
    metaTitle: "HELOC-Rechner — Raten, CLTV, Abrufphase & Tilgung",
    metaDesc: "Berechnen Sie HELOC-Raten in Abruf- und Rückzahlungsphase, Zinsänderungsrisiken, CLTV und maximale Kreditlinien.",
    keywords: ["heloc rechner", "abrufkredit immobilie", "rahmenkredit eigenkapital", "cltv rechner"],
    h2s: [
      "1. Was ist ein HELOC-Rechner?",
      "2. Anleitung zur Bedienung des HELOC-Rechners",
      "3. Ermittlung der maximalen HELOC-Kreditlinie",
      "4. CLTV: Die maßgebliche Beleihungsquote für HELOCs",
      "5. Funktionsweise der zinsbasierten Abrufphase (Draw Phase)",
      "6. Funktionsweise der Abrufphase mit Tilgung",
      "7. Zahlungsschock (Payment Shock): Übergang in die Tilgungsphase",
      "8. Abruf- und Rückzahlungsfristen eines HELOCs",
      "9. Gesamte Zinskosten über die Gesamtlaufzeit",
      "10. Variable Zinssätze und Zinsobergrenzen (Prime + Marge)",
      "11. Stresstest-Szenarien für Zinssteigerungen",
      "12. Mehrfache Abrufe und künftige Entnahmen",
      "13. Sondertilgungen und Kapitalrückzahlung",
      "14. HELOC vs. Fester Immobilieneigenkapitalkredit",
      "15. HELOC vs. Cash-Out-Umschuldung",
      "16. Umschuldung von Altschulden und Zinsarbitrage",
      "17. Steuerliche Absetzbarkeit von Zinsen (IRS-Regeln)",
      "18. Gebühren und Abschlusskosten eines HELOCs",
      "19. Was geschieht beim Verkauf der Immobilie?",
      "20. Kreditkürzungen und Sperrungen durch Banken",
      "21. Eigenkapital- und Verwertungsrisiken",
      "22. Häufige Fehler bei der HELOC-Planung vermeiden",
      "23. Mathematische Kernformeln des HELOCs"
    ],
    faqs: [
      { question: "Was ist ein HELOC und wie funktioniert es?", answer: "Ein HELOC ist eine grundpfandrechtlich besicherte, revolvierende Kreditlinie mit flexibler Abrufphase und anschließender Tilgungsphase." },
      { question: "Wie wird das HELOC-Kreditlimit berechnet?", answer: "Es ergibt sich aus dem Marktwert multipliziert mit der maximalen Beleihungsgrenze (CLTV, z. B. 80 %) abzüglich der Ersthypothek." },
      { question: "Was ist der CLTV und warum ist er entscheidend?", answer: "Der Combined Loan-to-Value setzt alle Grundpfandrechte ins Verhältnis zum Verkehrswert und begrenzt den maximalen Kreditrahmen." },
      { question: "Wie berechnen sich die Raten in Abruf- und Tilgungsphase?", answer: "In der Abrufphase werden meist nur Zinsen auf den abgerufenen Betrag fällig. In der Tilgungsphase erfolgt die volle Annuitätentilgung." },
      { question: "Was bedeutet Zahlungsschock (Payment Shock)?", answer: "Der sprunghafte Anstieg der monatlichen Rate nach Ende der reinen Zinszahlungsphase durch die einsetzende Kapitaltilgung." },
      { question: "Wie funktionieren variable Zinsen und Obergrenzen?", answer: "Der Zinssatz orientiert sich am Leitzins plus Bankmarge und wird durch vertragliche Caps nach oben begrenzt." },
      { question: "Sind Sondertilgungen bei einem HELOC möglich?", answer: "Ja, vorzeitige Tilgungen senken sofort die Zinslast und füllen die verfügbare Kreditlinie wieder auf." },
      { question: "Wie unterscheidet sich ein HELOC vom Festzins-Eigenkapitaldarlehen?", answer: "Das HELOC bietet flexible Abrufe zu variablen Zinsen, während das Darlehen eine feste Einmalzahlung mit festen Raten darstellt." },
      { question: "Wie schneidet ein HELOC gegenüber einer Cash-Out-Refinanzierung ab?", answer: "Die Refinanzierung löst die Ersthypothek komplett ab, während das HELOC als nachrangiges Darlehen daneben besteht." },
      { question: "Sind HELOC-Zinsen steuerlich absetzbar?", answer: "Nur wenn das Kapital nachweislich zur Anschaffung, Errichtung oder wesentlichen Verbesserung der besichernden Immobilie genutzt wird." },
      { question: "Was passiert mit dem HELOC beim Hausverkauf?", answer: "Der offene Restsaldo muss aus dem Verkaufserlös bei der notariellen Abwicklung vollständig getilgt werden." },
      { question: "Welche Risiken und Gebühren müssen beachtet werden?", answer: "Beachten Sie Jahresgebühren, variable Zinsänderungen und das Risiko der Zwangsvollstreckung bei Zahlungsunfähigkeit." }
    ],
    overlayInputs: {
      homeValue: "Geschätzter Immobilienwert",
      currentMortgageBalance: "Bestehende Ersthypothek",
      creditLineAmount: "Gewünschte Kreditlinie",
      interestRate: "Anfänglicher Zinssatz (%)"
    },
    overlayOutputs: {
      monthlyPayment: "Monatliche Zinsrate (Abrufphase)",
      maxCreditLine: "Maximal Verfügbare Kreditlinie",
      repaymentMonthlyPayment: "Monatsrate in Tilgungsphase",
      newCltvPct: "Kombinierter CLTV",
      totalLifetimeInterest: "Geschätzte Gesamtzinsen"
    }
  },
  hi: {
    h1: "HELOC कैलकुलेटर (होम इक्विटी लाइन ऑफ क्रेडिट)",
    metaTitle: "HELOC कैलकुलेटर — मासिक किस्त, CLTV, निकासी एवं पुनर्भुगतान अनुसूची",
    metaDesc: "HELOC ड्रा और पुनर्भुगतान चरणों के लिए मासिक भुगतान, परिवर्तनीय ब्याज दरों और अधिकतम क्रेडिट सीमा का सटीक आकलन करें।",
    keywords: ["HELOC कैलकुलेटर", "होम इक्विटी क्रेडिट लाइन", "HELOC ब्याज", "रिवॉल्विंग क्रेडिट मॉर्गेज"],
    h2s: [
      "1. HELOC कैलकुलेटर क्या है?",
      "2. HELOC कैलकुलेटर का उपयोग कैसे करें",
      "3. HELOC ऋण क्षमता की गणना कैसे की जाती है",
      "4. CLTV: HELOC के लिए सबसे महत्वपूर्ण वित्तीय मीट्रिक",
      "5. केवल-ब्याज ड्रा चरण की कार्यप्रणाली",
      "6. मूलधन + ब्याज ड्रा चरण की कार्यप्रणाली",
      "7. पेमेंट शॉक: ड्रा चरण समाप्त होने पर क्या होता है?",
      "8. HELOC ड्रा और पुनर्भुगतान अवधि की शर्तें",
      "9. संपूर्ण ऋण अवधि के दौरान कुल ब्याज लागत",
      "10. परिवर्तनीय ब्याज दरें और रेट कैप्स (प्राइम + मार्जिन)",
      "11. ब्याज दर वृद्धि स्ट्रेस टेस्ट का भुगतानों पर प्रभाव",
      "12. भविष्य की निकासी और कस्टम मल्टी-ड्रा योजना",
      "13. अतिरिक्त मूलधन भुगतान एवं ब्याज बचत",
      "14. HELOC बनाम फिक्स्ड होम इक्विटी लोन",
      "15. HELOC बनाम कैश-आउट पुनर्वित्त",
      "16. ऋण समेकन और ब्याज दर मध्यस्थता",
      "17. HELOC कर कटौती अनुमानक (वर्तमान नियम)",
      "18. HELOC शुल्क और समापन लागत",
      "19. घर बेचने की स्थिति में HELOC का क्या होता है?",
      "20. क्रेडिट सीमा में कटौती और बैंक द्वारा फ्रीज",
      "21. संपत्ति इक्विटी और बंधक जब्ती का जोखिम",
      "22. HELOC योजना में सामान्य गलतियों से कैसे बचें",
      "23. प्रमुख HELOC वित्तीय सूत्रों का सारांश"
    ],
    faqs: [
      { question: "HELOC क्या है और यह कैसे काम करता है?", answer: "HELOC आपके घर के शुद्ध मूल्य द्वारा समर्थित एक रिवॉल्विंग क्रेडिट लाइन है जिसमें लचीला ड्रा चरण और बाद का अनिवार्य पुनर्भुगतान चरण होता है।" },
      { question: "HELOC क्रेडिट सीमा की गणना कैसे की जाती है?", answer: "यह घर के मूल्यांकन मूल्य को अधिकतम CLTV (उदा. 80%) से गुणा करके और पहले बंधक की शेष राशि घटाकर निकाली जाती है।" },
      { question: "CLTV क्या है और HELOC के लिए क्यों आवश्यक है?", answer: "CLTV संपत्ति पर कुल ऋण अनुपात को मापता है और यह तय करता है कि आप अतिरिक्त कितना उधार ले सकते हैं।" },
      { question: "ड्रा और पुनर्भुगतान चरणों में भुगतान की गणना कैसे होती है?", answer: "ड्रा चरण में आमतौर पर केवल उपयोग की गई राशि पर ब्याज देय होता है, जबकि पुनर्भुगतान चरण में मूलधन और ब्याज दोनों की किस्त बनती है।" },
      { question: "HELOC पेमेंट शॉक क्या है?", answer: "ड्रा चरण समाप्त होने पर जब केवल-ब्याज भुगतान से पूर्ण मूलधन अमोर्टाइजेशन शुरू होता है, तो मासिक किस्त में अचानक बड़ी वृद्धि होती है।" },
      { question: "परिवर्तनीय ब्याज दरें और सीमाएं कैसे काम करती हैं?", answer: "दरें बेंचमार्क प्राइम रेट और बैंक मार्जिन पर आधारित होती हैं और अनुबंध में आवधिक व आजीवन सीमाएं तय होती हैं।" },
      { question: "क्या HELOC में अतिरिक्त मूलधन भुगतान किया जा सकता है?", answer: "हाँ, समय से पहले मूलधन चुकाने से ब्याज कम होता है और उपलब्ध क्रेडिट सीमा पुनः बहाल हो जाती है।" },
      { question: "HELOC और फिक्स्ड होम इक्विटी लोन में क्या अंतर है?", answer: "HELOC परिवर्तनीय दर वाली लचीली क्रेडिट लाइन है, जबकि होम इक्विटी लोन निश्चित किस्तों वाला एकमुश्त ऋण है।" },
      { question: "कैश-आउट पुनर्वित्त की तुलना में HELOC कैसा है?", answer: "पुनर्वित्त प्रथम बंधक को पूरी तरह बदल देता है, जबकि HELOC एक स्वतंत्र द्वितीयक दायित्व के रूप में रहता है।" },
      { question: "क्या HELOC का ब्याज कर-कटौती योग्य है?", answer: "केवल तभी जब राशि का उपयोग उसी आवासीय संपत्ति की खरीद, निर्माण या महत्वपूर्ण सुधार के लिए किया गया हो।" },
      { question: "घर बेचने पर HELOC का क्या होता है?", answer: "बिक्री से प्राप्त राशि से सौदे के समापन पर HELOC का पूरा बकाया चुकता करना अनिवार्य होता है।" },
      { question: "HELOC लेने से पहले किन जोखिमों को समझना चाहिए?", answer: "वार्षिक रखरखाव शुल्क, ब्याज दरों में उतार-चढ़ाव और भुगतान में चूक होने पर घर खोने के जोखिम पर विचार करें।" }
    ],
    overlayInputs: {
      homeValue: "घर का अनुमानित बाजार मूल्य",
      currentMortgageBalance: "मौजूदा प्रथम बंधक शेष",
      creditLineAmount: "वांछित क्रेडिट लाइन राशि",
      interestRate: "प्रारंभिक ब्याज दर (%)"
    },
    overlayOutputs: {
      monthlyPayment: "ड्रा चरण मासिक ब्याज भुगतान",
      maxCreditLine: "अधिकतम उपलब्ध क्रेडिट लाइन",
      repaymentMonthlyPayment: "पुनर्भुगतान चरण मासिक किस्त",
      newCltvPct: "कंबाइंड CLTV",
      totalLifetimeInterest: "अनुमानित कुल जीवनकाल ब्याज"
    }
  },
  pt: {
    h1: "Calculadora de HELOC (Linha de Crédito com Garantia Imobiliária)",
    metaTitle: "Calculadora HELOC — Prestações, CLTV, Fase de Utilização e Amortização",
    metaDesc: "Estime prestações de HELOC em fase de utilização e amortização, impacto de taxas variáveis, CLTV e limite de crédito disponível.",
    keywords: ["calculadora heloc", "linha de credito imobiliaria", "juros heloc", "emprestimo garantia imovel"],
    h2s: [
      "1. O que é uma Calculadora HELOC?",
      "2. Como Utilizar a Calculadora HELOC",
      "3. Como é Calculada a Capacidade de Crédito HELOC",
      "4. CLTV: O Indicador Fundamental para uma Linha HELOC",
      "5. Funcionamento da Fase de Utilização (Apenas Juros)",
      "6. Funcionamento da Fase de Utilização com Capital e Juros",
      "7. Choque de Pagamento: O Fim do Período de Utilização",
      "8. Prazos de Utilização e Amortização do HELOC",
      "9. Custo Total de Juros ao Longo do Contrato",
      "10. Taxas Variáveis e Tetos de Juros (Prime + Margem)",
      "11. Teste de Esforço para Subida de Taxas de Juro",
      "12. Saques Múltiplos Personalizados e Futuros",
      "13. Amortizações Extraordinárias de Capital",
      "14. HELOC vs. Empréstimo Home Equity a Taxa Fixa",
      "15. HELOC vs. Refinanciamento com Levantamento de Capital",
      "16. Consolidação de Créditos e Arbitragem de Juros",
      "17. Estimativa de Dedutibilidade Fiscal dos Juros (Normas Fiscais)",
      "18. Encargos e Custos de Abertura da Linha HELOC",
      "19. O que Acontece se Vender o Imóvel?",
      "20. Reduções e Bloqueios do Limite de Crédito pela Banca",
      "21. Risco Patrimonial e Salvaguarda da Habitação",
      "22. Erros Comuns a Evitar na Gestão de um HELOC",
      "23. Resumo das Principais Fórmulas do HELOC"
    ],
    faqs: [
      { question: "O que é um HELOC e como funciona?", answer: "Um HELOC é uma linha de crédito rotativa garantida pelo patrimônio do seu imóvel, composta por um período de utilização flexível e um período de amortização." },
      { question: "Como é calculado o limite de crédito do HELOC?", answer: "É calculado multiplicando o valor de avaliação pelo limite CLTV (ex. 80%) e subtraindo a dívida da primeira hipoteca." },
      { question: "O que é o CLTV e qual a sua importância?", answer: "O CLTV mede o endividamento hipotecário total face ao valor do imóvel e define o montante máximo que pode ser financiado." },
      { question: "Como são calculadas as prestações de utilização e amortização?", answer: "Na utilização paga-se habitualmente apenas os juros do saldo usado. Na amortização, passa-se a pagar capital e juros para liquidar o empréstimo." },
      { question: "O que é o choque de pagamento (payment shock)?", answer: "É o aumento súbito na prestação mensal quando termina o período de apenas juros e se inicia a amortização obrigatória de capital." },
      { question: "Como funcionam as taxas variáveis e os tetos máximos?", answer: "A taxa indexa-se a uma taxa de referência mais uma margem bancária, sujeita a tetos máximos periódicos e globais." },
      { question: "Posso fazer amortizações antecipadas de capital?", answer: "Sim, reembolsos antecipados reduzem imediatamente a dívida e restabelecem o limite de crédito disponível para novos saques." },
      { question: "Qual a diferença entre HELOC e empréstimo Home Equity fixo?", answer: "O HELOC é uma linha rotativa a taxa variável, enquanto o Home Equity tradicional concede um montante fixo com prestações constantes." },
      { question: "Como se compara o HELOC com o refinanciamento?", answer: "O refinanciamento substitui a hipoteca existente por uma nova, enquanto o HELOC constitui uma segunda garantia independente." },
      { question: "Os juros do HELOC são dedutíveis nos impostos?", answer: "Apenas se os fundos forem aplicados na compra, construção ou renovação substancial do imóvel dado em garantia." },
      { question: "O que acontece ao HELOC se eu vender o imóvel?", answer: "O saldo em dívida do HELOC terá de ser totalmente liquidado com os fundos apurados na escritura de venda." },
      { question: "Que riscos e comissões devo avaliar antes de contratar?", answer: "Analise custos de abertura, anuidades de manutenção, flutuações de juros e o risco de incumprimento hipotecário." }
    ],
    overlayInputs: {
      homeValue: "Valor Estimado do Imóvel",
      currentMortgageBalance: "Saldo da 1ª Hipoteca Existente",
      creditLineAmount: "Limite de Crédito Pretendido",
      interestRate: "Taxa de Juro Inicial (%)"
    },
    overlayOutputs: {
      monthlyPayment: "Prestação Mensal (Fase de Utilização)",
      maxCreditLine: "Limite Máximo de Crédito Disponível",
      repaymentMonthlyPayment: "Prestação Mensal (Fase de Amortização)",
      newCltvPct: "Rácio CLTV Combinado",
      totalLifetimeInterest: "Juros Totais Estimados"
    }
  }
};

for (const loc of LOCALES) {
  const data = HELOC_TRANSLATIONS[loc];
  
  const contentCode = `import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(data.faqs, null, 2)};

export const seo = {
  title: "${data.metaTitle}",
  description: "${data.metaDesc}",
  keywords: ${JSON.stringify(data.keywords)}
};

export const ContentComponent = function HELOCContent${loc.toUpperCase()}() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h1}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          ${data.metaDesc}
        </p>
      </div>

      ${data.h2s.map((h2Text, idx) => `
      <section key="${idx}" className="space-y-4">
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
  calculatorSlug: "heloc-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
`;
  writeFile(`src/i18n/content/heloc/${loc}.tsx`, contentCode);

  const overlayCode = `export const ${loc.toUpperCase()}_HELOC_OVERLAY = {
  title: "${data.h1}",
  description: "${data.metaDesc}",
  inputs: ${JSON.stringify(data.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(data.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_HELOC_OVERLAY;
`;
  writeFile(`src/i18n/overlays/heloc/${loc}.ts`, overlayCode);
}
console.log("✓ HELOC generation complete.");
