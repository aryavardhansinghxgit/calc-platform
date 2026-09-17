import React from "react";
import { CalculatorFAQ } from "@/calculators/types";

export const PT_CURRENCY_SEO = {
  title: "Conversor de Moedas | Taxas de Câmbio em Tempo Real e Simulador",
  description: "Converta mais de 160 moedas internacionais com a taxa de câmbio comercial real. Calcule spread bancário e tarifas ocultas em remessas internacionais.",
  keywords: ["conversor de moedas", "taxa de cambio euro dolar", "cotacao moedas", "calculadora de cambio"],
};

export const PT_CURRENCY_FAQS: CalculatorFAQ[] = [
  {
    question: "O que é a taxa de câmbio comercial ou interbancária?",
    answer:
      "É a taxa de referência real praticada no mercado financeiro global entre bancos, sem acréscimo de margens de lucro ou taxas de varejo.",
  },
  {
    question: "Como os bancos cobram taxas ocultas de câmbio?",
    answer:
      "Geralmente aplicam uma margem (spread) de 1,5% a 4% sobre a cotação comercial, reduzindo o valor líquido recebido na conversão.",
  },
];

export function PtCurrencyContent() {
  return (
    <article className="space-y-6 text-slate-700 dark:text-slate-300">
      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          1. Introdução ao Mercado Cambial (Forex)
        </h2>
        <p>
          O mercado de câmbio viabiliza compras internacionais, viagens e investimentos ao permitir a troca entre diferentes moedas soberanas.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          2. Fórmulas de Conversão
        </h2>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm space-y-2">
          <p><strong>Conversão Direta:</strong> Valor_Destino = Valor_Origem × Taxa_de_Câmbio</p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
          3. Resumo
        </h2>
        <p>
          Compare sempre as cotações oferecidas com a taxa comercial do mercado interbancário para identificar a opção de menor custo real.
        </p>
      </section>
    </article>
  );
}
