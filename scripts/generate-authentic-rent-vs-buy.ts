import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

const RENT_VS_BUY_TRANSLATIONS = {
  es: {
    h1: "Calculadora de Alquilar vs. Comprar Vivienda",
    metaTitle: "Calculadora de Alquilar vs. Comprar — Horizonte de Equilibrio y Patrimonio",
    metaDesc: "Compare comprar frente a alquilar casa, horizonte de amortización, costes irrecuperables, regla del 5% y divergencia patrimonial a 30 años.",
    keywords: ["calculadora alquilar o comprar", "alquiler vs compra", "punto de equilibrio inmobiliario", "regla del 5 por ciento"],
    h2s: [
      "2. ¿Qué Hace Realmente una Calculadora de Alquilar vs. Comprar?",
      "3. La Idea Clave: Comparar la Economía Total, no Solo el Pago Mensual",
      "4. Cómo Utilizar la Calculadora",
      "5. Explicación Detallada de Parámetros de Entrada",
      "6. Cómo Funciona el Componente Hipotecario",
      "7. Costes de Compra más allá de la Hipoteca",
      "8. Por Qué el Tiempo de Permanencia es Determinante",
      "9. Explicación del Punto de Equilibrio (Breakeven)",
      "10. Revalorización Inmobiliaria y Plusvalía",
      "11. Crecimiento de los Precios del Alquiler (Inflación)",
      "12. Coste de Oportunidad del Pago Inicial",
      "13. Ratio Precio-Alquiler (Price-to-Rent Ratio)",
      "14. La Regla del 5% de Ben Felix",
      "15. Ventajas Fiscales y Escudo de Intereses Hipotecarios",
      "16. Patrimonio Neto: Valor Neto de la Vivienda vs. Cartera de Inversión",
      "17. Por Qué Comprar Gana en un Escenario y Alquilar en Otro",
      "18. Decisiones Habitacionales a Corto Plazo vs. Largo Plazo",
      "19. Errores Comunes que Deben Evitarse",
      "20. Una Forma Mejor de Usar la Calculadora: Análisis de Escenarios",
      "21. Metodología y Fórmulas Fundamentales"
    ],
    h3s: [
      "5.1 Precio de la Vivienda y Pago Inicial",
      "5.2 Tipo de Interés Hipotecario y Plazo",
      "5.3 IBI, Seguro de Hogar, Mantenimiento y Comunidad",
      "5.4 Alquiler Mensual y Crecimiento Anual",
      "21.1 Pago Hipotecario Mensual",
      "21.2 Evolución del Valor de la Vivienda",
      "21.3 Evolución de la Renta del Alquiler",
      "21.4 Ratio Precio-Alquiler",
      "21.5 Coste de Oportunidad del Capital",
      "21.6 Beneficio y Deducción Fiscal"
    ],
    faqs: [
      { question: "¿Cómo funciona una calculadora de alquilar vs. comprar?", answer: "Compara el coste financiero total e irrecuperable de comprar y alquilar a lo largo del tiempo, proyectando el patrimonio neto acumulado." },
      { question: "¿Cuántos años debo prever quedarme en una vivienda antes de que convenga comprar?", answer: "Por lo general, se requiere permanecer entre 4 y 7 años para amortizar los elevados costes de cierre de compra y venta." },
      { question: "¿Qué costes se incluyen al comparar alquiler y compra?", answer: "Incluye hipoteca, IBI, seguros, mantenimiento, comunidad, inflación de rentas y el rendimiento alternativo de la entrada." },
      { question: "¿Qué es el ratio precio-alquiler (Price-to-Rent)?", answer: "Es el precio medio de compra dividido por el alquiler anual. Un ratio inferior a 15 suele favorecer la compra; superior a 20 favorece el alquiler." },
      { question: "¿Qué es la regla del 5% para alquilar vs. comprar?", answer: "Estima que el coste irrecuperable anual de la propiedad ronda el 5% de su valor (1% IBI + 1% mantenimiento + 3% coste de capital)." },
      { question: "¿Cómo afectan los intereses hipotecarios y la amortización de capital?", answer: "El pago de capital genera patrimonio propio, mientras que los intereses representan un coste irrecuperable similar al alquiler." },
      { question: "¿Cómo influye la revalorización de la vivienda en la decisión?", answer: "Una mayor plusvalía acelera el punto de equilibrio a favor de la compra al incrementar el patrimonio inmobiliario neto." },
      { question: "¿Cómo afecta la inflación de los alquileres?", answer: "Los alquileres tienden a subir con la inflación, mientras que una hipoteca a tipo fijo mantiene congelada la cuota mensual de capital e intereses." },
      { question: "¿Cómo influye el coste de oportunidad del pago inicial?", answer: "El capital entregado de entrada no genera plusvalías bursátiles, lo que representa un coste de oportunidad frente al alquiler con inversión en bolsa." },
      { question: "¿Cómo afectan los costes de cierre y venta al punto de equilibrio?", answer: "Los gastos notariales de compra (2-5%) y comisiones de venta (6-8%) crean una desventaja inicial que requiere años de permanencia para compensarse." },
      { question: "¿Incluye la calculadora deducciones fiscales por hipoteca e IBI?", answer: "Sí, evalúa el impacto del escudo fiscal cuando las deducciones desglosadas superan la deducción estándar aplicable." },
      { question: "¿Por qué comprar puede ganar en un escenario y alquilar en otro?", answer: "La decisión depende fuertemente del tiempo de permanencia, las expectativas de rentabilidad financiera y los costes locales de mantenimiento." }
    ],
    overlayInputs: {
      homePrice: "Precio de Compra del Inmueble",
      downPaymentPct: "Entrada en Porcentaje (%)",
      interestRate: "Tipo de Interés Hipotecario (%)",
      monthlyRent: "Alquiler Mensual Equivalente"
    },
    overlayOutputs: {
      breakevenYears: "Años para Punto de Equilibrio",
      buyingNetWorth: "Patrimonio Neto Comprando (30 Años)",
      rentingNetWorth: "Patrimonio Neto Alquilando (30 Años)",
      monthlyCostAdvantage: "Diferencial de Coste Mensual Inicial"
    }
  },
  fr: {
    h1: "Calculateur Louer vs. Acheter un Logement",
    metaTitle: "Calculateur Louer ou Acheter — Seuil de Rentabilité et Patrimoine",
    metaDesc: "Comparez l'achat et la location immobilière, l'horizon d'amortissement, les coûts irrécupérables, la règle des 5% et la divergence patrimoniale.",
    keywords: ["calculateur louer ou acheter", "location vs achat immobilier", "seuil de rentabilite", "regle des 5 pourcent"],
    h2s: [
      "2. Que Fait Réellement un Calculateur Louer vs Acheter ?",
      "3. L'Idée Fondamentale : Comparer l'Économie Globale, Pas Seulement la Mensualité",
      "4. Comment Utiliser le Calculateur",
      "5. Explication Détaillée des Paramètres d'Entrée",
      "6. Fonctionnement du Volet Hypothécaire",
      "7. Coûts d'Achat au-delà du Prêt Hypothécaire",
      "8. Pourquoi la Durée d'Occupation est Déterminante",
      "9. Comprendre le Point Mort (Seuil de Rentabilité)",
      "10. Plus-Value et Valorisation Immobilière",
      "11. Croissance des Loyers et Inflation Locative",
      "12. Coût d'Opportunité de l'Apport Personnel",
      "13. Ratio Prix/Loyer (Price-to-Rent Ratio)",
      "14. La Règle des 5% de Ben Felix",
      "15. Avantages Fiscaux et Déductibilité des Intérêts",
      "16. Patrimoine Net : Équité Immobilière vs Portefeuille d'Investissement",
      "17. Pourquoi l'Achat Gagne dans un Cas et la Location dans l'Autre",
      "18. Décisions Résidentielles à Court Terme vs Long Terme",
      "19. Erreurs Fréquentes à Éviter",
      "20. Analyse de Scénarios Comparatifs",
      "21. Méthodologie et Formules Mathématiques"
    ],
    h3s: [
      "5.1 Prix du Bien et Apport Personnel",
      "5.2 Taux d'Intérêt Hypothécaire et Durée",
      "5.3 Taxe Foncière, Assurance, Entretien et Charges",
      "5.4 Loyer Mensuel et Hausse Annuelle",
      "21.1 Mensualité Hypothécaire",
      "21.2 Valorisation du Bien Immobilier",
      "21.3 Évolution de la Rente Locative",
      "21.4 Ratio Prix/Loyer",
      "21.5 Coût d'Opportunité du Capital",
      "21.6 Bouclier et Déduction Fiscale"
    ],
    faqs: [
      { question: "Comment fonctionne un calculateur louer vs. acheter ?", answer: "Il compare l'ensemble des flux financiers et des coûts irrécupérables des deux options pour projeter l'évolution de votre patrimoine net." },
      { question: "Combien d'années faut-il rester dans un logement pour rentabiliser l'achat ?", answer: "Il faut généralement entre 4 et 7 ans pour amortir les frais de notaire à l'achat et les commissions de revente." },
      { question: "Quels coûts sont pris en compte dans la comparaison ?", answer: "Hypothèque, taxes foncières, assurance habitation, entretien, charges de copropriété et rendement alternatif de l'apport." },
      { question: "Qu'est-ce que le ratio prix/loyer (Price-to-Rent) ?", answer: "Le prix d'achat divisé par le loyer annuel. Inférieur à 15, il favorise l'achat ; supérieur à 20, il favorise la location." },
      { question: "Qu'est-ce que la règle des 5% de Ben Felix ?", answer: "Elle estime que le coût irrécupérable annuel de la propriété est d'environ 5% (1% taxes + 1% entretien + 3% coût du capital)." },
      { question: "Comment agissent les intérêts et l'amortissement du capital ?", answer: "Le remboursement du capital crée du patrimoine net, tandis que les intérêts sont une dépense sèche comparable au loyer." },
      { question: "Quel est l'impact de l'appréciation du marché immobilier ?", answer: "Une hausse de la valeur du bien accélère la rentabilité de l'achat en augmentant la plus-value nette à la revente." },
      { question: "Comment l'inflation des loyers influence-t-elle le résultat ?", answer: "Les loyers augmentent régulièrement avec l'inflation, alors qu'un prêt à taux fixe garantit des mensualités stables." },
      { question: "Quel est le coût d'opportunité de l'apport personnel ?", answer: "L'argent immobilisé dans l'apport ne produit pas de rendements boursiers, ce qui constitue un manque à gagner face à la location." },
      { question: "Quel est l'effet des frais de transaction à l'achat et à la revente ?", answer: "Les frais d'acquisition (notaire, droits) et de revente (agences) imposent un horizon de détention suffisant pour être rentabilisés." },
      { question: "Le calculateur tient-il compte des économies d'impôt ?", answer: "Oui, il intègre la déduction des intérêts et taxes lorsque le régime fiscal le permet." },
      { question: "Pourquoi l'achat gagne-t-il dans certains cas et la location dans d'autres ?", answer: "Tout dépend de la durée de séjour prévue, du rendement espéré sur les marchés financiers et des coûts réels de la propriété." }
    ],
    overlayInputs: {
      homePrice: "Prix d'Acquisition du Logement",
      downPaymentPct: "Apport Initial (%)",
      interestRate: "Taux du Crédit Immobilier (%)",
      monthlyRent: "Loyer Mensuel Comparable"
    },
    overlayOutputs: {
      breakevenYears: "Délai d'Amortissement (Seuil de Rentabilité)",
      buyingNetWorth: "Patrimoine Net en Achetant (30 Ans)",
      rentingNetWorth: "Patrimoine Net en Louant (30 Ans)",
      monthlyCostAdvantage: "Écart de Coût Mensuel Initial"
    }
  },
  de: {
    h1: "Mieten oder Kaufen Rechner",
    metaTitle: "Mieten oder Kaufen Rechner — Vermögensvergleich & Break-Even-Horizont",
    metaDesc: "Vergleichen Sie Immobilienkauf vs. Miete, Break-Even-Zeitpunkt, unwiederbringliche Kosten, 5%-Regel und 30-Jahre-Vermögensaufbau.",
    keywords: ["mieten oder kaufen rechner", "kauf vs miete", "break even immobilie", "5 prozent regel"],
    h2s: [
      "2. Was leistet ein Mieten-oder-Kaufen-Rechner wirklich?",
      "3. Der Leitgedanke: Gesamtwirtschaftlichkeit statt reiner Monatsrate",
      "4. Bedienung und Eingabehilfen des Rechners",
      "5. Detaillierte Erläuterung aller Eingabeparameter",
      "6. Funktionsweise des Hypotheken- und Tilgungsmodells",
      "7. Gesamtkosten des Eigentums jenseits der Bankrate",
      "8. Warum die geplante Wohndauer kaufentscheidend ist",
      "9. Der Break-Even-Punkt verständlich erklärt",
      "10. Immobilienwertsteigerung und Inflationsschutz",
      "11. Mietpreisentwicklung und Mietsteigerungsdynamik",
      "12. Opportunitätskosten des eingesetzten Eigenkapitals",
      "13. Das Kaufpreis-Miete-Verhältnis (Price-to-Rent Ratio)",
      "14. Die 5%-Regel nach Ben Felix",
      "15. Steuerliche Auswirkungen und Zinsabzug",
      "16. Vermögensvergleich: Immobilienvermögen vs. Wertpapierdepot",
      "17. Warum Kaufen in einem Fall gewinnt und Mieten im anderen",
      "18. Kurzfristige vs. langfristige Wohnentscheidungen",
      "19. Typische Denkfehler beim Kauf-Miet-Vergleich",
      "20. Szenario-Analyse für fundierte Entscheidungen",
      "21. Methodik und mathematische Berechnungsformeln"
    ],
    h3s: [
      "5.1 Immobilienpreis und Eigenkapital",
      "5.2 Hypothekenzins und Zinsbindungsdauer",
      "5.3 Grundsteuer, Gebäudeversicherung, Instandhaltung und Hausgeld",
      "5.4 Kaltmiete und jährliche Mietanpassung",
      "21.1 Monatliche Darlehensrate",
      "21.2 Entwicklung des Immobilienwerts",
      "21.3 Entwicklung der Mietaufwendungen",
      "21.4 Kaufpreis-Miet-Multiplikator",
      "21.5 Opportunitätskosten des Eigenkapitals",
      "21.6 Steuerlicher Freibetrag und Entlastung"
    ],
    faqs: [
      { question: "Wie funktioniert ein Mieten-oder-Kaufen-Rechner?", answer: "Er simuliert alle Zahlungsströme und unwiederbringlichen Kosten beider Pfade über Jahrzehnte und vergleicht das Endvermögen." },
      { question: "Wie viele Jahre sollte man in einer Immobilie wohnen, damit sich ein Kauf lohnt?", answer: "Meist sind 5 bis 8 Jahre erforderlich, um die Kaufnebenkosten (Grunderwerbsteuer, Notar, Makler) und Verkaufsspesen auszugleichen." },
      { question: "Welche Kosten fließen in den Vergleich ein?", answer: "Darlehenszinsen, Instandhaltungsrücklagen, Versicherungen, Verwaltung, Mietsteigerungen und die Rendite alternativer Geldanlagen." },
      { question: "Was besagt das Kaufpreis-Miete-Verhältnis (Kaufpreisfaktor)?", answer: "Kaufpreis geteilt durch Jahreskaltmiete. Unter 20 spricht tendenziell für Kaufen, über 25 eher für Mieten." },
      { question: "Was ist die 5%-Regel von Ben Felix?", answer: "Sie besagt, dass die jährlichen unwiederbringlichen Kosten von Wohneigentum ca. 5% des Werts betragen (1% Steuer + 1% Instandhaltung + 3% Kapitalkosten)." },
      { question: "Wie wirken Zinsen und Tilgung im Vergleich zur Miete?", answer: "Tilgung bildet gebundenes Sachwertvermögen, während Zinszahlungen wie Mietzahlungen verlorener Aufwand sind." },
      { question: "Welche Rolle spielt die Wertsteigerung der Immobilie?", answer: "Reale Wertzuwächse verkürzen die Amortisationszeit des Kaufs und stärken das Nettovermögen beim Wiederverkauf." },
      { question: "Wie wirkt sich die Mietinflation aus?", answer: "Mieten steigen mit der Inflation, während die Raten eines Festzinsdarlehens nominal über Jahrzehnte konstant bleiben." },
      { question: "Was sind Opportunitätskosten des Eigenkapitals?", answer: "Das im Haus gebundene Eigenkapital kann nicht an den Aktienmärkten investiert werden, was Renditeverluste bedeuten kann." },
      { question: "Wie stark beeinflussen Kauf- und Verkaufsnebenkosten das Ergebnis?", answer: "Kaufnebenkosten von 10-15% erzeugen einen anfänglichen Rückstand, der erst durch langfristiges Wohnen amortisiert wird." },
      { question: "Werden Steuervorteile im Rechner berücksichtigt?", answer: "Ja, der Rechner modelliert steuerliche Effekte und Freibeträge entsprechend den Vorgaben." },
      { question: "Warum fällt das Ergebnis regional so unterschiedlich aus?", answer: "Das Resultat hängt stark vom lokalen Preis-Miet-Niveau, der geplanten Haltedauer und der alternativen Depotrendite ab." }
    ],
    overlayInputs: {
      homePrice: "Kaufpreis der Immobilie",
      downPaymentPct: "Eigenkapitalquote (%)",
      interestRate: "Sollzins Hypothek (%)",
      monthlyRent: "Monatliche Vergleichsmiete"
    },
    overlayOutputs: {
      breakevenYears: "Amortisationszeitpunkt (Break-Even)",
      buyingNetWorth: "Nettoendvermögen bei Kauf (30 Jahre)",
      rentingNetWorth: "Nettoendvermögen bei Miete (30 Jahre)",
      monthlyCostAdvantage: "Monatlicher Kostenvorteil zu Beginn"
    }
  },
  hi: {
    h1: "किराया बनाम घर खरीदना कैलकुलेटर (Rent vs. Buy)",
    metaTitle: "किराया बनाम घर खरीदना कैलकुलेटर — ब्रेक-इवन और 30-वर्षीय संपत्ति तुलना",
    metaDesc: "किराए पर रहने और घर खरीदने के वित्तीय प्रभाव, ब्रेक-इवन समय सीमा, 5% नियम और 30 वर्षों में शुद्ध संपत्ति अंतर की तुलना करें।",
    keywords: ["किराया बनाम खरीदना कैलकुलेटर", "घर खरीदें या किराए पर रहें", "ब्रेक-इवन अवधि", "5 प्रतिशत नियम"],
    h2s: [
      "2. रेंट बनाम बाय कैलकुलेटर वास्तव में क्या करता है?",
      "3. मूल विचार: केवल मासिक भुगतान नहीं, बल्कि कुल वित्तीय प्रभाव की तुलना करें",
      "4. कैलकुलेटर का उपयोग कैसे करें",
      "5. इनपुट मापदंडों का विस्तृत विवरण",
      "6. होम लोन घटक कैसे काम करता है",
      "7. होम लोन के अलावा घर खरीदने के अन्य खर्च",
      "8. रहने की समयावधि क्यों सबसे महत्वपूर्ण है",
      "9. ब्रेक-इवन (सम-लाभ) बिंदु को समझें",
      "10. संपत्ति मूल्य वृद्धि और पूंजीगत लाभ",
      "11. किराए में वार्षिक वृद्धि (मुद्रास्फीति)",
      "12. डाउन पेमेंट की अवसर लागत (Opportunity Cost)",
      "13. मूल्य-से-किराया अनुपात (Price-to-Rent Ratio)",
      "14. बेन फेलिक्स का 5% नियम",
      "15. कर लाभ और होम लोन ब्याज कटौती",
      "16. शुद्ध संपत्ति तुलना: गृह संपत्ति मूल्य बनाम निवेश पोर्टफोलियो",
      "17. क्यों एक स्थिति में खरीदना और दूसरी में किराए पर रहना बेहतर होता है",
      "18. अल्पकालिक बनाम दीर्घकालिक आवासीय निर्णय",
      "19. तुलना करते समय सामान्य गलतियों से बचें",
      "20. बेहतर निर्णय हेतु परिदृश्य विश्लेषण",
      "21. वित्तीय कार्यप्रणाली और प्रमुख सूत्र"
    ],
    h3s: [
      "5.1 घर का मूल्य और डाउन पेमेंट",
      "5.2 होम लोन ब्याज दर और ऋण अवधि",
      "5.3 संपत्ति कर, बीमा, रखरखाव और सोसाइटी शुल्क",
      "5.4 मासिक किराया और वार्षिक किराया वृद्धि",
      "21.1 मासिक होम लोन किस्त",
      "21.2 संपत्ति का भावी मूल्य",
      "21.3 संचयी किराए का खर्च",
      "21.4 मूल्य-से-किराया अनुपात",
      "21.5 पूंजी की अवसर लागत",
      "21.6 कर लाभ और बचत"
    ],
    faqs: [
      { question: "रेंट बनाम बाय कैलकुलेटर कैसे काम करता है?", answer: "यह घर खरीदने और किराए पर रहने के सभी प्रत्यक्ष व अप्रत्यक्ष खर्चों की तुलना करके 30 वर्षों में आपकी शुद्ध संपत्ति का विश्लेषण करता है।" },
      { question: "घर खरीदना फायदेमंद होने के लिए कम से कम कितने साल रहना चाहिए?", answer: "पंजीकरण शुल्क, ब्रोकरेज और क्लोजिंग लागतों की भरपाई के लिए आम तौर पर कम से कम 5 से 7 साल रहना जरूरी होता है।" },
      { question: "तुलना में किन खर्चों को शामिल किया जाता है?", answer: "ईएमआई, संपत्ति कर, बीमा, रखरखाव शुल्क, किराए में वार्षिक वृद्धि और डाउन पेमेंट के निवेश से मिलने वाले रिटर्न को शामिल किया जाता है।" },
      { question: "मूल्य-से-किराया अनुपात (Price-to-Rent) क्या है?", answer: "घर के खरीद मूल्य को वार्षिक किराए से विभाजित करके निकाला जाता है। 15 से कम होने पर खरीदना और 20 से अधिक होने पर किराए पर रहना बेहतर माना जाता है।" },
      { question: "5% नियम क्या है?", answer: "यह मानता है कि घर के स्वामित्व की वार्षिक अप्रतिदेय लागत लगभग 5% होती है (1% कर + 1% रखरखाव + 3% पूंजी की लागत)।" },
      { question: "ईएमआई के मूलधन और ब्याज का क्या प्रभाव पड़ता है?", answer: "मूलधन का भुगतान संपत्ति बनाता है, जबकि ब्याज का भुगतान किराए की तरह ही एक गैर-वापसी योग्य खर्च है।" },
      { question: "घर के मूल्य में वृद्धि का निर्णय पर क्या प्रभाव पड़ता है?", answer: "रियल एस्टेट में अच्छी मूल्य वृद्धि होने पर घर खरीदने का विकल्प तेजी से लाभदायक बन जाता है।" },
      { question: "किराए की मुद्रास्फीति का क्या प्रभाव होता है?", answer: "किराया हर साल बढ़ता है, जबकि फिक्स्ड-रेट होम लोन की मूल किस्त पूरी अवधि के लिए स्थिर रहती है।" },
      { question: "डाउन पेमेंट की अवसर लागत क्या है?", answer: "घर में लगाई गई अग्रिम राशि शेयर बाजार या म्यूचुअल फंड में मिलने वाले संभावित रिटर्न से वंचित रह जाती है।" },
      { question: "खरीद और बिक्री के खर्च ब्रेक-इवन को कैसे प्रभावित करते हैं?", answer: "प्रारंभिक स्टाम्प शुल्क और बिक्री ब्रोकरेज के कारण शुरुआती वर्षों में घर खरीदना महंगा साबित होता है।" },
      { question: "क्या कैलकुलेटर में आयकर छूट शामिल है?", answer: "हाँ, यह होम लोन ब्याज और मूलधन पर मिलने वाली कर कटौतियों के प्रभाव को शामिल करता है।" },
      { question: "क्यों अलग-अलग परिस्थितियों में परिणाम बदल जाता है?", answer: "यह रहने की अवधि, संपत्ति की स्थानीय कीमत, किराए की दर और निवेश रिटर्न की दरों पर गहराई से निर्भर करता है।" }
    ],
    overlayInputs: {
      homePrice: "घर का खरीद मूल्य",
      downPaymentPct: "डाउन पेमेंट प्रतिशत (%)",
      interestRate: "होम लोन ब्याज दर (%)",
      monthlyRent: "तुलनात्मक मासिक किराया"
    },
    overlayOutputs: {
      breakevenYears: "ब्रेक-इवन समयावधि (वर्ष)",
      buyingNetWorth: "खरीदने पर 30 वर्ष बाद शुद्ध संपत्ति",
      rentingNetWorth: "किराए पर 30 वर्ष बाद शुद्ध संपत्ति",
      monthlyCostAdvantage: "प्रारंभिक मासिक लागत अंतर"
    }
  },
  pt: {
    h1: "Calculadora Comprar vs. Alugar Imóvel",
    metaTitle: "Calculadora Comprar ou Alugar — Ponto de Equilíbrio e Patrimônio Líquido",
    metaDesc: "Compare comprar vs alugar casa, prazo de amortização, custos irrecuperáveis, regra dos 5% e divergência patrimonial a 30 anos.",
    keywords: ["calculadora comprar ou alugar", "arrendar vs comprar", "ponto de equilibrio imovel", "regra dos 5 por cento"],
    h2s: [
      "2. O que Faz Realmente uma Calculadora Comprar vs. Alugar?",
      "3. A Ideia Chave: Comparar a Economia Total e Não Apenas a Prestação",
      "4. Como Utilizar a Calculadora",
      "5. Explicação Detalhada dos Parâmetros de Entrada",
      "6. Como Funciona a Componente Hipotecária",
      "7. Custos de Compra Além da Prestação Bancária",
      "8. Por Que o Tempo de Permanência é Determinante",
      "9. O Ponto de Equilíbrio (Breakeven) Explicado",
      "10. Valorização Imobiliária e Mais-Valias",
      "11. Inflação e Crescimento dos Valores de Renda",
      "12. Custo de Oportunidade do Valor de Entrada",
      "13. Rácio Preço/Renda (Price-to-Rent Ratio)",
      "14. A Regra dos 5% de Ben Felix",
      "15. Benefícios Fiscais e Dedução de Juros Hipotecários",
      "16. Patrimônio Líquido: Imóvel vs. Carteira de Investimentos",
      "17. Por Que Comprar Compensa num Caso e Alugar noutro",
      "18. Decisões Habitacionais a Curto Prazo vs. Longo Prazo",
      "19. Erros Comuns a Evitar na Comparação",
      "20. Análise de Cenários para Decisões Ponderadas",
      "21. Metodologia e Fórmulas de Cálculo"
    ],
    h3s: [
      "5.1 Preço do Imóvel e Entrada Inicial",
      "5.2 Taxa de Juro do Crédito e Prazo",
      "5.3 IMI, Seguros, Manutenção e Condomínio",
      "5.4 Renda Mensal e Aumento Anual",
      "21.1 Prestação Mensal do Crédito",
      "21.2 Evolução do Valor do Imóvel",
      "21.3 Encargo Cumulativo com Rendas",
      "21.4 Rácio Preço/Renda",
      "21.5 Custo de Oportunidade do Capital",
      "21.6 Poupança Fiscal"
    ],
    faqs: [
      { question: "Como funciona a calculadora de comprar vs. alugar?", answer: "Compara todos os fluxos de caixa e custos irrecuperáveis de ambas as opções ao longo de décadas, projetando o patrimônio final." },
      { question: "Quantos anos devo prever ficar na casa para compensar comprar?", answer: "Geralmente é necessário permanecer entre 4 e 7 anos para amortizar impostos de compra (IMT, selo, escritura) e custos de venda." },
      { question: "Que custos são incluídos na comparação?", answer: "Prestação, IMI, seguro multirriscos e vida, condomínio, manutenção, subida de rendas e o rendimento alternativo da entrada." },
      { question: "O que é o rácio Preço/Renda (Price-to-Rent)?", answer: "O preço de compra a dividir pela renda anual. Abaixo de 15 favorece a compra; acima de 20 favorece o arrendamento." },
      { question: "O que é a regra dos 5% de Ben Felix?", answer: "Estima que o custo anual irrecuperável de ser proprietário ronda os 5% do imóvel (1% impostos + 1% manutenção + 3% custo de capital)." },
      { question: "Como influenciam os juros e o reembolso de capital?", answer: "O capital amortizado constitui patrimônio líquido, enquanto os juros são despesa definitiva à semelhança da renda." },
      { question: "Qual o impacto da valorização do mercado imobiliário?", answer: "Uma maior valorização acelera o ponto de equilíbrio e aumenta o lucro líquido na futura venda do imóvel." },
      { question: "Como afeta a subida anual das rendas?", answer: "As rendas acompanham a inflação, enquanto a prestação de um crédito a taxa fixa permanece constante ao longo do tempo." },
      { question: "O que é o custo de oportunidade do valor de entrada?", answer: "O capital imobilizado na entrada não rende no mercado acionista, o que representa uma perda de ganhos potenciais." },
      { question: "Como afetam os custos de escritura e intermediação o resultado?", answer: "Os encargos fiscais de compra e comissões imobiliárias criam uma barreira inicial que exige tempo para ser recuperada." },
      { question: "A calculadora considera benefícios fiscais?", answer: "Sim, calcula as poupanças fiscais admissíveis no quadro fiscal vigente." },
      { question: "Por que comprar pode ser vantajoso num cenário e alugar noutro?", answer: "O resultado varia fortemente em função da duração prevista da estadia, rentabilidade dos investimentos e encargos locais." }
    ],
    overlayInputs: {
      homePrice: "Preço de Compra da Habitação",
      downPaymentPct: "Entrada em Capital (%)",
      interestRate: "Taxa de Juro Hipotecária (%)",
      monthlyRent: "Renda Mensal Comparável"
    },
    overlayOutputs: {
      breakevenYears: "Ponto de Equilíbrio (Anos)",
      buyingNetWorth: "Patrimônio Líquido Comprando (30 Anos)",
      rentingNetWorth: "Patrimônio Líquido Alugando (30 Anos)",
      monthlyCostAdvantage: "Diferencial de Custo Mensal Inicial"
    }
  }
};

for (const loc of LOCALES) {
  const data = RENT_VS_BUY_TRANSLATIONS[loc];

  const contentCode = `import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(data.faqs, null, 2)};

export const seo = {
  title: "${data.metaTitle}",
  description: "${data.metaDesc}",
  keywords: ${JSON.stringify(data.keywords)}
};

export const ContentComponent = function RentVsBuyContent${loc.toUpperCase()}() {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
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
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-sm">${data.h3s[3]}</h3>
            <p className="text-slate-600 dark:text-slate-400 mt-1">${data.h3s[3]}</p>
          </div>
        </div>
      </section>

      ${data.h2s.slice(4, 19).map((h2Text, idx) => `
      <section key="${idx + 4}" className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${h2Text}
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          ${h2Text}
        </p>
      </section>`).join("\n")}

      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${data.h2s[19]}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          ${data.h3s.slice(4).map((h3Text, i) => `
          <div key="${i}" className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-blue-600 text-xs">${h3Text}</h3>
          </div>`).join("\n")}
        </div>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "${loc}",
  calculatorSlug: "rent-vs-buy-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
`;
  writeFile(`src/i18n/content/rent-vs-buy/${loc}.tsx`, contentCode);

  const overlayCode = `export const ${loc.toUpperCase()}_RENT_VS_BUY_OVERLAY = {
  title: "${data.h1}",
  description: "${data.metaDesc}",
  inputs: ${JSON.stringify(data.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(data.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_RENT_VS_BUY_OVERLAY;
`;
  writeFile(`src/i18n/overlays/rent-vs-buy/${loc}.ts`, overlayCode);
}
console.log("✓ Rent vs Buy generation complete.");
