"use client";

import React from "react";
import Link from "next/link";
import { CalculatorFAQ } from "@/calculators/types";

export const SPANISH_SCIENTIFIC_SEO = {
  title: "Calculadora Científica Online | Calci",
  description:
    "Calculadora científica en línea para trigonometría, logaritmos, potencias, raíces, factoriales, notación científica y expresiones complejas con modos DEG, RAD y GRAD.",
  category: "Matemáticas",
  keywords: [
    "calculadora científica",
    "calculadora científica online",
    "calcular funciones trigonométricas",
    "calcular logaritmos",
    "grados y radianes",
    "notación científica",
    "calculadora de ingeniería",
  ],
};

export const SPANISH_SCIENTIFIC_FAQS: CalculatorFAQ[] = [
  {
    question: "¿Cómo uso una calculadora científica online?",
    answer:
      "Primero identifique la operación matemática necesaria, configure el modo angular correcto si utiliza trigonometría, ingrese la expresión con paréntesis donde sea necesario, evalúela y compruebe la precisión mostrada. La calculadora admite aritmética, potencias, raíces, trigonometría, logaritmos, factoriales, memoria, historial y notación científica.",
  },
  {
    question: "¿Qué significan los botones DEG, RAD y GRAD?",
    answer:
      "Seleccionan la unidad de medida utilizada para los ángulos trigonométricos. DEG usa grados sexagesimales, RAD usa radianes y GRAD usa gradianes. Por ejemplo, sin(90) es igual a 1 en DEG, sin(pi/2) es igual a 1 en RAD y sin(100) es igual a 1 en GRAD.",
  },
  {
    question: "¿Cómo calculo seno, coseno o tangente (sin, cos, tan)?",
    answer:
      "Elija primero DEG, RAD o GRAD, luego ingrese el ángulo y la función trigonométrica correspondiente. Por ejemplo, en modo DEG ingrese sin(30) para obtener 0.5. Para trigonometría inversa, use asin, acos o atan e interprete el resultado en la unidad angular activa.",
  },
  {
    question: "¿Cómo calculo logaritmos con esta calculadora científica?",
    answer:
      "Use 'log' para logaritmos en base 10 y 'ln' para logaritmos naturales. Para cualquier otra base b, use la fórmula de cambio de base: log_b(x) = ln(x) / ln(b).",
  },
  {
    question: "¿Cómo calculo potencias y raíces?",
    answer:
      "Use el operador de potencia (^) para expresiones como 2^10 o 1.05^20. Use la raíz cuadrada o la función de raíz enésima para expresiones como sqrt(144) o la raíz cúbica de 27. Coloque la base completa o el radicando entre paréntesis cuando la expresión sea compuesta.",
  },
  {
    question: "¿Cómo uso la función de factorial (!) en una calculadora científica?",
    answer:
      "Ingrese un número entero no negativo seguido del operador factorial (!). Por ejemplo, 5! = 120. Los factoriales crecen con gran rapidez; para valores superiores a 170!, la calculadora gestiona el límite de desbordamiento en coma flotante de forma segura.",
  },
  {
    question: "¿Puedo usar esta calculadora científica para resolver ecuaciones?",
    answer:
      "Permite evaluar expresiones numéricas que aparecen en ecuaciones algebraicas y científicas. Para resolver ecuaciones algebraicas, despeje la variable de forma analítica, use la calculadora para ejecutar cada paso numérico y sustituya el valor final en la ecuación original para verificar el resultado.",
  },
  {
    question: "¿Cómo uso la calculadora científica para trigonometría y triángulos?",
    answer:
      "Use la relación pitagórica con raíces y potencias, como sqrt(a^2 + b^2), o use funciones trigonométricas inversas como atan(opuesto / adyacente). Verifique el modo angular adecuado antes de calcular la expresión.",
  },
  {
    question: "¿Cómo ingreso una fórmula de varios pasos?",
    answer:
      "Escriba la fórmula primero y luego ingrésela utilizando paréntesis para agrupar términos, potencias, raíces y denominadores. Por ejemplo, el crecimiento compuesto se ingresa como P × (1 + r)^n. Mantener la estructura completa en una sola expresión reduce errores de redondeo.",
  },
  {
    question: "¿Cuál es la diferencia entre el modo FIX y el modo SCI?",
    answer:
      "FIX muestra un número fijo de decimales seleccionados, mientras que SCI presenta el valor en notación científica normalizada. Son ajustes de presentación visual y no alteran el cálculo interno de doble precisión.",
  },
  {
    question: "¿Cómo se utilizan los botones de memoria M+, M-, MR y MC?",
    answer:
      "M+ suma el resultado actual al registro de memoria, M- lo resta, MR recupera el valor almacenado y MC borra el registro de memoria. Es de gran utilidad para cálculos sucesivos que reutilizan una misma constante.",
  },
  {
    question: "¿Por qué el resultado de una calculadora científica puede diferir de un cálculo manual?",
    answer:
      "Las causas más comunes incluyen el modo angular incorrecto (DEG/RAD/GRAD), omisión de paréntesis, precedencia de potencias con números negativos, redondeo prematuro o errores en el dominio matemático. Ingrese la expresión con paréntesis explícitos y verifique el modo angular.",
  },
];

export function SpanishScientificContent() {
  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      
      {/* 1. INTRODUCCIÓN */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introducción
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Una <strong>calculadora científica</strong> es una herramienta de computación matemática avanzada diseñada para evaluar funciones continuas, trascendentes, trigonométricas, logarítmicas, exponenciales y combinatorias más allá de la aritmética elemental. Permite a estudiantes, ingenieros y científicos computar expresiones matemáticas complejas de múltiples pasos con estricta precedencia de operadores y alta precisión en punto flotante.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-4 bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 rounded-xl">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 text-xs uppercase tracking-wider mb-1">
              Qué hace
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Evalúa funciones no lineales, razones trigonométricas, logaritmos naturales y decimales, raíces de orden arbitrario, factoriales y conversiones angulares con precisión de 64 bits.
            </p>
          </div>
          <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 rounded-xl">
            <h3 className="font-semibold text-indigo-900 dark:text-indigo-300 text-xs uppercase tracking-wider mb-1">
              Quién la usa
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Estudiantes, ingenieros, físicos, analistas cuantitativos, investigadores y científicos de datos que resuelven ecuaciones algebraicas, geométricas, de cálculo y de física aplicada.
            </p>
          </div>
          <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 rounded-xl">
            <h3 className="font-semibold text-emerald-900 dark:text-emerald-300 text-xs uppercase tracking-wider mb-1">
              Por qué es importante
            </h3>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Conecta el conteo numérico discreto con el modelado matemático continuo, resultando esencial para analizar ondas físicas, curvas de crecimiento, vectores estructurales y probabilidades.
            </p>
          </div>
        </div>
      </div>

      {/* 2. CONCEPTO MATEMÁTICO Y FUNDAMENTACIÓN TEÓRICA */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Concepto matemático y fundamentación teórica
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          El cálculo científico extiende las operaciones elementales (+, −, ×, ÷) hacia el análisis real y complejo. La teoría subyacente se apoya en marcos matemáticos fundamentales:
        </p>

        <div className="space-y-3 mt-4">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Definiciones básicas</h3>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <li>
              <strong>Funciones trascendentes:</strong> Funciones que no pueden expresarse como una secuencia finita de operaciones algebraicas (ej., sin(x), cos(x), ln(x), e<sup>x</sup>).
            </li>
            <li>
              <strong>Trigonometría del círculo unitario:</strong> Define razones trigonométricas (sin, cos, tan) en una circunferencia cartesiana x<sup>2</sup> + y<sup>2</sup> = 1 donde el ángulo &theta; se asigna a las coordenadas (x, y) = (cos &theta;, sin &theta;).
            </li>
            <li>
              <strong>Exponente y logaritmo natural:</strong> La constante de Euler e &approx; 2.718281828 sirve como base de crecimiento continuo donde d/dx(e<sup>x</sup>) = e<sup>x</sup>. El logaritmo natural ln(x) es su función inversa: ln(e<sup>x</sup>) = x.
            </li>
            <li>
              <strong>Medida en radianes frente a grados:</strong> 1 radián es el ángulo subtendido en el centro de un círculo por un arco de longitud igual al radio (2&pi; rad = 360&deg; &rArr; 1 rad = 180&deg;/&pi; &approx; 57.2958&deg;).
            </li>
          </ul>
        </div>

        <div className="space-y-2 mt-4">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">Principios e identidades fundamentales</h3>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 font-mono text-xs">
            <div>• <strong>Identidad pitagórica trigonométrica:</strong> sin²(&theta;) + cos²(&theta;) = 1</div>
            <div>• <strong>Identidad de Euler:</strong> e^(i&pi;) + 1 = 0</div>
            <div>• <strong>Cambio de base logarítmica:</strong> log<sub>b</sub>(x) = ln(x) / ln(b)</div>
            <div>• <strong>Regla exponencial inversa:</strong> x<sup>y</sup> = e^(y · ln(x)) (para x &gt; 0)</div>
          </div>
        </div>
      </div>

      {/* 3. FÓRMULAS Y DESARROLLOS EN SERIE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Fórmulas y desarrollos en serie
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Las funciones científicas se basan en definiciones analíticas y representaciones en series infinitas para su evaluación numérica de alta precisión:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <h3 className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Series de Taylor trigonométricas
            </h3>
            <div className="font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <p>sin(x) = x - x³/3! + x⁵/5! - x⁷/7! + ...</p>
              <p>cos(x) = 1 - x²/2! + x⁴/4! - x⁶/6! + ...</p>
              <p>tan(x) = sin(x) / cos(x)</p>
            </div>
            <p className="text-slate-500 dark:text-slate-400">Variables: x en radianes. El desarrollo de Taylor converge para todo x real.</p>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2">
            <h3 className="font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Series exponenciales y logarítmicas
            </h3>
            <div className="font-mono space-y-1 text-slate-800 dark:text-slate-200">
              <p>e^x = 1 + x + x²/2! + x³/3! + ...</p>
              <p>ln(x) = &int;₁ˣ (1/t) dt (para x &gt; 0)</p>
              <p>log₁₀(x) = ln(x) / ln(10)</p>
            </div>
            <p className="text-slate-500 dark:text-slate-400">Variables: x &gt; 0 para logaritmos; todo x real para exponentes.</p>
          </div>
        </div>
      </div>

      {/* 4. GUÍA DE BOTONES Y FUNCIONES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Guía de botones y funciones de la calculadora científica
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          Esta sección explica el propósito exacto, la sintaxis y el flujo de trabajo de cada familia de botones principales:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.1 Teclas numéricas y punto decimal</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Use las teclas del 0 al 9 para ingresar valores y el punto decimal para cantidades fraccionarias (ej., 25, 3.14, 0.005). Mantenga el punto dentro del número sin separadores de miles.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.2 Aritmética (+, −, ×, ÷)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Operaciones aritméticas estándar. Combine con paréntesis para agrupar términos: 250 × 0.18 calcula una tasa del 18%, mientras que (250 + 50) × 0.18 aplica la tasa a la suma.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.3 Paréntesis ( )</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Controla explícitamente el orden de evaluación. Por ejemplo, 2 × (15 + 5) = 40, mientras que 2 × 15 + 5 = 35 debido a que la multiplicación precede a la suma.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.4 Potencia / Exponente (^)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Eleva números a cualquier exponente: 2^10 = 1024, 10^-3 = 0.001. Al elevar una base negativa, enciérrela entre paréntesis: (-3)^2 = 9, mientras que -3^2 = -9. Explore la{" "}
              <Link href="/calculators/exponent-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                calculadora de exponentes
              </Link>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.5 Raíz cuadrada y raíces generales</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Evalúa raíces cuadradas (sqrt(144) = 12), cúbicas (cbrt(27) = 3) y enésimas arbitrarias (yroot(81, 4) = 3). Para simplificación de radicales, consulte la{" "}
              <Link href="/calculators/root-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                calculadora de raíces
              </Link>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.6 Factorial (!)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Calcula productos de enteros positivos descendentes: 5! = 120, 10! = 3,628,800. Los valores por encima de 170! reportan desbordamiento en coma flotante.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.7 Seno, coseno y tangente</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Calcula razones trigonométricas directas. Seleccione DEG para grados sexagesimales (sin(30) = 0.5), RAD para radianes (sin(&pi;/6) = 0.5) o GRAD para gradianes (sin(100) = 1).
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.8 Trigonometría inversa (asin, acos, atan)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Encuentra ángulos a partir de razones de lados: atan(1) genera 45° en DEG, &pi;/4 en RAD y 50 grados en modo GRAD.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.9 Logaritmos (log y ln)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Logaritmo decimal en base 10 (log(1000) = 3) y logaritmo natural (ln(e) = 1). Para bases personalizadas, use ln(x)/ln(b) o visite la{" "}
              <Link href="/calculators/log-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                calculadora de logaritmos
              </Link>.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.10 Constantes (&pi; y e)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Constantes matemáticas exactas: &pi; &approx; 3.141592653589793 y e &approx; 2.718281828459045, manteniendo máxima precisión a lo largo de cadenas operativas.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.11 Memoria (M+, M-, MR, MC)</h3>
            <p className="text-slate-600 dark:text-slate-300">
              M+ acumula en memoria, M- resta, MR recupera el valor almacenado y MC borra el registro de memoria. Permite almacenar coeficientes intermedios.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">4.12 Modos de visualización FIX y SCI</h3>
            <p className="text-slate-600 dark:text-slate-300">
              FIX formatea decimales fijos para números habituales, mientras que SCI representa valores en notación científica normalizada (a × 10<sup>b</sup>).
            </p>
          </div>
        </div>
      </div>

      {/* 5. CÓMO USARLA PARA PROBLEMAS MATEMÁTICOS COMUNES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Cómo usar la calculadora científica para problemas matemáticos habituales
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          Una guía de resolución de problemas paso a paso que muestra estructuras exactas de expresiones, modos necesarios y resultados matemáticos esperados:
        </p>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.1 Expresión aritmética básica: (25 + 15) × 0.18
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> Ingrese &apos;(&apos;, 25, &apos;+&apos;, 15, &apos;)&apos;, &apos;*&apos;, 0.18, &apos;=&apos;.<br />
              • <strong>Resultado:</strong> <strong>7.2</strong> (Los paréntesis obligan a sumar antes de multiplicar).
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.2 Cálculo de porcentajes: Hallar el 18% de 250
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> 250 * 18 / 100 o 250 * 0.18.<br />
              • <strong>Resultado:</strong> <strong>45</strong>. Para más cálculos porcentuales, explore la{" "}
              <Link href="/calculators/percentage-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                calculadora de porcentajes
              </Link>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.3 Teorema de Pitágoras: Triángulo rectángulo con catetos 3 y 4
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> sqrt(3^2 + 4^2).<br />
              • <strong>Resultado:</strong> <strong>5</strong>. Para soluciones geométricas, visite la{" "}
              <Link href="/calculators/pythagorean-theorem-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                calculadora del teorema de Pitágoras
              </Link> y la{" "}
              <Link href="/calculators/triangle-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                calculadora de triángulos
              </Link>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.4 Hallar un ángulo de un triángulo rectángulo: Opuesto = 3, Adyacente = 4
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento en modo DEG:</strong> atan(3 / 4).<br />
              • <strong>Resultado:</strong> <strong>&approx; 36.8699°</strong> (En modo RAD produce &approx; 0.6435 rad).
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.5 Interés compuesto: $2,000 al 5% anual durante 10 años
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> 2000 * (1.05)^10.<br />
              • <strong>Resultado:</strong> <strong>&approx; $3,257.79</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.6 Decaimiento exponencial: 100 × e^(-0.05 × 10)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> 100 * exp(-0.05 * 10).<br />
              • <strong>Resultado:</strong> <strong>&approx; 60.6531</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.7 Notación científica / Valores muy pequeños: 3.2 × 10^-7
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> 3.2 * 10^(-7) (Seleccione la vista SCI para salida normalizada).<br />
              • <strong>Resultado:</strong> <strong>3.2000e-7</strong> (0.00000032).
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.8 Cambio de base logarítmica: log₂(32)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> ln(32) / ln(2) o log(32) / log(2).<br />
              • <strong>Resultado:</strong> <strong>5</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.9 Combinatoria y probabilidad: 10 sobre 3
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> 10! / (3! * 7!) o nCr(10, 3).<br />
              • <strong>Resultado:</strong> <strong>120</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.10 Media ponderada: (80×2 + 90×3) ÷ (2 + 3)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> (80*2 + 90*3) / (2 + 3).<br />
              • <strong>Resultado:</strong> <strong>86</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.11 Conversión de unidades: 72 km/h a m/s
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> 72 * 1000 / 3600.<br />
              • <strong>Resultado:</strong> <strong>20 m/s</strong>. Para representaciones exactas de fracciones, pruebe la{" "}
              <Link href="/calculators/fraction-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                calculadora de fracciones
              </Link>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              5.12 Fórmula de ingeniería de varios pasos: v = d / t = 150 / 12.5
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Procedimiento:</strong> 150 / 12.5 = 12; subsecuente sqrt(12^2 + 3^2) &approx; <strong>12.3693</strong> sin redondeos intermedios.
            </p>
          </div>
        </div>
      </div>

      {/* 6. CÓMO USARLA PARA ECUACIONES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          6. Cómo usarla para ecuaciones — Qué puede y qué no puede hacer
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Una calculadora científica y un solucionador algebraico simbólico son herramientas relacionadas pero distintas. Esta calculadora científica es un <strong>evaluador de expresiones numéricas</strong> de alta precisión: calcula valores una vez ingresados los números y las funciones.
        </p>
        <div className="space-y-3 mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <p>
            • <strong>Ecuaciones lineales (ej., 3x + 7 = 25):</strong> Despeje algebraicamente a mano (3x = 18 &rArr; x = 18 ÷ 3). Use la calculadora científica para calcular la división numérica 18 ÷ 3 = 6.
          </p>
          <p>
            • <strong>Ecuaciones cuadráticas (ej., x² - 5x + 6 = 0):</strong> Factorice manualmente como (x - 2)(x - 3) = 0 y use la calculadora para comprobar las raíces por sustitución: 2^2 - 5*2 + 6 = 0 y 3^2 - 5*3 + 6 = 0.
          </p>
          <p>
            • <strong>Aproximaciones iterativas:</strong> Evalúe valores de prueba para inspeccionar residuos funcionales. Tenga en cuenta que la calculadora evalúa expresiones y no reordena simbólicamente ecuaciones de forma autónoma.
          </p>
        </div>
      </div>

      {/* 7. CÓMO COMBINAR FUNCIONES EN UNA SOLA EXPRESIÓN */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          7. Cómo combinar funciones en una sola expresión
        </h2>
        <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl space-y-2 font-mono text-xs">
          <div>• <strong>Geometría:</strong> sqrt(a^2 + b^2)</div>
          <div>• <strong>Trigonometría:</strong> atan(opuesto / adyacente)</div>
          <div>• <strong>Crecimiento compuesto:</strong> P * (1 + r)^n</div>
          <div>• <strong>Crecimiento continuo / Decaimiento:</strong> P * exp(k * t)</div>
          <div>• <strong>Logaritmo en base personalizada:</strong> ln(x) / ln(b)</div>
          <div>• <strong>Media ponderada:</strong> (x1*w1 + x2*w2) / (w1 + w2)</div>
          <div>• <strong>Notación científica:</strong> a * 10^n</div>
          <div>• <strong>Probabilidad / Combinatoria:</strong> n! / (r! * (n-r)!)</div>
        </div>
      </div>

      {/* 8. FLUJO DE TRABAJO REPETIBLE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          8. Un flujo de trabajo repetible para cualquier problema de calculadora científica
        </h2>
        <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <li><strong>Identifique el tipo de problema:</strong> Aritmética, ángulos, logaritmos, exponentes, raíces, probabilidad, geometría o tasas.</li>
          <li><strong>Escriba la fórmula</strong> antes de ingresar los valores en la calculadora.</li>
          <li><strong>Seleccione el modo angular:</strong> Elija DEG, RAD o GRAD antes de calcular funciones trigonométricas.</li>
          <li><strong>Añada paréntesis</strong> en numeradores, denominadores, exponentes y radicandos compuestos.</li>
          <li><strong>Ingrese la expresión completa</strong> sin redondear valores intermedios.</li>
          <li><strong>Evalúe y revise</strong> el resultado en modo de visualización FIX o SCI.</li>
          <li><strong>Compruebe la coherencia</strong> de la magnitud, escala de unidades y signo de la respuesta final.</li>
        </ol>
      </div>

      {/* 9. CONTENIDO MATEMÁTICO DETALLADO Y CASOS LÍMITE */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          9. Contenido matemático detallado y casos límite
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">9.1 Orden de operaciones y potencias negativas</h3>
            <p className="text-slate-600 dark:text-slate-300">
              El evaluador aplica la precedencia estándar: la exponenciación ocurre antes de la negación unaria. Por ende, -3^2 = -(3^2) = -9, mientras que (-3)^2 = 9. Encierre siempre las bases negativas entre paréntesis al elevar al cuadrado.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">9.2 Dominios trigonométricos y asíntotas</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Seno y coseno están definidos para todos los números reales con rango [-1, 1]. La tangente está indefinida en múltiplos impares de 90° (&pi;/2). Las inversas reales arcoseno/arcocoseno solo aceptan valores en [-1, 1].
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">9.3 Dominios de logaritmos</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Los logaritmos reales exigen entradas estrictamente positivas (x &gt; 0). Entradas como ln(0) o log(-5) producen errores claros de dominio indefinido.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">9.4 Precisión IEEE-754 en coma flotante</h3>
            <p className="text-slate-600 dark:text-slate-300">
              Utiliza doble precisión estándar IEEE-754 de 64 bits (53 bits de mantisa, &approx; 15–17 dígitos decimales), eliminando artefactos de visualización mediante un redondeo limpio de salida.
            </p>
          </div>

          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700 sm:col-span-2">
            <h3 className="font-bold text-slate-900 dark:text-white mb-1">9.5 Crecimiento del factorial y límites de desbordamiento</h3>
            <p className="text-slate-600 dark:text-slate-300">
              El factorial crece de forma superexponencial: 170! &approx; 7.2574 × 10<sup>306</sup> es el factorial más grande representable en doble precisión. Valores &ge; 171! exceden 1.7977 × 10<sup>308</sup> y activan de forma segura el manejo de desbordamiento.
            </p>
          </div>
        </div>
      </div>

      {/* 10. COMPRENSIÓN VISUAL Y TABLAS DE REFERENCIA */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          10. Comprensión visual y tablas de referencia
        </h2>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-800 rounded-lg">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Función</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Dominio (Entrada x)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Rango (Salida y)</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Asíntotas / Puntos clave</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-3 font-mono font-medium">sin(x), cos(x)</td>
                <td className="py-2 px-3 font-mono">(-∞, +∞)</td>
                <td className="py-2 px-3 font-mono">[-1, 1]</td>
                <td className="py-2 px-3">Periódica (2&pi;), continua en todo punto</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-medium">tan(x)</td>
                <td className="py-2 px-3 font-mono">x &ne; &pi;/2 + k&pi;</td>
                <td className="py-2 px-3 font-mono">(-∞, +∞)</td>
                <td className="py-2 px-3">Asíntotas verticales en múltiplos impares de &pi;/2</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-medium">arcsin(x), arccos(x)</td>
                <td className="py-2 px-3 font-mono">[-1, 1]</td>
                <td className="py-2 px-3 font-mono">[-&pi;/2, &pi;/2] / [0, &pi;]</td>
                <td className="py-2 px-3">Salidas reales en rama principal</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-medium">ln(x), log₁₀(x)</td>
                <td className="py-2 px-3 font-mono">(0, +∞)</td>
                <td className="py-2 px-3 font-mono">(-∞, +∞)</td>
                <td className="py-2 px-3">Asíntota vertical en x = 0, ln(1) = 0</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-medium">e^x</td>
                <td className="py-2 px-3 font-mono">(-∞, +∞)</td>
                <td className="py-2 px-3 font-mono">(0, +∞)</td>
                <td className="py-2 px-3">Asíntota horizontal en y = 0, e^0 = 1</td>
              </tr>
              <tr>
                <td className="py-2 px-3 font-mono font-medium">x! (Factorial)</td>
                <td className="py-2 px-3 font-mono">Enteros no negativos</td>
                <td className="py-2 px-3 font-mono">[1, +∞)</td>
                <td className="py-2 px-3">Desbordamiento de coma flotante en n &gt; 170</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 11. EJEMPLOS RESUELTOS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          11. Ejemplos resueltos
        </h2>
        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Ejemplo resuelto 1: Evaluación de la razón trigonométrica sin(30°)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Paso 1:</strong> Convertir 30° a radianes: &theta; = 30 × (&pi; / 180) = &pi; / 6 &approx; 0.52359877 rad.<br />
              • <strong>Paso 2:</strong> Evaluar serie del seno: sin(&pi;/6) = 0.5.<br />
              → <strong>Resultado: 0.5</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Ejemplo resuelto 2: Cambio de base logarítmica y potencia: log₁₀(500) + 2^5
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Paso 1:</strong> log₁₀(500) = ln(500) / ln(10) &approx; 6.2146081 / 2.3025851 &approx; 2.6989700.<br />
              • <strong>Paso 2:</strong> 2^5 = 32.<br />
              • <strong>Paso 3:</strong> Suma: 2.6989700 + 32 = 34.6989700.<br />
              → <strong>Resultado: 34.69897</strong>.
            </p>
          </div>

          <div className="border-l-2 border-blue-500 pl-4 py-1">
            <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
              Ejemplo resuelto 3: Vida media y desintegración radiactiva: N(t) = N₀ e^(-&lambda;t)
            </span>
            <p className="text-slate-600 dark:text-slate-300">
              • <strong>Problema:</strong> N₀ = 100 g, N(t) = 25 g, &lambda; = 0.05 día⁻¹. Hallar tiempo transcurrido t.<br />
              • <strong>Paso 1:</strong> Razón: N(t)/N₀ = 25 / 100 = 0.25.<br />
              • <strong>Paso 2:</strong> Tomar logaritmo natural: ln(0.25) = -&lambda;t &rArr; -1.38629436 = -0.05 t.<br />
              • <strong>Paso 3:</strong> Despejar t: t = -1.38629436 / -0.05 &approx; 27.725887 días.<br />
              → <strong>Resultado: t &approx; 27.726 días</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* 12. METODOLOGÍA Y PRIVACIDAD */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          12. Metodología, privacidad y limitaciones
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Motor de cálculo:</strong> Todas las evaluaciones matemáticas se ejecutan íntegramente en el navegador web del usuario utilizando aritmética de coma flotante de doble precisión IEEE-754 de 64 bits de JavaScript. El historial de cálculos y los registros de memoria se guardan en la memoria local del navegador.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          <strong>Limitaciones:</strong> Esta herramienta es un evaluador de expresiones numéricas analítico y educativo, no un sustituto de software de ingeniería profesional o sistemas de álgebra computacional simbólica (CAS). Para cálculos especializados dedicados, utilice los módulos relacionados verificados indicados a continuación.
        </p>
      </div>
    </article>
  );
}

export const ScientificCalculatorContentEs = SpanishScientificContent;
export default SpanishScientificContent;
