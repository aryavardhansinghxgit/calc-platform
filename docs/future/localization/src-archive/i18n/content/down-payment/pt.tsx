"use client";

import React from "react";
import Link from "next/link";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "Quanto devo dar de entrada para comprar um imóvel?",
    "answer": "Depende da sua reserva financeira; a maioria dos compradores dá entre 3% e 20% do valor do imóvel."
  },
  {
    "question": "É obrigatório dar 20% de entrada?",
    "answer": "Não, diversos programas convencionais e públicos admitem entradas a partir de 0% a 5%."
  },
  {
    "question": "Como a entrada afeta o valor da prestação mensal?",
    "answer": "Uma entrada maior reduz o saldo devedor, diminui os juros totais e elimina a taxa de seguro (PMI)."
  },
  {
    "question": "O que é o Seguro Hipotecário Privado (PMI)?",
    "answer": "Seguro obrigatório cobrado quando a entrada é inferior a 20% para proteger o credor contra inadimplência."
  },
  {
    "question": "Quanto reservar para custos de fechamento e registro?",
    "answer": "Recomenda-se reservar entre 2% e 5% do valor do bem para impostos (ITBI), escritura e custas."
  },
  {
    "question": "É possível comprar um imóvel com 0% de entrada?",
    "answer": "Sim, por meio de programas governamentais específicos como empréstimos VA ou USDA."
  },
  {
    "question": "Qual a diferença entre dar 3%, 5%, 10% ou 20% de entrada?",
    "answer": "Menor entrada significa parcelas maiores, mas preserva liquidez imediata para emergências."
  },
  {
    "question": "Vale a pena dar mais entrada ou aplicar o dinheiro?",
    "answer": "Compare o custo efetivo do financiamento com o retorno líquido dos seus investimentos."
  },
  {
    "question": "Quando o seguro PMI pode ser cancelado?",
    "answer": "A pedido ao atingir 80% de LTV ou automaticamente ao atingir 78% de LTV."
  },
  {
    "question": "O que é a relação empréstimo-valor (LTV)?",
    "answer": "É o percentual financiado em relação ao valor total de avaliação do imóvel."
  },
  {
    "question": "Pode-se usar doações de familiares para a entrada?",
    "answer": "Sim, desde que devidamente comprovadas por declaração de doação formal."
  },
  {
    "question": "Quanto tempo leva para juntar a entrada?",
    "answer": "Depende da sua renda líquida, da capacidade de poupança mensal e do valor do imóvel."
  }
];

export const seo = {
  title: "Calculadora de Entrada Imobiliária (Down Payment) — Convencional 97",
  description: "Calcule a entrada necessária para comprar imóvel, compare parcelas com 3%, 5%, 10% e 20%, eliminação de PMI e custos de fechamento.",
  keywords: ["calculadora de entrada imovel","entrada financiamento","calculadora pmi","quanto dar de entrada"]
};

export const ContentComponent = function DownPaymentContentPT() {
  return (
    <div className="space-y-10 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* H1 Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <h1 className="text-3xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculadora de Entrada Imobiliária (Down Payment)
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Guia completo sobre entrada imobiliária, requisitos mínimos por tipo de financiamento, cancelamento de seguro PMI a 78% de LTV e custos de fechamento.
        </p>
      </div>

      {/* SECTION 1: WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. O que é a Entrada Imobiliária e Como Funciona?
        </h2>
        <p className="text-sm leading-relaxed">
          A entrada é o montante em dinheiro pago pelo comprador com recursos próprios no ato da compra. O saldo remanescente é financiado por meio de crédito imobiliário com garantia do imóvel. A entrada define o índice empréstimo-valor (LTV) e o valor das parcelas mensais.
        </p>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans text-center">Fórmulas Fundamentais da Entrada Imobiliária</div>
          
          <div className="p-3 bg-white dark:bg-slate-950 rounded-lg text-xs font-bold text-blue-600 dark:text-blue-400 space-y-2">
            <div><strong>1. Valor da Entrada ($) :</strong></div>
            <div className="text-center font-mono">{"Entrada = Preço de Compra (P) × (% Entrada / 100)"}</div>
            
            <div className="pt-2"><strong>2. Saldo Financiado ($) :</strong></div>
            <div className="text-center font-mono">{"Valor Financiado = Preço de Compra - Entrada"}</div>

            <div className="pt-2"><strong>3. Total Necessário no Fechamento ($) :</strong></div>
            <div className="text-center font-mono">{"Recursos Necessários = Entrada + Custos de Fechamento (2% - 5%)"}</div>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW MUCH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Quanta Entrada Você Realmente Precisa?
        </h2>
        <p className="text-sm leading-relaxed">
          O percentual exigido varia conforme as regras do programa de crédito contratado :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">0% de Entrada</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Disponível em linhas públicas específicas como os empréstimos VA (militares) e USDA (zonas rurais elegíveis).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">3% – 3.5% de Entrada</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Linhas Convencionais 97 exigem 3% para primeiro imóvel (score 620+). Financiamentos FHA exigem 3.5% (score 580+).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600 text-sm">20% de Entrada</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              O patamar padrão para eliminar o seguro obrigatório (PMI) e minimizar o gasto total com juros.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: 20% MYTH */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. O Mito dos 20% de Entrada vs. Realidade
        </h2>
        <p className="text-sm leading-relaxed">
          Dar 20% elimina o PMI, mas aguardar anos para juntar essa quantia pode gerar custos de oportunidade relevantes :
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 space-y-2">
            <h3 className="font-extrabold text-emerald-700 dark:text-emerald-400 text-sm">Vantagens de Dar 20% de Entrada</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Economia imediata de 100 $ a 300 $/mês pela isenção de seguro PMI.</li>
              <li>Parcelas mensais de amortização e juros significativamente menores.</li>
              <li>Menor custo total acumulado de juros ao longo do contrato.</li>
              <li>Proposta de compra mais competitiva junto aos vendedores.</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 space-y-2">
            <h3 className="font-extrabold text-amber-700 dark:text-amber-400 text-sm">Desvantagens e Custos de Oportunidade</h3>
            <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 space-y-1 font-normal">
              <li>Esgotamento das reservas líquidas e do fundo de emergência.</li>
              <li>Adiar a compra expõe o comprador à valorização dos imóveis.</li>
              <li>Custo de oportunidade de imobilizar capital que poderia render em aplicações.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 4: TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Programas de Financiamento e Requisitos de Entrada
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Programa de Crédito</th>
                <th className="p-3">Entrada Mínima %</th>
                <th className="p-3">Score Mínimo</th>
                <th className="p-3">Regras do Seguro PMI</th>
                <th className="p-3 rounded-tr-xl">Taxa Inicial</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Convencional 97"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"3.0%"}</td>
                <td className="p-3">{"620"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"Cancela a 78%–80% LTV"}</td>
                <td className="p-3 text-amber-600">{"0 $"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"Financiamento FHA"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"3.5%"}</td>
                <td className="p-3">{"580"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"Durante todo o prazo (<10% entrada)"}</td>
                <td className="p-3 text-amber-600">{"1.75% UFMIP"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Empréstimo VA (Militar)"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"0.0%"}</td>
                <td className="p-3">{"580+"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0 $ de PMI Mensal"}</td>
                <td className="p-3 text-amber-600">{"1.4%–2.15% Taxa de Financiamento"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"USDA Rural"}</td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{"0.0%"}</td>
                <td className="p-3">{"640"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0.35% Garantia Anual"}</td>
                <td className="p-3 text-amber-600">{"1.0% Taxa de Garantia"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 5: PMI REMOVAL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Seguro Hipotecário (PMI) e Cancelamento (80% vs. 78% LTV)
        </h2>
        <p className="text-sm leading-relaxed">
          A legislação estabelece critérios claros para o cancelamento do seguro :
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Cancelamento por Solicitação a 80% LTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              Quando o saldo atingir 80% do valor de avaliação original, o comprador pode solicitar o cancelamento por escrito.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Cancelamento Automático Obrigatório a 78% LTV</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              A instituição financeira é obrigada por lei a cancelar o PMI assim que o saldo atingir 78% da amortização programada.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: ASSISTANCE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Programas de Assistência de Entrada (DPA)
        </h2>
        <p className="text-sm leading-relaxed">
          Diversos programas públicos auxiliam compradores no valor da entrada :
        </p>
        <ul className="list-disc list-inside text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
          <li>Subsídios Diretos (Grants) : Recursos a fundo perdido.</li>
          <li>Segundas Hipotecas com Perdão de Dívida após 3 a 5 anos de moradia.</li>
          <li>Empréstimos com Pagamento Diferido a 0% quitados na revenda do imóvel.</li>
        </ul>
      </section>

      {/* SECTION 7: SUMMARY */}
      <section className="p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2 text-xs">
        <h2 className="font-extrabold text-sm text-blue-700 dark:text-blue-300">
          7. Resumo Educacional
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
          Equilibrar a entrada, o custo do PMI e as reservas financeiras garante um planejamento imobiliário seguro e sustentável.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "pt",
  calculatorSlug: "down-payment-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
