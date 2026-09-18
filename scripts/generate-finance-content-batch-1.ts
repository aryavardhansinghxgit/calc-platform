import * as fs from "fs";
import * as path from "path";

function ensureDir(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

interface ContentPackConfig {
  calcSlug: string;
  calcNameKey: string;
  titles: Record<string, string>;
  descriptions: Record<string, string>;
  sections: Record<string, { h2: string; body: string }[]>;
  faqs: Record<string, { q: string; a: string }[]>;
}

const FINANCE_BATCH_DATA: ContentPackConfig[] = [
  {
    calcSlug: "home-equity-loan-calculator",
    calcNameKey: "home-equity",
    titles: {
      es: "Calculadora de Préstamo con Garantía Hipotecaria",
      fr: "Calculateur de Prêt sur Valeur Nette Immobilière",
      de: "Eigenkapitaldarlehen-Rechner",
      hi: "होम इक्विटी लोन कैलकुलेटर",
      pt: "Calculadora de Empréstimo com Garantia de Imóvel",
    },
    descriptions: {
      es: "Calcule cuotas mensuales fijas, ratio CLTV máximo, amortización y capacidad de endeudamiento sobre el patrimonio inmobiliario.",
      fr: "Calculez vos mensualités fixes, ratio combiné CLTV, amortissement et capacité d'emprunt sur votre valeur nette immobilière.",
      de: "Berechnen Sie feste Monatsraten, Beleihungsauslauf (CLTV), Zinskosten und verfügbaren Kreditrahmen Ihrer Immobilie.",
      hi: "घर के शुद्ध मूल्य पर निश्चित मासिक किस्त, सीएलटीवी अनुपात, ब्याज बचत और अधिकतम ऋण राशि की गणना करें।",
      pt: "Simule parcelas fixas, índice CLTV máximo, amortização e capacidade de crédito com garantia imobiliária (Home Equity).",
    },
    sections: {
      es: [
        {
          h2: "1. Conceptos Fundamentales del Préstamo con Garantía Hipotecaria",
          body: "Un préstamo con garantía hipotecaria (segunda hipoteca) permite a los propietarios obtener liquidez utilizando el patrimonio neto acumulado en su vivienda como aval. A diferencia de las líneas de crédito variables, estos préstamos ofrecen un desembolso único con tasa de interés fija y pagos mensuales predecibles a lo largo de plazos que oscilan entre 5 y 30 años.",
        },
        {
          h2: "2. Metodología de Cálculo y Fórmula del Ratio CLTV",
          body: "El factor determinante para la aprobación es el Ratio Préstamo-Valor Combinado (CLTV). Se calcula sumando la hipoteca primaria más el nuevo préstamo y dividiendo entre el valor de tasación: CLTV = (Saldo Hipoteca 1 + Monto Préstamo 2) / Valor de Tasación. La mayoría de las entidades financieras limitan el CLTV al 80% o 85%.",
        },
        {
          h2: "3. Fórmula de Amortización Mensual a Tasa Fija",
          body: "La cuota mensual de capital e intereses se rige por la fórmula clásica: M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], donde P es el monto del préstamo secundario, r es la tasa mensual (anual / 12) y n es el total de meses de amortización.",
        },
        {
          h2: "4. Ejemplos Prácticos de Cálculo",
          body: "Ejemplo: Vivienda valorada en $500,000 con hipoteca existente de $275,000. Al 80% CLTV máximo ($400,000 de deuda total), el propietario puede solicitar hasta $125,000. Para un préstamo de $125,000 al 8.0% a 15 años, la cuota mensual fija es de $1,194.57 con un interés total pagado de $90,022.",
        },
        {
          h2: "5. Consideraciones Fiscales y Errores Frecuentes",
          body: "Bajo la legislación fiscal vigente, los intereses pagados pueden ser deducibles si los fondos se destinan exclusivamente a comprar, construir o mejorar sustancialmente la vivienda que sirve de garantía. El error más común es no contemplar el riesgo de ejecución hipotecaria si no se puede afrontar la segunda cuota mensual.",
        },
      ],
      fr: [
        {
          h2: "1. Principes Fondamentaux du Prêt sur Valeur Nette Immobilière",
          body: "Un prêt sur valeur nette immobilière (seconde hypothèque) permet aux propriétaires de mobiliser les capitaux propres accumulés dans leur logement. Il s'agit d'un crédit à taux fixe amortissable, versé en une seule fois, offrant une parfaite prévisibilité budgétaire sur des durées allant de 5 à 30 ans.",
        },
        {
          h2: "2. Méthodologie et Calcul du Ratio CLTV",
          body: "Le critère d'octroi déterminant est le ratio prêt-valeur combiné (CLTV) : CLTV = (Solde 1ère Hypothèque + Nouveau Prêt) / Valeur Vénale Estimée. Les organismes prêteurs plafonnent généralement ce ratio entre 80% et 85% de la valeur marchande du bien.",
        },
        {
          h2: "3. Formule Mathématique d'Amortissement",
          body: "La mensualité constante (capital et intérêts) est régie par la formule : M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], où P représente le capital emprunté, r le taux périodique mensuel et n le nombre de mensualités.",
        },
        {
          h2: "4. Exemples Numériques Détaillés",
          body: "Pour un bien estimé à 500 000 $ avec 275 000 $ de prêt initial et un emprunt secondaire de 125 000 $ à 8,0% sur 15 ans, la mensualité fixe s'élève à 1 194,57 $ avec un total d'intérêts de 90 022 $.",
        },
        {
          h2: "5. Fiscalité et Précautions",
          body: "Les intérêts peuvent être fiscalement déductibles s'ils financent des travaux d'amélioration substantielle de l'habitat. Le risque majeur réside dans la mise en jeu de la garantie immobilière en cas de défaut de paiement.",
        },
      ],
      de: [
        {
          h2: "1. Grundlagen des Eigenkapitaldarlehens",
          body: "Ein Eigenkapitaldarlehen (Nachrangdarlehen / 2. Grundschuld) wandelt gebundenes Immobilienvermögen in liquide Mittel um. Mit festem Zinssatz und gleichbleibenden Monatsraten bietet es hohe Planungssicherheit über Laufzeiten von 5 bis 30 Jahren.",
        },
        {
          h2: "2. Berechnung der Beleihungsquote (CLTV)",
          body: "Die kombinierte Beleihungsquote (CLTV) errechnet sich aus: CLTV = (Restschuld 1. Rang + Neues Darlehen) / Verkehrswert. Banken setzen die Obergrenze meist bei 80% bis 85% des ermittelten Marktwerts an.",
        },
        {
          h2: "3. Mathematische Tilgungsformel",
          body: "Die Annuität errechnet sich nach der Standardformel: M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], wobei P die Kreditsumme, r der Monatszins und n die Laufzeit in Monaten ist.",
        },
        {
          h2: "4. Berechnungsbeispiel",
          body: "Bei einem Immobilienwert von 500.000 $, 275.000 $ Vorlast und 125.000 $ Neudarlehen zu 8,0% auf 15 Jahre beträgt die feste Monatsrate 1.194,57 $.",
        },
        {
          h2: "5. Risiken und Praxishinweise",
          body: "Da die Immobilie als Sicherheit haftet, führt Zahlungsverzug im Extremfall zur Zwangsversteigerung. Eine solide Haushaltsrechnung ist daher zwingend erforderlich.",
        },
      ],
      hi: [
        {
          h2: "1. होम इक्विटी लोन के मूल सिद्धांत",
          body: "होम इक्विटी लोन आपको अपने घर के मूल्य के आधार पर एकमुश्त ऋण प्राप्त करने की सुविधा देता है। यह निश्चित ब्याज दर और निश्चित मासिक किस्तों (EMI) के साथ 5 से 30 वर्षों की अवधि के लिए उपलब्ध होता है।",
        },
        {
          h2: "2. सीएलटीवी (CLTV) अनुपात की गणना",
          body: "ऋण पात्रता का निर्धारण संयुक्त एलटीवी अनुपात द्वारा किया जाता है: CLTV = (मौजूदा ऋण शेष + नया ऋण) / घर का वर्तमान बाजार मूल्य। सामान्यतः बैंक 80% से 85% तक सीएलटीवी की अनुमति देते हैं।",
        },
        {
          h2: "3. ईएमआई गणना सूत्र",
          body: "मासिक किस्त का सूत्र: M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], जहाँ P मूलधन, r मासिक ब्याज दर और n कुल महीनों की संख्या है।",
        },
        {
          h2: "4. व्यावहारिक गणना उदाहरण",
          body: "$500,000 के घर और $275,000 के मौजूदा ऋण पर 80% सीमा के तहत $125,000 का अतिरिक्त ऋण 8.0% पर 15 वर्ष के लिए लेने पर मासिक ईएमआई $1,194.57 होगी।",
        },
        {
          h2: "5. सावधानियां और जोखिम",
          body: "ऋण का भुगतान न करने पर घर की नीलामी का जोखिम रहता है, अतः अपनी आय के अनुसार ही ऋण राशि का चयन करें।",
        },
      ],
      pt: [
        {
          h2: "1. Fundamentos do Empréstimo com Garantia de Imóvel",
          body: "O empréstimo com garantia de imóvel (Home Equity) permite transformar o patrimônio líquido acumulado em capital líquido com taxas atrativas, parcelas fixas e prazos longos de até 30 anos.",
        },
        {
          h2: "2. Cálculo do Índice CLTV",
          body: "O índice empréstimo-garantia (CLTV) é calculado por: CLTV = (Saldo Financiamento Atual + Novo Empréstimo) / Valor de Avaliação. As instituições financeiras costumam limitar o CLTV entre 80% e 85%.",
        },
        {
          h2: "3. Fórmula da Parcela Fixa",
          body: "A prestação mensal constante utiliza a Tabela Price: M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], garantindo previsibilidade orçamentária durante todo o contrato.",
        },
        {
          h2: "4. Exemplo Numérico",
          body: "Para um imóvel de $500.000 com saldo devedor de $275.000, um empréstimo adicional de $125.000 a 8,0% em 15 anos gera parcela de $1.194,57.",
        },
        {
          h2: "5. Cuidados e Gestão de Risco",
          body: "Como o imóvel é alienado fiduciariamente em garantia, a inadimplência pode levar à perda do bem. Mantenha um planejamento financeiro rigoroso.",
        },
      ],
    },
    faqs: {
      es: [
        { q: "¿En qué se diferencia un préstamo con garantía de una línea HELOC?", a: "El préstamo con garantía entrega los fondos en una suma fija con tasa de interés fija, mientras que el HELOC funciona como una tarjeta de crédito rotativa con tasa variable." },
        { q: "¿Cuánto puedo pedir prestado con mi casa como garantía?", a: "Generalmente hasta el 80% o 85% del valor de tasación de la vivienda menos el saldo pendiente de su hipoteca actual." },
        { q: "¿Son deducibles de impuestos los intereses del préstamo?", a: "Sí, siempre que los fondos se utilicen para mejoras sustanciales en la vivienda que sirve de aval." },
      ],
      fr: [
        { q: "Quelle est la différence entre un prêt sur valeur nette et une marge HELOC ?", a: "Le prêt sur valeur nette offre un versement unique à taux fixe, tandis que l'HELOC est une ligne de crédit renouvelable à taux variable." },
        { q: "Combien puis-je emprunter sur ma maison ?", a: "En règle générale, jusqu'à 80% ou 85% de la valeur estimée du bien, déduction faite du solde hypothécaire existant." },
        { q: "Les intérêts sont-ils déductibles d'impôt ?", a: "Oui, s'ils servent à rénover ou améliorer substantiellement la résidence principale." },
      ],
      de: [
        { q: "Was unterscheidet ein Eigenkapitaldarlehen von einer HELOC-Kreditlinie?", a: "Das Darlehen wird auf einmal zu festem Zins ausgezahlt, während HELOC eine flexible, variabel verzinste Kreditlinie ist." },
        { q: "Wie viel Kredit kann ich aufnehmen?", a: "Üblicherweise bis zu 80-85% des Beleihungswerts abzüglich der bestehenden Restschuld." },
        { q: "Sind die Zinsen steuerlich absetzbar?", a: "Je nach Verwendungszweck (z. B. bei vermieteten Objekten oder wertsteigernden Sanierungen) können Zinskosten abzugsfähig sein." },
      ],
      hi: [
        { q: "होम इक्विटी लोन और HELOC में क्या अंतर है?", a: "होम इक्विटी लोन में एकमुश्त राशि निश्चित ब्याज दर पर मिलती है, जबकि HELOC एक लचीली क्रेडिट लाइन है जिसमें परिवर्तनीय दर होती है।" },
        { q: "मैं अपने घर पर कितना ऋण ले सकता हूँ?", a: "सामान्यतः घर के कुल मूल्य के 80% से 85% में से वर्तमान ऋण शेष घटाकर मिलने वाली राशि।" },
        { q: "क्या इस ऋण पर कर लाभ मिलता है?", a: "यदि ऋण का उपयोग घर के नवीनीकरण या निर्माण के लिए किया जाए तो ब्याज पर कर कटौती का लाभ मिल सकता है।" },
      ],
      pt: [
        { q: "Qual a diferença entre Home Equity e HELOC?", a: "O Home Equity libera o valor total com taxa fixa e parcelas iguais, enquanto o HELOC é um limite rotativo com taxa variável." },
        { q: "Quanto posso pegar emprestado com meu imóvel?", a: "Normalmente até 80% ou 85% do valor de avaliação do imóvel menos o saldo do financiamento atual." },
        { q: "Quais são as principais vantagens?", a: "Taxas de juros significativamente mais baixas e prazos mais longos em comparação ao crédito pessoal sem garantia." },
      ],
    },
  },
  {
    calcSlug: "heloc-calculator",
    calcNameKey: "heloc",
    titles: {
      es: "Calculadora de Línea de Crédito Hipotecario (HELOC)",
      fr: "Calculateur de Marge de Crédit Hypothécaire (HELOC)",
      de: "HELOC-Kreditlinien-Rechner",
      hi: "HELOC कैलकुलेटर (क्रेडिट लाइन)",
      pt: "Calculadora de Linha de Crédito com Garantia (HELOC)",
    },
    descriptions: {
      es: "Calcule pagos en período de disposición (solo interés) y repago (capital e interés), riesgo de choque de tasas variables.",
      fr: "Simulez vos paiements en période de tirage et de remboursement, avec analyse du risque de choc de mensualité.",
      de: "Berechnen Sie Zinszahlungen der Ziehungsphase und Annuitäten der Rückzahlungsphase für variable Kreditlinien.",
      hi: "HELOC की निकासी अवधि और पुनर्भुगतान अवधि की किस्तों तथा परिवर्तनीय ब्याज दरों की गणना करें।",
      pt: "Calcule pagamentos na fase de utilização (juros) e na fase de amortização para linhas de crédito imobiliárias.",
    },
    sections: {
      es: [
        { h2: "1. Funcionamiento de una Línea HELOC", body: "Una línea de crédito con garantía hipotecaria (HELOC) es un crédito rotativo respaldado por el capital neto de la vivienda. Se divide en dos etapas: el período de disposición (típicamente 10 años, pagando solo intereses) y el período de amortización (típicamente 20 años, pagando capital e intereses)." },
        { h2: "2. El Riesgo de Choque de Pagos (Payment Shock)", body: "Al finalizar el período de disposición, la cuota mensual se incrementa bruscamente porque se comienza a amortizar el capital en un plazo reducido, agravado si las tasas de interés de referencia han subido." },
        { h2: "3. Metodología de Cálculo", body: "En fase de disposición: Pago = Saldo Dispuesto × (Tasa Anual / 12). En fase de repago: Se aplica la amortización francesa sobre el plazo restante." },
        { h2: "4. Ejemplos Prácticos", body: "Línea de $100,000 al 8.5%: Pago mensual en disposición = $708.33. Al pasar a repago a 20 años al 9.0%, la cuota sube a $899.73." },
        { h2: "5. Estrategias de Gestión", body: "Se recomienda realizar abonos voluntarios a capital durante el período de disposición para mitigar el impacto futuro del repago." },
      ],
      fr: [
        { h2: "1. Fonctionnement d'une Marge HELOC", body: "L'HELOC est une ligne de crédit hypothécaire renouvelable comportant une période de tirage (10 ans, intérêts seuls) suivie d'une période de remboursement (20 ans, capital et intérêts)." },
        { h2: "2. Le Choc de Remboursement", body: "Le passage en phase d'amortissement entraîne une hausse mécanique de la mensualité due au remboursement obligatoire du capital." },
        { h2: "3. Méthode de Calcul", body: "Période de tirage : Intérêts = Solde × (Taux / 12). Période d'amortissement : Calcul classique d'annuité constante." },
        { h2: "4. Exemple Chiffré", body: "Pour 100 000 $ à 8,5% : 708,33 $/mois en tirage, puis 899,73 $/mois en remboursement sur 20 ans à 9,0%." },
        { h2: "5. Bonnes Pratiques", body: "Anticipez le remboursement du capital dès la phase de tirage pour éviter les tensions budgétaires ultérieures." },
      ],
      de: [
        { h2: "1. Funktionsweise der HELOC-Linie", body: "HELOC kombiniert eine flexible Ziehungsphase (oft 10 Jahre, nur Zinsen) mit einer festen Rückzahlungsphase (oft 20 Jahre, Zins und Tilgung)." },
        { h2: "2. Das Ratenschock-Risiko", body: "Beim Übergang in die Tilgungsphase steigt die Monatsrate sprunghaft an, da nun auch das Darlehenskapital getilgt werden muss." },
        { h2: "3. Berechnungsformeln", body: "Ziehungsphase: Zinsrate = Inanspruchnahme × (Zinssatz / 12). Rückzahlungsphase = Volle Annuität über Restlaufzeit." },
        { h2: "4. Rechenbeispiel", body: "Bei 100.000 $ zu 8,5%: 708,33 $/Monat in Phase 1, danach ca. 899,73 $/Monat in Phase 2 bei 9,0%." },
        { h2: "5. Risikosteuerung", body: "Regelmäßige freiwillige Sondertilgungen in Phase 1 schützen vor Liquiditätsengpässen in Phase 2." },
      ],
      hi: [
        { h2: "1. HELOC क्रेडिट लाइन की कार्यप्रणाली", body: "HELOC एक लचीली क्रेडिट लाइन है जिसमें दो चरण होते हैं: ड्रॉ अवधि (10 वर्ष, केवल ब्याज) और पुनर्भुगतान अवधि (20 वर्ष, मूलधन + ब्याज)।" },
        { h2: "2. पेमेंट शॉक का जोखिम", body: "ड्रॉ अवधि समाप्त होते ही मूलधन की अदायगी शुरू होने से मासिक किस्त में अचानक वृद्धि होती है।" },
        { h2: "3. गणना पद्धति", body: "निकासी चरण: मासिक ब्याज = राशि × (दर / 12)। पुनर्भुगतान चरण: मूलधन और ब्याज की संयुक्त ईएमआई।" },
        { h2: "4. गणना उदाहरण", body: "$100,000 पर 8.5% की दर से ड्रॉ अवधि में $708.33/माह, जो बाद में 20 वर्ष के लिए 9.0% पर $899.73/माह हो जाती है।" },
        { h2: "5. वित्तीय प्रबंधन", body: "ड्रॉ अवधि में भी मूलधन का थोड़ा-थोड़ा भुगतान करते रहने से भविष्य का बोझ कम होता है।" },
      ],
      pt: [
        { h2: "1. Funcionamento da Linha HELOC", body: "O HELOC é uma linha rotativa com garantia de imóvel que oferece flexibilidade de saques durante o período de utilização e amortização posterior." },
        { h2: "2. Risco de Aumento da Parcela", body: "A transição para o período de amortização eleva a parcela mensal devido ao início do pagamento do principal." },
        { h2: "3. Método de Cálculo", body: "Fase de utilização: Juros mensais sobre o saldo utilizado. Fase de amortização: Tabela Price sobre o saldo devedor restante." },
        { h2: "4. Exemplo Prático", body: "Para $100.000 a 8,5%: $708,33/mês em saques, passando a $899,73/mês em 20 anos a 9,0%." },
        { h2: "5. Dicas de Gestão", body: "Pague amortizações extras sempre que possível para reduzir o saldo devedor final." },
      ],
    },
    faqs: {
      es: [
        { q: "¿Puedo retirar dinero en cualquier momento con HELOC?", a: "Sí, durante el período de disposición puede retirar hasta el límite autorizado." },
        { q: "¿Por qué sube tanto la cuota al terminar el período de disposición?", a: "Porque se inicia la amortización obligatoria del capital acumulado." },
      ],
      fr: [
        { q: "Puis-je réemprunter le capital remboursé en phase de tirage ?", a: "Oui, la marge est renouvelable pendant toute la période de tirage." },
        { q: "Le taux d'intérêt est-il fixe ou variable ?", a: "La majorité des marges HELOC ont un taux variable indexé sur le taux préférentiel." },
      ],
      de: [
        { q: "Sind Sondertilgungen jederzeit möglich?", a: "Ja, in der Ziehungsphase können Sie flexibel tilgen und wieder ziehen." },
        { q: "Ist der Zinssatz fest?", a: "Nein, HELOCs basieren in der Regel auf variablen Referenzzinssätzen." },
      ],
      hi: [
        { q: "क्या निकासी अवधि में कभी भी पैसा निकाल सकते हैं?", a: "हाँ, स्वीकृत क्रेडिट सीमा के भीतर कभी भी आवश्यकतानुसार निकासी की जा सकती है।" },
        { q: "क्या HELOC की ब्याज दरें निश्चित होती हैं?", a: "सामान्यतः HELOC में परिवर्तनीय (फ्लोटिंग) ब्याज दरें होती हैं।" },
      ],
      pt: [
        { q: "Posso utilizar apenas parte do limite aprovado?", a: "Sim, e os juros serão cobrados apenas sobre o valor efetivamente utilizado." },
        { q: "A taxa é fixa ou variável?", a: "A maioria das linhas HELOC opera com taxas variáveis pós-fixadas." },
      ],
    },
  },
  {
    calcSlug: "down-payment-calculator",
    calcNameKey: "down-payment",
    titles: {
      es: "Calculadora de Entrada y Pago Inicial Hipotecario",
      fr: "Calculateur d'Apport Personnel Immobilier",
      de: "Eigenkapitalrechner Immobilienkauf",
      hi: "डाउन पेमेंट कैलकुलेटर (गृह ऋण अग्रिम भुगतान)",
      pt: "Calculadora de Entrada Imobiliária",
    },
    descriptions: {
      es: "Compare tramos de entrada del 3% al 20%, eliminación de PMI y costo de oportunidad de inversión.",
      fr: "Simulez vos tranches d'apport (3% à 20%), suppression du PMI et coût d'opportunité des placements.",
      de: "Vergleichen Sie Eigenkapitalquoten (3% bis 20%), Tilgungsverläufe und Renditechancen von Alternativanlagen.",
      hi: "3% से 20% तक डाउन पेमेंट, पीएमआई बीमा समाप्ति और निवेश अवसरों की तुलना करें।",
      pt: "Compare percentuais de entrada de 3% a 20%, custos de seguro habitacional e rendimento de investimentos.",
    },
    sections: {
      es: [
        { h2: "1. Importancia del Pago Inicial en la Hipoteca", body: "El pago inicial (entrada) determina el monto del préstamo, la tasa de interés ofrecida, la cuota mensual y la obligación de contratar un seguro hipotecario privado (PMI)." },
        { h2: "2. La Regla del 20% y el Seguro PMI", body: "Con una entrada inferior al 20%, los prestamistas exigen un seguro PMI que incrementa la cuota mensual entre un 0.5% y un 1.5% anual del monto del préstamo hasta alcanzar el 80% o 78% LTV." },
        { h2: "3. Costo de Oportunidad Financiero", body: "Invertir más dinero en la entrada reduce los intereses hipotecarios garantizados, pero sacrifica el potencial rendimiento compuesto que esos fondos podrían generar en fondos indexados diversificados." },
        { h2: "4. Ejemplos Comparativos", body: "Para una vivienda de $400,000 al 6.5%: Entrada del 5% ($20,000) = Préstamo de $380,000 con cuota de $2,401.86 + $158 de PMI. Entrada del 20% ($80,000) = Préstamo de $320,000 con cuota de $2,022.62 sin PMI." },
        { h2: "5. Gastos de Cierre Adicionales", body: "Además de la entrada, los compradores deben reservar entre un 2% y un 5% del valor de la propiedad para gastos de cierre (tasación, títulos, comisiones)." },
      ],
      fr: [
        { h2: "1. Le Rôle de l'Apport Personnel", body: "L'apport initial conditionne le montant emprunté, le coût global du crédit et l'application d'éventuelles surprimes d'assurance emprunteur." },
        { h2: "2. Le Seuil Stratégique des 20%", body: "Un apport de 20% supprime l'obligation d'assurance PMI et permet d'obtenir les meilleures conditions de taux auprès des banques." },
        { h2: "3. Coût d'Opportunité de l'Épargne", body: "Mobiliser tout son capital dans l'apport réduit le coût du crédit mais prive l'épargnant des rendements boursiers à long terme." },
        { h2: "4. Exemple Comparatif", body: "Pour un bien de 400 000 $ à 6,5% : avec 5% d'apport, mensualité de 2 401,86 $ + assurance PMI ; avec 20% d'apport, mensualité de 2 022,62 $ sans PMI." },
        { h2: "5. Frais d'Acquisition Complémentaires", body: "Prévoyez 2% à 5% supplémentaires pour les frais de notaire, de garantie et de dossier." },
      ],
      de: [
        { h2: "1. Bedeutung des Eigenkapitals", body: "Die Eigenkapitalquote beeinflusst den Zinssatz, die monatliche Belastung und die Gesamtfinanzierungskosten maßgeblich." },
        { h2: "2. Die 20%-Schwelle", body: "Ab 20% Eigenkapital entfallen Risikozuschläge der Banken und die Zinskonditionen verbessern sich spürbar." },
        { h2: "3. Opportunitätskosten", body: "Höheres Eigenkapital spart sichere Kreditzinsen, mindert aber das für ertragreichere Geldanlagen verfügbare Kapital." },
        { h2: "4. Beispielvergleich", body: "400.000 $ Immobilie bei 6,5%: 5% Eigenkapital (20.000 $) ergibt 2.401,86 $/Monat zzgl. Versicherung; 20% (80.000 $) ergibt 2.022,62 $/Monat." },
        { h2: "5. Kaufnebenkosten", body: "Zusätzlich zum Eigenkapital fallen ca. 3-6% für Grunderwerbsteuer, Notar und Makler an." },
      ],
      hi: [
        { h2: "1. डाउन पेमेंट का महत्व", body: "डाउन पेमेंट से ऋण राशि, ब्याज दर और मासिक किस्त का निर्धारण होता है। अधिक डाउन पेमेंट से ब्याज का बोझ कम होता है।" },
        { h2: "2. 20% की सीमा और बीमा", body: "20% से कम डाउन पेमेंट पर ऋणदाताओं द्वारा अतिरिक्त बीमा शुल्क लगाया जा सकता है।" },
        { h2: "3. निवेश अवसर लागत", body: "डाउन पेमेंट में अधिक पैसा लगाने से ब्याज बचता है, लेकिन शेयर बाजार या म्यूचुअल फंड में मिलने वाले संभावित रिटर्न की अवसर लागत भी होती है।" },
        { h2: "4. तुलनात्मक उदाहरण", body: "$400,000 के मकान पर 5% डाउन पेमेंट ($20,000) पर ईएमआई $2,401.86 + बीमा, जबकि 20% ($80,000) पर ईएमआई $2,022.62 बिना किसी अतिरिक्त बीमा के होगी।" },
        { h2: "5. अतिरिक्त समापन लागत", body: "डाउन पेमेंट के अलावा 2% से 5% रजिस्ट्री और अन्य कानूनी शुल्कों के लिए अलग रखना आवश्यक है।" },
      ],
      pt: [
        { h2: "1. A Importância da Entrada", body: "O valor da entrada define o saldo a financiar, o valor das prestações e os juros totais ao longo do contrato." },
        { h2: "2. O Patamar dos 20%", body: "Uma entrada de 20% elimina seguros obrigatórios adicionais e garante as melhores taxas do mercado imobiliário." },
        { h2: "3. Custo de Oportunidade", body: "Dar uma entrada maior reduz o endividamento, mas retira recursos que poderiam render em investimentos diversificados." },
        { h2: "4. Simulação Comparativa", body: "Imóvel de $400.000 a 6,5%: 5% de entrada resulta em parcela de $2.401,86 + PMI; com 20% de entrada, a parcela cai para $2.022,62 sem PMI." },
        { h2: "5. Custos de Escritura e Registro", body: "Reserve de 3% a 5% extras para despesas cartorárias, ITBI e taxas bancárias." },
      ],
    },
    faqs: {
      es: [
        { q: "¿Es obligatorio dar el 20% de entrada?", a: "No, existen programas convencionales desde el 3% o FHA desde el 3.5%, aunque requieren seguro PMI." },
        { q: "¿Cuándo se cancela el seguro PMI?", a: "Puede solicitarse la cancelación al llegar al 80% LTV y se cancela automáticamente al 78% LTV." },
      ],
      fr: [
        { q: "Un apport de 20% est-il indispensable ?", a: "Non, certains prêts acceptent 3% à 5% d'apport, mais avec une assurance emprunteur plus élevée." },
        { q: "Comment supprimer l'assurance PMI ?", a: "Dès que le capital remboursé permet d'atteindre 80% de ratio prêt-valeur." },
      ],
      de: [
        { q: "Muss ich zwingend 20% Eigenkapital mitbringen?", a: "Nein, Vollfinanzierungen oder 5-10%-Finanzierungen sind möglich, aber mit Zinsaufschlägen." },
        { q: "Was ist die beste Eigenkapitalquote?", a: "Finanzmathematisch bieten 20-30% das beste Verhältnis aus Zinssatz und Liquiditätsreserve." },
      ],
      hi: [
        { q: "क्या 20% डाउन पेमेंट अनिवार्य है?", a: "नहीं, कुछ विशेष योजनाओं में 3% से 5% डाउन पेमेंट पर भी ऋण उपलब्ध होता है।" },
        { q: "पीएमआई बीमा कब समाप्त होता है?", a: "जब ऋण शेष मकान के प्रारंभिक मूल्य के 80% तक पहुँच जाता है।" },
      ],
      pt: [
        { q: "É obrigatório dar 20% de entrada?", a: "Não, programas populares aceitam entradas menores, mas com custo financeiro global maior." },
        { q: "Qual a entrada ideal?", a: "Geralmente 20% a 30% para obter as menores taxas e parcelas equilibradas." },
      ],
    },
  },
  {
    calcSlug: "rent-vs-buy-calculator",
    calcNameKey: "rent-vs-buy",
    titles: {
      es: "Calculadora de Alquilar vs. Comprar Vivienda",
      fr: "Calculateur Acheter ou Louer son Logement",
      de: "Mieten oder Kaufen Rechner",
      hi: "किराया बनाम खरीद कैलकुलेटर (Rent vs. Buy)",
      pt: "Calculadora Alugar ou Comprar Imóvel",
    },
    descriptions: {
      es: "Calcule el punto de equilibrio financiero, costos irrecuperables, regla del 5% y divergencia patrimonial a 30 años.",
      fr: "Déterminez l'horizon de rentabilité financière, coûts irrécupérables (règle des 5%) et projection de patrimoine à 30 ans.",
      de: "Ermitteln Sie den Break-Even-Zeitpunkt, unwiederbringliche Kosten (5%-Regel) und den langfristigen Vermögensaufbau.",
      hi: "घर खरीदने बनाम किराए पर रहने के वित्तीय लाभ, ब्रेक-ईवन अवधि और 30 साल की संपत्ति निर्माण तुलना की गणना करें।",
      pt: "Analise o ponto de equilíbrio financeiro, custos irrecuperáveis (regra dos 5%) e divergência de patrimônio a longo prazo.",
    },
    sections: {
      es: [
        { h2: "1. La Decisión Financiera: Comprar vs. Alquilar", body: "La disyuntiva entre comprar una vivienda o alquilar e invertir la diferencia no es solo una elección de estilo de vida, sino una de las decisiones financieras más complejas y de mayor impacto en el patrimonio neto a largo plazo." },
        { h2: "2. Costos Irrecuperables y la Regla del 5%", body: "Tanto alquilar como comprar implican costos irrecuperables. Al alquilar, el 100% del alquiler se pierde. Al comprar, los costos irrecuperables comprenden: impuestos a la propiedad (~1%), mantenimiento (~1%) y costo de oportunidad del capital propio (~3%), sumando aproximadamente el 5% anual del valor de la propiedad." },
        { h2: "3. Horizonte Temporal y Punto de Equilibrio", body: "Debido a los altos costos de transacción (comisiones inmobiliarias, gastos de cierre e impuestos de compra y venta), comprar suele requerir permanecer entre 4 y 7 años en la vivienda para alcanzar el punto de equilibrio frente al alquiler." },
        { h2: "4. Metodología de Comparación Patrimonial", body: "El modelo proyecta el patrimonio neto acumulado a 30 años: compara la revalorización del inmueble y amortización del préstamo frente a una cartera de inversión bursátil nutrida con la entrada no desembolsada y el ahorro mensual de alquilar." },
        { h2: "5. Conclusiones y Factores No Financieros", body: "Alquilar ofrece flexibilidad geográfica y menor riesgo concentrado; comprar proporciona estabilidad residencial, cobertura contra la inflación de alquileres y ahorro forzoso a través de la amortización." },
      ],
      fr: [
        { h2: "1. Acheter ou Louer : L'Arbitrage Patrimonial", body: "Décider d'acheter sa résidence principale ou de rester locataire pour investir son capital en bourse constitue l'arbitrage financier le plus déterminant pour la constitution d'un patrimoine." },
        { h2: "2. La Règle des 5% des Coûts Irrécupérables", body: "Tout logement engendre des coûts irrécupérables. En location, c'est le loyer net. À l'achat, ces coûts regroupent les taxes foncières (~1%), l'entretien (~1%) et le coût d'opportunité des capitaux propres (~3%), totalisant environ 5% de la valeur vénale annuelle." },
        { h2: "3. Horizon de Rentabilité et Frais de Mutation", body: "En raison des frais de notaire, droits de mutation et commissions d'agence (environ 8% à 10% cumulés à l'achat et à la revente), l'achat nécessite généralement 5 à 7 ans pour être amorti par rapport à la location." },
        { h2: "4. Simulation Patrimoniale sur 30 Ans", body: "Le comparateur confronte l'accumulation de capital immobilier remboursé à celle d'un portefeuille d'actions diversifié alimenté par l'apport initial et le surplus d'épargne mensuel du locataire." },
        { h2: "5. Facteurs Clés de Décision", body: "La durée prévisible d'occupation, l'évolution prévisible des loyers et le rendement espéré des marchés financiers constituent les trois variables décisives du modèle." },
      ],
      de: [
        { h2: "1. Mieten oder Kaufen: Der Finanzvergleich", body: "Die Frage, ob Wohneigentum oder Miete mit paralleler Wertpapieranlage die höhere Rendite bringt, hängt von harten finanzmathematischen Parametern ab." },
        { h2: "2. Die 5%-Regel unwiederbringlicher Kosten", body: "Kaufimmobilien verursachen jährlich ca. 5% des Immobilienwerts an unwiederbringlichen Kosten: 1% Grundsteuer, 1% Instandhaltung und 3% Opportunitätskosten des Eigenkapitals." },
        { h2: "3. Kaufnebenkosten und Break-Even", body: "Durch Grunderwerbsteuer, Notargebühren und Maklercourtage (insg. 7-12%) rechnet sich ein Immobilienkauf meist erst ab einer Haltedauer von 6 bis 10 Jahren." },
        { h2: "4. 30-Jahre-Vermögensvergleich", body: "Das Modell vergleicht den getilgten Immobilienwert mit einem weltweiten Aktien-ETF-Depot, das aus dem gesparten Eigenkapital und monatlichen Mietdifferenzen bespart wird." },
        { h2: "5. Fazit", body: "Für mobile Haushalte mit Anlagekompetenz ist Mieten oft überlegen; für sesshafte Familien bietet Wohneigentum planbare Wohnkosten im Alter." },
      ],
      hi: [
        { h2: "1. किराया बनाम खरीद का वित्तीय निर्णय", body: "घर खरीदना या किराए पर रहकर बचत को निवेश करना—यह जीवन का सबसे बड़ा वित्तीय निर्णय है।" },
        { h2: "2. 5% का नियम और अपरिवर्तनीय लागत", body: "घर खरीदने पर संपत्ति कर (1%), रखरखाव (1%) और पूंजी की अवसर लागत (3%) मिलाकर प्रति वर्ष लगभग 5% खर्च होता है।" },
        { h2: "3. ब्रेक-ईवन समय सीमा", body: "पंजीकरण, ब्रोकरेज और लोन प्रोसेसिंग शुल्क के कारण घर खरीदने का लाभ आमतौर पर 5 से 7 साल रहने के बाद ही मिलता है।" },
        { h2: "4. 30 साल की संपत्ति निर्माण तुलना", body: "यह मॉडल रियल एस्टेट मूल्य वृद्धि और शेयर बाजार में व्यवस्थित निवेश (SIP) के बीच 30 साल की संपत्ति तुलना करता है।" },
        { h2: "5. निष्कर्ष", body: "यदि आप किसी शहर में लंबे समय तक रहने की योजना बना रहे हैं तो खरीदना बेहतर है, जबकि करियर में गतिशीलता के लिए किराया अधिक उपयुक्त है।" },
      ],
      pt: [
        { h2: "1. Comprar ou Alugar: A Decisão Patrimonial", body: "Comprar a casa própria ou morar de aluguel e investir a diferença no mercado financeiro é uma das decisões de maior impacto patrimonial." },
        { h2: "2. Custos Irrecuperáveis e a Regra dos 5%", body: "Comprar envolve cerca de 5% ao ano em custos que não voltam: IPTU (~1%), manutenção e condomínio (~1%) e custo de oportunidade do capital investido (~3%)." },
        { h2: "3. Ponto de Equilíbrio Financeiro", body: "Devido aos custos de escritura, ITBI e corretagem (6% a 8%), o ponto de equilíbrio de compra costuma ocorrer entre 5 e 8 anos de permanência no imóvel." },
        { h2: "4. Projeção de Riqueza Líquida a 30 Anos", body: "A simulação compara a valorização do imóvel quitado contra uma carteira de investimentos alimentada pelo valor da entrada e pela economia mensal do aluguel." },
        { h2: "5. Recomendações Práticas", body: "Avalie seu horizonte de tempo, sua disciplina para investir mensalmente e a estabilidade da sua renda." },
      ],
    },
    faqs: {
      es: [
        { q: "¿Qué es el ratio Precio-Alquiler (Price-to-Rent)?", a: "Es el precio de la vivienda dividido entre el alquiler anual. Un ratio inferior a 15 favorece comprar; superior a 20 favorece alquilar." },
        { q: "¿En cuántos años se amortizan los gastos de compra?", a: "Generalmente entre 4 y 7 años, dependiendo de la apreciación del inmueble y los tipos de interés." },
      ],
      fr: [
        { q: "Qu'est-ce que le ratio Prix/Loyer ?", a: "Le prix d'achat divisé par le loyer annuel. Un ratio inférieur à 15 penche pour l'achat ; supérieur à 20 pour la location." },
        { q: "Combien d'années faut-il pour rentabiliser un achat ?", a: "En moyenne 5 à 7 ans pour compenser les frais de notaire et intérêts initiaux." },
      ],
      de: [
        { q: "Was besagt das Kaufpreis-Miet-Verhältnis?", a: "Kaufpreis geteilt durch Jahreskaltmiete. Werte unter 20 sprechen für Kauf, Werte über 25 für Miete." },
        { q: "Wann lohnt sich Mieten finanziell mehr?", a: "Wenn die monatliche Ersparnis konsequent und diszipliniert in renditestarke ETFs investiert wird." },
      ],
      hi: [
        { q: "प्राइस-टू-रेंट अनुपात क्या है?", a: "मकान के मूल्य को वार्षिक किराए से विभाजित करने पर मिलने वाला अनुपात। 15 से कम होने पर खरीदना और 20 से अधिक होने पर किराए पर रहना वित्तीय दृष्टि से बेहतर माना जाता है।" },
        { q: "खरीदने का निर्णय कितने वर्षों में लाभदायक होता है?", a: "आमतौर पर 5 से 7 वर्षों के निरंतर निवास के बाद।" },
      ],
      pt: [
        { q: "O que é a relação Preço/Aluguel?", a: "Preço do imóvel dividido pelo aluguel anual. Índices abaixo de 15 favorecem a compra; acima de 20 favorecem o aluguel." },
        { q: "Em quanto tempo a compra se paga?", a: "Tipicamente entre 5 e 8 anos de permanência contínua." },
      ],
    },
  },
  {
    calcSlug: "va-mortgage-calculator",
    calcNameKey: "va",
    titles: {
      es: "Calculadora de Hipotecas Militares VA",
      fr: "Calculateur de Prêt Immobilier Militaire VA",
      de: "VA-Veteranen-Hypothekenrechner",
      hi: "VA मॉर्गेज कैलकुलेटर (सैन्य आवास ऋण)",
      pt: "Calculadora de Financiamento Militar VA",
    },
    descriptions: {
      es: "Calcule cuotas de préstamos VA sin entrada, tarifa de financiamiento (Funding Fee), exención por discapacidad y derecho básico.",
      fr: "Estimez vos mensualités de prêt VA sans apport, frais de financement (Funding Fee) et exonérations d'invalidité militaire.",
      de: "Berechnen Sie monatliche Raten für US-Veteranen-Darlehen (VA Loans), Finanzierungsgebühren und Zinsvorteile.",
      hi: "बिना डाउन पेमेंट के VA सैन्य गृह ऋण, फंडिंग शुल्क, विकलांगता छूट और मासिक किस्तों की गणना करें।",
      pt: "Simule financiamentos militares VA com 0% de entrada, taxa de adesão (Funding Fee) e isenções especiais.",
    },
    sections: {
      es: [
        { h2: "1. Características del Préstamo Hipotecario VA", body: "Garantizados por el Departamento de Asuntos de Veteranos de EE.UU., los préstamos VA permiten a militares en activo, veteranos y cónyuges supervivientes elegibles adquirir una vivienda con 0% de entrada y sin seguro hipotecario mensual (PMI)." },
        { h2: "2. Tarifa de Financiamiento VA (Funding Fee)", body: "En sustitución del seguro mensual, se aplica una tarifa única de financiación: 2.15% para el primer uso con 0% de entrada (1.25% con 10% de entrada) y 3.3% para usos posteriores. Veteranos con un 10% o más de discapacidad relacionada con el servicio están 100% exentos." },
        { h2: "3. Derecho de Garantía (Entitlement)", body: "El derecho básico de $36,000 junto con el derecho suplementario garantiza a los prestamistas hasta el 25% del monto del préstamo, eliminando los límites máximos de crédito en la mayoría de los condados." },
        { h2: "4. Ejemplo de Cálculo", body: "Vivienda de $350,000 con 0% de entrada (primer uso, sin exención): Tarifa VA del 2.15% = $7,525. Préstamo total financiado = $357,525. Al 6.25% a 30 años, la cuota mensual de capital e intereses es de $2,201.27 sin PMI mensual." },
        { h2: "5. Refinanciación Rápida (IRRRL)", body: "El programa Interest Rate Reduction Refinance Loan (IRRRL) permite refinanciar préstamos VA existentes a tasas más bajas con documentación simplificada y una tarifa reducida de solo el 0.5%." },
      ],
      fr: [
        { h2: "1. Spécificités du Prêt Immobilier VA", body: "Garanti par le Département des Anciens Combattants des États-Unis, le prêt VA permet d'acheter un logement sans aucun apport initial (0% d'apport) et sans assurance PMI mensuelle." },
        { h2: "2. Frais de Financement VA (Funding Fee)", body: "Une commission unique compense l'absence d'assurance mensuelle : 2,15% pour une première utilisation à 0% d'apport, réduite en cas d'apport ou totalement exonérée pour les vétérans invalides à 10% et plus." },
        { h2: "3. Droit de Garantie (Entitlement)", body: "La garantie fédérale couvre 25% du capital prêté, sécurisant la banque prêteuse et permettant d'obtenir d'excellents taux d'intérêt." },
        { h2: "4. Exemple Chiffré", body: "Pour un achat de 350 000 $ à 0% d'apport : frais VA de 2,15% (7 525 $), capital financé de 357 525 $ à 6,25% sur 30 ans = mensualité de 2 201,27 $ sans PMI." },
        { h2: "5. Refinancement Simplifié IRRRL", body: "Le programme IRRRL permet de renégocier un taux d'intérêt à la baisse avec des formalités allégées et des frais limités à 0,5%." },
      ],
      de: [
        { h2: "1. Besonderheiten des VA-Darlehens", body: "VA-Darlehen für US-Militärangehörige und Veteranen ermöglichen den Immobilienkauf ohne Eigenkapital (100%-Finanzierung) und ohne laufende Monatsversicherung." },
        { h2: "2. VA-Finanzierungsgebühr (Funding Fee)", body: "Statt monatlicher Versicherung fällt eine einmalige Gebühr von 2,15% (Erstnutzung ohne Eigenkapital) an. Dienstbeschädigte Veteranen ab 10% GdB sind vollständig gebührenbefreit." },
        { h2: "3. Staatliche Bürgschaft (Entitlement)", body: "Das US-Veteranenministerium bürgt für 25% des Darlehens, wodurch Kreditinstitute erstklassige Zinskonditionen gewähren." },
        { h2: "4. Rechenbeispiel", body: "350.000 $ Kaufpreis, 0% Anzahlung, 2,15% Gebühr (7.525 $). Darlehen = 357.525 $ zu 6,25% auf 30 Jahre = 2.201,27 $/Monat ohne laufende PMI." },
        { h2: "5. IRRRL-Umschuldung", body: "Das IRRRL-Verfahren erlaubt unkomplizierte Zinssatzsenkungen bei bestehenden VA-Krediten mit reduzierter Gebühr von 0,5%." },
      ],
      hi: [
        { h2: "1. VA गृह ऋण की मुख्य विशेषताएं", body: "अमेरिकी सैन्य कर्मियों और पूर्व सैनिकों के लिए यह ऋण 0% डाउन पेमेंट और बिना किसी मासिक बीमा (PMI) के घर खरीदने की सुविधा देता है।" },
        { h2: "2. VA फंडिंग शुल्क और छूट", body: "पहली बार 0% डाउन पेमेंट पर 2.15% का एकमुश्त फंडिंग शुल्क लगता है। 10% या अधिक सैन्य विकलांगता वाले पूर्व सैनिकों के लिए यह शुल्क 100% माफ है।" },
        { h2: "3. सरकारी गारंटी (Entitlement)", body: "सरकार बैंक को 25% ऋण राशि की गारंटी देती है, जिससे कम ब्याज दर पर बड़ा ऋण मिल सकता है।" },
        { h2: "4. गणना उदाहरण", body: "$350,000 के मकान पर 0% डाउन पेमेंट और 2.15% फंडिंग शुल्क ($7,525) के साथ $357,525 का कुल ऋण 6.25% पर 30 वर्ष के लिए लेने पर ईएमआई $2,201.27 होगी।" },
        { h2: "5. IRRRL पुनर्वित्त सुविधा", body: "ब्याज दरें कम होने पर आसान प्रक्रिया और मात्र 0.5% शुल्क के साथ ऋण का पुनर्वित्त कराया जा सकता है।" },
      ],
      pt: [
        { h2: "1. Vantagens do Financiamento VA", body: "Garantido pelo Departamento de Assuntos de Veteranos dos EUA, o empréstimo VA permite adquirir imóveis com 0% de entrada e sem cobrança mensal de seguro habitacional." },
        { h2: "2. Taxa de Adesão (Funding Fee)", body: "Taxa única de 2,15% no primeiro uso sem entrada, com isenção total para veteranos com deficiência decorrente do serviço militar." },
        { h2: "3. Garantia Federal (Entitlement)", body: "O governo garante 25% do saldo emprestado, viabilizando taxas de juros bastante competitivas." },
        { h2: "4. Simulação Numérica", body: "Imóvel de $350.000 com 0% de entrada: taxa de $7.525 financiada. Total de $357.525 a 6,25% em 30 anos = parcela de $2.201,27 sem seguro mensal." },
        { h2: "5. Refinanciamento IRRRL", body: "Permite reduzir a taxa de juros de contratos vigentes com custos reduzidos de apenas 0,5% de taxa." },
      ],
    },
    faqs: {
      es: [
        { q: "¿Quién está exento de pagar la tarifa de financiamiento VA?", a: "Los veteranos que reciben compensación por discapacidad relacionada con el servicio (10% o más) y cónyuges sobrevivientes elegibles." },
        { q: "¿Se requiere seguro hipotecario mensual PMI en un préstamo VA?", a: "No, los préstamos VA nunca cobran seguro hipotecario mensual privado." },
      ],
      fr: [
        { q: "Qui est exonéré du Funding Fee ?", a: "Les anciens combattants reconnus invalides de guerre à 10% ou plus et certains conjoints survivants." },
        { q: "Y a-t-il une assurance PMI mensuelle ?", a: "Non, les prêts garantis VA n'imposent aucune assurance hypothécaire mensuelle." },
      ],
      de: [
        { q: "Wer ist von der VA-Finanzierungsgebühr befreit?", a: "Veteranen mit einer anerkannten Dienstbeschädigung ab 10% sowie anspruchsberechtigte Hinterbliebene." },
        { q: "Fällt eine monatliche PMI-Versicherung an?", a: "Nein, bei VA-Darlehen entfällt die monatliche PMI-Versicherung vollständig." },
      ],
      hi: [
        { q: "VA फंडिंग शुल्क से किसे छूट प्राप्त है?", a: "10% या अधिक सैन्य विकलांगता वाले पूर्व सैनिकों और पात्र आश्रितों को।" },
        { q: "क्या VA लोन में मासिक PMI बीमा लगता है?", a: "नहीं, VA लोन में कभी भी मासिक PMI बीमा नहीं लगता।" },
      ],
      pt: [
        { q: "Quem tem isenção da taxa Funding Fee?", a: "Veteranos com 10% ou mais de incapacidade militar reconhecida e cônjuges elegíveis." },
        { q: "Existe seguro mensal PMI no empréstimo VA?", a: "Não, os financiamentos VA são isentos de cobrança mensal de PMI." },
      ],
    },
  },
];

// Generate Content Pack files
for (const config of FINANCE_BATCH_DATA) {
  const dir = `src/i18n/content/${config.calcNameKey}`;
  ensureDir(dir);

  const locales = ["es", "fr", "de", "hi", "pt"];
  for (const loc of locales) {
    const title = config.titles[loc];
    const desc = config.descriptions[loc];
    const sections = config.sections[loc];
    const faqs = config.faqs[loc];

    const compName = `${loc.toUpperCase()}_${config.calcNameKey.replace(/-/g, "_").toUpperCase()}_CONTENT`;
    const seoName = `${loc.toUpperCase()}_${config.calcNameKey.replace(/-/g, "_").toUpperCase()}_SEO`;
    const faqName = `${loc.toUpperCase()}_${config.calcNameKey.replace(/-/g, "_").toUpperCase()}_FAQS`;

    const contentJsx = sections.map((sec, i) => `
      <section key={${i}} className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">${sec.h2}</h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">${sec.body}</p>
      </section>`).join("\n");

    const fileContent = `"use client";

import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const ${seoName} = {
  title: "${title}",
  description: "${desc}",
  category: "Finance",
  keywords: ["${title.toLowerCase()}", "${config.calcSlug}", "finance"],
};

export const ${faqName}: CalculatorFAQ[] = ${JSON.stringify(faqs.map(f => ({ question: f.q, answer: f.a })), null, 2)};

export function ${compName}() {
  return (
    <div className="space-y-8 py-4 text-slate-900 dark:text-slate-100">
      ${contentJsx}
    </div>
  );
}

export default ${compName};
`;
    fs.writeFileSync(path.join(dir, `${loc}.tsx`), fileContent, "utf-8");
  }
}

console.log("All 25 Finance Content Packs generated successfully.");
