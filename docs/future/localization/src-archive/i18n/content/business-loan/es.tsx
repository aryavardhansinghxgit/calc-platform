"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Scale,
  Calculator,
} from "lucide-react";
import { CalculatorLocalizedContent, FAQItem } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "¿Qué es una calculadora de préstamos para empresas?",
    "answer": "Una calculadora de préstamos comerciales estima el coste financiero de la deuda empresarial a partir del capital, tipo de interés, plazo y comisiones de apertura o formalización."
  },
  {
    "question": "¿Cómo se calcula la cuota de un préstamo comercial?",
    "answer": "En préstamos con amortización constante se calcula mediante la fórmula de anualidades: PMT = [P × r × (1+r)^n] / [(1+r)^n − 1], donde r es el tipo mensual y n el número de meses."
  },
  {
    "question": "¿Cuántos intereses pagaré por un préstamo empresarial?",
    "answer": "El total de intereses equivale a la suma de todas las cuotas programadas menos el capital principal prestado, suponiendo que no existan amortizaciones anticipadas extraordinarias."
  },
  {
    "question": "¿Afectan las comisiones de apertura y gestión al coste real?",
    "answer": "Sí. Las comisiones de apertura y de formalización documental reducen el importe neto disponible y elevan sustancialmente el coste efectivo anual (TAE)."
  },
  {
    "question": "¿Cuál es la diferencia entre el tipo nominal y la TAE comercial?",
    "answer": "El tipo de interés nominal se aplica sobre el saldo deudor insoluto, mientras que la TAE actuarial incorpora todos los gastos iniciales y refleja el rendimiento financiero mediante TIR."
  },
  {
    "question": "¿Es la TAE de un préstamo comercial idéntica a la de un consumidor?",
    "answer": "No siempre. El crédito empresarial suele estar exento de la normativa de crédito al consumo (como la Regulación Z en EE.UU.), por lo que la TAE de la calculadora es una referencia económica actuarial."
  },
  {
    "question": "¿Qué es el ratio DSCR en un préstamo comercial?",
    "answer": "El DSCR (Debt Service Coverage Ratio) mide la capacidad del flujo de caja operativo para cubrir las cuotas de la deuda: DSCR = Beneficio Operativo Neto (NOI) / Servicio Anual de Deuda."
  },
  {
    "question": "¿Se exige siempre un DSCR mínimo de 1,25x para aprobar el crédito?",
    "answer": "No. Aunque 1,25x es el estándar de referencia más común en banca comercial, cada entidad y tipo de producto financiero establece sus propios criterios de suscripción."
  },
  {
    "question": "¿Qué es un préstamo garantizado SBA 7(a)?",
    "answer": "Es el programa principal de préstamos de la Small Business Administration (hasta 5M $) para capital de trabajo, adquisición de activos, compra de empresas y refinanciación de deuda elegible."
  },
  {
    "question": "¿Qué es un préstamo SBA 504?",
    "answer": "Es una estructura de financiación a largo plazo a tipo fijo de hasta 5,5M $ destinada a la compra de bienes inmuebles comerciales y maquinaria pesada a través de CDCs."
  },
  {
    "question": "¿Qué es un micropréstamo SBA?",
    "answer": "Son préstamos de menor cuantía (hasta 50.000 $) canalizados a través de intermediarios comunitarios para cubrir necesidades inmediatas de capital circulante o inventario."
  },
  {
    "question": "¿Garantiza la SBA el 100% del importe del préstamo?",
    "answer": "No. La SBA garantiza un porcentaje del préstamo (habitualmente entre el 75% y el 85%), asumiendo el banco prestamista el riesgo de la fracción restante."
  },
  {
    "question": "¿Puedo destinar un préstamo comercial a capital de trabajo?",
    "answer": "Sí, la mayoría de los préstamos y líneas de crédito comerciales permiten financiar compras de existencias, tesorería operativa, nóminas y gastos corrientes."
  },
  {
    "question": "¿Un plazo de amortización más largo reduce los intereses totales?",
    "answer": "No. Un plazo más largo reduce la cuota mensual pero incrementa notablemente el total de intereses pagados al devengarse intereses durante más periodos."
  },
  {
    "question": "¿Son deducibles de impuestos los intereses del préstamo empresarial?",
    "answer": "En general, los intereses de la deuda comercial utilizada para actividades del negocio son deducibles como gasto financiero, con sujeción a los límites fiscales vigentes."
  }
];

export const seo = {
  title: "Calculadora de Préstamos para Empresas — Cuotas, Intereses, Comisiones, TAE y Análisis Comercial",
  description: "Calcule cuotas mensuales de préstamos comerciales, intereses totales, comisiones bancarias, TAE actuarial real, opciones SBA y ratio de cobertura DSCR.",
  keywords: ["calculadora de prestamo empresarial","prestamo comercial","calculadora prestamo sba","tae real prestamo negocio","dscr empresarial"]
};

export const ContentComponent: React.FC = () => {
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: faqs.length }, (_, i) => i))
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
      <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Section 1: Title & Introduction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. ¿Qué es una Calculadora de Préstamos para Empresas?
          </h2>
          <p>
            Un préstamo empresarial puede parecer económico si solo se observa el tipo de interés anunciado. Sin embargo, el coste real puede ser sustancialmente diferente una vez que se integran el plazo de devolución, las comisiones de apertura, los gastos de formalización documental y otros costes financieros.
          </p>
          <p>
            Esta calculadora unifica todas estas variables en un único modelo de análisis: calcula la cuota periódica, el total de intereses, el coste financiero global, el calendario de amortización, las condiciones de préstamos SBA y la cobertura de flujo de caja DSCR.
          </p>
          <p>
            Los resultados son estimaciones financieras con fines de planificación y comparativa de mercado. Las condiciones definitivas dependen de la política de riesgos de la entidad prestamista.
          </p>
        </section>

        {/* Section 2: What Is a Business Loan? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. ¿Qué es un Préstamo Comercial o Empresarial?
          </h2>
          <p>
            Un préstamo comercial es una operación de financiación concertada para fines empresariales como capital de trabajo, adquisición de maquinaria, inventario, compra o reforma de inmuebles, adquisición de empresas o refinanciación de pasivos.
          </p>
          <p>
            Existen múltiples modalidades: préstamos tradicionales a plazo fijo con cuotas periódicas, líneas de crédito renovables para tesorería, y programas avalados como los préstamos 7(a) de la SBA que reducen el riesgo bancario mediante garantías públicas.
          </p>
          <p>
            La estructura financiera elegida es determinante, ya que dos préstamos con idéntico tipo de interés nominal pueden presentar costes económicos muy distintos según sus comisiones y plazos de amortización.
          </p>
        </section>

        {/* Section 3: How Payment Is Calculated & Formulas */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Cómo se Calcula la Cuota de un Préstamo Empresarial
          </h2>
          <p>
            Para préstamos totalmente amortizables mediante cuotas iguales, el cálculo se basa en la fórmula estándar de anualidades financieras:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            PMT = [ P × r × (1 + r)^n ] / [ (1 + r)^n − 1 ]
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Donde: P = capital principal prestado, r = tipo de interés mensual (tipo anual / 12), n = número total de pagos mensuales, PMT = cuota mensual regular.
          </p>
          <p>
            El plazo de amortización influye decisivamente en el coste: ampliar el plazo reduce la carga mensual inmediata pero incrementa el total de intereses devengados.
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5 text-xs">
            <strong className="text-slate-900 dark:text-slate-100 font-bold block">
              Ejemplo Práctico: Préstamo de 10.000 $ al 10% a 5 Años (60 Meses)
            </strong>
            <ul className="list-disc list-inside space-y-1 pl-1 text-slate-700 dark:text-slate-300 font-sans tabular-nums">
              <li>Cuota Mensual Fija (PMT): 212,47 $ al mes</li>
              <li>Total de Pagos Programados (60 meses): 60 × 212,47 $ = 12.748,23 $</li>
              <li>Capital Principal Amortizado: 10.000,00 $</li>
              <li>Total de Intereses Pagados: 2.748,23 $</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Total Cost Is More Than Interest */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. El Coste Total es Más que los Intereses: Comisiones Comerciales
          </h2>
          <p>
            En la financiación comercial es esencial diferenciar entre el gasto por intereses y el coste total de la financiación. Las entidades suelen aplicar comisiones de apertura, gastos de estudio, formalización notarial y comisiones de garantía.
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{"Componente del Coste"}</th>
                  <th className="p-2.5 border-b text-right">{"Importe ($)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                
                <tr className="">
                  <td className="p-2.5 ">{"Capital Principal Prestado"}</td>
                  <td className="p-2.5 text-right ">{"10.000,00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Total de Intereses Pagados"}</td>
                  <td className="p-2.5 text-right text-rose-600">{"2.748,23 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Comisión de Apertura (5,0%)"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"500,00 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Gastos de Formalización y Documentación"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"750,00 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 ">{"Otros Gastos Iniciales"}</td>
                  <td className="p-2.5 text-right ">{"0,00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Total Comisiones Comerciales:"}</td>
                  <td className="p-2.5 text-right text-amber-600">{"1.250,00 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Coste Financiero Global (Intereses + Comisiones):"}</td>
                  <td className="p-2.5 text-right text-indigo-600">{"3.998,23 $"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Así, aunque el tipo nominal sea del 10%, la operación genera 3.998,23 $ en costes acumulados, demostrando por qué comparar únicamente el tipo de interés resulta insuficiente.
          </p>
        </section>

        {/* Section 5: Nominal Rate vs Actuarial Cost (APR) */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. TAE Comercial: Tipo Nominal frente a Coste Efectivo Real
          </h2>
          <p>
            El cálculo de la Tasa Anual Equivalente (TAE) en el crédito comercial requiere distinguir dos métricas fundamentales:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-2 text-xs">
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Scale className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                Tipo de Interés Nominal (10,00%)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Es el tipo pactado aplicado sobre el saldo vivo del préstamo en cada periodo según el cuadro de amortización.
              </p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1.5">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block text-xs flex items-center gap-1.5">
                <Calculator className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                TAE Actuarial Real / TIR (15,933%)
              </strong>
              <p className="text-slate-600 dark:text-slate-400">
                Calcula el rendimiento financiero efectivo tratando los fondos netos recibidos (8.750 $) y los pagos mensuales (212,47 $) como flujos de caja mediante la Tasa Interna de Retorno (TIR).
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Esta cifra difiere de las aproximaciones lineales de recargo de comisiones (12,50%), ya que la TIR descuenta el valor temporal del dinero en cada mensualidad.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Las empresas deben prestar especial atención a este indicador, ya que la legislación de consumo no siempre obliga al prestamista a publicar una TAE normalizada en contratos comerciales.
          </p>
        </section>

        {/* Section 6: How Amortization Works */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Cómo Funciona el Cuadro de Amortización Comercial
          </h2>
          <p>
            La amortización desglosa cada cuota en amortización de capital e intereses devengados. Al inicio, la cuota contiene más intereses debido al mayor saldo deudor:
          </p>
          <div className="overflow-x-auto border border-slate-200 dark:border-zinc-800 rounded-xl">
            <table className="w-full text-left text-xs border-collapse font-sans tabular-nums">
              <thead className="bg-slate-100 dark:bg-zinc-800 font-semibold text-slate-900 dark:text-slate-100">
                <tr>
                  <th className="p-2.5 border-b">{"Periodo"}</th>
                  <th className="p-2.5 border-b">{"Saldo Inicial"}</th>
                  <th className="p-2.5 border-b text-rose-600">{"Intereses"}</th>
                  <th className="p-2.5 border-b text-emerald-600">{"Capital Amortizado"}</th>
                  <th className="p-2.5 border-b">{"Saldo Final"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800 text-slate-700 dark:text-slate-300">
                
                <tr className="">
                  <td className="p-2.5 font-bold">{"Mes 1"}</td>
                  <td className="p-2.5">{"10.000,00 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"83,33 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"129,14 $"}</td>
                  <td className="p-2.5 font-bold ">{"9.870,86 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 font-bold">{"Mes 2"}</td>
                  <td className="p-2.5">{"9.870,86 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"82,26 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"130,21 $"}</td>
                  <td className="p-2.5 font-bold ">{"9.740,65 $"}</td>
                </tr>
                <tr className="">
                  <td className="p-2.5 font-bold">{"Mes 3"}</td>
                  <td className="p-2.5">{"9.740,65 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"81,17 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"131,30 $"}</td>
                  <td className="p-2.5 font-bold ">{"9.609,35 $"}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-zinc-800/60 font-bold text-slate-900 dark:text-slate-100">
                  <td className="p-2.5 font-bold">{"Mes 60 (Final)"}</td>
                  <td className="p-2.5">{"210,71 $"}</td>
                  <td className="p-2.5 text-rose-600 font-semibold">{"1,76 $"}</td>
                  <td className="p-2.5 text-emerald-600 font-semibold">{"210,71 $"}</td>
                  <td className="p-2.5 font-bold text-emerald-600">{"0,00 $"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Al finalizar el plazo convenido, el saldo final se reduce exactamente a 0,00 $, cuadrando las cifras acumuladas de capital e intereses.
          </p>
        </section>

        {/* Section 7: Shorter Term vs Longer Term */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Plazo Corto frente a Plazo Largo en Préstamos Comerciales
          </h2>
          <p>
            La elección del plazo de amortización impacta simultáneamente en la tesorería mensual y en el coste financiero global:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>Plazo más corto: Cuota mensual más elevada + menor coste total por intereses devengados.</li>
            <li>Plazo más largo: Cuota mensual reducida + mayor coste total en intereses durante la vida del crédito.</li>
          </ul>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            La elección óptima depende de la capacidad de generación de caja del negocio, sus necesidades de liquidez y el retorno esperado de la inversión financiada.
          </p>
        </section>

        {/* Section 8: What Is DSCR? */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. ¿Qué es el Ratio de Cobertura del Servicio de la Deuda (DSCR)?
          </h2>
          <p>
            El DSCR mide la solidez del flujo de caja operativo de la empresa respecto a sus obligaciones anuales de deuda:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 font-mono text-center text-xs sm:text-sm">
            DSCR = Beneficio Operativo Neto (NOI) / Servicio Anual de Deuda
          </div>
          <p>
            Ejemplo: Para un NOI anual de 150.000 $, deuda existente de 30.000 $/año y nueva deuda de 25.000 $/año:
          </p>
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1 font-sans tabular-nums text-xs">
            <p>Servicio Total de Deuda Anual: 30.000 $ + 25.000 $ = 55.000,00 $/año</p>
            <p>DSCR Resultante: 150.000 $ / 55.000 $ = 2,73x (Excelente Cobertura)</p>
            <p>Capacidad Máxima de Deuda (al umbral 1,25x): 150.000 $ / 1,25 = 120.000,00 $/año</p>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Un ratio superior a 1,25x suele considerarse un nivel de seguridad adecuado para la mayoría de los departamentos de riesgos bancarios.
          </p>
        </section>

        {/* Section 9: Small Business Administration (SBA) Loans */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Diferencias en Préstamos SBA (7(a), CDC/504 y Microcréditos)
          </h2>
          <p>
            La Small Business Administration (SBA) actúa como entidad avalista que mitiga el riesgo de las entidades financieras asociadas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-2 text-xs">
            
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"Programa SBA 7(a)"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Financiación principal de hasta 5M $ para capital de trabajo, adquisición de activos, compra de empresas y refinanciación."}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"SBA 504 Bienes Raíces"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Créditos a tipo fijo a largo plazo de hasta 5,5M $ para inmuebles y maquinaria pesada canalizados por CDCs."}</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 font-bold block">{"Micropréstamos SBA"}</strong>
              <p className="text-slate-600 dark:text-slate-400">{"Líneas de hasta 50.000 $ para micropymes y emprendedores gestionadas por entidades intermediarias sin ánimo de lucro."}</p>
            </div>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Los préstamos SBA devengan comisiones de garantía proporcionales al importe financiado que deben incorporarse al presupuesto inicial.
          </p>
        </section>

        {/* Section 10: Common Mistakes */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Errores Frecuentes al Calcular un Préstamo Comercial
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-2 text-slate-700 dark:text-slate-300 text-xs">
            <li>Comparar únicamente los tipos de interés nominales e ignorar las comisiones de apertura y gastos de formalización.</li>
            <li>Elegir el plazo más largo solo para reducir la cuota mensual sin calcular el sobrecoste en intereses totales.</li>
            <li>Asumir que la TAE comercial se calcula igual que la TAE de un préstamo para particulares.</li>
            <li>Creer que un ratio DSCR de 1,25x es el único requisito para la aprobación bancaria.</li>
            <li>No consultar la normativa tributaria sobre límites a la deducibilidad de gastos financieros empresariales.</li>
          </ul>
        </section>

        {/* Section 11: Related Calculators */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Calculadoras Financieras y Comerciales Relacionadas
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Explore estas herramientas complementarias para una planificación empresarial integral:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            
            <Link
              href="/calculators/loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculadora de Préstamos"}</span>
              <span className="text-slate-500 text-[11px]">{"Simulación general de amortización."}</span>
            </Link>
            <Link
              href="/calculators/personal-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Préstamos Personales"}</span>
              <span className="text-slate-500 text-[11px]">{"Comparativa con financiación personal."}</span>
            </Link>
            <Link
              href="/calculators/mortgage-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculadora de Hipotecas"}</span>
              <span className="text-slate-500 text-[11px]">{"Financiación de bienes inmuebles."}</span>
            </Link>
            <Link
              href="/calculators/roi-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculadora de ROI"}</span>
              <span className="text-slate-500 text-[11px]">{"Retorno sobre la inversión del capital."}</span>
            </Link>
            <Link
              href="/calculators/payback-period-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Periodo de Recuperación"}</span>
              <span className="text-slate-500 text-[11px]">{"Plazo de amortización de proyectos."}</span>
            </Link>
            <Link
              href="/calculators/margin-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Calculadora de Márgenes"}</span>
              <span className="text-slate-500 text-[11px]">{"Margen de beneficio y recargos."}</span>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Interés Compuesto"}</span>
              <span className="text-slate-500 text-[11px]">{"Crecimiento e inversión de tesorería."}</span>
            </Link>
            <Link
              href="/calculators/auto-loan-calculator"
              className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-xl border border-slate-200 dark:border-zinc-700/60 hover:border-blue-500 transition-colors block"
            >
              <span className="font-bold text-blue-600 dark:text-blue-400 block">{"Préstamos Auto"}</span>
              <span className="text-slate-500 text-[11px]">{"Financiación de flotas comerciales."}</span>
            </Link>
          </div>
        </section>
      </div>

      {/* 2. FAQ SECTION */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
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
                      Q{idx + 1}.
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
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "es",
  calculatorSlug: "business-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
