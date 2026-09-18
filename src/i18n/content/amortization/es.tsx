"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const SPANISH_AMORTIZATION_SEO = {
  title: "Calculadora de Amortización — Tabla y Calendario de Pagos de Préstamos",
  description:
    "Calcula pagos mensuales, desglose de capital e intereses, tabla de amortización completa, fecha de liquidación y ahorro con pagos adicionales.",
  category: "Finanzas",
  keywords: [
    "calculadora de amortizacion",
    "tabla de amortizacion",
    "calendario de pagos prestamo",
    "amortizacion hipoteca",
    "calculadora de prestamos con pagos extras",
    "desglose capital e interes",
    "liquidacion anticipada de prestamo",
    "ahorro de intereses",
  ],
};

export const SPANISH_AMORTIZATION_FAQS: CalculatorFAQ[] = [
  {
    question: "¿Qué es una calculadora de amortización?",
    answer:
      "Una calculadora de amortización estima cómo se reduce y liquida el saldo de un préstamo con el tiempo. Muestra la cuota mensual, cuánto se destina a capital e intereses, el saldo pendiente tras cada pago, el interés total y la fecha de liquidación bajo las condiciones ingresadas.",
  },
  {
    question: "¿Cómo se calcula una cuota de amortización?",
    answer:
      "Para un préstamo a tasa fija, la cuota se calcula a partir del capital, la tasa de interés periódica mensual y el número total de pagos mediante la fórmula estándar de anualidades de cuota constante. La calculadora convierte la tasa nominal anual y el plazo en valores mensuales antes de generar la tabla.",
  },
  {
    question: "¿Qué es una tabla o calendario de amortización?",
    answer:
      "Una tabla de amortización es un desglose período a período que detalla la cuota, el interés cobrado, el capital amortizado, el saldo inicial y el saldo final. Permite visualizar la evolución completa de la deuda a lo largo del tiempo en lugar de limitarse a una sola cifra mensual.",
  },
  {
    question: "¿Por qué se paga más interés al principio del préstamo?",
    answer:
      "El interés se calcula sobre el saldo deudor pendiente. Al inicio de un préstamo amortizable, el saldo es máximo, por lo que la proporción de intereses es mayor. A medida que se amortiza capital, el saldo disminuye y la cantidad de intereses devengados en cada período se reduce progresivamente.",
  },
  {
    question: "¿Cuánto interés pagaré durante la vida del préstamo?",
    answer:
      "Ingresa el monto del préstamo, la tasa de interés y el plazo. La calculadora suma los intereses devengados de cada período. Para el ejemplo verificado de $200,000 al 6% a 15 años, el interés total modelado es de $103,788.46.",
  },
  {
    question: "¿Qué sucede si pago $100 adicionales cada mes?",
    answer:
      "El efecto depende del monto, la tasa, el plazo y el saldo pendiente. En el ejemplo validado, un aporte mensual extra de $100 reduce significativamente el plazo de liquidación y los intereses totales. La calculadora muestra el resultado exacto del escenario sin recurrir a suposiciones genéricas.",
  },
  {
    question: "¿Los pagos adicionales a la hipoteca reducen los intereses?",
    answer:
      "Los pagos adicionales aplicados a capital reducen los intereses futuros porque los cálculos posteriores se efectúan sobre un saldo menor. El impacto contractual real depende de los términos del préstamo y las normas de la entidad financiera. En este modelo, los pagos extras reducen directamente el saldo principal.",
  },
  {
    question: "¿Cuál es la diferencia entre un pago extra mensual y un pago único extraordinario?",
    answer:
      "Un pago extra mensual genera una reducción de capital recurrente y periódica, mientras que un pago único realiza una amortización extraordinaria en un momento puntual. Las reducciones de capital tempranas tienen un impacto mayor acumulado porque reducen los intereses durante más períodos futuros.",
  },
  {
    question: "¿Un plazo de préstamo más largo reduce la cuota mensual?",
    answer:
      "En términos generales sí, manteniendo el capital y la tasa constantes, porque la deuda se distribuye entre más períodos. La contrapartida es un costo total de intereses significativamente mayor a lo largo de la vida del préstamo. La calculadora permite comparar tanto la cuota como el interés total.",
  },
  {
    question: "¿La calculadora de amortización incluye impuestos y seguros?",
    answer:
      "El cálculo central de amortización se enfoca en capital e intereses (P&I). Una cuota hipotecaria real suele incluir impuestos sobre bienes raíces, seguro de vivienda, seguro hipotecario (PMI) y otros cargos. Esos rubros no forman parte de la amortización matemática a menos que se modelen específicamente.",
  },
  {
    question: "¿Esta calculadora puede modelar una hipoteca de tasa ajustable (ARM)?",
    answer:
      "No. Esta calculadora modela un calendario de amortización a tasa fija estándar utilizando la tasa ingresada como constante. Los préstamos de tasa variable requieren modelar índices de referencia, márgenes, períodos de ajuste, topes y revisiones contractuales de tasa.",
  },
  {
    question: "¿La calculadora de amortización garantiza el monto exacto de cancelación?",
    answer:
      "No. Es una estimación matemática basada en los supuestos ingresados. Los montos reales de cancelación pueden variar debido a fechas de acreditación, comisiones, cuentas de depósito en garantía (escrow), cláusulas contractuales y reglas de prepago. Verifica siempre con tus documentos de préstamo y tu entidad financiera.",
  },
];

export function SpanishAmortizationContent() {
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. CALCULADORAS FINANCIERAS RELACIONADAS */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Calculadoras Financieras Relacionadas
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Hipotecas
          </Link>
          <Link
            href="/calculators/loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Préstamos
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Préstamo Automotriz
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Préstamos Personales
          </Link>
          <Link
            href="/calculators/interest-rate-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Tasa de Interés
          </Link>
          <Link
            href="/calculators/emi-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora EMI
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Refinanciación
          </Link>
        </div>
      </div>

      {/* 2. CONTENIDO EDUCATIVO COMPLETO (17 SECCIONES) */}
      <div className="space-y-8 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Sección 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. ¿Qué es una Calculadora de Amortización?
          </h2>
          <p>
            Una calculadora de amortización muestra cómo se extingue el saldo de un préstamo a medida que se efectúan los pagos programados a lo largo del tiempo. En un préstamo estándar a tasa fija con amortización gradual, cada pago periódico contiene un componente de intereses y un componente de capital. Al comienzo del cronograma, el saldo deudor pendiente es mayor, por lo que la porción correspondiente a intereses es más elevada; a medida que se devuelve capital, el saldo disminuye y la cantidad de intereses devengados en cada período también desciende. La parte restante de la cuota fija puede entonces aplicarse con mayor fuerza a la reducción de capital. Este es el principio rector de la amortización financiera y explica por qué dos préstamos con el mismo saldo inicial pero diferentes tasas o plazos pueden tener costos totales de intereses radicalmente distintos. La Oficina para la Protección Financiera del Consumidor (CFPB) describe esta misma progresión: las cuotas iniciales de una hipoteca contienen predominantemente intereses, mientras que las cuotas finales destinan casi la totalidad al capital conforme el saldo decrece.
          </p>
          <p>
            Esta herramienta resulta indispensable porque hace transparente todo el cronograma en lugar de ocultar la mecánica detrás de una sola cifra global. El prestatario puede inspeccionar el monto exacto del pago, saldo inicial, reducción de capital, cargo por intereses, saldo final y totales acumulados en cada período individual. La vista anual consolida esos datos mensuales en una perspectiva año a año de fácil lectura. Esto convierte a la calculadora en un recurso clave para comprender el costo real del crédito, comparar plazos, auditar la tabla provista por una entidad bancaria, modelar aportes extraordinarios junto con nuestra{" "}
            <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora de Hipotecas
            </Link>
            , y proyectar con qué velocidad puede liquidarse la deuda. Debe considerarse un modelo de planificación matemática: los contratos de crédito reales pueden incorporar comisiones, depósitos en garantía (escrow), seguros, normas de administración o cláusulas de prepago que exceden el marco de este modelo estándar de capital e intereses.
          </p>
        </section>

        {/* Sección 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Cómo se Calculan los Pagos Mensuales de Amortización
          </h2>
          <p>
            En el modelo a tasa fija implementado, la cuota mensual de capital e intereses sigue la fórmula clásica de anualidades de cuota constante (fórmula del sistema francés o estándar internacional). Si <em>P</em> es el capital inicial financiado, <em>r</em> es la tasa de interés mensual (tasa anual dividida por 12) y <em>n</em> es el número total de pagos mensuales, la cuota constante se calcula según:
          </p>
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center">
            PMT = P &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ &minus; 1 ]
          </div>
          <p>
            Para una tasa de interés nominal anual del 6%, la tasa mensual periódica utilizada en el modelo es 0.06 / 12 = 0.005. La cuota se calcula a partir del plazo total en meses. El motor de cálculo conserva la máxima precisión de punto flotante en las operaciones intermedias y redondea los valores monetarios exclusivamente para la presentación final en pantalla. Esta distinción es fundamental, ya que redondear prematuramente cada saldo mensual o cargo de intereses acumula discrepancias notorias a lo largo de un cronograma de 180 o 360 meses.
          </p>
          <p>
            En nuestro escenario de referencia verificado, un préstamo de $200,000 al 6% anual a un plazo de 15 años (180 meses) arroja una cuota teórica de $1,687.71365, representada en pantalla como $1,687.71. A lo largo de los 180 pagos programados, el modelo registra exactamente $200,000.00 en amortización de capital y $103,788.46 en intereses acumulados, totalizando $303,788.46 en desembolsos de capital e intereses.
          </p>
        </section>

        {/* Sección 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Capital vs. Interés: Por Qué Cambia la Distribución con el Tiempo
          </h2>
          <p>
            Al comienzo de la vida de un préstamo amortizable, los intereses se liquidan sobre el saldo total adeudado. En consecuencia, el componente de intereses dentro de la cuota mensual es elevado y la amortización neta de capital es reducida. Cada vez que una cuota reduce el saldo principal, el siguiente cálculo mensual de intereses se aplica sobre una base menor. Aunque la cuota total permanezca idéntica bajo un esquema de tasa fija, la distribución interna se desplaza gradualmente de los intereses hacia la amortización del capital.
          </p>
          <p>
            La proporción exacta entre capital e intereses no es fija: depende del capital original, la tasa de interés pactada, el plazo, la fecha de inicio y el saldo remanente. Para el caso validado de $200,000 al 6% a 15 años, el interés del primer mes es de $1,000.00 y el capital amortizado es de $687.71; en el mes 12, el interés desciende a $961.19 mientras que el capital asciende a $726.52. En el resumen anual se observa la misma trayectoria: en el año 1 se pagan $8,483.33 de capital y $11,769.23 de intereses, mientras que en el año 12 el capital anual amortizado alcanza $16,386.52 y el interés anual cae a $3,866.04.
          </p>
        </section>

        {/* Sección 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. Qué Contiene una Tabla o Calendario de Amortización
          </h2>
          <p>
            Un calendario de amortización mensual registra la trayectoria completa desde el saldo inicial hasta la cancelación total ($0.00). Cada fila completa incluye el número o fecha de pago, saldo inicial, cuota periódica, porción de capital, porción de interés, aportes extraordinarios de capital, saldo final y totales acumulados. La tabla anual es una agregación rigurosa de las filas mensuales correspondientes y no una aproximación independiente.
          </p>
          <p>
            En el escenario base, el mes 1 inicia con $200,000.00, devenga $1,000.00 de interés, aplica $687.71 a capital y cierra con un saldo de $199,312.29. El mes 2 arranca con este nuevo saldo reducido, generando $996.56 de interés y amortizando $691.15 de capital. Al finalizar el mes 12, el saldo es de $191,516.67. El último período del año 15 finaliza con saldo cero exacto y un capital acumulado de $200,000.00.
          </p>
        </section>

        {/* Sección 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Interés Total y Desembolso Acumulado
          </h2>
          <p>
            El interés total es la suma de todos los cargos por intereses devengados a lo largo de la vida programada del préstamo. El capital total equivale a la suma originalmente financiada, asumiendo un cumplimiento estricto del cronograma sin refinanciaciones ni cargos adicionales incorporados al saldo. La suma de capital total más interés total representa el desembolso acumulado estricto de capital e intereses.
          </p>
          <p>
            En la divulgación de préstamos hipotecarios reales, el término «pago total» puede abarcar conceptos adicionales como impuestos sobre la propiedad retenidos en custodia (escrow), seguro de vivienda y seguro hipotecario privado. La cifra de $1,687.71 calculada en nuestro ejemplo representa el servicio estricto de la deuda (P&amp;I) y sirve como base matemática sobre la cual se adicionan los costos operativos del inmueble.
          </p>
        </section>

        {/* Sección 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Cómo Altera el Plazo la Cuota Mensual y el Interés Total
          </h2>
          <p>
            El plazo de amortización es una de las variables determinantes en el costo financiero. Manteniendo el capital y la tasa constantes, alargar el plazo reduce la cuota mensual exigida porque el capital se distribuye en más mensualidades. Sin embargo, el dinero adeudado devenga intereses durante mucho más tiempo, lo que incrementa sustancialmente el interés total pagado. Acortar el plazo produce el efecto inverso: la cuota mensual aumenta, pero el saldo se cancela con rapidez y el costo financiero total disminuye de forma drástica.
          </p>
          <p>
            Al comparar alternativas crediticias con nuestra{" "}
            <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora de Préstamos
            </Link>
            , es crucial evaluar tanto la exigencia del flujo de caja mensual como el interés acumulado a largo plazo para tomar una decisión financiera equilibrada y adaptada a la capacidad de pago del hogar.
          </p>
        </section>

        {/* Sección 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Qué Ocurre al Realizar Pagos Mensuales Extraordinarios
          </h2>
          <p>
            Un pago mensual extra reduce el saldo principal más rápido de lo previsto en la tabla regular. Al reducirse el capital deudor, los intereses de los meses siguientes se calculan sobre una base inferior, acelerando la extinción de la deuda y recortando el costo total. En este modelo, el aporte adicional se aplica íntegramente a reducir el capital pendiente.
          </p>
          <p>
            En el caso verificado, añadir $100 adicionales cada mes reduce sensiblemente el número de períodos y genera un ahorro considerable de intereses. Puedes explorar simulaciones avanzadas de cancelación anticipada en nuestra{" "}
            <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora de Refinanciación
            </Link>
            . Antes de destinar liquidez a prepagos hipotecarios, conviene sopesar el fondo de emergencia, deudas con tasas más altas y opciones de inversión disponibles.
          </p>
        </section>

        {/* Sección 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Pagos Anuales Extraordinarios y Abonos Únicos de Capital
          </h2>
          <p>
            Un prestatario puede acelerar la amortización mediante abonos extraordinarios recurrentes o únicos. Un pago extra anual representa una inyección periódica de capital en un mes específico de cada año, mientras que un abono único representa una reducción puntual en una fecha determinada.
          </p>
          <p>
            El factor tiempo es clave: un abono de $5,000 realizado en el mes 1 genera mucho más ahorro que el mismo abono efectuado en el año 10, ya que el capital reducido deja de devengar intereses durante un número mayor de períodos futuros. Para el escenario base, un aporte anual de $1,200 a partir del primer año ahorra aproximadamente $10,131.78 en intereses y cancela el préstamo en 164 períodos en lugar de 180.
          </p>
        </section>

        {/* Sección 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Pagos Extras con Inicio Diferido y la Importancia del Momento
          </h2>
          <p>
            La calculadora permite definir el mes y año de inicio de los aportes adicionales, permitiendo modelar estrategias financieras que comienzan en el futuro (por ejemplo, tras liquidar otro compromiso o recibir un aumento de ingresos).
          </p>
          <p>
            El modelo respeta el cronograma estándar durante los períodos previos y activa la amortización acelerada exactamente en la fecha estipulada, permitiendo comparar con total rigor el impacto de posponer o adelantar una estrategia de prepago.
          </p>
        </section>

        {/* Sección 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Préstamos a Tasa Cero (0% APR) y Casos Límite
          </h2>
          <p>
            La fórmula estándar de anualidades divide entre la tasa de interés periódica, por lo que una tasa de 0% crearía una división entre cero (NaN o infinito). El motor matemático detecta explícitamente el caso de tasa cero y calcula la cuota como el capital dividido directamente entre el número de períodos (ej. $120,000 en 120 meses = $1,000.00 mensuales con $0 de interés).
          </p>
          <p>
            Asimismo, el algoritmo maneja con precisión condiciones límite como montos de préstamo fraccionarios, plazos extendidos, tasas elevadas, pagos extras superiores al saldo restante y amortizaciones que liquidan la deuda antes del término regular, garantizando que el saldo final termine en cero exacto sin saldos negativos.
          </p>
        </section>

        {/* Sección 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Amortización Tradicional vs. Solo Interés, Amortización Negativa y Tasa Variable
          </h2>
          <p>
            Esta herramienta modela préstamos amortizables a tasa fija convencional. En esquemas de «solo interés», las mensualidades no amortizan capital durante el período inicial; en esquemas de amortización negativa, las cuotas no cubren los intereses devengados y el saldo adeudado se incrementa.
          </p>
          <p>
            En hipotecas de tasa variable (ARM), la tasa fluctúa de acuerdo con índices financieros de referencia y márgenes pactados. Para analizar préstamos a tasa ajustable se deben emplear simuladores específicos que contemplen revisiones periódicas y topes contractuales.
          </p>
        </section>

        {/* Sección 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. Qué Incluye una Cuota Hipotecaria Real
          </h2>
          <p>
            Una calculadora de amortización aísla el capital y los intereses. Una cuota hipotecaria real suele sumar impuestos prediales o sobre bienes inmuebles, seguro de incendio y riesgos de la propiedad, seguro hipotecario privado (cuando el enganche es inferior al 20%) y cuotas de mantenimiento o comunidad (HOA).
          </p>
          <p>
            Para examinar tasas equivalentes y comparaciones de cuotas mensuales, consulta también nuestra{" "}
            <Link href="/calculators/interest-rate-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora de Tasa de Interés
            </Link>{" "}
            y la{" "}
            <Link href="/calculators/emi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora EMI
            </Link>
            .
          </p>
        </section>

        {/* Sección 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Cómo se Determina la Fecha de Liquidación del Préstamo
          </h2>
          <p>
            La fecha de liquidación o cancelación surge de combinar el mes y año de inicio con el número de pagos necesarios para reducir el saldo a cero. En el caso base que comienza en agosto de 2026 con 180 mensualidades, la deuda se liquida en julio de 2041.
          </p>
          <p>
            Al aplicar pagos extras, el número de períodos disminuye y la fecha proyectada de cancelación se adelanta en el tiempo, reflejando de inmediato el beneficio temporal del prepago.
          </p>
        </section>

        {/* Sección 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Interpretación de los Gráficos y la Tabla Anual
          </h2>
          <p>
            Los gráficos proporcionan una síntesis visual del balance entre capital e interés. En el ejemplo base, el 65.8% del total desembolsado corresponde a la devolución del capital y el 34.2% al interés acumulado.
          </p>
          <p>
            La tabla anual resume las 180 mensualidades en 15 filas claras, permitiendo auditar con rapidez la acumulación anual de capital e intereses sin necesidad de recorrer manualmente cientos de filas mensuales.
          </p>
        </section>

        {/* Sección 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Exportación y Auditoría del Calendario de Amortización
          </h2>
          <p>
            La plataforma permite buscar, ordenar y exportar el calendario completo a formatos CSV, Excel, PDF o impresión directa. La exportación conserva con exactitud los valores matemáticos calculados sin recalcular con fórmulas aproximadas.
          </p>
          <p>
            Para auditar la tabla, verifica que en cada fila la cuota equivalga a capital más interés, que el saldo inicial coincida con el saldo final anterior y que el saldo de la última fila sea exactamente $0.00.
          </p>
        </section>

        {/* Sección 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Cómo Utilizar la Calculadora Antes de Contratar un Préstamo
          </h2>
          <p>
            Utiliza esta calculadora como un instrumento de análisis de escenarios previos a la toma de decisiones financieras. Introduce las condiciones de la oferta de la entidad bancaria, evalúa plazos alternativos y simula la viabilidad de abonos extraordinarios.
          </p>
          <p>
            Si estás evaluando créditos de consumo no hipotecarios, puedes verificar condiciones en nuestra{" "}
            <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora de Préstamos Personales
            </Link>
            .
          </p>
        </section>

        {/* Sección 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Metodología de Cálculo y Descargo de Responsabilidad
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Metodología y Supuestos del Modelo
              </div>
              <p>
                Metodología central: se convierte la tasa nominal anual a mensual (r = APR / 1200), se calcula el plazo en meses (n = años &times; 12 + meses), se determina la cuota fija mediante la fórmula de anualidades y se itera mes a mes calculando el interés sobre el saldo insoluto. Los pagos extraordinarios se aplican al capital según las fechas seleccionadas y el último período se ajusta para cancelar exactamente el saldo remanente.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Aviso Legal y de Privacidad
              </div>
              <p>
                Esta herramienta se proporciona con fines exclusivamente educativos y de planificación financiera personal. No constituye una oferta de crédito, asesoramiento legal, fiscal ni financiero vinculante. Verifica siempre los términos, comisiones y condiciones contractuales con tu entidad bancaria o asesor financiero acreditado.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. SECCIÓN DE PREGUNTAS FRECUENTES (12 PREGUNTAS) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Preguntas Frecuentes
          </h2>
        </div>

        <div className="space-y-3">
          {SPANISH_AMORTIZATION_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      P{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default SpanishAmortizationContent;
