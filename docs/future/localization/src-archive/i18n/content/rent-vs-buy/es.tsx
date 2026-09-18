"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "¿Es mejor alquilar o comprar una vivienda?",
    "answer": "Depende de sus planes de permanencia, precio de compra, nivel de alquileres, costes de transacción y rentabilidad de inversiones alternativas."
  },
  {
    "question": "¿Qué es el horizonte de equilibrio (breakeven)?",
    "answer": "Es el número de años necesarios para que comprar sea financieramente más ventajoso que alquilar una vivienda equivalente."
  },
  {
    "question": "¿Qué es la regla del 5% al comparar alquiler y compra?",
    "answer": "Estima los costes irrecuperables de la propiedad sumando intereses hipotecarios, impuestos prediales y mantenimiento anual."
  },
  {
    "question": "¿Cómo influye la revalorización de la vivienda?",
    "answer": "Aumenta el patrimonio neto del propietario a largo plazo, aunque no está garantizada y varía según el ciclo inmobiliario."
  },
  {
    "question": "¿Cómo afecta la subida de los alquileres a la decisión?",
    "answer": "Alquileres crecientes aumentan el gasto acumulado del inquilino, haciendo más atractiva la cuota hipotecaria fija a largo plazo."
  },
  {
    "question": "¿Cuál es el coste de oportunidad del pago inicial?",
    "answer": "Es el rendimiento financiero que habría obtenido si hubiese invertido el capital de la entrada en activos financieros diversificados."
  },
  {
    "question": "¿Qué costes ocultos tiene la compra de vivienda?",
    "answer": "Incluyen costes de cierre (2%–5%), mantenimiento periódico (1% anual), impuestos sobre bienes inmuebles y comisiones de venta futuras (5%–6%)."
  },
  {
    "question": "¿Qué es el ratio precio-alquiler (Price-to-Rent Ratio)?",
    "answer": "Es el precio de la vivienda dividido entre el alquiler anual total; ratios por debajo de 15 favorecen la compra y por encima de 20 el alquiler."
  },
  {
    "question": "¿Cómo influyen los beneficios fiscales de la hipoteca?",
    "answer": "La deducción de intereses y tributos locales puede reducir la carga impositiva neta del propietario que desgrava fiscalmente."
  },
  {
    "question": "¿Por qué el horizonte temporal de estancia es tan determinante?",
    "answer": "Porque los elevados costes de transacción iniciales requieren varios años de amortización y plusvalía para ser compensados."
  },
  {
    "question": "¿Qué ocurre con el patrimonio neto al cabo de 30 años?",
    "answer": "El comprador acumula el valor íntegro de la vivienda libre de cargas, mientras que el inquilino depende del rendimiento de su cartera de inversión."
  },
  {
    "question": "¿Cómo realizar un análisis de sensibilidad?",
    "answer": "Pruebe escenarios conservadores variando el crecimiento del alquiler, la apreciación del inmueble y el rendimiento del capital."
  }
];

export const seo = {
  title: "Calculadora de Alquilar frente a Comprar (Rent vs Buy) — Ratio = Precio de Compra / Alquiler Anual Total (Base",
  description: "Compare alquilar y comprar vivienda: cuotas hipotecarias, revalorización, inflación de alquileres, costes irrecuperables y horizonte de equilibrio.",
  keywords: ["calculadora alquilar o comprar","rent vs buy calculadora","conviene alquilar o comprar","coste oportunidad vivienda"]
};

export const ContentComponent = function RentVsBuyContentES() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-normal leading-relaxed max-w-4xl mx-auto py-4">
      {/* 1. Page Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculadora de Alquilar frente a Comprar (Rent vs Buy)
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 font-medium">
          Compare alquilar y comprar vivienda con desglose completo de costes hipotecarios, crecimiento de alquileres, apreciación del inmueble, impuestos, mantenimiento, coste de oportunidad del capital y patrimonio neto acumulado.
        </p>
      </div>

      {/* 2. What Does it Do */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          2. ¿Qué Hace Realmente una Calculadora de Alquilar frente a Comprar?
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La decisión de alquilar o comprar una vivienda no es una simple comparación entre la mensualidad de alquiler y la cuota de la hipoteca. Un análisis riguroso integra la entrada inicial, los intereses del préstamo, la amortización de principal, el IBI/impuestos prediales, seguros de hogar, mantenimiento, gastos comunitarios, costes de cierre en la compra y venta, apreciación del inmueble, inflación de rentas y el coste de oportunidad del capital inmovilizado.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Esta calculadora es un modelo financiero de planificación y simulación de escenarios. En el escenario base validado, el horizonte de equilibrio es de aproximadamente 4,8 años, favoreciendo la compra a largo plazo bajo los parámetros establecidos.
        </p>
      </section>

      {/* 3. Total Economics */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          3. La Idea Fundamental: Comparar la Economía Total, no Solo el Pago Mensual
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La cuota hipotecaria contiene dos elementos distintos: coste financiero (intereses) y ahorro forzoso (amortización de capital que genera patrimonio neto). El inquilino no asume gastos de mantenimiento ni impuestos de propiedad, pero afronta alquileres crecientes y conserva liquidez para invertir en otros activos.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Por este motivo, nuestro modelo compara flujos de caja reales, costes irrecuperables, acumulación patrimonial y patrimonio neto proyectado a lo largo del tiempo.
        </p>
      </section>

      {/* 4. How to Use */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          4. Cómo Utilizar la Calculadora
        </h2>
        <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>Introduzca el precio de compra de la vivienda y el porcentaje de entrada.</li>
          <li>Indique el tipo de interés hipotecario y el plazo del préstamo en años.</li>
          <li>Añada las estimaciones de impuestos prediales, seguro, mantenimiento y comunidad.</li>
          <li>Indique los costes de cierre al comprar y los gastos de venta futuros.</li>
          <li>Introduzca el alquiler mensual actual y la tasa anual de crecimiento de la renta.</li>
          <li>Añada el seguro de inquilino y gastos accesorios del alquiler.</li>
          <li>Establezca la rentabilidad esperada de las inversiones alternativas para el coste de oportunidad.</li>
          <li>Revise el desglose de costes comparativos de ambas opciones.</li>
          <li>Inspecione el horizonte de equilibrio (breakeven) y la tabla de duración de estancia.</li>
          <li>Evalúe el ratio precio-alquiler y la regla del 5% como indicadores complementarios.</li>
          <li>Analice la comparativa de patrimonio neto a 10, 20 y 30 años.</li>
          <li>Guarde sus escenarios para comparar diferentes hipótesis de mercado.</li>
        </ol>
      </section>

      {/* 5. Inputs Explained */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          5. Parámetros de Entrada Explicados
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.1 Precio de la Vivienda y Pago Inicial</h3>
            <p className="mt-1 leading-relaxed">Determinan el capital inicial prestado. Para 500.000 $ con un 20% de entrada, se requieren 100.000 $ en efectivo y una hipoteca de 400.000 $, afectando a intereses, costes de cierre y coste de oportunidad.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.2 Tipo de Interés Hipotecario y Plazo</h3>
            <p className="mt-1 leading-relaxed">Determinan la tabla de amortización a tipo fijo. Tipos más altos incrementan el coste irrecuperable de financiación; plazos más largos reducen la cuota mensual pero prolongan el devengo de intereses.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.3 Impuestos Prediales, Seguros, Mantenimiento y Comunidad</h3>
            <p className="mt-1 leading-relaxed">Representan la carga de propiedad periódica no recuperable. El modelo actualiza estos costes anualmente con la inflación.</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">5.4 Renta Inicial e Incremento Anual del Alquiler</h3>
            <p className="mt-1 leading-relaxed">El alquiler crece anualmente según la tasa prevista, reflejando el encarecimiento acumulativo del arrendamiento en el tiempo.</p>
          </div>
        </div>
      </section>

      {/* 6. How Mortgage Works */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          6. Cómo Funciona el Lado de la Compra Hipotecaria
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La hipoteca aplica amortización periódica constante donde cada cuota se desglosa en intereses sobre el saldo deudor y reducción de principal.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A medida que transcurren los años, la porción de intereses disminuye y la cuota amortiza más capital, acelerando la creación de patrimonio.
        </p>
      </section>

      {/* 7. Buying Costs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          7. Costes de la Compra Más Allá de la Hipoteca
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Ser propietario conlleva gastos que no generan capital: impuestos de bienes inmuebles, seguro de hogar, reparaciones estructurales y comisiones inmobiliarias de intermediación al vender (5%–6%).
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Estos costes son críticos en periodos cortos: el comprador necesita varios años de plusvalía y amortización para compensar los gastos iniciales y de salida.
        </p>
      </section>

      {/* 8. Stay Length */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          8. Por Qué el Tiempo de Estancia es el Factor Decisivo
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Los costes de entrada y salida se concentran en las transacciones, mientras que la plusvalía y el pago de principal se acumulan con los años.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          En el escenario base, el punto de equilibrio se alcanza a los 4,8 años. Estancias inferiores a 3 o 4 años suelen favorecer financieramente el alquiler.
        </p>
      </section>

      {/* 9. Breakeven Point */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          9. Explicación del Punto de Equilibrio (Breakeven)
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          El punto de equilibrio es el momento en que el coste neto acumulado de comprar se iguala y pasa a ser inferior al coste acumulado de alquilar.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A 30 años, el coste neto acumulado modelado es de 726.761 $ para la compra frente a 1.721.379 $ para el alquiler en las condiciones analizadas.
        </p>
      </section>

      {/* 10. Appreciation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          10. Apreciación y Revalorización de la Vivienda
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La revalorización anual compuesta incrementa el valor de tasación del inmueble con el paso de los años.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Con una hipótesis del 3% anual, una vivienda de 500.000 $ alcanza un valor estimado de más de 1.200.000 $ a los 30 años.
        </p>
      </section>

      {/* 11. Rent Growth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          11. Crecimiento de las Rentas de Alquiler
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Un alquiler de 3.000 $/mes con un 3% de incremento anual se convierte en 7.280 $/mes al cabo de 30 años.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Este efecto acumulativo hace que la cuota hipotecaria fija sea cada vez más ventajosa en comparación con el alquiler futuro.
        </p>
      </section>

      {/* 12. Opportunity Cost */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          12. Coste de Oportunidad de la Entrada
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La entrada inmoviliza capital. El modelo proyecta cuánto habría generado ese dinero en una cartera diversificada de inversión.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A un 5% de rentabilidad anual, 100.000 $ invertidos alcanzan más de 432.000 $ en 30 años, constituyendo el pilar patrimonial del inquilino.
        </p>
      </section>

      {/* 13. Price-to-Rent */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          13. Ratio Precio-Alquiler (Price-to-Rent)
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Se calcula dividiendo el precio de compra entre el alquiler anual (500.000 $ / 36.000 $ = 13,9).
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Ratios inferiores a 15 indican que comprar es históricamente más favorable que alquilar en esa zona.
        </p>
      </section>

      {/* 14. 5% Rule */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          14. La Regla del 5% de Costes Irrecuperables
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La regla evalúa los costes irrecuperables de la propiedad: intereses netos + impuestos + mantenimiento.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Para 500.000 $ con un coste irrecuperable del 9,63% anual, el umbral es de 4.013 $/mes frente al alquiler equivalente.
        </p>
      </section>

      {/* 15. Tax Benefits */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          15. Beneficios Fiscales y Escudo Hipotecario
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La deducción de intereses hipotecarios puede generar un ahorro impositivo en declaraciones desgravadas.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Para el primer año, el modelo estima un beneficio fiscal ilustrativo de aproximadamente 1.007 $ bajo las deducciones aplicables.
        </p>
      </section>

      {/* 16. Net Worth */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          16. Patrimonio Neto: Capital Inmobiliario vs Cartera de Inversión
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La comparación final evalúa el patrimonio neto total generado por cada opción.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A 10 años, el patrimonio inmobiliario neto modelado es de 359.958 $ frente a 162.889 $ de la cartera del inquilino.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          A 30 años, la vivienda completamente pagada representa un activo libre de cargas de gran valor.
        </p>
      </section>

      {/* 17. Scenario Drivers */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          17. Por Qué Comprar Gana en un Escenario y Alquilar en Otro
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Horizontes largos, apreciación moderada y alquileres crecientes favorecen la compra.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Estancias cortas, altos costes de transacción y mercados bursátiles muy rentables favorecen el alquiler.
        </p>
      </section>

      {/* 18. Short vs Long */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          18. Decisiones de Vivienda a Corto vs Largo Plazo
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          El alquiler proporciona máxima flexibilidad geográfica y laboral a corto plazo.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          La compra es una herramienta de estabilización de costes y acumulación patrimonial a largo plazo.
        </p>
      </section>

      {/* 19. Common Mistakes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          19. Errores Comunes que Deben Evitarse
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700 dark:text-slate-300 font-medium">
          <li>Comparar únicamente el alquiler mensual con la cuota de la hipoteca.</li>
          <li>Tratar la cuota hipotecaria como un gasto 100% perdido sin considerar la amortización de principal.</li>
          <li>Olvidar los costes periódicos de mantenimiento, IBI y seguro de hogar.</li>
          <li>Ignorar los costes de compra y las comisiones de venta futuras.</li>
          <li>Asumir que la revalorización de la vivienda está garantizada.</li>
          <li>Suponer rentabilidades bursátiles fijas sin volatilidad.</li>
          <li>Utilizar el ratio precio-alquiler como única variable de decisión.</li>
          <li>Ignorar el impacto del crecimiento compuesto de los alquileres en 10–20 años.</li>
          <li>No realizar pruebas de estrés con diferentes tipos de interés y periodos de estancia.</li>
        </ul>
      </section>

      {/* 20. Scenario Analysis */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          20. Análisis de Escenarios: La Mejor Práctica
        </h2>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Cree un escenario base, un escenario conservador de propiedad y un escenario conservador de alquiler.
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-slate-700 dark:text-slate-300">
          Modifique una variable a la vez para identificar qué factores tienen mayor impacto en su decisión personal.
        </p>
      </section>

      {/* 21. Methodology */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          21. Metodología y Fórmulas Fundamentales
        </h2>
        <div className="space-y-3 text-sm sm:text-base text-slate-700 dark:text-slate-300">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.1 Cuota Hipotecaria Fija</h3>
            <p className="mt-0.5 font-mono text-xs sm:text-sm bg-slate-50 dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-800">
              M = P × [r(1+r)^n] / [(1+r)^n - 1]
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.2 Valor Futuro de la Vivienda</h3>
            <p className="mt-0.5 leading-relaxed">Valor(t) = Valor(0) × (1 + r_apreciacion)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.3 Alquiler Futuro Escalado</h3>
            <p className="mt-0.5 leading-relaxed">Alquiler(t) = Alquiler(0) × (1 + r_inflacion_renta)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.4 Ratio Precio-Alquiler</h3>
            <p className="mt-0.5 leading-relaxed">Ratio = Precio de Compra / Alquiler Anual Total (Base: 13.9)</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.5 Coste de Oportunidad de la Inversión</h3>
            <p className="mt-0.5 leading-relaxed">Cartera(t) = Entrada Inicial × (1 + r_inversion)^t</p>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">21.6 Beneficio Fiscal Estimado</h3>
            <p className="mt-0.5 leading-relaxed">Beneficio = max(0, Deducciones Detalladas - Deducción Estándar) × Tipo Marginal</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "es",
  calculatorSlug: "rent-vs-buy-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
