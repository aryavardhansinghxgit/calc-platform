"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "¿Cuánto debería aportar de entrada para comprar una casa?",
    "answer": "Depende de sus ahorros y del tipo de préstamo; la mayoría de los compradores aportan entre el 3% y el 20% del precio de compra."
  },
  {
    "question": "¿Es obligatorio aportar el 20% de entrada para comprar una vivienda?",
    "answer": "No, la mayoría de los préstamos convencionales y respaldados por el gobierno permiten entradas de entre el 0% y el 5%."
  },
  {
    "question": "¿Cómo influye el pago inicial en la cuota mensual de la hipoteca?",
    "answer": "Una mayor entrada reduce el principal del préstamo, el interés acumulado y elimina o reduce la prima del seguro PMI."
  },
  {
    "question": "¿Cómo afecta la entrada al seguro hipotecario privado (PMI)?",
    "answer": "Con una entrada inferior al 20%, se requiere PMI hasta que el capital acumulado alcance al menos el 20% del valor de la vivienda."
  },
  {
    "question": "¿Cuánto dinero en efectivo necesito al cierre además de la entrada?",
    "answer": "Debe prever entre un 2% y un 5% adicional sobre el precio del inmueble para cubrir los costes de cierre e impuestos."
  },
  {
    "question": "¿Es posible comprar una casa con un 0% de entrada?",
    "answer": "Sí, mediante programas especializados como los préstamos VA (para veteranos) o préstamos USDA (para zonas rurales elegibles)."
  },
  {
    "question": "¿Cuál es la diferencia entre dar un 3%, 5%, 10% o 20% de entrada?",
    "answer": "A menor entrada, mayor es el préstamo mensual y el coste de PMI, pero se preserva liquidez para emergencias e inversiones."
  },
  {
    "question": "¿Conviene dar más entrada o invertir el dinero extra?",
    "answer": "Depende de la comparación entre el tipo de interés hipotecario neto y el rendimiento esperado de sus inversiones alternativas."
  },
  {
    "question": "¿Cómo se calcula el PMI y cuándo puede eliminarse?",
    "answer": "Cuesta entre el 0.3% y el 1.5% anual del préstamo y puede solicitarse su cancelación al 80% de LTV o automáticamente al 78% de LTV."
  },
  {
    "question": "¿Qué es el ratio préstamo-valor (LTV)?",
    "answer": "Es el importe total del préstamo dividido entre el valor tasado de la propiedad expresado en porcentaje."
  },
  {
    "question": "¿Se pueden utilizar donaciones o ayudas familiares para el pago inicial?",
    "answer": "Sí, la mayoría de los programas admiten fondos donados siempre que se documenten con una carta de donación formal."
  },
  {
    "question": "¿Cuánto tiempo me llevará ahorrar para el pago inicial?",
    "answer": "El tiempo depende de sus ingresos netos, tasa de ahorro mensual y el precio objetivo de la vivienda."
  }
];

export const seo = {
  title: "Calculadora de Pago Inicial (Entrada Hipotecaria) — Convencional 97",
  description: "Calcule la entrada requerida para comprar vivienda, comparativa de cuotas con 3%, 5%, 10% y 20%, eliminación del seguro PMI y costes de cierre.",
  keywords: ["calculadora de pago inicial","entrada hipoteca","calculadora pmi","cuanto pagar de entrada"]
};

export const ContentComponent = function DownPaymentContentES() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculadora de Pago Inicial (Entrada Hipotecaria)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Guía completa para calcular la entrada de su vivienda, requisitos mínimos por programa hipotecario, eliminación de PMI al 78% de LTV y desglose de costes de cierre.
        </p>
      </div>

      {/* SECTION 1: WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. ¿Qué es el Pago Inicial y Cómo Funciona?
        </h2>
        <p className="text-sm leading-relaxed">
          El pago inicial (o entrada) es la aportación en efectivo que realiza el comprador al adquirir un inmueble. La cantidad restante se financia mediante un préstamo hipotecario garantizado por la propiedad. La entrada determina directamente el ratio préstamo-valor (LTV) y la cuantía de las cuotas mensuales.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">Fórmulas Principales del Pago Inicial Hipotecario</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>1. Importe del Pago Inicial ($):</strong></div>
            <div className="text-center font-mono">{"Pago Inicial = Precio de Compra (P) × (% Entrada / 100)"}</div>
            
            <div className="pt-2"><strong>2. Capital del Préstamo Financiado ($):</strong></div>
            <div className="text-center font-mono">{"Importe del Préstamo = Precio de Compra - Pago Inicial"}</div>

            <div className="pt-2"><strong>3. Total Efectivo Necesario al Cierre ($):</strong></div>
            <div className="text-center font-mono">{"Efectivo al Cierre = Pago Inicial + Costes de Cierre (2% - 5%)"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW MUCH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. ¿Cuánto Pago Inicial Necesita Realmente?
        </h2>
        <p className="text-sm leading-relaxed">
          El porcentaje exigido varía según el tipo de programa de préstamo hipotecario y su perfil financiero :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">0% de Entrada</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Disponible mediante programas respaldados por el gobierno como los préstamos VA (veteranos y militares) y préstamos USDA (zonas rurales elegibles).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">3% – 3.5% de Entrada</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Los programas Convencionales 97 exigen un 3% para primeros compradores con score 620+. Los préstamos FHA requieren un 3.5% con score 580+.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">20% de Entrada</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              El umbral estándar para eliminar el seguro hipotecario privado (PMI) en préstamos convencionales y reducir al mínimo el gasto en intereses.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: 20% MYTH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. El Mito del 20% de Entrada frente a la Realidad
        </h2>
        <p className="text-sm leading-relaxed">
          Aportar el 20% elimina el PMI, pero esperar años para ahorrar esa cantidad puede implicar costes de oportunidad respecto a la evolución del mercado :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">Ventajas de Aportar el 20% de Entrada</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Ahorro inmediato de 100 $ a 300 $/mes al no pagar seguro PMI.</li>
              <li>Cuota mensual de capital e intereses sustancialmente más baja.</li>
              <li>Menor coste total de intereses a lo largo de toda la vida del préstamo.</li>
              <li>Oferta de compra más competitiva y atractiva para los vendedores.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h3 className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">Inconvenientes y Costes de Oportunidad</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Agotamiento de las reservas de efectivo y del fondo de emergencia familiar.</li>
              <li>Retrasar la compra mientras se ahorra expone a subidas de precios en el mercado.</li>
              <li>Coste de oportunidad de inmovilizar capital en lugar de diversificarlo en inversiones.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Programas Hipotecarios y Requisitos Mínimos de Entrada
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Programa de Préstamo</th>
                <th className="p-3">Entrada Mínima %</th>
                <th className="p-3">Score Mínimo</th>
                <th className="p-3">Reglas del Seguro PMI</th>
                <th className="p-3 rounded-tr-xl">Comisión Inicial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Convencional 97"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"3.0%"}</td>
                <td className="p-3">{"620"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"Se cancela al 78%–80% LTV"}</td>
                <td className="p-3 text-amber-600">{"0 $"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"Préstamo FHA"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"3.5%"}</td>
                <td className="p-3">{"580"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"Durante toda la vida (<10% entrada)"}</td>
                <td className="p-3 text-amber-600">{"1.75% UFMIP"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Préstamo VA (Veteranos)"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"0.0%"}</td>
                <td className="p-3">{"580+"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0 $ PMI Mensual"}</td>
                <td className="p-3 text-amber-600">{"1.4%–2.15% Tasa de Financiación"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"USDA Rural"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"0.0%"}</td>
                <td className="p-3">{"640"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0.35% Garantía Anual"}</td>
                <td className="p-3 text-amber-600">{"1.0% Comisión Inicial"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: PMI REMOVAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Seguro Hipotecario Privado (PMI) y Cómo Eliminarlo (80% vs. 78% LTV)
        </h2>
        <p className="text-sm leading-relaxed">
          La Ley Federal de Protección de Propietarios de Vivienda (HPA de 1998) regula la cancelación del seguro PMI en préstamos convencionales :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Cancelación a Petición del Prestatario al 80% LTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Cuando el saldo del préstamo baje al 80% del valor de compra original, tiene derecho a solicitar la cancelación del PMI por escrito.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Terminación Automática Obligatoria al 78% LTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Los prestamistas están obligados por ley a cancelar el PMI de forma automática una vez que el saldo alcance el 78% del valor original según el cuadro de amortización.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: ASSISTANCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Programas de Asistencia para el Pago Inicial (DPA)
        </h2>
        <p className="text-sm leading-relaxed">
          Existen múltiples programas estatales, del condado y municipales para apoyar a compradores calificados :
        </p>
        <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
          <li>Subvenciones a Fondo Perdido (Grants): Fondos que no requieren devolución.</li>
          <li>Segundas Hipotecas Condonables: Préstamos al 0% perdonados tras residir en la vivienda de 3 a 5 años.</li>
          <li>Préstamos de Pago Diferido: Créditos secundarios con 0% de interés a pagar al vender o refinanciar.</li>
        </ul>
      </section>

      {/* SECTION 7: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          7. Resumen Educativo
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Comprender los requisitos de entrada, los umbrales de eliminación del PMI, los costes de cierre y los costes de oportunidad permite a los compradores diseñar una estrategia equilibrada y ajustada a sus objetivos financieros.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "es",
  calculatorSlug: "down-payment-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
