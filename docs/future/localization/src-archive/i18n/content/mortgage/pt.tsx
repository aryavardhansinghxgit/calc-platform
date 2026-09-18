"use client";

import React from "react";
import Link from "next/link";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const PORTUGUESE_MORTGAGE_SEO = {
  title: "Calculadora de Hipoteca",
  description:
    "Calcule as suas prestações mensais de hipoteca (capital e juros), impostos sobre imóveis, seguro de habitação, PMI e quotas de condomínio. Simule amortizações extraordinárias, pagamentos quinzenais e plano de amortização completo.",
  category: "Finanças",
  keywords: [
    "calculadora de hipoteca",
    "crédito habitação simulador",
    "prestação mensal hipoteca",
    "tabela de amortização",
    "taxa de juro crédito habitação",
    "seguro pmi",
    "imposto sobre imóveis",
    "seguro de habitação",
    "amortização extraordinária",
    "pagamento quinzenal",
  ],
};

export const PORTUGUESE_MORTGAGE_FAQS: CalculatorFAQ[] = [
  {
    question: "Como é calculada a prestação mensal de capital e juros?",
    answer:
      "A sua prestação base é calculada através da fórmula de amortização a taxa fixa: M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ], onde P é o montante do empréstimo, r é a taxa de juro periódica mensal (taxa nominal anual dividida por 12) e n é o número total de períodos mensais de pagamento (ex. 360 meses para uma hipoteca a 30 anos).",
  },
  {
    question: "Qual é a diferença entre PITI e o Desembolso Mensal Total de Habitação?",
    answer:
      "PITI é o padrão bancário tradicional composto por Capital (Principal), Juros (Interest), Impostos sobre imóveis (Taxes) e Seguro de habitação (Insurance). O Desembolso Mensual Total é uma estimativa orçamental global que engloba o PITI mais o Seguro Hipotecário Privado (PMI), quotas de condomínio (HOA), reservas de manutenção e amortizações extraordinárias voluntárias.",
  },
  {
    question: "Qual é a diferença entre a taxa de juro nominal e a TAEG (APR)?",
    answer:
      "A taxa de juro nominal (note rate) é a percentagem anual cobrada sobre o saldo de capital em dívida. A Taxa Anual Efetiva Global (TAEG / APR) reflete a taxa nominal acrescida de comissões de abertura, pontos de desconto e custos obrigatórios de formalização expressos sob a forma de uma percentagem anualizada.",
  },
  {
    question: "Quando é que o Seguro Hipotecário Privado (PMI) pode ser cancelado?",
    answer:
      "Ao abrigo das normas legais vigentes (como o Homeowners Protection Act de 1998 nos EUA), os mutuários têm o direito legal de solicitar o cancelamento do PMI por escrito assim que o saldo devedor atinge 80% do valor de compra original do imóvel (LTV 80%). A eliminação torna-se automática quando o plano programado atinge 78% LTV, desde que os pagamentos estejam em dia.",
  },
  {
    question: "De que forma as amortizações extraordinárias encurtam o prazo do empréstimo?",
    answer:
      "As amortizações extraordinárias abatem 100% diretamente ao saldo de capital em dívida. Como os juros futuros são calculados sobre este montante devedor menor, os encargos de juros descem permanentemente, permitindo que as prestações fixas liquidem a totalidade da dívida anos antes do prazo contratado.",
  },
  {
    question: "Como é que um plano de pagamento quinzenal poupa juros?",
    answer:
      "Um plano quinzenal divide a prestação mensal de capital e juros ao meio (M / 2) e efetua o pagamento a cada duas semanas. Como o ano tem 52 semanas, realiza 26 meios pagamentos, o que equivale a 13 prestações mensais completas por ano. Esta prestação extra anual aplicada ao capital reduz substancialmente o prazo de 30 anos e poupa milhares em juros acumulados.",
  },
];

export function PortugueseMortgageContent() {
  return (
    <div className="space-y-10 py-4 text-slate-900 dark:text-slate-100">
      {/* SECTION 1: Introdução */}
      <section className="space-y-3">
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
          Compreender a Sua Hipoteca e os Custos Totais de Habitação
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Um crédito à habitação residencial representa um dos compromissos financeiros de mais longo prazo que uma família pode assumir.
          Embora os compradores avaliem frequentemente os imóveis tendo em conta apenas o preço de compra contratual e a taxa de juro nominal,
          o custo real da propriedade imobiliária engloba o serviço da dívida, impostos municipais sobre imóveis, seguro multirriscos,
          quotas de condomínio e, eventualmente, seguro hipotecário privado (PMI).
        </p>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Esta <strong>Calculadora de Hipoteca</strong> foi desenvolvida para disponibilizar uma discriminação detalhada e transparente das
          suas despesas de habitação. Indo além dos cálculos elementares de capital e juros, permite-lhe simular contas de garantia (escrow),
          inflação anual projetada de custos, planos acelerados de pagamento quinzenal e estratégias personalizadas de amortização antecipada
          de capital para quantificar a poupança total em juros.
        </p>
      </section>

      {/* SECTION 2: Como Utilizar a Calculadora */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Como Utilizar a Calculadora de Hipoteca
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          O simulador está estruturado em módulos interativos que atualizam em tempo real as prestações mensais, gráficos e planos de amortização:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Preço do Imóvel e Entrada Inicial</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Introduza o preço de aquisição do imóvel e o montante da entrada inicial (em valor ou percentagem). O simulador calcula automaticamente o montante do empréstimo e o rácio financiamento-garantia (LTV).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Prazo do Empréstimo e Taxa de Juro</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Defina o prazo de reembolso (ex. 15 ou 30 anos) e a taxa de juro nominal anual fixa aplicada sobre o capital devedor.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Impostos, Seguro e PMI</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Indique os impostos anuais sobre a propriedade (em montante fixo ou percentagem), os prémios anuais de seguro de habitação e as taxas de PMI aplicáveis quando a entrada é inferior a 20%.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Condomínio e Fundo de Reserva</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Introduza as quotas mensais de condomínio (HOA) e as reservas anuais de manutenção (que a calculadora divide por 12 para fixar uma provisão mensal).
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Aumento Anual de Custos (Inflação)</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Modele a inflação a longo prazo especificando os aumentos percentuais anuais projetados para impostos municipais, seguros, condomínio e despesas de manutenção.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100">Amortização Extra e Pagamento Quinzenal</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Simule pagamentos extraordinários mensais, aportes anuais, até 8 pagamentos pontuais ou ative o plano quinzenal de 26 períodos anuais.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: O que a Calculadora Calcula */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          O que a Calculadora de Hipoteca Calcula
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A ferramenta apresenta uma síntese abrangente dos seus encargos mensais iniciais e das responsabilidades financeiras acumuladas ao longo de 30 anos:
        </p>
        <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Capital e Juros (Base P&amp;I):</strong> A prestação contratual mensal necessária para liquidar integralmente o saldo devedor durante o prazo contratado.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Provisão Mensal de Impostos Imobiliários:</strong> Exatamente 1/12 da obrigação tributária anual estimada sobre o imóvel.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Provisão Mensal de Seguro de Habitação:</strong> Exatamente 1/12 do prémio anual do seguro multirriscos habitação.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Seguro Hipotecário Privado Mensal (PMI):</strong> Taxa temporária cobrada quando a entrada inicial é inferior a 20% (LTV &gt; 80%).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Condomínio e Manutenção:</strong> Quotas de condomínio mais 1/12 das reservas anuais de manutenção.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Desembolso Mensal Global de Habitação:</strong> O orçamento mensal total do primeiro ano (P&amp;I + Impostos + Seguro + PMI + Condomínio + Manutenção + Amortização Extra).</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Juros Totais e Custo Global do Empréstimo:</strong> O total de juros acumulados ao longo do prazo e o valor global desembolsado em todas as categorias.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-blue-600 dark:text-blue-400">•</span>
            <span><strong>Data de Liquidação Final:</strong> O mês e ano de calendário precisos em que a dívida de capital atinge 0,00 $.</span>
          </li>
        </ul>
      </section>

      {/* SECTION 4: Como as Prestações são Calculadas */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Como são Calculadas as Prestações Mensais da Hipoteca
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          As prestações de crédito à habitação a taxa fixa são calculadas através do modelo matemático das anuidades constantes. Em cada pagamento, a soma da amortização de capital e dos juros periódicos permanece constante durante toda a vigência.
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
            Fórmula Padrão da Hipoteca a Taxa Fixa:
          </span>
          <div className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-slate-100 py-1 overflow-x-auto">
            M = P × [ r(1 + r)^n ] / [ (1 + r)^n - 1 ]
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
            <div><strong>M:</strong> Prestação mensal de Capital e Juros</div>
            <div><strong>P:</strong> Montante do empréstimo (Preço do imóvel - Entrada)</div>
            <div><strong>r:</strong> Taxa de juro periódica mensal (Taxa nominal anual / 12 / 100)</div>
            <div><strong>n:</strong> Número total de períodos mensais (Prazo em anos × 12)</div>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <strong>Cenário Limite a Taxa Zero:</strong> Na hipótese de um empréstimo sem juros (r = 0), a fórmula simplifica-se numa divisão linear: <code>M = P / n</code>. Os juros totais são $0,00 e cada dólar pago amortiza diretamente o capital em dívida.
        </p>
      </section>

      {/* SECTION 5: Exemplo Completo Passo a Passo */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Exemplo Completo Calculado Passo a Passo
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Para ilustrar a formação do seu orçamento mensal total, examine a memória de cálculo do seguinte cenário de referência:
        </p>
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-3 text-xs">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-slate-200 dark:border-slate-700 pb-2.5">
            <div><span className="text-slate-500 block">Preço do Imóvel:</span><strong>$400.000,00</strong></div>
            <div><span className="text-slate-500 block">Entrada (20%):</span><strong>$80.000,00</strong></div>
            <div><span className="text-slate-500 block">Montante do Empréstimo (P):</span><strong>$320.000,00</strong></div>
            <div><span className="text-slate-500 block">Taxa de Juro:</span><strong>6,706%</strong></div>
          </div>
          <div className="space-y-1.5 font-mono text-[11px] leading-relaxed">
            <p>1. Taxa Mensal (r) = 0,06706 / 12 = 0,0055883333...</p>
            <p>2. Número de Períodos (n) = 30 anos × 12 = 360 meses</p>
            <p>3. Fator de Capitalização (1 + r)^360 = (1,0055883333)^360 ≈ 7,464627</p>
            <p>4. Prestação P&amp;I = $320.000 × [ 0,0055883333 × 7,464627 ] / [ 7,464627 - 1 ] = <strong>$2.066,16</strong></p>
            <p>5. Imposto Imobiliário Mensal (1,2% sobre $400k) = $4.800,00 / 12 = <strong>$400,00</strong></p>
            <p>6. Seguro de Habitação Mensal = $1.500,00 / 12 = <strong>$125,00</strong></p>
            <p>7. PMI Mensal = $0,00 (Isento devido aos 20% de entrada inicial)</p>
            <p>8. Quotas de Condomínio (HOA) = <strong>$333,33</strong></p>
            <p>9. Reserva Mensal de Manutenção = $4.000,00 / 12 = <strong>$333,33</strong></p>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 text-xs font-sans font-bold text-blue-700 dark:text-blue-400">
              Desembolso Mensal Global = $2.066,16 + $400,00 + $125,00 + $0,00 + $333,33 + $333,33 = $3.257,82 / mês
            </div>
            <div className="text-[11px] font-sans text-slate-600 dark:text-slate-400">
              Custo Total ao Longo de 30 Anos = $320.000 (Capital) + $423.818,78 (Juros) + $144.000 (Impostos) + $45.000 (Seguro) + $120.000 (Condomínio) + $120.000 (Manutenção) = <strong>$1.172.818,78</strong>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Mecânica de Amortização */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mecânica da Amortização Hipotecária
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Amortização é o processo de extinção gradual da dívida através de pagamentos regulares programados. Numa hipoteca a taxa fixa, a decomposição interna da prestação evolui permanentemente:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Primeiros Anos (Anos 1 a 5)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Como os juros mensais incidem sobre o elevado saldo devedor inicial (<code>Juros = Saldo × r</code>), os juros absorvem a maior parcela das primeiras prestações. No mês 1 do nosso exemplo, $1.788,27 destinam-se a juros e apenas $277,89 abatem ao capital.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Últimos Anos (Anos 20 a 30)</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              À medida que as amortizações reduzem o capital em dívida, o encargo de juros cai proporcionalmente. Mantendo-se constante a prestação global, uma parcela progressivamente maior abate ao capital, aumentando rapidamente o património líquido.
            </p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Para consultar um plano detalhado para efeitos de planeamento fiscal de deduções, utilize a nossa{" "}
          <Link href="/calculators/amortization-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculadora de amortização dedicada
          </Link>.
        </p>
      </section>

      {/* SECTION 7: Impostos e Seguros */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Impostos Imobiliários, Seguro de Habitação e Contas de Garantia (Escrow)
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A maioria das instituições bancárias exige a manutenção de uma <strong>conta de garantia (escrow)</strong> para assegurar que impostos municipais e seguros são liquidados atempadamente.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          A entidade gestora do crédito cobra mensalmente 1/12 das despesas anuais previstas de impostos e seguros. Uma revisão anual ajusta as cobranças em função das atualizações tributárias municipais. Neste simulador, a definição de uma percentagem de aumento anual permite antecipar o impacto da inflação sobre estes custos ao longo de 15 a 30 anos.
        </p>
      </section>

      {/* SECTION 8: PMI e Limiares LTV */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Seguro Hipotecário Privado (PMI) e Limiares de Financiamento-Garantia (LTV)
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Ao contrair um empréstimo convencional com uma entrada inferior a 20% do preço de compra, o rácio financiamento-garantia (LTV) supera os 80%. Os bancos exigem um seguro hipotecário privado (PMI) para mitigar o risco de crédito.
        </p>
        <div className="p-3.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs space-y-1.5">
          <span className="font-bold text-blue-900 dark:text-blue-200 block">
            Diretrizes Regulamentares de Cancelamento do PMI (Homeowners Protection Act):
          </span>
          <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
            <li><strong>Cancelamento por Solicitação do Mutuário (80% LTV):</strong> O mutuário tem o direito legal de solicitar o cancelamento do PMI por escrito assim que o saldo de capital atinge 80% do valor de avaliação original do imóvel.</li>
            <li><strong>Cancelamento Automático pelo Credor (78% LTV):</strong> O banco tem a obrigação legal de cancelar automaticamente o PMI na data em que a dívida atinge 78% LTV de acordo com o plano de amortização inicial.</li>
          </ul>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          <em>Premissa de Modelação:</em> Esta ferramenta utiliza a <strong>premissa de 80% LTV</strong> para cessar a cobrança de PMI no plano de amortização. Para avaliar diferentes opções de entrada, explore a nossa{" "}
          <Link href="/calculators/down-payment-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculadora de entrada inicial
          </Link>.
        </p>
      </section>

      {/* SECTION 9: Condomínio e Custos de Manutenção */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Quotas de Condomínio e Custos Acessórios de Habitação
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Um erro comum consiste em confundir o conceito <strong>PITI</strong> (Capital, Juros, Impostos, Seguro) com o <strong>custo total de ocupação do imóvel</strong>.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          As despesas de condomínio (HOA) são pagas diretamente à administração para financiar a manutenção das partes comuns e fundos de reserva. Adicionalmente, recomenda-se provisionar fundos para a manutenção da habitação. Na nossa calculadora, ao inserir um valor anual em <code>Outros Custos ($/ano)</code>, este é dividido por 12 e adicionado ao seu orçamento mensal sem desvirtuar a dívida bancária.
        </p>
      </section>

      {/* SECTION 10: Amortizações Extraordinárias */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Amortizações Extraordinárias e Liquidação Acelerada de Capital
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Efetuar amortizações extraordinárias de capital reduz substancialmente os encargos totais com juros e encurta a duração do empréstimo:
        </p>
        <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              <tr>
                <th className="p-2.5 font-bold">Estratégia de Amortização (Empréstimo $320k a 6,706%)</th>
                <th className="p-2.5 font-bold">Novo Prazo</th>
                <th className="p-2.5 font-bold">Tempo Poupado</th>
                <th className="p-2.5 font-bold">Total de Juros Poupados</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700 font-sans tabular-nums text-slate-600 dark:text-slate-400">
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Base (Sem Pagamentos Extra)</td>
                <td className="p-2.5">360 Meses (30,0 Anos)</td>
                <td className="p-2.5">0 Meses</td>
                <td className="p-2.5">$0,00</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+$200 / Mês de Capital Extra</td>
                <td className="p-2.5">295 Meses (~24,6 Anos)</td>
                <td className="p-2.5">65 Meses (5,4 Anos)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$90.073,60</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">+$2.000 / Ano (Bónus Anual)</td>
                <td className="p-2.5">289 Meses (~24,1 Anos)</td>
                <td className="p-2.5">71 Meses (5,9 Anos)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$97.337,83</td>
              </tr>
              <tr>
                <td className="p-2.5 font-sans font-medium text-slate-900 dark:text-slate-100">Amortização Única de $20.000 (Mês 12)</td>
                <td className="p-2.5">304 Meses (~25,3 Anos)</td>
                <td className="p-2.5">56 Meses (4,7 Anos)</td>
                <td className="p-2.5 text-emerald-600 dark:text-emerald-400 font-semibold">$84.926,92</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Se as taxas de juro de mercado tiverem descido, calcule potenciais poupanças de transferência de crédito com a nossa{" "}
          <Link href="/calculators/refinance-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculadora de transferência de crédito habitação (Refinance)
          </Link>.
        </p>
      </section>

      {/* SECTION 11: Pagamentos Quinzenais */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Mecânica dos Pagamentos Quinzenais
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Um crédito à habitação convencional requer 12 prestações mensais por ano. Num plano quinzenal, paga metade da prestação de capital e juros (<code>M / 2</code>) a cada duas semanas.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Dado que o ano tem 52 semanas, este plano resulta em <strong>26 meios pagamentos</strong>, o que equivale a <strong>13 prestações mensais completas por ano</strong> (<code>26 × 0,5 = 13</code>). Esta amortização anual adicional aplicada diretamente ao capital encurta o prazo em vários anos.
        </p>
      </section>

      {/* SECTION 12: 15 Anos vs. 30 Anos */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Hipoteca a 15 Anos vs. 30 Anos a Taxa Fixa
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          A escolha entre 15 e 30 anos traduz-se numa ponderação direta entre flexibilidade orçamental mensal e custo total de juros:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Hipoteca a 30 Anos</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Prestações mensais obrigatórias mais baixas.</li>
              <li>Maior flexibilidade para acomodar imprevistos no orçamento familiar.</li>
              <li>Volume total de juros pagos superior ao longo do tempo.</li>
            </ul>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">Hipoteca a 15 Anos</h4>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              <li>Prestações mensais mais elevadas (tipicamente 35% a 50% superiores).</li>
              <li>Poupança expressiva em juros (frequentemente superior a 50%).</li>
              <li>Crescimento rápido do capital próprio nos primeiros cinco anos.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 13: Capacidade de Compra e DTI */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Qual o Valor de Imóvel que Pode Comprar?
        </h3>
        <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          Calcular a prestação com base num preço conhecido é uma estimativa direta. Contudo, se estiver a iniciar a procura de casa e pretender definir o seu orçamento máximo a partir do rendimento bruto e das dívidas existentes, necessita de uma análise de taxa de esforço.
        </p>
        <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
          Os bancos avaliam a capacidade de crédito através do <strong>rácio dívida-rendimento (DTI / taxa de esforço)</strong> :
          o rácio de habitação (encargos de habitação divididos pelo rendimento mensal bruto, normalmente balizado nos 28-33%) e o rácio de endividamento total (todas as prestações de crédito combinadas, normalmente balizado nos 36-43%). Para calcular a sua capacidade, consulte a nossa{" "}
          <Link href="/calculators/house-affordability-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculadora de capacidade financeira de compra
          </Link>{" "}
          ou verifique os seus rácios na nossa{" "}
          <Link href="/calculators/dti-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            calculadora de DTI
          </Link>.
        </p>
      </section>

      {/* SECTION 14: Erros Comuns */}
      <section className="space-y-3">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Erros Frequentes no Cálculo da Hipoteca
        </h3>
        <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>1. Confundir Taxa Nominal com TAEG (APR):</strong> A taxa nominal determina o montante de juros sobre o saldo devedor. A TAEG inclui todas as comissões e despesas iniciais. Inserir a TAEG na fórmula de amortização sobrestimará a prestação mensal real.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>2. Orçamentar Exclusivamente Capital e Juros:</strong> Omitir impostos imobiliários, seguros e condomínio pode gerar um défice de 20% a 40% face aos gastos reais com a habitação.
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <strong>3. Supor que Empréstimos Especiais Seguem as Regras da Hipoteca Convencional:</strong> Programas governamentais (como empréstimos FHA ou VA) possuem regras próprias de seguros. Para esses casos, consulte a nossa{" "}
            <Link href="/calculators/fha-loan-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              calculadora de empréstimo FHA
            </Link>{" "}
            ou a nossa{" "}
            <Link href="/calculators/va-mortgage-calculator" className="font-semibold text-blue-600 dark:text-blue-400 hover:underline">
              calculadora de empréstimo VA
            </Link>.
          </div>
        </div>
      </section>

      {/* SECTION 15: Calculadoras Relacionadas */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Calculadoras Imobiliárias e Financeiras Relacionadas
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <Link
            href="/calculators/house-affordability-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Capacidade de Compra
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Calcule o orçamento máximo com base no rendimento.</span>
          </Link>
          <Link
            href="/calculators/amortization-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Calculadora de Amortização
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Planos de amortização anuais e mensais detalhados.</span>
          </Link>
          <Link
            href="/calculators/down-payment-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Entrada Inicial
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Otimize a sua entrada e elimine o seguro PMI.</span>
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Transferência de Crédito
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Calcule a poupança e o ponto de retorno financeiro.</span>
          </Link>
          <Link
            href="/calculators/rent-vs-buy-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Arrendar vs Comprar
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Compare a acumulação de património a longo prazo.</span>
          </Link>
          <Link
            href="/calculators/dti-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Rácio DTI / Taxa de Esforço
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Verifique os seus rácios de esforço bancário.</span>
          </Link>
          <Link
            href="/calculators/fha-loan-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Empréstimo FHA
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Financiamento com 3,5% de entrada e prémio MIP.</span>
          </Link>
          <Link
            href="/calculators/va-mortgage-calculator"
            className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors group block"
          >
            <span className="font-bold text-slate-900 dark:text-slate-100 block group-hover:text-blue-600">
              Empréstimo VA
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Condições de financiamento militar sem entrada inicial.</span>
          </Link>
        </div>
      </section>

      {/* SECTION 16: Perguntas Frequentes */}
      <section className="space-y-4 pt-2">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
          Perguntas Frequentes (FAQ)
        </h3>
        <div className="space-y-3">
          {PORTUGUESE_MORTGAGE_FAQS.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1.5">
              <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {faq.question}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PortugueseMortgageContent;
