import fs from "fs";
import path from "path";

function writeFile(relPath: string, content: string) {
  const fullPath = path.resolve(process.cwd(), relPath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content.trim() + "\n", "utf-8");
  console.log(`✓ Wrote: ${relPath}`);
}

const LOCALES = ["es", "fr", "de", "hi", "pt"] as const;

interface RentVsBuyTexts {
  title: string;
  metaDesc: string;
  keywords: string[];
  faqs: { question: string; answer: string }[];
  pIntro: string;
  sec2_h2: string;
  sec2_p1: string;
  sec2_p2: string;
  sec3_h2: string;
  sec3_p1: string;
  sec3_p2: string;
  sec4_h2: string;
  sec4_steps: string[];
  sec5_h2: string;
  sec5_1_h3: string;
  sec5_1_p: string;
  sec5_2_h3: string;
  sec5_2_p: string;
  sec5_3_h3: string;
  sec5_3_p: string;
  sec5_4_h3: string;
  sec5_4_p: string;
  sec6_h2: string;
  sec6_p1: string;
  sec6_p2: string;
  sec7_h2: string;
  sec7_p1: string;
  sec7_p2: string;
  sec8_h2: string;
  sec8_p1: string;
  sec8_p2: string;
  sec9_h2: string;
  sec9_p1: string;
  sec9_p2: string;
  sec10_h2: string;
  sec10_p1: string;
  sec10_p2: string;
  sec11_h2: string;
  sec11_p1: string;
  sec11_p2: string;
  sec12_h2: string;
  sec12_p1: string;
  sec12_p2: string;
  sec13_h2: string;
  sec13_p1: string;
  sec13_p2: string;
  sec14_h2: string;
  sec14_p1: string;
  sec14_p2: string;
  sec15_h2: string;
  sec15_p1: string;
  sec15_p2: string;
  sec16_h2: string;
  sec16_p1: string;
  sec16_p2: string;
  sec16_p3: string;
  sec17_h2: string;
  sec17_p1: string;
  sec17_p2: string;
  sec18_h2: string;
  sec18_p1: string;
  sec18_p2: string;
  sec19_h2: string;
  sec19_mistakes: string[];
  sec20_h2: string;
  sec20_p1: string;
  sec20_p2: string;
  sec21_h2: string;
  sec21_1_h3: string;
  sec21_1_f: string;
  sec21_2_h3: string;
  sec21_2_p: string;
  sec21_3_h3: string;
  sec21_3_p: string;
  sec21_4_h3: string;
  sec21_4_p: string;
  sec21_5_h3: string;
  sec21_5_p: string;
  sec21_6_h3: string;
  sec21_6_p: string;
  overlayInputs: Record<string, string>;
  overlayOutputs: Record<string, string>;
}

const RVB_DATA: Record<typeof LOCALES[number], RentVsBuyTexts> = {
  es: {
    title: "Calculadora de Alquilar frente a Comprar (Rent vs Buy)",
    metaDesc: "Compare alquilar y comprar vivienda: cuotas hipotecarias, revalorización, inflación de alquileres, costes irrecuperables y horizonte de equilibrio.",
    keywords: ["calculadora alquilar o comprar", "rent vs buy calculadora", "conviene alquilar o comprar", "coste oportunidad vivienda"],
    faqs: [
      { question: "¿Es mejor alquilar o comprar una vivienda?", answer: "Depende de sus planes de permanencia, precio de compra, nivel de alquileres, costes de transacción y rentabilidad de inversiones alternativas." },
      { question: "¿Qué es el horizonte de equilibrio (breakeven)?", answer: "Es el número de años necesarios para que comprar sea financieramente más ventajoso que alquilar una vivienda equivalente." },
      { question: "¿Qué es la regla del 5% al comparar alquiler y compra?", answer: "Estima los costes irrecuperables de la propiedad sumando intereses hipotecarios, impuestos prediales y mantenimiento anual." },
      { question: "¿Cómo influye la revalorización de la vivienda?", answer: "Aumenta el patrimonio neto del propietario a largo plazo, aunque no está garantizada y varía según el ciclo inmobiliario." },
      { question: "¿Cómo afecta la subida de los alquileres a la decisión?", answer: "Alquileres crecientes aumentan el gasto acumulado del inquilino, haciendo más atractiva la cuota hipotecaria fija a largo plazo." },
      { question: "¿Cuál es el coste de oportunidad del pago inicial?", answer: "Es el rendimiento financiero que habría obtenido si hubiese invertido el capital de la entrada en activos financieros diversificados." },
      { question: "¿Qué costes ocultos tiene la compra de vivienda?", answer: "Incluyen costes de cierre (2%–5%), mantenimiento periódico (1% anual), impuestos sobre bienes inmuebles y comisiones de venta futuras (5%–6%)." },
      { question: "¿Qué es el ratio precio-alquiler (Price-to-Rent Ratio)?", answer: "Es el precio de la vivienda dividido entre el alquiler anual total; ratios por debajo de 15 favorecen la compra y por encima de 20 el alquiler." },
      { question: "¿Cómo influyen los beneficios fiscales de la hipoteca?", answer: "La deducción de intereses y tributos locales puede reducir la carga impositiva neta del propietario que desgrava fiscalmente." },
      { question: "¿Por qué el horizonte temporal de estancia es tan determinante?", answer: "Porque los elevados costes de transacción iniciales requieren varios años de amortización y plusvalía para ser compensados." },
      { question: "¿Qué ocurre con el patrimonio neto al cabo de 30 años?", answer: "El comprador acumula el valor íntegro de la vivienda libre de cargas, mientras que el inquilino depende del rendimiento de su cartera de inversión." },
      { question: "¿Cómo realizar un análisis de sensibilidad?", answer: "Pruebe escenarios conservadores variando el crecimiento del alquiler, la apreciación del inmueble y el rendimiento del capital." }
    ],
    pIntro: "Compare alquilar y comprar vivienda con desglose completo de costes hipotecarios, crecimiento de alquileres, apreciación del inmueble, impuestos, mantenimiento, coste de oportunidad del capital y patrimonio neto acumulado.",
    sec2_h2: "2. ¿Qué Hace Realmente una Calculadora de Alquilar frente a Comprar?",
    sec2_p1: "La decisión de alquilar o comprar una vivienda no es una simple comparación entre la mensualidad de alquiler y la cuota de la hipoteca. Un análisis riguroso integra la entrada inicial, los intereses del préstamo, la amortización de principal, el IBI/impuestos prediales, seguros de hogar, mantenimiento, gastos comunitarios, costes de cierre en la compra y venta, apreciación del inmueble, inflación de rentas y el coste de oportunidad del capital inmovilizado.",
    sec2_p2: "Esta calculadora es un modelo financiero de planificación y simulación de escenarios. En el escenario base validado, el horizonte de equilibrio es de aproximadamente 4,8 años, favoreciendo la compra a largo plazo bajo los parámetros establecidos.",
    sec3_h2: "3. La Idea Fundamental: Comparar la Economía Total, no Solo el Pago Mensual",
    sec3_p1: "La cuota hipotecaria contiene dos elementos distintos: coste financiero (intereses) y ahorro forzoso (amortización de capital que genera patrimonio neto). El inquilino no asume gastos de mantenimiento ni impuestos de propiedad, pero afronta alquileres crecientes y conserva liquidez para invertir en otros activos.",
    sec3_p2: "Por este motivo, nuestro modelo compara flujos de caja reales, costes irrecuperables, acumulación patrimonial y patrimonio neto proyectado a lo largo del tiempo.",
    sec4_h2: "4. Cómo Utilizar la Calculadora",
    sec4_steps: [
      "1. Introduzca el precio de compra de la vivienda y el porcentaje de entrada.",
      "2. Indique el tipo de interés hipotecario y el plazo del préstamo en años.",
      "3. Añada las estimaciones de impuestos prediales, seguro, mantenimiento y comunidad.",
      "4. Indique los costes de cierre al comprar y los gastos de venta futuros.",
      "5. Introduzca el alquiler mensual actual y la tasa anual de crecimiento de la renta.",
      "6. Añada el seguro de inquilino y gastos accesorios del alquiler.",
      "7. Establezca la rentabilidad esperada de las inversiones alternativas para el coste de oportunidad.",
      "8. Revise el desglose de costes comparativos de ambas opciones.",
      "9. Inspecione el horizonte de equilibrio (breakeven) y la tabla de duración de estancia.",
      "10. Evalúe el ratio precio-alquiler y la regla del 5% como indicadores complementarios.",
      "11. Analice la comparativa de patrimonio neto a 10, 20 y 30 años.",
      "12. Guarde sus escenarios para comparar diferentes hipótesis de mercado."
    ],
    sec5_h2: "5. Parámetros de Entrada Explicados",
    sec5_1_h3: "5.1 Precio de la Vivienda y Pago Inicial",
    sec5_1_p: "Determinan el capital inicial prestado. Para 500.000 $ con un 20% de entrada, se requieren 100.000 $ en efectivo y una hipoteca de 400.000 $, afectando a intereses, costes de cierre y coste de oportunidad.",
    sec5_2_h3: "5.2 Tipo de Interés Hipotecario y Plazo",
    sec5_2_p: "Determinan la tabla de amortización a tipo fijo. Tipos más altos incrementan el coste irrecuperable de financiación; plazos más largos reducen la cuota mensual pero prolongan el devengo de intereses.",
    sec5_3_h3: "5.3 Impuestos Prediales, Seguros, Mantenimiento y Comunidad",
    sec5_3_p: "Representan la carga de propiedad periódica no recuperable. El modelo actualiza estos costes anualmente con la inflación.",
    sec5_4_h3: "5.4 Renta Inicial e Incremento Anual del Alquiler",
    sec5_4_p: "El alquiler crece anualmente según la tasa prevista, reflejando el encarecimiento acumulativo del arrendamiento en el tiempo.",
    sec6_h2: "6. Cómo Funciona el Lado de la Compra Hipotecaria",
    sec6_p1: "La hipoteca aplica amortización periódica constante donde cada cuota se desglosa en intereses sobre el saldo deudor y reducción de principal.",
    sec6_p2: "A medida que transcurren los años, la porción de intereses disminuye y la cuota amortiza más capital, acelerando la creación de patrimonio.",
    sec7_h2: "7. Costes de la Compra Más Allá de la Hipoteca",
    sec7_p1: "Ser propietario conlleva gastos que no generan capital: impuestos de bienes inmuebles, seguro de hogar, reparaciones estructurales y comisiones inmobiliarias de intermediación al vender (5%–6%).",
    sec7_p2: "Estos costes son críticos en periodos cortos: el comprador necesita varios años de plusvalía y amortización para compensar los gastos iniciales y de salida.",
    sec8_h2: "8. Por Qué el Tiempo de Estancia es el Factor Decisivo",
    sec8_p1: "Los costes de entrada y salida se concentran en las transacciones, mientras que la plusvalía y el pago de principal se acumulan con los años.",
    sec8_p2: "En el escenario base, el punto de equilibrio se alcanza a los 4,8 años. Estancias inferiores a 3 o 4 años suelen favorecer financieramente el alquiler.",
    sec9_h2: "9. Explicación del Punto de Equilibrio (Breakeven)",
    sec9_p1: "El punto de equilibrio es el momento en que el coste neto acumulado de comprar se iguala y pasa a ser inferior al coste acumulado de alquilar.",
    sec9_p2: "A 30 años, el coste neto acumulado modelado es de 726.761 $ para la compra frente a 1.721.379 $ para el alquiler en las condiciones analizadas.",
    sec10_h2: "10. Apreciación y Revalorización de la Vivienda",
    sec10_p1: "La revalorización anual compuesta incrementa el valor de tasación del inmueble con el paso de los años.",
    sec10_p2: "Con una hipótesis del 3% anual, una vivienda de 500.000 $ alcanza un valor estimado de más de 1.200.000 $ a los 30 años.",
    sec11_h2: "11. Crecimiento de las Rentas de Alquiler",
    sec11_p1: "Un alquiler de 3.000 $/mes con un 3% de incremento anual se convierte en 7.280 $/mes al cabo de 30 años.",
    sec11_p2: "Este efecto acumulativo hace que la cuota hipotecaria fija sea cada vez más ventajosa en comparación con el alquiler futuro.",
    sec12_h2: "12. Coste de Oportunidad de la Entrada",
    sec12_p1: "La entrada inmoviliza capital. El modelo proyecta cuánto habría generado ese dinero en una cartera diversificada de inversión.",
    sec12_p2: "A un 5% de rentabilidad anual, 100.000 $ invertidos alcanzan más de 432.000 $ en 30 años, constituyendo el pilar patrimonial del inquilino.",
    sec13_h2: "13. Ratio Precio-Alquiler (Price-to-Rent)",
    sec13_p1: "Se calcula dividiendo el precio de compra entre el alquiler anual (500.000 $ / 36.000 $ = 13,9).",
    sec13_p2: "Ratios inferiores a 15 indican que comprar es históricamente más favorable que alquilar en esa zona.",
    sec14_h2: "14. La Regla del 5% de Costes Irrecuperables",
    sec14_p1: "La regla evalúa los costes irrecuperables de la propiedad: intereses netos + impuestos + mantenimiento.",
    sec14_p2: "Para 500.000 $ con un coste irrecuperable del 9,63% anual, el umbral es de 4.013 $/mes frente al alquiler equivalente.",
    sec15_h2: "15. Beneficios Fiscales y Escudo Hipotecario",
    sec15_p1: "La deducción de intereses hipotecarios puede generar un ahorro impositivo en declaraciones desgravadas.",
    sec15_p2: "Para el primer año, el modelo estima un beneficio fiscal ilustrativo de aproximadamente 1.007 $ bajo las deducciones aplicables.",
    sec16_h2: "16. Patrimonio Neto: Capital Inmobiliario vs Cartera de Inversión",
    sec16_p1: "La comparación final evalúa el patrimonio neto total generado por cada opción.",
    sec16_p2: "A 10 años, el patrimonio inmobiliario neto modelado es de 359.958 $ frente a 162.889 $ de la cartera del inquilino.",
    sec16_p3: "A 30 años, la vivienda completamente pagada representa un activo libre de cargas de gran valor.",
    sec17_h2: "17. Por Qué Comprar Gana en un Escenario y Alquilar en Otro",
    sec17_p1: "Horizontes largos, apreciación moderada y alquileres crecientes favorecen la compra.",
    sec17_p2: "Estancias cortas, altos costes de transacción y mercados bursátiles muy rentables favorecen el alquiler.",
    sec18_h2: "18. Decisiones de Vivienda a Corto vs Largo Plazo",
    sec18_p1: "El alquiler proporciona máxima flexibilidad geográfica y laboral a corto plazo.",
    sec18_p2: "La compra es una herramienta de estabilización de costes y acumulación patrimonial a largo plazo.",
    sec19_h2: "19. Errores Comunes que Deben Evitarse",
    sec19_mistakes: [
      "Comparar únicamente el alquiler mensual con la cuota de la hipoteca.",
      "Tratar la cuota hipotecaria como un gasto 100% perdido sin considerar la amortización de principal.",
      "Olvidar los costes periódicos de mantenimiento, IBI y seguro de hogar.",
      "Ignorar los costes de compra y las comisiones de venta futuras.",
      "Asumir que la revalorización de la vivienda está garantizada.",
      "Suponer rentabilidades bursátiles fijas sin volatilidad.",
      "Utilizar el ratio precio-alquiler como única variable de decisión.",
      "Ignorar el impacto del crecimiento compuesto de los alquileres en 10–20 años.",
      "No realizar pruebas de estrés con diferentes tipos de interés y periodos de estancia."
    ],
    sec20_h2: "20. Análisis de Escenarios: La Mejor Práctica",
    sec20_p1: "Cree un escenario base, un escenario conservador de propiedad y un escenario conservador de alquiler.",
    sec20_p2: "Modifique una variable a la vez para identificar qué factores tienen mayor impacto en su decisión personal.",
    sec21_h2: "21. Metodología y Fórmulas Fundamentales",
    sec21_1_h3: "21.1 Cuota Hipotecaria Fija",
    sec21_1_f: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    sec21_2_h3: "21.2 Valor Futuro de la Vivienda",
    sec21_2_p: "Valor(t) = Valor(0) × (1 + r_apreciacion)^t",
    sec21_3_h3: "21.3 Alquiler Futuro Escalado",
    sec21_3_p: "Alquiler(t) = Alquiler(0) × (1 + r_inflacion_renta)^t",
    sec21_4_h3: "21.4 Ratio Precio-Alquiler",
    sec21_4_p: "Ratio = Precio de Compra / Alquiler Anual Total (Base: 13.9)",
    sec21_5_h3: "21.5 Coste de Oportunidad de la Inversión",
    sec21_5_p: "Cartera(t) = Entrada Inicial × (1 + r_inversion)^t",
    sec21_6_h3: "21.6 Beneficio Fiscal Estimado",
    sec21_6_p: "Beneficio = max(0, Deducciones Detalladas - Deducción Estándar) × Tipo Marginal",
    overlayInputs: {
      homePrice: "Precio de Compra de la Vivienda",
      downPaymentPercent: "Porcentaje de Entrada (%)",
      interestRate: "Tipo de Interés Hipotecario (%)",
      loanTermYears: "Plazo de la Hipoteca (Años)",
      propertyTaxRate: "Impuesto sobre Bienes Inmuebles (%)",
      homeInsuranceAnnual: "Seguro de Hogar Anual ($)",
      monthlyRent: "Alquiler Mensual Actual ($)",
      rentGrowthRate: "Crecimiento Anual del Alquiler (%)",
      homeAppreciationRate: "Revalorización Anual del Inmueble (%)",
      investmentReturnRate: "Rentabilidad de Inversiones Alternativas (%)",
      maintenanceRate: "Mantenimiento Anual Estimado (%)"
    },
    overlayOutputs: {
      breakevenYears: "Horizonte de Equilibrio (Años)",
      netCostBuying30Yr: "Coste Neto Acumulado Comprando (30 Años)",
      netCostRenting30Yr: "Coste Neto Acumulado Alquilando (30 Años)",
      netWorthBuying10Yr: "Patrimonio Neto Comprador (10 Años)",
      netWorthRenting10Yr: "Patrimonio Inquilino Inversor (10 Años)",
      priceToRentRatio: "Ratio Precio-Alquiler",
      monthlyUnrecoverableCost: "Coste Mensual Irrecuperable"
    }
  },
  fr: {
    title: "Calculateur Louer ou Acheter (Rent vs Buy)",
    metaDesc: "Comparez la location et l'achat immobilier : mensualités, appréciation, hausse des loyers, coût d'opportunité et horizon de rentabilité.",
    keywords: ["calculateur louer ou acheter", "rent vs buy", "rentabilite achat immobilier", "comparatif location achat"],
    faqs: [
      { question: "Vaut-il mieux louer ou acheter son logement ?", answer: "Cela dépend de votre horizon de séjour, du prix d'achat, du niveau des loyers et du rendement de vos investissements." },
      { question: "Qu'est-ce que l'horizon de rentabilité (breakeven) ?", answer: "Le nombre d'années nécessaires pour que l'achat devienne financièrement plus avantageux que la location équivalente." },
      { question: "Qu'est-ce que la règle des 5 % ?", answer: "Elle évalue les coûts irrécupérables de l'achat en additionnant les intérêts, les taxes foncières et l'entretien annuel." },
      { question: "Comment l'appréciation immobilière influence-t-elle le résultat ?", answer: "Elle augmente la valeur nette du patrimoine à terme, bien qu'elle varie selon les cycles de marché." },
      { question: "Quel est l'effet de l'augmentation des loyers ?", answer: "La hausse annuelle des loyers alourdit le coût du locataire, rendant la mensualité fixe d'achat plus avantageuse." },
      { question: "Qu'est-ce que le coût d'opportunité de l'apport ?", answer: "Le rendement financier auquel vous renoncez en immobilisant votre épargne dans le bien au lieu de la placer." },
      { question: "Quels sont les coûts cachés de l'achat immobilier ?", answer: "Frais de clôture (2 % à 5 %), taxe foncière, assurance, entretien annuel (1 %) et frais d'agence à la revente." },
      { question: "Qu'est-ce que le ratio prix/loyer ?", answer: "Le prix du bien divisé par le loyer annuel; un ratio inférieur à 15 favorise l'achat et supérieur à 20 la location." },
      { question: "Comment les déductions fiscales sont-elles intégrées ?", answer: "Les intérêts et taxes déductibles réduisent la charge fiscale nette des propriétaires admissibles." },
      { question: "Pourquoi la durée de détention est-elle primordiale ?", answer: "Parce que les frais de transaction initiaux nécessitent plusieurs années de remboursement pour être amortis." },
      { question: "Quel est l'impact sur le patrimoine après 30 ans ?", answer: "L'acheteur détient un bien immobilier entièrement payé tandis que le locataire capitalise sur son portefeuille boursier." },
      { question: "Comment conduire une analyse de sensibilité ?", answer: "Simulez plusieurs scénarios en modifiant l'appréciation, l'inflation des loyers et les rendements boursiers." }
    ],
    pIntro: "Analysez en détail le dilemme entre location et achat immobilier en intégrant amortissement, hausse des loyers, taxes, entretien et coût d'opportunité des capitaux.",
    sec2_h2: "2. Que Fait Réellement un Calculateur Louer ou Acheter ?",
    sec2_p1: "Choisir entre louer ou acheter ne se résume pas à comparer un loyer à une mensualité hypothécaire. Un modèle complet intègre l'apport personnel, les intérêts, le remboursement de capital, les taxes foncières, les assurances, l'entretien, les charges de copropriété, les frais de transaction, l'appréciation du bien et le coût d'opportunité des fonds investis.",
    sec2_p2: "Cet outil est un modèle d'aide à la décision financière. Dans le scénario de référence, l'horizon de rentabilité s'établit à environ 4,8 ans sous les hypothèses sélectionnées.",
    sec3_h2: "3. Comparer l'Économie Globale, Pas Uniquement les Mensualités",
    sec3_p1: "Une mensualité de prêt comprend une charge financière (intérêts) et une épargne forcée (amortissement de capital). Le locataire n'assume pas de frais d'entretien lourd mais subit des hausses de loyer continues et conserve des liquidités à investir.",
    sec3_p2: "Notre modèle confronte ainsi les coûts irrécupérables, l'accumulation de patrimoine net et les flux de trésorerie sur toute la période.",
    sec4_h2: "4. Guide d'Utilisation du Calculateur",
    sec4_steps: [
      "1. Saisissez le prix d'achat du bien et le pourcentage d'apport.",
      "2. Indiquez le taux d'intérêt et la durée du prêt en années.",
      "3. Renseignez la taxe foncière, l'assurance et l'entretien annuel.",
      "4. Précisez les frais de clôture à l'achat et les frais de vente futurs.",
      "5. Entrez le loyer mensuel initial et le taux de croissance annuel du loyer.",
      "6. Ajoutez l'assurance locataire et les charges annexes.",
      "7. Indiquez le taux de rendement estimé pour vos placements alternatifs.",
      "8. Examinez la décomposition des coûts pour chaque option.",
      "9. Analysez l'horizon de rentabilité et le tableau de durée de détention.",
      "10. Évaluez le ratio prix/loyer et la règle des 5 %.",
      "11. Comparez l'évolution du patrimoine net à 10, 20 et 30 ans.",
      "12. Sauvegardez vos scénarios pour tester différentes hypothèses."
    ],
    sec5_h2: "5. Explication des Données d'Entrée",
    sec5_1_h3: "5.1 Prix du Bien et Mise de Fonds",
    sec5_1_p: "Ils déterminent le montant emprunté. Pour 500 000 $ avec 20 % d'apport, vous mobilisez 100 000 $ et empruntez 400 000 $.",
    sec5_2_h3: "5.2 Taux Hypothécaire et Durée",
    sec5_2_p: "Ils définissent le plan d'amortissement fixe. Un taux supérieur augmente le coût financier irrécupérable.",
    sec5_3_h3: "5.3 Taxe Foncière, Assurances et Entretien",
    sec5_3_p: "Représentent les charges récurrentes liées à la propriété, ajustées chaque année avec l'inflation.",
    sec5_4_h3: "5.4 Loyer Initial et Croissance Annuelle",
    sec5_4_p: "Le loyer augmente chaque année selon l'inflation locative prévue.",
    sec6_h2: "6. Fonctionnement du Volet Hypothécaire",
    sec6_p1: "Chaque mensualité se compose d'intérêts dégressifs et d'un amortissement progressif du capital.",
    sec6_p2: "Au fil des années, la part de capital remboursée s'accroît, accélérant la création de valeur nette.",
    sec7_h2: "7. Coûts d'Achat Hors Mensualité de Prêt",
    sec7_p1: "La propriété implique des dépenses non récupérables : taxes locales, entretien régulier et frais de transaction à la vente (5 % à 6 %).",
    sec7_p2: "Ces frais rendent les détentions courtes risquées : plusieurs années d'amortissement sont requises pour les compenser.",
    sec8_h2: "8. Pourquoi la Durée de Détention est Capitale",
    sec8_p1: "Les frais d'acquisition et de cession sont ponctuels, tandis que l'appréciation et le remboursement s'étalent dans le temps.",
    sec8_p2: "Dans notre scénario, le point mort est atteint à 4,8 ans. En dessous de 3 ans, la location s'avère souvent plus rentable.",
    sec9_h2: "9. Explication du Point Mort (Breakeven)",
    sec9_p1: "C'est l'instant où le coût net cumulé de l'achat devient inférieur à celui de la location.",
    sec9_p2: "À 30 ans, le coût net cumulé s'établit à 726 761 $ à l'achat contre 1 721 379 $ en location dans le modèle standard.",
    sec10_h2: "10. Appréciation Immobilière",
    sec10_p1: "La hausse annuelle composée de la valeur du logement enrichit le propriétaire.",
    sec10_p2: "À 3 % par an, un bien de 500 000 $ dépasse 1 200 000 $ de valeur marchande après 30 ans.",
    sec11_h2: "11. Inflation des Loyers",
    sec11_p1: "Un loyer de 3 000 $ progressant de 3 % par an atteint 7 280 $/mois au bout de 30 ans.",
    sec11_p2: "Cette progression continue renforce l'avantage d'une mensualité de prêt fixe dans le temps.",
    sec12_h2: "12. Coût d'Opportunité de l'Apport",
    sec12_p1: "L'apport immobilise des capitaux qui auraient pu fructifier sur les marchés financiers.",
    sec12_p2: "À 5 % par an, 100 000 $ investis génèrent plus de 432 000 $ en 30 ans.",
    sec13_h2: "13. Ratio Prix / Loyer",
    sec13_p1: "Établi en divisant le prix d'achat par le loyer annuel (500 000 $ / 36 000 $ = 13,9).",
    sec13_p2: "Un ratio inférieur à 15 reflète un marché structurellement favorable à l'acquisition.",
    sec14_h2: "14. La Règle des 5 % des Coûts Irrécupérables",
    sec14_p1: "Elle totalise les intérêts nets, les taxes et l'entretien annuel.",
    sec14_p2: "Pour 500 000 $, le coût irrécupérable modélisé s'élève à 4 013 $/mois face au loyer équivalent.",
    sec15_h2: "15. Avantages Fiscaux Hypothécaires",
    sec15_p1: "La déduction des intérêts d'emprunt peut procurer un allègement fiscal substantiel.",
    sec15_p2: "Le modèle évalue une économie fiscale indicative de 1 007 $ la première année.",
    sec16_h2: "16. Patrimoine Net : Immobilier vs Portefeuille de Placements",
    sec16_p1: "La comparaison finale porte sur la valeur nette totale accumulée.",
    sec16_p2: "À 10 ans, le patrimoine net immobilier atteint 359 958 $ contre 162 889 $ pour le portefeuille du locataire.",
    sec16_p3: "À 30 ans, le bien immobilier intégralement remboursé constitue un capital net majeur.",
    sec17_h2: "17. Pourquoi l'Achat Gagne dans un Cas et la Location dans un Autre",
    sec17_p1: "Un horizon long, une hausse modérée des prix et des loyers dynamiques avantagent l'achat.",
    sec17_p2: "Une mobilité fréquente et des marchés boursiers performants favorisent la location.",
    sec18_h2: "18. Décisions Résidentielles : Court Terme vs Long Terme",
    sec18_p1: "La location assure une grande agilité géographique et professionnelle.",
    sec18_p2: "L'achat stabilise les coûts d'hébergement et bâtit un patrimoine pérenne.",
    sec19_h2: "19. Erreurs Fréquentes à Éviter",
    sec19_mistakes: [
      "Comparer uniquement le loyer à la mensualité de prêt.",
      "Considérer la mensualité hypothécaire comme une dépense entièrement perdue.",
      "Oublier les taxes foncières, l'assurance et l'entretien régulier.",
      "Négliger les frais de transaction à l'achat et à la revente.",
      "Supposer que l'appréciation immobilière est garantie chaque année.",
      "Anticiper des rendements boursiers linéaires sans volatilité.",
      "Prendre le ratio prix/loyer comme seul critère de décision.",
      "Sous-estimer l'impact de l'inflation cumulée des loyers sur 20 ans.",
      "Ne pas tester de scénarios de sensibilité avec différentes durées de détention."
    ],
    sec20_h2: "20. Analyse de Scénarios : La Méthode Recommandée",
    sec20_p1: "Bâtissez un scénario de base, un scénario d'achat prudent et un scénario de location optimisé.",
    sec20_p2: "Faites varier un paramètre à la fois pour mesurer les facteurs déterminants de votre choix.",
    sec21_h2: "21. Méthodologie et Formules de Référence",
    sec21_1_h3: "21.1 Mensualité Hypothécaire",
    sec21_1_f: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    sec21_2_h3: "21.2 Valeur Future du Bien",
    sec21_2_p: "Valeur(t) = Valeur(0) × (1 + r_appreciation)^t",
    sec21_3_h3: "21.3 Évolution du Loyer",
    sec21_3_p: "Loyer(t) = Loyer(0) × (1 + r_inflation_loyer)^t",
    sec21_4_h3: "21.4 Ratio Prix / Loyer",
    sec21_4_p: "Ratio = Prix d'Achat / Loyer Annuel Global (Base : 13.9)",
    sec21_5_h3: "21.5 Coût d'Opportunité de Placement",
    sec21_5_p: "Portefeuille(t) = Apport Initial × (1 + r_placement)^t",
    sec21_6_h3: "21.6 Économie Fiscale Estimée",
    sec21_6_p: "Économie = max(0, Déductions Réelles - Déduction Forfaitaire) × Taux Marginal",
    overlayInputs: {
      homePrice: "Prix d'Achat de la Propriété",
      downPaymentPercent: "Pourcentage d'Apport Personnel (%)",
      interestRate: "Taux d'Intérêt Hypothécaire (%)",
      loanTermYears: "Durée du Prêt (Années)",
      propertyTaxRate: "Taux de Taxe Foncière (%)",
      homeInsuranceAnnual: "Assurance Habitation Annuelle ($)",
      monthlyRent: "Loyer Mensuel Initial ($)",
      rentGrowthRate: "Taux de Croissance Annuel du Loyer (%)",
      homeAppreciationRate: "Taux d'Appréciation Annuel du Bien (%)",
      investmentReturnRate: "Rendement des Placements Alternatifs (%)",
      maintenanceRate: "Frais d'Entretien Annuels (%)"
    },
    overlayOutputs: {
      breakevenYears: "Horizon de Rentabilité (Années)",
      netCostBuying30Yr: "Coût Net Cumulé Achat (30 Ans)",
      netCostRenting30Yr: "Coût Net Cumulé Location (30 Ans)",
      netWorthBuying10Yr: "Valeur Nette Acheteur (10 Ans)",
      netWorthRenting10Yr: "Valeur Nette Locataire Investisseur (10 Ans)",
      priceToRentRatio: "Ratio Prix / Loyer",
      monthlyUnrecoverableCost: "Coût Mensuel Irrécupérable"
    }
  },
  de: {
    title: "Mieten oder Kaufen Rechner (Rent vs Buy)",
    metaDesc: "Vergleichen Sie Mieten und Kaufen: Hypothekenzinsen, Wertsteigerung, Mieterhöhungen, Opportunitätskosten und Amortisationszeit.",
    keywords: ["mieten oder kaufen rechner", "rent vs buy rechner", "immobilienkauf vergleich", "lohnt sich kaufen oder mieten"],
    faqs: [
      { question: "Ist Mieten oder Kaufen wirtschaftlich vorteilhafter?", answer: "Das hängt von Haltedauer, Kaufpreis, Mietniveau, Kaufnebenkosten und alternativen Renditen ab." },
      { question: "Was bedeutet der Breakeven-Horizont?", answer: "Die Anzahl der Jahre, nach denen der Kauf finanziell vorteilhafter wird als das Mieten." },
      { question: "Was besagt die 5%-Regel beim Immobilienvergleich?", answer: "Sie summiert die unwiederbringlichen Kosten des Eigentums: Hypothekenzinsen, Grundsteuer und Instandhaltung." },
      { question: "Welche Rolle spielt die Wertsteigerung der Immobilie?", answer: "Sie steigert das Nettovermögen des Eigentümers über die Zeit, ist jedoch marktabhängig." },
      { question: "Wie wirken sich Mieterhöhungen aus?", answer: "Steigende Mieten verteuern das Wohnen zur Miete und machen die feste Monatsrate des Eigentümers attraktiver." },
      { question: "Was versteht man unter den Opportunitätskosten des Eigenkapitals?", answer: "Die entgangenen Anlageerträge, wenn das Eigenkapital in die Immobilie statt in den Kapitalmarkt fließt." },
      { question: "Welche Nebenkosten fallen beim Eigentum an?", answer: "Kaufnebenkosten (2 %–5 %), Grundsteuer, Wohngebäudeversicherung, Instandhaltungsrücklagen und Maklerkosten beim Verkauf." },
      { question: "Was ist das Kaufpreis-Miete-Verhältnis (Price-to-Rent)?", answer: "Kaufpreis geteilt durch die Jahreskaltmiete; Werte unter 15 sprechen für Kaufen, über 20 für Mieten." },
      { question: "Werden steuerliche Abzugsmöglichkeiten berücksichtigt?", answer: "Abzugsfähige Schuldzinsen und Aufwendungen können die Steuerlast mindern." },
      { question: "Warum ist die geplante Wohndauer entscheidend?", answer: "Hohe Kaufnebenkosten amortisieren sich erst über mehrere Jahre des Schuldenabbaus und der Wertsteigerung." },
      { question: "Wie entwickelt sich das Nettovermögen nach 30 Jahren?", answer: "Der Käufer besitzt eine schuldenfreie Immobilie, während der Mieter auf sein angespartes Wertpapierdepot setzt." },
      { question: "Wie führt man eine Sensitivitätsanalyse durch?", answer: "Vergleichen Sie Szenarien mit variierenden Mietsteigerungen, Wertentwicklungen und Anlagezinsen." }
    ],
    pIntro: "Umfassender Vergleich zwischen Mieten und Kaufen unter Berücksichtigung von Tilgung, Mieterhöhung, Wertsteigerung, Instandhaltung, Steuern und Opportunitätskosten.",
    sec2_h2: "2. Was leistet ein Mieten-oder-Kaufen-Rechner?",
    sec2_p1: "Die Entscheidung für Miete oder Eigentum ist weit mehr als der Vergleich zwischen Monatsmiete und Kreditrate. Eine fundierte Analyse berücksichtigt Eigenkapital, Zinsen, Tilgung, Grundsteuer, Gebäudeversicherung, Instandhaltung, Kaufnebenkosten, Verkaufskosten, Wertsteigerung, Mietsteigerung und entgangene Kapitalmarktrenditen.",
    sec2_p2: "Dieser Rechner ist ein finanzmathematisches Modellierungswerkzeug. Im validierten Basisszenario liegt der Breakeven-Horizont bei etwa 4,8 Jahren zugunsten des Immobilienkaufs.",
    sec3_h2: "3. Gesamtwirtschaftlichen Vergleich anstellen, nicht nur Monatsraten",
    sec3_p1: "Eine Kreditrate besteht aus Zinsaufwand und Tilgung (Vermögensaufbau). Mieter tragen keine Instandhaltungskosten, unterliegen jedoch Mietsteigerungen und können ihr freies Kapital am Kapitalmarkt anlegen.",
    sec3_p2: "Unser Modell vergleicht daher Cashflows, unwiederbringliche Kosten, Eigenkapitalaufbau und Nettovermögensentwicklung über 30 Jahre.",
    sec4_h2: "4. Bedienungsanleitung für den Rechner",
    sec4_steps: [
      "1. Geben Sie Kaufpreis und Eigenkapitalquote ein.",
      "2. Tragen Sie Sollzins und Darlehenslaufzeit ein.",
      "3. Erfassen Sie Grundsteuer, Versicherung und Instandhaltungsrücklage.",
      "4. Geben Sie Kaufnebenkosten und erwartete Verkaufskosten an.",
      "5. Tragen Sie die aktuelle Monatsmiete und die jährliche Mietsteigerungsrate ein.",
      "6. Ergänzen Sie Hausratversicherung und sonstige Mietnebenkosten.",
      "7. Wählen Sie die Renditeerwartung für alternative Geldanlagen.",
      "8. Überprüfen Sie die Gesamtkostenaufstellung beider Optionen.",
      "9. Prüfen Sie den Breakeven-Horizont und die Wohndauertabelle.",
      "10. Beurteilen Sie das Kaufpreis-Miete-Verhältnis und die 5%-Regel.",
      "11. Vergleichen Sie die Nettovermögenskurven über 10, 20 und 30 Jahre.",
      "12. Speichern Sie Szenarien zum systematischen Vergleich."
    ],
    sec5_h2: "5. Eingabeparameter im Detail",
    sec5_1_h3: "5.1 Kaufpreis und Eigenkapital",
    sec5_1_p: "Bestimmen das Darlehensvolumen. Bei 500.000 $ mit 20 % Anzahlung werden 100.000 $ Eigenkapital gebunden und 400.000 $ finanziert.",
    sec5_2_h3: "5.2 Sollzins und Laufzeit",
    sec5_2_p: "Definieren den Annuitätentilgungsplan. Höhere Zinsen steigern den unwiederbringlichen Finanzierungsaufwand.",
    sec5_3_h3: "5.3 Grundsteuer, Versicherung und Instandhaltung",
    sec5_3_p: "Stellen die laufenden, nicht vermögensbildenden Eigentümerkosten dar, die dynamisch mit der Inflation wachsen.",
    sec5_4_h3: "5.4 Monatsmiete und Mietsteigerungsrate",
    sec5_4_p: "Die Miete wächst jährlich mit der gewählten Rate und verteuert das Wohnen zur Miete kumulativ.",
    sec6_h2: "6. Funktionsweise des Hypothekenteils",
    sec6_p1: "Die Monatsrate teilt sich in degressive Zinsen und progressive Tilgung auf.",
    sec6_p2: "Im Zeitverlauf sinkt der Zinsanteil, während die Tilgung den Vermögensaufbau beschleunigt.",
    sec7_h2: "7. Eigentumskosten jenseits der Kreditrate",
    sec7_p1: "Eigentum beinhaltet verfallene Kosten: Grundsteuer, Gebäudeinstandhaltung und Maklerkosten beim späteren Verkauf (5 %–6 %).",
    sec7_p2: "Diese machen kurze Haltedauern unrentabel: Es braucht mehrere Jahre Tilgung und Wertsteigerung zur Kompensation.",
    sec8_h2: "8. Warum die Haltedauer entscheidend ist",
    sec8_p1: "Transaktionskosten fallen punktuell an, während Tilgung und Wertsteigerung kontinuierlich wirken.",
    sec8_p2: "Im Basisszenario liegt der Breakeven bei 4,8 Jahren. Bei Haltedauern unter 3 Jahren ist Mieten meist wirtschaftlicher.",
    sec9_h2: "9. Der Breakeven-Punkt (Amortisationszeit)",
    sec9_p1: "Der Zeitpunkt, an dem die kumulierten Nettokosten des Kaufs günstiger werden als die der Miete.",
    sec9_p2: "Nach 30 Jahren betragen die Nettokosten 726.761 $ beim Kauf gegenüber 1.721.379 $ bei der Miete im Referenzmodell.",
    sec10_h2: "10. Immobilien-Wertsteigerung",
    sec10_p1: "Die jährliche Wertsteigerung erhöht das Sachwertvermögen des Eigentümers.",
    sec10_p2: "Bei 3 % p.a. steigt der Wert einer 500.000 $-Immobilie nach 30 Jahren auf über 1.200.000 $.",
    sec11_h2: "11. Mietpreisinflation",
    sec11_p1: "Eine Miete von 3.000 $ steigt bei 3 % jährlicher Erhöhung nach 30 Jahren auf 7.280 $/Monat an.",
    sec11_p2: "Dies verdeutlicht den Vorteil einer festen Darlehensrate gegenüber steigenden Mietkosten.",
    sec12_h2: "12. Opportunitätskosten des Eigenkapitals",
    sec12_p1: "Das in die Anzahlung gesteckte Geld hätte am Kapitalmarkt Erträge erwirtschaften können.",
    sec12_p2: "Bei 5 % Jahresrendite wachsen 100.000 $ Eigenkapital über 30 Jahre auf über 432.000 $ an.",
    sec13_h2: "13. Kaufpreis-Miete-Verhältnis (Price-to-Rent)",
    sec13_p1: "Kaufpreis geteilt durch die Jahresmiete (500.000 $ / 36.000 $ = 13,9).",
    sec13_p2: "Werte unter 15 deuten auf einen kauffreundlichen Markt hin.",
    sec14_h2: "14. Die 5%-Regel für verfallene Kosten",
    sec14_p1: "Addiert Zinsen, Grundsteuer und Instandhaltung.",
    sec14_p2: "Bei 500.000 $ betragen die verfallenen Kosten 4.013 $/Monat gegenüber der Miete.",
    sec15_h2: "15. Steuerliche Aspekte und Zinsabzug",
    sec15_p1: "Schuldzinsen und lokale Abgaben können steuermindernd geltend gemacht werden.",
    sec15_p2: "Das Modell errechnet im ersten Jahr eine beispielhafte Steuerersparnis von ca. 1.007 $.",
    sec16_h2: "16. Nettovermögen: Immobilienwert vs Wertpapierdepot",
    sec16_p1: "Der finale Vergleich misst das kumulierte Gesamtvermögen.",
    sec16_p2: "Nach 10 Jahren steht ein Immobilien-Nettovermögen von 359.958 $ einem Mieterdepot von 162.889 $ gegenüber.",
    sec16_p3: "Nach 30 Jahren stellt die schuldenfreie Immobilie einen wesentlichen Vermögenswert dar.",
    sec17_h2: "17. Warum Kaufen in einem Fall gewinnt und Mieten in einem anderen",
    sec17_p1: "Lange Wohndauer, solide Wertsteigerung und steigende Mieten begünstigen das Kaufen.",
    sec17_p2: "Kurze Aufenthalte und starke Wertpapierrenditen sprechen für das Mieten.",
    sec18_h2: "18. Kurzfristige vs langfristige Wohnentscheidungen",
    sec18_p1: "Mieten bietet maximale Flexibilität bei unklarer Lebensplanung.",
    sec18_p2: "Kaufen stabilisiert die Wohnkosten und baut langfristig Altersvorsorge auf.",
    sec19_h2: "19. Typische Fehler vermeiden",
    sec19_mistakes: [
      "Nur Monatsmiete mit der Darlehensrate vergleichen.",
      "Die gesamte Kreditrate als verlorenes Geld betrachten.",
      "Grundsteuer, Gebäudeversicherung und Instandhaltungsrücklagen übersehen.",
      "Kaufnebenkosten und spätere Verkaufskosten ignorieren.",
      "Wertsteigerungen als garantiert ansehen.",
      "Wertpapierrenditen ohne Kursschwankungen kalkulieren.",
      "Nur das Kaufpreis-Miete-Verhältnis als Entscheidungskriterium nutzen.",
      "Die langfristige Mietpreisinflation unterschätzen.",
      "Keine Sensitivitätsprüfung für unterschiedliche Haltedauern vornehmen."
    ],
    sec20_h2: "20. Szenario-Analyse als beste Entscheidungshilfe",
    sec20_p1: "Erstellen Sie ein Basisszenario sowie konservative Varianten für Miete und Kauf.",
    sec20_p2: "Verändern Sie gezielt einzelne Annahmen, um die Robustheit Ihrer Entscheidung zu prüfen.",
    sec21_h2: "21. Methodik und Kernformeln",
    sec21_1_h3: "21.1 Monatliche Darlehensrate",
    sec21_1_f: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    sec21_2_h3: "21.2 Zukünftiger Immobilienwert",
    sec21_2_p: "Wert(t) = Wert(0) × (1 + r_wertsteigerung)^t",
    sec21_3_h3: "21.3 Zukünftige Miete",
    sec21_3_p: "Miete(t) = Miete(0) × (1 + r_mietsteigerung)^t",
    sec21_4_h3: "21.4 Kaufpreis-Miete-Verhältnis",
    sec21_4_p: "Verhältnis = Kaufpreis / Jahreskaltmiete (Basis: 13.9)",
    sec21_5_h3: "21.5 Opportunitätskosten",
    sec21_5_p: "Depot(t) = Eigenkapital × (1 + r_rendite)^t",
    sec21_6_h3: "21.6 Steuerlicher Vorteil",
    sec21_6_p: "Ersparnis = max(0, Abzugsfähige Kosten - Pauschale) × Grenzsteuersatz",
    overlayInputs: {
      homePrice: "Kaufpreis der Immobilie",
      downPaymentPercent: "Eigenkapitalquote (%)",
      interestRate: "Hypothekenzinssatz (%)",
      loanTermYears: "Kreditlaufzeit (Jahre)",
      propertyTaxRate: "Grundsteuersatz (%)",
      homeInsuranceAnnual: "Wohngebäudeversicherung p.a. ($)",
      monthlyRent: "Aktuelle Monatskaltmiete ($)",
      rentGrowthRate: "Jährliche Mietsteigerung (%)",
      homeAppreciationRate: "Jährliche Wertsteigerung der Immobilie (%)",
      investmentReturnRate: "Rendite alternativer Geldanlagen (%)",
      maintenanceRate: "Jährliche Instandhaltungsquote (%)"
    },
    overlayOutputs: {
      breakevenYears: "Breakeven-Horizont (Jahre)",
      netCostBuying30Yr: "Kumulierte Nettokosten Kaufen (30 Jahre)",
      netCostRenting30Yr: "Kumulierte Nettokosten Mieten (30 Jahre)",
      netWorthBuying10Yr: "Nettovermögen Käufer (10 Jahre)",
      netWorthRenting10Yr: "Nettovermögen Mieter (10 Jahre)",
      priceToRentRatio: "Kaufpreis-Miete-Verhältnis",
      monthlyUnrecoverableCost: "Monatliche verfallene Kosten"
    }
  },
  hi: {
    title: "किराया बनाम खरीद कैलकुलेटर (Rent vs Buy Calculator)",
    metaDesc: "किराये पर रहने और घर खरीदने की तुलना करें: मॉर्गेज लागत, किराया वृद्धि, संपत्ति मूल्य वृद्धि, कर लाभ और ब्रेक-इवेन अवधि।",
    keywords: ["किराया बनाम खरीद", "rent vs buy calculator", "घर खरीदें या किराये पर रहें", "मकान खरीदना बनाम किराया"],
    faqs: [
      { question: "क्या घर खरीदना बेहतर है या किराये पर रहना?", answer: "यह आपके ठहरने की अवधि, खरीद मूल्य, किराया स्तर और वैकल्पिक निवेश रिटर्न पर निर्भर करता है।" },
      { question: "ब्रेक-इवेन अवधि क्या है?", answer: "वह समय जिसके बाद घर खरीदना किराये पर रहने की तुलना में अधिक लाभदायक हो जाता है।" },
      { question: "5% का नियम क्या है?", answer: "यह ब्याज, संपत्ति कर और वार्षिक रखरखाव को जोड़कर गैर-वसूली योग्य लागतों की गणना करता है।" },
      { question: "घर के मूल्य में वृद्धि का क्या प्रभाव पड़ता है?", answer: "यह लंबी अवधि में मालिक की कुल संपत्ति को बढ़ाता है।" },
      { question: "किराया बढ़ने का क्या असर होता है?", answer: "बढ़ता किराया किरायेदार की लागत को बढ़ाता है, जिससे निश्चित दर वाला ऋण अधिक आकर्षक बनता है।" },
      { question: "डाउन पेमेंट की अवसर लागत क्या है?", answer: "डाउन पेमेंट की राशि को शेयर बाजार में लगाकर कमाया जा सकने वाला संभावित लाभ।" },
      { question: "घर खरीदने की छिपी लागतें क्या हैं?", answer: "क्लोजिंग लागत (2%–5%), संपत्ति कर, बीमा, वार्षिक रखरखाव (1%) और भविष्य की बिक्री लागत।" },
      { question: "मूल्य-से-किराया अनुपात क्या है?", answer: "घर का मूल्य / वार्षिक किराया; 15 से कम अनुपात खरीदने के पक्ष में होता है।" },
      { question: "कर लाभ कैसे मदद करते हैं?", answer: "ब्याज कटौती से कर देनदारी कम होती है।" },
      { question: "ठहरने की अवधि क्यों महत्वपूर्ण है?", answer: "शुरुआती क्लोजिंग लागतों की भरपाई के लिए कई वर्षों का समय आवश्यक होता है।" },
      { question: "30 वर्षों बाद संपत्ति का क्या होता है?", answer: "खरीदार के पास ऋणमुक्त मकान होता है जबकि किरायेदार के पास निवेश पोर्टफोलियो होता है।" },
      { question: "संवेदनशीलता विश्लेषण कैसे करें?", answer: "किराया वृद्धि और बाजार रिटर्न के विभिन्न परिदृश्यों का परीक्षण करें।" }
    ],
    pIntro: "किराये पर रहने और घर खरीदने का विस्तृत विश्लेषण: ऋण किस्तें, किराया वृद्धि, संपत्ति मूल्य वृद्धि, कर, रखरखाव और कुल संपत्ति निर्माण की तुलना।",
    sec2_h2: "2. किराया बनाम खरीद कैलकुलेटर क्या करता है?",
    sec2_p1: "किराया बनाम खरीद का निर्णय केवल मासिक किराये और मॉर्गेज किस्त की तुलना नहीं है। इसमें डाउन पेमेंट, ब्याज, मूलधन, कर, बीमा, रखरखाव, क्लोजिंग लागत, किराया वृद्धि और अवसर लागत का पूरा हिसाब लगाया जाता है।",
    sec2_p2: "यह एक वित्तीय नियोजन टूल है। मानक परिदृश्य में लगभग 4.8 वर्षों में ब्रेक-इवेन बिंदु प्राप्त होता है।",
    sec3_h2: "3. कुल अर्थशास्त्र की तुलना करें, केवल मासिक भुगतान की नहीं",
    sec3_p1: "मॉर्गेज किस्त में ब्याज (लागत) और मूलधन (बचत/इक्विटी) दोनों शामिल होते हैं। किरायेदार रखरखाव नहीं देता लेकिन बढ़ता किराया चुकाता है।",
    sec3_p2: "हमारा मॉडल 30 वर्षों के दौरान दोनों विकल्पों के कुल खर्च और शुद्ध संपत्ति की तुलना करता है।",
    sec4_h2: "4. कैलकुलेटर का उपयोग कैसे करें",
    sec4_steps: [
      "1. घर का खरीद मूल्य और डाउन पेमेंट प्रतिशत दर्ज करें।",
      "2. मॉर्गेज ब्याज दर और ऋण अवधि दर्ज करें।",
      "3. संपत्ति कर, बीमा, रखरखाव और सोसाइटी शुल्क जोड़ें।",
      "4. खरीद और बिक्री की क्लोजिंग लागत दर्ज करें।",
      "5. वर्तमान मासिक किराया और वार्षिक किराया वृद्धि दर दर्ज करें।",
      "6. किरायेदार बीमा और अन्य खर्चे जोड़ें।",
      "7. वैकल्पिक निवेश पर मिलने वाली अनुमानित रिटर्न दर दर्ज करें।",
      "8. दोनों विकल्पों के लागत विवरण की समीक्षा करें।",
      "9. ब्रेक-इवेन अवधि और ठहराव तालिका का निरीक्षण करें।",
      "10. मूल्य-से-किराया अनुपात और 5% नियम का मूल्यांकन करें।",
      "11. 10, 20 और 30 वर्षों के शुद्ध संपत्ति ग्राफ की तुलना करें।",
      "12. विभिन्न परिदृश्यों को सहेजें।"
    ],
    sec5_h2: "5. इनपुट विवरण",
    sec5_1_h3: "5.1 घर का मूल्य और डाउन पेमेंट",
    sec5_1_p: "यह ऋण राशि तय करता है। 500,000 $ के घर पर 20% डाउन पेमेंट के साथ 100,000 $ नकद और 400,000 $ का ऋण बनता है।",
    sec5_2_h3: "5.2 ब्याज दर और अवधि",
    sec5_2_p: "यह परिशोधन तालिका निर्धारित करता है। उच्च ब्याज दर वित्तपोषण लागत को बढ़ाती है।",
    sec5_3_h3: "5.3 संपत्ति कर, बीमा और रखरखाव",
    sec5_3_p: "मालिक के गैर-वसूली योग्य आवर्ती खर्चे जो मुद्रास्फीति के साथ बढ़ते हैं।",
    sec5_4_h3: "5.4 प्रारंभिक किराया और किराया वृद्धि",
    sec5_4_p: "किराया हर साल बढ़ता है जिससे किरायेदार का खर्च समय के साथ काफी बढ़ जाता है।",
    sec6_h2: "6. मॉर्गेज पक्ष का कार्य सिद्धांत",
    sec6_p1: "शुरुआती वर्षों में ब्याज अधिक और मूलधन कम होता है, बाद में मूलधन तेजी से बढ़ता है।",
    sec6_p2: "समय बीतने के साथ इक्विटी निर्माण की गति तेज हो जाती है।",
    sec7_h2: "7. किस्त से इतर स्वामित्व लागतें",
    sec7_p1: "संपत्ति कर, बीमा, मरम्मत और बिक्री पर लगने वाले दलाली शुल्क (5%–6%)।",
    sec7_p2: "कम समय के लिए घर खरीदना नुकसानदेह हो सकता है क्योंकि इन शुल्कों की भरपाई में समय लगता है।",
    sec8_h2: "8. ठहराव अवधि का महत्व",
    sec8_p1: "लेन-देन लागतें एकमुश्त होती हैं, जबकि संपत्ति वृद्धि धीरे-धीरे होती है।",
    sec8_p2: "मानक मॉडल में 4.8 साल का ब्रेक-इवेन है। 3 साल से कम में किराया देना बेहतर रहता है।",
    sec9_h2: "9. ब्रेक-इवेन बिंदु का विश्लेषण",
    sec9_p1: "वह समय जब खरीदने की शुद्ध लागत किराये से कम हो जाती है।",
    sec9_p2: "30 साल में खरीदने की शुद्ध लागत 726,761 $ और किराये की 1,721,379 $ बनती है।",
    sec10_h2: "10. मकान के मूल्य में वृद्धि",
    sec10_p1: "वार्षिक चक्रवृद्धि वृद्धि से घर का मूल्य बढ़ता है।",
    sec10_p2: "3% वार्षिक वृद्धि पर 500,000 $ का घर 30 साल में 1,200,000 $ से अधिक का हो जाता है।",
    sec11_h2: "11. किराया मुद्रास्फीति",
    sec11_p1: "3,000 $ का किराया 3% वृद्धि पर 30 साल बाद 7,280 $ प्रति माह हो जाएगा।",
    sec11_p2: "यह स्थिर मॉर्गेज किस्त के लाभ को स्पष्ट करता है।",
    sec12_h2: "12. डाउन पेमेंट की अवसर लागत",
    sec12_p1: "100,000 $ को यदि 5% रिटर्न पर शेयर बाजार में लगाया जाए तो 30 साल में 432,000 $ बनते हैं।",
    sec12_p2: "यह किरायेदार का मुख्य वित्तीय आधार बनता है।",
    sec13_h2: "13. मूल्य-से-किराया अनुपात",
    sec13_p1: "घर का मूल्य / वार्षिक किराया (500,000 $ / 36,000 $ = 13.9)।",
    sec13_p2: "15 से कम मान घर खरीदने के अनुकूल वातावरण को दर्शाता है।",
    sec14_h2: "14. 5% का नियम",
    sec14_p1: "ब्याज, कर और रखरखाव की गैर-वसूली योग्य लागत 4,013 $/माह बनती है।",
    sec14_p2: "इसकी तुलना वर्तमान किराये से की जाती है।",
    sec15_h2: "15. कर लाभ",
    sec15_p1: "ब्याज कटौती से पहले वर्ष लगभग 1,007 $ की कर बचत होती है।",
    sec15_p2: "यह शुद्ध लागत को कम करने में मदद करता है।",
    sec16_h2: "16. शुद्ध संपत्ति तुलना",
    sec16_p1: "10 वर्षों में खरीदार की शुद्ध संपत्ति 359,958 $ और किरायेदार की 162,889 $ होती है।",
    sec16_p2: "30 साल में ऋणमुक्त मकान खरीदार को बड़ी वित्तीय सुरक्षा देता है।",
    sec16_p3: "दोनों विकल्पों की संपत्ति का स्पष्ट अंतर सामने आता है।",
    sec17_h2: "17. निर्णय के प्रमुख कारक",
    sec17_p1: "लंबी अवधि और किराया वृद्धि खरीदने के पक्ष में जाती है।",
    sec17_p2: "अल्पकालिक निवास और उच्च निवेश रिटर्न किराये के पक्ष में जाते हैं।",
    sec18_h2: "18. अल्पकालिक बनाम दीर्घकालिक निर्णय",
    sec18_p1: "किराया अल्पकालिक गतिशीलता और लचीलापन देता है।",
    sec18_p2: "खरीद दीर्घकालिक स्थिरता और संपत्ति निर्माण देती है।",
    sec19_h2: "19. सामान्य गलतियों से बचें",
    sec19_mistakes: [
      "केवल मासिक किराये की तुलना किस्त से करना।",
      "पूरी किस्त को व्यर्थ खर्च मान लेना।",
      "कर, बीमा और रखरखाव की अनदेखी करना।",
      "खरीद-बिक्री के क्लोजिंग शुल्कों को भूल जाना।",
      "मकान के मूल्य में वृद्धि को गारंटी मान लेना।",
      "शेयर बाजार के रिटर्न को जोखिम-मुक्त समझना।",
      "केवल मूल्य-किराया अनुपात पर निर्णय लेना।",
      "दीर्घकालिक किराया मुद्रास्फीति को नजरअंदाज करना।",
      "विभिन्न समय अवधियों का परीक्षण न करना।"
    ],
    sec20_h2: "20. परिदृश्य विश्लेषण की सर्वोत्तम विधि",
    sec20_p1: "मानक, सतर्क और आशावादी परिदृश्यों की तुलना करें।",
    sec20_p2: "एक समय में एक चर बदलकर निर्णय की मजबूती परखें।",
    sec21_h2: "21. कार्यप्रणाली एवं मुख्य सूत्र",
    sec21_1_h3: "21.1 मासिक मॉर्गेज किस्त",
    sec21_1_f: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    sec21_2_h3: "21.2 मकान का भविष्य मूल्य",
    sec21_2_p: "Value(t) = Value(0) × (1 + r_growth)^t",
    sec21_3_h3: "21.3 भविष्य का किराया",
    sec21_3_p: "Rent(t) = Rent(0) × (1 + r_rent_growth)^t",
    sec21_4_h3: "21.4 मूल्य-से-किराया अनुपात",
    sec21_4_p: "अनुपात = खरीद मूल्य / कुल वार्षिक किराया (आधार: 13.9)",
    sec21_5_h3: "21.5 अवसर लागत",
    sec21_5_p: "Portfolio(t) = Down Payment × (1 + r_return)^t",
    sec21_6_h3: "21.6 कर लाभ",
    sec21_6_p: "Tax Benefit = max(0, Deductions - Standard) × Tax Rate",
    overlayInputs: {
      homePrice: "घर का खरीद मूल्य",
      downPaymentPercent: "डाउन पेमेंट प्रतिशत (%)",
      interestRate: "मॉर्गेज ब्याज दर (%)",
      loanTermYears: "ऋण अवधि (वर्ष)",
      propertyTaxRate: "संपत्ति कर दर (%)",
      homeInsuranceAnnual: "वार्षिक गृह बीमा ($)",
      monthlyRent: "वर्तमान मासिक किराया ($)",
      rentGrowthRate: "वार्षिक किराया वृद्धि दर (%)",
      homeAppreciationRate: "वार्षिक संपत्ति मूल्य वृद्धि (%)",
      investmentReturnRate: "वैकल्पिक निवेश रिटर्न (%)",
      maintenanceRate: "वार्षिक रखरखाव दर (%)"
    },
    overlayOutputs: {
      breakevenYears: "ब्रेक-इवेन अवधि (वर्ष)",
      netCostBuying30Yr: "खरीदने की 30 वर्षीय शुद्ध लागत",
      netCostRenting30Yr: "किराये की 30 वर्षीय शुद्ध लागत",
      netWorthBuying10Yr: "10 वर्ष में खरीदार की शुद्ध संपत्ति",
      netWorthRenting10Yr: "10 वर्ष में किरायेदार की शुद्ध संपत्ति",
      priceToRentRatio: "मूल्य-से-किराया अनुपात",
      monthlyUnrecoverableCost: "मासिक गैर-वसूली योग्य लागत"
    }
  },
  pt: {
    title: "Calculadora Alugar ou Comprar Imóvel (Rent vs Buy)",
    metaDesc: "Compare alugar e comprar imóvel: parcelas de financiamento, valorização, reajuste de aluguel, custo de oportunidade e ponto de equilíbrio.",
    keywords: ["calculadora alugar ou comprar", "rent vs buy calculadora", "vale a pena alugar ou comprar", "comparativo aluguel financiamento"],
    faqs: [
      { question: "É melhor alugar ou comprar um imóvel?", answer: "Depende do tempo de permanência pretendido, do preço do imóvel, do nível dos aluguéis e do retorno dos seus investimentos." },
      { question: "O que é o ponto de equilíbrio (breakeven)?", answer: "O número de anos necessários para que a compra se torne financeiramente mais vantajosa do que o aluguel equivalente." },
      { question: "O que é a regra dos 5%?", answer: "Soma os custos irrecuperáveis do imóvel próprio: juros do financiamento, impostos (IPTU) e manutenção anual." },
      { question: "Como a valorização do imóvel afeta o resultado?", answer: "Aumenta o patrimônio líquido do proprietário ao longo do tempo, embora varie conforme os ciclos imobiliários." },
      { question: "Qual o impacto do aumento dos aluguéis?", answer: "Aluguéis crescentes elevam os gastos acumulados do inquilino, tornando a parcela fixa de compra mais atrativa." },
      { question: "O que é o custo de oportunidade da entrada?", answer: "O rendimento financeiro que você deixa de ganhar ao imobilizar o dinheiro na entrada em vez de mantê-lo investido." },
      { question: "Quais são os custos ocultos da compra?", answer: "Custos de registro/ITBI (2% a 5%), condomínio, IPTU, manutenção (1% ao ano) e comissão de corretagem na revenda." },
      { question: "O que é o índice preço/aluguel (Price-to-Rent)?", answer: "Preço do imóvel dividido pelo aluguel anual; valores abaixo de 15 favorecem a compra e acima de 20 o aluguel." },
      { question: "Como os benefícios fiscais são calculados?", answer: "Deduções legais reduzem o custo efetivo tributário dos proprietários qualificados." },
      { question: "Por que o tempo de moradia é determinante?", answer: "Porque os custos iniciais de aquisição exigem alguns anos de amortização e valorização para serem compensados." },
      { question: "Como fica o patrimônio líquido após 30 anos?", answer: "O comprador possui um imóvel quitado, enquanto o inquilino acumula uma carteira de investimentos." },
      { question: "Como conduzir uma análise de sensibilidade?", answer: "Simule cenários alternando a valorização imobiliária, o reajuste de aluguéis e a rentabilidade financeira." }
    ],
    pIntro: "Compare alugar e comprar imóvel com análise abrangente de parcelas de financiamento, inflação de aluguéis, valorização do imóvel, impostos, manutenção e custo de oportunidade.",
    sec2_h2: "2. O Que Faz Realmente uma Calculadora de Alugar vs Comprar?",
    sec2_p1: "A escolha entre morar de aluguel ou comprar imóvel não se limita a comparar a mensalidade do aluguel com a prestação do financiamento. Um modelo consistente inclui entrada, juros, amortização de principal, IPTU, seguro residencial, manutenção, condomínio, custos de escritura, ITBI, valorização do imóvel, reajuste do aluguel e custo de oportunidade dos recursos.",
    sec2_p2: "Esta ferramenta é um modelo matemático de apoio à decisão. No cenário padrão validado, o ponto de equilíbrio ocorre em aproximadamente 4,8 anos a favor da aquisição.",
    sec3_h2: "3. Compare a Economia Global, Não Apenas a Parcela Mensal",
    sec3_p1: "A prestação habitacional compõe-se de custo financeiro (juros) e formação de patrimônio (amortização). O inquilino não arca com despesas estruturais, mas enfrenta reajustes anuais de aluguel e pode aplicar seu capital no mercado financeiro.",
    sec3_p2: "Por isso, o comparador avalia custos irrecuperáveis, patrimônio líquido acumulado e fluxo de caixa ao longo de até 30 anos.",
    sec4_h2: "4. Como Utilizar a Calculadora",
    sec4_steps: [
      "1. Digite o valor de compra do imóvel e o percentual de entrada.",
      "2. Insira a taxa de juros do financiamento e o prazo em anos.",
      "3. Informe o IPTU, seguro residencial, taxa de manutenção e condomínio.",
      "4. Adicione os custos de escritura/fechamento e custos futuros de venda.",
      "5. Insira o aluguel mensal inicial e a taxa de reajuste anual.",
      "6. Adicione seguro-fiança ou seguro do inquilino.",
      "7. Defina a taxa de retorno esperada para investimentos alternativos.",
      "8. Analise o demonstrativo detalhado de custos de cada opção.",
      "9. Inspecione o ponto de equilíbrio (breakeven) e a tabela de permanência.",
      "10. Avalie o índice preço/aluguel e a regra dos 5%.",
      "11. Compare a evolução do patrimônio líquido em 10, 20 e 30 anos.",
      "12. Salve simulações para confrontar premissas de mercado."
    ],
    sec5_h2: "5. Detalhamento dos Parâmetros de Entrada",
    sec5_1_h3: "5.1 Preço do Imóvel e Entrada",
    sec5_1_p: "Definem o valor financiado. Em um imóvel de 500.000 $ com 20% de entrada, aportam-se 100.000 $ e financiam-se 400.000 $.",
    sec5_2_h3: "5.2 Taxa de Financiamento e Prazo",
    sec5_2_p: "Estabelecem o plano de amortização com parcelas fixas. Juros maiores elevam o custo irrecuperável.",
    sec5_3_h3: "5.3 IPTU, Seguro, Manutenção e Condomínio",
    sec5_3_p: "Custos recorrentes que não geram patrimônio, corrigidos anualmente pela inflação.",
    sec5_4_h3: "5.4 Aluguel Inicial e Reajuste Anual",
    sec5_4_p: "O aluguel cresce todo ano, encarecendo cumulativamente a moradia alugada.",
    sec6_h2: "6. Como Funciona a Amortização Imobiliária",
    sec6_p1: "Cada prestação divide-se em juros decrescentes e amortização crescente do saldo devedor.",
    sec6_p2: "Com o passar dos anos, a maior parte da parcela passa a amortizar o principal.",
    sec7_h2: "7. Custos da Compra Além da Prestação",
    sec7_p1: "Ser proprietário envolve despesas perdidas: IPTU, manutenção periódica e taxas cartorárias/corretagem na revenda (5% a 6%).",
    sec7_p2: "Por isso, permanências curtas são desfavoráveis: são necessários anos de valorização para cobrir esses custos.",
    sec8_h2: "8. A Importância do Tempo de Permanência",
    sec8_p1: "Custos de transação ocorrem no início e no fim, enquanto a amortização e a valorização acumulam-se com o tempo.",
    sec8_p2: "No modelo padrão, o breakeven é de 4,8 anos. Para estadias menores que 3 anos, alugar costuma ser mais vantajoso.",
    sec9_h2: "9. O Ponto de Equilíbrio (Breakeven)",
    sec9_p1: "O momento em que o custo acumulado de comprar torna-se menor que o de alugar.",
    sec9_p2: "Em 30 anos, o custo líquido acumulado é de 726.761 $ na compra contra 1.721.379 $ no aluguel no modelo de referência.",
    sec10_h2: "10. Valorização Imobiliária",
    sec10_p1: "A valorização anual composta expande o patrimônio imobiliário do proprietário.",
    sec10_p2: "A 3% ao ano, um imóvel de 500.000 $ ultrapassa 1.200.000 $ em 30 anos.",
    sec11_h2: "11. Inflação dos Aluguéis",
    sec11_p1: "Um aluguel de 3.000 $ com 3% de reajuste anual atinge 7.280 $/mês após 30 anos.",
    sec11_p2: "Isso evidencia a vantagem da parcela fixa de financiamento a longo prazo.",
    sec12_h2: "12. Custo de Oportunidade da Entrada",
    sec12_p1: "A entrada imobiliza capital que poderia render em aplicações financeiras.",
    sec12_p2: "A 5% ao ano, 100.000 $ aplicados rendem mais de 432.000 $ em 30 anos.",
    sec13_h2: "13. Índice Preço/Aluguel (Price-to-Rent)",
    sec13_p1: "Calculado dividindo o preço pelo aluguel anual (500.000 $ / 36.000 $ = 13,9).",
    sec13_p2: "Resultados abaixo de 15 apontam mercado favorável à compra.",
    sec14_h2: "14. A Regra dos 5% de Custos Irrecuperáveis",
    sec14_p1: "Soma juros líquidos, IPTU e custos de manutenção anual.",
    sec14_p2: "Em 500.000 $, o custo irrecuperável mensal é de 4.013 $ frente ao aluguel.",
    sec15_h2: "15. Aspectos Tributários",
    sec15_p1: "Deduções fiscais legais podem amortecer o custo financeiro.",
    sec15_p2: "O modelo estima uma economia fiscal ilustrativa de cerca de 1.007 $ no primeiro ano.",
    sec16_h2: "16. Patrimônio Líquido: Imóvel vs Carteira de Investimentos",
    sec16_p1: "A comparação final confronta o valor líquido acumulado em cada caminho.",
    sec16_p2: "Em 10 anos, o patrimônio imobiliário é de 359.958 $ contra 162.889 $ na carteira do inquilino.",
    sec16_p3: "Em 30 anos, o imóvel quitado representa um ativo integral de grande solidez.",
    sec17_h2: "17. Por Que Comprar Vence em um Cenário e Alugar em Outro",
    sec17_p1: "Longo prazo, valorização consistente e alta de aluguéis favorecem a compra.",
    sec17_p2: "Mobilidade frequente e rentabilidade financeira elevada favorecem o aluguel.",
    sec18_h2: "18. Decisões de Curto vs Longo Prazo",
    sec18_p1: "Alugar oferece agilidade e liberdade de mudança rápida.",
    sec18_p2: "Comprar estabiliza os custos habitacionais e constrói patrimônio seguro.",
    sec19_h2: "19. Erros Comuns a Evitar",
    sec19_mistakes: [
      "Comparar apenas o valor do aluguel com a prestação da casa.",
      "Considerar a parcela da hipoteca como gasto 100% perdido.",
      "Esquecer despesas de IPTU, condomínio, seguro e manutenção.",
      "Ignorar custos de escritura na compra e corretagem na venda.",
      "Presumir que o imóvel sempre valorizará linearmente.",
      "Acreditar em retornos financeiros sem oscilações de mercado.",
      "Usar apenas o índice preço/aluguel para decidir.",
      "Subestimar o impacto do reajuste acumulado do aluguel em 20 anos.",
      "Não rodar testes de sensibilidade com diferentes prazos de permanência."
    ],
    sec20_h2: "20. Análise de Cenários: A Melhor Estratégia",
    sec20_p1: "Crie um cenário de referência, um cenário prudente de compra e um de aluguel.",
    sec20_p2: "Altere uma premissa de cada vez para testar a consistência da sua decisão.",
    sec21_h2: "21. Metodologia e Fórmulas Principais",
    sec21_1_h3: "21.1 Parcela do Financiamento",
    sec21_1_f: "M = P × [r(1+r)^n] / [(1+r)^n - 1]",
    sec21_2_h3: "21.2 Valorização Futura do Imóvel",
    sec21_2_p: "Valor(t) = Valor(0) × (1 + r_valorizacao)^t",
    sec21_3_h3: "21.3 Reajuste Futuro do Aluguel",
    sec21_3_p: "Aluguel(t) = Aluguel(0) × (1 + r_reajuste)^t",
    sec21_4_h3: "21.4 Índice Preço/Aluguel",
    sec21_4_p: "Índice = Preço de Compra / Aluguel Anual Total (Base: 13.9)",
    sec21_5_h3: "21.5 Custo de Oportunidade",
    sec21_5_p: "Carteira(t) = Entrada Inicial × (1 + r_investimento)^t",
    sec21_6_h3: "21.6 Economia Fiscal Estimada",
    sec21_6_p: "Economia = max(0, Deduções - Padrão) × Alíquota Marginal",
    overlayInputs: {
      homePrice: "Preço de Compra do Imóvel",
      downPaymentPercent: "Percentual de Entrada (%)",
      interestRate: "Taxa de Financiamento (%)",
      loanTermYears: "Prazo do Financiamento (Anos)",
      propertyTaxRate: "Alíquota de IPTU (%)",
      homeInsuranceAnnual: "Seguro Residencial Anual ($)",
      monthlyRent: "Aluguel Mensal Inicial ($)",
      rentGrowthRate: "Taxa de Reajuste Anual do Aluguel (%)",
      homeAppreciationRate: "Taxa de Valorização Anual do Imóvel (%)",
      investmentReturnRate: "Rentabilidade de Investimentos Alternativos (%)",
      maintenanceRate: "Taxa de Manutenção Anual (%)"
    },
    overlayOutputs: {
      breakevenYears: "Ponto de Equilíbrio (Anos)",
      netCostBuying30Yr: "Custo Líquido Cumulativo Compra (30 Anos)",
      netCostRenting30Yr: "Custo Líquido Cumulativo Aluguel (30 Anos)",
      netWorthBuying10Yr: "Patrimônio Líquido Comprador (10 Anos)",
      netWorthRenting10Yr: "Patrimônio Inquilino Investidor (10 Anos)",
      priceToRentRatio: "Índice Preço/Aluguel",
      monthlyUnrecoverableCost: "Custo Mensal Irrecuperável"
    }
  }
};

for (const loc of LOCALES) {
  const d = RVB_DATA[loc];
  const contentCode = `"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = ${JSON.stringify(d.faqs, null, 2)};

export const seo = {
  title: "${d.title} — ${d.sec21_4_p.split(':')[0]}",
  description: "${d.metaDesc}",
  keywords: ${JSON.stringify(d.keywords)}
};

export const ContentComponent = function RentVsBuyContent${loc.toUpperCase()}() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-normal leading-relaxed max-w-4xl mx-auto py-4">
      {/* 1. Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          ${d.title}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
          ${d.pIntro}
        </p>
      </div>

      {/* 2. What Does it Do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec2_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec2_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec2_p2}
        </p>
      </section>

      {/* 3. Total Economics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec3_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec3_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec3_p2}
        </p>
      </section>

      {/* 4. How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec4_h2}
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          ${d.sec4_steps.map(s => `<li>${s.replace(/^\d+\.\s*/, '')}</li>`).join("\n          ")}
        </ol>
      </section>

      {/* 5. Inputs Explained */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec5_h2}
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">${d.sec5_1_h3}</h3>
            <p className="mt-1 leading-relaxed">${d.sec5_1_p}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">${d.sec5_2_h3}</h3>
            <p className="mt-1 leading-relaxed">${d.sec5_2_p}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">${d.sec5_3_h3}</h3>
            <p className="mt-1 leading-relaxed">${d.sec5_3_p}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">${d.sec5_4_h3}</h3>
            <p className="mt-1 leading-relaxed">${d.sec5_4_p}</p>
          </div>
        </div>
      </section>

      {/* 6. How Mortgage Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec6_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec6_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec6_p2}
        </p>
      </section>

      {/* 7. Buying Costs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec7_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec7_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec7_p2}
        </p>
      </section>

      {/* 8. Stay Length */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec8_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec8_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec8_p2}
        </p>
      </section>

      {/* 9. Breakeven Point */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec9_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec9_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec9_p2}
        </p>
      </section>

      {/* 10. Appreciation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec10_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec10_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec10_p2}
        </p>
      </section>

      {/* 11. Rent Growth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec11_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec11_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec11_p2}
        </p>
      </section>

      {/* 12. Opportunity Cost */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec12_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec12_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec12_p2}
        </p>
      </section>

      {/* 13. Price-to-Rent */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec13_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec13_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec13_p2}
        </p>
      </section>

      {/* 14. 5% Rule */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec14_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec14_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec14_p2}
        </p>
      </section>

      {/* 15. Tax Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec15_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec15_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec15_p2}
        </p>
      </section>

      {/* 16. Net Worth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec16_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec16_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec16_p2}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec16_p3}
        </p>
      </section>

      {/* 17. Scenario Drivers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec17_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec17_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec17_p2}
        </p>
      </section>

      {/* 18. Short vs Long */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec18_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec18_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec18_p2}
        </p>
      </section>

      {/* 19. Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec19_h2}
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          ${d.sec19_mistakes.map(m => `<li>${m}</li>`).join("\n          ")}
        </ul>
      </section>

      {/* 20. Scenario Analysis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec20_h2}
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec20_p1}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          ${d.sec20_p2}
        </p>
      </section>

      {/* 21. Methodology */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          ${d.sec21_h2}
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">${d.sec21_1_h3}</h3>
            <p className="mt-0.5 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
              ${d.sec21_1_f}
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">${d.sec21_2_h3}</h3>
            <p className="mt-0.5 leading-relaxed">${d.sec21_2_p}</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">${d.sec21_3_h3}</h3>
            <p className="mt-0.5 leading-relaxed">${d.sec21_3_p}</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">${d.sec21_4_h3}</h3>
            <p className="mt-0.5 leading-relaxed">${d.sec21_4_p}</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">${d.sec21_5_h3}</h3>
            <p className="mt-0.5 leading-relaxed">${d.sec21_5_p}</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">${d.sec21_6_h3}</h3>
            <p className="mt-0.5 leading-relaxed">${d.sec21_6_p}</p>
          </div>
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
  title: "${d.title}",
  description: "${d.metaDesc}",
  inputs: ${JSON.stringify(d.overlayInputs, null, 2)},
  outputs: ${JSON.stringify(d.overlayOutputs, null, 2)}
};

export default ${loc.toUpperCase()}_RENT_VS_BUY_OVERLAY;
`;
  writeFile(`src/i18n/overlays/rent-vs-buy/${loc}.ts`, overlayCode);
}
console.log("✓ Deep Rent vs Buy generation complete.");
