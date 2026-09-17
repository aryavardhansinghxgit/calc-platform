"use client";

import React from "react";
import Link from "next/link";

export function MortgageContentSectionEs() {
  return (
    <div className="space-y-10 py-4 text-slate-900 dark:text-slate-100">
      {/* SECCIÓN 1: Introducción */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Comprensión de su Hipoteca y los Costos Totales de Vivienda
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Una hipoteca residencial representa uno de los compromisos financieros a más largo plazo que una familia puede asumir.
          Aunque los compradores frecuentemente evalúan las propiedades basándose únicamente en el precio de compra del contrato y
          la tasa de interés nominal, el costo real y continuo de la propiedad de una vivienda implica una combinación de servicio
          de la deuda, impuestos municipales sobre la propiedad, seguro contra riesgos, cuotas de asociaciones comunitarias y,
          potencialmente, seguro hipotecario privado.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Esta <strong>Calculadora de Hipoteca</strong> está diseñada para proporcionar un desglose exhaustivo y transparente de
          sus gastos de vivienda. Más allá de los cálculos estándar de capital e intereses, le permite simular gastos reales de cuenta de depósito en garantía (escrow), inflación anual proyectada de costos, calendarios de pago quincenales acelerados y estrategias personalizadas de amortización anticipada de capital para evaluar el ahorro de intereses a lo largo del préstamo.
        </p>
      </section>

      {/* SECCIÓN 2: Cómo Utilizar la Calculadora de Hipoteca */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Cómo Utilizar la Calculadora de Hipoteca
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          La calculadora está organizada en módulos interactivos que actualizan las obligaciones mensuales, los gráficos visuales
          y las tablas de amortización en tiempo real:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Precio de la Vivienda y Pago Inicial</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Ingrese el precio de compra contractual y su pago inicial (en dólares o porcentaje). La herramienta calcula
              automáticamente el capital del préstamo requerido y la relación préstamo-valor (LTV).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Plazo del Préstamo y Tasa de Interés</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Especifique su horizonte de amortización (como 15 o 30 años) y la tasa de interés nominal anual fija aplicada sobre
              el saldo de capital pendiente.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Impuestos, Seguro y PMI</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Introduzca los impuestos anuales sobre la propiedad (como monto fijo o porcentaje), las primas anuales del seguro de vivienda y las tasas aplicables de Seguro Hipotecario Privado (PMI) para préstamos con menos del 20% de pago inicial.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Cuotas de HOA y Reservas de Mantenimiento</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Introduzca las cuotas mensuales de la Asociación de Propietarios (HOA) y las reservas anuales de mantenimiento auxiliar (que la calculadora divide entre 12 para fijar una reserva mensual).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Aumento Anual de Costos (Inflación)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Modele la inflación a largo plazo especificando los aumentos porcentuales anuales proyectados para impuestos municipales, primas de seguros, cuotas de HOA y costos de mantenimiento.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Amortización Extra y Pago Quincenal</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Simule pagos mensuales adicionales voluntarios, aportaciones anuales, hasta 8 pagos extraordinarios únicos o active el programa de pagos quincenales de 26 períodos.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: Qué Calcula la Calculadora de Hipoteca */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Qué Calcula la Calculadora de Hipoteca
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          La calculadora ofrece un resumen multidimensional de sus compromisos financieros mensuales iniciales y sus obligaciones acumuladas a lo largo de 30 años:
        </p>
        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Capital e Intereses (Base P&amp;I):</strong> El servicio de deuda mensual contractual requerido para amortizar el saldo de su préstamo a cero durante el plazo elegido.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Depósito en Garantía para Impuestos:</strong> Exactamente 1/12 de su obligación tributaria anual estimada sobre la propiedad inmobiliaria.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Depósito en Garantía para Seguro:</strong> Exactamente 1/12 de su prima anual de seguro de vivienda contra riesgos.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Seguro Hipotecario Privado (PMI):</strong> La tarifa mensual temporal aplicada cuando el pago inicial es inferior al 20% (LTV &gt; 80%).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>HOA y Reservas Auxiliares:</strong> Cuotas comunitarias no incluidas en custodia más 1/12 de las reservas anuales de mantenimiento.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Desembolso Mensual Total de Vivienda:</strong> El presupuesto mensual total necesario para el primer año (P&amp;I + Impuestos + Seguro + PMI + HOA + Otras Reservas + Capital Extra).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Interés Total y Costo del Préstamo:</strong> Los intereses acumulados a lo largo del período de pago y el desembolso total en efectivo en todas las categorías.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Fecha de Liquidación:</strong> El mes y año exactos del calendario en los que el saldo de su hipoteca llega a cero.</span>
          </li>
        </ul>
      </section>

      {/* SECCIÓN 4: Cómo se Calculan los Pagos Hipotecarios */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Cómo se Calculan los Pagos de la Hipoteca
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Los pagos hipotecarios de tasa fija se calculan mediante la fórmula matemática estándar de anualidades de amortización constante. Cada cuota mensual está estructurada de modo que la suma combinada de intereses periódicos y reducción de capital se mantenga constante durante todo el plazo.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Fórmula Estándar de Hipoteca a Tasa Fija:
          </span>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100 py-1 overflow-x-auto">
            M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
            <div><strong>M:</strong> Cuota Mensual de Capital e Intereses</div>
            <div><strong>P:</strong> Monto Principal del Préstamo (Precio - Pago Inicial)</div>
            <div><strong>r:</strong> Tasa de Interés Mensual (Tasa Anual Nominal / 12 / 100)</div>
            <div><strong>n:</strong> Número Total de Períodos Mensuales (Años del Plazo × 12)</div>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Caso Extremo de Interés Cero:</strong> En el escenario teórico en el que un préstamo tiene una tasa de interés del 0% (r = 0), la fórmula se simplifica a una división lineal de capital: <code>M = P / n</code>. En este caso, el interés total es $0.00 y cada dólar pagado reduce el saldo pendiente de manera directa.
        </p>
      </section>

      {/* SECCIÓN 5: Ejemplo de Cálculo Hipotecario Completo */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Ejemplo Práctico de Cálculo Hipotecario Paso a Paso
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Para ilustrar cómo cada componente individual se integra en su desembolso mensual total de vivienda, examine la aritmética paso a paso del siguiente escenario de referencia:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
            <div><span className="text-slate-500 block">Precio de Vivienda:</span><strong>$400,000.00</strong></div>
            <div><span className="text-slate-500 block">Pago Inicial (20%):</span><strong>$80,000.00</strong></div>
            <div><span className="text-slate-500 block">Capital del Préstamo (P):</span><strong>$320,000.00</strong></div>
            <div><span className="text-slate-500 block">Tasa de Interés:</span><strong>6.706%</strong></div>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
            <p>1. Tasa de Interés Mensual (r) = 0.06706 / 12 = 0.0055883333...</p>
            <p>2. Períodos Totales de Pago (n) = 30 años × 12 = 360 meses</p>
            <p>3. Factor de Capitalización (1 + r)^360 = (1.0055883333)^360 ≈ 7.464627</p>
            <p>4. Pago Mensual P&amp;I = $320,000 × [ 0.0055883333 × 7.464627 ] / [ 7.464627 - 1 ] = <strong>$2,066.16</strong></p>
            <p>5. Impuesto sobre la Propiedad Mensual (1.2% sobre $400k) = $4,800.00 / 12 = <strong>$400.00</strong></p>
            <p>6. Seguro de Vivienda Mensual = $1,500.00 / 12 = <strong>$125.00</strong></p>
            <p>7. PMI Mensual = $0.00 (Exento por contar con 20% de pago inicial)</p>
            <p>8. Cuota Mensual de HOA = <strong>$333.33</strong></p>
            <p>9. Reservas Mensuales de Mantenimiento = $4,000.00 / 12 = <strong>$333.33</strong></p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-sans font-bold text-blue-700 dark:text-blue-400">
              Desembolso Mensual Total = $2,066.16 + $400.00 + $125.00 + $0.00 + $333.33 + $333.33 = $3,257.82 / mes
            </div>
            <div className="text-[11px] font-sans text-slate-600 dark:text-slate-400">
              Costo Total a lo Largo del Plazo (30 Años) = $320,000 (Capital) + $423,818.78 (Intereses) + $144,000 (Impuestos) + $45,000 (Seguro) + $120,000 (HOA) + $120,000 (Mantenimiento) = <strong>$1,172,818.78</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: Mecánica de la Amortización Hipotecaria */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mecánica de la Amortización Hipotecaria
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          La amortización se refiere al proceso de liquidar gradualmente una deuda mediante pagos periódicos programados. En una hipoteca de tasa fija estándar, la composición interna de su cuota cambia continuamente a lo largo del tiempo:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Primeros Años del Préstamo (Años 1–5)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Dado que el interés mensual se calcula sobre el elevado saldo inicial (<code>Interés = Saldo × r</code>), los intereses consumen la mayor parte de sus primeros pagos. En el Mes 1 de nuestro ejemplo, $1,788.27 se destinan a intereses y solo $277.89 reducen el capital.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Años Finales del Préstamo (Años 20–30)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              A medida que los pagos sucesivos reducen el saldo restante, el cargo mensual por intereses disminuye proporcionalmente. Debido a que el pago total de P&amp;I permanece fijo, una porción cada vez mayor se aplica directamente al capital, generando plusvalía y patrimonio neto con rapidez.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Para consultar una tabla independiente que aísle las deducciones fiscales de intereses anuales, visite nuestra{" "}
          <Link href="/calculators/amortization-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculadora de amortización
          </Link>.
        </p>
      </section>

      {/* SECCIÓN 7: Impuestos sobre la Propiedad, Seguro y Cuentas Escrow */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Impuestos sobre la Propiedad, Seguro de Vivienda y Cuentas de Garantía (Escrow)
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          La mayoría de los prestamistas hipotecarios requieren que los prestatarios mantengan una <strong>cuenta de depósito en garantía (escrow)</strong> para garantizar que los impuestos sobre la propiedad y las primas de seguros contra riesgos se paguen puntualmente.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          El administrador de su hipoteca recauda 1/12 de sus obligaciones anuales estimadas de impuestos y seguros cada mes. Bajo la ley federal de Procedimientos de Liquidación de Bienes Raíces (RESPA, 12 U.S.C. § 2609), los administradores pueden mantener un colchón prudencial (normalmente hasta 2 meses de recaudación) y realizan un análisis anual de custodia para ajustar los cobros mensuales según las tasaciones municipales revisadas. En esta calculadora, configurar un porcentaje de escalada anual modela cómo la inflación acumula estos gastos a lo largo de 15 a 30 años.
        </p>
      </section>

      {/* SECCIÓN 8: Seguro Hipotecario Privado (PMI) */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Seguro Hipotecario Privado (PMI) y Umbrales LTV
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Al comprar una vivienda con una hipoteca convencional y aportar menos del 20% del precio de compra como pago inicial, la relación préstamo-valor (LTV) supera el 80%. Los prestamistas exigen un Seguro Hipotecario Privado (PMI) para mitigar el riesgo de incumplimiento crediticio.
        </p>
        <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs space-y-1.5">
          <span className="font-bold text-blue-900 dark:text-blue-200 block">
            Pautas Regulatorias Oficiales (Ley de Protección a Propietarios de 1998 / CFPB 12 U.S.C. § 4901):
          </span>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Cancelación a Solicitud del Prestatario (80% LTV):</strong> Los prestatarios tienen el derecho legal de solicitar la cancelación del PMI por escrito una vez que el saldo del capital alcance el 80% del valor de compra original, sujeto a buen historial de pago y verificación del valor de la propiedad.</li>
            <li><strong>Terminación Automática del Prestamista (78% LTV):</strong> Los prestamistas están obligados por ley a cancelar automáticamente el PMI en la fecha en que el préstamo esté programado para alcanzar el 78% del precio de compra original según la tabla de amortización inicial, siempre que los pagos estén al día.</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <em>Aviso de Modelado de la Calculadora:</em> Esta calculadora utiliza una <strong>hipótesis de planificación del 80% LTV</strong> para modelar cuándo los cargos de PMI se reducen a $0 en la tabla de amortización. La cancelación legal definitiva depende de su contrato de préstamo, las políticas del administrador, la tasación y las regulaciones aplicables. Para ver cómo diferentes montos de pago inicial impactan su relación préstamo-valor, utilice nuestra{" "}
          <Link href="/calculators/down-payment-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculadora de pago inicial
          </Link>.
        </p>
      </section>

      {/* SECCIÓN 9: Cuotas de HOA y Otros Costos de Vivienda */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Cuotas de HOA y Gastos Auxiliares de Vivienda
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Un error frecuente al comprar una vivienda es confundir <strong>PITI</strong> (Capital, Intereses, Impuestos, Seguro) con el <strong>costo mensual total de habitar una propiedad</strong>.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Las cuotas de la Asociación de Propietarios (HOA) y las cuotas de condominios son pagos que no se gestionan en depósito en garantía y que se abonan directamente a la administración comunitaria para financiar el mantenimiento exterior, áreas verdes, servicios compartidos y reservas de capital. Además, los asesores financieros recomiendan presupuestar reservas regulares para el mantenimiento del hogar. En nuestra calculadora, ingresar una reserva anual en <code>Otros Costos ($/año)</code> divide el monto entre 12 y lo suma a su desembolso mensual sin mezclarlo erróneamente con la deuda hipotecaria contractual.
        </p>
      </section>

      {/* SECCIÓN 10: Pagos Hipotecarios Extraordinarios */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Pagos Extraordinarios a Capital y Reducción del Plazo
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Realizar pagos adicionales al capital reduce drásticamente el costo total de los intereses y acorta el plazo de amortización cuando los fondos se aplican directamente a la amortización anticipada de la deuda principal.
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-2.5 font-bold">Estrategia de Amortización (Préstamo $320k @ 6.706%)</th>
                <th className="p-2.5 font-bold">Nuevo Plazo de Pago</th>
                <th className="p-2.5 font-bold">Tiempo Ahorrado</th>
                <th className="p-2.5 font-bold">Ahorro Total en Intereses</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-sans tabular-nums text-slate-600 dark:text-slate-400">
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Base (Sin Pagos Extra)</td>
                <td className="p-2.5">360 Meses (30.0 Años)</td>
                <td className="p-2.5">0 Meses</td>
                <td className="p-2.5">$0.00</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+$200 / Mes Extra a Capital</td>
                <td className="p-2.5">295 Meses (~24.6 Años)</td>
                <td className="p-2.5">65 Meses (5.4 Años)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$90,073.60</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+$2,000 / Año (Bono Anual)</td>
                <td className="p-2.5">289 Meses (~24.1 Años)</td>
                <td className="p-2.5">71 Meses (5.9 Años)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$97,337.83</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Pago Único de $20,000 (Mes 12)</td>
                <td className="p-2.5">304 Meses (~25.3 Años)</td>
                <td className="p-2.5">56 Meses (4.7 Años)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$84,926.92</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Si las tasas de interés del mercado han bajado desde que adquirió su hipoteca, evalúe sus ahorros potenciales y su punto de equilibrio con nuestra{" "}
          <Link href="/calculators/refinance-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculadora de refinanciamiento de hipoteca
          </Link>.
        </p>
      </section>

      {/* SECCIÓN 11: Pagos Hipotecarios Quincenales */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mecánica de los Pagos Hipotecarios Quincenales
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Una hipoteca estándar requiere 12 pagos mensuales al año. En un programa de pago quincenal, usted paga exactamente la mitad de su cuota mensual de capital e intereses (<code>M / 2</code>) cada dos semanas.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Dado que hay 52 semanas en un año calendario, un esquema quincenal produce <strong>26 medios pagos</strong>, lo que equivale a <strong>13 pagos mensuales completos al año</strong> (<code>26 × 0.5 = 13</code>). Según las estimaciones de la calculadora en un préstamo a 30 años, este pago mensual adicional aplicado directamente al capital adelanta la liquidación del préstamo varios años y elimina un volumen sustancial de interés compuesto.
        </p>
      </section>

      {/* SECCIÓN 12: Hipotecas a 15 Años vs. 30 Años */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Hipotecas a 15 Años vs. 30 Años a Tasa Fija
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Elegir entre una hipoteca a tasa fija a 15 años y una a 30 años representa una compensación directa entre la flexibilidad de su flujo de caja mensual y el costo total del préstamo a lo largo del tiempo:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Hipoteca a 30 Años Fija</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Cuotas mensuales obligatorias más bajas y asequibles.</li>
              <li>Mayor flexibilidad en el presupuesto ante imprevistos económicos.</li>
              <li>Mayor interés total pagado durante el horizonte de amortización multidecadal.</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Hipoteca a 15 Años Fija</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Cuotas mensuales más altas (típicamente entre 35% y 50% superiores).</li>
              <li>Ahorro sustancial en intereses totales (a menudo ahorrando más del 50%).</li>
              <li>Acumulación acelerada de patrimonio y capital en la vivienda en los primeros cinco años.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECCIÓN 13: ¿Cuánto Puedo Pagar por una Casa? */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          ¿Cuánto Puedo Pagar por una Casa?
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Calcular la cuota mensual sobre un precio de compra conocido es una estimación directa hacia adelante. No obstante, si está iniciando la búsqueda de vivienda y necesita determinar su presupuesto máximo de compra en función de sus ingresos brutos y obligaciones de deuda actuales, requiere un cálculo inverso de calificación crediticia.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Los prestamistas evalúan su capacidad de endeudamiento utilizando la relación <strong>Deuda-Ingreso (DTI)</strong>: una relación inicial o front-end (costos de vivienda divididos entre el ingreso mensual bruto, típicamente recomendada en torno al 28%) y una relación total o back-end (todos los pagos recurrentes de deuda divididos entre el ingreso mensual bruto, con un límite habitual de entre 36% y 43%). Para evaluar su presupuesto de compra, utilice nuestra{" "}
          <Link href="/calculators/house-affordability-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculadora de asequibilidad de vivienda
          </Link>{" "}
          o verifique sus índices de endeudamiento con nuestra{" "}
          <Link href="/calculators/dti-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculadora de relación deuda-ingreso (DTI)
          </Link>.
        </p>
      </section>

      {/* SECCIÓN 14: Errores Frecuentes al Calcular una Hipoteca */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Errores Frecuentes al Calcular una Hipoteca
        </h3>
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>1. Confundir la Tasa de Interés Nominal con el APR (TAE):</strong> La tasa nominal es el porcentaje que se aplica sobre el saldo de capital no pagado. La Tasa de Porcentaje Anual (APR) incluye la tasa nominal más los gastos de cierre, puntos de descuento y costos del prestamista. Introducir el APR en una fórmula de amortización sobreestimará su pago mensual.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>2. Presupuestar Exclusivamente para Capital e Intereses:</strong> Omitir los impuestos sobre la propiedad, el seguro de vivienda y las cuotas de HOA puede causar un déficit presupuestario del 20% al 40% respecto a los gastos reales de bolsillo.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>3. Asumir que los Préstamos del Gobierno Siguen las Reglas del PMI Convencional:</strong> Los préstamos FHA exigen Primas de Seguro Hipotecario (MIP) iniciales y anuales que con frecuencia persisten durante toda la vida del préstamo. Los prestatarios que evalúan opciones gubernamentales con bajo pago inicial deben usar nuestra{" "}
            <Link href="/calculators/fha-loan-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              calculadora de préstamo FHA
            </Link>, mientras que los veteranos militares elegibles pueden modelar beneficios con 0% de pago inicial en nuestra{" "}
            <Link href="/calculators/va-mortgage-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              calculadora de hipoteca VA
            </Link>.
          </div>
        </div>
      </section>

      {/* SECCIÓN 15: Calculadoras Relacionadas */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Calculadoras Relacionadas de Bienes Raíces y Financiación
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <Link
            href="/calculators/house-affordability-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Asequibilidad de Vivienda
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Calcule su presupuesto según sus ingresos.</span>
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Calculadora de Amortización
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Tablas completas de pagos anuales y mensuales.</span>
          </Link>
          <Link
            href="/calculators/down-payment-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Calculadora de Pago Inicial
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Optimice su capital inicial y elimine el PMI.</span>
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Calculadora de Refinanciación
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Calcule el ahorro y punto de equilibrio.</span>
          </Link>
          <Link
            href="/calculators/rent-vs-buy-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Alquilar vs. Comprar
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Compare el patrimonio a largo plazo.</span>
          </Link>
          <Link
            href="/calculators/dti-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Calculadora de Ratio DTI
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Verifique sus ratios de deuda e ingreso.</span>
          </Link>
          <Link
            href="/calculators/fha-loan-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Calculadora de Préstamo FHA
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Financiación con 3.5% de pago inicial y MIP.</span>
          </Link>
          <Link
            href="/calculators/va-mortgage-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Calculadora de Hipoteca VA
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Financiación militar con 0% de pago inicial.</span>
          </Link>
        </div>
      </section>

      {/* SECCIÓN 16: Preguntas Frecuentes (FAQs) */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Preguntas Frecuentes
        </h3>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              ¿Cómo se calcula el pago mensual de capital e intereses?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Su pago base se calcula mediante la fórmula de amortización de tasa fija: <code>M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]</code>,
              donde P es el monto del préstamo, r es la tasa de interés mensual (tasa nominal anual dividida entre 12) y n es el número total
              de períodos de pago mensuales (ej. 360 meses para una hipoteca a 30 años).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              ¿Cuál es la diferencia entre PITI y el Desembolso Mensual Total de Vivienda?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>PITI</strong> es el estándar bancario tradicional que agrupa Capital, Intereses, Impuestos sobre la propiedad y
              Seguro de vivienda. <strong>El Desembolso Mensual Total</strong> es una cifra de presupuesto personal integral que incluye
              PITI más el Seguro Hipotecario Privado (PMI), cuotas de la Asociación de Propietarios (HOA), reservas auxiliares de mantenimiento
              y pagos adicionales voluntarios a capital.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              ¿Cuál es la diferencia entre la tasa de interés nominal y el APR (TAE)?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              La <strong>tasa de interés nominal (note rate)</strong> es el porcentaje anual que se cobra sobre el saldo de capital no pagado.
              La <strong>Tasa de Porcentaje Anual (APR/TAE)</strong> refleja la tasa nominal más las tarifas de originación del prestamista,
              puntos de descuento y costos de cierre obligatorios expresados como un porcentaje anualizado.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              ¿Cuándo se puede cancelar el Seguro Hipotecario Privado (PMI)?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Bajo la Ley de Protección a Propietarios de 1998 (HPA), los prestatarios de préstamos convencionales tienen el derecho legal de
              solicitar la cancelación del PMI por escrito una vez que el saldo de capital alcanza el 80% del valor original de la vivienda.
              Asimismo, los administradores deben cancelarlo automáticamente cuando el saldo programado alcance el 78% LTV, siempre que los pagos estén al corriente.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              ¿Cómo acortan los pagos extraordinarios el plazo de liquidación de la hipoteca?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Los pagos extraordinarios se aplican al 100% directamente a la reducción del saldo de capital no pagado. Como los intereses futuros
              se calculan sobre este saldo menor, los cargos por interés disminuyen de forma permanente, permitiendo que los pagos fijos liquiden la
              deuda restante años antes de lo previsto.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
            <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
              ¿Cómo ahorra intereses un programa de pagos quincenales?
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Un plan quincenal divide el pago mensual de capital e intereses a la mitad (M / 2) y se paga cada dos semanas. Al haber 52 semanas en un
              año, se realizan 26 medios pagos, lo que equivale a 13 pagos mensuales completos al año. Este pago mensual adicional aplicado directamente
              al capital reduce el plazo de 30 años en varios años y ahorra miles en intereses acumulados.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MortgageContentSectionEs;
