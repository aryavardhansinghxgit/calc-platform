"use client";

import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, AlertCircle, Info, ArrowRight } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "¿Qué es un préstamo hipotecario VA y quién califica?",
    "answer": "Es un préstamo respaldado por el Departamento de Asuntos de los Veteranos para militares en activo, veteranos y cónyuges supervivientes elegibles."
  },
  {
    "question": "¿Es obligatorio dar una entrada en un préstamo VA?",
    "answer": "No, los préstamos VA permiten financiar hasta el 100% del precio de compra con un 0% de entrada sin seguro de hipoteca privado (PMI)."
  },
  {
    "question": "¿Qué es la tasa de financiación VA (Funding Fee)?",
    "answer": "Es una comisión gubernamental obligatoria (1.25% a 3.30%) que sustituye al PMI y financia el programa de garantías de la VA."
  },
  {
    "question": "¿Quién está exento de pagar la tasa de financiación VA?",
    "answer": "Veteranos con una discapacidad reconocida relacionada con el servicio (10%+), condecorados con el Corazón Púrpura y cónyuges perceptores de DIC."
  },
  {
    "question": "¿Conviene financiar la tasa VA o pagarla en efectivo?",
    "answer": "Financiarla reduce el desembolso inicial al cierre, pero incrementa el saldo del préstamo y los intereses mensuales a 30 años."
  },
  {
    "question": "¿En qué se diferencia el primer uso del uso posterior?",
    "answer": "Con 0% de entrada, el primer uso tiene una tasa del 2.15% y los usos posteriores del 3.30%. Con 5%+ de entrada, ambas tasas se igualan al 1.50%."
  },
  {
    "question": "¿Tiene un préstamo VA seguro hipotecario mensual (PMI)?",
    "answer": "No, los préstamos VA nunca cobran seguro hipotecario mensual, lo que genera un ahorro de cientos de dólares al mes."
  },
  {
    "question": "¿Qué es la refinanciación IRRRL (Streamline Refinance)?",
    "answer": "Es un procedimiento simplificado que permite reducir el tipo de interés sin tasación y con una tasa de financiación reducida del 0.50%."
  },
  {
    "question": "¿Qué es el derecho de garantía (Entitlement) de la VA?",
    "answer": "Es el respaldo financiero que otorga el gobierno; con derecho pleno no hay límites máximos de préstamo para compras con 0% de entrada."
  },
  {
    "question": "¿Cuáles son los requisitos mínimos de servicio militar?",
    "answer": "Generalmente 90 días en periodo de guerra, 181 días en tiempo de paz o 6 años en la Guardia Nacional o Reserva."
  },
  {
    "question": "¿Cómo se compara un préstamo VA con FHA y Convencional?",
    "answer": "El préstamo VA supera a FHA al no tener prima mensual permanente y aventaja al convencional al no exigir el 5%–20% de entrada."
  },
  {
    "question": "¿Cómo acelerar la amortización de un préstamo VA?",
    "answer": "Realizando pagos quincenales (bi-weekly) o pagos mensuales adicionales de capital para ahorrar decenas de miles en intereses."
  }
];

export const seo = {
  title: "Calculadora de Hipoteca VA (Préstamos Militares) — Préstamo VA",
  description: "Calcule cuotas de hipotecas VA sin entrada (0% down), tasa de financiación (Funding Fee), desglose PITI, exenciones por discapacidad y comparativa 3-vías.",
  keywords: ["calculadora hipoteca va","prestamo va militares","cuota prestamo va","funding fee va calculadora"]
};

export const ContentComponent = function VAMortgageContentES() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculadora de Hipoteca VA (Préstamos Militares)
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calcule cuotas de préstamos VA, tasas de financiación (Funding Fee), PITI completo, poder adquisitivo con 0% de entrada, aceleración de pagos, refinanciación IRRRL y comparativa con FHA y convencional.
        </p>
      </div>

      {/* 2. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. ¿Qué es una Calculadora de Hipoteca VA?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Una calculadora de hipoteca VA estima la cuota mensual y el coste financiero global de un préstamo hipotecario respaldado por el Departamento de Asuntos de los Veteranos (VA). Modela con precisión la tasa de financiación obligatoria, impuestos prediales, seguro de hogar, cuotas comunitarias, planes de amortización y comparativas frente a préstamos convencionales y FHA.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Aviso del Modelo de Planificación</span>
          </div>
          <p>
            Esta herramienta es un modelo orientativo y no constituye un Certificado de Elegibilidad (COE) ni una preaprobación formal de préstamo.
          </p>
        </div>
      </section>

      {/* 3. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Cómo Utilizar la Calculadora de Hipoteca VA
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Siga este flujo secuencial para evaluar su préstamo militar :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Introduzca el precio objetivo de compra de la vivienda.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Indique el porcentaje de entrada previsto (0% a 100%).</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Seleccione su categoría militar (Servicio Activo/Veterano, Guardia/Reserva o Cónyuge).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Elija si es su primer uso o un uso posterior del beneficio VA.</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Introduzca el tipo de interés fijo y el plazo en años (15 o 30 años).</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Elija si financia la tasa VA en el préstamo o la paga en efectivo al cierre.</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Active la exención por discapacidad militar si reúne los requisitos.</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Revise el capital financiado, la cuota P&I y el pago total PITI mensual.</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Inspeccione la tabla de amortización completa y expórtela a CSV.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Compare el préstamo VA frente a los escenarios FHA y Convencional.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Utilice el módulo de Entitlement para evaluar su capacidad con 0% de entrada.</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Simule pagos quincenales para comprobar el ahorro en tiempo e intereses.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Calcule pagos extraordinarios mensuales de capital.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Evalúe el ahorro en refinanciación con el simulador IRRRL.</span>
            </div>
        </div>
      </section>

      {/* 4. CORE FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Fórmula Fundamental de Amortización y Desglose PITI
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La cuota mensual de principal e intereses (P&I) se calcula mediante la fórmula de anualidades a tipo fijo :
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-center font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans">Ecuación de Principal e Intereses Mensuales</div>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl text-base font-bold text-blue-600 dark:text-blue-400 shadow-inner">
            {"M = P × [r(1+r)^n] / [(1+r)^n - 1]"}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-sans text-left space-y-1.5 pt-1">
            <div>• <strong>M:</strong>  Cuota mensual de Principal e Intereses.</div>
            <div>• <strong>P:</strong>  Importe total financiado (Préstamo Base + Tasa VA Financiada).</div>
            <div>• <strong>r:</strong>  Tipo de interés mensual (Tipo Anual / 12 / 100).</div>
            <div>• <strong>n:</strong>  Número total de mensualidades (Años × 12).</div>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          El pago mensual total del hogar (PITI) incorpora los gastos periódicos de custodia :
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"Total PITI Mensual = Cuota P&I + (Impuestos Anuales / 12) + (Seguro Anual / 12) + Comunidad Mensual"}
        </div>
      </section>

      {/* 5. FUNDING FEE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Tasa de Financiación VA (Funding Fee)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La tasa de financiación VA es una comisión gubernamental obligatoria por ley (38 U.S.C. § 3729) que financia el programa de garantías de la VA para los contribuyentes.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Al no requerir entrada ni seguro PMI mensual, esta tasa constituye la reserva central del programa. Puede financiarse dentro del préstamo o abonarse en efectivo al cierre.
        </p>
      </section>

      {/* 6. FIRST VS SUBSEQUENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Primer Uso frente a Uso Posterior
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          El uso previo del beneficio hipotecario VA influye en el porcentaje aplicable con entradas inferiores al 5% :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">Primer Uso (0% de Entrada)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Para una compra de 500.000 $ con 0% de entrada, la tasa legal es del 2,15% (10.750 $). El saldo financiado es de 510.750 $, con una cuota P&I de 3.228,29 $ y un PITI total de 3.936,62 $/mes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">Uso Posterior (0% de Entrada)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Para prestatarios recurrentes con 0% de entrada, la tasa asciende al 3,30% (16.500 $). El saldo financiado sube a 516.500 $, generando una cuota P&I de 3.264,80 $ y un PITI de 3.973,13 $/mes.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          *Nota: Con una entrada del 5% o superior, la tasa en usos posteriores se reduce automáticamente al 1,50% (igual que en primer uso).
        </p>
      </section>

      {/* 7. STATUTORY MATRIX TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Cuadro Legal de Tasas de Financiación VA (Matriz Estatutaria)
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Tramo de Entrada</th>
                <th className="p-3">Primer Uso</th>
                <th className="p-3">Uso Posterior</th>
                <th className="p-3 rounded-tr-xl">Exención por Discapacidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"< 5% Entrada (0% Down)"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"2.15%"}</td>
                <td className="p-3 font-mono font-bold text-red-500">{"3.30%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Exento)"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"5% – 9.99% Entrada"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.50%"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.50%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Exento)"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"≥ 10% Entrada"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.25%"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.25%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Exento)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. EXEMPTIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Exenciones Legales de la Tasa de Financiación (Tasa 0%)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Bajo la legislación federal (38 U.S.C. § 3729(c)), los prestatarios que cumplan ciertos criterios están totalmente exentos de la tasa VA (0.00%) :
        </p>
        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-2 text-slate-700 dark:text-slate-300">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-300 block">Quién Califica para la Exención :</span>
          <ul className="space-y-1 list-disc list-inside">
            <li>Veteranos que reciben compensación de la VA por discapacidad relacionada con el servicio (10% o superior).</li>
            <li>Veteranos con derecho a compensación por discapacidad que perciben pensión militar de jubilación.</li>
            <li>Militares en activo condecorados con el Corazón Púrpura.</li>
            <li>Cónyuges supervivientes de militares fallecidos en acto de servicio o por causas ligadas al servicio (perceptores de DIC).</li>
          </ul>
        </div>
      </section>

      {/* 9. CASH VS FINANCED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Comparativa: Financiar la Tasa vs. Pago en Efectivo al Cierre
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Financiar la tasa frente a pagarla en efectivo plantea una disyuntiva entre liquidez inicial y coste total de intereses :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">Financiada en el Préstamo</h3>
            <p className="text-slate-600 dark:text-slate-400">
              En 500.000 $ con tasa del 3,30% (16.500 $), el saldo sube a 516.500 $ y la cuota P&I a 3.264,80 $/mes. Los fondos en efectivo al cierre se mantienen en 12.500 $ (costes de cierre ordinarios).
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">Pagada en Efectivo al Cierre</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Abonar los 16.500 $ al cierre mantiene el saldo en 500.000 $, reduciendo la cuota P&I a 3.160,34 $/mes (ahorro de ~104 $/mes) pero eleva el desembolso inicial a 29.000 $.
            </p>
          </div>
        </div>
      </section>

      {/* 10. 3-WAY COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Comparativa 3-Vías: Préstamo VA vs. FHA vs. Convencional
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Programa</th>
                <th className="p-3">Entrada Mínima</th>
                <th className="p-3">Seguro Hipotecario Mensual</th>
                <th className="p-3">Comisión Inicial</th>
                <th className="p-3 rounded-tr-xl">Desembolso Total 30 Años</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Préstamo VA"}</td>
                <td className="p-3 font-bold text-emerald-600">{"0% (0 $)"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0 $ (Sin PMI)"}</td>
                <td className="p-3">{"2.15% Financiado (10.750 $)"}</td>
                <td className="p-3 font-mono font-bold text-blue-600">{"1.357.200 $ (3.770 $/mes)"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"Préstamo FHA"}</td>
                <td className="p-3 font-bold ">{"3.5% (17.500 $)"}</td>
                <td className="p-3 text-red-500">{"0.55% MIP Permanente"}</td>
                <td className="p-3">{"1.75% UFMIP (8.444 $)"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.421.640 $ (3.949 $/mes)"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Convencional"}</td>
                <td className="p-3 font-bold text-emerald-600">{"5.0% (25.000 $)"}</td>
                <td className="p-3 ">{"0.60% PMI (Años 1-8)"}</td>
                <td className="p-3">{"0 $ Comisión Inicial"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.356.903 $ (3.943 $/mes Y1-8)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          El préstamo VA ahorra 64.440 $ frente a FHA por la ausencia de prima mensual permanente, e iguala prácticamente el coste global del préstamo convencional pero sin exigir 25.000 $ de entrada en efectivo.
        </p>
      </section>

      {/* 11. ENTITLEMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Derecho de Garantía (Entitlement) y Capacidad de Compra con 0% Down
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          El derecho de garantía determina la capacidad máxima de compra sin pago inicial :
        </p>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">Entitlement Pleno (Sin Uso Previo Activo)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Bajo la ley Blue Water Navy de 2019, los veteranos con derecho pleno no tienen límite de cuantía máxima para comprar con 0% de entrada.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">Entitlement Parcial (Préstamo VA Previo Activo)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Si mantiene un préstamo VA anterior abierto, se aplican los límites del condado para calcular la garantía secundaria remanente :
            </p>
            <div className="font-mono bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
              <div>{"Garantía Remanente = max(0, Límite del Condado × 25% - Entitlement Utilizado)"}</div>
              <div>{"Precio Máximo con 0% Entrada = Garantía Remanente × 4"}</div>
              <div>{"Entrada Requerida = max(0, (Precio Objetivo - Precio Máximo con 0%) × 25%)"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. ACCELERATED PAYOFF */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Amortización Acelerada: Pagos Quincenales y Pagos Extra
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">Pagos Quincenales (Bi-Weekly)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Abonar la mitad de la cuota cada 2 semanas (26 pagos/año) equivale a 13 cuotas completas anuales. En un saldo de 510.750 $ al 6,5%, ahorra 150.027 $ en intereses y acorta el plazo en 5,8 años.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">Pagos Extra Mensuales de Principal</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Aportar 200 $/mes adicionales de capital ahorra 118.241 $ en intereses totales y reduce el préstamo en 55 meses (4,6 años).
            </p>
          </div>
        </div>
      </section>

      {/* 13. IRRRL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Refinanciación Acelerada VA IRRRL (Streamline)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          El programa IRRRL permite reducir el tipo de interés sin tasación y con una tasa reducida de solo el 0,50% :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <span className="font-bold text-blue-600 block">Ejemplo IRRRL (Saldo 350.000 $, bajada de 7.25% a 6.00%) :</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-center">
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Ahorro Mensual</span>
              <span className="text-emerald-600 font-extrabold">279 $ / mes</span>
            </div>
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Plazo de Amortización Costes</span>
              <span className="text-emerald-600 font-extrabold">17 Meses</span>
            </div>
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Ahorro Neto en 5 Años</span>
              <span className="text-emerald-600 font-extrabold">11.990 $</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1">
            *Nota: Al refinanciar, reiniciar el plazo a 30 años puede alargar el periodo de intereses si la hipoteca original estaba muy avanzada.
          </p>
        </div>
      </section>

      {/* 14. SERVICE ELIGIBILITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Requisitos Mínimos de Servicio Militar
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Servicio en Tiempo de Guerra</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Al menos 90 días consecutivos de servicio activo en periodos bélicos reconocidos.</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Servicio en Tiempo de Paz</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Al menos 181 días continuados de servicio militar activo en periodos de paz.</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Guardia Nacional y Reserva</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Al menos 6 años de servicio computable o 90 días de servicio activo bajo Título 10/32.</p>
          </div>
        </div>
      </section>

      {/* 15. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Errores Frecuentes al Calcular una Hipoteca VA
        </h2>
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>No seleccionar correctamente si se trata del primer uso o de un uso posterior del crédito VA.</li>
            <li>Suponer que todos los solicitantes pagan la misma tasa de financiación sin considerar la entrada.</li>
            <li>Olvidar que financiar la tasa incrementa el capital deudor y los intereses mensuales a 30 años.</li>
            <li>Comparar solo la cuota P&I de la VA con el pago PITI completo de otros préstamos.</li>
            <li>Tratar los límites de condado como estáticos sin verificar la actualización anual del FHFA.</li>
            <li>Confundir la simulación del calculador con un Certificado de Elegibilidad oficial (COE).</li>
            <li>Asumir que todos los bancos procesan pagos quincenales sin acumularlos en cuentas puente.</li>
            <li>Pasar por alto el reinicio del plazo de 30 años en refinanciaciones IRRRL.</li>
            <li>No acreditar documentalmente la exención por discapacidad militar.</li>
            <li>Asumir que la VA siempre es la opción más barata si se dispone de más del 20% de entrada.</li>
          </ul>
        </div>
      </section>

      {/* 16. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Aviso Educativo y Marco Normativo</span>
        </div>
        <p>
          Los préstamos hipotecarios VA están regidos por el Título 38 del Código de los Estados Unidos y el Manual de Prestamistas de la VA. Esta herramienta ofrece simulaciones de planificación financiera.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "es",
  calculatorSlug: "va-mortgage-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
