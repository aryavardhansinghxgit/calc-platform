"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  Copy,
  Check,
  Share2,
  Sparkles,
  Sliders,
  RotateCcw,
  BookOpen,
  Zap,
  Grid,
  ListOrdered,
  Layers,
  PieChart,
  CheckCircle2,
  Info,
  ShieldCheck,
  Split,
  BarChart2,
  TrendingUp,
  Table,
  Dices
} from "lucide-react";
import {
  computeTwoEventProbability,
  computeMultiEventSeries,
  computeBayesTheorem,
  computeBinomialDistribution,
  computeCombinatorics,
  formatAsFraction,
  formatAsOdds
} from "@/app/calculators/probability-calculator/probability-logic";

export type ProbTab = "two" | "series" | "bayes" | "binomial" | "combinatorics";
export type VisualTab = "venn" | "tree" | "histogram";

export function ProbabilityCalculator() {
  const [pAInput, setPAInput] = useState<string>("0.5");
  const [pBInput, setPBInput] = useState<string>("0.4");
  const [relationType, setRelationType] = useState<"independent" | "exclusive" | "dependent">("independent");
  const [nTrials, setNTrials] = useState<number>(4);

  const [activeTab, setActiveTab] = useState<ProbTab>("two");
  const [activeVisual, setActiveVisual] = useState<VisualTab>("venn");

  // Feedback states
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [copiedLatex, setCopiedLatex] = useState<boolean>(false);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);

  const twoEventResult = useMemo(() => {
    return computeTwoEventProbability(pAInput, pBInput, relationType);
  }, [pAInput, pBInput, relationType]);

  const seriesResult = useMemo(() => {
    return computeMultiEventSeries(pAInput, nTrials);
  }, [pAInput, nTrials]);

  const bayesResult = useMemo(() => {
    return computeBayesTheorem(0.01, 0.99, 0.05);
  }, []);

  const binomialResult = useMemo(() => {
    return computeBinomialDistribution(10, pAInput, 7);
  }, [pAInput]);

  // Presets
  const presets = [
    { label: "Roll a 6 in 4 dice", pa: "1/6", pb: "1/6", rel: "independent", n: 4 },
    { label: "10 Coin Flips (Heads)", pa: "0.5", pb: "0.5", rel: "independent", n: 10 },
    { label: "Mutually Exclusive Events", pa: "0.3", pb: "0.4", rel: "exclusive", n: 1 },
    { label: "Dependent Draw", pa: "4/52", pb: "3/51", rel: "dependent", n: 2 }
  ];

  const heroProb = useMemo(() => {
    if (activeTab === "series") return seriesResult.pAtLeastOne;
    if (activeTab === "bayes") return bayesResult.posteriorA;
    if (activeTab === "binomial") return binomialResult.pExact;
    return twoEventResult.pIntersection;
  }, [activeTab, seriesResult, bayesResult, binomialResult, twoEventResult]);

  const handleCopy = (text: string, setFn: React.Dispatch<React.SetStateAction<boolean>>) => {
    navigator.clipboard.writeText(text);
    setFn(true);
    setTimeout(() => setFn(false), 2000);
  };

  const handleShare = () => {
    const params = new URLSearchParams();
    params.set("pa", pAInput);
    params.set("pb", pBInput);
    params.set("rel", relationType);
    const shareableUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    handleCopy(shareableUrl, setCopiedUrl);
  };

  return (
    <div className="space-y-6">
      {/* INPUT & HERO RESULT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        
        {/* LEFT CARD: INPUT FORM */}
        <div className="md:col-span-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-blue-600" />
              <span>Input Event Probabilities</span>
            </h2>
            <button
              type="button"
              onClick={() => {
                setPAInput("0.5");
                setPBInput("0.4");
                setRelationType("independent");
                setNTrials(4);
              }}
              className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-4">
            {/* Probability P(A) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Probability P(A) (Decimals 0.5, % 50%, or Fractions 1/6):
              </label>
              <input
                type="text"
                value={pAInput}
                onChange={(e) => setPAInput(e.target.value)}
                placeholder="e.g. 0.5 or 1/6 or 50%"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
              />
            </div>

            {/* Probability P(B) */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Probability P(B):
              </label>
              <input
                type="text"
                value={pBInput}
                onChange={(e) => setPBInput(e.target.value)}
                placeholder="e.g. 0.4 or 1/4"
                className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono font-bold text-slate-900 dark:text-slate-100 outline-none"
              />
            </div>

            {/* Event Relationship Radio Toggle */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Event Relationship Type:
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setRelationType("independent")}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    relationType === "independent"
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Independent Events
                </button>

                <button
                  type="button"
                  onClick={() => setRelationType("exclusive")}
                  className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                    relationType === "exclusive"
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  Mutually Exclusive
                </button>
              </div>
            </div>

            {/* QUICK PRESET CHIPS */}
            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-800">
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                Preset Scenarios:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    onClick={() => {
                      setPAInput(preset.pa);
                      setPBInput(preset.pb);
                      setRelationType(preset.rel as any);
                      setNTrials(preset.n);
                    }}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD: HERO RESULT DISPLAY */}
        <div className="md:col-span-6 bg-gradient-to-br from-blue-50/80 via-indigo-50/50 to-slate-50 dark:from-slate-900 dark:via-blue-950/30 dark:to-slate-900 border border-blue-200 dark:border-slate-700 rounded-2xl p-6 space-y-5 shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between border-b border-blue-200/80 dark:border-slate-800 pb-3">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-blue-400 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Calculated Probability Dashboard</span>
            </h2>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
              {(heroProb * 100).toFixed(2)}%
            </span>
          </div>

          {/* MAIN HERO NUMERIC RESULT */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Probability P(A &cap; B):
            </span>
            <div className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-slate-100 font-mono tracking-tight">
              {heroProb.toFixed(4)}
            </div>
            <p className="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 pt-1">
              Fraction: {formatAsFraction(heroProb)} | Odds: {formatAsOdds(heroProb)}
            </p>
          </div>

          {/* STAT CHIPS */}
          <div className="grid grid-cols-4 gap-2 pt-3 border-t border-blue-200/80 dark:border-slate-800">
            <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Union P(A∪B)</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{twoEventResult.pUnion.toFixed(3)}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Complement P(A')</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{twoEventResult.pNotA.toFixed(3)}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Neither</span>
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">{twoEventResult.pNeither.toFixed(3)}</p>
            </div>

            <div className="bg-white/80 dark:bg-slate-800/80 p-2 rounded-xl border border-blue-100 dark:border-slate-700 text-center space-y-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Cond P(A|B)</span>
              <p className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">{twoEventResult.pAGivenB.toFixed(3)}</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            <button
              type="button"
              onClick={() => handleCopy(`P(A)=${twoEventResult.pA}, P(B)=${twoEventResult.pB}, Intersection=${twoEventResult.pIntersection}, Union=${twoEventResult.pUnion}`, setCopiedSummary)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedSummary ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedSummary ? "Copied!" : "Copy Summary"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopy(`P(A \\cap B) = P(A) \\times P(B) = ${twoEventResult.pIntersection}`, setCopiedLatex)}
              className="bg-white dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold rounded-xl px-2 py-2 text-xs shadow-xs transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedLatex ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <BookOpen className="h-3.5 w-3.5 text-blue-600" />}
              <span>{copiedLatex ? "Copied!" : "Copy LaTeX"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl px-2 py-2 text-xs shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-1 cursor-pointer"
            >
              {copiedUrl ? <Check className="h-3.5 w-3.5 text-emerald-300" /> : <Share2 className="h-3.5 w-3.5" />}
              <span>{copiedUrl ? "Link Copied!" : "Share URL"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* VISUAL ANALYTICS & SEGMENTED TABS SUITE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 space-y-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-2">
            <Layers className="h-4 w-4" />
            <span>Interactive Proportional Venn & Tree Diagram Visualizers</span>
          </h3>

          {/* VISUAL TAB BUTTONS */}
          <div className="flex flex-wrap gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveVisual("venn")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVisual === "venn"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <PieChart className="h-3.5 w-3.5" />
              <span>Proportional Venn Diagram</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveVisual("tree")}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                activeVisual === "tree"
                  ? "bg-white dark:bg-slate-900 text-blue-600 shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Probability Tree</span>
            </button>
          </div>
        </div>

        {/* TAB 1: PROPORTIONAL VENN DIAGRAM (SVG) */}
        {activeVisual === "venn" && (
          <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-4">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Proportional 2-Set Venn Diagram (A and B):
            </h4>

            <div className="w-full flex justify-center py-2 overflow-x-auto">
              <svg viewBox="0 0 400 160" className="w-full max-w-md h-auto">
                {/* Circle A */}
                <circle cx="160" cy="80" r="60" fill="#3b82f6" opacity="0.4" stroke="#1d4ed8" strokeWidth="2" />
                {/* Circle B */}
                <circle cx="240" cy="80" r="60" fill="#6366f1" opacity="0.4" stroke="#4338ca" strokeWidth="2" />

                {/* Labels */}
                <text x="120" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-800 dark:fill-slate-100">
                  A only: {(twoEventResult.pA - twoEventResult.pIntersection).toFixed(2)}
                </text>
                <text x="200" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-blue-900 dark:fill-blue-200">
                  A∩B: {twoEventResult.pIntersection.toFixed(2)}
                </text>
                <text x="280" y="85" textAnchor="middle" className="text-[10px] font-mono font-bold fill-slate-800 dark:fill-slate-100">
                  B only: {(twoEventResult.pB - twoEventResult.pIntersection).toFixed(2)}
                </text>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
