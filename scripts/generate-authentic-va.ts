import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

const VA_TRANSLATIONS = {
  es: {
    h1: "Calculadora de Hipoteca VA (Veteranos)",
    metaTitle: "Calculadora de Hipoteca VA — Cuota, Comisión de Financiación y Derecho",
    metaDesc: "Calcule cuotas hipotecarias VA con 0% de entrada, tabla oficial de tarifas de financiación (funding fee), exenciones y refinanciación IRRRL.",
    keywords: ["calculadora hipoteca va", "prestamo va veteranos", "comision financiacion va", "derecho va"],
    h2s: [
      "1. ¿Qué es una Calculadora de Hipoteca VA?",
      "2. Cómo Utilizar la Calculadora de Hipoteca VA",
      "3. Fórmula Hipotecaria Principal y Cálculo de la Cuota",
      "4. Comisión de Financiación VA: La Variable Clave Específica",
      "5. Primer Uso frente a Usos Posteriores del Préstamo VA",
      "6. Tabla Completa de Tarifas de la Comisión VA (Matriz Legal)",
      "7. Exenciones Legales de la Comisión de Financiación (0% Tarifa)",
      "8. Comparativa: Comisión Pagada en Efectivo vs. Financiada",
      "9. Comparativa a 3 Bandas: Préstamo VA vs. FHA vs. Convencional",
      "10. Derecho VA (Entitlement) y Determinación del Poder de Compra",
      "11. Amortización Acelerada: Pagos Quincenales y Extraordinarios",
      "12. Aspectos Financieros de la Refinanciación Streamline IRRRL",
      "13. Requisitos de Elegibilidad y Tiempo de Servicio Militar",
      "14. Errores Comunes que Deben Evitarse en Cálculos de Hipotecas VA"
    ],
    h3s: [
      "Primer Uso (0% Entrada)",
      "Uso Posterior (0% Entrada)",
      "Financiada en el Préstamo",
      "Pagada en Efectivo al Cierre",
      "Derecho Pleno ($0 de Derecho Previo Utilizado)",
      "Derecho Parcial (Préstamo VA Activo)",
      "Calendario de Pagos Quincenales",
      "Pagos Mensuales Extra de Principal",
      "Servicio Activo en Tiempo de Guerra",
      "Servicio Activo en Tiempo de Paz",
      "Guardia Nacional y Reserva"
    ],
    faqs: [
      { question: "¿Qué es un préstamo VA y quién puede solicitarlo?", answer: "Es un préstamo hipotecario garantizado por el Departamento de Asuntos de Veteranos para militares en activo, veteranos y cónyuges elegibles." },
      { question: "¿Cómo se calcula la cuota mensual de una hipoteca VA?", answer: "Se calcula con la fórmula estándar de amortización basada en el precio de compra más la comisión de financiación financiada y el tipo de interés." },
      { question: "¿Cuánto cuesta la comisión de financiación (funding fee) de la VA?", answer: "Varía entre el 1.25% y el 3.30% según el porcentaje de entrada y si es la primera vez o un uso posterior." },
      { question: "¿Se puede financiar la comisión de financiación en el préstamo?", answer: "Sí, la mayoría de los prestatarios eligen sumar la comisión al saldo total financiado para no abonarla en efectivo al cierre." },
      { question: "¿Quién califica para una exención del 100% de la comisión VA?", answer: "Los veteranos con discapacidades relacionadas con el servicio reconocidas por la VA y los cónyuges supervivientes elegibles están totalmente exentos." },
      { question: "¿Exige una hipoteca VA el pago de un seguro mensual PMI?", answer: "No, las hipotecas VA no tienen seguro mensual privado de hipoteca (PMI/MIP), lo que ahorra cientos de dólares al mes." },
      { question: "¿Cómo afecta el primer uso frente al uso posterior?", answer: "El primer uso con 0% de entrada tiene una tarifa del 2.15%, mientras que los usos posteriores con 0% de entrada pagan el 3.30%." },
      { question: "¿Qué es el derecho VA (entitlement) y cómo afecta al poder de compra?", answer: "El derecho es la garantía financiera que respalda el préstamo; un derecho básico pleno permite comprar sin límite de préstamo y sin entrada." },
      { question: "¿Se pueden tener dos préstamos VA al mismo tiempo?", answer: "Sí, mediante el uso del derecho secundario (bonuses entitlement) cuando se cumplen los criterios de ingresos y residencia." },
      { question: "¿Qué es una refinanciación VA IRRRL?", answer: "Es una refinanciación simplificada (Interest Rate Reduction Refinance Loan) con documentación reducida para bajar el tipo de interés." },
      { question: "¿Cómo reducen el plazo los pagos quincenales o extraordinarios?", answer: "Efectuar 26 medios pagos al año equivale a 13 mensualidades completas, recortando de 4 a 6 años un préstamo a 30 años." },
      { question: "¿Cómo se compara un préstamo VA con uno FHA o Convencional?", answer: "El préstamo VA suele ser el más ventajoso al no requerir entrada ni seguro PMI mensual, ofreciendo cuotas mensuales menores." }
    ],
    overlayInputs: {
      homePrice: "Precio de Compra de la Vivienda",
      downPaymentPct: "Porcentaje de Entrada (%)",
      interestRate: "Tipo de Interés Fijo (%)",
      loanTermYears: "Plazo del Préstamo (Años)"
    },
    overlayOutputs: {
      monthlyPayment: "Cuota Mensual (Capital e Interés)",
      fundingFeeAmount: "Comisión de Financiación VA",
      totalLoanWithFee: "Préstamo Total con Comisión Incluida",
      totalInterestPaid: "Interés Total Pagado",
      monthlySavingsVsConv: "Ahorro Mensual vs. Convencional"
    }
  },
  fr: {
    h1: "Calculateur de Prêt Hypothécaire VA (Vétérans)",
    metaTitle: "Calculateur Prêt VA — Mensualité, Frais de Financement et Droits",
    metaDesc: "Estimez vos mensualités de prêt VA sans apport, le barème légal des frais de financement, les exonérations et le refinancement IRRRL.",
    keywords: ["calculateur pret va", "pret veterans va", "frais de financement va", "refinancement irrrl"],
    h2s: [
      "1. Qu'est-ce qu'un Calculateur de Prêt Hypothécaire VA ?",
      "2. Comment Utiliser le Calculateur de Prêt VA",
      "3. Formule Hypothécaire Principale et Calcul de la Mensualité",
      "4. Frais de Financement VA : La Variable Spécifique Majeure",
      "5. Première Utilisation vs Utilisations Ultérieures du Prêt VA",
      "6. Barème Complet des Frais de Financement VA (Grille Légale)",
      "7. Exonérations Légales des Frais de Financement (0% de Frais)",
      "8. Comparaison : Frais Payés Comptant vs Financés dans le Prêt",
      "9. Comparatif à 3 Voies : Prêt VA vs FHA vs Conventionnel",
      "10. Droits VA (Entitlement) et Détermination du Pouvoir d'Achat",
      "11. Amortissement Accéléré : Paiements Bimensuels et Anticipés",
      "12. Aspects Économiques du Refinancement Simplifié IRRRL",
      "13. Critères d'Éligibilité et Durée de Service Militaire",
      "14. Erreurs Courantes à Éviter dans les Calculs de Prêts VA"
    ],
    h3s: [
      "Première Utilisation (0% d'Apport)",
      "Utilisation Ultérieure (0% d'Apport)",
      "Financés dans le Montant du Prêt",
      "Payés Comptant à la Clôture",
      "Droits Intégraux (0$ de Droits Précédents Utilisés)",
      "Droits Partiels (Prêt VA Actif en Cours)",
      "Échéancier de Paiement Bimensuel",
      "Remboursements Mensuels de Capital Supplémentaires",
      "Service Actif en Temps de Guerre",
      "Service Actif en Temps de Paix",
      "Garde Nationale et Réserves"
    ],
    faqs: [
      { question: "Qu'est-ce qu'un prêt VA et qui y a droit ?", answer: "C'est un prêt garanti par le Département des Anciens Combattants destiné aux militaires d'active, vétérans et conjoints survivants." },
      { question: "Comment est calculée la mensualité d'un prêt VA ?", answer: "À partir du prix du logement, des frais de financement éventuels intégrés au capital et du taux d'intérêt contractuel." },
      { question: "À combien s'élèvent les frais de financement (Funding Fee) ?", answer: "Ils s'échelonnent de 1,25 % à 3,30 % selon l'apport consenti et le statut de premier emprunt ou de réutilisation." },
      { question: "Peut-on financer les frais de financement dans le prêt ?", answer: "Oui, la majorité des emprunteurs ajoutent ces frais au capital emprunté pour éviter tout débours comptant." },
      { question: "Qui est exonéré à 100% des frais de financement ?", answer: "Les vétérans percevant une pension d'invalidité liée au service et les conjoints éligibles sont totalement exonérés." },
      { question: "Un prêt VA exige-t-il une assurance hypothécaire mensuelle (PMI) ?", answer: "Non, les prêts VA ne comportent aucune prime d'assurance mensuelle (PMI/MIP), générant une économie sensible." },
      { question: "Quelle est la différence entre première utilisation et utilisation ultérieure ?", answer: "La première utilisation à 0% d'apport est taxée à 2,15%, contre 3,30% pour les utilisations suivantes." },
      { question: "Qu'est-ce que le droit VA (Entitlement) ?", answer: "C'est la garantie financière apportée par l'État qui permet d'emprunter sans apport et sans plafond légal restrictif." },
      { question: "Peut-on détenir deux prêts VA simultanément ?", answer: "Oui, grâce au mécanisme des droits résiduels lorsque les critères de revenus et d'occupation sont validés." },
      { question: "Qu'est-ce qu'un refinancement VA IRRRL ?", answer: "Une procédure allégée de refinancement permettant de réduire le taux d'intérêt avec un minimum de démarches." },
      { question: "Quel est le gain des versements bimensuels ou anticipés ?", answer: "Effectuer 26 demi-mensualités par an permet de rembourser l'équivalent de 13 mois complets et de raccourcir la durée de 4 à 6 ans." },
      { question: "Comment le prêt VA se compare-t-il au FHA ou Conventionnel ?", answer: "L'absence d'apport et d'assurance PMI rend le prêt VA particulièrement compétitif sur le coût total mensuel." }
    ],
    overlayInputs: {
      homePrice: "Prix d'Achat du Logement",
      downPaymentPct: "Pourcentage d'Apport (%)",
      interestRate: "Taux d'Intérêt Fixe (%)",
      loanTermYears: "Durée du Prêt (Années)"
    },
    overlayOutputs: {
      monthlyPayment: "Mensualité en Capital et Intérêts",
      fundingFeeAmount: "Frais de Financement VA",
      totalLoanWithFee: "Prêt Total Incluant les Frais",
      totalInterestPaid: "Intérêts Totaux Payés",
      monthlySavingsVsConv: "Économie Mensuelle vs. Conventionnel"
    }
  },
  de: {
    h1: "VA-Hypothekenrechner (US-Veteranendarlehen)",
    metaTitle: "VA-Hypothekenrechner — Raten, Finanzierungsgebühr & Anspruch",
    metaDesc: "Berechnen Sie VA-Hypothekendarlehen ohne Eigenkapital, offizielle Finanzierungsgebühren (Funding Fee), Befreiungen und IRRRL-Umschuldung.",
    keywords: ["va hypothekenrechner", "veteranendarlehen", "va funding fee", "irrrl umschuldung"],
    h2s: [
      "1. Was ist ein VA-Hypothekenrechner?",
      "2. Anleitung zur Nutzung des VA-Rechners",
      "3. Grundlegende Hypothekenformel und Ratenermittlung",
      "4. VA-Finanzierungsgebühr (Funding Fee): Die zentrale Variable",
      "5. Erstnutzung vs. Wiederholte Nutzung des VA-Kredits",
      "6. Vollständige Gebührentabelle der VA (Gesetzliche Matrix)",
      "7. Gesetzliche Gebührenbefreiungen (0% Funding Fee)",
      "8. Barzahlung vs. Mitfinanzierung der Finanzierungsgebühr",
      "9. Dreifach-Vergleich: VA vs. FHA vs. Konventionelles Darlehen",
      "10. VA-Anspruch (Entitlement) und Kaufkraftberechnung",
      "11. Beschleunigte Tilgung: 14-tägige und Sondertilgungen",
      "12. Wirtschaftlichkeit der IRRRL-Stromlinien-Umschuldung",
      "13. Zulassungsvoraussetzungen und Mindestdienstzeiten",
      "14. Häufige Berechnungsfehler bei VA-Hypotheken vermeiden"
    ],
    h3s: [
      "Erstmalige Nutzung (0% Anzahlung)",
      "Wiederholte Nutzung (0% Anzahlung)",
      "Mitfinanzierung im Darlehensbetrag",
      "Barzahlung beim Notarabschluss",
      "Voller Anspruch ($0 genutzter Voranspruch)",
      "Teilanspruch (Laufender aktiver VA-Kredit)",
      "14-tägiger Tilgungsplan",
      "Monatliche zusätzliche Kapitaltilgungen",
      "Aktiver Kriegsdienst",
      "Aktiver Friedensdienst",
      "Nationalgarde und Reservisten"
    ],
    faqs: [
      { question: "Was ist ein VA-Darlehen und wer ist berechtigt?", answer: "Ein vom US-Veteranenministerium garantiertes Baudarlehen für aktive Soldaten, Veteranen und berechtigte Hinterbliebene." },
      { question: "Wie wird die Monatsrate berechnet?", answer: "Aus Kaufpreis, mitfinanzierter Funding Fee und Zinssatz über die Standard-Annuitätenformel." },
      { question: "Wie hoch ist die VA-Finanzierungsgebühr (Funding Fee)?", answer: "Sie liegt zwischen 1,25 % und 3,30 %, abhängig von Anzahlung und Erst- oder Folgebeschaffung." },
      { question: "Kann die Gebühr mitfinanziert werden?", answer: "Ja, sie wird meist dem Darlehensbetrag zugeschlagen, sodass kein Eigenkapital beim Abschluss nötig ist." },
      { question: "Wer ist vollständig von der Gebühr befreit?", answer: "Veteranen mit anerkannten Dienstbeschädigungsrenten sowie anspruchsberechtigte Witwen/Witwer zahlen 0 % Gebühr." },
      { question: "Fällt beim VA-Darlehen eine monatliche Hypothekenversicherung (PMI) an?", answer: "Nein, VA-Darlehen verlangen keine monatliche PMI/MIP, was monatlich viel Geld spart." },
      { question: "Was unterscheidet Erst- und Folgebeschaffung?", answer: "Beim 0%-Eigenkapitalkauf beträgt die Gebühr beim Erstkauf 2,15 %, bei Folgekäufen 3,30 %." },
      { question: "Was ist das VA-Entitlement?", answer: "Die staatliche Garantie, die den Erwerb ohne Anzahlung und ohne Obergrenze ermöglicht." },
      { question: "Darf man zwei VA-Kredite parallel halten?", answer: "Ja, über Restansprüche (Bonus Entitlement), sofern Einkommen und Nutzungsregeln passen." },
      { question: "Was ist eine VA-IRRRL-Umschuldung?", answer: "Eine vereinfachte Zinsreduzierungs-Umschuldung mit minimalem Dokumentationsaufwand." },
      { question: "Welche Vorteile bieten 14-tägige Zahlungen?", answer: "26 Halbmonatsraten entsprechen 13 Monatsraten pro Jahr und verkürzen die Laufzeit um 4 bis 6 Jahre." },
      { question: "Wie schlägt sich das VA-Darlehen gegenüber FHA und Konventionell?", answer: "Ohne Anzahlung und ohne monatliche PMI bietet das VA-Darlehen die niedrigsten Monatskosten." }
    ],
    overlayInputs: {
      homePrice: "Kaufpreis der Immobilie",
      downPaymentPct: "Eigenkapitalanteil (%)",
      interestRate: "Fester Sollzinssatz (%)",
      loanTermYears: "Laufzeit (Jahre)"
    },
    overlayOutputs: {
      monthlyPayment: "Monatliche Zins- und Tilgungsrate",
      fundingFeeAmount: "VA-Finanzierungsgebühr",
      totalLoanWithFee: "Gesamtdarlehen inkl. Gebühr",
      totalInterestPaid: "Gesamte Zinszahlungen",
      monthlySavingsVsConv: "Monatliche Ersparnis ggü. Konventionell"
    }
  },
  hi: {
    h1: "VA मॉर्गेज कैलकुलेटर (वेटरन्स होम लोन)",
    metaTitle: "VA मॉर्गेज कैलकुलेटर — मासिक किस्त, फंडिंग शुल्क एवं पात्रता",
    metaDesc: "0% डाउन पेमेंट पर VA होम लोन किस्तों, फंडिंग फीस मैट्रिक्स, शुल्क छूट और IRRRL पुनर्वित्त की सटीक गणना करें।",
    keywords: ["VA मॉर्गेज कैलकुलेटर", "वेटरन्स होम लोन", "VA फंडिंग फीस", "IRRRL पुनर्वित्त"],
    h2s: [
      "1. VA मॉर्गेज कैलकुलेटर क्या है?",
      "2. VA कैलकुलेटर का उपयोग कैसे करें",
      "3. प्रमुख बंधक सूत्र एवं मासिक किस्त निर्धारण",
      "4. VA फंडिंग शुल्क: सबसे महत्वपूर्ण विशिष्ट चर",
      "5. पहली बार उपयोग बनाम बाद में VA ऋण का उपयोग",
      "6. VA फंडिंग शुल्क दरों की पूर्ण वैधानिक तालिका",
      "7. वैधानिक फंडिंग शुल्क छूट (0% शुल्क पात्रता)",
      "8. तुलना: नकद भुगतान बनाम ऋण में फंडिंग शुल्क जोड़ना",
      "9. त्रिपक्षीय तुलना: VA बनाम FHA बनाम पारंपरिक ऋण",
      "10. VA पात्रता (Entitlement) और खरीद क्षमता निर्धारण",
      "11. त्वरित भुगतान: पाक्षिक और अतिरिक्त मूलधन भुगतान",
      "12. VA IRRRL स्ट्रीमलाइन पुनर्वित्त के वित्तीय लाभ",
      "13. सैन्य सेवा पात्रता मानदंड एवं न्यूनतम सेवा मानक",
      "14. VA मॉर्गेज गणना में सामान्य गलतियों से कैसे बचें"
    ],
    h3s: [
      "पहली बार उपयोग (0% डाउन पेमेंट)",
      "बाद में उपयोग (0% डाउन पेमेंट)",
      "ऋण राशि में वित्तपोषित शुल्क",
      "समापन पर नकद भुगतान",
      "पूर्ण पात्रता ($0 पूर्व प्रयुक्त पात्रता)",
      "आंशिक पात्रता (सक्रिय VA ऋण)",
      "पाक्षिक भुगतान अनुसूची",
      "मासिक अतिरिक्त मूलधन भुगतान",
      "युद्धकालीन सक्रिय सेवा",
      "शांतिकाल सक्रिय सेवा",
      "नेशनल गार्ड एवं रिजर्व्स"
    ],
    faqs: [
      { question: "VA ऋण क्या है और इसके लिए कौन पात्र है?", answer: "यह सैन्य कर्मियों, सेवानिवृत्त सैनिकों और पात्र जीवनसाथियों के लिए सरकार द्वारा समर्थित एक विशेष होम लोन है।" },
      { question: "VA मॉर्गेज की मासिक किस्त कैसे तय होती है?", answer: "यह घर के मूल्य, वित्तपोषित फंडिंग शुल्क और ब्याज दर के आधार पर अमोर्टाइजेशन सूत्र से तय होती है।" },
      { question: "VA फंडिंग शुल्क कितना होता है?", answer: "यह डाउन पेमेंट और पहली बार या बाद के उपयोग के आधार पर 1.25% से 3.30% तक होता है।" },
      { question: "क्या फंडिंग शुल्क को ऋण में जोड़ा जा सकता है?", answer: "हाँ, अधिकांश खरीदार इसे कुल ऋण राशि में शामिल कर लेते हैं ताकि नकद अग्रिम न देना पड़े।" },
      { question: "फंडिंग शुल्क से 100% छूट किसे मिलती है?", answer: "सेवा-संबंधी दिव्यांगता पेंशन प्राप्त करने वाले सैनिकों और पात्र आश्रितों को पूरी छूट मिलती है।" },
      { question: "क्या VA ऋण में मासिक PMI बीमा लगता है?", answer: "नहीं, VA ऋणों में कोई मासिक प्राइवेट मॉर्गेज इंश्योरेंस नहीं लगता जिससे हर महीने भारी बचत होती है।" },
      { question: "पहली बार और बाद के उपयोग में क्या अंतर है?", answer: "0% डाउन पर पहली बार 2.15% शुल्क लगता है, जबकि बाद के उपयोगों में 3.30% शुल्क लगता है।" },
      { question: "VA पात्रता (Entitlement) क्या है?", answer: "यह सरकार द्वारा दी जाने वाली वित्तीय गारंटी है जो बिना डाउन पेमेंट के ऋण लेने की सुविधा देती है।" },
      { question: "क्या एक साथ दो VA ऋण लिए जा सकते हैं?", answer: "हाँ, शेष बची पात्रता (Bonus Entitlement) का उपयोग करके दूसरा ऋण लिया जा सकता है।" },
      { question: "VA IRRRL पुनर्वित्त क्या है?", answer: "यह ब्याज दर घटाने के लिए सरल दस्तावेज़ीकरण वाला एक विशेष पुनर्वित्त विकल्प है।" },
      { question: "पाक्षिक भुगतान से क्या लाभ होता है?", answer: "साल में 26 आधे भुगतान करने से हर वर्ष एक अतिरिक्त किस्त चुकती है और 4 से 6 साल पहले ऋण समाप्त हो जाता है।" },
      { question: "पारंपरिक या FHA ऋण की तुलना में VA कैसा है?", answer: "शून्य डाउन पेमेंट और बिना मासिक बीमा शुल्क के कारण VA सबसे सस्ता और किफायती विकल्प है।" }
    ],
    overlayInputs: {
      homePrice: "घर का खरीद मूल्य",
      downPaymentPct: "डाउन पेमेंट प्रतिशत (%)",
      interestRate: "निश्चित ब्याज दर (%)",
      loanTermYears: "ऋण अवधि (वर्ष)"
    },
    overlayOutputs: {
      monthlyPayment: "मासिक किस्त (मूलधन और ब्याज)",
      fundingFeeAmount: "VA फंडिंग शुल्क राशि",
      totalLoanWithFee: "शुल्क सहित कुल ऋण राशि",
      totalInterestPaid: "कुल भुगतान किया गया ब्याज",
      monthlySavingsVsConv: "पारंपरिक ऋण की तुलना में मासिक बचत"
    }
  },
  pt: {
    h1: "Calculadora de Hipoteca VA (Veteranos Militares)",
    metaTitle: "Calculadora Hipoteca VA — Prestações, Taxa de Financiamento e Direitos",
    metaDesc: "Calcule prestações de crédito habitação VA com 0% de entrada, comissões de financiamento oficiais, isenções e refinanciamento IRRRL.",
    keywords: ["calculadora hipoteca va", "emprestimo veteranos va", "taxa financiamento va", "refinanciamento irrrl"],
    h2s: [
      "1. O que é uma Calculadora de Hipoteca VA?",
      "2. Como Utilizar a Calculadora de Hipoteca VA",
      "3. Fórmula Hipotecária Principal e Cálculo da Prestação",
      "4. Taxa de Financiamento VA (Funding Fee): A Variável Fundamental",
      "5. Primeira Utilização vs. Utilizações Posteriores do Crédito VA",
      "6. Tabela Completa de Encargos da Taxa VA (Matriz Legal)",
      "7. Isenções Legais da Taxa de Financiamento (0% de Encargos)",
      "8. Comparativo: Taxa Paga a Pronto vs. Financiada no Empréstimo",
      "9. Comparativo a 3 Vias: Crédito VA vs. FHA vs. Convencional",
      "10. Direitos VA (Entitlement) e Determinação do Poder de Compra",
      "11. Amortização Acelerada: Prestações Quinzenais e Extraordinárias",
      "12. Vantagens Financeiras do Refinanciamento Simplificado IRRRL",
      "13. Critérios de Elegibilidade e Tempo de Serviço Militar",
      "14. Erros Comuns a Evitar nas Simulações de Hipotecas VA"
    ],
    h3s: [
      "Primeira Utilização (0% de Entrada)",
      "Utilização Posterior (0% de Entrada)",
      "Financiada no Montante do Crédito",
      "Paga a Pronto na Escritura",
      "Direito Integral ($0 de Direitos Utilizados Anteriormente)",
      "Direito Parcial (Crédito VA Ativo em Curso)",
      "Cronograma de Pagamentos Quinzenais",
      "Amortizações Mensais de Capital Extraordinárias",
      "Serviço Ativo em Tempo de Guerra",
      "Serviço Ativo em Tempo de Paz",
      "Guarda Nacional e Reservas"
    ],
    faqs: [
      { question: "O que é um crédito VA e quem é elegível?", answer: "É um crédito habitação garantido pelo Departamento de Assuntos de Veteranos para militares no ativo, veteranos e cônjuges elegíveis." },
      { question: "Como é calculada a prestação mensal de um empréstimo VA?", answer: "Através da fórmula de amortização padrão baseada no preço da habitação, taxa de financiamento e taxa de juro acordada." },
      { question: "Quanto custa a taxa de financiamento (Funding Fee) da VA?", answer: "Varia entre 1,25% e 3,30% dependendo do valor da entrada e de ser a primeira utilização ou um crédito subsequente." },
      { question: "A taxa de financiamento pode ser incluída no empréstimo?", answer: "Sim, a maioria dos mutuários inclui esta comissão no saldo financiado para não desembolsar dinheiro na escritura." },
      { question: "Quem beneficia de isenção total da taxa VA?", answer: "Veteranos com incapacidade comprovada em serviço e cônjuges sobrevivo(a)s elegíveis têm isenção total (0% de taxa)." },
      { question: "Uma hipoteca VA exige o pagamento de seguro mensal (PMI)?", answer: "Não, os créditos VA dispensam qualquer prémio de seguro mensal de hipoteca, proporcionando uma poupança significativa." },
      { question: "Qual a diferença entre a primeira utilização e utilizações posteriores?", answer: "Com 0% de entrada, a primeira utilização tem uma taxa de 2,15%, enquanto utilizações posteriores pagam 3,30%." },
      { question: "O que é o direito VA (Entitlement)?", answer: "É a garantia financeira estatal que permite comprar casa sem qualquer entrada inicial e sem limites pré-fixados." },
      { question: "É possível ter dois créditos VA em simultâneo?", answer: "Sim, através dos direitos remanescentes (Bonus Entitlement), desde que preenchidos os requisitos de rendimento." },
      { question: "O que é o refinanciamento VA IRRRL?", answer: "É um procedimento simplificado que permite baixar a taxa de juro do crédito com formalidades mínimas." },
      { question: "Qual a vantagem de pagamentos quinzenais ou amortizações extra?", answer: "Fazer 26 meios-pagamentos equivale a 13 prestações anuais e reduz o prazo de amortização em 4 a 6 anos." },
      { question: "Como se compara o crédito VA com um crédito FHA ou Convencional?", answer: "Sem entrada obrigatória e sem seguro mensal PMI, o crédito VA proporciona habitualmente a prestação mais baixa." }
    ],
    overlayInputs: {
      homePrice: "Preço de Compra da Habitação",
      downPaymentPct: "Percentagem de Entrada (%)",
      interestRate: "Taxa de Juro Fixa (%)",
      loanTermYears: "Prazo do Crédito (Anos)"
    },
    overlayOutputs: {
      monthlyPayment: "Prestação Mensal (Capital e Juros)",
      fundingFeeAmount: "Taxa de Financiamento VA",
      totalLoanWithFee: "Total do Empréstimo com Taxa",
      totalInterestPaid: "Total de Juros Pagos",
      monthlySavingsVsConv: "Poupança Mensal vs. Convencional"
    }
  }
};

for (const loc of LOCALES) {
  const data = VA_TRANSLATIONS[loc];

  const contentCode = `import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(data.faqs, null, 2)};

export const seo = {
  title: "${data.metaTitle}",
  description: "${data.metaDesc}",
  keywords: ${JSON.stringify(data.keywords)}
};

export const ContentComponent = function VAMortgageContent${loc.toUpperCase()}() {
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

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[0]}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${data.h2s[0]}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[1]}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${data.h2s[1]}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[2]}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${data.h2s[2]}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[3]}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${data.h2s[3]}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[4]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[0]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[0]}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[1]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[1]}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[5]}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                <th className="p-3">Down Payment</th>
                <th className="p-3">First-Time Use</th>
                <th className="p-3">Subsequent Use</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-bold">0% Down</td>
                <td className="p-3">2.15%</td>
                <td className="p-3">3.30%</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">5% to 9.9% Down</td>
                <td className="p-3">1.50%</td>
                <td className="p-3">1.50%</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">10%+ Down</td>
                <td className="p-3">1.25%</td>
                <td className="p-3">1.25%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[6]}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${data.h2s[6]}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[7]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[2]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[2]}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[3]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[3]}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[8]}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                <th className="p-3">Program</th>
                <th className="p-3">Min Down Payment</th>
                <th className="p-3">Monthly PMI / MIP</th>
                <th className="p-3">Upfront Fee</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-bold">VA Loan</td>
                <td className="p-3">0.0%</td>
                <td className="p-3">$0.00 / mo</td>
                <td className="p-3">2.15% (Funding Fee)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">FHA Loan</td>
                <td className="p-3">3.5%</td>
                <td className="p-3">0.55% annual</td>
                <td className="p-3">1.75% (UFMIP)</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">Conventional</td>
                <td className="p-3">3.0% - 5.0%</td>
                <td className="p-3">0.3% - 1.5%</td>
                <td className="p-3">$0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[9]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[4]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[4]}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[5]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[5]}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[10]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[6]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[6]}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[7]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[7]}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[11]}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${data.h2s[11]}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[12]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-xs">${data.h3s[8]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[8]}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-xs">${data.h3s[9]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[9]}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-xs">${data.h3s[10]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[10]}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[13]}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${data.h2s[13]}
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "${loc}",
  calculatorSlug: "va-mortgage-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
`;
  writeFile(`src/i18n/content/va/${loc}.tsx`, contentCode);

  const overlayCode = `export const ${loc.toUpperCase()}_VA_OVERLAY = {
  title: "${data.h1}",
  description: "${data.metaDesc}",
  inputs: ${JSON.stringify(data.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(data.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_VA_OVERLAY;
`;
  writeFile(`src/i18n/overlays/va/${loc}.ts`, overlayCode);
}
console.log("✓ VA Mortgage generation complete.");
