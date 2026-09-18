"use client";

import React from "react";
import Link from "next/link";
import { CalculatorFAQ } from "@/calculators/types";

export const ES_DATE_SEO = {
  title: "Calculadora de Fechas | Calci",
  description:
    "Calcule días entre dos fechas, sume o reste días, semanas, meses y años, y cuente días hábiles con soporte para años bisiestos y feriados.",
  category: "Fechas",
  keywords: [
    "calculadora de fechas",
    "días entre dos fechas",
    "calcular días",
    "diferencia de fechas",
    "sumar días a una fecha",
    "días laborables",
    "días hábiles",
  ],
};

export const ES_DATE_FAQS: CalculatorFAQ[] = [
  {
    question: "¿Cómo calculo el número de días entre dos fechas?",
    answer:
      "Ingrese las fechas de inicio y fin en el modo 'Días entre dos fechas'. La calculadora determina el intervalo transcurrido en días naturales mediante la convención inclusiva o exclusiva configurada y muestra desgloses en semanas, horas, minutos y segundos.",
  },
  {
    question: "¿Cuál es la diferencia entre el conteo de fechas inclusivo y exclusivo?",
    answer:
      "El conteo exclusivo mide el intervalo transcurrido entre fechas, por lo que del 1 al 2 de enero hay un día. El conteo inclusivo incluye ambas fechas límite, por lo que el mismo rango contiene dos días contabilizados.",
  },
  {
    question: "¿Cómo gestiona la calculadora de fechas los años bisiestos?",
    answer:
      "Sigue las reglas del calendario gregoriano: los años divisibles por 4 son bisiestos, excepto los años seculares no divisibles por 400. Por lo tanto, 2000 es bisiesto, mientras que 1900 y 2100 no lo son.",
  },
  {
    question: "¿Qué ocurre cuando sumo un mes a una fecha como el 31 de enero?",
    answer:
      "La calculadora aplica ajuste a fin de mes (clamping). El 31 de enero más un mes se convierte en 28 de febrero en un año normal o 29 de febrero en un año bisiesto, ya que febrero no tiene día 31.",
  },
  {
    question: "¿Cómo sumo o resto días, semanas, meses o años a una fecha?",
    answer:
      "Utilice el modo 'Sumar o restar a una fecha', ingrese las unidades de calendario y seleccione Sumar o Restar. Los cálculos de meses y años aplican reglas precisas de fin de mes y años bisiestos.",
  },
  {
    question: "¿Cómo se calculan los días hábiles y laborables?",
    answer:
      "La calculadora evalúa cada día dentro del rango seleccionado y excluye los días de fin de semana configurados y los feriados habilitados. El resultado exacto depende de la convención de conteo y las reglas de jornada laboral.",
  },
  {
    question: "¿Se excluyen los fines de semana en los cálculos de días hábiles?",
    answer:
      "Sí, en el modo de días hábiles, los días de fin de semana configurados se descuentan del cómputo laboral. También se admiten esquemas de fin de semana personalizados como viernes/sábado o domingos exclusivamente.",
  },
  {
    question: "¿Se excluyen los feriados federales en los cálculos de días laborales?",
    answer:
      "Al habilitar la opción de feriados, la calculadora excluye las fechas correspondientes a los feriados federales configurados en su tabla anual de observación.",
  },
  {
    question: "¿Cómo gestiona la calculadora los feriados flotantes como Memorial Day?",
    answer:
      "Los feriados flotantes se generan mediante reglas de calendario algorítmicas (por ejemplo, Memorial Day es el último lunes de mayo y Labor Day el primer lunes de septiembre), adaptándose a cualquier año.",
  },
  {
    question: "¿Puedo calcular una fecha utilizando un esquema de fin de semana personalizado?",
    answer:
      "Sí, el modelo de días laborales admite patrones de fin de semana configurables para ajustarse a calendarios de trabajo internacionales o no convencionales.",
  },
  {
    question: "¿Por qué el resultado varía al incluir el día de inicio o de fin?",
    answer:
      "Incluir una fecha límite altera la convención matemática. Un intervalo de un día transcurrido se convierte en dos días contabilizados cuando se incluyen ambos extremos.",
  },
  {
    question: "¿Por qué un cálculo de fecha manual puede diferir del resultado de la calculadora?",
    answer:
      "Las causas más habituales son asumir que todos los meses tienen 30 días, ignorar años bisiestos, omitir feriados o aplicar una convención inclusiva/exclusiva distinta. La calculadora utiliza la estructura exacta del calendario gregoriano.",
  },
];

export function EsDateContent() {
  return (
    <article className="text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. ¿QUÉ ES UNA CALCULADORA DE FECHAS? */}
      <div>
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. ¿Qué es una calculadora de fechas?
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Una calculadora de fechas es una herramienta de aritmética de calendario que determina el intervalo transcurrido entre dos fechas o calcula una nueva fecha tras sumar o restar una duración determinada. En lugar de tratar cada mes como 30 días o cada año como 365 días, una calculadora adaptada a las reglas de calendario utiliza la estructura real del calendario gregoriano: los meses tienen longitudes distintas, febrero puede tener 28 o 29 días y los años bisiestos siguen una regla precisa. Esto hace que una calculadora de fechas sea sustancialmente más confiable para operaciones reales que una simple multiplicación por una duración mensual promedio.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          La calculadora actual combina tres funciones. El modo <strong>Días entre dos fechas</strong> mide un intervalo transcurrido. El modo <strong>Sumar o restar a una fecha</strong> desplaza una fecha inicial por años, meses, semanas y días. El modo <strong>Días hábiles y laborables</strong> contabiliza días laborales considerando fines de semana, feriados configurados y esquemas laborales personalizados. Por lo tanto, la misma herramienta sirve tanto para planificación personal como para cronogramas estructurados.
        </p>
      </div>

      {/* 2. CÓMO SE CALCULAN LOS DÍAS ENTRE DOS FECHAS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Cómo se calculan los días entre dos fechas
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Bajo la convención estándar validada, la diferencia de fechas es un intervalo transcurrido exclusivo: la diferencia entre el 24 de agosto de 2026 y el 23 de septiembre de 2026 es de 30 días. La calculadora también admite un ajuste inclusivo, que modifica el conteo al incluir el día final configurado. Esta distinción es fundamental porque el lenguaje cotidiano como &quot;entre&quot; puede resultar ambiguo cuando alguien contabiliza fechas activas del calendario en lugar de intervalos transcurridos.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          La práctica más segura es identificar la convención de conteo antes de interpretar un resultado. Por ejemplo, del 1 de enero al 2 de enero hay un día transcurrido bajo conteo exclusivo, pero dos fechas de calendario bajo conteo inclusivo. La calculadora expone esta convención con total transparencia. Esto resulta indispensable en cronogramas de proyectos, períodos de preaviso y plazos contractuales. Para conteos simples, consulte la{" "}
          <Link href="/calculators/day-counter-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            calculadora de conteo de días
          </Link>.
        </p>
      </div>

      {/* 3. CONTEO DE FECHAS INCLUSIVO FRENTE A EXCLUSIVO */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Conteo de fechas inclusivo frente a exclusivo
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          El conteo exclusivo mide el intervalo transcurrido entre dos fechas. Cuando las fechas de inicio y fin son idénticas, el intervalo transcurrido es cero. El conteo inclusivo trata ambas fechas límite como días activos contabilizados, por lo que el mismo intervalo de una sola fecha produce un día. Para el período del 1 al 2 de enero, el conteo exclusivo genera un día, mientras que el conteo inclusivo genera dos días contabilizados.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          No existe una opción universalmente correcta independiente del contexto. Una duración matemática transcurrida suele utilizar la diferencia exclusiva, mientras que una norma comercial o jurídica puede definir un plazo incluyendo explícitamente fechas límite. La opción <em>Incluir día final</em> permite alternar la convención matemática según la normativa o contrato aplicable. Para desgloses de duración intradía, explore la{" "}
          <Link href="/calculators/time-duration-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            calculadora de duración de tiempo
          </Link>.
        </p>
      </div>

      {/* 4. CALENDARIO GREGORIANO Y REGLAS DE AÑOS BISIESTOS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Calendario gregoriano y reglas de años bisiestos
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          La calculadora de fechas utiliza la lógica del calendario gregoriano. Un año bisiesto gregoriano es divisible por 4, excepto aquellos años seculares (fines de siglo) que no son divisibles por 400. Por lo tanto, 2028 es bisiesto, 1900 no lo es, 2000 sí lo es y 2100 no lo será. La regla de los 400 años evita la simplificación inexacta de que cada cuatro años siempre es bisiesto.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          El manejo de años bisiestos influye siempre que un cálculo cruce el mes de febrero. Un intervalo que atraviesa el 29 de febrero difiere en un día respecto a un año ordinario. Los cálculos a largo plazo dependen de esta regla centenaria; el motor implementa esta lógica de forma exacta para 2000, 2400, 1900 y 2100. Para cálculos de edad cronológica, visite la{" "}
          <Link href="/calculators/age-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            calculadora de edad
          </Link>.
        </p>
      </div>

      {/* 5. LONGITUD DE LOS MESES Y POR QUÉ NO SON DURACIONES FIJAS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          5. Longitud de los meses y por qué los meses no tienen duraciones fijas
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Los meses del calendario contienen 28, 29, 30 o 31 días. Enero, marzo, mayo, julio, agosto, octubre y diciembre tienen 31 días; abril, junio, septiembre y noviembre tienen 30; febrero tiene 28 días en un año estándar y 29 en uno bisiesto. Por esta razón, &quot;sumar un mes&quot; no equivale a &quot;sumar 30 días&quot;.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Por ejemplo, sumar un mes al 31 de enero requiere una regla de ajuste de fin de mes, ya que febrero no tiene día 31. La calculadora utiliza ajuste al último día del mes (clamping), convirtiendo el 31 de enero más un mes en 28 de febrero en un año normal o 29 de febrero en uno bisiesto.
        </p>

        {/* Tabla de días por mes */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-left text-xs sm:text-sm border-collapse border border-slate-200 dark:border-slate-800 rounded-lg">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700">
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Meses</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Duración en año normal</th>
                <th className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white">Duración en año bisiesto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr>
                <td className="py-2 px-3">Ene, Mar, May, Jul, Ago, Oct, Dic</td>
                <td className="py-2 px-3 font-medium">31 días</td>
                <td className="py-2 px-3 font-medium">31 días</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Abr, Jun, Sep, Nov</td>
                <td className="py-2 px-3 font-medium">30 días</td>
                <td className="py-2 px-3 font-medium">30 días</td>
              </tr>
              <tr>
                <td className="py-2 px-3">Febrero</td>
                <td className="py-2 px-3 font-medium">28 días</td>
                <td className="py-2 px-3 font-medium text-blue-600 dark:text-blue-400">29 días</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 6. SUMAR Y RESTAR DÍAS, SEMANAS, MESES Y AÑOS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          6. Sumar y restar días, semanas, meses y años
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          La aritmética de fechas comienza con una fecha base y aplica la duración deseada de acuerdo con el orden operativo y las reglas de fin de mes. Sumar 30 días de calendario al 24 de agosto de 2026 produce el 23 de septiembre de 2026. Restar 30 días a esa misma fecha produce el 25 de julio de 2026. Las semanas son múltiplos exactos de siete días, mientras que los meses y años requieren un procesamiento específico según la estructura del calendario.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Las duraciones mixtas requieren especial cuidado. Una solicitud como un año, dos meses, tres semanas y diez días no puede tratarse como un número fijo de días, ya que los componentes de año y mes dependen de la posición en el calendario. Para cálculos de cronograma gestacional, consulte la{" "}
          <Link href="/calculators/due-date-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            calculadora de fecha de parto
          </Link>.
        </p>
      </div>

      {/* 7. DÍAS HÁBILES Y LABORABLES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          7. Días hábiles y laborables
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Los cálculos de días hábiles difieren de los días naturales ordinarios porque los fines de semana y los feriados seleccionados se excluyen del cómputo. La calculadora evalúa el intervalo día por día y clasifica cada fecha de acuerdo con la jornada laboral y las reglas de feriados establecidas. En la línea base validada, del 24 de agosto al 23 de septiembre de 2026 hay 30 días naturales, 21 días hábiles, 8 días de fin de semana y 1 feriado excluido.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Este desglose es más transparente que asumir una proporción fija como cinco días hábiles por cada siete días naturales, garantizando exactitud ante feriados intercalados o esquemas no convencionales.
        </p>
      </div>

      {/* 8. FERIADOS FEDERALES DE EE. UU. Y FECHAS OBSERVADAS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          8. Feriados federales de EE. UU. y fechas observadas
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          La configuración de feriados de EE. UU. de la calculadora sigue los 11 feriados federales establecidos en 5 U.S.C. 6103, incluyendo Año Nuevo, Día de Martin Luther King Jr., Natalicio de Washington, Memorial Day, Juneteenth, Día de la Independencia, Día del Trabajo, Columbus Day, Día de los Veteranos, Acción de Gracias y Navidad. La Oficina de Administración de Personal (OPM) publica el calendario anual e indica que cuando un feriado cae en sábado o domingo, generalmente se observa el viernes previo o lunes siguiente.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Para 2026, la OPM designa el 3 de julio como el feriado observado por el Día de la Independencia (ya que el 4 cae en sábado), mientras que el Día del Trabajo es el 7 de septiembre. La calculadora implementa estas observaciones de manera consistente.
        </p>
      </div>

      {/* 9. FERIADOS FLOTANTES Y GENERACIÓN DE FERIADOS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          9. Feriados flotantes y generación de feriados
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Algunos feriados federales tienen fechas fijas, mientras que otros se definen por una regla de día de la semana. El Día de Martin Luther King Jr. es el tercer lunes de enero; el Natalicio de Washington, el tercer lunes de febrero; Memorial Day, el último lunes de mayo; el Día del Trabajo, el primer lunes de septiembre; Columbus Day, el segundo lunes de octubre; y Acción de Gracias, el cuarto jueves de noviembre.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          El motor de cálculo genera algorítmicamente estos feriados flotantes para cualquier año seleccionado. Para conocer en qué día de la semana cae un evento determinado, utilice la{" "}
          <Link href="/calculators/day-of-the-week-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            calculadora del día de la semana
          </Link>.
        </p>
      </div>

      {/* 10. HORARIOS Y ESQUEMAS DE FIN DE SEMANA PERSONALIZADOS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          10. Horarios y esquemas de fin de semana personalizados
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          El cálculo de días laborables no siempre se limita a lunes a viernes. La calculadora admite configuraciones personalizadas de fin de semana, como esquemas de viernes/sábado o solo domingos, adaptándose a cronogramas operativos internacionales o no convencionales.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          La configuración indica al motor cuáles días de la semana excluir en la cuenta matemática, permitiendo modelar cualquier política interna de forma precisa.
        </p>
      </div>

      {/* 11. CONTEO DE DÍAS PARA PLAZOS Y PERÍODOS DE NOTIFICACIÓN */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          11. Conteo de días para plazos y períodos de notificación
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Los cálculos de fechas se utilizan con frecuencia para plazos de notificación de 30, 60 y 90 días, vencimientos contractuales, contratos de arrendamiento y ciclos de nómina. En estos casos, el conteo inclusivo frente al exclusivo puede alterar el resultado en un día. La calculadora expone claramente la convención seleccionada para facilitar la verificación contra el contrato o estatuto rector.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Para plazos legales o contractuales, la calculadora debe emplearse como apoyo de planificación; siempre se recomienda contrastar con las cláusulas específicas del documento vinculante.
        </p>
      </div>

      {/* 12. USOS PRÁCTICOS PARA GESTIÓN DE PROYECTOS Y PROGRAMACIÓN */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          12. Usos prácticos para gestión de proyectos y programación
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Los equipos de proyectos pueden usar esta calculadora para convertir duraciones estimadas en fechas límite del calendario, comparar días naturales frente a días laborales y contemplar feriados e hitos. Un proyecto que requiere 20 días laborables puede demandar más de 28 días naturales si coinciden fines de semana o feriados intermedios.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Esta versatilidad permite alternar entre planificación de calendario y días laborales sin necesidad de cálculos manuales propensos a error. Para seguimiento de turnos y control horario, consulte la{" "}
          <Link href="/calculators/hours-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            calculadora de horas
          </Link>.
        </p>
      </div>

      {/* 13. CÁLCULOS DE FECHAS PARA NÓMINA Y FINANZAS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          13. Cálculos de fechas para nómina y finanzas
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Los intervalos de fechas también intervienen en liquidaciones de sueldos, facturación, devengo de intereses, suscripciones y calendarios de pago. Un intervalo de días naturales puede convertirse a horas, minutos y segundos exactos: un día equivale a 24 horas, 1,440 minutos u 86,400 segundos. La línea base convierte 30 días en 720 horas, 43,200 minutos y 2,592,000 segundos.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Estas conversiones reflejan días naturales y no deben confundirse con convenciones financieras de devengo de intereses (como actual/360 o 30/360). Para cálculos horarios generales, utilice la{" "}
          <Link href="/calculators/time-calculator" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
            calculadora de tiempo
          </Link>.
        </p>
      </div>

      {/* 14. POR QUÉ LA ARITMÉTICA DE CALENDARIO ES SUPERIOR A SUPUESTOS FIJOS */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          14. Por qué la aritmética de calendario es superior a supuestos de días fijos
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          Asumir que &quot;un mes equivale a 30 días&quot; produce desfases siempre que el cálculo cruza meses de 31 días, febrero, años bisiestos o límites de fin de mes. De igual modo, asumir que un año siempre tiene 365 días falla al cruzar un 29 de febrero. La calculadora evita estas aproximaciones utilizando fechas exactas del calendario.
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          La diferencia cobra aún mayor relevancia a medida que el intervalo aumenta en meses o años, donde la ubicación precisa de los días bisiestos y los límites mensuales es determinante.
        </p>
      </div>

      {/* 15. METODOLOGÍA, PRIVACIDAD Y LIMITACIONES */}
      <div className="pt-6">
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-3">
          15. Metodología, privacidad y limitaciones
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
          <strong>Metodología principal:</strong> Los intervalos de fechas se calculan a partir de las fechas de inicio y fin seleccionadas según la convención inclusiva o exclusiva configurada. El desplazamiento suma o resta años, meses, semanas y días aplicando reglas de fin de mes. El cómputo de días laborales evalúa cada fecha frente al esquema de días hábiles y feriados. La conversión de unidades deriva semanas, horas, minutos y segundos del intervalo en días. Asimismo, el porcentaje del año solar se computa usando la duración media del año gregoriano (365.2425 días).
        </p>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mt-3">
          Esta calculadora es un modelo educativo y de planificación, no un dictamen jurídico de plazos procesales ni una determinación legal vinculante. Todas las operaciones se realizan en el navegador del usuario y el historial se almacena localmente en su dispositivo.
        </p>
      </div>
    </article>
  );
}

export const DateContentEs = EsDateContent;
export default EsDateContent;
