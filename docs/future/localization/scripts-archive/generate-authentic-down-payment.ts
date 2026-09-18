import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

const DOWN_PAYMENT_TRANSLATIONS = {
  es: {
    h1: "Calculadora de Pago Inicial (Entrada Hipotecaria)",
    metaTitle: "Calculadora de Pago Inicial — Entrada de Vivienda, PMI y Ahorro",
    metaDesc: "Calcule la entrada requerida para comprar vivienda, comparativa de cuotas con 3%, 5%, 10% y 20%, eliminación del seguro PMI y coste de oportunidad.",
    keywords: ["calculadora de pago inicial", "entrada hipoteca", "calculadora pmi", "cuanto pagar de entrada"],
    h2s: [
      "¿Qué es el Pago Inicial y Cómo Funciona?",
      "¿Cuánto Pago Inicial Necesita Realmente?",
      "El Mito del 20% de Entrada frente a la Realidad",
      "Programas Hipotecarios y Requisitos Mínimos de Entrada",
      "Seguro Hipotecario Privado (PMI) y Cómo Eliminarlo (80% vs 78% LTV)",
      "Programas de Asistencia para el Pago Inicial (DPA)",
      "Resumen Educativo y Recomendaciones"
    ],
    h3s: [
      "0% de Entrada",
      "3% – 3.5% de Entrada",
      "20% de Entrada",
      "Ventajas del 20% de Entrada",
      "Desventajas y Coste de Oportunidad del 20%",
      "Solicitud de Cancelación del Prestatario al 80% LTV",
      "Cancelación Automática por el Prestamista al 78% LTV"
    ],
    faqs: [
      { question: "¿Cuánto debería aportar de entrada para comprar una casa?", answer: "Depende de sus ahorros y del tipo de préstamo; la mayoría de los compradores aportan entre el 3% y el 20% del precio de compra." },
      { question: "¿Es obligatorio aportar el 20% de entrada para comprar una vivienda?", answer: "No, la mayoría de los préstamos convencionales y respaldados por el gobierno permiten entradas de entre el 0% y el 5%." },
      { question: "¿Cómo influye el pago inicial en la cuota mensual de la hipoteca?", answer: "Una mayor entrada reduce el principal del préstamo, el interés acumulado y elimina o reduce la prima del seguro PMI." },
      { question: "¿Cómo afecta la entrada al seguro hipotecario privado (PMI)?", answer: "Con una entrada inferior al 20%, se requiere PMI hasta que el capital acumulado alcance al menos el 20% del valor de la vivienda." },
      { question: "¿Cuánto dinero en efectivo necesito al cierre además de la entrada?", answer: "Debe prever entre un 2% y un 5% adicional sobre el precio del inmueble para cubrir los costes de cierre e impuestos." },
      { question: "¿Es posible comprar una casa con un 0% de entrada?", answer: "Sí, mediante programas especializados como los préstamos VA (para veteranos) o préstamos USDA (para zonas rurales elegibles)." },
      { question: "¿Cuál es la diferencia entre dar un 3%, 5%, 10% o 20% de entrada?", answer: "A menor entrada, mayor es el préstamo mensual y el coste de PMI, pero se preserva liquidez para emergencias e inversiones." },
      { question: "¿Conviene dar más entrada o invertir el dinero extra?", answer: "Depende de la comparación entre el tipo de interés hipotecario neto y el rendimiento esperado de sus inversiones alternativas." },
      { question: "¿Cómo se calcula el PMI y cuándo puede eliminarse?", answer: "Cuesta entre el 0.3% y el 1.5% anual del préstamo y puede solicitarse su cancelación al 80% de LTV o automáticamente al 78% de LTV." },
      { question: "¿Qué es el ratio préstamo-valor (LTV)?", answer: "Es el importe total del préstamo dividido entre el valor tasado de la propiedad expresado en porcentaje." },
      { question: "¿Se pueden utilizar donaciones o ayudas familiares para el pago inicial?", answer: "Sí, la mayoría de los programas admiten fondos donados siempre que se documenten con una carta de donación formal." },
      { question: "¿Cuánto tiempo me llevará ahorrar para el pago inicial?", answer: "El tiempo depende de sus ingresos netos, tasa de ahorro mensual y el precio objetivo de la vivienda." }
    ],
    overlayInputs: {
      homePrice: "Precio de Compra de la Vivienda",
      downPaymentPct: "Porcentaje de Entrada (%)",
      interestRate: "Tipo de Interés Anual (%)",
      loanTermYears: "Plazo del Préstamo (Años)"
    },
    overlayOutputs: {
      downPaymentAmount: "Importe de Entrada en Efectivo",
      loanAmount: "Importe del Préstamo Hipotecario",
      monthlyPayment: "Cuota Mensual (PITI Estimado)",
      pmiMonthly: "Seguro Hipotecario Privado (PMI)"
    }
  },
  fr: {
    h1: "Calculateur de Mise de Fonds (Apport Personnel)",
    metaTitle: "Calculateur de Mise de Fonds — Apport Personnel, PMI et Mensualités",
    metaDesc: "Calculez votre mise de fonds pour l'achat immobilier, comparez les paliers 3%, 5%, 10% et 20%, l'assurance PMI et le coût d'opportunité.",
    keywords: ["calculateur mise de fonds", "apport personnel immobilier", "assurance pmi", "achat maison apport"],
    h2s: [
      "Qu'est-ce qu'une Mise de Fonds et Comment Fonctionne-t-elle ?",
      "De Combien d'Apport Avez-Vous Réellement Besoin ?",
      "Le Mythe des 20% d'Apport face à la Réalité du Marché",
      "Programmes de Prêts et Exigences Minimales d'Apport",
      "Assurance Prêt Privée (PMI) et Modalités de Résiliation (80% vs 78% LTV)",
      "Programmes d'Aide à la Mise de Fonds (DPA)",
      "Synthèse Éducative et Recommandations"
    ],
    h3s: [
      "0% de Mise de Fonds",
      "3% à 3.5% de Mise de Fonds",
      "20% de Mise de Fonds",
      "Avantages d'un Apport de 20%",
      "Inconvénients et Coût d'Opportunité des 20%",
      "Demande de Résiliation à l'Initiative de l'Emprunteur à 80% LTV",
      "Résiliation Automatique par le Prêteur à 78% LTV"
    ],
    faqs: [
      { question: "Combien devrais-je verser en mise de fonds pour acheter une maison ?", answer: "Cela dépend de vos économies et du prêt ; la majorité des acheteurs versent entre 3 % et 20 % du prix d'achat." },
      { question: "Est-il obligatoire d'apporter 20% pour acheter un logement ?", answer: "Non, de nombreux programmes hypothécaires permettent d'acheter avec seulement 3 % à 5 % d'apport personnel." },
      { question: "Quel est l'impact de l'apport sur la mensualité du prêt ?", answer: "Un apport supérieur diminue le capital emprunté, réduit les intérêts globaux et élimine ou abrège la prime d'assurance PMI." },
      { question: "Comment l'apport influence-t-il l'assurance hypothécaire privée (PMI) ?", answer: "Avec moins de 20 % d'apport, une assurance PMI est obligatoire jusqu'à ce que votre valeur nette atteigne au moins 20 %." },
      { question: "Combien d'argent liquide faut-il prévoir pour les frais de clôture ?", answer: "Prévoyez entre 2 % et 5 % du prix d'achat pour couvrir les frais de notaire, taxes et formalités administratives." },
      { question: "Peut-on acheter un bien immobilier avec 0% d'apport ?", answer: "Oui, via des programmes spécifiques comme les prêts VA (anciens combattants) ou USDA (zones rurales éligibles)." },
      { question: "Quelle est la différence entre un apport de 3%, 5%, 10% ou 20% ?", answer: "Un apport plus faible préserve votre épargne mais augmente vos mensualités et le coût cumulé de l'assurance emprunteur." },
      { question: "Vaut-il mieux maximiser l'apport ou investir son capital ?", answer: "Cela dépend de la comparaison entre le coût réel du crédit hypothécaire et le rendement net attendu de vos placements financiers." },
      { question: "Comment est calculée la prime PMI et quand est-elle supprimée ?", answer: "Elle représente 0,3 % à 1,5 % par an du prêt et peut être résiliée dès 80 % de LTV ou automatiquement à 78 % de LTV." },
      { question: "Qu'est-ce que le ratio prêt-valeur (LTV) ?", answer: "C'est le montant total de la dette hypothécaire divisé par la valeur expertisée du bien exprimé en pourcentage." },
      { question: "Peut-on utiliser un don familial pour financer l'apport ?", answer: "Oui, la plupart des banques acceptent les dons d'argent des proches justifiés par une attestation de don officielle." },
      { question: "Combien de temps faut-il pour constituer une mise de fonds ?", answer: "Le délai dépend de vos revenus nets, de votre capacité d'épargne mensuelle et du prix visé de votre future propriété." }
    ],
    overlayInputs: {
      homePrice: "Prix d'Achat du Bien Immobilier",
      downPaymentPct: "Pourcentage d'Apport (%)",
      interestRate: "Taux d'Intérêt Annuel (%)",
      loanTermYears: "Durée du Prêt (Années)"
    },
    overlayOutputs: {
      downPaymentAmount: "Montant de l'Apport en Capital",
      loanAmount: "Montant du Prêt Hypothécaire",
      monthlyPayment: "Mensualité Globale Estimée",
      pmiMonthly: "Assurance Hypothécaire (PMI)"
    }
  },
  de: {
    h1: "Eigenkapital-Rechner (Anzahlung für Immobilienkauf)",
    metaTitle: "Eigenkapital-Rechner — Anzahlung, PMI-Versicherung & Tilgung",
    metaDesc: "Berechnen Sie die optimale Anzahlung für den Hauskauf, Monatsraten bei 3%, 5%, 10% und 20% Eigenkapital sowie Opportunitätskosten.",
    keywords: ["eigenkapital rechner", "anzahlung hauskauf", "pmi versicherung", "baufinanzierung eigenkapital"],
    h2s: [
      "Was ist eine Anzahlung und wie funktioniert sie?",
      "Wie viel Eigenkapital benötigen Sie wirklich?",
      "Der Mythos von 20% Eigenkapital im Realitätscheck",
      "Kreditprogramme und Mindestanforderungen an Eigenkapital",
      "Private Hypothekenversicherung (PMI) und Kündigung (80% vs. 78% LTV)",
      "Förderprogramme und staatliche Zuschüsse",
      "Zusammenfassung und Praxisempfehlungen"
    ],
    h3s: [
      "0% Anzahlung (Vollfinanzierung)",
      "3% bis 3,5% Anzahlung",
      "20% Anzahlung",
      "Vorteile von 20% Eigenkapital",
      "Nachteile und Opportunitätskosten von 20%",
      "Kündigung auf Antrag des Kreditnehmers bei 80% LTV",
      "Automatische Beendigung durch den Kreditgeber bei 78% LTV"
    ],
    faqs: [
      { question: "Wie viel Eigenkapital sollte man für den Hauskauf einbringen?", answer: "Die meisten Käufer bringen zwischen 3 % und 20 % des Kaufpreises ein, abhängig von Reserven und Kreditprogramm." },
      { question: "Sind 20% Eigenkapital zwingend vorgeschrieben?", answer: "Nein, viele Standardprogramme ermöglichen den Erwerb bereits mit 3 % bis 5 % Anzahlung." },
      { question: "Wie wirkt sich die Anzahlung auf die monatliche Rate aus?", answer: "Mehr Eigenkapital verringert die Darlehenssumme, senkt die Zinskosten und vermeidet teure Zusatzversicherungen wie PMI." },
      { question: "Wie beeinflusst die Anzahlung die Hypothekenversicherung (PMI)?", answer: "Bei weniger als 20 % Eigenkapital wird PMI fällig, bis die Beleihungsgrenze unter 80 % sinkt." },
      { question: "Wie viel Bargeld wird zusätzlich für Kaufnebenkosten benötigt?", answer: "Planen Sie zusätzlich 2 % bis 5 % des Kaufpreises für Notar, Grunderwerbsteuer und Gebühren ein." },
      { question: "Kann man ein Haus mit 0% Eigenkapital finanzieren?", answer: "Ja, im Rahmen spezieller Förderungen wie VA-Krediten (für Veteranen) oder USDA-Krediten im ländlichen Raum." },
      { question: "Was unterscheidet 3%, 5%, 10% und 20% Anzahlung?", answer: "Weniger Eigenkapital schont die Liquiditätsreserve, führt aber zu höheren monatlichen Zins- und Versicherungsausgaben." },
      { question: "Sollte man mehr anzahlen oder das Geld anlegen?", answer: "Entscheidend ist der Zinsvergleich zwischen Bauzinsen und der nach Steuern erwarteten Rendite am Kapitalmarkt." },
      { question: "Wie wird PMI berechnet und wann entfällt sie?", answer: "PMI kostet 0,3 % bis 1,5 % jährlich und kann ab 80 % LTV gekündigt werden bzw. entfällt automatisch ab 78 % LTV." },
      { question: "Was ist der Beleihungsauslauf (LTV)?", answer: "Das prozentuale Verhältnis der Darlehenssumme zum ermittelten Verkehrswert der Immobilie." },
      { question: "Dürfen Schenkungen von Verwandten als Anzahlung genutzt werden?", answer: "Ja, geschenktes Eigenkapital wird von Banken mit einer entsprechenden Schenkungsbestätigung anerkannt." },
      { question: "Wie lange dauert das Ansparen der nötigen Anzahlung?", answer: "Die Dauer hängt von Nettoeinkommen, monatlicher Sparrate und dem angestrebten Kaufpreis ab." }
    ],
    overlayInputs: {
      homePrice: "Immobilienkaufpreis",
      downPaymentPct: "Eigenkapitalanteil (%)",
      interestRate: "Sollzinssatz p.a. (%)",
      loanTermYears: "Darlehenslaufzeit (Jahre)"
    },
    overlayOutputs: {
      downPaymentAmount: "Eingebrachtes Eigenkapital",
      loanAmount: "Nettodarlehensbetrag",
      monthlyPayment: "Geschätzte Monatsrate",
      pmiMonthly: "Monatliche Hypothekenversicherung (PMI)"
    }
  },
  hi: {
    h1: "डाउन पेमेंट कैलकुलेटर (गृह ऋण अग्रिम भुगतान)",
    metaTitle: "डाउन पेमेंट कैलकुलेटर — होम लोन अग्रिम भुगतान, PMI एवं मासिक किस्त",
    metaDesc: "घर खरीदने के लिए आवश्यक डाउन पेमेंट, 3%, 5%, 10% और 20% स्तरों पर मासिक किस्तों और PMI समाप्ति मील के पत्थर की गणना करें।",
    keywords: ["डाउन पेमेंट कैलकुलेटर", "होम लोन डाउन पेमेंट", "PMI कैलकुलेटर", "घर की अग्रिम राशि"],
    h2s: [
      "डाउन पेमेंट क्या है और यह कैसे काम करता है?",
      "आपको वास्तव में कितने डाउन पेमेंट की आवश्यकता है?",
      "20% डाउन पेमेंट का मिथक बनाम बाजार की वास्तविकता",
      "ऋण कार्यक्रम और न्यूनतम डाउन पेमेंट की शर्तें",
      "प्राइवेट मॉर्गेज इंश्योरेंस (PMI) और इसे हटाने के नियम (80% बनाम 78% LTV)",
      "डाउन पेमेंट सहायता (DPA) सरकारी कार्यक्रम",
      "शैक्षिक सारांश एवं महत्वपूर्ण वित्तीय सलाह"
    ],
    h3s: [
      "0% डाउन पेमेंट",
      "3% – 3.5% डाउन पेमेंट",
      "20% डाउन पेमेंट",
      "20% डाउन पेमेंट के प्रमुख लाभ",
      "20% डाउन पेमेंट की कमियां और अवसर लागत",
      "80% LTV पर ऋण लेने वाले द्वारा रद्दीकरण अनुरोध",
      "78% LTV पर ऋणदाता द्वारा स्वतः समाप्ति"
    ],
    faqs: [
      { question: "घर खरीदने के लिए कितना डाउन पेमेंट देना चाहिए?", answer: "यह आपकी बचत और ऋण प्रकार पर निर्भर करता है; अधिकांश खरीदार 3% से 20% के बीच अग्रिम भुगतान करते हैं।" },
      { question: "क्या घर खरीदने के लिए 20% डाउन पेमेंट अनिवार्य है?", answer: "नहीं, कई मानक और सरकारी ऋण कार्यक्रम 3% से 5% के न्यूनतम डाउन पेमेंट पर भी उपलब्ध हैं।" },
      { question: "डाउन पेमेंट मासिक होम लोन किस्त को कैसे प्रभावित करता है?", answer: "अधिक डाउन पेमेंट से ऋण का मूलधन घटता है, कुल ब्याज कम होता है और अतिरिक्त बीमा शुल्क नहीं लगता।" },
      { question: "डाउन पेमेंट प्राइवेट मॉर्गेज इंश्योरेंस (PMI) को कैसे प्रभावित करता है?", answer: "20% से कम डाउन पेमेंट पर PMI शुल्क लागू होता है जब तक कि घर में इक्विटी 20% तक न पहुंच जाए।" },
      { question: "डाउन पेमेंट के अलावा क्लोजिंग पर कितनी नकदी चाहिए?", answer: "पंजीकरण, कानूनी शुल्क और करों के लिए घर के मूल्य का अतिरिक्त 2% से 5% नकद रखना चाहिए।" },
      { question: "क्या 0% डाउन पेमेंट पर घर खरीदा जा सकता है?", answer: "हाँ, विशेष सरकारी योजनाओं जैसे VA या USDA ऋणों के अंतर्गत पात्र खरीदार शून्य डाउन पेमेंट पर घर ले सकते हैं।" },
      { question: "3%, 5%, 10% और 20% डाउन पेमेंट में क्या अंतर है?", answer: "कम डाउन पेमेंट से आपातकालीन बचत बची रहती है, लेकिन मासिक किस्त और कुल ब्याज का बोझ बढ़ जाता है।" },
      { question: "क्या अधिक डाउन पेमेंट करना चाहिए या अतिरिक्त पैसा निवेश करना चाहिए?", answer: "यह होम लोन की ब्याज दर और वैकल्पिक निवेश से मिलने वाले अपेक्षित रिटर्न की तुलना पर निर्भर करता है।" },
      { question: "PMI की गणना कैसे होती है और यह कब समाप्त होता है?", answer: "यह वार्षिक 0.3% से 1.5% होता है और 80% LTV पर अनुरोध द्वारा या 78% LTV पर स्वतः समाप्त हो जाता है।" },
      { question: "लोन-टू-वैल्यू (LTV) अनुपात क्या है?", answer: "यह संपत्ति के मूल्यांकन मूल्य के मुकाबले लिए गए कुल ऋण का प्रतिशत अनुपात है।" },
      { question: "क्या रिश्तेदारों से मिले उपहार के पैसे का उपयोग डाउन पेमेंट में हो सकता है?", answer: "हाँ, औपचारिक गिफ्ट डीड और दस्तावेज़ीकरण के साथ बैंक उपहार राशि को स्वीकार करते हैं।" },
      { question: "डाउन पेमेंट की बचत करने में कितना समय लगेगा?", answer: "यह आपकी शुद्ध आय, मासिक बचत दर और घर के लक्षित खरीद मूल्य पर निर्भर करता है।" }
    ],
    overlayInputs: {
      homePrice: "घर का कुल खरीद मूल्य",
      downPaymentPct: "डाउन पेमेंट प्रतिशत (%)",
      interestRate: "वार्षिक ब्याज दर (%)",
      loanTermYears: "ऋण अवधि (वर्ष)"
    },
    overlayOutputs: {
      downPaymentAmount: "कुल डाउन पेमेंट नकद राशि",
      loanAmount: "स्वीकृत बंधक ऋण राशि",
      monthlyPayment: "अनुमानित कुल मासिक किस्त",
      pmiMonthly: "मासिक प्राइवेट मॉर्गेज इंश्योरेंस"
    }
  },
  pt: {
    h1: "Calculadora de Entrada para Compra de Imóvel",
    metaTitle: "Calculadora de Entrada — Pagamento Inicial, Seguro PMI e Prestações",
    metaDesc: "Calcule o valor de entrada para compra de casa, compare prestações a 3%, 5%, 10% e 20%, custos do seguro PMI e custo de oportunidade.",
    keywords: ["calculadora de entrada", "pagamento inicial imovel", "seguro pmi", "financiamento habitacao entrada"],
    h2s: [
      "O que é o Pagamento de Entrada e Como Funciona?",
      "De Quanto Pagamento Inicial Precisa Realmente?",
      "O Mito dos 20% de Entrada face à Realidade de Mercado",
      "Programas de Crédito e Exigências Mínimas de Entrada",
      "Seguro Hipotecário Privado (PMI) e Como Cancelá-lo (80% vs. 78% LTV)",
      "Programas Públicos de Apoio à Entrada (DPA)",
      "Resumo Educativo e Recomendações Práticas"
    ],
    h3s: [
      "0% de Entrada (Financiamento a 100%)",
      "3% a 3,5% de Entrada",
      "20% de Entrada",
      "Vantagens de uma Entrada de 20%",
      "Desvantagens e Custos de Oportunidade dos 20%",
      "Pedido de Cancelamento pelo Mutuário a 80% LTV",
      "Cancelamento Automático pelo Credor a 78% LTV"
    ],
    faqs: [
      { question: "Quanto devo dar de entrada para comprar uma casa?", answer: "Depende das suas poupanças e do tipo de crédito; a maioria dos compradores entrega entre 3% e 20% do valor da compra." },
      { question: "É obrigatório dar 20% de entrada para comprar habitação?", answer: "Não, diversos programas de crédito à habitação permitem avançar com apenas 3% a 5% de entrada." },
      { question: "Como influencia a entrada o valor da prestação mensal?", answer: "Uma entrada superior reduz o capital em dívida, poupa em juros futuros e elimina despesas de seguros como o PMI." },
      { question: "De que forma a entrada afeta o seguro hipotecário privado (PMI)?", answer: "Com menos de 20% de entrada, o seguro PMI é obrigatório até que o rácio de dívida desça abaixo dos 80% do valor do imóvel." },
      { question: "De quanto dinheiro em liquidez preciso para os custos de fecho?", answer: "Reserve entre 2% e 5% adicionais sobre o valor do imóvel para impostos, comissões bancárias e registos notariais." },
      { question: "É possível comprar casa com 0% de entrada?", answer: "Sim, através de programas específicos garantidos pelo Estado para beneficiários elegíveis como veteranos ou zonas rurais." },
      { question: "Qual a diferença entre uma entrada de 3%, 5%, 10% ou 20%?", answer: "Menos entrada preserva o seu fundo de emergência, mas eleva a prestação mensal e o montante global de juros a pagar." },
      { question: "Compensa dar mais entrada ou aplicar o dinheiro noutros investimentos?", answer: "Depende da comparação entre o custo efetivo do crédito à habitação e o rendimento líquido esperado das suas aplicações." },
      { question: "Como é calculado o PMI e quando deixa de ser cobrado?", answer: "Custa entre 0,3% e 1,5% ao ano sobre o empréstimo e pode ser cancelado a 80% de LTV ou automaticamente a 78% de LTV." },
      { question: "O que significa o rácio Loan-to-Value (LTV)?", answer: "É a percentagem que o montante financiado representa face ao valor de avaliação da habitação." },
      { question: "Podem usar-se doações de familiares para o pagamento de entrada?", answer: "Sim, os bancos aceitam valores doados mediante declaração comprovativa de doação familiar." },
      { question: "Quanto tempo demora a juntar o dinheiro para a entrada?", answer: "O tempo necessário dependerá do seu rendimento líquido, da taxa de poupança mensal e do valor da casa pretendida." }
    ],
    overlayInputs: {
      homePrice: "Preço de Compra do Imóvel",
      downPaymentPct: "Percentagem de Entrada (%)",
      interestRate: "Taxa de Juro Anual (%)",
      loanTermYears: "Prazo do Crédito (Anos)"
    },
    overlayOutputs: {
      downPaymentAmount: "Valor Total da Entrada em Capital",
      loanAmount: "Montante Financiado pelo Banco",
      monthlyPayment: "Prestação Mensal Total Estimada",
      pmiMonthly: "Seguro Hipotecário Privado (PMI)"
    }
  }
};

for (const loc of LOCALES) {
  const data = DOWN_PAYMENT_TRANSLATIONS[loc];

  const contentCode = `import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(data.faqs, null, 2)};

export const seo = {
  title: "${data.metaTitle}",
  description: "${data.metaDesc}",
  keywords: ${JSON.stringify(data.keywords)}
};

export const ContentComponent = function DownPaymentContent${loc.toUpperCase()}() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[0]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[0]}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[1]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[1]}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[2]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[2]}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[2]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-emerald-600 text-sm">${data.h3s[3]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[3]}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-amber-600 text-sm">${data.h3s[4]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[4]}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[3]}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-200 dark:border-slate-800 rounded-xl">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                <th className="p-3">Program</th>
                <th className="p-3">Min Down Payment</th>
                <th className="p-3">Credit Score</th>
                <th className="p-3">PMI / MIP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-3 font-bold">Conventional 97</td>
                <td className="p-3">3.0%</td>
                <td className="p-3">620+</td>
                <td className="p-3">Cancelable PMI</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">FHA Loan</td>
                <td className="p-3">3.5%</td>
                <td className="p-3">580+</td>
                <td className="p-3">Life of Loan MIP</td>
              </tr>
              <tr>
                <td className="p-3 font-bold">VA Mortgage</td>
                <td className="p-3">0.0%</td>
                <td className="p-3">580 - 620</td>
                <td className="p-3">None (Funding Fee)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[4]}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[5]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[5]}</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[6]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[6]}</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[5]}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${data.h2s[5]}
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[6]}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${data.h2s[6]}
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "${loc}",
  calculatorSlug: "down-payment-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
`;
  writeFile(`src/i18n/content/down-payment/${loc}.tsx`, contentCode);

  const overlayCode = `export const ${loc.toUpperCase()}_DOWN_PAYMENT_OVERLAY = {
  title: "${data.h1}",
  description: "${data.metaDesc}",
  inputs: ${JSON.stringify(data.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(data.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_DOWN_PAYMENT_OVERLAY;
`;
  writeFile(`src/i18n/overlays/down-payment/${loc}.ts`, overlayCode);
}
console.log("✓ Down Payment generation complete.");
