import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const PT_DATE_SEO = {
  title: "Calculadora de Datas | Dias Entre Datas, Somar Dias e Dias Úteis",
  description: "Calcule com exatidão os dias entre duas datas, adicione ou subtraia dias, semanas, meses e anos, e calcule dias úteis excluindo finais de semana e feriados.",
  keywords: ["calculadora de datas", "dias entre datas", "somar dias a data", "dias uteis", "calculo de prazos"],
};

export const PT_DATE_FAQS: CalculatorFAQ[] = [
  {
    question: "Como calcular o número exato de dias entre duas datas?",
    answer:
      "Insira as datas inicial e final. A calculadora computa o intervalo em dias corridos pelo calendário gregoriano, com suporte a contagem inclusiva ou exclusiva.",
  },
  {
    question: "Como a calculadora trata anos bissextos?",
    answer:
      "Aplica a regra gregoriana: anos divisíveis por 4 são bissextos, exceto anos de fim de século não divisíveis por 400. Por isso, 2000 foi bissexto e 2100 não será.",
  },
  {
    question: "Como são calculados os dias úteis?",
    answer:
      "A ferramenta analisa cada dia do intervalo e subtrai os dias de fim de semana configurados e os feriados selecionados.",
  },
];

export function PtDateContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introdução ao Cálculo de Datas e Prazos
        </h2>
        <p>
          O cálculo exato de prazos é fundamental em processos jurídicos, contratos comerciais, finanças e gestão de projetos. As variações nos meses e anos bissextos exigem algoritmos rigorosos.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Conceito Matemático e Regras
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Dias Corridos:</strong> Δt = Data_Final − Data_Inicial</p>
          <p><strong>Dias Úteis:</strong> Dias_Úteis = Total_Dias − Fins_de_Semana − Feriados</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Erros Comuns
        </h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>Considerar todos os meses como tendo 30 dias.</li>
          <li>Confundir prazo processual em dias úteis com prazo civil em dias corridos.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          4. Resumo
        </h2>
        <p>
          Utilize o cálculo com regras gregorianas para assegurar o cumprimento tempestivo de compromissos contratuais e legais.
        </p>
      </section>
    </article>
  );
}
