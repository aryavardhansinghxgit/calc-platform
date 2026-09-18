"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "¿Qué es una línea de crédito HELOC y cómo funciona?",
    "answer": "Una HELOC es una línea de crédito rotativa garantizada por el valor neto de su vivienda que permite disponer de fondos según sea necesario durante un periodo de disposición."
  },
  {
    "question": "¿Cuánto puedo obtener en una línea HELOC?",
    "answer": "La mayoría de los prestamistas aprueban entre el 80% y el 85% del valor tasado de la vivienda menos el saldo de su primera hipoteca."
  },
  {
    "question": "¿Cómo se calculan los pagos en la fase de disposición frente a la fase de amortización?",
    "answer": "Durante la fase de disposición solo se pagan intereses mensuales sobre el saldo utilizado. En la fase de amortización se paga capital e intereses para liquidar la deuda."
  },
  {
    "question": "¿Qué es el salto de pago (payment shock) en una HELOC?",
    "answer": "Es el aumento brusco en la cuota mensual cuando finaliza el periodo de disposición de solo interés y comienza el periodo obligatorio de amortización de principal."
  },
  {
    "question": "¿Qué tipo de interés se aplica a una HELOC?",
    "answer": "Generalmente se aplica un tipo de interés variable vinculado al tipo preferencial (Prime Rate) más un margen fijado por el prestamista."
  },
  {
    "question": "¿Qué comisiones suelen acompañar a una HELOC?",
    "answer": "Pueden incluir comisiones de apertura, cuotas de mantenimiento anual (50 $ a 100 $), comisiones por inactividad y costes de tasación."
  },
  {
    "question": "¿Se pueden deducir los intereses de una HELOC?",
    "answer": "Solo son deducibles si los fondos se utilizan para adquirir, construir o mejorar sustancialmente la vivienda habitual que garantiza la línea."
  },
  {
    "question": "¿Se puede congelar o reducir una línea HELOC?",
    "answer": "Sí, los prestamistas se reservan el derecho de reducir o congelar la línea si el valor del inmueble disminuye significativamente o su perfil crediticio se deteriora."
  },
  {
    "question": "¿Qué ocurre si no utilizo la línea de crédito aprobada?",
    "answer": "No se devengan intereses si el saldo dispuesto es cero, aunque pueden aplicar comisiones de mantenimiento anual según la entidad."
  },
  {
    "question": "¿Puedo amortizar el principal durante la fase de disposición?",
    "answer": "Sí, puede realizar pagos voluntarios de capital en cualquier momento durante la fase de disposición para restablecer su límite de crédito."
  },
  {
    "question": "¿Qué puntuación de crédito se necesita para una HELOC?",
    "answer": "Se requiere habitualmente un score de 660 a 680 para calificar, y más de 720 para acceder a los mejores márgenes sobre el tipo preferencial."
  },
  {
    "question": "¿Cómo afecta una subida de tipos de interés a mi cuota?",
    "answer": "Al tener tipos variables, cualquier aumento en el tipo de referencia incrementa directamente su cuota mensual tanto en la fase de disposición como en la de amortización."
  }
];

export const seo = {
  title: "Calculadora de Línea de Crédito HELOC — Deuda Combinada Máxima",
  description: "Calcule la capacidad de endeudamiento HELOC, pagos de solo interés, cuotas de amortización, impacto por salto de pago y pruebas de estrés.",
  keywords: ["calculadora heloc","linea de credito con garantia hipotecaria","interes heloc","calculadora credito vivienda"]
};

export const ContentComponent = function HELOCContentES() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculadora de Línea de Crédito HELOC
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Estime la capacidad máxima de crédito HELOC, ratio combinado (CLTV), cuotas de solo interés en fase de disposición, pagos en fase de amortización, impacto por salto de pago (payment shock), escenarios de estrés por tipos variables y deducción fiscal.
        </p>
      </div>

      {/* 1. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. ¿Qué es una Calculadora HELOC?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Una calculadora de línea de crédito con garantía hipotecaria (HELOC) estima cuánto crédito renovable puede obtener contra el valor acumulado en su vivienda y modela el comportamiento de las cuotas en ambas fases (disposición y amortización).
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A diferencia de un préstamo fijo sobre el valor líquido, la HELOC tiene una fase de disposición (generalmente 10 años) con pagos de solo intereses opcionales, seguida de una fase de amortización obligatoria (generalmente 20 años) con pagos de capital e intereses.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Aviso del Modelo de Planificación</span>
          </div>
          <p>
            Esta herramienta es un modelo de planificación matemática y no constituye una aprobación formal de crédito. Los límites y tipos reales varían según el prestamista.
          </p>
        </div>
      </section>

      {/* 2. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Cómo Utilizar la Calculadora HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Siga estos pasos estructurados para evaluar su línea de crédito renovable :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Introduzca el valor de mercado estimado de la vivienda.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Introduzca el saldo actual de la primera hipoteca.</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Seleccione el límite máximo de CLTV (80% estándar u 85% financiamiento alto).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Indique el límite de crédito HELOC deseado.</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Introduzca el tipo de interés variable inicial.</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Elija la duración del periodo de disposición (5, 10 o 15 años) y de amortización (10, 15 o 20 años).</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Introduzca las comisiones de apertura y mantenimiento anual estimadas.</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Seleccione la estructura de pago en la fase de disposición (Solo Interés o Capital + Interés).</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Revise la capacidad máxima, el CLTV dispuesto, la cuota de disposición y la cuota de amortización.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Inspeccione el plan de amortización en dos fases y expórtelo a CSV.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Simule escenarios de estrés de tipos variables (+1%, +2%, +3% o Techo Máximo).</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Pruebe el simulador de ciclo de vida con disposiciones futuras y pagos extra.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Compare la HELOC con un préstamo fijo de segunda hipoteca y una refinanciación cash-out.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Compruebe la estimación de deducción fiscal del IRS de forma independiente.</span>
            </div>
        </div>
      </section>

      {/* 3. CAPACITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Cómo se Calcula la Capacidad de Endeudamiento HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La capacidad máxima parte de la deuda combinada permitida por el límite de CLTV seleccionado :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200 space-y-1">
          <div>{"Deuda Combinada Máxima = Valor de Mercado × Límite CLTV %"}</div>
          <div>{"Línea HELOC Máxima = max(0, Deuda Combinada Máxima - Saldo 1ª Hipoteca)"}</div>
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Ejemplo : Para una vivienda de 500.000 $ con una primera hipoteca de 260.000 $ y un CLTV máximo del 80%, la deuda combinada permitida es de 400.000 $. Restando los 260.000 $, la línea HELOC máxima calculada es de 140.000 $. Una línea solicitada de 50.000 $ genera un CLTV dispuesto del 62,0%.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Esto permite conocer con precisión el margen disponible sin comprometer la estabilidad financiera del hogar.
        </p>
      </section>

      {/* 4. DRAW VS REPAY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Fase de Disposición vs. Fase de Amortización
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La vida de una HELOC se divide en dos fases con dinámicas de pago totalmente distintas :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Durante la fase de disposición (típicamente 10 años), el prestatario puede retirar y reembolsar fondos según necesite, pagando únicamente los intereses devengados por el saldo utilizado. Al expirar la fase de disposición, la línea se cierra a nuevas disposiciones y entra en la fase de amortización (10 a 20 años), donde se paga capital e intereses obligatorios.
        </p>
      </section>

      {/* 5. INTEREST ONLY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Pagos de Solo Interés en la Fase de Disposición
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La cuota mensual de solo interés (I) se calcula multiplicando el saldo dispuesto por el tipo mensual :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          I = Saldo Dispuesto × (Tipo Anual / 12). Para 50.000 $ al 8,50%, el pago de solo interés durante la fase de disposición es de 354,17 $ al mes.
        </p>
      </section>

      {/* 6. FULL PAYMENTS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Pagos Completos en la Fase de Amortización
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Al comenzar la fase de amortización, el saldo pendiente se financia mediante cuotas fijas amortizables :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          M = P × [r(1+r)^n] / [(1+r)^n - 1]. Para un saldo de 50.000 $ al 8,50% en una fase de amortización de 20 años (240 meses), la cuota mensual pasa a ser de 433,91 $.
        </p>
      </section>

      {/* 7. PAYMENT SHOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Análisis del Salto de Pago (Payment Shock)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          El salto de pago representa el incremento porcentual y absoluto al pasar de solo interés a amortización completa.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          En el ejemplo de 50.000 $ al 8,50%, la cuota salta de 354,17 $ a 433,91 $, lo que supone un aumento de 79,74 $ (+22,5%). En periodos de amortización más cortos (10 años), la cuota subiría a 620,06 $ (+75,1%).
        </p>
      </section>

      {/* 8. STRESS TEST */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Escenarios de Estrés por Tipos de Interés Variables
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Dado que las HELOC tienen tipos variables, el prestatario debe modelar posibles subidas de tipos :
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Si el tipo sube del 8,50% al 10,50% (+2%), la cuota de disposición aumenta de 354,17 $ a 437,50 $ (+23,5%) y la cuota de amortización sube a 498,98 $ (+15,0%).
        </p>
      </section>

      {/* 9. ANNUAL FEES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Comisiones Anuales y Coste Total de Mantenimiento
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Las líneas HELOC suelen incluir una comisión anual de mantenimiento (50 $ a 100 $ al año).
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A lo largo de un ciclo completo de 30 años, 75 $ anuales acumulan 2.250 $ en comisiones que incrementan el coste efectivo total.
        </p>
      </section>

      {/* 10. MULTI DRAW */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Ciclo de Vida Multidispuesto y Pagos Extra
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          El prestatario puede simular nuevas disposiciones durante la fase de apertura o pagos voluntarios de capital.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Aportar 100 $ adicionales de capital al mes durante la fase de amortización ahorra miles de dólares en intereses y recorta varios años del plazo total.
        </p>
      </section>

      {/* 11. HELOC VS HELOAN */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. HELOC vs. Préstamo Fijo con Garantía Hipotecaria
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La HELOC destaca por su flexibilidad para gastos graduales o imprevistos con coste financiero solo por lo utilizado.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          El préstamo fijo sobre el valor líquido es preferible para gastos únicos con importe conocido, ofreciendo certidumbre total frente a subidas de tipos.
        </p>
      </section>

      {/* 12. HELOC VS CASH OUT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. HELOC vs. Refinanciación Cash-Out
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Una HELOC preserva intacta la primera hipoteca y su tipo de interés original.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          La refinanciación con retiro de efectivo cambia toda la deuda al tipo actual, lo que resulta perjudicial si su hipoteca principal tiene un tipo muy ventajoso.
        </p>
      </section>

      {/* 13. CREDIT QUAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Requisitos Crediticios y Criterios de Calificación
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Los prestamistas exigen un ratio DTI inferior al 43% y puntuaciones de crédito de 680 o superiores para condiciones óptimas.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Valores de tasación sólidos e ingresos estables son indispensables para acceder a techos de CLTV del 85%.
        </p>
      </section>

      {/* 14. TAX */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Deducibilidad Fiscal de los Intereses HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Bajo la normativa del IRS, los intereses solo son deducibles si el dinero se destina a mejoras sustanciales en la vivienda que garantiza la línea.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Los fondos utilizados para pagar tarjetas de crédito o gastos personales no generan deducción fiscal.
        </p>
      </section>

      {/* 15. FREEZE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          15. Riesgo de Congelación o Reducción de la Línea
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Los bancos pueden congelar el límite disponible si el mercado inmobiliario cae o se deteriora la solvencia del titular.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Mantener un colchón de seguridad evita depender exclusivamente de la línea de crédito ante emergencias.
        </p>
      </section>

      {/* 16. UNDERWATER */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          16. Escenarios de Patrimonio Negativo
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Si el valor del inmueble baja y el saldo total supera el valor de mercado, no se podrán solicitar nuevas disposiciones.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Las obligaciones de pago continúan vigentes según el calendario pactado.
        </p>
      </section>

      {/* 17. FIXED RATE LOCK */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          17. Opciones de Fijación de Tipo en HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Algunas entidades ofrecen opciones de tipo fijo (Fixed-Rate Lock) para convertir parte del saldo dispuesto en un préstamo a tipo fijo.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Esto permite protegerse de subidas en el tipo preferencial mientras se mantiene la flexibilidad del saldo restante.
        </p>
      </section>

      {/* 18. CLOSING AND EARLY CLOSURE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          18. Costes de Cierre y Cancelación
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Los costes de cierre oscilan entre 500 $ y 2.500 $ (o gratuitos en promociones bancarias con permanencia).
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Cerrar la línea antes de 2 a 3 años puede acarrear una comisión por cancelación anticipada (early closure fee).
        </p>
      </section>

      {/* 19. STRATEGIC USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          19. Gestión Responsable del Crédito Rotativo
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Utilizar la HELOC como fondo de maniobra para inversiones de valor añadido (reformas) y no para gastos corrientes garantiza un crecimiento patrimonial sostenible.
        </p>
      </section>

      {/* 20. TRANSITION PLANNING */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          20. Planificación Financiera para la Fase de Amortización
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Planificar con años de antelación el incremento de la cuota al término de la fase de disposición evita tensiones de tesorería y asegura una transición financiera sin sobresaltos.
        </p>
      </section>

      {/* 21. OPTIMIZATION TIPS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          21. Consejos Prácticos para Optimizar su HELOC
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Realizar amortizaciones voluntarias en la fase de disposición reduce la base de devengo de intereses y maximiza la liquidez disponible para futuras necesidades.
        </p>
      </section>

      {/* 22. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          22. Errores Frecuentes que Deben Evitarse en una HELOC
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Pagar solo intereses durante 10 años sin prever el salto brusco de cuota al iniciar la amortización.</li>
            <li>Utilizar la línea de crédito para gastos corrientes de consumo no patrimoniales.</li>
            <li>Ignorar el riesgo de subida de tipos de interés en contratos a tipo variable.</li>
            <li>Suponer que el límite de crédito estará siempre disponible sin considerar cláusulas de congelación bancaria.</li>
            <li>Olvidar sumar las comisiones anuales de mantenimiento en el coste total del crédito.</li>
            <li>Creer que los intereses son deducibles sin importar el destino de los fondos.</li>
            <li>No comparar el coste total con un préstamo de segunda hipoteca a tipo fijo.</li>
            <li>Disponer del 100% de la capacidad sin margen de seguridad ante caídas del valor de tasación.</li>
            <li>Cerrar la línea anticipadamente sin comprobar posibles penalizaciones por cancelación rápida.</li>
            <li>No simular escenarios de estrés de tipos antes de formalizar la operación.</li>
          </ul>
        </div>
      </section>

      {/* 23. CORE FORMULAS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          23. Resumen de Fórmulas Fundamentales HELOC
        </h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs text-slate-700 dark:text-slate-300">
          <div>• <strong>Deuda Combinada Máxima:</strong>  Valor de Mercado × Límite CLTV %</div>
          <div>• <strong>Línea HELOC Máxima:</strong>  max(0, Deuda Combinada Máxima - Saldo 1ª Hipoteca)</div>
          <div>• <strong>CLTV Dispuesto:</strong>  (Saldo 1ª Hipoteca + Saldo Dispuesto HELOC) / Valor de Mercado × 100</div>
          <div>• <strong>Cuota de Solo Interés:</strong>  Saldo Dispuesto × (Tipo Anual / 12)</div>
          <div>• <strong>Cuota de Amortización:</strong>  P × [r(1+r)^n] / [(1+r)^n - 1]</div>
          <div>• <strong>Salto de Pago:</strong>  (Cuota Amortización - Cuota Disposición) / Cuota Disposición × 100</div>
          <div>• <strong>Ahorro Fiscal Estimado:</strong>  Intereses Deducibles Anuales × Tipo Impositivo Marginal</div>
        </div>
      </section>

      {/* 24. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Orientación Educativa y Aviso Regulatorio</span>
        </div>
        <p>
          Las líneas de crédito con garantía hipotecaria están sujetas a la normativa TILA/RESPA y directrices bancarias. Esta herramienta proporciona cálculos matemáticos simulados con fines de planificación.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "es",
  calculatorSlug: "heloc-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
