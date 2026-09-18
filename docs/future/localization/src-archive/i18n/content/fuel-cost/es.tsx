"use client";

import React from "react";
import Link from "next/link";
import { CalculatorFAQ } from "@/calculators/types";

export const SPANISH_FUEL_COST_SEO = {
  title: "Calculadora de Costo de Combustible — Viajes, Traslados y Ahorro VE",
  description:
    "Calcule con exactitud el gasto de combustible para viajes en carretera, traslados diarios de trabajo, rendimiento en MPG y L/100km, comparación de costo con vehículos eléctricos y emisiones de CO₂.",
  keywords: [
    "calculadora de costo de combustible",
    "calculadora de gasolina para viajes",
    "gasto de gasolina viaje",
    "calcular costo por kilometro gasolina",
    "calcular consumo combustible",
    "ahorro vehiculo electrico vs gasolina",
    "presupuesto combustible trabajo",
  ],
};

export const SPANISH_FUEL_COST_FAQS: CalculatorFAQ[] = [
  {
    question: "¿Cómo calculo el costo de combustible para un viaje?",
    answer:
      "Divida la distancia total del viaje entre el rendimiento del vehículo (MPG o km/L) para obtener el volumen de combustible necesario y luego multiplíquelo por el precio unitario del combustible.",
  },
  {
    question: "¿Cuánta gasolina necesito para 300 millas a 25 MPG?",
    answer:
      "Necesita exactamente: 300 ÷ 25 = 12 galones. A un precio de $3.50 por galón, el costo total de combustible es de $42.00.",
  },
  {
    question: "¿Cómo calculo el costo de combustible para un viaje redondo (ida y vuelta)?",
    answer:
      "Multiplique por dos la distancia de ida antes de dividir entre el rendimiento. Para 300 millas de ida: 600 ÷ 25 = 24 galones. A $3.50/galón, el gasto es de $84.00.",
  },
  {
    question: "¿Cómo calculo el gasto mensual de combustible para ir al trabajo?",
    answer:
      "Calcule su consumo diario de combustible, multiplíquelo por el precio por galón y luego por el número de días laborables al mes. Para 300 millas/día a 25 MPG y $3.50/galón: $42/día × 22 días = $924.00 al mes.",
  },
  {
    question: "¿Cómo calculo el MPG real a partir del odómetro?",
    answer:
      "Reste la lectura inicial del odómetro de la lectura final y divida la distancia recorrida entre los galones repostados: MPG = (Odómetro Final − Odómetro Inicial) ÷ Galones Repostados. Ejemplo: de 10,000 a 10,350 millas con 14 galones resulta en 25.00 MPG.",
  },
  {
    question: "¿Cuál es la diferencia entre MPG y L/100km?",
    answer:
      "MPG expresa la distancia recorrida por unidad de volumen (mayor valor indica mayor eficiencia), mientras que L/100km mide los litros consumidos por cada 100 kilómetros recorridos (menor valor indica mayor eficiencia).",
  },
  {
    question: "¿Cómo convierto 25 MPG a L/100km?",
    answer:
      "Para MPG estadounidense: 235.214583 ÷ 25 ≈ 9.41 L/100km. La constante de conversión es distinta para galones imperiales (282.481) porque el galón británico es mayor (4.546 L vs 3.785 L).",
  },
  {
    question: "¿Cuál es la diferencia entre un galón estadounidense y un galón imperial?",
    answer:
      "Un galón estadounidense equivale a 3.785412 litros, mientras que un galón imperial (Reino Unido) equivale a 4.54609 litros. Por ello, el mismo valor numérico de MPG representa consumos físicos diferentes.",
  },
  {
    question: "¿Conducir a mayor velocidad incrementa el consumo de combustible?",
    answer:
      "Sí. La fuerza de resistencia aerodinámica aumenta proporcionalmente al cuadrado de la velocidad (v²), mientras que la potencia requerida para vencer dicha resistencia se incrementa de forma cúbica (v³).",
  },
  {
    question: "¿El aire acondicionado aumenta el consumo de gasolina?",
    answer:
      "Sí, incrementa la carga del motor al accionar el compresor. El impacto varía según la temperatura ambiente, velocidad, tamaño del habitáculo y eficiencia del sistema de climatización.",
  },
  {
    question: "¿El peso adicional del vehículo incrementa el gasto de combustible?",
    answer:
      "Sí. Una mayor masa vehicular exige más energía para acelerar, especialmente en conducción urbana con paradas y arranques frecuentes.",
  },
  {
    question: "¿Tener baja presión en los neumáticos aumenta el consumo?",
    answer:
      "Los neumáticos desinflados aumentan la resistencia a la rodadura y elevan el consumo. Se recomienda mantener siempre la presión en frío indicada por el fabricante del vehículo.",
  },
  {
    question: "¿Cuánto puedo ahorrar compartiendo viaje (carpooling)?",
    answer:
      "Si el costo total del viaje es de $42.00, dividirlo en partes iguales entre 4 pasajeros reduce el costo individual a $10.50 por persona.",
  },
  {
    question: "¿Es un vehículo eléctrico (VE) siempre más económico que uno de gasolina?",
    answer:
      "No necesariamente. Depende del precio local del kilovatio-hora, el precio de la gasolina, la eficiencia del VE (kWh/100mi), la eficiencia del vehículo térmico (MPG) y el tipo de recarga (doméstica vs carga rápida pública).",
  },
  {
    question: "¿Cómo se calcula el costo de carga de un VE para un trayecto?",
    answer:
      "Para un VE con consumo especificado en kWh/100 millas: Energía Total = (Distancia ÷ 100) × kWh/100mi. Luego: Costo de Carga = Energía Total × Tarifa Eléctrica ($/kWh).",
  },
  {
    question: "¿Qué ocurre cuando el costo del VE es superior al de la gasolina?",
    answer:
      "El resultado se presenta como una 'Prima del VE' (gasto adicional) en lugar de un ahorro negativo. Si la gasolina cuesta $42 y la recarga eléctrica cuesta $72, la prima del VE es de $30 por viaje.",
  },
  {
    question: "¿Cómo se calculan las emisiones de CO₂ de la gasolina?",
    answer:
      "Se aplica el factor de combustión directa documentado por la EPA de 8.887 kg de CO₂ por galón de gasolina (o 2.348 kg de CO₂ por litro).",
  },
  {
    question: "¿Representan estos valores de CO₂ las emisiones de ciclo de vida completo?",
    answer:
      "No. Este valor corresponde únicamente a las emisiones directas del tubo de escape generadas por la combustión. No incluye la extracción, refinación ni transporte del combustible.",
  },
  {
    question: "¿Por qué mi gasto real de combustible puede variar respecto a la calculadora?",
    answer:
      "Factores dinámicos como el tráfico, viento en contra, pendientes, estilo de conducción, carga de pasajeros, equipaje en el techo y variaciones de precio en las estaciones de servicio afectan el costo real.",
  },
  {
    question: "¿Incluye esta calculadora el costo total de propiedad del vehículo?",
    answer:
      "No. Esta herramienta se enfoca en el combustible y gastos directos de viaje (peajes y estacionamiento). No incluye depreciación, seguro vehicular, financiamiento ni mantenimiento mayor.",
  },
];

export function SpanishFuelCostContent() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto font-sans leading-relaxed text-slate-800 dark:text-slate-200">
      {/* ═══════════════════ CALCULADORAS RELACIONADAS — ARRIBA ═══════════════════ */}
      <section className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-4 text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Calculadoras Relacionadas
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/es/calculators/gas-mileage-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Calculadora de Rendimiento de Gasolina</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
          </Link>
          <Link
            href="/es/calculators/mileage-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Calculadora de Kilometraje</span>
          </Link>
        </div>
      </section>

      {/* ═══════════════════ ARTÍCULO EDUCATIVO COMPLETO ═══════════════════ */}
      <article className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8 text-sm sm:text-base leading-relaxed">
        {/* Sección 1 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            1. ¿Qué es una Calculadora de Costo de Combustible?
          </h2>
          <p>
            Una calculadora de costo de combustible estima con precisión matemática qué volumen de combustible requerirá un vehículo para completar un determinado trayecto y cuánto dinero costará dicho repostaje a una tarifa establecida por unidad de volumen.
          </p>
          <p>
            La relación matemática fundamental es directa:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Combustible Necesario = Distancia ÷ Rendimiento del Vehículo
          </div>
          <p>
            Cuando la distancia se mide en millas y el rendimiento en millas por galón (MPG):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Combustible Necesario (gal) = Distancia (mi) ÷ MPG
          </div>
          <p>
            Una vez conocido el volumen requerido de combustible:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Gasto de Combustible = Combustible Necesario × Precio del Combustible
          </div>
          <p>
            Este cálculo básico adquiere una utilidad práctica inmensamente mayor cuando incorpora viajes redondos, frecuencias de traslado laboral, penalizaciones de eficiencia por factores reales, peajes, estacionamiento, conversiones de unidades y comparativas frente a vehículos eléctricos (VE).
          </p>
          <p>
            Esta Calculadora de Costo de Combustible integra todos estos escenarios para que pueda presupuestar desde una escapada por carretera hasta el gasto anual acumulado de su traslado diario.
          </p>
        </section>

        {/* Sección 2 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            2. Cómo Calcular el Costo de Combustible
          </h2>
          <p>
            Supongamos que un vehículo recorre la siguiente distancia:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            300 millas
          </div>
          <p>
            con un rendimiento promedio de:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            25 MPG
          </div>
          <p>
            El volumen de combustible requerido es:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            300 ÷ 25 = 12 galones
          </div>
          <p>
            A un precio establecido de:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            $3.50 por galón
          </div>
          <p>
            el gasto total en combustible resulta:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            12 × $3.50 = $42.00
          </div>
          <p>
            Por lo tanto: 300 millas a 25 MPG tienen un costo exacto de $42.00 en combustible a una tarifa de $3.50/galón.
          </p>
          <p>
            El motor de cálculo de producción verifica rigurosamente este valor de referencia.
          </p>
          <p>
            La fórmula no requiere bases de datos propietarias: opera directamente con la distancia, la eficiencia y el precio unitario del carburante.
          </p>
        </section>

        {/* Sección 3 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            3. Cómo se Calcula el Costo de Combustible para un Viaje por Carretera
          </h2>
          <p>
            Para un trayecto de solo ida:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            Combustible = Distancia ÷ MPG
          </div>
          <p>
            Para un viaje redondo (ida y vuelta):
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            Combustible = (2 × Distancia de Ida) ÷ MPG
          </div>
          <p>
            Por ejemplo:
          </p>
          <p>
            Distancia de ida: 300 millas. Distancia total de ida y vuelta: 600 millas. A 25 MPG, el combustible necesario es:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            600 ÷ 25 = 24 galones
          </div>
          <p>
            A $3.50 por galón:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            24 × $3.50 = $84.00
          </div>
          <p>
            La calculadora verifica este caso de viaje redondo: 600 millas, 24 galones y $84.00. Para estimaciones de distancias entre ubicaciones, la{" "}
            <Link
              href="/es/calculators/mileage-calculator"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Calculadora de Kilometraje
            </Link>{" "}
            proporciona la distancia de base necesaria.
          </p>
        </section>

        {/* Sección 4 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            4. ¿Qué es el Costo por Milla?
          </h2>
          <p>
            El costo por milla describe el gasto monetario exclusivo de combustible necesario para desplazar el vehículo una sola milla.
          </p>
          <p>
            Para un vehículo de gasolina convencional:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            Costo por Milla = Precio del Combustible por Galón ÷ MPG
          </div>
          <p>
            Con una gasolina a $3.50/galón y un rendimiento de 25 MPG:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            $3.50 ÷ 25 = $0.14 por milla
          </div>
          <p>
            Es fundamental señalar que esta métrica refleja exclusivamente el consumo energético de combustible.
          </p>
          <p>
            Si se integran peajes, estacionamiento, mantenimiento preventivo, seguro, depreciación o financiamiento, el resultado corresponde al costo total de operación y no al costo marginal de combustible por milla.
          </p>
        </section>

        {/* Sección 5 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            5. Cómo se Calcula el Costo de Combustible para Traslados Diarios (Commute)
          </h2>
          <p>
            El traslado diario al trabajo difiere de un viaje único porque es un ciclo recurrente en el calendario laboral.
          </p>
          <p>
            Supongamos un traslado diario de ida y vuelta de: 300 millas. Rendimiento: 25 MPG. Precio de combustible: $3.50/galón. Días laborables al mes: 22 días.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Combustible diario: 300 ÷ 25 = 12 galones</p>
            <p>Gasto diario de combustible: 12 × $3.50 = $42.00</p>
            <p>Combustible mensual: 12 × 22 = 264 galones</p>
            <p>Gasto mensual de combustible: 264 × $3.50 = $924.00</p>
            <p>Gasto anual proyectado: $924.00 × 12 = $11,088.00</p>
          </div>
          <p>
            La calculadora verifica con precisión: $42.00/día, $210.00/semana (5 días), $924.00/mes y $11,088.00/año.
          </p>
          <p>
            El cálculo asume que los días laborales ingresados representan fielmente la frecuencia de traslados reales del usuario.
          </p>
        </section>

        {/* Sección 6 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            6. Distancia de Traslado de Ida vs Viaje Redondo
          </h2>
          <p>
            Esta confusión constituye uno de los errores más frecuentes en la planificación de presupuestos de combustible.
          </p>
          <p>
            Una distancia de traslado declarada de 30 millas puede significar 30 millas en un solo sentido o 30 millas totales de ida y vuelta. Ambas cantidades generan estimaciones completamente diferentes.
          </p>
          <p>
            Si 30 millas representa solo la ida, el recorrido diario real es:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            60 millas → A 25 MPG: 60 ÷ 25 = 2.4 galones por día
          </div>
          <p>
            Si 30 millas ya incluye el viaje completo de ida y vuelta:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            30 millas → A 25 MPG: 30 ÷ 25 = 1.2 galones por día
          </div>
          <p>
            Verifique siempre la naturaleza de su parámetro de distancia antes de proyectar gastos periódicos.
          </p>
          <p>
            Nuestra calculadora especifica explícitamente sus referencias para evitar ambigüedades en las cantidades diarias y mensuales.
          </p>
        </section>

        {/* Sección 7 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            7. Cómo Funciona la Calculadora de Rendimiento MPG
          </h2>
          <p>
            El módulo de cálculo de MPG obtiene el rendimiento real en función del avance del odómetro y los galones repostados.
          </p>
          <p>
            La fórmula matemática es:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            MPG = Distancia Recorrida ÷ Galones Repostados
          </div>
          <p>
            Donde la distancia recorrida equivale a:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            Odómetro Final − Odómetro Inicial
          </div>
          <p>
            Ejemplo práctico: Odómetro inicial = 10,000 millas, Odómetro final = 10,350 millas, Combustible repostado = 14 galones.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Distancia neta: 10,350 − 10,000 = 350 millas</p>
            <p>Rendimiento efectivo: 350 ÷ 14 = 25.00 MPG</p>
          </div>
          <p>
            La herramienta calcula además el equivalente métrico: ≈ 9.41 L/100km. Para análisis de rendimiento vehicular específicos, consulte la{" "}
            <Link
              href="/es/calculators/gas-mileage-calculator"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Calculadora de Rendimiento de Gasolina
            </Link>.
          </p>
          <p>
            Este procedimiento empírico resulta mucho más fidedigno que los datos de homologación de fábrica porque refleja las condiciones reales de su vehículo y hábitos de conducción.
          </p>
        </section>

        {/* Sección 8 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            8. Cómo Medir el Rendimiento MPG Real con Precisión
          </h2>
          <p>
            Para obtener una medición empírica confiable del rendimiento de combustible:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li>Llene el tanque hasta el corte automático de la pistola de repostaje.</li>
            <li>Registre o ponga a cero el odómetro parcial.</li>
            <li>Conduzca de forma habitual hasta consumir la mayor parte del depósito.</li>
            <li>Vuelva a llenar el tanque en la misma estación o en condiciones similares.</li>
            <li>Anote la distancia exacta indicada por el odómetro.</li>
            <li>Anote el volumen exacto de galones o litros introducidos según el surtidor.</li>
            <li>Divida la distancia recorrida entre el volumen de combustible suministrado.</li>
          </ul>
          <p>
            Cuanto más constante sea el método de repostaje y las condiciones de prueba, mayor será la precisión del promedio obtenido.
          </p>
          <p>
            Un único depósito puede presentar variaciones puntuales debido a tráfico inusual, climatología adversa, topografía o carga momentánea.
          </p>
        </section>

        {/* Sección 9 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            9. Por Qué el Rendimiento Real Difiere de la Cifra Oficial Homologada
          </h2>
          <p>
            El rendimiento observado en carretera casi siempre varía respecto a los valores obtenidos en pruebas de laboratorio o ciclos de homologación EPA/WLTP.
          </p>
          <p>
            Los factores físicos determinantes incluyen:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Velocidad crucero en autopista
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Frecuencia e intensidad de aceleraciones y frenadas
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Congestión vehicular y tiempo en ralentí
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Pendientes, desniveles montañosos y altitud
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Temperatura exterior y viento en contra
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Carga útil, pasajeros y accesorios exteriores (portaequipajes)
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Presión de inflado y estado de los neumáticos
            </div>
            <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded">
              • Uso de climatizador, calefacción y cargas eléctricas
            </div>
          </div>
          <p>
            Por consiguiente, las cifras oficiales deben interpretarse como guías comparativas.
          </p>
          <p>
            El cálculo basado en sus propios registros de repostaje ofrece siempre una precisión superior para planificar sus presupuestos.
          </p>
        </section>

        {/* Sección 10 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            10. MPG frente a L/100km
          </h2>
          <p>
            MPG y L/100km evalúan la misma cualidad física empleando lógicas inversas.
          </p>
          <p>
            MPG mide la distancia que un vehículo puede recorrer con un volumen fijo de combustible (mayor valor = mayor eficiencia).
          </p>
          <p>
            L/100km mide el volumen de combustible consumido para cubrir una distancia fija de 100 kilómetros (menor valor = mayor eficiencia).
          </p>
          <p>
            Para el sistema de galones estadounidenses (U.S. MPG):
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            L/100km ≈ 235.214583 ÷ MPG
          </div>
          <p>
            Así, 25 MPG ≈ 9.41 L/100km. Para conversiones generales de magnitudes y unidades, visite la{" "}
            <Link
              href="/es/calculators/conversion-calculator"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Calculadora de Conversión
            </Link>.
          </p>
          <p>
            Nuestra calculadora procesa ambas escalas con precisión de punto flotante sin redondeos prematuros que originen pérdidas de fidelidad matemática.
          </p>
        </section>

        {/* Sección 11 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            11. Galones Estadounidenses vs Galones Imperiales
          </h2>
          <p>
            El término &quot;galón&quot; no representa el mismo volumen en todos los países anglosajones.
          </p>
          <p>
            Según las definiciones oficiales del NIST:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>1 Galón estadounidense (US gal) = 3.785412 Litros</p>
            <p>1 Galón imperial británico (UK gal) = 4.54609 Litros</p>
          </div>
          <p>
            Esta disparidad volumétrica altera la constante de conversión a L/100km:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>US MPG: L/100km ≈ 235.214583 ÷ MPG</p>
            <p>Imperial MPG: L/100km ≈ 282.481 ÷ MPG</p>
          </div>
          <p>
            Por ejemplo: 25 US MPG equivale a 9.41 L/100km, mientras que 25 Imperial MPG equivale a 11.30 L/100km.
          </p>
          <p>
            Esta distinción es indispensable para conductores en el Reino Unido, Canadá y mercados internacionales que emplean terminología imperial.
          </p>
        </section>

        {/* Sección 12 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            12. Cómo Afectan las Penalizaciones de Eficiencia al Costo de Combustible
          </h2>
          <p>
            En situaciones reales, un vehículo puede consumir sustancialmente más combustible que su promedio teórico debido a condiciones operativas adversas.
          </p>
          <p>
            Nuestra calculadora modela cuatro factores de penalización habituales:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li>Portaequipajes de techo o cofres de carga exterior</li>
            <li>Conducción a alta velocidad sostenida (&gt;65 mph / 105 km/h)</li>
            <li>Remolque de caravanas, trailers o carga pesada</li>
            <li>Clima gélido invernal y mezclas estacionales de combustible</li>
          </ul>
          <p>
            La implementación combina estos factores de forma multiplicativa compuesta, reflejando fielmente la física de la resistencia acumulada.
          </p>
          <p>
            Al reducirse la eficiencia neta, el vehículo recorre menos distancia por galón, aumentando el consumo total de combustible para el mismo kilometraje.
          </p>
        </section>

        {/* Sección 13 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            13. Por Qué la Velocidad Afecta al Consumo de Combustible
          </h2>
          <p>
            La resistencia aerodinámica guarda una relación no lineal y fuertemente dependiente de la velocidad.
          </p>
          <p>
            Para la fuerza de arrastre aerodinámico:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            F_arrastre ∝ v²
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            donde F_arrastre es la fuerza de resistencia aerodinámica y v representa la velocidad del vehículo.
          </p>
          <p>
            La potencia mecánica requerida para vencer dicha resistencia aerodinámica escala de forma aproximadamente cúbica:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            P_arrastre ∝ v³
          </div>
          <p>
            Esta ley física es crucial: mientras la fuerza resistiva se cuadruplica al duplicar la velocidad, la potencia requerida se multiplica por ocho.
          </p>
          <p>
            Por consiguiente, conducir a altas velocidades sostenidas dispara el consumo de energía incluso cuando la distancia total permanece inalterada.
          </p>
        </section>

        {/* Sección 14 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            14. Por Qué Importa la Presión de los Neumáticos
          </h2>
          <p>
            Los neumáticos con presión insuficiente se deforman más bajo la carga del vehículo, incrementando la resistencia a la rodadura y la energía necesaria para mantener el movimiento.
          </p>
          <p>
            Esto no significa que exista un porcentaje fijo universal aplicable a cualquier vehículo.
          </p>
          <p>
            El impacto real varía con el perfil del neumático, la temperatura del asfalto, la velocidad y la magnitud del desinflado.
          </p>
          <p>
            Mantenga siempre la presión en frío especificada por el fabricante del vehículo en el manual o en la etiqueta del pilar de la puerta, sin sobreinflar deliberadamente.
          </p>
        </section>

        {/* Sección 15 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            15. ¿Afecta el Peso del Vehículo al Costo de Combustible?
          </h2>
          <p>
            Una mayor masa vehicular demanda más energía cinética para acelerar desde el reposo y para remontar pendientes.
          </p>
          <p>
            El efecto no sigue una regla lineal idéntica para todos los automóviles. Depende de:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li>Ciclo de conducción y fluidez del tráfico</li>
            <li>Frecuencia e intensidad de las aceleraciones</li>
            <li>Perfil topográfico y desniveles acumulados</li>
            <li>Tipo de tren motriz y peso en orden de marcha</li>
            <li>Velocidad de crucero en autopista</li>
            <li>Eficiencia de la transmisión</li>
          </ul>
          <p>
            Retirar equipaje o carga innecesaria del maletero ayuda a optimizar el consumo, especialmente en trayectos urbanos.
          </p>
        </section>

        {/* Sección 16 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            16. Los Peajes y el Estacionamiento son Independientes del Costo de Combustible
          </h2>
          <p>
            El costo del combustible se deriva exclusivamente del consumo energético del motor y del precio del carburante.
          </p>
          <p>
            Los peajes de autopista y los pagos de estacionamiento son gastos operativos auxiliares. Nuestra herramienta los desglosa como componentes independientes:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs sm:text-sm font-semibold">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg">
              Combustible Puro
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg">
              Peajes
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg">
              Estacionamiento
            </div>
          </div>
          <p>
            Para el caso de referencia: Combustible = $42.00, Peajes = $20.00, Estacionamiento = $10.00 → Gasto Total = $72.00.
          </p>
          <p>
            Este tratamiento transparente permite presupuestar el costo integral del viaje sin distorsionar el cálculo de consumo por milla.
          </p>
        </section>

        {/* Sección 17 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            17. Cómo Compartir Viaje (Carpooling) Cambia el Costo por Persona
          </h2>
          <p>
            Supongamos un costo total del viaje de $42.00:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>1 persona: $42.00 total</p>
            <p>2 personas: $21.00 por persona</p>
            <p>3 personas: $14.00 por persona</p>
            <p>4 personas: $10.50 por persona</p>
          </div>
          <p>
            El gasto global del vehículo no disminuye por el hecho de repartirlo entre los ocupantes; lo que se reduce es la cuota individual aportada por cada viajero.
          </p>
          <p>
            La calculadora computa automáticamente la división equitativa para facilitar la organización de viajes grupales o traslados compartidos.
          </p>
        </section>

        {/* Sección 18 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            18. Costo de Gasolina frente a Costo de Carga de Vehículo Eléctrico (VE)
          </h2>
          <p>
            La comparativa frente a un vehículo eléctrico requiere emplear un modelo energético basado en kilovatios-hora (kWh).
          </p>
          <p>
            Para el vehículo de gasolina:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            Combustible Necesario = Distancia ÷ MPG
          </div>
          <p>
            Para un vehículo eléctrico especificado en kWh por cada 100 millas:
          </p>
          <div className="p-2.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded font-mono text-xs sm:text-sm">
            Energía Eléctrica = (Distancia ÷ 100) × Consumo (kWh/100mi)
          </div>
          <p>
            Supongamos un viaje de 300 millas. Auto de gasolina: 25 MPG a $3.50/galón. Vehículo eléctrico: 30 kWh/100mi a $0.15/kWh de electricidad.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Gasolina: 300 ÷ 25 = 12 galones → Costo: 12 × $3.50 = $42.00</p>
            <p>Energía VE: (300 ÷ 100) × 30 = 90 kWh → Costo: 90 × $0.15 = $13.50</p>
            <p>Ahorro neto del VE: $42.00 − $13.50 = $28.50 por viaje</p>
          </div>
          <p>
            Nuestra calculadora verifica con exactitud este caso de referencia. Para estimar costos energéticos domésticos y tarifas eléctricas, consulte la{" "}
            <Link
              href="/es/calculators/electricity-calculator"
              className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Calculadora de Electricidad
            </Link>.
          </p>
        </section>

        {/* Sección 19 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            19. Por Qué el Ahorro de un Vehículo Eléctrico Depende de la Situación
          </h2>
          <p>
            Un vehículo eléctrico no ofrece una ventaja económica fija y universal en todos los escenarios. La comparativa fluctúa según:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li>Precio de la gasolina por galón o litro</li>
            <li>Tarifa eléctrica por kilovatio-hora ($/kWh)</li>
            <li>Rendimiento del vehículo térmico de comparación (MPG)</li>
            <li>Eficiencia de consumo del VE (kWh/100mi o Wh/km)</li>
            <li>Lugar de recarga (recarga residencial nocturna vs cargadores rápidos públicos en ruta)</li>
            <li>Estructura tarifaria (tarifa plana vs discriminación horaria pico/valle)</li>
            <li>Distancia del trayecto y temperatura exterior</li>
          </ul>
          <p>
            El Centro de Datos de Combustibles Alternativos del Departamento de Energía de EE. UU. (DOE AFDC) destaca igualmente que los costos de recarga de VE varían según la tarifa eléctrica, región geográfica y ubicación de recarga.
          </p>
          <p>
            Por este motivo, la calculadora permite introducir las tarifas exactas de su caso en lugar de aplicar porcentajes de ahorro genéricos.
          </p>
        </section>

        {/* Sección 20 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            20. ¿Qué Sucede Cuando un VE Cuesta Más que la Gasolina?
          </h2>
          <p>
            Un análisis riguroso nunca debe etiquetar un sobrecosto como &quot;ahorro negativo&quot;. La calculadora gestiona adecuadamente tres estados:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm">
            <li><strong>Cuando el VE es más económico:</strong> Ahorro del VE: $X.XX por viaje</li>
            <li><strong>Cuando ambos cuestan lo mismo:</strong> Sin diferencia de costo</li>
            <li><strong>Cuando el VE resulta más costoso:</strong> Prima del VE: $X.XX adicional por viaje</li>
          </ul>
          <p>
            La interfaz presenta esta información con claridad semántica sin inducir a error al usuario.
          </p>
        </section>

        {/* Sección 21 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            21. Costo de Combustible y Emisiones de CO₂
          </h2>
          <p>
            El gasto monetario y la huella de carbono son variables relacionadas pero constituyen magnitudes físicas distintas.
          </p>
          <p>
            Para motores de gasolina, la calculadora aplica el factor oficial:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            8.887 kg de CO₂ por galón de gasolina
          </div>
          <p>
            La Agencia de Protección Ambiental de EE. UU. (EPA) documenta este mismo factor equivalente a 8,887 gramos de CO₂ por galón de gasolina consumido.
          </p>
          <p>
            Así: 12 galones × 8.887 kg/gal ≈ 106.6 kg de CO₂ emitidos, siendo este el valor de referencia de nuestra herramienta.
          </p>
          <p>
            Este resultado debe interpretarse como una estimación de emisiones directas de combustión en el tubo de escape y no como una auditoría de ciclo de vida completo (Well-to-Wheel).
          </p>
          <p>
            La EPA analiza por separado las emisiones de extracción y refinación en sus directrices de contabilidad de gases de efecto invernadero.
          </p>
        </section>

        {/* Sección 22 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            22. Factores de Emisión: Gasolina frente a Diésel
          </h2>
          <p>
            La calculadora soporta igualmente el factor de emisiones para combustible diésel:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm">
            10.18 kg de CO₂ por galón de diésel
          </div>
          <p>
            La EPA documenta 10,180 gramos de CO₂ por cada galón de diésel quemado.
          </p>
          <p>
            Estos factores representan la combustión del carburante. No deben confundirse con la huella ecológica completa que engloba extracción de crudo, refinamiento, transporte, generación eléctrica o manufactura del automóvil.
          </p>
        </section>

        {/* Sección 23 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            23. Por Qué el Precio del Combustible Influye Tanto
          </h2>
          <p>
            El precio del combustible incide linealmente en el resultado final. Si se requieren 12 galones:
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>A $3.00/galón → Costo = $36.00</p>
            <p>A $4.00/galón → Costo = $48.00</p>
            <p>A $5.00/galón → Costo = $60.00</p>
          </div>
          <p>
            El volumen de combustible no se ha modificado; únicamente varió la tarifa por galón.
          </p>
          <p>
            Este mismo principio rige para las fluctuaciones tarifarias del kilovatio-hora en vehículos eléctricos, justificando el análisis de sensibilidad al planificar desplazamientos de larga distancia.
          </p>
        </section>

        {/* Sección 24 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            24. Cómo Utilizar la Calculadora de Costo de Combustible
          </h2>
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Modo Viaje por Carretera</h3>
              <p>Introduzca la distancia, rendimiento (MPG), precio por galón, penalizaciones opcionales, peajes y estacionamiento.</p>
              <p className="text-slate-600 dark:text-slate-400">Obtenga: combustible necesario, costo total, costo por milla, CO₂ estimado y gasto total del viaje.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Modo Traslado Diario (Commute)</h3>
              <p>Introduzca la distancia diaria de ida y vuelta, MPG, precio del combustible y días laborables al mes.</p>
              <p className="text-slate-600 dark:text-slate-400">Obtenga: costo de traslado diario, semanal, mensual y anual proyectado.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Modo Calculador de MPG</h3>
              <p>Introduzca la lectura inicial del odómetro, la lectura final y el volumen de galones repostados.</p>
              <p className="text-slate-600 dark:text-slate-400">Obtenga: distancia neta recorrida, rendimiento calculado en MPG y su conversión a L/100km.</p>
            </div>
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-xl space-y-1">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Modo Comparativa VE vs Gasolina</h3>
              <p>Introduzca distancia, MPG y precio de gasolina, junto al consumo en kWh/100mi y precio de electricidad del VE.</p>
              <p className="text-slate-600 dark:text-slate-400">Obtenga: costo de gasolina, costo de electricidad y ahorro neto o prima del vehículo eléctrico.</p>
            </div>
          </div>
        </section>

        {/* Sección 25 */}
        <section className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-800 pb-2">
            25. Ejemplo Práctico Resuelto: Presupuesto Completo de Viaje
          </h2>
          <p>
            Supongamos: Distancia = 300 millas, Rendimiento = 25 MPG, Precio del combustible = $3.50/galón, Peajes = $20.00, Estacionamiento = $10.00.
          </p>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 rounded-lg font-mono text-xs sm:text-sm space-y-1">
            <p>Combustible necesario: 300 ÷ 25 = 12 galones</p>
            <p>Gasto en combustible: 12 × $3.50 = $42.00</p>
            <p>Gasto total del viaje: $42.00 + $20.00 + $10.00 = $72.00</p>
            <p>Costo de combustible por milla: $42.00 ÷ 300 = $0.14 por milla</p>
            <p>Emisiones estimadas de CO₂: 12 × 8.887 ≈ 106.6 kg de CO₂</p>
          </div>
          <p>
            Este desglose segrega claramente las cuatro variables esenciales de planificación: volumen consumido, gasto de combustible, costos auxiliares y huella de carbono directa.
          </p>
        </section>

        {/* ═══════════════════ PREGUNTAS FRECUENTES DESPLEGADAS ═══════════════════ */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 pb-1">
            Preguntas Frecuentes
          </h2>
          <div className="space-y-3">
            {SPANISH_FUEL_COST_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1.5"
              >
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-slate-100">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ═══════════════════ REFERENCIAS / FUENTES ═══════════════════ */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
            Referencias de Combustible, Emisiones y Medición
          </h2>
          <ul className="list-disc list-inside space-y-1 pl-1">
            <li>Agencia de Protección Ambiental de EE. UU. (EPA) — Calculadora de Equivalencias de Gases de Efecto Invernadero: Cálculos y Referencias</li>
            <li>Agencia de Protección Ambiental de EE. UU. (EPA) — Comparación: Su Automóvil vs un Vehículo Eléctrico</li>
            <li>Departamento de Energía de EE. UU. (DOE) — Centro de Datos de Combustibles Alternativos: Conceptos Básicos de Electricidad</li>
            <li>Departamento de Energía de EE. UU. (DOE) — Centro de Datos de Combustibles Alternativos: Preparación para Vehículos Eléctricos</li>
            <li>Instituto Nacional de Estándares y Tecnología (NIST) — Guía para el SI / Factores de Conversión de Unidades</li>
          </ul>
          <p className="text-xs pt-1">
            La EPA documenta el factor de 8,887 g de CO₂/galón para gasolina y 10,180 g de CO₂/galón para diésel, que respalda directamente los cálculos de emisiones en esta página.
          </p>
          <p className="text-xs">
            El NIST documenta la diferencia entre galones estadounidenses e imperiales, que sustenta los modos de conversión de MPG de la calculadora.
          </p>
          <p className="text-xs">
            El DOE AFDC señala que la economía de carga de vehículos eléctricos depende del precio de la electricidad, la región y el lugar de recarga.
          </p>
        </section>
      </article>

      {/* ═══════════════════ CALCULADORAS RELACIONADAS — ABAJO ═══════════════════ */}
      <section className="bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 sm:p-4 text-xs">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Calculadoras Relacionadas
        </h2>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/es/calculators/gas-mileage-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Calculadora de Rendimiento de Gasolina</span>
            <span className="text-slate-300 dark:text-slate-600">|</span>
          </Link>
          <Link
            href="/es/calculators/mileage-calculator"
            className="inline-flex items-center gap-1.5 font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <span>Calculadora de Kilometraje</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default SpanishFuelCostContent;
