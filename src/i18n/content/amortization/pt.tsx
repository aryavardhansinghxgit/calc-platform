"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HelpCircle, ChevronDown, BookOpen, ShieldCheck } from "lucide-react";
import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const PORTUGUESE_AMORTIZATION_SEO = {
  title: "Calculadora de Amortização — Tabela e Calendário de Pagamentos de Financiamento",
  description:
    "Calcule parcelas mensais, divisão entre principal e juros, tabela de amortização completa, data de quitação e economia com amortizações extraordinárias.",
  category: "Finanças",
  keywords: [
    "calculadora de amortizacao",
    "tabela de amortizacao",
    "calendario de pagamentos emprestimo",
    "amortizacao financiamento imobiliario",
    "amortizacao extraordinarias",
    "divisao principal e juros",
    "quitacao antecipada financiamento",
    "economia de juros",
  ],
};

export const PORTUGUESE_AMORTIZATION_FAQS: CalculatorFAQ[] = [
  {
    question: "O que é uma calculadora de amortização?",
    answer:
      "Uma calculadora de amortização projeta como o saldo devedor de um empréstimo ou financiamento é gradualmente quitado ao longo do tempo. Ela apresenta a parcela mensal, o valor destinado ao principal (capital) e aos juros, o saldo devedor restante após cada pagamento, os juros totais e a data final de quitação com base nas premissas informadas.",
  },
  {
    question: "Como é calculada a parcela de amortização?",
    answer:
      "Para um financiamento com taxa fixa (sistema Price / anuidade constante), a parcela é calculada a partir do capital financiado, da taxa de juros periódica mensal e do número total de prestações pela fórmula clássica de amortização a prestações constantes. A calculadora converte a taxa anual e o prazo em valores mensais antes de gerar a tabela.",
  },
  {
    question: "O que é uma tabela ou cronograma de amortização?",
    answer:
      "Uma tabela de amortização é um demonstrativo detalhado período a período que discrimina o valor da parcela, os juros debitados, a amortização do principal, o saldo inicial e o saldo devedor final. Ela permite acompanhar a evolução exata da dívida em vez de se limitar a uma única estimativa mensal.",
  },
  {
    question: "Por que se paga mais juros no início do financiamento?",
    answer:
      "Os juros são calculados sempre sobre o saldo devedor remanescente. No início do contrato, a dívida está em seu valor máximo, de modo que a maior parte da parcela é destinada ao pagamento de juros. Conforme o principal é amortizado, o saldo diminui e o valor dos juros mensais cai proporcionalmente.",
  },
  {
    question: "Quanto pagarei de juros durante todo o prazo do empréstimo?",
    answer:
      "Informe o valor financiado, a taxa de juros e o prazo. A calculadora soma os juros apurados em cada período. Para o exemplo validado de $ 200.000 a 6% ao ano por 15 anos, o total de juros acumulados no modelo é de $ 103.788,46.",
  },
  {
    question: "O que acontece se eu pagar $ 100 a mais todo mês?",
    answer:
      "O efeito depende do valor do empréstimo, da taxa, do prazo e do saldo devedor. No exemplo verificado, um aporte mensal adicional de $ 100 reduz expressivamente o prazo final e gera grande economia de juros. A calculadora projeta o resultado matemático exato desse cenário.",
  },
  {
    question: "Amortizações extraordinárias reduzem o total de juros pagos?",
    answer:
      "Sim. Os valores extras abatidos diretamente no principal reduzem o saldo devedor. Como os juros dos períodos seguintes incidem sobre uma base menor, o custo total dos juros cai e o financiamento é quitado muito antes do prazo original.",
  },
  {
    question: "Qual é a diferença entre uma amortização mensal extra e um aporte único?",
    answer:
      "A amortização mensal extra promove um abatimento contínuo e recorrente do saldo devedor, enquanto o aporte único realiza uma redução expressiva em um momento pontual. Amortizações efetuadas no início do financiamento geram maior economia acumulada, pois o saldo reduzido rende menos juros por mais períodos futuros.",
  },
  {
    question: "Um prazo mais longo diminui o valor da parcela mensal?",
    answer:
      "Geralmente sim, mantendo-se o capital e a taxa constantes, pois a dívida é diluída em mais prestações. Em contrapartida, o volume total de juros pagos ao longo do financiamento aumenta expressivamente. A calculadora permite avaliar o equilíbrio entre parcela mensal e custo total.",
  },
  {
    question: "A calculadora de amortização inclui impostos e seguros?",
    answer:
      "O cálculo matemático central foca estritamente no principal e juros (P&I). Em contratos imobiliários reais, a prestação pode incluir seguro habitacional (MIP/DFI), taxa de administração, impostos prediais ou taxas de condomínio, que são adicionais à amortização pura.",
  },
  {
    question: "Esta calculadora pode simular taxas variáveis (ARM / pós-fixadas)?",
    answer:
      "Não. Esta ferramenta modela um cronograma de amortização a taxa pré-fixada (fixa) constante. Financiamentos com indexadores variáveis (como TR, IPCA, CDI ou SOFR) requerem modelos específicos com projeção de índices e margens contratuais.",
  },
  {
    question: "O resultado da calculadora é uma garantia do valor exato de quitação?",
    answer:
      "Não. Trata-se de uma projeção matemática baseada nas variáveis informadas. Valores reais de quitação podem sofrer variações em função de datas de processamento bancário, tarifas, contas de depósito em garantia (escrow) e regras contratuais. Consulte sempre sua instituição financeira.",
  },
];

export function PortugueseAmortizationContent() {
  const [openFaqIndices, setOpenFaqIndices] = useState<Set<number>>(
    new Set(Array.from({ length: 12 }, (_, i) => i))
  );

  const toggleFaq = (index: number) => {
    setOpenFaqIndices((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <article className="mt-6 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-7 text-slate-800 dark:text-slate-200 leading-relaxed text-sm sm:text-base space-y-8 divide-y divide-slate-100 dark:divide-slate-800">
      {/* 1. CALCULADORAS FINANCEIRAS RELACIONADAS */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
          Calculadoras Financeiras Relacionadas
        </h2>
        <div className="flex flex-wrap gap-2 text-xs">
          <Link
            href="/calculators/mortgage-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Financiamento Imobiliário
          </Link>
          <Link
            href="/calculators/loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Empréstimos
          </Link>
          <Link
            href="/calculators/auto-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Financiamento de Veículos
          </Link>
          <Link
            href="/calculators/personal-loan-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Empréstimo Pessoal
          </Link>
          <Link
            href="/calculators/interest-rate-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Taxa de Juros
          </Link>
          <Link
            href="/calculators/emi-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora EMI
          </Link>
          <Link
            href="/calculators/refinance-calculator"
            className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1.5 rounded-lg text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Calculadora de Refinanciamento
          </Link>
        </div>
      </div>

      {/* 2. CONTEÚDO EDUCATIVO COMPLETO (17 SEÇÕES) */}
      <div className="space-y-8 pt-6 text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
        {/* Seção 1 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            1. O que é uma Calculadora de Amortização?
          </h2>
          <p>
            Uma calculadora de amortização demonstra de que maneira o saldo devedor de um financiamento ou empréstimo é progressivamente liquidado conforme as parcelas periódicas são quitadas. Em um contrato tradicional com taxa fixa e prestações amortizáveis, cada prestação mensal é composta por uma parcela de juros e uma parcela de amortização do capital (principal). No início do cronograma, o saldo devedor é máximo, fazendo com que a fração de juros seja expressiva; à medida que o principal é amortizado, a dívida diminui e o valor dos juros mensais cai. Uma parcela maior da prestação constante passa então a abater diretamente o capital. Órgãos de proteção ao consumidor financeiro (como o CFPB) destacam exatamente esse comportamento: as primeiras parcelas contêm majoritariamente juros, enquanto as parcelas finais abatem quase integralmente o saldo principal.
          </p>
          <p>
            Essa ferramenta é fundamental porque expõe todo o fluxo financeiro em vez de ocultar a dinâmica por trás de um único número mensal. O mutuário pode visualizar o valor da parcela, saldo devedor inicial, amortização do principal, juros incorridos, saldo final e totais acumulados mês a mês. O demonstrativo anual consolida essas informações em uma visão por ano de fácil leitura. É o recurso ideal para avaliar propostas bancárias, auditar tabelas de financiamento, planejar amortizações antecipadas em conjunto com nossa{" "}
            <Link href="/calculators/mortgage-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora de Financiamento Imobiliário
            </Link>
            , e projetar a velocidade de quitação da dívida.
          </p>
        </section>

        {/* Seção 2 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            2. Como são Calculadas as Parcelas Mensais de Amortização
          </h2>
          <p>
            No modelo a taxa fixa aqui implementado, a parcela mensal de capital e juros segue a consagrada fórmula de anuidades constantes (Sistema Price). Sendo <em>P</em> o capital inicial financiado, <em>r</em> a taxa de juros mensal periódica (taxa anual / 12) e <em>n</em> o número total de prestações mensais, a fórmula estabelece:
          </p>
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 font-sans tabular-nums text-xs sm:text-sm text-center">
            PMT = P &times; [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ &minus; 1 ]
          </div>
          <p>
            Para uma taxa nominal anual de 6,0%, a taxa periódica mensal utilizada no modelo é 0,06 / 12 = 0,005. O valor da parcela é calculado com base no prazo total em meses. O motor de cálculo mantém precisão total de ponto flutuante durante as etapas intermediárias e só arredonda os valores monetários na exibição final na interface, prevenindo desvios acumulados ao longo de 180 ou 360 meses.
          </p>
          <p>
            No cenário base auditado, um financiamento de $ 200.000 a 6% ao ano pelo prazo de 15 anos (180 meses) resulta em uma parcela exata de $ 1.687,71365 (exibida como $ 1.687,71). Ao longo dos 180 pagamentos programados, o modelo apura rigorosamente $ 200.000,00 de amortização do principal e $ 103.788,46 em juros acumulados, totalizando $ 303.788,46 em desembolsos de principal e juros.
          </p>
        </section>

        {/* Seção 3 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            3. Principal vs. Juros: Por Que a Proporção se Altera com o Tempo
          </h2>
          <p>
            No início de um financiamento amortizável, os juros incidem sobre o montante total da dívida. Consequentemente, o peso dos juros na parcela é alto e a amortização real da dívida é mais tímida. A cada parcela que reduz o saldo principal, a incidência de juros do mês subsequente incide sobre uma base menor.
          </p>
          <p>
            No caso de $ 200.000 a 6% em 15 anos, os juros do 1º mês somam $ 1.000,00 e o principal amortizado é de $ 687,71; no 12º mês, os juros diminuem para $ 961,19 enquanto a amortização do principal sobe para $ 726,52. O resumo anual reflete essa mesma trajetória: no ano 1 são quitados $ 8.483,33 de principal e $ 11.769,23 de juros; no ano 12, a amortização anual do principal atinge $ 16.386,52 para apenas $ 3.866,04 de juros.
          </p>
        </section>

        {/* Seção 4 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            4. O que Contém uma Tabela de Amortização Completa
          </h2>
          <p>
            A tabela de amortização mensal registra todo o histórico da dívida até a liquidação completa ($ 0,00). Cada linha discrimina o número ou data da parcela, saldo devedor inicial, valor da parcela, amortização do principal, juros pagos, amortizações extras eventuais, saldo final e valores acumulados. O demonstrativo anual consiste na consolidação matemática exata das parcelas mensais.
          </p>
          <p>
            No cenário de teste, o mês 1 inicia em $ 200.000,00, debita $ 1.000,00 de juros, amortiza $ 687,71 e encerra em $ 199.312,29. O mês 2 parte dessa nova base, gerando $ 996,56 de juros. Ao final da 180ª prestação, a dívida atinge exatamente $ 0,00 com $ 200.000,00 de principal integralmente liquidado.
          </p>
        </section>

        {/* Seção 5 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            5. Total de Juros e Desembolso Global
          </h2>
          <p>
            O total de juros representa a soma de todos os juros apurados ao longo da vida do contrato. O principal total é o valor líquido originalmente financiado. A soma de principal e juros expressa o custo estrito do serviço da dívida.
          </p>
          <p>
            Contratos bancários reais podem incorporar seguros obrigatórios (como MIP e DFI), taxas de administração e tributos prediais em garantia (escrow). A cifra de $ 1.687,71 apurada no modelo foca no capital e juros (P&amp;I), fornecendo a base financeira exata para o planejamento.
          </p>
        </section>

        {/* Seção 6 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            6. Impacto do Prazo na Parcela Mensal e nos Juros Totais
          </h2>
          <p>
            O prazo contratual é uma das variáveis mais determinantes no custo do crédito. Alongar o prazo diminui o valor da prestação mensal, pois a dívida é diluída em mais parcelas. No entanto, o saldo permanece rendendo juros por mais tempo, aumentando enormemente os juros totais pagos. Encurtar o prazo eleva a parcela, mas gera economia massiva de juros.
          </p>
          <p>
            Ao simular diferentes opções com nossa{" "}
            <Link href="/calculators/loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora de Empréstimos
            </Link>
            , avalie tanto a folga no fluxo de caixa mensal quanto o custo total a longo prazo para tomar uma decisão sustentável.
          </p>
        </section>

        {/* Seção 7 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            7. Efeito de Pagamentos Mensais Extraordinários
          </h2>
          <p>
            Um pagamento extra mensal abate o principal de maneira mais rápida que o fluxo regular. Reduzindo o saldo devedor, os juros dos meses seguintes incidem sobre uma base menor, encurtando o prazo e reduzindo os custos. No modelo, todo valor extra é aplicado integralmente à redução do principal.
          </p>
          <p>
            No exemplo verificado, adicionar $ 100 por mês reduz consideravelmente o número de parcelas e gera grande economia de juros. Você também pode comparar cenários na nossa{" "}
            <Link href="/calculators/refinance-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora de Refinanciamento
            </Link>
            .
          </p>
        </section>

        {/* Seção 8 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            8. Amortizações Anuais Extras e Aportes Únicos de Capital
          </h2>
          <p>
            O mutuário pode acelerar a quitação por meio de aportes periódicos anuais ou de um aporte único. O aporte anual representa uma injeção de capital recorrente em um mês específico de cada ano, enquanto o aporte único representa uma amortização extraordinária pontual.
          </p>
          <p>
            O momento do aporte é crucial: uma amortização de $ 5.000 no mês 1 economiza muito mais juros do que o mesmo valor aportado no ano 10. Um aporte anual de $ 1.200 a partir do 1º ano economiza cerca de $ 10.131,78 em juros e quita o empréstimo em 164 meses em vez de 180.
          </p>
        </section>

        {/* Seção 9 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            9. Amortizações Extras com Início Diferido e Relevância do Cronograma
          </h2>
          <p>
            A calculadora possibilita selecionar o mês e o ano de início dos aportes adicionais, viabilizando a modelagem de estratégias que se iniciam no futuro (por exemplo, após a liquidação de outra dívida ou promoção profissional).
          </p>
          <p>
            O algoritmo mantém o fluxo regular durante os períodos anteriores e ativa a amortização acelerada na data programada, garantindo comparações precisas de cenários.
          </p>
        </section>

        {/* Seção 10 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            10. Financiamentos com Taxa Zero (0% ao ano) e Casos Especiais
          </h2>
          <p>
            Como a fórmula usual de anuidades divide pela taxa de juros periódica, uma taxa de 0% geraria erro de divisão por zero. O motor reconhece esse caso especial e calcula a parcela simplesmente dividindo o principal pelo total de meses (ex.: $ 120.000 em 120 meses = $ 1.000,00/mês com $ 0 de juros).
          </p>
          <p>
            Além disso, o sistema trata com rigor montantes fracionários, prazos estendidos, taxas elevadas e amortizações extras que superam o saldo restante, assegurando que o saldo final convirja exatamente para $ 0,00 sem saldos negativos.
          </p>
        </section>

        {/* Seção 11 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            11. Amortização Tradicional vs. Juros Exclusivos, Amortização Negativa e Taxa Variável
          </h2>
          <p>
            Esta plataforma modela financiamentos com amortização clássica e taxa fixa. Em operações de «apenas juros», as prestações não amortizam principal durante o período de carência; em amortização negativa, as parcelas não cobrem os juros devidos e a dívida cresce.
          </p>
          <p>
            Em contratos com taxas pós-fixadas ou variáveis (como IPCA ou TR no Brasil, ou ARM internacional), a taxa se ajusta periodicamente. Para contratos pós-fixados, recomenda-se simulação com parâmetros específicos de indexação.
          </p>
        </section>

        {/* Seção 12 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            12. O que Compõe a Prestação de um Financiamento Real
          </h2>
          <p>
            Uma calculadora de amortização foca em principal e juros. A prestação bancária real pode somar seguros habitacionais obrigatórios (MIP/DFI), tarifas mensais de administração de contrato e impostos municipais.
          </p>
          <p>
            Para avaliar taxas nominais versus efetivas e opções de parcelas, consulte também nossa{" "}
            <Link href="/calculators/interest-rate-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora de Taxa de Juros
            </Link>{" "}
            e a{" "}
            <Link href="/calculators/emi-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora EMI
            </Link>
            .
          </p>
        </section>

        {/* Seção 13 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            13. Como é Determinada a Data de Quitação do Financiamento
          </h2>
          <p>
            A data de quitação resulta da combinação do mês e ano de início com o número de prestações necessárias para zerar a dívida. No exemplo com início em agosto de 2026 e 180 parcelas, o contrato é quitado em julho de 2041.
          </p>
          <p>
            Amortizações extras diminuem o total de períodos necessários e antecipam a data final, demonstrando de forma clara o ganho de tempo proporcionado pelo abatimento de capital.
          </p>
        </section>

        {/* Seção 14 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            14. Leitura dos Gráficos e do Resumo Anual
          </h2>
          <p>
            Os gráficos fornecem uma visualização imediata da divisão entre principal e juros. No caso de referência, 65,8% do desembolso total corresponde à amortização do principal e 34,2% aos juros.
          </p>
          <p>
            O quadro anual consolida as 180 linhas mensais em 15 linhas sintéticas, permitindo acompanhar a redução do saldo devedor ano a ano sem a necessidade de percorrer manualmente centenas de linhas.
          </p>
        </section>

        {/* Seção 15 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            15. Exportação e Auditoria da Tabela de Amortização
          </h2>
          <p>
            A tabela pode ser filtrada, ordenada e exportada para formatos CSV, Excel, PDF ou impressão. A exportação reflete com exatidão os números calculados sem aproximações.
          </p>
          <p>
            Para auditar a tabela, confirme se em cada linha o valor da parcela é igual à soma de principal mais juros, se o saldo inicial bate com o saldo final da linha anterior e se o saldo final atinge $ 0,00.
          </p>
        </section>

        {/* Seção 16 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            16. Como Usar o Simulador Antes de Assinar um Contrato
          </h2>
          <p>
            Utilize o simulador para estudar cenários antes de firmar compromissos bancários. Insira os valores das propostas recebidas, compare prazos e avalie sua capacidade real de realizar aportes extras ao longo dos anos.
          </p>
          <p>
            Para empréstimos não imobiliários, você também pode utilizar nossa{" "}
            <Link href="/calculators/personal-loan-calculator" className="text-blue-600 dark:text-blue-400 font-medium underline">
              Calculadora de Empréstimo Pessoal
            </Link>
            .
          </p>
        </section>

        {/* Seção 17 */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
            17. Metodologia de Cálculo e Aviso Legal
          </h2>
          <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <BookOpen className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Metodologia e Premissas do Modelo
              </div>
              <p>
                Metodologia principal: conversão da taxa anual em mensal (r = taxa anual / 1200), cálculo da quantidade de prestações (n = anos &times; 12 + meses), determinação da parcela constante e cálculo período a período dos juros sobre o saldo devedor remanescente. Pagamentos extras são computados diretamente no principal e a última parcela ajusta o saldo para zero exato.
              </p>
            </div>

            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-1.5">
              <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                Aviso Legal e Privacidade
              </div>
              <p>
                Esta ferramenta é disponibilizada exclusivamente para fins de planejamento e educação financeira. Não representa proposta formal de crédito, nem assessoria jurídica, contábil ou financeira. Verifique sempre as condições contratuais junto ao seu agente financeiro.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* 3. PERGUNTAS FREQUENTES (12 PERGUNTAS) */}
      <div className="pt-6">
        <div className="flex items-center gap-2 mb-4">
          <HelpCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            Perguntas Frequentes (FAQ)
          </h2>
        </div>

        <div className="space-y-3">
          {PORTUGUESE_AMORTIZATION_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndices.has(idx);
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 text-left text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2 pr-4">
                    <span className="text-blue-600 dark:text-blue-400 font-sans tabular-nums text-xs font-bold shrink-0">
                      P{idx + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-0 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-zinc-50/50 dark:bg-zinc-900/50 font-normal">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}

export default PortugueseAmortizationContent;
