"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "¿Qué es un préstamo con garantía hipotecaria y cómo funciona?",
    "answer": "Un préstamo con garantía hipotecaria es una segunda hipoteca a tipo fijo que permite obtener una suma global utilizando el valor neto acumulado de su vivienda como garantía."
  },
  {
    "question": "¿Cuánto puedo solicitar con un préstamo sobre el valor neto de la vivienda?",
    "answer": "La mayoría de las entidades financieras permiten un CLTV máximo del 80% al 85% del valor de tasación de la vivienda menos el saldo de su primera hipoteca."
  },
  {
    "question": "¿Qué es el CLTV y cómo se calcula?",
    "answer": "El CLTV (Combined Loan-to-Value) es la suma de todas las hipotecas sobre la propiedad dividida entre el valor de mercado tasado de la vivienda."
  },
  {
    "question": "¿Cómo se calcula la cuota mensual de un préstamo con garantía hipotecaria?",
    "answer": "Se calcula mediante la fórmula estándar de amortización fija basada en el capital prestado, el tipo de interés mensual y el plazo en meses."
  },
  {
    "question": "¿Qué puntuación crediticia se requiere para calificar?",
    "answer": "Generalmente se requiere una puntuación de crédito de 620 o superior, aunque los mejores tipos de interés exigen 700 o más."
  },
  {
    "question": "¿En qué se diferencia un préstamo con garantía hipotecaria de una línea de crédito HELOC?",
    "answer": "El préstamo entrega una suma fija con cuota y tipo de interés fijos, mientras que la HELOC es una línea de crédito renovable con tipo variable."
  },
  {
    "question": "¿En qué se diferencia de una refinanciación con retiro de efectivo (cash-out)?",
    "answer": "La refinanciación sustituye su primera hipoteca por una nueva de mayor importe, mientras que el préstamo con garantía hipotecaria deja intacta su primera hipoteca."
  },
  {
    "question": "¿Son deducibles de impuestos los intereses del préstamo con garantía hipotecaria?",
    "answer": "Según las normas actuales del IRS, los intereses solo son deducibles si los fondos se utilizan para comprar, construir o mejorar sustancialmente la vivienda que garantiza el préstamo."
  },
  {
    "question": "¿Puedo amortizar un préstamo con garantía hipotecaria por anticipado?",
    "answer": "Sí, la mayoría de los préstamos permiten amortizaciones anticipadas para reducir el plazo y el coste total de intereses sin penalización."
  },
  {
    "question": "¿Cuáles son los costes de cierre típicos de una segunda hipoteca?",
    "answer": "Suelen oscilar entre el 2% y el 5% del importe del préstamo e incluyen tasación, costes de originación, búsqueda de títulos y comisiones notariales."
  },
  {
    "question": "¿Qué ocurre si los precios de la vivienda bajan y el saldo supera el valor del inmueble?",
    "answer": "Entraría en patrimonio negativo (underwater). La obligación de pago mensual permanece intacta, pero no podrá refinanciar ni vender sin aportar capital."
  },
  {
    "question": "¿Cuánto tiempo se tarda en aprobar y desembolsar el préstamo?",
    "answer": "El proceso suele durar entre 2 y 6 semanas debido a los requisitos de tasación, verificación de ingresos y suscripción hipotecaria."
  }
];

export const seo = {
  title: "Calculadora de Préstamo con Garantía Hipotecaria — Deuda Total Máxima",
  description: "Calcule cuotas fijas de préstamos sobre el valor neto de la vivienda, CLTV, TAE real, amortización y capacidad de endeudamiento.",
  keywords: ["calculadora de prestamo con garantia hipotecaria","segunda hipoteca","calculadora cltv","valor neto vivienda"]
};

export const ContentComponent = function HomeEquityContentES() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculadora de Préstamo con Garantía Hipotecaria
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calcule cuotas fijas de préstamos sobre el valor neto de la vivienda, capacidad máxima de endeudamiento, ratio préstamo-valor combinado (CLTV), TAE real, amortización en dos fases, ahorro por pagos extraordinarios, ratio deuda-ingresos (DTI) y previsiones de valor añadido por reformas.
        </p>
      </div>

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. ¿Qué es una Calculadora de Préstamo con Garantía Hipotecaria?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Una calculadora de préstamos con garantía hipotecaria estima cuánto puede pedir prestado contra el valor neto acumulado en su propiedad y modela la cuota mensual de una segunda hipoteca a tipo de interés fijo. El cálculo combina el valor de mercado de la vivienda, el saldo de la primera hipoteca, el límite de CLTV, el importe solicitado, el tipo de interés y los costes de cierre.
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Se diferencia fundamentalmente de una línea de crédito con garantía hipotecaria (HELOC). Un préstamo sobre el valor líquido es un préstamo en suma única con pagos fijos y amortización estructurada, mientras que una HELOC es una línea de crédito renovable a tipo variable.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Aviso del Modelo de Suscripción</span>
          </div>
          <p>
            El resultado calculado es una simulación matemática y no un compromiso vinculante de préstamo. Los tipos de interés reales, comisiones y límites de crédito dependen de la evaluación del prestamista.
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Cómo Utilizar la Calculadora de Préstamo con Garantía Hipotecaria
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Siga estos pasos sistemáticos para evaluar su capacidad de financiación:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Introduzca el valor estimado de mercado de la vivienda.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Introduzca el saldo actual de la primera hipoteca.</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Seleccione el límite máximo de CLTV (80% estándar, 85% o 90%).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Elija el Modo A (importe deseado) o el Modo B (capacidad máxima de endeudamiento).</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Indique el tipo de interés fijo anual y el plazo en años (15 o 30 años).</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Introduzca los costes de cierre iniciales estimados.</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Seleccione el tratamiento de los costes de cierre (Efectivo, Deducido o Financiado).</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Revise la cuota mensual fija calculada.</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Verifique el capital máximo disponible, el CLTV posterior y la TAE real.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Consulte la tabla de amortización completa y expórtela a CSV.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Simule pagos extraordinarios para comprobar el ahorro en intereses.</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Compare el resultado con los escenarios de HELOC y refinanciación cash-out.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Compruebe la preparación crediticia mediante el ratio DTI y deducciones fiscales.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Guarde el escenario en su historial local antes de probar nuevas cifras.</span>
            </div>
        </div>
      </section>

      {/* 3. CLTV */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Valor Neto de la Vivienda y Ratio Préstamo-Valor Combinado (CLTV)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La fórmula central de capacidad de endeudamiento parte de la deuda total máxima permitida según el límite de CLTV:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Deuda Total Máxima = Valor de la Vivienda × Límite CLTV"}</div>
          <div>{"Capital Máximo Prestado = Deuda Total Máxima - Saldo Primera Hipoteca"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Ejemplo: Para una vivienda de 500.000 $ con una hipoteca existente de 275.000 $ y un límite de CLTV del 80%, la deuda máxima total admisible es de 400.000 $. Restando los 275.000 $ de la primera hipoteca, el capital disponible para la segunda hipoteca es de 125.000 $. El CLTV final resultante es del 80,0% con un 20,0% (100.000 $) de patrimonio protegido.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Esto permite calcular con precisión el margen de seguridad financiero sin poner en riesgo la vivienda ante variaciones del mercado.
        </p>
      </section>

      {/* 4. MODE A VS B */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Modo A frente a Modo B: Préstamo Específico frente a Capacidad Máxima
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La calculadora permite simular dos enfoques de endeudamiento complementarios:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Modo A — Importe de Préstamo Específico</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">Permite fijar una cantidad exacta (por ejemplo, 125.000 $) para reformas o consolidación de deuda y calcular la cuota exacta requerida.</p>
          </div>
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-blue-600 text-sm">Modo B — Capacidad Máxima según LTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">Calcula automáticamente el importe máximo financiable hasta alcanzar el techo de CLTV establecido (por ejemplo, 80% o 85%).</p>
          </div>
        </div>
      </section>

      {/* 5. FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Fórmula de la Cuota Mensual Fija
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La cuota mensual fija (M) se calcula mediante la fórmula estándar de anualidades financieras:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"M = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          M = P × [r(1+r)^n] / [(1+r)^n - 1], donde P es el capital prestado, r es el tipo de interés mensual (tipo anual / 12) y n es el número total de pagos mensuales. Para 125.000 $ al 8,50% a 15 años (180 meses), la cuota mensual fija es exactamente 1.230,94 $.
        </p>
      </section>

      {/* 6. ZERO INTEREST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Comportamiento del Motor con Interés Cero
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          En escenarios promocionales al 0% de interés, el motor aplica la división lineal directa: M = P / n.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Para un préstamo de 125.000 $ a 15 años con interés del 0%, la cuota resultante es de 694,44 $ al mes durante 180 meses sin coste por intereses.
        </p>
      </section>

      {/* 7. AMORTIZATION */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Tabla de Amortización de la Segunda Hipoteca
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La amortización se desglosa periodo a periodo calculando el interés devengado sobre el saldo insoluto.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Beginning Balance / Saldo Inicial"}: $125,000</div>
          <div>• {"Annual Payment / Pago Anual"}: $14,335</div>
          <div>• {"Principal Paid / Capital"}: $4,497</div>
          <div>• {"Interest Paid / Intereses"}: $9,837</div>
          <div>• {"Ending Balance / Saldo Final"}: $120,503</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          En el primer mes de un préstamo de 125.000 $ al 8,50%, de la cuota de 1.230,94 $, 885,42 $ corresponden a intereses y 345,52 $ a amortización de principal, reduciendo el saldo a 124.654,48 $.
        </p>
      </section>

      {/* 8. APR */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. TAE Real y Costes de Cierre
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La Tasa Anual Equivalente (TAE) refleja el coste financiero efectivo incorporando los costes de cierre iniciales (tasación, comisiones de originación, registro).
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• {"Financed Loan"}: $125,000 | {"Nominal Rate"}: 8.0% | {"Term"}: 15 Years</div>
          <div>• {"Closing Costs"}: $2,500</div>
          <div>• {"Displayed True APR"}: <strong>8.10% / 8.82%</strong></div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Para 125.000 $ con un tipo nominal del 8,50% y 2.500 $ en costes de cierre pagados en efectivo, la TAE real calculada es del 8,82%, reflejando el rendimiento financiero exacto.
        </p>
      </section>

      {/* 9. CLOSING COSTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Modos de Tratamiento de los Costes de Cierre
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La calculadora evalúa tres modalidades de liquidación de gastos de cierre:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Paid Upfront in Cash"}</div>
            <p className="text-slate-600 dark:text-slate-400">1. Pago en Efectivo: Se abonan al cierre sin alterar el principal financiado. 2. Deducido del Préstamo: El principal sigue siendo 125.000 $, pero usted recibe 122.500 $ netos. 3. Financiado: El saldo inicial aumenta a 127.500 $, incrementando la cuota mensual a 1.255,56 $.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Deducted from Proceeds"}</div>
            <p className="text-slate-600 dark:text-slate-400">Esta comparativa permite elegir la estructura más ventajosa para su liquidez inmediata.</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
            <div className="font-extrabold text-blue-600">{"Financed into Loan"}</div>
            <p className="text-slate-600 dark:text-slate-400">1. Pago en Efectivo: Se abonan al cierre sin alterar el principal financiado. 2. Deducido del Préstamo: El principal sigue siendo 125.000 $, pero usted recibe 122.500 $ netos. 3. Financiado: El saldo inicial aumenta a 127.500 $, incrementando la cuota mensual a 1.255,56 $.</p>
          </div>
        </div>
      </section>

      {/* 10. DTI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Ratio Deuda-Ingresos (DTI) y Preparación Crediticia
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Los prestamistas evalúan el ratio DTI posterior al préstamo para comprobar su solvencia:
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"DTI % = [(Housing Payments + Other Debts) / Gross Income] × 100"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          DTI Posterior = (Cuota Hipotecaria Existente + Nueva Cuota 2ª Hipoteca + Otras Deudas) / Ingresos Brutos Mensuales. Un DTI del 36% o inferior es óptimo, mientras que entre el 43% y el 50% requiere compensaciones crediticias.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Para unos ingresos de 8.500 $ con una hipoteca de 1.850 $ y deudas de 500 $, la nueva cuota de 1.230,94 $ sitúa el DTI en el 42,1%, dentro del margen estándar de aprobación.
        </p>
      </section>

      {/* 11. CREDIT TIERS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Puntuación Crediticia y Niveles de Calificación CLTV
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La puntuación de crédito determina el CLTV máximo y el tipo de interés disponible:
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Puntuaciones superiores a 740 acceden a CLTV de hasta el 85%–90% con tipos preferentes, entre 680 y 739 al 80%–85%, y entre 620 y 679 suelen limitarse al 80% de CLTV.
        </p>
      </section>

      {/* 12. HELOAN VS HELOC */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Préstamo con Garantía Hipotecaria frente a HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          El préstamo sobre el valor líquido ofrece tipo fijo y certidumbre en las cuotas desde el primer día.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Fixed Second Mortgage: $717 - $1,231/mo</div>
          <div>• HELOC (Interest-Only Draw): $578/mo</div>
          <div>• Cash-Out Refinance: $2,296/mo</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La línea HELOC ofrece flexibilidad de disposición a tipo variable durante el periodo de disposición (draw), pero expone al prestatario a incrementos de tipo y al salto de cuota al iniciar el periodo de amortización.
        </p>
      </section>

      {/* 13. HELOAN VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Préstamo con Garantía frente a Refinanciación con Retiro de Efectivo
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Un préstamo con garantía hipotecaria preserva el tipo de interés favorable de su primera hipoteca.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La refinanciación cash-out sustituye toda la deuda existente por un nuevo préstamo al tipo de mercado actual, lo que resulta desfavorable si su hipoteca actual tiene un tipo significativamente inferior.
        </p>
      </section>

      {/* 14. EXTRA PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Pagos Extra de Capital y Ahorro en Intereses
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Añadir pagos mensuales extraordinarios acelera la amortización y reduce sustancialmente el coste total.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Extra Monthly Payment: $100 - $150/month</div>
          <div>• Accelerated Term: 146 - 156 months</div>
          <div>• Time Saved: 24 - 34 months shaved off</div>
          <div>• Lifetime Interest Saved: $16,400 - $19,341</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          En el préstamo de 125.000 $ al 8,50%, un pago extra de 100 $ al mes acorta el plazo en 24 meses y ahorra más de 16.400 $ en intereses totales.
        </p>
      </section>

      {/* 15. IRS TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Estimación de Deducibilidad Fiscal (Normativa IRS)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Conforme a la normativa tributaria vigente (IRS Pub 936 / TCJA), los intereses hipotecarios solo son deducibles si el dinero se utiliza para comprar, construir o mejorar sustancialmente la vivienda habitual.
        </p>
        <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"Tax Savings = Deductible Interest × Marginal Tax Rate"}
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Si los fondos se destinan a consolidar deudas o gastos personales, los intereses no son deducibles a efectos del impuesto sobre la renta.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Para una persona en el tramo marginal del 24% con 9.800 $ de intereses deducibles en el primer año, el ahorro fiscal estimado es de 2.352 $.
        </p>
      </section>

      {/* 16. RENOVATION ROI */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Previsión de Valor Añadido por Reformas en el Hogar
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Las mejoras estructurales en la vivienda pueden incrementar el valor de tasación y recuperar parte del capital invertido.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>• Project Cost: $50,000 @ 70% ROI</div>
          <div>• Value Added: $35,000 ($50,000 × 70%)</div>
          <div>• Projected Post-Remodel Value: $535,000</div>
          <div>• Resulting Net Home Equity: $210,000</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Una reforma de cocina o baño con un coste de 50.000 $ y un retorno de valor estimado del 70% añade 35.000 $ al valor del inmueble, aumentando el patrimonio neto final.
        </p>
      </section>

      {/* 17. RISKS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Riesgos de un Préstamo con Garantía Hipotecaria
        </h2>
        <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-1 text-xs text-slate-700 dark:text-slate-300">
          <div className="font-extrabold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>Security Warning & Foreclosure Risk</span>
          </div>
          <p>Al tratarse de una segunda hipoteca garantizada por el inmueble, el impago prolongado puede derivar en ejecución hipotecaria.</p>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Es fundamental planificar el flujo de caja para asumir la cuota de la segunda hipoteca junto con la hipoteca principal, los impuestos prediales y el seguro de hogar.
        </p>
      </section>

      {/* 18. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. Escenarios de Patrimonio Negativo o Vivienda Bajo el Agua
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Si el valor del mercado inmobiliario cae y la suma de hipotecas supera el valor del inmueble, se produce patrimonio negativo. Las cuotas mensuales no cambian, pero no se podrá vender ni refinanciar sin aportar fondos propios.
        </p>
      </section>

      {/* 19. PREPAYMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. Penalizaciones por Amortización Anticipada
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La gran mayoría de los préstamos hipotecarios actuales no imponen penalizaciones por pago anticipado, pero conviene revisar siempre el contrato de préstamo para confirmar la ausencia de cláusulas restrictivas.
        </p>
      </section>

      {/* 20. TIMELINES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. Costes de Cierre y Plazos de Desembolso
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Los costes de formalización suelen situarse entre el 2% y el 5% del importe financiado (1.500 $ a 4.000 $). El plazo habitual desde la solicitud hasta el desembolso es de 2 a 6 semanas.
        </p>
      </section>

      {/* 21. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Errores Comunes que Deben Evitarse
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Confundir el patrimonio total con la capacidad máxima de endeudamiento (los prestamistas exigen un margen de seguridad del 15%–20%).</li>
            <li>Olvidar que el saldo de la primera hipoteca debe restarse al calcular el CLTV disponible.</li>
            <li>Asumir que el 80% de CLTV es un límite idéntico en todas las entidades financieras.</li>
            <li>Creer que una buena puntuación crediticia garantiza la aprobación sin evaluar el ratio DTI.</li>
            <li>Comparar la cuota de la segunda hipoteca con una refinanciación sin considerar el cambio de tipo en la hipoteca principal.</li>
            <li>Ignorar los costes de cierre al calcular el coste efectivo global (TAE).</li>
            <li>Suponer que todos los intereses son automáticamente deducibles sin cumplir los requisitos de mejora de la vivienda.</li>
            <li>Pensar que cada euro gastado en reformas aumenta en la misma proporción el valor de tasación.</li>
            <li>Aumentar el endeudamiento sin mantener un fondo de reserva ante fluctuaciones de ingresos.</li>
            <li>Tomar decisiones financieras complejas sin consultar simulaciones matemáticas contrastadas.</li>
          </ul>
        </div>
      </section>

      {/* 22. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. Resumen de Fórmulas Fundamentales
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Deuda Total Máxima:</strong>  Valor de la Vivienda × Límite CLTV</div>
          <div>• <strong>Capital Máximo Disponible:</strong>  max(0, Deuda Total Máxima - Saldo Primera Hipoteca)</div>
          <div>• <strong>CLTV Posterior:</strong>  (Saldo 1ª Hipoteca + Saldo 2ª Hipoteca) / Valor de la Vivienda × 100</div>
          <div>• <strong>Patrimonio Protegido:</strong>  100% - CLTV Posterior</div>
          <div>• <strong>Cuota Mensual Fija:</strong>  P × [r(1+r)^n] / [(1+r)^n - 1]</div>
          <div>• <strong>Ratio DTI Posterior:</strong>  (Gastos Vivienda + Deudas Mensuales) / Ingresos Brutos × 100</div>
          <div>• <strong>Ahorro Fiscal Estimado:</strong>  Intereses Deducibles Anuales × Tipo Impositivo Marginal</div>
        </div>
      </section>

      {/* 23. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Orientación Educativa y Aviso Regulatorio</span>
        </div>
        <p>
          Los préstamos con garantía hipotecaria están sujetos a la Ley de Veracidad en el Préstamo (TILA), la Ley de Procedimientos de Liquidación de Bienes Raíces (RESPA) y las publicaciones del IRS. Esta herramienta proporciona cálculos orientativos con fines educativos.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "es",
  calculatorSlug: "home-equity-loan-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
