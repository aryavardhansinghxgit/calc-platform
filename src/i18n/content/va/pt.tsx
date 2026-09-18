"use client";

import React from "react";
import Link from "next/link";
import { Check, ShieldCheck, AlertCircle, Info, ArrowRight } from "lucide-react";
import { FAQItem, CalculatorLocalizedContent } from "@/i18n/types";

export const faqs: FAQItem[] = [
  {
    "question": "O que é um financiamento VA e quem tem direito?",
    "answer": "É um crédito imobiliário garantido pelo Departamento de Assuntos de Veteranos para militares da ativa, veteranos e cônjuges qualificados."
  },
  {
    "question": "É necessária entrada?",
    "answer": "Não, os empréstimos VA permitem financiar até 100% do imóvel sem entrada (0% down) e sem cobrança de seguro PMI."
  },
  {
    "question": "O que é a taxa de financiamento VA (Funding Fee)?",
    "answer": "Taxa governamental única (1.25% a 3.30%) que substitui o seguro mensal e sustenta o fundo garantidor."
  },
  {
    "question": "Quem tem isenção da taxa VA?",
    "answer": "Veteranos com invalidez comprovada decorrente do serviço (10%+), condecorados com o Purple Heart e viúvos(as) qualificados."
  },
  {
    "question": "Compensa financiar a taxa ou pagar à vista?",
    "answer": "Financiar preserva liquidez imediata, mas aumenta o saldo devedor e os juros pagos ao longo de 30 anos."
  },
  {
    "question": "Qual a diferença entre primeiro uso e uso subsequente?",
    "answer": "Sem entrada, o primeiro uso cobra 2.15% e os usos posteriores 3.30%. A partir de 5% de entrada, ambas as taxas caem para 1.50%."
  },
  {
    "question": "O empréstimo VA tem cobrança mensal de PMI?",
    "answer": "Não, financiamentos VA são isentos de seguro mensal PMI."
  },
  {
    "question": "O que é o refinanciamento IRRRL?",
    "answer": "Processo simplificado para redução de juros sem necessidade de vistoria e com taxa reduzida de apenas 0.50%."
  },
  {
    "question": "Como funciona a garantia (Entitlement)?",
    "answer": "Representa a cobertura estatal; com direito pleno não há teto para compras com 0% de entrada."
  },
  {
    "question": "Quais são os requisitos mínimos de serviço militar?",
    "answer": "Geralmente 90 dias em tempo de guerra, 181 dias em tempo de paz ou 6 anos na Reserva/Guarda Nacional."
  },
  {
    "question": "Como se compara aos financiamentos FHA e convencionais?",
    "answer": "Supera o FHA pela isenção de seguro mensal e supera o convencional por dispensar a entrada de 5% a 20%."
  },
  {
    "question": "Como acelerar a quitação do empréstimo VA?",
    "answer": "Adotando pagamentos quinzenais ou aportes mensais extraordinários de amortização."
  }
];

export const seo = {
  title: "Calculadora de Financiamento VA (Militares) — Financiamento VA",
  description: "Calcule financiamentos VA com 0% de entrada, taxa de financiamento (Funding Fee), parcelas PITI, isenções por invalidez e comparativo triplo.",
  keywords: ["calculadora financiamento va","emprestimo militar va","taxa funding fee va","financiamento imobiliario sem entrada"]
};

export const ContentComponent = function VAMortgageContentPT() {
  return (
    <div className="space-y-12 text-slate-800 dark:text-slate-200 font-medium leading-relaxed max-w-4xl mx-auto">
      {/* 1. H1 TITLE & INTRO */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          Calculadora de Financiamento VA (Militares)
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-400 leading-normal font-normal">
          Calcule prestações de crédito VA, taxas de financiamento (Funding Fee), encargo total PITI, poder de compra com 0% de entrada, amortização acelerada e refinanciamento IRRRL.
        </p>
      </div>

      {/* 2. WHAT IS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          1. O que é uma Calculadora de Hipoteca VA?
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Esta ferramenta projeta as parcelas e o custo total de financiamentos imobiliários garantidos pelo governo para militares e veteranos. Modela taxas legais de financiamento, IPTU, seguros e planos de amortização.
        </p>
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-slate-800/80 border border-blue-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Aviso do Modelo Financeiro</span>
          </div>
          <p>
            Este simulador tem caráter educacional e não substitui o Certificado de Elegibilidade (COE).
          </p>
        </div>
      </section>

      {/* 3. HOW TO USE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          2. Como Usar a Calculadora VA
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Siga este roteiro para avaliar seu financiamento :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          
            <div key={0} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">1. Informe o preço de compra do imóvel.</span>
            </div>
            <div key={1} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">2. Defina o percentual de entrada planejado (0% a 100%).</span>
            </div>
            <div key={2} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">3. Escolha sua categoria militar (Ativa/Veterano, Reserva ou Cônjuge).</span>
            </div>
            <div key={3} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">4. Indique se é o primeiro uso ou uso subsequente do benefício.</span>
            </div>
            <div key={4} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">5. Insira a taxa de juros fixa e o prazo do contrato em anos.</span>
            </div>
            <div key={5} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">6. Opte por financiar a taxa VA ou pagá-la à vista no fechamento.</span>
            </div>
            <div key={6} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">7. Ative a isenção por invalidez militar caso seja aplicável.</span>
            </div>
            <div key={7} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">8. Analise o capital financiado, a parcela P&I e o valor total PITI.</span>
            </div>
            <div key={8} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">9. Inspecione a tabela de amortização completa.</span>
            </div>
            <div key={9} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">10. Compare com as modalidades FHA e convencional.</span>
            </div>
            <div key={10} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">11. Calcule a capacidade com 0% de entrada pelo módulo de Entitlement.</span>
            </div>
            <div key={11} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">12. Simule a quitação acelerada com pagamentos quinzenais.</span>
            </div>
            <div key={12} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">13. Teste aportes extras de amortização mensal.</span>
            </div>
            <div key={13} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300 font-medium">14. Avalie a economia no refinanciamento IRRRL.</span>
            </div>
        </div>
      </section>

      {/* 4. CORE FORMULA */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          3. Fórmula de Amortização e Composição PITI
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          A prestação mensal fixa de principal e juros (P&I) é calculada por :
        </p>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3 text-center font-mono">
          <div className="font-bold text-blue-600 text-sm font-sans">Fórmula da Parcela Mensal (Amortização + Juros)</div>
          <div className="p-3 bg-white dark:bg-slate-950 rounded-xl text-base font-bold text-blue-600 dark:text-blue-400 shadow-inner">
            {"M = P × [r(1+r)^n] / [(1+r)^n - 1]"}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-400 font-sans text-left space-y-1.5 pt-1">
            <div>• <strong>M :</strong>  Parcela mensal de amortização e juros.</div>
            <div>• <strong>P :</strong>  Valor total financiado (Financiamento Base + Taxa VA Financiada).</div>
            <div>• <strong>r :</strong>  Taxa de juros mensal (Taxa Anual / 12 / 100).</div>
            <div>• <strong>n :</strong>  Número de parcelas mensais (Prazo × 12).</div>
          </div>
        </div>

        <p className="text-sm text-slate-700 dark:text-slate-300">
          O encargo mensal total habitacional (PITI) inclui os custos tributários e securitários :
        </p>
        <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-mono text-slate-800 dark:text-slate-200">
          {"Total PITI Mensual = P&I + (IPTU / 12) + (Seguro / 12) + Condomínio"}
        </div>
      </section>

      {/* 5. FUNDING FEE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          4. Taxa de Financiamento VA (Funding Fee)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Taxa governamental única obrigatória por lei (38 U.S.C. § 3729) que mantém o fundo de garantia estatal.
        </p>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Substitui a necessidade de entrada e seguro PMI mensal, podendo ser financiada ou paga no fechamento.
        </p>
      </section>

      {/* 6. FIRST VS SUBSEQUENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          5. Primeiro Uso vs. Uso Subsequente
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O histórico de uso do benefício altera a alíquota aplicável sem entrada :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">Primeiro Uso (0% de Entrada)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Em 500.000 $, a taxa legal é de 2,15% (10.750 $). O saldo financiado fica em 510.750 $, gerando parcela P&I de 3.228,29 $ e PITI total de 3.936,62 $/mês.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-extrabold text-sm text-blue-600">Uso Subsequente (0% de Entrada)</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Em operações subsequentes sem entrada, a taxa sobe para 3,30% (16.500 $). O saldo sobe para 516.500 $ e o PITI para 3.973,13 $/mês.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-500 italic">
          *Nota : Com 5% ou mais de entrada, a taxa de uso subsequente é reduzida para 1,50% (igual ao primeiro uso).
        </p>
      </section>

      {/* 7. STATUTORY MATRIX TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          6. Tabela Legal de Alíquotas da Taxa VA
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Faixa de Entrada</th>
                <th className="p-3">Primeiro Uso</th>
                <th className="p-3">Uso Subsequente</th>
                <th className="p-3 rounded-tr-xl">Alíquota Isenta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"< 5% Entrada (0% Down)"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"2.15%"}</td>
                <td className="p-3 font-mono font-bold text-red-500">{"3.30%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Isento)"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"5% – 9.99% Entrada"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.50%"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.50%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Isento)"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"≥ 10% Entrada"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.25%"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.25%"}</td>
                <td className="p-3 font-mono font-bold text-emerald-600">{"0.00% (Isento)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 8. EXEMPTIONS */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          7. Isenções Legais da Taxa de Financiamento (Taxa 0%)
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Determinados beneficiários são isentos do pagamento desta taxa :
        </p>
        <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-2 text-slate-700 dark:text-slate-300">
          <span className="font-extrabold text-emerald-700 dark:text-emerald-300 block">Quem tem Direito à Isenção :</span>
          <ul className="space-y-1 list-disc list-inside">
            <li>Veteranos com pensão por incapacidade ligada ao serviço militar (10%+).</li>
            <li>Veteranos aptos à indenização por invalidez que recebem proventos de reserva.</li>
            <li>Militares da ativa condecorados com o Purple Heart.</li>
            <li>Cônjuges sobreviventes de militares falecidos em serviço (recebedores de DIC).</li>
          </ul>
        </div>
      </section>

      {/* 9. CASH VS FINANCED */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          8. Comparativo : Financiar a Taxa vs. Pagamento à Vista
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          Pesar a liquidez imediata contra o custo acumulado de juros :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">Financiada no Contrato</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Em 500.000 $ com 3,30% de taxa (16.500 $), o saldo financiado vai para 516.500 $ e a parcela para 3.264,80 $. O desembolso inicial fica em 12.500 $.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
            <h3 className="font-bold text-blue-600">Paga à Vista no Fechamento</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Pagar os 16.500 $ à vista mantém a dívida em 500.000 $ e a parcela em 3.160,34 $, exigindo 29.000 $ de recursos iniciais.
            </p>
          </div>
        </div>
      </section>

      {/* 10. 3-WAY COMPARISON TABLE */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          9. Comparativo 3-Vias : Financiamento VA vs. FHA vs. Convencional
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse font-sans">
            <thead>
              <tr className="bg-blue-600 text-white font-bold">
                <th className="p-3 rounded-tl-xl">Programa</th>
                <th className="p-3">Entrada Mínima</th>
                <th className="p-3">Seguro Mensal</th>
                <th className="p-3">Taxa Inicial</th>
                <th className="p-3 rounded-tr-xl">Gasto Total em 30 Anos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-white dark:bg-slate-900 font-medium">
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Financiamento VA"}</td>
                <td className="p-3 font-bold text-emerald-600">{"0% (0 $)"}</td>
                <td className="p-3 text-emerald-600 font-bold">{"0 $ (Sem PMI)"}</td>
                <td className="p-3">{"2.15% Financiado (10.750 $)"}</td>
                <td className="p-3 font-mono font-bold text-blue-600">{"1.357.200 $ (3.770 $/mês)"}</td>
              </tr>
              
              <tr className="bg-slate-50/50 dark:bg-slate-800/40">
                <td className="p-3 font-bold text-blue-600">{"Financiamento FHA"}</td>
                <td className="p-3 font-bold ">{"3.5% (17.500 $)"}</td>
                <td className="p-3 text-red-500">{"0.55% MIP Permanente"}</td>
                <td className="p-3">{"1.75% UFMIP (8.444 $)"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.421.640 $ (3.949 $/mês)"}</td>
              </tr>
              
              <tr className="">
                <td className="p-3 font-bold text-blue-600">{"Convencional"}</td>
                <td className="p-3 font-bold text-emerald-600">{"5.0% (25.000 $)"}</td>
                <td className="p-3 ">{"0.60% PMI (Anos 1-8)"}</td>
                <td className="p-3">{"0 $ Taxa Inicial"}</td>
                <td className="p-3 font-mono font-bold text-slate-800 dark:text-slate-200">{"1.356.903 $ (3.943 $/mês)"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400">
          O financiamento VA economiza 64.440 $ em relação ao FHA pela ausência de seguro mensal permanente e empata com o convencional sem exigir 25.000 $ de entrada.
        </p>
      </section>

      {/* 11. ENTITLEMENT */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          10. Garantia (Entitlement) e Poder de Compra com 0% de Entrada
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O Entitlement define a capacidade de compra garantida sem entrada :
        </p>
        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">Garantia Plena</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Com garantia plena, não há limite máximo legal para financiamentos com 0% de entrada.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-bold text-blue-600">Garantia Parcial</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Havendo outro financiamento VA ativo, aplicam-se os limites regionais para calcular o saldo remanescente :
            </p>
            <div className="font-mono bg-white dark:bg-slate-950 p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 space-y-0.5 text-[11px] text-slate-700 dark:text-slate-300">
              <div>{"Garantia Remanescente = max(0, Teto Regional × 25% - Garantia Utilizada)"}</div>
              <div>{"Preço Máximo com 0% Entrada = Garantia Remanescente × 4"}</div>
              <div>{"Entrada Exigida = max(0, (Preço Alvo - Preço Máximo com 0%) × 25%)"}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. ACCELERATED PAYOFF */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          11. Amortização Acelerada : Pagamentos Quinzenais e Aportes Extras
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">Pagamento Quinzenal</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Pagar metade da parcela a cada 2 semanas (26 pagamentos/ano) economiza 150.027 $ em juros e encurta o prazo em 5,8 anos.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <h3 className="font-bold text-blue-600">Aportes Extras Mensais de Amortização</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Aportar 200 $/mês adicionais economiza 118.241 $ em juros e reduz o contrato em 55 meses (4,6 anos).
            </p>
          </div>
        </div>
      </section>

      {/* 13. IRRRL */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          12. Refinanciamento Simplificado VA IRRRL
        </h2>
        <p className="text-sm text-slate-700 dark:text-slate-300">
          O IRRRL permite reduzir juros sem vistoria com taxa reduzida de apenas 0,50% :
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
          <span className="font-bold text-blue-600 block">Exemplo IRRRL (Saldo 350.000 $, redução de 7.25% para 6.00%) :</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-center">
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Economia Mensal</span>
              <span className="text-emerald-600 font-extrabold">279 $ / mês</span>
            </div>
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Prazo de Retorno</span>
              <span className="text-emerald-600 font-extrabold">17 Meses</span>
            </div>
            
            <div className="p-2.5 bg-white dark:bg-slate-950 rounded-lg border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-400 block font-sans uppercase">Ganho Líquido em 5 Anos</span>
              <span className="text-emerald-600 font-extrabold">11.990 $</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic pt-1">
            *Nota : Reiniciar o prazo em 30 anos pode elevar os juros totais se o financiamento original já estiver avançado.
          </p>
        </div>
      </section>

      {/* 14. SERVICE ELIGIBILITY */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          13. Requisitos Mínimos de Serviço
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Serviço em Tempo de Guerra</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Mínimo de 90 dias consecutivos de serviço ativo em períodos bélicos.</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Serviço em Tempo de Paz</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Mínimo de 181 dias contínuos de serviço militar ativo em tempos de paz.</p>
          </div>
          
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1">
            <h3 className="font-extrabold text-blue-600">Guarda Nacional e Reserva</h3>
            <p className="text-slate-600 dark:text-slate-400 font-normal">Mínimo de 6 anos computáveis ou 90 dias de serviço ativo federal.</p>
          </div>
        </div>
      </section>

      {/* 15. COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 tracking-tight">
          14. Erros Comuns a Evitar
        </h2>
        <div className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <ul className="space-y-1.5 list-disc list-inside">
            <li>Informar incorretamente primeiro uso ou uso subsequente do crédito.</li>
            <li>Supor taxa idêntica para todos os solicitantes sem checar a entrada.</li>
            <li>Esquecer que financiar a taxa eleva o principal e os juros mensais.</li>
            <li>Comparar apenas a parcela P&I da VA com o PITI total de outros empréstimos.</li>
            <li>Considerar tetos regionais fixos sem acompanhar reajustes anuais.</li>
            <li>Confundir a simulação online com o Certificado de Elegibilidade oficial (COE).</li>
            <li>Presumir que todos os credores aceitam amortização quinzenal direta.</li>
            <li>Desconsiderar o impacto do reinício de prazo no refinanciamento IRRRL.</li>
            <li>Não apresentar laudo oficial para isenção por invalidez.</li>
            <li>Assumir que a VA é sempre a opção mais barata tendo mais de 20% de entrada.</li>
          </ul>
        </div>
      </section>

      {/* 16. REGULATORY NOTICE */}
      <section className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400">
        <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Orientação Educacional e Marco Regulatório</span>
        </div>
        <p>
          Os empréstimos VA são regulados pelo Título 38 do Código dos EUA. Esta ferramenta fornece simulações matemáticas para fins de planejamento.
        </p>
      </section>
    </div>
  );
};

export const LocalizedPack: CalculatorLocalizedContent = {
  locale: "pt",
  calculatorSlug: "va-mortgage-calculator",
  seo,
  faqs,
  ContentComponent
};

export default LocalizedPack;
